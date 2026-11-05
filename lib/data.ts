// Every fact here comes from the CV. Keep it that way.

export type PanelLine = { k: string; text: string; tone?: 'hit' | 'ok' }

export type Project = {
  key: 'shax' | 'argus' | 'scrh' | 'dentasmart' | 'jukebox'
  name: string
  badge: string
  cardLabel: string
  cardText: string
  sub: string
  bullets: string[]
  chips: string[]
  panelTitle: string
  panelTag: 'illustrative' | 'flow'
  lines: PanelLine[]
}

export const PROJECTS: Project[] = [
  {
    key: 'shax',
    name: 'SHAX',
    badge: 'Autonomous agent · Nua Security',
    cardLabel: 'Agent · Nua',
    cardText: 'Autonomous pentest agent with no operator in the loop.',
    sub: 'An autonomous penetration testing agent.',
    bullets: [
      'Plans and runs multi-step engagements with no operator in the loop',
      'Adapts its attack path from live findings, not a fixed playbook',
      'Modular tool layer, so new techniques drop in without touching orchestration',
    ],
    chips: ['Python', 'LangGraph', 'LangChain', 'AWS', 'GCP', 'Kubernetes'],
    panelTitle: 'shax · engagement log',
    panelTag: 'illustrative',
    lines: [
      { k: 'plan', text: 'scope web app, authenticated' },
      { k: 'recon', text: '14 subdomains, 3 live apps' },
      { k: 'enum', text: '/api/v2/users/{id} is sequential' },
      { k: 'reason', text: 'evidence → test object access' },
      { k: 'exploit', text: "read another tenant's record", tone: 'hit' },
      { k: 'verify', text: 'reproduced 3 / 3', tone: 'ok' },
      { k: 'report', text: 'broken object-level auth · high' },
    ],
  },
  {
    key: 'argus',
    name: 'Argus',
    badge: 'Security agent',
    cardLabel: 'Security agent',
    cardText: 'Web pentest agent, black-box and white-box.',
    sub: 'A web penetration testing agent with two modes.',
    bullets: [
      'Assesses web applications with and without access to their source code',
      'Black-box: tests from the outside, the way a real attacker would',
      'White-box: uses the source code to decide where to look',
    ],
    chips: ['Black-box', 'White-box', 'Web security', 'AI agents'],
    panelTitle: 'argus · two ways in',
    panelTag: 'illustrative',
    lines: [
      { k: 'black-box', text: 'no source, outside view' },
      { k: '', text: 'map pages, inputs and auth' },
      { k: '', text: 'probe like an attacker', tone: 'hit' },
      { k: 'white-box', text: 'source available' },
      { k: '', text: 'follow input through the code' },
      { k: '', text: 'test the risky paths live', tone: 'hit' },
      { k: 'report', text: 'findings with evidence', tone: 'ok' },
    ],
  },
  {
    key: 'scrh',
    name: 'SCRH',
    badge: 'Code review · LLM',
    cardLabel: 'Security · LLM',
    cardText: 'Code review harness that learns from each pass.',
    sub: 'A self-learning code review harness.',
    bullets: [
      'Reviews source code with static analysis and an LLM',
      'Refines its own review criteria from the outcomes of earlier passes',
      'Gets sharper with every pass instead of repeating the same mistakes',
    ],
    chips: ['Static analysis', 'LLM', 'Python'],
    panelTitle: 'scrh · review loop',
    panelTag: 'illustrative',
    lines: [
      { k: 'pass 1', text: 'review against current criteria' },
      { k: 'score', text: 'compare findings with outcomes' },
      { k: 'learn', text: 'drop rules that misfire', tone: 'hit' },
      { k: '', text: 'sharpen the ones that hit', tone: 'hit' },
      { k: 'pass 2', text: 'review again, refined' },
      { k: 'repeat', text: 'each pass beats the last', tone: 'ok' },
    ],
  },
  {
    key: 'dentasmart',
    name: 'DentaSmart',
    badge: 'Health SaaS · Zigron',
    cardLabel: 'Health · Zigron',
    cardText: 'Dental SaaS with an AI second opinion.',
    sub: 'A dental-health SaaS, from internal build to public launch.',
    bullets: [
      'Real-time medical image ingestion, retrieval and clinician review',
      'An AI second opinion that turns model output into patient-readable guidance',
      'Secure pipelines for patient health records under privacy rules',
    ],
    chips: ['REST APIs', 'WebSockets', 'AI', 'Healthcare'],
    panelTitle: 'dentasmart · scan to guidance',
    panelTag: 'flow',
    lines: [
      { k: 'upload', text: 'dental image from the clinic' },
      { k: 'ingest', text: 'real-time API, stored securely' },
      { k: 'analyze', text: 'clinical model runs' },
      { k: 'review', text: 'clinician checks the result' },
      { k: 'explain', text: 'second opinion in plain words', tone: 'ok' },
    ],
  },
  {
    key: 'jukebox',
    name: 'JukeBox',
    badge: 'Events SaaS · Triomatic',
    cardLabel: 'Events · Triomatic',
    cardText: 'AI concert and venue management.',
    sub: 'Concert and venue management, driven by AI.',
    bullets: [
      'Recommendations from audience demographics, location and listening preferences',
      'Coordinates stage, lighting, sound and scheduling across concurrent events',
      'Built in Django, Next.js and TypeScript on AWS and GCP',
    ],
    chips: ['Django', 'Next.js', 'TypeScript', 'AWS', 'GCP'],
    panelTitle: 'jukebox · plan a night',
    panelTag: 'flow',
    lines: [
      { k: 'audience', text: 'demographics and location' },
      { k: 'taste', text: 'listening preferences' },
      { k: 'recommend', text: 'setlist and event plan', tone: 'hit' },
      { k: 'venues', text: 'stage, lighting, sound, time' },
      { k: 'sync', text: 'across concurrent events', tone: 'ok' },
    ],
  },
]

export type Role = {
  from: string
  to: string
  role: string
  company: string
  note?: string
  summary: string
  location: string
  current?: boolean
}

export const EXPERIENCE: Role[] = [
  {
    from: 'May 2025',
    to: 'Now',
    role: 'AI Engineer, Pentest Automation',
    company: 'Nua Security',
    summary: 'Architected SHAX, an autonomous pentest agent, and deployed it across AWS and GCP.',
    location: 'Riyadh, SA',
    current: true,
  },
  {
    from: 'Jan 2024',
    to: 'Jun 2025',
    role: 'Full Stack Developer',
    company: 'Zigron',
    note: 'promoted from Backend',
    summary: 'Took DentaSmart from an internal build to a public consumer launch.',
    location: 'Islamabad, PK',
  },
  {
    from: 'Oct 2022',
    to: 'Nov 2023',
    role: 'Full Stack Developer',
    company: 'Triomatic Solutions',
    summary: 'Led JukeBox in Django, Next.js and TypeScript on AWS and GCP.',
    location: 'Rawalpindi, PK',
  },
  {
    from: 'Apr 2022',
    to: 'Sep 2022',
    role: 'Full Stack Developer',
    company: 'AirOverflow',
    summary: 'Built OAuth 2.0 and JWT auth aligned with GDPR and PCI-DSS.',
    location: 'Islamabad, PK',
  },
  {
    from: 'Oct 2020',
    to: 'Feb 2022',
    role: 'Full Stack Developer',
    company: 'OctalSol',
    note: 'promoted from Frontend',
    summary: 'React and TypeScript interfaces for high-traffic consumer apps.',
    location: 'Lahore, PK',
  },
]

export const COMPANIES = ['Zigron', 'Triomatic', 'AirOverflow', 'OctalSol']

export const SKILLS = [
  { group: 'Security', items: ['Reconnaissance', 'Enumeration', 'Web app security', 'Vuln assessment'] },
  { group: 'AI & LLM', items: ['LangChain', 'LangGraph', 'LangSmith', 'Agent systems'] },
  { group: 'Backend', items: ['Python · Django', 'Node.js', 'REST · WebSockets', 'Microservices'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript'] },
  { group: 'DevOps', items: ['Docker · Kubernetes', 'AWS · GCP', 'CI/CD', 'Linux · Git'] },
]

export const EDUCATION = { degree: 'BS Cyber Security', school: 'Air University, Islamabad', years: '2020 – 2024' }

export const AWARDS = [
  { title: 'Winner, Airtech Codecamp', org: 'Air University, Islamabad', year: '2024' },
  { title: "Winner, Hack N' Connect", org: 'Netronix, GIK Institute', year: '2023' },
]

export const STATS = [
  { value: '6', sup: '+', label: 'years in production software' },
  { value: '5', label: 'companies, two promotions' },
  { value: '3', label: 'offensive security agents built' },
  { value: '2', label: 'hackathon wins, 2023 and 2024' },
]
