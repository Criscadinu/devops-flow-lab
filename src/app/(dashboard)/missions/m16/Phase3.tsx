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

function PlatformNote({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col gap-1 p-4 border"
      style={{ backgroundColor: "#0a0a0a", borderColor: "rgb(31,41,55)" }}
    >
      <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
        {name}
      </span>
      <p className="text-sm text-gray-400 leading-relaxed">{children}</p>
    </div>
  )
}

export function Phase3() {
  const [prereqDone, setPrereqDone] = useState(false)

  const [task1Done, setTask1Done] = useState(false)
  const [task2Done, setTask2Done] = useState(false)
  const [task3Done, setTask3Done] = useState(false)
  const [task4Done, setTask4Done] = useState(false)
  const [task5Done, setTask5Done] = useState(false)

  const [liveUrl, setLiveUrl] = useState("")
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
            Your Mission - Deploy on Every Green Build
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Every commit that passes tests should automatically reach production.
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
              This mission builds on your M-05 work. Check both items before continuing.
            </p>
          </div>

          {/* Prereq 1 - pipeline from M-05 */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>01</span>
              <p className="text-white text-sm font-bold" style={syne.style}>
                M-05 fork with a green pipeline
              </p>
              <span className="text-xs font-mono ml-auto" style={{ color: "rgb(34,197,94)" }}>
                ✓ READY
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your nexus-corp-app fork has all tests passing and GitHub Actions running on every push. That is the foundation CD builds on.
            </p>
          </div>

          <div style={{ borderTop: "1px solid rgb(31,41,55)" }} />

          {/* Prereq 2 - deployment platform account */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-mono font-bold"
                style={{ color: prereqDone ? "rgb(34,197,94)" : "rgb(251,146,60)" }}
              >
                02
              </span>
              <p className="text-white text-sm font-bold" style={syne.style}>
                Free account on a deployment platform
              </p>
              {prereqDone && (
                <span className="text-xs font-mono ml-auto" style={{ color: "rgb(34,197,94)" }}>
                  ✓ READY
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              You need a deployment platform that integrates with GitHub. All three options below are free to start.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Render", url: "https://render.com" },
                { name: "Railway", url: "https://railway.app" },
                { name: "Fly.io", url: "https://fly.io" },
              ].map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-mono font-bold border transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: "#0d0d0d",
                    borderColor: "rgba(251,146,60,0.3)",
                    color: "rgb(251,146,60)",
                  }}
                >
                  {p.name} →
                </a>
              ))}
            </div>
            {!prereqDone && (
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  onChange={(e) => { if (e.target.checked) setPrereqDone(true) }}
                  className="w-4 h-4 cursor-pointer"
                  style={{ accentColor: "rgb(251,146,60)" }}
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  I have created a free account on Render, Railway, or Fly.io
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Task list */}
        {prereqDone && <>

        {/* Task 1 */}
        <TaskCard number="01" title="Deploy the Nexus Corp app manually first" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Before you automate anything, do it manually once.</span>{" "}
              This confirms the app works on the platform and gives you a mental model of what the
              automation will replicate. Never automate something you have not done by hand first.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>How to deploy manually</SectionLabel>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connect your GitHub fork to your chosen platform. Each platform has a &quot;New
              project&quot; or &quot;New service&quot; button that lets you import from GitHub.
              Select your nexus-corp-app fork. The platform will detect it is a Node.js app and
              configure the build automatically. Trigger the first deploy and wait for it to go live.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel>Paste your live app URL to continue</SectionLabel>
            <div className="flex gap-2">
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://nexus-corp.onrender.com"
                className="flex-1 px-3 py-2 text-sm font-mono text-white outline-none border"
                style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }}
              />
            </div>
            {liveUrl && !liveUrl.startsWith("https://") && (
              <p className="text-xs font-mono" style={{ color: "rgb(239,68,68)" }}>
                URL must start with https://
              </p>
            )}
          </div>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked && liveUrl.startsWith("https://")) setTask1Done(true)
                }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                My app is live and accessible at the URL above
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Verify the app is running correctly" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Always verify a deployment before automating it.</span>{" "}
              If the manual deploy is broken, the automated one will be too. Verify the three
              endpoints now - this also means you have a known-good baseline to compare against
              after future deploys.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Check these three endpoints</SectionLabel>
            <p className="text-gray-400 text-sm leading-relaxed">
              Open your live URL in a browser or use{" "}
              <code className="text-cyan-400 font-mono">curl</code>. Each should return the values
              shown below.
            </p>
            <pre
              className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
              style={{
                backgroundColor: "#0d0d0d",
                borderLeft: "3px solid rgb(31,41,55)",
                color: "rgb(156,163,175)",
              }}
            >{`GET /           - should return  company: "Nexus Corp"
GET /health     - should return  status: "ok"
GET /api/orders - should return  3 orders`}</pre>
          </div>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                All three endpoints return the correct responses
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Enable automatic deployment on every push" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">This is the CD switch.</span> From this point on, every
              push to main that passes tests will automatically deploy to production. No manual
              steps, no Marco, no deployment meeting. The platform watches your GitHub repo and
              acts the moment a new commit lands.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Enable auto-deploy - choose your platform</SectionLabel>
            <div className="flex flex-col gap-2">
              <PlatformNote name="Render">
                Go to your service dashboard. Click <strong>Settings</strong>. Under{" "}
                <strong>Build &amp; Deploy</strong>, find <strong>Auto-Deploy</strong> and set it
                to <strong>On Commit</strong>. This means Render deploys automatically on every
                push to the connected branch.
              </PlatformNote>
              <PlatformNote name="Railway">
                Open your project. Click <strong>Settings</strong>. Under{" "}
                <strong>Deployments</strong>, ensure <strong>Automatic deployments</strong> is
                enabled for the main branch. Railway enables this by default - verify it is on.
              </PlatformNote>
              <PlatformNote name="Fly.io">
                Fly.io does not auto-deploy from GitHub by default. You will add an explicit deploy
                step to your GitHub Actions workflow in the next task. Skip this step and proceed
                to Task 4.
              </PlatformNote>
            </div>
          </div>

          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask3Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Automatic deployment is enabled
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Add a deploy step to your GitHub Actions workflow" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Some platforms require an explicit deploy step in your pipeline.</span>{" "}
              Even if yours does not, understanding this pattern matters - explicit deploy steps
              give you control, visibility, and the ability to add conditions like only deploying
              from main, or only deploying after all checks pass.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Add to .github/workflows/ci.yml after the test step</SectionLabel>
            <pre
              className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
              style={{
                backgroundColor: "#0d0d0d",
                borderLeft: "3px solid rgb(31,41,55)",
                color: "rgb(156,163,175)",
              }}
            >{`      - name: Deploy to production
        if: github.ref == 'refs/heads/main' && success()
        run: echo 'Deploy step - replace with your platform CLI command'`}</pre>
          </div>

          <div
            className="flex gap-3 p-4 border"
            style={{
              backgroundColor: "#0a0800",
              borderColor: "rgba(234,179,8,0.2)",
              borderLeft: "3px solid rgba(234,179,8,0.6)",
            }}
          >
            <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "rgb(234,179,8)" }}>!</span>
            <p className="text-sm text-gray-400 leading-relaxed">
              For <strong className="text-white">Render</strong> and{" "}
              <strong className="text-white">Railway</strong>, automatic deployment from GitHub is
              enough - you do not need this step. For{" "}
              <strong className="text-white">Fly.io</strong>, replace the echo with:{" "}
              <code className="text-cyan-400 font-mono">flyctl deploy --remote-only</code>
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
                I understand the deploy step (added it or confirmed my platform handles it automatically)
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 5 */}
        <TaskCard number="05" title="Make a change and watch it deploy automatically" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">This is the moment.</span> Make a real change, push it,
              watch the pipeline run, and see it live in production - automatically. No Marco. No
              meeting. No checklist. This is what CD feels like.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Make a small change and push to main</SectionLabel>
            <p className="text-gray-400 text-sm leading-relaxed">
              Add a new field to the{" "}
              <code className="text-cyan-400 font-mono">GET /</code> response in your app so you
              can visually confirm the new version is live.
            </p>
            <pre
              className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
              style={{
                backgroundColor: "#0d0d0d",
                borderLeft: "3px solid rgb(31,41,55)",
                color: "rgb(156,163,175)",
              }}
            >{`// In src/index.js, add to the GET / route:
deployedAt: new Date().toISOString()`}</pre>
            <p className="text-gray-400 text-sm leading-relaxed">
              Then commit and push:
            </p>
            <pre
              className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
              style={{
                backgroundColor: "#0d0d0d",
                borderLeft: "3px solid rgb(31,41,55)",
                color: "rgb(156,163,175)",
              }}
            >{`git add src/index.js
git commit -m 'feat: add deployedAt field'
git push`}</pre>
            <MentorNote>
              <p className="text-sm text-gray-300 leading-relaxed">
                This triggers both GitHub Actions and your Render auto-deploy automatically.
              </p>
            </MentorNote>
            <p className="text-gray-400 text-sm leading-relaxed">
              Go to the <strong className="text-white">Actions</strong> tab on GitHub and watch the
              pipeline run. When it turns green, open your live URL - the{" "}
              <code className="text-cyan-400 font-mono">deployedAt</code> field should be there.
            </p>
          </div>

          {!task5Done && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <SectionLabel>Paste the URL of your successful Actions run</SectionLabel>
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
                  My change is live in production automatically
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
              ✓ CD established. Every green commit now ships to production automatically.
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

        </> }

      </div>
    </div>
  )
}
