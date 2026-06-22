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
function Callout({ children, accent = "#0891b2" }: { children: React.ReactNode; accent?: string }) {
  return (
    <div className="px-6 py-4 my-6" style={{ backgroundColor: `${accent}0d`, borderLeft: `3px solid ${accent}` }}>
      <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>{children}</p>
    </div>
  )
}
function RefCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#fafafa" }}>
      <p className="text-xs font-mono font-bold text-[#0891b2] mb-1">{title}</p>
      <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{body}</p>
    </div>
  )
}

function ThreeWaysDiagram() {
  const ways = [
    {
      num: "I",
      title: "Flow",
      subtitle: "Left to right",
      color: "#0891b2",
      bg: "#f0fdfa",
      desc: "Fast, smooth delivery from Dev to Ops to customer. Maximize throughput, minimize WIP.",
      practices: ["CI/CD", "Deployment pipeline", "Small batches", "Trunk-based development"],
    },
    {
      num: "II",
      title: "Feedback",
      subtitle: "Right to left",
      color: "#7c3aed",
      bg: "#faf5ff",
      desc: "Fast, amplified feedback at every stage. Problems surface immediately — not at the end.",
      practices: ["Monitoring", "Telemetry", "Peer review", "Testing in production"],
    },
    {
      num: "III",
      title: "Continual Learning",
      subtitle: "Across the system",
      color: "#b45309",
      bg: "#fffbeb",
      desc: "Turn failures into improvements. Generate organizational knowledge. Experiment and adapt.",
      practices: ["Blameless post-mortems", "Game days", "Learning from incidents", "Improvement kata"],
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-[#e5e5e5] overflow-hidden my-6">
      {ways.map((w, i) => (
        <div key={w.num} className="p-6" style={{ backgroundColor: w.bg, borderRight: i < 2 ? "1px solid #e5e5e5" : undefined }}>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-mono font-bold" style={{ fontFamily: "var(--font-heading)", color: `${w.color}40` }}>{w.num}</span>
            <div>
              <p className="text-sm font-bold" style={{ fontFamily: "var(--font-heading)", color: w.color }}>{w.title}</p>
              <p className="text-[10px] font-mono" style={{ color: w.color }}>{w.subtitle}</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed mb-4" style={{ ...serif, color: "#333" }}>{w.desc}</p>
          <div className="flex flex-col gap-1">
            {w.practices.map(p => (
              <div key={p} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: w.color }} />
                <span className="text-[10px] font-mono" style={{ color: "#555" }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function FlowDiagram() {
  return (
    <div className="my-6 p-6 border border-[#e5e5e5]" style={{ backgroundColor: "#f7f7f5" }}>
      <div className="flex items-center justify-between gap-2">
        {["Business", "Dev", "Ops", "Customer"].map((node, i, arr) => (
          <div key={node} className="flex items-center gap-2 flex-1">
            <div className="flex-1 flex flex-col items-center">
              <div className="px-3 py-2 border text-center w-full" style={{ backgroundColor: "#fff", borderColor: "#0891b2" }}>
                <p className="text-xs font-mono font-bold text-[#0891b2]">{node}</p>
              </div>
            </div>
            {i < arr.length - 1 && (
              <div className="flex items-center shrink-0">
                <div className="w-4 h-px" style={{ backgroundColor: "#0891b2" }} />
                <div style={{ width: 0, height: 0, borderTop: "3px solid transparent", borderBottom: "3px solid transparent", borderLeft: "4px solid #0891b2" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 px-2">
        {["Business", "Dev", "Ops", "Customer"].map((node, i, arr) => (
          <div key={node} className="flex items-center gap-2 flex-1">
            <div className="flex-1" />
            {i < arr.length - 1 && (
              <div className="flex items-center shrink-0">
                <div style={{ width: 0, height: 0, borderTop: "3px solid transparent", borderBottom: "3px solid transparent", borderRight: "4px solid #7c3aed" }} />
                <div className="w-4 h-px" style={{ backgroundColor: "#7c3aed" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] font-mono">
        <span style={{ color: "#0891b2" }}>← First Way: Flow (left to right)</span>
        <span style={{ color: "#7c3aed" }}>Second Way: Feedback (right to left) →</span>
      </div>
    </div>
  )
}

export default function TheThreeWaysPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">Foundations</span>
            <span className="mx-2">→</span><span className="text-gray-700">The Three Ways</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["F-01", "FOUNDATION"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#faf5ff", color: "#7c3aed", border: "1px solid #e9d5ff" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>The Three Ways</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Gene Kim's framework for DevOps thinking. The principles that underpin every tool and practice in this library.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["The DevOps Handbook — Kim, Humble, Willis, Debois", "The Phoenix Project — Kim, Behr, Spafford"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="The origin" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Gene Kim introduced the Three Ways in <em>The Phoenix Project</em> (2013) through the character of Erik Reid — a mysterious mentor who teaches the protagonist a framework for thinking about IT operations as a manufacturing and flow problem. The DevOps Handbook (2016) expanded this into a full treatment of principles and practices.</p>
            <p className="text-sm leading-relaxed" style={{ color: "#333" }}>The Three Ways are not a methodology or a certification. They are a way of thinking — a lens for diagnosing why software delivery is slow or unreliable, and a vocabulary for describing what good looks like.</p>
            <ThreeWaysDiagram />
          </section>

          <section>
            <SectionLabel num="02" title="First Way: Flow" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The First Way is about maximizing the flow of work from left to right — from business need, through development, through operations, to the customer. It draws directly from lean manufacturing: identify the value stream, eliminate waste, reduce batch sizes, prevent defects from passing downstream.</p>
            <FlowDiagram />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Make work visible",       desc: "You cannot improve what you cannot see. Kanban boards, pipeline dashboards, and deployment metrics all make flow visible." },
                { title: "Limit WIP",               desc: "Work in progress is inventory. Inventory is waste. Limiting WIP forces focus and exposes bottlenecks." },
                { title: "Reduce batch sizes",      desc: "Small changes deploy faster, fail less catastrophically, and are easier to debug. Trunk-based development and CI enforce this." },
                { title: "Eliminate waste",         desc: "Rework, waiting, context switching, unnecessary approvals — every form of waste lengthens the value stream without adding value." },
              ].map(item => (
                <div key={item.title} className="p-4 border border-[#e5e5e5]" style={{ backgroundColor: "#f0fdfa" }}>
                  <p className="text-xs font-mono font-bold text-[#0891b2] mb-1">{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="Second Way: Feedback" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The Second Way is about creating fast feedback loops from right to left — from production back to development, from testing back to coding, from operations back to architecture. Every problem should be caught as close to its source as possible and as quickly as possible.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>In complex systems, feedback is what enables safety. Without fast feedback, problems accumulate silently until they cause catastrophic failure. The Second Way is why monitoring, alerting, automated testing, and code review all matter.</p>
            <div className="flex flex-col gap-3">
              {[
                { stage: "At commit time",       example: "Pre-commit hooks catch lint errors and failing unit tests before the code leaves the developer's machine.", color: "#0891b2" },
                { stage: "In CI",                example: "The build runs the full test suite. A broken build notifies the team within minutes of the offending commit.", color: "#16a34a" },
                { stage: "In staging",           example: "Integration tests and acceptance tests run against a production-like environment. Problems surface before users see them.", color: "#b45309" },
                { stage: "In production",        example: "Metrics, logs, and alerts detect anomalies within minutes of deployment. On-call knows before users complain.", color: "#7c3aed" },
              ].map(item => (
                <div key={item.stage} className="grid grid-cols-12 gap-4 p-4 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <div className="col-span-3">
                    <p className="text-xs font-mono font-bold" style={{ color: item.color }}>{item.stage}</p>
                  </div>
                  <div className="col-span-9">
                    <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{item.example}</p>
                  </div>
                </div>
              ))}
            </div>
            <Callout accent="#7c3aed">The goal of the Second Way is to make feedback so fast and so complete that every developer knows within minutes whether their change improved or degraded the system. Slow feedback is no feedback.</Callout>
          </section>

          <section>
            <SectionLabel num="04" title="Third Way: Continual Learning and Experimentation" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The Third Way is about creating a culture of continual learning — turning failures into improvements, converting local discoveries into global knowledge, and creating time for the team to improve the system it works in.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>This is the most organizationally difficult of the Three Ways, because it requires psychological safety and a willingness to treat failures as learning opportunities rather than occasions for blame.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Blameless post-mortems", desc: "When things go wrong, the goal is to understand the system — not to find a scapegoat. What was the failure mode? What assumption was wrong? How does the system change?", color: "#b45309", bg: "#fffbeb" },
                { title: "Game days",              desc: "Deliberately inject failure to practice recovery. Teams that have practiced failure are not surprised by it. Chaos engineering is the most mature expression of this.", color: "#0891b2", bg: "#f0fdfa" },
                { title: "Improvement kata",       desc: "Reserve time each sprint for improvement work — not features, not bugs, but making the system better. Without deliberate allocation, improvement never happens.", color: "#16a34a", bg: "#f0fdf4" },
              ].map(item => (
                <div key={item.title} className="p-5 border" style={{ backgroundColor: item.bg, borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1.5" style={{ color: item.color }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="05" title="The Three Ways in the Nexus Corp missions" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Every Nexus Corp mission maps to one or more of the Three Ways. The progression is not accidental — you build flow first, then feedback, then the organizational conditions for learning.</p>
            <div className="border border-[#e5e5e5] overflow-hidden">
              {[
                { mission: "M-01", title: "Value Stream Mapping",     way: "First Way",  color: "#0891b2", desc: "Identify and measure the waste in the current delivery process." },
                { mission: "M-02", title: "Containerization",         way: "First Way",  color: "#0891b2", desc: "Eliminate environment drift — a source of waste and rework." },
                { mission: "M-03", title: "CI Pipeline",              way: "First + Second",  color: "#7c3aed", desc: "Automate flow and create fast feedback from tests." },
                { mission: "M-04", title: "Continuous Deployment",    way: "First Way",  color: "#0891b2", desc: "Extend flow all the way to production automatically." },
              ].map((r, i) => (
                <div key={r.mission} className="grid grid-cols-12 px-4 py-3 gap-4 items-start" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < 3 ? "1px solid #f0f0f0" : "none" }}>
                  <span className="col-span-1 text-xs font-mono font-bold text-[#0891b2]">{r.mission}</span>
                  <span className="col-span-3 text-xs font-mono text-gray-700">{r.title}</span>
                  <span className="col-span-3 text-xs font-mono font-bold" style={{ color: r.color }}>{r.way}</span>
                  <span className="col-span-5 text-xs" style={{ ...serif, color: "#555" }}>{r.desc}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="The DevOps Handbook — Kim, Humble, Willis, Debois" body="Part I: The Three Ways. The definitive treatment of the framework, with extensive examples and research backing." />
              <RefCard title="The Phoenix Project" body="The novel that introduced the Three Ways. Bill's journey from firefighting to flow is the Three Ways as narrative." />
              <RefCard title="Accelerate — Forsgren, Humble, Kim" body="The DORA research. The Three Ways as measurable predictors of organizational performance." />
              <RefCard title="The Unicorn Project" body="The sequel to The Phoenix Project. Introduces the Five Ideals — a complementary framework focused on developer experience." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/continuous-deployment" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Continuous Deployment</a>
            <a href="/library/dora-metrics" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>DORA Metrics →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
