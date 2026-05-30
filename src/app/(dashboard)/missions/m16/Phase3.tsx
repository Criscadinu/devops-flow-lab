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
            Your Mission - Build the Repository of Truth
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Audit what lives outside the repo, add .env.example, structure the docs/ folder, verify .gitignore, and push everything to Git.
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
              This mission builds on your M-02 work. Your repo should already have Docker and a working environment setup.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>01</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                nexus-corp-app forked and cloned from M-02
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              Your fork has Docker environments configured. The repo already exists — now we make it the single source of truth.
            </p>
          </div>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="Audit what is outside the repo" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">You cannot fix what you cannot see.</span>{" "}
              Before adding anything to the repo, list everything that is not there.
              This audit makes the problem concrete — and gives you a checklist to work through.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create REPO-AUDIT.md at the repo root</SectionLabel>
            <CodeBlock>{`# Repository Audit

## What is in the repo
- [ ] Application code (src/)
- [ ] Test suite
- [ ] package.json and lockfile
- [ ] Dockerfile
- [ ] docker-compose.yml
- [ ] GitHub Actions workflow (.github/workflows/)

## What is NOT in the repo (yet)
- [ ] Environment configuration (which .env values does the app need?)
- [ ] Runbook / operational documentation
- [ ] Architecture decisions (ADRs)
- [ ] Database schema or migration scripts

## What should never be in the repo
- Secrets (API keys, passwords, tokens)
- .env files with real values
- node_modules/`}</CodeBlock>
          </div>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask1Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                REPO-AUDIT.md is created and committed
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Add a .env.example file" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Secrets never go in the repo. But the shape of the config must.</span>{" "}
              A .env.example file documents every environment variable the app needs, with placeholder values.
              Any developer who clones the repo knows exactly what to configure — without anyone having to explain it.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create .env.example at the repo root</SectionLabel>
            <CodeBlock>{`# Application
NODE_ENV=development
PORT=3000
APP_VERSION=1.0.0-dev

# Feature flags
ENABLE_PAGINATION=false
ENABLE_ANALYTICS=false

# Add any other env vars your app needs here
# Never put real values in this file`}</CodeBlock>
          </div>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                .env.example is committed to the repo
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Add a docs/ folder structure" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Documentation that lives in Google Drive is tribal knowledge.</span>{" "}
              Documentation in the repo is versioned, reviewable, and always in sync with the code it describes.
              Create the structure now — even with placeholder files. An empty folder with a README beats a full doc that nobody can find.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create the docs/ folder structure</SectionLabel>
            <CodeBlock>{`docs/
  README.md       # "Operational documentation for the Nexus Corp app."
  architecture.md # "# Architecture\n\nTBD — describe the system here."
  adr/            # Architecture Decision Records (from M-14 if complete)
  til/            # Today I Learned entries (from M-14 if complete)`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">
              If you already have docs/ from M-10 or M-14, just add the README.md and architecture.md stubs. Commit the full structure.
            </p>
          </div>

          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask3Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                docs/ structure is in place and committed
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Verify .gitignore is correct" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A .gitignore that is too aggressive keeps important files out. One that is too permissive lets secrets in.</span>{" "}
              Verify yours covers the essentials — node_modules, .env files, build output, and logs.
              This is the gate between &ldquo;config in the repo&rdquo; and &ldquo;secrets in the repo.&rdquo;
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Verify .gitignore contains at minimum</SectionLabel>
            <CodeBlock>{`node_modules/
.env
.env.local
.env.*.local
dist/
*.log`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">
              Add any missing entries. Note: .env.example is NOT in .gitignore — it should be committed. Only .env (with real values) is ignored.
            </p>
          </div>

          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask4Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                .gitignore is verified and committed
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 5 */}
        <TaskCard number="05" title="Commit everything and push" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The repo audit, .env.example, and docs structure are now the system&apos;s source of truth for operational knowledge.</span>{" "}
              Every future engineer who joins Nexus Corp will find this — not a Slack message from six months ago.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push all changes</SectionLabel>
            <CodeBlock>{`git add REPO-AUDIT.md .env.example docs/ .gitignore
git commit -m 'feat: single repository of truth — audit, env example, docs structure'
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
                  Pipeline is green
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
              ✓ The repo is now the system. Everything is in one place.
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
