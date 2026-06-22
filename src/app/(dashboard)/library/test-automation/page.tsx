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

function ManualVsAutomated() {
  const rows = [
    { codebase: "Small (50 files)",     manual: "20 min",  automated: "45 sec",  frequency: "Rarely" },
    { codebase: "Medium (500 files)",   manual: "3 hours", automated: "2 min",   frequency: "Weekly" },
    { codebase: "Large (5,000 files)",  manual: "2 days",  automated: "8 min",   frequency: "Monthly" },
    { codebase: "XL (50,000 files)",    manual: "2 weeks", automated: "15 min",  frequency: "Quarterly" },
  ]
  return (
    <div className="border border-[#e5e5e5] overflow-hidden my-4">
      <div className="grid grid-cols-4 px-4 py-2 border-b border-[#e5e5e5]" style={{ backgroundColor: "#f7f7f5" }}>
        {["Codebase size", "Manual regression", "Automated suite", "Without automation: runs"].map(h => (
          <p key={h} className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wide">{h}</p>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={r.codebase} className="grid grid-cols-4 px-4 py-2.5" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < rows.length - 1 ? "1px solid #f0f0f0" : undefined }}>
          <p className="text-xs font-mono text-gray-700">{r.codebase}</p>
          <p className="text-xs font-mono" style={{ color: "#dc2626" }}>{r.manual}</p>
          <p className="text-xs font-mono" style={{ color: "#16a34a" }}>{r.automated}</p>
          <p className="text-xs font-mono text-gray-500">{r.frequency}</p>
        </div>
      ))}
      <div className="px-4 py-2" style={{ backgroundColor: "#fafaf8", borderTop: "1px solid #e5e5e5" }}>
        <p className="text-[10px]" style={{ ...serif, color: "#888" }}>Manual regression time grows linearly with codebase. Automated suite time grows sub-linearly. At scale, manual testing is not slower — it is impossible.</p>
      </div>
    </div>
  )
}

function TestPyramid() {
  return (
    <div className="my-6 flex flex-col items-center gap-0">
      {[
        { label: "E2E / Acceptance",  count: "Few",   time: "Minutes",       color: "#dc2626", width: "55%",  bg: "#fff5f5",  pct: "~10%" },
        { label: "Integration",       count: "Some",  time: "Seconds",       color: "#f59e0b", width: "75%",  bg: "#fffbeb",  pct: "~20%" },
        { label: "Unit",              count: "Many",  time: "Milliseconds",  color: "#16a34a", width: "100%", bg: "#f0fdf4",  pct: "~70%" },
      ].map(layer => (
        <div key={layer.label} className="flex flex-col items-center" style={{ width: layer.width }}>
          <div className="w-full flex items-center justify-between px-4 py-2.5 border" style={{ backgroundColor: layer.bg, borderColor: `${layer.color}30` }}>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold" style={{ color: layer.color }}>{layer.label}</span>
              <span className="text-[10px] font-mono text-gray-400">{layer.pct}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-500">{layer.count}</span>
              <span className="text-xs font-mono" style={{ color: layer.color }}>{layer.time}</span>
            </div>
          </div>
        </div>
      ))}
      <p className="text-xs font-mono text-gray-400 mt-3 text-center">Many fast unit tests at the base. Few slow E2E tests at the top. Inverting the pyramid makes the suite slow and fragile.</p>
    </div>
  )
}

export default function TestAutomationPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">First Way: Flow</span>
            <span className="mx-2">→</span><span className="text-gray-500">Tools &amp; Techniques</span>
            <span className="mx-2">→</span><span className="text-gray-700">Test Automation</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FT-07", "TOOL", "First Way: Flow"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Test Automation</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Manual testing does not scale. How to build a test suite that runs in minutes, catches regressions before they reach production, and gives developers confidence to deploy continuously.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Growing Object-Oriented Software — Freeman & Pryce", "DORA Research"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="Why automate tests?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A manual regression test suite is a liability that grows with the codebase. As code accumulates, manual testing takes longer — until the suite takes longer to run than a sprint, and stops being run at all. Automated tests invert this dynamic: the suite can grow while run time stays bounded.</p>
            <ManualVsAutomated />
            <Callout>DORA research identifies comprehensive test automation as one of the highest-leverage technical practices for software delivery performance. Teams with automated test suites deploy more frequently and have lower change failure rates — because every change is tested, not just the ones developers had time to check manually.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="The test pyramid" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Mike Cohn's test pyramid describes the optimal distribution of test types. The shape reflects cost and speed: unit tests are cheap and fast, so have many. E2E tests are expensive and slow, so have few. The ratio — roughly 70% unit, 20% integration, 10% E2E — is a guideline, not a law.</p>
            <TestPyramid />
            <p className="text-sm leading-relaxed" style={{ color: "#333" }}>The anti-pattern is the <em>ice cream cone</em>: mostly E2E tests, few unit tests. This is the natural result of teams that write tests only to satisfy QA, not to drive development. It produces a slow, brittle test suite that developers avoid running.</p>
          </section>

          <section>
            <SectionLabel num="03" title="Unit testing" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A unit test verifies the behavior of a single function or class in isolation. It runs in milliseconds, has no external dependencies, and tells you exactly what is broken. The Arrange-Act-Assert (AAA) pattern structures every test:</p>
            <div className="p-4 border border-[#e5e5e5] font-mono text-xs mb-4" style={{ backgroundColor: "#f7f7f5" }}>
              <p className="text-gray-400 mb-2">{"// test: computeDiscount()"}</p>
              <p className="text-gray-700">{"it('applies 10% discount for premium users', () => {"}</p>
              <p className="text-gray-700 ml-4 mt-1 text-[#0891b2">{"// Arrange"}</p>
              <p className="text-gray-700 ml-4">{"const user = { tier: 'premium' };"}</p>
              <p className="text-gray-700 ml-4">{"const cart = { total: 100 };"}</p>
              <p className="text-gray-700 ml-4 mt-1 text-[#16a34a]">{"// Act"}</p>
              <p className="text-gray-700 ml-4">{"const result = computeDiscount(user, cart);"}</p>
              <p className="text-gray-700 ml-4 mt-1 text-[#b45309]">{"// Assert"}</p>
              <p className="text-gray-700 ml-4">{"expect(result).toBe(90);"}</p>
              <p className="text-gray-700">{"});"}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-[#e5e5e5]" style={{ backgroundColor: "#f0fdf4" }}>
                <p className="text-xs font-mono font-bold text-[#16a34a] mb-2">Test this</p>
                {["Business logic and calculations", "Edge cases and boundary values", "Error conditions and exceptions", "Public interfaces and contracts"].map(l => (
                  <p key={l} className="text-xs flex gap-2 mb-1" style={{ ...serif, color: "#555" }}><span className="text-[#16a34a]">✓</span>{l}</p>
                ))}
              </div>
              <div className="p-4 border border-[#e5e5e5]" style={{ backgroundColor: "#fff5f5" }}>
                <p className="text-xs font-mono font-bold text-[#dc2626] mb-2">Do not test</p>
                {["Framework behavior (it's already tested)", "Simple getters and setters", "Implementation details (test behavior)", "Third-party library internals"].map(l => (
                  <p key={l} className="text-xs flex gap-2 mb-1" style={{ ...serif, color: "#555" }}><span className="text-[#dc2626]">✗</span>{l}</p>
                ))}
              </div>
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="Integration testing" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Integration tests verify that components work correctly together — a service and its database, two microservices communicating, a function and a file system. They are slower than unit tests but catch a class of bug that unit tests cannot: integration failures.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>When you cannot use a real dependency (slow, expensive, non-deterministic), use a <em>test double</em>:</p>
            <div className="flex flex-col gap-2">
              {[
                { type: "Stub",  color: "#0891b2", desc: "Returns a fixed value. Use when you need a dependency to return a specific response.", example: "paymentService.charge() always returns { success: true }" },
                { type: "Mock",  color: "#7c3aed", desc: "Records calls and verifies interactions. Use when you need to assert that a dependency was called correctly.", example: "assert emailService.send() was called once with the right args" },
                { type: "Fake",  color: "#16a34a", desc: "A simplified working implementation. Use for databases, queues, filesystems — anything with state.", example: "In-memory database that behaves like Postgres but runs in the test process" },
                { type: "Spy",   color: "#b45309", desc: "Wraps a real implementation and records calls. Use when you want real behavior but need to verify it happened.", example: "Real logger that also captures log lines for assertions" },
              ].map(item => (
                <div key={item.type} className="grid grid-cols-12 border border-[#e5e5e5]">
                  <div className="col-span-2 flex items-center justify-center py-3 border-r border-[#e5e5e5]" style={{ backgroundColor: `${item.color}10` }}>
                    <p className="text-xs font-mono font-bold" style={{ color: item.color }}>{item.type}</p>
                  </div>
                  <div className="col-span-5 px-4 py-3" style={{ backgroundColor: "#ffffff" }}>
                    <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{item.desc}</p>
                  </div>
                  <div className="col-span-5 px-4 py-3" style={{ backgroundColor: "#fafaf8" }}>
                    <p className="text-[10px] font-mono leading-relaxed" style={{ color: item.color }}>{item.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="05" title="Acceptance testing" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Acceptance tests verify the system from the user's perspective: does it do what the user expects? They run against the full application stack and test complete user journeys. They are the most expensive test type — slow to run, slow to write, and fragile when UI changes — so use them sparingly.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Behaviour-Driven Development (BDD) structures acceptance tests as specifications written in plain language, using the Gherkin syntax:</p>
            <div className="p-4 border border-[#e5e5e5] font-mono text-xs" style={{ backgroundColor: "#f7f7f5" }}>
              <p className="text-gray-400 mb-2"># checkout.feature</p>
              <p className="text-[#0891b2]">Feature:</p>
              <p className="text-gray-700 ml-4">As a customer</p>
              <p className="text-gray-700 ml-4">I want to complete a purchase</p>
              <p className="text-gray-700 ml-4">So that I can receive my order</p>
              <p className="text-[#16a34a] mt-2">Scenario:</p>
              <p className="text-gray-700 ml-4">Given I have 2 items in my cart</p>
              <p className="text-gray-700 ml-4">And I am a premium member</p>
              <p className="text-gray-700 ml-4">When I complete the checkout</p>
              <p className="text-gray-700 ml-4">Then I should receive a 10% discount</p>
              <p className="text-gray-700 ml-4">And an order confirmation email</p>
            </div>
            <p className="text-sm leading-relaxed mt-4" style={{ color: "#333" }}>BDD specifications serve dual purpose: they are both executable tests and living documentation. When the test passes, the specification is verified. When it fails, the specification documents exactly what is broken.</p>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="DevOps Handbook — Chapter 10" body="Enable Fast and Reliable Automated Testing. The full treatment of test automation in the context of the deployment pipeline." />
              <RefCard title="Growing Object-Oriented Software — Freeman & Pryce" body="The book on test-driven development. How to design systems that are testable by construction. Mocks, fakes, and outside-in TDD." />
              <RefCard title="xUnit Test Patterns — Meszaros" body="The comprehensive reference on test patterns. Test doubles, test organization, and the vocabulary of automated testing." />
              <RefCard title="The Art of Unit Testing — Osherove" body="Practical guide to writing good unit tests. What makes a test maintainable vs brittle. Test naming and organization." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/continuous-deployment" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Continuous Deployment</a>
            <a href="/library/non-functional-requirements" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>Non-Functional Requirements →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
