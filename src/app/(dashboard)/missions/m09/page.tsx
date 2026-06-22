import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-09 Write Tests Before Code (TDD) - DevOps Flow Lab",
}


function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "var(--bg-card)" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "var(--af-orange)" }}>M-09</span>
        <span className="text-sm font-bold tracking-tight text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>Write Tests Before Code (TDD)</span>
        <span className="text-xs font-mono text-gray-600 tracking-widest uppercase">Phase {fase} of 4</span>
      </div>
      <div className="max-w-5xl mx-auto mt-3">
        <div className="w-full h-px bg-gray-800">
          <div className="h-px transition-all" style={{ width: pct, background: "linear-gradient(90deg, #FF0000 0%, #FF8C00 100%)" }} />
        </div>
      </div>
    </header>
  )
}

function CTA({ href, label, sub }: { href: string; label: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-3 border-t border-gray-900 pt-10">
      <a href={href} className="self-start px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}>{label}</a>
      {sub && <p className="text-xs font-mono text-gray-700">{sub}</p>}
    </div>
  )
}

type DialogueEntry =
  | { type: "line"; initials: string; name: string; role: string; accent: string; text: string }
  | { type: "beat"; text: string }
  | { type: "you"; text: string; closing: string }

const dialogue: DialogueEntry[] = [
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "The discount feature is live." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "Does it work?" },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "It works in my testing." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "What did you test?" },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "I clicked through the UI a few times. Looked fine." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "What about the edge cases? Zero discount. Negative discount. Discount above 100 percent." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "I did not test those." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "A customer just applied a 150 percent discount. They got paid to buy things." },
  { type: "beat", text: "Lisa stared at the Slack notification." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "That should not be possible." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "It is possible because there is no test that says it should not be. If you had written the test first, you would have had to think about that case before writing the code." },
  { type: "you", text: "Test-driven development inverts the order. Write the test first. Watch it fail. Write the code to make it pass. The test is not a verification — it is a specification. It forces you to define what correct behavior looks like before you implement it. Edge cases become requirements, not afterthoughts.", closing: "The test is the design. Write it first." },
]

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3 max-w-2xl">
          <h2 className="text-4xl text-gray-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Week nine. Nexus Corp.</h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>Lisa shipped a feature. It works. She has no idea why.</p>
        </div>
        <div className="flex flex-col">
          {dialogue.map((entry, i) => {
            if (entry.type === "beat") return <div key={i} className="py-6 text-center"><em className="text-sm text-gray-600 italic">{entry.text}</em></div>
            if (entry.type === "you") return (
              <div key={i} className="flex flex-col gap-4 p-6 mt-2" style={{ backgroundColor: "rgba(255,85,0,0.04)", border: "1px solid rgba(255,85,0,0.2)", borderLeftWidth: "3px", borderLeft: "3px solid rgb(255,85,0)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center text-xs font-mono font-bold shrink-0" style={{ backgroundColor: "rgba(255,85,0,0.12)", border: "1px solid rgba(255,85,0,0.4)", color: "var(--af-orange)" }}>YOU</div>
                  <div className="flex flex-col gap-0"><span className="text-gray-900 text-xs font-mono font-bold">You</span><span className="text-gray-600 text-xs font-mono">New Engineer</span></div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{entry.text}</p>
                <p className="text-gray-900 font-bold text-sm border-t pt-3" style={{ borderColor: "rgba(255,85,0,0.2)" }}>{entry.closing}</p>
              </div>
            )
            return (
              <div key={i} className="flex flex-col gap-2 px-5 py-4" style={{ backgroundColor: i % 2 === 0 ? "var(--bg-card)" : "var(--bg)", borderLeft: `3px solid ${entry.accent}`, borderBottom: "1px solid var(--border)" }}>
                <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: entry.accent }}>{entry.name} · {entry.role}</span>
                <p className="text-gray-600 text-sm leading-relaxed">{entry.text}</p>
              </div>
            )
          })}
        </div>
        <CTA href="?phase=2" label="Understand the theory →" sub="Phase 2 of 4 - Red, green, refactor" />
      </div>
    </div>
  )
}

function Phase2() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-14">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-mono tracking-widest uppercase text-gray-600">AUTOMATED TESTING — Enable fast and reliable automated testing</p>
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Red, Green, Refactor</h2>
        </div>
        {[
          { num: "01", title: "What TDD actually is", body: "TDD is a development practice with three steps: write a failing test (red), write the minimum code to make it pass (green), refactor the code without breaking the test (refactor). The cycle is short — minutes, not hours. Each cycle produces one small, verified behavior." },
          { num: "02", title: "Why write the test first", body: "Writing the test first forces you to think about the interface before the implementation. What inputs does this function accept? What should it return? What should it reject? These questions, answered upfront, prevent entire categories of bugs. The 150% discount bug would have been caught in the test specification phase, not in production." },
          { num: "03", title: "What TDD is not", body: "TDD is not about 100% code coverage. It is not a bureaucratic requirement to write tests for obvious code. It is a design tool. Use it for business logic, edge cases, and anything where the correct behavior is not obvious. Skip it for trivial getters, framework boilerplate, and generated code." },
          { num: "04", title: "The DORA connection", body: "Teams that practice TDD have lower Change Failure Rate because defects are caught before the code is written. The test suite grows naturally with the codebase — not as an afterthought. Over time, the test suite becomes a living specification of the system's behavior." },
        ].map((s) => (
          <section key={s.num} className="flex flex-col gap-5">
            <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest">{s.num}</span><div className="flex-1 h-px bg-gray-900" /></div>
            <h3 className="text-2xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>{s.title}</h3>
            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.body}</p>
          </section>
        ))}
        <CTA href="?phase=3" label="Write tests first →" sub="Phase 3 of 4 - Do it yourself" />
      </div>
    </div>
  )
}

type MetricCard = { metric: string; code: string; badge: "IMPROVING" | "FOUNDATION"; note: string }

const m09Metrics: MetricCard[] = [
  { metric: "Change Failure Rate",   code: "CFR",  badge: "IMPROVING",  note: "edge cases are caught before code is written — bugs never reach production" },
  { metric: "Lead Time for Changes", code: "LT",   badge: "FOUNDATION", note: "TDD builds quality in but LT gains come from other practices" },
  { metric: "Deployment Frequency",  code: "DF",   badge: "FOUNDATION", note: "no direct improvement yet" },
  { metric: "Mean Time to Restore",  code: "MTTR", badge: "FOUNDATION", note: "no direct improvement yet" },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "var(--af-orange)" }}>Mission Complete - M-09</p>
          <h1 className="text-5xl text-gray-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Nexus Corp Defines Behavior Before Writing Code</h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "var(--text-muted)" }}>The 150% discount bug was killed before the first line of implementation was written. The test was the specification.</p>
        </div>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span><h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your DORA metrics</h2><div className="flex-1 h-px bg-gray-900" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {m09Metrics.map((d) => (
              <div key={d.code} className="flex flex-col gap-4 border p-6" style={{ backgroundColor: d.badge === "IMPROVING" ? "#0a0700" : "#080808", borderColor: d.badge === "IMPROVING" ? "rgba(251,146,60,0.25)" : "rgb(31,41,55)", borderLeft: d.badge === "IMPROVING" ? "3px solid rgb(251,146,60)" : "3px solid rgb(55,65,81)" }}>
                <div className="flex flex-col gap-1"><span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{d.metric}</span><span className="text-xs font-mono text-gray-700">DORA - {d.code}</span></div>
                <div>{d.badge === "IMPROVING" ? <span className="text-xs font-mono px-2 py-0.5 border" style={{ color: "rgb(251,146,60)", borderColor: "rgba(251,146,60,0.4)", backgroundColor: "rgba(251,146,60,0.06)" }}>IMPROVING ↓</span> : <span className="text-xs font-mono px-2 py-0.5 border" style={{ color: "var(--text-muted)", borderColor: "rgb(55,65,81)", backgroundColor: "rgba(75,85,99,0.06)" }}>FOUNDATION</span>}</div>
                <p className="text-xs font-mono text-gray-600">{d.note}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span><h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What is next</h2><div className="flex-1 h-px bg-gray-900" /></div>
          <div className="flex flex-col gap-3 p-6 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", borderLeft: "3px solid rgb(31,41,55)" }}>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">Next: Automate Manual Tests</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>Kai still spends two days clicking through the app before every release. Automate the checklist.</p>
          </div>
        </section>
        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a href="/missions/m10" className="px-8 py-4 text-sm font-bold tracking-wide" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-muted)", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", opacity: 0.6, pointerEvents: "none" as const }}>Continue to M-10 →</a>
            <a href="/dashboard" className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}>Back to dashboard →</a>
          </div>
          <p className="text-xs font-mono text-gray-700">M-10 unlocks when you complete AUTOMATED_TESTING</p>
        </section>
      </div>
    </div>
  )
}

export default async function M09Page({ searchParams }: { searchParams: Promise<{ phase?: string }> }) {
  const session = await auth()
  if (!session?.user?.email) redirect("/api/auth/signin")
  const { phase: phaseParam } = await searchParams
  const phase = ["1", "2", "3", "4"].includes(phaseParam ?? "") ? Number(phaseParam) : 1
  if (phase === 4) {
    const gateUser = await prisma.user.findUnique({ where: { email: session.user.email! }, select: { id: true } })
    if (!gateUser) redirect("?phase=3")
    await completeMission("M-09")
    const completed = await prisma.userProgress.findFirst({ where: { userId: gateUser.id, moduleId: "M-09" } })
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
