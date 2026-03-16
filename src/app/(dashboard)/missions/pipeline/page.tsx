import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"

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

const panels = [
  {
    initials: "KA",
    name: "Kai",
    role: "QA Engineer",
    badge: "QA",
    accent: "rgb(251,146,60)",
    badgeBg: "rgba(251,146,60,0.08)",
    badgeBorder: "rgba(251,146,60,0.3)",
    quote: (
      <>
        &ldquo;I wait an average of <mark>5 days</mark> before I can start testing. The test
        environment is either busy or broken. By the time I get access, the sprint is almost
        over.&rdquo;
      </>
    ),
  },
  {
    initials: "MA",
    name: "Marco",
    role: "Ops Engineer",
    badge: "OPS",
    accent: "rgb(239,68,68)",
    badgeBg: "rgba(239,68,68,0.08)",
    badgeBorder: "rgba(239,68,68,0.3)",
    quote: (
      <>
        &ldquo;Deployment to ACC has to be scheduled. Average wait: <mark>8 days</mark>. And
        prod? Manual deploy, locked to the last Friday of the month.{" "}
        <mark>12 days</mark> average wait time.&rdquo;
      </>
    ),
  },
  {
    initials: "LI",
    name: "Lisa",
    role: "Developer",
    badge: "DEV",
    accent: "rgb(34,197,94)",
    badgeBg: "rgba(34,197,94,0.08)",
    badgeBorder: "rgba(34,197,94,0.3)",
    quote: (
      <>
        &ldquo;My local setup is different from test, which is different from prod. I fix a bug
        locally and it breaks in ACC. Nobody knows why. We call it{" "}
        <mark>works on my machine</mark>.&rdquo;
      </>
    ),
  },
  {
    initials: "SM",
    name: "Sarah",
    role: "Engineering Manager",
    badge: "MANAGEMENT",
    accent: "rgb(6,182,212)",
    badgeBg: "rgba(6,182,212,0.08)",
    badgeBorder: "rgba(6,182,212,0.3)",
    quote: (
      <>
        &ldquo;We have one shared test environment. When it breaks, everyone stops. Last month
        it was down for <mark>3 days</mark> and nobody knew how to rebuild it.&rdquo;
      </>
    ),
  },
  {
    initials: "TO",
    name: "Tom",
    role: "Product Owner",
    badge: "PRODUCT",
    accent: "rgb(167,139,250)",
    badgeBg: "rgba(167,139,250,0.08)",
    badgeBorder: "rgba(167,139,250,0.3)",
    quote: (
      <>
        &ldquo;We cannot test two features at the same time. There is only one ACC environment.
        Features queue up. That alone adds <mark>2 weeks</mark> to every release.&rdquo;
      </>
    ),
  },
  {
    initials: "YOU",
    name: "You",
    role: "New Engineer",
    badge: "PLAYER",
    accent: "rgb(6,182,212)",
    badgeBg: "rgba(6,182,212,0.08)",
    badgeBorder: "rgba(6,182,212,0.3)",
    isPlayer: true,
    quote: (
      <>
        &ldquo;The pipeline does not exist yet. But even if it did - where would it deploy to?
        There is no stable, reproducible environment. That is the real problem.&rdquo;
      </>
    ),
    outro: "Fix the foundation first.",
  },
]

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">

        <div className="flex flex-col gap-3 max-w-2xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {panels.map((p) => (
            <div
              key={p.initials}
              className="flex flex-col gap-0 overflow-hidden"
              style={{
                backgroundColor: "#0a0a0a",
                border: "1px solid #222",
                borderLeft: `3px solid ${p.accent}`,
              }}
            >
              {/* Panel header */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "#1a1a1a", backgroundColor: "#0d0d0d" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 flex items-center justify-center text-xs font-mono font-bold shrink-0"
                    style={{
                      backgroundColor: `${p.accent}18`,
                      border: `1px solid ${p.accent}40`,
                      color: p.accent,
                    }}
                  >
                    {p.initials}
                  </div>
                  <div className="flex flex-col gap-0">
                    <span className="text-white text-sm font-semibold leading-tight">{p.name}</span>
                    <span className="text-gray-600 text-xs">{p.role}</span>
                  </div>
                </div>
                <span
                  className="text-xs font-mono px-2 py-0.5 tracking-widest"
                  style={{
                    color: p.accent,
                    backgroundColor: p.badgeBg,
                    border: `1px solid ${p.badgeBorder}`,
                  }}
                >
                  {p.badge}
                </span>
              </div>

              {/* Quote */}
              <div className="px-5 py-4 flex flex-col gap-3">
                <p className="text-gray-300 text-sm leading-relaxed">{p.quote}</p>
                {"outro" in p && p.outro && (
                  <p
                    className="text-white font-bold text-sm border-t pt-3"
                    style={{ borderColor: "#1a1a1a" }}
                  >
                    {p.outro}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <CTA
          href="?fase=2"
          label="Understand the theory →"
          sub="Phase 2 of 4 - Why environments break everything"
        />
      </div>

      <style>{`
        mark {
          background: none;
          color: rgb(6,182,212);
          font-family: monospace;
          font-weight: 700;
        }
      `}</style>
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
          href="?fase=3"
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
  searchParams: Promise<{ fase?: string }>
}) {
  const session = await auth()
  if (!session?.user?.email) redirect("/api/auth/signin")

  const { fase: faseParam } = await searchParams
  const fase = ["1", "2", "3", "4"].includes(faseParam ?? "") ? Number(faseParam) : 1

  if (fase === 4) {
    await completeMission("M-02")
  }

  return (
    <main className="min-h-screen text-gray-100 flex flex-col" style={{ backgroundColor: "#000" }}>
      <MissionHeader fase={fase} />
      {fase === 1 && <Phase1 />}
      {fase === 2 && <Phase2 />}
      {fase === 3 && <Phase3 />}
      {fase === 4 && <Phase4 />}
    </main>
  )
}
