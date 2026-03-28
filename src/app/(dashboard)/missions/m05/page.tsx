import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>
          M-05
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Test Automation
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
        &ldquo;The pipeline runs. But we have 12 tests total for an app with 200 endpoints. A green
        pipeline with bad tests is worse than no tests — it gives false confidence.&rdquo;
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
        &ldquo;I broke the orders endpoint last week. The pipeline passed. A customer found it 3
        days later. We had no test for that endpoint.&rdquo;
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
        &ldquo;Every deploy I hold my breath. The pipeline says green but I know we are only testing
        the happy path. Nobody tests what happens when the database is slow.&rdquo;
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
        &ldquo;I spend <mark>2 days per sprint</mark> doing manual regression testing. The same 40
        flows, every sprint, by hand. If we had automated tests I could focus on exploratory
        testing.&rdquo;
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
        &ldquo;We have <mark>47 open bugs</mark>. Most of them are regressions — things that used
        to work and broke. Automated tests would have caught them.&rdquo;
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
        &ldquo;The pipeline runs. But it only tests what someone thought to test. The coverage is
        thin. The confidence is false. Time to build a real test suite.&rdquo;
      </>
    ),
    outro: "Test everything that matters.",
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
            Week five. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            The pipeline is green. But green means nothing if the tests are wrong.
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
          href="?fase=2"
          label="Understand the theory →"
          sub="Phase 2 of 4 - What makes a good test suite?"
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

const pyramidLevels = [
  {
    label: "End-to-end tests",
    pct: "10%",
    desc: "Test the full system from the user perspective. Slow (minutes), expensive, fragile. Use sparingly — 10% of your suite.",
    accent: "rgb(251,146,60)",
    bg: "#0a0700",
    border: "rgba(251,146,60,0.25)",
  },
  {
    label: "Integration tests",
    pct: "20%",
    desc: "Test components working together. Slower (seconds), catch interface bugs. Should make up 20% of your suite.",
    accent: "rgb(6,182,212)",
    bg: "#020d0f",
    border: "rgba(6,182,212,0.25)",
  },
  {
    label: "Unit tests",
    pct: "70%",
    desc: "Test one function or class in isolation. Fast (milliseconds), cheap to write, easy to debug. Should make up 70% of your suite.",
    accent: "rgb(34,197,94)",
    bg: "#060f06",
    border: "rgba(34,197,94,0.25)",
  },
]

const firstProperties = [
  { num: "1", letter: "F", name: "Fast",             body: "Unit tests must run in milliseconds. A slow test suite does not get run." },
  { num: "2", letter: "I", name: "Isolated",         body: "Each test must be independent. Tests that depend on each other cause cascading failures." },
  { num: "3", letter: "R", name: "Repeatable",       body: "Same result every time, in any environment. No flaky tests." },
  { num: "4", letter: "S", name: "Self-validating",  body: "Pass or fail — no manual inspection needed." },
  { num: "5", letter: "T", name: "Timely",           body: "Written at the same time as the code, not months later." },
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
            What makes a good test suite?
          </h2>
          <p className="text-gray-400 leading-relaxed">
            A good test suite is fast, reliable, and catches real bugs. It gives developers confidence
            to change code without fear. A bad test suite is slow, flaky, and tests the wrong things —
            it becomes a burden instead of a safety net.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            The test pyramid
          </h2>
          <div className="flex flex-col gap-3">
            {pyramidLevels.map((level) => (
              <div
                key={level.label}
                className="flex gap-5 p-5 border"
                style={{ backgroundColor: level.bg, borderColor: level.border, borderLeft: `3px solid ${level.accent}` }}
              >
                <div className="shrink-0 flex flex-col items-center gap-1 pt-0.5">
                  <span className="text-sm font-mono font-bold" style={{ color: level.accent }}>{level.pct}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: level.accent }}>
                    {level.label}
                  </span>
                  <p className="text-gray-400 text-sm leading-relaxed">{level.desc}</p>
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
            The four properties of good tests (FIRST)
          </h2>
          <div className="flex flex-col gap-3">
            {firstProperties.map((p) => (
              <div
                key={p.letter}
                className="flex gap-5 p-5 border"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)" }}
              >
                <div className="shrink-0 flex flex-col items-center gap-1 pt-0.5">
                  <span className="text-xs font-mono text-gray-700">{p.num}</span>
                  <span
                    className="text-lg font-mono font-bold"
                    style={{ ...syne.style, color: "rgb(6,182,212)" }}
                  >
                    {p.letter}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: "rgb(6,182,212)" }}>
                    {p.name}
                  </span>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTA
          href="?fase=3"
          label="Build the test suite →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

const beforeAfter = [
  { before: "3 tests, all testing the wrong values",      after: "Full endpoint coverage with meaningful assertions" },
  { before: "Pipeline green with false confidence",        after: "Pipeline green means code actually works"          },
  { before: "2 days of manual regression per sprint",     after: "Regression suite runs in seconds automatically"    },
  { before: "Bugs found by customers",                    after: "Bugs caught before they reach production"          },
]

const doraImpact = [
  { metric: "Change Failure Rate",  code: "CFR", before: "18%",     after: "10%",     note: "tests catch more bugs before production" },
  { metric: "Lead Time for Changes", code: "LT", before: "14 days", after: "10 days", note: "less time debugging production issues"    },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(6,182,212)" }}>
            Mission Complete - M-05
          </p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Tests That Mean Something.
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="flex items-center gap-4">
                  <span className="text-xl font-mono font-bold" style={{ ...syne.style, color: "rgb(239,68,68)" }}>
                    {d.before}
                  </span>
                  <span className="font-mono text-gray-700">→</span>
                  <span className="text-xl font-mono font-bold" style={{ ...syne.style, color: "rgb(6,182,212)" }}>
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
              borderColor: "rgb(31,41,55)",
              borderLeft: "3px solid rgb(31,41,55)",
            }}
          >
            <p className="text-gray-400 text-sm leading-relaxed">
              The tests are solid. But the infrastructure is still manually configured. Every server
              is a snowflake. Next mission: Infrastructure as Code.
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
              Next mission: Infrastructure as Code →
            </span>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M05Page({
  searchParams,
}: {
  searchParams: Promise<{ fase?: string }>
}) {
  const session = await auth()
  if (!session?.user?.email) redirect("/api/auth/signin")

  const { fase: faseParam } = await searchParams
  const fase = ["1", "2", "3", "4"].includes(faseParam ?? "") ? Number(faseParam) : 1

  if (fase === 4) {
    try {
      await completeMission("M-05")
    } catch {
      // Neon HTTP adapter does not support transactions; progress save is best-effort
    }
  }

  return (
    <main className="min-h-screen text-gray-100 flex flex-col" style={{ backgroundColor: "#000" }}>
      <MissionHeader fase={fase} />
      {fase === 1 && <Phase1 />}
      {fase === 2 && <Phase2 />}
      {fase === 3 && <Phase3 />}
      {fase === 4 && <Phase4 />}
    </main>
  )
}
