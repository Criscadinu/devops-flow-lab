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

function PipelineDiagram() {
  const stages = [
    { label: "Source",           sub: "git push",          color: "#0891b2" },
    { label: "Build",            sub: "compile + package", color: "#0891b2" },
    { label: "Test",             sub: "unit + integration", color: "#0891b2" },
    { label: "Deploy Staging",   sub: "automated",         color: "#16a34a" },
    { label: "Deploy Production",sub: "automated / gated", color: "#16a34a" },
  ]
  return (
    <div className="my-6 p-6 border border-[#e5e5e5] overflow-x-auto" style={{ backgroundColor: "#f7f7f5" }}>
      <div className="flex items-center min-w-max gap-2">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div className="px-4 py-2.5 border-2 text-center" style={{ backgroundColor: "#fff", borderColor: s.color, minWidth: "110px" }}>
                <p className="text-xs font-mono font-bold" style={{ color: s.color }}>{s.label}</p>
                <p className="text-[10px] font-mono text-gray-400 mt-0.5">{s.sub}</p>
              </div>
            </div>
            {i < stages.length - 1 && (
              <div className="flex items-center">
                <div className="w-5 h-px bg-gray-300" />
                <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "5px solid #d1d5db" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs font-mono text-gray-400 mt-4">Every commit to main triggers the pipeline. The only way to production is through all stages.</p>
    </div>
  )
}

export default function DeploymentPipelinePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">First Way: Flow</span>
            <span className="mx-2">→</span><span className="text-gray-500">Tools &amp; Techniques</span>
            <span className="mx-2">→</span><span className="text-gray-700">The Deployment Pipeline</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FT-02", "TOOL", "First Way: Flow"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>The Deployment Pipeline</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>The automated path from code commit to production. How to build it, what it must include, and why it is the foundation of fast, reliable delivery.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Continuous Delivery — Humble & Farley"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="What is a deployment pipeline?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A deployment pipeline is the automated process that takes every change from version control through build, test, and deployment stages to reach production. It is the embodiment of the principle: every change is a release candidate until proven otherwise.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Jez Humble and David Farley introduced the term in <em>Continuous Delivery</em> (2010). The pipeline replaces manual, error-prone release processes with a repeatable, auditable, automated system.</p>
            <PipelineDiagram />
          </section>

          <section>
            <SectionLabel num="02" title="The four stages of a pipeline" />
            <div className="flex flex-col gap-4">
              {[
                { n: "1", title: "Source control",               body: "Every change starts with a commit to version control. The pipeline is triggered automatically. No manual steps, no out-of-band changes." },
                { n: "2", title: "Build and unit test",          body: "Compile the code. Run all unit tests. This stage must complete in minutes. If it takes longer, developers stop running it locally." },
                { n: "3", title: "Integration and acceptance",   body: "Run integration tests, contract tests, and acceptance tests against a production-like environment. Slower than unit tests but catches different bugs." },
                { n: "4", title: "Deploy",                       body: "Promote the artifact through staging and into production. The artifact built in stage 2 is the same one deployed — never rebuilt." },
              ].map(item => (
                <div key={item.n} className="flex gap-5 p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <span className="text-3xl font-mono font-bold shrink-0 leading-none" style={{ ...syne.style, color: "#f0f0f0" }}>{item.n}</span>
                  <div>
                    <p className="text-sm font-bold text-black mb-1" style={{ ...syne.style }}>{item.title}</p>
                    <p className="text-sm leading-relaxed" style={{ ...serif, color: "#555" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="The pipeline as the only path to production" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The most important rule of the deployment pipeline: <strong>if it is not in the pipeline, it does not deploy.</strong> No SSH deployments. No manual uploads. No emergency hotfixes that bypass the pipeline. Every exception creates risk and erodes trust in the process.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>This sounds strict. It is. The strictness is the point. When the pipeline is the only path, every deployment is tested, auditable, and repeatable. When exceptions are allowed, the exceptions become the default in a crisis — exactly when you can least afford them.</p>
            <Callout>Every time you bypass the pipeline, you are trading short-term speed for long-term fragility. Elite teams deploy more frequently than low performers precisely because they never bypass their pipelines.</Callout>
          </section>

          <section>
            <SectionLabel num="04" title="Pipeline metrics" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Build time",            target: "Under 10 minutes",   desc: "Developers will not wait for slow builds. If the build takes 30 minutes, developers batch commits and integration problems compound.",      color: "#0891b2", bg: "#f0fdfa" },
                { label: "Test coverage",          target: "70%+ meaningful",    desc: "Coverage is a proxy, not a goal. 70% meaningful coverage beats 95% coverage of trivial getters. Focus on critical paths.",                    color: "#16a34a", bg: "#f0fdf4" },
                { label: "Deployment frequency",   target: "Multiple per day",   desc: "How often does the pipeline produce a production deployment? Elite teams deploy on demand. Low performers deploy monthly.",                     color: "#b45309", bg: "#fffbeb" },
                { label: "Lead time",              target: "Under one hour",     desc: "Time from commit to production deployment. This is what the DORA Lead Time metric measures. The pipeline is the primary lever.",               color: "#7c3aed", bg: "#faf5ff" },
              ].map(m => (
                <div key={m.label} className="p-5 border" style={{ backgroundColor: m.bg, borderColor: `${m.color}25`, borderLeft: `3px solid ${m.color}` }}>
                  <p className="text-xs font-mono font-bold mb-0.5" style={{ color: m.color }}>{m.label}</p>
                  <p className="text-sm font-bold text-black mb-2" style={{ ...syne.style }}>{m.target}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="05" title="The Nexus Corp pipeline" />
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#333" }}>In Mission 03, you built Nexus Corp's first CI pipeline using GitHub Actions. Here is the before and after:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 border" style={{ backgroundColor: "#fff5f5", borderColor: "#fca5a5", borderLeft: "3px solid #dc2626" }}>
                <p className="text-xs font-mono font-bold mb-3" style={{ color: "#dc2626" }}>Before M-03</p>
                <ul className="flex flex-col gap-2">
                  {["Manual deployments from a zip file", "No automated tests", "Bugs discovered in production", "Deploy once per month", "Lead time: 43 days"].map(i => (
                    <li key={i} className="text-xs flex gap-2" style={{ ...serif, color: "#555" }}><span style={{ color: "#dc2626" }}>✗</span>{i}</li>
                  ))}
                </ul>
              </div>
              <div className="p-6 border" style={{ backgroundColor: "#f0fdf4", borderColor: "#86efac", borderLeft: "3px solid #16a34a" }}>
                <p className="text-xs font-mono font-bold mb-3" style={{ color: "#16a34a" }}>After M-03 + M-04</p>
                <ul className="flex flex-col gap-2">
                  {["GitHub Actions triggers on every push", "Tests run automatically in CI", "Bugs caught before staging", "Deploy on every green build", "Lead time: 14 days"].map(i => (
                    <li key={i} className="text-xs flex gap-2" style={{ ...serif, color: "#555" }}><span style={{ color: "#16a34a" }}>✓</span>{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Continuous Delivery — Humble & Farley" body="The definitive book on deployment pipelines. Chapter 5: Anatomy of the Deployment Pipeline." />
              <RefCard title="DevOps Handbook — Part II" body="The Technical Practices of Flow. Chapters 10-12 cover pipeline design, test automation, and deployment architecture." />
              <RefCard title="Accelerate — Forsgren, Humble, Kim" body="The DORA research linking deployment pipeline practices to organizational performance." />
              <RefCard title="The Phoenix Project" body="Parts 2-3: Bill's transformation of the Unicorn deployment process. The pipeline as narrative." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/value-stream-mapping" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Value Stream Mapping</a>
            <a href="/library/environment-parity" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>Environment Parity →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
