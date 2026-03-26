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

function USEMethod() {
  const rows = [
    { resource: "CPU",           util: "% time busy",           sat: "run queue length",      err: "hardware errors" },
    { resource: "Memory",        util: "% in use",              sat: "swap usage, OOM events", err: "parity / ECC errors" },
    { resource: "Network",       util: "% bandwidth used",      sat: "packet queue depth",     err: "dropped packets" },
    { resource: "Disk I/O",      util: "% time servicing I/O",  sat: "queue length",           err: "read/write errors" },
    { resource: "DB connections",util: "% pool in use",         sat: "queue waiting for conn", err: "connection timeouts" },
  ]
  return (
    <div className="border border-[#e5e5e5] overflow-hidden my-4">
      <div className="grid grid-cols-4 px-4 py-2 bg-[#f7f7f5] border-b border-[#e5e5e5]">
        {["Resource", "Utilization", "Saturation", "Errors"].map(h => (
          <p key={h} className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wide">{h}</p>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={r.resource} className="grid grid-cols-4 px-4 py-2.5" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < rows.length - 1 ? "1px solid #f0f0f0" : undefined }}>
          <p className="text-xs font-mono font-bold" style={{ color: "#7c3aed" }}>{r.resource}</p>
          <p className="text-xs font-mono text-gray-600">{r.util}</p>
          <p className="text-xs font-mono text-gray-600">{r.sat}</p>
          <p className="text-xs font-mono text-gray-600">{r.err}</p>
        </div>
      ))}
    </div>
  )
}

function AlertPrinciples() {
  return (
    <div className="flex flex-col gap-3 my-4">
      {[
        { rule: "Alert on symptoms, not causes",   good: "Error rate > 1% for 5 minutes",              bad: "DB query p99 > 500ms",             why: "Users experience symptoms. Causes are for investigation, not alerting." },
        { rule: "Every alert requires action",     good: "Alert fires → runbook exists → on-call acts", bad: "Alert fires → team ignores it",     why: "An alert with no action is noise. Noise trains people to ignore alerts." },
        { rule: "Set thresholds on percentiles",   good: "p99 latency > 2s",                            bad: "Average latency > 500ms",           why: "Averages hide tail latency. Your slowest 1% of users matter." },
        { rule: "Use multi-window alerts",         good: "Error rate elevated for 5+ of last 10 min",   bad: "Any single spike triggers page",    why: "Transient spikes cause alert fatigue. Sustained problems require response." },
      ].map(item => (
        <div key={item.rule} className="border border-[#e5e5e5] overflow-hidden">
          <div className="px-4 py-2 border-b border-[#f0f0f0]" style={{ backgroundColor: "#faf5ff" }}>
            <p className="text-xs font-mono font-bold" style={{ color: "#7c3aed" }}>{item.rule}</p>
          </div>
          <div className="grid grid-cols-2 divide-x divide-[#f0f0f0]">
            <div className="px-4 py-2.5" style={{ backgroundColor: "#f0fdf4" }}>
              <p className="text-[10px] font-mono font-bold text-[#16a34a] mb-1">✓ Do this</p>
              <p className="text-xs font-mono text-gray-600">{item.good}</p>
            </div>
            <div className="px-4 py-2.5" style={{ backgroundColor: "#fff5f5" }}>
              <p className="text-[10px] font-mono font-bold text-[#dc2626] mb-1">✗ Not this</p>
              <p className="text-xs font-mono text-gray-600">{item.bad}</p>
            </div>
          </div>
          <div className="px-4 py-2" style={{ backgroundColor: "#fafaf8" }}>
            <p className="text-[10px]" style={{ ...serif, color: "#777" }}>{item.why}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function MonitoringAndAlertingPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#7c3aed] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">Second Way: Feedback</span>
            <span className="mx-2">→</span><span className="text-gray-700">Monitoring and Alerting</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FB-02", "TOOL", "Second Way: Feedback"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#faf5ff", color: "#7c3aed", border: "1px solid #e9d5ff" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Monitoring and Alerting</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Know before your users do. What to monitor, how to alert without crying wolf, and how to build an on-call culture that does not burn people out.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Google SRE Book", "Site Reliability Engineering"].map(s => (
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
          <p className="text-xs mt-3" style={{ ...serif, color: "#888" }}>In this video: the USE method, how to write alerts that fire on symptoms not causes, and what a good on-call rotation looks like.</p>
        </div>
      </div>

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="Monitoring vs observability" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Monitoring means checking known failure conditions — watching dashboards and thresholds you defined in advance. Observability means understanding system behavior, including failures you did not anticipate. Monitoring tells you something is wrong. Observability helps you understand why.</p>
            <p className="text-sm leading-relaxed" style={{ color: "#333" }}>Both are necessary. The goal of monitoring is to surface symptoms fast enough that the on-call engineer is notified before users are meaningfully impacted. The goal of observability is to make root cause analysis tractable once you are investigating an incident.</p>
            <Callout>A well-monitored system has no surprises — alerts fire before users notice. An observable system has no mysteries — engineers can always answer "what is happening and why?"</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="What to monitor: the USE method" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Brendan Gregg's USE method provides a systematic approach for identifying performance bottlenecks. For every resource in your system, measure three things: <strong>Utilization</strong> (how busy is it?), <strong>Saturation</strong> (is it overloaded?), and <strong>Errors</strong> (is it failing?).</p>
            <USEMethod />
            <p className="text-sm leading-relaxed mt-3" style={{ color: "#333" }}>The USE method is most useful for infrastructure resources. For user-facing services, pair it with the four golden signals (latency, traffic, errors, saturation) to get a complete picture.</p>
          </section>

          <section>
            <SectionLabel num="03" title="Alerting principles" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Alert fatigue is the failure mode of monitoring. When alerts fire too often, on-call engineers begin to ignore them — and when a real incident occurs, it gets missed. Good alerts are rare, actionable, and unambiguous.</p>
            <AlertPrinciples />
          </section>

          <section>
            <SectionLabel num="04" title="On-call culture" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>On-call is not a punishment. It is a responsibility distributed across a team. Good on-call culture has three properties: sustainability (engineers are not burned out), effectiveness (incidents are resolved quickly), and learning (every incident improves the system).</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Escalation paths",   color: "#7c3aed", bg: "#faf5ff", desc: "Every alert has a clear owner and an escalation path. If the first responder cannot resolve within 30 minutes, they know exactly who to call." },
                { title: "Runbooks",           color: "#0891b2", bg: "#f0fdfa", desc: "Documented step-by-step procedures for common incident types. The on-call engineer should not be improvising at 2am. Runbooks encode institutional knowledge." },
                { title: "Handoffs",           color: "#16a34a", bg: "#f0fdf4", desc: "Rotation schedules, handoff summaries, and explicit transfer of context. On-call is not a marathon — it is a relay." },
              ].map(item => (
                <div key={item.title} className="p-5 border" style={{ backgroundColor: item.bg, borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1.5" style={{ color: item.color }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <Callout accent="#dc2626">If on-call engineers are being paged more than 2–3 times per shift, the alert thresholds are wrong or the system has an unresolved reliability problem. Either way, it must be fixed — not tolerated.</Callout>
          </section>

          <section>
            <SectionLabel num="05" title="Dashboards and visualization" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A good dashboard answers specific questions at a glance. The most common mistake is building a dashboard that displays everything — which means it communicates nothing. Good dashboards have a clear audience and a clear purpose.</p>
            <div className="flex flex-col gap-3">
              {[
                { type: "Service health dashboard",  audience: "On-call engineer",    shows: "Four golden signals for the service. Red/green. Single page. Actionable at a glance." },
                { type: "Business metrics dashboard",audience: "Product + leadership", shows: "Conversion rate, revenue, user counts. Business impact of technical decisions visible." },
                { type: "Capacity planning dashboard",audience: "Platform team",       shows: "Resource trends over weeks/months. Saturation curves. When do we need to scale?" },
              ].map((row, i) => (
                <div key={row.type} className="grid grid-cols-12 border border-[#e5e5e5] overflow-hidden">
                  <div className="col-span-4 px-4 py-3 flex items-center" style={{ backgroundColor: "#faf5ff", borderRight: "1px solid #e5e5e5" }}>
                    <div>
                      <p className="text-xs font-mono font-bold" style={{ color: "#7c3aed" }}>{row.type}</p>
                      <p className="text-[10px] font-mono text-gray-400 mt-0.5">For: {row.audience}</p>
                    </div>
                  </div>
                  <div className="col-span-8 px-4 py-3" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8" }}>
                    <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{row.shows}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Google SRE Book — Chapter 6" body="Monitoring Distributed Systems. The canonical reference for alert design, dashboard principles, and on-call culture." />
              <RefCard title="DevOps Handbook — Chapter 23" body="Create Proactive Telemetry to Enable Rapid Detection and Recovery. Linking monitoring to incident response." />
              <RefCard title="The Art of Monitoring — Turnbull" body="Practical guide to building monitoring infrastructure. Metrics, logging, alerting, and visualization end to end." />
              <RefCard title="Brendan Gregg — USE Method" body="brendangregg.com/usemethod.html. The full USE method reference including resource-specific checklists." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/telemetry-and-observability" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Telemetry and Observability</a>
            <a href="/library/feature-flags" className="text-sm font-mono font-bold hover:underline" style={{ color: "#7c3aed" }}>Feature Flags →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
