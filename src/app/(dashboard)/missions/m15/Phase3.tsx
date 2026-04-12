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
            Your Mission - Break Things Deliberately
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Run three chaos experiments, add timeout configuration, document the failure modes, and commit it all to version control.
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
              This mission builds on your M-14 work. Both items should already be ready.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>01</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                Docker Compose with health checks from M-06
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              Your nexus-corp-app fork has a docker-compose.yml with a prod service and health checks configured from M-06.
            </p>

            <div style={{ borderTop: "1px solid rgb(31,41,55)" }} />

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>02</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                /health endpoint and RUNBOOK.md from M-10
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              Your app exposes /health and your RUNBOOK.md is in place. The failure modes you discover will be added there.
            </p>
          </div>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="Run experiment 1 — kill the process" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The simplest chaos experiment is also the most revealing.</span>{" "}
              Stop your app while it is running and observe what happens. Does Docker restart it?
              How long does it take? Does your health check catch it? This is the baseline — if your
              app cannot survive a restart, nothing else matters.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-3">
            <SectionLabel>Terminal 1 — start the app</SectionLabel>
            <CodeBlock>{`docker compose up prod`}</CodeBlock>

            <SectionLabel>Terminal 2 — kill the process and observe</SectionLabel>
            <CodeBlock>{`docker ps
docker kill nexus-corp-app-prod-1

# Observe:
# - Does Docker restart the container automatically?
# - How long until /health returns 200 again?
# - Check docker-compose.yml — is restart: unless-stopped set?`}</CodeBlock>

            <p className="text-xs text-gray-600 leading-relaxed">
              If restart policy is not set, add to the prod service in docker-compose.yml:
            </p>
            <CodeBlock>{`restart: unless-stopped`}</CodeBlock>
          </div>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask1Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Process kill experiment run — restart policy confirmed
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Run experiment 2 — slow the dependency" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Most outages are not caused by your code — they are caused by a dependency your code trusts too much.</span>{" "}
              Adding a timeout is the single most important resilience improvement most apps can make.
              Without a timeout, one slow dependency can hang every request.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-3">
            <SectionLabel>Add a chaos endpoint to src/index.js</SectionLabel>
            <CodeBlock>{`// Chaos experiment endpoint — simulates a slow dependency
app.get('/api/chaos/slow', async (req, res) => {
  const delay = parseInt(req.query.delay) || 5000
  await new Promise(resolve => setTimeout(resolve, delay))
  res.json({ delayed_ms: delay })
})`}</CodeBlock>

            <SectionLabel>Run the experiment</SectionLabel>
            <CodeBlock>{`# Start the app
docker compose up prod

# Hit the slow endpoint (10 second delay)
curl "http://localhost:3000/api/chaos/slow?delay=10000" &

# While that is running — does /health still respond?
curl http://localhost:3000/health

# Check if the error rate is affected
curl http://localhost:3000/api/alerts`}</CodeBlock>
          </div>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Slow dependency experiment run — /health responds independently of slow endpoint
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Add timeout configuration" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A timeout is a contract: if a dependency does not respond within X milliseconds, give up and fail fast.</span>{" "}
              Failing fast is better than hanging forever — it lets the rest of the system keep working.
              Configure timeouts as environment variables so they can be tuned per environment.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-3">
            <SectionLabel>Add timeout middleware to src/index.js</SectionLabel>
            <CodeBlock>{`const REQUEST_TIMEOUT_MS = parseInt(process.env.REQUEST_TIMEOUT_MS || '5000')

// Add timeout middleware — applies to all routes
app.use((req, res, next) => {
  res.setTimeout(REQUEST_TIMEOUT_MS, () => {
    res.status(503).json({
      error: 'Request timeout',
      timeout_ms: REQUEST_TIMEOUT_MS,
    })
  })
  next()
})`}</CodeBlock>

            <SectionLabel>Add to docker-compose.yml prod environment</SectionLabel>
            <CodeBlock>{`- REQUEST_TIMEOUT_MS=5000`}</CodeBlock>
          </div>

          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask3Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Request timeout configured and wired to environment variable
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Document the failure modes" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A chaos experiment that is not documented is just breaking things.</span>{" "}
              Document every failure mode you discover so the runbook is updated with the new knowledge.
              Future on-call engineers will thank you.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to docs/runbook.md</SectionLabel>
            <CodeBlock>{`## Known Failure Modes

### Process crash
- Symptom: /health returns connection refused
- Recovery: Docker restarts automatically (restart: unless-stopped)
- Expected recovery time: < 30 seconds
- Prevention: health check in docker-compose.yml

### Slow dependency
- Symptom: requests hang, error rate spikes after timeout
- Recovery: requests time out after REQUEST_TIMEOUT_MS (default 5000ms)
- Expected impact: 503 errors during dependency outage
- Prevention: configure REQUEST_TIMEOUT_MS, add circuit breaker if needed

### Resource exhaustion
- Symptom: high memory usage visible in /health, eventual OOM crash
- Recovery: Docker restarts automatically
- Prevention: monitor memory via /health, add memory limits to
  docker-compose.yml`}</CodeBlock>
          </div>

          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask4Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Known failure modes documented in RUNBOOK.md
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 5 */}
        <TaskCard number="05" title="Commit and push — verify CI is green" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Chaos engineering is not a one-time exercise. It is a practice.</span>{" "}
              Add the slow endpoint and timeout middleware to the codebase so future engineers can run
              these experiments themselves. The failure modes you discovered today are in the runbook.
              The next engineer benefits from your chaos.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Push all changes through a PR to main</SectionLabel>
            <CodeBlock>{`git add src/index.js docker-compose.yml docs/runbook.md
git commit -m 'feat: add chaos engineering experiments, timeout middleware, and failure mode docs'
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
                  Pipeline is green — chaos engineering is part of the codebase
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
              ✓ Chaos experiments complete. You know how your system fails — and you fixed it before it mattered.
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
