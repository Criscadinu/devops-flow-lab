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

// ─── Batch size comparison diagram ───────────────────────────────────────────

function BatchDiagram() {
  return (
    <div className="my-6 border border-[#e5e5e5] overflow-hidden" style={{ backgroundColor: "#f7f7f5" }}>
      {/* Large batch */}
      <div className="p-6 border-b border-[#e5e5e5]">
        <p className="text-xs font-mono font-bold mb-4" style={{ color: "#dc2626" }}>LARGE BATCH — monthly release</p>
        <div className="flex items-end gap-1 flex-wrap">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-center text-[9px] font-mono"
              style={{
                width: "28px",
                height: "28px",
                backgroundColor: i < 24 ? "#fee2e2" : "#f0fdf4",
                border: `1px solid ${i < 24 ? "#fca5a5" : "#86efac"}`,
                color: "#dc2626",
              }}
            >
              #{i + 1}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4">
          <span className="text-xs font-mono text-gray-500">24 changes deployed at once</span>
          <span className="text-xs font-mono" style={{ color: "#dc2626" }}>Deployment failure: which change broke it?</span>
        </div>
      </div>
      {/* Small batch */}
      <div className="p-6">
        <p className="text-xs font-mono font-bold mb-4" style={{ color: "#16a34a" }}>SMALL BATCH — daily releases</p>
        <div className="flex items-end gap-3">
          {[1, 2, 3, 4].map((day) => (
            <div key={day} className="flex flex-col items-center gap-1">
              <div className="flex gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-center text-[9px] font-mono"
                    style={{ width: "24px", height: "24px", backgroundColor: "#f0fdf4", border: "1px solid #86efac", color: "#16a34a" }}>
                    {(day - 1) * 3 + i + 1}
                  </div>
                ))}
              </div>
              <span className="text-[9px] font-mono text-gray-400">Day {day}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4">
          <span className="text-xs font-mono text-gray-500">3 changes per day</span>
          <span className="text-xs font-mono" style={{ color: "#16a34a" }}>Deployment failure: obvious which change caused it</span>
        </div>
      </div>
    </div>
  )
}

export default function SmallBatchesPage() {
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
            <span className="text-gray-700">Work in Small Batches</span>
          </p>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FC-05", "CONCEPT", "First Way: Flow"].map((tag) => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Work in Small Batches
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            Why smaller releases are safer, faster, and easier to debug than large ones — and how to break large work into deployable increments.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["Lean Thinking", "Continuous Delivery", "DORA Research"].map((s) => (
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
            <SectionLabel num="01" title="The batch size problem" />
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                A batch is the amount of work that moves through the system together before being handed off or
                delivered. In software, a batch is often a release: all the features, bug fixes, and changes that
                ship together in one deployment.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                Large batches feel efficient. Surely it is cheaper to deploy 50 changes at once than to deploy
                them one by one? The intuition is wrong. Large batches have large transaction costs: long review
                cycles, complex merge conflicts, hard-to-debug failures, and delayed feedback on whether each
                change works.
              </p>
            </div>
            <BatchDiagram />
          </section>

          {/* Section 02 */}
          <section>
            <SectionLabel num="02" title="Why small batches are safer" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Easier to debug",      desc: "When a 3-change release breaks, the root cause is obvious. When a 50-change release breaks, debugging takes hours or days.",          color: "#0891b2", bg: "#f0fdfa" },
                { label: "Faster feedback",       desc: "A small change deployed today gets real user feedback today. A large batch delayed for 3 weeks means feedback is 3 weeks late.",     color: "#16a34a", bg: "#f0fdf4" },
                { label: "Lower risk per change", desc: "Each small change is self-contained. Its scope is narrow. A rollback is simple and targeted, not a wholesale reversion.",            color: "#b45309", bg: "#fffbeb" },
                { label: "Less merge conflict",   desc: "Small, frequent merges to main avoid the diverging branches that create painful, error-prone merge conflicts in large batches.",     color: "#7c3aed", bg: "#faf5ff" },
              ].map((c) => (
                <div key={c.label} className="p-6 border" style={{ backgroundColor: c.bg, borderLeft: `3px solid ${c.color}`, borderColor: `${c.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-2" style={{ color: c.color }}>{c.label}</p>
                  <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>{c.desc}</p>
                </div>
              ))}
            </div>
            <Callout>
              DORA research consistently finds that elite teams deploy more frequently AND have lower change failure
              rates. Smaller batches are not just faster — they are measurably more reliable.
            </Callout>
          </section>

          {/* Section 03 */}
          <section>
            <SectionLabel num="03" title="The economics of batch size" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>
              There are two costs involved in batch size decisions. Donald Reinertsen formalized this in
              <em> The Principles of Product Development Flow</em>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-6 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                <p className="text-xs font-mono font-bold mb-2 text-gray-500">Transaction cost</p>
                <p className="text-sm leading-relaxed mb-3" style={{ ...serif, color: "#333" }}>
                  The fixed overhead of each release: coordination, review, deployment ceremony. Favors large
                  batches (amortize the overhead).
                </p>
                <p className="text-xs font-mono text-gray-400">Solution: automate and eliminate transaction costs</p>
              </div>
              <div className="p-6 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                <p className="text-xs font-mono font-bold mb-2 text-gray-500">Holding cost</p>
                <p className="text-sm leading-relaxed mb-3" style={{ ...serif, color: "#333" }}>
                  The cost of delay: features not yet delivered, feedback not yet received, bugs not yet caught.
                  Favors small batches (reduce time in flight).
                </p>
                <p className="text-xs font-mono text-gray-400">Solution: reduce batch size to minimize holding cost</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
              The insight: transaction costs are not fixed. Continuous integration, automated testing, and
              deployment pipelines make transaction costs approach zero. When the cost of each deployment is
              near zero, the optimal batch size is one.
            </p>
          </section>

          {/* Section 04 */}
          <section>
            <SectionLabel num="04" title="How to work in smaller batches" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#333" }}>
              Breaking large work into small deployable units is a skill. These techniques help:
            </p>
            <ol className="flex flex-col gap-5">
              {[
                { title: "Feature flags",          desc: "Deploy code that is not yet active. The feature is hidden behind a flag until it is ready to release. Decouples deploy from release." },
                { title: "Vertical slices",         desc: "Instead of building the full data layer, then the full API, then the full UI — build one end-to-end slice of a feature at a time." },
                { title: "Branch by abstraction",   desc: "Introduce an abstraction layer, build the new implementation behind it, then switch over. No long-running feature branches." },
                { title: "Strangler fig pattern",   desc: "Replace an old system incrementally by routing traffic to a new system one endpoint at a time. Never a big-bang rewrite." },
                { title: "Short-lived branches",    desc: "No branch lives longer than a day or two. Merge frequently to main. Use trunk-based development to keep changes small." },
              ].map((item, i) => (
                <li key={item.title} className="flex gap-5">
                  <span className="text-2xl font-mono font-bold shrink-0 leading-none" style={{ ...syne.style, color: "#e5e5e5" }}>{i + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-black mb-1" style={{ ...syne.style }}>{item.title}</p>
                    <p className="text-sm leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Section 05 */}
          <section>
            <SectionLabel num="05" title="Small batches at Nexus Corp" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>
              Before M-04, Nexus Corp deployed once a month. Every release bundled 3-4 weeks of changes. A
              deployment failure required a full rollback of all changes, making it impossible to isolate the
              cause. The deployment window was treated as a high-risk event requiring weekend coverage.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>
              After M-04, continuous deployment means each commit that passes the pipeline ships automatically.
              The "release event" no longer exists. Deployment is a non-event.
            </p>
            <Callout accent="#16a34a">
              The goal is not to deploy once a day. The goal is to make deploying so safe and cheap that it can
              happen as many times as needed. Frequency is a consequence of safety, not a target in itself.
            </Callout>
          </section>

          {/* Section 06 */}
          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Continuous Delivery — Humble & Farley" body="Chapter 1: The Problem of Delivering Software. The foundational case for small batches and deployment pipelines." />
              <RefCard title="Lean Thinking — Womack & Jones" body="Chapter 3: Flow. The single-piece-flow concept from manufacturing — the origin of small batch thinking." />
              <RefCard title="The Principles of Product Development Flow — Reinertsen" body="Chapter 5: Batch Size. The economics and mathematics of optimal batch size in product development." />
              <RefCard title="DORA 2023 State of DevOps Report" body="Elite performers deploy on-demand, multiple times per day. The data on batch size and reliability." />
            </div>
          </section>

        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/theory-of-constraints" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Theory of Constraints</a>
            <a href="/library/wip-limits" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>WIP Limits and Queue Theory →</a>
          </div>
        </div>
      </div>

    </main>
  )
}
