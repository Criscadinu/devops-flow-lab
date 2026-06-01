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
            Your Mission - Get on the Trunk
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Audit your branches, protect main, practice a short-lived branch cycle, and hide incomplete work behind a feature flag.
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
              This mission builds on M-07. Your repo should have a commit convention and small-batch habits in place.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>01</span>
            <p className="text-white text-sm font-bold flex-1" style={syne.style}>
              nexus-corp-app with CONTRIBUTING.md and commit convention from M-07
            </p>
            <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
          </div>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="Audit your current branches" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Before changing how you branch, understand what you have.</span>{" "}
              List every branch, its age, and what is blocking it from merging.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>List all branches and their history</SectionLabel>
            <CodeBlock>{`git branch -a
git log --oneline --graph --all | head -20`}</CodeBlock>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create BRANCH-AUDIT.md at the repo root</SectionLabel>
            <CodeBlock>{`# Branch Audit

## Active branches
| Branch | Age | Last commit | Status |
|--------|-----|-------------|--------|
| main   | ... | ...         | active |

## Finding
Are any branches older than 1 day? What is blocking them from merging?`}</CodeBlock>
          </div>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask1Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Branch audit complete
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Enable branch protection on main" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Trunk-based development does not mean unprotected main.</span>{" "}
              It means fast, frequent, protected merges. Branch protection ensures every commit to main has passed CI.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>On GitHub: Settings → Branches → Add rule</SectionLabel>
            <div
              className="flex flex-col gap-3 p-4 border"
              style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }}
            >
              {[
                "Branch name pattern: main",
                "Require status checks to pass before merging: ✓",
                "Status check: test",
                "Do not allow bypassing the above settings: ✓",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "rgb(6,182,212)" }}>→</span>
                  <p className="text-xs font-mono text-gray-400">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Branch protection enabled — nothing merges to main without green CI
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Create a short-lived branch, commit, and merge within the hour" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The discipline of trunk-based development is practiced, not declared.</span>{" "}
              Create a branch, make one change, open a PR, merge it. The whole cycle should take less than an hour.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Full short-lived branch cycle</SectionLabel>
            <CodeBlock>{`git checkout -b feat/add-order-count-endpoint
# Make one small change
git add .
git commit -m 'feat: add GET /api/orders/count endpoint'
git push origin feat/add-order-count-endpoint
# Open PR, wait for CI, merge`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">
              The branch name describes one thing. The PR has one commit. CI runs and goes green. You merge and delete the branch. The whole cycle takes minutes.
            </p>
          </div>

          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask3Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Branch created, PR opened, CI green, merged to main — all within one hour
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Add a feature flag to hide incomplete work" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">If you have work in progress that is not ready for users, it should be behind a flag — not on a branch.</span>{" "}
              Commit it to main, hide it with a flag, finish it safely.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to src/index.js</SectionLabel>
            <CodeBlock>{`// Feature flag — incomplete feature hidden from users
if (process.env.ENABLE_ORDER_EXPORT === 'true') {
  app.get('/api/orders/export', (req, res) => {
    res.json({ status: 'coming soon' })
  })
}`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">
              The code is in main. The feature is invisible in production. You can iterate on it freely without a long-lived branch.
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
                Incomplete feature is behind a flag, not a branch
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 5 */}
        <TaskCard number="05" title="Commit and push" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The branch audit, the protection rules, and the feature flag are now permanent.</span>{" "}
              Nexus Corp is on one trunk. Long-lived branches are no longer the default.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push all changes</SectionLabel>
            <CodeBlock>{`git add BRANCH-AUDIT.md src/index.js
git commit -m 'docs: branch audit and feature flag for incomplete work'
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
              ✓ One trunk. Protected. Everyone on it. Incomplete work is behind a flag, not a branch.
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
