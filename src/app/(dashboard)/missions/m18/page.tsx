import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-18 Integrate Code Deployments into the Pipeline - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>M-18</span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>Integrate Code Deployments into the Pipeline</span>
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
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "Pipeline is green." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "Great. Deployed?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "Not yet. I need to SSH in, pull the latest, restart the service." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "Can the pipeline do that?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "In theory. I never set it up." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "How long has it been like this?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "Since we added the pipeline. Six months." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "So for six months the pipeline has been telling us the code is good, and then we manually deploy it anyway." },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "When I am available, yes." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "And when you are not?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "It waits." },
  { type: "beat", text: "The last commit was three hours ago. Still not deployed." },
  { type: "you", text: "A pipeline that tests but does not deploy is half a pipeline. The point of continuous integration is continuous delivery — every commit that passes tests should be deployable. Automating the last step completes the loop: commit, test, deploy. No human in the middle.", closing: "The pipeline should deploy. Not a person. Not a script. The pipeline." },
]

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3 max-w-2xl">
          <h2 className="text-4xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Week eighteen. Nexus Corp.</h2>
          <p className="text-gray-400 text-base leading-relaxed">The pipeline goes green. Then Marco deploys manually from his laptop. Sometimes.</p>
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
        <CTA href="?phase=2" label="Understand the theory →" sub="Phase 2 of 4 - Complete the loop — test and deploy" />
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
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>Complete the Loop — Test and Deploy</h2>
        </div>
        {[
          { num: "01", title: "The gap between CI and CD", body: "Many teams have continuous integration (every commit is tested) but not continuous delivery (every commit is deployable). The gap between green tests and actual deployment is filled by a manual step — someone SSHing into a server, running a script, or clicking a button. This gap introduces delay, inconsistency, and the risk of human error." },
          { num: "02", title: "What continuous delivery means", body: "Continuous delivery means that every commit that passes the test suite is in a deployable state. It does not mean every commit is deployed to production automatically — that is continuous deployment. It means the deployment is automated and can be triggered at any time without manual preparation." },
          { num: "03", title: "Deployment strategies", body: "Three approaches in increasing automation: manual trigger (pipeline deploys when an engineer clicks a button — M-17), continuous delivery (pipeline deploys to staging automatically, production on approval), and continuous deployment (pipeline deploys to production automatically on every green commit). Start with continuous delivery — automatic to staging, manual approval for production. Add continuous deployment once you trust the test suite." },
          { num: "04", title: "The DORA connection", body: "Integrating deployment into the pipeline is the direct driver of Lead Time for Changes. The time between 'code committed' and 'code in production' is the lead time. Removing the manual deployment step removes the largest single delay in that chain." },
        ].map((s) => (
          <section key={s.num} className="flex flex-col gap-5">
            <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest">{s.num}</span><div className="flex-1 h-px bg-gray-900" /></div>
            <h3 className="text-2xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>{s.title}</h3>
            <p className="text-gray-400 leading-relaxed">{s.body}</p>
          </section>
        ))}
        <CTA href="?phase=3" label="Complete the deployment loop →" sub="Phase 3 of 4 - Do it yourself" />
      </div>
    </div>
  )
}

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(6,182,212)" }}>Mission Complete - M-18</p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>The Pipeline Deploys. Not Marco.</h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">Lead time drops because the manual deployment step is gone. Every commit that passes tests is deployable within minutes, not days.</p>
        </div>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span><h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your DORA metrics</h2><div className="flex-1 h-px bg-gray-900" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { code: "LT",   label: "Lead Time for Changes", status: "IMPROVING",  note: "the manual deployment step is removed — commit to production is now minutes, not days" },
              { code: "DF",   label: "Deployment Frequency",  status: "IMPROVING",  note: "automatic staging deploys mean the team can ship whenever they choose" },
              { code: "CFR",  label: "Change Failure Rate",   status: "IMPROVING",  note: "health checks verify every deployment — failed deploys are caught immediately, not by users" },
              { code: "MTTR", label: "Mean Time to Restore",  status: "FOUNDATION", note: "deployment traceability makes diagnosis faster — every deploy is recorded with commit and deployer" },
            ].map((d) => {
              const improving = d.status === "IMPROVING"
              return (
                <div key={d.code} className="flex flex-col gap-2">
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                  <span className="text-xs font-mono px-2 py-0.5 border self-start" style={improving ? { color: "rgb(6,182,212)", borderColor: "rgba(6,182,212,0.3)", backgroundColor: "rgba(6,182,212,0.06)" } : { color: "rgb(107,114,128)", borderColor: "rgb(55,65,81)", backgroundColor: "rgba(75,85,99,0.06)" }}>{d.status}</span>
                  <p className="text-xs font-mono text-gray-600">{d.note}</p>
                </div>
              )
            })}
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span><h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What is next</h2><div className="flex-1 h-px bg-gray-900" /></div>
          <div className="flex flex-col gap-3 p-6 border" style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)", borderLeft: "3px solid rgb(31,41,55)" }}>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">Next: Release Patterns — Canary and Blue-Green</p>
            <p className="text-gray-500 text-sm leading-relaxed">The pipeline deploys to all users simultaneously. A bug affects 100% of users. Canary and blue-green patterns give you a dial — deploy to 1% first, validate, then expand.</p>
          </div>
        </section>
        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a href="/missions/m19" className="px-8 py-4 text-sm font-bold tracking-wide" style={{ backgroundColor: "rgb(31,41,55)", color: "rgb(107,114,128)", ...syne.style, fontWeight: 700, opacity: 0.6, pointerEvents: "none" as const }}>Continue to M-19 →</a>
            <a href="/dashboard" className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}>Back to dashboard →</a>
          </div>
          <p className="text-xs font-mono text-gray-700">M-19 unlocks when you complete M-18</p>
        </section>
      </div>
    </div>
  )
}

export default async function M18Page({ searchParams }: { searchParams: Promise<{ phase?: string }> }) {
  const session = await auth()
  if (!session?.user?.email) redirect("/api/auth/signin")
  const { phase: phaseParam } = await searchParams
  const phase = ["1", "2", "3", "4"].includes(phaseParam ?? "") ? Number(phaseParam) : 1
  if (phase === 4) {
    const gateUser = await prisma.user.findUnique({ where: { email: session.user.email! }, select: { id: true } })
    if (!gateUser) redirect("?phase=3")
    await completeMission("M-18")
    const completed = await prisma.userProgress.findFirst({ where: { userId: gateUser.id, moduleId: "M-18" } })
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
