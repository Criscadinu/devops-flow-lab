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
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>Your Mission - Complete the Loop</h2>
          <p className="text-gray-500 text-sm leading-relaxed">Auto-deploy to staging, approval-gate production, verify health, add deployment traceability.</p>
        </div>

        <div className="flex flex-col gap-5 p-6 border" style={{ backgroundColor: "#0a0700", borderColor: "rgba(251,146,60,0.3)", borderLeft: "3px solid rgb(251,146,60)" }}>
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>Before you start</p>
          <p className="text-gray-400 text-sm leading-relaxed">This mission builds on M-17. Your pipeline should already have a manual deployment trigger and deployment tags in place.</p>
        </div>

        <TaskCard number="01" title="Add automatic deployment to staging on every green commit" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">Staging is the safe target for automatic deployment.</span>{" "}It matches production, is not customer-facing, and gives you confidence before promoting.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to .github/workflows/ci.yml</SectionLabel>
            <CodeBlock>{`deploy-staging:
  needs: [unit-tests, integration-tests, security]
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main'
  environment: staging
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
    - run: npm ci
    - name: Deploy to staging
      run: |
        echo "Auto-deploying to staging"
        echo "Commit: \${{ github.sha }}"
        docker compose -f docker-compose.yml up -d test
        echo "Staging deployment complete"
    - name: Verify staging health
      run: |
        sleep 5
        curl --fail http://localhost:3001/health || exit 1`}</CodeBlock>
          </div>
          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask1Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Staging deploys automatically on every green commit to main</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="02" title="Add a production deployment with manual approval" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">Production deployment should require a human decision — but not a human execution.</span>{" "}The pipeline does the work. A team member approves it.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to .github/workflows/ci.yml</SectionLabel>
            <CodeBlock>{`deploy-production:
  needs: [deploy-staging]
  runs-on: ubuntu-latest
  environment:
    name: production
    url: http://localhost:3002
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
    - run: npm ci
    - name: Deploy to production
      run: |
        echo "Deploying to production"
        docker compose -f docker-compose.yml up -d prod
        echo "Production deployment complete"
    - name: Verify production health
      run: |
        sleep 5
        curl --fail http://localhost:3002/health || exit 1`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">On GitHub: Settings → Environments → create &ldquo;production&rdquo; → add Required reviewers. The job pauses until a reviewer approves.</p>
          </div>
          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask2Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Production deployment requires approval — pipeline does the work, human approves</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="03" title="Add deployment verification" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">A deployment that does not verify it worked is a hope, not a deployment.</span>{" "}The health check confirms the service is actually running after every deployment.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Verify health check works locally</SectionLabel>
            <CodeBlock>{`docker compose up prod -d
sleep 3
curl http://localhost:3002/health`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">Expected: {`{ "status": "ok", "version": "...", "uptime": ... }`} — if the health check fails, the pipeline fails. No silent failures.</p>
          </div>
          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask3Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Health check verifies deployment succeeded — failed health check fails the pipeline</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="04" title="Add deployment history to the app" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">Every deployment should be traceable — who deployed, when, and what commit.</span>{" "}This audit trail makes self-service safe.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to src/index.js</SectionLabel>
            <CodeBlock>{`const deploymentInfo = {
  version: process.env.APP_VERSION || 'unknown',
  environment: process.env.NODE_ENV || 'unknown',
  deployedAt: new Date().toISOString(),
  commit: process.env.GITHUB_SHA || 'unknown',
  deployedBy: process.env.DEPLOYED_BY || 'unknown',
}

app.get('/api/deployment', (req, res) => {
  res.json(deploymentInfo)
})`}</CodeBlock>
          </div>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to docker-compose.yml environments</SectionLabel>
            <CodeBlock>{`- GITHUB_SHA=\${GITHUB_SHA:-local}
- DEPLOYED_BY=\${GITHUB_ACTOR:-local}`}</CodeBlock>
          </div>
          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask4Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">GET /api/deployment returns deployment metadata</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="05" title="Commit and push" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">The loop is complete.</span>{" "}Every commit that passes tests deploys to staging automatically. Production requires approval. Every deployment is verified and traceable.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push all changes</SectionLabel>
            <CodeBlock>{`git add .github/ src/index.js docker-compose.yml
git commit -m 'feat: continuous delivery — auto staging, approval-gated production, deployment metadata'
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
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Pipeline is green — deploy stages are integrated</span>
              </label>
            </div>
          )}
        </TaskCard>

        {allDone && (
          <div className="flex flex-col gap-5 border p-6" style={{ backgroundColor: "#060f06", borderColor: "rgba(34,197,94,0.3)", borderLeft: "3px solid rgb(34,197,94)" }}>
            <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>✓ The pipeline deploys. Not Marco. Every commit that passes tests is in production within minutes of approval.</p>
            <a href="?phase=4" className="self-start px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ background: "linear-gradient(135deg, #FF0000 0%, #FF5500 50%, #FF8C00 100%)", color: "#fff", ...syne.style, fontWeight: 700 }}>See your impact →</a>
          </div>
        )}
      </div>
    </div>
  )
}
