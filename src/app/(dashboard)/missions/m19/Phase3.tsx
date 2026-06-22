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
    <div className="flex flex-col gap-3 p-5 border mb-6" style={{ backgroundColor: "#0a0700", borderColor: "rgba(251,146,60,0.4)", borderLeft: "3px solid rgb(251,146,60)" }}>
      <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>Desktop required</p>
      <p className="text-sm text-gray-400 leading-relaxed">This phase requires a terminal, a code editor, and GitHub. These tasks cannot be completed on a mobile device. Open this page on your laptop or desktop to continue.</p>
    </div>
  )
}

function TaskCard({ number, title, done, locked, children }: { number: string; title: string; done: boolean; locked: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 p-6 border" style={{ backgroundColor: locked ? "#050505" : done ? "#060f06" : "#080808", borderColor: locked ? "rgb(31,41,55)" : done ? "rgba(34,197,94,0.4)" : "rgba(255,85,0,0.4)", borderLeft: locked ? "3px solid rgb(31,41,55)" : done ? "3px solid rgb(34,197,94)" : "3px solid rgb(255,85,0)", opacity: locked ? 0.45 : 1, pointerEvents: locked ? "none" : "auto" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold" style={{ color: locked ? "rgb(75,85,99)" : done ? "rgb(34,197,94)" : "rgb(255,85,0)" }}>{number}</span>
          <h3 className="text-white text-base" style={{ ...syne.style, fontWeight: 700 }}>{title}</h3>
        </div>
        <div>
          {done && <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ DONE</span>}
          {locked && <span className="text-xs font-mono text-gray-700">⊘ LOCKED</span>}
        </div>
      </div>
      {!locked && <div className="flex flex-col gap-4">{children}</div>}
    </div>
  )
}

function MentorNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 border" style={{ backgroundColor: "#0a0a0a", borderColor: "rgba(255,85,0,0.15)", borderLeft: "3px solid rgba(255,85,0,0.5)" }}>
      <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "rgb(255,85,0)" }}>//</span>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(75,85,99)" }}>{children}</p>
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="text-xs font-mono leading-relaxed p-4 overflow-x-auto" style={{ backgroundColor: "#0d0d0d", borderLeft: "3px solid rgb(31,41,55)", color: "rgb(156,163,175)" }}>
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

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>Your Mission - Control the Blast Radius</h2>
          <p className="text-gray-500 text-sm leading-relaxed">Implement a canary release, configure blue-green environments, document rollback, and test the canary logic.</p>
        </div>

        <div className="flex flex-col gap-5 p-6 border" style={{ backgroundColor: "#0a0700", borderColor: "rgba(251,146,60,0.3)", borderLeft: "3px solid rgb(251,146,60)" }}>
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>Before you start</p>
          <p className="text-gray-400 text-sm leading-relaxed">This mission builds on M-18. Your pipeline should deploy automatically to staging and require approval for production.</p>
        </div>

        <TaskCard number="01" title="Implement a simple canary using percentage routing" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">Start at 0% and roll out gradually.</span>{" "}The new behavior is only active for users whose hash falls within the canary percentage. Consistent per user, no state required, instant rollback by setting to 0.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to src/index.js</SectionLabel>
            <CodeBlock>{`const CANARY_PERCENTAGE = parseFloat(process.env.CANARY_PERCENTAGE || '0')

function isCanaryUser(userId) {
  const hash = userId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return (hash % 100) < CANARY_PERCENTAGE
}

app.get('/api/pricing', (req, res) => {
  const userId = req.headers['x-user-id'] || 'anonymous'
  const useNewPricing = isCanaryUser(userId)
  res.json({
    algorithm: useNewPricing ? 'v2' : 'v1',
    canary: useNewPricing,
    userId,
  })
})`}</CodeBlock>
          </div>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to docker-compose.yml prod environment</SectionLabel>
            <CodeBlock>{`- CANARY_PERCENTAGE=0`}</CodeBlock>
          </div>
          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask1Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Canary endpoint implemented — CANARY_PERCENTAGE controls rollout percentage</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="02" title="Implement blue-green with docker-compose" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">Run two versions simultaneously, switch which one serves traffic.</span>{" "}Rollback is instant — switch traffic back to blue. The old environment stays live until you are confident in the new one.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to docker-compose.yml</SectionLabel>
            <CodeBlock>{`services:
  blue:
    build: .
    ports:
      - "3010:3000"
    environment:
      - NODE_ENV=production
      - APP_VERSION=blue
      - PORT=3000

  green:
    build: .
    ports:
      - "3011:3000"
    environment:
      - NODE_ENV=production
      - APP_VERSION=green
      - PORT=3000`}</CodeBlock>
          </div>
          <div className="flex flex-col gap-2">
            <SectionLabel>Blue-green deploy sequence</SectionLabel>
            <CodeBlock>{`# Deploy new version to green
docker compose up green -d --build

# Verify green is healthy
curl http://localhost:3011/health

# Switch traffic to green (update proxy to point to 3011)
# Keep blue running for instant rollback

# Once confident, stop blue
docker compose stop blue`}</CodeBlock>
          </div>
          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask2Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Blue-green services configured — instant rollback available</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="03" title="Add rollback documentation" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">A release pattern without a rollback plan is not a release pattern — it is optimism.</span>{" "}Document the rollback procedure before you need it. You will not have time to think clearly during an incident.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to DEPLOYMENT.md</SectionLabel>
            <CodeBlock>{`## Release Patterns

### Canary rollout
1. Set CANARY_PERCENTAGE=1 in production environment
2. Monitor /api/alerts for error rate spike
3. If healthy: increase to 10, 50, 100
4. If unhealthy: set CANARY_PERCENTAGE=0 — instant rollback

### Blue-green rollout
1. Build and start green: docker compose up green -d --build
2. Verify: curl http://localhost:3011/health
3. Switch traffic to green (update proxy/load balancer)
4. Monitor for 15 minutes
5. If healthy: docker compose stop blue
6. If unhealthy: switch traffic back to blue — instant rollback

### Emergency rollback (any pattern)
git revert HEAD && git push
The pipeline deploys the reverted commit automatically.`}</CodeBlock>
          </div>
          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask3Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Rollback procedures documented — team knows how to roll back before deploying</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="04" title="Write a canary routing test" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">The canary logic should be tested like any other business logic.</span>{" "}A bug in the canary router affects your entire rollout strategy — and it is not obvious until you are mid-rollout.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add src/__tests__/unit/canary.test.js</SectionLabel>
            <CodeBlock>{`function isCanaryUser(userId, percentage) {
  const hash = userId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return (hash % 100) < percentage
}

describe('canary routing', () => {
  test('0% canary routes no users to new version', () => {
    const users = ['alice', 'bob', 'carol', 'dave', 'eve']
    const canaryUsers = users.filter(u => isCanaryUser(u, 0))
    expect(canaryUsers.length).toBe(0)
  })

  test('100% canary routes all users to new version', () => {
    const users = ['alice', 'bob', 'carol', 'dave', 'eve']
    const canaryUsers = users.filter(u => isCanaryUser(u, 100))
    expect(canaryUsers.length).toBe(5)
  })

  test('canary routing is consistent per user', () => {
    const result1 = isCanaryUser('alice', 50)
    const result2 = isCanaryUser('alice', 50)
    expect(result1).toBe(result2)
  })
})`}</CodeBlock>
          </div>
          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask4Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Canary routing logic is tested</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="05" title="Commit and push" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">The next bad deploy will affect 1% of users, not 100%.</span>{" "}Rollback is a config change, not a crisis. The blast radius is controlled.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push all changes</SectionLabel>
            <CodeBlock>{`git add src/ docker-compose.yml DEPLOYMENT.md
git commit -m 'feat: canary releases, blue-green deployment pattern, rollback documentation'
git push`}</CodeBlock>
          </div>
          {!task5Done && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <SectionLabel>Paste your green Actions run URL</SectionLabel>
                <input type="url" value={actionsUrl} onChange={(e) => setActionsUrl(e.target.value)} placeholder="https://github.com/your-username/nexus-corp-app/actions/runs/..." className="w-full px-3 py-2 text-sm font-mono text-white outline-none border" style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }} />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" onChange={(e) => { if (e.target.checked && actionsUrl.includes("github.com")) setTask5Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Pipeline is green — release patterns implemented</span>
              </label>
            </div>
          )}
        </TaskCard>

        {allDone && (
          <div className="flex flex-col gap-5 border p-6" style={{ backgroundColor: "#060f06", borderColor: "rgba(34,197,94,0.3)", borderLeft: "3px solid rgb(34,197,94)" }}>
            <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>✓ Canary is live at 0%. Blue-green is ready. Rollback is documented. Risk is now a dial, not a switch.</p>
            <a href="?phase=4" className="self-start px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ background: "linear-gradient(135deg, #FF0000 0%, #FF5500 50%, #FF8C00 100%)", color: "#fff", ...syne.style, fontWeight: 700 }}>See your impact →</a>
          </div>
        )}
      </div>
    </div>
  )
}
