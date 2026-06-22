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
            Your Mission - Add Eyes to Production
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Wire structured logging, a real health endpoint, and live request counters into the Nexus Corp app.
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
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              This mission builds on your M-20 work. Both items should already be ready.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>01</span>
              <p className="text-gray-900 text-sm font-bold flex-1" style={{ fontFamily: "var(--font-heading)" }}>
                Fork from M-20 with green pipeline
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-sm leading-relaxed pl-6" style={{ color: "var(--text-muted)" }}>
              Your nexus-corp-app fork has feature flags, passing tests, and GitHub Actions running on every push.
            </p>

            <div style={{ borderTop: "1px solid rgb(31,41,55)" }} />

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>02</span>
              <p className="text-gray-900 text-sm font-bold flex-1" style={{ fontFamily: "var(--font-heading)" }}>
                Node.js and npm installed
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-sm leading-relaxed pl-6" style={{ color: "var(--text-muted)" }}>
              Verify with <code className="text-orange-400 font-mono">node --version</code> and <code className="text-orange-400 font-mono">npm --version</code>.
            </p>
          </div>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="Add structured logging with pino" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">console.log is not logging.</span>{" "}
              It has no structure, no levels, no timestamps. pino is the standard structured logger
              for Node.js. Every request gets a JSON log line automatically.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Install pino</SectionLabel>
            <CodeBlock>{`npm install pino pino-http`}</CodeBlock>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to src/index.js</SectionLabel>
            <CodeBlock>{`const pino = require('pino')
const pinoHttp = require('pino-http')

const logger = pino({ level: process.env.LOG_LEVEL || 'info' })

// Add after app is created, before routes:
app.use(pinoHttp({ logger }))`}</CodeBlock>
          </div>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask1Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
                Every request now produces a structured JSON log line
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Upgrade the /health endpoint" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">A health check that only says &ldquo;ok&rdquo; is useless.</span>{" "}
              A real health check tells you uptime, memory pressure, and version. Load balancers
              and monitoring tools use this to decide if your app is healthy.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Replace the /health route in src/index.js</SectionLabel>
            <CodeBlock>{`const startTime = Date.now()

app.get('/health', (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000)
  const mem = process.memoryUsage()
  res.json({
    status: 'ok',
    version: process.env.APP_VERSION || '1.0.0',
    uptime_seconds: uptime,
    memory: {
      used_mb: Math.round(mem.heapUsed / 1024 / 1024),
      total_mb: Math.round(mem.heapTotal / 1024 / 1024),
    },
    timestamp: new Date().toISOString(),
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
              <span className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
                GET /health returns uptime, memory, version and timestamp
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Add request counters" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">Logs tell you what happened. Metrics tell you how often.</span>{" "}
              A request counter lets you answer: how many errors in the last hour? What is my
              error rate? Is traffic normal?
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add counters above the routes in src/index.js</SectionLabel>
            <CodeBlock>{`let requestCount = 0
let errorCount = 0

// Add this middleware after pinoHttp:
app.use((req, res, next) => {
  requestCount++
  res.on('finish', () => {
    if (res.statusCode >= 500) errorCount++
  })
  next()
})`}</CodeBlock>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Update /api/metrics to include live counters</SectionLabel>
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
              <span className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
                GET /api/metrics returns live request and error counts
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Write tests for the new endpoints" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">Telemetry that breaks silently is worse than no telemetry.</span>{" "}
              Add tests so the CI pipeline catches regressions in your observability layer.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to src/index.test.js</SectionLabel>
            <CodeBlock>{`describe('Telemetry', () => {
  it('GET /health returns uptime and memory', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('uptime_seconds')
    expect(res.body).toHaveProperty('memory')
    expect(res.body).toHaveProperty('timestamp')
  })

  it('GET /api/metrics returns request counters', async () => {
    const res = await request(app).get('/api/metrics')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('requests_total')
    expect(res.body).toHaveProperty('errors_total')
    expect(res.body).toHaveProperty('error_rate')
  })
})`}</CodeBlock>
          </div>

          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask4Done(true) }}
                className="w-4 h-4 accent-orange-500 cursor-pointer"
              />
              <span className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
                npm test passes with the new telemetry tests
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 5 */}
        <TaskCard number="05" title="Commit and push — verify CI is green" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="text-gray-900">Telemetry only works in production. Ship it.</span>{" "}
              From now on every deploy gives you visibility. Marco will sleep better.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push</SectionLabel>
            <CodeBlock>{`npm install
git add src/index.js src/index.test.js package.json package-lock.json
git commit -m 'feat: add structured logging, health check, and request metrics'
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
                <span className="text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
                  Pipeline is green — telemetry is live
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
              ✓ Telemetry is live. Nexus Corp can now see what is happening in production.
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
