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
  const [prUrl, setPrUrl] = useState("")
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
            Your Mission - Build the Review Process
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Enable branch protection, create a PR template and contributing guide, then open and merge a real PR.
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
              This mission builds on your M-11 work. Both items should already be ready.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>01</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                Fork from M-11 with experiment engine in place
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              Your nexus-corp-app fork has the pagination experiment, /api/metrics with experiments object, and a green pipeline.
            </p>

            <div style={{ borderTop: "1px solid rgb(31,41,55)" }} />

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>02</span>
              <p className="text-white text-sm font-bold flex-1" style={syne.style}>
                GitHub repository is public and accessible
              </p>
              <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ READY</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed pl-6">
              Branch protection requires a GitHub repository. Your fork from the previous missions is already set up.
            </p>
          </div>
        </div>

        {/* Task 1 */}
        <TaskCard number="01" title="Enable branch protection on main" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Branch protection is not bureaucracy — it is a technical enforcement of process.</span>{" "}
              Without it, any engineer can push directly to main at any time. With it, the process
              is enforced by the platform, not by trust. The rule is not &ldquo;please don&apos;t push
              to main&rdquo; — it is &ldquo;you cannot push to main.&rdquo;
            </p>
          </MentorNote>

          <div className="flex flex-col gap-3">
            <SectionLabel>On GitHub: Settings → Branches → Add rule</SectionLabel>
            <div className="flex flex-col gap-2">
              {[
                { label: "Branch name pattern", value: "main" },
                { label: "Require a pull request before merging", value: "✓ enabled" },
                { label: "Require status checks to pass", value: "✓ enabled (select: test)" },
                { label: "Do not allow bypassing the above settings", value: "✓ enabled" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 px-4 py-3 border-b last:border-b-0"
                  style={{ borderColor: "rgb(31,41,55)", backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
                >
                  <span className="text-xs font-mono text-gray-600 shrink-0 w-48">{row.label}</span>
                  <span className="text-xs font-mono" style={{ color: "rgb(6,182,212)" }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask1Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Branch protection is enabled on main — direct pushes are blocked
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 2 */}
        <TaskCard number="02" title="Create a pull request template" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A PR template ensures every pull request answers the same questions: what changed, why, and how to test it.</span>{" "}
              Without a template, reviews are inconsistent. With one, every reviewer knows exactly
              what context to expect.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create .github/pull_request_template.md in the nexus-corp-app repo</SectionLabel>
            <CodeBlock>{`## What changed
<!-- Brief description of what this PR does -->

## Why
<!-- The problem this solves or the feature this adds -->

## How to test
<!-- Steps to verify this works correctly -->
1.
2.

## Checklist
- [ ] Tests pass locally (\`npm test\`)
- [ ] No console errors
- [ ] DORA impact considered (does this affect any metrics?)

## Related
<!-- Link to issue, hypothesis, or postmortem if applicable -->`}</CodeBlock>
          </div>

          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask2Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                .github/pull_request_template.md is created and committed to the repo
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 3 */}
        <TaskCard number="03" title="Create a CONTRIBUTING.md" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">A CONTRIBUTING.md makes the process explicit and discoverable.</span>{" "}
              Every new engineer who clones the repo immediately understands how the team works.
              Process in a document is better than process in someone&apos;s head.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create CONTRIBUTING.md in the nexus-corp-app repo</SectionLabel>
            <CodeBlock>{`# Contributing to Nexus Corp App

## Branch strategy
- Never push directly to \`main\`
- Create a feature branch: \`git checkout -b feat/your-feature-name\`
- Open a pull request when ready

## Pull request process
1. Fill in the PR template completely
2. Ensure \`npm test\` passes locally
3. Request review from at least one team member
4. Address all review comments before merging
5. Squash merge to keep history clean

## Commit message format
Use conventional commits:
- \`feat:\` — new feature
- \`fix:\` — bug fix
- \`chore:\` — maintenance, no production change
- \`docs:\` — documentation only

## Code review guidelines
- Review within 24 hours of request
- Comment on logic, not style
- Approve only when you would ship this yourself
- Ask questions before blocking`}</CodeBlock>
          </div>

          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => { if (e.target.checked) setTask3Done(true) }}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                CONTRIBUTING.md is created and committed to the repo
              </span>
            </label>
          )}
        </TaskCard>

        {/* Task 4 */}
        <TaskCard number="04" title="Open a real pull request" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">The process only exists if you use it.</span>{" "}
              Open a real PR on your fork — even a small improvement. Fill in the template.
              Let the CI run. This is the first time the full process runs end to end:
              branch → PR → review → CI → merge.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Create a branch and open a PR</SectionLabel>
            <CodeBlock>{`git checkout -b feat/add-contributing-docs
git add .github/pull_request_template.md CONTRIBUTING.md
git commit -m 'docs: add PR template and contributing guidelines'
git push origin feat/add-contributing-docs`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">
              Then open a PR from this branch to main on GitHub. The PR template will auto-populate. Fill it in.
            </p>
          </div>

          {!task4Done && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <SectionLabel>Paste your PR URL</SectionLabel>
                <input
                  type="url"
                  value={prUrl}
                  onChange={(e) => setPrUrl(e.target.value)}
                  placeholder="https://github.com/your-username/nexus-corp-app/pull/..."
                  className="w-full px-3 py-2 text-sm font-mono text-white outline-none border"
                  style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }}
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked && prUrl.includes("github.com")) setTask4Done(true)
                  }}
                  className="w-4 h-4 accent-cyan-400 cursor-pointer"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Pull request is open and CI is running on the branch
                </span>
              </label>
            </div>
          )}
        </TaskCard>

        {/* Task 5 */}
        <TaskCard number="05" title="Merge the PR and verify" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white">Merging through a PR — even for a simple docs change — completes the loop.</span>{" "}
              The branch protection rules enforce the process. CI must pass. You must have an approval
              (you can approve your own PR as the repo owner for this exercise). This is the process
              that prevents 3am rollbacks.
            </p>
          </MentorNote>

          <div className="flex flex-col gap-2">
            <SectionLabel>Merge the PR on GitHub, then verify locally</SectionLabel>
            <CodeBlock>{`git checkout main
git pull
git log --oneline -3`}</CodeBlock>
          </div>

          {!task5Done && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <SectionLabel>Paste your green Actions run URL for the merged PR</SectionLabel>
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
                  PR is merged, CI is green, main is protected
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
              ✓ Review process established. No code reaches main without a passing pipeline and a human review.
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
