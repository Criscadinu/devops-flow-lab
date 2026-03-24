import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Syne } from "next/font/google";
import { computeDora } from "@/lib/dora";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

// ─── Static mission definitions ───────────────────────────────────────────────

const missionDefs = [
  {
    id: "M-01",
    title: "Value Stream Mapping",
    category: "FLOW",
    description: "Map the value stream of Nexus Corp. Make the bottlenecks visible and calculate the real flow efficiency.",
    href: "/missions/vsm",
    alwaysUnlocked: true,
    unlockedBy: undefined as string | undefined,
  },
  {
    id: "M-02",
    title: "On-Demand Environments",
    category: "TECHNICAL",
    description: "Every developer sets up their environment manually. No staging. No consistency. Fix it.",
    href: "/missions/pipeline",
    alwaysUnlocked: true,
    unlockedBy: undefined as string | undefined,
  },
  {
    id: "M-03",
    title: "Build the Pipeline",
    category: "TECHNICAL",
    description: "Nexus Corp deploys manually from a zip file. Build their first CI pipeline and cut lead time in half.",
    href: "/missions/m03",
    alwaysUnlocked: false,
    unlockedBy: "M-02",
  },
  {
    id: "M-04",
    title: "Continuous Deployment",
    category: "TECHNICAL",
    description: "The pipeline is green but nothing ships automatically. Wire automatic deployment to every green build.",
    href: "/missions/m04",
    alwaysUnlocked: false,
    unlockedBy: "M-03",
  },
];

const roleLabels: Record<string, string> = {
  engineer: "Engineer",
  manager:  "Manager",
  coach:    "Coach / Trainer",
};

// ─── First Way mission log ─────────────────────────────────────────────────────

const firstWayLog = [
  {
    id: "M-01",
    title: "Value Stream Mapping",
    learned: "You mapped the entire flow from idea to production. Identified 13 days of pure wait time. Made the invisible visible.",
  },
  {
    id: "M-02",
    title: "On-Demand Environments",
    learned: "You containerized Nexus Corp with Docker. Created identical dev, test, and prod environments. Eliminated \"works on my machine.\"",
  },
  {
    id: "M-03",
    title: "Build the Pipeline",
    learned: "You fixed 3 failing tests and wired GitHub Actions to run them on every commit. Nexus Corp now gets a pass or fail signal within minutes of every push.",
  },
  {
    id: "M-04",
    title: "Continuous Deployment",
    learned: "You wired automatic deployment to every green build. Every commit that passes tests now ships to production without human intervention.",
    nextUp: true,
  },
  {
    id: "M-05",
    title: "Monitoring and Observability",
    learned: "Dashboards, alerts, and visibility into what is happening in production after every deploy. Coming after M-04.",
    locked: true,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin");

  const user = await prisma.user.findUnique({
    where:  { email: session.user.email },
    select: { id: true, role: true, onboardingCompleted: true, name: true },
  });

  if (!user?.onboardingCompleted) redirect("/onboarding");

  const progress = await prisma.userProgress.findMany({
    where:  { userId: user.id },
    select: { moduleId: true },
  });

  const completedIds = new Set(progress.map((p) => p.moduleId));
  const dora         = computeDora(completedIds);

  const doraMetrics = [
    { label: "Deployment Frequency",  code: "DF",   ...dora.df,   elite: "Multiple times per day" },
    { label: "Lead Time for Changes", code: "LT",   ...dora.lt,   elite: "Less than a day"        },
    { label: "Change Failure Rate",   code: "CFR",  ...dora.cfr,  elite: "Below 15%"              },
    { label: "Mean Time to Restore",  code: "MTTR", ...dora.mttr, elite: "Less than an hour"      },
  ];

  const missions = missionDefs.map((def) => {
    const completed = completedIds.has(def.id);
    const unlocked  = def.alwaysUnlocked || (def.unlockedBy ? completedIds.has(def.unlockedBy) : false);
    return { ...def, completed, unlocked };
  });

  // ── Maturity bar ────────────────────────────────────────────────────────────
  const TOTAL_MISSIONS = 12;
  const completedCount = completedIds.size;
  const maturityPct    = Math.round((completedCount / TOTAL_MISSIONS) * 100);

  const maturityStages = [
    { label: "Chaos mapped", threshold: 0  },
    { label: "Foundation",   threshold: 17 },
    { label: "Flow",         threshold: 50 },
    { label: "Feedback",     threshold: 75 },
    { label: "Elite",        threshold: 100 },
  ];
  const currentStage = [...maturityStages].reverse().find((s) => maturityPct >= s.threshold)!;

  // ── First Way progress ──────────────────────────────────────────────────────
  const FIRST_WAY_TOTAL    = 5;
  const firstWayCompleted  = firstWayLog.filter((m) => completedIds.has(m.id)).length;
  const firstWayPct        = Math.round((firstWayCompleted / FIRST_WAY_TOTAL) * 100);

  const firstWayUnlocked = completedIds.has("M-01") || completedIds.has("M-02");

  const displayName = user.name ?? session.user.name ?? session.user.email;
  const roleLabel   = user.role ? (roleLabels[user.role] ?? user.role) : null;

  return (
    <main
      className="min-h-screen text-gray-100 px-6 py-10"
      style={{ backgroundColor: "#000", fontFamily: "inherit" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">

        {/* ── Top bar ───────────────────────────────────────────────────────── */}
        <header className="flex items-center justify-between border-b border-gray-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-2 h-6" style={{ backgroundColor: "rgb(6,182,212)" }} />
            <span className="text-xs font-mono tracking-[0.25em] text-gray-400 uppercase">
              Nexus Corp - Command Center
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">{displayName}</span>
            {roleLabel && (
              <span
                className="text-xs font-mono px-2 py-0.5 border"
                style={{
                  color: "rgb(6,182,212)",
                  borderColor: "rgba(6,182,212,0.3)",
                  backgroundColor: "rgba(6,182,212,0.06)",
                }}
              >
                {roleLabel.toUpperCase()}
              </span>
            )}
          </div>
        </header>

        {/* ── DORA Metrics ──────────────────────────────────────────────────── */}
        <section className="flex flex-col gap-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xs font-mono tracking-[0.2em] text-gray-500 uppercase">
              DORA Metrics - Nexus Corp
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 border border-gray-800">
            {doraMetrics.map((m, i) => {
              const isMedium   = m.perf === "MEDIUM PERFORMER";
              const accentColor = isMedium ? "rgb(234,179,8)" : "rgb(239,68,68)";
              return (
                <div
                  key={m.code}
                  className="flex flex-col gap-3 p-5"
                  style={{
                    borderRight: i < doraMetrics.length - 1 ? "1px solid rgb(31,41,55)" : undefined,
                    backgroundColor: "#080808",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-700">{m.code}</span>
                    <span className="text-xs font-mono" style={{ color: accentColor }}>{m.perf}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">{m.label}</p>
                    <p className="text-3xl font-mono font-bold leading-none" style={{ ...syne.style, color: accentColor }}>
                      {m.value}
                    </p>
                  </div>
                  <div className="border-t border-gray-900 pt-2">
                    <p className="text-xs text-gray-700 font-mono uppercase tracking-widest mb-0.5">Elite</p>
                    <p className="text-xs text-gray-500">{m.elite}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Overall Transformation Progress ───────────────────────────────── */}
        <section className="flex flex-col gap-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xs font-mono tracking-[0.2em] text-gray-500 uppercase">
              Overall Transformation
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div
            className="flex flex-col gap-5 p-5 border"
            style={{ backgroundColor: "#080808", borderColor: "rgb(31,41,55)" }}
          >
            {/* Labels */}
            <div className="flex items-baseline justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">Chaos</span>
                <div className="w-16 h-px" style={{ backgroundColor: "rgb(31,41,55)" }} />
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(6,182,212)" }}>
                  Elite DevOps
                </span>
              </div>
              <span className="text-xs font-mono text-gray-600">
                {completedCount}/{TOTAL_MISSIONS} missions — {maturityPct}%
              </span>
            </div>

            {/* Bar */}
            <div
              className="w-full h-2 border"
              style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }}
            >
              <div
                className="h-full"
                style={{ width: `${maturityPct}%`, backgroundColor: "rgb(6,182,212)" }}
              />
            </div>

            {/* Milestones */}
            <div className="flex items-start justify-between">
              {maturityStages.map((s) => {
                const isActive = s.label === currentStage.label;
                const isPast   = maturityPct >= s.threshold;
                return (
                  <div key={s.label} className="flex flex-col items-center gap-1" style={{ width: "20%" }}>
                    <div
                      className="w-1.5 h-1.5"
                      style={{ backgroundColor: isPast ? "rgb(6,182,212)" : "rgb(31,41,55)" }}
                    />
                    <span
                      className="text-xs font-mono text-center leading-tight"
                      style={{
                        color: isActive ? "rgb(6,182,212)" : isPast ? "rgb(75,85,99)" : "rgb(55,65,81)",
                        fontWeight: isActive ? 700 : 400,
                      }}
                    >
                      {s.label}
                    </span>
                    <span className="text-xs font-mono" style={{ color: "rgb(55,65,81)" }}>
                      {s.threshold}%
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Current label */}
            <p className="text-sm text-gray-400 border-t border-gray-900 pt-4">
              Nexus Corp is at:{" "}
              <span className="font-bold" style={{ ...syne.style, color: "rgb(6,182,212)" }}>
                {currentStage.label}
              </span>
            </p>
          </div>
        </section>

        {/* ── Missions ──────────────────────────────────────────────────────── */}
        <section className="flex flex-col gap-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xs font-mono tracking-[0.2em] text-gray-500 uppercase">
              Your Missions
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <p className="text-sm text-gray-500">Transform Nexus Corp from low performer to elite.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {missions.map((m) => {
              const borderColor = m.completed ? "rgb(6,182,212)" : m.unlocked ? "rgba(6,182,212,0.5)" : "rgb(31,41,55)";
              const borderLeft  = m.completed ? "3px solid rgb(6,182,212)" : m.unlocked ? "3px solid rgba(6,182,212,0.5)" : "3px solid rgb(31,41,55)";
              const bg          = m.completed ? "#060d0f" : m.unlocked ? "#090909" : "#050505";

              const card = (
                <div
                  className="flex flex-col gap-4 p-6 border h-full"
                  style={{ backgroundColor: bg, borderColor, borderLeft, opacity: m.unlocked || m.completed ? 1 : 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-600">{m.id}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-mono px-1.5 py-0.5 border"
                        style={
                          m.unlocked || m.completed
                            ? { color: "rgb(6,182,212)", borderColor: "rgba(6,182,212,0.25)", backgroundColor: "rgba(6,182,212,0.05)" }
                            : { color: "rgb(75,85,99)", borderColor: "rgb(31,41,55)" }
                        }
                      >
                        {m.category}
                      </span>
                      {!m.unlocked && !m.completed && <span className="text-gray-700 text-sm">⊘</span>}
                      {m.completed && <span className="text-xs font-mono" style={{ color: "rgb(6,182,212)" }}>✓</span>}
                    </div>
                  </div>

                  <h3 className="text-lg text-white leading-snug" style={{ ...syne.style, fontWeight: 700 }}>
                    {m.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{m.description}</p>

                  <div className="border-t border-gray-900 pt-3">
                    {m.completed ? (
                      <span className="text-xs font-mono tracking-widest" style={{ color: "rgb(6,182,212)" }}>✓ COMPLETED</span>
                    ) : m.unlocked ? (
                      <span className="text-xs font-mono tracking-widest" style={{ color: "rgb(6,182,212)" }}>▸ START MISSION</span>
                    ) : (
                      <span className="text-xs font-mono text-gray-700 tracking-widest">⊘ LOCKED</span>
                    )}
                  </div>
                </div>
              );

              return m.unlocked || m.completed ? (
                <a key={m.id} href={m.href ?? "#"} className="block hover:opacity-90 transition-opacity">{card}</a>
              ) : (
                <div key={m.id}>{card}</div>
              );
            })}
          </div>
        </section>

        {/* ── First Way: Flow ───────────────────────────────────────────────── */}
        <section className="flex flex-col gap-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xs font-mono tracking-[0.2em] text-gray-500 uppercase">
              First Way: Flow
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
            <span className="text-xs font-mono text-gray-700">
              {firstWayCompleted}/{FIRST_WAY_TOTAL} complete
            </span>
          </div>

          {/* Flow progress bar */}
          <div
            className="w-full h-1.5 border"
            style={{ backgroundColor: "#0d0d0d", borderColor: "rgb(31,41,55)" }}
          >
            <div
              className="h-full"
              style={{ width: `${firstWayPct}%`, backgroundColor: "rgb(6,182,212)" }}
            />
          </div>

          {/* Mission log */}
          <div className="flex flex-col" style={{ borderColor: "rgb(31,41,55)", border: "1px solid rgb(31,41,55)" }}>
            {firstWayLog.map((entry, i) => {
              const done    = completedIds.has(entry.id);
              const isNext  = !done && (entry as { nextUp?: boolean }).nextUp;
              const isLocked = !done && !isNext;
              const isLast  = i === firstWayLog.length - 1;

              return (
                <div
                  key={entry.id}
                  className="flex gap-4 p-5"
                  style={{
                    borderBottom: isLast ? undefined : "1px solid rgb(21,31,43)",
                    backgroundColor: done ? "#060d0f" : "#080808",
                    opacity: isLocked ? 0.45 : 1,
                  }}
                >
                  {/* Status icon */}
                  <div className="shrink-0 mt-0.5">
                    {done ? (
                      <div
                        className="w-5 h-5 flex items-center justify-center text-xs font-mono font-bold"
                        style={{ backgroundColor: "rgba(6,182,212,0.1)", color: "rgb(6,182,212)", border: "1px solid rgba(6,182,212,0.3)" }}
                      >
                        ✓
                      </div>
                    ) : isNext ? (
                      <div
                        className="w-5 h-5 flex items-center justify-center"
                        style={{ border: "1px solid rgba(6,182,212,0.4)" }}
                      >
                        <div className="w-1.5 h-1.5" style={{ backgroundColor: "rgba(6,182,212,0.5)" }} />
                      </div>
                    ) : (
                      <div
                        className="w-5 h-5 flex items-center justify-center"
                        style={{ border: "1px solid rgb(31,41,55)" }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-gray-700">{entry.id}</span>
                        <h4
                          className="text-sm text-white"
                          style={{ ...syne.style, fontWeight: 700, color: done ? "rgb(6,182,212)" : isLocked ? "rgb(75,85,99)" : "white" }}
                        >
                          {entry.title}
                        </h4>
                      </div>
                      <span
                        className="text-xs font-mono tracking-widest shrink-0"
                        style={{
                          color: done ? "rgb(6,182,212)" : isNext ? "rgb(234,179,8)" : "rgb(55,65,81)",
                        }}
                      >
                        {done ? "COMPLETED" : isNext ? "NEXT UP" : "LOCKED"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{entry.learned}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Second Way + Third Way ─────────────────────────────────────────── */}
        <section className="flex flex-col gap-4">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xs font-mono tracking-[0.2em] text-gray-500 uppercase">
              Coming Next
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Second Way */}
            <div
              className="flex flex-col gap-4 p-6 border"
              style={{
                backgroundColor: "#050505",
                borderColor: "rgb(31,41,55)",
                borderLeft: "3px solid rgb(31,41,55)",
                opacity: 0.5,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-700 uppercase tracking-widest">
                  Second Way
                </span>
                <span className="text-xs font-mono text-gray-700">⊘ LOCKED</span>
              </div>
              <h3 className="text-lg text-gray-500 leading-snug" style={{ ...syne.style, fontWeight: 700 }}>
                Feedback
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">
                Monitoring, alerting, and fast feedback loops. Unlocks after completing First Way.
              </p>
              <div className="border-t border-gray-900 pt-3">
                <span className="text-xs font-mono text-gray-700 tracking-widest">
                  ⊘ COMPLETE FIRST WAY TO UNLOCK
                </span>
              </div>
            </div>

            {/* Third Way */}
            <div
              className="flex flex-col gap-4 p-6 border"
              style={{
                backgroundColor: "#050505",
                borderColor: "rgb(31,41,55)",
                borderLeft: "3px solid rgb(31,41,55)",
                opacity: 0.5,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-700 uppercase tracking-widest">
                  Third Way
                </span>
                <span className="text-xs font-mono text-gray-700">⊘ LOCKED</span>
              </div>
              <h3 className="text-lg text-gray-500 leading-snug" style={{ ...syne.style, fontWeight: 700 }}>
                Learning
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed flex-1">
                Blameless postmortems, chaos engineering, and continuous improvement. Unlocks after Feedback.
              </p>
              <div className="border-t border-gray-900 pt-3">
                <span className="text-xs font-mono text-gray-700 tracking-widest">
                  ⊘ COMPLETE FEEDBACK TO UNLOCK
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <footer className="border-t border-gray-900 pt-6">
          <p className="text-xs font-mono text-gray-700">
            Your actions affect the DORA metrics of Nexus Corp. Start with mission 01.
          </p>
        </footer>

      </div>
    </main>
  );
}
