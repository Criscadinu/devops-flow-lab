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

function MetricCard({ id, title, desc, elite, high, medium, low, color, bg }: {
  id: string; title: string; desc: string;
  elite: string; high: string; medium: string; low: string;
  color: string; bg: string;
}) {
  return (
    <div className="border border-[#e5e5e5] overflow-hidden">
      <div className="px-5 py-4" style={{ backgroundColor: bg, borderLeft: `3px solid ${color}` }}>
        <p className="text-[10px] font-mono font-bold mb-1" style={{ color }}>{id}</p>
        <p className="text-sm font-bold text-black" style={{ ...syne.style }}>{title}</p>
        <p className="text-xs mt-1.5 leading-relaxed" style={{ ...serif, color: "#555" }}>{desc}</p>
      </div>
      <div className="grid grid-cols-4 divide-x divide-[#f0f0f0]" style={{ backgroundColor: "#ffffff" }}>
        {[
          { label: "Elite",   value: elite,  c: "#16a34a" },
          { label: "High",    value: high,   c: "#0891b2" },
          { label: "Medium",  value: medium, c: "#f59e0b" },
          { label: "Low",     value: low,    c: "#dc2626" },
        ].map(tier => (
          <div key={tier.label} className="px-3 py-2.5 text-center">
            <p className="text-[9px] font-mono font-bold mb-0.5" style={{ color: tier.c }}>{tier.label}</p>
            <p className="text-[10px] font-mono leading-tight" style={{ color: "#333" }}>{tier.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function NexusCorpProgress() {
  const snapshots = [
    { label: "Before M-01",  df: "1×/month",   lt: "43 days",  cfr: "42%",  mttr: "72 hrs",  tier: "LOW",   color: "#dc2626" },
    { label: "After M-03",   df: "1×/month",   lt: "14 days",  cfr: "18%",  mttr: "72 hrs",  tier: "MED",   color: "#f59e0b" },
    { label: "After M-04",   df: "On demand",  lt: "< 1 day",  cfr: "15%",  mttr: "48 hrs",  tier: "HIGH",  color: "#0891b2" },
  ]
  return (
    <div className="border border-[#e5e5e5] overflow-hidden my-4">
      <div className="grid grid-cols-6 px-4 py-2 bg-[#f7f7f5] border-b border-[#e5e5e5]">
        {["Snapshot", "Deploy Freq", "Lead Time", "CFR", "MTTR", "Tier"].map(h => (
          <p key={h} className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wide">{h}</p>
        ))}
      </div>
      {snapshots.map((s, i) => (
        <div key={s.label} className="grid grid-cols-6 px-4 py-3" style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#fafaf8", borderBottom: i < 2 ? "1px solid #f0f0f0" : undefined }}>
          <p className="text-xs font-mono text-gray-700">{s.label}</p>
          <p className="text-xs font-mono text-gray-600">{s.df}</p>
          <p className="text-xs font-mono text-gray-600">{s.lt}</p>
          <p className="text-xs font-mono text-gray-600">{s.cfr}</p>
          <p className="text-xs font-mono text-gray-600">{s.mttr}</p>
          <p className="text-xs font-mono font-bold" style={{ color: s.color }}>{s.tier}</p>
        </div>
      ))}
    </div>
  )
}

export default function DoraMetricsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">Foundations</span>
            <span className="mx-2">→</span><span className="text-gray-700">DORA Metrics</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["F-02", "FOUNDATION"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#faf5ff", color: "#7c3aed", border: "1px solid #e9d5ff" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>DORA Metrics</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>The four measures of software delivery performance. What they measure, what good looks like, and how to use them to improve.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["Accelerate — Forsgren, Humble, Kim", "DORA State of DevOps Research (2019–2023)"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="What is DORA?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>DORA — the DevOps Research and Assessment team — is a research group founded by Dr. Nicole Forsgren, Jez Humble, and Gene Kim. Since 2014 they have published the State of DevOps Report, surveying tens of thousands of professionals annually to understand what separates high-performing software organizations from low performers.</p>
            <p className="text-sm leading-relaxed" style={{ color: "#333" }}>Their key finding: software delivery performance can be measured objectively, and it predicts organizational performance — profitability, market share, and the ability to meet customer goals. Performance is not a soft concept. It is measurable.</p>
            <Callout>DORA's research identified four metrics that together capture the speed and stability of software delivery. They are now widely used as the industry standard for measuring DevOps maturity.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="The four metrics" />
            <div className="flex flex-col gap-5">
              <MetricCard
                id="DF"
                title="Deployment Frequency"
                desc="How often does your organization deploy to production? This measures the throughput of your delivery system — how frequently value reaches users."
                elite="On demand (multiple/day)"
                high="1× per week – 1× per month"
                medium="1× per month – 1× per 6 months"
                low="Less than 1× per 6 months"
                color="#0891b2"
                bg="#f0fdfa"
              />
              <MetricCard
                id="LT"
                title="Lead Time for Changes"
                desc="How long does it take for a commit to reach production? This measures the flow efficiency of your delivery pipeline — how quickly you can respond to business needs."
                elite="Less than 1 hour"
                high="1 day – 1 week"
                medium="1 week – 1 month"
                low="More than 6 months"
                color="#16a34a"
                bg="#f0fdf4"
              />
              <MetricCard
                id="CFR"
                title="Change Failure Rate"
                desc="What percentage of production changes cause a degradation requiring remediation? This measures the quality of your delivery process — how often you introduce problems."
                elite="0–15%"
                high="16–30%"
                medium="16–30%"
                low="46–60%"
                color="#b45309"
                bg="#fffbeb"
              />
              <MetricCard
                id="MTTR"
                title="Mean Time to Restore"
                desc="How long does it take to restore service when an incident occurs? This measures the resilience of your system — how quickly you recover from failure."
                elite="Less than 1 hour"
                high="Less than 1 day"
                medium="1 day – 1 week"
                low="More than 6 months"
                color="#7c3aed"
                bg="#faf5ff"
              />
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="Speed and stability are not a trade-off" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The most counterintuitive finding in DORA's research: teams that deploy more frequently also have lower change failure rates and faster recovery times. Speed and stability are not opposites.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The reason is simple: small, frequent deployments are inherently less risky than large, infrequent ones. When something breaks in a small deployment, the blast radius is contained and the cause is obvious. Stability comes from deploying often, not from deploying rarely.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
              <div className="p-5 border border-[#fca5a5]" style={{ backgroundColor: "#fff5f5" }}>
                <p className="text-xs font-mono font-bold text-[#dc2626] mb-3">Low performer mindset</p>
                <div className="flex flex-col gap-2">
                  {[
                    "Deploy infrequently to reduce risk",
                    "Large batches = more testing before release",
                    "Manual approval gates add safety",
                    "Result: slow, fragile, high-stress releases",
                  ].map(l => (
                    <div key={l} className="flex gap-2 text-xs" style={{ ...serif, color: "#555" }}>
                      <span className="text-[#dc2626] shrink-0">✗</span>{l}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 border border-[#86efac]" style={{ backgroundColor: "#f0fdf4" }}>
                <p className="text-xs font-mono font-bold text-[#16a34a] mb-3">Elite performer mindset</p>
                <div className="flex flex-col gap-2">
                  {[
                    "Deploy frequently to reduce risk per change",
                    "Small batches = easy to test and verify",
                    "Automated gates are faster and more reliable",
                    "Result: fast, stable, routine deployments",
                  ].map(l => (
                    <div key={l} className="flex gap-2 text-xs" style={{ ...serif, color: "#555" }}>
                      <span className="text-[#16a34a] shrink-0">✓</span>{l}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="How to use the metrics" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The DORA metrics are most useful as diagnostics, not as targets. Goodhart's Law applies: when a measure becomes a target, it ceases to be a good measure. A team that game their DF metric by deploying trivial changes has not improved their delivery system.</p>
            <div className="flex flex-col gap-4">
              {[
                { title: "Use them to identify your constraint",  body: "Low DF with high LT? Your bottleneck is the pipeline. High CFR with slow MTTR? Your bottleneck is testing and observability. The metrics point to where to focus improvement effort." },
                { title: "Measure trends, not absolutes",         body: "Is your lead time improving quarter over quarter? Is your CFR declining? Trends reveal whether your improvements are working. A snapshot tells you where you are; a trend tells you if you are moving." },
                { title: "Compare to your past self",            body: "DORA benchmarks are useful for orientation, but comparison to your own historical performance is more actionable. You know your context; benchmark data abstracts it away." },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: "#7c3aed" }} />
                  <div>
                    <p className="text-sm font-bold text-black mb-1" style={{ ...syne.style }}>{item.title}</p>
                    <p className="text-sm leading-relaxed" style={{ ...serif, color: "#555" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="05" title="Nexus Corp's DORA progression" />
            <p className="text-sm leading-relaxed mb-3" style={{ color: "#333" }}>The Nexus Corp missions are designed to move the organization from low performer to high performer across all four metrics. Here is the progression:</p>
            <NexusCorpProgress />
            <p className="text-sm leading-relaxed mt-3" style={{ color: "#333" }}>The path from low to high performer is not about adopting tools. It is about changing the system: shortening feedback loops, automating manual steps, reducing batch sizes, and building quality in rather than inspecting it in at the end.</p>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Accelerate — Forsgren, Humble, Kim" body="The book-length treatment of the DORA research. Chapters 2–4: the four key metrics, how to measure them, and what drives them." />
              <RefCard title="DORA State of DevOps 2023" body="The most recent annual report. Benchmarks, trends, and the latest findings on what predicts software delivery performance." />
              <RefCard title="DevOps Handbook — Part II" body="The technical practices that move the metrics. Chapters 10-14 map directly to the four DORA metrics." />
              <RefCard title="DORA Quick Check" body="The official DORA assessment tool. Benchmarks your team against the research data across all four metrics." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/the-three-ways" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← The Three Ways</a>
            <a href="/library/five-ideals" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>The Five Ideals →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
