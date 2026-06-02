import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-23 Create Telemetry - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>
          M-23
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Create Telemetry
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
    initials: "MA",
    name: "Marco",
    role: "Ops Engineer",
    badge: "OPS",
    accent: "rgb(239,68,68)",
    badgeBg: "rgba(239,68,68,0.08)",
    badgeBorder: "rgba(239,68,68,0.3)",
    quote: (
      <>
        &ldquo;Production went down at 2am. I spent <mark>3 hours</mark> SSH-ing through servers
        reading raw log files. I still don&apos;t know the root cause.&rdquo;
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
        &ldquo;I pushed a fix but I have no idea if it actually helped. The only feedback I get is
        &ldquo;it seems better now&rdquo; from support.&rdquo;
      </>
    ),
  },
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
        &ldquo;We have logs. Somewhere. Nobody knows where. Last month someone deleted them to free
        up <mark>disk space</mark>.&rdquo;
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
        &ldquo;If you cannot measure it, you cannot improve it. Nexus Corp is flying blind.
        Time to add eyes.&rdquo;
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
            Week eight. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            The pipeline is green. Deployments are faster. But nobody knows what the app is actually doing in production.
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
          sub="Phase 2 of 4 - The three pillars of observability"
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

const pillars = [
  {
    num: "01",
    title: "Logs",
    body: "A record of what happened. Every request should emit a structured log line with timestamp, method, path, status code, and duration. Unstructured logs (console.log) cannot be searched, filtered, or aggregated.",
    accent: "rgb(6,182,212)",
    bg: "#020d0f",
    border: "rgba(6,182,212,0.25)",
    example: `{"timestamp":"2024-01-15T02:31:44Z","level":"info","method":"GET","path":"/api/orders","status":200,"duration_ms":23}`,
  },
  {
    num: "02",
    title: "Metrics",
    body: "Numerical measurements over time. Counters (requests served, errors thrown) and gauges (memory usage, active connections). Metrics answer: how often? how many? is this normal?",
    accent: "rgb(34,197,94)",
    bg: "#020a02",
    border: "rgba(34,197,94,0.25)",
    example: `{ requests_total: 14820, errors_total: 3, error_rate: "0.02%", uptime_seconds: 86400 }`,
  },
  {
    num: "03",
    title: "Traces",
    body: "A record of a single request across all services. Shows where time was spent. Traces answer: why was this request slow? which service is the bottleneck? (Coming in a future mission.)",
    accent: "rgb(167,139,250)",
    bg: "#06020a",
    border: "rgba(167,139,250,0.25)",
    example: null,
  },
]

const healthBefore = `{ "status": "ok" }`
const healthAfter = `{
  "status": "ok",
  "version": "1.4.2",
  "uptime_seconds": 86400,
  "memory": { "used_mb": 48, "total_mb": 128 },
  "timestamp": "2024-01-15T14:22:00Z"
}`

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
            Why telemetry matters
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Nexus Corp deploys more often now. But faster deployments into darkness is not progress.
            MTTR is still <span className="text-white font-mono font-bold">72 hours</span> because
            finding problems requires SSH access and manual log hunting. You cannot fix what you
            cannot see.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Telemetry fixes this. It makes production observable — not just running, but
            understandable. When something breaks, you know within seconds, not hours.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            The Three Pillars of Observability
          </h2>
          <div className="flex flex-col gap-4">
            {pillars.map((p) => (
              <div
                key={p.num}
                className="flex flex-col gap-3 p-6 border"
                style={{ backgroundColor: p.bg, borderColor: p.border, borderLeft: `3px solid ${p.accent}` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold" style={{ color: p.accent }}>{p.num}</span>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: p.accent }}>{p.title}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
                {p.example && (
                  <pre
                    className="text-xs font-mono leading-relaxed p-3 overflow-x-auto"
                    style={{ backgroundColor: "#0d0d0d", borderLeft: "3px solid rgb(31,41,55)", color: "rgb(156,163,175)" }}
                  >
                    {p.example}
                  </pre>
                )}
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
            What a real /health endpoint looks like
          </h2>
          <p className="text-gray-400 leading-relaxed">
            A health check that only returns <code className="text-white font-mono">{`{ "status": "ok" }`}</code> tells
            you nothing. A real health check tells you whether the app is about to fail before it does.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Before (useless)", code: healthBefore, accent: "rgb(239,68,68)" },
              { label: "After (observable)", code: healthAfter, accent: "rgb(34,197,94)" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-3 p-5 border"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)", borderLeft: `3px solid ${item.accent}` }}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: item.accent }}>
                  {item.label}
                </span>
                <pre
                  className="text-xs font-mono leading-relaxed overflow-x-auto"
                  style={{ color: "rgb(156,163,175)" }}
                >
                  {item.code}
                </pre>
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
            MTTR measures how fast you recover from incidents. But you cannot recover fast if you
            cannot <em className="text-white not-italic font-semibold">detect</em>. Telemetry is
            the prerequisite for MTTR improvement.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {[
              { label: "Current MTTR",   value: "72 hours", color: "rgb(239,68,68)",  note: "Detected by customer complaints. Diagnosed by SSH log hunting." },
              { label: "Target after M-23", value: "4 hours",  color: "rgb(6,182,212)", note: "Structured logs, health endpoint, error rate visible in /api/metrics." },
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
          label="Add telemetry to Nexus Corp →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

const beforeAfter = [
  { before: "Incidents detected by customer complaints",  after: "Errors visible in /api/metrics within seconds"       },
  { before: "Diagnosis required SSH access to servers",  after: "Structured logs searchable and filterable"             },
  { before: "MTTR: 72 hours of manual log hunting",      after: "MTTR: 4 hours — root cause visible immediately"       },
  { before: "/health just returned { status: 'ok' }",    after: "/health shows uptime, memory, version, timestamp"     },
]

const doraImpact = [
  {
    metric: "Mean Time to Restore",
    code: "MTTR",
    before: "72 hours",
    after: "4 hours",
    note: "structured logs and metrics cut detection and diagnosis time by 95%",
    highlight: true,
  },
  {
    metric: "Deployment Frequency",
    code: "DF",
    before: "Multiple×/week",
    after: "Multiple×/week",
    note: "unchanged — telemetry does not affect deploy frequency directly",
    highlight: false,
  },
  {
    metric: "Lead Time for Changes",
    code: "LT",
    before: "5 days",
    after: "5 days",
    note: "unchanged — telemetry is a prerequisite for further improvement",
    highlight: false,
  },
  {
    metric: "Change Failure Rate",
    code: "CFR",
    before: "4%",
    after: "4%",
    note: "unchanged — but failures are now visible and recoverable faster",
    highlight: false,
  },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(6,182,212)" }}>
            Mission Complete - M-23
          </p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Nexus Corp Can Now See
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            This is what you built for Nexus Corp.
          </p>
        </div>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What changed</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="border border-gray-800">
            <div className="grid grid-cols-2 border-b border-gray-800" style={{ backgroundColor: "#0d0d0d" }}>
              <div className="px-5 py-3 border-r border-gray-800">
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(239,68,68)" }}>Before</span>
              </div>
              <div className="px-5 py-3">
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(34,197,94)" }}>After</span>
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

          <div
            className="p-5 border"
            style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)", borderLeft: "3px solid rgb(75,85,99)" }}
          >
            <p className="text-sm text-gray-500 leading-relaxed">
              Telemetry does not directly improve deployment frequency or lead time. But it is the
              prerequisite for everything in the Second Way. Without measurement, feedback is impossible.
            </p>
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
              Next: Build a monitoring dashboard on top of this telemetry — and set up alerts so
              Marco sleeps through the night.
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
              Continue to M-24 →
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M08Page({
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
    await completeMission("M-23")

    // Now verify it actually exists (guards against DB errors)
    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-23" },
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
