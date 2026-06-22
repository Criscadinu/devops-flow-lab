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

export default function ABTestingPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#7c3aed] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">Second Way: Feedback</span>
            <span className="mx-2">→</span><span className="text-gray-700">A/B Testing</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FB-04", "TOOL", "Second Way: Feedback"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#faf5ff", color: "#7c3aed", border: "1px solid #e9d5ff" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>A/B Testing</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Let data decide. How to form a testable hypothesis, run a controlled experiment in production, and avoid the most common statistical traps.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["Lean Startup", "DevOps Handbook"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="What is A/B testing?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>An A/B test is a controlled experiment where two versions of a feature are shown to different groups of users simultaneously, and a metric is measured to determine which version performs better. Version A is the control (existing behavior). Version B is the treatment (new behavior).</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A/B testing is the production implementation of hypothesis-driven development: you form a hypothesis about user behavior, build the smallest test that could prove or disprove it, and let the data decide — not intuition, seniority, or design opinion.</p>
            <Callout>Eric Ries, in <em>The Lean Startup</em>, calls this validated learning. The goal of every product decision is to generate validated knowledge about what users actually want — not what we think they want.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="How to run an A/B test" />
            <div className="flex flex-col gap-4">
              {[
                { n: "1", title: "Form a falsifiable hypothesis",  body: "\"We believe that changing the checkout button from 'Complete Order' to 'Buy Now' will increase checkout completion rate by 5% for users who reach the payment page.\" Specific. Measurable. Falsifiable." },
                { n: "2", title: "Choose a single primary metric",  body: "One metric per test. If you measure 20 metrics and declare victory on whichever one improves, you will find a false positive every time. The metric must be chosen before the test runs." },
                { n: "3", title: "Calculate the required sample size", body: "Use a power analysis to determine how many users you need to detect the effect size you care about at your desired confidence level. Small effects need large samples. Do this before you start." },
                { n: "4", title: "Run for the required duration",   body: "Do not stop early when you see a promising result. Run until you have the predetermined sample size. Stopping early dramatically increases false positive rates." },
                { n: "5", title: "Analyze and decide",             body: "If the result is statistically significant at your threshold (typically p < 0.05) and the effect size is practically meaningful, ship the winner. Otherwise, the null hypothesis stands." },
              ].map(item => (
                <div key={item.n} className="flex gap-5 p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <span className="text-3xl font-mono font-bold shrink-0 leading-none" style={{ fontFamily: "var(--font-heading)", color: "#f0f0f0" }}>{item.n}</span>
                  <div>
                    <p className="text-sm font-bold text-black mb-1" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</p>
                    <p className="text-sm leading-relaxed" style={{ ...serif, color: "#555" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="Statistical significance" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Statistical significance answers the question: how likely is this result to have occurred by chance? A p-value of 0.05 means there is a 5% chance of seeing this result even if the treatment has no effect. This is a threshold for decision-making, not a measure of importance.</p>
            <div className="flex flex-col gap-3">
              {[
                { trap: "Peeking",           desc: "Checking results before the test is complete and stopping when you see what you want. Increases false positive rate from 5% to over 30% at p < 0.05.", fix: "Pre-register your sample size. Do not look at results until you have it." },
                { trap: "Multiple metrics",  desc: "If you test 20 metrics at p < 0.05, one will appear significant by chance. This is the multiple comparisons problem.", fix: "One primary metric. Secondary metrics are exploratory, not conclusive." },
                { trap: "Novelty effect",    desc: "Users engage with anything new. Short tests capture novelty, not sustained behavior change. A week-long test may show a positive that disappears after day 3.", fix: "Run tests long enough to see post-novelty behavior. At minimum, one full week." },
                { trap: "Segment isolation", desc: "Users who see both variants — due to cookie clearing, device switching, or VPN — corrupt the experiment.", fix: "Assign variants by stable user ID, not cookie. Exclude users with variant exposure contamination." },
              ].map(item => (
                <div key={item.trap} className="border border-[#e5e5e5] overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-[#f0f0f0]" style={{ backgroundColor: "#fff5f5" }}>
                    <p className="text-xs font-mono font-bold text-[#dc2626]">Trap: {item.trap}</p>
                    <p className="text-xs leading-relaxed mt-1" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                  </div>
                  <div className="px-4 py-2" style={{ backgroundColor: "#f0fdf4" }}>
                    <p className="text-[10px] font-mono font-bold text-[#16a34a] mb-0.5">Fix</p>
                    <p className="text-xs" style={{ ...serif, color: "#555" }}>{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="A/B testing in production" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A/B testing at the infrastructure level is implemented using feature flags. Traffic is split by user segment — typically a percentage of users assigned to each variant at login or session creation. The flag system routes each user to their assigned variant consistently.</p>
            <div className="p-4 border border-[#e5e5e5] font-mono text-xs" style={{ backgroundColor: "#f7f7f5" }}>
              <p className="text-gray-400 mb-2">{"// Variant assignment — consistent per user"}</p>
              <p className="text-gray-700">{"const variant = experiment.getVariant('checkout_button', userId);"}</p>
              <p className="text-gray-700 mt-1">{"// variant === 'control' | 'treatment'"}</p>
              <p className="text-gray-700 mt-2">{"if (variant === 'treatment') {"}</p>
              <p className="text-gray-700 ml-4">{"analytics.track('checkout_button_seen', { variant: 'buy_now' });"}</p>
              <p className="text-gray-700 ml-4">{"return <button>Buy Now</button>"}</p>
              <p className="text-gray-700">{"}"}</p>
              <p className="text-gray-700">{"return <button>Complete Order</button>"}</p>
            </div>
            <p className="text-sm leading-relaxed mt-4" style={{ color: "#333" }}>The experiment platform records every exposure and conversion event, calculates statistical significance continuously, and surfaces results in a dashboard. Engineers ship the winning variant by updating the flag default and eventually removing the flag.</p>
          </section>

          <section>
            <SectionLabel num="05" title="Beyond A/B" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Multivariate testing",  color: "#7c3aed", bg: "#faf5ff", desc: "Test multiple variables simultaneously — button color AND button text AND page layout. More efficient than sequential A/B tests, but requires much larger sample sizes. Use sparingly." },
                { title: "Bandit algorithms",      color: "#0891b2", bg: "#f0fdfa", desc: "Adaptive experiments that dynamically shift traffic toward the winning variant as data accumulates. Minimize regret (lost conversions during the test). Best for short-horizon decisions with clear metrics." },
                { title: "Holdout groups",         color: "#16a34a", bg: "#f0fdf4", desc: "A permanently held-out group of users who never see new features. Enables long-term measurement of the cumulative effect of all product changes over months. Expensive but illuminating." },
                { title: "Interleaving",           color: "#b45309", bg: "#fffbeb", desc: "Used in ranking systems: show results from both algorithms in a single interleaved list, detect preference from which results users click. Dramatically more sensitive than standard A/B for ranking problems." },
              ].map(item => (
                <div key={item.title} className="p-5 border" style={{ backgroundColor: item.bg, borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1.5" style={{ color: item.color }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Trustworthy Online Controlled Experiments — Kohavi et al." body="The definitive book on A/B testing at scale. Every trap described in this article is covered with case studies from Microsoft, LinkedIn, and Airbnb." />
              <RefCard title="The Lean Startup — Eric Ries" body="The origin of hypothesis-driven development. Chapter 7: Measure. The build-measure-learn feedback loop as organizational practice." />
              <RefCard title="DevOps Handbook — Chapter 22" body="Create Telemetry to Enable Seeing and Solving Problems. A/B testing as part of the production feedback infrastructure." />
              <RefCard title="Evan Miller — A/B Testing Statistics" body="evanmiller.org. Clear explanations of statistical concepts for engineers. The sequential testing and sample size calculators are used industry-wide." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/feature-flags" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Feature Flags</a>
            <a href="/library/incident-review" className="text-sm font-mono font-bold hover:underline" style={{ color: "#7c3aed" }}>Incident Review →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
