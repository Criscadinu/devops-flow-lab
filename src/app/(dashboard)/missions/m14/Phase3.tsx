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
            Your Mission - Shrink the Batch
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Audit your commit size, practice splitting a change into two commits, document the convention, and wire a diff-size warning.
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
              This mission builds on M-07. Your repo should have ESLint and a unit test in place.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>01</span>
            <p className="text-white text-sm font-bold flex-1" style={syne.style}>
              nexus-corp-app with lint and unit tests from M-07
            </p>
            <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
          </div>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="Audit your last three commits" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Before changing how you work, understand how you currently work.</span>{" "}
              Look at your last three commits and measure the batch size.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Check commit history and diff stats</SectionLabel>
            <CodeBlock>{`git log --oneline -10
git diff HEAD~3 HEAD --stat`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">
              Count the lines changed per commit. If any commit has more than 400 lines changed, it was a large batch.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create BATCH-AUDIT.md at the repo root</SectionLabel>
            <CodeBlock>{`# Batch Size Audit

## Last 3 commits
| Commit | Description | Lines changed |
|--------|-------------|---------------|
| abc123 | ... | ... |

## Finding
Were any commits large batches (>400 lines)? What could have been split?`}</CodeBlock>
          </div>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask1Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Batch audit complete — I know my current batch size
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Split a large change into two commits" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The skill of splitting work is the core of small batch development.</span>{" "}
              Take one planned change and deliberately split it into two: the infrastructure first, the behavior second.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Commit 1 — infrastructure (stub + failing test)</SectionLabel>
            <CodeBlock>{`# Add the new function signature with a stub implementation
# Add the test that currently fails
git add src/orders.js src/__tests__/orders.test.js
git commit -m 'feat: add getOrdersByStatus stub and failing test'`}</CodeBlock>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Commit 2 — behavior (implementation, test now passes)</SectionLabel>
            <CodeBlock>{`# Implement the function so the test passes
git add src/orders.js
git commit -m 'feat: implement getOrdersByStatus — test now passes'`}</CodeBlock>
          </div>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                I made two commits instead of one — infrastructure first, behavior second
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Add commit message convention to CONTRIBUTING.md" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A commit message convention makes batch size visible in the log.</span>{" "}
              Conventional commits force you to categorize each change — if you cannot describe it in one line, the batch is probably too large.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to CONTRIBUTING.md</SectionLabel>
            <CodeBlock>{`## Commit message format
Use conventional commits:
- feat: a new feature
- fix: a bug fix
- refactor: code change that neither fixes a bug nor adds a feature
- test: adding or updating tests
- docs: documentation only
- chore: maintenance

One logical change per commit. If your commit message needs "and", split it.`}</CodeBlock>
          </div>

          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask3Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Commit convention documented in CONTRIBUTING.md
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Set up a pre-commit hook that warns on large diffs" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A pre-commit hook that warns when a diff is large makes the cost of large batches visible before you commit.</span>
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create .git/hooks/pre-commit</SectionLabel>
            <CodeBlock>{`#!/bin/sh
LINES=$(git diff --cached --stat | tail -1 | grep -o '[0-9]* insertion' | grep -o '[0-9]*')
if [ -n "$LINES" ] && [ "$LINES" -gt 400 ]; then
  echo "Warning: This commit changes $LINES lines. Consider splitting it."
fi`}</CodeBlock>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Make it executable</SectionLabel>
            <CodeBlock>{`chmod +x .git/hooks/pre-commit`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">
              The hook warns but does not block — the goal is awareness, not enforcement. You can always commit anyway.
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
                Pre-commit hook warns on large diffs
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 5 */}
        <TaskCard number="05" title="Commit and push" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The audit, the convention, and the habit are now permanent.</span>{" "}
              Every future engineer who joins Nexus Corp inherits a codebase where small batches are the documented norm.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push all changes</SectionLabel>
            <CodeBlock>{`git add BATCH-AUDIT.md CONTRIBUTING.md
git commit -m 'docs: add batch audit and commit convention'
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
                  Pipeline is green
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
              ✓ The batch is smaller. The convention is documented. The habit is wired in.
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
