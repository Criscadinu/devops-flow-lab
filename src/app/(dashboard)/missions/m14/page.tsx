import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-14 Small Batch Development - DevOps Flow Lab",
}


// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "var(--bg-card)" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "var(--af-orange)" }}>
          M-14
        </span>
        <span className="text-sm font-bold tracking-tight text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
          Small Batch Development
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
    initials: "MA",
    name: "Marco",
    role: "OPS",
    accent: "rgb(239,68,68)",
    text: "When is the orders feature going to be merged?",
  },
  {
    type: "line",
    initials: "LI",
    name: "Lisa",
    role: "DEV",
    accent: "rgb(34,197,94)",
    text: "It is almost ready. I still need to finish the pagination, the sorting, the export, and the email notification.",
  },
  {
    type: "line",
    initials: "MA",
    name: "Marco",
    role: "OPS",
    accent: "rgb(239,68,68)",
    text: "That is four features.",
  },
  {
    type: "line",
    initials: "LI",
    name: "Lisa",
    role: "DEV",
    accent: "rgb(34,197,94)",
    text: "They are related.",
  },
  {
    type: "line",
    initials: "KA",
    name: "Kai",
    role: "QA",
    accent: "rgb(251,146,60)",
    text: "I tried to review it yesterday. The diff is 2,400 lines. I approved it because I could not hold it all in my head.",
  },
  {
    type: "line",
    initials: "LI",
    name: "Lisa",
    role: "DEV",
    accent: "rgb(34,197,94)",
    text: "At least you approved it.",
  },
  {
    type: "line",
    initials: "MA",
    name: "Marco",
    role: "OPS",
    accent: "rgb(239,68,68)",
    text: "We merged it this morning. The health check is failing.",
  },
  {
    type: "line",
    initials: "LI",
    name: "Lisa",
    role: "DEV",
    accent: "rgb(34,197,94)",
    text: "Which part broke it?",
  },
  {
    type: "line",
    initials: "MA",
    name: "Marco",
    role: "OPS",
    accent: "rgb(239,68,68)",
    text: "We do not know. There are 47 commits to look through.",
  },
  {
    type: "beat",
    text: "Lisa opened the diff. It was 2,400 lines long.",
  },
  {
    type: "line",
    initials: "KA",
    name: "Kai",
    role: "QA",
    accent: "rgb(251,146,60)",
    text: "Next time, can we just do one thing at a time?",
  },
  {
    type: "you",
    text: "A large batch is a risk that compounds. Every line of code that has not been integrated is a line that might conflict, break something, or sit unreviewed for weeks. Small batches integrate continuously. Large batches integrate catastrophically.",
    closing: "Merge small. Merge often. Merge before it becomes a problem.",
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
            Week seven. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Lisa has been working on the same feature branch for three weeks. It has 47 commits. Nobody knows what is in it.
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
          sub="Phase 2 of 4 - Small batches, fast feedback"
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
            Small Batches, Fast Feedback
          </h2>
        </div>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">01</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h3 className="text-2xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Why batch size matters
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Batch size in software development is the amount of work done before it is integrated into the main codebase.
            Large batches feel efficient — you finish a whole feature before touching the pipeline. But they create invisible
            risk: merge conflicts that take days to resolve, review diffs nobody can actually read, and integration failures
            that are impossible to attribute to a specific change.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h3 className="text-2xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            The economics of small batches
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Small batches reduce transaction cost per integration. When integrating is cheap — automated tests, fast CI —
            you can afford to do it ten times a day. When integrating is expensive — manual testing, slow pipeline — you batch
            up work to amortize the cost. The First Way is about making integration cheap enough that batching becomes irrational.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Large batch",
                items: ["2,400 lines to review", "47 commits to bisect", "Unknown which change broke it", "3-day merge conflict"],
                accent: "rgb(239,68,68)",
              },
              {
                label: "Small batch",
                items: ["Under 400 lines", "One logical change", "Clear what it does", "Merges in minutes"],
                accent: "rgb(34,197,94)",
              },
            ].map((col) => (
              <div
                key={col.label}
                className="flex flex-col gap-3 p-5 border"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", borderLeft: `3px solid ${col.accent}` }}
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
            <span className="text-xs font-mono text-gray-700 tracking-widest">03</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h3 className="text-2xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            What a small batch looks like
          </h3>
          <p className="text-gray-400 leading-relaxed">
            A small batch is one logical change: one bug fix, one refactor, one new endpoint, one config change.
            It has a clear description, a diff under 400 lines, and a test that covers the change. It can be reviewed
            in 10 minutes. If your PR description starts with &ldquo;and also...&rdquo;, the batch is too large.
          </p>
          <div
            className="flex flex-col gap-3 p-5 border"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(255,85,0,0.2)", borderLeft: "3px solid rgba(255,85,0,0.4)" }}
          >
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--af-orange)" }}>
              The small batch checklist
            </span>
            <div className="flex flex-col gap-2">
              {[
                "One logical change — describable in one sentence",
                "Diff under 400 lines",
                "At least one test covering the change",
                "Reviewable in under 10 minutes",
                "PR description has no 'and also'",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "rgb(34,197,94)" }}>✓</span>
                  <p className="text-xs text-gray-400">{item}</p>
                </div>
              ))}
            </div>
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
            Small batches directly improve Lead Time for Changes and reduce Change Failure Rate. A change that is 50 lines
            is reviewed faster, tested faster, and deployed faster than one that is 2,400 lines. Elite teams commit to trunk
            multiple times per day. The batch size is the lever.
          </p>
        </section>

        <CTA
          href="?phase=3"
          label="Shrink the batch →"
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

const m07Metrics: MetricCard[] = [
  { metric: "Deployment Frequency", code: "DF",   badge: "IMPROVING",  note: "when batches are small, deploying frequently becomes natural" },
  { metric: "Lead Time for Changes", code: "LT",  badge: "IMPROVING",  note: "smaller batches move faster through the pipeline" },
  { metric: "Change Failure Rate",   code: "CFR", badge: "IMPROVING",  note: "smaller changes are easier to test and review" },
  { metric: "Mean Time to Restore",  code: "MTTR", badge: "FOUNDATION", note: "no direct improvement yet — fewer incidents will follow" },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "var(--af-orange)" }}>
            Mission Complete - M-14
          </p>
          <h1 className="text-5xl text-gray-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Nexus Corp Merges Small. Merges Often.
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            Small batches are the multiplier for everything else. A fast pipeline means nothing if you batch up three weeks of work before using it.
          </p>
        </div>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your DORA metrics</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {m07Metrics.map((d) => (
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
              Next: Trunk-Based Development
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Small batches only work if everyone commits to the same branch. Trunk-based development eliminates
              the merge conflicts that happen when teams work in isolation.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/missions/m08"
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
              Continue to M-15 →
            </a>
            <a
              href="/dashboard"
              className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}
            >
              Back to dashboard →
            </a>
          </div>
          <p className="text-xs font-mono text-gray-700">M-15 unlocks when you complete CONTINUOUS_INTEGRATION</p>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M07Page({
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

    await completeMission("M-14")

    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-14" },
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
