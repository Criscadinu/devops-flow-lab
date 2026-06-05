import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-13 Dev and Ops Working Together - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>M-13</span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>Dev and Ops Working Together</span>
        <span className="text-xs font-mono text-gray-600 tracking-widest uppercase">Phase {fase} of 4</span>
      </div>
      <div className="max-w-5xl mx-auto mt-3">
        <div className="w-full h-px bg-gray-800">
          <div className="h-px transition-all" style={{ width: pct, backgroundColor: "rgb(6,182,212)" }} />
        </div>
      </div>
    </header>
  )
}

function CTA({ href, label, sub }: { href: string; label: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-3 border-t border-gray-900 pt-10">
      <a href={href} className="self-start px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}>{label}</a>
      {sub && <p className="text-xs font-mono text-gray-700">{sub}</p>}
    </div>
  )
}

type DialogueEntry =
  | { type: "line"; initials: string; name: string; role: string; accent: string; text: string }
  | { type: "beat"; text: string }
  | { type: "you"; text: string; closing: string }

const dialogue: DialogueEntry[] = [
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "We shipped the new orders feature." },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "I know. I spent last night fixing the memory leak it caused." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "What memory leak?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "The one where every order object stays in memory forever because nothing cleans it up." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "I did not know that was happening." },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "I know. You never know. I just fix it and say nothing." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "How often does this happen?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "Every other release. Lisa ships. I fix. Sarah asks why prod is slow. I fix again." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "Why did you never tell me?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "I tried once. You said it was an ops problem." },
  { type: "beat", text: "Lisa did not say anything." },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "It is not an ops problem. It is a code problem that I can only fix from the ops side." },
  { type: "you", text: "Dev and Ops are not two teams with a wall between them. They are two perspectives on the same system. When they work separately, problems accumulate at the boundary. When they work together — same standups, shared on-call, shared metrics — the boundary disappears. You build it, you run it.", closing: "You build it. You run it. You own it." },
]

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3 max-w-2xl">
          <h2 className="text-4xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Week thirteen. Nexus Corp.</h2>
          <p className="text-gray-400 text-base leading-relaxed">Dev ships. Ops fixes. Nobody talks.</p>
        </div>
        <div className="flex flex-col">
          {dialogue.map((entry, i) => {
            if (entry.type === "beat") return <div key={i} className="py-6 text-center"><em className="text-sm text-gray-600 italic">{entry.text}</em></div>
            if (entry.type === "you") return (
              <div key={i} className="flex flex-col gap-4 p-6 mt-2" style={{ backgroundColor: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.2)", borderLeftWidth: "3px", borderLeft: "3px solid rgb(6,182,212)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center text-xs font-mono font-bold shrink-0" style={{ backgroundColor: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.4)", color: "rgb(6,182,212)" }}>YOU</div>
                  <div className="flex flex-col gap-0"><span className="text-white text-xs font-mono font-bold">You</span><span className="text-gray-600 text-xs font-mono">New Engineer</span></div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{entry.text}</p>
                <p className="text-white font-bold text-sm border-t pt-3" style={{ borderColor: "rgba(6,182,212,0.2)" }}>{entry.closing}</p>
              </div>
            )
            return (
              <div key={i} className="flex flex-col gap-2 px-5 py-4" style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606", borderLeft: `3px solid ${entry.accent}`, borderBottom: "1px solid rgb(21,28,36)" }}>
                <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: entry.accent }}>{entry.name} · {entry.role}</span>
                <p className="text-gray-300 text-sm leading-relaxed">{entry.text}</p>
              </div>
            )
          })}
        </div>
        <CTA href="?phase=2" label="Understand the theory →" sub="Phase 2 of 4 - Shared ownership, shared responsibility" />
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
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>Shared Ownership, Shared Responsibility</h2>
        </div>
        {[
          { num: "01", title: "The wall between Dev and Ops", body: "The traditional separation between development and operations creates a handoff problem. Dev writes code and throws it over the wall. Ops catches it, runs it, and absorbs all the operational pain. Dev never sees the consequences of their code in production. Ops never influences the code that creates their problems. Both teams optimize for their own metrics — and those metrics conflict." },
          { num: "02", title: "You build it, you run it", body: "The 'you build it, you run it' principle means the team that writes the code is also responsible for running it in production. They are on-call for their own services. They see the alerts when their code misbehaves. They feel the operational pain of their own decisions. This feedback loop — between code and consequence — is what makes code better." },
          { num: "03", title: "Practical collaboration patterns", body: "Four patterns that break down the Dev/Ops wall: shared on-call (developers rotate into the on-call rotation for their own services), joint incident response (developers as first responders, not just escalation paths), shared metrics (the same dashboard shows deployment frequency, error rate, and latency), and ops stories in the backlog (operational work prioritized alongside features)." },
          { num: "04", title: "The DORA connection", body: "The research behind Accelerate shows that high-performing teams have strong collaboration between Dev and Ops. The organizational structure — not the technology — is often the primary constraint on DORA performance. Improving the team structure unlocks improvements that no tool can provide." },
        ].map((s) => (
          <section key={s.num} className="flex flex-col gap-5">
            <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest">{s.num}</span><div className="flex-1 h-px bg-gray-900" /></div>
            <h3 className="text-2xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>{s.title}</h3>
            <p className="text-gray-400 leading-relaxed">{s.body}</p>
          </section>
        ))}
        <CTA href="?phase=3" label="Remove the wall →" sub="Phase 3 of 4 - Do it yourself" />
      </div>
    </div>
  )
}

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(6,182,212)" }}>Mission Complete - M-13</p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Nexus Corp Removes the Wall Between Dev and Ops</h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">Dev and Ops working together is not a DORA metric. It is the condition that makes all DORA metrics achievable.</p>
        </div>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span><h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your DORA metrics</h2><div className="flex-1 h-px bg-gray-900" /></div>
          <div
            className="flex flex-col gap-5 p-6 border"
            style={{ backgroundColor: "#080808", borderColor: "rgba(6,182,212,0.2)", borderLeft: "3px solid rgb(6,182,212)" }}
          >
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(6,182,212)" }}>Foundation — enabling all four metrics</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Dev and Ops working together does not show up directly in any single DORA metric. It shows up in all of them.
              Without shared ownership, every metric improvement is temporary — Dev keeps shipping problems Ops absorbs silently,
              and the cycle repeats. With shared ownership, the feedback loop closes: the person who wrote the code feels the
              operational consequence, and writes better code next time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-gray-800 pt-5">
              {[
                { code: "DF", note: "shared ownership enables more confident deploys" },
                { code: "LT", note: "operational concerns addressed during development, not after" },
                { code: "CFR", note: "memory leaks and operational issues caught by the people who ship them" },
                { code: "MTTR", note: "runbooks written by developers are actually useful at 2am" },
              ].map((d) => (
                <div key={d.code} className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                  <span className="text-xs font-mono px-2 py-0.5 border self-start" style={{ color: "rgb(107,114,128)", borderColor: "rgb(55,65,81)", backgroundColor: "rgba(75,85,99,0.06)" }}>FOUNDATION</span>
                  <p className="text-xs font-mono text-gray-600">{d.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span><h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What is next</h2><div className="flex-1 h-px bg-gray-900" /></div>
          <div className="flex flex-col gap-3 p-6 border" style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)", borderLeft: "3px solid rgb(31,41,55)" }}>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">Next: Enable and practice continuous integration</p>
            <p className="text-gray-500 text-sm leading-relaxed">Small batches, trunk-based development, and committing to trunk multiple times per day. The test suite you built is the safety net that makes continuous integration possible.</p>
          </div>
        </section>
        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a href="/missions/m14" className="px-8 py-4 text-sm font-bold tracking-wide" style={{ backgroundColor: "rgb(31,41,55)", color: "rgb(107,114,128)", ...syne.style, fontWeight: 700, opacity: 0.6, pointerEvents: "none" as const }}>Continue to M-14 →</a>
            <a href="/dashboard" className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}>Back to dashboard →</a>
          </div>
          <p className="text-xs font-mono text-gray-700">M-14 unlocks when you complete AUTOMATED_TESTING</p>
        </section>
      </div>
    </div>
  )
}

export default async function M13Page({ searchParams }: { searchParams: Promise<{ phase?: string }> }) {
  const session = await auth()
  if (!session?.user?.email) redirect("/api/auth/signin")
  const { phase: phaseParam } = await searchParams
  const phase = ["1", "2", "3", "4"].includes(phaseParam ?? "") ? Number(phaseParam) : 1
  if (phase === 4) {
    const gateUser = await prisma.user.findUnique({ where: { email: session.user.email! }, select: { id: true } })
    if (!gateUser) redirect("?phase=3")
    await completeMission("M-13")
    const completed = await prisma.userProgress.findFirst({ where: { userId: gateUser.id, moduleId: "M-13" } })
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
