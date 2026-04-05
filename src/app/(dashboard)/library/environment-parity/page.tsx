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

function EnvDiagram({ parity }: { parity: boolean }) {
  const envs = [
    { name: "Dev",  color: parity ? "#0891b2" : "#dc2626", spec: parity ? "Node 22 / Postgres 16" : "Node 18 / SQLite" },
    { name: "Test", color: parity ? "#0891b2" : "#f59e0b", spec: parity ? "Node 22 / Postgres 16" : "Node 20 / Postgres 14" },
    { name: "Prod", color: parity ? "#0891b2" : "#16a34a", spec: parity ? "Node 22 / Postgres 16" : "Node 22 / Postgres 16" },
  ]
  return (
    <div className="flex items-start gap-3 mt-4">
      {envs.map((e, i) => (
        <div key={e.name} className="flex-1 flex flex-col gap-1">
          <div className="p-3 border-2 text-center" style={{ backgroundColor: "#fff", borderColor: e.color }}>
            <p className="text-xs font-mono font-bold" style={{ color: e.color }}>{e.name}</p>
            <p className="text-[10px] font-mono mt-1" style={{ color: parity ? "#0891b2" : (i === 2 ? "#16a34a" : "#dc2626") }}>{e.spec}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function EnvironmentParityPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">First Way: Flow</span>
            <span className="mx-2">→</span><span className="text-gray-500">Tools &amp; Techniques</span>
            <span className="mx-2">→</span><span className="text-gray-700">Environment Parity</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FT-03", "TOOL", "First Way: Flow"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Environment Parity</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Why dev, test, and prod must be identical — and how containers make that guarantee enforceable.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["12-Factor App", "DevOps Handbook", "Docker Documentation"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="The 'works on my machine' problem" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A developer pushes code that works perfectly locally. The CI build fails. Or worse: CI passes, staging passes, and production breaks. The cause is almost always environment drift — differences in runtime versions, dependencies, configuration, or operating system behavior between environments.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Every environment difference is a source of risk. When dev, test, and prod differ, passing tests in one environment gives false confidence. Bugs that only exist in production are the hardest and most expensive to fix.</p>
            <Callout accent="#dc2626">At Nexus Corp, developers used Node 18 locally, CI ran Node 20, and production ran Node 22. A timing bug only appeared on Node 22. It was invisible in development and CI for months.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="The three environments — and why they must match" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-mono font-bold mb-3" style={{ color: "#dc2626" }}>Without parity</p>
                <EnvDiagram parity={false} />
                <p className="text-xs mt-2 font-mono" style={{ color: "#dc2626" }}>Three different stacks. Three different failure modes.</p>
              </div>
              <div>
                <p className="text-xs font-mono font-bold mb-3" style={{ color: "#0891b2" }}>With parity</p>
                <EnvDiagram parity={true} />
                <p className="text-xs mt-2 font-mono" style={{ color: "#0891b2" }}>One spec. If it works in dev, it works in prod.</p>
              </div>
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="Infrastructure as code" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The 12-Factor App methodology (Heroku, 2011) states: <em>keep development, staging, and production as similar as possible.</em> The way to achieve this is to define environments in code — not in wikis, not in runbooks, not in tribal knowledge.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>When environment configuration lives in version-controlled files, it gets the same treatment as application code: reviewed, tested, and deployed consistently. Manual environment setup is a form of waste — it is unrepeatable, undocumented, and drift-prone.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: "Dockerfile",       desc: "Defines the runtime environment. Every developer and every CI run builds from the same image.",           color: "#0891b2", bg: "#f0fdfa" },
                { title: "docker-compose.yml", desc: "Defines the full local stack: app, database, cache. One command to start the entire environment.",       color: "#16a34a", bg: "#f0fdf4" },
                { title: ".env files",       desc: "Environment-specific config injected at runtime. The image is identical; only config differs.",              color: "#b45309", bg: "#fffbeb" },
              ].map(c => (
                <div key={c.title} className="p-5 border" style={{ backgroundColor: c.bg, borderLeft: `3px solid ${c.color}`, borderColor: `${c.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1.5" style={{ color: c.color }}>{c.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="Containers and Docker" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A Docker container packages the application and its entire runtime — OS libraries, language version, dependencies — into a single portable unit. The container runs identically on a developer's laptop, in CI, and in production.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>This is the key insight: the container is not just a deployment mechanism. It is a <strong>parity contract</strong>. When you build the image once and promote it through environments without rebuilding, you guarantee that what you tested is exactly what you ship.</p>
            <Callout>Build once, deploy many times. The artifact that passes tests in CI is the exact artifact that runs in production. Never rebuild between environments.</Callout>
          </section>

          <section>
            <SectionLabel num="05" title="The Nexus Corp solution" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>In Mission 02, you containerized the Nexus Corp application using Docker and Docker Compose. The setup included three services:</p>
            <div className="border border-[#e5e5e5] overflow-hidden">
              {[
                { service: "app",      image: "node:22-alpine", role: "The Express API, built from the project Dockerfile" },
                { service: "postgres", image: "postgres:16",    role: "Identical database version across all environments" },
                { service: "redis",    image: "redis:7-alpine",  role: "Session cache, same version in dev and prod" },
              ].map((r, i) => (
                <div key={r.service} className="grid grid-cols-3 px-4 py-3" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < 2 ? "1px solid #f0f0f0" : "none" }}>
                  <span className="text-xs font-mono font-bold text-[#0891b2]">{r.service}</span>
                  <span className="text-xs font-mono text-gray-500">{r.image}</span>
                  <span className="text-xs" style={{ ...serif, color: "#555" }}>{r.role}</span>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-4" style={{ color: "#333" }}>Any developer who clones the repo and runs <code className="text-xs font-mono bg-gray-100 px-1 py-0.5">docker compose up</code> gets an identical environment in under two minutes.</p>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="The Twelve-Factor App — Heroku" body="Factor X: Dev/Prod Parity. The definitive statement of why environment parity is non-negotiable." />
              <RefCard title="DevOps Handbook — Chapter 11" body="Enable and Practice Continuous Testing. How environment parity enables reliable automated testing." />
              <RefCard title="Docker Documentation — Compose" body="The official Docker Compose documentation. The reference for defining multi-container environments in code." />
              <RefCard title="Continuous Delivery — Humble & Farley" body="Chapter 11: Managing Infrastructure and Environments. The full treatment of environment management." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/deployment-pipeline" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Deployment Pipeline</a>
            <a href="/library/trunk-based-development" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>Trunk-Based Development →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
