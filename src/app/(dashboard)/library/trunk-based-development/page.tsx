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

function BranchDiagram() {
  return (
    <div className="my-6 border border-[#e5e5e5] overflow-hidden" style={{ backgroundColor: "#f7f7f5" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Long-lived branches */}
        <div className="p-5 border-b sm:border-b-0 sm:border-r border-[#e5e5e5]">
          <p className="text-xs font-mono font-bold mb-4" style={{ color: "#dc2626" }}>Long-lived branches</p>
          <div className="flex flex-col gap-2 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-16 text-gray-400">main</span>
              <div className="flex gap-1">
                {["C1","C2","C3","C4","C5","C6"].map(c => (
                  <div key={c} className="w-6 h-6 flex items-center justify-center text-[8px]" style={{ backgroundColor: "#e5e5e5", border: "1px solid #d4d4d4" }}>{c}</div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-16 text-gray-400">feature-A</span>
              <div className="ml-6 flex gap-1">
                {["F1","F2","F3","F4","F5","F6","F7","F8"].map(c => (
                  <div key={c} className="w-6 h-6 flex items-center justify-center text-[8px]" style={{ backgroundColor: "#fee2e2", border: "1px solid #fca5a5", color: "#dc2626" }}>{c}</div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-16 text-gray-400">feature-B</span>
              <div className="ml-12 flex gap-1">
                {["G1","G2","G3","G4","G5"].map(c => (
                  <div key={c} className="w-6 h-6 flex items-center justify-center text-[8px]" style={{ backgroundColor: "#fee2e2", border: "1px solid #fca5a5", color: "#dc2626" }}>{c}</div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[10px] font-mono mt-3" style={{ color: "#dc2626" }}>Merge conflict hell on integration</p>
        </div>
        {/* Trunk-based */}
        <div className="p-5">
          <p className="text-xs font-mono font-bold mb-4" style={{ color: "#16a34a" }}>Trunk-based development</p>
          <div className="flex flex-col gap-2 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-16 text-gray-400">main</span>
              <div className="flex gap-1">
                {["C1","C2","C3","C4","C5","C6","C7","C8","C9"].map(c => (
                  <div key={c} className="w-6 h-6 flex items-center justify-center text-[8px]" style={{ backgroundColor: "#f0fdf4", border: "1px solid #86efac", color: "#16a34a" }}>{c}</div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[10px] font-mono mt-3" style={{ color: "#16a34a" }}>Everyone commits to main. No divergence.</p>
        </div>
      </div>
    </div>
  )
}

export default function TrunkBasedDevelopmentPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">First Way: Flow</span>
            <span className="mx-2">→</span><span className="text-gray-500">Tools &amp; Techniques</span>
            <span className="mx-2">→</span><span className="text-gray-700">Trunk-Based Development</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FT-04", "TOOL", "First Way: Flow"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Trunk-Based Development</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Committing directly to main. Why long-lived branches are a form of waste and how short integration cycles keep flow moving.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "DORA Research", "trunkbaseddevelopment.com"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="What is trunk-based development?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Trunk-based development is a source control practice where all developers integrate their work into a single shared branch — trunk, or main — at least once per day. There are no long-lived feature branches. Changes are small, frequent, and always in a deployable state.</p>
            <p className="text-sm leading-relaxed" style={{ color: "#333" }}>The alternative is GitFlow or similar branch-heavy strategies where features live on separate branches for weeks. These approaches feel safer but create exactly the kind of integration risk they are designed to avoid.</p>
            <BranchDiagram />
          </section>

          <section>
            <SectionLabel num="02" title="Why long-lived branches kill flow" />
            <div className="flex flex-col gap-4">
              {[
                { title: "Merge hell",            body: "The longer a branch lives, the further it diverges from main. A two-week-old branch may have hundreds of conflicts to resolve. Merge conflicts are pure waste — rework caused by delayed integration." },
                { title: "Delayed feedback",      body: "Tests only run when code is integrated. A bug introduced on day 1 of a feature branch may not be discovered until day 14 when the branch merges. It is now 14x harder to find the root cause." },
                { title: "Inventory buildup",     body: "Unmerged branches are inventory — finished work not yet delivered. Every day a branch sits unmerged, it accumulates holding cost and risk." },
                { title: "False safety",          body: "Long branches feel like isolation from risk. They are actually accumulation of risk. The longer you wait to integrate, the bigger the explosion when you do." },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: "#dc2626" }} />
                  <div>
                    <p className="text-sm font-bold text-black mb-1" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</p>
                    <p className="text-sm leading-relaxed" style={{ ...serif, color: "#555" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="The practices" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#333" }}>Trunk-based development requires discipline and enabling practices. It does not mean merging broken code to main.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Small commits",        desc: "Each commit is a single logical change. Small enough to review in minutes. Big enough to mean something. Commit at least daily.", color: "#0891b2", bg: "#f0fdfa" },
                { title: "Short-lived branches", desc: "If you branch, merge within one or two days. Branches are a tool for code review, not for long-running development.", color: "#16a34a", bg: "#f0fdf4" },
                { title: "Feature flags",        desc: "Ship incomplete features behind a flag. The code is in main, deployed to production, but invisible to users until you flip the switch.", color: "#b45309", bg: "#fffbeb" },
              ].map(c => (
                <div key={c.title} className="p-5 border" style={{ backgroundColor: c.bg, borderLeft: `3px solid ${c.color}`, borderColor: `${c.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1.5" style={{ color: c.color }}>{c.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="Feature flags" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The most common objection to trunk-based development: <em>what if the feature is not ready?</em> Feature flags answer this. A feature flag is a conditional in the code that gates a feature by configuration, not by branch.</p>
            <div className="p-4 border border-[#e5e5e5] font-mono text-xs" style={{ backgroundColor: "#f7f7f5" }}>
              <p className="text-gray-400 mb-2">// Feature flag — deployed to prod, not yet visible</p>
              <p className="text-gray-700">{"if (featureFlags.newCheckout) {"}</p>
              <p className="text-gray-700 ml-4">{"return <NewCheckoutFlow />"}</p>
              <p className="text-gray-700">{"}"}</p>
              <p className="text-gray-700">{"return <LegacyCheckout />"}</p>
            </div>
            <p className="text-sm leading-relaxed mt-4" style={{ color: "#333" }}>This decouples <strong>deploy</strong> from <strong>release</strong>. The code ships continuously. The feature is revealed to users on your schedule, not your branch's schedule.</p>
          </section>

          <section>
            <SectionLabel num="05" title="DORA research findings" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>DORA's multi-year research across thousands of teams identifies trunk-based development as one of the strongest predictors of high software delivery performance. Teams that practice trunk-based development have:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { stat: "5x",   label: "more frequent deployments",     color: "#0891b2" },
                { stat: "440x", label: "faster lead time for changes",   color: "#0891b2" },
                { stat: "2x",   label: "lower change failure rate",      color: "#16a34a" },
              ].map(s => (
                <div key={s.stat} className="p-5 border border-[#e5e5e5] text-center" style={{ backgroundColor: "#ffffff" }}>
                  <p className="text-3xl font-mono font-bold" style={{ fontFamily: "var(--font-heading)", color: s.color }}>{s.stat}</p>
                  <p className="text-xs mt-1" style={{ ...serif, color: "#555" }}>{s.label}</p>
                </div>
              ))}
            </div>
            <Callout>DORA found that trunk-based development — along with continuous integration and deployment automation — forms a cluster of practices that together predict elite performance. No single practice works in isolation.</Callout>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="DevOps Handbook" body="Chapter 9: Enable and Practice Continuous Integration. Trunk-based development as the enabling practice for CI." />
              <RefCard title="DORA State of DevOps Research" body="2019 and 2023 reports: trunk-based development identified as a key capability of elite performers." />
              <RefCard title="trunkbaseddevelopment.com" body="The comprehensive reference site maintained by Paul Hammant. Patterns, anti-patterns, and case studies." />
              <RefCard title="Continuous Delivery — Humble & Farley" body="Chapter 14: Advanced Version Control. The full treatment of branching strategies and trunk-based approaches." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/environment-parity" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Environment Parity</a>
            <a href="/library/continuous-integration" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>Continuous Integration →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
