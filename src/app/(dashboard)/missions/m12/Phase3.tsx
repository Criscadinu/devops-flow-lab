"use client"

import { useState, useEffect } from "react"
import { Syne } from "next/font/google"

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

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
    <div className="flex flex-col gap-3 p-5 border mb-6" style={{ backgroundColor: "#0a0700", borderColor: "rgba(251,146,60,0.4)", borderLeft: "3px solid rgb(251,146,60)" }}>
      <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>Desktop required</p>
      <p className="text-sm text-gray-400 leading-relaxed">This phase requires a terminal, a code editor, and GitHub. These tasks cannot be completed on a mobile device. Open this page on your laptop or desktop to continue.</p>
    </div>
  )
}

function TaskCard({ number, title, done, locked, children }: { number: string; title: string; done: boolean; locked: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 p-6 border" style={{ backgroundColor: locked ? "#050505" : done ? "#060f06" : "#080808", borderColor: locked ? "rgb(31,41,55)" : done ? "rgba(34,197,94,0.4)" : "rgba(6,182,212,0.4)", borderLeft: locked ? "3px solid rgb(31,41,55)" : done ? "3px solid rgb(34,197,94)" : "3px solid rgb(6,182,212)", opacity: locked ? 0.45 : 1, pointerEvents: locked ? "none" : "auto" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold" style={{ color: locked ? "rgb(75,85,99)" : done ? "rgb(34,197,94)" : "rgb(6,182,212)" }}>{number}</span>
          <h3 className="text-white text-base" style={{ ...syne.style, fontWeight: 700 }}>{title}</h3>
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
    <div className="flex gap-3 p-4 border" style={{ backgroundColor: "#0a0a0a", borderColor: "rgba(6,182,212,0.15)", borderLeft: "3px solid rgba(6,182,212,0.5)" }}>
      <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "rgb(6,182,212)" }}>//</span>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(75,85,99)" }}>{children}</p>
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="text-xs font-mono leading-relaxed p-4 overflow-x-auto" style={{ backgroundColor: "#0d0d0d", borderLeft: "3px solid rgb(31,41,55)", color: "rgb(156,163,175)" }}>
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
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>Your Mission - Wire the Quality Gates</h2>
          <p className="text-gray-500 text-sm leading-relaxed">Run npm audit, add it to CI, set a coverage threshold, and add a secrets scanner.</p>
        </div>

        <div className="flex flex-col gap-5 p-6 border" style={{ backgroundColor: "#0a0700", borderColor: "rgba(251,146,60,0.3)", borderLeft: "3px solid rgb(251,146,60)" }}>
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>Before you start</p>
          <p className="text-gray-400 text-sm leading-relaxed">This mission builds on M-11. Performance tests should already be wired into CI for pull requests.</p>
        </div>

        <TaskCard number="01" title="Run npm audit and fix vulnerabilities" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">Start with what you have.</span>{" "}npm audit shows every known vulnerability in your dependency tree. Fix the high and critical ones before adding automated checks — you cannot gate on a clean audit if you have not achieved one.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Audit and fix</SectionLabel>
            <CodeBlock>{`npm audit
npm audit fix
npm audit --audit-level=high`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">If npm audit fix does not resolve all issues, a major version upgrade may be needed: npm audit fix --force</p>
          </div>
          <div className="flex flex-col gap-2">
            <SectionLabel>Record results in SECURITY-BASELINE.md</SectionLabel>
            <CodeBlock>{`# Security Baseline

## npm audit results (before)
- Critical: X
- High: X
- Moderate: X

## npm audit results (after fix)
- Critical: 0
- High: 0`}</CodeBlock>
          </div>
          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask1Done(true) }} className="w-4 h-4 accent-cyan-400 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">npm audit clean — no high or critical vulnerabilities</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="02" title="Add npm audit to CI pipeline" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">Running npm audit manually is a suggestion. Running it in CI is a gate.</span>{" "}Every new dependency that ships a vulnerability will fail the build automatically.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to .github/workflows/ci.yml</SectionLabel>
            <CodeBlock>{`security:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
    - run: npm ci
    - run: npm audit --audit-level=high`}</CodeBlock>
          </div>
          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask2Done(true) }} className="w-4 h-4 accent-cyan-400 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">npm audit runs in CI — high/critical vulnerabilities fail the build</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="03" title="Add a code coverage threshold" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">Code coverage is a non-functional requirement.</span>{" "}A threshold in CI ensures the test suite does not shrink as the codebase grows. Set it now, while coverage is still reasonable.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Update jest configuration in package.json</SectionLabel>
            <CodeBlock>{`"jest": {
  "coverageThreshold": {
    "global": {
      "lines": 70,
      "functions": 70,
      "branches": 60
    }
  }
}`}</CodeBlock>
          </div>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add coverage step to CI</SectionLabel>
            <CodeBlock>{`- name: Test with coverage
  run: npm test -- --coverage`}</CodeBlock>
          </div>
          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask3Done(true) }} className="w-4 h-4 accent-cyan-400 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Coverage threshold set — build fails if coverage drops below 70%</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="04" title="Add a secrets scanner" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">Secrets committed to Git cannot be uncommitted.</span>{" "}Once a secret is in the history, it must be rotated. Prevention is far cheaper than remediation.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to .github/workflows/ci.yml</SectionLabel>
            <CodeBlock>{`- name: Scan for secrets
  uses: trufflesecurity/trufflehog@main
  with:
    path: ./
    base: main
    head: HEAD`}</CodeBlock>
          </div>
          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask4Done(true) }} className="w-4 h-4 accent-cyan-400 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Secrets scanner runs in CI — committed secrets fail the build</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="05" title="Commit and push" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">The six-month-old vulnerability would have been caught on day one.</span>{" "}The pipeline now enforces security, coverage, and secret hygiene automatically.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push all changes</SectionLabel>
            <CodeBlock>{`git add .github/ package.json SECURITY-BASELINE.md
git commit -m 'feat: npm audit in CI, coverage threshold, secrets scanner'
git push`}</CodeBlock>
          </div>
          {!task5Done && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <SectionLabel>Paste your green Actions run URL</SectionLabel>
                <input type="url" value={actionsUrl} onChange={(e) => setActionsUrl(e.target.value)} placeholder="https://github.com/your-username/nexus-corp-app/actions/runs/..." className="w-full px-3 py-2 text-sm font-mono text-white outline-none border" style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }} />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" onChange={(e) => { if (e.target.checked && actionsUrl.includes("github.com")) setTask5Done(true) }} className="w-4 h-4 accent-cyan-400 cursor-pointer" />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Pipeline is green — NFR gates active</span>
              </label>
            </div>
          )}
        </TaskCard>

        {allDone && (
          <div className="flex flex-col gap-5 border p-6" style={{ backgroundColor: "#060f06", borderColor: "rgba(34,197,94,0.3)", borderLeft: "3px solid rgb(34,197,94)" }}>
            <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>✓ The quality gates are active. Security, coverage, and secret hygiene are enforced automatically on every commit.</p>
            <a href="?phase=4" className="self-start px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}>See your impact →</a>
          </div>
        )}
      </div>
    </div>
  )
}
