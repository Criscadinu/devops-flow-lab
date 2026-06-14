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
    <div className="flex flex-col gap-5 p-6 border" style={{ backgroundColor: locked ? "#050505" : done ? "#060f06" : "#080808", borderColor: locked ? "rgb(31,41,55)" : done ? "rgba(34,197,94,0.4)" : "rgba(6,182,212,0.4)", borderLeft: locked ? "3px solid rgb(31,41,55)" : done ? "3px solid rgb(34,197,94)" : "3px solid rgb(6,182,212)", opacity: locked ? 0.45 : 1, pointerEvents: locked ? "none" : "auto" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold" style={{ color: locked ? "rgb(75,85,99)" : done ? "rgb(34,197,94)" : "rgb(6,182,212)" }}>{number}</span>
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
    <div className="flex gap-3 p-4 border" style={{ backgroundColor: "#0a0a0a", borderColor: "rgba(6,182,212,0.15)", borderLeft: "3px solid rgba(6,182,212,0.5)" }}>
      <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "rgb(6,182,212)" }}>//</span>
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
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>Your Mission - Make Deploying Self-Service</h2>
          <p className="text-gray-500 text-sm leading-relaxed">Add a manual trigger, automate the deployment job, add tags, and write the deployment guide.</p>
        </div>

        <div className="flex flex-col gap-5 p-6 border" style={{ backgroundColor: "#0a0700", borderColor: "rgba(251,146,60,0.3)", borderLeft: "3px solid rgb(251,146,60)" }}>
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>Before you start</p>
          <p className="text-gray-400 text-sm leading-relaxed">This mission builds on M-16. Your pipeline should already run tests automatically on every push to main.</p>
        </div>

        <TaskCard number="01" title="Add a manual deployment trigger to CI" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">workflow_dispatch adds a Run Workflow button to the Actions tab.</span>{" "}Any engineer with repo access can trigger it. This is the first step toward self-service — the pipeline does the work, the engineer presses the button.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Update .github/workflows/ci.yml — add workflow_dispatch trigger</SectionLabel>
            <CodeBlock>{`on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Target environment'
        required: true
        default: 'prod'
        type: choice
        options:
          - prod
          - test`}</CodeBlock>
          </div>
          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask1Done(true) }} className="w-4 h-4 accent-cyan-400 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">workflow_dispatch trigger added — manual deployment button visible in Actions tab</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="02" title="Add a deployment job to the pipeline" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">The deployment job runs after tests pass.</span>{" "}It only runs on main — not on PRs. This ensures the pipeline is the gatekeeper, not a person.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to .github/workflows/ci.yml</SectionLabel>
            <CodeBlock>{`deploy:
  needs: [unit-tests, integration-tests]
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main' || github.event_name == 'workflow_dispatch'
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
    - run: npm ci
    - name: Deploy
      run: |
        echo "Deploying to \${{ github.event.inputs.environment || 'prod' }}"
        echo "Commit: \${{ github.sha }}"
        echo "Triggered by: \${{ github.actor }}"
        echo "Deploy complete."`}</CodeBlock>
          </div>
          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask2Done(true) }} className="w-4 h-4 accent-cyan-400 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Deployment job added — runs automatically after green tests on main</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="03" title="Add deployment notifications" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">Visibility is part of safety.</span>{" "}When anyone can deploy, everyone needs to know when a deployment happens. A Git tag records who deployed, when, and from which commit.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to the deploy job steps</SectionLabel>
            <CodeBlock>{`    - name: Tag deployment
      run: |
        git config user.name "github-actions"
        git config user.email "github-actions@github.com"
        git tag -a "deploy-$(date +%Y%m%d-%H%M%S)" -m "Deployed by \${{ github.actor }}"
        git push origin --tags`}</CodeBlock>
          </div>
          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask3Done(true) }} className="w-4 h-4 accent-cyan-400 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Deployment creates a Git tag — every deployment is recorded</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="04" title="Create a DEPLOYMENT.md runbook" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">Self-service requires documentation.</span>{" "}An engineer should be able to deploy without asking anyone — which means the process must be written down and findable in the repo.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Create DEPLOYMENT.md</SectionLabel>
            <CodeBlock>{`# Deployment Guide

## How to deploy

### Automatic (recommended)
Every merge to main triggers a deployment automatically.
The pipeline runs tests, then deploys if all checks pass.

### Manual
1. Go to the Actions tab on GitHub
2. Select the CI workflow
3. Click "Run workflow"
4. Select the target environment
5. Click "Run workflow"

## What happens during a deploy
1. Unit tests run (parallel)
2. Integration tests run (parallel)
3. Security audit runs
4. If all pass: deployment job runs
5. A Git tag is created with the timestamp and deployer

## Rollback
git revert HEAD && git push
The pipeline will deploy the reverted commit automatically.

## Who can deploy
Anyone with write access to the repository.
The pipeline enforces all safety checks.`}</CodeBlock>
          </div>
          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask4Done(true) }} className="w-4 h-4 accent-cyan-400 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">DEPLOYMENT.md created — anyone can deploy by following the guide</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="05" title="Commit and push" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed"><span className="text-white">Deploying no longer requires Marco.</span>{" "}Any engineer with repo access can trigger a deployment from the Actions tab. The audit trail shows who did it.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push all changes</SectionLabel>
            <CodeBlock>{`git add .github/ DEPLOYMENT.md
git commit -m 'feat: self-service deployments via workflow_dispatch, deployment tags, deployment guide'
git push`}</CodeBlock>
          </div>
          {!task5Done && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <SectionLabel>Paste your green Actions run URL</SectionLabel>
                <input type="url" value={actionsUrl} onChange={(e) => setActionsUrl(e.target.value)} placeholder="https://github.com/your-username/nexus-corp-app/actions/runs/..." className="w-full px-3 py-2 text-sm font-mono text-white outline-none border" style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }} />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" onChange={(e) => { if (e.target.checked && actionsUrl.includes("github.com")) setTask5Done(true) }} className="w-4 h-4 accent-cyan-400 cursor-pointer" />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Pipeline is green — self-service deployment is live</span>
              </label>
            </div>
          )}
        </TaskCard>

        {allDone && (
          <div className="flex flex-col gap-5 border p-6" style={{ backgroundColor: "#060f06", borderColor: "rgba(34,197,94,0.3)", borderLeft: "3px solid rgb(34,197,94)" }}>
            <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>✓ Anyone on the team can deploy. The pipeline is the gatekeeper. Marco is free to do work that requires his expertise.</p>
            <a href="?phase=4" className="self-start px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}>See your impact →</a>
          </div>
        )}
      </div>
    </div>
  )
}
