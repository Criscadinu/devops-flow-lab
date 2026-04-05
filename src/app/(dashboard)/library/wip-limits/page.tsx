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

// ─── Little's Law diagram ─────────────────────────────────────────────────────

function LittlesLawDiagram() {
  return (
    <div className="my-6 border border-[#e5e5e5]" style={{ backgroundColor: "#f7f7f5" }}>
      {/* Formula */}
      <div className="px-8 py-6 border-b border-[#e5e5e5] text-center" style={{ backgroundColor: "#f0fdfa" }}>
        <p className="text-xs font-mono font-bold text-[#0891b2] mb-2 uppercase tracking-wider">Little's Law</p>
        <p className="text-2xl font-mono font-bold text-black">L = λ × W</p>
        <div className="flex justify-center gap-8 mt-3">
          <div className="text-center">
            <p className="text-lg font-mono font-bold" style={{ color: "#0891b2" }}>L</p>
            <p className="text-xs font-mono text-gray-500">Items in system (WIP)</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-mono font-bold" style={{ color: "#0891b2" }}>λ</p>
            <p className="text-xs font-mono text-gray-500">Arrival rate (throughput)</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-mono font-bold" style={{ color: "#0891b2" }}>W</p>
            <p className="text-xs font-mono text-gray-500">Time in system (lead time)</p>
          </div>
        </div>
      </div>
      {/* Examples */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="p-6 border-r border-[#e5e5e5]">
          <p className="text-xs font-mono font-bold mb-3" style={{ color: "#dc2626" }}>High WIP</p>
          <div className="flex flex-col gap-1 font-mono text-xs text-gray-600">
            <p>WIP = 20 items</p>
            <p>Throughput = 2 items/day</p>
            <div className="h-px bg-gray-200 my-2" />
            <p className="font-bold" style={{ color: "#dc2626" }}>Lead Time = 10 days</p>
          </div>
        </div>
        <div className="p-6">
          <p className="text-xs font-mono font-bold mb-3" style={{ color: "#16a34a" }}>Low WIP (same throughput)</p>
          <div className="flex flex-col gap-1 font-mono text-xs text-gray-600">
            <p>WIP = 5 items</p>
            <p>Throughput = 2 items/day</p>
            <div className="h-px bg-gray-200 my-2" />
            <p className="font-bold" style={{ color: "#16a34a" }}>Lead Time = 2.5 days</p>
          </div>
        </div>
      </div>
      <p className="px-6 py-3 text-xs font-mono text-gray-400 border-t border-[#e5e5e5]">
        Reducing WIP from 20 to 5 with the same throughput cuts lead time by 75% — without adding any capacity.
      </p>
    </div>
  )
}

// ─── Kanban board example ─────────────────────────────────────────────────────

function KanbanBoard() {
  const columns = [
    {
      label: "Backlog",     limit: null,  items: ["Feat A", "Feat B", "Feat C", "Feat D", "Feat E"],
      accent: "#888", bg: "#f7f7f5",
    },
    {
      label: "In Progress", limit: 3, items: ["Feat F", "Feat G", "Feat H"],
      accent: "#0891b2", bg: "#f0fdfa",
    },
    {
      label: "Review",      limit: 2, items: ["Feat I", "Feat J"],
      accent: "#7c3aed", bg: "#faf5ff",
    },
    {
      label: "Done",        limit: null, items: ["Feat K", "Feat L", "Feat M"],
      accent: "#16a34a", bg: "#f0fdf4",
    },
  ]
  return (
    <div className="my-6 overflow-x-auto">
      <div className="flex gap-3 min-w-max">
        {columns.map((col) => (
          <div key={col.label} className="w-40 flex flex-col gap-2">
            <div className="flex items-center justify-between px-2 py-1.5 border-b-2" style={{ borderColor: col.accent }}>
              <span className="text-xs font-mono font-bold" style={{ color: col.accent }}>{col.label}</span>
              {col.limit && (
                <span className="text-xs font-mono px-1" style={{ color: col.accent, backgroundColor: `${col.accent}15` }}>
                  WIP: {col.limit}
                </span>
              )}
            </div>
            {col.items.map((item) => (
              <div key={item} className="px-3 py-2 border border-[#e5e5e5] text-xs font-mono text-gray-600" style={{ backgroundColor: col.bg }}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function WipLimitsPage() {
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
            <span className="text-gray-700">WIP Limits and Queue Theory</span>
          </p>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FC-06", "CONCEPT", "First Way: Flow"].map((tag) => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            WIP Limits and Queue Theory
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            How limiting work in progress speeds up delivery. Little's Law, queue dynamics, and why starting less means finishing more.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["Lean + Kanban", "Principles of Product Dev Flow", "DevOps Handbook"].map((s) => (
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
            <SectionLabel num="01" title="The multitasking illusion" />
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                Most software teams have more work in progress than they can handle. Developers juggle 3-5 tasks.
                Reviewers have 10 open PRs. QA has 20 tickets in progress. The intuition is that more concurrent
                work means more throughput. The data says the opposite.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                Context switching between tasks has a real cost. Gerald Weinberg found that switching between 2
                projects costs each project 20% overhead. Three projects: 40%. Five projects: 75%. The more things
                in progress simultaneously, the less effectively each one is being worked on.
              </p>
            </div>
            <Callout>
              Stop starting. Start finishing. The goal is not to keep everyone busy — it is to keep work moving.
              A team where everyone is busy but nothing ships has a WIP problem.
            </Callout>
          </section>

          {/* Section 02 */}
          <section>
            <SectionLabel num="02" title="Little's Law" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>
              John Little's theorem (1961) describes the relationship between work in progress, throughput, and
              lead time in any stable system. It is one of the most important equations in operations research —
              and it applies directly to software delivery.
            </p>
            <LittlesLawDiagram />
            <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
              The key insight: to reduce lead time without adding capacity, reduce WIP. You do not need to hire
              more people or work faster. You need to have fewer things in flight at the same time.
            </p>
          </section>

          {/* Section 03 */}
          <section>
            <SectionLabel num="03" title="WIP limits in practice" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#333" }}>
              A WIP limit is a constraint on the number of items that can be in a given stage of the workflow at
              the same time. When a stage is at its WIP limit, no new work can enter until an item exits.
              This forces the team to focus on finishing before starting.
            </p>
            <KanbanBoard />
            <p className="text-sm leading-relaxed mt-4" style={{ color: "#333" }}>
              When a WIP limit is hit, the right response is not to bypass it — it is to swarm on the blocked
              work. If Review is at its limit of 2, the entire team should focus on getting those 2 items through
              review before starting anything new.
            </p>
          </section>

          {/* Section 04 */}
          <section>
            <SectionLabel num="04" title="Queue dynamics" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>
              Queues are expensive. Work sitting in a queue is not just idle — it is accumulating holding costs:
              delayed feedback, growing merge conflicts, stale context, and opportunity cost.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#333" }}>
              Queue theory shows that as utilization approaches 100%, queue length grows exponentially, not
              linearly. A team at 80% utilization has manageable queues. At 95% utilization, queues explode.
              This is why always-busy teams deliver slowly: they have no slack to absorb variability, so everything
              queues behind the next bottleneck.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { util: "80%",  wait: "4x",   label: "Manageable",  color: "#16a34a", bg: "#f0fdf4" },
                { util: "90%",  wait: "9x",   label: "Strained",    color: "#f59e0b", bg: "#fffbeb" },
                { util: "95%",  wait: "19x",  label: "Broken",      color: "#dc2626", bg: "#fff5f5" },
              ].map((row) => (
                <div key={row.util} className="p-5 border text-center" style={{ backgroundColor: row.bg, borderColor: `${row.color}30`, borderLeft: `3px solid ${row.color}` }}>
                  <p className="text-2xl font-mono font-bold" style={{ color: row.color }}>{row.util}</p>
                  <p className="text-xs font-mono text-gray-400 mb-2">utilization</p>
                  <p className="text-sm font-mono font-bold" style={{ color: row.color }}>Wait time: {row.wait} service time</p>
                  <p className="text-xs font-mono mt-1 text-gray-500">{row.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 05 */}
          <section>
            <SectionLabel num="05" title="How to set WIP limits" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#333" }}>
              There is no universal formula. Start by making WIP visible, then lower the limit until it causes
              productive tension — the team must collaborate to unblock items rather than starting new work.
            </p>
            <ol className="flex flex-col gap-4">
              {[
                { title: "Count your current WIP",        desc: "How many items are in each stage right now? Most teams are surprised by the number. This is your baseline." },
                { title: "Set limits slightly below current", desc: "Start with a limit of team size minus one. Adjust based on what you observe." },
                { title: "Enforce the limit visibly",     desc: "When a column is full, the team stops and helps move items through. The limit is the forcing function." },
                { title: "Measure lead time",             desc: "As WIP decreases, lead time should decrease. Track it. If it does not, the constraint is elsewhere." },
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

          {/* Section 06 */}
          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Kanban — David Anderson" body="The definitive guide to WIP limits and Kanban in software development. Chapter 4: WIP Limits." />
              <RefCard title="Principles of Product Development Flow — Reinertsen" body="The mathematical foundation of queue theory applied to product development. Dense but essential." />
              <RefCard title="Making Work Visible — Dominica DeGrandis" body="Practical guide to identifying and exposing time theft and WIP problems in software teams." />
              <RefCard title="DevOps Handbook" body="Chapter 8: How to Enable and Practice Continuous Integration. WIP limits in CI/CD pipelines." />
            </div>
          </section>

        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/small-batches" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Work in Small Batches</a>
            <a href="/library/value-stream-mapping" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>Tools: Value Stream Mapping →</a>
          </div>
        </div>
      </div>

    </main>
  )
}
