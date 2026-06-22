import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-25 Blameless Postmortems - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(255,85,0)" }}>
          M-25
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Blameless Postmortems
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
        &ldquo;After the health endpoint outage, the first thing Tom asked was &lsquo;who pushed that?&rsquo;
        Lisa didn&apos;t say anything in the next standup. Neither did I. <mark>We stopped talking about failures.</mark>
        That&apos;s when things start going wrong again.&rdquo;
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
        &ldquo;I was afraid to talk about what happened. But the problem wasn&apos;t me — it was
        a process that made it <mark>too easy to push directly to main</mark>. Blaming me
        doesn&apos;t fix the process. It just makes the next person hide it.&rdquo;
      </>
    ),
  },
  {
    initials: "SM",
    name: "Sam",
    role: "Engineering Manager",
    badge: "EM",
    accent: "rgb(251,146,60)",
    badgeBg: "rgba(251,146,60,0.08)",
    badgeBorder: "rgba(251,146,60,0.3)",
    quote: (
      <>
        &ldquo;Every incident has a root cause. Rarely is the root cause a person — it&apos;s almost
        always a <mark>system, a process, or a missing safeguard</mark>. The goal of a postmortem
        is not accountability. It is improvement.&rdquo;
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
        &ldquo;A blameless postmortem documents what happened, why, and what changes will prevent
        it. It is a <mark>permanent record that turns incidents into improvements</mark>.
        The process is more valuable than any individual fix.&rdquo;
      </>
    ),
    outro: "Document the failure. Learn from it. Never repeat it.",
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
            Week thirteen. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            The health endpoint outage was fixed. Branch protection is in place. But nobody wrote down what happened or why. The next engineer to touch that code will have no idea how close it came to a two-hour outage.
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
          sub="Phase 2 of 4 - From blame to systemic learning"
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
            Why blameless?
          </h2>
          <p className="text-gray-400 leading-relaxed">
            When engineers fear blame, they hide incidents, underreport near-misses, and avoid the
            areas of the codebase they know are fragile. The cost of blame culture is not just morale
            — it is incomplete information. You cannot fix a system you do not fully understand.
            Blameless postmortems create the conditions for honest reporting.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Blame culture",
                items: [
                  "Incidents are hidden or minimized",
                  "Root cause is always 'human error'",
                  "Engineers avoid risky areas",
                  "Same incidents recur",
                ],
                accent: "rgb(239,68,68)",
              },
              {
                label: "Blameless culture",
                items: [
                  "Incidents are reported fully and honestly",
                  "Root cause is systemic — process, tooling, design",
                  "Engineers surface fragile areas proactively",
                  "Each incident improves the system",
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
            What a postmortem is — and is not
          </h2>
          <p className="text-gray-400 leading-relaxed">
            A postmortem is a structured document. It records what happened, the timeline of the
            incident, the root cause, what went well, what went poorly, and the specific action
            items that will prevent recurrence. It is not a blame report. It is not a retrospective.
            It is not optional. It is the primary mechanism by which your team learns from production.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {[
              { section: "Summary",             note: "What broke, for how long, and the business impact. One paragraph."         },
              { section: "Timeline",            note: "Exact sequence of events with timestamps. Reveals detection and response."  },
              { section: "Root cause",          note: "The specific condition that caused the failure. Never 'human error.'"       },
              { section: "Contributing factors",note: "The system properties that made the root cause possible."                   },
              { section: "What went well",      note: "What worked — monitoring, communication, tooling. Reinforce it."            },
              { section: "What went poorly",    note: "What failed — gaps in process, missing safeguards, slow detection."         },
              { section: "Action items",        note: "Specific, assigned, dated changes. Not suggestions — commitments."          },
            ].map((row, i) => (
              <div
                key={row.section}
                className="flex gap-4 px-5 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
              >
                <span className="text-xs font-mono font-bold shrink-0 w-36" style={{ color: "rgb(255,85,0)" }}>
                  {row.section}
                </span>
                <span className="text-xs text-gray-500">{row.note}</span>
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
            Postmortems and runbooks reinforce each other
          </h2>
          <p className="text-gray-400 leading-relaxed">
            A runbook tells you what to do when an incident occurs. A postmortem explains what you
            learned after it happened. When a runbook step is missing or wrong, the postmortem
            documents it — and the runbook gets updated. The next engineer who hits the same alert
            benefits from the learning without having to live through the incident.
          </p>
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
            Postmortems do not directly move the DORA metrics. They maintain them. By preventing
            recurrence of known failure modes, they keep CFR from drifting back up as the system grows.
            They also accelerate MTTR over time — the second time an incident occurs, you have a playbook.
            The third time, you catch it before it becomes an incident at all.
          </p>
          <div
            className="flex flex-col gap-3 p-5 border"
            style={{ backgroundColor: "#080808", borderColor: "rgba(255,85,0,0.2)", borderLeft: "3px solid rgba(255,85,0,0.4)" }}
          >
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(255,85,0)" }}>
              What this mission does
            </span>
            <p className="text-sm text-gray-400 leading-relaxed">
              All four DORA metrics hold at their current values. The postmortem process is the
              foundation that prevents regression — as Nexus Corp grows, your metrics stay high.
            </p>
          </div>
        </section>

        <CTA
          href="?phase=3"
          label="Build the postmortem process →"
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
    before: "1%",
    after: "1%",
    note: "maintained — postmortems prevent recurrence of known failure modes",
    highlight: false,
  },
  {
    metric: "Deployment Frequency",
    code: "DF",
    before: "Multiple×/week",
    after: "Multiple×/week",
    note: "maintained",
    highlight: false,
  },
  {
    metric: "Lead Time for Changes",
    code: "LT",
    before: "5 days",
    after: "5 days",
    note: "maintained",
    highlight: false,
  },
  {
    metric: "Mean Time to Restore",
    code: "MTTR",
    before: "30 min",
    after: "30 min",
    note: "maintained — second incident resolves faster with documented playbook",
    highlight: false,
  },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(255,85,0)" }}>
            Mission Complete - M-25
          </p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Nexus Corp Has a Learning Culture
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            The metrics don&apos;t move — and that&apos;s the point. Postmortems are not an improvement
            mechanism. They are a retention mechanism. Your 1% CFR stays at 1% as the system grows,
            because every failure becomes a permanent improvement to the process.
          </p>
        </div>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What changed</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div
            className="flex flex-col gap-5 p-6 border"
            style={{
              backgroundColor: "#080808",
              borderColor: "rgba(255,85,0,0.2)",
              borderLeft: "3px solid rgb(255,85,0)",
            }}
          >
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(255,85,0)" }}>
              The system is now self-improving
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Every future incident generates a postmortem. Every postmortem generates action items.
              Every action item improves the system. Nexus Corp no longer needs to repeat the same
              mistakes — they are permanently documented, and the fixes are permanent.
            </p>
            <div className="flex flex-col gap-3 border-t border-gray-800 pt-4">
              {[
                "Postmortem template: every incident answered consistently",
                "Postmortem index: every incident discoverable",
                "Runbook linked to postmortems: context survives engineer turnover",
                "/api/postmortems: learning is observable, not buried in a folder",
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
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your DORA metrics — maintained</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {doraImpact.map((d) => (
              <div
                key={d.code}
                className="flex flex-col gap-4 border p-6"
                style={{
                  backgroundColor: "#080808",
                  borderColor: "rgb(31,41,55)",
                  borderLeft: "3px solid rgb(31,41,55)",
                }}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{d.metric}</span>
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="text-lg font-mono font-bold"
                    style={{ ...syne.style, color: "rgb(75,85,99)" }}
                  >
                    {d.before}
                  </span>
                  <span className="font-mono text-gray-700">→</span>
                  <span
                    className="text-lg font-mono font-bold"
                    style={{ ...syne.style, color: "rgb(75,85,99)" }}
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
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Third Way complete</h2>
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
              The Third Way: Learning — Complete
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              You&apos;ve built a system that learns from its own failures. Flow moves work through the system.
              Feedback reveals problems. Learning — the Third Way — creates the conditions for continuous
              improvement. Nexus Corp is now a high-performing engineering organization.
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
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M13Page({
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
    await completeMission("M-25")

    // Now verify it actually exists (guards against DB errors)
    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-25" },
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
