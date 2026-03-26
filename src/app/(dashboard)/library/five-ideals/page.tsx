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

const ideals = [
  {
    num: "I",
    title: "Locality and Simplicity",
    tagline: "Small teams, simple systems, local decisions",
    color: "#0891b2",
    bg: "#f0fdfa",
    body: "Changes should require as few people, teams, and systems as possible. When a feature requires coordination across five teams and thirty approval gates, the system has too much coupling. Locality means a team can make a change end-to-end. Simplicity means the architecture supports it.",
    examples: [
      "A single team owns an entire microservice",
      "Deploying a feature does not require a change request to three other teams",
      "The codebase is simple enough that a new engineer can be productive in days",
    ],
  },
  {
    num: "II",
    title: "Focus, Flow, and Joy",
    tagline: "Deep work, fast feedback, engaged engineers",
    color: "#16a34a",
    bg: "#f0fdf4",
    body: "Engineers do their best work when they have uninterrupted focus, fast feedback on their changes, and a sense that their work matters. Context switching, interrupt-driven work, and slow pipelines destroy all three. This ideal is about creating the conditions for developer excellence.",
    examples: [
      "Developers can make a change and see it in production the same day",
      "Meetings are batched to protect deep work time",
      "Automated tests and deployment give fast feedback without human gatekeeping",
    ],
  },
  {
    num: "III",
    title: "Improvement of Daily Work",
    tagline: "The system improves, not just the product",
    color: "#b45309",
    bg: "#fffbeb",
    body: "Paying down technical debt and improving processes is at least as important as building features. When organizations only ship features, technical debt compounds until it makes the system unmaintainable. The Third Ideal is about making deliberate time for improvement — Kaizen applied to the development process itself.",
    examples: [
      "Teams reserve capacity each sprint for tech debt reduction",
      "Post-mortems produce systemic fixes, not just timeline corrections",
      "Infrastructure improvements are treated as first-class work",
    ],
  },
  {
    num: "IV",
    title: "Psychological Safety",
    tagline: "Speak up, fail safely, learn openly",
    color: "#7c3aed",
    bg: "#faf5ff",
    body: "Teams only improve when members feel safe to raise problems, share bad news, and admit mistakes without fear of punishment. In psychologically unsafe environments, problems are hidden until they become crises. Psychological safety is not about being nice — it is a prerequisite for organizational learning.",
    examples: [
      "Blameless post-mortems focus on system improvement, not blame",
      "Engineers can raise concerns about schedule pressure without consequence",
      "Failure is treated as a learning opportunity rather than a firing offense",
    ],
  },
  {
    num: "V",
    title: "Customer Focus",
    tagline: "Every decision is evaluated against customer value",
    color: "#dc2626",
    bg: "#fff5f5",
    body: "The ultimate purpose of software delivery is delivering value to users and the business. Teams that lose sight of this optimize for the wrong things: internal metrics, process compliance, or team convenience. Customer focus keeps the system oriented toward outcomes, not outputs.",
    examples: [
      "Feature teams talk directly to customers",
      "Metrics include customer satisfaction, not just delivery speed",
      "A fast pipeline that ships the wrong features is still a failure",
    ],
  },
]

export default function FiveIdealsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">Foundations</span>
            <span className="mx-2">→</span><span className="text-gray-700">The Five Ideals</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["F-03", "FOUNDATION"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#faf5ff", color: "#7c3aed", border: "1px solid #e9d5ff" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>The Five Ideals</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Gene Kim's framework from <em>The Unicorn Project</em>. The conditions that separate organizations where developers love their work from those where they are perpetually firefighting.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["The Unicorn Project — Gene Kim", "The DevOps Handbook"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 py-10 border-b border-[#e5e5e5]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0891b2] mb-3">Video Lesson</p>
          <div className="w-full flex items-center justify-center" style={{ aspectRatio: "16/9", border: "2px dashed #67e8f9", backgroundColor: "#f0fdfa" }}>
            <span className="text-sm font-mono text-gray-400">Video coming soon — check back later</span>
          </div>
          <p className="text-xs mt-3" style={{ ...serif, color: "#888" }}>In this video: the Five Ideals introduced, how they relate to the Three Ways, and why Psychological Safety is the foundation of all improvement.</p>
        </div>
      </div>

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="Origin: The Unicorn Project" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>In 2019, Gene Kim published <em>The Unicorn Project</em> — a companion novel to <em>The Phoenix Project</em> that tells the same story from the developer's perspective. Where the Phoenix Project focuses on IT operations and flow, the Unicorn Project focuses on developer experience and what makes great engineering organizations.</p>
            <p className="text-sm leading-relaxed" style={{ color: "#333" }}>Through the protagonist Maxine, Kim articulates five ideals — principles that characterize organizations where developers can do their best work. These are not practices or tools. They are the conditions that make practices and tools possible.</p>
            <Callout>The Three Ways describe how work should flow. The Five Ideals describe the organizational conditions that make that flow possible. You need both.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="Overview" />
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-0 border border-[#e5e5e5] overflow-hidden">
              {ideals.map((ideal, i) => (
                <div key={ideal.num} className="p-4 text-center" style={{ backgroundColor: ideal.bg, borderRight: i < 4 ? "1px solid #e5e5e5" : undefined }}>
                  <p className="text-2xl font-mono font-bold mb-1" style={{ ...syne.style, color: `${ideal.color}50` }}>{ideal.num}</p>
                  <p className="text-xs font-mono font-bold leading-tight" style={{ color: ideal.color }}>{ideal.title}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="The five ideals in depth" />
            <div className="flex flex-col gap-8">
              {ideals.map(ideal => (
                <div key={ideal.num} className="border border-[#e5e5e5] overflow-hidden">
                  <div className="px-6 py-5" style={{ backgroundColor: ideal.bg, borderLeft: `3px solid ${ideal.color}` }}>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-3xl font-mono font-bold" style={{ ...syne.style, color: `${ideal.color}30` }}>{ideal.num}</span>
                      <div>
                        <p className="text-base font-bold text-black" style={{ ...syne.style }}>{ideal.title}</p>
                        <p className="text-xs font-mono mt-0.5" style={{ color: ideal.color }}>{ideal.tagline}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>{ideal.body}</p>
                  </div>
                  <div className="px-6 py-4" style={{ backgroundColor: "#ffffff" }}>
                    <p className="text-[10px] font-mono font-bold text-gray-400 mb-2 uppercase tracking-widest">In practice</p>
                    <div className="flex flex-col gap-1.5">
                      {ideal.examples.map(ex => (
                        <div key={ex} className="flex gap-2 text-xs" style={{ ...serif, color: "#555" }}>
                          <span style={{ color: ideal.color }} className="shrink-0">→</span>{ex}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="The Five Ideals vs. the Three Ways" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The Three Ways and the Five Ideals are complementary, not competing. The Three Ways are a framework for understanding how work flows through a system. The Five Ideals are a framework for understanding the organizational and cultural conditions that enable or inhibit that flow.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#f0fdfa" }}>
                <p className="text-xs font-mono font-bold text-[#0891b2] mb-3">Three Ways</p>
                <div className="flex flex-col gap-2">
                  {["Describes how work should move", "Technical and process principles", "Flow, feedback, learning", "The 'what' of DevOps"].map(l => (
                    <div key={l} className="flex gap-2 text-xs" style={{ ...serif, color: "#555" }}>
                      <span className="text-[#0891b2] shrink-0">·</span>{l}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#faf5ff" }}>
                <p className="text-xs font-mono font-bold text-[#7c3aed] mb-3">Five Ideals</p>
                <div className="flex flex-col gap-2">
                  {["Describes the conditions for good work", "Organizational and cultural principles", "Safety, focus, simplicity, customer", "The 'why' and 'who' of DevOps"].map(l => (
                    <div key={l} className="flex gap-2 text-xs" style={{ ...serif, color: "#555" }}>
                      <span className="text-[#7c3aed] shrink-0">·</span>{l}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Callout accent="#7c3aed">A team can implement every practice in this library and still fail if the organizational conditions are wrong. Psychological safety, locality, and customer focus are prerequisites, not afterthoughts.</Callout>
          </section>

          <section>
            <SectionLabel num="05" title="Diagnosing your organization" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The Five Ideals are diagnostic tools. When delivery is slow or painful, the ideals often reveal why. Common failure modes:</p>
            <div className="flex flex-col gap-3">
              {[
                { symptom: "Changes require weeks of coordination",     ideal: "Locality & Simplicity",      fix: "The architecture has too much coupling. Teams cannot make end-to-end changes independently." },
                { symptom: "Engineers hate deployments",                ideal: "Focus, Flow, Joy",           fix: "Deployments are painful because they are infrequent and large. Automate and increase frequency." },
                { symptom: "The same problems recur repeatedly",        ideal: "Improvement of Daily Work",  fix: "There is no capacity for systemic fixes. Improvement work is always de-prioritized for features." },
                { symptom: "Problems are hidden until they are crises", ideal: "Psychological Safety",       fix: "People are afraid to raise bad news. Create explicit channels for surfacing problems without blame." },
                { symptom: "Teams optimize for velocity, not value",    ideal: "Customer Focus",             fix: "Teams are measured by outputs (features shipped) rather than outcomes (problems solved for users)." },
              ].map(item => (
                <div key={item.symptom} className="border border-[#e5e5e5] overflow-hidden">
                  <div className="grid grid-cols-12 divide-x divide-[#f0f0f0]">
                    <div className="col-span-5 px-4 py-3" style={{ backgroundColor: "#fff5f5" }}>
                      <p className="text-xs leading-tight" style={{ ...serif, color: "#555" }}>{item.symptom}</p>
                    </div>
                    <div className="col-span-3 px-4 py-3 flex items-center" style={{ backgroundColor: "#fafaf8" }}>
                      <p className="text-[10px] font-mono font-bold text-[#7c3aed]">{item.ideal}</p>
                    </div>
                    <div className="col-span-4 px-4 py-3" style={{ backgroundColor: "#ffffff" }}>
                      <p className="text-xs leading-tight" style={{ ...serif, color: "#555" }}>{item.fix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="The Unicorn Project — Gene Kim" body="The source. Follow Maxine through a struggling enterprise IT organization. The Five Ideals emerge from the narrative." />
              <RefCard title="The Phoenix Project" body="The companion novel. Bill's perspective on the same organization — more operational, less developer-focused." />
              <RefCard title="An Elegant Puzzle — Will Larson" body="Systems of Engineering Management. The organizational conditions (locality, autonomy, safety) explored from an engineering leadership perspective." />
              <RefCard title="Psychological Safety — Amy Edmondson" body="The Fearless Organization. The research behind the Fourth Ideal. Why psychological safety predicts team performance." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/dora-metrics" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← DORA Metrics</a>
            <a href="/library/team-topologies" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>Team Topologies →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
