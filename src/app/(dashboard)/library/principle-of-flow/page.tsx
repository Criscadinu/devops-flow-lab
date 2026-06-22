import { VideoNotice } from "../_components/VideoNotice"


const serif: React.CSSProperties = { fontFamily: "Georgia, 'Times New Roman', serif" }

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400">{num}</span>
      <h2 className="text-xl text-black tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
        {title}
      </h2>
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

// ─── Flow diagram ─────────────────────────────────────────────────────────────

function FlowDiagram() {
  const badSteps = [
    { label: "Dev",    queue: 47 },
    { label: "Review", queue: 23 },
    { label: "QA",     queue: 31 },
    { label: "Deploy", queue: 0  },
  ]
  const goodSteps = [
    { label: "Dev",    queue: 2 },
    { label: "Review", queue: 1 },
    { label: "QA",     queue: 2 },
    { label: "Deploy", queue: 0 },
  ]

  function Row({
    steps,
    label,
    accent,
    bg,
  }: {
    steps: { label: string; queue: number }[]
    label: string
    accent: string
    bg: string
  }) {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-xs font-mono font-bold" style={{ color: accent }}>{label}</span>
        <div className="flex items-center">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center">
              {/* Queue pile */}
              {s.queue > 0 && (
                <div className="flex flex-col items-center mr-1">
                  <span className="text-[9px] font-mono" style={{ color: accent }}>{s.queue}</span>
                  <div className="flex flex-col gap-0.5">
                    {Array.from({ length: Math.min(s.queue > 10 ? 5 : 3, 5) }).map((_, j) => (
                      <div key={j} className="h-1.5 w-5" style={{ backgroundColor: `${accent}40`, border: `1px solid ${accent}60` }} />
                    ))}
                  </div>
                </div>
              )}
              {/* Box */}
              <div
                className="px-4 py-2 text-xs font-mono font-bold text-center"
                style={{ backgroundColor: bg, border: `2px solid ${accent}`, color: accent, minWidth: "64px" }}
              >
                {s.label}
              </div>
              {/* Arrow */}
              {i < steps.length - 1 && (
                <div className="flex items-center mx-1">
                  <div className="w-4 h-px" style={{ backgroundColor: accent }} />
                  <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `5px solid ${accent}` }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="my-6 p-6 border border-[#e5e5e5] overflow-x-auto" style={{ backgroundColor: "#f7f7f5" }}>
      <div className="flex flex-col gap-8 min-w-max">
        <Row steps={badSteps}  label="BAD FLOW — queues build up at every stage" accent="#dc2626" bg="#fff5f5" />
        <Row steps={goodSteps} label="GOOD FLOW — work moves continuously" accent="#16a34a" bg="#f0fdf4" />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrincipleOfFlowPage() {
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
            <span className="text-gray-700">The Principle of Flow</span>
          </p>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FC-02", "CONCEPT", "First Way: Flow"].map((tag) => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            The Principle of Flow
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            How work moves through a system. Why fast flow reduces risk, improves quality, and accelerates learning.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Lean Thinking", "The Phoenix Project"].map((s) => (
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
            <SectionLabel num="01" title="What is flow?" />
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                Flow is the smooth, continuous movement of work from left to right through a value stream — from
                development to operations to the customer. When work flows well, features move quickly from idea
                to production without piling up, waiting, or being blocked.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                The concept comes from Lean Manufacturing. Taiichi Ohno at Toyota observed that the fastest way to
                produce something is not to work harder on individual steps, but to eliminate everything that stops
                work from flowing. The same principle applies to software.
              </p>
            </div>
            <FlowDiagram />
          </section>

          {/* Section 02 */}
          <section>
            <SectionLabel num="02" title="The three properties of good flow" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { color: "#0891b2", bg: "#f0fdfa", border: "#67e8f9", label: "Fast",    body: "Work moves from commit to production in hours or days, not weeks or months. Every delay is a signal that something is blocking flow." },
                { color: "#16a34a", bg: "#f0fdf4", border: "#86efac", label: "Smooth",  body: "Work does not pile up at any one stage. No single step is a bottleneck that everything waits on. The rate of work entering equals the rate leaving." },
                { color: "#b45309", bg: "#fffbeb", border: "#fcd34d", label: "Visible", body: "You can see where work is at all times. Blocked work is immediately visible. Problems surface quickly before they compound." },
              ].map((c) => (
                <div key={c.label} className="p-6 border" style={{ backgroundColor: c.bg, borderColor: c.border, borderLeft: `3px solid ${c.color}` }}>
                  <p className="text-xs font-mono font-bold mb-2" style={{ color: c.color }}>{c.label}</p>
                  <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 03 */}
          <section>
            <SectionLabel num="03" title="Why fast flow reduces risk" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#333" }}>
              This seems counterintuitive. Surely moving faster means more mistakes? The opposite is true.
            </p>
            <ol className="flex flex-col gap-5">
              {[
                { n: "1", title: "Smaller changes",           body: "Fast flow requires small batches. Small changes are easier to understand, test, and debug. A 10-line change is safer than a 10,000-line change." },
                { n: "2", title: "Faster feedback",           body: "When something breaks in a small change, you know immediately what caused it. In a large monthly release, finding the root cause takes days." },
                { n: "3", title: "Less work in progress",     body: "Lower WIP means fewer things can go wrong simultaneously. Less context switching means higher quality work." },
                { n: "4", title: "Earlier problem detection", body: "Problems found in development cost 10x less to fix than problems found in production. Fast flow pushes problems left, closer to their source." },
              ].map((item) => (
                <li key={item.n} className="flex gap-5">
                  <span className="text-2xl font-mono font-bold shrink-0 leading-none" style={{ fontFamily: "var(--font-heading)", color: "#e5e5e5" }}>{item.n}</span>
                  <div>
                    <p className="text-sm font-semibold text-black mb-1" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</p>
                    <p className="text-sm leading-relaxed" style={{ ...serif, color: "#555" }}>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Callout>
              DORA research shows elite performers deploy 973x more frequently than low performers and have 6,570x
              faster lead times — with 3x lower change failure rates. Speed and stability are not trade-offs. They
              reinforce each other.
            </Callout>
          </section>

          {/* Section 04 */}
          <section>
            <SectionLabel num="04" title="Flow vs throughput" />
            <p className="text-sm leading-relaxed mb-3" style={{ color: "#333" }}>
              A common mistake is to optimize for throughput — getting each individual step to work as fast as
              possible. But local optimization does not improve global flow.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#333" }}>
              <strong>Example:</strong> If Development doubles its speed but Review stays the same, work piles up
              at Review. The team is busier, but value is not reaching customers faster. Flow is a system property,
              not a local property.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 border" style={{ backgroundColor: "#fff5f5", borderColor: "#fca5a5", borderLeft: "3px solid #dc2626" }}>
                <p className="text-xs font-mono font-bold mb-2" style={{ color: "#dc2626" }}>Throughput thinking</p>
                <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>
                  How fast can each team or step work? Optimize locally. Measure individual velocity.
                </p>
              </div>
              <div className="p-6 border" style={{ backgroundColor: "#f0fdf4", borderColor: "#86efac", borderLeft: "3px solid #16a34a" }}>
                <p className="text-xs font-mono font-bold mb-2" style={{ color: "#16a34a" }}>Flow thinking</p>
                <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>
                  How fast does work move end-to-end? Optimize the system. Measure lead time.
                </p>
              </div>
            </div>
          </section>

          {/* Section 05 */}
          <section>
            <SectionLabel num="05" title="Flow at Nexus Corp" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#333" }}>
              When you joined Nexus Corp, the value stream had 41.5 days of total lead time with 18% flow
              efficiency. Here is how each mission improved flow:
            </p>
            <div className="flex flex-col border border-[#e5e5e5]">
              {[
                { label: "Baseline",         lt: "43 days",  eff: "18%",   note: "Made the bottlenecks visible. Identified 33 days of wait time.",          color: "#dc2626" },
                { label: "After M-01 VSM",   lt: "43 days",  eff: "18%",   note: "Made the bottlenecks visible. Identified 33 days of wait time.",          color: "#f59e0b" },
                { label: "After M-02 Envs",  lt: "28 days",  eff: "27%",   note: "Eliminated environment wait. Reduced scheduling delays.",                 color: "#f59e0b" },
                { label: "After M-03 CI",    lt: "21 days",  eff: "36%",   note: "Automated testing. Bugs caught in minutes, not weeks.",                   color: "#0891b2" },
                { label: "After M-04 CD",    lt: "14 days",  eff: "54%",   note: "Eliminated manual deploy. Flow efficiency rising.",                       color: "#16a34a" },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className="flex items-start gap-4 px-5 py-4"
                  style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < 4 ? "1px solid #f0f0f0" : "none" }}
                >
                  <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: row.color }} />
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
                    <span className="text-xs font-mono font-bold w-36 shrink-0" style={{ color: row.color }}>{row.label}</span>
                    <span className="text-xs font-mono text-gray-500">LT: <strong className="text-gray-700">{row.lt}</strong></span>
                    <span className="text-xs font-mono text-gray-500">Efficiency: <strong style={{ color: row.color }}>{row.eff}</strong></span>
                    <span className="text-xs flex-1" style={{ ...serif, color: "#555" }}>{row.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 06 */}
          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="DevOps Handbook" body="Part II: The First Way — The Technical Practices of Flow. The complete playbook for fast, reliable software delivery." />
              <RefCard title="The Phoenix Project" body="Parts 1-2: The Three Ways. Bill Palmer's journey from chaos to flow through IT transformation." />
              <RefCard title="Lean Thinking — Womack & Jones" body="Chapter 3: Flow. The source material — how Toyota eliminated everything that stops work from moving." />
              <RefCard title="DORA 2023 State of DevOps Report" body="Key findings on deployment frequency and lead time. The data behind elite vs low performer comparisons." />
            </div>
          </section>

        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/what-is-a-value-stream" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← What is a Value Stream?</a>
            <a href="/library/types-of-waste" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>Types of Waste →</a>
          </div>
        </div>
      </div>

    </main>
  )
}
