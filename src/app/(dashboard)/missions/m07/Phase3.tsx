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
              color: locked ? "rgb(75,85,99)" : done ? "rgb(34,197,94)" : "rgb(255,85,0)",
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
        borderColor: "rgba(255,85,0,0.15)",
        borderLeft: "3px solid rgba(255,85,0,0.5)",
      }}
    >
      <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "rgb(255,85,0)" }}>
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
            Your Mission - Shift Left
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Add ESLint, write a unit test for the orders sort bug, wire lint into CI, and prove the safety net works.
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
              This mission builds on M-06. Your pipeline should already run a test suite on every push.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>01</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                nexus-corp-app with a working CI pipeline from M-06
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              The pipeline runs tests. Now we move the error detection earlier — before the tests, before the push.
            </p>
          </div>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="Add ESLint to the project" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Linting is the fastest feedback loop you can add.</span>{" "}
              It runs before tests, catches entire categories of errors in milliseconds, and requires no test data or environment setup.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Install ESLint and run the setup wizard</SectionLabel>
            <CodeBlock>{`npm install --save-dev eslint
npx eslint --init`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">
              When prompted, choose: &ldquo;To check syntax and find problems&rdquo; → &ldquo;CommonJS&rdquo; → &ldquo;None of these&rdquo; → &ldquo;Node&rdquo; → JSON config format.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to package.json scripts</SectionLabel>
            <CodeBlock>{`"lint": "eslint src/"`}</CodeBlock>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Run it</SectionLabel>
            <CodeBlock>{`npm run lint`}</CodeBlock>
          </div>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask1Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                ESLint is installed and runs without crashing
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Write a unit test for a pure function" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A unit test tests one function in isolation.</span>{" "}
              No database, no HTTP, no dependencies. Pure input → expected output. These are the tests that should make up 70% of your test suite.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add src/__tests__/orders.test.js</SectionLabel>
            <CodeBlock>{`const { sortOrders } = require('../orders')

describe('sortOrders', () => {
  test('sorts orders by date descending', () => {
    const orders = [
      { id: 1, date: '2024-01-01', amount: 100 },
      { id: 2, date: '2024-01-03', amount: 200 },
      { id: 3, date: '2024-01-02', amount: 150 },
    ]
    const sorted = sortOrders(orders)
    expect(sorted[0].id).toBe(2)
    expect(sorted[1].id).toBe(3)
    expect(sorted[2].id).toBe(1)
  })

  test('returns empty array when no orders', () => {
    expect(sortOrders([])).toEqual([])
  })
})`}</CodeBlock>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add src/orders.js</SectionLabel>
            <CodeBlock>{`function sortOrders(orders) {
  return [...orders].sort((a, b) => new Date(b.date) - new Date(a.date))
}
module.exports = { sortOrders }`}</CodeBlock>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Run tests</SectionLabel>
            <CodeBlock>{`npm test`}</CodeBlock>
          </div>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Unit test passes — sortOrders is tested and green
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Add lint step to the CI pipeline" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A lint step that only runs locally is a suggestion. A lint step in CI is a gate.</span>
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Update .github/workflows/ci.yml — add lint before the test step</SectionLabel>
            <CodeBlock>{`- name: Lint
  run: npm run lint

- name: Run tests
  run: npm test`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">
              The lint step must come before the test step. A syntax error should fail the pipeline before tests even start.
            </p>
          </div>

          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask3Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Lint runs in CI before tests
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Introduce a deliberate bug and watch it get caught" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The best way to trust a safety net is to test it.</span>{" "}
              Introduce a deliberate error, commit it, and watch the pipeline catch it.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Temporarily break the sort in src/orders.js</SectionLabel>
            <CodeBlock>{`// Deliberate bug: sort ascending instead of descending
return [...orders].sort((a, b) => new Date(a.date) - new Date(b.date))`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">
              Push this to a branch. Watch the test fail in CI. Then fix it and push again. The pipeline caught what three weeks of production did not.
            </p>
          </div>

          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask4Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                I introduced a bug, CI caught it, I fixed it
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 5 */}
        <TaskCard number="05" title="Commit everything and push" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The lint config, the unit test, and the updated pipeline are now permanent.</span>{" "}
              Every future engineer who joins Nexus Corp inherits a project where errors are caught at the earliest possible stage.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push all changes</SectionLabel>
            <CodeBlock>{`git add src/ .github/ package.json
git commit -m 'feat: add ESLint, unit test for sortOrders, lint step in CI pipeline'
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
                  className="w-4 h-4 accent-orange-500 cursor-pointer"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Pipeline is green with lint + tests passing
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
              ✓ The lint gate is active. The unit test is real. The bug that kills production now dies in CI.
            </p>
            <a
              href="?phase=4"
              className="self-start px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ background: "linear-gradient(135deg, #FF0000 0%, #FF5500 50%, #FF8C00 100%)", color: "#fff", ...syne.style, fontWeight: 700 }}
            >
              See your impact →
            </a>
          </div>
        )}

      </div>
    </div>
  )
}
