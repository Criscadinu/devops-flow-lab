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

function WestrumModel() {
  const types = [
    { type: "Pathological",  color: "#dc2626", bg: "#fff5f5", traits: ["Power-oriented", "Information hoarded", "Messengers shot", "Failure leads to scapegoating", "Novelty crushed"] },
    { type: "Bureaucratic",  color: "#f59e0b", bg: "#fffbeb", traits: ["Rule-oriented", "Information neglected", "Messengers tolerated", "Failure leads to justice", "Novelty causes problems"] },
    { type: "Generative",    color: "#15803d", bg: "#f0fdf4", traits: ["Performance-oriented", "Information actively sought", "Messengers trained", "Failure leads to inquiry", "Novelty implemented"] },
  ]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-[#e5e5e5] overflow-hidden my-6">
      {types.map((t, i) => (
        <div key={t.type} className="p-5" style={{ backgroundColor: t.bg, borderRight: i < 2 ? "1px solid #e5e5e5" : undefined }}>
          <p className="text-xs font-mono font-bold mb-3" style={{ color: t.color }}>{t.type}</p>
          <div className="flex flex-col gap-1.5">
            {t.traits.map(tr => (
              <p key={tr} className="text-xs flex gap-1.5" style={{ ...serif, color: "#333" }}>
                <span style={{ color: t.color }} className="shrink-0">·</span>{tr}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PsychologicalSafetyPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#15803d] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">Third Way: Continual Learning</span>
            <span className="mx-2">→</span><span className="text-gray-700">Psychological Safety</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["CL-03", "CONCEPT", "Third Way: Continual Learning"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Psychological Safety</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>The foundation of learning teams. Amy Edmondson's research, Google's Project Aristotle, and the Westrum culture model — why feeling safe to speak up predicts team performance.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["Google Project Aristotle", "Amy Edmondson", "DevOps Handbook"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="What is psychological safety?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Amy Edmondson defines psychological safety as "a belief that one will not be punished or humiliated for speaking up with ideas, questions, concerns, or mistakes." It is a shared belief held by members of a team — not a personality trait and not the same as being comfortable or conflict-free.</p>
            <p className="text-sm leading-relaxed" style={{ color: "#333" }}>Psychological safety is specifically about interpersonal risk. Will my colleagues think I'm incompetent if I admit I don't understand? Will I be blamed if I report a near-miss? Will my concern about the deadline be dismissed? When the answer to these questions is "probably yes," people stop speaking up — and problems accumulate silently.</p>
            <Callout>Psychological safety does not mean everyone agrees, or that the team never has conflict. It means team members feel safe enough to engage in the productive conflict that leads to good decisions.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="Google Project Aristotle" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>In 2012, Google launched Project Aristotle: a multi-year study of 180 teams to answer the question "What makes a Google team effective?" The researchers expected to find that the best teams were composed of the most talented individuals.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>They did not. The composition of the team — who was on it — was less predictive of performance than how the team worked together. The single strongest predictor of team effectiveness was psychological safety.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { rank: "1", factor: "Psychological safety",   desc: "Can we take risks on this team without feeling insecure or embarrassed?", color: "#15803d" },
                { rank: "2", factor: "Dependability",          desc: "Can we count on each other to do high quality work on time?", color: "#0891b2" },
                { rank: "3", factor: "Structure and clarity",  desc: "Are goals, roles, and execution plans clear?", color: "#7c3aed" },
                { rank: "4", factor: "Meaning",                desc: "Are we working on something that is personally important?", color: "#b45309" },
                { rank: "5", factor: "Impact",                 desc: "Do we fundamentally believe that the work we're doing matters?", color: "#16a34a" },
              ].map(item => (
                <div key={item.rank} className="p-4 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="text-2xl font-mono font-bold" style={{ ...syne.style, color: "#f0f0f0" }}>{item.rank}</span>
                    <p className="text-xs font-mono font-bold" style={{ color: item.color }}>{item.factor}</p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="Psychological safety in DevOps" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>In DevOps, psychological safety manifests in specific and measurable ways. DORA's research identifies it as a key predictor of software delivery performance — not because it feels good, but because it enables the specific behaviors that drive improvement.</p>
            <div className="flex flex-col gap-3">
              {[
                { behavior: "Reporting near-misses",        without: "Engineers notice a problem about to happen and say nothing, fearing blame for raising it.", with: "Engineers surface potential problems early, allowing the team to prevent incidents." },
                { behavior: "Honest incident reviews",      without: "The post-mortem timeline omits the engineer's role. Root causes stay buried.", with: "The full sequence of events is documented. Contributing factors are found and fixed." },
                { behavior: "Questioning decisions",        without: "Engineers implement decisions they believe are wrong rather than risk conflict.", with: "Disagreements surface in planning, not in production incidents." },
                { behavior: "Admitting skill gaps",         without: "Engineers make guesses rather than ask questions, fearing they will look incompetent.", with: "Knowledge gaps are surfaced and addressed through pairing, documentation, or training." },
              ].map(item => (
                <div key={item.behavior} className="border border-[#e5e5e5] overflow-hidden">
                  <div className="px-4 py-2 border-b border-[#f0f0f0]" style={{ backgroundColor: "#f0fdf4" }}>
                    <p className="text-xs font-mono font-bold text-[#15803d]">{item.behavior}</p>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-[#f0f0f0]">
                    <div className="px-4 py-2.5" style={{ backgroundColor: "#fff5f5" }}>
                      <p className="text-[10px] font-mono font-bold text-[#dc2626] mb-1">Without safety</p>
                      <p className="text-xs" style={{ ...serif, color: "#555" }}>{item.without}</p>
                    </div>
                    <div className="px-4 py-2.5" style={{ backgroundColor: "#f0fdf4" }}>
                      <p className="text-[10px] font-mono font-bold text-[#15803d] mb-1">With safety</p>
                      <p className="text-xs" style={{ ...serif, color: "#555" }}>{item.with}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="Westrum organizational culture model" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Ron Westrum, a sociologist who studied organizational safety in high-risk industries (aviation, healthcare, nuclear), developed a model describing how organizations handle information. DORA adopted Westrum's model and found it to be a key predictor of software delivery performance.</p>
            <WestrumModel />
            <p className="text-sm leading-relaxed" style={{ color: "#333" }}>Generative organizations — those where information flows freely and failures lead to inquiry rather than blame — outperform bureaucratic and pathological ones on every DORA metric. The culture model is not soft: it predicts deployment frequency, change failure rate, and MTTR.</p>
          </section>

          <section>
            <SectionLabel num="05" title="How to build psychological safety" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Psychological safety is created primarily by leader behavior. Amy Edmondson identifies three things leaders do to create it:</p>
            <div className="flex flex-col gap-4">
              {[
                { title: "Frame work as a learning problem",         body: "Explicitly acknowledge uncertainty. \"We've never done this before and will need everyone's best thinking.\" This gives people permission to not know the answer and to ask questions." },
                { title: "Acknowledge your own fallibility",         body: "Leaders who admit mistakes signal that it is safe for others to admit mistakes. \"I was wrong about that\" is one of the most powerful sentences a manager can say." },
                { title: "Model curiosity and ask genuine questions", body: "Ask questions you don't know the answer to. Respond to bad news with curiosity rather than alarm. Reward speaking up, not just the content of what was said." },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-5 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: "#15803d" }} />
                  <div>
                    <p className="text-sm font-bold text-black mb-1" style={{ ...syne.style }}>{item.title}</p>
                    <p className="text-sm leading-relaxed" style={{ ...serif, color: "#555" }}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="The Fearless Organization — Amy Edmondson" body="The definitive book on psychological safety in organizations. Research, case studies, and practical guidance for leaders." />
              <RefCard title="Google Project Aristotle" body="re:Work.withgoogle.com. The full research summary. What Google found about what makes teams effective — and the primacy of psychological safety." />
              <RefCard title="DevOps Handbook — Chapter 27" body="Create a Learning-Oriented Culture with Blameless Post-Mortems. The Westrum culture model and its link to delivery performance." />
              <RefCard title="Accelerate — Chapter 11" body="Leaders and Managers. The DORA research on how management practices and organizational culture predict software delivery performance." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/chaos-engineering" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Chaos Engineering</a>
            <a href="/library/learning-culture" className="text-sm font-mono font-bold hover:underline" style={{ color: "#15803d" }}>Learning Culture →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
