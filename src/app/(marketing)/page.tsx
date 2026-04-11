import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "DevOps Flow Lab - Learn DevOps by doing",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

// Shared heading style helper
const H = syne.style;

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ authenticated }: { authenticated: boolean }) {
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
            ▸ Hands-on DevOps learning
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tighter px-4 sm:px-0"
            style={{ ...H, fontWeight: 800 }}
          >
            Reading about DevOps<br />
            <span className="text-cyan-400">is not the same</span><br />
            as feeling it.
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed">
            DevOps Flow Lab turns the theory from The DevOps Handbook, The Unicorn Project, and DORA research
            into real missions. You learn by doing - not by reading.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={authenticated ? "/dashboard" : "/api/auth/signin"}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 transition-colors text-sm tracking-wide"
            >
              {authenticated ? "Go to Dashboard →" : "Start for free →"}
            </a>
            <a
              href="#how-it-works"
              className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium px-8 py-4 transition-colors text-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              See how it works
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── For who? ─────────────────────────────────────────────────────────────────

const audiences = [
  {
    role: "Engineers",
    headline: "Build real pipelines",
    body: "No tutorials with fake repos. You work on a fictional but realistic company, with legacy code, silos, and pressure from above. Exactly what it feels like for real.",
    accent: "text-cyan-400",
    borderLeft: "4px solid rgb(6 182 212)",
  },
  {
    role: "Managers",
    headline: "Understand what your team needs",
    body: "You don't need to deploy yourself to understand why batch size matters, what WIP limits solve, and why DORA metrics say more than velocity.",
    accent: "text-violet-400",
    borderLeft: "4px solid rgb(167 139 250)",
  },
  {
    role: "Coaches & Trainers",
    headline: "Use it alongside your training",
    body: "Give participants something to fall back on after the training. Missions that anchor the concepts from your workshop - with measurable progress.",
    accent: "text-emerald-400",
    borderLeft: "4px solid rgb(52 211 153)",
  },
];

function AudienceSection() {
  return (
    <section className="py-24 px-6 border-t border-gray-900" style={{ backgroundColor: "#050d1a" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-600 mb-3 text-center font-mono">
          Who is it for?
        </p>
        <h2
          className="text-4xl text-white text-center mb-14 tracking-tight"
          style={{ ...H, fontWeight: 800 }}
        >
          For everyone who truly wants to understand DevOps.
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

// ─── How it works ─────────────────────────────────────────────────────────────

const steps = [
  {
    n: "01",
    title: "You join Nexus Corp",
    body: "A fictional company with real problems. Long deployment times, silos between dev and ops, manual processes, and managers who want to see numbers. You are the new engineer.",
  },
  {
    n: "02",
    title: "You work through missions based on the literature",
    body: "Every mission is rooted in The DevOps Handbook, DORA research, or Team Topologies. You replay situations from the books - but as a participant, not a reader.",
  },
  {
    n: "03",
    title: "You see your impact in real DORA metrics",
    body: "Deployment frequency, lead time, MTTR, change failure rate - they move as you make decisions. You learn directly why certain choices speed up or block the flow.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 border-t border-gray-900" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-600 mb-3 text-center font-mono">
          How it works
        </p>
        <h2
          className="text-4xl text-white text-center mb-16 tracking-tight"
          style={{ ...H, fontWeight: 800 }}
        >
          Three steps. One story.
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
    nexusCorp: "1× per month",
    target: "Multiple times per day",
    description: "How often does the team deploy to production?",
  },
  {
    metric: "Lead Time for Changes",
    label: "LT",
    nexusCorp: "3-6 weeks",
    target: "Less than a day",
    description: "How long does it take from commit to production?",
  },
  {
    metric: "Change Failure Rate",
    label: "CFR",
    nexusCorp: "42%",
    target: "Below 15%",
    description: "What percentage of changes causes an incident?",
  },
  {
    metric: "Mean Time to Restore",
    label: "MTTR",
    nexusCorp: "72 hours",
    target: "Less than an hour",
    description: "How quickly do you recover after an incident?",
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
          Nexus Corp at the start.
        </h2>
        <p className="text-gray-500 text-center text-sm mb-14 max-w-lg mx-auto">
          These are the numbers when you join. You are going to change them.
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

              {/* Bad value - Nexus Corp */}
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
    line: "The three ways - Flow, Feedback, Continuous learning - are the backbone of every mission in the lab.",
    borderLeft: "4px solid rgb(251 146 60)",
    label: "text-orange-400",
  },
  {
    title: "The Unicorn Project",
    authors: "Gene Kim",
    line: "The Five Ideals return as design goals: locality, focus, flow, improvement, and customer focus.",
    borderLeft: "4px solid rgb(244 114 182)",
    label: "text-pink-400",
  },
  {
    title: "State of DevOps",
    authors: "DORA Research",
    line: "DORA metrics are not abstractions. They move in real-time as you decide how you work.",
    borderLeft: "4px solid rgb(96 165 250)",
    label: "text-blue-400",
  },
  {
    title: "Team Topologies",
    authors: "Skelton & Pais",
    line: "Team structure determines flow. Missions around Conway's Law and interaction patterns let you discover that yourself.",
    borderLeft: "4px solid rgb(52 211 153)",
    label: "text-emerald-400",
  },
];

function BooksSection() {
  return (
    <section className="py-24 px-6 border-t border-gray-900" style={{ backgroundColor: "#050d1a" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-600 mb-3 text-center font-mono">
          You know the theory. Now the practice.
        </p>
        <h2
          className="text-4xl text-white text-center mb-4 tracking-tight"
          style={{ ...H, fontWeight: 800 }}
        >
          Built on the best literature.
        </h2>
        <p className="text-gray-500 text-center max-w-xl mx-auto mb-14 text-sm leading-relaxed">
          DevOps Flow Lab is not a summary of these books. It is the place where you experience them.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800">
          {books.map((b) => (
            <div
              key={b.title}
              className="p-6 flex flex-col gap-3"
              style={{ backgroundColor: "#050d1a", borderLeft: b.borderLeft }}
            >
              <span className={`text-xs font-bold uppercase tracking-widest font-mono ${b.label}`}>
                Book
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
      "Map the value stream of Nexus Corp. Where is the waste? What is blocking the flow? You make the bottlenecks visible.",
    meta: "Based on The DevOps Handbook - Part I",
  },
  {
    id: "M-02",
    title: "On-Demand Environments",
    tag: "Technical",
    tagColor: "text-violet-400 border-violet-900",
    description:
      "The app lives on one server nobody understands. Containerize it so every developer gets the same environment, and every deploy is predictable.",
    meta: "Based on The DevOps Handbook - Part II",
  },
  {
    id: "M-03",
    title: "Build the Pipeline",
    tag: "Technical",
    tagColor: "text-violet-400 border-violet-900",
    description:
      "Nexus Corp deploys manually, once a month. Build their first automated deployment pipeline and bring deployment frequency up.",
    meta: "Based on The DevOps Handbook - Part II",
  },
];

function MissionsTeaser() {
  return (
    <section id="missions" className="py-24 px-6 border-t border-gray-900" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-600 mb-3 text-center font-mono">
          Missions
        </p>
        <h2
          className="text-4xl text-white text-center mb-4 tracking-tight"
          style={{ ...H, fontWeight: 800 }}
        >
          A preview of what awaits you.
        </h2>
        <p className="text-gray-500 text-center max-w-xl mx-auto mb-14 text-sm">
          Every mission is a situation, a problem, and a choice. Not multiple choice. Real work.
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
                  ▸ Available after sign-up
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

function FinalCTA({ authenticated }: { authenticated: boolean }) {
  return (
    <section className="py-32 px-6 border-t border-gray-900" style={{ backgroundColor: "#000" }}>
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8">
        {/* Decorative top line */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-cyan-500/50" />

        <h2
          className="text-5xl text-white leading-tight tracking-tight"
          style={{ ...H, fontWeight: 800 }}
        >
          Ready to get started?
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
          {authenticated
            ? "You are signed in. Head to your dashboard to continue your missions."
            : "Start for free with your Google account. No credit card, no installation. Just sign in and start your first mission."}
        </p>
        <a
          href={authenticated ? "/dashboard" : "/api/auth/signin"}
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-10 py-4 transition-colors text-base tracking-wide"
        >
          {authenticated ? "Go to Dashboard →" : "Start for free with Google →"}
        </a>
        <p className="text-xs text-gray-700">
          By signing up you agree to our terms of use.
        </p>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const session = await auth();
  const authenticated = !!session?.user;

  return (
    <div className="text-gray-100" style={{ backgroundColor: "#000" }}>
      <Hero authenticated={authenticated} />
      <AudienceSection />
      <HowItWorks />
      <DoraSection />
      <BooksSection />
      <MissionsTeaser />
      <FinalCTA authenticated={authenticated} />
    </div>
  );
}
