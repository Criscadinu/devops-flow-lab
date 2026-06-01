import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-04 Build the Pipeline - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>
          M-04
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Build the Pipeline
        </span>
        <span className="text-xs font-mono text-gray-600 tracking-widest uppercase">
          Phase {fase} of 4
        </span>
      </div>
      <div className="max-w-5xl mx-auto mt-3">
        <div className="w-full h-px bg-gray-800">
          <div className="h-px transition-all" style={{ width: pct, backgroundColor: "rgb(6,182,212)" }} />
        </div>
      </div>
    </header>
  )
}

// ─── Shared: CTA ─────────────────────────────────────────────────────────────

function CTA({ href, label, sub }: { href: string; label: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-3 border-t border-gray-900 pt-10">
      <a
        href={href}
        className="self-start px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
        style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}
      >
        {label}
      </a>
      {sub && <p className="text-xs font-mono text-gray-700">{sub}</p>}
    </div>
  )
}

// ─── Phase 1 - The situation ──────────────────────────────────────────────────

type SceneLine =
  | { type: "char"; name: string; role: string; accent: string; text: string }
  | { type: "beat"; text: string }
  | { type: "player"; text: string; coda: string }

const scene: SceneLine[] = [
  {
    type: "char", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)",
    text: "I pushed that fix on Friday. Is it live yet?",
  },
  {
    type: "char", name: "Marco", role: "OPS", accent: "rgb(239,68,68)",
    text: "No. I deploy on Tuesdays. So tomorrow.",
  },
  {
    type: "char", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)",
    text: "Tomorrow? It is one line. The customer is waiting since Wednesday.",
  },
  {
    type: "char", name: "Marco", role: "OPS", accent: "rgb(239,68,68)",
    text: "I know. But the deploy script needs me to babysit it. Last month I missed a step and we had a 6-hour outage.",
  },
  {
    type: "char", name: "Kai", role: "QA", accent: "rgb(251,146,60)",
    text: "Speaking of which. I ran the tests this morning. Three of them are failing.",
  },
  {
    type: "char", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)",
    text: "Failing how?",
  },
  {
    type: "char", name: "Kai", role: "QA", accent: "rgb(251,146,60)",
    text: "I do not know. They have been failing for at least two weeks. Nobody runs the test suite.",
  },
  {
    type: "beat",
    text: "Lisa pulled up the repo on her laptop.",
  },
  {
    type: "char", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)",
    text: "Tests for the pricing module. Written six months ago. Now they are failing.",
  },
  {
    type: "char", name: "Marco", role: "OPS", accent: "rgb(239,68,68)",
    text: "Was that intentional?",
  },
  {
    type: "char", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)",
    text: "No. We probably broke them and never noticed.",
  },
  {
    type: "char", name: "Kai", role: "QA", accent: "rgb(251,146,60)",
    text: "That is the part that bothers me. We have tests. They are in the repo. They just do not run unless someone manually decides to run them. Which nobody does.",
  },
  {
    type: "char", name: "Marco", role: "OPS", accent: "rgb(239,68,68)",
    text: "And on my side, I deploy manually. I run the same script every Tuesday. And I still make mistakes.",
  },
  {
    type: "beat",
    text: "Lisa closed her laptop.",
  },
  {
    type: "char", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)",
    text: "So we have environments that work. We have tests. We have a deploy script. And every step requires a human to remember to do it. That is not a process — that is hope.",
  },
  {
    type: "player",
    text: "A pipeline is the wire that connects everything. Push code, run tests, build the artifact, deploy. No one decides to run it. It runs because there was a commit. Every time. Without exception.",
    coda: "Hope is not a strategy. Automate the path to production.",
  },
]

function DialogueLine({ line, index }: { line: SceneLine; index: number }) {
  if (line.type === "beat") {
    return (
      <p className="text-center text-sm text-gray-600 italic py-5">
        {line.text}
      </p>
    )
  }

  if (line.type === "player") {
    return (
      <div
        className="flex flex-col gap-4 px-6 py-5 mt-2"
        style={{
          backgroundColor: "rgba(6,182,212,0.03)",
          borderLeft: "3px solid rgb(6,182,212)",
          borderTop: "1px solid rgba(6,182,212,0.2)",
          borderBottom: "1px solid rgba(6,182,212,0.2)",
          borderRight: "1px solid rgba(6,182,212,0.1)",
        }}
      >
        <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgb(6,182,212)" }}>
          You &middot; New Engineer
        </span>
        <p className="text-gray-200 text-base leading-relaxed">{line.text}</p>
        <p className="text-white font-bold text-sm border-t pt-4" style={{ borderColor: "rgba(6,182,212,0.15)" }}>
          {line.coda}
        </p>
      </div>
    )
  }

  const bg = index % 2 === 0 ? "#080808" : "#060606"
  return (
    <div
      className="flex flex-col gap-2 px-6 py-4"
      style={{ backgroundColor: bg, borderLeft: `3px solid ${line.accent}` }}
    >
      <span className="text-xs font-mono tracking-widest uppercase" style={{ color: line.accent, opacity: 0.8 }}>
        {line.name} &middot; {line.role}
      </span>
      <p className="text-gray-300 text-base leading-relaxed">
        &ldquo;{line.text}&rdquo;
      </p>
    </div>
  )
}

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">

        <div className="flex flex-col gap-3">
          <h2
            className="text-4xl text-white tracking-tight leading-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Week three. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Environments are stable. But every commit is still a gamble.
          </p>
        </div>

        <div className="flex flex-col border border-gray-900">
          {scene.map((line, i) => (
            <DialogueLine key={i} line={line} index={i} />
          ))}
        </div>

        <CTA
          href="?phase=2"
          label="Understand the theory →"
          sub="Phase 2 of 4 - What is Continuous Integration?"
        />
      </div>
    </div>
  )
}

// ─── Phase 2 - The theory ─────────────────────────────────────────────────────

const ciRules = [
  {
    title: "Never break the build",
    body: "The main branch must always be deployable. If your commit breaks the build, fixing it is your top priority - above all other work.",
    accent: "rgb(239,68,68)",
    bg: "#0f0606",
    border: "rgba(239,68,68,0.25)",
  },
  {
    title: "Tests are the safety net",
    body: "Automated tests are not optional. Without them, CI is just automated building. Tests are what make the pipeline meaningful.",
    accent: "rgb(6,182,212)",
    bg: "#020d0f",
    border: "rgba(6,182,212,0.25)",
  },
  {
    title: "Fix it or revert",
    body: "If the pipeline fails and you cannot fix it in 10 minutes, revert your commit. A broken pipeline blocks everyone.",
    accent: "rgb(251,146,60)",
    bg: "#0a0700",
    border: "rgba(251,146,60,0.25)",
  },
]

const feedbackLoop = [
  "Developer pushes code to GitHub",
  "GitHub Actions triggers automatically",
  "Pipeline installs dependencies",
  "Pipeline runs automated tests",
  "Pass: code is safe to merge. Fail: developer gets notified immediately.",
]

function Phase2() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-14">

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">01</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            What is Continuous Integration?
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Continuous Integration means every developer integrates their work into the main branch
            at least once a day. Each integration is verified by an automated build and test run.
            The goal: catch bugs in minutes, not weeks.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Three rules of CI
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ciRules.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-3 p-6 border"
                style={{
                  backgroundColor: card.bg,
                  borderColor: card.border,
                  borderLeft: `3px solid ${card.accent}`,
                }}
              >
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: card.accent }}
                >
                  {card.title}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">03</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            The CI feedback loop
          </h2>

          <ol className="flex flex-col border border-gray-800">
            {feedbackLoop.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-5 px-6 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#050505" }}
              >
                <span
                  className="text-sm font-mono font-bold shrink-0 w-6 pt-0.5"
                  style={{ color: "rgb(6,182,212)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-gray-300 text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <CTA
          href="?phase=3"
          label="Fix the Nexus Corp pipeline →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

const beforeAfter = [
  { before: "Tests ran manually, sometimes",       after: "Tests run automatically on every commit"  },
  { before: "Bugs found by customers",             after: "Bugs caught by the pipeline in minutes"   },
  { before: "3 failing tests ignored for months",  after: "All tests passing, pipeline enforces it"  },
  { before: "No visibility into code quality",     after: "Every push has a pass or fail result"     },
]

const doraImpact = [
  { metric: "Change Failure Rate",   code: "CFR", before: "28%",     after: "18%",     note: "tests catch bugs before prod"   },
  { metric: "Lead Time for Changes", code: "LT",  before: "36 days", after: "28 days", note: "faster feedback loop"           },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* Title */}
        <div className="flex flex-col gap-4">
          <p
            className="text-xs font-mono tracking-[0.25em] uppercase"
            style={{ color: "rgb(6,182,212)" }}
          >
            Mission Complete - M-04
          </p>
          <h1
            className="text-5xl text-white tracking-tight leading-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Pipeline Green.
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            This is what you built for Nexus Corp.
          </p>
        </div>

        {/* What changed */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What changed</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="border border-gray-800">
            <div
              className="grid grid-cols-2 border-b border-gray-800"
              style={{ backgroundColor: "#0d0d0d" }}
            >
              <div className="px-5 py-3 border-r border-gray-800">
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(239,68,68)" }}>
                  Before
                </span>
              </div>
              <div className="px-5 py-3">
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(34,197,94)" }}>
                  After
                </span>
              </div>
            </div>
            {beforeAfter.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-2 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
              >
                <div className="px-5 py-4 border-r border-gray-800">
                  <p className="text-sm text-gray-500">{row.before}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm text-gray-300">{row.after}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DORA impact */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              Your impact on Nexus Corp
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {doraImpact.map((d) => (
              <div
                key={d.code}
                className="flex flex-col gap-4 border p-6"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)" }}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                    {d.metric}
                  </span>
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="text-xl font-mono font-bold"
                    style={{ ...syne.style, color: "rgb(239,68,68)" }}
                  >
                    {d.before}
                  </span>
                  <span className="font-mono text-gray-700">→</span>
                  <span
                    className="text-xl font-mono font-bold"
                    style={{ ...syne.style, color: "rgb(6,182,212)" }}
                  >
                    {d.after}
                  </span>
                </div>
                <p className="text-xs font-mono text-gray-600">{d.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's next */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">03</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              What&apos;s next
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div
            className="flex flex-col gap-3 p-6 border"
            style={{
              backgroundColor: "#080808",
              borderColor: "rgb(31,41,55)",
              borderLeft: "3px solid rgb(31,41,55)",
            }}
          >
            <p className="text-gray-400 text-sm leading-relaxed">
              The pipeline tests every commit. But it still does not deploy automatically. Every
              green build should ship to a real environment. Next mission: Continuous Deployment.
            </p>
          </div>
        </section>

        {/* CTAs */}
        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/dashboard"
              className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}
            >
              Back to dashboard →
            </a>
            <span
              className="flex items-center gap-3 px-8 py-4 text-sm font-mono border cursor-not-allowed"
              style={{
                backgroundColor: "#0a0a0a",
                borderColor: "rgb(31,41,55)",
                color: "rgb(55,65,81)",
              }}
              title="Not yet available"
            >
              <span>⊘</span>
              Next mission: Continuous Deployment →
            </span>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M03Page({
  searchParams,
}: {
  searchParams: Promise<{ phase?: string }>
}) {
  const session = await auth()
  if (!session?.user?.email) redirect("/api/auth/signin")

  const { phase: phaseParam } = await searchParams
  const phase = ["1", "2", "3", "4"].includes(phaseParam ?? "") ? Number(phaseParam) : 1

  if (phase === 4) {
    const gateUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { id: true },
    })
    if (!gateUser) redirect("?phase=3")

    // Complete the mission first (idempotent — safe to call multiple times)
    await completeMission("M-04")

    // Now verify it actually exists (guards against DB errors)
    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-04" },
    })
    if (!completed) redirect("?phase=3")
  }

  return (
    <main className="min-h-screen text-gray-100 flex flex-col" style={{ backgroundColor: "#000" }}>
      <MissionHeader fase={phase} />
      {phase === 1 && <Phase1 />}
      {phase === 2 && <Phase2 />}
      {phase === 3 && <Phase3 />}
      {phase === 4 && <Phase4 />}
    </main>
  )
}
