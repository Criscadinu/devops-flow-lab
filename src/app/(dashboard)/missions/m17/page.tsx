import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-17 Enable Automated Self-Service Deployments - DevOps Flow Lab",
}


function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "var(--bg-card)" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "var(--af-orange)" }}>M-17</span>
        <span className="text-sm font-bold tracking-tight text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>Enable Automated Self-Service Deployments</span>
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
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "Is the discount feature live yet?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "Not yet. I have been dealing with the ACC environment all week." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "The feature has been ready since Tuesday." },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "I know. I will get to it." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "Can I deploy it myself?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "No. Only I have access to the production server." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "Why?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "Because last time someone else deployed, they took down the site for four hours." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "That was two years ago." },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "And it has not happened since." },
  { type: "beat", text: "Lisa looked at the feature. It had been sitting in a branch for three days." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "So the pipeline is a person." },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "I prefer to think of it as a safeguard." },
  { type: "you", text: "When deploying requires a specific person, that person is the bottleneck. Self-service deployments mean any engineer can deploy safely — because the safety is built into the process, not the person. The pipeline runs the tests. The pipeline does the deploy. The engineer triggers it. Marco becomes available for work that actually requires his expertise.", closing: "Safe deployments should not depend on who is available." },
]

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3 max-w-2xl">
          <h2 className="text-4xl text-gray-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Week seventeen. Nexus Corp.</h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>Lisa finished the feature on Tuesday. It is Friday. Marco has not deployed it yet.</p>
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
        <CTA href="?phase=2" label="Understand the theory →" sub="Phase 2 of 4 - Self-service is not chaos — it is discipline built into the platform" />
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
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Deploy Without Asking Permission</h2>
        </div>
        {[
          { num: "01", title: "The deployment bottleneck", body: "When deployment requires a specific person, the deployment frequency of the entire team is capped by that person's availability. A feature that is ready on Tuesday ships on Friday — or Monday, or next week. The code is done. The delay is organizational. Self-service deployments remove the organizational bottleneck by making the process safe enough that anyone can execute it." },
          { num: "02", title: "What makes a deployment safe to self-serve", body: "A self-service deployment is safe when: the pipeline runs all tests before deploying, the deployment is automated and repeatable with no manual steps, rollback is fast and also automated, the deployment is observable so you can see what happened and when, and access control is in place — anyone can deploy, but the audit trail shows who did." },
          { num: "03", title: "GitHub Actions as a self-service deployment platform", body: "GitHub Actions supports manual triggers via workflow_dispatch. Any engineer with repo access can trigger a deployment from the Actions tab without needing server access. The workflow handles the rest — tests, build, deploy, verification." },
          { num: "04", title: "The DORA connection", body: "Self-service deployments directly increase Deployment Frequency. When deploying is easy and safe, teams deploy more often. Smaller, more frequent deploys are easier to test and easier to roll back — which reduces CFR. The causal chain: self-service → more frequent deploys → smaller batches → lower risk." },
        ].map((s) => (
          <section key={s.num} className="flex flex-col gap-5">
            <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest">{s.num}</span><div className="flex-1 h-px bg-gray-900" /></div>
            <h3 className="text-2xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>{s.title}</h3>
            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.body}</p>
          </section>
        ))}
        <CTA href="?phase=3" label="Build self-service deployments →" sub="Phase 3 of 4 - Do it yourself" />
      </div>
    </div>
  )
}

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "var(--af-orange)" }}>Mission Complete - M-17</p>
          <h1 className="text-5xl text-gray-900 tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Anyone on the Team Can Deploy</h1>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "var(--text-muted)" }}>Deployment frequency increases when deploying is easy. When any engineer can deploy safely, the team stops batching work to justify the cost of a deployment.</p>
        </div>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span><h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your DORA metrics</h2><div className="flex-1 h-px bg-gray-900" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { code: "DF",   label: "Deployment Frequency",  status: "IMPROVING",  note: "any engineer can trigger a deploy — frequency is no longer capped by Marco's availability" },
              { code: "LT",   label: "Lead Time for Changes", status: "IMPROVING",  note: "feature ready Tuesday deploys Tuesday — not Friday when Marco finds time" },
              { code: "CFR",  label: "Change Failure Rate",   status: "FOUNDATION", note: "the pipeline enforces safety — tests gate every deploy regardless of who triggered it" },
              { code: "MTTR", label: "Mean Time to Restore",  status: "FOUNDATION", note: "audit trail shows exactly who deployed what and when — faster diagnosis" },
            ].map((d) => {
              const improving = d.status === "IMPROVING"
              return (
                <div key={d.code} className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                  <span className="text-xs font-mono px-2 py-0.5 border self-start" style={improving ? { color: "var(--af-orange)", borderColor: "rgba(255,85,0,0.3)", backgroundColor: "rgba(255,85,0,0.06)" } : { color: "var(--text-muted)", borderColor: "rgb(55,65,81)", backgroundColor: "rgba(75,85,99,0.06)" }}>{d.status}</span>
                  <p className="text-xs font-mono text-gray-600">{d.note}</p>
                </div>
              )
            })}
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span><h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What is next</h2><div className="flex-1 h-px bg-gray-900" /></div>
          <div className="flex flex-col gap-3 p-6 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)", borderLeft: "3px solid rgb(31,41,55)" }}>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">Next: Integrate Code Deployments into the Pipeline</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>The pipeline goes green. Then Marco deploys manually from his laptop. Sometimes. Complete the loop — every commit that passes tests should deploy automatically.</p>
          </div>
        </section>
        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a href="/missions/m18" className="px-8 py-4 text-sm font-bold tracking-wide" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-muted)", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", opacity: 0.6, pointerEvents: "none" as const }}>Continue to M-18 →</a>
            <a href="/dashboard" className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}>Back to dashboard →</a>
          </div>
          <p className="text-xs font-mono text-gray-700">M-18 unlocks when you complete M-17</p>
        </section>
      </div>
    </div>
  )
}

export default async function M17Page({ searchParams }: { searchParams: Promise<{ phase?: string }> }) {
  const session = await auth()
  if (!session?.user?.email) redirect("/api/auth/signin")
  const { phase: phaseParam } = await searchParams
  const phase = ["1", "2", "3", "4"].includes(phaseParam ?? "") ? Number(phaseParam) : 1
  if (phase === 4) {
    const gateUser = await prisma.user.findUnique({ where: { email: session.user.email! }, select: { id: true } })
    if (!gateUser) redirect("?phase=3")
    await completeMission("M-17")
    const completed = await prisma.userProgress.findFirst({ where: { userId: gateUser.id, moduleId: "M-17" } })
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
