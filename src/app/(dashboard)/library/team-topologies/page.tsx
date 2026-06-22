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

const teamTypes = [
  {
    id: "ST",
    title: "Stream-aligned team",
    tagline: "Aligned to a flow of work",
    color: "#0891b2",
    bg: "#f0fdfa",
    desc: "The primary team type. A stream-aligned team owns a slice of the product end-to-end — from user-facing feature to production deployment. They have all the skills they need to deliver without depending on other teams. Conway's Law: this team owns its part of the architecture.",
    goal: "Deliver value continuously to users and the business",
    example: "The Nexus Corp payments team owns the checkout flow, the payment service, and its database.",
  },
  {
    id: "ET",
    title: "Enabling team",
    tagline: "Accelerates stream-aligned teams",
    color: "#16a34a",
    bg: "#f0fdf4",
    desc: "An enabling team helps stream-aligned teams acquire capabilities they need but don't yet have. They are not a bottleneck or gatekeeper — they work to make themselves unnecessary. A DevOps enabling team helps product teams build their own CI/CD pipelines, then moves on.",
    goal: "Increase stream-aligned team capability; minimize dependencies",
    example: "A DevOps practice team that runs workshops, builds platform templates, and mentors teams on observability.",
  },
  {
    id: "CS",
    title: "Complicated-subsystem team",
    tagline: "Owns a complex component",
    color: "#b45309",
    bg: "#fffbeb",
    desc: "When a subsystem is so technically complex that it requires specialist expertise — graphics rendering, actuarial calculations, ML model serving — a dedicated team reduces the cognitive load on stream-aligned teams. This is a deliberate carve-out, not a default way to organize.",
    goal: "Reduce cognitive load on stream-aligned teams for complex subsystems",
    example: "A team that owns the real-time pricing engine — too complex for a product team to maintain alongside feature work.",
  },
  {
    id: "PT",
    title: "Platform team",
    tagline: "Provides self-service infrastructure",
    color: "#7c3aed",
    bg: "#faf5ff",
    desc: "A platform team builds and operates the internal platform that stream-aligned teams use to deploy, monitor, and operate their services. The platform must be good enough that teams choose to use it — if it requires constant coordination, it is a bottleneck, not a platform.",
    goal: "Reduce cognitive load on stream-aligned teams through self-service",
    example: "An internal developer platform: one-click deployment, standardized observability, automated compliance checks.",
  },
]

const interactionModes = [
  {
    mode: "Collaboration",
    color: "#0891b2",
    bg: "#f0fdfa",
    desc: "Two teams work closely together, often on the same codebase or problem. High bandwidth. Use for exploration and discovery. Avoid as a permanent mode — it creates coupling.",
    when: "When discovering new capabilities or solving complex integration problems.",
  },
  {
    mode: "X-as-a-Service",
    color: "#16a34a",
    bg: "#f0fdf4",
    desc: "One team provides a service with a clear API and SLA. The consuming team uses it without needing to understand the implementation. Low coordination overhead. The target for most platform interactions.",
    when: "Once a capability is well-understood and stable — APIs, platforms, internal tools.",
  },
  {
    mode: "Facilitating",
    color: "#b45309",
    bg: "#fffbeb",
    desc: "An enabling team coaches another team. The goal is to transfer knowledge and capability, not to do the work for them. The enabling team works to make itself unnecessary.",
    when: "When a team needs to build a new capability it doesn't yet have.",
  },
]

export default function TeamTopologiesPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">Foundations</span>
            <span className="mx-2">→</span><span className="text-gray-700">Team Topologies</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["F-04", "FOUNDATION"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#faf5ff", color: "#7c3aed", border: "1px solid #e9d5ff" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Team Topologies</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Matthew Skelton and Manuel Pais's framework for organizing software teams. Four team types, three interaction modes, and why Conway's Law means team structure is architecture.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["Team Topologies — Skelton & Pais", "Conway's Law — Melvin Conway (1967)"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="Conway's Law" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>In 1967, Melvin Conway observed: <em>"Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure."</em> This is Conway's Law, and it is one of the most reliably observed phenomena in software engineering.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>If you have three backend teams, you will have three backend services. If you have a DBA team separate from development, you will have slow database changes. Team structure shapes architecture, whether you intend it or not.</p>
            <Callout>Team Topologies inverts the argument: if your team structure determines your architecture, design your team structure to produce the architecture you want. This is the <strong>Inverse Conway Maneuver</strong>.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="The four team types" />
            <div className="flex flex-col gap-6">
              {teamTypes.map(team => (
                <div key={team.id} className="border border-[#e5e5e5] overflow-hidden">
                  <div className="px-6 py-5" style={{ backgroundColor: team.bg, borderLeft: `3px solid ${team.color}` }}>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 border" style={{ color: team.color, borderColor: `${team.color}40`, backgroundColor: `${team.color}10` }}>{team.id}</span>
                      <p className="text-sm font-bold text-black" style={{ fontFamily: "var(--font-heading)" }}>{team.title}</p>
                      <p className="text-xs font-mono" style={{ color: team.color }}>{team.tagline}</p>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>{team.desc}</p>
                  </div>
                  <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ backgroundColor: "#ffffff" }}>
                    <div>
                      <p className="text-[10px] font-mono font-bold text-gray-400 mb-1 uppercase tracking-widest">Goal</p>
                      <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{team.goal}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono font-bold text-gray-400 mb-1 uppercase tracking-widest">Example</p>
                      <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{team.example}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="The three interaction modes" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Teams do not interact in a single way. Team Topologies defines three modes of interaction — and specifies when each is appropriate. The goal is to minimize unnecessary coordination overhead while enabling the right kind of collaboration when needed.</p>
            <div className="flex flex-col gap-4">
              {interactionModes.map(im => (
                <div key={im.mode} className="p-5 border" style={{ backgroundColor: im.bg, borderLeft: `3px solid ${im.color}`, borderColor: `${im.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1.5" style={{ color: im.color }}>{im.mode}</p>
                  <p className="text-sm leading-relaxed mb-2" style={{ ...serif, color: "#333" }}>{im.desc}</p>
                  <p className="text-xs font-mono" style={{ color: im.color }}>Use when: <span style={{ ...serif, color: "#555", fontFamily: "Georgia, serif" }}>{im.when}</span></p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="Cognitive load as a design constraint" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Skelton and Pais argue that team design should be constrained by cognitive load — the total amount of mental work a team can handle. Teams that own too much surface area become unable to focus, move slowly, and produce low-quality work.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Three types of cognitive load:</p>
            <div className="border border-[#e5e5e5] overflow-hidden">
              {[
                { type: "Intrinsic",   color: "#0891b2", desc: "The complexity inherent to the problem — the business domain, the technical requirements. Cannot be eliminated; must be managed." },
                { type: "Extraneous", color: "#dc2626", desc: "Cognitive load from incidental complexity — build systems, deployment scripts, environment setup, process compliance. Should be minimized aggressively." },
                { type: "Germane",    color: "#16a34a", desc: "Cognitive load that builds long-term capability — learning the domain, mastering the tools. Should be encouraged." },
              ].map((row, i) => (
                <div key={row.type} className="grid grid-cols-12 px-4 py-3 items-start gap-4" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < 2 ? "1px solid #f0f0f0" : undefined }}>
                  <p className="col-span-2 text-xs font-mono font-bold" style={{ color: row.color }}>{row.type}</p>
                  <p className="col-span-10 text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{row.desc}</p>
                </div>
              ))}
            </div>
            <Callout>A team's job is to minimize extraneous cognitive load (via platform teams, tooling, automation) so that engineers can spend their mental energy on intrinsic complexity — the actual hard problems they are hired to solve.</Callout>
          </section>

          <section>
            <SectionLabel num="05" title="Platform teams and DevOps" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Team Topologies provides the organizational blueprint for what DevOps practitioners call "platform engineering." A platform team builds internal developer tooling that stream-aligned teams use self-service — CI/CD, observability, cloud abstractions, security guardrails.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The critical distinction: a platform is not a gate or a bottleneck. If stream-aligned teams must file tickets to use the platform, it is a traditional ops team in new clothes. A genuine platform team operates like an internal product team — with a roadmap, user research, and an API.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 border" style={{ backgroundColor: "#fff5f5", borderLeft: "3px solid #dc2626", borderColor: "#dc262625" }}>
                <p className="text-xs font-mono font-bold text-[#dc2626] mb-2">Anti-pattern: Ops team as gate</p>
                <div className="flex flex-col gap-1.5">
                  {["Teams file tickets for deployments", "Platform work is invisible and reactive", "Bottleneck grows as scale increases", "Teams work around it when they can"].map(l => (
                    <div key={l} className="flex gap-2 text-xs" style={{ ...serif, color: "#555" }}><span className="text-[#dc2626] shrink-0">✗</span>{l}</div>
                  ))}
                </div>
              </div>
              <div className="p-5 border" style={{ backgroundColor: "#f0fdf4", borderLeft: "3px solid #16a34a", borderColor: "#16a34a25" }}>
                <p className="text-xs font-mono font-bold text-[#16a34a] mb-2">Pattern: Platform as product</p>
                <div className="flex flex-col gap-1.5">
                  {["Self-service deployment in one command", "Platform has a roadmap and user feedback", "Scales with the organization", "Teams prefer it to rolling their own"].map(l => (
                    <div key={l} className="flex gap-2 text-xs" style={{ ...serif, color: "#555" }}><span className="text-[#16a34a] shrink-0">✓</span>{l}</div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Team Topologies — Skelton & Pais" body="The source. The full treatment of team types, interaction modes, cognitive load, and the Inverse Conway Maneuver." />
              <RefCard title="Conway's Law — Melvin Conway (1968)" body="The original paper: 'How do committees invent?' Four pages. The foundational observation that team structure shapes system structure." />
              <RefCard title="The DevOps Handbook — Part V" body="Organizational patterns for DevOps. How to structure teams for fast flow across large organizations." />
              <RefCard title="Accelerate — Forsgren, Humble, Kim" body="Chapter 7: Management Practices for Software. The research link between team autonomy, organizational structure, and delivery performance." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/five-ideals" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← The Five Ideals</a>
          </div>
        </div>
      </div>
    </main>
  )
}
