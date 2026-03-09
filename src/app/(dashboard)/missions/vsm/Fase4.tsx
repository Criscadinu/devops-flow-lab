import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  { name: "Idee / Ticket",         pt: "2 dagen", wt: "5 dagen",  wtDays: 5  },
  { name: "Code Schrijven",        pt: "3 dagen", wt: "3 dagen",  wtDays: 3  },
  { name: "Code Review",           pt: "4 uur",   wt: "1 dag",    wtDays: 1  },
  { name: "QA Testing",            pt: "2 dagen", wt: "5 dagen",  wtDays: 5  },
  { name: "Acceptatie (ACC)",      pt: "1 dag",   wt: "8 dagen",  wtDays: 8  },
  { name: "Deploy naar Productie", pt: "4 uur",   wt: "12 dagen", wtDays: 12 },
];

const insights = [
  {
    label: "Grootste bottleneck",
    accent: "rgb(239,68,68)",
    accentBg: "rgba(239,68,68,0.06)",
    accentBorder: "rgba(239,68,68,0.25)",
    body: "Deploy naar Productie heeft 12 dagen wachttijd. De oorzaak: handmatige deploys, ingepland op één vaste dag per maand.",
  },
  {
    label: "Verborgen waste",
    accent: "rgb(251,146,60)",
    accentBg: "rgba(251,146,60,0.06)",
    accentBorder: "rgba(251,146,60,0.25)",
    body: "80% van de lead time is wachttijd. Niet door gebrek aan capaciteit — maar door handoffs, silo's en gebrek aan automatisering.",
  },
  {
    label: "Root cause",
    accent: "rgb(167,139,250)",
    accentBg: "rgba(167,139,250,0.06)",
    accentBorder: "rgba(167,139,250,0.25)",
    body: "Dev, QA en Ops werken sequentieel en onafhankelijk. Elke overdracht kost dagen. Dit is wat Team Topologies een 'stream-aligned team' probleem noemt.",
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
            Missie Voltooid — M-01
          </p>
          <h1
            className="text-5xl text-white tracking-tight leading-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Jouw VSM Analyse
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            Dit is wat jij hebt blootgelegd bij Nexus Corp.
          </p>
        </div>

        {/* ── Section 2: Waardestroom flow ─────────────────────────────────── */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              De volledige waardestroom
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
              Totale lead time:{" "}
              <span className="text-white font-bold">~43 dagen</span>
            </span>
            <span className="text-xs font-mono text-gray-700">—</span>
            <span className="text-xs font-mono text-gray-500">
              Process Time:{" "}
              <span className="font-bold" style={{ color: "rgb(34,197,94)" }}>~9 dagen (21%)</span>
            </span>
            <span className="text-xs font-mono text-gray-700">—</span>
            <span className="text-xs font-mono text-gray-500">
              Wait Time:{" "}
              <span className="font-bold" style={{ color: "rgb(239,68,68)" }}>~34 dagen (79%)</span>
            </span>
          </div>
        </section>

        {/* ── Section 3: Bevindingen ────────────────────────────────────────── */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              Jouw bevindingen
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
              Jouw impact op Nexus Corp
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
              <span className="text-xs font-mono text-gray-700">DORA — DF</span>
            </div>

            <div className="w-px h-10 bg-gray-800 hidden sm:block" />

            {/* Before → After */}
            <div className="flex items-center gap-5">
              <div className="flex flex-col gap-1 text-center">
                <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                  Voor
                </span>
                <span
                  className="text-2xl font-mono font-bold"
                  style={{ ...syne.style, color: "rgb(239,68,68)" }}
                >
                  1× per maand
                </span>
              </div>

              <span className="text-xl font-mono text-gray-700">→</span>

              <div className="flex flex-col gap-1 text-center">
                <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                  Na
                </span>
                <span
                  className="text-2xl font-mono font-bold"
                  style={{ ...syne.style, color: "rgb(6,182,212)" }}
                >
                  2× per maand
                </span>
              </div>
            </div>

            <div className="w-px h-10 bg-gray-800 hidden sm:block" />

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Door de bottlenecks zichtbaar te maken heb je de eerste stap gezet.
              Nexus Corp kan nu gericht verbeteren.
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
              Terug naar dashboard →
            </a>

            <span
              className="flex items-center gap-3 px-8 py-4 text-sm font-mono border cursor-not-allowed"
              style={{
                backgroundColor: "#0a0a0a",
                borderColor: "rgb(31,41,55)",
                color: "rgb(55,65,81)",
              }}
              title="Nog niet beschikbaar"
            >
              <span>⊘</span>
              Bekijk volgende missie: WIP Wars →
            </span>
          </div>
          <p className="text-xs font-mono text-gray-800">
            M-02 wordt ontgrendeld na voltooiing van M-01.
          </p>
        </section>

      </div>
    </div>
  );
}
