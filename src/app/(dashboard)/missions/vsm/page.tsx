import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

// ─── VSM Diagram data ─────────────────────────────────────────────────────────

const vsmSteps = [
  {
    n: "01",
    name: "Idee / Ticket",
    team: "Product",
    processTime: "2 dagen",
    waitTime: "5 dagen",
    waitDays: 5,
  },
  {
    n: "02",
    name: "Code Schrijven",
    team: "Dev",
    processTime: "3 dagen",
    waitTime: "1 dag",
    waitDays: 1,
  },
  {
    n: "03",
    name: "Code Review",
    team: "Dev",
    processTime: "4 uur",
    waitTime: "3 dagen",
    waitDays: 3,
  },
  {
    n: "04",
    name: "QA Testing",
    team: "QA (apart team)",
    processTime: "2 dagen",
    waitTime: "5 dagen",
    waitDays: 5,
  },
  {
    n: "05",
    name: "Acceptatie (ACC)",
    team: "Ops",
    processTime: "1 dag",
    waitTime: "8 dagen",
    waitDays: 8,
  },
  {
    n: "06",
    name: "Deploy naar Productie",
    team: "Ops (handmatig)",
    processTime: "4 uur",
    waitTime: "12 dagen",
    waitDays: 12,
  },
];

// ─── Shared header ────────────────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const progress = fase === 1 ? "25%" : "50%";

  return (
    <header
      className="border-b border-gray-800 px-6 py-4"
      style={{ backgroundColor: "#080808" }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span
          className="text-sm font-mono font-bold tracking-widest"
          style={{ color: "rgb(6,182,212)" }}
        >
          M-01
        </span>
        <span
          className="text-sm font-bold tracking-tight text-white"
          style={syne.style}
        >
          Value Stream Mapping
        </span>
        <span className="text-xs font-mono text-gray-600 tracking-widest uppercase">
          Fase {fase} van 4
        </span>
      </div>

      <div className="max-w-5xl mx-auto mt-3">
        <div className="w-full h-px bg-gray-800">
          <div className="h-px" style={{ width: progress, backgroundColor: "rgb(6,182,212)" }} />
        </div>
      </div>
    </header>
  );
}

// ─── Phase 1 ──────────────────────────────────────────────────────────────────

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-14">

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Wat is een Value Stream?
          </h2>
          <p className="text-gray-400 leading-relaxed text-base">
            Een value stream is alles wat nodig is om een idee om te zetten in
            werkende software bij de klant. Van het moment dat een developer
            begint te coderen tot het moment dat de feature live staat. Elke
            stap kost tijd — en niet elke stap voegt waarde toe.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            De twee soorten tijd
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="flex flex-col gap-3 p-6 border"
              style={{ backgroundColor: "#060f06", borderColor: "rgba(34,197,94,0.25)", borderLeft: "3px solid rgb(34,197,94)" }}
            >
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgb(34,197,94)" }}>
                Process Time
              </span>
              <p className="text-white font-medium leading-snug">De tijd dat er écht aan gewerkt wordt</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Een developer schrijft code, een reviewer bekijkt een pull request,
                een pipeline draait tests. Actief werk dat waarde toevoegt.
              </p>
            </div>

            <div
              className="flex flex-col gap-3 p-6 border"
              style={{ backgroundColor: "#0f0606", borderColor: "rgba(239,68,68,0.25)", borderLeft: "3px solid rgb(239,68,68)" }}
            >
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgb(239,68,68)" }}>
                Wait Time
              </span>
              <p className="text-white font-medium leading-snug">De tijd dat het werk wacht op iets of iemand</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Wachten op een review, op een goedkeuring, op een deployment-slot,
                op een ander team. Geen waarde — wel tijd.
              </p>
            </div>
          </div>

          <div className="border border-gray-800 p-5" style={{ backgroundColor: "#090909" }}>
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="text-white font-semibold">
                In de meeste organisaties is 80–90% van de lead time... wachttijd.
              </span>{" "}
              Niet omdat mensen lui zijn, maar omdat het systeem zo is ingericht.
              VSM maakt dat zichtbaar.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">03</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            De vijf vragen van VSM
          </h2>

          <ol className="flex flex-col border border-gray-800">
            {[
              "Wat zijn de stappen van idee naar productie?",
              "Hoelang duurt elke stap?",
              "Hoelang wacht het werk tussen stappen?",
              "Waar zitten de bottlenecks?",
              "Wat kunnen we elimineren of versnellen?",
            ].map((q, i) => (
              <li
                key={i}
                className="flex items-start gap-5 px-6 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#050505" }}
              >
                <span className="text-sm font-mono font-bold shrink-0 w-6 pt-0.5" style={{ color: "rgb(6,182,212)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-gray-300 text-sm leading-relaxed">{q}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <a
            href="?fase=2"
            className="self-start px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
            style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}
          >
            Bekijk de situatie bij Nexus Corp →
          </a>
          <p className="text-xs font-mono text-gray-700">
            Fase 2 van 4 — De huidige waardestroom van Nexus Corp
          </p>
        </div>

      </div>
    </div>
  );
}

// ─── Phase 2 ──────────────────────────────────────────────────────────────────

function Phase2() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">

        {/* Intro */}
        <div className="flex flex-col gap-3 max-w-3xl">
          <h2
            className="text-3xl text-white tracking-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            De huidige waardestroom van Nexus Corp
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Dit is hoe een feature vandaag van idee naar productie gaat. Lees
            elke stap zorgvuldig.
          </p>
        </div>

        {/* VSM Diagram */}
        <div className="flex flex-col gap-2">
          <div className="text-xs font-mono text-gray-700 tracking-widest uppercase mb-2">
            Waardestroom — Nexus Corp
          </div>

          {/* Scrollable horizontal flow */}
          <div className="overflow-x-auto pb-4">
            <div className="flex items-stretch gap-0 min-w-max">
              {vsmSteps.map((step, i) => (
                <div key={step.n} className="flex items-center">
                  {/* Step card */}
                  <div
                    className="flex flex-col gap-3 p-4 w-44 h-full border"
                    style={{
                      backgroundColor: step.waitDays > 5 ? "#0f0606" : "#080808",
                      borderColor: step.waitDays > 5 ? "rgba(239,68,68,0.3)" : "rgb(31,41,55)",
                      borderTop: step.waitDays > 5 ? "2px solid rgb(239,68,68)" : "2px solid rgb(31,41,55)",
                    }}
                  >
                    {/* Card header */}
                    <div className="flex items-start justify-between gap-1">
                      <span
                        className="text-xs font-mono font-bold"
                        style={{ color: "rgb(6,182,212)" }}
                      >
                        {step.n}
                      </span>
                      <span className="text-xs text-gray-600 text-right leading-tight">
                        {step.team}
                      </span>
                    </div>

                    {/* Step name */}
                    <p className="text-white text-sm font-semibold leading-snug">
                      {step.name}
                    </p>

                    {/* Times */}
                    <div className="flex flex-col gap-1.5 mt-auto">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-600">PT</span>
                        <span className="text-xs font-mono font-medium" style={{ color: "rgb(34,197,94)" }}>
                          {step.processTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-gray-600">WT</span>
                        <span className="text-xs font-mono font-medium" style={{ color: "rgb(239,68,68)" }}>
                          {step.waitTime}
                        </span>
                      </div>
                    </div>

                    {/* Bottleneck badge */}
                    {step.waitDays > 5 && (
                      <div
                        className="text-xs font-mono px-2 py-1 text-center tracking-widest"
                        style={{
                          backgroundColor: "rgba(239,68,68,0.1)",
                          color: "rgb(239,68,68)",
                          border: "1px solid rgba(239,68,68,0.3)",
                        }}
                      >
                        ⚠ BOTTLENECK
                      </div>
                    )}
                  </div>

                  {/* Arrow connector */}
                  {i < vsmSteps.length - 1 && (
                    <div
                      className="flex items-center justify-center w-7 shrink-0 text-sm font-mono"
                      style={{ color: "rgba(6,182,212,0.4)" }}
                    >
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-1">
            <span className="text-xs text-gray-700 font-mono">
              PT = Process Time &nbsp;·&nbsp; WT = Wait Time
            </span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-px" style={{ backgroundColor: "rgb(239,68,68)" }} />
              <span className="text-xs text-gray-700 font-mono">Bottleneck (WT &gt; 5 dagen)</span>
            </div>
          </div>
        </div>

        {/* Summary totals */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
          <div
            className="flex-1 flex flex-col gap-2 p-5 border"
            style={{ backgroundColor: "#060f06", borderColor: "rgba(34,197,94,0.2)", borderLeft: "3px solid rgb(34,197,94)" }}
          >
            <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
              Totale Process Time
            </span>
            <p
              className="text-3xl font-mono font-bold"
              style={{ ...syne.style, color: "rgb(34,197,94)" }}
            >
              ~8.5 dagen
            </p>
            <p className="text-xs text-gray-600">Actief werk over alle stappen</p>
          </div>

          <div
            className="flex-1 flex flex-col gap-2 p-5 border"
            style={{ backgroundColor: "#0f0606", borderColor: "rgba(239,68,68,0.2)", borderLeft: "3px solid rgb(239,68,68)" }}
          >
            <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
              Totale Wait Time
            </span>
            <p
              className="text-3xl font-mono font-bold"
              style={{ ...syne.style, color: "rgb(239,68,68)" }}
            >
              ~34 dagen
            </p>
            <p className="text-xs text-gray-600">Wachten, blokkades, handoffs</p>
          </div>
        </div>

        {/* Callout */}
        <div
          className="max-w-2xl border p-6"
          style={{ backgroundColor: "#0a0808", borderColor: "rgba(239,68,68,0.2)" }}
        >
          <p className="text-gray-300 leading-relaxed">
            <span className="text-white font-semibold">
              De totale lead time is ~43 dagen.
            </span>{" "}
            Slechts 20% van die tijd wordt er écht aan gewerkt. De overige 80%
            is wachttijd — verborgen waste die zichtbaar wordt door VSM.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <a
            href="?fase=3"
            className="self-start px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
            style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}
          >
            Analyseer de bottlenecks →
          </a>
          <p className="text-xs font-mono text-gray-700">
            Fase 3 van 4 — Bottleneck analyse en verbeterplan
          </p>
        </div>

      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function VSMPage({
  searchParams,
}: {
  searchParams: Promise<{ fase?: string }>;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const { fase: faseParam } = await searchParams;
  const fase = faseParam === "2" ? 2 : 1;

  return (
    <main className="min-h-screen text-gray-100 flex flex-col" style={{ backgroundColor: "#000" }}>
      <MissionHeader fase={fase} />
      {fase === 1 ? <Phase1 /> : <Phase2 />}
    </main>
  );
}
