import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { MissionFAQ } from "@/components/MissionFAQ"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-02 On-Demand Environments - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>
          M-02
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          On-Demand Environments
        </span>
        <span className="text-xs font-mono text-gray-600 tracking-widest uppercase">
          Phase {fase} of 4
        </span>
      </div>
      <div className="max-w-5xl mx-auto mt-3">
        <div className="w-full h-px bg-gray-800">
          <div className="h-px transition-all" style={{ width: pct, backgroundColor: "rgb(6,182,212)" }} />
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
        style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}
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
          backgroundColor: "rgba(6,182,212,0.03)",
          borderLeft: "3px solid rgb(6,182,212)",
          borderTop: "1px solid rgba(6,182,212,0.2)",
          borderBottom: "1px solid rgba(6,182,212,0.2)",
          borderRight: "1px solid rgba(6,182,212,0.1)",
        }}
      >
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: "rgb(6,182,212)" }}
        >
          You &middot; New Engineer
        </span>
        <p className="text-gray-200 text-base leading-relaxed">{line.text}</p>
        <p
          className="text-white font-bold text-sm border-t pt-4"
          style={{ borderColor: "rgba(6,182,212,0.15)" }}
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
      <p className="text-gray-300 text-base leading-relaxed">
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
            className="text-4xl text-white tracking-tight leading-tight"
            style={{ ...syne.style, fontWeight: 800 }}
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
    accent: "rgb(6,182,212)",
    bg: "#020d0f",
    border: "rgba(6,182,212,0.25)",
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
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
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
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
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
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
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
                  style={{ color: "rgb(6,182,212)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-gray-300 text-sm leading-relaxed">{q}</span>
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

// ─── Phase 4 - SVG Diagrams ───────────────────────────────────────────────────

function BeforeDiagram() {
  // Swimlane constants
  const timelineX = 120   // timeline start
  const dayW      = 80    // px per day
  const serverX   = 620   // shared server left edge

  const lanes = [
    { name: "KAI",   accent: "rgb(251,146,60)",  cy: 80,  by: 45,  bh: 70 },
    { name: "LISA",  accent: "rgb(34,197,94)",   cy: 170, by: 135, bh: 70 },
    { name: "MARCO", accent: "rgb(239,68,68)",   cy: 260, by: 225, bh: 70 },
  ]

  type Block = { x: number; w: number; waiting: boolean; label: string }
  const blocks: Block[][] = [
    // Kai: WAITING 3d, WORKING 1d, WAITING 2d
    [
      { x: timelineX,           w: dayW * 3, waiting: true,  label: "WAITING · 3d" },
      { x: timelineX + dayW*3,  w: dayW * 1, waiting: false, label: "WORKING · 1d" },
      { x: timelineX + dayW*4,  w: dayW * 2, waiting: true,  label: "WAITING · 2d" },
    ],
    // Lisa: WORKING 2d, WAITING 3d, WORKING 1d
    [
      { x: timelineX,           w: dayW * 2, waiting: false, label: "WORKING · 2d" },
      { x: timelineX + dayW*2,  w: dayW * 3, waiting: true,  label: "WAITING · 3d" },
      { x: timelineX + dayW*5,  w: dayW * 1, waiting: false, label: "WORKING · 1d" },
    ],
    // Marco: WAITING 5d, WORKING 1d
    [
      { x: timelineX,           w: dayW * 5, waiting: true,  label: "WAITING · 5d" },
      { x: timelineX + dayW*5,  w: dayW * 1, waiting: false, label: "WORKING · 1d" },
    ],
  ]

  const arrowTargets = [120, 155, 190] // y entry points into server box

  return (
    <svg viewBox="0 0 800 320" width="100%" style={{ display: "block", border: "1px solid rgb(31,41,55)" }}>
      {/* Background */}
      <rect width="800" height="320" fill="#080808" />

      {/* Lane bands */}
      <rect x="0" y="35"  width="800" height="90" fill="rgba(239,68,68,0.03)" />
      <rect x="0" y="125" width="800" height="90" fill="rgba(34,197,94,0.02)" />
      <rect x="0" y="215" width="800" height="90" fill="rgba(239,68,68,0.03)" />

      {/* Lane dividers */}
      {[35, 125, 215, 305].map(y => (
        <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgb(31,41,55)" strokeWidth="1" />
      ))}

      {/* BEFORE label */}
      <text x="16" y="22" fontFamily="monospace" fontSize="10" fill="rgb(239,68,68)" style={{ letterSpacing: "3px" }}>
        BEFORE
      </text>

      {/* Developer circles + names */}
      {lanes.map((lane) => (
        <g key={lane.name}>
          <circle cx="55" cy={lane.cy} r="20" fill={`${lane.accent}18`} stroke={lane.accent} strokeWidth="1.5" />
          <text x="55" y={lane.cy + 4} textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="700" fill={lane.accent}>
            {lane.name}
          </text>
        </g>
      ))}

      {/* Timeline blocks */}
      {blocks.map((laneBlocks, li) =>
        laneBlocks.map((b, bi) => {
          const midX = b.x + b.w / 2
          const midY = lanes[li].by + lanes[li].bh / 2
          return (
            <g key={`${li}-${bi}`}>
              <rect
                x={b.x} y={lanes[li].by} width={b.w} height={lanes[li].bh}
                fill={b.waiting ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.03)"}
                stroke={b.waiting ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.08)"}
                strokeWidth="1"
              />
              <text x={midX} y={midY + 4} textAnchor="middle" fontFamily="monospace" fontSize="9" fill={b.waiting ? "rgb(239,68,68)" : "rgb(107,114,128)"} style={{ letterSpacing: "1px" }}>
                {b.label}
              </text>
            </g>
          )
        })
      )}

      {/* Arrows → shared server (overlapping, chaotic) */}
      {lanes.map((lane, li) => (
        <path
          key={lane.name}
          d={`M${timelineX - 30},${lane.cy} C${(serverX + timelineX) / 2},${lane.cy} ${(serverX + timelineX) / 2},${arrowTargets[li]} ${serverX},${arrowTargets[li]}`}
          fill="none"
          stroke={lane.accent}
          strokeWidth="1.5"
          strokeOpacity="0.6"
          strokeDasharray="4 3"
          markerEnd={`url(#arr-${li})`}
        />
      ))}

      {/* Arrow markers */}
      <defs>
        {lanes.map((lane, li) => (
          <marker key={li} id={`arr-${li}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={lane.accent} fillOpacity="0.7" />
          </marker>
        ))}
      </defs>

      {/* Shared server box */}
      <rect x={serverX} y="50" width="160" height="210" fill="rgba(239,68,68,0.05)" stroke="rgba(239,68,68,0.4)" strokeWidth="1" />
      <text x="700" y="90"  textAnchor="middle" fontFamily="monospace" fontSize="16" fill="rgb(239,68,68)">⚠</text>
      <text x="700" y="115" textAnchor="middle" fontFamily="monospace" fontSize="9"  fill="rgb(239,68,68)" style={{ letterSpacing: "1px" }}>ONE SHARED SERVER</text>
      <text x="700" y="138" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgb(107,114,128)">State unknown.</text>
      <text x="700" y="158" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgb(107,114,128)">Rebuild: days.</text>

      {/* Footer total */}
      <text x="16" y="315" fontFamily="monospace" fontSize="10" fill="rgba(239,68,68,0.7)" style={{ letterSpacing: "0.5px" }}>
        13 days of pure wait time per feature
      </text>

      {/* Outer border */}
      <rect width="800" height="320" fill="none" stroke="rgb(31,41,55)" strokeWidth="1" />
    </svg>
  )
}

function AfterDiagram() {
  const rows = [
    {
      name: "KAI",  accent: "rgb(251,146,60)",  cy: 65,
      container: "test",        env: "NODE_ENV=test",        port: "3001",
    },
    {
      name: "LISA", accent: "rgb(34,197,94)",   cy: 145,
      container: "dev",         env: "NODE_ENV=development", port: "3000",
    },
    {
      name: "MARCO", accent: "rgb(239,68,68)", cy: 225,
      container: "prod",        env: "NODE_ENV=production",  port: "3002",
    },
  ]

  const boxX = 130
  const boxW = 510
  const boxH = 60
  // Internal column dividers (relative to boxX)
  const col1 = 140  // container name width
  const col2 = 300  // env width
  const col3 = 410  // port width

  return (
    <svg viewBox="0 0 800 280" width="100%" style={{ display: "block", border: "1px solid rgb(31,41,55)" }}>
      <rect width="800" height="280" fill="#080808" />

      {/* AFTER label */}
      <text x="16" y="20" fontFamily="monospace" fontSize="10" fill="rgb(34,197,94)" style={{ letterSpacing: "3px" }}>
        AFTER
      </text>

      {/* Row lane separators */}
      {[30, 110, 190, 270].map(y => (
        <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgb(31,41,55)" strokeWidth="1" />
      ))}

      {rows.map((row) => {
        const boxY = row.cy - boxH / 2
        const midY = row.cy
        return (
          <g key={row.name}>
            {/* Dev circle */}
            <circle cx="55" cy={row.cy} r="20" fill={`${row.accent}18`} stroke={row.accent} strokeWidth="1.5" />
            <text x="55" y={row.cy + 4} textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="700" fill={row.accent}>
              {row.name}
            </text>

            {/* Arrow */}
            <line x1="76" y1={row.cy} x2={boxX - 6} y2={row.cy} stroke={row.accent} strokeWidth="1.5" strokeOpacity="0.7" markerEnd={`url(#aarr-${row.name})`} />

            {/* Container box */}
            <rect x={boxX} y={boxY} width={boxW} height={boxH} fill={`${row.accent}08`} stroke={`${row.accent}60`} strokeWidth="1" />

            {/* Internal dividers */}
            {[col1, col2, col3].map(cx => (
              <line key={cx} x1={boxX + cx} y1={boxY} x2={boxX + cx} y2={boxY + boxH} stroke={`${row.accent}25`} strokeWidth="1" />
            ))}

            {/* Col 1: container name */}
            <text x={boxX + col1/2} y={midY - 8} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgb(75,85,99)" style={{ letterSpacing: "1px" }}>CONTAINER</text>
            <text x={boxX + col1/2} y={midY + 8} textAnchor="middle" fontFamily="monospace" fontSize="13" fontWeight="700" fill={row.accent}>{row.container}</text>

            {/* Col 2: env */}
            <text x={boxX + col1 + (col2-col1)/2} y={midY - 8} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgb(75,85,99)" style={{ letterSpacing: "1px" }}>ENV</text>
            <text x={boxX + col1 + (col2-col1)/2} y={midY + 8} textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgb(156,163,175)">{row.env}</text>

            {/* Col 3: port */}
            <text x={boxX + col2 + (col3-col2)/2} y={midY - 8} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgb(75,85,99)" style={{ letterSpacing: "1px" }}>PORT</text>
            <text x={boxX + col2 + (col3-col2)/2} y={midY + 8} textAnchor="middle" fontFamily="monospace" fontSize="13" fontWeight="700" fill="rgb(6,182,212)">{row.port}</text>

            {/* Col 4: status */}
            <text x={boxX + col3 + (boxW-col3)/2} y={midY - 8} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgb(75,85,99)" style={{ letterSpacing: "1px" }}>STATUS</text>
            <text x={boxX + col3 + (boxW-col3)/2} y={midY + 8} textAnchor="middle" fontFamily="monospace" fontSize="10" fontWeight="700" fill="rgb(34,197,94)">✓ RUNNING</text>
          </g>
        )
      })}

      {/* Arrow markers */}
      <defs>
        {rows.map((row) => (
          <marker key={row.name} id={`aarr-${row.name}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={row.accent} fillOpacity="0.7" />
          </marker>
        ))}
      </defs>

      {/* Right-side bracket */}
      <line x1="652" y1="43"  x2="660" y2="43"  stroke="rgb(34,197,94)" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="660" y1="43"  x2="660" y2="237" stroke="rgb(34,197,94)" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="652" y1="237" x2="660" y2="237" stroke="rgb(34,197,94)" strokeWidth="1" strokeOpacity="0.6" />
      <text
        x="670" y="145" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgb(34,197,94)"
        transform="rotate(-90, 670, 145)" style={{ letterSpacing: "1px" }}
      >
        All running simultaneously
      </text>

      {/* Bottom note */}
      <text x="400" y="272" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="rgba(34,197,94,0.7)" style={{ letterSpacing: "0.5px" }}>
        docker compose up — 30 seconds. Identical every time.
      </text>

      {/* Outer border */}
      <rect width="800" height="280" fill="none" stroke="rgb(31,41,55)" strokeWidth="1" />
    </svg>
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
            style={{ color: "rgb(6,182,212)" }}
          >
            Mission Complete - M-02
          </p>
          <h1
            className="text-5xl text-white tracking-tight leading-tight"
            style={{ ...syne.style, fontWeight: 800 }}
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

          <BeforeDiagram />

          <p className="text-sm text-gray-500 italic text-center py-4">
            The shared server was not a resource problem. It was an architecture problem.
          </p>

          <AfterDiagram />
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
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)" }}
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
                    style={{ ...syne.style, color: "rgb(239,68,68)" }}
                  >
                    {d.before}
                  </span>
                  <span className="font-mono text-gray-700">→</span>
                  <span
                    className="text-xl font-mono font-bold"
                    style={{ ...syne.style, color: "rgb(6,182,212)" }}
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
              backgroundColor: "#080808",
              borderColor: "rgb(31,41,55)",
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
              style={{ backgroundColor: "rgb(6,182,212)", color: "#000", ...syne.style, fontWeight: 700 }}
            >
              Back to dashboard →
            </a>
            <span
              className="flex items-center gap-3 px-8 py-4 text-sm font-mono border cursor-not-allowed"
              style={{
                backgroundColor: "#0a0a0a",
                borderColor: "rgb(31,41,55)",
                color: "rgb(55,65,81)",
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
    <main className="min-h-screen text-gray-100 flex flex-col" style={{ backgroundColor: "#000" }}>
      <MissionHeader fase={phase} />
      {phase === 1 && <Phase1 />}
      {phase === 2 && <Phase2 />}
      {phase === 3 && <Phase3 />}
      {phase === 4 && <Phase4 />}
    </main>
  )
}
