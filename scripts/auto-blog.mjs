// Publishes up to two blog posts a week, unattended. A global Claude Code SessionStart hook runs
// `node scripts/auto-blog.mjs` on every launch. If a post is due, it re-runs itself in the background
// with --run: Claude researches and writes the post, `npm test` and `npm run build` gate it, and it is
// committed and pushed to main. Everything is logged to .auto-blog/log.txt.
import { execFileSync, spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const SELF = fileURLToPath(import.meta.url)
const ROOT = path.resolve(path.dirname(SELF), '..')
const BLOG = path.join(ROOT, 'content', 'blog')
const STATE = path.join(ROOT, '.auto-blog')
const LOG = path.join(STATE, 'log.txt')

const sh = { cwd: ROOT, encoding: 'utf8', windowsHide: true }
const git = (...args) => execFileSync('git', args, sh).trim()
const today = () => new Date().toLocaleDateString('en-CA') // local YYYY-MM-DD
const log = (msg) => {
  fs.mkdirSync(STATE, { recursive: true })
  fs.appendFileSync(LOG, `${new Date().toISOString()} ${msg}\n`)
}

/** Due when no post is dated today and fewer than two are dated this week (Mon–Sun). */
export function isDue(dates, today) {
  const t = new Date(`${today}T00:00:00Z`)
  const monday = new Date(t.getTime() - ((t.getUTCDay() + 6) % 7) * 864e5).toISOString().slice(0, 10)
  return !dates.includes(today) && dates.filter((d) => d >= monday).length < 2
}

function postDates() {
  return fs
    .readdirSync(BLOG)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => matter(fs.readFileSync(path.join(BLOG, f), 'utf8')).data)
    .filter((d) => d.draft !== true)
    .map((d) => (d.date instanceof Date ? d.date.toISOString().slice(0, 10) : String(d.date)))
}

function check() {
  if (process.env.AUTO_BLOG_CHILD) return // the background Claude run fires this hook too
  if (!isDue(postDates(), today())) return
  // never commit or push on top of work in progress
  if (git('branch', '--show-current') !== 'main' || git('status', '--porcelain'))
    return log('post due, waiting: repo is not on a clean main branch')
  fs.mkdirSync(STATE, { recursive: true })
  try {
    // one attempt a day, so a failing run doesn't burn usage on every launch; also stops parallel windows
    fs.writeFileSync(path.join(STATE, `attempt-${today()}`), '', { flag: 'wx' })
  } catch {
    return
  }
  spawn(process.execPath, [SELF, '--run'], {
    cwd: ROOT,
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
    env: { ...process.env, AUTO_BLOG_CHILD: '1' },
  }).unref()
  console.log(JSON.stringify({ systemMessage: `Auto-blog: a post is due, writing it in the background. Log: ${LOG}` }))
}

function run() {
  const date = today()
  log('run started')
  git('pull', '--ff-only')
  if (!isDue(postDates(), date)) return log('not due after pull, stopping')
  if (git('rev-list', '--count', 'origin/main..HEAD') !== '0')
    throw new Error('main has unpushed commits; not publishing on top of them')

  const prompt = fs.readFileSync(path.join(ROOT, 'scripts', 'auto-blog-prompt.md'), 'utf8').replaceAll('{{TODAY}}', date)
  const tools = 'WebSearch,WebFetch,Read,Glob,Grep,Write' // no Bash: this script does all git and npm work
  const r = spawnSync('claude', ['-p', '--allowedTools', tools, '--disable-slash-commands'], {
    ...sh,
    input: prompt,
    shell: true, // claude is a .cmd shim on Windows
    timeout: 60 * 60e3,
  })
  if (r.status !== 0) throw new Error(`claude exited ${r.status}: ${r.stderr || r.stdout || r.error}`)
  log(`claude: ${r.stdout.trim().slice(-500)}`)

  const status = git('status', '--porcelain')
  const file = status.match(/^\?\? (content\/blog\/[a-z0-9-]+\.mdx)$/)?.[1]
  if (!file) throw new Error(`expected exactly one new post and no other changes, found:\n${status || '(nothing)'}`)
  for (const cmd of ['npm test', 'npm run build']) {
    const c = spawnSync(cmd, { ...sh, shell: true })
    if (c.status !== 0) {
      fs.renameSync(path.join(ROOT, file), path.join(STATE, `failed-${path.basename(file)}`))
      throw new Error(`${cmd} failed, post moved to .auto-blog/:\n${(c.stdout + c.stderr).slice(-3000)}`)
    }
  }

  const { title } = matter(fs.readFileSync(path.join(ROOT, file), 'utf8')).data
  git('add', file)
  git(
    'commit',
    '-m',
    `content: add post "${title}"\n\nResearched, written and published unattended by scripts/auto-blog.mjs.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`,
  )
  if (git('rev-list', '--count', 'origin/main..HEAD') !== '1')
    throw new Error('other commits landed on main during the run; post committed but not pushed')
  git('push', 'origin', 'main')
  log(`published ${file}`)
}

if (path.resolve(process.argv[1] ?? '') === SELF) {
  try {
    process.argv.includes('--run') ? run() : check()
  } catch (e) {
    log(`FAILED: ${e.message}`)
  }
}
