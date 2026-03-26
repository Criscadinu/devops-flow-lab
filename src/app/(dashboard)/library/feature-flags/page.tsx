import { Syne } from "next/font/google"
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
function Callout({ children, accent = "#7c3aed" }: { children: React.ReactNode; accent?: string }) {
  return (
    <div className="px-6 py-4 my-6" style={{ backgroundColor: `${accent}0d`, borderLeft: `3px solid ${accent}` }}>
      <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>{children}</p>
    </div>
  )
}
function RefCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#fafafa" }}>
      <p className="text-xs font-mono font-bold text-[#7c3aed] mb-1">{title}</p>
      <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{body}</p>
    </div>
  )
}

function FlagLifecycle() {
  const stages = [
    { label: "Create",  icon: "+", color: "#0891b2", desc: "Define the flag. Default off. Add to config." },
    { label: "Code",    icon: "{ }", color: "#7c3aed", desc: "Wrap new code in the flag check." },
    { label: "Deploy",  icon: "↑", color: "#16a34a", desc: "Ship to production. Flag is off. Zero user impact." },
    { label: "Enable",  icon: "%", color: "#b45309", desc: "Turn on for 1% → 10% → 50% → 100%." },
    { label: "Remove",  icon: "✗", color: "#dc2626", desc: "Delete the flag and dead code path. Critical step." },
  ]
  return (
    <div className="my-6 p-5 border border-[#e5e5e5] overflow-x-auto" style={{ backgroundColor: "#f7f7f5" }}>
      <div className="flex items-start min-w-max gap-3">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 flex items-center justify-center border-2 text-sm font-mono" style={{ backgroundColor: "#fff", borderColor: s.color, color: s.color }}>{s.icon}</div>
              <p className="text-xs font-mono font-bold" style={{ color: s.color }}>{s.label}</p>
              <p className="text-[10px] font-mono text-gray-400 text-center max-w-[80px]">{s.desc}</p>
            </div>
            {i < stages.length - 1 && (
              <div className="flex items-center mt-4">
                <div className="w-6 h-px bg-gray-300" />
                <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "5px solid #d1d5db" }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FeatureFlagsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#7c3aed] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">Second Way: Feedback</span>
            <span className="mx-2">→</span><span className="text-gray-700">Feature Flags</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FB-03", "TOOL", "Second Way: Feedback"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#faf5ff", color: "#7c3aed", border: "1px solid #e9d5ff" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Feature Flags</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Decouple deploy from release. Ship code to production without turning it on — then roll out to 1%, 10%, 100% with instant rollback at any point.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Continuous Delivery — Humble & Farley"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 py-10 border-b border-[#e5e5e5]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#7c3aed] mb-3">Video Lesson</p>
          <div className="w-full flex items-center justify-center" style={{ aspectRatio: "16/9", border: "2px dashed #c4b5fd", backgroundColor: "#faf5ff" }}>
            <span className="text-sm font-mono text-gray-400">Video coming soon — check back later</span>
          </div>
          <p className="text-xs mt-3" style={{ ...serif, color: "#888" }}>In this video: what feature flags are, the four types, the flag lifecycle, and how to avoid flag debt.</p>
        </div>
      </div>

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="What are feature flags?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A feature flag (also called a feature toggle or feature switch) is a conditional in your code that controls whether a feature is active. The feature code is deployed to production, but the flag is off by default — the code runs but the feature is invisible to users.</p>
            <div className="p-4 border border-[#e5e5e5] font-mono text-xs mb-4" style={{ backgroundColor: "#f7f7f5" }}>
              <p className="text-gray-400 mb-2">{"// The feature is deployed but not yet visible"}</p>
              <p className="text-gray-700">{"if (flags.get('new_checkout_flow')) {"}</p>
              <p className="text-gray-700 ml-4">{"return <NewCheckout />"}</p>
              <p className="text-gray-700">{"}"}</p>
              <p className="text-gray-700">{"return <LegacyCheckout />"}</p>
            </div>
            <Callout>Feature flags decouple <strong>deployment</strong> from <strong>release</strong>. Deployment is a technical event — code moves from repo to production. Release is a business event — users gain access to a feature. They do not have to happen at the same time.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="Types of flags" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { type: "Release flag",     color: "#7c3aed", bg: "#faf5ff", lifetime: "Days to weeks", desc: "Controls a feature under development. Enables trunk-based development — code ships before the feature is ready. Remove when fully rolled out.", example: "new_checkout_flow, redesigned_nav" },
                { type: "Experiment flag",  color: "#0891b2", bg: "#f0fdfa", lifetime: "Days to weeks", desc: "Routes traffic to different variants for A/B testing. Managed by the experiment platform. Remove when the test concludes.", example: "checkout_button_color, price_display_v2" },
                { type: "Ops flag",         color: "#b45309", bg: "#fffbeb", lifetime: "Permanent",     desc: "A circuit breaker for a feature that may need to be disabled in production. High-risk integrations, expensive operations. Leave permanently in place.", example: "enable_payment_provider_stripe, rate_limit_api" },
                { type: "Permission flag",  color: "#16a34a", bg: "#f0fdf4", lifetime: "Permanent",     desc: "Controls access by user segment — beta users, paying customers, internal staff. Part of the product, not a toggle to remove.", example: "beta_features, premium_analytics" },
              ].map(item => (
                <div key={item.type} className="p-5 border" style={{ backgroundColor: item.bg, borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <div className="flex items-baseline gap-2 mb-2">
                    <p className="text-xs font-mono font-bold" style={{ color: item.color }}>{item.type}</p>
                    <p className="text-[10px] font-mono text-gray-400">Lifetime: {item.lifetime}</p>
                  </div>
                  <p className="text-xs leading-relaxed mb-2" style={{ ...serif, color: "#333" }}>{item.desc}</p>
                  <p className="text-[10px] font-mono" style={{ color: item.color }}>e.g. {item.example}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="The dark launch pattern" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The dark launch is a deployment pattern where a new code path is shipped to production and exercised — but its output is discarded rather than shown to users. It separates load testing from user impact.</p>
            <div className="border border-[#e5e5e5] overflow-hidden">
              {[
                { pct: "0%",    step: "Code deployed, flag off",          result: "Zero user impact. Code exists in production." },
                { pct: "0%",    step: "Dark launch — shadow traffic",      result: "New code runs alongside old. Output discarded. Load tested under real traffic." },
                { pct: "1%",    step: "Enable for internal staff",         result: "Team members see the feature. Fast feedback on real data." },
                { pct: "5%",    step: "Canary rollout to 5% of users",     result: "Monitor error rates and latency. Compare to control group." },
                { pct: "100%",  step: "Full rollout",                      result: "All users on new path. Flag becomes default-on." },
              ].map((r, i) => (
                <div key={`${r.pct}-${i}`} className="grid grid-cols-12 px-4 py-2.5 gap-2" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < 4 ? "1px solid #f0f0f0" : undefined }}>
                  <p className="col-span-1 text-xs font-mono font-bold" style={{ color: "#7c3aed" }}>{r.pct}</p>
                  <p className="col-span-5 text-xs font-mono text-gray-700">{r.step}</p>
                  <p className="col-span-6 text-xs" style={{ ...serif, color: "#555" }}>{r.result}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="Feature flag lifecycle" />
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#333" }}>Every release flag has a lifecycle. The critical and most neglected step is removal. Flags that are never removed become flag debt.</p>
            <FlagLifecycle />
            <p className="text-sm leading-relaxed mt-2" style={{ color: "#333" }}>Add a ticket to remove each release flag at the time you create it. Set an expiry date in the flag config. Review active flags in every sprint retrospective.</p>
          </section>

          <section>
            <SectionLabel num="05" title="Risks: flag debt and complexity" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Feature flags are powerful but introduce their own failure modes. The most common:</p>
            <div className="flex flex-col gap-3">
              {[
                { risk: "Flag debt",               desc: "Flags that are never removed accumulate into a branching maze. A codebase with 50 active release flags has 2^50 possible execution paths. Most are untested.", mitigation: "Treat flag removal as a feature. Track flag age. Delete within 2 weeks of full rollout." },
                { risk: "Testing combinations",    desc: "Each flag doubles the number of states to test. With 10 flags, there are 1,024 combinations. Most teams test only the happy path.", mitigation: "Limit the number of active flags. Test the default-on and default-off states. Use feature flag testing libraries." },
                { risk: "Configuration sprawl",    desc: "Flags defined in code, environment variables, databases, and config files simultaneously. Unclear which system is authoritative.", mitigation: "Use a single flag management system. Never hardcode flag values in application code." },
              ].map(item => (
                <div key={item.risk} className="border border-[#e5e5e5] overflow-hidden">
                  <div className="px-4 py-2.5" style={{ backgroundColor: "#fff5f5", borderLeft: "3px solid #dc2626" }}>
                    <p className="text-xs font-mono font-bold text-[#dc2626]">{item.risk}</p>
                    <p className="text-xs leading-relaxed mt-1" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                  </div>
                  <div className="px-4 py-2.5" style={{ backgroundColor: "#f0fdf4" }}>
                    <p className="text-[10px] font-mono font-bold text-[#16a34a] mb-0.5">Mitigation</p>
                    <p className="text-xs" style={{ ...serif, color: "#555" }}>{item.mitigation}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Martin Fowler — Feature Toggles" body="martinfowler.com/articles/feature-toggles.html. The comprehensive taxonomy of flag types, patterns, and lifecycle management." />
              <RefCard title="DevOps Handbook — Chapter 15" body="Enable Safe Deployments and Rollbacks. Feature flags as the mechanism for separating deploy from release." />
              <RefCard title="Continuous Delivery — Humble & Farley" body="Chapter 10: Deploying and Releasing Applications. Feature flags in the context of deployment pipeline design." />
              <RefCard title="LaunchDarkly Blog" body="launchdarkly.com/blog. Practical articles on flag management, gradual rollouts, and avoiding flag debt." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/monitoring-and-alerting" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Monitoring and Alerting</a>
            <a href="/library/ab-testing" className="text-sm font-mono font-bold hover:underline" style={{ color: "#7c3aed" }}>A/B Testing →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
