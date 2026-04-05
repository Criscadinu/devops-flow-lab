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

export default function BlamelessPostmortemsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#15803d] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">Third Way: Continual Learning</span>
            <span className="mx-2">→</span><span className="text-gray-700">Blameless Postmortems</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["CL-01", "PRACTICE", "Third Way: Continual Learning"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Blameless Postmortems</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>How to turn production failures into organizational learning. Why blame stops learning — and how to create an environment where problems are surfaced, not hidden.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Google SRE Book", "Sidney Dekker"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="Why blameless?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>When a production incident occurs, there are two possible organizational responses. A blame culture asks: who caused this? A learning culture asks: what conditions made this possible?</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Sidney Dekker's research in safety engineering shows that in complex systems, failures are never caused by a single person. They are the result of multiple contributing factors — inadequate tooling, poor documentation, missing monitoring, time pressure, incomplete testing. The human who triggered the failure was the last link in a long chain.</p>
            <Callout>Blame is seductive because it is simple. It gives the illusion of a fix: remove the person, prevent the failure. But in complex systems, if one person could cause that failure, so can the next person put in their place. The system has not changed.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="The postmortem format" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A postmortem is a document, not a meeting — though a meeting is used to produce it. The document is the artifact that persists and can be shared. A well-structured postmortem has five sections:</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "1. Incident summary",       color: "#15803d", content: "What happened, when, for how long, and the user impact. Written for engineers who were not on call. One paragraph." },
                { label: "2. Timeline",               color: "#0891b2", content: "Exact timestamped events from first signal to resolution. Detection time, escalation time, mitigation time, resolution time. Include gaps." },
                { label: "3. Contributing factors",   color: "#b45309", content: "Not causes — factors. What conditions made this incident possible? Each factor is a potential action item. Avoid 'human error' as a factor." },
                { label: "4. What went well",         color: "#16a34a", content: "What helped detect and resolve faster? Good runbooks? Fast rollback? Functioning alerts? These should be reinforced and made more reliable." },
                { label: "5. Action items",           color: "#dc2626", content: "Concrete tasks with owners and due dates. Each removes a contributing factor. SMART: specific, measurable, achievable, relevant, time-bound." },
              ].map(item => (
                <div key={item.label} className="flex gap-4 p-4 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff", borderLeft: `3px solid ${item.color}` }}>
                  <p className="text-xs font-mono font-bold shrink-0" style={{ color: item.color, minWidth: "140px" }}>{item.label}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{item.content}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="Psychological safety in postmortems" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A postmortem is only as good as the information people are willing to share. Engineers who fear blame will omit the details most useful for learning. The facilitator's job is to make the room safe for complete honesty.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Facilitator role",   color: "#15803d", bg: "#f0fdf4", desc: "The facilitator is a neutral party — not the manager of the engineers involved. Their job is to keep the conversation on contributing factors, redirect blame, and ensure everyone's perspective is heard." },
                { title: "Language matters",   color: "#0891b2", bg: "#f0fdfa", desc: "\"Who deleted the database?\" vs \"What sequence of events led to the database deletion?\" The second question generates a timeline. The first generates silence." },
                { title: "No punishment rule", color: "#b45309", bg: "#fffbeb", desc: "Engineers must know in advance that honest participation in a postmortem will not result in disciplinary action. This rule must be demonstrated, not just stated." },
                { title: "Separate learning from performance", color: "#7c3aed", bg: "#faf5ff", desc: "Performance issues — repeated incidents caused by the same individual — are a management conversation. Not a postmortem topic. Conflating them destroys postmortem culture." },
              ].map(item => (
                <div key={item.title} className="p-5 border" style={{ backgroundColor: item.bg, borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1.5" style={{ color: item.color }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="Action items" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A postmortem with no action items is a historical document, not an improvement mechanism. Action items are what convert learning into change. They must be:</p>
            <div className="flex flex-col gap-2 mb-4">
              {[
                { quality: "Systemic",     desc: "\"Add alert for connection pool exhaustion\" — not \"be more careful about migrations\"", good: true },
                { quality: "Owned",        desc: "One named owner, not \"the team\" or \"DevOps\"", good: true },
                { quality: "Timeboxed",    desc: "A due date in the next sprint, not \"when we have time\"", good: true },
                { quality: "Tracked",      desc: "Linked to a ticket in the team's backlog. Reviewed in the next retrospective.", good: true },
                { quality: "Vague",        desc: "\"Improve our deployment process\" — no owner, no deadline, no definition of done", good: false },
              ].map(item => (
                <div key={item.quality} className="flex gap-3 items-baseline p-3 border border-[#e5e5e5]" style={{ backgroundColor: item.good ? "#f0fdf4" : "#fff5f5" }}>
                  <span className="text-xs font-mono font-bold shrink-0" style={{ color: item.good ? "#16a34a" : "#dc2626" }}>{item.good ? "✓" : "✗"} {item.quality}</span>
                  <p className="text-xs" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="05" title="Sharing postmortems" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The organizational value of a postmortem multiplies when it is shared. An incident that affected one team may contain a lesson for every team. A shared postmortem library is a documented organizational memory of failures — and how the system improved after each one.</p>
            <div className="flex flex-col gap-3">
              {[
                { practice: "Internal wiki",       desc: "Every postmortem published to a searchable internal wiki within 48 hours of the incident review. Tagged by service, root cause category, and severity." },
                { practice: "Weekly digest",       desc: "A weekly email or Slack post summarizing recent incidents and their key learnings. 5 minutes to read. Keeps the whole organization aware without requiring everyone to attend every review." },
                { practice: "Quarterly trend review", desc: "Aggregate incident data to find recurring patterns. What root cause categories appear repeatedly? Where should the next reliability investment go?" },
              ].map((item, i) => (
                <div key={item.practice} className="flex gap-4 p-4 border border-[#e5e5e5]" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8" }}>
                  <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: "#15803d" }} />
                  <div>
                    <p className="text-xs font-mono font-bold text-black mb-1">{item.practice}</p>
                    <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Callout>Google publishes its postmortems internally across all SRE teams. An engineer in London can learn from an incident in Tokyo they were not involved in. This is organizational learning at scale.</Callout>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Google SRE Book — Chapter 15" body="Postmortem Culture: Learning from Failure. The full Google postmortem format with real examples." />
              <RefCard title="DevOps Handbook — Chapter 26" body="Blameless postmortems and organizational learning. Integration with the improvement kata." />
              <RefCard title="Sidney Dekker — Just Culture" body="The human factors research behind blameless cultures. Why human error is a label, not an explanation." />
              <RefCard title="John Allspaw — Blameless PostMortems" body="The Etsy engineering blog post (2012) that brought blameless postmortems to the DevOps community. Still the clearest statement of the idea." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <a href="/library/chaos-engineering" className="text-sm font-mono font-bold hover:underline" style={{ color: "#15803d" }}>Chaos Engineering →</a>
        </div>
      </div>
    </main>
  )
}
