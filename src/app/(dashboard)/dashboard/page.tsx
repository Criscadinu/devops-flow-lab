import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { TestPanel } from "@/components/TestPanel";
import { computeDora } from "@/lib/dora";

export const metadata: Metadata = {
  title: "Command Center - DevOps Flow Lab",
}


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
    category: "FLOW",
    description: "Every developer sets up their environment manually. No staging. No consistency. Fix it.",
    href: "/missions/environments",
    alwaysUnlocked: true,
    unlockedBy: undefined as string | undefined,
  },
  {
    id: "M-03",
    title: "Single Repository of Truth",
    category: "FLOW",
    description: "The config is from last Tuesday. The tests are on Kai's laptop. The runbook is in Google Drive. Nothing is in the same place. Fix it.",
    href: "/missions/m03",
    alwaysUnlocked: false,
    unlockedBy: "M-02",
  },
  {
    id: "M-04",
    title: "Infrastructure as Code",
    category: "FLOW",
    description: "The server is a mystery only Marco understands. Define the entire environment in code so anyone can recreate it.",
    href: "/missions/m04",
    alwaysUnlocked: false,
    unlockedBy: "M-03",
  },
  {
    id: "M-05",
    title: "Build the Pipeline",
    category: "FLOW",
    description: "Nexus Corp deploys manually from a zip file. Build their first CI pipeline and cut lead time in half.",
    href: "/missions/m05",
    alwaysUnlocked: false,
    unlockedBy: "M-04",
  },
  {
    id: "M-06",
    title: "Test Automation",
    category: "FLOW",
    description: "12 tests for 200 endpoints. A green pipeline with bad tests gives false confidence. Build a real test suite.",
    href: "/missions/m06",
    alwaysUnlocked: false,
    unlockedBy: "M-05",
  },
  {
    id: "M-07",
    title: "Catch Errors as Early as Possible",
    category: "FLOW",
    description: "The bug was in production for three weeks. The test suite existed. Nobody ran it. Shift left — catch errors at the source, not in the customer's inbox.",
    href: "/missions/m07",
    alwaysUnlocked: false,
    unlockedBy: "M-06",
  },
  {
    id: "M-08",
    title: "Ensure Tests Run Quickly",
    category: "FLOW",
    description: "The pipeline takes 22 minutes. Nobody runs tests locally anymore. Parallelize. Optimize. Make fast feedback the default.",
    href: "/missions/m08",
    alwaysUnlocked: false,
    unlockedBy: "M-07",
  },
  {
    id: "M-09",
    title: "Write Tests Before Code (TDD)",
    category: "FLOW",
    description: "A customer just applied a 150 percent discount. They got paid to buy things. The edge case was never tested because the test was never written. Write it first.",
    href: "/missions/m09",
    alwaysUnlocked: false,
    unlockedBy: "M-08",
  },
  {
    id: "M-10",
    title: "Automate Manual Tests",
    category: "FLOW",
    description: "Kai spends two days clicking through the app before every release. Fourteen percent of his time. Three times this quarter, he missed a step. Automate the checklist.",
    href: "/missions/m10",
    alwaysUnlocked: false,
    unlockedBy: "M-09",
  },
  {
    id: "M-11",
    title: "Integrate Performance Testing",
    category: "FLOW",
    description: "The orders endpoint was fast with 12 records. It is not fast with 47,000. The first performance test was run by customers. Involuntarily.",
    href: "/missions/m11",
    alwaysUnlocked: false,
    unlockedBy: "M-10",
  },
  {
    id: "M-12",
    title: "Integrate Non-Functional Requirements Testing",
    category: "FLOW",
    description: "The security audit found a critical vulnerability from six months ago. Nobody checked. There was no automated check. Security is a requirement. Test it like one.",
    href: "/missions/m12",
    alwaysUnlocked: false,
    unlockedBy: "M-11",
  },
  {
    id: "M-13",
    title: "Dev and Ops Working Together",
    category: "FLOW",
    description: "Dev ships. Ops fixes. Nobody talks. Marco spent last night fixing a memory leak Lisa did not know existed. You build it. You run it. You own it.",
    href: "/missions/m13",
    alwaysUnlocked: false,
    unlockedBy: "M-12",
  },
  {
    id: "M-14",
    title: "Small Batch Development",
    category: "FLOW",
    description: "Lisa's branch has 47 commits and 2,400 lines. Nobody knows what is in it. Kai approved it because he could not read it. It broke production. Merge small. Merge often.",
    href: "/missions/m14",
    alwaysUnlocked: false,
    unlockedBy: "M-07",
  },
  {
    id: "M-15",
    title: "Trunk-Based Development",
    category: "FLOW",
    description: "Four active branches. Eleven days since the last merge to main. Two days resolving conflicts. The feature was done on Friday. The merge was not. One branch. Many commits. No surprises.",
    href: "/missions/m15",
    alwaysUnlocked: false,
    unlockedBy: "M-14",
  },
  {
    id: "M-16",
    title: "Continuous Deployment",
    category: "FLOW",
    description: "The pipeline is green but nothing ships automatically. Wire automatic deployment to every green build.",
    href: "/missions/m16",
    alwaysUnlocked: false,
    unlockedBy: "M-15",
  },
  {
    id: "M-17",
    title: "Enable Automated Self-Service Deployments",
    category: "FLOW",
    description: "Lisa's feature has been ready since Tuesday. It is Friday. Marco has not deployed it yet. When deploying requires a specific person, that person is the bottleneck.",
    href: "/missions/m17",
    alwaysUnlocked: false,
    unlockedBy: "M-16",
  },
  {
    id: "M-18",
    title: "Integrate Code Deployments into the Pipeline",
    category: "FLOW",
    description: "The pipeline goes green. Then Marco deploys manually from his laptop. Sometimes. For six months. Complete the loop — the pipeline should deploy, not a person.",
    href: "/missions/m18",
    alwaysUnlocked: false,
    unlockedBy: "M-17",
  },
  {
    id: "M-19",
    title: "Release Patterns — Canary and Blue-Green",
    category: "FLOW",
    description: "The pricing feature broke for 100% of users. 47 minutes of downtime. With a canary release, it would have been 5 minutes for 1% of users. Risk is a dial, not a switch.",
    href: "/missions/m19",
    alwaysUnlocked: false,
    unlockedBy: "M-18",
  },
  {
    id: "M-20",
    title: "Architecture for Low-Risk Releases",
    category: "FLOW",
    description: "Every deploy still gambles all users on one bad release. Implement feature flags for dark launches and canary releases.",
    href: "/missions/m20",
    alwaysUnlocked: false,
    unlockedBy: "M-16",
  },
  {
    id: "M-23",
    title: "Create Telemetry",
    category: "FEEDBACK",
    description: "Nexus Corp is flying blind. No logs, no metrics, no alerts. Add the eyes your system needs.",
    href: "/missions/m23",
    alwaysUnlocked: false,
    unlockedBy: "M-20",
  },
  {
    id: "M-24",
    title: "Monitor and Alert",
    category: "FEEDBACK",
    description: "Metrics exist but nobody is watching. Build automated alerting so the system tells you when something is wrong — before the customer does.",
    href: "/missions/m24",
    alwaysUnlocked: false,
    unlockedBy: "M-23",
  },
  {
    id: "M-25",
    title: "Blameless Postmortems",
    category: "LEARNING",
    description: "The health endpoint outage was fixed but nobody wrote down what happened. Build the postmortem process that turns every incident into a permanent improvement.",
    href: "/missions/m25",
    alwaysUnlocked: false,
    unlockedBy: "M-24",
  },
  {
    id: "M-26",
    title: "Learning Culture",
    category: "LEARNING",
    description: "Lisa fixed a bug in 3 hours. Marco spent 2 days on the same bug two months earlier. Nobody wrote it down. Build the practices that turn individual learning into team knowledge.",
    href: "/missions/m26",
    alwaysUnlocked: false,
    unlockedBy: "M-25",
  },
  {
    id: "M-27",
    title: "Chaos Engineering",
    category: "LEARNING",
    description: "Last month a dependency nobody knew about failed silently and took down orders. Break things deliberately — in a controlled way — before they break on their own.",
    href: "/missions/m27",
    alwaysUnlocked: false,
    unlockedBy: "M-26",
  },
];

// ─── Main mission definitions ─────────────────────────────────────────────────

type Way = 'FIRST_WAY' | 'SECOND_WAY' | 'THIRD_WAY';
type MainMissionDef = {
  id: string;
  way: Way;
  title: string;
  description: string;
  bookReference: string;
  submissionIds: string[];
};

const mainMissionDefs: MainMissionDef[] = [
  {
    id: 'FOUNDATIONS',
    way: 'FIRST_WAY',
    title: 'Create the foundations of our deployment pipeline',
    description: 'Build the technical foundation that makes everything else possible — environments, version control, and infrastructure that rebuilds in minutes.',
    bookReference: 'The DevOps Handbook — Chapter 9',
    submissionIds: ['M-02', 'M-03', 'M-04'],
  },
  {
    id: 'AUTOMATED_TESTING',
    way: 'FIRST_WAY',
    title: 'Enable fast and reliable automated testing',
    description: 'Automated tests are the safety net. Without them, every change is a gamble.',
    bookReference: 'The DevOps Handbook — Chapter 10',
    submissionIds: ['M-05', 'M-06', 'M-07', 'M-08', 'M-09', 'M-10', 'M-11', 'M-12', 'M-13'],
  },
  {
    id: 'CONTINUOUS_INTEGRATION',
    way: 'FIRST_WAY',
    title: 'Enable and practice continuous integration',
    description: 'Integrate small changes frequently. Stop hoarding work on long-lived branches.',
    bookReference: 'The DevOps Handbook — Chapter 11',
    submissionIds: ['M-14', 'M-15'],
  },
  {
    id: 'LOW_RISK_RELEASES',
    way: 'FIRST_WAY',
    title: 'Automate and enable low-risk releases',
    description: 'Make releases boring. Automate the deploy. Practice release patterns that make rollback unnecessary.',
    bookReference: 'The DevOps Handbook — Chapter 12',
    submissionIds: ['M-16', 'M-17', 'M-18', 'M-19', 'M-20'],
  },
  {
    id: 'TELEMETRY',
    way: 'SECOND_WAY',
    title: 'Create telemetry and feedback loops',
    description: 'Build the observability foundation — metrics, logs, and alerting that tell you what the system is doing before users do.',
    bookReference: 'The DevOps Handbook — Part III',
    submissionIds: ['M-23', 'M-24'],
  },
  {
    id: 'LEARNING_THIRD_WAY',
    way: 'THIRD_WAY',
    title: 'Create a culture of learning',
    description: 'Blameless postmortems, learning culture, and chaos engineering.',
    bookReference: 'The DevOps Handbook — Part IV',
    submissionIds: ['M-25', 'M-26', 'M-27'],
  },
];

const firstWayMainIds = ['FOUNDATIONS', 'AUTOMATED_TESTING', 'CONTINUOUS_INTEGRATION', 'LOW_RISK_RELEASES'];
const secondWayMainIds = ['TELEMETRY'];
const thirdWayMainIds  = ['LEARNING_THIRD_WAY'];

// ─── Role labels ──────────────────────────────────────────────────────────────

const roleLabels: Record<string, string> = {
  ENGINEER: "Engineer",
  MANAGER:  "Manager",
  COACH:    "Coach / Trainer",
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
    learned: "You containerized Nexus Corp with Docker. Created identical dev, test, and prod environments. Eliminated 'works on my machine.'",
  },
  {
    id: "M-03",
    title: "Single Repository of Truth",
    learned: "Everything is in Git. Code, config, docs, infrastructure. If it is not in the repo, it does not exist.",
  },
  {
    id: "M-04",
    title: "Infrastructure as Code",
    learned: "The environment is defined in code. Anyone can rebuild it in minutes. The server is no longer a mystery.",
  },
  {
    id: "M-05",
    title: "Build the Pipeline",
    learned: "Every commit triggers a pipeline. Tests run automatically. Nexus Corp gets a pass or fail signal within minutes of every push.",
  },
  {
    id: "M-06",
    title: "Test Automation",
    learned: "A real test suite with meaningful coverage. False confidence eliminated. Green means something.",
  },
  {
    id: "M-07",
    title: "Catch Errors as Early as Possible",
    learned: "Linting runs before tests. Unit tests run in seconds. The further left the catch, the cheaper the fix.",
  },
  {
    id: "M-08",
    title: "Ensure Tests Run Quickly",
    learned: "Tests run in parallel. Unit and integration tests are separate gates. Fast feedback is the default.",
  },
  {
    id: "M-09",
    title: "Write Tests Before Code (TDD)",
    learned: "Red, green, refactor. The test is the specification. Edge cases become requirements, not afterthoughts.",
  },
  {
    id: "M-10",
    title: "Automate Manual Tests",
    learned: "The release checklist is automated. Kai no longer spends two days clicking before every release.",
  },
  {
    id: "M-11",
    title: "Integrate Performance Testing",
    learned: "Performance thresholds are enforced in CI. The customer is no longer the load tester.",
  },
  {
    id: "M-12",
    title: "Integrate Non-Functional Requirements Testing",
    learned: "Security, coverage, and secrets scanning run on every commit. NFRs are requirements, not afterthoughts.",
  },
  {
    id: "M-13",
    title: "Dev and Ops Working Together",
    learned: "CODEOWNERS, shared runbook, memory leak test. The wall between Dev and Ops is gone. You build it, you run it.",
  },
  {
    id: "M-14",
    title: "Small Batch Development",
    learned: "One logical change per commit. Under 400 lines. Merge small, merge often, merge before it becomes a problem.",
  },
  {
    id: "M-15",
    title: "Trunk-Based Development",
    learned: "Everyone commits to main. Feature flags hide incomplete work. No more eleven-day merge conflicts.",
  },
  {
    id: "M-16",
    title: "Continuous Deployment",
    learned: "Every green commit deploys automatically. The pipeline ships. Not Marco.",
  },
  {
    id: "M-17",
    title: "Enable Automated Self-Service Deployments",
    learned: "Any engineer can deploy safely. The safety is in the process, not the person.",
  },
  {
    id: "M-18",
    title: "Integrate Code Deployments into the Pipeline",
    learned: "The pipeline deploys. Staging automatically, production with approval. The loop is complete.",
  },
  {
    id: "M-19",
    title: "Release Patterns — Canary and Blue-Green",
    learned: "Risk is a dial, not a switch. Canary releases limit blast radius. Blue-green enables instant rollback.",
  },
  {
    id: "M-20",
    title: "Dark Launches and Feature Flags",
    learned: "Deploy dark. Enable with a flag. Deployment is decoupled from release.",
    nextUp: true,
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

  // ── Maturity bar ─────────────────────────────────────────────────────────
  const TOTAL_MISSIONS = 25;
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

  // ── Main mission progress ─────────────────────────────────────────────────
  // Only count submissions that have a real mission page (in missionDefs) toward completion.
  const builtMissionIds = new Set(missionDefs.map((m) => m.id));
  const mainMissionProgress: Record<string, { existingIds: string[]; completedCount: number; isComplete: boolean }> = {};
  for (const mm of mainMissionDefs) {
    const existingIds    = mm.submissionIds.filter((id) => builtMissionIds.has(id));
    const completedCount = existingIds.filter((id) => completedIds.has(id)).length;
    const isComplete     = existingIds.length === 0 || completedCount === existingIds.length;
    mainMissionProgress[mm.id] = { existingIds, completedCount, isComplete };
  }

  const firstWayComplete  = firstWayMainIds.every((id) => mainMissionProgress[id].isComplete);
  const secondWayComplete = firstWayComplete && secondWayMainIds.every((id) => mainMissionProgress[id].isComplete);

  // ── First Way log ─────────────────────────────────────────────────────────
  const FIRST_WAY_TOTAL   = 20;
  const firstWayCompleted = firstWayLog.filter((m) => completedIds.has(m.id)).length;
  const firstWayPct       = Math.round((firstWayCompleted / FIRST_WAY_TOTAL) * 100);

  const displayName = user.name ?? session.user.name ?? session.user.email;
  const roleLabel   = user.role ? (roleLabels[user.role] ?? user.role) : null;

  // ── Inline components (server-safe — no hooks) ───────────────────────────
  function MissionCard({ m }: { m: typeof missions[number] }) {
    const borderColor = m.completed ? "rgb(255,85,0)" : m.unlocked ? "rgba(255,85,0,0.5)" : "rgb(31,41,55)";
    const borderLeft  = m.completed ? "3px solid rgb(255,85,0)" : m.unlocked ? "3px solid rgba(255,85,0,0.5)" : "3px solid rgb(31,41,55)";
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
                  ? { color: "var(--af-orange)", borderColor: "rgba(255,85,0,0.25)", backgroundColor: "rgba(255,85,0,0.05)" }
                  : { color: "var(--text-muted)", borderColor: "var(--border)" }
              }
            >
              {m.category}
            </span>
            {!m.unlocked && !m.completed && <span className="text-gray-700 text-sm">⊘</span>}
            {m.completed && <span className="text-xs font-mono" style={{ color: "var(--af-orange)" }}>✓</span>}
          </div>
        </div>
        <h3 className="text-lg text-gray-900 leading-snug" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
          {m.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1">{m.description}</p>
        <div className="border-t border-gray-900 pt-3">
          {m.completed ? (
            <span className="text-xs font-mono tracking-widest" style={{ color: "var(--af-orange)" }}>✓ COMPLETED</span>
          ) : m.unlocked ? (
            <span className="text-xs font-mono tracking-widest" style={{ color: "var(--af-orange)" }}>▸ START MISSION</span>
          ) : (
            <span className="text-xs font-mono text-gray-700 tracking-widest">⊘ LOCKED</span>
          )}
        </div>
      </div>
    );
    return m.unlocked || m.completed ? (
      <a key={m.id} href={m.href ?? "#"} className="block hover:opacity-90 transition-opacity h-full">{card}</a>
    ) : (
      <div key={m.id} className="h-full">{card}</div>
    );
  }

  function PlannedCard({ id }: { id: string }) {
    return (
      <div
        className="flex flex-col gap-4 p-6 border"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
          borderLeft: "3px solid rgb(31,41,55)",
          opacity: 0.4,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-gray-700">{id}</span>
          <span
            className="text-xs font-mono px-1.5 py-0.5 border"
            style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
          >
            PLANNED
          </span>
        </div>
        <div className="flex-1 flex items-center min-h-[60px]">
          <span className="text-xs font-mono text-gray-700 uppercase tracking-widest">Coming soon</span>
        </div>
        <div className="border-t border-gray-900 pt-3">
          <span className="text-xs font-mono text-gray-700 tracking-widest">⊘ PLANNED</span>
        </div>
      </div>
    );
  }

  function WayDivider({ label, active }: { label: string; active: boolean }) {
    return (
      <div className="flex items-center gap-4 py-2">
        <div
          className="w-1 h-7 shrink-0"
          style={{ backgroundColor: active ? "var(--af-orange)" : "var(--border)" }}
        />
        <span
          className="text-sm font-mono tracking-widest uppercase font-bold"
          style={{ color: active ? "var(--af-orange)" : "var(--text-muted)" }}
        >
          {label}
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
      </div>
    );
  }

  function MainMissionGroup({
    mmId,
    isLocked,
  }: {
    mmId: string;
    isLocked: boolean;
  }) {
    const mm   = mainMissionDefs.find((m) => m.id === mmId)!;
    const prog = mainMissionProgress[mmId];
    const totalExisting = prog.existingIds.length;
    const pct = totalExisting > 0 ? Math.round((prog.completedCount / totalExisting) * 100) : 100;

    return (
      <div
        className="flex flex-col gap-4"
        style={{ opacity: isLocked ? 0.4 : 1, pointerEvents: isLocked ? 'none' : undefined }}
      >
        {/* Header */}
        <div className="flex flex-col gap-2 pl-4" style={{ borderLeft: "2px solid rgb(31,41,55)" }}>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-base text-gray-900 leading-snug" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
              {mm.title}
            </h3>
            <span className="text-xs font-mono text-gray-600 shrink-0">
              {totalExisting > 0 ? `${prog.completedCount}/${totalExisting} complete` : "coming soon"}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 w-full" style={{ backgroundColor: "var(--border)" }}>
            <div
              className="h-full transition-all"
              style={{ width: `${pct}%`, background: prog.isComplete ? "linear-gradient(90deg, #FF0000 0%, #FF8C00 100%)" : "rgba(255,85,0,0.5)" }}
            />
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">{mm.description}</p>
          <span className="text-xs font-mono uppercase tracking-widest text-gray-700">{mm.bookReference}</span>

          {isLocked && (
            <p className="text-xs font-mono text-gray-700 mt-1">⊘ COMPLETE PREVIOUS MAIN MISSION TO UNLOCK</p>
          )}
        </div>

        {/* Submission cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mm.submissionIds.map((subId) => {
            const mission = missions.find((m) => m.id === subId);
            if (!mission) return <PlannedCard key={subId} id={subId} />;
            return <MissionCard key={subId} m={mission} />;
          })}
        </div>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen text-gray-100 px-6 py-10"
      style={{ backgroundColor: "var(--bg)", fontFamily: "inherit" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">

        {/* ── Top bar ───────────────────────────────────────────────────────── */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-2 h-6 shrink-0" style={{ backgroundColor: "var(--af-orange)" }} />
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
                  color: "var(--af-orange)",
                  borderColor: "rgba(255,85,0,0.3)",
                  backgroundColor: "rgba(255,85,0,0.06)",
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
              const accentColor =
                m.perf === "HIGH PERFORMER"   ? "rgb(249,115,22)" :
                m.perf === "MEDIUM PERFORMER" ? "rgb(234,179,8)"  :
                                                "rgb(239,68,68)";
              return (
                <div
                  key={m.code}
                  className="flex flex-col gap-3 p-5"
                  style={{
                    borderRight: i < doraMetrics.length - 1 ? "1px solid rgb(31,41,55)" : undefined,
                    backgroundColor: "var(--bg-card)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-gray-700">{m.code}</span>
                    <span className="text-xs font-mono" style={{ color: accentColor }}>{m.perf}</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">{m.label}</p>
                    <p className="text-2xl sm:text-3xl font-mono font-bold leading-none overflow-hidden break-words" style={{ fontFamily: "var(--font-heading)", color: accentColor }}>
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
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <div className="flex items-baseline justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">Chaos</span>
                <div className="w-16 h-px" style={{ backgroundColor: "var(--bg-card-hover)" }} />
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--af-orange)" }}>
                  Elite DevOps
                </span>
              </div>
              <span className="text-xs font-mono text-gray-600">
                {completedCount}/{TOTAL_MISSIONS} missions — {maturityPct}%
              </span>
            </div>

            <div
              className="w-full h-2 border"
              style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div
                className="h-full"
                style={{ width: `${maturityPct}%`, background: "linear-gradient(90deg, #FF0000 0%, #FF8C00 100%)" }}
              />
            </div>

            <div className="flex items-start justify-between">
              {maturityStages.map((s) => {
                const isActive = s.label === currentStage.label;
                const isPast   = maturityPct >= s.threshold;
                return (
                  <div key={s.label} className="flex flex-col items-center gap-1" style={{ width: "20%" }}>
                    <div
                      className="w-1.5 h-1.5"
                      style={{ backgroundColor: isPast ? "var(--af-orange)" : "var(--border)" }}
                    />
                    <span
                      className="text-xs font-mono text-center leading-tight"
                      style={{
                        color: isActive ? "var(--af-orange)" : isPast ? "var(--text-muted)" : "var(--text-dim)",
                        fontWeight: isActive ? 700 : 400,
                      }}
                    >
                      {s.label}
                    </span>
                    <span className="text-xs font-mono" style={{ color: "var(--text-dim)" }}>
                      {s.threshold}%
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-sm text-gray-400 border-t border-gray-900 pt-4">
              Nexus Corp is at:{" "}
              <span className="font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--af-orange)" }}>
                {currentStage.label}
              </span>
            </p>
          </div>
        </section>

        {/* ── Missions ──────────────────────────────────────────────────────── */}
        <section className="flex flex-col gap-10">

          {/* M-01: Pre-mission analysis */}
          {(() => {
            const m01 = missions.find((m) => m.id === 'M-01')!;
            const gray = "rgb(75,85,99)";
            const card = (
              <div
                className="flex flex-col gap-4 p-6 border"
                style={{
                  backgroundColor: m01.completed ? "#0a0a0a" : "#090909",
                  borderColor: gray,
                  borderLeft: `3px solid ${gray}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-600">{m01.id}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-mono px-1.5 py-0.5 border"
                      style={{ color: gray, borderColor: "rgba(75,85,99,0.3)", backgroundColor: "rgba(75,85,99,0.05)" }}
                    >
                      ANALYSIS
                    </span>
                    {m01.completed && <span className="text-xs font-mono" style={{ color: gray }}>✓</span>}
                  </div>
                </div>
                <h3 className="text-lg text-gray-900 leading-snug" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>
                  {m01.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{m01.description}</p>
                <div className="border-t border-gray-900 pt-3">
                  {m01.completed ? (
                    <span className="text-xs font-mono tracking-widest" style={{ color: gray }}>✓ COMPLETED</span>
                  ) : (
                    <span className="text-xs font-mono tracking-widest" style={{ color: gray }}>▸ START ANALYSIS</span>
                  )}
                </div>
              </div>
            );
            return (
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono tracking-widest uppercase text-gray-600">
                  Pre-mission: Analysis
                </span>
                {m01.completed ? (
                  <a href={m01.href} className="block hover:opacity-90 transition-opacity">{card}</a>
                ) : (
                  <a href={m01.href} className="block hover:opacity-90 transition-opacity">{card}</a>
                )}
              </div>
            );
          })()}

          {/* ── First Way: Flow ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <WayDivider label="First Way: Flow" active={true} />
            {firstWayMainIds.map((mainId, idx) => {
              const prevComplete = idx === 0 || mainMissionProgress[firstWayMainIds[idx - 1]].isComplete;
              return (
                <MainMissionGroup key={mainId} mmId={mainId} isLocked={!prevComplete} />
              );
            })}
          </div>

          {/* ── Second Way: Feedback ─────────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <WayDivider label="Second Way: Feedback" active={firstWayComplete} />
            <div style={{ opacity: firstWayComplete ? 1 : 0.4, pointerEvents: firstWayComplete ? undefined : 'none' }}>
              {!firstWayComplete && (
                <p className="text-xs font-mono text-gray-700 mb-6">⊘ COMPLETE FIRST WAY TO UNLOCK</p>
              )}
              <div className="flex flex-col gap-8">
                {secondWayMainIds.map((mainId, idx) => {
                  const prevComplete = idx === 0 || mainMissionProgress[secondWayMainIds[idx - 1]].isComplete;
                  return (
                    <MainMissionGroup key={mainId} mmId={mainId} isLocked={!prevComplete} />
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Third Way: Learning ──────────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            <WayDivider label="Third Way: Learning" active={secondWayComplete} />
            <div style={{ opacity: secondWayComplete ? 1 : 0.4, pointerEvents: secondWayComplete ? undefined : 'none' }}>
              {!secondWayComplete && (
                <p className="text-xs font-mono text-gray-700 mb-6">⊘ COMPLETE SECOND WAY TO UNLOCK</p>
              )}
              <div className="flex flex-col gap-8">
                {thirdWayMainIds.map((mainId, idx) => {
                  const prevComplete = idx === 0 || mainMissionProgress[thirdWayMainIds[idx - 1]].isComplete;
                  return (
                    <MainMissionGroup key={mainId} mmId={mainId} isLocked={!prevComplete} />
                  );
                })}
              </div>
            </div>
          </div>

        </section>

        {/* ── First Way: Flow log ───────────────────────────────────────────── */}
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

          <div
            className="w-full h-1.5 border"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <div
              className="h-full"
              style={{ width: `${firstWayPct}%`, background: "linear-gradient(90deg, #FF0000 0%, #FF8C00 100%)" }}
            />
          </div>

          <div className="flex flex-col" style={{ borderColor: "var(--border)", border: "1px solid var(--border)" }}>
            {firstWayLog.map((entry, i) => {
              const done     = completedIds.has(entry.id);
              const isNext   = !done && (entry as { nextUp?: boolean }).nextUp;
              const isLocked = !done && !isNext;
              const isLast   = i === firstWayLog.length - 1;

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
                  <div className="shrink-0 mt-0.5">
                    {done ? (
                      <div
                        className="w-5 h-5 flex items-center justify-center text-xs font-mono font-bold"
                        style={{ backgroundColor: "rgba(255,85,0,0.1)", color: "var(--af-orange)", border: "1px solid rgba(255,85,0,0.3)" }}
                      >
                        ✓
                      </div>
                    ) : isNext ? (
                      <div
                        className="w-5 h-5 flex items-center justify-center"
                        style={{ border: "1px solid rgba(255,85,0,0.4)" }}
                      >
                        <div className="w-1.5 h-1.5" style={{ backgroundColor: "rgba(255,85,0,0.5)" }} />
                      </div>
                    ) : (
                      <div
                        className="w-5 h-5 flex items-center justify-center"
                        style={{ border: "1px solid var(--border)" }}
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-gray-700">{entry.id}</span>
                        <h4
                          className="text-sm text-gray-900"
                          style={{ fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", color: done ? "var(--af-orange)" : isLocked ? "var(--text-muted)" : "var(--text)" }}
                        >
                          {entry.title}
                        </h4>
                      </div>
                      <span
                        className="text-xs font-mono tracking-widest shrink-0"
                        style={{
                          color: done ? "rgb(255,85,0)" : isNext ? "rgb(234,179,8)" : "rgb(55,65,81)",
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

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <footer className="border-t border-gray-900 pt-6">
          <p className="text-xs font-mono text-gray-700">
            Your actions affect the DORA metrics of Nexus Corp. Start with mission 01.
          </p>
        </footer>

      </div>

      <TestPanel email={session.user.email!} />
    </main>
  );
}
