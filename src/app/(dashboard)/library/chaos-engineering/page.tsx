import { VideoNotice } from "../_components/VideoNotice"
const serif: React.CSSProperties = { fontFamily: "Georgia, 'Times New Roman', serif" }

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400">{num}</span>
      <h2 className="text-xl text-black tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>{title}</h2>
    </div>
  )
}
function Callout({ children, accent = "#15803d" }: { children: React.ReactNode; accent?: string }) {
  return (
    <div className="px-6 py-4 my-6" style={{ backgroundColor: `${accent}0d`, borderLeft: `3px solid ${accent}` }}>
      <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>{children}</p>
    </div>
  )
}
function RefCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#fafafa" }}>
      <p className="text-xs font-mono font-bold text-[#15803d] mb-1">{title}</p>
      <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{body}</p>
    </div>
  )
}

function ExperimentFlow() {
  const steps = [
    { label: "Define steady state",    desc: "What does normal look like? Define measurable success metrics." },
    { label: "Form hypothesis",        desc: "\"If X fails, the system will still serve N req/s\"" },
    { label: "Minimize blast radius",  desc: "Start in staging. Small % of traffic. Kill switch ready." },
    { label: "Run experiment",         desc: "Inject the failure. Observe." },
    { label: "Analyze",               desc: "Did steady state hold? If not, what broke?" },
    { label: "Improve",               desc: "Fix the weakness. Repeat." },
  ]
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
      {steps.map((s, i) => (
        <div key={s.label} className="p-4 border border-[#e5e5e5]" style={{ backgroundColor: i % 2 === 0 ? "#f0fdf4" : "#ffffff" }}>
          <p className="text-[10px] font-mono font-bold text-[#15803d] mb-1">{String(i + 1).padStart(2, "0")}</p>
          <p className="text-xs font-mono font-bold text-black mb-1">{s.label}</p>
          <p className="text-[10px]" style={{ ...serif, color: "#555" }}>{s.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default function ChaosEngineeringPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#15803d] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">Third Way: Continual Learning</span>
            <span className="mx-2">→</span><span className="text-gray-700">Chaos Engineering</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["CL-02", "PRACTICE", "Third Way: Continual Learning"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Chaos Engineering</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Deliberately inject failure to discover weaknesses before users do. How Netflix's Chaos Monkey became an engineering discipline — and how to practice it safely.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["Chaos Engineering — Rosenthal et al.", "Netflix Tech Blog", "DevOps Handbook"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="What is chaos engineering?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Chaos engineering is the discipline of experimenting on a system in order to build confidence in the system's capability to withstand turbulent conditions in production. In plain terms: you deliberately break things to find out what breaks — before users find out for you.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The key word is <em>discipline</em>. Chaos engineering is not randomly breaking things. It is structured experimentation with defined hypotheses, controlled blast radius, and systematic analysis of results.</p>
            <Callout>Every system will fail. The question is whether it fails in a controlled experiment where you are prepared, or in a production incident where users are affected. Chaos engineering shifts discovery from the second scenario to the first.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="The origin: Netflix Chaos Monkey" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>In 2010, Netflix was migrating to AWS and needed confidence that their systems could handle instance failures. They built Chaos Monkey: a tool that randomly terminates virtual machine instances in production during business hours, forcing the engineering teams to build services that could survive the loss of any individual instance.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>This was counterintuitive: introduce failures deliberately, in production, during business hours. But the reasoning was sound — if failures will happen anyway, better to introduce them when the team is awake and prepared than to discover them at 3am.</p>
            <div className="border border-[#e5e5e5] overflow-hidden">
              {[
                { tool: "Chaos Monkey",       action: "Terminates random VM instances",                    scope: "Instance level" },
                { tool: "Chaos Gorilla",      action: "Simulates failure of an entire AWS availability zone", scope: "Zone level" },
                { tool: "Latency Monkey",     action: "Introduces artificial delays in RESTful client-server communication", scope: "Network level" },
                { tool: "Chaos Kong",         action: "Simulates failure of an entire AWS region",          scope: "Region level" },
              ].map((r, i) => (
                <div key={r.tool} className="grid grid-cols-12 px-4 py-2.5 gap-2" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < 3 ? "1px solid #f0f0f0" : undefined }}>
                  <p className="col-span-3 text-xs font-mono font-bold" style={{ color: "#15803d" }}>{r.tool}</p>
                  <p className="col-span-7 text-xs" style={{ ...serif, color: "#555" }}>{r.action}</p>
                  <p className="col-span-2 text-[10px] font-mono text-gray-400">{r.scope}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-4" style={{ color: "#333" }}>The Simian Army expanded to include tools for security, conformance, latency, and janitor cleanup. Netflix open-sourced much of this tooling, and the discipline became known as chaos engineering.</p>
          </section>

          <section>
            <SectionLabel num="03" title="Principles of chaos engineering" />
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#333" }}>The <em>Principles of Chaos Engineering</em> (principlesofchaos.org) defines five principles:</p>
            <div className="flex flex-col gap-3 mt-4">
              {[
                { principle: "Build a hypothesis around steady state",    desc: "Define what 'normal' looks like with a measurable metric — requests per second, error rate, SLA compliance. The experiment tests whether steady state survives the perturbation." },
                { principle: "Vary real-world events",                    desc: "Inject failures that mirror reality: instance crashes, network partitions, disk full, dependency timeouts. Artificial failures reveal artificial weaknesses." },
                { principle: "Run experiments in production",             desc: "Staging environments do not have the same traffic patterns, scale, or configuration as production. The system you care about is production." },
                { principle: "Automate experiments continuously",         desc: "Manual chaos experiments run once a quarter find a different set of weaknesses than automated experiments running continuously. Automate to find regressions." },
                { principle: "Minimize blast radius",                     desc: "Start small. Limit the percentage of users or traffic affected. Have a kill switch ready. Increase scope as confidence grows." },
              ].map(item => (
                <div key={item.principle} className="flex gap-4 p-4 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: "#15803d" }} />
                  <div>
                    <p className="text-xs font-mono font-bold text-black mb-1">{item.principle}</p>
                    <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="GameDays" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A GameDay is a planned, coordinated chaos exercise where a team deliberately injects failure into their systems — or simulates it via tabletop discussion — to practice incident response. The goal is to build muscle memory before the real incident.</p>
            <ExperimentFlow />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#f0fdf4" }}>
                <p className="text-xs font-mono font-bold text-[#15803d] mb-2">Live GameDay</p>
                <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>Actually inject failures into a staging or production environment. The most realistic — and riskiest. Requires mature observability and practiced runbooks first.</p>
              </div>
              <div className="p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#fafaf8" }}>
                <p className="text-xs font-mono font-bold text-[#0891b2] mb-2">Tabletop exercise</p>
                <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>Walk through a hypothetical incident scenario. "The database is down. What do you do? Who do you call? What is the runbook?" No actual failure required. Good starting point.</p>
              </div>
            </div>
          </section>

          <section>
            <SectionLabel num="05" title="Getting started" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Most teams are not ready to run chaos experiments in production on day one. The path to chaos engineering requires prerequisites:</p>
            <div className="flex flex-col gap-3">
              {[
                { stage: "Prerequisites",   items: ["Observability — you can see what is happening", "Runbooks — you know what to do when things break", "Fast rollback — you can undo changes in minutes", "Blameless culture — experiments are safe to run"], color: "#0891b2" },
                { stage: "Start here",      items: ["Tabletop exercises for common failure scenarios", "Kill switch tests: \"does our feature flag work?\"", "Dependency injection: \"what if the cache is empty?\"", "Staging environment chaos only"], color: "#15803d" },
                { stage: "Mature practice", items: ["Automated chaos in production on small traffic %", "Continuous experiments as part of CI/CD pipeline", "Region-level failure simulations", "Chaos engineering on shared infrastructure"], color: "#7c3aed" },
              ].map(item => (
                <div key={item.stage} className="border border-[#e5e5e5] overflow-hidden">
                  <div className="px-4 py-2" style={{ backgroundColor: `${item.color}10`, borderLeft: `3px solid ${item.color}` }}>
                    <p className="text-xs font-mono font-bold" style={{ color: item.color }}>{item.stage}</p>
                  </div>
                  <div className="px-4 py-3 grid grid-cols-2 gap-x-4 gap-y-1" style={{ backgroundColor: "#ffffff" }}>
                    {item.items.map(i => (
                      <p key={i} className="text-xs flex gap-2" style={{ ...serif, color: "#555" }}><span style={{ color: item.color }} className="shrink-0">·</span>{i}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Chaos Engineering — Rosenthal, Jones et al." body="The book. Principles, case studies, and the tooling landscape. Written by the Netflix engineers who created the discipline." />
              <RefCard title="Principles of Chaos Engineering" body="principlesofchaos.org. The five principles, with commentary. The authoritative definition of the discipline." />
              <RefCard title="Netflix Tech Blog" body="netflixtechblog.com. Original posts on Chaos Monkey, the Simian Army, and the FIT (Fault Injection Testing) platform." />
              <RefCard title="Gremlin — Chaos Engineering Guide" body="gremlin.com/chaos-engineering. Practical guide to getting started. Tool-agnostic, covers blast radius, steady-state definition, and GameDays." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/blameless-postmortems" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Blameless Postmortems</a>
            <a href="/library/psychological-safety" className="text-sm font-mono font-bold hover:underline" style={{ color: "#15803d" }}>Psychological Safety →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
