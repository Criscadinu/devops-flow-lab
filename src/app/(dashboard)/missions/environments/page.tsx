import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-02 On-Demand Environments - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>
          M-02
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          On-Demand Environments
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
    type: "char", name: "Marco", role: "OPS", accent: "rgb(239,68,68)",
    text: "Hey, does anyone know what state the test environment is in? I need to deploy something.",
  },
  {
    type: "char", name: "Kai", role: "QA", accent: "rgb(251,146,60)",
    text: "Which one? The shared one is mine right now. I have been waiting since Monday to run my tests.",
  },
  {
    type: "char", name: "Marco", role: "OPS", accent: "rgb(239,68,68)",
    text: "Monday? It is Wednesday.",
  },
  {
    type: "char", name: "Kai", role: "QA", accent: "rgb(251,146,60)",
    text: "Yes. Two days. And before me it was Lisa. And before Lisa it was you.",
  },
  {
    type: "char", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)",
    text: "I left it in a working state. Mostly.",
  },
  {
    type: "char", name: "Kai", role: "QA", accent: "rgb(251,146,60)",
    text: "Mostly.",
  },
  {
    type: "char", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)",
    text: "There was a config issue. I fixed it locally. I think I forgot to apply it to the server.",
  },
  {
    type: "char", name: "Marco", role: "OPS", accent: "rgb(239,68,68)",
    text: "So the environment has your local fix, but not actually.",
  },
  {
    type: "char", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)",
    text: "Correct.",
  },
  {
    type: "char", name: "Marco", role: "OPS", accent: "rgb(239,68,68)",
    text: "And nobody documented this.",
  },
  {
    type: "char", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)",
    text: "There is a Slack message from Tuesday.",
  },
  {
    type: "char", name: "Kai", role: "QA", accent: "rgb(251,146,60)",
    text: "I missed that Slack message. I spent half a day figuring out why my tests were failing on a config issue that was already fixed on someone\u2019s laptop.",
  },
  {
    type: "beat",
    text: "Nobody said anything for a moment.",
  },
  {
    type: "char", name: "Marco", role: "OPS", accent: "rgb(239,68,68)",
    text: "I am going to rebuild the environment from scratch. Does anyone know how?",
  },
  {
    type: "beat",
    text: "Nobody did.",
  },
  {
    type: "player",
    text: "This is the problem. Not one bad day. A system where every environment is different, nobody owns it, and the only documentation is a Slack message from Tuesday that someone missed. The fix is not better communication. It is making environments cheap enough that everyone has their own.",
    coda: "One environment for everyone is one bottleneck for everyone.",
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
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: "rgb(6,182,212)" }}
        >
          You &middot; New Engineer
        </span>
        <p className="text-gray-200 text-base leading-relaxed">{line.text}</p>
        <p
          className="text-white font-bold text-sm border-t pt-4"
          style={{ borderColor: "rgba(6,182,212,0.15)" }}
        >
          {line.coda}
        </p>
      </div>
    )
  }

  const bg = index % 2 === 0 ? "#080808" : "#060606"
  return (
    <div
      className="flex flex-col gap-2 px-6 py-4"
      style={{
        backgroundColor: bg,
        borderLeft: `3px solid ${line.accent}`,
      }}
    >
      <span
        className="text-xs font-mono tracking-widest uppercase"
        style={{ color: line.accent, opacity: 0.8 }}
      >
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
            Week two. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            The VSM revealed the bottlenecks. Now you see the root cause.
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
          sub="Phase 2 of 4 - Why environments break everything"
        />
      </div>
    </div>
  )
}

// ─── Phase 2 - The theory ─────────────────────────────────────────────────────

const principles = [
  {
    title: "Environment as code",
    body: "Your environment is not a manual setup guide. It is a file in your repository. Anyone can spin up an identical environment with one command.",
    accent: "rgb(34,197,94)",
    bg: "#060f06",
    border: "rgba(34,197,94,0.25)",
  },
  {
    title: "On-demand creation",
    body: "Environments should be created in minutes, not scheduled days in advance. Every developer gets their own. Every feature gets its own.",
    accent: "rgb(6,182,212)",
    bg: "#020d0f",
    border: "rgba(6,182,212,0.25)",
  },
  {
    title: "Easier to rebuild than repair",
    body: "When an environment breaks, you do not fix it. You delete it and create a new one. Immutable infrastructure eliminates configuration drift.",
    accent: "rgb(239,68,68)",
    bg: "#0f0606",
    border: "rgba(239,68,68,0.25)",
  },
]

const envQuestions = [
  "Can any developer create a local environment in under 5 minutes?",
  "Is dev identical to test and prod?",
  "Can you recreate prod from scratch in under an hour?",
  "Is your environment defined in version control?",
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
            Why environments break everything
          </h2>
          <p className="text-gray-400 leading-relaxed">
            When every developer has a different local setup, and test differs from production,
            bugs hide between environments. The solution is environment parity - dev, test, and
            prod behave identically because they are defined in code.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Three principles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {principles.map((card) => (
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
            The four environment questions
          </h2>

          <ol className="flex flex-col border border-gray-800">
            {envQuestions.map((q, i) => (
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
                <span className="text-gray-300 text-sm leading-relaxed">{q}</span>
              </li>
            ))}
          </ol>
        </section>

        <CTA
          href="?phase=3"
          label="Fix the Nexus Corp environments →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

const beforeAfter = [
  { before: "Shared, fragile test environment",        after: "On-demand environments per developer" },
  { before: "8-day wait for ACC deployment",           after: "Spin up a test environment in under 1 minute" },
  { before: "Works on my machine",                     after: "Identical dev, test, and prod environments" },
  { before: "Rebuild takes days of manual work",       after: "Delete and recreate in one command" },
]

const doraImpact = [
  { metric: "Change Failure Rate", code: "CFR", before: "42%",     after: "28%" },
  { metric: "Lead Time for Changes", code: "LT", before: "43 days", after: "36 days" },
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
            Mission Complete - M-02
          </p>
          <h1
            className="text-5xl text-white tracking-tight leading-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Environments Established.
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            This is what you built for Nexus Corp.
          </p>
        </div>

        {/* What changed */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              What changed
            </h2>
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
                className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border p-6"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)" }}
              >
                <div className="flex flex-col gap-1 shrink-0">
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
              Environments are stable and reproducible. Now every commit needs to automatically
              build, test, and deploy. Next mission: Build the Pipeline.
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
              Next mission: Build the Pipeline →
            </span>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PipelinePage({
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
    await completeMission("M-02")

    // Now verify it actually exists (guards against DB errors)
    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-02" },
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
