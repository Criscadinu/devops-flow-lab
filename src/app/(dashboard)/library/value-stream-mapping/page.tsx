import { Syne } from "next/font/google"
import { VideoNotice } from "../_components/VideoNotice"

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

const serif: React.CSSProperties = { fontFamily: "Georgia, 'Times New Roman', serif" }

// ─── Shared primitives ────────────────────────────────────────────────────────

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

// ─── VSM symbols legend ───────────────────────────────────────────────────────

function VsmSymbols() {
  return (
    <div className="my-6 border border-[#e5e5e5] p-6" style={{ backgroundColor: "#f7f7f5" }}>
      <p className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-gray-400 mb-5">VSM Symbol Legend</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Process box */}
        <div className="flex gap-3 items-start">
          <div className="shrink-0 w-12 h-9 border-2 border-gray-500 flex items-center justify-center" style={{ backgroundColor: "#ffffff" }}>
            <span className="text-[9px] font-mono text-gray-500">STEP</span>
          </div>
          <div>
            <p className="text-xs font-mono font-bold text-gray-700">Process Box</p>
            <p className="text-xs leading-snug mt-0.5" style={{ ...serif, color: "#666" }}>A step where work is actively done</p>
          </div>
        </div>

        {/* Inventory triangle */}
        <div className="flex gap-3 items-start">
          <div className="shrink-0 w-12 h-9 flex items-center justify-center">
            <div style={{ width: 0, height: 0, borderLeft: "18px solid transparent", borderRight: "18px solid transparent", borderBottom: "30px solid #f59e0b" }} />
          </div>
          <div>
            <p className="text-xs font-mono font-bold text-gray-700">Inventory Triangle</p>
            <p className="text-xs leading-snug mt-0.5" style={{ ...serif, color: "#666" }}>Work waiting between steps</p>
          </div>
        </div>

        {/* Push arrow */}
        <div className="flex gap-3 items-start">
          <div className="shrink-0 w-12 h-9 flex items-center justify-center">
            <div className="flex items-center">
              <div className="w-7 h-0.5 bg-gray-600" />
              <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "8px solid #4b5563" }} />
            </div>
          </div>
          <div>
            <p className="text-xs font-mono font-bold text-gray-700">Push Arrow</p>
            <p className="text-xs leading-snug mt-0.5" style={{ ...serif, color: "#666" }}>Work pushed to the next step</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex gap-3 items-start">
          <div className="shrink-0 w-12 h-9 flex items-center justify-center">
            <svg width="44" height="20" viewBox="0 0 44 20">
              <polyline points="0,5 8,5 8,15 16,15 16,5 24,5 24,15 32,15 32,5 44,5" fill="none" stroke="#0891b2" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-mono font-bold text-gray-700">Timeline</p>
            <p className="text-xs leading-snug mt-0.5" style={{ ...serif, color: "#666" }}>Shows process time vs wait time</p>
          </div>
        </div>

        {/* Information flow */}
        <div className="flex gap-3 items-start">
          <div className="shrink-0 w-12 h-9 flex items-center justify-center">
            <div className="flex items-center">
              <div className="w-7 h-0.5" style={{ backgroundImage: "repeating-linear-gradient(90deg, #7c3aed 0, #7c3aed 4px, transparent 4px, transparent 8px)" }} />
              <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "8px solid #7c3aed" }} />
            </div>
          </div>
          <div>
            <p className="text-xs font-mono font-bold text-gray-700">Information Flow</p>
            <p className="text-xs leading-snug mt-0.5" style={{ ...serif, color: "#666" }}>How information moves between steps</p>
          </div>
        </div>

        {/* Kaizen burst */}
        <div className="flex gap-3 items-start">
          <div className="shrink-0 w-12 h-9 flex items-center justify-center">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                backgroundColor: "#dc2626",
              }}
            />
          </div>
          <div>
            <p className="text-xs font-mono font-bold text-gray-700">Kaizen Burst</p>
            <p className="text-xs leading-snug mt-0.5" style={{ ...serif, color: "#666" }}>Improvement opportunity identified</p>
          </div>
        </div>

      </div>
    </div>
  )
}

// ─── Nexus Corp table ─────────────────────────────────────────────────────────

const nexusRows = [
  { step: "Idea to ticket",    who: "Product Owner", process: "2 days",  wait: "5 days",  issues: "Specs too detailed, batch too large" },
  { step: "Development",       who: "Developer",     process: "3 days",  wait: "3 days",  issues: "Waiting for code review" },
  { step: "Code review",       who: "Senior Dev",    process: "4 hours", wait: "1 day",   issues: "No dedicated review time" },
  { step: "QA testing",        who: "QA Engineer",   process: "2 days",  wait: "5 days",  issues: "One shared test environment" },
  { step: "ACC deployment",    who: "Ops Engineer",  process: "1 day",   wait: "8 days",  issues: "Must be scheduled, manual process" },
  { step: "Production deploy", who: "Ops Engineer",  process: "4 hours", wait: "12 days", issues: "Monthly release window only" },
]

function NexusTable() {
  return (
    <div className="overflow-x-auto my-6 border border-[#e5e5e5]">
      <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f3", borderBottom: "2px solid #e5e5e5" }}>
            {["Step", "Who", "Process Time", "Wait Time", "Issues found"].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-mono font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {nexusRows.map((r, i) => (
            <tr key={r.step} style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: "1px solid #f0f0f0" }}>
              <td className="px-4 py-3 text-xs font-mono font-semibold text-gray-700 whitespace-nowrap">{r.step}</td>
              <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{r.who}</td>
              <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ ...serif, color: "#0891b2" }}>{r.process}</td>
              <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ ...serif, color: "#dc2626" }}>{r.wait}</td>
              <td className="px-4 py-3 text-xs" style={{ ...serif, color: "#555" }}>{r.issues}</td>
            </tr>
          ))}
          <tr style={{ backgroundColor: "#f0fdfa", borderTop: "2px solid #0891b2" }}>
            <td className="px-4 py-3 text-xs font-mono font-bold text-black">Total</td>
            <td className="px-4 py-3" />
            <td className="px-4 py-3 text-xs font-mono font-bold" style={{ color: "#0891b2" }}>7.5 days</td>
            <td className="px-4 py-3 text-xs font-mono font-bold" style={{ color: "#dc2626" }}>34 days</td>
            <td className="px-4 py-3 text-xs font-mono font-bold text-gray-700">Lead time: 41.5 days — Flow efficiency: 18%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  { n: "1", title: "Define the product family",    body: "Choose one type of work to map. Do not try to map everything at once. Start with your most important product or feature flow." },
  { n: "2", title: "Walk the value stream",         body: "Start from the customer and work backwards. Talk to every person who touches the work. Do not rely on what you think happens — observe what actually happens." },
  { n: "3", title: "Draw the current state map",   body: "Document every step, queue, and information flow. Measure process time and wait time at each step. Calculate flow efficiency." },
  { n: "4", title: "Identify waste and bottlenecks", body: "Where does work pile up? Where are the longest wait times? Where does work get reworked or rejected?" },
  { n: "5", title: "Design the future state",      body: "What would the value stream look like if you removed the biggest waste? Draw the future state and define the improvement initiatives." },
  { n: "6", title: "Create an implementation plan", body: "Prioritize the improvements. Assign owners. Set a timeline. The VSM is worthless without action." },
]

const warnings = [
  { title: "Mapping the org chart, not the work",  body: "VSM maps the flow of work, not the organizational structure. Follow the work, not the departments." },
  { title: "Only using post-its",                   body: "Post-it VSMs are great for workshops but need to be digitized. Measure actual times — do not guess." },
  { title: "Mapping everything at once",            body: "Start narrow. One product family, one end-to-end flow. Scope creep kills VSM sessions." },
  { title: "No future state",                       body: "A current state map with no improvement plan is just documentation. The value is in the gap between current and future state." },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ValueStreamMappingToolPage() {
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
            <span className="text-gray-500">Tools &amp; Techniques</span>
            <span className="mx-2">→</span>
            <span className="text-gray-700">Value Stream Mapping</span>
          </p>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FT-01", "TOOL", "First Way: Flow"].map((tag) => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Value Stream Mapping
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            The technique for making your value stream visible, measuring flow efficiency, and identifying where to improve.
          </p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["Lean Thinking", "DevOps Handbook", "Learning to See — Rother & Shook"].map((s) => (
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
            <SectionLabel num="01" title="What is VSM?" />
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                Value Stream Mapping is a Lean technique for visualizing the complete flow of work from request to
                delivery. It originated in Toyota's manufacturing system and was adapted for knowledge work by Karen
                Martin and Mike Osterling in <em>Value Stream Mapping</em> (2014) and for software by the DevOps movement.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                A VSM produces two maps: the <strong>current state</strong> (how work flows today) and the{" "}
                <strong>future state</strong> (how it should flow after improvements). The gap between them is your
                improvement roadmap.
              </p>
            </div>
          </section>

          {/* Section 02 */}
          <section>
            <SectionLabel num="02" title="The standard VSM symbols" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>
              VSM uses a shared visual language so anyone reading the map understands it immediately. These are the
              core symbols used in software value stream maps.
            </p>
            <VsmSymbols />
          </section>

          {/* Section 03 */}
          <section>
            <SectionLabel num="03" title="How to run a VSM session" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#333" }}>
              A VSM session is a structured workshop. It typically takes 4-8 hours for the current state map and
              another session for the future state. Bring the people who actually do the work — not just managers.
            </p>
            <ol className="flex flex-col gap-5">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <span className="text-2xl font-mono font-bold shrink-0 leading-none" style={{ ...syne.style, color: "#e5e5e5" }}>{s.n}</span>
                  <div>
                    <p className="text-sm font-semibold text-black mb-1" style={{ ...syne.style }}>{s.title}</p>
                    <p className="text-sm leading-relaxed" style={{ ...serif, color: "#555" }}>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Section 04 */}
          <section>
            <SectionLabel num="04" title="The Nexus Corp VSM in detail" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>
              In Mission 01, you built a VSM for Nexus Corp. Here is the complete current state map with all measurements:
            </p>
            <NexusTable />
            <Callout accent="#dc2626">
              5 of 6 steps have more wait time than process time. The two biggest wastes are the monthly production
              release window (12 days) and the ACC scheduling queue (8 days). Both are eliminated by continuous
              deployment.
            </Callout>
          </section>

          {/* Section 05 */}
          <section>
            <SectionLabel num="05" title="Common VSM mistakes" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {warnings.map((w) => (
                <div key={w.title} className="p-6 border" style={{ backgroundColor: "#fffbeb", borderColor: "#fcd34d", borderLeft: "3px solid #b45309" }}>
                  <p className="text-xs font-mono font-bold mb-2" style={{ color: "#b45309" }}>Warning</p>
                  <p className="text-sm font-semibold text-black mb-1.5" style={{ ...syne.style }}>{w.title}</p>
                  <p className="text-sm leading-relaxed" style={{ ...serif, color: "#555" }}>{w.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 06 */}
          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Learning to See — Rother & Shook" body="The original VSM workbook from Lean Enterprise Institute. Physical manufacturing focused but foundational for understanding the technique." />
              <RefCard title="Value Stream Mapping — Karen Martin" body="The knowledge work adaptation. Directly applicable to software and service teams. The essential practical guide." />
              <RefCard title="DevOps Handbook — Chapter 2" body="How VSM applies to software delivery and why the technology value stream is the central unit of improvement." />
              <RefCard title="The Phoenix Project" body="Parts 1-2 show a fictional VSM in action at a struggling IT organization. The plant tour sequence is VSM in narrative form." />
            </div>
          </section>

        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/wip-limits" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← WIP Limits</a>
            <a href="/library/deployment-pipeline" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>Deployment Pipeline →</a>
          </div>
        </div>
      </div>

    </main>
  )
}
