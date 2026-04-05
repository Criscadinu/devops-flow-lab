import { Syne } from "next/font/google"
import { VideoNotice } from "../_components/VideoNotice"

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

const serif: React.CSSProperties = { fontFamily: "Georgia, 'Times New Roman', serif" }

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400">{num}</span>
      <h2 className="text-xl text-black tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
        {title}
      </h2>
    </div>
  )
}

function Callout({ children, accent = "#0891b2" }: { children: React.ReactNode; accent?: string }) {
  return (
    <div
      className="px-6 py-4 my-6"
      style={{ backgroundColor: `${accent}0d`, borderLeft: `3px solid ${accent}` }}
    >
      <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>
        {children}
      </p>
    </div>
  )
}

function InsightCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-6 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
      <h4 className="text-sm text-black mb-2" style={{ ...syne.style, fontWeight: 700 }}>{title}</h4>
      <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{body}</p>
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

// ─── Value stream diagram ──────────────────────────────────────────────────────

const steps = [
  { label: "Idea",        note: "Planning",       value: false },
  { label: "Backlog",     note: "Scheduling wait", value: false },
  { label: "Development", note: "Value-adding",   value: true  },
  { label: "Review",      note: "Partial value",  value: null  },
  { label: "Testing",     note: "Value-adding",   value: true  },
  { label: "Staging",     note: "Wait",           value: false },
  { label: "Production",  note: "Delivered",      value: true  },
]

function ValueStreamDiagram() {
  return (
    <div
      className="w-full overflow-x-auto my-6 py-8 px-6 border border-[#e5e5e5]"
      style={{ backgroundColor: "#f7f7f5" }}
    >
      <div className="flex items-center min-w-max mx-auto" style={{ width: "fit-content" }}>
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center">
            {/* Box */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-24 text-center px-2 py-3 border text-xs font-mono font-bold"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: s.value === true ? "#0891b2" : s.value === false ? "#e5e5e5" : "#d4d4d4",
                  color: s.value === true ? "#0891b2" : "#333",
                  borderWidth: s.value === true ? "2px" : "1px",
                }}
              >
                {s.label}
              </div>
              <span
                className="text-[10px] font-mono text-center w-24 leading-tight"
                style={{
                  color: s.value === true ? "#0891b2" : s.value === false ? "#dc2626" : "#888",
                }}
              >
                {s.note}
              </span>
            </div>
            {/* Arrow */}
            {i < steps.length - 1 && (
              <div className="flex items-center mx-1" style={{ marginBottom: "20px" }}>
                <div className="w-6 h-px bg-gray-300" />
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: "6px solid #d1d5db",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-5 mt-6 justify-center">
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
          <span className="w-3 h-3 border-2 border-[#0891b2] inline-block" />
          Value-adding
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
          <span className="w-3 h-3 border border-gray-300 inline-block" />
          Waste / wait
        </span>
      </div>
    </div>
  )
}

// ─── Nexus Corp table ─────────────────────────────────────────────────────────

const nexusRows = [
  { step: "Idea to ticket",     process: "2 days",    wait: "5 days",   value: "No — planning waste" },
  { step: "Development",        process: "3 days",    wait: "3 days",   value: "Yes / No" },
  { step: "Code review",        process: "4 hours",   wait: "1 day",    value: "Yes / No" },
  { step: "QA testing",         process: "2 days",    wait: "5 days",   value: "Yes / No" },
  { step: "ACC deployment",     process: "1 day",     wait: "8 days",   value: "No — scheduling waste" },
  { step: "Production deploy",  process: "4 hours",   wait: "12 days",  value: "No — batch release waste" },
]

function NexusTable() {
  return (
    <div className="overflow-x-auto my-6 border border-[#e5e5e5]">
      <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f3", borderBottom: "2px solid #e5e5e5" }}>
            {["Step", "Process Time", "Wait Time", "Value-adding?"].map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 text-xs font-mono font-bold text-gray-500 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {nexusRows.map((r, i) => (
            <tr
              key={r.step}
              style={{
                backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <td className="px-4 py-3 text-xs font-mono font-semibold text-gray-700">{r.step}</td>
              <td className="px-4 py-3 text-xs" style={{ ...serif, color: "#0891b2" }}>{r.process}</td>
              <td className="px-4 py-3 text-xs" style={{ ...serif, color: "#dc2626" }}>{r.wait}</td>
              <td className="px-4 py-3 text-xs" style={{ ...serif, color: "#555" }}>{r.value}</td>
            </tr>
          ))}
          {/* Total row */}
          <tr style={{ backgroundColor: "#f0fdfa", borderTop: "2px solid #0891b2" }}>
            <td className="px-4 py-3 text-xs font-mono font-bold text-black">Total</td>
            <td className="px-4 py-3 text-xs font-mono font-bold" style={{ color: "#0891b2" }}>7.5 days</td>
            <td className="px-4 py-3 text-xs font-mono font-bold" style={{ color: "#dc2626" }}>34 days</td>
            <td className="px-4 py-3 text-xs font-mono font-bold text-gray-700">Flow efficiency: 18%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WhatIsAValueStreamPage() {
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
            <span className="text-gray-700">What is a Value Stream?</span>
          </p>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {["FC-01", "CONCEPT", "First Way: Flow"].map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-0.5"
                style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            What is a Value Stream?
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            The path work takes from idea to customer. Understanding value streams is the foundation
            of everything in DevOps.
          </p>
          {/* Source tags */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Lean Thinking"].map((s) => (
              <span
                key={s}
                className="text-xs font-mono px-2 py-0.5 text-gray-600"
                style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}
              >
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
            <SectionLabel num="01" title="The definition" />
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                A value stream is the sequence of activities an organization undertakes to deliver a product or
                service to a customer. In software, it is the complete path a feature or fix takes from the moment
                someone has an idea to the moment it is running in production and delivering value to users.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                The term comes from Lean Manufacturing, introduced in <em>Lean Thinking</em> by Womack and Jones.
                Toyota used it to map the physical flow of materials in a factory. The DevOps movement adopted it
                to map the flow of work in software delivery.
              </p>
            </div>
            <ValueStreamDiagram />
          </section>

          {/* Section 02 */}
          <section>
            <SectionLabel num="02" title="Value-adding vs non-value-adding work" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div
                className="p-6 border"
                style={{ backgroundColor: "#f0fdf4", borderColor: "#86efac", borderLeft: "3px solid #16a34a" }}
              >
                <p className="text-xs font-mono font-bold mb-2" style={{ color: "#16a34a" }}>Value-adding</p>
                <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>
                  Work that directly transforms the product toward what the customer wants.
                  Writing code, running tests, deploying a working feature.
                </p>
              </div>
              <div
                className="p-6 border"
                style={{ backgroundColor: "#fff5f5", borderColor: "#fca5a5", borderLeft: "3px solid #dc2626" }}
              >
                <p className="text-xs font-mono font-bold mb-2" style={{ color: "#dc2626" }}>Non-value-adding / waste</p>
                <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>
                  Work that consumes time and resources but does not directly contribute to the customer outcome.
                  Waiting for approval, fixing merge conflicts, manual deployments, waiting for test environments.
                </p>
              </div>
            </div>
            <Callout>
              In most software teams, less than 15% of total lead time is actual value-adding work.
              The rest is waste — waiting, handoffs, rework.
            </Callout>
          </section>

          {/* Section 03 */}
          <section>
            <SectionLabel num="03" title="The two metrics that matter" />
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex gap-4 items-start">
                <span className="text-xs font-mono font-bold text-[#0891b2] w-28 shrink-0 pt-0.5">Lead Time</span>
                <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                  The total time from when work is requested to when it is delivered. This is what the customer experiences.
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-xs font-mono font-bold text-[#0891b2] w-28 shrink-0 pt-0.5">Process Time</span>
                <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                  The time work is actively being worked on. This is what the team experiences.
                </p>
              </div>
            </div>
            {/* Formula box */}
            <div
              className="px-6 py-5 mb-4 border"
              style={{ backgroundColor: "#f0fdfa", borderColor: "#67e8f9" }}
            >
              <p className="text-xs font-mono font-bold text-[#0891b2] mb-1 uppercase tracking-wider">Formula</p>
              <p className="text-base font-mono font-bold text-black">
                Flow Efficiency = Process Time / Lead Time x 100%
              </p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
              <strong>Example:</strong> If your process time is 3 days but your lead time is 30 days, your flow
              efficiency is 10%. 90% of the time, work is sitting idle.
            </p>
          </section>

          {/* Section 04 */}
          <section>
            <SectionLabel num="04" title="Why value streams matter in DevOps" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#333" }}>
              The First Way of DevOps is about making work flow fast from left to right — from development to
              operations to the customer. You cannot improve what you cannot see. Mapping your value stream makes
              the invisible visible: it shows where work piles up, where handoffs create delays, and where
              automation can eliminate waste.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <InsightCard
                title="Visibility before improvement"
                body="You cannot fix what you cannot see. Value stream mapping is the diagnostic tool — it gives you a baseline before you change anything."
              />
              <InsightCard
                title="Systemic thinking"
                body="Local optimizations (making one step faster) often do not improve the whole. Focus on the end-to-end flow, not individual stages."
              />
              <InsightCard
                title="The customer perspective"
                body="Lead time is what the customer experiences. Optimizing process time without reducing lead time delivers no value to customers."
              />
            </div>
          </section>

          {/* Section 05 */}
          <section>
            <SectionLabel num="05" title="Value streams at Nexus Corp" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>
              In Mission 01, you mapped the Nexus Corp value stream. Here is what you found:
            </p>
            <NexusTable />
            <Callout>
              Every mission you complete improves this. The pipeline you built in M-03 eliminated the manual
              deployment wait. Environments in M-02 eliminated the test environment wait.
            </Callout>
          </section>

          {/* Section 06 */}
          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard
                title="DevOps Handbook"
                body="Chapter 2: The First Way — The Principles of Flow. The foundational text on making work flow fast through the technology value stream."
              />
              <RefCard
                title="Lean Thinking — Womack & Jones"
                body="Chapter 2: Value Stream. The original source of value stream mapping from Lean Manufacturing."
              />
              <RefCard
                title="The Phoenix Project"
                body="Part 1: The flow of work through IT. A novel-format introduction to how value stream thinking transforms a struggling IT organization."
              />
              <RefCard
                title="DORA 2023 State of DevOps Report"
                body="Elite performer lead times: less than one hour from commit to production. A benchmark for what good looks like."
              />
            </div>
          </section>

        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a
            href="/library"
            className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors"
          >
            ← Back to Library
          </a>
          <a
            href="/library/principle-of-flow"
            className="text-sm font-mono font-bold hover:underline"
            style={{ color: "#0891b2" }}
          >
            Next concept: The Principle of Flow →
          </a>
        </div>
      </div>

    </main>
  )
}
