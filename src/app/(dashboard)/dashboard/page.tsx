import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

// ─── Data ─────────────────────────────────────────────────────────────────────

const doraMetrics = [
  {
    label: "Deployment Frequency",
    code: "DF",
    value: "1× per maand",
    elite: "Meerdere keren per dag",
    perf: "LOW PERFORMER",
  },
  {
    label: "Lead Time for Changes",
    code: "LT",
    value: "3–6 weken",
    elite: "Minder dan een dag",
    perf: "LOW PERFORMER",
  },
  {
    label: "Change Failure Rate",
    code: "CFR",
    value: "42%",
    elite: "Onder de 15%",
    perf: "LOW PERFORMER",
  },
  {
    label: "Mean Time to Restore",
    code: "MTTR",
    value: "72 uur",
    elite: "Minder dan een uur",
    perf: "LOW PERFORMER",
  },
];

const missions = [
  {
    id: "M-01",
    title: "Value Stream Mapping",
    category: "FLOW",
    description:
      "Breng de waardestroom van Nexus Corp in kaart. Maak de bottlenecks zichtbaar en bereken de echte flow efficiency.",
    status: "unlocked" as const,
    href: "/missions/vsm",
  },
  {
    id: "M-02",
    title: "WIP Wars",
    category: "FLOW",
    description:
      "Het team werkt aan zestien dingen tegelijk en niets komt af. Voer WIP-limieten in en meet het verschil.",
    status: "locked" as const,
    href: null,
  },
  {
    id: "M-03",
    title: "Pipeline Bouwen",
    category: "TECHNICAL",
    description:
      "Nexus Corp deployt handmatig, één keer per maand. Bouw hun eerste deployment pipeline.",
    status: "locked" as const,
    href: null,
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
    select: { role: true, onboardingCompleted: true, name: true },
  });

  if (!user?.onboardingCompleted) {
    redirect("/onboarding");
  }

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
            <div
              className="w-2 h-6"
              style={{ backgroundColor: "rgb(6,182,212)" }}
            />
            <span
              className="text-xs font-mono tracking-[0.25em] text-gray-400 uppercase"
            >
              Nexus Corp — Command Center
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
            <h2
              className="text-xs font-mono tracking-[0.2em] text-gray-500 uppercase"
            >
              DORA Metrics — Nexus Corp Baseline
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 border border-gray-800">
            {doraMetrics.map((m, i) => (
              <div
                key={m.code}
                className="flex flex-col gap-3 p-5"
                style={{
                  borderRight:
                    i < doraMetrics.length - 1
                      ? "1px solid rgb(31,41,55)"
                      : undefined,
                  backgroundColor: "#080808",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-700">{m.code}</span>
                  <span
                    className="text-xs font-mono"
                    style={{ color: "rgb(239,68,68)" }}
                  >
                    {m.perf}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1">{m.label}</p>
                  <p
                    className="text-3xl font-mono font-bold leading-none"
                    style={{ ...syne.style, color: "rgb(239,68,68)" }}
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
            ))}
          </div>
        </section>

        {/* ── Missions ──────────────────────────────────────────────────────── */}
        <section className="flex flex-col gap-4">
          <div className="flex items-baseline gap-3">
            <h2
              className="text-xs font-mono tracking-[0.2em] text-gray-500 uppercase"
            >
              Jouw Missies
            </h2>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          <p className="text-sm text-gray-500">
            Transformeer Nexus Corp van low performer naar elite.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {missions.map((m) => {
              const isUnlocked = m.status === "unlocked";

              const card = (
                <div
                  className="flex flex-col gap-4 p-6 border h-full"
                  style={{
                    backgroundColor: isUnlocked ? "#090909" : "#050505",
                    borderColor: isUnlocked
                      ? "rgb(6,182,212)"
                      : "rgb(31,41,55)",
                    borderLeft: isUnlocked
                      ? "3px solid rgb(6,182,212)"
                      : "3px solid rgb(31,41,55)",
                    opacity: isUnlocked ? 1 : 0.5,
                  }}
                >
                  {/* Mission header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-600">{m.id}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-mono px-1.5 py-0.5 border"
                        style={
                          isUnlocked
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
                      {!isUnlocked && (
                        <span className="text-gray-700 text-sm">⊘</span>
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
                    {isUnlocked ? (
                      <span
                        className="text-xs font-mono tracking-widest"
                        style={{ color: "rgb(6,182,212)" }}
                      >
                        ▸ START MISSIE
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-gray-700 tracking-widest">
                        ⊘ VERGRENDELD
                      </span>
                    )}
                  </div>
                </div>
              );

              return isUnlocked ? (
                <a
                  key={m.id}
                  href={m.href!}
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
            Jouw acties beïnvloeden de DORA metrics van Nexus Corp. Begin met missie 01.
          </p>
        </footer>

      </div>
    </main>
  );
}
