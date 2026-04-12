import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-11 Hypothesis-Driven Development - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>
          M-11
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Hypothesis-Driven Development
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
    initials: "TO",
    name: "Tom",
    role: "Product Owner",
    badge: "PRODUCT",
    accent: "rgb(167,139,250)",
    badgeBg: "rgba(167,139,250,0.08)",
    badgeBorder: "rgba(167,139,250,0.3)",
    quote: (
      <>
        &ldquo;We built the pagination feature because a customer asked for it. We shipped it. I
        have no idea if anyone uses it. I have no idea if it made things{" "}
        <mark>better or worse</mark>.&rdquo;
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
        &ldquo;I spent two weeks on that feature. When I asked how we would know if it worked, Tom
        said &lsquo;we will feel it&rsquo;. <mark>That is not an answer</mark>.&rdquo;
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
        &ldquo;Error rate went up 0.3% after the pagination deploy. Nobody connected the dots.
        We have the data. We just <mark>never look at it</mark> as feedback on what we shipped.&rdquo;
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
        &ldquo;Feature flags let us deploy dark. Telemetry lets us measure. Put them together and
        you have an experiment engine. <mark>Ship, measure, decide</mark> — with data.&rdquo;
      </>
    ),
    outro: "Hope is not a strategy. Measure everything.",
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
            Week eleven. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Tom shipped a new orders feature last month. Three weeks of work. Deployed on a Friday. Nobody measured if it helped. It probably did not.
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

              <div className="px-5 py-4 flex flex-col gap-3">
                <p className="text-gray-300 text-sm leading-relaxed">{p.quote}</p>
                {"outro" in p && p.outro && (
                  <p className="text-white font-bold text-sm border-t pt-3" style={{ borderColor: "#1a1a1a" }}>
                    {p.outro}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <CTA
          href="?phase=2"
          label="Understand the theory →"
          sub="Phase 2 of 4 - From assumption to evidence"
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

const experimentLifecycle = [
  { step: "State hypothesis",           note: "We believe X will result in Y. We will know when Z." },
  { step: "Implement behind flag",      note: "Default: off. Control group sees current behavior."   },
  { step: "Enable for subset",          note: "Treatment group gets the change. Measure both."       },
  { step: "Compare control vs treatment", note: "Use telemetry from M-08 to read the signal."       },
  { step: "Ship or kill",               note: "Never leave flags permanent — decide with data."      },
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
            The problem with opinion-driven development
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Most features are built on assumptions. &ldquo;Users want this.&rdquo; &ldquo;This will improve
            conversion.&rdquo; These are hypotheses — but they are never stated as hypotheses, never tested,
            and never validated. The result: teams build things that do not matter and cannot tell the difference.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            What is a hypothesis
          </h2>
          <p className="text-gray-400 leading-relaxed">
            A good hypothesis has three parts:
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {[
              { n: "1", text: "We believe that [change]" },
              { n: "2", text: "Will result in [outcome]" },
              { n: "3", text: "We will know this is true when [measurable signal]" },
            ].map((row, i) => (
              <div
                key={row.n}
                className="flex gap-4 px-5 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
              >
                <span className="text-xs font-mono font-bold shrink-0 w-4" style={{ color: "rgb(6,182,212)" }}>
                  {row.n}
                </span>
                <p className="text-sm text-gray-300 font-mono">{row.text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(75,85,99)" }}>
              Example
            </p>
            <pre
              className="text-xs font-mono leading-relaxed p-4 overflow-x-auto whitespace-pre-wrap"
              style={{ backgroundColor: "#0d0d0d", borderLeft: "3px solid rgb(31,41,55)", color: "rgb(156,163,175)" }}
            >
              {`We believe that adding pagination to /api/orders\nwill result in faster response times.\nWe will know this is true when p95 response time\ndrops below 100ms for requests with more than 50 orders.`}
            </pre>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">03</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Feature flags as experiment infrastructure
          </h2>
          <p className="text-gray-400 leading-relaxed">
            M-07 gave us feature flags for dark launches. Now we use them for A/B experiments.
            Flag off = control group. Flag on = treatment group. Measure both. Decide with data.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {experimentLifecycle.map((row, i) => (
              <div
                key={row.step}
                className="flex gap-4 px-5 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
              >
                <span
                  className="text-xs font-mono font-bold shrink-0 w-5"
                  style={{ color: "rgb(6,182,212)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-sm text-white font-mono">{row.step}</span>
                  <span className="text-xs text-gray-500">{row.note}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">04</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            The DORA connection
          </h2>
          <p className="text-gray-400 leading-relaxed">
            CFR drops when you ship smaller, validated changes instead of large, assumed-correct
            features. Failures are caught during the experiment phase, not after full rollout.
            Target: CFR from 4% to 2%.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {[
              { label: "Current CFR",      value: "4%",  color: "rgb(239,68,68)",  note: "Features shipped on assumptions — validated by customer complaints after full rollout." },
              { label: "Target after M-11", value: "2%", color: "rgb(6,182,212)", note: "Features validated by data before full rollout — failures caught in experiment phase." },
            ].map((row, i) => (
              <div
                key={row.label}
                className="flex items-start gap-5 px-5 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
              >
                <span className="text-2xl font-mono font-bold shrink-0" style={{ ...syne.style, color: row.color }}>{row.value}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-600">{row.label}</span>
                  <span className="text-sm text-gray-500">{row.note}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTA
          href="?phase=3"
          label="Build the experiment engine →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

const doraImpact = [
  {
    metric: "Change Failure Rate",
    code: "CFR",
    before: "4%",
    after: "2%",
    note: "failures caught during experiment phase, not after full rollout",
    highlight: true,
  },
  {
    metric: "Deployment Frequency",
    code: "DF",
    before: "Multiple×/week",
    after: "Multiple×/week",
    note: "unchanged",
    highlight: false,
  },
  {
    metric: "Lead Time for Changes",
    code: "LT",
    before: "5 days",
    after: "5 days",
    note: "unchanged",
    highlight: false,
  },
  {
    metric: "Mean Time to Restore",
    code: "MTTR",
    before: "30 min",
    after: "30 min",
    note: "unchanged",
    highlight: false,
  },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(6,182,212)" }}>
            Mission Complete - M-11
          </p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Nexus Corp Ships With Evidence
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            Features validated before full rollout. The change failure rate drops because failures are now caught
            during the experiment phase, not after the full rollout.
          </p>
        </div>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">CFR impact</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div
            className="flex flex-col gap-5 p-6 border"
            style={{
              backgroundColor: "#020d0f",
              borderColor: "rgba(6,182,212,0.3)",
              borderLeft: "3px solid rgb(6,182,212)",
            }}
          >
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-600">Before</span>
                <span className="text-4xl font-mono font-bold" style={{ ...syne.style, color: "rgb(239,68,68)" }}>4%</span>
                <span className="text-xs text-gray-600">features shipped on assumptions, validated by customer complaints</span>
              </div>
              <span className="text-2xl font-mono text-gray-700">→</span>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-600">After</span>
                <span className="text-4xl font-mono font-bold" style={{ ...syne.style, color: "rgb(6,182,212)" }}>2%</span>
                <span className="text-xs text-gray-600">features validated by data before full rollout</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-800 pt-4">
              The change failure rate drops because failures are now caught during the experiment phase, not after full rollout.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your impact on Nexus Corp</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {doraImpact.map((d) => (
              <div
                key={d.code}
                className="flex flex-col gap-4 border p-6"
                style={{
                  backgroundColor: d.highlight ? "#020d0f" : "#080808",
                  borderColor: d.highlight ? "rgba(6,182,212,0.3)" : "rgb(31,41,55)",
                  borderLeft: d.highlight ? "3px solid rgb(6,182,212)" : "3px solid rgb(31,41,55)",
                }}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{d.metric}</span>
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="text-lg font-mono font-bold"
                    style={{ ...syne.style, color: d.highlight ? "rgb(239,68,68)" : "rgb(75,85,99)" }}
                  >
                    {d.before}
                  </span>
                  <span className="font-mono text-gray-700">→</span>
                  <span
                    className="text-lg font-mono font-bold"
                    style={{ ...syne.style, color: d.highlight ? "rgb(6,182,212)" : "rgb(75,85,99)" }}
                  >
                    {d.after}
                  </span>
                </div>
                <p className="text-xs font-mono text-gray-600">{d.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">03</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What&apos;s next</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div
            className="flex flex-col gap-3 p-6 border"
            style={{
              backgroundColor: "#080808",
              borderColor: "rgba(6,182,212,0.2)",
              borderLeft: "3px solid rgb(6,182,212)",
            }}
          >
            <p className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: "rgb(6,182,212)" }}>
              Second Way: Feedback — In Progress
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Next: Review and Coordinate Changes — make code review a quality gate, not a bottleneck.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/dashboard"
              className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}
            >
              Back to dashboard →
            </a>
            <div
              className="flex items-center gap-3 px-8 py-4 text-sm font-mono border cursor-not-allowed"
              style={{ backgroundColor: "#0a0a0a", borderColor: "rgb(31,41,55)", color: "rgb(55,65,81)" }}
              title="Not yet available"
            >
              <span>⊘</span>
              Continue to M-12 →
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M11Page({
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
    const alreadyCompleted = gateUser
      ? await prisma.userProgress.findFirst({
          where: { userId: gateUser.id, moduleId: "M-11" },
        })
      : null
    if (!alreadyCompleted) redirect("?phase=3")
    try {
      await completeMission("M-11")
    } catch {
      // Neon HTTP adapter does not support transactions; progress save is best-effort
    }
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
