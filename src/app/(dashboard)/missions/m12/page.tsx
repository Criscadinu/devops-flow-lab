import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-12 Integrate Non-Functional Requirements Testing - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(255,85,0)" }}>M-12</span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>Integrate Non-Functional Requirements Testing</span>
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
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "The security audit results are in." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "How bad?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "Three high severity vulnerabilities. One critical." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "In our code?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "In our dependencies. express has a known vulnerability from six months ago. We never updated." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "How did we not catch that?" },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "Nobody checked. There is no automated check. We find out when someone does an audit." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "Which is once a year." },
  { type: "line", initials: "MA", name: "Marco", role: "OPS", accent: "rgb(239,68,68)", text: "The critical one allows remote code execution." },
  { type: "beat", text: "Nobody said anything." },
  { type: "line", initials: "LI", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)", text: "We should probably fix that." },
  { type: "line", initials: "KA", name: "Kai", role: "QA", accent: "rgb(251,146,60)", text: "We should probably also make sure it never gets this far again." },
  { type: "you", text: "Non-functional requirements — security, reliability, compliance, accessibility — are requirements. Not suggestions. Not post-launch concerns. They belong in the pipeline alongside functional tests. A dependency with a known vulnerability should fail the build the same way a failing test does.", closing: "Security is not a feature. It is a requirement. Test it like one." },
]

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3 max-w-2xl">
          <h2 className="text-4xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Week twelve. Nexus Corp.</h2>
          <p className="text-gray-400 text-base leading-relaxed">The security audit found three vulnerabilities. All three were in packages from six months ago.</p>
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
        <CTA href="?phase=2" label="Understand the theory →" sub="Phase 2 of 4 - Non-functional requirements are requirements" />
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
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>Non-Functional Requirements Are Requirements</h2>
        </div>
        {[
          { num: "01", title: "What are non-functional requirements", body: "Non-functional requirements (NFRs) define how a system performs, not what it does. They include: security (no known vulnerabilities, no exposed secrets), reliability (uptime, error rate thresholds), performance (covered in M-11), compliance (GDPR, accessibility standards), and maintainability (code coverage thresholds, complexity limits)." },
          { num: "02", title: "Why NFRs are usually ignored", body: "NFRs are invisible until they fail. A feature that does not work is immediately reported. A feature with a security vulnerability may go unnoticed for months. This asymmetry causes teams to deprioritize NFRs in favor of features. The fix: make NFRs visible by testing them automatically on every commit." },
          { num: "03", title: "Security testing in the pipeline", body: "Three tools every Node.js project should run: npm audit (checks dependencies for known vulnerabilities), git-secrets / trufflehog (scans for accidentally committed secrets), and OWASP dependency-check (comprehensive vulnerability scanning). Run npm audit --audit-level=high in CI. Fail the build on high or critical vulnerabilities." },
          { num: "04", title: "The DORA connection", body: "Teams that integrate NFR testing have lower Change Failure Rate because an entire class of production incidents — security breaches, compliance failures, reliability regressions — is caught before deployment. The pipeline becomes the enforcer of quality standards, not a monthly audit." },
        ].map((s) => (
          <section key={s.num} className="flex flex-col gap-5">
            <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest">{s.num}</span><div className="flex-1 h-px bg-gray-900" /></div>
            <h3 className="text-2xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>{s.title}</h3>
            <p className="text-gray-400 leading-relaxed">{s.body}</p>
          </section>
        ))}
        <CTA href="?phase=3" label="Wire the quality gates →" sub="Phase 3 of 4 - Do it yourself" />
      </div>
    </div>
  )
}

type MetricCard = { metric: string; code: string; badge: "IMPROVING" | "FOUNDATION"; note: string }

const m12Metrics: MetricCard[] = [
  { metric: "Change Failure Rate",   code: "CFR",  badge: "IMPROVING",  note: "security, coverage, and secret hygiene enforced automatically — entire incident classes eliminated" },
  { metric: "Lead Time for Changes", code: "LT",   badge: "FOUNDATION", note: "no direct improvement yet" },
  { metric: "Deployment Frequency",  code: "DF",   badge: "FOUNDATION", note: "no direct improvement yet" },
  { metric: "Mean Time to Restore",  code: "MTTR", badge: "FOUNDATION", note: "no direct improvement yet" },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(255,85,0)" }}>Mission Complete - M-12</p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Nexus Corp Enforces Quality Standards Automatically</h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">The six-month-old vulnerability would have been caught on day one. Security, coverage, and secret hygiene are now enforced on every commit.</p>
        </div>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span><h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your DORA metrics</h2><div className="flex-1 h-px bg-gray-900" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {m12Metrics.map((d) => (
              <div key={d.code} className="flex flex-col gap-4 border p-6" style={{ backgroundColor: d.badge === "IMPROVING" ? "#0a0700" : "#080808", borderColor: d.badge === "IMPROVING" ? "rgba(251,146,60,0.25)" : "rgb(31,41,55)", borderLeft: d.badge === "IMPROVING" ? "3px solid rgb(251,146,60)" : "3px solid rgb(55,65,81)" }}>
                <div className="flex flex-col gap-1"><span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{d.metric}</span><span className="text-xs font-mono text-gray-700">DORA - {d.code}</span></div>
                <div>{d.badge === "IMPROVING" ? <span className="text-xs font-mono px-2 py-0.5 border" style={{ color: "rgb(251,146,60)", borderColor: "rgba(251,146,60,0.4)", backgroundColor: "rgba(251,146,60,0.06)" }}>IMPROVING ↓</span> : <span className="text-xs font-mono px-2 py-0.5 border" style={{ color: "rgb(107,114,128)", borderColor: "rgb(55,65,81)", backgroundColor: "rgba(75,85,99,0.06)" }}>FOUNDATION</span>}</div>
                <p className="text-xs font-mono text-gray-600">{d.note}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4"><span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span><h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What is next</h2><div className="flex-1 h-px bg-gray-900" /></div>
          <div className="flex flex-col gap-3 p-6 border" style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)", borderLeft: "3px solid rgb(31,41,55)" }}>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">Next: Dev and Ops Working Together</p>
            <p className="text-gray-500 text-sm leading-relaxed">Dev ships. Ops fixes. Nobody talks. Break down the wall — shared ownership, shared responsibility.</p>
          </div>
        </section>
        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a href="/missions/m13" className="px-8 py-4 text-sm font-bold tracking-wide" style={{ backgroundColor: "rgb(31,41,55)", color: "rgb(107,114,128)", ...syne.style, fontWeight: 700, opacity: 0.6, pointerEvents: "none" as const }}>Continue to M-13 →</a>
            <a href="/dashboard" className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ background: "linear-gradient(135deg, #FF0000 0%, #FF5500 50%, #FF8C00 100%)", color: "#fff", ...syne.style, fontWeight: 700 }}>Back to dashboard →</a>
          </div>
          <p className="text-xs font-mono text-gray-700">M-13 unlocks when you complete AUTOMATED_TESTING</p>
        </section>
      </div>
    </div>
  )
}

export default async function M12Page({ searchParams }: { searchParams: Promise<{ phase?: string }> }) {
  const session = await auth()
  if (!session?.user?.email) redirect("/api/auth/signin")
  const { phase: phaseParam } = await searchParams
  const phase = ["1", "2", "3", "4"].includes(phaseParam ?? "") ? Number(phaseParam) : 1
  if (phase === 4) {
    const gateUser = await prisma.user.findUnique({ where: { email: session.user.email! }, select: { id: true } })
    if (!gateUser) redirect("?phase=3")
    await completeMission("M-12")
    const completed = await prisma.userProgress.findFirst({ where: { userId: gateUser.id, moduleId: "M-12" } })
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
