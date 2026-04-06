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

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2
            className="text-3xl text-white tracking-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Your Mission - Build the Process
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Add a /api/status endpoint and a version-controlled runbook to the Nexus Corp app.
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
              This mission builds on your M-09 work. Both items should already be ready.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>01</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                Fork from M-09 with alerting in place
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              Your nexus-corp-app fork has /api/alerts with configurable thresholds, telemetry tests, and a green pipeline.
            </p>

            <div style={{ borderTop: "1px solid rgb(31,41,55)" }} />

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>02</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                startTime variable exists in src/index.js
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              The status endpoint shares the same startTime reference as /health and /api/alerts.
            </p>
          </div>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="Add a /api/status endpoint" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The status endpoint is your public incident communication channel.</span>{" "}
              It reads from an environment variable so you can change the status without a code
              deploy. Set INCIDENT_STATUS=degraded and every stakeholder who polls this endpoint
              knows immediately — no Slack message required.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to src/index.js</SectionLabel>
            <CodeBlock>{`app.get('/api/status', (req, res) => {
  const status = process.env.INCIDENT_STATUS || 'operational'
  const validStatuses = ['operational', 'degraded', 'outage']
  const currentStatus = validStatuses.includes(status) ? status : 'operational'

  res.json({
    status: currentStatus,
    message: {
      operational: 'All systems operational.',
      degraded: 'Degraded performance. Engineers are investigating.',
      outage: 'Service outage. Incident in progress.',
    }[currentStatus],
    timestamp: new Date().toISOString(),
  })
})`}</CodeBlock>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to docker-compose.yml prod environment</SectionLabel>
            <CodeBlock>{`- INCIDENT_STATUS=operational`}</CodeBlock>
          </div>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask1Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                GET /api/status returns status, message, and timestamp
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Create the incident runbook" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A runbook written before an incident is worth ten postmortems written after.</span>{" "}
              It forces you to think through failure modes when you are calm. At 3am during an
              outage, you follow the steps — you do not invent them.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create docs/runbook.md in the nexus-corp-app repo</SectionLabel>
            <CodeBlock>{`# Nexus Corp Incident Runbook

## Incident Response Process
1. **Detect** — alert fires via /api/alerts
2. **Assess** — check /api/status and /health for blast radius
3. **Communicate** — post in #incidents: "Investigating [alert name] since [time]"
4. **Triage** — identify likely cause using the playbooks below
5. **Fix** — apply fix or rollback
6. **Verify** — confirm /api/alerts returns OK
7. **Close** — update /api/status to operational, post resolution in #incidents
8. **Review** — schedule blameless postmortem within 48 hours

## Escalation
- First responder: on-call engineer
- Escalate after 15 min if unresolved: Engineering Manager (Sarah)
- Escalate after 30 min if unresolved: All hands

## Playbooks

### High Error Rate (error_rate > 5%)
1. GET /api/alerts — confirm CRITICAL
2. GET /health — check memory usage
3. Check recent deploys — roll back if deploy was in last 2 hours
4. Check /api/orders — is the orders endpoint responding?
5. Escalate if unresolved in 15 minutes

### Service Down (uptime < 60s)
1. Check container status: docker ps
2. Check logs: docker logs nexus-corp-app
3. Restart if crashed: docker compose restart prod
4. Escalate if not recovered in 10 minutes

### High Memory Usage (used_mb > 80% of total_mb)
1. GET /health — confirm memory values
2. Restart app to clear memory: docker compose restart prod
3. Investigate memory leak in next sprint`}</CodeBlock>
          </div>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                docs/runbook.md is created and covers detect, triage, fix, verify, close, review
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Write tests for the status endpoint" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The status endpoint will be polled by stakeholders and monitoring tools.</span>{" "}
              It needs to be reliable. A test ensures the endpoint responds correctly for all three
              valid status values.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to src/index.test.js</SectionLabel>
            <CodeBlock>{`describe('Incident Status', () => {
  it('GET /api/status returns status, message, and timestamp', async () => {
    const res = await request(app).get('/api/status')
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('status')
    expect(res.body).toHaveProperty('message')
    expect(res.body).toHaveProperty('timestamp')
  })

  it('status is one of operational, degraded, or outage', async () => {
    const res = await request(app).get('/api/status')
    expect(['operational', 'degraded', 'outage']).toContain(res.body.status)
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
                npm test passes with the new status endpoint tests
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Document escalation paths in the runbook" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">An incident process without escalation paths is incomplete.</span>{" "}
              The runbook should answer: what do I do if I cannot fix this in 15 minutes? Without
              this, engineers keep trying to fix things alone past the point where escalation would
              have helped.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Verify docs/runbook.md includes all four of these</SectionLabel>
            <div className="flex flex-col gap-2">
              {[
                "Named escalation contacts (Engineering Manager: Sarah)",
                "Time-boxed escalation triggers (15 min, 30 min)",
                "A communication channel (#incidents)",
                "A postmortem commitment (within 48 hours)",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b last:border-b-0" style={{ borderColor: "rgb(31,41,55)" }}>
                  <span className="text-xs font-mono font-bold shrink-0 mt-0.5" style={{ color: "rgb(6,182,212)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-gray-400">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask4Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Runbook includes escalation contacts, time triggers, communication channel, and postmortem commitment
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 5 */}
        <TaskCard number="05" title="Commit and push — verify CI is green" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The runbook and status endpoint are now part of the codebase.</span>{" "}
              Every engineer who clones this repo gets the incident process. It is not in
              someone&apos;s head or a forgotten Confluence page — it is version-controlled alongside
              the code it describes.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push</SectionLabel>
            <CodeBlock>{`git add src/index.js src/index.test.js docker-compose.yml docs/runbook.md
git commit -m 'feat: add /api/status endpoint and incident runbook'
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
                  Pipeline is green — status endpoint and runbook are live
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
              ✓ Incident process established. The next outage will be a drill, not a disaster.
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
