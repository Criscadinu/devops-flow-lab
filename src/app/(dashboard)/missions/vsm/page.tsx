import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Syne } from "next/font/google";
import { Fase3 } from "./Fase3";
import { Fase4 } from "./Fase4";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`;
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>
          M-01
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Value Stream Mapping
        </span>
        <span className="text-xs font-mono text-gray-600 tracking-widest uppercase">
          Fase {fase} van 4
        </span>
      </div>
      <div className="max-w-5xl mx-auto mt-3">
        <div className="w-full h-px bg-gray-800">
          <div className="h-px transition-all" style={{ width: pct, backgroundColor: "rgb(6,182,212)" }} />
        </div>
      </div>
    </header>
  );
}

// ─── Shared: CTA row ─────────────────────────────────────────────────────────

function CTA({ href, label, sub }: { href: string; label: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-3 border-t border-gray-900 pt-10">
      <a
        href={href}
        className="self-start px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
        style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}
      >
        {label}
      </a>
      {sub && <p className="text-xs font-mono text-gray-700">{sub}</p>}
    </div>
  );
}

// ─── Phase 1 — De situatie bij Nexus Corp ────────────────────────────────────

const panels = [
  {
    initials: "SM",
    name: "Sarah",
    role: "Engineering Manager",
    badge: "MANAGEMENT",
    accent: "rgb(6,182,212)",
    badgeBg: "rgba(6,182,212,0.08)",
    badgeBorder: "rgba(6,182,212,0.3)",
    quote: (
      <>
        "Welkom. We deployen één keer per maand. Een feature duurt gemiddeld{" "}
        <mark>6 weken</mark> van idee tot productie. Ik weet niet waar de tijd
        naartoe gaat — maar de druk van boven wordt groter."
      </>
    ),
  },
  {
    initials: "TO",
    name: "Tom",
    role: "Product Owner",
    badge: "PRODUCT",
    accent: "rgb(167,139,250)",
    badgeBg: "rgba(167,139,250,0.08)",
    badgeBorder: "rgba(167,139,250,0.3)",
    quote: (
      <>
        "Een ticket staat gemiddeld <mark>5 dagen</mark> in de backlog voor een
        developer het oppakt. Ik schrijf gedetailleerde specs — dat kost me{" "}
        <mark>2 dagen</mark> per feature."
      </>
    ),
  },
  {
    initials: "LI",
    name: "Lisa",
    role: "Developer",
    badge: "DEV",
    accent: "rgb(34,197,94)",
    badgeBg: "rgba(34,197,94,0.08)",
    badgeBorder: "rgba(34,197,94,0.3)",
    quote: (
      <>
        "Code schrijven duurt <mark>3 dagen</mark>. Maar daarna wacht ik
        gemiddeld <mark>3 dagen</mark> op een code review. De review zelf duurt{" "}
        <mark>4 uur</mark>. En dan wacht het nog <mark>1 dag</mark> voor QA
        het oppakt."
      </>
    ),
  },
  {
    initials: "KA",
    name: "Kai",
    role: "QA Engineer",
    badge: "QA",
    accent: "rgb(251,146,60)",
    badgeBg: "rgba(251,146,60,0.08)",
    badgeBorder: "rgba(251,146,60,0.3)",
    quote: (
      <>
        "Wij krijgen alles tegelijk aan het einde van de sprint. Testen duurt{" "}
        <mark>2 dagen</mark>, maar we wachten gemiddeld <mark>5 dagen</mark>{" "}
        voor we kunnen beginnen — de testomgeving is bezet of niet stabiel."
      </>
    ),
  },
  {
    initials: "MA",
    name: "Marco",
    role: "Ops Engineer",
    badge: "OPS",
    accent: "rgb(239,68,68)",
    badgeBg: "rgba(239,68,68,0.08)",
    badgeBorder: "rgba(239,68,68,0.3)",
    quote: (
      <>
        "Acceptatietest in ACC duurt <mark>1 dag</mark>. Maar deployment naar
        ACC? Gemiddeld <mark>8 dagen</mark> wachten — moet ingepland worden.
        Deploy naar productie is handmatig, duurt <mark>4 uur</mark>, staat
        vast op de laatste vrijdag — gemiddeld <mark>12 dagen</mark> wachttijd."
      </>
    ),
  },
  {
    initials: "JIJ",
    name: "Jij",
    role: "New Engineer",
    badge: "SPELER",
    accent: "rgb(6,182,212)",
    badgeBg: "rgba(6,182,212,0.08)",
    badgeBorder: "rgba(6,182,212,0.3)",
    isPlayer: true,
    quote: (
      <>
        "Je hebt alles gehoord. De frustratie is voelbaar. Maar jij ziet het
        patroon. Dit is geen mensen-probleem. Dit is een systeem-probleem."
      </>
    ),
    outro: "Tijd om de waardestroom in kaart te brengen.",
  },
];

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">

        {/* Intro */}
        <div className="flex flex-col gap-3 max-w-2xl">
          <h2
            className="text-4xl text-white tracking-tight leading-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Dag één. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Luister goed. Alle informatie die je nodig hebt zit in deze gesprekken.
          </p>
        </div>

        {/* Comic panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {panels.map((p) => (
            <div
              key={p.initials}
              className="flex flex-col gap-0 overflow-hidden"
              style={{
                backgroundColor: "#0a0a0a",
                border: "1px solid #222",
                borderLeft: `3px solid ${p.accent}`,
              }}
            >
              {/* Panel header */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "#1a1a1a", backgroundColor: "#0d0d0d" }}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="w-9 h-9 flex items-center justify-center text-xs font-mono font-bold shrink-0"
                    style={{
                      backgroundColor: `${p.accent}18`,
                      border: `1px solid ${p.accent}40`,
                      color: p.accent,
                    }}
                  >
                    {p.initials}
                  </div>
                  <div className="flex flex-col gap-0">
                    <span className="text-white text-sm font-semibold leading-tight">
                      {p.name}
                    </span>
                    <span className="text-gray-600 text-xs">{p.role}</span>
                  </div>
                </div>

                {/* Role badge */}
                <span
                  className="text-xs font-mono px-2 py-0.5 tracking-widest"
                  style={{
                    color: p.accent,
                    backgroundColor: p.badgeBg,
                    border: `1px solid ${p.badgeBorder}`,
                  }}
                >
                  {p.badge}
                </span>
              </div>

              {/* Quote */}
              <div className="px-5 py-4 flex flex-col gap-3">
                <p
                  className="text-gray-300 text-sm leading-relaxed"
                  style={{
                    // Inline <mark> rendered as cyan mono via global style below
                  }}
                >
                  {p.quote}
                </p>

                {/* Player outro */}
                {"outro" in p && p.outro && (
                  <p
                    className="text-white font-bold text-sm border-t pt-3"
                    style={{ borderColor: "#1a1a1a" }}
                  >
                    {p.outro}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <CTA
          href="?fase=2"
          label="Begrijp de theorie →"
          sub="Fase 2 van 4 — Wat is een value stream?"
        />
      </div>

      {/* Mark styling */}
      <style>{`
        mark {
          background: none;
          color: rgb(6,182,212);
          font-family: monospace;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

// ─── Phase 2 — De theorie ─────────────────────────────────────────────────────

function Phase2() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-14">

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">01</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Wat is een Value Stream?
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Een value stream is alles wat nodig is om een idee om te zetten in werkende
            software bij de klant. Van het moment dat een developer begint te coderen tot
            het moment dat de feature live staat. Elke stap kost tijd — en niet elke stap
            voegt waarde toe.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
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
              <p className="text-white font-medium">De tijd dat er écht aan gewerkt wordt</p>
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
              <p className="text-white font-medium">De tijd dat het werk wacht op iets of iemand</p>
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
            <span className="text-xs font-mono text-gray-700 tracking-widest">03</span>
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

        <CTA
          href="?fase=3"
          label="Breng de waardestroom in kaart →"
          sub="Fase 3 van 4 — Doe het zelf"
        />
      </div>
    </div>
  );
}

// ─── Phase 3 — Interactive exercise ──────────────────────────────────────────

function Phase3() {
  return <Fase3 />;
}

// ─── Phase 4 — Mission complete ───────────────────────────────────────────────

function Phase4() {
  return <Fase4 />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function VSMPage({
  searchParams,
}: {
  searchParams: Promise<{ fase?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");

  const { fase: faseParam } = await searchParams;
  const fase = ["1", "2", "3", "4"].includes(faseParam ?? "") ? Number(faseParam) : 1;

  return (
    <main className="min-h-screen text-gray-100 flex flex-col" style={{ backgroundColor: "#000" }}>
      <MissionHeader fase={fase} />
      {fase === 1 && <Phase1 />}
      {fase === 2 && <Phase2 />}
      {fase === 3 && <Phase3 />}
      {fase === 4 && <Phase4 />}
    </main>
  );
}
