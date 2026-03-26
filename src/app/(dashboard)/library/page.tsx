import { Syne } from "next/font/google"

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

// ─── Data ─────────────────────────────────────────────────────────────────────

const foundations = [
  { id: "F-01", title: "The Three Ways",          description: "The philosophical foundation of DevOps. Flow, Feedback, and Continual Learning explained.",                              source: "DevOps Handbook",     href: "/library/the-three-ways" },
  { id: "F-02", title: "DORA Metrics Explained",  description: "What the four key metrics measure, why they matter, and how elite teams perform.",                                       source: "DORA Research",        href: "/library/dora-metrics" },
  { id: "F-03", title: "The Five Ideals",          description: "Gene Kim's five ideals from The Unicorn Project. The prerequisites for high performance.",                              source: "The Unicorn Project",  href: "/library/five-ideals" },
  { id: "F-04", title: "Team Topologies",          description: "How to structure teams for fast flow. Stream-aligned, platform, enabling, and complicated subsystem teams.",            source: "Team Topologies",      href: "/library/team-topologies" },
]

const flowConcepts = [
  { id: "FC-01", title: "What is a Value Stream?",       description: "The path work takes from idea to customer. Understanding value streams is the foundation of everything in DevOps.", source: "DevOps Handbook",    href: "/library/what-is-a-value-stream" },
  { id: "FC-02", title: "The Principle of Flow",         description: "How work moves through a system. Why fast flow reduces risk and improves quality.",                               source: "DevOps Handbook",    href: "/library/principle-of-flow" },
  { id: "FC-03", title: "Types of Waste",                description: "The seven wastes from Lean Manufacturing applied to software. Muda, Mura, Muri.",                                source: "Lean Thinking",      href: "/library/types-of-waste" },
  { id: "FC-04", title: "Theory of Constraints",         description: "Every system has one bottleneck that limits its throughput. Goldratt's TOC applied to software delivery.",       source: "The Goal",           href: "/library/theory-of-constraints" },
  { id: "FC-05", title: "Work in Small Batches",         description: "Why smaller releases are safer, faster, and easier to debug than large ones.",                                   source: "Lean Thinking",      href: "/library/small-batches" },
  { id: "FC-06", title: "WIP Limits and Queue Theory",   description: "How limiting work in progress speeds up delivery. Little's Law explained.",                                      source: "Lean + Kanban",      href: "/library/wip-limits" },
]

const flowTools = [
  { id: "FT-01", title: "Value Stream Mapping",      description: "The technique for visualizing your value stream, measuring flow efficiency, and finding bottlenecks.", source: "Lean + DevOps",       href: "/library/value-stream-mapping" },
  { id: "FT-02", title: "Deployment Pipeline",       description: "The automated path from code commit to production. Build, test, deploy.",                             source: "Continuous Delivery", href: "/library/deployment-pipeline" },
  { id: "FT-03", title: "Environment Parity",        description: "Why dev, test, and prod must be identical. How containers solve the works on my machine problem.",   source: "12-Factor App",       href: "/library/environment-parity" },
  { id: "FT-04", title: "Trunk-Based Development",   description: "Committing directly to main. Why short-lived branches and frequent integration prevent merge hell.", source: "DORA Research",       href: "/library/trunk-based-development" },
  { id: "FT-05", title: "Continuous Integration",    description: "Every commit triggers an automated build and test run. The foundation of fast feedback.",             source: "Continuous Delivery", href: "/library/continuous-integration" },
  { id: "FT-06", title: "Continuous Deployment",     description: "Every green build ships automatically. No humans in the deployment loop.",                           source: "DevOps Handbook",     href: "/library/continuous-deployment" },
]

const secondWay = [
  { id: "FB-01", title: "Telemetry and Observability", description: "See what is happening in production in real time. The three pillars: metrics, logs, traces.",    source: "DevOps Handbook",      href: "/library/telemetry-and-observability" },
  { id: "FB-02", title: "Monitoring and Alerting",     description: "Know before your users do. Build alerts that fire on symptoms, not causes.",                      source: "SRE + DevOps",         href: "/library/monitoring-and-alerting" },
  { id: "FB-03", title: "Feature Flags",               description: "Decouple deploy from release. Ship to production without turning it on.",                        source: "Continuous Delivery",  href: "/library/feature-flags" },
  { id: "FB-04", title: "A/B Testing",                 description: "Let data decide. Form a hypothesis, run a controlled experiment, and read the result correctly.", source: "Lean Startup",         href: "/library/ab-testing" },
  { id: "FB-05", title: "Incident Review",             description: "The feedback loop after failure. Turn production incidents into systemic improvements.",          source: "SRE + Toyota Kata",    href: "/library/incident-review" },
]

const thirdWay = [
  { id: "CL-01", title: "Blameless Postmortems",  description: "How to turn production failures into organizational learning. Why blame stops learning.",    source: "DevOps Handbook",  href: "/library/blameless-postmortems" },
  { id: "CL-02", title: "Chaos Engineering",       description: "Inject failure deliberately. Build systems that expect to fail. Netflix Chaos Monkey.",      source: "Netflix + SRE",    href: "/library/chaos-engineering" },
  { id: "CL-03", title: "Psychological Safety",    description: "The foundation of learning teams. Google Project Aristotle and Westrum's culture model.",    source: "Amy Edmondson",    href: "/library/psychological-safety" },
  { id: "CL-04", title: "Learning Culture",        description: "Senge's five disciplines, Toyota Kata, and how knowledge spreads across teams.",             source: "Toyota Kata",      href: "/library/learning-culture" },
  { id: "CL-05", title: "DevOps Transformation",   description: "What transformation actually means, how it fails, and why it is never finished.",           source: "DORA Research",    href: "/library/devops-transformation" },
]

// ─── Section config ────────────────────────────────────────────────────────────

const sections = {
  foundations: { num: "01", accent: "#b45309", bg: "#fffbeb", sourceBg: "#fef3c7" },
  flow:        { num: "02", accent: "#0891b2", bg: "#f0fdfa", sourceBg: "#ccfbf1" },
  feedback:    { num: "03", accent: "#7c3aed", bg: "#faf5ff", sourceBg: "#ede9fe" },
  learning:    { num: "04", accent: "#15803d", bg: "#f0fdf4", sourceBg: "#dcfce7" },
}

// ─── Components ───────────────────────────────────────────────────────────────

function SectionBand({
  num,
  label,
  subtitle,
  accent,
  bg,
}: {
  num: string
  label: string
  subtitle: string
  accent: string
  bg: string
}) {
  return (
    <div
      className="relative overflow-hidden px-8 py-10 border-y"
      style={{ backgroundColor: bg, borderColor: "#e5e5e5", borderLeft: `4px solid ${accent}` }}
    >
      {/* Background number */}
      <span
        className="absolute right-8 top-1/2 -translate-y-1/2 font-mono select-none pointer-events-none"
        style={{ fontSize: "7rem", fontWeight: 800, color: "#f0f0ed", lineHeight: 1 }}
      >
        {num}
      </span>
      <div className="max-w-5xl mx-auto relative">
        <p className="text-xs font-mono uppercase tracking-[0.2em] mb-2" style={{ color: accent }}>
          Section {num}
        </p>
        <h2 className="text-2xl text-black tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>
          {label}
        </h2>
        <p className="text-sm mt-1" style={{ color: "#777" }}>{subtitle}</p>
      </div>
    </div>
  )
}

function SubsectionLabel({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="flex items-center gap-3 px-8">
      <span className="text-xs font-mono font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>
        {label}
      </span>
      <div className="flex-1 h-px" style={{ backgroundColor: "#e5e5e5" }} />
    </div>
  )
}

function LibraryCard({
  id,
  title,
  description,
  source,
  href,
  accent,
  sourceBg,
  available = true,
  cardBg = "#ffffff",
}: {
  id: string
  title: string
  description: string
  source: string
  href?: string
  accent: string
  sourceBg: string
  available?: boolean
  cardBg?: string
}) {
  if (!available) {
    return (
      <div
        className="flex flex-col gap-4 p-6"
        style={{
          backgroundColor: "#f5f5f5",
          border: "1px dotted #d4d4d4",
        }}
      >
        <span className="self-start text-xs font-mono px-2 py-0.5" style={{ color: "#ccc", backgroundColor: "#ebebeb", border: "1px solid #e0e0e0" }}>
          {source}
        </span>
        <div className="flex flex-col gap-1.5 flex-1">
          <h3 className="text-sm text-[#bbb] leading-snug" style={{ ...syne.style, fontWeight: 700 }}>{title}</h3>
          <p className="text-xs leading-relaxed" style={{ color: "#ccc" }}>{description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono" style={{ color: "#ccc" }}>Coming soon</span>
          <span className="text-xs font-mono" style={{ color: "#ddd" }}>{id}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="group flex flex-col gap-4 p-6 transition-colors duration-150 border border-[#e5e5e5] hover:border-[#aaa]"
      style={{
        backgroundColor: cardBg,
        borderLeft: `3px solid ${accent}`,
      }}
    >
      <span
        className="self-start text-xs font-mono px-2 py-0.5"
        style={{ color: accent, backgroundColor: sourceBg, border: `1px solid ${accent}30` }}
      >
        {source}
      </span>
      <div className="flex flex-col gap-1.5 flex-1">
        <h3 className="text-sm text-black leading-snug" style={{ ...syne.style, fontWeight: 700 }}>{title}</h3>
        <p className="text-xs leading-relaxed" style={{ color: "#555" }}>{description}</p>
      </div>
      <div className="flex items-center justify-between">
        {href ? (
          <a href={href} className="text-xs font-mono font-bold hover:underline" style={{ color: accent }}>
            Read →
          </a>
        ) : null}
        <span className="text-xs font-mono ml-auto" style={{ color: "#bbb" }}>{id}</span>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LibraryPage() {
  const { foundations: f, flow, feedback, learning } = sections

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* Hero */}
      <div className="border-b px-8 py-14" style={{ borderColor: "#e5e5e5", backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: "#999" }}>
              Learning Library
            </p>
            <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>
              Theory behind DevOps.
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
              Grounded in The DevOps Handbook, The Unicorn Project, Lean Thinking, DORA research, and Team Topologies.
              Each entry goes deep on one concept. Read them in order or jump to what you need.
            </p>
          </div>

          {/* Right: book spines */}
          <div className="flex gap-4 justify-end">
            {[
              { title: "The DevOps Handbook",   color: "#0891b2",  bg: "#f0fdfa" },
              { title: "The Unicorn Project",    color: "#ea580c",  bg: "#fff7ed" },
              { title: "Lean Thinking",          color: "#15803d",  bg: "#f0fdf4" },
            ].map((b) => (
              <div
                key={b.title}
                className="relative flex items-end justify-center"
                style={{
                  width: "72px",
                  height: "160px",
                  backgroundColor: b.bg,
                  borderLeft: `4px solid ${b.color}`,
                  border: `1px solid ${b.color}30`,
                  borderLeftWidth: "4px",
                  borderLeftStyle: "solid",
                  borderLeftColor: b.color,
                }}
              >
                <span
                  className="absolute font-mono text-xs font-bold leading-tight px-1"
                  style={{
                    color: b.color,
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(180deg)",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                  }}
                >
                  {b.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Foundations */}
      <SectionBand num={f.num} label="Foundations" subtitle="The mental models behind everything else" accent={f.accent} bg={f.bg} />
      <div className="px-8 py-8 border-b" style={{ borderColor: "#e5e5e5" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {foundations.map((e) => (
            <LibraryCard key={e.id} {...e} accent={f.accent} sourceBg={f.sourceBg} available cardBg="#ffffff" />
          ))}
        </div>
      </div>

      {/* First Way: Flow */}
      <SectionBand num={flow.num} label="First Way: Flow" subtitle="Make work move fast from left to right -- from idea to production" accent={flow.accent} bg={flow.bg} />
      <div className="py-8 border-b flex flex-col gap-7" style={{ borderColor: "#e5e5e5" }}>
        <SubsectionLabel label="Concepts" accent={flow.accent} />
        <div className="px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {flowConcepts.map((e) => (
              <LibraryCard key={e.id} {...e} accent={flow.accent} sourceBg={flow.sourceBg} available cardBg="#ffffff" />
            ))}
          </div>
        </div>
        <SubsectionLabel label="Tools & Techniques" accent={flow.accent} />
        <div className="px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {flowTools.map((e) => (
              <LibraryCard key={e.id} {...e} accent={flow.accent} sourceBg={flow.sourceBg} available cardBg="#fafafa" />
            ))}
          </div>
        </div>
      </div>

      {/* Second Way: Feedback */}
      <SectionBand num={feedback.num} label="Second Way: Feedback" subtitle="Fast feedback from production back to development" accent={feedback.accent} bg={feedback.bg} />
      <div className="px-8 py-8 border-b" style={{ borderColor: "#e5e5e5" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {secondWay.map((e) => (
            <LibraryCard key={e.id} {...e} accent={feedback.accent} sourceBg={feedback.sourceBg} available cardBg="#ffffff" />
          ))}
        </div>
      </div>

      {/* Third Way: Continual Learning */}
      <SectionBand num={learning.num} label="Third Way: Continual Learning" subtitle="Build a culture of experimentation and learning from failure" accent={learning.accent} bg={learning.bg} />
      <div className="px-8 py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {thirdWay.map((e) => (
            <LibraryCard key={e.id} {...e} accent={learning.accent} sourceBg={learning.sourceBg} available cardBg="#ffffff" />
          ))}
        </div>
      </div>

    </main>
  )
}
