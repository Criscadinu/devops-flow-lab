import { VideoNotice } from "../_components/VideoNotice"


const serif: React.CSSProperties = { fontFamily: "Georgia, 'Times New Roman', serif" }

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400">{num}</span>
      <h2 className="text-xl text-black tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>{title}</h2>
    </div>
  )
}

function Callout({ children, accent = "#0891b2" }: { children: React.ReactNode; accent?: string }) {
  return (
    <div className="px-6 py-4 my-6" style={{ backgroundColor: `${accent}0d`, borderLeft: `3px solid ${accent}` }}>
      <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>{children}</p>
    </div>
  )
}

function RefCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#fafafa" }}>
      <p className="text-xs font-mono font-bold text-[#0891b2] mb-1">{title}</p>
      <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{body}</p>
    </div>
  )
}

// ─── Seven wastes ─────────────────────────────────────────────────────────────

const sevenWastes = [
  {
    jp: "Muda — Defects",
    label: "Defects",
    desc: "Bugs, rework, failed deployments. Work that must be redone. Every bug that reaches production was cheaper to catch earlier.",
    example: "A security vulnerability discovered in production that could have been caught by a SAST tool in CI.",
  },
  {
    jp: "Muda — Overproduction",
    label: "Overproduction",
    desc: "Building features no one uses. Implementing requirements before they are needed. The most wasteful form of waste — it creates more waste.",
    example: "A reporting module built speculatively that customers never requested and no one uses.",
  },
  {
    jp: "Muda — Waiting",
    label: "Waiting",
    desc: "Work sitting idle. Waiting for review, waiting for a test environment, waiting for approval, waiting for a meeting. The dominant form of waste in most teams.",
    example: "A PR open for 5 days while the only reviewer is on leave.",
  },
  {
    jp: "Muda — Non-utilized talent",
    label: "Non-utilized talent",
    desc: "People doing work below their capability. Developers manually running deployment checklists instead of automating them.",
    example: "A senior engineer spending 2 hours per deploy on a manual 40-step runbook.",
  },
  {
    jp: "Muda — Transportation",
    label: "Transportation",
    desc: "Handing work off between teams. Every handoff adds wait time and increases the chance of information loss or miscommunication.",
    example: "Dev writes code, hands to QA, QA finds bugs, hands back to Dev, Dev fixes, hands to Release team, Release team deploys.",
  },
  {
    jp: "Muda — Inventory",
    label: "Inventory",
    desc: "Work that is finished but not yet delivered. Completed features not yet deployed. Merged PRs not yet released. Finished work that has not yet created value.",
    example: "A backlog of 200 completed tickets awaiting the monthly release window.",
  },
  {
    jp: "Muda — Motion",
    label: "Motion",
    desc: "Unnecessary movement of information. Context switching between tools. Looking up documentation in 5 different places. Overhead that adds no value.",
    example: "A developer who must switch between Jira, Confluence, Slack, GitHub, and a legacy wiki to start a single ticket.",
  },
  {
    jp: "Muda — Extra processing",
    label: "Extra processing",
    desc: "Doing more than what is required. Unnecessary approvals, redundant documentation, gold-plating features beyond what the customer needs.",
    example: "A 12-step change approval process for a one-line CSS fix.",
  },
]

export default function TypesOfWastePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>

      {/* Breadcrumb */}
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span>
            <span className="text-gray-500">First Way: Flow</span>
            <span className="mx-2">→</span>
            <span className="text-gray-500">Concepts</span>
            <span className="mx-2">→</span>
            <span className="text-gray-700">Types of Waste</span>
          </p>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FC-03", "CONCEPT", "First Way: Flow"].map((tag) => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            Types of Waste
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>
            The seven wastes from Lean Manufacturing applied to software. Muda, Mura, Muri — and why eliminating waste is the fastest path to flow.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["Lean Thinking", "Lean Software Development", "DevOps Handbook"].map((s) => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

            <VideoNotice />

      {/* Content */}
      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          {/* Section 01 */}
          <section>
            <SectionLabel num="01" title="Where waste comes from" />
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                Lean Manufacturing introduced the concept of <em>muda</em> — the Japanese word for waste. Toyota defined
                waste as any activity that consumes resources but creates no value for the customer. Taiichi Ohno
                categorized it into seven types. Mary and Tom Poppendieck adapted these for software in
                <em> Lean Software Development</em> (2003).
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                In most software teams, the majority of lead time is waste. Features sit in queues waiting for
                review. Deployments wait for approval. Bugs are found weeks after they are introduced. Every minute
                of waste is a minute the customer is not receiving value.
              </p>
            </div>
            {/* Three categories */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { term: "Muda", sub: "Non-value-adding work", desc: "Activities that consume time and resources without creating customer value. The seven wastes fall here.", color: "#dc2626", bg: "#fff5f5" },
                { term: "Mura", sub: "Unevenness",            desc: "Irregular, unpredictable flow. A sprint where nothing ships for 3 weeks then 40 items ship on day 14.", color: "#f59e0b", bg: "#fffbeb" },
                { term: "Muri", sub: "Overburden",            desc: "Asking people or systems to do more than they can handle. A team with 120% capacity utilization that is permanently in reactive mode.", color: "#7c3aed", bg: "#faf5ff" },
              ].map((c) => (
                <div key={c.term} className="p-6 border" style={{ backgroundColor: c.bg, borderColor: `${c.color}30`, borderLeft: `3px solid ${c.color}` }}>
                  <p className="text-base font-mono font-bold mb-0.5" style={{ fontFamily: "var(--font-heading)", color: c.color }}>{c.term}</p>
                  <p className="text-xs font-mono font-bold mb-2 text-gray-500">{c.sub}</p>
                  <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 02 — the 8 wastes */}
          <section>
            <SectionLabel num="02" title="The eight wastes of software" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#333" }}>
              Lean originally identified seven wastes. A commonly used eighth (non-utilized talent) was added later.
              Each one appears in software delivery in recognizable forms.
            </p>
            <div className="flex flex-col gap-4">
              {sevenWastes.map((w, i) => (
                <div key={w.label} className="border border-[#e5e5e5] p-5" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8" }}>
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-mono font-bold text-[#0891b2] w-6 shrink-0 mt-0.5">{i + 1}</span>
                    <div className="flex-1 flex flex-col gap-2">
                      <p className="text-sm font-bold text-black" style={{ fontFamily: "var(--font-heading)" }}>{w.label}</p>
                      <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>{w.desc}</p>
                      <div className="px-3 py-2 mt-1" style={{ backgroundColor: "#f7f7f5", borderLeft: "2px solid #e5e5e5" }}>
                        <p className="text-xs font-mono text-gray-400 mb-0.5">Example</p>
                        <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{w.example}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 03 */}
          <section>
            <SectionLabel num="03" title="The dominant waste: waiting" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>
              In most software teams, waiting dwarfs all other wastes combined. Work sits idle far more than it
              is being actively worked on. A feature that takes 3 days to build might spend 30 days waiting
              for code review, environment access, deployment approval, or release scheduling.
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>
              This is why Value Stream Mapping focuses so heavily on wait time. Reducing wait time is almost
              always a bigger lever than making individual steps faster.
            </p>
            <Callout>
              The Nexus Corp value stream had 7.5 days of process time and 34 days of wait time. 82% of lead time
              was pure waiting. Eliminating the waits — not speeding up the work — is what improves flow efficiency.
            </Callout>
          </section>

          {/* Section 04 */}
          <section>
            <SectionLabel num="04" title="How to find waste in your team" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#333" }}>
              Waste is often invisible because it has become normal. A value stream map makes it visible. When you
              trace a single feature from idea to production, ask at each step:
            </p>
            <ol className="flex flex-col gap-4">
              {[
                "Is anyone actively working on this right now, or is it waiting?",
                "Does this step directly transform the work toward what the customer wants?",
                "Would the customer pay for this step if they knew it existed?",
                "If this step failed silently, would anyone notice in less than a day?",
                "Could this step be automated, eliminated, or merged with another?",
              ].map((q, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="text-xs font-mono font-bold text-[#0891b2] shrink-0 mt-0.5">{i + 1}.</span>
                  <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>{q}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Section 05 */}
          <section>
            <SectionLabel num="05" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Lean Software Development — Poppendieck" body="The original adaptation of Lean Manufacturing's seven wastes to software. Chapters 1-2." />
              <RefCard title="Lean Thinking — Womack & Jones" body="Chapter 1: Value and Chapter 3: Flow. The source material from manufacturing." />
              <RefCard title="DevOps Handbook" body="Chapter 4: Create the Foundations of Our Deployment Pipeline. How automation eliminates the dominant wastes." />
              <RefCard title="The Phoenix Project" body="Parts 1-2: The three types of work and how unplanned work and technical debt create waste." />
            </div>
          </section>

        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/principle-of-flow" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← The Principle of Flow</a>
            <a href="/library/theory-of-constraints" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>Theory of Constraints →</a>
          </div>
        </div>
      </div>

    </main>
  )
}
