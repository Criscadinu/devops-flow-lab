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

function CIWorkflow() {
  const steps = [
    { label: "Commit", icon: "↑", color: "#0891b2" },
    { label: "Build",  icon: "⚙", color: "#0891b2" },
    { label: "Test",   icon: "✓", color: "#16a34a" },
    { label: "Report", icon: "◉", color: "#16a34a" },
  ]
  return (
    <div className="my-6 p-6 border border-[#e5e5e5] overflow-x-auto" style={{ backgroundColor: "#f7f7f5" }}>
      <div className="flex items-center min-w-max gap-2">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 flex items-center justify-center border-2 text-lg" style={{ backgroundColor: "#fff", borderColor: s.color, color: s.color }}>{s.icon}</div>
              <span className="text-xs font-mono font-bold" style={{ color: s.color }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center mb-5">
                <div className="w-8 h-px bg-gray-300" />
                <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "5px solid #d1d5db" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs font-mono text-gray-400 mt-2">Every push triggers this cycle automatically. Developers get a pass/fail signal within minutes.</p>
    </div>
  )
}

function TestPyramid() {
  return (
    <div className="my-6 flex flex-col items-center gap-0">
      {[
        { label: "E2E Tests",         count: "Few",   time: "Minutes",   color: "#dc2626", width: "60%",  bg: "#fff5f5" },
        { label: "Integration Tests", count: "Some",  time: "Seconds",   color: "#f59e0b", width: "75%",  bg: "#fffbeb" },
        { label: "Unit Tests",        count: "Many",  time: "Milliseconds", color: "#16a34a", width: "100%", bg: "#f0fdf4" },
      ].map(layer => (
        <div key={layer.label} className="flex flex-col items-center" style={{ width: layer.width }}>
          <div className="w-full flex items-center justify-between px-4 py-2.5 border" style={{ backgroundColor: layer.bg, borderColor: `${layer.color}30` }}>
            <span className="text-xs font-mono font-bold" style={{ color: layer.color }}>{layer.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-500">{layer.count}</span>
              <span className="text-xs font-mono" style={{ color: layer.color }}>{layer.time}</span>
            </div>
          </div>
        </div>
      ))}
      <p className="text-xs font-mono text-gray-400 mt-3">More unit tests, fewer E2E tests. Fast feedback at the base, slow comprehensive tests at the top.</p>
    </div>
  )
}

export default function ContinuousIntegrationPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">First Way: Flow</span>
            <span className="mx-2">→</span><span className="text-gray-500">Tools &amp; Techniques</span>
            <span className="mx-2">→</span><span className="text-gray-700">Continuous Integration</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FT-05", "TOOL", "First Way: Flow"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Continuous Integration</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Every commit triggers an automated build and test run. The foundation of fast feedback and confident deployments.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Extreme Programming — Beck", "DORA Research"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="What is CI?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Continuous Integration is the practice of merging every developer's working copy to a shared mainline multiple times per day, with each integration triggering an automated build and test run. Kent Beck introduced CI as a core practice of Extreme Programming in 1999.</p>
            <p className="text-sm leading-relaxed" style={{ color: "#333" }}>The goal is to detect integration problems early — within minutes of introduction, not weeks later at release time. CI transforms integration from a painful, periodic event into a routine, automated background process.</p>
          </section>

          <section>
            <SectionLabel num="02" title="The CI workflow" />
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#333" }}>The CI cycle is simple and repeatable. Every commit follows the same path:</p>
            <CIWorkflow />
            <p className="text-sm leading-relaxed mt-2" style={{ color: "#333" }}>The critical constraint: the entire cycle must complete in under 10 minutes. Developers should be able to commit, push, and see a result before losing context. A 30-minute build is a build developers stop waiting for — and start ignoring.</p>
          </section>

          <section>
            <SectionLabel num="03" title="The three rules of CI" />
            <div className="flex flex-col gap-4">
              {[
                { n: "1", title: "Never break the build",   body: "The build is a shared resource. Breaking it blocks every developer. Run tests locally before pushing. Use a pre-push hook if you need discipline." },
                { n: "2", title: "Fix it fast",             body: "When the build breaks, fixing it is the team's highest priority. A broken build is a blocked pipeline. Every minute it stays broken, developers are making decisions without feedback." },
                { n: "3", title: "Keep the build fast",     body: "A slow build is a build no one waits for. 10 minutes is the maximum. Parallelize tests. Remove flaky tests. If it grows beyond 10 minutes, treat it as a bug." },
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
            <SectionLabel num="04" title="The test pyramid" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Mike Cohn's test pyramid describes the right ratio of test types. More tests at the bottom (fast, isolated), fewer at the top (slow, integrated). Inverting the pyramid — many E2E tests, few unit tests — results in a slow, fragile test suite that developers stop trusting.</p>
            <TestPyramid />
          </section>

          <section>
            <SectionLabel num="05" title="The Nexus Corp CI pipeline" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>In Mission 03, you set up GitHub Actions for Nexus Corp. The workflow runs on every push to main:</p>
            <div className="p-4 border border-[#e5e5e5] font-mono text-xs" style={{ backgroundColor: "#f7f7f5" }}>
              <p className="text-gray-400"># .github/workflows/ci.yml</p>
              <p className="text-gray-700 mt-2">on: push</p>
              <p className="text-gray-700">jobs:</p>
              <p className="text-gray-700 ml-4">test:</p>
              <p className="text-gray-700 ml-8">steps:</p>
              <p className="text-gray-700 ml-10">- run: npm ci</p>
              <p className="text-gray-700 ml-10">- run: npm test</p>
            </div>
            <Callout accent="#16a34a">Before M-03: bugs discovered in production after a month. After M-03: bugs caught within minutes of the commit that introduced them. The feedback loop shrank from weeks to minutes.</Callout>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="DevOps Handbook — Chapter 9" body="Enable and Practice Continuous Integration. The full treatment of CI as an enabling practice for fast flow." />
              <RefCard title="Extreme Programming Explained — Beck" body="The original source. Chapter 7: Whole Team. CI as a social and technical practice." />
              <RefCard title="DORA State of DevOps Research" body="CI as a key technical capability predicting software delivery performance." />
              <RefCard title="Continuous Delivery — Humble & Farley" body="Chapter 3: Continuous Integration. The comprehensive implementation guide." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/trunk-based-development" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Trunk-Based Development</a>
            <a href="/library/continuous-deployment" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>Continuous Deployment →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
