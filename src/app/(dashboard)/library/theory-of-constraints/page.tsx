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

// ─── Pipeline diagram showing bottleneck ──────────────────────────────────────

function BottleneckDiagram() {
  const stages = [
    { label: "Dev",    rate: "10/day", wide: false },
    { label: "Review", rate: "2/day",  wide: true  },
    { label: "QA",     rate: "8/day",  wide: false },
    { label: "Deploy", rate: "6/day",  wide: false },
  ]
  return (
    <div className="my-6 p-6 border border-[#e5e5e5] overflow-x-auto" style={{ backgroundColor: "#f7f7f5" }}>
      <p className="text-xs font-mono text-gray-400 mb-4">System throughput = 2/day (constrained by Review)</p>
      <div className="flex items-center min-w-max gap-2">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <div
              className="flex flex-col items-center justify-center px-4 py-3 border-2 text-center"
              style={{
                minWidth: s.wide ? "100px" : "72px",
                minHeight: s.wide ? "80px" : "56px",
                backgroundColor: s.wide ? "#fff5f5" : "#ffffff",
                borderColor: s.wide ? "#dc2626" : "#e5e5e5",
                borderWidth: s.wide ? "2px" : "1px",
              }}
            >
              <span className="text-xs font-mono font-bold" style={{ color: s.wide ? "#dc2626" : "#333" }}>{s.label}</span>
              <span className="text-[10px] font-mono mt-1" style={{ color: s.wide ? "#dc2626" : "#888" }}>{s.rate}</span>
              {s.wide && <span className="text-[9px] font-mono mt-0.5 text-red-400">BOTTLENECK</span>}
            </div>
            {i < stages.length - 1 && (
              <div className="flex items-center">
                <div className="w-5 h-px bg-gray-300" />
                <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "5px solid #d1d5db" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs font-mono text-gray-400 mt-4">
        Making Dev faster (20/day) does not help. Review still processes 2/day. Work piles up before Review.
      </p>
    </div>
  )
}

// ─── Five focusing steps ──────────────────────────────────────────────────────

const fiveSteps = [
  { n: "1", title: "Identify",   desc: "Find the constraint. What single step determines the maximum throughput of the entire system? In most software teams it is code review, QA, or deployment approvals." },
  { n: "2", title: "Exploit",    desc: "Get the most out of the constraint without spending money or adding resources. If code review is the bottleneck, reviewers should never be idle. Review is the first priority, not a background task." },
  { n: "3", title: "Subordinate", desc: "Align everything else to the constraint. Do not let other stages run faster than the bottleneck can absorb. Excess WIP upstream of the bottleneck is pure waste." },
  { n: "4", title: "Elevate",    desc: "If exploiting the constraint is not enough, invest in it. Add more reviewers, automate checks, reduce review scope, pair on reviews." },
  { n: "5", title: "Repeat",     desc: "Once the constraint is resolved, it will move. A new constraint will appear. Return to step 1. Continuous improvement is the goal, not a fixed endpoint." },
]

export default function TheoryOfConstraintsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>

      {/* Breadcrumb */}
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span>
            <span className="text-gray-500">First Way: Flow</span>
            <span className="mx-2">→</span>
            <span className="text-gray-500">Concepts</span>
            <span className="mx-2">→</span>
            <span className="text-gray-700">Theory of Constraints</span>
          </p>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FC-04", "CONCEPT", "First Way: Flow"].map((tag) => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Theory of Constraints
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            Every system has one bottleneck that limits its throughput. Goldratt's TOC applied to software delivery — and why local optimization never improves the whole.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["The Goal — Goldratt", "The Phoenix Project", "DevOps Handbook"].map((s) => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

            <VideoNotice />

      {/* Content */}
      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          {/* Section 01 */}
          <section>
            <SectionLabel num="01" title="The core insight" />
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                In 1984, Eliyahu Goldratt published <em>The Goal</em>, a novel about a factory manager trying to
                save his plant. His central insight: every system — factory, hospital, software team — has exactly
                one constraint that limits its output. Improving anything other than the constraint does not improve
                the system's output. It only creates more inventory piled up in front of the bottleneck.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                Gene Kim, Kevin Behr, and George Spafford adapted this for IT in <em>The Phoenix Project</em> (2013).
                The factory manager's insights map almost exactly to software delivery pipelines.
              </p>
            </div>
            <BottleneckDiagram />
            <Callout>
              The throughput of any system is determined entirely by its constraint. A chain is only as strong as
              its weakest link. In software delivery, the constraint is almost always not coding — it is review,
              testing, or deployment.
            </Callout>
          </section>

          {/* Section 02 */}
          <section>
            <SectionLabel num="02" title="The five focusing steps" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#333" }}>
              Goldratt's method for continuously improving a constrained system is called the Five Focusing Steps.
              Unlike a one-time fix, it is a continuous loop.
            </p>
            <div className="flex flex-col gap-4">
              {fiveSteps.map((s) => (
                <div key={s.n} className="flex gap-5 p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <span className="text-3xl font-mono font-bold shrink-0 leading-none" style={{ ...syne.style, color: "#f0f0f0" }}>{s.n}</span>
                  <div>
                    <p className="text-sm font-bold text-black mb-1" style={{ ...syne.style }}>{s.title}</p>
                    <p className="text-sm leading-relaxed" style={{ ...serif, color: "#555" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 03 */}
          <section>
            <SectionLabel num="03" title="Where is the constraint in software teams?" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#333" }}>
              The constraint moves as teams improve. Common constraints at different maturity levels:
            </p>
            <div className="flex flex-col border border-[#e5e5e5]">
              {[
                { stage: "Early teams",       constraint: "Manual deployments",      fix: "Automate the deployment pipeline. Every manual step is a queue." },
                { stage: "Growing teams",     constraint: "Code review",             fix: "Reduce PR size. Add reviewers. Set SLAs on review turnaround." },
                { stage: "Scaling teams",     constraint: "Test environment access", fix: "On-demand environments. Containers. Eliminate scheduling queues." },
                { stage: "Mature teams",      constraint: "Slow test suites",        fix: "Parallelize tests. Remove flaky tests. Keep CI under 10 minutes." },
                { stage: "Elite teams",       constraint: "Cognitive load",          fix: "Platform engineering. Internal developer platforms. Golden paths." },
              ].map((row, i) => (
                <div key={row.stage} className="grid grid-cols-3 px-4 py-3" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < 4 ? "1px solid #f0f0f0" : "none" }}>
                  <span className="text-xs font-mono font-bold text-gray-500">{row.stage}</span>
                  <span className="text-xs font-mono" style={{ color: "#dc2626" }}>{row.constraint}</span>
                  <span className="text-xs" style={{ ...serif, color: "#555" }}>{row.fix}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 04 */}
          <section>
            <SectionLabel num="04" title="TOC at Nexus Corp" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>
              When you ran the Value Stream Mapping exercise in M-01, you identified Nexus Corp's constraint:
              12 days of wait for the monthly production deployment window. Every other improvement was blocked
              by this single constraint.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>
              In M-04, you eliminated it by connecting the pipeline to a continuous deployment platform. The
              constraint moved. The next constraint will be visible in the updated VSM.
            </p>
            <Callout accent="#16a34a">
              Improving code review speed, test coverage, and environment provisioning all mattered — but none of
              them improved lead time until the deployment constraint was resolved first.
            </Callout>
          </section>

          {/* Section 05 */}
          <section>
            <SectionLabel num="05" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="The Goal — Eliyahu Goldratt" body="The original novel that introduced TOC. Alex Rogo saves his factory. A surprisingly fast read that changes how you see systems." />
              <RefCard title="The Phoenix Project" body="IT fiction adapting The Goal. Bill Palmer identifies Brent as the constraint and learns to protect and then eliminate him." />
              <RefCard title="DevOps Handbook" body="Chapter 3: Where to Start. How to identify and exploit constraints in the technology value stream." />
              <RefCard title="Beyond the Goal — Goldratt" body="Audio lectures expanding on TOC applications beyond manufacturing, including knowledge work." />
            </div>
          </section>

        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/types-of-waste" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Types of Waste</a>
            <a href="/library/small-batches" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>Work in Small Batches →</a>
          </div>
        </div>
      </div>

    </main>
  )
}
