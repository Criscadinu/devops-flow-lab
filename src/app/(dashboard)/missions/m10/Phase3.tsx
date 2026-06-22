"use client"

import { useState, useEffect } from "react"


function MobileWarning() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  if (!isMobile) return null
  return (
    <div className="flex flex-col gap-3 p-5 border mb-6" style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(251,146,60,0.4)", borderLeft: "3px solid rgb(251,146,60)" }}>
      <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>Desktop required</p>
      <p className="text-sm text-gray-600 leading-relaxed">This phase requires a terminal, a code editor, and GitHub. These tasks cannot be completed on a mobile device. Open this page on your laptop or desktop to continue.</p>
    </div>
  )
}

function TaskCard({ number, title, done, locked, children }: { number: string; title: string; done: boolean; locked: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 p-6 border" style={{ backgroundColor: locked ? "var(--bg-card)" : done ? "rgba(34,197,94,0.08)" : "var(--bg)", borderColor: locked ? "var(--border)" : done ? "rgba(34,197,94,0.5)" : "rgba(255,85,0,0.4)", borderLeft: locked ? "3px solid var(--border)" : done ? "3px solid rgb(34,197,94)" : "3px solid var(--af-orange)", opacity: locked ? 0.45 : 1, pointerEvents: locked ? "none" : "auto" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold" style={{ color: locked ? "rgb(75,85,99)" : done ? "rgb(34,197,94)" : "rgb(255,85,0)" }}>{number}</span>
          <h3 className="text-gray-900 text-base" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>{title}</h3>
        </div>
        <div>
          {done && <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ DONE</span>}
          {locked && <span className="text-xs font-mono text-gray-700">⊘ LOCKED</span>}
        </div>
      </div>
      {!locked && <div className="flex flex-col gap-4">{children}</div>}
    </div>
  )
}

function MentorNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 border" style={{ backgroundColor: "var(--bg)", borderColor: "rgba(255,85,0,0.15)", borderLeft: "3px solid rgba(255,85,0,0.5)" }}>
      <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "var(--af-orange)" }}>//</span>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{children}</p>
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="text-xs font-mono leading-relaxed p-4 overflow-x-auto" style={{ backgroundColor: "#1e1e1e", borderLeft: "3px solid var(--af-orange)", color: "rgb(200,200,200)" }}>
      {children}
    </pre>
  )
}

export function Phase3() {
  const [task1Done, setTask1Done] = useState(false)
  const [task2Done, setTask2Done] = useState(false)
  const [task3Done, setTask3Done] = useState(false)
  const [task4Done, setTask4Done] = useState(false)
  const [task5Done, setTask5Done] = useState(false)
  const [actionsUrl, setActionsUrl] = useState("")
  const allDone = task1Done && task2Done && task3Done && task4Done && task5Done

  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <MobileWarning />

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Your Mission - Automate the Checklist</h2>
          <p className="text-gray-500 text-sm leading-relaxed">Document the manual steps, convert them to integration tests, and delete the checklist from your release process.</p>
        </div>

        <div className="flex flex-col gap-5 p-6 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(251,146,60,0.3)", borderLeft: "3px solid rgb(251,146,60)" }}>
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>Before you start</p>
          <p className="text-gray-400 text-sm leading-relaxed">This mission builds on M-09. Your TDD-verified discount module and integration test category should already be in place.</p>
        </div>

        <TaskCard number="01" title="Document your manual test checklist" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">Before you automate, you need to know what you are automating.</span>{" "}Write down every manual step you currently perform before a release. The checklist is the specification.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Create MANUAL-TEST-CHECKLIST.md</SectionLabel>
            <CodeBlock>{`# Manual Test Checklist

Steps performed before every release:

1. GET /health — returns 200
2. GET /api/orders — returns array
3. POST /api/orders/discount with valid input — returns discounted price
4. POST /api/orders/discount with invalid input (discount > 100) — returns 400
5. GET /api/alerts — returns alert status
6. GET /api/postmortems — returns postmortem list`}</CodeBlock>
          </div>
          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask1Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Manual test checklist documented</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="02" title="Convert checklist to integration tests" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">Each item on the checklist becomes a test.</span>{" "}Use supertest to make real HTTP calls against the running app — no mocks, no assumptions.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Create src/__tests__/integration/api.test.js</SectionLabel>
            <CodeBlock>{`const request = require('supertest')
const app = require('../../index')

describe('API integration tests — release checklist', () => {
  test('GET /health returns 200', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
  })

  test('GET /api/orders returns array', async () => {
    const res = await request(app).get('/api/orders')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test('POST /api/orders/discount with valid input', async () => {
    const res = await request(app)
      .post('/api/orders/discount')
      .send({ price: 100, discountPercent: 20 })
    expect(res.status).toBe(200)
    expect(res.body.finalPrice).toBe(80)
  })

  test('POST /api/orders/discount rejects discount above 100', async () => {
    const res = await request(app)
      .post('/api/orders/discount')
      .send({ price: 100, discountPercent: 150 })
    expect(res.status).toBe(400)
  })
})`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">Run: npm run test:integration</p>
          </div>
          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask2Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Release checklist converted to automated integration tests</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="03" title="Add supertest and export the app" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">Supertest lets you make HTTP calls against your Express app without starting a real server.</span>{" "}The app must be exported from index.js to be testable.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Install supertest</SectionLabel>
            <CodeBlock>{`npm install --save-dev supertest`}</CodeBlock>
          </div>
          <div className="flex flex-col gap-2">
            <SectionLabel>Export the app from src/index.js</SectionLabel>
            <CodeBlock>{`// At the bottom of src/index.js, add:
module.exports = app`}</CodeBlock>
          </div>
          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask3Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">supertest installed, app exported for testing</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="04" title="Delete the manual checklist from your release process" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">The automation replaces the checklist — it does not supplement it.</span>{" "}If both exist, engineers will skip the automation when they are in a hurry. Remove the manual step.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Update CONTRIBUTING.md</SectionLabel>
            <CodeBlock>{`## Pre-release checklist
Automated. Run \`npm run test:integration\` or let CI handle it.`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">Remove any reference to manual pre-release testing from CONTRIBUTING.md. The integration tests are now the process.</p>
          </div>
          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask4Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Manual checklist removed from release process — automation is the process</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="05" title="Commit and push" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">Kai&apos;s two-day release ritual is now a 30-second CI job.</span>{" "}It runs on every commit. It never gets tired. It never misses a step.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push all changes</SectionLabel>
            <CodeBlock>{`git add src/__tests__/ MANUAL-TEST-CHECKLIST.md CONTRIBUTING.md package.json
git commit -m 'feat: automate release checklist — integration tests replace manual testing'
git push`}</CodeBlock>
          </div>
          {!task5Done && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <SectionLabel>Paste your green Actions run URL</SectionLabel>
                <input type="url" value={actionsUrl} onChange={(e) => setActionsUrl(e.target.value)} placeholder="https://github.com/your-username/nexus-corp-app/actions/runs/..." className="w-full px-3 py-2 text-sm font-mono text-gray-900 outline-none border" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border-bright)" }} />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" onChange={(e) => { if (e.target.checked && actionsUrl.includes("github.com")) setTask5Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
                <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Pipeline is green — release checklist is automated</span>
              </label>
            </div>
          )}
        </TaskCard>

        {allDone && (
          <div className="flex flex-col gap-5 border p-6" style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(34,197,94,0.5)", borderLeft: "3px solid rgb(34,197,94)" }}>
            <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>✓ The checklist is automated. Kai&apos;s two days became 30 seconds. The release is now reproducible.</p>
            <a href="?phase=4" className="self-start px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}>See your impact →</a>
          </div>
        )}
      </div>
    </div>
  )
}
