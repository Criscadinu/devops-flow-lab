import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

// Shared heading style helper
const H = syne.style;

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <>
      <style>{`
        @keyframes gridDrift {
          0%   { background-position: 0 0; }
          100% { background-position: 48px 48px; }
        }
        .hero-grid {
          background-image:
            linear-gradient(rgba(0,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.035) 1px, transparent 1px);
          background-size: 48px 48px;
          animation: gridDrift 14s linear infinite;
        }
      `}</style>

      <section
        className="hero-grid relative pt-32 pb-36 px-6 overflow-hidden"
        style={{ backgroundColor: "#000" }}
      >
        {/* Central glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-end justify-center pb-0"
        >
          <div className="w-[900px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
        </div>

        {/* Top-left corner accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 w-64 h-64 border-r border-b border-cyan-900/40"
        />
        {/* Bottom-right corner accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 w-64 h-64 border-l border-t border-cyan-900/40"
        />

        <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-10">
          <div className="inline-flex items-center gap-2 border border-cyan-800/70 text-cyan-400 text-xs font-mono uppercase tracking-widest px-4 py-2"
            style={{ backgroundColor: "rgba(0,255,255,0.04)" }}>
            ▸ Hands-on DevOps leren
          </div>

          <h1
            className="text-6xl sm:text-7xl text-white leading-[1.05] tracking-tighter"
            style={{ ...H, fontWeight: 800 }}
          >
            Lezen over DevOps<br />
            <span className="text-cyan-400">is niet hetzelfde</span><br />
            als het voelen.
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            DevOps Flow Lab zet de theorie uit The DevOps Handbook, The Unicorn Project en DORA-onderzoek
            om in echte missies. Je leert door te doen — niet door te lezen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/api/auth/signin"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 transition-colors text-sm tracking-wide"
            >
              Start gratis →
            </a>
            <a
              href="#hoe-het-werkt"
              className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium px-8 py-4 transition-colors text-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              Bekijk hoe het werkt
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Voor wie? ────────────────────────────────────────────────────────────────

const audiences = [
  {
    role: "Engineers",
    headline: "Bouw echte pipelines",
    body: "Geen tutorials met nep-repos. Je werkt aan een fictief maar realistisch bedrijf, met legacy code, silo's en druk van bovenaf. Precies zoals het echt voelt.",
    accent: "text-cyan-400",
    borderLeft: "4px solid rgb(6 182 212)",
  },
  {
    role: "Managers",
    headline: "Begrijp wat je team nodig heeft",
    body: "Je hoeft niet zelf te deployen om te snappen waarom batch size ertoe doet, wat WIP-limieten oplossen en waarom DORA-metrics meer zeggen dan velocity.",
    accent: "text-violet-400",
    borderLeft: "4px solid rgb(167 139 250)",
  },
  {
    role: "Coaches & Trainers",
    headline: "Gebruik het naast je training",
    body: "Geef deelnemers iets om op terug te vallen na de training. Missies die de concepten uit jouw workshop verankeren — met meetbare voortgang.",
    accent: "text-emerald-400",
    borderLeft: "4px solid rgb(52 211 153)",
  },
];

function AudienceSection() {
  return (
    <section className="py-24 px-6 border-t border-gray-900" style={{ backgroundColor: "#050d1a" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-600 mb-3 text-center font-mono">
          Voor wie?
        </p>
        <h2
          className="text-4xl text-white text-center mb-14 tracking-tight"
          style={{ ...H, fontWeight: 800 }}
        >
          Voor iedereen die DevOps écht wil begrijpen.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800">
          {audiences.map((a) => (
            <div
              key={a.role}
              className="p-8 flex flex-col gap-4"
              style={{ backgroundColor: "#050d1a", borderLeft: a.borderLeft }}
            >
              <span className={`text-xs font-bold uppercase tracking-widest font-mono ${a.accent}`}>
                {a.role}
              </span>
              <h3 className="text-xl font-bold text-white">{a.headline}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Hoe het werkt ────────────────────────────────────────────────────────────

const steps = [
  {
    n: "01",
    title: "Je treedt in dienst bij Nexus Corp",
    body: "Een fictief bedrijf met echte problemen. Lange deploymenttijden, silo's tussen dev en ops, handmatige processen en managers die cijfers willen zien. Jij bent de nieuwe engineer.",
  },
  {
    n: "02",
    title: "Je doorloopt missies op basis van de vakliteratuur",
    body: "Elke missie is geworteld in The DevOps Handbook, DORA-onderzoek of Team Topologies. Je speelt situaties na uit de boeken — maar dan als deelnemer, niet als lezer.",
  },
  {
    n: "03",
    title: "Je ziet je impact in echte DORA-metrics",
    body: "Deployment frequency, lead time, MTTR, change failure rate — ze bewegen mee terwijl jij keuzes maakt. Je leert direct waarom bepaalde beslissingen de flow versnellen of blokkeren.",
  },
];

function HowItWorks() {
  return (
    <section id="hoe-het-werkt" className="py-24 px-6 border-t border-gray-900" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-600 mb-3 text-center font-mono">
          Hoe het werkt
        </p>
        <h2
          className="text-4xl text-white text-center mb-16 tracking-tight"
          style={{ ...H, fontWeight: 800 }}
        >
          Drie stappen. Eén verhaal.
        </h2>

        <div className="flex flex-col">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="flex gap-8 border-t border-gray-800 py-10 first:border-t-0"
            >
              <span
                className="text-5xl font-mono font-bold text-gray-800 shrink-0 w-16 leading-none pt-1"
                aria-hidden
              >
                {s.n}
              </span>
              <div>
                <h3
                  className="text-xl text-white mb-3"
                  style={{ ...H, fontWeight: 700 }}
                >
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xl">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DORA Metrics ─────────────────────────────────────────────────────────────

const doraMetrics = [
  {
    metric: "Deployment Frequency",
    label: "DF",
    nexusCorp: "1× per maand",
    target: "Meerdere keren per dag",
    description: "Hoe vaak deployt het team naar productie?",
  },
  {
    metric: "Lead Time for Changes",
    label: "LT",
    nexusCorp: "3–6 weken",
    target: "Minder dan een dag",
    description: "Hoe lang duurt het van commit tot productie?",
  },
  {
    metric: "Change Failure Rate",
    label: "CFR",
    nexusCorp: "42%",
    target: "Onder de 15%",
    description: "Welk percentage changes veroorzaakt een incident?",
  },
  {
    metric: "Mean Time to Restore",
    label: "MTTR",
    nexusCorp: "72 uur",
    target: "Minder dan een uur",
    description: "Hoe snel herstel je na een incident?",
  },
];

function DoraSection() {
  return (
    <section className="py-24 px-6 border-t border-gray-900" style={{ backgroundColor: "#000" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-600 mb-3 text-center font-mono">
          DORA Metrics
        </p>
        <h2
          className="text-4xl text-white text-center mb-4 tracking-tight"
          style={{ ...H, fontWeight: 800 }}
        >
          Nexus Corp bij de start.
        </h2>
        <p className="text-gray-500 text-center text-sm mb-14 max-w-lg mx-auto">
          Dit zijn de cijfers als jij in dienst treedt. Jij gaat ze veranderen.
        </p>

        {/* Sharp 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-gray-800">
          {doraMetrics.map((d, i) => (
            <div
              key={d.metric}
              className="p-6 flex flex-col gap-3 border-gray-800"
              style={{
                borderRight: i < doraMetrics.length - 1 ? "1px solid rgb(31 41 55)" : undefined,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{d.label}</span>
                <span className="text-xs text-gray-700 font-mono">DORA</span>
              </div>

              <p className="text-xs text-gray-500 leading-snug">{d.metric}</p>

              {/* Bad value — Nexus Corp */}
              <div>
                <p className="text-xs text-gray-700 uppercase tracking-widest font-mono mb-1">Nexus Corp</p>
                <p className="text-2xl font-mono font-bold text-red-500 leading-none">{d.nexusCorp}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-800" />

              {/* Target */}
              <div>
                <p className="text-xs text-gray-700 uppercase tracking-widest font-mono mb-1">Elite</p>
                <p className="text-sm text-gray-400">{d.target}</p>
              </div>

              <p className="text-xs text-gray-600 mt-auto leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Books ────────────────────────────────────────────────────────────────────

const books = [
  {
    title: "The DevOps Handbook",
    authors: "Kim, Humble, Debois, Willis",
    line: "De drie manieren — Flow, Feedback, Continu leren — zijn de ruggengraat van elke missie in het lab.",
    borderLeft: "4px solid rgb(251 146 60)",
    label: "text-orange-400",
  },
  {
    title: "The Unicorn Project",
    authors: "Gene Kim",
    line: "De Vijf Idealen komen terug als ontwerpdoelen: localiteit, focus, flow, verbetering en klantgerichtheid.",
    borderLeft: "4px solid rgb(244 114 182)",
    label: "text-pink-400",
  },
  {
    title: "State of DevOps",
    authors: "DORA Research",
    line: "DORA-metrics zijn geen abstracties. Ze bewegen in real-time terwijl jij beslist hoe je werkt.",
    borderLeft: "4px solid rgb(96 165 250)",
    label: "text-blue-400",
  },
  {
    title: "Team Topologies",
    authors: "Skelton & Pais",
    line: "Teamstructuur bepaalt flow. Missies rond Conway's Law en interactiepatronen laten je dat zelf ontdekken.",
    borderLeft: "4px solid rgb(52 211 153)",
    label: "text-emerald-400",
  },
];

function BooksSection() {
  return (
    <section className="py-24 px-6 border-t border-gray-900" style={{ backgroundColor: "#050d1a" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-600 mb-3 text-center font-mono">
          De theorie ken je. Nu de praktijk.
        </p>
        <h2
          className="text-4xl text-white text-center mb-4 tracking-tight"
          style={{ ...H, fontWeight: 800 }}
        >
          Gebouwd op de beste vakliteratuur.
        </h2>
        <p className="text-gray-500 text-center max-w-xl mx-auto mb-14 text-sm leading-relaxed">
          DevOps Flow Lab is geen samenvatting van deze boeken. Het is de plek waar je ze beleeft.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800">
          {books.map((b) => (
            <div
              key={b.title}
              className="p-6 flex flex-col gap-3"
              style={{ backgroundColor: "#050d1a", borderLeft: b.borderLeft }}
            >
              <span className={`text-xs font-bold uppercase tracking-widest font-mono ${b.label}`}>
                Boek
              </span>
              <h3 className="text-white font-bold leading-snug">{b.title}</h3>
              <p className="text-gray-600 text-xs">{b.authors}</p>
              <p className="text-gray-400 text-sm leading-relaxed mt-auto pt-3 border-t border-gray-800">
                {b.line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Missions teaser ──────────────────────────────────────────────────────────

const missions = [
  {
    id: "M-01",
    title: "Value Stream Mapping",
    tag: "Flow",
    tagColor: "text-cyan-400 border-cyan-900",
    description:
      "Breng de waardestroom van Nexus Corp in kaart. Waar zit de waste? Wat blokkeer de flow? Jij maakt de bottlenecks zichtbaar.",
    meta: "Gebaseerd op The DevOps Handbook — Deel I",
  },
  {
    id: "M-02",
    title: "WIP Wars",
    tag: "Flow",
    tagColor: "text-cyan-400 border-cyan-900",
    description:
      "Het team werkt aan zestien dingen tegelijk en niets komt af. Voer WIP-limieten in, overtuig je collega's en meet het verschil.",
    meta: "Gebaseerd op Kanban & DORA onderzoek",
  },
  {
    id: "M-03",
    title: "Pipeline Bouwen",
    tag: "Technisch",
    tagColor: "text-violet-400 border-violet-900",
    description:
      "Nexus Corp deployt handmatig, één keer per maand. Bouw hun eerste deployment pipeline en breng deployment frequency omhoog.",
    meta: "Gebaseerd op The DevOps Handbook — Deel II",
  },
];

function MissionsTeaser() {
  return (
    <section className="py-24 px-6 border-t border-gray-900" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-600 mb-3 text-center font-mono">
          Missies
        </p>
        <h2
          className="text-4xl text-white text-center mb-4 tracking-tight"
          style={{ ...H, fontWeight: 800 }}
        >
          Een voorproefje van wat je te wachten staat.
        </h2>
        <p className="text-gray-500 text-center max-w-xl mx-auto mb-14 text-sm">
          Elke missie is een situatie, een probleem en een keuze. Niet meerkeuze. Echt werk.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {missions.map((m) => (
            <div
              key={m.id}
              className="relative flex flex-col gap-4 p-6 overflow-hidden group border border-gray-800"
              style={{
                backgroundColor: "#0a0a0a",
                borderLeft: "3px solid rgb(6 182 212)",
              }}
            >
              {/* Locked overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(3px)" }}
              >
                <span className="text-gray-300 text-sm font-mono border border-gray-700 px-4 py-2"
                  style={{ backgroundColor: "#111" }}>
                  ▸ Beschikbaar na aanmelding
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-700">{m.id}</span>
                <span className={`text-xs font-mono px-2 py-0.5 border ${m.tagColor}`}
                  style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
                  {m.tag}
                </span>
              </div>

              <h3
                className="text-lg text-white"
                style={{ ...H, fontWeight: 700 }}
              >
                {m.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{m.description}</p>
              <p className="text-xs text-gray-700 border-t border-gray-800 pt-3 font-mono">{m.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="py-32 px-6 border-t border-gray-900" style={{ backgroundColor: "#000" }}>
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Decorative top line */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-cyan-500/50" />

        <h2
          className="text-5xl text-white leading-tight tracking-tight"
          style={{ ...H, fontWeight: 800 }}
        >
          Klaar om te beginnen?
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
          Start gratis met je Google account. Geen creditcard, geen installatie.
          Gewoon inloggen en je eerste missie starten.
        </p>
        <a
          href="/api/auth/signin"
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-10 py-4 transition-colors text-base tracking-wide"
        >
          Start gratis met Google →
        </a>
        <p className="text-xs text-gray-700">
          Door aan te melden ga je akkoord met onze gebruiksvoorwaarden.
        </p>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="text-gray-100" style={{ backgroundColor: "#000" }}>
      <Hero />
      <AudienceSection />
      <HowItWorks />
      <DoraSection />
      <BooksSection />
      <MissionsTeaser />
      <FinalCTA />
    </div>
  );
}
