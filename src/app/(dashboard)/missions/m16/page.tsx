import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-16 Continuous Deployment - DevOps Flow Lab",
}


// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "var(--bg-card)" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "var(--af-orange)" }}>
          M-16
        </span>
        <span className="text-sm font-bold tracking-tight text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
          Continuous Deployment
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

const panels = [
  {
    initials: "SM",
    name: "Sarah",
    role: "Engineering Manager",
    badge: "MANAGEMENT",
    accent: "rgb(255,85,0)",
    badgeBg: "rgba(255,85,0,0.08)",
    badgeBorder: "rgba(255,85,0,0.3)",
    quote: (
      <>
        &ldquo;The tests pass automatically now. But Marco still deploys manually. Every deploy is
        still a meeting, a checklist, and a prayer. We need to close the loop.&rdquo;
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
        &ldquo;I merged a fix 3 days ago. It passed all tests. It is still not in production.
        Marco has not had time to deploy it. Customers are still hitting the bug.&rdquo;
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
        &ldquo;I am the bottleneck and I know it. Every deploy goes through me. I have{" "}
        <mark>12 pending deploys</mark> this week. I cannot keep up. And every manual deploy is
        a risk.&rdquo;
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
        &ldquo;We fixed the tests. The pipeline is green. But we are still finding bugs in
        production that were caught by the pipeline weeks ago. The fix just never shipped.&rdquo;
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
        &ldquo;Time to market is still <mark>3 weeks</mark> minimum. Even with a green pipeline.
        The code is done, tested, and sitting there. We just cannot get it out the door.&rdquo;
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
        &ldquo;The last mile. Code goes in, tests pass, and then it stops. The pipeline needs one
        more step - automatically deploy every green build.&rdquo;
      </>
    ),
    outro: "Close the loop.",
  },
]

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">

        <div className="flex flex-col gap-3 max-w-2xl">
          <h2
            className="text-4xl text-gray-900 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}
          >
            Week four. Nexus Corp.
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            The pipeline is green. But nothing ships automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {panels.map((p) => (
            <div
              key={p.initials}
              className="flex flex-col gap-0 overflow-hidden"
              style={{
                backgroundColor: "var(--bg)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${p.accent}`,
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "#1a1a1a", backgroundColor: "var(--bg-card)" }}
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
                    <span className="text-gray-900 text-sm font-semibold leading-tight">{p.name}</span>
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
                <p className="text-gray-600 text-sm leading-relaxed">{p.quote}</p>
                {"outro" in p && p.outro && (
                  <p className="text-gray-900 font-bold text-sm border-t pt-3" style={{ borderColor: "#1a1a1a" }}>
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
          sub="Phase 2 of 4 - What is Continuous Deployment?"
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

const ciVsCd = [
  {
    title: "Continuous Integration",
    body: "Every commit is automatically built and tested. You know within minutes if your code works. But it still needs a human to deploy.",
    accent: "rgb(75,85,99)",
    bg: "#080808",
    border: "rgba(75,85,99,0.3)",
  },
  {
    title: "Continuous Deployment",
    body: "Every green build is automatically deployed. No human in the loop. Code goes from commit to production without anyone pressing a button.",
    accent: "rgb(255,85,0)",
    bg: "#020d0f",
    border: "rgba(255,85,0,0.25)",
  },
]

const cdPrereqs = [
  {
    title: "Automated tests",
    body: "If you do not have tests, CD is dangerous. Every commit goes to production - you need the pipeline to catch bugs before users do.",
    accent: "rgb(34,197,94)",
    bg: "#060f06",
    border: "rgba(34,197,94,0.25)",
  },
  {
    title: "Fast pipeline",
    body: "If your pipeline takes 30 minutes, every deploy blocks the next one. CD pipelines should complete in under 10 minutes.",
    accent: "rgb(255,85,0)",
    bg: "#020d0f",
    border: "rgba(255,85,0,0.25)",
  },
  {
    title: "Easy rollback",
    body: "When something goes wrong - and it will - you need to be able to revert in seconds. CD without rollback is reckless.",
    accent: "rgb(251,146,60)",
    bg: "#0a0700",
    border: "rgba(251,146,60,0.25)",
  },
]

const platforms = [
  {
    name: "Render",
    desc: "Simple GitHub integration. Free tier. Deploys on every push. Zero config for Node.js apps.",
    url: "render.com",
  },
  {
    name: "Railway",
    desc: "Modern platform. Clean UI. Free trial. Excellent for small apps.",
    url: "railway.app",
  },
  {
    name: "Fly.io",
    desc: "More powerful. Free tier. Global edge deployment.",
    url: "fly.io",
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
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            What is Continuous Deployment?
          </h2>
          <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Continuous Deployment means every commit that passes the automated tests is automatically
            deployed to production. No manual steps. No deployment meetings. No Marco. The pipeline
            does it all. The goal: reduce the time from commit to customer to minutes.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            CD vs CI - what is the difference?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ciVsCd.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-3 p-6 border"
                style={{
                  backgroundColor: card.bg,
                  borderColor: card.border,
                  borderLeft: `3px solid ${card.accent}`,
                }}
              >
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: card.accent }}
                >
                  {card.title}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">03</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Three prerequisites for CD
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cdPrereqs.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-3 p-6 border"
                style={{
                  backgroundColor: card.bg,
                  borderColor: card.border,
                  borderLeft: `3px solid ${card.accent}`,
                }}
              >
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: card.accent }}
                >
                  {card.title}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">04</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Choose your deployment platform
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="flex flex-col gap-3 p-5 border"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <span
                  className="text-sm font-bold uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--af-orange)" }}
                >
                  {p.name}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{p.desc}</p>
                <span className="text-xs font-mono text-gray-700">{p.url}</span>
              </div>
            ))}
          </div>
          <p className="text-xs font-mono text-gray-600">
            All three support automatic deployment from GitHub. Pick one and stick with it.
          </p>
        </section>

        <CTA
          href="?phase=3"
          label="Set up CD for Nexus Corp →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

const beforeAfter = [
  { before: "Manual deploy by Marco every release",     after: "Automatic deploy on every green commit"  },
  { before: "12 pending deploys stuck in queue",         after: "Every commit ships within minutes"        },
  { before: "Deploy meetings and checklists",            after: "No humans in the deployment loop"         },
  { before: "Bugs fixed but not shipped for weeks",      after: "Fix merged, tested, and live in minutes"  },
]

const doraImpact = [
  { metric: "Deployment Frequency",  code: "DF", before: "2x per month", after: "1x per week",  note: "automated deploy unblocks frequency" },
  { metric: "Lead Time for Changes", code: "LT", before: "28 days",      after: "14 days",       note: "commit to production in minutes"     },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "var(--af-orange)" }}>
            Mission Complete - M-16
          </p>
          <h1 className="text-5xl text-gray-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Shipping Automatically.
          </h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "var(--text-muted)" }}>
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
            <div className="grid grid-cols-2 border-b border-gray-800" style={{ backgroundColor: "var(--bg-card)" }}>
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
                style={{ backgroundColor: i % 2 === 0 ? "var(--bg-card)" : "var(--bg)" }}
              >
                <div className="px-5 py-4 border-r border-gray-800">
                  <p className="text-sm text-gray-500">{row.before}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm text-gray-600">{row.after}</p>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {doraImpact.map((d) => (
              <div
                key={d.code}
                className="flex flex-col gap-4 border p-6"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{d.metric}</span>
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-mono font-bold" style={{ fontFamily: "var(--font-heading)", color: "rgb(239,68,68)" }}>
                    {d.before}
                  </span>
                  <span className="font-mono text-gray-700">→</span>
                  <span className="text-xl font-mono font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--af-orange)" }}>
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
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              borderLeft: "3px solid rgb(31,41,55)",
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Code ships automatically. But how do you know it is working in production? You need
              visibility into what is happening after deploy. Next mission: Monitoring and Observability.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/dashboard"
              className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}
            >
              Back to dashboard →
            </a>
            <span
              className="flex items-center gap-3 px-8 py-4 text-sm font-mono border cursor-not-allowed"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text-dim)" }}
              title="Not yet available"
            >
              <span>⊘</span>
              Next mission: Monitoring and Observability →
            </span>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M04Page({
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
    await completeMission("M-16")

    // Now verify it actually exists (guards against DB errors)
    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-16" },
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
