import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-06 Catch Errors as Early as Possible - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>
          M-06
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Catch Errors as Early as Possible
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

type DialogueEntry =
  | { type: "line"; initials: string; name: string; role: string; accent: string; text: string }
  | { type: "beat"; text: string }
  | { type: "you"; text: string; closing: string }

const dialogue: DialogueEntry[] = [
  {
    type: "line",
    initials: "KA",
    name: "Kai",
    role: "QA",
    accent: "rgb(251,146,60)",
    text: "The orders bug. How long was it in production?",
  },
  {
    type: "line",
    initials: "LI",
    name: "Lisa",
    role: "DEV",
    accent: "rgb(34,197,94)",
    text: "Three weeks. Since the pagination feature shipped.",
  },
  {
    type: "line",
    initials: "KA",
    name: "Kai",
    role: "QA",
    accent: "rgb(251,146,60)",
    text: "Three weeks. And we caught it because a customer called.",
  },
  {
    type: "line",
    initials: "MA",
    name: "Marco",
    role: "OPS",
    accent: "rgb(239,68,68)",
    text: "We have tests. The pipeline runs them.",
  },
  {
    type: "line",
    initials: "KA",
    name: "Kai",
    role: "QA",
    accent: "rgb(251,146,60)",
    text: "We have tests for the happy path. The pagination feature changed how orders are sorted. Nobody wrote a test for that edge case.",
  },
  {
    type: "line",
    initials: "LI",
    name: "Lisa",
    role: "DEV",
    accent: "rgb(34,197,94)",
    text: "To be fair, the test suite takes 12 minutes to run. I stopped running it locally.",
  },
  {
    type: "line",
    initials: "KA",
    name: "Kai",
    role: "QA",
    accent: "rgb(251,146,60)",
    text: "So the first time the tests ran against that code was in production.",
  },
  {
    type: "beat",
    text: "A silence.",
  },
  {
    type: "line",
    initials: "KA",
    name: "Kai",
    role: "QA",
    accent: "rgb(251,146,60)",
    text: "That is not a test suite. That is a post-mortem waiting to happen.",
  },
  {
    type: "line",
    initials: "MA",
    name: "Marco",
    role: "OPS",
    accent: "rgb(239,68,68)",
    text: "What do we do differently?",
  },
  {
    type: "line",
    initials: "KA",
    name: "Kai",
    role: "QA",
    accent: "rgb(251,146,60)",
    text: "We move the tests closer to the code. Unit tests that run in seconds. Linting that catches type errors before the pipeline. The further right a bug gets, the more expensive it is.",
  },
  {
    type: "you",
    text: "Shift left means catching errors at the earliest possible stage. A linter catches a type error in milliseconds. A unit test catches a logic error in seconds. An integration test catches a wiring error in minutes. A customer catches a missing feature in three weeks — and tells everyone.",
    closing: "The cost of a bug doubles with every stage it passes through.",
  },
]

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">

        <div className="flex flex-col gap-3 max-w-2xl">
          <h2
            className="text-4xl text-white tracking-tight leading-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Week six. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            The bug was introduced three weeks ago. Nobody caught it until a customer called.
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
                    backgroundColor: "rgba(6,182,212,0.04)",
                    borderLeft: "3px solid rgb(6,182,212)",
                    border: "1px solid rgba(6,182,212,0.2)",
                    borderLeftWidth: "3px",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 flex items-center justify-center text-xs font-mono font-bold shrink-0"
                      style={{
                        backgroundColor: "rgba(6,182,212,0.12)",
                        border: "1px solid rgba(6,182,212,0.4)",
                        color: "rgb(6,182,212)",
                      }}
                    >
                      YOU
                    </div>
                    <div className="flex flex-col gap-0">
                      <span className="text-white text-xs font-mono font-bold">You</span>
                      <span className="text-gray-600 text-xs font-mono">New Engineer</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{entry.text}</p>
                  <p className="text-white font-bold text-sm border-t pt-3" style={{ borderColor: "rgba(6,182,212,0.2)" }}>
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
                  backgroundColor: i % 2 === 0 ? "#080808" : "#060606",
                  borderLeft: `3px solid ${entry.accent}`,
                  borderBottom: "1px solid rgb(21,28,36)",
                }}
              >
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: entry.accent }}
                >
                  {entry.name} · {entry.role}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">{entry.text}</p>
              </div>
            )
          })}
        </div>

        <CTA
          href="?phase=2"
          label="Understand the theory →"
          sub="Phase 2 of 4 - Find bugs before they find users"
        />
      </div>
    </div>
  )
}

// ─── Phase 2 - The theory ─────────────────────────────────────────────────────

const costProgression = [
  { stage: "Linter / type check", time: "Milliseconds", impact: "Zero user impact" },
  { stage: "Unit test",           time: "Seconds",      impact: "Zero user impact" },
  { stage: "Integration test",    time: "Minutes",      impact: "Zero user impact" },
  { stage: "Staging environment", time: "Hours",        impact: "Internal impact only" },
  { stage: "Production",          time: "Hours to days", impact: "Real users affected, potential data loss" },
]

function Phase2() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-14">

        <div className="flex flex-col gap-2">
          <p className="text-xs font-mono tracking-widest uppercase text-gray-600">
            AUTOMATED TESTING — Enable fast and reliable automated testing
          </p>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Shift Left — Find Bugs Before They Find Users
          </h2>
        </div>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">01</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h3 className="text-2xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            The cost of late detection
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Every stage a bug passes through multiplies its cost. A type error caught by a linter costs milliseconds.
            The same error caught in production costs hours of debugging, a hotfix deploy, potential data corruption,
            and a customer support ticket. The principle is simple: find it as close to the source as possible.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            <div className="grid grid-cols-3 gap-4 px-5 py-3 border-b border-gray-800" style={{ backgroundColor: "#060606" }}>
              <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">Stage</span>
              <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">Time to detect</span>
              <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">User impact</span>
            </div>
            {costProgression.map((row, i) => (
              <div
                key={row.stage}
                className="grid grid-cols-3 gap-4 px-5 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
              >
                <span className="text-xs font-mono font-bold" style={{ color: i === 4 ? "rgb(239,68,68)" : "rgb(6,182,212)" }}>
                  {row.stage}
                </span>
                <span className="text-xs text-gray-500">{row.time}</span>
                <span className="text-xs text-gray-500">{row.impact}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h3 className="text-2xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            The test pyramid
          </h3>
          <p className="text-gray-400 leading-relaxed">
            The test pyramid describes the right ratio of test types: many unit tests (fast, isolated, test one function),
            fewer integration tests (slower, test how components connect), and few end-to-end tests (slowest, test the full user journey).
          </p>
          <p className="text-gray-400 leading-relaxed">
            Most teams invert this pyramid — many slow E2E tests, few fast unit tests. The result: a test suite that takes
            20 minutes and nobody runs locally. Invert it back.
          </p>
          <div className="flex flex-col gap-3">
            {[
              { label: "Many unit tests",         note: "fast, isolated, test one function — run in seconds", accent: "rgb(34,197,94)" },
              { label: "Fewer integration tests",  note: "slower, test how components connect — run in minutes", accent: "rgb(251,146,60)" },
              { label: "Few E2E tests",            note: "slowest, test the full user journey — run sparingly", accent: "rgb(239,68,68)" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center gap-4 px-5 py-4 border"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)", borderLeft: `3px solid ${row.accent}` }}
              >
                <span className="text-xs font-mono font-bold w-48 shrink-0" style={{ color: row.accent }}>
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
          <h3 className="text-2xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Linting and static analysis as a first gate
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Before tests run, linting and static analysis should catch syntax errors, type mismatches, unused variables,
            and code style violations that mask logic errors. Add linting to the pipeline before the test step.
            A lint failure is faster to catch and faster to fix than a test failure.
          </p>
          <div
            className="flex flex-col gap-3 p-5 border"
            style={{ backgroundColor: "#080808", borderColor: "rgba(6,182,212,0.2)", borderLeft: "3px solid rgba(6,182,212,0.4)" }}
          >
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(6,182,212)" }}>
              Pipeline order
            </span>
            <div className="flex flex-col gap-2">
              {["1. Lint (fastest — catches syntax and type errors)", "2. Unit tests (fast — catches logic errors)", "3. Integration tests (slower — catches wiring errors)", "4. Deploy (only reaches here if everything above passed)"].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "rgb(6,182,212)" }}>→</span>
                  <p className="text-xs text-gray-400">{step}</p>
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
          <h3 className="text-2xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            The DORA connection
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Catching errors early directly reduces Change Failure Rate. Bugs that never reach production cannot cause incidents.
            Teams with strong shift-left practices have CFR below 5% — elite teams below 1%. This mission targets CFR reduction
            as part of the AUTOMATED_TESTING cluster.
          </p>
          <div
            className="flex flex-col gap-3 p-5 border"
            style={{ backgroundColor: "#080808", borderColor: "rgba(6,182,212,0.2)", borderLeft: "3px solid rgba(6,182,212,0.4)" }}
          >
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(6,182,212)" }}>
              What this mission does
            </span>
            <p className="text-sm text-gray-400 leading-relaxed">
              Every unit test you add to Nexus Corp is a class of bugs that can never reach production again.
              The lint gate blocks entire categories of errors before they ever run. CFR starts moving — not to a fixed number yet,
              but directionally down.
            </p>
          </div>
        </section>

        <CTA
          href="?phase=3"
          label="Shift left →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(6,182,212)" }}>
            Mission Complete - M-06
          </p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Nexus Corp Catches Bugs Before Users Do
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            The lint gate is active. The unit test is real. The pipeline now stops errors before they reach production.
          </p>
        </div>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your DORA metrics</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* CFR - Improving */}
            <div
              className="flex flex-col gap-4 border p-6"
              style={{
                backgroundColor: "#0a0700",
                borderColor: "rgba(251,146,60,0.25)",
                borderLeft: "3px solid rgb(251,146,60)",
              }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">Change Failure Rate</span>
                <span className="text-xs font-mono text-gray-700">DORA - CFR</span>
              </div>
              <div>
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
              </div>
              <p className="text-xs font-mono text-gray-600">
                The change failure rate drops as you build test coverage. Every unit test you add is a bug that can never reach production again.
              </p>
            </div>

            {/* DF - Foundation */}
            <div
              className="flex flex-col gap-4 border p-6"
              style={{
                backgroundColor: "#080808",
                borderColor: "rgb(31,41,55)",
                borderLeft: "3px solid rgb(55,65,81)",
              }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">Deployment Frequency</span>
                <span className="text-xs font-mono text-gray-700">DORA - DF</span>
              </div>
              <div>
                <span
                  className="text-xs font-mono px-2 py-0.5 border"
                  style={{
                    color: "rgb(107,114,128)",
                    borderColor: "rgb(55,65,81)",
                    backgroundColor: "rgba(75,85,99,0.06)",
                  }}
                >
                  FOUNDATION
                </span>
              </div>
              <p className="text-xs font-mono text-gray-600">faster feedback enables more frequent deploys</p>
            </div>

            {/* LT - Foundation */}
            <div
              className="flex flex-col gap-4 border p-6"
              style={{
                backgroundColor: "#080808",
                borderColor: "rgb(31,41,55)",
                borderLeft: "3px solid rgb(55,65,81)",
              }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">Lead Time for Changes</span>
                <span className="text-xs font-mono text-gray-700">DORA - LT</span>
              </div>
              <div>
                <span
                  className="text-xs font-mono px-2 py-0.5 border"
                  style={{
                    color: "rgb(107,114,128)",
                    borderColor: "rgb(55,65,81)",
                    backgroundColor: "rgba(75,85,99,0.06)",
                  }}
                >
                  FOUNDATION
                </span>
              </div>
              <p className="text-xs font-mono text-gray-600">less rework from production bugs shortens lead time</p>
            </div>

            {/* MTTR - Foundation */}
            <div
              className="flex flex-col gap-4 border p-6"
              style={{
                backgroundColor: "#080808",
                borderColor: "rgb(31,41,55)",
                borderLeft: "3px solid rgb(55,65,81)",
              }}
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">Mean Time to Restore</span>
                <span className="text-xs font-mono text-gray-700">DORA - MTTR</span>
              </div>
              <div>
                <span
                  className="text-xs font-mono px-2 py-0.5 border"
                  style={{
                    color: "rgb(107,114,128)",
                    borderColor: "rgb(55,65,81)",
                    backgroundColor: "rgba(75,85,99,0.06)",
                  }}
                >
                  FOUNDATION
                </span>
              </div>
              <p className="text-xs font-mono text-gray-600">fewer incidents means less restoration work</p>
            </div>
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
              backgroundColor: "#080808",
              borderColor: "rgb(31,41,55)",
              borderLeft: "3px solid rgb(31,41,55)",
            }}
          >
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">
              Next: Enable and practice continuous integration
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Small batches, trunk-based development, and committing frequently. The test suite you built here is the safety net
              that makes continuous integration possible.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/missions/m07"
              className="px-8 py-4 text-sm font-bold tracking-wide"
              style={{
                backgroundColor: "rgb(31,41,55)",
                color: "rgb(107,114,128)",
                ...syne.style,
                fontWeight: 700,
                opacity: 0.6,
                pointerEvents: "none" as const,
              }}
            >
              Continue to M-07 →
            </a>
            <a
              href="/dashboard"
              className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}
            >
              Back to dashboard →
            </a>
          </div>
          <p className="text-xs font-mono text-gray-700">M-07 is coming soon</p>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M06Page({
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

    await completeMission("M-06")

    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-06" },
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
