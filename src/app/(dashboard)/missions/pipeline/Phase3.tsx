"use client"

import { useState } from "react"
import { Syne } from "next/font/google"

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

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
              color: locked
                ? "rgb(75,85,99)"
                : done
                ? "rgb(34,197,94)"
                : "rgb(6,182,212)",
            }}
          >
            {number}
          </span>
          <h3
            className="text-white text-base"
            style={{ ...syne.style, fontWeight: 700 }}
          >
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

export function Phase3() {
  const [task1Done, setTask1Done] = useState(false)
  const [task2Done, setTask2Done] = useState(false)
  const [task3Done, setTask3Done] = useState(false)
  const [task4Done, setTask4Done] = useState(false)

  const [forkUrl, setForkUrl] = useState("")
  const [actionsUrl, setActionsUrl] = useState("")

  const allDone = task1Done && task2Done && task3Done && task4Done

  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">

        <div className="flex flex-col gap-2">
          <h2
            className="text-3xl text-white tracking-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Your Mission - Build the Pipeline
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Nexus Corp has a broken repo. You are going to fix it.
          </p>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="Fork the Nexus Corp repository" done={task1Done} locked={false}>
          <p className="text-gray-400 text-sm leading-relaxed">
            Go to github.com/Criscadinu/nexus-corp-app and fork it to your own GitHub account.
            This is your working copy.
          </p>
          <a
            href="https://github.com/Criscadinu/nexus-corp-app"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start px-5 py-2.5 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
            style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style }}
          >
            Fork on GitHub →
          </a>
          {!task1Done && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                Paste your fork URL to continue
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={forkUrl}
                  onChange={(e) => setForkUrl(e.target.value)}
                  placeholder="https://github.com/your-username/nexus-corp-app"
                  className="flex-1 px-3 py-2 text-sm font-mono text-white outline-none border"
                  style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }}
                />
                <button
                  onClick={() => { if (forkUrl.trim()) setTask1Done(true) }}
                  disabled={!forkUrl.trim()}
                  className="px-5 py-2 text-sm font-bold transition-opacity hover:opacity-80 disabled:opacity-30"
                  style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Fix the failing tests" done={task2Done} locked={!task1Done}>
          <p className="text-gray-400 text-sm leading-relaxed">
            Clone your fork locally. Run{" "}
            <code className="text-cyan-400 font-mono">npm install</code> then{" "}
            <code className="text-cyan-400 font-mono">npm test</code>. You will see 3 failing tests.
            Read the test file at{" "}
            <code className="text-cyan-400 font-mono">src/index.test.js</code>{" "}
            and fix the wrong expected values.
          </p>
          <pre
            className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
            style={{
              backgroundColor: "#0d0d0d",
              borderLeft: "3px solid rgb(239,68,68)",
              color: "rgb(239,68,68)",
            }}
          >{`FAIL src/index.test.js
  x GET / should return company name (expected "Acme Inc", got "Nexus Corp")
  x GET /health should return ok (expected "healthy", got "ok")
  x GET /api/orders should return orders (expected 10, got 3)`}</pre>
          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                All 3 tests pass locally (npm test shows 3 passing)
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Complete the GitHub Actions workflow" done={task3Done} locked={!task2Done}>
          <p className="text-gray-400 text-sm leading-relaxed">
            Open{" "}
            <code className="text-cyan-400 font-mono">.github/workflows/ci.yml</code>.
            The workflow only has a build step. Add a test step that runs{" "}
            <code className="text-cyan-400 font-mono">npm test</code> after the build.
          </p>
          <pre
            className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
            style={{
              backgroundColor: "#0d0d0d",
              borderLeft: "3px solid rgb(31,41,55)",
              color: "rgb(156,163,175)",
            }}
          >{`name: Nexus Corp CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      # TODO: add test step here`}</pre>
          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask3Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                I added the test step and pushed to GitHub
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="See the pipeline run" done={task4Done} locked={!task3Done}>
          <p className="text-gray-400 text-sm leading-relaxed">
            Push your changes to GitHub. Go to the Actions tab in your fork. You should see a green
            pipeline run.
          </p>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-gray-600 uppercase tracking-widest">
              Paste your GitHub Actions run URL (optional)
            </label>
            <input
              type="url"
              value={actionsUrl}
              onChange={(e) => setActionsUrl(e.target.value)}
              placeholder="https://github.com/your-username/nexus-corp-app/actions/runs/..."
              className="px-3 py-2 text-sm font-mono text-white outline-none border"
              style={{
                backgroundColor: "#0d0d0d",
                borderColor: "rgb(31,41,55)",
                opacity: task4Done ? 0.5 : 1,
              }}
              disabled={task4Done}
            />
          </div>
          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask4Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                My pipeline is green
              </span>
            </label>
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
              ✓ Pipeline established. Nexus Corp now has CI.
            </p>
            <a
              href="?fase=4"
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
