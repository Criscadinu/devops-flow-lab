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

function ThreePillars() {
  const pillars = [
    {
      title: "Metrics",
      color: "#7c3aed",
      bg: "#faf5ff",
      desc: "Numeric measurements over time. CPU usage, request rate, error count. Aggregatable and efficient to store.",
      examples: ["Request rate: 2,400 req/s", "Error rate: 0.3%", "p99 latency: 240ms", "CPU utilization: 67%"],
    },
    {
      title: "Logs",
      color: "#0891b2",
      bg: "#f0fdfa",
      desc: "Timestamped records of discrete events. Verbose and queryable. Best for debugging specific incidents.",
      examples: ["2024-01-15 14:23:01 ERROR db connection timeout", "Payment failed: card declined", "User 4821 logged in"],
    },
    {
      title: "Traces",
      color: "#16a34a",
      bg: "#f0fdf4",
      desc: "Records of a single request's journey across services. Reveals latency attribution and dependency failures.",
      examples: ["API → Auth (12ms) → DB (180ms) → Cache (2ms)", "Total: 194ms — bottleneck: DB query"],
    },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-[#e5e5e5] overflow-hidden my-6">
      {pillars.map((p, i) => (
        <div key={p.title} className="p-5" style={{ backgroundColor: p.bg, borderRight: i < 2 ? "1px solid #e5e5e5" : undefined }}>
          <p className="text-xs font-mono font-bold mb-2" style={{ color: p.color }}>{p.title}</p>
          <p className="text-xs leading-relaxed mb-4" style={{ ...serif, color: "#333" }}>{p.desc}</p>
          <div className="flex flex-col gap-1">
            {p.examples.map(ex => (
              <p key={ex} className="text-[10px] font-mono" style={{ color: p.color }}>{ex}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function GoldenSignals() {
  const signals = [
    { signal: "Latency",    color: "#7c3aed", desc: "How long does it take to serve a request? Distinguish successful request latency from error latency — slow errors mask performance.", example: "p50: 45ms / p99: 240ms / p999: 1.2s" },
    { signal: "Traffic",    color: "#0891b2", desc: "How much demand is the system receiving? The load the system is under. Used to normalize other signals and detect anomalies.", example: "2,400 requests/second; 18GB/hr data ingestion" },
    { signal: "Errors",     color: "#dc2626", desc: "What rate of requests fail? Explicit failures (500s) and implicit failures (wrong content, degraded responses). Both matter.", example: "0.3% HTTP 5xx rate; 2.1% checkout timeout rate" },
    { signal: "Saturation", color: "#b45309", desc: "How full is the service? The most constrained resource — CPU, memory, disk, queue depth. Predict saturation before it causes failure.", example: "DB connection pool: 87% utilized; disk: 72% full" },
  ]
  return (
    <div className="flex flex-col gap-3 my-4">
      {signals.map(s => (
        <div key={s.signal} className="grid grid-cols-12 border border-[#e5e5e5] overflow-hidden">
          <div className="col-span-2 flex items-center justify-center p-4" style={{ backgroundColor: `${s.color}10`, borderRight: `3px solid ${s.color}` }}>
            <p className="text-xs font-mono font-bold text-center" style={{ color: s.color }}>{s.signal}</p>
          </div>
          <div className="col-span-7 px-4 py-3" style={{ backgroundColor: "#ffffff" }}>
            <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{s.desc}</p>
          </div>
          <div className="col-span-3 px-3 py-3" style={{ backgroundColor: "#fafaf8" }}>
            <p className="text-[10px] font-mono leading-relaxed" style={{ color: s.color }}>{s.example}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TelemetryAndObservabilityPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#7c3aed] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">Second Way: Feedback</span>
            <span className="mx-2">→</span><span className="text-gray-700">Telemetry and Observability</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FB-01", "CONCEPT", "Second Way: Feedback"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#faf5ff", color: "#7c3aed", border: "1px solid #e9d5ff" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Telemetry and Observability</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>You cannot improve what you cannot see. The three pillars of telemetry, the four golden signals, and how to instrument your application to know what is happening in production.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Google SRE Book"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="What is telemetry?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Telemetry is the collection of data from a running system — automatically, in real time, at scale. It is how a production system communicates its internal state to the humans and tools responsible for it. Without telemetry, production is a black box.</p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#333" }}>The three pillars of observability — metrics, logs, and traces — provide complementary views of system behavior:</p>
            <ThreePillars />
            <Callout>Observability is not the same as having telemetry. Observability means you can ask arbitrary questions about your system's behavior and get answers — even for failure modes you did not anticipate. Telemetry is the prerequisite.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="Observability vs monitoring" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Monitoring is reactive: you define known failure modes in advance and set alerts to detect them. Observability is proactive: you instrument your system so thoroughly that you can explore its behavior to understand failures you did not anticipate.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 border" style={{ backgroundColor: "#fff5f5", borderLeft: "3px solid #dc2626", borderColor: "#dc262625" }}>
                <p className="text-xs font-mono font-bold text-[#dc2626] mb-3">Monitoring (reactive)</p>
                <div className="flex flex-col gap-2">
                  {["Checks known failure conditions", "Alert fires when threshold crossed", "You must anticipate every failure mode", "\"Is the system up?\""].map(l => (
                    <p key={l} className="text-xs" style={{ ...serif, color: "#555" }}>· {l}</p>
                  ))}
                </div>
              </div>
              <div className="p-5 border" style={{ backgroundColor: "#faf5ff", borderLeft: "3px solid #7c3aed", borderColor: "#7c3aed25" }}>
                <p className="text-xs font-mono font-bold text-[#7c3aed] mb-3">Observability (proactive)</p>
                <div className="flex flex-col gap-2">
                  {["Explores unknown failure patterns", "Ask questions of rich telemetry data", "Handles failures you did not predict", "\"Why is the system behaving this way?\""].map(l => (
                    <p key={l} className="text-xs" style={{ ...serif, color: "#555" }}>· {l}</p>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mt-4" style={{ color: "#333" }}>In practice, you need both. Monitoring catches the known problems fast. Observability lets you investigate the unknown ones. The goal is to make production legible — not just alarmed.</p>
          </section>

          <section>
            <SectionLabel num="03" title="The four golden signals" />
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#333" }}>Google's Site Reliability Engineering book identifies four signals that together characterize the health of any service. If you can only instrument four things, these are the four:</p>
            <GoldenSignals />
            <p className="text-sm leading-relaxed mt-3" style={{ color: "#333" }}>These signals work together. High latency with normal traffic suggests a slow query or upstream dependency. High error rate with normal latency suggests a logic bug. High saturation predicts future problems before they become user-visible failures.</p>
          </section>

          <section>
            <SectionLabel num="04" title="Instrumentation" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Instrumentation is the act of adding telemetry to your application code. There are two approaches:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[
                { title: "Automatic instrumentation", color: "#16a34a", bg: "#f0fdf4", desc: "Libraries and agents that inject telemetry into common frameworks automatically. Zero code changes for standard metrics: HTTP handlers, database calls, external requests. Start here." },
                { title: "Custom instrumentation",    color: "#7c3aed", bg: "#faf5ff", desc: "Application-specific metrics and traces added by the developer. Essential for business metrics: checkout completion rate, payment success, user-facing error rates. Automatic instrumentation cannot see these." },
              ].map(item => (
                <div key={item.title} className="p-5 border" style={{ backgroundColor: item.bg, borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1.5" style={{ color: item.color }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border border-[#e5e5e5] font-mono text-xs" style={{ backgroundColor: "#f7f7f5" }}>
              <p className="text-gray-400 mb-2">{"// Custom instrumentation — Node.js example"}</p>
              <p className="text-gray-700">{"const checkoutCounter = meter.createCounter('checkout_attempts');"}</p>
              <p className="text-gray-700">{"const paymentDuration = meter.createHistogram('payment_duration_ms');"}</p>
              <p className="text-gray-700 mt-2">{"// In the checkout handler:"}</p>
              <p className="text-gray-700">{"checkoutCounter.add(1, { status: 'initiated' });"}</p>
              <p className="text-gray-700">{"paymentDuration.record(elapsed, { provider: 'stripe' });"}</p>
            </div>
          </section>

          <section>
            <SectionLabel num="05" title="Telemetry at Nexus Corp" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>After Mission 04, Nexus Corp has automated deployments — but no visibility into what happens after deploy. The next step is instrumentation: making the production system legible. What does Nexus Corp need to measure?</p>
            <div className="border border-[#e5e5e5] overflow-hidden">
              {[
                { signal: "Latency",    metric: "p50, p95, p99 API response time",              why: "Catch slow endpoints before users complain" },
                { signal: "Traffic",    metric: "Requests per second, active users",              why: "Normalize other signals; detect traffic spikes" },
                { signal: "Errors",     metric: "HTTP 5xx rate, payment failure rate",            why: "The most direct signal of user-facing problems" },
                { signal: "Saturation", metric: "DB connection pool usage, memory utilization",   why: "Predict capacity problems before they cause failures" },
              ].map((r, i) => (
                <div key={r.signal} className="grid grid-cols-12 px-4 py-3 gap-2" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < 3 ? "1px solid #f0f0f0" : undefined }}>
                  <p className="col-span-2 text-xs font-mono font-bold" style={{ color: "#7c3aed" }}>{r.signal}</p>
                  <p className="col-span-5 text-xs font-mono text-gray-600">{r.metric}</p>
                  <p className="col-span-5 text-xs" style={{ ...serif, color: "#555" }}>{r.why}</p>
                </div>
              ))}
            </div>
            <Callout accent="#7c3aed">Deploying without observability is driving blind at night. The deployment pipeline gives you confidence that the code is correct at test time. Telemetry gives you confidence that it is correct at runtime — in production, under real load, with real users.</Callout>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Google SRE Book — Chapter 6" body="Monitoring Distributed Systems. The four golden signals. The definitive treatment from the team that invented them." />
              <RefCard title="DevOps Handbook — Chapter 21" body="Enable and Practice Telemetry to Create Organizational Learning. Full coverage of instrumentation patterns." />
              <RefCard title="Observability Engineering — Majors, Fong-Jones, Miranda" body="The comprehensive guide to observability. Structured events, high-cardinality data, and the shift from monitoring to exploration." />
              <RefCard title="OpenTelemetry Documentation" body="The vendor-neutral standard for telemetry instrumentation. Auto-instrumentation, SDKs, and collector architecture." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <a href="/library/monitoring-and-alerting" className="text-sm font-mono font-bold hover:underline" style={{ color: "#7c3aed" }}>Monitoring and Alerting →</a>
        </div>
      </div>
    </main>
  )
}
