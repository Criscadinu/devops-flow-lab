"use client"

import { useState, useEffect } from "react"


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
        backgroundColor: "var(--bg-card)",
        borderColor: "rgba(251,146,60,0.4)",
        borderLeft: "3px solid rgb(251,146,60)",
      }}
    >
      <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>
        Desktop required
      </p>
      <p className="text-sm text-gray-600 leading-relaxed">
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
              color: locked ? "rgb(75,85,99)" : done ? "rgb(34,197,94)" : "rgb(255,85,0)",
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
      {children}
    </p>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
      style={{
        backgroundColor: "var(--bg-card)",
        borderLeft: "3px solid rgb(31,41,55)",
        color: "var(--text-muted)",
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
            className="text-3xl text-gray-900 tracking-tight"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}
          >
            Your Mission - Make the System Speak
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Add an automated alert endpoint to the Nexus Corp app with configurable thresholds.
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
              This mission builds on your M-23 work. Both items should already be ready.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>01</span>
              <p className="text-gray-900 text-sm font-bold flex-1" style={{ fontFamily: "var(--font-heading)" }}>
                Fork from M-23 with telemetry in place
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              Your nexus-corp-app fork has pino logging, the upgraded /health endpoint, request counters in /api/metrics, and a green pipeline.
            </p>

            <div style={{ borderTop: "1px solid rgb(31,41,55)" }} />

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>02</span>
              <p className="text-gray-900 text-sm font-bold flex-1" style={{ fontFamily: "var(--font-heading)" }}>
                requestCount and errorCount variables exist
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              The alert endpoint reads these variables. Confirm they are declared at module scope in src/index.js.
            </p>
          </div>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="Add the /api/alerts endpoint" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">An alert endpoint evaluates the current state of your app against configured thresholds.</span>{" "}
              This is what monitoring tools poll. It is also what you can call yourself to get an
              instant health snapshot beyond the basic /health check.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to src/index.js — after the /health route</SectionLabel>
            <CodeBlock>{`const ERROR_RATE_WARNING = parseFloat(process.env.ALERT_ERROR_RATE_WARNING || '1')
const ERROR_RATE_CRITICAL = parseFloat(process.env.ALERT_ERROR_CRITICAL || '5')
const MIN_UPTIME = parseInt(process.env.ALERT_MIN_UPTIME || '60')

app.get('/api/alerts', (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000)
  const errorRate = requestCount > 0
    ? (errorCount / requestCount) * 100
    : 0

  const checks = {
    error_rate: {
      value: errorRate.toFixed(2) + '%',
      threshold: ERROR_RATE_CRITICAL + '%',
      status: errorRate >= ERROR_RATE_CRITICAL
        ? 'CRITICAL'
        : errorRate >= ERROR_RATE_WARNING
        ? 'WARNING'
        : 'OK',
    },
    uptime: {
      value: uptime,
      threshold: MIN_UPTIME,
      status: uptime < MIN_UPTIME ? 'WARNING' : 'OK',
    },
  }

  const overallStatus = Object.values(checks).some(c => c.status === 'CRITICAL')
    ? 'CRITICAL'
    : Object.values(checks).some(c => c.status === 'WARNING')
    ? 'WARNING'
    : 'OK'

  res.json({
    status: overallStatus,
    checks,
    timestamp: new Date().toISOString(),
  })
})`}</CodeBlock>
          </div>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask1Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                GET /api/alerts returns status, checks, and timestamp
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Make thresholds configurable in docker-compose.yml" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">Hardcoded thresholds are technical debt.</span>{" "}
              Production and staging have different traffic patterns — a 5% error rate in staging
              during a load test is fine; in production it is an incident. Environment variables
              let you tune thresholds per environment without touching code.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to the prod service environment in docker-compose.yml</SectionLabel>
            <CodeBlock>{`- ALERT_ERROR_RATE_WARNING=1
- ALERT_ERROR_CRITICAL=5
- ALERT_MIN_UPTIME=60`}</CodeBlock>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Test locally</SectionLabel>
            <CodeBlock>{`docker compose up dev
curl http://localhost:3000/api/alerts`}</CodeBlock>
          </div>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                Alert thresholds are defined in docker-compose.yml and /api/alerts responds correctly
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Write tests for the alert endpoint" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">Alert logic that is not tested will drift.</span>{" "}
              Thresholds get changed, logic gets refactored, and suddenly your CRITICAL alert fires
              at 50% instead of 5%. Tests lock the behavior in place.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to src/index.test.js</SectionLabel>
            <CodeBlock>{`describe('Alerting', () => {
  it('GET /api/alerts returns status and checks', async () => {
    const res = await request(app).get('/api/alerts')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('status')
    expect(res.body).toHaveProperty('checks')
    expect(res.body).toHaveProperty('timestamp')
  })

  it('alert status is OK, WARNING, or CRITICAL', async () => {
    const res = await request(app).get('/api/alerts')
    expect(['OK', 'WARNING', 'CRITICAL']).toContain(res.body.status)
  })

  it('error_rate check has value, threshold, and status', async () => {
    const res = await request(app).get('/api/alerts')
    const check = res.body.checks.error_rate
    expect(check).toHaveProperty('value')
    expect(check).toHaveProperty('threshold')
    expect(check).toHaveProperty('status')
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
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                npm test passes with the new alerting tests
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Add a LOG_LEVEL environment variable" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">In production you want info-level logs. In development you want debug.</span>{" "}
              In a crisis you might temporarily set LOG_LEVEL=debug in production to get more
              detail. This should be a switch, not a code change.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to docker-compose.yml — prod service</SectionLabel>
            <CodeBlock>{`- LOG_LEVEL=info`}</CodeBlock>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to docker-compose.yml — dev service</SectionLabel>
            <CodeBlock>{`- LOG_LEVEL=debug`}</CodeBlock>
          </div>

          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask4Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                LOG_LEVEL is set per environment in docker-compose.yml
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 5 */}
        <TaskCard number="05" title="Commit and push — verify CI is green" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">Alerting is only useful when it runs in production. Ship it.</span>{" "}
              From now on, any monitoring tool can poll /api/alerts and get a structured response.
              No more checking dashboards manually at 11pm.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push</SectionLabel>
            <CodeBlock>{`git add src/index.js src/index.test.js docker-compose.yml
git commit -m 'feat: add /api/alerts endpoint with configurable thresholds'
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
                  className="w-full px-3 py-2 text-sm font-mono text-gray-900 outline-none border"
                  style={{ backgroundColor: "var(--bg)", borderColor: "var(--border-bright)" }}
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
                <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                  Pipeline is green — alerting endpoint is live
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
              backgroundColor: "var(--bg-card)",
              borderColor: "rgba(34,197,94,0.3)",
              borderLeft: "3px solid rgb(34,197,94)",
            }}
          >
            <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>
              ✓ Alerting is live. The system now speaks before your customers do.
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

      </div>
    </div>
  )
}
