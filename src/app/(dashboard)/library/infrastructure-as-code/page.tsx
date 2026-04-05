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

function DeclarativeVsImperative() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-[#e5e5e5] overflow-hidden my-4">
      <div className="p-5 border-b sm:border-b-0 sm:border-r border-[#e5e5e5]" style={{ backgroundColor: "#f0fdfa" }}>
        <p className="text-xs font-mono font-bold text-[#0891b2] mb-3">Declarative — Terraform</p>
        <div className="p-3 border border-[#ccfbf1] font-mono text-xs" style={{ backgroundColor: "#ffffff" }}>
          <p className="text-gray-400 mb-1">{"# Describe what you want"}</p>
          <p className="text-gray-700">{"resource \"aws_instance\" \"web\" {"}</p>
          <p className="text-gray-700 ml-4">{"ami           = \"ami-0c55b159cbfafe1f0\""}</p>
          <p className="text-gray-700 ml-4">{"instance_type = \"t3.micro\""}</p>
          <p className="text-gray-700">{"}"}</p>
        </div>
        <p className="text-xs mt-3" style={{ ...serif, color: "#555" }}>Terraform figures out how to achieve the desired state. You describe the end result. The tool handles the steps.</p>
      </div>
      <div className="p-5" style={{ backgroundColor: "#fafaf8" }}>
        <p className="text-xs font-mono font-bold text-[#7c3aed] mb-3">Imperative — Ansible</p>
        <div className="p-3 border border-[#e5e5e5] font-mono text-xs" style={{ backgroundColor: "#ffffff" }}>
          <p className="text-gray-400 mb-1">{"# Describe how to get there"}</p>
          <p className="text-gray-700">{"- name: Install nginx"}</p>
          <p className="text-gray-700 ml-4">{"apt:"}</p>
          <p className="text-gray-700 ml-8">{"name: nginx"}</p>
          <p className="text-gray-700 ml-8">{"state: present"}</p>
        </div>
        <p className="text-xs mt-3" style={{ ...serif, color: "#555" }}>Ansible executes instructions in order. You describe the procedure. Useful for configuration management on existing servers.</p>
      </div>
    </div>
  )
}

function IaCPipeline() {
  const stages = [
    { label: "Lint",      sub: "tflint / checkov",  color: "#0891b2", desc: "Style, syntax, and basic security checks. Fast. Runs on every commit." },
    { label: "Validate",  sub: "terraform validate", color: "#0891b2", desc: "Checks configuration is syntactically valid and internally consistent." },
    { label: "Plan",      sub: "terraform plan",     color: "#b45309", desc: "Shows exactly what will change. Required review before apply. No resources created." },
    { label: "Apply",     sub: "terraform apply",    color: "#16a34a", desc: "Creates, updates, or destroys resources. Automated in CI for staging. Manual approval for prod." },
  ]
  return (
    <div className="my-6 p-5 border border-[#e5e5e5] overflow-x-auto" style={{ backgroundColor: "#f7f7f5" }}>
      <div className="flex items-start min-w-max gap-3">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-start gap-3">
            <div className="flex flex-col gap-1" style={{ minWidth: "110px" }}>
              <div className="px-3 py-2.5 border-2 text-center" style={{ backgroundColor: "#fff", borderColor: s.color }}>
                <p className="text-xs font-mono font-bold" style={{ color: s.color }}>{s.label}</p>
                <p className="text-[10px] font-mono text-gray-400">{s.sub}</p>
              </div>
              <p className="text-[10px] font-mono text-gray-400 text-center leading-tight">{s.desc}</p>
            </div>
            {i < stages.length - 1 && (
              <div className="flex items-center mt-3">
                <div className="w-5 h-px bg-gray-300" />
                <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: "5px solid #d1d5db" }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function InfrastructureAsCodePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">First Way: Flow</span>
            <span className="mx-2">→</span><span className="text-gray-500">Tools &amp; Techniques</span>
            <span className="mx-2">→</span><span className="text-gray-700">Infrastructure as Code</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FT-10", "TOOL", "First Way: Flow"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Infrastructure as Code</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Servers defined in files, not manual clicks. How to version-control your infrastructure, eliminate snowflake servers, and apply the same quality practices to infrastructure that you apply to application code.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Infrastructure as Code — Morris", "Terraform docs"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="What is IaC?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Infrastructure as Code is the practice of managing infrastructure — servers, networks, databases, load balancers — through machine-readable configuration files rather than manual processes or interactive configuration tools. The files are version-controlled, reviewed, and applied through automated pipelines.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The problem IaC solves is the <em>snowflake server</em>: a server that has been manually configured and patched over time until it is unique and irreplaceable. Nobody knows exactly what is on it. It cannot be reproduced. When it fails, recovery is unpredictable.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 border" style={{ backgroundColor: "#fff5f5", borderLeft: "3px solid #dc2626", borderColor: "#dc262625" }}>
                <p className="text-xs font-mono font-bold text-[#dc2626] mb-2">Snowflake server</p>
                {["Manually configured over months/years", "Undocumented dependencies and tweaks", "Cannot be reproduced from scratch", "Recovery from failure is unpredictable", "\"It works, don't touch it\""].map(l => (
                  <p key={l} className="text-xs flex gap-2 mb-1.5" style={{ ...serif, color: "#555" }}><span className="text-[#dc2626] shrink-0">✗</span>{l}</p>
                ))}
              </div>
              <div className="p-5 border" style={{ backgroundColor: "#f0fdfa", borderLeft: "3px solid #0891b2", borderColor: "#0891b225" }}>
                <p className="text-xs font-mono font-bold text-[#0891b2] mb-2">IaC-managed server</p>
                {["Defined in version-controlled config files", "Every change is reviewed and audited", "Can be reproduced identically in minutes", "Recovery: destroy and recreate from code", "\"Delete it and rebuild\" is routine"].map(l => (
                  <p key={l} className="text-xs flex gap-2 mb-1.5" style={{ ...serif, color: "#555" }}><span className="text-[#0891b2] shrink-0">✓</span>{l}</p>
                ))}
              </div>
            </div>
            <Callout>IaC is not just about efficiency. It is about confidence. When infrastructure is defined in code, you know exactly what you have, you can reproduce it, and you can change it safely — with the same practices (review, test, staged rollout) as application code.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="Declarative vs imperative" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>IaC tools fall into two categories based on how you express the desired infrastructure state:</p>
            <DeclarativeVsImperative />
            <div className="border border-[#e5e5e5] overflow-hidden mt-4">
              {[
                { tool: "Terraform",     type: "Declarative", use: "Cloud infrastructure — VMs, networks, databases, DNS",       lang: "HCL" },
                { tool: "Pulumi",        type: "Declarative", use: "Cloud infrastructure using real programming languages",       lang: "TypeScript / Python" },
                { tool: "Ansible",       type: "Imperative",  use: "Server configuration management, app deployment",           lang: "YAML" },
                { tool: "Docker Compose",type: "Declarative", use: "Local development and single-host container orchestration",  lang: "YAML" },
                { tool: "Kubernetes",    type: "Declarative", use: "Container orchestration at scale",                          lang: "YAML / Helm" },
              ].map((r, i) => (
                <div key={r.tool} className="grid grid-cols-4 px-4 py-2.5" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < 4 ? "1px solid #f0f0f0" : undefined }}>
                  <p className="text-xs font-mono font-bold" style={{ color: "#0891b2" }}>{r.tool}</p>
                  <p className="text-xs font-mono text-gray-500">{r.type}</p>
                  <p className="text-xs" style={{ ...serif, color: "#555" }}>{r.use}</p>
                  <p className="text-xs font-mono text-gray-400">{r.lang}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="Immutable infrastructure" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Immutable infrastructure takes IaC to its logical conclusion: instead of patching or updating running servers, you replace them entirely. When a change is needed, build a new image with the change baked in, provision new infrastructure from it, and decommission the old.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Docker containers are the canonical expression of immutable infrastructure. A container image is built once, promoted unchanged through environments, and never modified in place. If you need a different configuration, build a new image.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Mutable servers",     color: "#dc2626", bg: "#fff5f5", desc: "SSH in. Run apt upgrade. Edit config files. The server accumulates changes over time. State diverges from the original spec." },
                { title: "IaC-managed servers", color: "#f59e0b", bg: "#fffbeb", desc: "Changes are made in config files and reapplied. Better — but the server can still drift between applies, and partial failures leave unknown state." },
                { title: "Immutable servers",   color: "#16a34a", bg: "#f0fdf4", desc: "Never modify a running server. Build a new image. Deploy new servers. Destroy old ones. Every server is known, reproducible, drift-free." },
              ].map(item => (
                <div key={item.title} className="p-5 border" style={{ backgroundColor: item.bg, borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1.5" style={{ color: item.color }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="IaC in the pipeline" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Infrastructure code goes through the same pipeline as application code: lint, validate, plan, and apply. The critical step is <strong>plan before apply</strong> — Terraform's <code className="text-xs font-mono bg-gray-100 px-1">plan</code> command shows exactly what will change before any resource is created or destroyed. Treat the plan output as a required review artifact.</p>
            <IaCPipeline />
            <div className="flex flex-col gap-2">
              {[
                { rule: "Never run terraform apply manually in production",  desc: "All applies are triggered by the pipeline after a successful plan review. Manual applies bypass review and break audit trails." },
                { rule: "Store state remotely",                              desc: "Terraform state must be stored in a remote backend (S3, Terraform Cloud) — not locally. Local state cannot be shared or locked." },
                { rule: "Lock state during applies",                         desc: "Prevent concurrent applies that would corrupt state. Remote backends provide locking automatically." },
              ].map(item => (
                <div key={item.rule} className="flex gap-3 p-3 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: "#0891b2" }} />
                  <div>
                    <p className="text-xs font-mono font-bold text-black mb-0.5">{item.rule}</p>
                    <p className="text-xs" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="05" title="IaC at Nexus Corp" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>In Mission 02, Nexus Corp's infrastructure was defined in a <code className="text-xs font-mono bg-gray-100 px-1">docker-compose.yml</code> — a declarative, version-controlled specification of the application stack. This is the foundation of IaC thinking applied to local development. The progression to full IaC looks like:</p>
            <div className="border border-[#e5e5e5] overflow-hidden">
              {[
                { stage: "M-02 (done)",    tool: "Docker Compose",    scope: "Local + CI environment definition",         note: "✓ In place" },
                { stage: "Next step",      tool: "Dockerfile",         scope: "Immutable production container image",       note: "Builds from M-02 base" },
                { stage: "Intermediate",   tool: "Render config",      scope: "PaaS deployment spec (render.yaml)",         note: "Declarative deploy config" },
                { stage: "Full IaC",       tool: "Terraform",          scope: "Cloud resources: DB, CDN, DNS, networking",  note: "When self-hosting" },
              ].map((r, i) => (
                <div key={r.stage} className="grid grid-cols-4 px-4 py-3" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < 3 ? "1px solid #f0f0f0" : undefined }}>
                  <p className="text-xs font-mono font-bold" style={{ color: i === 0 ? "#16a34a" : "#0891b2" }}>{r.stage}</p>
                  <p className="text-xs font-mono text-gray-600">{r.tool}</p>
                  <p className="text-xs" style={{ ...serif, color: "#555" }}>{r.scope}</p>
                  <p className="text-xs font-mono text-gray-400">{r.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Infrastructure as Code — Kief Morris" body="The comprehensive guide to IaC principles and patterns. Tool-agnostic. Covers immutability, testing infrastructure code, and pipeline design." />
              <RefCard title="DevOps Handbook — Chapter 14" body="Enable and Practice Infrastructure-as-Code. Environment provisioning, configuration management, and the path from snowflake to code-defined infrastructure." />
              <RefCard title="Terraform: Up and Running — Brikman" body="The practical Terraform book. Module design, state management, testing, and multi-environment workflows. Updated for Terraform 1.x." />
              <RefCard title="The Phoenix Project — Part II" body="Brent and the snowflake servers. The narrative that made infrastructure debt legible. Chapter 14–18: the cost of undocumented, irreproducible infrastructure." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/database-change-management" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Database Change Management</a>
            <a href="/library/architecture-low-risk-releases" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>Architecture for Low-Risk Releases →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
