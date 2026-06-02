import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-27 Chaos Engineering - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>
          M-27
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Chaos Engineering
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
        &ldquo;The orders service depends on an internal user lookup service. When that service slowed down,
        orders started timing out. We had <mark>no timeout configured</mark>. We did not know the
        dependency existed until it broke.&rdquo;
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
        &ldquo;We assume our system is resilient. We have never tested that assumption. The only time
        we discover failure modes is when they happen <mark>in production, at 3am, to real users</mark>.&rdquo;
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
        &ldquo;Our test suite checks the happy path. It does not check what happens when a dependency
        is slow, or unavailable, or returns garbage. We are testing <mark>the system we built, not
        the system that runs in production</mark>.&rdquo;
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
        &ldquo;Chaos engineering is the discipline of breaking things deliberately — in a controlled
        way — to find weaknesses before they find you. <mark>If it is going to fail, fail it on your terms.</mark>&rdquo;
      </>
    ),
    outro: "Break it before it breaks you.",
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
            Week fifteen. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Last month the orders service went down because a dependency nobody knew about failed silently. The system had never been tested under failure conditions. Nobody knew it would break that way.
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
          sub="Phase 2 of 4 - Deliberately breaking things"
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

const experimentSteps = [
  { step: "Define steady state",  note: "What does normal look like? (error rate < 1%, p95 latency < 200ms)"         },
  { step: "State hypothesis",     note: "We believe the system will maintain steady state when X fails."               },
  { step: "Inject failure",       note: "Slow down a dependency, kill a process, exhaust a resource."                  },
  { step: "Measure",              note: "Did the system maintain steady state?"                                         },
  { step: "Fix the weakness",     note: "Add timeouts, retries, circuit breakers, fallbacks."                          },
  { step: "Document",             note: "Add the failure mode to the runbook."                                          },
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
            What is chaos engineering
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Chaos engineering is the practice of intentionally injecting failures into a system to test
            its resilience. Netflix invented the discipline with Chaos Monkey — a tool that randomly
            terminated production servers to force engineers to build systems that could survive the
            loss of any individual component. The insight: systems that have never failed under
            controlled conditions will fail under uncontrolled ones.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Without chaos engineering",
                items: [
                  "Failure modes discovered in production at 3am",
                  "Hidden dependencies revealed by outages",
                  "No timeouts — one slow service hangs everything",
                  "Recovery is improvised under pressure",
                ],
                accent: "rgb(239,68,68)",
              },
              {
                label: "With chaos engineering",
                items: [
                  "Failure modes discovered in controlled experiments",
                  "Dependencies mapped and tested before they matter",
                  "Timeouts configured — failure is bounded",
                  "Recovery is practiced and documented",
                ],
                accent: "rgb(34,197,94)",
              },
            ].map((col) => (
              <div
                key={col.label}
                className="flex flex-col gap-3 p-5 border"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)", borderLeft: `3px solid ${col.accent}` }}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: col.accent }}>
                  {col.label}
                </span>
                <div className="flex flex-col gap-2">
                  {col.items.map((item, i) => (
                    <p key={i} className="text-xs text-gray-400 leading-relaxed">{item}</p>
                  ))}
                </div>
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
            The chaos experiment lifecycle
          </h2>
          <p className="text-gray-400 leading-relaxed">
            A chaos experiment follows the same structure as a hypothesis from M-18. Every experiment
            starts with a clear definition of normal and ends with a documented fix — not just an
            observation.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {experimentSteps.map((row, i) => (
              <div
                key={row.step}
                className="flex gap-4 px-5 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
              >
                <span className="text-xs font-mono font-bold shrink-0 w-5" style={{ color: "rgb(6,182,212)" }}>
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
            <span className="text-xs font-mono text-gray-700 tracking-widest">03</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Start small: the three beginner experiments
          </h2>
          <p className="text-gray-400 leading-relaxed">
            You do not need Chaos Monkey to start. Three experiments every team should run — each
            reveals a different class of failure mode.
          </p>
          <div className="flex flex-col gap-4">
            {[
              {
                number: "01",
                title: "Kill the process",
                body: "Stop the app mid-request. Does it restart? How long does it take? Do requests queue or drop? Tests your restart policy and recovery time.",
              },
              {
                number: "02",
                title: "Slow the dependency",
                body: "Add artificial latency to an upstream service. Does your app timeout gracefully or hang forever? Tests your timeout configuration.",
              },
              {
                number: "03",
                title: "Exhaust the resource",
                body: "Fill the disk, spike memory, max out connections. What fails first? Does the app crash or degrade gracefully? Tests your resource limits and fallback behavior.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="flex gap-4 p-5 border"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)", borderLeft: "3px solid rgba(6,182,212,0.4)" }}
              >
                <span className="text-xs font-mono font-bold shrink-0 mt-0.5" style={{ color: "rgb(6,182,212)" }}>
                  {item.number}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-white font-mono font-bold">{item.title}</span>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
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
            Chaos engineering directly validates CFR and MTTR. Teams that practice chaos engineering
            find failure modes before users do — confirming the change failure rate holds under
            adversarial conditions. And because they have already seen and fixed the failure, recovery
            is faster when it does happen for real.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {[
              {
                label: "CFR target: 1%",
                note: "Validate that failure rate stays below 1% even when dependencies misbehave. If it does not — fix it now.",
                color: "rgb(6,182,212)",
              },
              {
                label: "MTTR target: 30 min",
                note: "Validate that the documented recovery path gets you back in 30 minutes. If it does not — update the runbook.",
                color: "rgb(6,182,212)",
              },
            ].map((row, i) => (
              <div
                key={row.label}
                className="flex items-start gap-5 px-5 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
              >
                <span className="text-sm font-mono font-bold shrink-0" style={{ ...syne.style, color: row.color }}>{row.label}</span>
                <span className="text-sm text-gray-500">{row.note}</span>
              </div>
            ))}
          </div>
        </section>

        <CTA
          href="?phase=3"
          label="Break things deliberately →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

const doraValidated = [
  {
    metric: "Change Failure Rate",
    code: "CFR",
    value: "1%",
    status: "VALIDATED",
    note: "confirmed resilient under dependency failure and process crash",
    highlight: true,
  },
  {
    metric: "Mean Time to Restore",
    code: "MTTR",
    value: "30 min",
    status: "VALIDATED",
    note: "recovery paths documented and tested — not improvised under pressure",
    highlight: true,
  },
  {
    metric: "Deployment Frequency",
    code: "DF",
    value: "Multiple×/week",
    status: "PROTECTED",
    note: "timeout middleware prevents slow dependencies from blocking deploys",
    highlight: false,
  },
  {
    metric: "Lead Time for Changes",
    code: "LT",
    value: "5 days",
    status: "PROTECTED",
    note: "chaos experiments run in isolation — no impact on development flow",
    highlight: false,
  },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(6,182,212)" }}>
            Mission Complete - M-27
          </p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Nexus Corp Breaks Things On Purpose
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            Chaos engineering does not improve your metrics — it validates them. You already achieved
            CFR 1% and MTTR 30 minutes. Now you know those numbers hold when dependencies fail,
            processes crash, and resources are exhausted. That is the difference between metrics
            you measured and metrics you trust.
          </p>
        </div>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your DORA metrics — validated and protected</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {doraValidated.map((d) => (
              <div
                key={d.code}
                className="flex flex-col gap-4 border p-6"
                style={{
                  backgroundColor: d.highlight ? "#020d0f" : "#060f06",
                  borderColor: d.highlight ? "rgba(6,182,212,0.3)" : "rgba(34,197,94,0.25)",
                  borderLeft: d.highlight ? "3px solid rgb(6,182,212)" : "3px solid rgba(34,197,94,0.6)",
                }}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{d.metric}</span>
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono shrink-0" style={{ color: d.highlight ? "rgb(6,182,212)" : "rgb(34,197,94)" }}>✓</span>
                  <span
                    className="text-lg font-mono font-bold"
                    style={{ ...syne.style, color: d.highlight ? "rgb(6,182,212)" : "rgb(34,197,94)" }}
                  >
                    {d.value}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-mono font-bold px-1.5 py-0.5 uppercase tracking-widest"
                    style={{
                      color: d.highlight ? "rgb(6,182,212)" : "rgb(34,197,94)",
                      backgroundColor: d.highlight ? "rgba(6,182,212,0.08)" : "rgba(34,197,94,0.08)",
                      border: d.highlight ? "1px solid rgba(6,182,212,0.3)" : "1px solid rgba(34,197,94,0.3)",
                    }}
                  >
                    {d.status}
                  </span>
                </div>
                <p className="text-xs font-mono text-gray-600">{d.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What you built</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div
            className="flex flex-col gap-5 p-6 border"
            style={{
              backgroundColor: "#080808",
              borderColor: "rgba(6,182,212,0.2)",
              borderLeft: "3px solid rgb(6,182,212)",
            }}
          >
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(6,182,212)" }}>
              Resilience is now tested, not assumed
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Process kill experiment: restart policy confirmed, recovery time measured",
                "/api/chaos/slow endpoint: slow dependency simulation in version control",
                "Request timeout middleware: REQUEST_TIMEOUT_MS wired to environment variable",
                "Known failure modes: process crash, slow dependency, resource exhaustion documented in runbook",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "rgb(34,197,94)" }}>✓</span>
                  <p className="text-sm text-gray-400">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">03</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Mission catalog complete</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div
            className="flex flex-col gap-4 p-6 border"
            style={{
              backgroundColor: "#080808",
              borderColor: "rgba(6,182,212,0.2)",
              borderLeft: "3px solid rgb(6,182,212)",
            }}
          >
            <p className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: "rgb(6,182,212)" }}>
              End of current mission catalog
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              More Third Way missions are coming: Making Work Visible, Improvement Kata, and
              organizational learning at scale. You have built a high-performing engineering organization
              from scratch — from a 41-day lead time to elite DORA metrics across all four dimensions.
            </p>
            <div className="flex flex-col gap-2 border-t border-gray-800 pt-4">
              {[
                "First Way: Flow — M-01 through M-20 complete",
                "Second Way: Feedback — M-23 through M-19 complete",
                "Third Way: Learning — M-25 through M-27 complete",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "rgb(6,182,212)" }}>✓</span>
                  <p className="text-sm text-gray-400">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <a
            href="/dashboard"
            className="self-start px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
            style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}
          >
            Back to dashboard →
          </a>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M15Page({
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
    await completeMission("M-27")

    // Now verify it actually exists (guards against DB errors)
    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-27" },
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
