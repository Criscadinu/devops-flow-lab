import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-15 Trunk-Based Development - DevOps Flow Lab",
}


// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "var(--bg-card)" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "var(--af-orange)" }}>
          M-15
        </span>
        <span className="text-sm font-bold tracking-tight text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
          Trunk-Based Development
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
        style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}
      >
        {label}
      </a>
      {sub && <p className="text-xs font-mono text-gray-700">{sub}</p>}
    </div>
  )
}

// ─── Phase 1 - The situation ──────────────────────────────────────────────────

type DialogueEntry =
  | { type: "line"; initials: string; name: string; role: string; accent: string; text: string }
  | { type: "beat"; text: string }
  | { type: "you"; text: string; closing: string }

const dialogue: DialogueEntry[] = [
  {
    type: "line",
    initials: "LI",
    name: "Lisa",
    role: "DEV",
    accent: "rgb(34,197,94)",
    text: "I cannot merge my branch. It conflicts with Marco's branch.",
  },
  {
    type: "line",
    initials: "MA",
    name: "Marco",
    role: "OPS",
    accent: "rgb(239,68,68)",
    text: "My branch conflicts with yours and with the hotfix branch.",
  },
  {
    type: "line",
    initials: "TO",
    name: "Tom",
    role: "PRODUCT",
    accent: "rgb(167,139,250)",
    text: "When does the release go out?",
  },
  {
    type: "line",
    initials: "LI",
    name: "Lisa",
    role: "DEV",
    accent: "rgb(34,197,94)",
    text: "When we resolve the conflicts.",
  },
  {
    type: "line",
    initials: "MA",
    name: "Marco",
    role: "OPS",
    accent: "rgb(239,68,68)",
    text: "We have been resolving conflicts for two days.",
  },
  {
    type: "line",
    initials: "TO",
    name: "Tom",
    role: "PRODUCT",
    accent: "rgb(167,139,250)",
    text: "The feature was supposed to ship last Friday.",
  },
  {
    type: "line",
    initials: "LI",
    name: "Lisa",
    role: "DEV",
    accent: "rgb(34,197,94)",
    text: "The feature was done last Friday. The merge was not.",
  },
  {
    type: "beat",
    text: "Tom looked at the branch graph. It looked like a subway map.",
  },
  {
    type: "line",
    initials: "MA",
    name: "Marco",
    role: "OPS",
    accent: "rgb(239,68,68)",
    text: "If we had been committing to main every day, none of these conflicts would exist.",
  },
  {
    type: "line",
    initials: "LI",
    name: "Lisa",
    role: "DEV",
    accent: "rgb(34,197,94)",
    text: "But then we would have broken main every day.",
  },
  {
    type: "line",
    initials: "MA",
    name: "Marco",
    role: "OPS",
    accent: "rgb(239,68,68)",
    text: "Only if we do not have tests. We have tests now.",
  },
  {
    type: "you",
    text: "Trunk-based development means everyone commits to one branch — main — multiple times per day. Feature flags hide incomplete work. Tests catch regressions. Long-lived branches are replaced by short-lived ones that live for hours, not weeks. The merge conflict is not a technical problem. It is a process problem.",
    closing: "One branch. Many commits. No surprises.",
  },
]

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">

        <div className="flex flex-col gap-3 max-w-2xl">
          <h2
            className="text-4xl text-gray-900 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}
          >
            Week eight. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            There are four active branches. The last time anyone merged to main was eleven days ago.
          </p>
        </div>

        <div className="flex flex-col">
          {dialogue.map((entry, i) => {
            if (entry.type === "beat") {
              return (
                <div key={i} className="py-6 text-center">
                  <em className="text-sm text-gray-600 italic">{entry.text}</em>
                </div>
              )
            }

            if (entry.type === "you") {
              return (
                <div
                  key={i}
                  className="flex flex-col gap-4 p-6 mt-2"
                  style={{
                    backgroundColor: "rgba(255,85,0,0.04)",
                    borderLeft: "3px solid rgb(255,85,0)",
                    border: "1px solid rgba(255,85,0,0.2)",
                    borderLeftWidth: "3px",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 flex items-center justify-center text-xs font-mono font-bold shrink-0"
                      style={{
                        backgroundColor: "rgba(255,85,0,0.12)",
                        border: "1px solid rgba(255,85,0,0.4)",
                        color: "var(--af-orange)",
                      }}
                    >
                      YOU
                    </div>
                    <div className="flex flex-col gap-0">
                      <span className="text-gray-900 text-xs font-mono font-bold">You</span>
                      <span className="text-gray-600 text-xs font-mono">New Engineer</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{entry.text}</p>
                  <p className="text-gray-900 font-bold text-sm border-t pt-3" style={{ borderColor: "rgba(255,85,0,0.2)" }}>
                    {entry.closing}
                  </p>
                </div>
              )
            }

            return (
              <div
                key={i}
                className="flex flex-col gap-2 px-5 py-4"
                style={{
                  backgroundColor: i % 2 === 0 ? "var(--bg-card)" : "var(--bg)",
                  borderLeft: `3px solid ${entry.accent}`,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: entry.accent }}
                >
                  {entry.name} · {entry.role}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed">{entry.text}</p>
              </div>
            )
          })}
        </div>

        <CTA
          href="?phase=2"
          label="Understand the theory →"
          sub="Phase 2 of 4 - One trunk. Everyone on it."
        />
      </div>
    </div>
  )
}

// ─── Phase 2 - The theory ─────────────────────────────────────────────────────

function Phase2() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-14">

        <div className="flex flex-col gap-2">
          <p className="text-xs font-mono tracking-widest uppercase text-gray-600">
            CONTINUOUS INTEGRATION — Enable and practice continuous integration
          </p>
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            One Trunk. Everyone on It.
          </h2>
        </div>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">01</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h3 className="text-2xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Why long-lived branches fail
          </h3>
          <p className="text-gray-400 leading-relaxed">
            A branch is a bet that you can integrate later without paying a penalty. The longer the branch lives,
            the larger the penalty. After two weeks, a branch has diverged so far from main that the merge is a
            mini-project. After a month, it may be faster to rewrite the feature than to merge it. Trunk-based
            development eliminates this risk by making integration continuous.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h3 className="text-2xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            How trunk-based development works
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Everyone commits to main — the trunk. Features that are not ready are hidden behind feature flags — the
            code is in production, but the behavior is off. Short-lived branches (less than one day) are acceptable
            for code review workflows. The rule: if a branch is older than a day, it is already a problem.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {[
              { label: "Long-lived branch",  note: "diverges daily, merges catastrophically",      ok: false },
              { label: "Short-lived branch", note: "lives hours, merges cleanly",                  ok: true  },
              { label: "Commit to trunk",    note: "integrates immediately, no conflict",           ok: true  },
              { label: "Feature flag",       note: "incomplete work in production, invisible",       ok: true  },
            ].map((row, i) => (
              <div
                key={row.label}
                className="flex items-center gap-4 px-5 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "var(--bg-card)" : "var(--bg)" }}
              >
                <span
                  className="text-xs font-mono font-bold shrink-0 w-48"
                  style={{ color: row.ok ? "rgb(34,197,94)" : "rgb(239,68,68)" }}
                >
                  {row.label}
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
          <h3 className="text-2xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Feature flags as the enabler
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Trunk-based development requires feature flags. Without them, you cannot commit incomplete work to main
            without breaking the product. With them, you commit freely — the flag keeps the feature invisible until
            it is ready. This is why M-20 (Architecture for Low-Risk Releases) is in the same cluster.
          </p>
          <div
            className="flex flex-col gap-3 p-5 border"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(255,85,0,0.2)", borderLeft: "3px solid rgba(255,85,0,0.4)" }}
          >
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--af-orange)" }}>
              The pattern
            </span>
            <p className="text-sm text-gray-400 leading-relaxed">
              The code ships. The feature does not. The flag is off in production. When the feature is ready,
              you flip the flag — no deploy required. If something goes wrong, you flip it back.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">04</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h3 className="text-2xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            The DORA connection
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Trunk-based development is one of the highest-correlation practices with elite DORA performance. Teams
            that practice it have 2× higher deployment frequency and 2× lower change failure rate than teams that
            use long-lived branches. The research is clear: the branch is the risk.
          </p>
        </section>

        <CTA
          href="?phase=3"
          label="Get on the trunk →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

type MetricCard = {
  metric: string
  code: string
  badge: "IMPROVING" | "FOUNDATION"
  note: string
}

const m08Metrics: MetricCard[] = [
  { metric: "Deployment Frequency", code: "DF",   badge: "IMPROVING",  note: "committing to trunk multiple times per day" },
  { metric: "Lead Time for Changes", code: "LT",  badge: "IMPROVING",  note: "no merge conflicts means changes ship faster" },
  { metric: "Change Failure Rate",   code: "CFR", badge: "IMPROVING",  note: "small frequent commits are easier to test" },
  { metric: "Mean Time to Restore",  code: "MTTR", badge: "FOUNDATION", note: "fewer incidents will follow as stability improves" },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "var(--af-orange)" }}>
            Mission Complete - M-15
          </p>
          <h1 className="text-5xl text-gray-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Nexus Corp Is on One Trunk.
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            Trunk-based development removes the biggest source of integration pain. When everyone is on the same
            branch, there are no surprises at merge time — because there is no merge time.
          </p>
        </div>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your DORA metrics</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {m08Metrics.map((d) => (
              <div
                key={d.code}
                className="flex flex-col gap-4 border p-6"
                style={{
                  backgroundColor: d.badge === "IMPROVING" ? "#0a0700" : "#080808",
                  borderColor: d.badge === "IMPROVING" ? "rgba(251,146,60,0.25)" : "rgb(31,41,55)",
                  borderLeft: d.badge === "IMPROVING" ? "3px solid rgb(251,146,60)" : "3px solid rgb(55,65,81)",
                }}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{d.metric}</span>
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                </div>
                <div>
                  {d.badge === "IMPROVING" ? (
                    <span
                      className="text-xs font-mono px-2 py-0.5 border"
                      style={{
                        color: "rgb(251,146,60)",
                        borderColor: "rgba(251,146,60,0.4)",
                        backgroundColor: "rgba(251,146,60,0.06)",
                      }}
                    >
                      IMPROVING ↓
                    </span>
                  ) : (
                    <span
                      className="text-xs font-mono px-2 py-0.5 border"
                      style={{
                        color: "var(--text-muted)",
                        borderColor: "rgb(55,65,81)",
                        backgroundColor: "rgba(75,85,99,0.06)",
                      }}
                    >
                      FOUNDATION
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-gray-600">{d.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What is next</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div
            className="flex flex-col gap-3 p-6 border"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              borderLeft: "3px solid rgb(31,41,55)",
            }}
          >
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">
              Next: Automate and enable low-risk releases
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Now that you integrate continuously, automate the path to production. Every green build on trunk
              should be deployable without manual intervention.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/missions/m09"
              className="px-8 py-4 text-sm font-bold tracking-wide"
              style={{
                backgroundColor: "var(--bg-card-hover)",
                color: "var(--text-muted)",
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                opacity: 0.6,
                pointerEvents: "none" as const,
              }}
            >
              Continue to M-16 →
            </a>
            <a
              href="/dashboard"
              className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}
            >
              Back to dashboard →
            </a>
          </div>
          <p className="text-xs font-mono text-gray-700">M-16 unlocks when you complete CONTINUOUS_INTEGRATION</p>
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

    await completeMission("M-15")

    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-15" },
    })
    if (!completed) redirect("?phase=3")
  }

  return (
    <main className="min-h-screen text-gray-100 flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
      <MissionHeader fase={phase} />
      {phase === 1 && <Phase1 />}
      {phase === 2 && <Phase2 />}
      {phase === 3 && <Phase3 />}
      {phase === 4 && <Phase4 />}
    </main>
  )
}
