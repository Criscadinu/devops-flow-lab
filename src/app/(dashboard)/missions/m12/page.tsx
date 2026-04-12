import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-12 Review and Coordinate Changes - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>
          M-12
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Review and Coordinate Changes
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
    initials: "LI",
    name: "Lisa",
    role: "Developer",
    badge: "DEV",
    accent: "rgb(34,197,94)",
    badgeBg: "rgba(34,197,94,0.08)",
    badgeBorder: "rgba(34,197,94,0.3)",
    quote: (
      <>
        &ldquo;I pushed a hotfix directly to main. It was one line. I was sure it was fine.
        Twenty minutes later the <mark>health endpoint was returning 500s</mark>. I had no idea
        what I broke.&rdquo;
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
        &ldquo;The alert fired and I went straight to the runbook. But the last three commits
        were all pushed directly to main by different people. I had no idea <mark>which one
        caused it</mark>.&rdquo;
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
        &ldquo;We have a pipeline. We have tests. We have a runbook. But we still ship broken
        code because anyone can push anything to main at <mark>any time</mark>. The process
        has no enforcement.&rdquo;
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
        &ldquo;Branch protection blocks direct pushes. A PR template makes every change
        reviewable. A contributing guide makes the process explicit. <mark>The platform
        enforces what policy cannot.</mark>&rdquo;
      </>
    ),
    outro: "Trust the process. Enforce it.",
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
            Week twelve. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Lisa pushed directly to main and broke the health endpoint. The pipeline was green on her machine. Nobody reviewed it. The alert fired at 4pm on a Friday.
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
          sub="Phase 2 of 4 - From direct pushes to protected branches"
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

const reviewSteps = [
  { step: "Create a feature branch",       note: "Never commit directly to main. Branch = isolated context."              },
  { step: "Open a pull request",           note: "PR = a proposal, not a demand. Context is attached."                    },
  { step: "CI runs automatically",         note: "Tests pass or the PR cannot merge. Platform enforces quality."           },
  { step: "Peer review",                   note: "One pair of eyes catches what automated tests cannot."                   },
  { step: "Merge to main",                 note: "Only after CI green + approval. Protected branch enforces this."         },
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
            The problem with direct pushes
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Every process Nexus Corp has built — the pipeline, the tests, the runbook — can be bypassed
            by a direct push to main. Branch protection makes bypass impossible. It is the difference
            between a sign that says &ldquo;please do not run&rdquo; and a locked door.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "Without branch protection",
                items: ["Anyone pushes directly to main", "CI skipped on direct push", "No review — bad code ships", "No audit trail of who changed what"],
                accent: "rgb(239,68,68)",
              },
              {
                label: "With branch protection",
                items: ["All changes go through PRs", "CI required before merge", "Review required — errors caught", "Full audit trail in PR history"],
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
            The PR process
          </h2>
          <p className="text-gray-400 leading-relaxed">
            A pull request is not paperwork — it is a conversation. The PR template ensures every
            change answers the same questions: what changed, why it changed, and how to verify it works.
            Without a template, reviews are inconsistent. With one, every reviewer knows exactly what
            context to expect.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {reviewSteps.map((row, i) => (
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
            CONTRIBUTING.md as process documentation
          </h2>
          <p className="text-gray-400 leading-relaxed">
            A CONTRIBUTING.md makes the process explicit and discoverable. Every new engineer who
            clones the repo immediately understands how the team works. Process in a document is
            better than process in someone&apos;s head — and far better than process discovered
            by breaking something.
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
            The final percentage point in CFR drops because peer review catches what automated
            tests cannot: logic errors, missed edge cases, architectural decisions that will cause
            pain in six months. Target: CFR from 2% to 1%.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {[
              { label: "Current CFR",      value: "2%", color: "rgb(239,68,68)",  note: "Experiments validated but code pushed directly — bad logic reaches main without a second pair of eyes." },
              { label: "Target after M-12", value: "1%", color: "rgb(6,182,212)", note: "Branch protection + peer review — every change is seen by at least one other engineer before it ships." },
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
          label="Build the review process →"
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
    before: "2%",
    after: "1%",
    note: "peer review catches logic errors and edge cases automated tests miss",
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
            Mission Complete - M-12
          </p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Nexus Corp Has a Review Process
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            The final percentage point drops because peer review catches the issues that automated tests
            cannot: logic errors, missed edge cases, architectural decisions that will cause pain in six months.
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
                <span className="text-4xl font-mono font-bold" style={{ ...syne.style, color: "rgb(239,68,68)" }}>2%</span>
                <span className="text-xs text-gray-600">experiments validated but code still pushed directly without review</span>
              </div>
              <span className="text-2xl font-mono text-gray-700">→</span>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-600">After</span>
                <span className="text-4xl font-mono font-bold" style={{ ...syne.style, color: "rgb(6,182,212)" }}>1%</span>
                <span className="text-xs text-gray-600">branch protection enforces review — bad code caught before it reaches main</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-800 pt-4">
              The final percentage point drops because peer review catches the issues that automated tests cannot: logic errors, missed edge cases, architectural decisions that will cause pain in six months.
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
              Third Way: Learning — Coming Next
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Next: Blameless Postmortems — when things go wrong, what you do next defines your culture. Build the process that turns incidents into learning.
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
              Continue to M-13 →
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M12Page({
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
    await completeMission("M-12")

    // Now verify it actually exists (guards against DB errors)
    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-12" },
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
