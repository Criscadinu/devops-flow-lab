import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Syne } from "next/font/google";
import { Fase3 } from "./Fase3";
import { Fase4 } from "./Fase4";
import { completeMission } from "@/app/actions/progress";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "M-01 Value Stream Mapping - DevOps Flow Lab",
}

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

// ─── Shared: Mission Header ───────────────────────────────────────────────────

function MissionHeader({ fase }: { fase: number }) {
  const pct = `${fase * 25}%`;
  return (
    <header className="border-b border-gray-800 px-6 py-4" style={{ backgroundColor: "#080808" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-sm font-mono font-bold tracking-widest" style={{ color: "rgb(255,85,0)" }}>
          M-01
        </span>
        <span className="text-sm font-bold tracking-tight text-white" style={syne.style}>
          Value Stream Mapping
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
  );
}

// ─── Shared: CTA row ─────────────────────────────────────────────────────────

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
  );
}

// ─── Phase 1 - The situation at Nexus Corp ────────────────────────────────────

const panels = [
  {
    initials: "SM",
    name: "Sarah",
    role: "Engineering Manager",
    badge: "MANAGEMENT",
    accent: "rgb(255,85,0)",
    badgeBg: "rgba(255,85,0,0.08)",
    badgeBorder: "rgba(255,85,0,0.3)",
    quote: (
      <>
        &ldquo;Welcome. We deploy once a month. A feature takes an average of{" "}
        <mark>6 weeks</mark> from idea to production. I don&apos;t know where the time
        goes - but pressure from above is growing.&rdquo;
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
        &ldquo;A ticket sits in the backlog for an average of <mark>5 days</mark> before a
        developer picks it up. I write detailed specs - that costs me{" "}
        <mark>2 days</mark> per feature.&rdquo;
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
        &ldquo;Writing code takes <mark>3 days</mark>. But then I wait an average of{" "}
        <mark>3 days</mark> for a code review. The review itself takes{" "}
        <mark>4 hours</mark>. And then it waits another <mark>1 day</mark> before QA
        picks it up.&rdquo;
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
        &ldquo;We get everything at once at the end of the sprint. Testing takes{" "}
        <mark>2 days</mark>, but we wait an average of <mark>5 days</mark>{" "}
        before we can start - the test environment is busy or not stable.&rdquo;
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
        &ldquo;Acceptance testing in ACC takes <mark>1 day</mark>. But deployment to
        ACC? An average of <mark>8 days</mark> waiting - it has to be scheduled.
        Deploy to production is manual, takes <mark>4 hours</mark>, locked to the
        last Friday - an average of <mark>12 days</mark> wait time.&rdquo;
      </>
    ),
  },
  {
    initials: "YOU",
    name: "You",
    role: "New Engineer",
    badge: "PLAYER",
    accent: "rgb(255,85,0)",
    badgeBg: "rgba(255,85,0,0.08)",
    badgeBorder: "rgba(255,85,0,0.3)",
    isPlayer: true,
    quote: (
      <>
        &ldquo;You&apos;ve heard it all. The frustration is tangible. But you see the
        pattern. This is not a people problem. This is a systems problem.&rdquo;
      </>
    ),
    outro: "Time to map the value stream.",
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
            Day one. Nexus Corp.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Listen carefully. All the information you need is in these conversations.
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
          href="?phase=2"
          label="Understand the theory →"
          sub="Phase 2 of 4 - What is a value stream?"
        />
      </div>

      {/* Mark styling */}
      <style>{`
        mark {
          background: none;
          color: rgb(255,85,0);
          font-family: monospace;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}

// ─── Phase 2 - The theory ─────────────────────────────────────────────────────

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
            What is a Value Stream?
          </h2>
          <p className="text-gray-400 leading-relaxed">
            A value stream is everything needed to turn an idea into working software for
            the customer. From the moment a developer starts coding until the feature goes
            live. Every step costs time - and not every step adds value.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">02</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            The two types of time
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="flex flex-col gap-3 p-6 border"
              style={{ backgroundColor: "#060f06", borderColor: "rgba(34,197,94,0.25)", borderLeft: "3px solid rgb(34,197,94)" }}
            >
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgb(34,197,94)" }}>
                Process Time
              </span>
              <p className="text-white font-medium">The time when real work is being done</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                A developer writes code, a reviewer looks at a pull request,
                a pipeline runs tests. Active work that adds value.
              </p>
            </div>

            <div
              className="flex flex-col gap-3 p-6 border"
              style={{ backgroundColor: "#0f0606", borderColor: "rgba(239,68,68,0.25)", borderLeft: "3px solid rgb(239,68,68)" }}
            >
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "rgb(239,68,68)" }}>
                Wait Time
              </span>
              <p className="text-white font-medium">The time when work waits for something or someone</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Waiting for a review, an approval, a deployment slot, another team.
                No value - just time.
              </p>
            </div>
          </div>

          <div className="border border-gray-800 p-5" style={{ backgroundColor: "#090909" }}>
            <p className="text-gray-300 text-sm leading-relaxed">
              <span className="text-white font-semibold">
                In most organizations, 80-90% of lead time is... wait time.
              </span>{" "}
              Not because people are lazy, but because the system is designed that way.
              VSM makes that visible.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-700 tracking-widest">03</span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>
          <h2 className="text-3xl text-white tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
            The five questions of VSM
          </h2>

          <ol className="flex flex-col border border-gray-800">
            {[
              "What are the steps from idea to production?",
              "How long does each step take?",
              "How long does work wait between steps?",
              "Where are the bottlenecks?",
              "What can we eliminate or speed up?",
            ].map((q, i) => (
              <li
                key={i}
                className="flex items-start gap-5 px-6 py-4 border-b border-gray-800 last:border-b-0"
                style={{ backgroundColor: i % 2 === 0 ? "#080808" : "#050505" }}
              >
                <span className="text-sm font-mono font-bold shrink-0 w-6 pt-0.5" style={{ color: "rgb(255,85,0)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-gray-300 text-sm leading-relaxed">{q}</span>
              </li>
            ))}
          </ol>
        </section>

        <CTA
          href="?phase=3"
          label="Map the value stream →"
          sub="Phase 3 of 4 - Do it yourself"
        />
      </div>
    </div>
  );
}

// ─── Phase 3 - Interactive exercise ──────────────────────────────────────────

function Phase3() {
  return <Fase3 />;
}

// ─── Phase 4 - Mission complete ───────────────────────────────────────────────

function Phase4() {
  return <Fase4 />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function VSMPage({
  searchParams,
}: {
  searchParams: Promise<{ phase?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");

  const { phase: phaseParam } = await searchParams;
  const phase = ["1", "2", "3", "4"].includes(phaseParam ?? "") ? Number(phaseParam) : 1;

  if (phase === 4) {
    const gateUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { id: true },
    })
    if (!gateUser) redirect("?phase=3")

    // Complete the mission first (idempotent — safe to call multiple times)
    await completeMission("M-01")

    // Now verify it actually exists (guards against DB errors)
    const completed = await prisma.userProgress.findFirst({
      where: { userId: gateUser.id, moduleId: "M-01" },
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
  );
}
