import { Syne } from "next/font/google"
import { VideoNotice } from "../_components/VideoNotice"
const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })
const serif: React.CSSProperties = { fontFamily: "Georgia, 'Times New Roman', serif" }

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400">{num}</span>
      <h2 className="text-xl text-black tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>{title}</h2>
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

function TransformationJourney() {
  const stages = [
    { stage: "Low Performer",   df: "1×/6 months",  lt: "Months",  cfr: "> 46%", focus: "Stabilize: version control, basic CI, on-call rotation", color: "#dc2626", bg: "#fff5f5" },
    { stage: "Medium Performer",df: "1×/month",      lt: "Weeks",   cfr: "16–30%", focus: "Automate: full pipeline, environment parity, automated testing", color: "#f59e0b", bg: "#fffbeb" },
    { stage: "High Performer",  df: "1×/week",       lt: "Days",    cfr: "< 15%", focus: "Accelerate: trunk-based dev, feature flags, observability", color: "#0891b2", bg: "#f0fdfa" },
    { stage: "Elite Performer", df: "On demand",     lt: "< 1 hour",cfr: "< 5%",  focus: "Optimize: continuous deployment, chaos engineering, learning culture", color: "#15803d", bg: "#f0fdf4" },
  ]
  return (
    <div className="flex flex-col gap-0 border border-[#e5e5e5] overflow-hidden my-4">
      {stages.map((s, i) => (
        <div key={s.stage} className="grid grid-cols-12 gap-2 px-4 py-3" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < 3 ? "1px solid #f0f0f0" : undefined }}>
          <div className="col-span-3 flex items-center">
            <span className="text-xs font-mono font-bold" style={{ color: s.color }}>{s.stage}</span>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] font-mono text-gray-400 mb-0.5">Deploy freq</p>
            <p className="text-xs font-mono" style={{ color: s.color }}>{s.df}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] font-mono text-gray-400 mb-0.5">Lead time</p>
            <p className="text-xs font-mono" style={{ color: s.color }}>{s.lt}</p>
          </div>
          <div className="col-span-1">
            <p className="text-[10px] font-mono text-gray-400 mb-0.5">CFR</p>
            <p className="text-xs font-mono" style={{ color: s.color }}>{s.cfr}</p>
          </div>
          <div className="col-span-4">
            <p className="text-[10px] font-mono text-gray-400 mb-0.5">Focus</p>
            <p className="text-xs" style={{ ...serif, color: "#555" }}>{s.focus}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function DevOpsTransformationPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#15803d] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">Third Way: Continual Learning</span>
            <span className="mx-2">→</span><span className="text-gray-700">DevOps Transformation</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["CL-05", "CONCEPT", "Third Way: Continual Learning"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>DevOps Transformation</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>DevOps is not a tool or a role — it is a change in how organizations work. What transformation actually means, how it fails, and why it is never finished.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DORA Research", "Accelerate", "DevOps Handbook"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="What is a DevOps transformation?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A DevOps transformation is not a tool adoption, a reorg, or a certification. It is a sustained change in how an organization delivers software — from slow, manual, high-risk releases to fast, automated, low-risk deployments. It requires changes in technology, processes, and culture simultaneously.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The word "transformation" implies a journey from one stable state to another. In practice, DevOps transformation is continuous — there is no end state. Each improvement creates new capacity and reveals new bottlenecks.</p>
            <Callout>DevOps is not a destination. Organizations that treat it as a project to complete — "we've done DevOps" — stop improving. The ones that treat it as a capability to continuously develop keep getting faster and more reliable.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="The transformation journey" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>DORA classifies organizations into four performance tiers based on their DORA metrics. The path from low to elite is not a single leap — it is a progression through measurable stages, with different improvement levers at each stage.</p>
            <TransformationJourney />
            <p className="text-sm leading-relaxed mt-3" style={{ color: "#333" }}>The Nexus Corp missions map to this journey: M-01 (understand the current state), M-02 (environment parity), M-03 (CI pipeline), M-04 (continuous deployment). Each mission moves the metrics.</p>
          </section>

          <section>
            <SectionLabel num="03" title="Common failure patterns" />
            <div className="flex flex-col gap-4">
              {[
                { pattern: "Tool-first thinking",         desc: "Buying a tool and calling it DevOps. The tool is not the transformation. Kubernetes does not create a DevOps culture. A CI/CD platform does not fix broken team structures. Tools enable transformation; they do not cause it." },
                { pattern: "No executive support",        desc: "Transformation requires changes to funding priorities, team structures, and incentive systems. Individual teams cannot make these changes. Without executive sponsorship, the transformation stalls at team level and never scales." },
                { pattern: "Skipping culture",            desc: "Investing in automation while ignoring psychological safety, blame culture, and siloed ownership. You can automate a broken process and produce broken software faster. Culture is not soft — it is a prerequisite." },
                { pattern: "Big-bang transformation",     desc: "Attempting to transform the entire organization simultaneously. This creates massive coordination overhead and usually fails. The pattern that works: start with one team, demonstrate results, expand incrementally." },
                { pattern: "Measuring outputs not outcomes", desc: "Counting deploys rather than measuring lead time. Tracking sprint velocity rather than DORA metrics. Optimizing for the proxy measure rather than the underlying capability." },
              ].map(item => (
                <div key={item.pattern} className="flex gap-4 p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: "#dc2626" }} />
                  <div>
                    <p className="text-sm font-bold text-black mb-1" style={{ ...syne.style }}>{item.pattern}</p>
                    <p className="text-sm leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="The role of measurement" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The DORA metrics are not just a report card — they are a navigation system. Used correctly, they tell you where you are, where your constraint is, and whether your improvements are working.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Baseline before you start",    color: "#15803d", bg: "#f0fdf4", desc: "Measure your current DORA metrics before beginning improvement work. Without a baseline, you cannot demonstrate progress or identify your biggest lever." },
                { title: "Pick one constraint to attack", color: "#0891b2", bg: "#f0fdfa", desc: "Theory of Constraints: fix the bottleneck, not everywhere at once. If your lead time is high, your constraint is your pipeline — not your culture. Yet." },
                { title: "Measure continuously",         color: "#b45309", bg: "#fffbeb", desc: "Quarterly reviews hide regressions. Build DORA dashboards that update in real time. Make performance visible to the whole team." },
                { title: "Avoid Goodhart's Law",         color: "#7c3aed", bg: "#faf5ff", desc: "When a measure becomes a target, it ceases to be a good measure. Teams that game their DF by deploying trivial changes have improved nothing. Measure the system, not the score." },
              ].map(item => (
                <div key={item.title} className="p-5 border" style={{ backgroundColor: item.bg, borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1.5" style={{ color: item.color }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="05" title="Sustaining the transformation" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The hardest part of DevOps transformation is not starting — it is sustaining improvement after the initial enthusiasm fades. Organizations that sustain transformation share common properties:</p>
            <div className="flex flex-col gap-3">
              {[
                { property: "Dedicated improvement time",   desc: "Engineering capacity is explicitly reserved for improvement work — not just feature delivery. Google's 20% time, Netflix's chaos engineering team, Etsy's infrastructure investment. Without explicit allocation, improvement loses to feature pressure every time." },
                { property: "Visible metrics",              desc: "DORA metrics are displayed in team spaces, discussed in all-hands, and reviewed in retrospectives. What gets measured gets managed. What is hidden gets neglected." },
                { property: "Leadership participation",     desc: "Senior leaders participate in postmortems, use the deployment pipeline, and treat production incidents as learning opportunities rather than crises. Leaders model the behavior they want." },
                { property: "Continuous capability building", desc: "Regular training, communities of practice, internal tech talks, and time to experiment. Organizations that stop learning stop improving. Capability decays without investment." },
              ].map(item => (
                <div key={item.property} className="flex gap-4 p-4 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: "#15803d" }} />
                  <div>
                    <p className="text-xs font-mono font-bold text-black mb-1">{item.property}</p>
                    <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Callout>The organizations that sustain elite performance year over year treat DevOps not as a project that was completed, but as a competitive capability that requires continuous investment — just like the product itself.</Callout>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Accelerate — Forsgren, Humble, Kim" body="The DORA research in full. The performance tiers, the capabilities that predict them, and the organizational factors that enable or inhibit improvement." />
              <RefCard title="DORA State of DevOps 2023" body="The most recent annual report. Current benchmarks, emerging capabilities, and the latest research on what drives transformation." />
              <RefCard title="DevOps Handbook — Introduction" body="The case for DevOps transformation. The research backing, the cost of not transforming, and the Three Ways as the organizing framework." />
              <RefCard title="The Phoenix Project" body="The narrative that started the movement. Bill's transformation of a failing IT department into an elite delivery organization — in novel form." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <a href="/library/learning-culture" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Learning Culture</a>
        </div>
      </div>
    </main>
  )
}
