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
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Your Mission - Speed Up the Tests</h2>
          <p className="text-gray-500 text-sm leading-relaxed">Measure, categorize, parallelize, and prove the pipeline is fast.</p>
        </div>

        <div className="flex flex-col gap-5 p-6 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(251,146,60,0.3)", borderLeft: "3px solid rgb(251,146,60)" }}>
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>Before you start</p>
          <p className="text-gray-400 text-sm leading-relaxed">This mission builds on M-07. Your repo should have ESLint and a unit test for sortOrders in place.</p>
        </div>

        <TaskCard number="01" title="Measure your current test suite speed" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">You cannot optimize what you do not measure.</span>{" "}Time your test suite and record it as a baseline before making any changes.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Time the full suite</SectionLabel>
            <CodeBlock>{`time npm test`}</CodeBlock>
          </div>
          <div className="flex flex-col gap-2">
            <SectionLabel>Create TEST-PERFORMANCE.md</SectionLabel>
            <CodeBlock>{`# Test Performance Baseline

## Current suite
- Total tests: X
- Sequential runtime: X seconds
- Slowest test: X (run \`npm test -- --verbose\`)

## Target
- Runtime under 60 seconds locally
- Runtime under 3 minutes in CI`}</CodeBlock>
          </div>
          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask1Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Test performance baseline recorded</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="02" title="Identify and fix slow tests" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">One slow test can dominate the entire suite.</span>{" "}Find it and fix it before parallelizing — parallelization amplifies problems, it does not fix them.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Find the slowest tests</SectionLabel>
            <CodeBlock>{`npm test -- --verbose 2>&1 | grep -E "✓|✗|ms"`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">Look for any test taking more than 500ms. Common causes: unnecessary setTimeout, real HTTP calls, large data fixtures. Refactor to use a mock or reduce the data size.</p>
          </div>
          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask2Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Slowest tests identified — at least one optimized</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="03" title="Split tests into fast and slow categories" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">Categorizing tests lets you run the fast gate first and fail quickly on obvious errors.</span>{" "}Unit tests should take seconds. Integration tests can take minutes.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add test scripts to package.json</SectionLabel>
            <CodeBlock>{`"scripts": {
  "test": "jest",
  "test:unit": "jest --testPathPattern=unit",
  "test:integration": "jest --testPathPattern=integration"
}`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">Move existing tests into src/__tests__/unit/ and src/__tests__/integration/ folders to match the pattern.</p>
          </div>
          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask3Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Tests split into unit and integration categories</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="04" title="Add parallel test execution to CI" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">GitHub Actions supports running jobs in parallel.</span>{" "}Split your test categories into separate jobs that run simultaneously instead of sequentially.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Update .github/workflows/ci.yml</SectionLabel>
            <CodeBlock>{`jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:unit

  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:integration`}</CodeBlock>
          </div>
          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask4Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">CI runs unit and integration tests in parallel</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="05" title="Commit and push" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">The performance baseline, the test categories, and the parallel CI are now permanent.</span>{" "}Every future engineer on this repo inherits fast feedback by default.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push all changes</SectionLabel>
            <CodeBlock>{`git add .github/ package.json src/__tests__/ TEST-PERFORMANCE.md
git commit -m 'feat: parallel test execution, fast/slow test split, performance baseline'
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
                <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Pipeline is green — tests run in parallel</span>
              </label>
            </div>
          )}
        </TaskCard>

        {allDone && (
          <div className="flex flex-col gap-5 border p-6" style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(34,197,94,0.5)", borderLeft: "3px solid rgb(34,197,94)" }}>
            <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>✓ The pipeline is fast. The feedback loop is tight. Engineers will run tests locally again.</p>
            <a href="?phase=4" className="self-start px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}>See your impact →</a>
          </div>
        )}
      </div>
    </div>
  )
}
