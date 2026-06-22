import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Phase3 } from "./Phase3"
import { MissionFAQ } from "@/components/MissionFAQ"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-02 On-Demand Environments - DevOps Flow Lab",
}


// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "var(--bg-card)" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "var(--af-orange)" }}>
          M-02
        </span>
        <span className="text-sm font-bold tracking-tight text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>
          On-Demand Environments
        </span>
        <span className="text-xs font-mono text-gray-600 tracking-widest uppercase">
          Phase {fase} of 4
        </span>
      </div>
      <div className="max-w-5xl mx-auto mt-3">
        <div className="w-full h-px bg-gray-800">
          <div className="h-px transition-all" style={{ width: pct, background: "linear-gradient(90deg, #FF0000 0%, #FF8C00 100%)" }} />
        </div>
      </div>
    </header>
  )
}

// ─── Shared: CTA ─────────────────────────────────────────────────────────────

function CTA({ href, label, sub }: { href: string; label: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-3 border-t border-gray-900 pt-10">
      <a
        href={href}
        className="self-start px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
        style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}
      >
        {label}
      </a>
      {sub && <p className="text-xs font-mono text-gray-700">{sub}</p>}
    </div>
  )
}

// ─── Phase 1 - The situation ──────────────────────────────────────────────────

type SceneLine =
  | { type: "char"; name: string; role: string; accent: string; text: string }
  | { type: "beat"; text: string }
  | { type: "player"; text: string; coda: string }

const scene: SceneLine[] = [
  {
    type: "char", name: "Marco", role: "OPS", accent: "rgb(239,68,68)",
    text: "Hey, does anyone know what state the test environment is in? I need to deploy something.",
  },
  {
    type: "char", name: "Kai", role: "QA", accent: "rgb(251,146,60)",
    text: "Which one? The shared one is mine right now. I have been waiting since Monday to run my tests.",
  },
  {
    type: "char", name: "Marco", role: "OPS", accent: "rgb(239,68,68)",
    text: "Monday? It is Wednesday.",
  },
  {
    type: "char", name: "Kai", role: "QA", accent: "rgb(251,146,60)",
    text: "Yes. Two days. And before me it was Lisa. And before Lisa it was you.",
  },
  {
    type: "char", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)",
    text: "I left it in a working state. Mostly.",
  },
  {
    type: "char", name: "Kai", role: "QA", accent: "rgb(251,146,60)",
    text: "Mostly.",
  },
  {
    type: "char", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)",
    text: "There was a config issue. I fixed it locally. I think I forgot to apply it to the server.",
  },
  {
    type: "char", name: "Marco", role: "OPS", accent: "rgb(239,68,68)",
    text: "So the environment has your local fix, but not actually.",
  },
  {
    type: "char", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)",
    text: "Correct.",
  },
  {
    type: "char", name: "Marco", role: "OPS", accent: "rgb(239,68,68)",
    text: "And nobody documented this.",
  },
  {
    type: "char", name: "Lisa", role: "DEV", accent: "rgb(34,197,94)",
    text: "There is a Slack message from Tuesday.",
  },
  {
    type: "char", name: "Kai", role: "QA", accent: "rgb(251,146,60)",
    text: "I missed that Slack message. I spent half a day figuring out why my tests were failing on a config issue that was already fixed on someone\u2019s laptop.",
  },
  {
    type: "beat",
    text: "Nobody said anything for a moment.",
  },
  {
    type: "char", name: "Marco", role: "OPS", accent: "rgb(239,68,68)",
    text: "I am going to rebuild the environment from scratch. Does anyone know how?",
  },
  {
    type: "beat",
    text: "Nobody did.",
  },
  {
    type: "player",
    text: "This is the problem. Not one bad day. A system where every environment is different, nobody owns it, and the only documentation is a Slack message from Tuesday that someone missed. The fix is not better communication. It is making environments cheap enough that everyone has their own.",
    coda: "One environment for everyone is one bottleneck for everyone.",
  },
]

function DialogueLine({ line, index }: { line: SceneLine; index: number }) {
  if (line.type === "beat") {
    return (
      <p className="text-center text-sm text-gray-600 italic py-5">
        {line.text}
      </p>
    )
  }

  if (line.type === "player") {
    return (
      <div
        className="flex flex-col gap-4 px-6 py-5 mt-2"
        style={{
          backgroundColor: "rgba(255,85,0,0.03)",
          borderLeft: "3px solid rgb(255,85,0)",
          borderTop: "1px solid rgba(255,85,0,0.2)",
          borderBottom: "1px solid rgba(255,85,0,0.2)",
          borderRight: "1px solid rgba(255,85,0,0.1)",
        }}
      >
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: "var(--af-orange)" }}
        >
          You &middot; New Engineer
        </span>
        <p className="text-gray-200 text-base leading-relaxed">{line.text}</p>
        <p
          className="text-gray-900 font-bold text-sm border-t pt-4"
          style={{ borderColor: "rgba(255,85,0,0.15)" }}
        >
          {line.coda}
        </p>
      </div>
    )
  }

  const bg = index % 2 === 0 ? "#080808" : "#060606"
  return (
    <div
      className="flex flex-col gap-2 px-6 py-4"
      style={{
        backgroundColor: bg,
        borderLeft: `3px solid ${line.accent}`,
      }}
    >
      <span
        className="text-xs font-mono tracking-widest uppercase"
        style={{ color: line.accent, opacity: 0.8 }}
      >
        {line.name} &middot; {line.role}
      </span>
      <p className="text-gray-600 text-base leading-relaxed">
        &ldquo;{line.text}&rdquo;
      </p>
    </div>
  )
}

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">

        <div className="flex flex-col gap-3">
          <h2
            className="text-4xl text-gray-900 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}
          >
            Week two. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            The VSM revealed the bottlenecks. Now you see the root cause.
          </p>
        </div>

        <div className="flex flex-col border border-gray-900">
          {scene.map((line, i) => (
            <DialogueLine key={i} line={line} index={i} />
          ))}
        </div>

        <CTA
          href="?phase=2"
          label="Understand the theory →"
          sub="Phase 2 of 4 - Why environments break everything"
        />
      </div>
    </div>
  )
}

// ─── Phase 2 - The theory ─────────────────────────────────────────────────────

const principles = [
  {
    title: "Environment as code",
    body: "Your environment is not a manual setup guide. It is a file in your repository. Anyone can spin up an identical environment with one command.",
    accent: "rgb(34,197,94)",
    bg: "#060f06",
    border: "rgba(34,197,94,0.25)",
  },
  {
    title: "On-demand creation",
    body: "Environments should be created in minutes, not scheduled days in advance. Every developer gets their own. Every feature gets its own.",
    accent: "rgb(255,85,0)",
    bg: "#020d0f",
    border: "rgba(255,85,0,0.25)",
  },
  {
    title: "Easier to rebuild than repair",
    body: "When an environment breaks, you do not fix it. You delete it and create a new one. Immutable infrastructure eliminates configuration drift.",
    accent: "rgb(239,68,68)",
    bg: "#0f0606",
    border: "rgba(239,68,68,0.25)",
  },
]

const envQuestions = [
  "Can any developer create a local environment in under 5 minutes?",
  "Is dev identical to test and prod?",
  "Can you recreate prod from scratch in under an hour?",
  "Is your environment defined in version control?",
]

function Phase2() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-14">

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">01</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Why environments break everything
          </h2>
          <p className="text-gray-400 leading-relaxed">
            When every developer has a different local setup, and test differs from production,
            bugs hide between environments. The solution is environment parity - dev, test, and
            prod behave identically because they are defined in code.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Three principles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {principles.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-3 p-6 border"
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

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">03</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            The four environment questions
          </h2>

          <ol className="flex flex-col border border-gray-800">
            {envQuestions.map((q, i) => (
              <li
                key={i}
                className="flex items-start gap-5 px-6 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#050505" }}
              >
                <span
                  className="text-sm font-mono font-bold shrink-0 w-6 pt-0.5"
                  style={{ color: "var(--af-orange)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-gray-600 text-sm leading-relaxed">{q}</span>
              </li>
            ))}
          </ol>
        </section>

        <CTA
          href="?phase=3"
          label="Fix the Nexus Corp environments →"
          sub="Phase 3 of 4 - Do it yourself"
        />

        <MissionFAQ items={m02Faq} />
      </div>
    </div>
  )
}

// ─── Phase 2 FAQ data ─────────────────────────────────────────────────────────

const m02Faq = [
  {
    question: "Why Docker and not just running the app locally?",
    answer: "Running locally works until it does not. The moment two developers have different Node versions, or one has a global package the other does not, you have an environment inconsistency. Docker makes the environment part of the code — anyone who clones the repo gets the exact same setup.",
  },
  {
    question: "Why three environments and not one?",
    answer: "Dev, test, and prod serve different goals. Dev is optimized for speed of feedback — verbose errors, hot reload, noisy logging. Test is predictable — it matches prod closely so CI results are trustworthy. Prod is hardened — minimal logging, no debug output. Mixing them causes subtle bugs that only appear in one environment.",
  },
  {
    question: "What if my team does not know Docker?",
    answer: "That is exactly the point of this mission. If the environment requires tribal knowledge to set up, it is a bottleneck. Docker Compose reduces the setup to one command. The learning curve is real but it is a one-time cost — the consistency benefit compounds forever.",
  },
  {
    question: "Is this not overkill for a small app?",
    answer: "The smaller the app, the easier it is to set this up correctly. Retrofitting environment consistency onto a large, legacy codebase is painful. The Nexus Corp app is small — which makes it the perfect time to build the habit.",
  },
  {
    question: "How do I keep secrets out of docker-compose.yml?",
    answer: "Use a .env file for local secrets and add it to .gitignore. Reference variables in docker-compose.yml with ${VARIABLE_NAME} syntax. For production, inject secrets through your deployment platform's environment variable system — never commit secrets to version control.",
  },
  {
    question: "What if the container does not start?",
    answer: "Run docker compose logs to see what went wrong. Common causes: port already in use (another process on 3000), missing environment variable, or a syntax error in docker-compose.yml. The error message is usually specific enough to find the fix quickly.",
  },
]

// ─── Phase 4 - Benefit cards ──────────────────────────────────────────────────

function BenefitCard({
  number, title, explanation, metric, children,
}: {
  number: string
  title: string
  explanation: string
  metric: { before: string; after: string }
  children: React.ReactNode
}) {
  return (
    <div
      className="flex flex-col gap-4"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderLeft: "3px solid rgb(255,85,0)",
        padding: "24px",
      }}
    >
      <span className="text-xs font-mono text-gray-700">{number}</span>
      <h3 className="text-gray-900 text-base leading-snug" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">{explanation}</p>
      <div style={{ border: "1px solid var(--border)" }}>{children}</div>
      <p className="text-xs font-mono">
        <span style={{ color: "rgb(239,68,68)" }}>{metric.before}</span>
        <span className="text-gray-700"> → </span>
        <span style={{ color: "rgb(34,197,94)" }}>{metric.after}</span>
      </p>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

const doraImpact = [
  { metric: "Change Failure Rate", code: "CFR", before: "42%",     after: "28%" },
  { metric: "Lead Time for Changes", code: "LT", before: "43 days", after: "36 days" },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        {/* Title */}
        <div className="flex flex-col gap-4">
          <p
            className="text-xs font-mono tracking-[0.25em] uppercase"
            style={{ color: "var(--af-orange)" }}
          >
            Mission Complete - M-02
          </p>
          <h1
            className="text-5xl text-gray-900 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}
          >
            Environments Established.
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            This is what you built for Nexus Corp.
          </p>
        </div>

        {/* What changed */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              What changed
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Card 1: Parallel work */}
            <BenefitCard
              number="01"
              title="Three features at the same time"
              explanation="No more queueing. Each developer tests in their own isolated environment."
              metric={{ before: "1 feature at a time", after: "3 features in parallel" }}
            >
              <svg viewBox="0 0 320 100" width="100%" style={{ display: "block" }}>
                <rect width="320" height="100" fill="#080808" />
                <line x1="0" y1="50" x2="320" y2="50" stroke="rgb(31,41,55)" strokeWidth="1" />
                {/* BEFORE */}
                <text x="8" y="13" fontFamily="monospace" fontSize="8" fill="rgb(239,68,68)" style={{ letterSpacing: "2px" }}>BEFORE</text>
                {[{x:30,l:"A"},{x:115,l:"B"},{x:200,l:"C"}].map(({x,l},i)=>(
                  <g key={l}>
                    <rect x={x} y="17" width="70" height="22" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.35)" strokeWidth="1"/>
                    <text x={x+35} y="32" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgb(239,68,68)">{l}</text>
                    {i<2&&<line x1={x+70} y1="28" x2={x+85} y2="28" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5" markerEnd="url(#a1)"/>}
                  </g>
                ))}
                <text x="285" y="32" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgb(75,85,99)">SERIAL</text>
                <defs><marker id="a1" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="rgba(239,68,68,0.5)"/></marker></defs>
                {/* AFTER */}
                <text x="8" y="62" fontFamily="monospace" fontSize="8" fill="rgb(34,197,94)" style={{ letterSpacing: "2px" }}>AFTER</text>
                {[{y:55,l:"A"},{y:68,l:"B"},{y:81,l:"C"}].map(({y,l})=>(
                  <g key={l}>
                    <rect x="30" y={y} width="55" height="10" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.35)" strokeWidth="1"/>
                    <text x="57" y={y+8} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgb(34,197,94)">{l}</text>
                    <line x1="85" y1={y+5} x2="260" y2={y+5} stroke="rgba(34,197,94,0.4)" strokeWidth="1.5"/>
                    <polygon points={`260,${y+2} 266,${y+5} 260,${y+8}`} fill="rgba(34,197,94,0.5)"/>
                  </g>
                ))}
                <text x="285" y="74" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgb(75,85,99)">PARALLEL</text>
              </svg>
            </BenefitCard>

            {/* Card 2: Reset in seconds */}
            <BenefitCard
              number="02"
              title="Broken environment? Rebuild in 30 seconds"
              explanation="When something breaks, delete the container and recreate. No manual investigation needed."
              metric={{ before: "Days of manual work", after: "30 seconds, one command" }}
            >
              <svg viewBox="0 0 320 100" width="100%" style={{ display: "block" }}>
                <rect width="320" height="100" fill="#080808" />
                <line x1="0" y1="50" x2="320" y2="50" stroke="rgb(31,41,55)" strokeWidth="1" />
                {/* BEFORE */}
                <text x="8" y="13" fontFamily="monospace" fontSize="8" fill="rgb(239,68,68)" style={{ letterSpacing: "2px" }}>BEFORE</text>
                <rect x="20" y="17" width="280" height="22" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.35)" strokeWidth="1"/>
                <text x="160" y="26" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgb(239,68,68)">manual investigation · tribal knowledge</text>
                <text x="160" y="36" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(239,68,68,0.7)">trial and error · DAYS</text>
                {/* AFTER */}
                <text x="8" y="62" fontFamily="monospace" fontSize="8" fill="rgb(34,197,94)" style={{ letterSpacing: "2px" }}>AFTER</text>
                <circle cx="30" cy="75" r="5" fill="rgba(34,197,94,0.15)" stroke="rgb(34,197,94)" strokeWidth="1"/>
                <line x1="35" y1="75" x2="155" y2="75" stroke="rgba(34,197,94,0.6)" strokeWidth="1.5"/>
                <polygon points="155,72 161,75 155,78" fill="rgba(34,197,94,0.6)"/>
                <text x="165" y="71" fontFamily="monospace" fontSize="8" fill="rgb(34,197,94)">docker compose up</text>
                <text x="165" y="83" fontFamily="monospace" fontSize="9" fontWeight="700" fill="rgb(34,197,94)">30 seconds.</text>
              </svg>
            </BenefitCard>

            {/* Card 3: Identical to prod */}
            <BenefitCard
              number="03"
              title="What you build is what runs"
              explanation="Dev, test, and prod use the exact same image. No more surprises at deploy time."
              metric={{ before: "Works on my machine", after: "Identical everywhere" }}
            >
              <svg viewBox="0 0 320 100" width="100%" style={{ display: "block" }}>
                <rect width="320" height="100" fill="#080808" />
                <line x1="0" y1="50" x2="320" y2="50" stroke="rgb(31,41,55)" strokeWidth="1" />
                {/* BEFORE — 3 different colored boxes */}
                <text x="8" y="13" fontFamily="monospace" fontSize="8" fill="rgb(239,68,68)" style={{ letterSpacing: "2px" }}>BEFORE</text>
                <rect x="15" y="16" width="60" height="26" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.45)" strokeWidth="1"/>
                <text x="45" y="33" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgb(96,165,250)">DEV</text>
                <text x="85" y="33" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="rgb(239,68,68)">≠</text>
                <rect x="100" y="16" width="60" height="26" fill="rgba(251,146,60,0.12)" stroke="rgba(251,146,60,0.45)" strokeWidth="1"/>
                <text x="130" y="33" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgb(251,146,60)">TEST</text>
                <text x="170" y="33" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="rgb(239,68,68)">≠</text>
                <rect x="185" y="16" width="60" height="26" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.45)" strokeWidth="1"/>
                <text x="215" y="33" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgb(239,68,68)">PROD</text>
                {/* AFTER — 3 identical boxes */}
                <text x="8" y="62" fontFamily="monospace" fontSize="8" fill="rgb(34,197,94)" style={{ letterSpacing: "2px" }}>AFTER</text>
                {[{x:15,l:"DEV"},{x:100,l:"TEST"},{x:185,l:"PROD"}].map(({x,l})=>(
                  <g key={l}>
                    <rect x={x} y="66" width="60" height="26" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.3)" strokeWidth="1"/>
                    <text x={x+30} y="83" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgb(107,114,128)">{l}</text>
                  </g>
                ))}
                <text x="85" y="83" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="rgb(34,197,94)">=</text>
                <text x="170" y="83" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="rgb(34,197,94)">=</text>
                <text x="262" y="83" textAnchor="middle" fontFamily="monospace" fontSize="13" fill="rgb(34,197,94)">✓</text>
              </svg>
            </BenefitCard>

            {/* Card 4: Onboarding */}
            <BenefitCard
              number="04"
              title="Clone, run, contribute"
              explanation="A new engineer is productive in 5 minutes instead of waiting days for someone to set up their environment."
              metric={{ before: "2-3 days of setup", after: "5 minutes" }}
            >
              <svg viewBox="0 0 320 100" width="100%" style={{ display: "block" }}>
                <rect width="320" height="100" fill="#080808" />
                <line x1="0" y1="50" x2="320" y2="50" stroke="rgb(31,41,55)" strokeWidth="1" />
                {/* BEFORE */}
                <text x="8" y="13" fontFamily="monospace" fontSize="8" fill="rgb(239,68,68)" style={{ letterSpacing: "2px" }}>BEFORE</text>
                <circle cx="30" cy="28" r="11" fill="rgba(107,114,128,0.1)" stroke="rgba(107,114,128,0.4)" strokeWidth="1"/>
                <text x="30" y="32" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgb(239,68,68)">?</text>
                <line x1="42" y1="28" x2="270" y2="28" stroke="rgba(239,68,68,0.4)" strokeWidth="1.5" strokeDasharray="4 3"/>
                <polygon points="270,25 276,28 270,31" fill="rgba(239,68,68,0.5)"/>
                <text x="156" y="20" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(239,68,68,0.7)">2-3 days of asking colleagues</text>
                <text x="156" y="42" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgb(75,85,99)">setup · config · tribal knowledge</text>
                {/* AFTER */}
                <text x="8" y="62" fontFamily="monospace" fontSize="8" fill="rgb(34,197,94)" style={{ letterSpacing: "2px" }}>AFTER</text>
                <circle cx="30" cy="78" r="11" fill="rgba(34,197,94,0.08)" stroke="rgba(34,197,94,0.4)" strokeWidth="1"/>
                <text x="30" y="82" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="rgb(34,197,94)">✓</text>
                <line x1="42" y1="78" x2="155" y2="78" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5"/>
                <polygon points="155,75 161,78 155,81" fill="rgba(34,197,94,0.6)"/>
                <text x="168" y="73" fontFamily="monospace" fontSize="8" fill="rgb(34,197,94)">git clone</text>
                <text x="168" y="83" fontFamily="monospace" fontSize="8" fill="rgb(34,197,94)">docker compose up</text>
                <text x="168" y="94" fontFamily="monospace" fontSize="8" fill="rgba(34,197,94,0.6)">5 minutes.</text>
              </svg>
            </BenefitCard>

          </div>

          <p className="text-sm text-gray-500 italic text-center py-6">
            None of these benefits existed before you containerized the environments.
          </p>
        </section>

        {/* DORA impact */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              Your impact on Nexus Corp
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {doraImpact.map((d) => (
              <div
                key={d.code}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border p-6"
                style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
              >
                <div className="flex flex-col gap-1 shrink-0">
                  <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                    {d.metric}
                  </span>
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className="text-xl font-mono font-bold"
                    style={{ fontFamily: "var(--font-heading)", color: "rgb(239,68,68)" }}
                  >
                    {d.before}
                  </span>
                  <span className="font-mono text-gray-700">→</span>
                  <span
                    className="text-xl font-mono font-bold"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--af-orange)" }}
                  >
                    {d.after}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What's next */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">03</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              What&apos;s next
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div
            className="flex flex-col gap-3 p-6 border"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              borderLeft: "3px solid rgb(31,41,55)",
            }}
          >
            <p className="text-gray-400 text-sm leading-relaxed">
              Environments are stable and reproducible. Now every commit needs to automatically
              build, test, and deploy. Next mission: Build the Pipeline.
            </p>
          </div>
        </section>

        {/* CTAs */}
        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/dashboard"
              className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}
            >
              Back to dashboard →
            </a>
            <span
              className="flex items-center gap-3 px-8 py-4 text-sm font-mono border cursor-not-allowed"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text-dim)",
              }}
              title="Not yet available"
            >
              <span>⊘</span>
              Next mission: Build the Pipeline →
            </span>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PipelinePage({
  searchParams,
}: {
  searchParams: Promise<{ phase?: string }>
}) {
  const session = await auth()
  if (!session?.user?.email) redirect("/api/auth/signin")

  const { phase: phaseParam } = await searchParams
  const phase = ["1", "2", "3", "4"].includes(phaseParam ?? "") ? Number(phaseParam) : 1

  if (phase === 4) {
    const gateUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { id: true },
    })
    if (!gateUser) redirect("?phase=3")

    // Complete the mission first (idempotent — safe to call multiple times)
    await completeMission("M-02")

    // Now verify it actually exists (guards against DB errors)
    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-02" },
    })
    if (!completed) redirect("?phase=3")
  }

  return (
    <main className="min-h-screen text-gray-100 flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
      <MissionHeader fase={phase} />
      {phase === 1 && <Phase1 />}
      {phase === 2 && <Phase2 />}
      {phase === 3 && <Phase3 />}
      {phase === 4 && <Phase4 />}
    </main>
  )
}
