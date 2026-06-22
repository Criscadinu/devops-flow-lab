import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Syne } from "next/font/google"
import { Phase3 } from "./Phase3"
import { completeMission } from "@/app/actions/progress"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "M-03 Single Repository of Truth - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(255,85,0)" }}>
          M-03
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Single Repository of Truth
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
        style={{ background: "linear-gradient(135deg, #FF0000 0%, #FF5500 50%, #FF8C00 100%)", color: "#fff", ...syne.style, fontWeight: 700 }}
      >
        {label}
      </a>
      {sub && <p className="text-xs font-mono text-gray-700">{sub}</p>}
    </div>
  )
}

// ─── Phase 1 - The situation ──────────────────────────────────────────────────

type DialogueEntry =
  | { type: "line"; initials: string; name: string; role: string; accent: string; text: string }
  | { type: "beat"; text: string }
  | { type: "you"; text: string; closing: string }

const dialogue: DialogueEntry[] = [
  {
    type: "line",
    initials: "MA",
    name: "Marco",
    role: "OPS",
    accent: "rgb(239,68,68)",
    text: "The deploy failed. The config file I used was from last Tuesday.",
  },
  {
    type: "line",
    initials: "LI",
    name: "Lisa",
    role: "DEV",
    accent: "rgb(34,197,94)",
    text: "Last Tuesday? I updated the config two weeks ago. It is in my home folder.",
  },
  {
    type: "line",
    initials: "MA",
    name: "Marco",
    role: "OPS",
    accent: "rgb(239,68,68)",
    text: "Your home folder is not a version control system.",
  },
  {
    type: "line",
    initials: "TO",
    name: "Tom",
    role: "PRODUCT",
    accent: "rgb(167,139,250)",
    text: "I have the requirements doc in Google Drive. Version 4. Or 5. I am not sure which one the team used.",
  },
  {
    type: "line",
    initials: "LI",
    name: "Lisa",
    role: "DEV",
    accent: "rgb(34,197,94)",
    text: "We used version 3. I think.",
  },
  {
    type: "line",
    initials: "MA",
    name: "Marco",
    role: "OPS",
    accent: "rgb(239,68,68)",
    text: "So the config is from the wrong week, the requirements are from the wrong version, and the code is the only thing that is actually in Git.",
  },
  {
    type: "line",
    initials: "LI",
    name: "Lisa",
    role: "DEV",
    accent: "rgb(34,197,94)",
    text: "The tests are not in Git either. Kai has them locally.",
  },
  {
    type: "beat",
    text: "Nobody said anything.",
  },
  {
    type: "line",
    initials: "MA",
    name: "Marco",
    role: "OPS",
    accent: "rgb(239,68,68)",
    text: "We have a repository. We just do not use it for anything except the code.",
  },
  {
    type: "you",
    text: "A single repository of truth means everything goes in Git. Code, tests, configuration, infrastructure, documentation. If it is not in the repo, it does not exist. The repo is the system.",
    closing: "If it is not in Git, it is not real.",
  },
]

function Phase1() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">

        <div className="flex flex-col gap-3 max-w-2xl">
          <h2
            className="text-4xl text-white tracking-tight leading-tight"
            style={{ ...syne.style, fontWeight: 800 }}
          >
            Week three. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            The deploy broke. Marco has the config. Lisa has the code. Tom has the requirements doc. Nobody has the same version of anything.
          </p>
        </div>

        <div className="flex flex-col">
          {dialogue.map((entry, i) => {
            if (entry.type === "beat") {
              return (
                <div key={i} className="py-6 text-center">
                  <em className="text-sm text-gray-600 italic">{entry.text}</em>
                </div>
              )
            }

            if (entry.type === "you") {
              return (
                <div
                  key={i}
                  className="flex flex-col gap-4 p-6 mt-2"
                  style={{
                    backgroundColor: "rgba(255,85,0,0.04)",
                    borderLeft: "3px solid rgb(255,85,0)",
                    border: "1px solid rgba(255,85,0,0.2)",
                    borderLeftWidth: "3px",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 flex items-center justify-center text-xs font-mono font-bold shrink-0"
                      style={{
                        backgroundColor: "rgba(255,85,0,0.12)",
                        border: "1px solid rgba(255,85,0,0.4)",
                        color: "rgb(255,85,0)",
                      }}
                    >
                      YOU
                    </div>
                    <div className="flex flex-col gap-0">
                      <span className="text-white text-xs font-mono font-bold">You</span>
                      <span className="text-gray-600 text-xs font-mono">New Engineer</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{entry.text}</p>
                  <p className="text-white font-bold text-sm border-t pt-3" style={{ borderColor: "rgba(255,85,0,0.2)" }}>
                    {entry.closing}
                  </p>
                </div>
              )
            }

            return (
              <div
                key={i}
                className="flex flex-col gap-2 px-5 py-4"
                style={{
                  backgroundColor: i % 2 === 0 ? "#080808" : "#060606",
                  borderLeft: `3px solid ${entry.accent}`,
                  borderBottom: "1px solid rgb(21,28,36)",
                }}
              >
                <span
                  className="text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: entry.accent }}
                >
                  {entry.name} · {entry.role}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">{entry.text}</p>
              </div>
            )
          })}
        </div>

        <CTA
          href="?phase=2"
          label="Understand the theory →"
          sub="Phase 2 of 4 - One repo. Everything in it."
        />
      </div>
    </div>
  )
}

// ─── Phase 2 - The theory ─────────────────────────────────────────────────────

function Phase2() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-14">

        <div className="flex flex-col gap-2">
          <p className="text-xs font-mono tracking-widest uppercase text-gray-600">
            FOUNDATIONS — Create the foundations of our deployment pipeline
          </p>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            One Repo. Everything In It.
          </h2>
        </div>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">01</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h3 className="text-2xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            What belongs in version control
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Everything that defines the system belongs in the repository. That means: application code, test suites,
            configuration files (per environment), infrastructure definitions, database migration scripts, build scripts,
            deployment scripts, documentation. The rule is simple: if losing it would break the system or slow down
            the team, it belongs in Git.
          </p>
          <div className="flex flex-col gap-0 border border-gray-800">
            {[
              { item: "Application code",            note: "the obvious one — already in Git"                               },
              { item: "Test suite",                  note: "if tests live on Kai's laptop, they are not real tests"         },
              { item: "Configuration (per env)",     note: "shape of the config; never the secrets"                         },
              { item: "Infrastructure definitions",  note: "Dockerfile, docker-compose.yml, CI workflow"                    },
              { item: "Database migration scripts",  note: "schema changes must be reproducible"                            },
              { item: "Build and deploy scripts",    note: "the deploy runbook should not be in someone's head"             },
              { item: "Operational documentation",   note: "runbook, ADRs, postmortems, architecture notes"                 },
            ].map((row, i) => (
              <div
                key={row.item}
                className="flex gap-4 px-5 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#060606" }}
              >
                <span className="text-xs font-mono font-bold shrink-0 w-48" style={{ color: "rgb(255,85,0)" }}>
                  {row.item}
                </span>
                <span className="text-xs text-gray-500">{row.note}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h3 className="text-2xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Why a single repo
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Splitting code across multiple repositories creates coordination overhead. When a change requires updating
            three repos in the right order, you have introduced a deployment dependency that is invisible to your tooling.
            A single repository makes the system&apos;s state unambiguous — one commit hash describes exactly what is deployed.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">03</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h3 className="text-2xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Configuration as code
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Configuration that lives outside the repo is the most common source of &ldquo;it worked in test but not in prod&rdquo;
            failures. Every environment&apos;s configuration should be in the repo, with secrets injected at runtime via
            environment variables. The repo holds the shape of the config; the secrets manager holds the values.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "In the repo",
                items: [".env.example with placeholder values", "Config schema and required keys", "Per-environment defaults"],
                accent: "rgb(34,197,94)",
              },
              {
                label: "Never in the repo",
                items: [".env with real values", "API keys, tokens, passwords", "Production database credentials"],
                accent: "rgb(239,68,68)",
              },
            ].map((col) => (
              <div
                key={col.label}
                className="flex flex-col gap-3 p-5 border"
                style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)", borderLeft: `3px solid ${col.accent}` }}
              >
                <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: col.accent }}>
                  {col.label}
                </span>
                <div className="flex flex-col gap-2">
                  {col.items.map((item, i) => (
                    <p key={i} className="text-xs text-gray-400 leading-relaxed">{item}</p>
                  ))}
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
          <h3 className="text-2xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            The DORA connection
          </h3>
          <p className="text-gray-400 leading-relaxed">
            A single repository of truth directly reduces Lead Time for Changes. When everything is in one place,
            any engineer can understand the full system state from a single clone. Onboarding takes hours instead
            of days. Incident response is faster because the runbook, the config, and the code are all in the same place.
          </p>
          <div
            className="flex flex-col gap-3 p-5 border"
            style={{ backgroundColor: "#080808", borderColor: "rgba(255,85,0,0.2)", borderLeft: "3px solid rgba(255,85,0,0.4)" }}
          >
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(255,85,0)" }}>
              What this mission does
            </span>
            <p className="text-sm text-gray-400 leading-relaxed">
              This is a FOUNDATIONS mission — it enables everything that follows. The DORA metrics don&apos;t move today.
              But every future mission that does move them depends on having a single, trustworthy source of truth.
            </p>
          </div>
        </section>

        <CTA
          href="?phase=3"
          label="Build the repository of truth →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  )
}

// ─── Phase 4 - Result ─────────────────────────────────────────────────────────

const foundationMetrics = [
  {
    metric: "Deployment Frequency",
    code: "DF",
    note: "automation requires a single source of truth",
  },
  {
    metric: "Lead Time for Changes",
    code: "LT",
    note: "onboarding and incident response both depend on this",
  },
  {
    metric: "Change Failure Rate",
    code: "CFR",
    note: "config drift is eliminated when config lives in Git",
  },
  {
    metric: "Mean Time to Restore",
    code: "MTTR",
    note: "recovery is faster when the runbook is in the repo",
  },
]

function Phase4() {
  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-5xl mx-auto flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgb(255,85,0)" }}>
            Mission Complete - M-03
          </p>
          <h1 className="text-5xl text-white tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
            Nexus Corp Has One Source of Truth
          </h1>
          <p className="text-gray-400 text-base max-w-xl leading-relaxed">
            The metrics don&apos;t move — and that&apos;s exactly right. A single repository of truth does not
            improve a metric today. It changes what is possible tomorrow.
          </p>
        </div>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">01</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What this enables</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div
            className="flex flex-col gap-5 p-6 border"
            style={{
              backgroundColor: "#080808",
              borderColor: "rgba(255,85,0,0.2)",
              borderLeft: "3px solid rgb(255,85,0)",
            }}
          >
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(255,85,0)" }}>
              Foundation, not improvement
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              A single repository of truth does not directly change a DORA metric today. It changes what is possible tomorrow.
              Every future mission in this platform assumes everything is in Git. Without this foundation, automated testing
              cannot find the config, infrastructure cannot be rebuilt, and incident response requires tribal knowledge.
            </p>
            <div className="flex flex-col gap-3 border-t border-gray-800 pt-4">
              {[
                "REPO-AUDIT.md: the gap between ideal and actual is now visible",
                ".env.example: any developer can configure the app without asking anyone",
                "docs/ structure: operational knowledge is versioned and reviewable",
                ".gitignore verified: secrets stay out; config stays in",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "rgb(34,197,94)" }}>✓</span>
                  <p className="text-sm text-gray-400">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">02</span>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Your DORA metrics — foundation</h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {foundationMetrics.map((d) => (
              <div
                key={d.code}
                className="flex flex-col gap-4 border p-6"
                style={{
                  backgroundColor: "#080808",
                  borderColor: "rgb(31,41,55)",
                  borderLeft: "3px solid rgb(55,65,81)",
                }}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">{d.metric}</span>
                  <span className="text-xs font-mono text-gray-700">DORA - {d.code}</span>
                </div>
                <div>
                  <span
                    className="text-xs font-mono px-2 py-0.5 border"
                    style={{
                      color: "rgb(107,114,128)",
                      borderColor: "rgb(55,65,81)",
                      backgroundColor: "rgba(75,85,99,0.06)",
                    }}
                  >
                    FOUNDATION
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
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">What is next</h2>
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
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">
              Next: Enable fast and reliable automated testing
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your pipeline needs a test suite it can trust. The repo is now the foundation —
              the next step is making sure everything in it is verified automatically.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-4 border-t border-gray-900 pt-10">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/missions/m04"
              className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity"
              style={{
                backgroundColor: "rgb(31,41,55)",
                color: "rgb(107,114,128)",
                ...syne.style,
                fontWeight: 700,
                opacity: 0.6,
                pointerEvents: "none" as const,
              }}
            >
              Continue to M-05 →
            </a>
            <a
              href="/dashboard"
              className="px-8 py-4 text-sm font-bold tracking-wide transition-opacity hover:opacity-80"
              style={{ background: "linear-gradient(135deg, #FF0000 0%, #FF5500 50%, #FF8C00 100%)", color: "#fff", ...syne.style, fontWeight: 700 }}
            >
              Back to dashboard →
            </a>
          </div>
          <p className="text-xs font-mono text-gray-700">M-05 unlocks when you complete FOUNDATIONS</p>
        </section>

      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function M16Page({
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
    await completeMission("M-03")

    // Now verify it actually exists (guards against DB errors)
    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-03" },
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
