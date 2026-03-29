import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(6,182,212)" }}>
          M-06
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Infrastructure as Code
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
        &ldquo;Marco set up the production server 2 years ago. Nobody else knows how it is
        configured. If it goes down, we are stuck until Marco is available.&rdquo;
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
        &ldquo;I tried to reproduce the prod environment locally last month. Spent{" "}
        <mark>3 days</mark> on it. Still not identical. There is something on the server nobody
        documented.&rdquo;
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
        &ldquo;I have <mark>14 manual steps</mark> to set up a new server. I know them by heart.
        But if I get hit by a bus, nobody can recreate it. It is all in my head.&rdquo;
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
        &ldquo;The test environment drifted from prod again. We found{" "}
        <mark>3 config differences</mark> last week that caused a bug. Nobody knows when they
        changed.&rdquo;
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
        &ldquo;We cannot scale. Adding a second server means Marco spending a week configuring it
        manually. We are stuck at one server.&rdquo;
      </>
    ),
  },
  {
    initials: "YOU",
    name: "You",
    role: "New Engineer",
    badge: "PLAYER",
    accent: "rgb(6,182,212)",
    badgeBg: "rgba(6,182,212,0.08)",
    badgeBorder: "rgba(6,182,212,0.3)",
    isPlayer: true,
    quote: (
      <>
        &ldquo;The infrastructure is a snowflake. Unique, hand-crafted, irreplaceable. That is the
        problem. Infrastructure should be boring, repeatable, and defined in code.&rdquo;
      </>
    ),
    outro: "Make the infrastructure boring.",
  },
]

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">

        <div className="flex flex-col gap-3 max-w-2xl">
          <h2
            className="text-4xl text-white tracking-tight leading-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Week six. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            The app deploys automatically. But the server it deploys to is a mystery.
          </p>
        </div>

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
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ borderColor: "#1a1a1a", backgroundColor: "#0d0d0d" }}
              >
                <div className="flex items-center gap-3">
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
                    <span className="text-white text-sm font-semibold leading-tight">{p.name}</span>
                    <span className="text-gray-600 text-xs">{p.role}</span>
                  </div>
                </div>
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

              <div className="px-5 py-4 flex flex-col gap-3">
                <p className="text-gray-300 text-sm leading-relaxed">{p.quote}</p>
                {"outro" in p && p.outro && (
                  <p className="text-white font-bold text-sm border-t pt-3" style={{ borderColor: "#1a1a1a" }}>
                    {p.outro}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <CTA
          href="?fase=2"
          label="Understand the theory →"
          sub="Phase 2 of 4 - What is Infrastructure as Code?"
        />
      </div>

      <style>{`
        mark {
          background: none;
          color: rgb(6,182,212);
          font-family: monospace;
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}

// ─── Phase 2 - The theory ─────────────────────────────────────────────────────

const infraCards = [
  {
    title: "Mutable infrastructure",
    body: "Servers are patched and configured in place over time. Each change leaves a trace. After months, no two servers are identical. You cannot reproduce the state from scratch. This is called drift.",
    accent: "rgb(239,68,68)",
    bg: "#0a0202",
    border: "rgba(239,68,68,0.25)",
  },
  {
    title: "Immutable infrastructure",
    body: "Servers are never patched. When a change is needed, a new server image is built from code and the old one is replaced. Every server is identical because every server was built from the same definition.",
    accent: "rgb(34,197,94)",
    bg: "#020a02",
    border: "rgba(34,197,94,0.25)",
  },
]

const principles = [
  {
    name: "Idempotency",
    body: "Running the same IaC script twice produces the same result as running it once. You can apply configuration repeatedly without breaking anything.",
    accent: "rgb(6,182,212)",
  },
  {
    name: "Consistency",
    body: "Every environment — dev, test, staging, prod — is provisioned from the same code. If it works in staging, it works in prod. Environment drift becomes impossible.",
    accent: "rgb(167,139,250)",
  },
  {
    name: "Traceability",
    body: "Every infrastructure change is a commit. You can see who changed what, when, and why. Rolling back infrastructure is the same as reverting a commit.",
    accent: "rgb(251,146,60)",
  },
]

const tools = [
  { name: "Terraform",       type: "Provisioning",    use: "Create and manage cloud resources (servers, databases, networks). Declarative HCL syntax.",     lang: "HCL"  },
  { name: "Ansible",         type: "Configuration",   use: "Install and configure software on servers. Runs over SSH, no agent required.",                    lang: "YAML" },
  { name: "Docker",          type: "Container",        use: "Package your app and its dependencies into a portable image. Runs identically everywhere.",       lang: "Dockerfile" },
  { name: "Docker Compose",  type: "Orchestration",   use: "Define and run multi-container applications locally. The IaC for your development environment.",  lang: "YAML" },
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
            What is Infrastructure as Code?
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Infrastructure as Code means your servers, networks, and environments are defined in files
            — the same way your application is. Those files are version controlled, reviewed in pull
            requests, and applied by automated tools. The result: infrastructure is reproducible,
            consistent, and auditable.
          </p>
          <p className="text-gray-400 leading-relaxed">
            The key shift: instead of a human executing commands on a server, a tool reads a
            definition and makes the server match it. The definition is the source of truth — not the
            server itself.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Mutable vs immutable infrastructure
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {infraCards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-3 p-6 border"
                style={{ backgroundColor: card.bg, borderColor: card.border, borderLeft: `3px solid ${card.accent}` }}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: card.accent }}>
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
            The three IaC principles
          </h2>
          <div className="flex flex-col gap-3">
            {principles.map((p, i) => (
              <div
                key={p.name}
                className="flex gap-5 p-5 border"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)" }}
              >
                <div className="shrink-0 flex flex-col items-center gap-1 pt-0.5">
                  <span className="text-xs font-mono text-gray-700">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: p.accent }}>
                    {p.name}
                  </span>
                  <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">04</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            IaC tools overview
          </h2>
          <div className="border border-gray-800">
            <div
              className="grid grid-cols-12 border-b border-gray-800 px-5 py-3"
              style={{ backgroundColor: "#0d0d0d" }}
            >
              <span className="col-span-3 text-xs font-mono text-gray-600 uppercase tracking-widest">Tool</span>
              <span className="col-span-2 text-xs font-mono text-gray-600 uppercase tracking-widest">Type</span>
              <span className="col-span-5 text-xs font-mono text-gray-600 uppercase tracking-widest">Use</span>
              <span className="col-span-2 text-xs font-mono text-gray-600 uppercase tracking-widest">Language</span>
            </div>
            {tools.map((t, i) => (
              <div
                key={t.name}
                className="grid grid-cols-12 px-5 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
              >
                <span className="col-span-3 text-sm font-mono font-bold text-white">{t.name}</span>
                <span className="col-span-2 text-xs font-mono" style={{ color: "rgb(6,182,212)" }}>{t.type}</span>
                <span className="col-span-5 text-xs text-gray-400 leading-relaxed">{t.use}</span>
                <span className="col-span-2 text-xs font-mono text-gray-600">{t.lang}</span>
              </div>
            ))}
          </div>
        </section>

        <CTA
          href="?fase=3"
          label="Define the Nexus Corp infrastructure →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

const beforeAfter = [
  { before: "Mystery server nobody can recreate",       after: "Environment fully defined in version control"   },
  { before: "14 manual steps to provision a server",   after: "One command to spin up any environment"         },
  { before: "Configuration drift between environments", after: "Identical environments guaranteed by code"      },
  { before: "Marco is the bus factor",                  after: "Any developer can provision the infrastructure" },
]

const doraImpact = [
  { metric: "Change Failure Rate",   code: "CFR", before: "10%",     after: "7%",      note: "reproducible environments eliminate config-related failures" },
  { metric: "Lead Time for Changes", code: "LT",  before: "10 days", after: "7 days",  note: "no more waiting for manual environment setup"               },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(6,182,212)" }}>
            Mission Complete - M-06
          </p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Infrastructure is Code Now.
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            This is what you built for Nexus Corp.
          </p>
        </div>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What changed</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="border border-gray-800">
            <div className="grid grid-cols-2 border-b border-gray-800" style={{ backgroundColor: "#0d0d0d" }}>
              <div className="px-5 py-3 border-r border-gray-800">
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(239,68,68)" }}>Before</span>
              </div>
              <div className="px-5 py-3">
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(34,197,94)" }}>After</span>
              </div>
            </div>
            {beforeAfter.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-2 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
              >
                <div className="px-5 py-4 border-r border-gray-800">
                  <p className="text-sm text-gray-500">{row.before}</p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm text-gray-300">{row.after}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your impact on Nexus Corp</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {doraImpact.map((d) => (
              <div
                key={d.code}
                className="flex flex-col gap-4 border p-6"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)" }}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{d.metric}</span>
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-mono font-bold" style={{ ...syne.style, color: "rgb(239,68,68)" }}>
                    {d.before}
                  </span>
                  <span className="font-mono text-gray-700">→</span>
                  <span className="text-xl font-mono font-bold" style={{ ...syne.style, color: "rgb(6,182,212)" }}>
                    {d.after}
                  </span>
                </div>
                <p className="text-xs font-mono text-gray-600">{d.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">03</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What&apos;s next</h2>
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
              Infrastructure is code. But deploys are still risky — one bad release affects all users.
              Next mission: Architecture for Low-Risk Releases.
            </p>
          </div>
        </section>

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
              style={{ backgroundColor: "#0a0a0a", borderColor: "rgb(31,41,55)", color: "rgb(55,65,81)" }}
              title="Not yet available"
            >
              <span>⊘</span>
              Next mission: Architecture for Low-Risk Releases →
            </span>
          </div>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M06Page({
  searchParams,
}: {
  searchParams: Promise<{ fase?: string }>
}) {
  const session = await auth()
  if (!session?.user?.email) redirect("/api/auth/signin")

  const { fase: faseParam } = await searchParams
  const fase = ["1", "2", "3", "4"].includes(faseParam ?? "") ? Number(faseParam) : 1

  if (fase === 4) {
    try {
      await completeMission("M-06")
    } catch {
      // Neon HTTP adapter does not support transactions; progress save is best-effort
    }
  }

  return (
    <main className="min-h-screen text-gray-100 flex flex-col" style={{ backgroundColor: "#000" }}>
      <MissionHeader fase={fase} />
      {fase === 1 && <Phase1 />}
      {fase === 2 && <Phase2 />}
      {fase === 3 && <Phase3 />}
      {fase === 4 && <Phase4 />}
    </main>
  )
}
