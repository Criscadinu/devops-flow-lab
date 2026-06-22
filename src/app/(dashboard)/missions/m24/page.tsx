import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-24 Monitor and Alert - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(255,85,0)" }}>
          M-24
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Monitor and Alert
        </span>
        <span className="text-xs font-mono text-gray-600 tracking-widest uppercase">
          Phase {fase} of 4
        </span>
      </div>
      <div className="max-w-5xl mx-auto mt-3">
        <div className="w-full h-px bg-gray-800">
          <div className="h-px transition-all" style={{ width: pct, background: "linear-gradient(90deg, #FF0000 0%, #FF8C00 100%)" }} />
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
        style={{ background: "linear-gradient(135deg, #FF0000 0%, #FF5500 50%, #FF8C00 100%)", color: "#fff", ...syne.style, fontWeight: 700 }}
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
        &ldquo;We have metrics now. I check them manually every morning. Last Tuesday I forgot.
        That was the day the error rate hit <mark>23%</mark>. A customer called us.&rdquo;
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
        &ldquo;I pushed a fix at 4pm. By 9pm I had no idea if it was still holding. Nobody told me.
        I checked the logs manually at <mark>11pm</mark> before I could sleep.&rdquo;
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
        &ldquo;Support tickets spiked <mark>three times</mark> this month. Each time we found out
        from customers. Each time we said &lsquo;we need better monitoring&rsquo;. Nothing changed.&rdquo;
      </>
    ),
  },
  {
    initials: "YOU",
    name: "You",
    role: "New Engineer",
    badge: "PLAYER",
    accent: "rgb(255,85,0)",
    badgeBg: "rgba(255,85,0,0.08)",
    badgeBorder: "rgba(255,85,0,0.3)",
    isPlayer: true,
    quote: (
      <>
        &ldquo;Telemetry without alerting is a dashboard nobody watches. We need the system to
        tell us when something is wrong — before the customer does.&rdquo;
      </>
    ),
    outro: "Make the system speak.",
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
            Week nine. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            The logs are flowing. The metrics are there. But nobody is watching. Problems are still reported by customers, not by systems.
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
          sub="Phase 2 of 4 - From telemetry to alerting"
        />
      </div>

      <style>{`
        mark {
          background: none;
          color: rgb(255,85,0);
          font-family: monospace;
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}

// ─── Phase 2 - The theory ─────────────────────────────────────────────────────

const alertExample = `{
  "status": "WARNING",
  "checks": {
    "error_rate": { "value": "3.2%", "threshold": "1%", "status": "WARNING" },
    "uptime":     { "value": 3600,   "threshold": 60,   "status": "OK"      }
  },
  "timestamp": "2024-01-15T09:14:22Z"
}`

const alertProperties = [
  {
    num: "01",
    title: "Actionable",
    body: "Every alert should have a clear response. If you do not know what to do when it fires, it should not be an alert. Alerts are not notifications — they are calls to action.",
    accent: "rgb(255,85,0)",
  },
  {
    num: "02",
    title: "Threshold-based",
    body: "Not 'something changed' but 'error rate exceeded 5% for 2 minutes'. Vague alerts cause alarm fatigue. Precise thresholds cause precise responses.",
    accent: "rgb(34,197,94)",
  },
  {
    num: "03",
    title: "Configurable",
    body: "Thresholds should be environment variables, not hardcoded values. Production and staging have different traffic patterns. Tune per environment without touching code.",
    accent: "rgb(251,146,60)",
  },
]

const alertLevels = [
  {
    level: "OK",
    color: "rgb(34,197,94)",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.3)",
    def: "All checks pass. System operating within normal parameters.",
    action: "No action required.",
  },
  {
    level: "WARNING",
    color: "rgb(234,179,8)",
    bg: "rgba(234,179,8,0.08)",
    border: "rgba(234,179,8,0.3)",
    def: "Degraded performance. One or more metrics approaching critical threshold.",
    action: "Investigate soon. Not user-impacting yet.",
  },
  {
    level: "CRITICAL",
    color: "rgb(239,68,68)",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.3)",
    def: "Service impact. One or more checks in critical state.",
    action: "Act now. Users are being affected.",
  },
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
            The gap between data and action
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Having metrics is not enough. MTTR improved from <span className="text-white font-mono font-bold">72 hours</span> to{" "}
            <span className="text-white font-mono font-bold">4 hours</span> in M-23 because you can
            now find problems faster. But you still find them too late — after customers notice.
          </p>
          <p className="text-gray-400 leading-relaxed">
            The missing piece is automated alerting: the system tells you when something crosses a
            threshold. Detection goes from hours to seconds.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Bad alert",
                example: '"Something is wrong"',
                note: "No threshold. No context. No action. Causes panic, not response.",
                accent: "rgb(239,68,68)",
              },
              {
                label: "Good alert",
                example: '"Error rate 7.3% — threshold 5% — check /api/orders logs"',
                note: "Specific value. Known threshold. Clear first action.",
                accent: "rgb(34,197,94)",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-3 p-5 border"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)", borderLeft: `3px solid ${item.accent}` }}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: item.accent }}>
                  {item.label}
                </span>
                <p className="text-sm font-mono text-white">{item.example}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            What makes a good alert
          </h2>
          <div className="flex flex-col gap-3">
            {alertProperties.map((p) => (
              <div
                key={p.num}
                className="flex gap-4 p-5 border"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)", borderLeft: `3px solid ${p.accent}` }}
              >
                <span className="text-xs font-mono font-bold shrink-0 mt-0.5" style={{ color: p.accent }}>{p.num}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-white">{p.title}</span>
                  <p className="text-sm text-gray-400 leading-relaxed">{p.body}</p>
                </div>
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
            Alert levels
          </h2>
          <div className="flex flex-col gap-3">
            {alertLevels.map((l) => (
              <div
                key={l.level}
                className="flex flex-col gap-2 p-5 border"
                style={{ backgroundColor: l.bg, borderColor: l.border, borderLeft: `3px solid ${l.color}` }}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: l.color }}>
                  {l.level}
                </span>
                <p className="text-sm text-gray-300 leading-relaxed">{l.def}</p>
                <p className="text-xs font-mono text-gray-500">{l.action}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(75,85,99)" }}>
              What /api/alerts will return
            </p>
            <pre
              className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
              style={{ backgroundColor: "#0d0d0d", borderLeft: "3px solid rgb(31,41,55)", color: "rgb(156,163,175)" }}
            >
              {alertExample}
            </pre>
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
            MTTR measures recovery time. Recovery starts at <em className="text-white not-italic font-semibold">detection</em>.
            Manual detection — someone checks a dashboard — adds minutes to hours of delay.
            Automated alerting means detection is instant.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {[
              { label: "Current MTTR",      value: "4 hours", color: "rgb(239,68,68)",  note: "Metrics exist but require manual checking. Someone has to notice." },
              { label: "Target after M-24", value: "1 hour",  color: "rgb(255,85,0)", note: "Automated alerts fire when thresholds are crossed. Detection is now instant." },
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
          label="Add alerting to Nexus Corp →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

const beforeAfter = [
  { before: "Error rate hit 23% — detected by a customer call",       after: "Error rate threshold fires an alert within seconds"          },
  { before: "Manual dashboard checks every morning (sometimes skipped)", after: "/api/alerts is polled automatically by any monitoring tool" },
  { before: "Developer checks logs at 11pm to verify a fix held",     after: "Alert silence after a fix confirms recovery automatically"    },
  { before: "Support ticket spike = first sign of an incident",       after: "CRITICAL alert fires before the first support ticket"        },
]

const doraImpact = [
  {
    metric: "Mean Time to Restore",
    code: "MTTR",
    before: "4 hours",
    after: "1 hour",
    note: "automated detection collapses the time between incident start and human awareness",
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
    metric: "Change Failure Rate",
    code: "CFR",
    before: "4%",
    after: "4%",
    note: "unchanged — alerting detects failures faster, does not prevent them",
    highlight: false,
  },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(255,85,0)" }}>
            Mission Complete - M-24
          </p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Nexus Corp Stops Flying Blind
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
                  borderColor: d.highlight ? "rgba(255,85,0,0.3)" : "rgb(31,41,55)",
                  borderLeft: d.highlight ? "3px solid rgb(255,85,0)" : "3px solid rgb(31,41,55)",
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
                    style={{ ...syne.style, color: d.highlight ? "rgb(255,85,0)" : "rgb(75,85,99)" }}
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
              The reduction from 4 hours to 1 hour comes entirely from detection time. Before:
              someone notices something is wrong, checks the logs, confirms the problem. Now: the
              system detects the threshold breach and fires an alert. The time between incident
              start and human awareness collapses from hours to seconds.
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
              borderColor: "rgba(255,85,0,0.2)",
              borderLeft: "3px solid rgb(255,85,0)",
            }}
          >
            <p className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: "rgb(255,85,0)" }}>
              Second Way: Feedback — In Progress
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Next: Fast Incident Response — alerts fire, but does your team know what to do?
              Build the runbook and the process that turns alerts into resolved incidents.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/dashboard"
              className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ background: "linear-gradient(135deg, #FF0000 0%, #FF5500 50%, #FF8C00 100%)", color: "#fff", ...syne.style, fontWeight: 700 }}
            >
              Back to dashboard →
            </a>
            <div
              className="flex items-center gap-3 px-8 py-4 text-sm font-mono border cursor-not-allowed"
              style={{ backgroundColor: "#0a0a0a", borderColor: "rgb(31,41,55)", color: "rgb(55,65,81)" }}
              title="Not yet available"
            >
              <span>⊘</span>
              Continue to M-17 →
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M09Page({
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
    await completeMission("M-24")

    // Now verify it actually exists (guards against DB errors)
    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-24" },
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
