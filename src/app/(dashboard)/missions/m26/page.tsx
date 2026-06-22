import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-26 Learning Culture - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(255,85,0)" }}>
          M-26
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Learning Culture
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
    initials: "LI",
    name: "Lisa",
    role: "Developer",
    badge: "DEV",
    accent: "rgb(34,197,94)",
    badgeBg: "rgba(34,197,94,0.08)",
    badgeBorder: "rgba(34,197,94,0.3)",
    quote: (
      <>
        &ldquo;I fixed a race condition in the orders service. It took me 3 hours. I wrote it up in
        my head, closed the ticket, and moved on. <mark>I never told anyone how I did it.</mark>&rdquo;
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
        &ldquo;Two months ago I hit the same race condition. I spent 2 days on it. If Lisa had written
        it down anywhere, I would have solved it in 3 hours too. <mark>We lost 13 hours as a team.</mark>&rdquo;
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
        &ldquo;We keep solving the same problems. Every sprint someone rediscovers something the team
        already knows. It is <mark>invisible waste</mark> — nobody sees it because it never shows up in a ticket.&rdquo;
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
        &ldquo;A learning that stays in one person&apos;s head is a single point of failure. Write it
        down. Share it. Make <mark>individual knowledge into team knowledge</mark>.&rdquo;
      </>
    ),
    outro: "Local discovery. Global improvement.",
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
            Week fourteen. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Lisa fixed a tricky race condition last week. She figured it out in 3 hours. Two months ago Marco spent 2 days on the exact same bug. Nobody told him.
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
          sub="Phase 2 of 4 - From individual learning to team knowledge"
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
            The problem with tribal knowledge
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Most engineering teams run on tribal knowledge — things that only certain people know
            because they experienced them. This knowledge is invisible until it is needed, and by
            then it is often too late. The DevOps Handbook calls this the Third Way: creating a culture
            of continual learning and experimentation where local discoveries are converted into global
            improvements.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Tribal knowledge",
                items: [
                  "Fixes stay in one person's head",
                  "Same bugs solved repeatedly across the team",
                  "New engineers start from zero",
                  "Knowledge is lost when engineers leave",
                ],
                accent: "rgb(239,68,68)",
              },
              {
                label: "Team knowledge",
                items: [
                  "Every fix is written down and findable",
                  "The second person solves it in minutes, not days",
                  "New engineers inherit accumulated context",
                  "Knowledge compounds over time",
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
            The three formats for sharing knowledge
          </h2>
          <p className="text-gray-400 leading-relaxed">
            There are three practical formats for converting individual learning into team knowledge.
            Each serves a different purpose and lives in a different part of the repository.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {[
              {
                label: "TIL",
                title: "Today I Learned",
                note: "A short note, 3–5 sentences, written the same day. What was the problem, what was the fix, what should you remember next time.",
                accent: "rgb(255,85,0)",
              },
              {
                label: "ADR",
                title: "Architecture Decision Record",
                note: "A structured document that captures why a technical decision was made. Future engineers who question the decision can read why it was made instead of reversing it without context.",
                accent: "rgb(167,139,250)",
              },
              {
                label: "Runbook entry",
                title: "New failure mode → new playbook",
                note: "When a fix reveals a new failure mode, add a playbook to the runbook. The postmortem process from M-25 already triggers this.",
                accent: "rgb(34,197,94)",
              },
            ].map((row, i) => (
              <div
                key={row.label}
                className="flex gap-4 px-5 py-5 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606", borderLeft: `3px solid ${row.accent}` }}
              >
                <span
                  className="text-xs font-mono font-bold shrink-0 w-20 mt-0.5"
                  style={{ color: row.accent }}
                >
                  {row.label}
                </span>
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-sm text-white font-mono">{row.title}</span>
                  <span className="text-xs text-gray-500 leading-relaxed">{row.note}</span>
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
            Making learning a habit
          </h2>
          <p className="text-gray-400 leading-relaxed">
            The difference between teams that learn and teams that repeat mistakes is not intelligence
            — it is habit. Two practices that work at the team level:
          </p>
          <div className="flex flex-col gap-4">
            {[
              {
                title: "The weekly TIL",
                body: "At the end of every week, each engineer posts one thing they learned to a shared channel. Takes 5 minutes. Compounds over months.",
              },
              {
                title: "The pre-mortem",
                body: "Before shipping a feature, ask \"what could go wrong?\" Write it down. It surfaces risks and creates a shared mental model before the incident, not after.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 p-5 border"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)", borderLeft: "3px solid rgba(255,85,0,0.4)" }}
              >
                <span className="text-sm text-white font-mono font-bold">{item.title}</span>
                <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
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
            Learning culture does not show up in a single DORA metric. It shows up in the trend.
            Teams with strong learning cultures maintain their DORA improvements over time. Teams
            without it see metrics regress as the same problems recur. The goal of M-26 is to protect
            everything you have built in M-01 through M-25.
          </p>
          <div
            className="flex flex-col gap-3 p-5 border"
            style={{ backgroundColor: "#080808", borderColor: "rgba(255,85,0,0.2)", borderLeft: "3px solid rgba(255,85,0,0.4)" }}
          >
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(255,85,0)" }}>
              What this mission does
            </span>
            <p className="text-sm text-gray-400 leading-relaxed">
              All four DORA metrics are protected. Learning culture is the practice that prevents
              regression — the same incidents stop recurring, the same bugs stop reappearing, and
              the improvements you have made compound over time instead of decaying.
            </p>
          </div>
        </section>

        <CTA
          href="?phase=3"
          label="Build the learning culture →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

const doraProtected = [
  {
    metric: "Deployment Frequency",
    code: "DF",
    value: "Multiple×/week",
    note: "team knowledge prevents regressions that slow deploy cadence",
  },
  {
    metric: "Lead Time for Changes",
    code: "LT",
    value: "5 days",
    note: "shared context reduces time spent rediscovering known solutions",
  },
  {
    metric: "Change Failure Rate",
    code: "CFR",
    value: "1%",
    note: "TILs and ADRs prevent the same mistakes from recurring",
  },
  {
    metric: "Mean Time to Restore",
    code: "MTTR",
    value: "30 min",
    note: "documented fixes make the second incident faster than the first",
  },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(255,85,0)" }}>
            Mission Complete - M-26
          </p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Nexus Corp Stops Repeating Mistakes
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            Learning culture does not move a DORA metric today. It protects every metric you have
            already moved. Without it, teams regress — the same incidents recur, the same bugs
            reappear, the same architectural mistakes get made twice. M-26 is the practice that
            makes all previous improvements permanent.
          </p>
        </div>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What you built</h2>
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
              The system now learns from itself
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Every engineer who joins Nexus Corp from now on starts with the accumulated knowledge
              of everyone who came before them. The team&apos;s learning is version controlled, discoverable,
              and growing.
            </p>
            <div className="flex flex-col gap-3 border-t border-gray-800 pt-4">
              {[
                "TIL format: every fix is written down and findable in docs/til/",
                "ADR format: every significant decision has a documented rationale in docs/adr/",
                "Learning practices in the runbook: weekly TIL, pre-mortem, ADR are team agreements",
                "/api/learning: learning artifacts are discoverable and observable",
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
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your DORA metrics — protected</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {doraProtected.map((d) => (
              <div
                key={d.code}
                className="flex flex-col gap-4 border p-6"
                style={{
                  backgroundColor: "#060f06",
                  borderColor: "rgba(34,197,94,0.25)",
                  borderLeft: "3px solid rgba(34,197,94,0.6)",
                }}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{d.metric}</span>
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono shrink-0" style={{ color: "rgb(34,197,94)" }}>✓</span>
                  <span
                    className="text-lg font-mono font-bold"
                    style={{ ...syne.style, color: "rgb(34,197,94)" }}
                  >
                    {d.value}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-mono font-bold px-1.5 py-0.5 uppercase tracking-widest"
                    style={{
                      color: "rgb(34,197,94)",
                      backgroundColor: "rgba(34,197,94,0.08)",
                      border: "1px solid rgba(34,197,94,0.3)",
                    }}
                  >
                    PROTECTED
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
              borderColor: "rgba(255,85,0,0.2)",
              borderLeft: "3px solid rgb(255,85,0)",
            }}
          >
            <p className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: "rgb(255,85,0)" }}>
              Coming next — Chaos Engineering
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Next: Chaos Engineering — if you want to know how your system fails, break it deliberately
              before it breaks on its own. Inject failures in a controlled environment. Find weaknesses
              before your users do.
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
              Continue to M-27 →
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M14Page({
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
    await completeMission("M-26")

    // Now verify it actually exists (guards against DB errors)
    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-26" },
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
