

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
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "var(--af-orange)" }}>
            Mission Complete - M-01
          </p>
          <h1
            className="text-5xl text-gray-900 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}
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
                      <p className="text-gray-900 text-xs font-semibold leading-snug">{s.name}</p>
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
                        style={{ color: "rgba(255,85,0,0.4)" }}
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
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <span className="text-xs font-mono text-gray-500">
              Total lead time:{" "}
              <span className="text-gray-900 font-bold">~43 days</span>
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
                <p className="text-gray-600 text-sm leading-relaxed">{ins.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: DORA Baseline ─────────────────────────────────────── */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">03</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              Nexus Corp baseline
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div
            className="flex flex-col gap-4 p-6 border"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "rgba(239,68,68,0.2)",
              borderLeft: "3px solid rgb(239,68,68)",
            }}
          >
            <p className="text-sm text-gray-400 leading-relaxed">
              This is where Nexus Corp stands today. You have made the invisible visible.
              The next missions will fix it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { metric: "Deployment Frequency", code: "DF",   value: "1× per month", note: "manual deploys, one fixed day per month" },
              { metric: "Lead Time for Changes", code: "LT",   value: "43 days",      note: "7.5 days of work hidden in 34 days of waiting" },
              { metric: "Change Failure Rate",   code: "CFR",  value: "42%",          note: "no tests, no gates — anything can ship" },
              { metric: "Mean Time to Restore",  code: "MTTR", value: "72 hours",     note: "no runbook, no monitoring, no process" },
            ].map((d) => (
              <div
                key={d.code}
                className="flex flex-col gap-4 border p-6"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "rgba(239,68,68,0.2)",
                  borderLeft: "3px solid rgba(239,68,68,0.5)",
                }}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{d.metric}</span>
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                </div>
                <span
                  className="text-2xl font-mono font-bold"
                  style={{ fontFamily: "var(--font-heading)", color: "rgb(239,68,68)" }}
                >
                  {d.value}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-mono font-bold px-1.5 py-0.5 uppercase tracking-widest"
                    style={{
                      color: "rgb(239,68,68)",
                      backgroundColor: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.25)",
                    }}
                  >
                    BASELINE
                  </span>
                </div>
                <p className="text-xs font-mono text-gray-600">{d.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 5: CTA ───────────────────────────────────────────────── */}
        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/dashboard"
              className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}
            >
              Back to dashboard →
            </a>

            <a
              href="/missions/environments"
              className="flex items-center gap-3 px-8 py-4 text-sm font-mono border transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "rgba(255,85,0,0.3)",
                color: "var(--af-orange)",
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
