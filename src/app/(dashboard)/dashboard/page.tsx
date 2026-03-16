import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

// ─── DORA baseline + per-mission impact ───────────────────────────────────────

type DoraState = {
  df: { value: string; perf: string };
  lt: { value: string; perf: string };
  cfr: { value: string; perf: string };
  mttr: { value: string; perf: string };
};

const doraBaseline: DoraState = {
  df:   { value: "1× per month",  perf: "LOW PERFORMER"    },
  lt:   { value: "43 days",       perf: "LOW PERFORMER"    },
  cfr:  { value: "42%",           perf: "LOW PERFORMER"    },
  mttr: { value: "72 hours",      perf: "LOW PERFORMER"    },
};

const missionImpact: Record<string, Partial<DoraState>> = {
  "M-01": {
    df: { value: "2× per month", perf: "MEDIUM PERFORMER" },
  },
  "M-02": {
    cfr: { value: "28%",     perf: "MEDIUM PERFORMER" },
    lt:  { value: "36 days", perf: "MEDIUM PERFORMER" },
  },
};

function computeDora(completedIds: Set<string>): DoraState {
  let state = { ...doraBaseline };
  for (const id of ["M-01", "M-02", "M-03"]) {
    if (completedIds.has(id) && missionImpact[id]) {
      state = { ...state, ...missionImpact[id] };
    }
  }
  return state;
}

// ─── Static mission definitions ───────────────────────────────────────────────

const missionDefs = [
  {
    id: "M-01",
    title: "Value Stream Mapping",
    category: "FLOW",
    description:
      "Map the value stream of Nexus Corp. Make the bottlenecks visible and calculate the real flow efficiency.",
    href: "/missions/vsm",
    alwaysUnlocked: true,
  },
  {
    id: "M-02",
    title: "On-Demand Environments",
    category: "TECHNICAL",
    description:
      "Every developer sets up their environment manually. No staging. No consistency. Fix it.",
    href: "/missions/pipeline",
    alwaysUnlocked: true,
  },
  {
    id: "M-03",
    title: "Build the Pipeline",
    category: "TECHNICAL",
    description:
      "Nexus Corp deploys manually from a zip file. Build their first CI pipeline and cut lead time in half.",
    href: null,
    alwaysUnlocked: false,
    unlockedBy: "M-02",
  },
];

const roleLabels: Record<string, string> = {
  engineer: "Engineer",
  manager: "Manager",
  coach: "Coach / Trainer",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, role: true, onboardingCompleted: true, name: true },
  });

  if (!user?.onboardingCompleted) {
    redirect("/onboarding");
  }

  const progress = await prisma.userProgress.findMany({
    where: { userId: user.id },
    select: { moduleId: true },
  });

  const completedIds = new Set(progress.map((p) => p.moduleId));
  const dora = computeDora(completedIds);

  const doraMetrics = [
    { label: "Deployment Frequency",  code: "DF",   ...dora.df,   elite: "Multiple times per day" },
    { label: "Lead Time for Changes", code: "LT",   ...dora.lt,   elite: "Less than a day"        },
    { label: "Change Failure Rate",   code: "CFR",  ...dora.cfr,  elite: "Below 15%"              },
    { label: "Mean Time to Restore",  code: "MTTR", ...dora.mttr, elite: "Less than an hour"      },
  ];

  const missions = missionDefs.map((def) => {
    const completed = completedIds.has(def.id);
    const unlocked =
      def.alwaysUnlocked ||
      (def.unlockedBy ? completedIds.has(def.unlockedBy) : false);
    return { ...def, completed, unlocked };
  });

  const displayName = user.name ?? session.user.name ?? session.user.email;
  const roleLabel = user.role ? (roleLabels[user.role] ?? user.role) : null;

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
              const isMedium = m.perf === "MEDIUM PERFORMER";
              const perfColor = isMedium ? "rgb(234,179,8)" : "rgb(239,68,68)";
              const valueColor = isMedium ? "rgb(234,179,8)" : "rgb(239,68,68)";
              return (
                <div
                  key={m.code}
                  className="flex flex-col gap-3 p-5"
                  style={{
                    borderRight:
                      i < doraMetrics.length - 1 ? "1px solid rgb(31,41,55)" : undefined,
                    backgroundColor: "#080808",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-700">{m.code}</span>
                    <span className="text-xs font-mono" style={{ color: perfColor }}>
                      {m.perf}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">{m.label}</p>
                    <p
                      className="text-3xl font-mono font-bold leading-none"
                      style={{ ...syne.style, color: valueColor }}
                    >
                      {m.value}
                    </p>
                  </div>
                  <div className="border-t border-gray-900 pt-2">
                    <p className="text-xs text-gray-700 font-mono uppercase tracking-widest mb-0.5">
                      Elite
                    </p>
                    <p className="text-xs text-gray-500">{m.elite}</p>
                  </div>
                </div>
              );
            })}
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

          <p className="text-sm text-gray-500">
            Transform Nexus Corp from low performer to elite.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {missions.map((m) => {
              const borderColor = m.completed
                ? "rgb(6,182,212)"
                : m.unlocked
                ? "rgba(6,182,212,0.5)"
                : "rgb(31,41,55)";
              const borderLeft = m.completed
                ? "3px solid rgb(6,182,212)"
                : m.unlocked
                ? "3px solid rgba(6,182,212,0.5)"
                : "3px solid rgb(31,41,55)";
              const bg = m.completed
                ? "#060d0f"
                : m.unlocked
                ? "#090909"
                : "#050505";

              const card = (
                <div
                  className="flex flex-col gap-4 p-6 border h-full"
                  style={{
                    backgroundColor: bg,
                    borderColor,
                    borderLeft,
                    opacity: m.unlocked || m.completed ? 1 : 0.5,
                  }}
                >
                  {/* Mission header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-600">{m.id}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-mono px-1.5 py-0.5 border"
                        style={
                          m.unlocked || m.completed
                            ? {
                                color: "rgb(6,182,212)",
                                borderColor: "rgba(6,182,212,0.25)",
                                backgroundColor: "rgba(6,182,212,0.05)",
                              }
                            : {
                                color: "rgb(75,85,99)",
                                borderColor: "rgb(31,41,55)",
                              }
                        }
                      >
                        {m.category}
                      </span>
                      {!m.unlocked && !m.completed && (
                        <span className="text-gray-700 text-sm">⊘</span>
                      )}
                      {m.completed && (
                        <span
                          className="text-xs font-mono"
                          style={{ color: "rgb(6,182,212)" }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg text-white leading-snug"
                    style={{ ...syne.style, fontWeight: 700 }}
                  >
                    {m.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">
                    {m.description}
                  </p>

                  {/* Status */}
                  <div className="border-t border-gray-900 pt-3">
                    {m.completed ? (
                      <span
                        className="text-xs font-mono tracking-widest"
                        style={{ color: "rgb(6,182,212)" }}
                      >
                        ✓ COMPLETED
                      </span>
                    ) : m.unlocked ? (
                      <span
                        className="text-xs font-mono tracking-widest"
                        style={{ color: "rgb(6,182,212)" }}
                      >
                        ▸ START MISSION
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-gray-700 tracking-widest">
                        ⊘ LOCKED
                      </span>
                    )}
                  </div>
                </div>
              );

              return m.unlocked || m.completed ? (
                <a
                  key={m.id}
                  href={m.href ?? "#"}
                  className="block hover:opacity-90 transition-opacity"
                >
                  {card}
                </a>
              ) : (
                <div key={m.id}>{card}</div>
              );
            })}
          </div>
        </section>

        {/* ── Footer note ───────────────────────────────────────────────────── */}
        <footer className="border-t border-gray-900 pt-6">
          <p className="text-xs font-mono text-gray-700">
            Your actions affect the DORA metrics of Nexus Corp. Start with mission 01.
          </p>
        </footer>

      </div>
    </main>
  );
}
