import { Syne } from "next/font/google"

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared components ────────────────────────────────────────────────────────

function SectionDivider({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-mono text-gray-700 tracking-widest">{number}</span>
      <h2
        className="text-2xl text-white tracking-tight"
        style={{ ...syne.style, fontWeight: 800 }}
      >
        {label}
      </h2>
      <div className="flex-1 h-px bg-gray-900" />
    </div>
  )
}

function Callout({
  accent,
  bg,
  border,
  children,
}: {
  accent: string
  bg: string
  border: string
  children: React.ReactNode
}) {
  return (
    <div
      className="p-5 border"
      style={{ backgroundColor: bg, borderColor: border, borderLeft: `3px solid ${accent}` }}
    >
      {children}
    </div>
  )
}

// ─── VSM Flow Diagram ─────────────────────────────────────────────────────────

const vsmSteps = [
  { label: "Idea",        pt: "0.5d", wt: "5d"  },
  { label: "Spec",        pt: "1d",   wt: "3d"  },
  { label: "Development", pt: "3d",   wt: "3d"  },
  { label: "Review",      pt: "0.5d", wt: "2d"  },
  { label: "QA",          pt: "2d",   wt: "5d"  },
  { label: "Deploy",      pt: "1d",   wt: "8d"  },
  { label: "Production",  pt: null,   wt: null   },
]

function VsmDiagram() {
  return (
    <div className="overflow-x-auto">
      <div className="flex items-start gap-0 min-w-max py-2">
        {vsmSteps.map((step, i) => (
          <div key={step.label} className="flex items-start">
            {/* Node */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="px-4 py-3 text-center border"
                style={{
                  backgroundColor: step.pt === null ? "rgba(6,182,212,0.08)" : "#0d0d0d",
                  borderColor: step.pt === null ? "rgba(6,182,212,0.4)" : "rgb(31,41,55)",
                  minWidth: "100px",
                }}
              >
                <span
                  className="text-xs font-mono font-bold"
                  style={{ color: step.pt === null ? "rgb(6,182,212)" : "rgb(209,213,219)" }}
                >
                  {step.label}
                </span>
              </div>
              {step.pt !== null && (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>
                    PT {step.pt}
                  </span>
                  <span className="text-xs font-mono" style={{ color: "rgb(239,68,68)" }}>
                    WT {step.wt}
                  </span>
                </div>
              )}
            </div>
            {/* Arrow */}
            {i < vsmSteps.length - 1 && (
              <div className="flex items-center self-start mt-3.5">
                <div className="w-6 h-px" style={{ backgroundColor: "rgb(55,65,81)" }} />
                <span className="text-gray-600 text-xs">›</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-2">
        <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>
          PT = Process Time (active work)
        </span>
        <span className="text-xs font-mono" style={{ color: "rgb(239,68,68)" }}>
          WT = Wait Time (idle)
        </span>
      </div>
    </div>
  )
}

// ─── Nexus Corp table ─────────────────────────────────────────────────────────

const nexusRows = [
  { step: "Idea to ticket",      pt: "2 days",   wt: "5 days",   wtNote: ""                          },
  { step: "Development",         pt: "3 days",   wt: "3 days",   wtNote: "code review wait"           },
  { step: "QA",                  pt: "2 days",   wt: "5 days",   wtNote: "environment wait"           },
  { step: "ACC deployment",      pt: "1 day",    wt: "8 days",   wtNote: "scheduling wait"            },
  { step: "Production deploy",   pt: "4 hours",  wt: "12 days",  wtNote: "monthly release"            },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VsmLibraryPage() {
  return (
    <main className="min-h-screen text-gray-100" style={{ backgroundColor: "#000" }}>
      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-16">

        {/* Hero */}
        <div className="flex flex-col gap-5">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-gray-600">
            <a href="/library" className="hover:text-gray-400 transition-colors">Library</a>
            <span>›</span>
            <span style={{ color: "rgb(6,182,212)" }}>Value Stream Mapping</span>
          </div>

          <div className="flex flex-col gap-3">
            <h1
              className="text-4xl text-white tracking-tight leading-tight"
              style={{ ...syne.style, fontWeight: 800 }}
            >
              Value Stream Mapping
            </h1>
            <p className="text-gray-400 text-base leading-relaxed">
              How to make waste visible and measure the real flow of work
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["FLOW", "M-01", "DevOps Handbook Chapter 2"].map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-0.5 tracking-widest"
                style={{
                  color: "rgb(6,182,212)",
                  backgroundColor: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.2)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Video */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: "rgb(75,85,99)" }}>
            Video Lesson
          </p>
          <div
            className="w-full border"
            style={{
              aspectRatio: "16/9",
              backgroundColor: "#080808",
              borderColor: "rgba(6,182,212,0.3)",
              borderStyle: "dashed",
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-sm font-mono text-gray-600 text-center px-4">
                Video coming soon -- check back later
              </p>
            </div>
          </div>
          <p className="text-xs font-mono text-gray-600">
            In this video: what VSM is, how to run a mapping session, and how to read the results.
          </p>
        </div>

        {/* Section 01 */}
        <section className="flex flex-col gap-6">
          <SectionDivider number="01" label="What is Value Stream Mapping?" />

          <p className="text-gray-400 leading-relaxed">
            Value Stream Mapping is a lean technique for visualising every step that work takes from
            idea to production. It was developed in manufacturing but applies directly to software
            delivery. A VSM session produces a diagram showing every handoff, queue, and delay in
            your process -- making waste visible so you can eliminate it.
          </p>

          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(75,85,99)" }}>
              A simple value stream
            </p>
            <div
              className="p-5 border overflow-x-auto"
              style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)" }}
            >
              <VsmDiagram />
            </div>
          </div>

          <Callout accent="rgb(6,182,212)" bg="#020d0f" border="rgba(6,182,212,0.2)">
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-white font-bold">Key insight:</span> In most software teams,
              less than 10% of total lead time is actual work. The rest is waiting.
            </p>
          </Callout>
        </section>

        {/* Section 02 */}
        <section className="flex flex-col gap-6">
          <SectionDivider number="02" label="The two types of time" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="flex flex-col gap-3 p-6 border"
              style={{
                backgroundColor: "#020d0f",
                borderColor: "rgba(6,182,212,0.2)",
                borderLeft: "3px solid rgb(6,182,212)",
              }}
            >
              <span
                className="text-xs font-mono font-bold uppercase tracking-widest"
                style={{ color: "rgb(6,182,212)" }}
              >
                Process Time
              </span>
              <p className="text-gray-400 text-sm leading-relaxed">
                The time work is actively being done. Writing code, reviewing a PR, running tests.
                This is the time that delivers value.
              </p>
            </div>
            <div
              className="flex flex-col gap-3 p-6 border"
              style={{
                backgroundColor: "#0f0606",
                borderColor: "rgba(239,68,68,0.2)",
                borderLeft: "3px solid rgb(239,68,68)",
              }}
            >
              <span
                className="text-xs font-mono font-bold uppercase tracking-widest"
                style={{ color: "rgb(239,68,68)" }}
              >
                Wait Time
              </span>
              <p className="text-gray-400 text-sm leading-relaxed">
                The time work sits idle. Waiting for review, waiting for a test environment, waiting
                for deployment. This is waste.
              </p>
            </div>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed">
            VSM makes wait time visible. Once visible, it can be eliminated.
          </p>
        </section>

        {/* Section 03 */}
        <section className="flex flex-col gap-6">
          <SectionDivider number="03" label="How to read the Nexus Corp VSM" />

          <div className="border border-gray-800 overflow-hidden">
            <div
              className="grid border-b border-gray-800"
              style={{ gridTemplateColumns: "1fr 130px 130px", backgroundColor: "#0d0d0d" }}
            >
              <div className="px-5 py-3">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-600">Step</span>
              </div>
              <div className="px-4 py-3 border-l border-gray-800">
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(34,197,94)" }}>
                  Process Time
                </span>
              </div>
              <div className="px-4 py-3 border-l border-gray-800">
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(239,68,68)" }}>
                  Wait Time
                </span>
              </div>
            </div>
            {nexusRows.map((row, i) => (
              <div
                key={row.step}
                className="grid border-b border-gray-800 last:border-b-0"
                style={{
                  gridTemplateColumns: "1fr 130px 130px",
                  backgroundColor: i % 2 === 0 ? "#080808" : "#060606",
                }}
              >
                <div className="px-5 py-4">
                  <p className="text-sm text-gray-300">{row.step}</p>
                </div>
                <div className="px-4 py-4 border-l border-gray-800">
                  <p className="text-sm font-mono" style={{ color: "rgb(34,197,94)" }}>{row.pt}</p>
                </div>
                <div className="px-4 py-4 border-l border-gray-800">
                  <p className="text-sm font-mono" style={{ color: "rgb(239,68,68)" }}>{row.wt}</p>
                  {row.wtNote && (
                    <p className="text-xs font-mono text-gray-700 mt-0.5">{row.wtNote}</p>
                  )}
                </div>
              </div>
            ))}
            {/* Totals row */}
            <div
              className="grid border-t-2"
              style={{
                gridTemplateColumns: "1fr 130px 130px",
                backgroundColor: "#0a0a0a",
                borderColor: "rgb(31,41,55)",
              }}
            >
              <div className="px-5 py-4">
                <p className="text-sm font-bold text-white font-mono">Total</p>
              </div>
              <div className="px-4 py-4 border-l border-gray-800">
                <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>7.5 days</p>
              </div>
              <div className="px-4 py-4 border-l border-gray-800">
                <p className="text-sm font-mono font-bold" style={{ color: "rgb(239,68,68)" }}>33 days</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="text-white font-bold">Flow efficiency: 18.5%</span> -- Process time
              7.5 days / Total lead time 40.5 days
            </p>
          </div>

          <Callout accent="rgb(239,68,68)" bg="#0f0606" border="rgba(239,68,68,0.2)">
            <p className="text-sm text-gray-300 leading-relaxed">
              81.5% of the time, work is not moving. It is waiting.
            </p>
          </Callout>
        </section>

        {/* Section 04 */}
        <section className="flex flex-col gap-6">
          <SectionDivider number="04" label="The three improvement levers" />

          <div className="flex flex-col gap-3">
            {[
              {
                title: "Reduce batch size",
                body: "Smaller releases mean shorter wait times at every stage. Deploy daily instead of monthly. Each release carries less change, less risk, and less coordination overhead.",
                accent: "rgb(6,182,212)",
                bg: "#020d0f",
                border: "rgba(6,182,212,0.2)",
              },
              {
                title: "Eliminate handoffs",
                body: "Every handoff adds wait time. Automate or remove steps where work sits idle. A build that triggers automatically on commit eliminates the handoff to the ops team entirely.",
                accent: "rgb(251,146,60)",
                bg: "#0a0700",
                border: "rgba(251,146,60,0.2)",
              },
              {
                title: "Make flow visible",
                body: "You cannot improve what you cannot see. VSM gives you the baseline to measure improvement. Run a mapping session before and after any process change to confirm the impact.",
                accent: "rgb(34,197,94)",
                bg: "#060f06",
                border: "rgba(34,197,94,0.2)",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-2 p-6 border"
                style={{
                  backgroundColor: card.bg,
                  borderColor: card.border,
                  borderLeft: `3px solid ${card.accent}`,
                }}
              >
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: card.accent }}
                >
                  {card.title}
                </span>
                <p className="text-gray-400 text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 05 */}
        <section className="flex flex-col gap-6">
          <SectionDivider number="05" label="Further reading" />

          <div className="flex flex-col gap-3">
            {[
              {
                source: "DevOps Handbook",
                detail: "Chapter 2 -- The First Way: The Principles of Flow. Pages 23-41.",
              },
              {
                source: "The Unicorn Project",
                detail: "The Five Ideals, First Ideal: Locality and Simplicity",
              },
              {
                source: "DORA Research",
                detail: "2023 State of DevOps Report -- Elite performers deploy 127x more frequently than low performers",
              },
            ].map((ref) => (
              <div
                key={ref.source}
                className="flex flex-col gap-1 p-5 border"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)" }}
              >
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: "rgb(156,163,175)" }}
                >
                  {ref.source}
                </span>
                <p className="text-sm text-gray-500 leading-relaxed">{ref.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom navigation */}
        <div className="flex items-center justify-between border-t border-gray-900 pt-8">
          <a
            href="/library"
            className="text-sm font-mono transition-colors hover:text-gray-300"
            style={{ color: "rgb(75,85,99)" }}
          >
            ← Back to library
          </a>
          <a
            href="/library/on-demand-environments"
            className="text-sm font-mono font-bold transition-opacity hover:opacity-70"
            style={{ color: "rgb(6,182,212)" }}
          >
            Next: On-Demand Environments →
          </a>
        </div>

      </div>
    </main>
  )
}
