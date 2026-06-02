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
    <div
      className="flex flex-col gap-3 p-5 border mb-6"
      style={{
        backgroundColor: "#0a0700",
        borderColor: "rgba(251,146,60,0.4)",
        borderLeft: "3px solid rgb(251,146,60)",
      }}
    >
      <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>
        Desktop required
      </p>
      <p className="text-sm text-gray-400 leading-relaxed">
        This phase requires a terminal, a code editor, and GitHub. These tasks cannot be completed on a mobile device. Open this page on your laptop or desktop to continue.
      </p>
    </div>
  )
}

function TaskCard({
  number,
  title,
  done,
  locked,
  children,
}: {
  number: string
  title: string
  done: boolean
  locked: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className="flex flex-col gap-5 p-6 border"
      style={{
        backgroundColor: locked ? "#050505" : done ? "#060f06" : "#080808",
        borderColor: locked
          ? "rgb(31,41,55)"
          : done
          ? "rgba(34,197,94,0.4)"
          : "rgba(6,182,212,0.4)",
        borderLeft: locked
          ? "3px solid rgb(31,41,55)"
          : done
          ? "3px solid rgb(34,197,94)"
          : "3px solid rgb(6,182,212)",
        opacity: locked ? 0.45 : 1,
        pointerEvents: locked ? "none" : "auto",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-mono font-bold"
            style={{
              color: locked ? "rgb(75,85,99)" : done ? "rgb(34,197,94)" : "rgb(6,182,212)",
            }}
          >
            {number}
          </span>
          <h3 className="text-white text-base" style={{ ...syne.style, fontWeight: 700 }}>
            {title}
          </h3>
        </div>
        <div>
          {done && (
            <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>
              ✓ DONE
            </span>
          )}
          {locked && (
            <span className="text-xs font-mono text-gray-700">⊘ LOCKED</span>
          )}
        </div>
      </div>
      {!locked && <div className="flex flex-col gap-4">{children}</div>}
    </div>
  )
}

function MentorNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 border"
      style={{
        backgroundColor: "#0a0a0a",
        borderColor: "rgba(6,182,212,0.15)",
        borderLeft: "3px solid rgba(6,182,212,0.5)",
      }}
    >
      <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "rgb(6,182,212)" }}>
        //
      </span>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(75,85,99)" }}>
      {children}
    </p>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
      style={{
        backgroundColor: "#0d0d0d",
        borderLeft: "3px solid rgb(31,41,55)",
        color: "rgb(156,163,175)",
      }}
    >
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

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2
            className="text-3xl text-white tracking-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Your Mission - Build the Learning Culture
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Write a TIL, create an ADR, document your learning practices, expose them through an API, and commit it all to version control.
          </p>
        </div>

        {/* Prerequisites */}
        <div
          className="flex flex-col gap-5 p-6 border"
          style={{
            backgroundColor: "#0a0700",
            borderColor: "rgba(251,146,60,0.3)",
            borderLeft: "3px solid rgb(251,146,60)",
          }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>
              Before you start
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              This mission builds on your M-25 work. Both items should already be ready.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>01</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                Postmortem process in place from M-25
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              Your nexus-corp-app fork has a postmortem template, a completed postmortem, and /api/postmortems live.
            </p>

            <div style={{ borderTop: "1px solid rgb(31,41,55)" }} />

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>02</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                docs/ folder already exists with postmortems and runbook
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              The docs/ folder structure from M-17 and M-25 is already in place. You will add til/ and adr/ subdirectories.
            </p>
          </div>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="Write your first TIL" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A TIL does not need to be profound. It needs to be written.</span>{" "}
              The discipline of writing down what you learned — even something small — is what separates
              teams that compound knowledge from teams that repeat mistakes.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create docs/til/2024-01-race-condition-orders.md</SectionLabel>
            <CodeBlock>{`# TIL: Race Condition in Orders Service

**Date:** 2024-01-22
**Author:** Lisa
**Time to fix:** 3 hours

## What happened
The /api/orders endpoint occasionally returned duplicate entries when two
requests arrived within the same millisecond. The issue only appeared under load.

## Root cause
The endpoint read from the orders array and wrote to it in two separate
operations. Between the read and the write, a second request could read
the same stale state.

## Fix
Wrap the read-modify-write operation in a mutex or use an atomic operation.
In this case, filter the array in a single pass:

\`\`\`javascript
// Before (race condition)
const existing = orders.find(o => o.id === newOrder.id)
if (!existing) orders.push(newOrder)

// After (atomic)
if (!orders.some(o => o.id === newOrder.id)) {
  orders.push(newOrder)
}
\`\`\`

## Remember next time
Any read-modify-write on shared state is a potential race condition.
If the operation is not atomic, it is not safe under concurrent load.`}</CodeBlock>
          </div>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask1Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                docs/til/2024-01-race-condition-orders.md is created
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Write an ADR for a past decision" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">An ADR captures the why behind a technical decision.</span>{" "}
              Without it, future engineers see the what but not the why — and they will reverse good decisions
              because they do not understand the tradeoffs that were already considered.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create docs/adr/001-use-environment-variables-for-feature-flags.md</SectionLabel>
            <CodeBlock>{`# ADR 001: Use Environment Variables for Feature Flags

**Date:** 2024-01-22
**Status:** Accepted
**Author:** [Your name]

## Context
We need a way to deploy features dark and enable them without a code deploy.
We considered three options: environment variables, a feature flag service
(LaunchDarkly, Unleash), and a database-backed flag system.

## Decision
We will use environment variables for feature flags.

## Reasons
- Zero dependencies — no external service to configure, pay for, or go down
- Already in use for configuration — the pattern is familiar to the team
- Sufficient for current scale — we deploy from Docker Compose, env vars
  are trivial to change
- Changing a flag requires a restart, not a deploy — acceptable for our
  current deploy frequency

## Tradeoffs
- Cannot change flags without a service restart
- No flag history or audit trail
- Does not scale to per-user targeting

## Revisit when
Traffic exceeds 10,000 daily active users or when per-user targeting is needed.`}</CodeBlock>
          </div>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                docs/adr/001-use-environment-variables-for-feature-flags.md is created
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Add a learning practices section to the runbook" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A learning culture needs a home.</span>{" "}
              Adding a weekly learning practice to the runbook makes it a process, not a suggestion.
              The runbook is where the team&apos;s agreements live — if it is not there, it is optional.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add this section to the end of RUNBOOK.md</SectionLabel>
            <CodeBlock>{`## Learning Practices

### Weekly TIL
Every Friday, each engineer posts one thing they learned this week to the team channel.
Format: What was the problem? What was the fix? What should we remember?
File it in docs/til/ if it is worth preserving.

### Pre-mortem
Before shipping a major feature, the team spends 15 minutes asking: what could go wrong?
Write the answers down. Use them to inform the rollout plan.

### ADR
When a significant technical decision is made, write an ADR in docs/adr/.
Future engineers should never have to guess why something was built the way it was.`}</CodeBlock>
          </div>

          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask3Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Learning practices section added to RUNBOOK.md
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Add a /api/learning endpoint" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Making the team&apos;s learning artifacts discoverable via API means they can be surfaced in dashboards and tooling.</span>{" "}
              It also signals that learning is a first-class engineering output — not something that happens
              in a Slack thread and disappears.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to src/index.js</SectionLabel>
            <CodeBlock>{`const learningArtifacts = [
  {
    type: 'til',
    title: 'Race Condition in Orders Service',
    author: 'Lisa',
    date: '2024-01-22',
    path: 'docs/til/2024-01-race-condition-orders.md',
  },
  {
    type: 'adr',
    title: 'ADR 001: Use Environment Variables for Feature Flags',
    author: 'Team',
    date: '2024-01-22',
    path: 'docs/adr/001-use-environment-variables-for-feature-flags.md',
  },
]

app.get('/api/learning', (req, res) => {
  res.json({
    total: learningArtifacts.length,
    artifacts: learningArtifacts,
  })
})`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">
              Commit and push via PR. After merge, verify: <span className="font-mono text-gray-500">curl https://your-app.onrender.com/api/learning</span>
            </p>
          </div>

          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask4Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                GET /api/learning returns learning artifacts
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 5 */}
        <TaskCard number="05" title="Commit and push — verify CI is green" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Learning artifacts in version control are learning artifacts that cannot be lost.</span>{" "}
              Every engineer who joins the team in the future starts with the accumulated knowledge
              of everyone who came before them.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Push all changes through a PR to main</SectionLabel>
            <CodeBlock>{`git add docs/ src/index.js
git commit -m 'feat: add TIL, ADR, learning practices, and /api/learning endpoint'
git push`}</CodeBlock>
          </div>

          {!task5Done && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <SectionLabel>Paste your green Actions run URL</SectionLabel>
                <input
                  type="url"
                  value={actionsUrl}
                  onChange={(e) => setActionsUrl(e.target.value)}
                  placeholder="https://github.com/your-username/nexus-corp-app/actions/runs/..."
                  className="w-full px-3 py-2 text-sm font-mono text-white outline-none border"
                  style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }}
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked && actionsUrl.includes("github.com")) setTask5Done(true)
                  }}
                  className="w-4 h-4 accent-cyan-400 cursor-pointer"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Pipeline is green — learning culture is version controlled
                </span>
              </label>
            </div>
          )}
        </TaskCard>

        {/* Success banner */}
        {allDone && (
          <div
            className="flex flex-col gap-5 border p-6"
            style={{
              backgroundColor: "#060f06",
              borderColor: "rgba(34,197,94,0.3)",
              borderLeft: "3px solid rgb(34,197,94)",
            }}
          >
            <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>
              ✓ Learning culture established. Individual discoveries are now team knowledge.
            </p>
            <a
              href="?phase=4"
              className="self-start px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}
            >
              See your impact →
            </a>
          </div>
        )}

      </div>
    </div>
  )
}
