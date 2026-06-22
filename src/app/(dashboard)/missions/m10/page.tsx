import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-10 Automate Manual Tests - DevOps Flow Lab",
}


function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "var(--bg-card)" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "var(--af-orange)" }}>M-10</span>
        <span className="text-sm font-bold tracking-tight text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>Automate Manual Tests</span>
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
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "Release checklist. Step one: log in as admin. Step two: create an order. Step three: apply a discount. Step four..." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "How long does this take?" },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "Two days. Every release." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "We release every two weeks. So you spend two days out of every fourteen doing the same clicks." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "Fourteen percent of my time. Yes." },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "And if you miss a step?" },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "We find out in production." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "Has that happened?" },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "Three times this quarter." },
  { type: "beat", text: "Nobody said anything. Kai opened the checklist. It was four pages long." },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "Every step on that checklist is a test that could be automated." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "I know. I just never had time to automate them because I was busy running them." },
  { type: "you", text: "Manual testing is not a safety net. It is a bottleneck with a person attached. Every manual test that gets automated frees up time, removes human error, and runs on every commit instead of every two weeks. The checklist is the spec. The automation is the execution.", closing: "If a human can follow the steps, a machine can follow them faster." },
]

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3 max-w-2xl">
          <h2 className="text-4xl text-gray-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Week ten. Nexus Corp.</h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>Every release, Kai spends two days clicking through the app.</p>
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
        <CTA href="?phase=2" label="Understand the theory →" sub="Phase 2 of 4 - From checklist to automation" />
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
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>From Checklist to Automation</h2>
        </div>
        {[
          { num: "01", title: "The cost of manual testing", body: "Manual testing has a fixed cost per release. Automated testing has a fixed cost to build, then near-zero cost to run. The crossover point — where automation pays for itself — is usually two or three release cycles. After that, every manual test that still exists is technical debt with a time cost attached." },
          { num: "02", title: "What to automate first", body: "Automate the tests that run most frequently, have the highest stakes, and are most prone to human error. A good starting point: the release checklist. Every step on the checklist is a candidate for automation. Start with the happy path, then add edge cases as bugs are found." },
          { num: "03", title: "Integration tests vs E2E tests", body: "Integration tests verify that components connect correctly — the API returns the right shape, the database query returns the right data. E2E tests verify that the full user journey works. Both are valuable. Integration tests are faster and more stable. E2E tests are slower but catch wiring failures that unit tests miss." },
          { num: "04", title: "The DORA connection", body: "Automating manual tests increases Deployment Frequency by removing the manual gate before each release. Teams that automate their release checklists can deploy multiple times per day instead of once every two weeks. Kai's two days become 30 seconds of CI." },
        ].map((s) => (
          <section key={s.num} className="flex flex-col gap-5">
            <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest">{s.num}</span><div className="flex-1 h-px bg-gray-900" /></div>
            <h3 className="text-2xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>{s.title}</h3>
            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.body}</p>
          </section>
        ))}
        <CTA href="?phase=3" label="Automate the checklist →" sub="Phase 3 of 4 - Do it yourself" />
      </div>
    </div>
  )
}

type MetricCard = { metric: string; code: string; badge: "IMPROVING" | "FOUNDATION"; note: string }

const m10Metrics: MetricCard[] = [
  { metric: "Deployment Frequency",  code: "DF",   badge: "IMPROVING",  note: "manual gate removed — releases no longer blocked on two-day testing cycle" },
  { metric: "Lead Time for Changes", code: "LT",   badge: "IMPROVING",  note: "automation runs in minutes instead of days" },
  { metric: "Change Failure Rate",   code: "CFR",  badge: "IMPROVING",  note: "automated tests never miss a step — human error eliminated" },
  { metric: "Mean Time to Restore",  code: "MTTR", badge: "FOUNDATION", note: "no direct improvement yet" },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "var(--af-orange)" }}>Mission Complete - M-10</p>
          <h1 className="text-5xl text-gray-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Nexus Corp Releases Without a Checklist</h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "var(--text-muted)" }}>Kai&apos;s two days are now 30 seconds of CI. It runs on every commit. It never gets tired. It never misses a step.</p>
        </div>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span><h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your DORA metrics</h2><div className="flex-1 h-px bg-gray-900" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {m10Metrics.map((d) => (
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
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">Next: Integrate Performance Testing</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>The orders endpoint was fast with 12 records. It is not fast with 47,000. Add performance tests before customers find out.</p>
          </div>
        </section>
        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a href="/missions/m11" className="px-8 py-4 text-sm font-bold tracking-wide" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-muted)", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", opacity: 0.6, pointerEvents: "none" as const }}>Continue to M-11 →</a>
            <a href="/dashboard" className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}>Back to dashboard →</a>
          </div>
          <p className="text-xs font-mono text-gray-700">M-11 unlocks when you complete AUTOMATED_TESTING</p>
        </section>
      </div>
    </div>
  )
}

export default async function M10Page({ searchParams }: { searchParams: Promise<{ phase?: string }> }) {
  const session = await auth()
  if (!session?.user?.email) redirect("/api/auth/signin")
  const { phase: phaseParam } = await searchParams
  const phase = ["1", "2", "3", "4"].includes(phaseParam ?? "") ? Number(phaseParam) : 1
  if (phase === 4) {
    const gateUser = await prisma.user.findUnique({ where: { email: session.user.email! }, select: { id: true } })
    if (!gateUser) redirect("?phase=3")
    await completeMission("M-10")
    const completed = await prisma.userProgress.findFirst({ where: { userId: gateUser.id, moduleId: "M-10" } })
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
