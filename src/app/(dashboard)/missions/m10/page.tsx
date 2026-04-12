import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-10 Fast Incident Response - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>
          M-10
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Fast Incident Response
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
        &ldquo;The alert fired. I saw it. But I did not know if it was my problem or Lisa&apos;s.
        I called her. She said call Tom. Tom did not pick up. I started fixing it myself at{" "}
        <mark>3:30am</mark>.&rdquo;
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
        &ldquo;There is no process. Every incident is improvised. Sometimes Marco leads. Sometimes
        I lead. Sometimes we both start fixing the same thing and <mark>make it worse</mark>.&rdquo;
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
        &ldquo;MTTR is still too high. Not because we cannot fix things — we can. It is because
        we lose the first <mark>30 to 60 minutes</mark> figuring out who does what.&rdquo;
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
        &ldquo;An alert without a runbook is just noise with a timestamp. We need a process: who
        responds, what they check first, how they communicate, and how we close the incident.&rdquo;
      </>
    ),
    outro: "Process beats heroics.",
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
            Week ten. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            The alert fired at 2:47am. Nobody knew what to do. Marco called Lisa. Lisa called Tom. Forty minutes later they were still arguing about who should fix it.
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
          sub="Phase 2 of 4 - From alert to resolution"
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

const incidentPhases = [
  { phase: "Detection",  note: "Alert fires. M-09 solved this — it is now instant."                       },
  { phase: "Triage",     note: "What is the blast radius? Who owns it? What is the fix path?"             },
  { phase: "Fix",        note: "Apply the fix or roll back."                                              },
  { phase: "Verify",     note: "Confirm /api/alerts returns OK and error rate is back to normal."         },
  { phase: "Close",      note: "Update /api/status to operational. Post resolution in #incidents."        },
  { phase: "Review",     note: "Blameless postmortem within 48 hours. What do we change so it does not happen again?" },
]

const runbookEntry = `## High Error Rate Alert
**Threshold:** error_rate > 5%
**First check:** GET /api/alerts — confirm status is CRITICAL
**Second check:** GET /health — check uptime and memory
**Likely causes:** recent deploy, database issue, upstream dependency
**Fix path:** roll back last deploy → check logs → escalate if unresolved in 15min
**Escalation:** ping #incidents Slack channel, notify Sarah`

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
            The anatomy of an incident
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Every incident has the same phases. The time lost at Nexus Corp is almost always in
            the first two: detection (now solved by M-09) and triage. Triage means: what is the
            blast radius, who owns it, what is the fix path?
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {incidentPhases.map((row, i) => (
              <div
                key={row.phase}
                className="flex gap-4 px-5 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
              >
                <span
                  className="text-xs font-mono font-bold shrink-0 w-20"
                  style={{ color: i < 2 ? "rgb(6,182,212)" : "rgb(75,85,99)" }}
                >
                  {String(i + 1).padStart(2, "0")} {row.phase}
                </span>
                <p className="text-xs text-gray-500 leading-relaxed">{row.note}</p>
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
            The runbook
          </h2>
          <p className="text-gray-400 leading-relaxed">
            A runbook is a documented response procedure for a known failure mode. Not a novel — a
            checklist. When an alert fires, the on-call engineer opens the runbook, follows the
            steps, and resolves the incident without needing to think from scratch at 3am.
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(75,85,99)" }}>
              Example runbook entry
            </p>
            <pre
              className="text-xs font-mono leading-relaxed p-4 overflow-x-auto"
              style={{ backgroundColor: "#0d0d0d", borderLeft: "3px solid rgb(31,41,55)", color: "rgb(156,163,175)" }}
            >
              {runbookEntry}
            </pre>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">03</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Incident communication
          </h2>
          <p className="text-gray-400 leading-relaxed">
            The status endpoint (<code className="text-white font-mono">/api/status</code>) is your
            public-facing incident page. Internal: Slack channel. External: status page. Rule:
            communicate early and often.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Bad",
                example: "Silence for 30 minutes.",
                note: "Stakeholders assume the worst. Support inbox fills up. Trust erodes.",
                accent: "rgb(239,68,68)",
              },
              {
                label: "Good",
                example: '"Investigating high error rate since 02:47. Update in 15 minutes."',
                note: 'Posted in 5 minutes. Even "investigating" is better than silence.',
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
            <span className="text-xs font-mono text-gray-700 tracking-widest">04</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            The DORA connection
          </h2>
          <p className="text-gray-400 leading-relaxed">
            MTTR 1 hour → 30 minutes. The remaining time is now in fix and verify, not in triage.
            A runbook eliminates the &ldquo;who does what&rdquo; conversation. A status endpoint
            eliminates the &ldquo;is anyone working on it&rdquo; question.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {[
              { label: "Current MTTR",      value: "1 hour",    color: "rgb(239,68,68)",  note: "Alerts fire but triage is improvised — 30-60 minutes lost figuring out who does what." },
              { label: "Target after M-10", value: "30 minutes", color: "rgb(6,182,212)", note: "Runbook eliminates triage chaos — first responder knows exactly what to check and when to escalate." },
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
          label="Build the incident process →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

const beforeAfter = [
  { before: "Alert at 2:47am — 40 minutes of phone calls before anyone starts fixing",  after: "Alert at 2:47am — on-call opens runbook, starts fixing within 5 minutes"    },
  { before: "Multiple engineers fixing the same thing, making it worse",                 after: "Single first responder; escalation path defined and time-boxed"              },
  { before: "Stakeholders find out from support tickets, not from the team",             after: "/api/status updated to degraded within minutes of incident start"            },
  { before: "No postmortem — incident forgotten after the fix",                          after: "Blameless postmortem within 48 hours, learnings committed to runbook"        },
]

const doraImpact = [
  {
    metric: "Mean Time to Restore",
    code: "MTTR",
    before: "1 hour",
    after: "30 minutes",
    note: "runbook eliminates the triage phase — first responder knows what to do immediately",
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
    note: "unchanged — process improves recovery, not prevention",
    highlight: false,
  },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(6,182,212)" }}>
            Mission Complete - M-10
          </p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Nexus Corp Has a Process
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
              The runbook does not make engineers faster. It eliminates the time they spend being
              slow — the 3am phone calls, the overlapping fix attempts, the &ldquo;is anyone working on
              this&rdquo; messages. Process is not bureaucracy when it is the difference between 30
              minutes and 3 hours.
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
              Next: Hypothesis-Driven Development — stop shipping features and hoping they work.
              Build the experiment engine that turns feature flags into data-driven decisions.
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
              Continue to M-11 →
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M10Page({
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
    await completeMission("M-10")

    // Now verify it actually exists (guards against DB errors)
    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-10" },
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
