"use client"

import { useState } from "react"


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
        backgroundColor: locked ? "var(--bg-card)" : done ? "rgba(34,197,94,0.08)" : "var(--bg)",
        borderColor: locked
          ? "rgb(31,41,55)"
          : done
          ? "rgba(34,197,94,0.4)"
          : "rgba(255,85,0,0.4)",
        borderLeft: locked
          ? "3px solid rgb(31,41,55)"
          : done
          ? "3px solid rgb(34,197,94)"
          : "3px solid rgb(255,85,0)",
        opacity: locked ? 0.45 : 1,
        pointerEvents: locked ? "none" : "auto",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-mono font-bold"
            style={{
              color: locked
                ? "rgb(75,85,99)"
                : done
                ? "rgb(34,197,94)"
                : "rgb(255,85,0)",
            }}
          >
            {number}
          </span>
          <h3 className="text-gray-900 text-base" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
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
        backgroundColor: "var(--bg)",
        borderColor: "rgba(255,85,0,0.15)",
        borderLeft: "3px solid rgba(255,85,0,0.5)",
      }}
    >
      <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "var(--af-orange)" }}>
        //
      </span>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}

function HintBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-3 p-4 border"
      style={{
        backgroundColor: "rgba(255,85,0,0.06)",
        borderColor: "rgba(234,179,8,0.2)",
        borderLeft: "3px solid rgba(234,179,8,0.6)",
      }}
    >
      <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "rgb(234,179,8)" }}>
        ?
      </span>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
      {children}
    </p>
  )
}

export function Phase3() {
  const [prereq1Done] = useState(true) // fork from M-02, assumed done
  const [prereq2Done, setPrereq2Done] = useState(false)

  const [task1Done, setTask1Done] = useState(false)
  const [task2Done, setTask2Done] = useState(false)
  const [task3Done, setTask3Done] = useState(false)
  const [task4Done, setTask4Done] = useState(false)

  const [actionsUrl, setActionsUrl] = useState("")

  const prereqsDone = prereq1Done && prereq2Done
  const allDone = task1Done && task2Done && task3Done && task4Done

  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2
            className="text-3xl text-gray-900 tracking-tight"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}
          >
            Your Mission - Get the Pipeline Green
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Nexus Corp has failing tests and no CI. You are going to fix both.
          </p>
        </div>

        {/* Prerequisites */}
        <div
          className="flex flex-col gap-5 p-6 border"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "rgba(251,146,60,0.3)",
            borderLeft: "3px solid rgb(251,146,60)",
          }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>
              Before you start
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              This mission builds on your work from M-02. Check both before continuing.
            </p>
          </div>

          {/* Prereq 1 - Fork from M-02 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>
                01
              </span>
              <p className="text-gray-900 text-sm font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                GitHub account with the nexus-corp-app fork from M-02
              </p>
              <span className="text-xs font-mono ml-auto" style={{ color: "rgb(34,197,94)" }}>
                ✓ READY
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              You already forked and containerized nexus-corp-app in M-02. That fork is what we continue with here.
            </p>
          </div>

          <div style={{ borderTop: "1px solid rgb(31,41,55)" }} />

          {/* Prereq 2 - Node.js */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-mono font-bold"
                style={{ color: prereq2Done ? "rgb(34,197,94)" : "rgb(251,146,60)" }}
              >
                02
              </span>
              <p className="text-gray-900 text-sm font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                Node.js installed
              </p>
              {prereq2Done && (
                <span className="text-xs font-mono ml-auto" style={{ color: "rgb(34,197,94)" }}>
                  ✓ READY
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              You need Node.js to run the tests locally. Verify it is installed by running{" "}
              <code className="text-orange-400 font-mono">node --version</code> in your terminal.
            </p>
            {!prereq2Done && (
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  onChange={(e) => { if (e.target.checked) setPrereq2Done(true) }}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: "rgb(251,146,60)" }}
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                  I have Node.js installed (<code className="text-orange-400 font-mono">node --version</code> works)
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Task list */}
        {prereqsDone && <>

        {/* Task 1 */}
        <TaskCard number="01" title="Run the tests locally" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">Before you fix anything, understand what is broken.</span>{" "}
              The repo has 3 tests - all failing. Running them first tells you exactly what is wrong
              and gives you a target to aim at. Never fix what you have not seen fail.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>How to run</SectionLabel>
            <p className="text-gray-400 text-sm leading-relaxed">
              Clone your fork locally if not already done, then install dependencies and run the
              test suite.
            </p>
            <pre
              className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
              style={{
                backgroundColor: "var(--bg-card)",
                borderLeft: "3px solid rgb(31,41,55)",
                color: "var(--text-muted)",
              }}
            >{`git clone https://github.com/your-username/nexus-corp-app
cd nexus-corp-app
npm install
npm test`}</pre>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Expected output - 3 failing tests</SectionLabel>
            <pre
              className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
              style={{
                backgroundColor: "var(--bg-card)",
                borderLeft: "3px solid rgba(239,68,68,0.5)",
                color: "rgb(239,68,68)",
              }}
            >{`FAIL src/index.test.js
  x should return company info (expected "Acme Inc", got "Nexus Corp")
  x should return status ok (expected "healthy", got "ok")
  x should return a list of orders (expected 10 items, got 3)`}</pre>
          </div>

          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">Read the error carefully.</span> The tests have wrong
              expected values - not the app. The test says it expects{" "}
              <code className="text-orange-400 font-mono">&quot;Acme Inc&quot;</code> but the app
              returns <code className="text-orange-400 font-mono">&quot;Nexus Corp&quot;</code>. Open{" "}
              <code className="text-orange-400 font-mono">src/index.test.js</code> and read all 3 wrong
              values. You will fix them in the next task.
            </p>
          </MentorNote>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask1Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                I ran <code className="text-orange-400 font-mono">npm test</code> and see 3 failing tests
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Fix the failing tests" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">The test file has intentional bugs - wrong expected values.</span>{" "}
              Find them and correct them. This teaches you to read tests, not just write them.
              A test that expects the wrong value is worse than no test - it gives you false confidence.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>How to fix</SectionLabel>
            <p className="text-gray-400 text-sm leading-relaxed">
              Open <code className="text-orange-400 font-mono">src/index.test.js</code> in your editor.
              Find the 3 wrong expected values and correct them. Then run{" "}
              <code className="text-orange-400 font-mono">npm test</code> again - all 3 should pass.
            </p>
          </div>

          <HintBox>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">What the API actually returns:</span>
            </p>
            <ul className="flex flex-col gap-1 mt-1">
              <li className="text-sm text-gray-400">
                <code className="text-yellow-400 font-mono">GET /</code> returns{" "}
                <code className="text-gray-600 font-mono">company: &quot;Nexus Corp&quot;</code>
              </li>
              <li className="text-sm text-gray-400">
                <code className="text-yellow-400 font-mono">GET /health</code> returns{" "}
                <code className="text-gray-600 font-mono">status: &quot;ok&quot;</code>
              </li>
              <li className="text-sm text-gray-400">
                <code className="text-yellow-400 font-mono">GET /api/orders</code> returns{" "}
                <code className="text-gray-600 font-mono">3 orders</code>
              </li>
            </ul>
          </HintBox>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                <code className="text-orange-400 font-mono">npm test</code> shows 3 passing, 0 failing
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Add a test step to the GitHub Actions workflow" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">The pipeline only installs dependencies right now.</span>{" "}
              It never runs tests. A pipeline without tests is just automated file copying - it catches
              nothing. Adding{" "}
              <code className="text-orange-400 font-mono">npm test</code> as a step is the difference
              between a build pipeline and a CI pipeline.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>How to add the test step</SectionLabel>
            <p className="text-gray-400 text-sm leading-relaxed">
              Open <code className="text-orange-400 font-mono">.github/workflows/ci.yml</code> in your
              editor. Find the <code className="text-orange-400 font-mono">TODO</code> comment below the
              install step. Replace it with the following:
            </p>
            <pre
              className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
              style={{
                backgroundColor: "var(--bg-card)",
                borderLeft: "3px solid rgb(31,41,55)",
                color: "var(--text-muted)",
              }}
            >{`      - name: Run tests
        run: npm test`}</pre>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Incomplete workflow with TODO visible</SectionLabel>
            <pre
              className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
              style={{
                backgroundColor: "var(--bg-card)",
                borderLeft: "3px solid rgba(239,68,68,0.4)",
                color: "var(--text-muted)",
              }}
            >{`name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      # TODO: add a step to run the tests`}</pre>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            Once you have added the step, commit and push to your fork.
          </p>
          <pre
            className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
            style={{
              backgroundColor: "var(--bg-card)",
              borderLeft: "3px solid rgb(31,41,55)",
              color: "var(--text-muted)",
            }}
          >{`git add .github/workflows/ci.yml
git commit -m "feat: add test step to CI pipeline"
git push`}</pre>

          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask3Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                I added the test step and pushed to my fork on GitHub
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="See the pipeline run green" done={task4Done} locked={!task3Done}>
          <div
            className="flex flex-col gap-2 p-5 border"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "rgba(251,146,60,0.4)",
              borderLeft: "3px solid rgb(251,146,60)",
            }}
          >
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>
              First time on your fork?
            </span>
            <p className="text-sm text-gray-600 leading-relaxed">
              GitHub disables Actions on forked repositories by default. If you see
              &ldquo;Workflows aren&apos;t being run on this forked repository&rdquo;, go to the{" "}
              <span className="text-gray-900">Actions</span> tab on your fork and click{" "}
              &ldquo;I understand my workflows, go ahead and enable them&rdquo;. You only need to
              do this once per fork.
            </p>
          </div>

          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">This is the moment.</span> Every future commit to this
              repo will now be automatically tested. No more bugs hiding in the codebase for months.
              No more &quot;it worked on my machine.&quot; The pipeline tells you - on every push.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>How to verify</SectionLabel>
            <p className="text-gray-400 text-sm leading-relaxed">
              Go to your fork on GitHub. Click the{" "}
              <span className="text-gray-900">Actions</span> tab. You should see a workflow run
              triggered by your last push. Wait for it to complete - it should show a green
              checkmark. Click into it to see all steps pass including{" "}
              <span className="text-gray-900 font-mono">Run tests</span>.
            </p>
          </div>

          {!task4Done && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                  Paste the URL of your green Actions run
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={actionsUrl}
                    onChange={(e) => setActionsUrl(e.target.value)}
                    placeholder="https://github.com/your-username/nexus-corp-app/actions/runs/..."
                    className="flex-1 px-3 py-2 text-sm font-mono text-gray-900 outline-none border"
                    style={{ backgroundColor: "var(--bg)", borderColor: "var(--border-bright)" }}
                  />
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked && actionsUrl.includes("github.com") && actionsUrl.includes("actions")) {
                      setTask4Done(true)
                    }
                  }}
                  className="w-4 h-4 accent-orange-500 cursor-pointer"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                  My pipeline is green
                </span>
              </label>
              {actionsUrl && (!actionsUrl.includes("github.com") || !actionsUrl.includes("actions")) && (
                <p className="text-xs font-mono" style={{ color: "rgb(239,68,68)" }}>
                  Paste a GitHub Actions run URL to confirm
                </p>
              )}
            </div>
          )}
        </TaskCard>

        {/* Success banner */}
        {allDone && (
          <div
            className="flex flex-col gap-5 border p-6"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "rgba(34,197,94,0.3)",
              borderLeft: "3px solid rgb(34,197,94)",
            }}
          >
            <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>
              ✓ Pipeline established. Every commit is now automatically tested.
            </p>
            <a
              href="?phase=4"
              className="self-start px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}
            >
              See your impact →
            </a>
          </div>
        )}

        </> }

      </div>
    </div>
  )
}
