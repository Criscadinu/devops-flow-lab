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
function Callout({ children, accent = "#15803d" }: { children: React.ReactNode; accent?: string }) {
  return (
    <div className="px-6 py-4 my-6" style={{ backgroundColor: `${accent}0d`, borderLeft: `3px solid ${accent}` }}>
      <p className="text-sm leading-relaxed" style={{ ...serif, color: "#333" }}>{children}</p>
    </div>
  )
}
function RefCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#fafafa" }}>
      <p className="text-xs font-mono font-bold text-[#15803d] mb-1">{title}</p>
      <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{body}</p>
    </div>
  )
}

function ImprovementKata() {
  const steps = [
    { step: "1", title: "Understand the direction",   desc: "What is the challenge or target condition? What does success look like at the horizon?", color: "#15803d" },
    { step: "2", title: "Grasp the current condition", desc: "What is actually happening now? What is the current process? Measure it.", color: "#0891b2" },
    { step: "3", title: "Establish next target",       desc: "What is the next measurable step toward the challenge? One obstacle at a time.", color: "#b45309" },
    { step: "4", title: "Experiment toward the target", desc: "PDCA: Plan a small experiment. Do it. Check results. Adjust. Repeat.", color: "#7c3aed" },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
      {steps.map(s => (
        <div key={s.step} className="p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-mono font-bold" style={{ fontFamily: "var(--font-heading)", color: "#f0f0f0" }}>{s.step}</span>
            <p className="text-xs font-mono font-bold" style={{ color: s.color }}>{s.title}</p>
          </div>
          <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{s.desc}</p>
        </div>
      ))}
    </div>
  )
}

export default function LearningCulturePage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#15803d] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">Third Way: Continual Learning</span>
            <span className="mx-2">→</span><span className="text-gray-700">Learning Culture</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["CL-04", "CONCEPT", "Third Way: Continual Learning"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Learning Culture</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>What makes an organization capable of sustained improvement. Peter Senge's five disciplines, Toyota's improvement kata, and how knowledge spreads across teams.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "The Fifth Discipline — Senge", "Toyota Kata"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="What is a learning organization?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Peter Senge defined a learning organization as one that is "continually expanding its capacity to create its future." In <em>The Fifth Discipline</em> (1990), he argued that most organizations are incapable of learning because they optimize for short-term performance and suppress the feedback loops that would reveal systemic problems.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Senge identified five disciplines that together characterize a learning organization:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { num: "1", title: "Personal mastery",     desc: "Individuals continuously clarifying and deepening their personal vision.", color: "#15803d" },
                { num: "2", title: "Mental models",        desc: "Surfacing and challenging the assumptions that drive decisions.", color: "#0891b2" },
                { num: "3", title: "Shared vision",        desc: "Building commitment to a common purpose and picture of the future.", color: "#7c3aed" },
                { num: "4", title: "Team learning",        desc: "Developing collective intelligence greater than individual members.", color: "#b45309" },
                { num: "5", title: "Systems thinking",     desc: "The fifth discipline — seeing the whole, not just the parts.", color: "#dc2626" },
              ].map(item => (
                <div key={item.num} className="p-4 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xl font-mono font-bold" style={{ fontFamily: "var(--font-heading)", color: "#f0f0f0" }}>{item.num}</span>
                    <p className="text-xs font-mono font-bold" style={{ color: item.color }}>{item.title}</p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="02" title="Toyota Kata" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Mike Rother's <em>Toyota Kata</em> (2009) documents the management routines that make Toyota's continuous improvement sustainable. The key insight: at Toyota, improvement is not a project or an initiative. It is a <em>kata</em> — a practiced pattern of behavior that becomes automatic through repetition.</p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "#333" }}>The improvement kata has four steps:</p>
            <ImprovementKata />
            <p className="text-sm leading-relaxed mt-3" style={{ color: "#333" }}>The companion coaching kata teaches managers how to develop improvement capability in their teams — not by providing answers, but by asking the right questions. This is how Toyota scaled improvement across thousands of engineers.</p>
            <Callout accent="#15803d">The improvement kata is not about solving problems. It is about building the organizational habit of learning from small experiments. Each cycle produces knowledge, not just solutions.</Callout>
          </section>

          <section>
            <SectionLabel num="03" title="Communities of practice" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Etienne Wenger defined communities of practice (CoPs) as groups of people who share a concern, a set of problems, or a passion for a topic, and who deepen their knowledge by interacting regularly. In engineering organizations, CoPs are how knowledge spreads beyond team boundaries without requiring formal process.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "What CoPs are",      color: "#15803d", bg: "#f0fdf4", desc: "Voluntary groups organized around a practice area. Security, frontend, DevOps, ML. Engineers from different teams who share knowledge, patterns, and problems." },
                { title: "What they produce",  color: "#0891b2", bg: "#f0fdfa", desc: "Shared standards, reusable templates, documentation, training. The output of a CoP is organizational knowledge made accessible." },
                { title: "What they require",  color: "#b45309", bg: "#fffbeb", desc: "Protected time. Leadership support. A regular meeting and a shared space. Without explicit time allocation, CoPs die under feature pressure." },
              ].map(item => (
                <div key={item.title} className="p-5 border" style={{ backgroundColor: item.bg, borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1.5" style={{ color: item.color }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="Learning from failure vs success" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Organizations learn more from failure than success — but only if they have a culture that examines failure without blame. Successes are easy to attribute to strategy. Failures reveal the gap between our mental models and reality.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#fff5f5" }}>
                <p className="text-xs font-mono font-bold text-[#dc2626] mb-2">Without learning from failure</p>
                {["Failures are attributed to bad luck or bad people", "No systemic changes follow incidents", "The same problems recur", "Institutional knowledge is lost when people leave", "Improvement requires crisis"].map(l => (
                  <p key={l} className="text-xs flex gap-2 mb-1.5" style={{ ...serif, color: "#555" }}><span className="text-[#dc2626] shrink-0">·</span>{l}</p>
                ))}
              </div>
              <div className="p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#f0fdf4" }}>
                <p className="text-xs font-mono font-bold text-[#15803d] mb-2">With learning from failure</p>
                {["Failures are analyzed for contributing factors", "Each incident improves the system", "Problems are progressively harder and more novel", "Institutional knowledge is documented and accessible", "Improvement is continuous, not crisis-driven"].map(l => (
                  <p key={l} className="text-xs flex gap-2 mb-1.5" style={{ ...serif, color: "#555" }}><span className="text-[#15803d] shrink-0">·</span>{l}</p>
                ))}
              </div>
            </div>
          </section>

          <section>
            <SectionLabel num="05" title="Measuring learning culture" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>DORA measures organizational culture using a validated survey instrument based on Westrum's model. Teams self-report on five items:</p>
            <div className="border border-[#e5e5e5] overflow-hidden">
              {[
                "On my team, information is actively sought",
                "On my team, messengers are not punished when they deliver bad news",
                "On my team, responsibilities are shared",
                "On my team, cross-functional collaboration is encouraged and rewarded",
                "On my team, failure causes inquiry and not blame",
              ].map((item, i) => (
                <div key={item} className="flex gap-4 px-4 py-2.5 items-center" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8", borderBottom: i < 4 ? "1px solid #f0f0f0" : undefined }}>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#15803d" }} />
                  <p className="text-xs" style={{ ...serif, color: "#333" }}>{item}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-relaxed mt-4" style={{ color: "#333" }}>Teams that score high on this measure have better DORA metrics across all four dimensions. Learning culture is not a soft metric — it is a leading indicator of technical performance.</p>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="The Fifth Discipline — Peter Senge" body="The foundational text on learning organizations. Chapter 11: Building a Learning Organization. Systems thinking as the master discipline." />
              <RefCard title="Toyota Kata — Mike Rother" body="The improvement kata and coaching kata in detail. How Toyota makes continuous improvement a daily practice rather than a project." />
              <RefCard title="DevOps Handbook — Part V" body="The Third Way: Continual Learning and Experimentation. Chapters 25–29 on postmortems, learning cultures, and improvement practices." />
              <RefCard title="DORA State of DevOps 2022" body="The team performance and culture research. Westrum culture model survey instrument and its correlation with delivery performance." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/psychological-safety" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Psychological Safety</a>
            <a href="/library/devops-transformation" className="text-sm font-mono font-bold hover:underline" style={{ color: "#15803d" }}>DevOps Transformation →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
