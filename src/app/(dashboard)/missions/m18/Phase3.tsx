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
            Your Mission - Build the Experiment Engine
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            State a hypothesis, implement pagination behind a feature flag, measure the result.
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
              This mission builds on your M-17 work. Both items should already be ready.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>01</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                Fork from M-17 with incident process in place
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              Your nexus-corp-app fork has /api/alerts, /api/status, docs/runbook.md, and a green pipeline.
            </p>

            <div style={{ borderTop: "1px solid rgb(31,41,55)" }} />

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>02</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                Feature flags pattern already established (M-20)
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              You have used environment-variable feature flags since M-20. This mission uses the same pattern for experiments.
            </p>
          </div>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="State the hypothesis as code" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A hypothesis written as a comment in the code is a decision record.</span>{" "}
              Six months from now, when someone asks why pagination exists and whether it worked,
              the answer is in the code. It also forces you to be specific before you build anything.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to src/index.js — above the /api/orders route</SectionLabel>
            <CodeBlock>{`// HYPOTHESIS: Adding pagination to /api/orders will reduce response
// time for large order sets by limiting payload size.
// MEASURE: Compare response time with and without FEATURE_PAGINATION=true
// DECIDE: Ship if p95 response time improves by >20% for requests >20 orders
// STATUS: experimenting`}</CodeBlock>
          </div>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask1Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Hypothesis is documented as a comment above the /api/orders route
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Implement pagination behind a feature flag" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The flag lets you run control and treatment side by side.</span>{" "}
              You can enable it for specific environments without touching the code again. Default
              is off — you ship dark, measure first.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Update the /api/orders route in src/index.js</SectionLabel>
            <CodeBlock>{`app.get('/api/orders', (req, res) => {
  const start = Date.now()

  let result = orders

  if (process.env.FEATURE_PAGINATION === 'true') {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    result = {
      data: orders.slice(offset, offset + limit),
      pagination: {
        page,
        limit,
        total: orders.length,
        pages: Math.ceil(orders.length / limit),
      }
    }
  }

  const duration = Date.now() - start
  req.log && req.log.info(
    { duration_ms: duration, feature_pagination: process.env.FEATURE_PAGINATION === 'true' },
    'orders request'
  )

  res.json(result)
})`}</CodeBlock>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to docker-compose.yml</SectionLabel>
            <CodeBlock>{`- FEATURE_PAGINATION=false`}</CodeBlock>
          </div>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Pagination is implemented behind FEATURE_PAGINATION flag, default off
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Add response time logging to measure the experiment" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">You cannot validate a hypothesis without measurement.</span>{" "}
              Adding experiment context to /api/metrics means you can check the status of every
              running experiment in one call — without reading raw logs.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Update /api/metrics in src/index.js — add experiments object</SectionLabel>
            <CodeBlock>{`app.get('/api/metrics', (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000)
  res.json({
    // DORA baseline
    deploymentFrequency: '1x per month',
    leadTime: '43 days',
    changeFailureRate: '42%',
    mttr: '72 hours',
    // Live app metrics
    uptime_seconds: uptime,
    requests_total: requestCount,
    errors_total: errorCount,
    error_rate: requestCount > 0
      ? ((errorCount / requestCount) * 100).toFixed(2) + '%'
      : '0%',
    // Active experiments
    experiments: {
      pagination: {
        enabled: process.env.FEATURE_PAGINATION === 'true',
        hypothesis: 'Pagination reduces response time for large order sets',
        status: 'experimenting',
      }
    }
  })
})`}</CodeBlock>
          </div>

          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask3Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                GET /api/metrics includes experiments object with pagination status
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Write tests for both flag states" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A feature flag with no tests is a trap.</span>{" "}
              You need to verify both paths work correctly — with and without pagination. Without
              tests, you will discover the broken path in production.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to src/index.test.js</SectionLabel>
            <CodeBlock>{`describe('Hypothesis: Pagination', () => {
  it('GET /api/orders returns array when FEATURE_PAGINATION is off', async () => {
    delete process.env.FEATURE_PAGINATION
    const res = await request(app).get('/api/orders')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/orders returns paginated object when FEATURE_PAGINATION is on', async () => {
    process.env.FEATURE_PAGINATION = 'true'
    const res = await request(app).get('/api/orders?page=1&limit=5')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('data')
    expect(res.body).toHaveProperty('pagination')
    expect(res.body.pagination).toHaveProperty('total')
    delete process.env.FEATURE_PAGINATION
  })

  it('GET /api/metrics includes experiments object', async () => {
    const res = await request(app).get('/api/metrics')
    expect(res.body).toHaveProperty('experiments')
    expect(res.body.experiments).toHaveProperty('pagination')
  })
})`}</CodeBlock>
          </div>

          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask4Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                npm test passes for both flag states
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 5 */}
        <TaskCard number="05" title="Commit and push — verify CI is green" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The experiment is live — deployed dark.</span>{" "}
              To run it: set FEATURE_PAGINATION=true in production, measure response times via
              /api/metrics, compare with the baseline. When you have data, update the hypothesis
              STATUS from &lsquo;experimenting&rsquo; to &lsquo;validated&rsquo; or &lsquo;rejected&rsquo;.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push</SectionLabel>
            <CodeBlock>{`git add src/index.js src/index.test.js docker-compose.yml
git commit -m 'feat: add pagination experiment behind feature flag with hypothesis documentation'
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
                  Pipeline is green — experiment is deployed dark
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
              ✓ Experiment deployed dark. Nexus Corp now ships with evidence, not hope.
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
