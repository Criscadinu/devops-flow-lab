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
  const [postmortemUrl, setPostmortemUrl] = useState("")
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
            Your Mission - Build the Postmortem Process
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Create a postmortem template, write a real postmortem for a past incident, link it to your runbook, and expose it through an API endpoint.
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
              This mission builds on your M-18 work. Both items should already be ready.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>01</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                Branch protection and PR process in place from M-18
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              Your nexus-corp-app fork has branch protection enabled, a PR template, and a CONTRIBUTING.md. All changes go through PRs.
            </p>

            <div style={{ borderTop: "1px solid rgb(31,41,55)" }} />

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>02</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                Runbook committed to the repo from M-16
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              Your RUNBOOK.md is already in the repo from M-16. This postmortem will link back to it.
            </p>
          </div>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="Create a postmortem template" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A template enforces consistency across every incident.</span>{" "}
              Without a template, postmortems are written differently every time — or not at all.
              A standard format means every postmortem answers the same questions, making them
              comparable, searchable, and actually useful for preventing recurrence.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create docs/postmortem-template.md in the nexus-corp-app repo</SectionLabel>
            <CodeBlock>{`# Postmortem: [Incident Title]

**Date:** YYYY-MM-DD
**Severity:** P1 / P2 / P3
**Duration:** HH:MM — HH:MM (X minutes)
**Author:** @your-handle

---

## Summary
One paragraph. What broke, for how long, and what the impact was.

## Timeline
| Time (UTC) | Event |
|------------|-------|
| HH:MM | First alert fired |
| HH:MM | On-call engineer paged |
| HH:MM | Root cause identified |
| HH:MM | Fix deployed |
| HH:MM | Service restored |

## Root Cause
What actually caused the incident. Be specific — not "human error" but exactly what decision or
condition led to the failure.

## Contributing Factors
- Factor 1
- Factor 2

## Impact
- Users affected: ~N
- Duration: X minutes
- Services impacted: list them

## What Went Well
- Monitoring caught it quickly
- Runbook was accurate
- Communication was clear

## What Went Poorly
- Root cause took too long to identify
- Alert threshold was too high

## Action Items
| Action | Owner | Due |
|--------|-------|-----|
| Add test for this failure mode | @engineer | YYYY-MM-DD |
| Update runbook with new step | @ops | YYYY-MM-DD |

## Runbook Reference
[RUNBOOK.md — Section X](./RUNBOOK.md#section-x)`}</CodeBlock>
          </div>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask1Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                docs/postmortem-template.md is created and committed to the repo
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Write a real postmortem" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A postmortem is only valuable when it is written for a real incident.</span>{" "}
              Use the health endpoint outage from M-18 — the one caused by Lisa&apos;s direct push to main.
              Fill in the template completely. The timeline, the root cause, the contributing factors,
              the action items. This is a permanent record that future engineers can learn from.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create docs/postmortems/2024-health-endpoint-outage.md</SectionLabel>
            <p className="text-xs text-gray-600 leading-relaxed">
              Use the M-18 incident: direct push to main broke the health endpoint. Fill in every section
              of the template. Action items should include &ldquo;enable branch protection&rdquo; — which you&apos;ve
              already done. That&apos;s the point: postmortems drive the process changes that prevent recurrence.
            </p>
          </div>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                A complete postmortem is written and committed to docs/postmortems/
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Link the postmortem from your runbook" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Runbooks and postmortems reinforce each other.</span>{" "}
              The runbook tells you what to do when an incident happens. The postmortem explains
              what you learned. Linking them creates a feedback loop: every update to the runbook
              can point to the incident that motivated it.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add a &ldquo;Related Postmortems&rdquo; section to RUNBOOK.md</SectionLabel>
            <CodeBlock>{`## Related Postmortems

Incidents that led to updates in this runbook:

| Date | Incident | Postmortem |
|------|----------|------------|
| 2024-XX-XX | Health endpoint 500s after direct push to main | [docs/postmortems/2024-health-endpoint-outage.md](./docs/postmortems/2024-health-endpoint-outage.md) |`}</CodeBlock>
          </div>

          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask3Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                RUNBOOK.md has a Related Postmortems section linking to the incident
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Expose postmortems through /api/postmortems" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Postmortems should be as accessible as metrics.</span>{" "}
              Exposing them through an API endpoint means they are observable — tooling can read them,
              dashboards can link them, and the learning is not locked in a folder nobody checks.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create app/api/postmortems/route.ts</SectionLabel>
            <CodeBlock>{`import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    postmortems: [
      {
        id: 'pm-001',
        date: '2024-XX-XX',
        title: 'Health endpoint 500s after direct push to main',
        severity: 'P2',
        duration_minutes: 20,
        root_cause: 'Direct push to main bypassed CI; unintended import broke health endpoint',
        status: 'resolved',
        runbook: '/RUNBOOK.md',
        document: '/docs/postmortems/2024-health-endpoint-outage.md',
      },
    ],
  })
}`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">
              Commit and push via PR. After merge, verify: <span className="font-mono text-gray-500">curl https://your-app.onrender.com/api/postmortems</span>
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
                /api/postmortems returns postmortem data in production
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 5 */}
        <TaskCard number="05" title="Commit, push via PR, and verify CI" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The postmortem process must itself follow the review process.</span>{" "}
              Push all changes through a PR — not directly to main. This is the practice you documented.
              Follow it even for docs. The habit matters more than any individual change.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Push all changes through a PR to main</SectionLabel>
            <CodeBlock>{`git checkout -b feat/postmortem-process
git add docs/ RUNBOOK.md app/api/postmortems/
git commit -m 'feat: add postmortem template, first postmortem, and /api/postmortems'
git push origin feat/postmortem-process`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">
              Open a PR. Fill in the PR template. Wait for CI. Merge to main.
            </p>
          </div>

          {!task5Done && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <SectionLabel>Paste your green Actions run URL for the merged PR</SectionLabel>
                <input
                  type="url"
                  value={actionsUrl}
                  onChange={(e) => setActionsUrl(e.target.value)}
                  placeholder="https://github.com/your-username/nexus-corp-app/actions/runs/..."
                  className="w-full px-3 py-2 text-sm font-mono text-white outline-none border"
                  style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <SectionLabel>Paste your live /api/postmortems URL</SectionLabel>
                <input
                  type="url"
                  value={postmortemUrl}
                  onChange={(e) => setPostmortemUrl(e.target.value)}
                  placeholder="https://your-app.onrender.com/api/postmortems"
                  className="w-full px-3 py-2 text-sm font-mono text-white outline-none border"
                  style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }}
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked && actionsUrl.includes("github.com") && postmortemUrl.includes("http")) setTask5Done(true)
                  }}
                  className="w-4 h-4 accent-cyan-400 cursor-pointer"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  PR is merged, CI is green, /api/postmortems is live
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
              ✓ Postmortem process established. Incidents are now learning opportunities, not just outages.
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
