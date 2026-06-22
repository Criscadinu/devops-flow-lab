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
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Your Mission - Remove the Wall</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>Make ownership explicit, build operational visibility into the app, write the runbook, and test the operational concern.</p>
        </div>

        <div className="flex flex-col gap-5 p-6 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(251,146,60,0.3)", borderLeft: "3px solid rgb(251,146,60)" }}>
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>Before you start</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>This mission builds on M-12. NFR gates (security, coverage, secrets) should be active in CI.</p>
        </div>

        <TaskCard number="01" title="Document who owns what" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">Shared ownership starts with explicit ownership.</span>{" "}If nobody owns it, nobody fixes it. A CODEOWNERS file makes ownership visible in every PR.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Create .github/CODEOWNERS</SectionLabel>
            <CodeBlock>{`# Global owners
* @your-github-username

# Orders module — Dev owns the code, Ops reviews for operational impact
src/orders.js @dev-team @ops-team
src/index.js @dev-team @ops-team

# Infrastructure — Ops owns, Dev reviews for service dependencies
docker-compose.yml @ops-team
Dockerfile @ops-team
.github/workflows/ @ops-team @dev-team`}</CodeBlock>
          </div>
          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask1Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>CODEOWNERS file created — ownership is explicit</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="02" title="Add operational metadata to the app" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">Ops needs to understand what is running in production.</span>{" "}Build operational visibility into the app itself — version, uptime, memory. Marco should not have to ask Lisa what is deployed.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Update /health endpoint in src/index.js</SectionLabel>
            <CodeBlock>{`app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    version: process.env.APP_VERSION || 'unknown',
    environment: process.env.NODE_ENV || 'unknown',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
  })
})`}</CodeBlock>
          </div>
          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask2Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>Health endpoint exposes operational metadata</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="03" title="Create a runbook entry for the orders service" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">A runbook written by the developer who built the feature is more useful than one written by the ops engineer who had to debug it at 2am.</span>{" "}Write it now, before anything goes wrong.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to docs/runbook.md</SectionLabel>
            <CodeBlock>{`## Orders Service

### Owner
Dev team (code) + Ops team (infrastructure)

### Key endpoints
- GET /api/orders — returns paginated order list
- POST /api/orders/discount — applies discount to order

### Known failure modes
- Memory leak if orders array grows unbounded — add pagination (M-11)
- Slow response if no pagination limit — default limit is 50

### Alerts
- p95 latency > 200ms: check pagination, check memory via /health
- Error rate > 1%: check /api/alerts endpoint

### Escalation
1. Check /health for memory and uptime
2. Check /api/alerts for error rate
3. Check recent deploys
4. Page dev team if unresolved after 30 minutes`}</CodeBlock>
          </div>
          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask3Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>Runbook entry written by developer — operational knowledge in the repo</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="04" title="Add a memory leak test" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">The memory leak Marco fixed repeatedly was never caught by a test.</span>{" "}Operational concerns are testable. Add a test that would have caught it before it reached Marco&apos;s 2am alert.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add src/__tests__/integration/memory.test.js</SectionLabel>
            <CodeBlock>{`const request = require('supertest')
const app = require('../../index')

test('GET /health memory usage stays stable under load', async () => {
  // Make 100 requests
  for (let i = 0; i < 100; i++) {
    await request(app).get('/api/orders')
  }

  const healthRes = await request(app).get('/health')
  const memoryMB = healthRes.body.memory.heapUsed / 1024 / 1024

  console.log(\`Heap after 100 requests: \${memoryMB.toFixed(2)}MB\`)
  expect(memoryMB).toBeLessThan(100) // Fail if heap exceeds 100MB
})`}</CodeBlock>
          </div>
          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask4Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>Memory leak test added — operational concern is now a test</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="05" title="Commit and push" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">Ownership is explicit. The app speaks for itself. The runbook is in the repo. The memory leak test will never let Marco fix the same bug twice.</span></p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push all changes</SectionLabel>
            <CodeBlock>{`git add .github/ docs/ src/__tests__/ src/index.js
git commit -m 'feat: CODEOWNERS, operational health metadata, orders runbook, memory leak test'
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
                <span className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>Pipeline is green</span>
              </label>
            </div>
          )}
        </TaskCard>

        {allDone && (
          <div className="flex flex-col gap-5 border p-6" style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(34,197,94,0.5)", borderLeft: "3px solid rgb(34,197,94)" }}>
            <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>✓ Ownership is explicit. The wall between Dev and Ops is gone. You build it. You run it. You own it.</p>
            <a href="?phase=4" className="self-start px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}>See your impact →</a>
          </div>
        )}
      </div>
    </div>
  )
}
