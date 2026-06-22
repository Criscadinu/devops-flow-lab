import type { Metadata } from "next";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "DevOps Flow Lab - Learn DevOps by doing",
}

function Hero({ authenticated }: { authenticated: boolean }) {
  return (
    <section className="relative pt-28 pb-32 px-6 overflow-hidden" style={{ backgroundColor: "var(--bg)" }}>
      <div style={{ position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(255,80,0,0.10) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-10" style={{ zIndex: 1 }}>
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--af-orange)", backgroundColor: "rgba(255,85,0,0.08)", border: "1px solid rgba(255,85,0,0.3)", borderRadius: "20px" }}>
          ▸ Hands-on DevOps learning
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl leading-[1.0] tracking-tight px-4 sm:px-0" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, textTransform: "uppercase", color: "var(--text)" }}>
          Reading about DevOps<br />
          <span style={{ background: "var(--af-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>is not the same</span><br />
          as feeling it.
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
          DevOps Flow Lab turns the theory from The DevOps Handbook, The Unicorn Project, and DORA research into real missions. You learn by doing — not by reading.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href={authenticated ? "/dashboard" : "/api/auth/signin"} className="font-bold px-8 py-4 text-sm transition-opacity hover:opacity-85" style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: "var(--radius)" }}>
            {authenticated ? "Go to Dashboard →" : "Start for free →"}
          </a>
          <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-800 font-medium px-8 py-4 transition-colors" style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", backgroundColor: "var(--bg-card)" }}>
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}

const audiences = [
  { role: "Engineers", headline: "Build real pipelines", body: "No tutorials with fake repos. You work on a fictional but realistic company, with legacy code, silos, and pressure from above. Exactly what it feels like for real.", borderLeft: "4px solid var(--af-orange)", accentColor: "var(--af-orange)" },
  { role: "Managers", headline: "Understand what your team needs", body: "You don't need to deploy yourself to understand why batch size matters, what WIP limits solve, and why DORA metrics say more than velocity.", borderLeft: "4px solid rgb(167,139,250)", accentColor: "rgb(124,58,237)" },
  { role: "Coaches & Trainers", headline: "Use it alongside your training", body: "Give participants something to fall back on after the training. Missions that anchor the concepts from your workshop — with measurable progress.", borderLeft: "4px solid rgb(52,211,153)", accentColor: "rgb(5,150,105)" },
];

function AudienceSection() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg-card)" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 text-center" style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>Who is it for?</p>
        <h2 className="text-4xl text-center mb-14" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", color: "var(--text)" }}>For everyone who truly wants to understand DevOps.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--border)" }}>
          {audiences.map((a) => (
            <div key={a.role} className="p-8 flex flex-col gap-4" style={{ backgroundColor: "var(--bg)", borderLeft: a.borderLeft }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-heading)", color: a.accentColor }}>{a.role}</span>
              <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text)", textTransform: "uppercase" }}>{a.headline}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "var(--font-body)" }}>{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", title: "You join Nexus Corp", body: "A fictional company with real problems. Long deployment times, silos between dev and ops, manual processes, and managers who want to see numbers. You are the new engineer." },
  { n: "02", title: "You work through missions based on the literature", body: "Every mission is rooted in The DevOps Handbook, DORA research, or Team Topologies. You replay situations from the books — but as a participant, not a reader." },
  { n: "03", title: "You see your impact in real DORA metrics", body: "Deployment frequency, lead time, MTTR, change failure rate — they move as you make decisions. You learn directly why certain choices speed up or block the flow." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 text-center" style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>How it works</p>
        <h2 className="text-4xl text-center mb-16" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", color: "var(--text)" }}>Three steps. One story.</h2>
        <div className="flex flex-col">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-8 py-10 first:border-t-0" style={{ borderTop: "1px solid var(--border)" }}>
              <span className="text-5xl font-bold shrink-0 w-16 leading-none pt-1" style={{ fontFamily: "var(--font-heading)", color: "var(--border-bright)" }} aria-hidden>{s.n}</span>
              <div>
                <h3 className="text-xl mb-3" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", color: "var(--text)" }}>{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-body)" }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const doraMetrics = [
  { metric: "Deployment Frequency", label: "DF", nexusCorp: "1× per month", target: "Multiple times per day", description: "How often does the team deploy to production?" },
  { metric: "Lead Time for Changes", label: "LT", nexusCorp: "3–6 weeks", target: "Less than a day", description: "How long does it take from commit to production?" },
  { metric: "Change Failure Rate", label: "CFR", nexusCorp: "42%", target: "Below 15%", description: "What percentage of changes causes an incident?" },
  { metric: "Mean Time to Restore", label: "MTTR", nexusCorp: "72 hours", target: "Less than an hour", description: "How quickly do you recover after an incident?" },
];

function DoraSection() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg-card)" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 text-center" style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>DORA Metrics</p>
        <h2 className="text-4xl text-center mb-4" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", color: "var(--text)" }}>Nexus Corp at the start.</h2>
        <p className="text-gray-500 text-center text-sm mb-14 max-w-lg mx-auto" style={{ fontFamily: "var(--font-body)" }}>These are the numbers when you join. You are going to change them.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          {doraMetrics.map((d, i) => (
            <div key={d.metric} className="p-6 flex flex-col gap-3" style={{ borderRight: i < doraMetrics.length - 1 ? "1px solid var(--border)" : undefined, backgroundColor: "var(--bg)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">{d.label}</span>
                <span className="text-xs text-gray-600 font-mono">DORA</span>
              </div>
              <p className="text-xs text-gray-400 leading-snug">{d.metric}</p>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-1">Nexus Corp</p>
                <p className="text-2xl font-bold leading-none" style={{ fontFamily: "var(--font-heading)", color: "var(--red-burn)" }}>{d.nexusCorp}</p>
              </div>
              <div style={{ borderTop: "1px solid var(--border)" }} />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mb-1">Elite</p>
                <p className="text-sm text-gray-500">{d.target}</p>
              </div>
              <p className="text-xs text-gray-400 mt-auto leading-relaxed">{d.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const books = [
  { title: "The DevOps Handbook", authors: "Kim, Humble, Debois, Willis", line: "The three ways — Flow, Feedback, Continuous learning — are the backbone of every mission in the lab.", borderLeft: "4px solid var(--af-orange)", accentColor: "var(--af-orange)" },
  { title: "The Unicorn Project", authors: "Gene Kim", line: "The Five Ideals return as design goals: locality, focus, flow, improvement, and customer focus.", borderLeft: "4px solid rgb(244,114,182)", accentColor: "rgb(219,39,119)" },
  { title: "State of DevOps", authors: "DORA Research", line: "DORA metrics are not abstractions. They move in real-time as you decide how you work.", borderLeft: "4px solid rgb(96,165,250)", accentColor: "rgb(37,99,235)" },
  { title: "Team Topologies", authors: "Skelton & Pais", line: "Team structure determines flow. Missions around Conway's Law and interaction patterns let you discover that yourself.", borderLeft: "4px solid rgb(52,211,153)", accentColor: "rgb(5,150,105)" },
];

function BooksSection() {
  return (
    <section className="py-24 px-6" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 text-center" style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>You know the theory. Now the practice.</p>
        <h2 className="text-4xl text-center mb-4" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", color: "var(--text)" }}>Built on the best literature.</h2>
        <p className="text-gray-500 text-center max-w-xl mx-auto mb-14 text-sm leading-relaxed">DevOps Flow Lab is not a summary of these books. It is the place where you experience them.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "var(--border)" }}>
          {books.map((b) => (
            <div key={b.title} className="p-6 flex flex-col gap-3" style={{ backgroundColor: "var(--bg)", borderLeft: b.borderLeft }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-heading)", color: b.accentColor }}>Book</span>
              <h3 className="font-bold leading-snug" style={{ fontFamily: "var(--font-heading)", color: "var(--text)", textTransform: "uppercase" }}>{b.title}</h3>
              <p className="text-gray-400 text-xs">{b.authors}</p>
              <p className="text-gray-500 text-sm leading-relaxed mt-auto pt-3" style={{ borderTop: "1px solid var(--border)" }}>{b.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const missions = [
  { id: "M-01", title: "Value Stream Mapping", tag: "Flow", tagColor: "var(--af-orange)", description: "Map the value stream of Nexus Corp. Where is the waste? What is blocking the flow? You make the bottlenecks visible.", meta: "Based on The DevOps Handbook — Part I" },
  { id: "M-02", title: "On-Demand Environments", tag: "Technical", tagColor: "rgb(124,58,237)", description: "The app lives on one server nobody understands. Containerize it so every developer gets the same environment, and every deploy is predictable.", meta: "Based on The DevOps Handbook — Part II" },
  { id: "M-03", title: "Build the Pipeline", tag: "Technical", tagColor: "rgb(124,58,237)", description: "Nexus Corp deploys manually, once a month. Build their first automated deployment pipeline and bring deployment frequency up.", meta: "Based on The DevOps Handbook — Part II" },
];

function MissionsTeaser() {
  return (
    <section id="missions" className="py-24 px-6" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg-card)" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 text-center" style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>Missions</p>
        <h2 className="text-4xl text-center mb-4" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", color: "var(--text)" }}>A preview of what awaits you.</h2>
        <p className="text-gray-500 text-center max-w-xl mx-auto mb-14 text-sm">Every mission is a situation, a problem, and a choice. Not multiple choice. Real work.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {missions.map((m) => (
            <div key={m.id} className="relative flex flex-col gap-4 p-6 overflow-hidden group" style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderLeft: "3px solid var(--af-orange)", borderRadius: "var(--radius-lg)" }}>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ backgroundColor: "rgba(255,255,255,0.88)", backdropFilter: "blur(3px)", borderRadius: "var(--radius-lg)" }}>
                <span className="text-gray-700 text-sm font-mono px-4 py-2" style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg)", borderRadius: "var(--radius)" }}>▸ Available after sign-up</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">{m.id}</span>
                <span className="text-xs font-mono px-2 py-0.5" style={{ color: m.tagColor, border: `1px solid ${m.tagColor}`, borderRadius: "20px", fontFamily: "var(--font-heading)", fontWeight: 700 }}>{m.tag}</span>
              </div>
              <h3 className="text-lg" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", color: "var(--text)" }}>{m.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{m.description}</p>
              <p className="text-xs text-gray-400 pt-3 font-mono" style={{ borderTop: "1px solid var(--border)" }}>{m.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ authenticated }: { authenticated: boolean }) {
  return (
    <section className="py-32 px-6" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)" }}>
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8">
        <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,85,0,0.5))" }} />
        <h2 className="text-5xl leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, textTransform: "uppercase", color: "var(--text)" }}>Ready to get started?</h2>
        <p className="text-gray-500 text-lg leading-relaxed max-w-md">
          {authenticated ? "You are signed in. Head to your dashboard to continue your missions." : "Start for free with your Google account. No credit card, no installation. Just sign in and start your first mission."}
        </p>
        <a href={authenticated ? "/dashboard" : "/api/auth/signin"} className="font-bold px-10 py-4 text-base transition-opacity hover:opacity-85" style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: "var(--radius)" }}>
          {authenticated ? "Go to Dashboard →" : "Start for free with Google →"}
        </a>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>By signing up you agree to our terms of use.</p>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const session = await auth();
  const authenticated = !!session?.user;
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
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
