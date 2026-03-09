import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

export default async function VSMPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  return (
    <main
      className="min-h-screen text-gray-100 flex flex-col"
      style={{ backgroundColor: "#000" }}
    >
      {/* ── Mission header bar ──────────────────────────────────────────────── */}
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
            Fase 1 van 4
          </span>
        </div>

        {/* Progress bar */}
        <div className="max-w-5xl mx-auto mt-3">
          <div className="w-full h-px bg-gray-800">
            <div
              className="h-px"
              style={{
                width: "25%",
                backgroundColor: "rgb(6,182,212)",
              }}
            />
          </div>
        </div>
      </header>

      {/* ── Briefing content ────────────────────────────────────────────────── */}
      <div className="flex-1 px-6 py-14">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          {/* Section 1 — Wat is een Value Stream? */}
          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span
                className="text-xs font-mono text-gray-700 tracking-widest uppercase"
              >
                01
              </span>
              <div className="flex-1 h-px bg-gray-900" />
            </div>
            <h2
              className="text-3xl text-white tracking-tight"
              style={{ ...syne.style, fontWeight: 800 }}
            >
              Wat is een Value Stream?
            </h2>
            <p className="text-gray-400 leading-relaxed text-base">
              Een value stream is alles wat nodig is om een idee om te zetten in
              werkende software bij de klant. Van het moment dat een developer
              begint te coderen tot het moment dat de feature live staat. Elke
              stap kost tijd — en niet elke stap voegt waarde toe.
            </p>
          </section>

          {/* Section 2 — De twee soorten tijd */}
          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">
                02
              </span>
              <div className="flex-1 h-px bg-gray-900" />
            </div>
            <h2
              className="text-3xl text-white tracking-tight"
              style={{ ...syne.style, fontWeight: 800 }}
            >
              De twee soorten tijd
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Process Time */}
              <div
                className="flex flex-col gap-3 p-6 border"
                style={{
                  backgroundColor: "#060f06",
                  borderColor: "rgba(34,197,94,0.25)",
                  borderLeft: "3px solid rgb(34,197,94)",
                }}
              >
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: "rgb(34,197,94)" }}
                >
                  Process Time
                </span>
                <p className="text-white font-medium leading-snug">
                  De tijd dat er écht aan gewerkt wordt
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Een developer schrijft code, een reviewer bekijkt een pull
                  request, een pipeline draait tests. Actief werk dat waarde
                  toevoegt.
                </p>
              </div>

              {/* Wait Time */}
              <div
                className="flex flex-col gap-3 p-6 border"
                style={{
                  backgroundColor: "#0f0606",
                  borderColor: "rgba(239,68,68,0.25)",
                  borderLeft: "3px solid rgb(239,68,68)",
                }}
              >
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: "rgb(239,68,68)" }}
                >
                  Wait Time
                </span>
                <p className="text-white font-medium leading-snug">
                  De tijd dat het werk wacht op iets of iemand
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Wachten op een review, op een goedkeuring, op een
                  deployment-slot, op een ander team. Geen waarde — wel tijd.
                </p>
              </div>
            </div>

            <div
              className="border border-gray-800 p-5"
              style={{ backgroundColor: "#090909" }}
            >
              <p className="text-gray-300 text-sm leading-relaxed">
                <span className="text-white font-semibold">
                  In de meeste organisaties is 80–90% van de lead time...
                  wachttijd.
                </span>{" "}
                Niet omdat mensen lui zijn, maar omdat het systeem zo is
                ingericht. VSM maakt dat zichtbaar.
              </p>
            </div>
          </section>

          {/* Section 3 — De vijf vragen van VSM */}
          <section className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">
                03
              </span>
              <div className="flex-1 h-px bg-gray-900" />
            </div>
            <h2
              className="text-3xl text-white tracking-tight"
              style={{ ...syne.style, fontWeight: 800 }}
            >
              De vijf vragen van VSM
            </h2>

            <ol className="flex flex-col gap-0 border border-gray-800">
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
                  <span
                    className="text-sm font-mono font-bold shrink-0 w-6 pt-0.5"
                    style={{ color: "rgb(6,182,212)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-gray-300 text-sm leading-relaxed">{q}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* ── CTA ─────────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-4 border-t border-gray-900 pt-10">
            <a
              href="?fase=2"
              className="self-start flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{
                backgroundColor: "rgb(6,182,212)",
                color: "#000",
                ...syne.style,
                fontWeight: 700,
              }}
            >
              Bekijk de situatie bij Nexus Corp →
            </a>
            <p className="text-xs font-mono text-gray-700">
              Fase 2 van 4 — De huidige waardestroom van Nexus Corp
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
