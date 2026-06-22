import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-19 Release Patterns — Canary and Blue-Green - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(255,85,0)" }}>M-19</span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>Release Patterns — Canary and Blue-Green</span>
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
      <a href={href} className="self-start px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ background: "linear-gradient(135deg, #FF0000 0%, #FF5500 50%, #FF8C00 100%)", color: "#fff", ...syne.style, fontWeight: 700 }}>{label}</a>
      {sub && <p className="text-xs font-mono text-gray-700">{sub}</p>}
    </div>
  )
}

type DialogueEntry =
  | { type: "line"; initials: string; name: string; role: string; accent: string; text: string }
  | { type: "beat"; text: string }
  | { type: "you"; text: string; closing: string }

const dialogue: DialogueEntry[] = [
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "The pricing feature is down. All users. Since 14:32." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "Already rolling back." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "How many users affected?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "All of them. 100 percent." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "What if we had only deployed to 1 percent first?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "Then 1 percent would be affected." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "And we would have caught it before it hit everyone." },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "Yes." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "Why did we not do that?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "Because we have never set it up. Every deploy goes to everyone at the same time." },
  { type: "beat", text: "The rollback completed. 47 minutes of downtime." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "47 minutes for 100 percent of users. With canary, it would have been 5 minutes for 1 percent of users." },
  { type: "you", text: "Release patterns are risk management tools. A canary release deploys to a small percentage of users first. If it breaks, you roll back before most users notice. A blue-green release keeps two identical environments — one live, one staging — and switches traffic between them. Both patterns share the same insight: deploy is not a binary event. It is a dial.", closing: "Risk is a dial, not a switch. Turn it slowly." },
]

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3 max-w-2xl">
          <h2 className="text-4xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Week nineteen. Nexus Corp.</h2>
          <p className="text-gray-400 text-base leading-relaxed">The new pricing feature broke for 100% of users. It did not have to.</p>
        </div>
        <div className="flex flex-col">
          {dialogue.map((entry, i) => {
            if (entry.type === "beat") return <div key={i} className="py-6 text-center"><em className="text-sm text-gray-600 italic">{entry.text}</em></div>
            if (entry.type === "you") return (
              <div key={i} className="flex flex-col gap-4 p-6 mt-2" style={{ backgroundColor: "rgba(255,85,0,0.04)", border: "1px solid rgba(255,85,0,0.2)", borderLeftWidth: "3px", borderLeft: "3px solid rgb(255,85,0)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center text-xs font-mono font-bold shrink-0" style={{ backgroundColor: "rgba(255,85,0,0.12)", border: "1px solid rgba(255,85,0,0.4)", color: "rgb(255,85,0)" }}>YOU</div>
                  <div className="flex flex-col gap-0"><span className="text-white text-xs font-mono font-bold">You</span><span className="text-gray-600 text-xs font-mono">New Engineer</span></div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{entry.text}</p>
                <p className="text-white font-bold text-sm border-t pt-3" style={{ borderColor: "rgba(255,85,0,0.2)" }}>{entry.closing}</p>
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
        <CTA href="?phase=2" label="Understand the theory →" sub="Phase 2 of 4 - Deploy to some, then all" />
      </div>
    </div>
  )
}

function Phase2() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-14">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-mono tracking-widest uppercase text-gray-600">LOW RISK RELEASES — Automate and enable low-risk releases</p>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>Deploy to Some, Then All</h2>
        </div>
        {[
          { num: "01", title: "Why all-at-once deploys are risky", body: "When a deployment goes to 100% of users simultaneously, any bug affects 100% of users simultaneously. The blast radius of a bad deploy is maximized. Release patterns reduce the blast radius by staging the rollout — deploy to a small percentage first, validate, then expand." },
          { num: "02", title: "Canary releases", body: "A canary release deploys the new version to a small subset of users (1-10%) while the rest continue to use the old version. Traffic is split — a load balancer or feature flag routes some users to the new version. If metrics remain healthy, the rollout expands. If metrics degrade, the canary is pulled back before most users are affected. The name comes from the mining practice of bringing canaries into coal mines to detect toxic gases before they affected the miners." },
          { num: "03", title: "Blue-green deployments", body: "Blue-green deployments maintain two identical production environments — blue (current) and green (new). Deploying means building and testing the green environment, then switching traffic from blue to green. Rollback is instant — switch traffic back to blue. The old environment stays live until you are confident in the new one. Blue-green requires more infrastructure but provides the fastest possible rollback." },
          { num: "04", title: "The DORA connection", body: "Release patterns directly reduce MTTR — when something goes wrong, the blast radius is limited and rollback is fast. They also enable higher Deployment Frequency because the risk of each deploy is lower. Elite teams deploy more often precisely because each deploy affects fewer users." },
        ].map((s) => (
          <section key={s.num} className="flex flex-col gap-5">
            <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest">{s.num}</span><div className="flex-1 h-px bg-gray-900" /></div>
            <h3 className="text-2xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>{s.title}</h3>
            <p className="text-gray-400 leading-relaxed">{s.body}</p>
          </section>
        ))}
        <CTA href="?phase=3" label="Implement release patterns →" sub="Phase 3 of 4 - Do it yourself" />
      </div>
    </div>
  )
}

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(255,85,0)" }}>Mission Complete - M-19</p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Nexus Corp Controls the Blast Radius</h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">When something goes wrong, it affects 1% of users instead of 100%. Rollback takes seconds instead of 47 minutes. The risk of each deploy drops — which means you deploy more often.</p>
        </div>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span><h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your DORA metrics</h2><div className="flex-1 h-px bg-gray-900" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { code: "MTTR", label: "Mean Time to Restore",  status: "IMPROVING",  note: "blast radius limited to 1% — rollback is a config change, not a crisis" },
              { code: "CFR",  label: "Change Failure Rate",   status: "IMPROVING",  note: "failures caught at 1% scale before they become 100% incidents" },
              { code: "DF",   label: "Deployment Frequency",  status: "IMPROVING",  note: "lower risk per deploy means the team is more willing to deploy often" },
              { code: "LT",   label: "Lead Time for Changes", status: "FOUNDATION", note: "release patterns control blast radius — lead time improvement comes from the pipeline itself" },
            ].map((d) => {
              const improving = d.status === "IMPROVING"
              return (
                <div key={d.code} className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                  <span className="text-xs font-mono px-2 py-0.5 border self-start" style={improving ? { color: "rgb(255,85,0)", borderColor: "rgba(255,85,0,0.3)", backgroundColor: "rgba(255,85,0,0.06)" } : { color: "rgb(107,114,128)", borderColor: "rgb(55,65,81)", backgroundColor: "rgba(75,85,99,0.06)" }}>{d.status}</span>
                  <p className="text-xs font-mono text-gray-600">{d.note}</p>
                </div>
              )
            })}
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span><h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What is next</h2><div className="flex-1 h-px bg-gray-900" /></div>
          <div className="flex flex-col gap-3 p-6 border" style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)", borderLeft: "3px solid rgb(31,41,55)" }}>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">Next: Dark Launches and Feature Flags — the final piece of the First Way</p>
            <p className="text-gray-500 text-sm leading-relaxed">Decouple deployment from release. Ship code dark, enable it with a flag. Every feature can go live for 0% of users and be turned on without a deploy.</p>
          </div>
        </section>
        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a href="/missions/m20" className="px-8 py-4 text-sm font-bold tracking-wide" style={{ backgroundColor: "rgb(31,41,55)", color: "rgb(107,114,128)", ...syne.style, fontWeight: 700, opacity: 0.6, pointerEvents: "none" as const }}>Continue to M-20 →</a>
            <a href="/dashboard" className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ background: "linear-gradient(135deg, #FF0000 0%, #FF5500 50%, #FF8C00 100%)", color: "#fff", ...syne.style, fontWeight: 700 }}>Back to dashboard →</a>
          </div>
          <p className="text-xs font-mono text-gray-700">M-20 unlocks when you complete M-19</p>
        </section>
      </div>
    </div>
  )
}

export default async function M19Page({ searchParams }: { searchParams: Promise<{ phase?: string }> }) {
  const session = await auth()
  if (!session?.user?.email) redirect("/api/auth/signin")
  const { phase: phaseParam } = await searchParams
  const phase = ["1", "2", "3", "4"].includes(phaseParam ?? "") ? Number(phaseParam) : 1
  if (phase === 4) {
    const gateUser = await prisma.user.findUnique({ where: { email: session.user.email! }, select: { id: true } })
    if (!gateUser) redirect("?phase=3")
    await completeMission("M-19")
    const completed = await prisma.userProgress.findFirst({ where: { userId: gateUser.id, moduleId: "M-19" } })
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
