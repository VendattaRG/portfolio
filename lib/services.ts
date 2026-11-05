import type { Project } from './data'

export type Service = {
  slug: string
  title: string
  cardText: string
  chips: string[]
  metaTitle: string
  metaDescription: string
  intro: string
  deliverables: string[]
  steps: { title: string; text: string }[]
  audience: string[]
  projects: Project['key'][]
  postTags: string[]
  faq: { q: string; a: string }[]
}

export const SERVICES: Service[] = [
  {
    slug: 'ai-pentest-automation',
    title: 'AI pentest automation',
    cardText:
      'Autonomous agents that plan and run multi-step penetration tests: recon, enumeration and exploit chaining, with no operator in the loop.',
    chips: ['LangGraph', 'Python', 'Recon'],
    metaTitle: 'AI Penetration Testing Automation',
    metaDescription:
      'I build autonomous AI agents that plan and run multi-step penetration tests: recon, enumeration and exploit chaining, with evidence-backed findings.',
    intro:
      "I design and build LLM agents that run penetration tests on their own. They plan an engagement, carry out recon and enumeration, chain exploits, and change their attack path based on what they find instead of following a fixed playbook. It's what I do full-time at Nua Security, where I architected SHAX.",
    deliverables: [
      'An agent that plans and runs multi-step engagements against your targets, inside a scope you define',
      'Recon, enumeration and exploitation built as modular tools, so new techniques plug in without rewriting the agent',
      'A reasoning loop tied to collected evidence, so every finding traces back to the requests that proved it',
      'Reports your team can act on: what was found, how it was reproduced, and how to fix it',
      'Deployment on AWS or GCP with Docker, Kubernetes and CI/CD',
    ],
    steps: [
      { title: 'Scope', text: 'We agree on targets, rules of engagement, and what the agent must never touch.' },
      { title: 'Design', text: "I turn the techniques you need into tools and design the agent's planning loop in LangGraph." },
      { title: 'Build and test', text: 'I build against safe test targets first, measuring what the agent finds and where it goes wrong.' },
      { title: 'Deploy', text: 'The agent runs in your environment with CI/CD, logs, and documentation your team can maintain.' },
    ],
    audience: [
      'Security teams that want continuous testing between manual pentests',
      'Security product companies building automated offensive tooling',
      'Engineering teams with many apps to test and a small security team',
    ],
    projects: ['shax', 'argus'],
    postTags: ['ai-security', 'agents'],
    faq: [
      {
        q: 'Does an AI agent replace a human pentester?',
        a: 'No. It handles the repeatable, multi-step work at scale and collects the evidence, so human testers can spend their time on the creative, high-judgment parts.',
      },
      {
        q: 'How do you keep the agent in scope?',
        a: 'Scope is enforced in the tools themselves, not only in the prompt. The agent can only reach the targets and techniques you have approved.',
      },
      {
        q: 'Can it run against production?',
        a: 'It can, under agreed rules of engagement, but we always start against staging or a test environment.',
      },
      {
        q: 'Can it use the tools we already have?',
        a: 'Yes. Existing scanners and scripts can be wrapped as tools the agent calls.',
      },
    ],
  },
  {
    slug: 'web-application-penetration-testing',
    title: 'Web application penetration testing',
    cardText: 'Black-box and white-box testing of your web app, with reproducible findings and fixes your team can ship.',
    chips: ['OWASP', 'Auth', 'APIs'],
    metaTitle: 'Web Application Penetration Testing',
    metaDescription:
      'Black-box and white-box penetration testing for web apps and APIs, with reproducible findings and fixes your developers can ship.',
    intro:
      "I test web applications and APIs the way an attacker would: from the outside (black-box), or with your source code in hand (white-box). I've also spent five years building full-stack products, so every finding is explained in your stack's terms and comes with a fix your developers can ship.",
    deliverables: [
      "Black-box testing of your app and APIs from an outside attacker's point of view",
      'White-box review that follows untrusted input through your code',
      'Checks for authentication, authorization, session and access-control flaws',
      'A report where every finding is reproduced step by step, rated, and paired with a fix',
      'A retest after you fix, to confirm each issue is closed',
    ],
    steps: [
      { title: 'Scope', text: 'We agree on the apps, environments, test accounts and testing window.' },
      { title: 'Test', text: 'I map the attack surface, then probe auth, access control, input handling and business logic.' },
      { title: 'Report', text: 'You get reproducible findings, a severity for each, and fixes written for your stack.' },
      { title: 'Retest', text: 'Once fixes ship, I verify each one and update the report.' },
    ],
    audience: [
      'Startups preparing for a security review, a big customer or a launch',
      'Teams shipping APIs that hold more than one customer’s data',
      'Developers who want findings explained in code, not pasted scanner output',
    ],
    projects: ['argus', 'scrh'],
    postTags: ['web-security', 'appsec'],
    faq: [
      {
        q: 'What is the difference between black-box and white-box testing?',
        a: 'Black-box testing looks at the app from the outside with no source code, the way a real attacker would. White-box testing uses the source code to find issues faster and more completely. Many engagements use both.',
      },
      {
        q: 'Do you follow a standard?',
        a: 'I use the OWASP Top 10 and the OWASP API Security Top 10 as a baseline, then test the logic that is specific to your app.',
      },
      {
        q: 'Will testing break my app?',
        a: 'I test against staging by default, and anything risky is agreed with you in advance.',
      },
      {
        q: 'How long does a test take?',
        a: "It depends on the size of the app, the number of user roles and the number of APIs. I'll give you an estimate after a short scoping call.",
      },
    ],
  },
  {
    slug: 'ai-agent-development',
    title: 'AI agent development',
    cardText: 'LangGraph and LangChain agents built for production, with tool use, evaluation, and reasoning tied to evidence.',
    chips: ['LangChain', 'LangSmith', 'RAG'],
    metaTitle: 'AI Agent Development with LangGraph and LangChain',
    metaDescription:
      'Production AI agents built with LangGraph and LangChain: tool use, evaluation and tracing with LangSmith, and reasoning grounded in evidence.',
    intro:
      "I build LLM agents that do real work in production, not demos. My day job is an autonomous agent that runs penetration tests end to end, so I design for the hard parts: multi-step planning, tool use, staying grounded in evidence, and noticing when it's wrong.",
    deliverables: [
      'Agent design in LangGraph: its state, its planning loop and the tools it can call',
      'Tool integrations with your APIs, databases and internal services',
      'Evaluation and tracing with LangSmith, so you can see why the agent did what it did',
      'Guardrails that keep the output tied to data the agent actually collected',
      'A deployed service with CI/CD, plus documentation your team can extend',
    ],
    steps: [
      { title: 'Define', text: 'We pin down the task, what "done" looks like, and how we will measure it.' },
      { title: 'Prototype', text: 'I build a working agent on real examples quickly, to find the hard cases early.' },
      { title: 'Harden', text: 'I add evaluation, tracing, guardrails and error handling until results are consistent.' },
      { title: 'Ship', text: 'The agent goes live on your infrastructure with monitoring and a proper handover.' },
    ],
    audience: [
      'Product teams adding agent features to an existing app',
      'Companies automating multi-step internal workflows',
      'Security teams building AI-assisted tooling',
    ],
    projects: ['shax', 'scrh'],
    postTags: ['agents'],
    faq: [
      {
        q: 'Why LangGraph?',
        a: "It makes the agent's steps and state explicit. That makes multi-step agents much easier to test, debug and control than one long prompt.",
      },
      {
        q: 'Which models do you use?',
        a: 'Whichever fits the task, the budget and your privacy needs. I design agents so the model can be swapped later.',
      },
      {
        q: 'How do you stop an agent from making things up?',
        a: 'By tying its reasoning to evidence it collected, checking its output against that evidence, and evaluating it on real cases before launch.',
      },
    ],
  },
  {
    slug: 'full-stack-development',
    title: 'Full-stack development',
    cardText: 'Next.js, React, Django and Node.js products, from the first internal build to a public launch.',
    chips: ['Next.js', 'Django', 'WebSockets'],
    metaTitle: 'Full-Stack Development with Next.js, React, Django and Node.js',
    metaDescription:
      'Full-stack web products in Next.js, React, Django and Node.js, from the first internal build to public launch, built with security in mind.',
    intro:
      "I've spent five years building full-stack products: a dental-health SaaS taken from internal build to public launch, an AI-driven concert and venue platform, and high-traffic consumer apps with payments and social login. I build the frontend, the API and the infrastructure, and I bring a security engineer's habits to all three.",
    deliverables: [
      'Web apps in Next.js, React and TypeScript',
      'REST APIs and real-time WebSocket features in Django or Node.js',
      'Secure authentication with OAuth 2.0 and JWT',
      'Payment gateway, geolocation and social login integrations',
      'Reusable UI component libraries shared across products',
    ],
    steps: [
      { title: 'Plan', text: 'We agree on what the first version must do, and what can wait.' },
      { title: 'Build', text: 'I ship in small, reviewable pieces, so you see progress every week.' },
      { title: 'Secure', text: "Auth, access control and data handling get reviewed with an attacker's eye before launch." },
      { title: 'Launch', text: 'Deployed with CI/CD, monitoring and documentation.' },
    ],
    audience: [
      'Founders building a first version, or taking an internal tool public',
      'Teams that need one developer to own a product end to end',
      'Products that handle sensitive data, like health records or payments',
    ],
    projects: ['dentasmart', 'jukebox'],
    postTags: ['full-stack', 'appsec'],
    faq: [
      {
        q: 'Can you join an existing codebase?',
        a: 'Yes. Most of my work has been on established teams with existing products and code review.',
      },
      {
        q: 'Do you also do the backend and the cloud?',
        a: 'Yes. I usually own the API and the deployment as well as the frontend, so nothing falls between the cracks.',
      },
      {
        q: 'Do you work remotely?',
        a: "Yes. I'm in Islamabad (UTC+5) and work remotely, currently with a team in Riyadh.",
      },
    ],
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    cardText: 'AWS and GCP on Docker and Kubernetes, with CI/CD that deploys on every merge.',
    chips: ['AWS', 'GCP', 'Kubernetes'],
    metaTitle: 'Cloud and DevOps on AWS and GCP',
    metaDescription:
      'AWS and GCP infrastructure on Docker and Kubernetes, with fully automated CI/CD, for teams that want deploys to be boring and safe.',
    intro:
      "I've run production infrastructure on AWS and GCP for several products, including the platform behind an autonomous pentest agent. I set up containers, Kubernetes and CI/CD so every merge deploys safely and nobody has to log into a server by hand.",
    deliverables: [
      'Docker images and Kubernetes deployments for your services',
      'Fully automated CI/CD, from tests to production',
      'AWS or GCP infrastructure, set up and documented',
      'Microservice setups with clear boundaries between components',
      'Hardening: secrets handling, least-privilege access and safer defaults',
    ],
    steps: [
      { title: 'Audit', text: 'I look at how you build and deploy today, and where it hurts.' },
      { title: 'Plan', text: 'We agree on the target setup and a migration order that avoids downtime.' },
      { title: 'Build', text: 'Containers, clusters and pipelines, rolled out one service at a time.' },
      { title: 'Hand over', text: 'Runbooks and documentation, so your team owns it when I step away.' },
    ],
    audience: [
      'Teams still deploying by hand',
      'Startups moving from a single server to containers',
      'Products that need to run on both AWS and GCP',
    ],
    projects: ['shax', 'jukebox'],
    postTags: ['cloud'],
    faq: [
      {
        q: 'AWS or GCP?',
        a: "Both. I've run production workloads on each, and I'll recommend one based on what you already use.",
      },
      {
        q: 'Do we need Kubernetes?',
        a: "Not always. For small products, simpler managed services can be the better choice, and I'll tell you so.",
      },
      {
        q: 'Can you work with our existing pipeline?',
        a: 'Yes. I usually improve what you have before replacing anything.',
      },
    ],
  },
]

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
