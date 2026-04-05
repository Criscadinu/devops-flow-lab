import { Syne } from "next/font/google"
import { VideoNotice } from "../_components/VideoNotice"
const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })
const serif: React.CSSProperties = { fontFamily: "Georgia, 'Times New Roman', serif" }

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span className="text-xs font-mono font-bold tracking-[0.2em] text-gray-400">{num}</span>
      <h2 className="text-xl text-black tracking-tight" style={{ ...syne.style, fontWeight: 800 }}>{title}</h2>
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

function DeploymentPatterns() {
  return (
    <div className="flex flex-col gap-5 my-4">

      {/* Blue-Green */}
      <div className="border border-[#e5e5e5] overflow-hidden">
        <div className="px-4 py-2 border-b border-[#e5e5e5]" style={{ backgroundColor: "#f0fdfa" }}>
          <p className="text-xs font-mono font-bold text-[#0891b2]">Blue-Green Deployment</p>
          <p className="text-[10px] font-mono text-gray-400">Instant cutover — instant rollback</p>
        </div>
        <div className="p-4" style={{ backgroundColor: "#ffffff" }}>
          <div className="flex items-center gap-3">
            <div className="flex-1 p-3 border-2 text-center" style={{ borderColor: "#0891b2", backgroundColor: "#f0fdfa" }}>
              <p className="text-xs font-mono font-bold text-[#0891b2]">Blue</p>
              <p className="text-[10px] font-mono text-gray-400">v1.2 — LIVE</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="text-xs font-mono text-gray-400">traffic</div>
              <div className="flex gap-1 items-center">
                <div className="w-8 h-px" style={{ backgroundColor: "#0891b2" }} />
                <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "5px solid #0891b2" }} />
              </div>
              <div className="text-[10px] font-mono text-gray-400">switch →</div>
            </div>
            <div className="flex-1 p-3 border-2 border-dashed text-center" style={{ borderColor: "#16a34a", backgroundColor: "#f0fdf4" }}>
              <p className="text-xs font-mono font-bold text-[#16a34a]">Green</p>
              <p className="text-[10px] font-mono text-gray-400">v1.3 — READY</p>
            </div>
          </div>
          <p className="text-xs mt-3" style={{ ...serif, color: "#555" }}>Both environments run simultaneously. Load balancer switches traffic from blue to green in seconds. Rollback: switch back to blue. Requires 2× infrastructure during deployment.</p>
        </div>
      </div>

      {/* Canary */}
      <div className="border border-[#e5e5e5] overflow-hidden">
        <div className="px-4 py-2 border-b border-[#e5e5e5]" style={{ backgroundColor: "#fffbeb" }}>
          <p className="text-xs font-mono font-bold text-[#b45309]">Canary Release</p>
          <p className="text-[10px] font-mono text-gray-400">Gradual rollout — minimal blast radius</p>
        </div>
        <div className="p-4" style={{ backgroundColor: "#ffffff" }}>
          <div className="flex items-center gap-2">
            {[
              { pct: "100%", version: "v1.2", color: "#6b7280", bg: "#f5f5f5" },
              { pct: "95%",  version: "v1.2", color: "#6b7280", bg: "#f5f5f5" },
              { pct: "5%",   version: "v1.3", color: "#b45309", bg: "#fffbeb" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div className="w-full p-2 border text-center" style={{ backgroundColor: item.bg, borderColor: `${item.color}40` }}>
                  <p className="text-[10px] font-mono font-bold" style={{ color: item.color }}>{item.pct}</p>
                  <p className="text-[10px] font-mono text-gray-400">{item.version}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3" style={{ ...serif, color: "#555" }}>5% of users see the new version. Monitor error rates. If healthy, increase to 10% → 25% → 50% → 100%. Rollback: route canary traffic back to stable. Requires traffic splitting in load balancer or service mesh.</p>
        </div>
      </div>

      {/* Rolling */}
      <div className="border border-[#e5e5e5] overflow-hidden">
        <div className="px-4 py-2 border-b border-[#e5e5e5]" style={{ backgroundColor: "#faf5ff" }}>
          <p className="text-xs font-mono font-bold text-[#7c3aed]">Rolling Deployment</p>
          <p className="text-[10px] font-mono text-gray-400">Instance-by-instance replacement</p>
        </div>
        <div className="p-4" style={{ backgroundColor: "#ffffff" }}>
          <div className="flex items-center gap-2">
            {[
              { label: "v1.3", color: "#16a34a", bg: "#f0fdf4" },
              { label: "v1.3", color: "#16a34a", bg: "#f0fdf4" },
              { label: "v1.2→v1.3", color: "#7c3aed", bg: "#faf5ff" },
              { label: "v1.2", color: "#6b7280", bg: "#f5f5f5" },
              { label: "v1.2", color: "#6b7280", bg: "#f5f5f5" },
            ].map((item, i) => (
              <div key={i} className="flex-1 p-2 border text-center" style={{ backgroundColor: item.bg, borderColor: `${item.color}40` }}>
                <p className="text-[10px] font-mono font-bold" style={{ color: item.color }}>{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3" style={{ ...serif, color: "#555" }}>Instances updated one at a time. Old and new versions run simultaneously during rollout. No extra infrastructure needed. Rollback is slower — must re-roll all updated instances. Application must handle both versions being live simultaneously.</p>
        </div>
      </div>
    </div>
  )
}

export default function ArchitectureLowRiskReleasesPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">First Way: Flow</span>
            <span className="mx-2">→</span><span className="text-gray-500">Tools &amp; Techniques</span>
            <span className="mx-2">→</span><span className="text-gray-700">Architecture for Low-Risk Releases</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FT-11", "TOOL", "First Way: Flow"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Architecture for Low-Risk Releases</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Deployment risk is not a pipeline problem — it is an architecture problem. How loosely coupled systems, deployment patterns, and feature flags make every release safe to ship.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Building Microservices — Newman", "Release It! — Nygard"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="Why architecture matters for deployments" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A tightly coupled monolith makes every deployment risky because every component is deployed together. A change to the payment service requires a full application deployment. A bug in a low-risk UI change can block a critical payment fix. Every release is a high-stakes all-or-nothing event.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Loose coupling allows components to be deployed independently, reducing the blast radius of each deployment to exactly the component that changed. If the payment service has a bug, only the payment service needs to be rolled back. Other services continue to function.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Tightly coupled", color: "#dc2626", bg: "#fff5f5", items: ["All components deploy together", "One bug blocks the entire release", "Long release cycles to manage risk", "Rollback reverts unrelated changes", "Testing requires the entire system"] },
                { title: "Loosely coupled", color: "#16a34a", bg: "#f0fdf4", items: ["Components deploy independently", "Bug affects only one service", "Frequent small releases per service", "Rollback targets only what changed", "Testing scoped to each component"] },
              ].map(item => (
                <div key={item.title} className="p-5 border" style={{ backgroundColor: item.bg, borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-2" style={{ color: item.color }}>{item.title}</p>
                  {item.items.map(l => (
                    <p key={l} className="text-xs flex gap-2 mb-1.5" style={{ ...serif, color: "#555" }}>
                      <span style={{ color: item.color }} className="shrink-0">{item.color === "#dc2626" ? "✗" : "✓"}</span>{l}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <Callout>DORA research shows that loosely coupled architecture is one of the strongest predictors of software delivery performance — stronger than most technical practices. You cannot deploy fast from a tightly coupled codebase regardless of how good your pipeline is.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="Loosely coupled architecture" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Most organizations do not start with a loosely coupled architecture. They start with a monolith and face the challenge of decomposing it without breaking the system. The <strong>strangler fig pattern</strong>, named by Martin Fowler after the plant that grows around a host tree and eventually replaces it, is the safest way to do this.</p>
            <div className="flex flex-col gap-3">
              {[
                { step: "1", title: "Identify a seam",           desc: "Find a bounded capability in the monolith that could be extracted: payments, user profiles, notifications. The seam is where the monolith can be cleanly separated." },
                { step: "2", title: "Build alongside",           desc: "Build the new service alongside the monolith. Do not replace yet. The strangler grows around the host, not instead of it." },
                { step: "3", title: "Route traffic gradually",   desc: "Add a facade (API gateway, proxy) in front of the monolith. Begin routing a small percentage of the capability's traffic to the new service." },
                { step: "4", title: "Migrate and verify",        desc: "Migrate traffic to 100% once the new service is proven. Monitor for regressions. The monolith still handles everything else." },
                { step: "5", title: "Remove from monolith",      desc: "Delete the capability from the monolith. The strangler has replaced its host at this seam. Repeat for the next capability." },
              ].map(item => (
                <div key={item.step} className="flex gap-5 p-4 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <span className="text-2xl font-mono font-bold shrink-0 leading-none" style={{ ...syne.style, color: "#f0f0f0" }}>{item.step}</span>
                  <div>
                    <p className="text-sm font-bold text-black mb-1" style={{ ...syne.style }}>{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="Deployment patterns" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Even with a well-architected system, the mechanics of how you deploy affect risk. Three patterns cover most cases:</p>
            <DeploymentPatterns />
          </section>

          <section>
            <SectionLabel num="04" title="Feature flags as an architectural pattern" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Feature flags are not just a release management tool — they are an architectural pattern that separates deployment from release at the code level. Combined with deployment patterns, they give you multiple independent control planes for managing risk.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Dark launch",      color: "#0891b2", bg: "#f0fdfa", desc: "Code is deployed and executes in production, but its output is suppressed. Use to test performance and correctness under real load before exposing to users." },
                { title: "Ring deployment",  color: "#7c3aed", bg: "#faf5ff", desc: "Expose features in concentric rings: internal team → beta users → 1% → 10% → all. Each ring validates before expanding to the next." },
                { title: "Kill switch",      color: "#dc2626", bg: "#fff5f5", desc: "An ops flag that can disable a risky integration instantly — without a code deployment or rollback. Circuit breaker at the product level." },
                { title: "A/B flags",        color: "#b45309", bg: "#fffbeb", desc: "Route different user segments to different code paths simultaneously. The feature flag is also the experiment assignment mechanism." },
              ].map(item => (
                <div key={item.title} className="p-5 border" style={{ backgroundColor: item.bg, borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1.5" style={{ color: item.color }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="05" title="The Nexus Corp architecture" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>After the four missions, Nexus Corp has the foundations of a low-risk release architecture. Here is what they have, and what a full low-risk architecture would add:</p>
            <div className="border border-[#e5e5e5] overflow-hidden">
              <div className="grid grid-cols-3 px-4 py-2 border-b border-[#e5e5e5]" style={{ backgroundColor: "#f7f7f5" }}>
                {["Component", "Current state", "Full low-risk release"].map(h => (
                  <p key={h} className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wide">{h}</p>
                ))}
              </div>
              {[
                { component: "Deployment",       current: "Render rolling deploy",          full: "Blue-green with instant rollback" },
                { component: "Feature control",  current: "None",                           full: "Feature flag service (LaunchDarkly / custom)" },
                { component: "Architecture",     current: "Monolith (Express app)",         full: "Core monolith + extracted payment service" },
                { component: "Traffic control",  current: "Single endpoint",                full: "API gateway with canary routing" },
                { component: "Database",         current: "Flyway migrations",              full: "Expand-contract pattern on all schema changes" },
                { component: "Observability",    current: "None post-deploy",               full: "Four golden signals, deployment markers in dashboards" },
              ].map((r, i) => (
                <div key={r.component} className="grid grid-cols-3 px-4 py-2.5" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < 5 ? "1px solid #f0f0f0" : undefined }}>
                  <p className="text-xs font-mono font-bold" style={{ color: "#0891b2" }}>{r.component}</p>
                  <p className="text-xs" style={{ ...serif, color: "#555" }}>{r.current}</p>
                  <p className="text-xs" style={{ ...serif, color: "#333" }}>{r.full}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="DevOps Handbook — Chapter 13" body="Architect for Low-Risk Releases. Loosely coupled architectures, strangler fig, and the link between team topology and system architecture." />
              <RefCard title="Building Microservices — Sam Newman" body="The definitive guide to service decomposition. Strangler fig pattern, service boundaries, and deployment patterns for distributed systems." />
              <RefCard title="Release It! — Michael Nygard" body="Production readiness patterns. Stability patterns, deployment patterns, and the architectural decisions that separate systems that survive production from those that don't." />
              <RefCard title="Accelerate — Chapter 5" body="Architecture and software delivery performance. The DORA finding: loosely coupled architecture is a key predictor of deployment frequency and lead time." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <a href="/library/infrastructure-as-code" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Infrastructure as Code</a>
        </div>
      </div>
    </main>
  )
}
