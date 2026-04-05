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

function SecuredPipelineDiagram() {
  const stages = [
    { label: "Commit",          checks: "Secrets scan\nSAST lint",     color: "#0891b2" },
    { label: "Build",           checks: "Dependency CVE\nLicense scan", color: "#0891b2" },
    { label: "Test",            checks: "SAST full\nUnit tests",        color: "#16a34a" },
    { label: "Deploy Staging",  checks: "DAST scan\nPerf baseline",     color: "#b45309" },
    { label: "Deploy Prod",     checks: "Rate limits\nMonitor",         color: "#b45309" },
  ]
  return (
    <div className="my-6 p-5 border border-[#e5e5e5] overflow-x-auto" style={{ backgroundColor: "#f7f7f5" }}>
      <div className="flex items-start min-w-max gap-2">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-start gap-2">
            <div className="flex flex-col items-center gap-1">
              <div className="px-3 py-2 border-2 text-center" style={{ backgroundColor: "#fff", borderColor: s.color, minWidth: "100px" }}>
                <p className="text-xs font-mono font-bold" style={{ color: s.color }}>{s.label}</p>
              </div>
              <div className="px-2 py-1.5 w-full" style={{ backgroundColor: `${s.color}10`, border: `1px solid ${s.color}30` }}>
                {s.checks.split("\n").map(c => (
                  <p key={c} className="text-[9px] font-mono text-center" style={{ color: s.color }}>{c}</p>
                ))}
              </div>
            </div>
            {i < stages.length - 1 && (
              <div className="flex items-center mt-3">
                <div className="w-4 h-px bg-gray-300" />
                <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "5px solid #d1d5db" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs font-mono text-gray-400 mt-4">Security gates at every stage. Earlier checks are faster and cheaper. DAST requires a running application, so runs in staging.</p>
    </div>
  )
}

function NFRChecklist() {
  const rows = [
    { nfr: "Response time",    how: "Load test with k6 / Locust",        stage: "Staging",    gate: "p99 < 500ms" },
    { nfr: "Throughput",       how: "Stress test to find max RPS",        stage: "Staging",    gate: "> 1,000 req/s" },
    { nfr: "Dependencies CVE", how: "npm audit / Snyk / Dependabot",      stage: "Build",      gate: "0 critical CVEs" },
    { nfr: "Secrets in code",  how: "git-secrets / truffleHog",           stage: "Commit",     gate: "0 secrets found" },
    { nfr: "OWASP Top 10",     how: "SAST: Semgrep / SonarQube",          stage: "Test",       gate: "0 high findings" },
    { nfr: "DAST / runtime",   how: "OWASP ZAP against staging",          stage: "Staging",    gate: "0 high findings" },
    { nfr: "Uptime / recovery",how: "Chaos test + MTTR measurement",      stage: "Staging",    gate: "MTTR < 30 min" },
    { nfr: "Data protection",  how: "TLS check, encryption at rest audit", stage: "Build",     gate: "TLS 1.2+, encrypted" },
  ]
  return (
    <div className="border border-[#e5e5e5] overflow-hidden my-4">
      <div className="grid grid-cols-4 px-4 py-2 border-b border-[#e5e5e5]" style={{ backgroundColor: "#f7f7f5" }}>
        {["NFR", "How to test", "Pipeline stage", "Pass gate"].map(h => (
          <p key={h} className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wide">{h}</p>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={r.nfr} className="grid grid-cols-4 px-4 py-2.5" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < rows.length - 1 ? "1px solid #f0f0f0" : undefined }}>
          <p className="text-xs font-mono font-bold" style={{ color: "#0891b2" }}>{r.nfr}</p>
          <p className="text-xs font-mono text-gray-600">{r.how}</p>
          <p className="text-xs font-mono text-gray-500">{r.stage}</p>
          <p className="text-xs font-mono" style={{ color: "#16a34a" }}>{r.gate}</p>
        </div>
      ))}
    </div>
  )
}

export default function NonFunctionalRequirementsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">First Way: Flow</span>
            <span className="mx-2">→</span><span className="text-gray-500">Tools &amp; Techniques</span>
            <span className="mx-2">→</span><span className="text-gray-700">Non-Functional Requirements</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FT-08", "TOOL", "First Way: Flow"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Non-Functional Requirements in the Pipeline</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Performance, security, and reliability are not afterthoughts. How to build NFR validation into the deployment pipeline so they are tested on every change, not just at release time.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Release It! — Nygard"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="What are NFRs?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Non-functional requirements (NFRs) describe <em>how</em> a system behaves rather than <em>what</em> it does. Performance, security, reliability, scalability, maintainability — these are constraints that every feature must satisfy, not features themselves.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
              {[
                { title: "Performance",    desc: "Response time, throughput, resource utilization under expected and peak load.", color: "#0891b2", bg: "#f0fdfa" },
                { title: "Security",       desc: "Resistance to attack, data protection, authentication, authorization, encryption.", color: "#dc2626", bg: "#fff5f5" },
                { title: "Reliability",    desc: "Availability, fault tolerance, graceful degradation, recovery time.", color: "#16a34a", bg: "#f0fdf4" },
                { title: "Scalability",    desc: "Behavior under increased load. Vertical vs horizontal scaling limits.", color: "#b45309", bg: "#fffbeb" },
              ].map(item => (
                <div key={item.title} className="p-4 border" style={{ backgroundColor: item.bg, borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1" style={{ color: item.color }}>{item.title}</p>
                  <p className="text-[10px] leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <Callout>NFRs discovered at the end of a release cycle are expensive. A performance problem found in production requires an emergency fix and rollback. The same problem found in a pipeline performance gate requires a code change. Shift NFR testing left.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="Performance testing in the pipeline" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Performance testing in the pipeline does not mean running a full load test on every commit — that would be too slow. It means running a targeted baseline comparison that detects regressions before they reach production.</p>
            <div className="flex flex-col gap-3">
              {[
                { type: "Baseline comparison", when: "Every build",    tool: "k6, Gatling",    desc: "Run a fixed scenario against staging. Compare p99 latency to the previous baseline. Fail the build if degraded by > 10%." },
                { type: "Load test",           when: "Pre-release",    tool: "k6, Locust",     desc: "Simulate expected peak traffic. Verify the system meets its SLA at real-world load. Run in staging, not prod." },
                { type: "Stress test",         when: "Quarterly",      tool: "k6, JMeter",     desc: "Increase load until the system breaks. Find the breaking point and verify the system recovers gracefully." },
                { type: "Soak test",           when: "Pre-release",    tool: "k6, Gatling",    desc: "Run at sustained load for hours. Detect memory leaks and resource exhaustion that only appear over time." },
              ].map(item => (
                <div key={item.type} className="border border-[#e5e5e5] overflow-hidden">
                  <div className="grid grid-cols-12">
                    <div className="col-span-3 px-4 py-3 border-r border-[#f0f0f0]" style={{ backgroundColor: "#f0fdfa" }}>
                      <p className="text-xs font-mono font-bold text-[#0891b2]">{item.type}</p>
                      <p className="text-[10px] font-mono text-gray-400 mt-0.5">{item.when}</p>
                      <p className="text-[10px] font-mono text-gray-400">{item.tool}</p>
                    </div>
                    <div className="col-span-9 px-4 py-3" style={{ backgroundColor: "#ffffff" }}>
                      <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="Security testing in the pipeline" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Shifting security left means running automated security checks in the pipeline, not just during a periodic security audit. The pipeline becomes a security control, not just a quality gate.</p>
            <SecuredPipelineDiagram />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "SAST (Static)",   color: "#7c3aed", desc: "Static Application Security Testing. Analyzes source code for security vulnerabilities without running the application. Fast, runs early. Examples: Semgrep, SonarQube, CodeQL." },
                { title: "DAST (Dynamic)",  color: "#dc2626", desc: "Dynamic Application Security Testing. Attacks a running application to find vulnerabilities. Requires deployed app — runs in staging. Examples: OWASP ZAP, Burp Suite." },
                { title: "Dependency scan", color: "#b45309", desc: "Checks third-party dependencies against known CVE databases. Should fail the build on critical vulnerabilities. Examples: npm audit, Snyk, Dependabot." },
                { title: "Secrets scan",    color: "#0891b2", desc: "Prevents credentials, API keys, and tokens from being committed to source control. Runs as a pre-commit hook and in CI. Examples: git-secrets, truffleHog, Gitleaks." },
              ].map(item => (
                <div key={item.title} className="p-4 border" style={{ backgroundColor: "#fafafa", borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1" style={{ color: item.color }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="Reliability patterns" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Michael Nygard's <em>Release It!</em> documents the stability patterns that make systems resilient to cascading failure. These are architectural choices that belong in the deployment pipeline: test them in staging before they are needed in production.</p>
            <div className="flex flex-col gap-3">
              {[
                { pattern: "Circuit breaker",  desc: "When a downstream service is failing, stop calling it. Return a cached or degraded response. After a timeout, probe whether the service has recovered.", why: "Prevents a failing dependency from taking down the entire system through resource exhaustion." },
                { pattern: "Timeout",          desc: "Every call to an external system must have a timeout. No call should wait indefinitely. Timeouts are the minimum reliability pattern — if you do nothing else, do this.", why: "An unbounded wait holds a thread. Enough unbounded waits fill the thread pool. The service goes down." },
                { pattern: "Retry with backoff", desc: "Transient failures are often self-resolving. Retry failed requests with exponential backoff and jitter. Do not retry on client errors (4xx).", why: "Immediate retries amplify load on a struggling service. Exponential backoff gives it time to recover." },
                { pattern: "Bulkhead",         desc: "Partition system resources by function. Use separate connection pools for different downstream services so a slow dependency can only exhaust its own pool.", why: "Isolates failure so that one misbehaving dependency cannot exhaust shared resources." },
              ].map(item => (
                <div key={item.pattern} className="border border-[#e5e5e5] overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-[#f0f0f0]" style={{ backgroundColor: "#f0fdfa" }}>
                    <p className="text-xs font-mono font-bold text-[#0891b2]">{item.pattern}</p>
                  </div>
                  <div className="px-4 py-2.5 border-b border-[#f0f0f0]" style={{ backgroundColor: "#ffffff" }}>
                    <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{item.desc}</p>
                  </div>
                  <div className="px-4 py-2" style={{ backgroundColor: "#fafaf8" }}>
                    <p className="text-[10px] font-mono font-bold text-gray-400 mb-0.5">Why it matters</p>
                    <p className="text-xs" style={{ ...serif, color: "#777" }}>{item.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="05" title="NFR checklist" />
            <p className="text-sm leading-relaxed mb-3" style={{ color: "#333" }}>Use this as a starting point for defining NFR gates in your deployment pipeline. Each NFR has a specific test mechanism, a pipeline stage where it runs, and a measurable pass condition:</p>
            <NFRChecklist />
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Release It! — Michael Nygard" body="The definitive book on production-ready software. Stability patterns, anti-patterns, and the chapter that coined circuit breaker." />
              <RefCard title="DevOps Handbook — Chapter 11" body="Enable and Practice Continuous Testing. NFR testing in the context of the deployment pipeline." />
              <RefCard title="OWASP Testing Guide" body="owasp.org. The comprehensive reference for web application security testing. The basis for most DAST tools and security test checklists." />
              <RefCard title="Google SRE Book — Chapter 3" body="Embracing Risk. How to reason about reliability requirements, SLOs, and the cost of reliability vs the cost of failure." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/test-automation" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Test Automation</a>
            <a href="/library/database-change-management" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>Database Change Management →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
