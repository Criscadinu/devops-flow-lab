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

function CDvsCIPipeline() {
  const stages = [
    { label: "CI",    sub: "build + test",       color: "#0891b2", bg: "#f0fdfa" },
    { label: "CD",    sub: "deploy staging",      color: "#16a34a", bg: "#f0fdf4" },
    { label: "CD",    sub: "deploy production",   color: "#16a34a", bg: "#f0fdf4" },
  ]
  return (
    <div className="my-6 p-6 border border-[#e5e5e5] overflow-x-auto" style={{ backgroundColor: "#f7f7f5" }}>
      <div className="flex items-center min-w-max gap-2">
        <div className="flex flex-col items-center gap-1">
          <div className="px-4 py-2.5 border-2 text-center" style={{ backgroundColor: "#fff", borderColor: "#6b7280", minWidth: "90px" }}>
            <p className="text-xs font-mono font-bold text-gray-500">Commit</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-px bg-gray-300" />
          <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "5px solid #d1d5db" }} />
        </div>
        {stages.map((s, i) => (
          <div key={`${s.label}-${i}`} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div className="px-4 py-2.5 border-2 text-center" style={{ backgroundColor: s.bg, borderColor: s.color, minWidth: "110px" }}>
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
      <p className="text-xs font-mono text-gray-400 mt-4">CI stops at a verified artifact. CD takes that artifact all the way to production — automatically.</p>
    </div>
  )
}

function DeploymentStrategies() {
  const strategies = [
    {
      title: "Rolling deploy",
      color: "#0891b2",
      bg: "#f0fdfa",
      desc: "New version replaces instances one at a time. Old and new versions run simultaneously during the transition. Simple, low overhead.",
      risk: "Low",
    },
    {
      title: "Blue-green deploy",
      color: "#16a34a",
      bg: "#f0fdf4",
      desc: "Two identical environments. Blue runs production. Green gets the new version. Switch traffic instantly. Rollback by switching back.",
      risk: "Very low",
    },
    {
      title: "Canary release",
      color: "#b45309",
      bg: "#fffbeb",
      desc: "Route 1–5% of traffic to the new version. Monitor for errors. Gradually increase to 100% if metrics look good. Catch issues before full rollout.",
      risk: "Very low",
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      {strategies.map(s => (
        <div key={s.title} className="p-5 border" style={{ backgroundColor: s.bg, borderLeft: `3px solid ${s.color}`, borderColor: `${s.color}25` }}>
          <p className="text-xs font-mono font-bold mb-1.5" style={{ color: s.color }}>{s.title}</p>
          <p className="text-xs leading-relaxed mb-3" style={{ ...serif, color: "#333" }}>{s.desc}</p>
          <p className="text-[10px] font-mono" style={{ color: s.color }}>Rollback risk: {s.risk}</p>
        </div>
      ))}
    </div>
  )
}

export default function ContinuousDeploymentPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">First Way: Flow</span>
            <span className="mx-2">→</span><span className="text-gray-500">Tools &amp; Techniques</span>
            <span className="mx-2">→</span><span className="text-gray-700">Continuous Deployment</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FT-06", "TOOL", "First Way: Flow"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Continuous Deployment</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Every green build ships to production automatically. What makes that safe, how deployment strategies reduce risk, and why deployment frequency is a measure of team health.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Accelerate — Forsgren, Humble, Kim", "DORA Research"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="CI vs. CD" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Continuous Integration (CI) is the practice of automatically building and testing every commit. Continuous Deployment (CD) extends this: every build that passes tests is automatically deployed to production. No human approval step. No scheduled release window. No deployment meeting.</p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#333" }}>The distinction matters. Many teams practice CI but not CD — they automate the tests but still deploy manually. This leaves the most error-prone and stressful step — the actual release — as a manual, human-dependent process.</p>
            <CDvsCIPipeline />
            <Callout accent="#16a34a">Continuous Delivery (with a capital D) means every build is <em>releasable</em> at any time — deployment is a business decision. Continuous Deployment means every passing build <em>is</em> released — the decision is automated. Both are better than manual.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="Why automate deployment?" />
            <div className="flex flex-col gap-4">
              {[
                { title: "Manual deployments are unreliable",   body: "Every manual step is a place where humans can forget, skip, or do something different. Automated deployments run the same commands every time, in the same order, with the same configuration." },
                { title: "Small deployments are safe deployments", body: "When you deploy once a month, each release contains hundreds of changes. When something breaks, you debug hundreds of candidates. When you deploy ten times a day, each release contains one or two changes. The blast radius is a line of code." },
                { title: "Fear of deployment is a smell",       body: "Teams that fear deployments make them rarer. Rarer deployments mean bigger batches. Bigger batches mean more risk. More risk means more fear. This is the deployment death spiral. Continuous deployment breaks the cycle." },
                { title: "Deployment frequency predicts performance", body: "DORA research across 33,000 professionals shows that high-performing teams deploy 973× more frequently than low performers. Frequency is not a vanity metric — it reflects pipeline maturity, team trust, and technical quality." },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: "#0891b2" }} />
                  <div>
                    <p className="text-sm font-bold text-black mb-1" style={{ ...syne.style }}>{item.title}</p>
                    <p className="text-sm leading-relaxed" style={{ ...serif, color: "#555" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="Deployment strategies" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Automated deployment does not mean reckless deployment. Deployment strategies control how the new version reaches users — giving you the ability to detect problems early and roll back instantly.</p>
            <DeploymentStrategies />
            <p className="text-sm leading-relaxed mt-2" style={{ color: "#333" }}>The strategy you choose depends on your infrastructure. A simple platform-as-a-service like Render uses rolling deploys by default. A more complex infrastructure might use canary releases with feature flags to control exposure.</p>
          </section>

          <section>
            <SectionLabel num="04" title="The safety net: what makes CD safe" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Continuous deployment is only safe when underpinned by a set of enabling practices. Without these, automated deployment is just automated risk.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Fast rollback",            desc: "If you can deploy in 5 minutes, you can roll back in 5 minutes. Rollback must be as automated as deployment.", color: "#0891b2", bg: "#f0fdfa" },
                { title: "Comprehensive test suite", desc: "CD without tests is not CD — it is continuous breakage. The test suite is the gatekeeper. Every deployed commit must pass all tests.", color: "#16a34a", bg: "#f0fdf4" },
                { title: "Feature flags",            desc: "Deploy code that is not yet user-visible. Separate deploy from release. Roll back a feature by toggling a flag, not by reverting a commit.", color: "#b45309", bg: "#fffbeb" },
                { title: "Observability",            desc: "You must know within minutes if a deployment caused a problem. Metrics, logs, and alerts are not optional when deploying continuously.", color: "#7c3aed", bg: "#faf5ff" },
              ].map(item => (
                <div key={item.title} className="p-5 border" style={{ backgroundColor: item.bg, borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1.5" style={{ color: item.color }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="05" title="The Nexus Corp deployment" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>In Mission 04, you connected Nexus Corp's GitHub repository to Render's auto-deploy feature. Every push to main that passes the GitHub Actions CI pipeline triggers an automatic production deployment on Render.</p>
            <div className="border border-[#e5e5e5] overflow-hidden">
              {[
                { step: "1", action: "Push to main",              result: "GitHub Actions CI pipeline triggers" },
                { step: "2", action: "Tests run (npm test)",       result: "Pass or fail within 2 minutes" },
                { step: "3", action: "Build succeeds",             result: "Render detects new commit via webhook" },
                { step: "4", action: "Render deploys",             result: "New version live in ~90 seconds" },
              ].map((r, i) => (
                <div key={r.step} className="grid grid-cols-12 px-4 py-3 gap-4" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < 3 ? "1px solid #f0f0f0" : "none" }}>
                  <span className="col-span-1 text-xs font-mono font-bold text-[#0891b2]">{r.step}</span>
                  <span className="col-span-5 text-xs font-mono text-gray-700">{r.action}</span>
                  <span className="col-span-6 text-xs" style={{ ...serif, color: "#555" }}>{r.result}</span>
                </div>
              ))}
            </div>
            <Callout accent="#16a34a">Before M-04: lead time of 43 days. After M-04: every commit to main is in production within minutes. The feedback loop that took weeks now takes the length of a coffee break.</Callout>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Accelerate — Forsgren, Humble, Kim" body="The DORA research. Chapter 2: Measuring Performance. Deployment frequency as a key metric of software delivery performance." />
              <RefCard title="DevOps Handbook — Chapter 11" body="Enable and Practice Continuous Testing. How test automation enables deployment automation." />
              <RefCard title="Continuous Delivery — Humble & Farley" body="Chapter 10: Deploying and Releasing Applications. The complete treatment of deployment strategies and rollback." />
              <RefCard title="DORA State of DevOps 2023" body="The annual report. Elite performers: deploy on demand, multiple times per day. Measurement methodology and benchmarks." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/continuous-integration" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Continuous Integration</a>
            <a href="/library/the-three-ways" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>The Three Ways →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
