import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  { name: "Idea / Ticket",        pt: "2 days",  wt: "5 days",  wtDays: 5  },
  { name: "Write Code",           pt: "3 days",  wt: "3 days",  wtDays: 3  },
  { name: "Code Review",          pt: "4 hours", wt: "1 day",   wtDays: 1  },
  { name: "QA Testing",           pt: "2 days",  wt: "5 days",  wtDays: 5  },
  { name: "Acceptance (ACC)",     pt: "1 day",   wt: "8 days",  wtDays: 8  },
  { name: "Deploy to Production", pt: "4 hours", wt: "12 days", wtDays: 12 },
];

const insights = [
  {
    label: "Biggest bottleneck",
    accent: "rgb(239,68,68)",
    accentBg: "rgba(239,68,68,0.06)",
    accentBorder: "rgba(239,68,68,0.25)",
    body: "Deploy to Production has 12 days of wait time. The cause: manual deploys, scheduled on one fixed day per month.",
  },
  {
    label: "Hidden waste",
    accent: "rgb(251,146,60)",
    accentBg: "rgba(251,146,60,0.06)",
    accentBorder: "rgba(251,146,60,0.25)",
    body: "80% of the lead time is wait time. Not due to lack of capacity - but due to handoffs, silos, and lack of automation.",
  },
  {
    label: "Root cause",
    accent: "rgb(167,139,250)",
    accentBg: "rgba(167,139,250,0.06)",
    accentBorder: "rgba(167,139,250,0.25)",
    body: "Dev, QA, and Ops work sequentially and independently. Every handoff costs days. This is what Team Topologies calls a 'stream-aligned team' problem.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function Fase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* ── Section 1: Mission Complete ──────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(6,182,212)" }}>
            Mission Complete - M-01
          </p>
          <h1
            className="text-5xl text-white tracking-tight leading-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Your VSM Analysis
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            This is what you uncovered at Nexus Corp.
          </p>
        </div>

        {/* ── Section 2: Value stream flow ─────────────────────────────────── */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              The complete value stream
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          {/* Scrollable flow */}
          <div className="overflow-x-auto pb-2">
            <div className="flex items-stretch gap-0 min-w-max">
              {steps.map((s, i) => {
                const isBottleneck = s.wtDays > 5;
                return (
                  <div key={s.name} className="flex items-center">
                    <div
                      className="flex flex-col gap-2 p-4 w-40 border"
                      style={{
                        backgroundColor: isBottleneck ? "#0f0606" : "#080808",
                        borderColor: isBottleneck ? "rgba(239,68,68,0.35)" : "rgb(31,41,55)",
                        borderTop: isBottleneck
                          ? "2px solid rgb(239,68,68)"
                          : "2px solid rgb(31,41,55)",
                      }}
                    >
                      <p className="text-white text-xs font-semibold leading-snug">{s.name}</p>
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-gray-700">PT</span>
                          <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>
                            {s.pt}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono text-gray-700">WT</span>
                          <span className="text-xs font-mono" style={{ color: "rgb(239,68,68)" }}>
                            {s.wt}
                          </span>
                        </div>
                      </div>
                      {isBottleneck && (
                        <span
                          className="text-xs font-mono text-center py-0.5 mt-1"
                          style={{
                            color: "rgb(239,68,68)",
                            backgroundColor: "rgba(239,68,68,0.08)",
                            border: "1px solid rgba(239,68,68,0.25)",
                          }}
                        >
                          ⚠ BOTTLENECK
                        </span>
                      )}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="w-6 text-center text-sm font-mono shrink-0"
                        style={{ color: "rgba(6,182,212,0.4)" }}
                      >
                        →
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary bar */}
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-2 border px-5 py-3"
            style={{ backgroundColor: "#090909", borderColor: "rgb(31,41,55)" }}
          >
            <span className="text-xs font-mono text-gray-500">
              Total lead time:{" "}
              <span className="text-white font-bold">~43 days</span>
            </span>
            <span className="text-xs font-mono text-gray-700">-</span>
            <span className="text-xs font-mono text-gray-500">
              Process Time:{" "}
              <span className="font-bold" style={{ color: "rgb(34,197,94)" }}>~9 days (21%)</span>
            </span>
            <span className="text-xs font-mono text-gray-700">-</span>
            <span className="text-xs font-mono text-gray-500">
              Wait Time:{" "}
              <span className="font-bold" style={{ color: "rgb(239,68,68)" }}>~34 days (79%)</span>
            </span>
          </div>
        </section>

        {/* ── Section 3: Findings ───────────────────────────────────────────── */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              Your findings
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((ins) => (
              <div
                key={ins.label}
                className="flex flex-col gap-3 p-6 border"
                style={{
                  backgroundColor: ins.accentBg,
                  borderColor: ins.accentBorder,
                  borderLeft: `3px solid ${ins.accent}`,
                }}
              >
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: ins.accent }}
                >
                  {ins.label}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">{ins.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: DORA Impact ────────────────────────────────────────── */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">03</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              Your impact on Nexus Corp
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border p-6"
            style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)" }}
          >
            {/* Metric label */}
            <div className="flex flex-col gap-1 shrink-0">
              <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                Deployment Frequency
              </span>
              <span className="text-xs font-mono text-gray-700">DORA - DF</span>
            </div>

            <div className="w-px h-10 bg-gray-800 hidden sm:block" />

            {/* Before → After */}
            <div className="flex items-center gap-5">
              <div className="flex flex-col gap-1 text-center">
                <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                  Before
                </span>
                <span
                  className="text-2xl font-mono font-bold"
                  style={{ ...syne.style, color: "rgb(239,68,68)" }}
                >
                  1× per month
                </span>
              </div>

              <span className="text-xl font-mono text-gray-700">→</span>

              <div className="flex flex-col gap-1 text-center">
                <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                  After
                </span>
                <span
                  className="text-2xl font-mono font-bold"
                  style={{ ...syne.style, color: "rgb(6,182,212)" }}
                >
                  2× per month
                </span>
              </div>
            </div>

            <div className="w-px h-10 bg-gray-800 hidden sm:block" />

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              By making the bottlenecks visible, you&apos;ve taken the first step.
              Nexus Corp can now improve in a targeted way.
            </p>
          </div>
        </section>

        {/* ── Section 5: CTA ───────────────────────────────────────────────── */}
        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/dashboard"
              className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}
            >
              Back to dashboard →
            </a>

            <a
              href="/missions/environments"
              className="flex items-center gap-3 px-8 py-4 text-sm font-mono border transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "#0a0a0a",
                borderColor: "rgba(6,182,212,0.3)",
                color: "rgb(6,182,212)",
              }}
            >
              View next mission: On-Demand Environments →
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
