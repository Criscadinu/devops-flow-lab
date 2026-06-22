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
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Your Mission - Test Under Load</h2>
          <p className="text-gray-500 text-sm leading-relaxed">Measure the baseline, write a load test, add it to CI, and fix one performance problem.</p>
        </div>

        <div className="flex flex-col gap-5 p-6 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(251,146,60,0.3)", borderLeft: "3px solid rgb(251,146,60)" }}>
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>Before you start</p>
          <p className="text-gray-400 text-sm leading-relaxed">This mission builds on M-10. Your release checklist should be automated as integration tests.</p>
        </div>

        <TaskCard number="01" title="Establish a performance baseline" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">Before you can detect regressions, you need a baseline.</span>{" "}Measure your current response times and record them. You cannot alert on what you have not measured.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Install autocannon and run a baseline</SectionLabel>
            <CodeBlock>{`npm install --save-dev autocannon

# Start your app
docker compose up prod &
sleep 3

# Baseline measurement
npx autocannon -c 10 -d 10 http://localhost:3002/api/orders`}</CodeBlock>
          </div>
          <div className="flex flex-col gap-2">
            <SectionLabel>Record results in PERFORMANCE-BASELINE.md</SectionLabel>
            <CodeBlock>{`# Performance Baseline

## GET /api/orders (10 concurrent, 10 seconds)
- p50 latency: Xms
- p95 latency: Xms
- p99 latency: Xms
- Requests/sec: X

## Thresholds (fail build if exceeded)
- p95 latency > 200ms: FAIL
- Error rate > 1%: FAIL`}</CodeBlock>
          </div>
          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask1Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Performance baseline recorded</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="02" title="Write a performance test script" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">A performance test in a script can run in CI. An ad-hoc terminal command cannot.</span>{" "}The script defines the threshold. The CI enforces it.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Create src/__tests__/performance/load.test.js</SectionLabel>
            <CodeBlock>{`const autocannon = require('autocannon')

test('GET /api/orders p95 latency under 200ms', async () => {
  const result = await autocannon({
    url: 'http://localhost:3000/api/orders',
    connections: 10,
    duration: 5,
  })

  const p95 = result.latency.p97_5
  console.log(\`p95 latency: \${p95}ms\`)
  expect(p95).toBeLessThan(200)
}, 30000)`}</CodeBlock>
          </div>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to package.json scripts</SectionLabel>
            <CodeBlock>{`"test:performance": "jest --testPathPattern=performance --testTimeout=60000"`}</CodeBlock>
          </div>
          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask2Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Performance test script written</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="03" title="Add performance test to CI (on PR only)" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">Performance tests are slower than unit tests. Run them on PRs, not on every commit.</span>{" "}This keeps the fast gate fast while still catching regressions before merge.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to .github/workflows/ci.yml</SectionLabel>
            <CodeBlock>{`performance-tests:
  runs-on: ubuntu-latest
  if: github.event_name == 'pull_request'
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
    - run: npm ci
    - run: npm start &
    - run: sleep 3
    - run: npm run test:performance`}</CodeBlock>
          </div>
          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask3Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Performance tests run in CI on PRs</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="04" title="Find and fix one performance problem" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">The goal is not just to measure — it is to improve.</span>{" "}Find one slow endpoint and optimize it. The orders endpoint returning all 47,000 records is a good starting point.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add pagination to /api/orders in src/index.js</SectionLabel>
            <CodeBlock>{`// Before: returns all orders
app.get('/api/orders', (req, res) => {
  res.json(orders)
})

// After: supports pagination
app.get('/api/orders', (req, res) => {
  const limit = parseInt(req.query.limit) || 50
  const offset = parseInt(req.query.offset) || 0
  res.json({
    orders: orders.slice(offset, offset + limit),
    total: orders.length,
    limit,
    offset,
  })
})`}</CodeBlock>
          </div>
          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask4Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">One performance improvement implemented and verified</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="05" title="Commit and push" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">The baseline is recorded. The threshold is set. The pipeline will catch the next regression.</span>{" "}Customers are no longer the load testers.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push all changes</SectionLabel>
            <CodeBlock>{`git add src/__tests__/performance/ .github/ package.json PERFORMANCE-BASELINE.md
git commit -m 'feat: performance baseline, load test script, pagination optimization'
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
                <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Pipeline is green</span>
              </label>
            </div>
          )}
        </TaskCard>

        {allDone && (
          <div className="flex flex-col gap-5 border p-6" style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(34,197,94,0.5)", borderLeft: "3px solid rgb(34,197,94)" }}>
            <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>✓ Baseline recorded. Threshold set. One regression fixed. The pipeline now catches what production used to catch.</p>
            <a href="?phase=4" className="self-start px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}>See your impact →</a>
          </div>
        )}
      </div>
    </div>
  )
}
