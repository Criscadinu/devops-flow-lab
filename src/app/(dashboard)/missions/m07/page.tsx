import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-07 Architecture for Low-Risk Releases - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>
          M-07
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Architecture for Low-Risk Releases
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
    initials: "SM",
    name: "Sarah",
    role: "Engineering Manager",
    badge: "MANAGEMENT",
    accent: "rgb(6,182,212)",
    badgeBg: "rgba(6,182,212,0.08)",
    badgeBorder: "rgba(6,182,212,0.3)",
    quote: (
      <>
        &ldquo;Last release broke the orders API for <mark>2 hours</mark>. Every user was affected.
        We had to roll back manually. That took <mark>45 minutes</mark> on top of the 2-hour
        outage.&rdquo;
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
        &ldquo;I want to ship a new feature but I am scared. If it breaks, it breaks for everyone
        immediately. I need a way to test in production with real users without risking
        everything.&rdquo;
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
        &ldquo;Rollback means re-deploying the old version manually. That takes{" "}
        <mark>30 minutes</mark> minimum. During that 30 minutes, users see errors. Every deploy
        is a risk.&rdquo;
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
        &ldquo;We tested the feature in staging but prod behaves differently. Real traffic patterns
        are different. We need to test with real users before full rollout.&rdquo;
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
        &ldquo;We have a big new feature ready. But we are afraid to ship it. The last big release
        caused <mark>4 incidents</mark>. We are delaying again.&rdquo;
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
        &ldquo;The problem is not the code. The problem is how we release it. All-or-nothing
        deploys are inherently risky. The solution is to decouple deployment from release.&rdquo;
      </>
    ),
    outro: "Deploy dark. Release gradually.",
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
            Week seven. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Every deploy is still a gamble. One bad release hits all users at once.
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
          sub="Phase 2 of 4 - Deploy vs release, and how to decouple them"
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

const releasePatterns = [
  {
    title: "Blue / Green",
    body: "Run two identical environments. Blue is live. Green gets the new version. Switch traffic instantly when ready. Rollback is switching back — takes seconds.",
    accent: "rgb(6,182,212)",
    bg: "#020d0f",
    border: "rgba(6,182,212,0.25)",
  },
  {
    title: "Canary release",
    body: "Release to 1% of users first. Monitor error rates, latency, and key metrics. Expand to 10%, then 50%, then 100% only if stable. Problems affect 1% — not everyone.",
    accent: "rgb(234,179,8)",
    bg: "#0a0800",
    border: "rgba(234,179,8,0.25)",
  },
  {
    title: "Feature flags",
    body: "Deploy to all servers with the feature disabled. Enable for specific users, percentages, or regions. Rollback is flipping a flag — no redeploy, no downtime.",
    accent: "rgb(34,197,94)",
    bg: "#020a02",
    border: "rgba(34,197,94,0.25)",
  },
]

const strangler = [
  { step: "01", label: "Identify a seam",    body: "Find a bounded piece of the monolith that can be extracted without touching everything else. Start small." },
  { step: "02", label: "Build alongside",    body: "Build the new service next to the old code. Do not replace — add. The old code still runs." },
  { step: "03", label: "Route traffic",      body: "Send a subset of requests to the new service. Use a proxy or feature flag to control the split." },
  { step: "04", label: "Verify and expand",  body: "Confirm the new service handles the load correctly. Gradually increase the traffic share." },
  { step: "05", label: "Strangle the old",   body: "Once the new service handles 100% of traffic, delete the old code. The monolith shrinks one piece at a time." },
]

const patternTable = [
  { pattern: "Blue / Green",   useCase: "Zero-downtime deploys, instant rollback",   risk: "LOW",    rollback: "Seconds — switch traffic back"  },
  { pattern: "Canary",         useCase: "Testing with real traffic before full rollout", risk: "LOW", rollback: "Minutes — reroute traffic to stable" },
  { pattern: "Feature flags",  useCase: "Dark launches, A/B tests, ring deployments", risk: "VERY LOW", rollback: "Seconds — flip the flag"       },
  { pattern: "Rolling deploy", useCase: "Gradual rollout across a fleet of servers",  risk: "MEDIUM", rollback: "Minutes — redeploy old version"  },
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
            Deployment vs release — the crucial distinction
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Most teams treat these as the same thing. They are not.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                word: "Deploy",
                def: "Put code on a server. The code runs in production but may not be available to users yet. This is a technical operation.",
                accent: "rgb(75,85,99)",
              },
              {
                word: "Release",
                def: "Make a feature available to users. This is a business decision — it can happen independently of deployment, at any time.",
                accent: "rgb(6,182,212)",
              },
            ].map((item) => (
              <div
                key={item.word}
                className="flex flex-col gap-3 p-6 border"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)", borderLeft: `3px solid ${item.accent}` }}
              >
                <span className="text-sm font-mono font-bold uppercase tracking-widest" style={{ color: item.accent }}>
                  {item.word}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 leading-relaxed">
            When you decouple these, you can deploy any time and release when the business is ready.
            Deploys become boring. Releases become intentional.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Three patterns for low-risk releases
          </h2>
          <div className="flex flex-col gap-3">
            {releasePatterns.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-3 p-6 border"
                style={{ backgroundColor: card.bg, borderColor: card.border, borderLeft: `3px solid ${card.accent}` }}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: card.accent }}>
                  {card.title}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed">{card.body}</p>
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
            The strangler fig pattern
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Named after the strangler fig tree, which grows around a host tree until it replaces it.
            Applied to software: incrementally replace a monolith by building new services alongside
            it — without a big-bang rewrite.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {strangler.map((s, i) => (
              <div
                key={s.step}
                className="flex gap-5 px-5 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
              >
                <span className="text-xs font-mono font-bold shrink-0 mt-0.5" style={{ color: "rgb(6,182,212)" }}>{s.step}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">{s.label}</span>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.body}</p>
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
            When to use each pattern
          </h2>
          <div className="border border-gray-800">
            <div
              className="grid grid-cols-12 border-b border-gray-800 px-5 py-3"
              style={{ backgroundColor: "#0d0d0d" }}
            >
              <span className="col-span-3 text-xs font-mono text-gray-600 uppercase tracking-widest">Pattern</span>
              <span className="col-span-4 text-xs font-mono text-gray-600 uppercase tracking-widest">Use case</span>
              <span className="col-span-2 text-xs font-mono text-gray-600 uppercase tracking-widest">Risk</span>
              <span className="col-span-3 text-xs font-mono text-gray-600 uppercase tracking-widest">Rollback</span>
            </div>
            {patternTable.map((row, i) => (
              <div
                key={row.pattern}
                className="grid grid-cols-12 px-5 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
              >
                <span className="col-span-3 text-sm font-mono font-bold text-white">{row.pattern}</span>
                <span className="col-span-4 text-xs text-gray-400 leading-relaxed">{row.useCase}</span>
                <span
                  className="col-span-2 text-xs font-mono font-bold"
                  style={{ color: row.risk === "LOW" || row.risk === "VERY LOW" ? "rgb(34,197,94)" : "rgb(234,179,8)" }}
                >
                  {row.risk}
                </span>
                <span className="col-span-3 text-xs text-gray-500 leading-relaxed">{row.rollback}</span>
              </div>
            ))}
          </div>
        </section>

        <CTA
          href="?phase=3"
          label="Deploy dark for Nexus Corp →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

const beforeAfter = [
  { before: "All-or-nothing deploys affect all users instantly",   after: "Feature flags let you release to 1% first"           },
  { before: "Rollback takes 30 minutes of manual work",            after: "Disable a flag in seconds, no redeploy"               },
  { before: "Afraid to ship large features",                       after: "Ship dark, enable when confident"                     },
  { before: "Staging tests but prod behaves differently",          after: "Test with real prod traffic using canary releases"     },
]

const doraImpact = [
  { metric: "Change Failure Rate",   code: "CFR", before: "7%",        after: "4%",                   note: "dark launches eliminate risky big-bang releases"    },
  { metric: "Lead Time for Changes", code: "LT",  before: "7 days",    after: "5 days",               note: "fearless shipping means faster iteration"           },
  { metric: "Deployment Frequency",  code: "DF",  before: "1× / week", after: "Multiple times / week", note: "decoupled release removes hesitation to deploy"    },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(6,182,212)" }}>
            Mission Complete - M-07
          </p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Deploy Dark. Release Gradually.
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {doraImpact.map((d) => (
              <div
                key={d.code}
                className="flex flex-col gap-4 border p-6"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)" }}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{d.metric}</span>
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-lg font-mono font-bold" style={{ ...syne.style, color: "rgb(239,68,68)" }}>
                    {d.before}
                  </span>
                  <span className="font-mono text-gray-700">→</span>
                  <span className="text-lg font-mono font-bold" style={{ ...syne.style, color: "rgb(6,182,212)" }}>
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
              First Way: Flow — Complete
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              First Way complete. Flow is fast and low-risk. Next: The Second Way — Feedback. Make
              production visible.
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
            <span
              className="flex items-center gap-3 px-8 py-4 text-sm font-mono border cursor-not-allowed"
              style={{ backgroundColor: "#0a0a0a", borderColor: "rgb(31,41,55)", color: "rgb(55,65,81)" }}
              title="Not yet available"
            >
              <span>⊘</span>
              Next mission: The Second Way →
            </span>
          </div>
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

    // Complete the mission first (idempotent — safe to call multiple times)
    await completeMission("M-07")

    // Now verify it actually exists (guards against DB errors)
    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-07" },
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
