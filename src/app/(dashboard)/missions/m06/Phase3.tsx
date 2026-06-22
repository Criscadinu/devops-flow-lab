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

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2
            className="text-3xl text-white tracking-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Your Mission - Build a Real Test Suite
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            The Nexus Corp app has 3 tests. It needs more. You are going to build them.
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
              This mission builds on your M-03 work. Both items should already be ready.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Prereq 1 */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>01</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                Fork from M-03 with green pipeline
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              Your nexus-corp-app fork has all tests passing and GitHub Actions running on every push.
            </p>

            <div style={{ borderTop: "1px solid rgb(31,41,55)" }} />

            {/* Prereq 2 */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>02</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                Node.js installed
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              You need Node.js to run the test suite locally. Verify with{" "}
              <code className="text-orange-400 font-mono">node --version</code>.
            </p>
          </div>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="Understand what is already tested" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Before writing new tests, understand what exists.</span>{" "}
              The current test file tests 3 endpoints with wrong expected values — you already fixed
              those in M-03. Now audit what is NOT tested.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>How to audit</SectionLabel>
            <p className="text-gray-400 text-sm leading-relaxed">
              Open <code className="text-orange-400 font-mono">src/index.test.js</code>. List the
              endpoints that exist in{" "}
              <code className="text-orange-400 font-mono">src/index.js</code> but have no tests.
            </p>
            <CodeBlock>{`GET /           - tested
GET /health     - tested
GET /api/orders - tested
GET /api/metrics - NOT tested`}</CodeBlock>
          </div>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask1Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                I have identified the untested endpoints
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Write tests for the metrics endpoint" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The metrics endpoint returns the DORA baseline for Nexus Corp.</span>{" "}
              If someone changes it accidentally, we want to know immediately. Write tests that
              lock in the expected shape and values.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to src/index.test.js</SectionLabel>
            <CodeBlock>{`describe('GET /api/metrics', () => {
  it('should return DORA metrics', async () => {
    const res = await request(app).get('/api/metrics')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('deploymentFrequency')
    expect(res.body).toHaveProperty('leadTime')
    expect(res.body).toHaveProperty('changeFailureRate')
    expect(res.body).toHaveProperty('mttr')
  })

  it('should return the Nexus Corp baseline values', async () => {
    const res = await request(app).get('/api/metrics')
    expect(res.body.deploymentFrequency).toBe('1x per month')
    // TODO: add assertions for the other three metrics
  })
})`}</CodeBlock>
          </div>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                npm test shows the new metrics tests passing
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Test edge cases and error handling" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Happy path tests are not enough.</span>{" "}
              What happens when someone requests a route that does not exist? What happens with
              wrong HTTP methods? These are the bugs customers find.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add error case tests</SectionLabel>
            <CodeBlock>{`describe('Error handling', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown')
    expect(res.statusCode).toBe(404)
  })
})`}</CodeBlock>
          </div>

          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask3Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                I have added at least 2 error case tests and they pass
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Check your test coverage" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Coverage tells you which lines of code are executed by your tests.</span>{" "}
              It is not a goal in itself — 100% coverage with bad tests means nothing — but it
              helps you find untested code paths.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add coverage script to package.json</SectionLabel>
            <CodeBlock>{`"test:coverage": "jest --coverage"`}</CodeBlock>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Run it</SectionLabel>
            <p className="text-gray-400 text-sm leading-relaxed">
              Run <code className="text-orange-400 font-mono">npm run test:coverage</code>. Look at
              the coverage report. Find the lowest-covered file.
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
                I have run coverage and seen the report
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 5 */}
        <TaskCard number="05" title="Push and see all tests pass in CI" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Local tests passing is not enough.</span>{" "}
              The pipeline must run them too. Every commit should trigger the full test suite.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push your changes</SectionLabel>
            <CodeBlock>{`git add src/index.test.js package.json
git commit -m 'test: add metrics endpoint and error handling tests'
git push`}</CodeBlock>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            Go to the <strong className="text-white">Actions</strong> tab on GitHub and verify all
            tests pass in CI.
          </p>

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
                  All tests pass in CI
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
              ✓ Test suite complete. Nexus Corp now has meaningful test coverage.
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
