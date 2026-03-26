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

function FiveWhys() {
  const steps = [
    { q: "Why did the payment service fail?",                      a: "The database connection pool was exhausted." },
    { q: "Why was the connection pool exhausted?",                  a: "A slow query held connections open for 40 seconds." },
    { q: "Why did the query run so slowly?",                        a: "A new index was missing after the migration." },
    { q: "Why was the index missing?",                              a: "The migration script did not include the CREATE INDEX statement." },
    { q: "Why was the missing index not caught before production?",  a: "The staging database is smaller — the query was fast enough not to trigger alerts." },
  ]
  return (
    <div className="flex flex-col gap-0 border border-[#e5e5e5] overflow-hidden my-4">
      {steps.map((step, i) => (
        <div key={i} className="grid grid-cols-12" style={{ borderBottom: i < 4 ? "1px solid #f0f0f0" : undefined }}>
          <div className="col-span-1 flex items-center justify-center py-4 border-r border-[#f0f0f0]" style={{ backgroundColor: "#faf5ff" }}>
            <span className="text-sm font-mono font-bold" style={{ color: "#7c3aed" }}>{i + 1}</span>
          </div>
          <div className="col-span-11 grid grid-rows-2 divide-y divide-[#f0f0f0]">
            <div className="px-4 py-2" style={{ backgroundColor: "#fafaf8" }}>
              <p className="text-xs font-mono text-gray-500">{step.q}</p>
            </div>
            <div className="px-4 py-2" style={{ backgroundColor: "#ffffff" }}>
              <p className="text-xs" style={{ ...serif, color: "#333" }}>{step.a}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="px-4 py-3" style={{ backgroundColor: "#faf5ff", borderTop: "1px solid #e5e5e5" }}>
        <p className="text-xs font-mono font-bold text-[#7c3aed] mb-1">Root cause</p>
        <p className="text-xs" style={{ ...serif, color: "#333" }}>The staging environment does not match production data volume. Slow queries are invisible until production. Fix: add staging data volume checks to the deployment pipeline, and add index creation to the migration review checklist.</p>
      </div>
    </div>
  )
}

export default function IncidentReviewPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#7c3aed] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">Second Way: Feedback</span>
            <span className="mx-2">→</span><span className="text-gray-700">Incident Review</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FB-05", "PRACTICE", "Second Way: Feedback"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#faf5ff", color: "#7c3aed", border: "1px solid #e9d5ff" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ ...syne.style, fontWeight: 800 }}>Incident Review</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>The feedback loop after failure. How to turn production incidents into systemic improvements — and why how you review matters as much as what you review.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Google SRE Book", "John Allspaw"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 py-10 border-b border-[#e5e5e5]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#7c3aed] mb-3">Video Lesson</p>
          <div className="w-full flex items-center justify-center" style={{ aspectRatio: "16/9", border: "2px dashed #c4b5fd", backgroundColor: "#faf5ff" }}>
            <span className="text-sm font-mono text-gray-400">Video coming soon — check back later</span>
          </div>
          <p className="text-xs mt-3" style={{ ...serif, color: "#888" }}>In this video: running a blameless incident review, the five whys technique, and how to write action items that actually get done.</p>
        </div>
      </div>

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="What is an incident review?" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>An incident review (also called a post-incident review or post-mortem) is a structured process for learning from production failures. After an incident is resolved, the team gathers to understand what happened, why it happened, and how to prevent it — or detect it faster — next time.</p>
            <p className="text-sm leading-relaxed" style={{ color: "#333" }}>The goal is not to assign blame or find the guilty party. The goal is to improve the system. Incidents are free lessons in where your system is fragile. A team that does not review incidents throws those lessons away.</p>
            <Callout accent="#7c3aed">John Allspaw and Paul Hammond's 2009 talk "10+ Deploys Per Day" introduced the concept of blameless post-mortems at Flickr. The insight: engineers make reasonable decisions given the information they had at the time. The system allowed them to cause harm. Fix the system.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="Blameless vs blame" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A blame culture treats incidents as individual failures — someone made a mistake, and they need to be held accountable. A blameless culture treats incidents as system failures — the system created conditions where a human error could cause an outage.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 border" style={{ backgroundColor: "#fff5f5", borderLeft: "3px solid #dc2626", borderColor: "#dc262625" }}>
                <p className="text-xs font-mono font-bold text-[#dc2626] mb-3">Blame culture outcome</p>
                <div className="flex flex-col gap-2">
                  {["Engineers hide mistakes", "Problems stay hidden until they cause crises", "The root cause is 'human error'", "Nothing systemic changes", "The same incident recurs"].map(l => (
                    <p key={l} className="text-xs flex gap-2" style={{ ...serif, color: "#555" }}><span className="text-[#dc2626] shrink-0">✗</span>{l}</p>
                  ))}
                </div>
              </div>
              <div className="p-5 border" style={{ backgroundColor: "#faf5ff", borderLeft: "3px solid #7c3aed", borderColor: "#7c3aed25" }}>
                <p className="text-xs font-mono font-bold text-[#7c3aed] mb-3">Blameless culture outcome</p>
                <div className="flex flex-col gap-2">
                  {["Problems surface early", "Root causes are investigated fully", "System design improves", "Engineers feel safe admitting mistakes", "Incidents teach the whole team"].map(l => (
                    <p key={l} className="text-xs flex gap-2" style={{ ...serif, color: "#555" }}><span className="text-[#7c3aed] shrink-0">✓</span>{l}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="The five whys" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The five whys is a root cause analysis technique from Toyota: ask "why?" repeatedly until you reach a systemic cause rather than a proximate one. The number five is a rule of thumb — keep asking until you reach a cause that can actually be fixed.</p>
            <FiveWhys />
            <p className="text-sm leading-relaxed mt-3" style={{ color: "#333" }}>Notice that the five whys process leads from a symptom (payment failure) to a systemic root cause (environment parity). The fix is not "be more careful" — it is a process change that makes the problem impossible to repeat.</p>
          </section>

          <section>
            <SectionLabel num="04" title="The incident review format" />
            <div className="flex flex-col gap-3">
              {[
                { section: "Incident summary",      color: "#7c3aed", desc: "One paragraph: what happened, when, for how long, and what the user impact was. Written for engineers who were not involved." },
                { section: "Timeline",              color: "#0891b2", desc: "Chronological sequence of events: first signal, detection, escalation, mitigation, resolution. Exact timestamps. Include the detection-to-response gap." },
                { section: "Contributing factors",  color: "#b45309", desc: "Not blame-seeking — factor-finding. What conditions made this incident possible? Absent monitoring, missing documentation, high cognitive load, unclear ownership?" },
                { section: "What went well",        color: "#16a34a", desc: "What helped you detect and resolve the incident faster? Good oncall runbooks? Fast rollback mechanism? Monitoring that worked? Reinforce these." },
                { section: "Action items",          color: "#dc2626", desc: "Concrete tasks with owners and due dates. Each action item removes a contributing factor. Not 'be more careful' — 'add alert for X' or 'add index migration check to pipeline'." },
              ].map((item, i) => (
                <div key={item.section} className="grid grid-cols-12 border border-[#e5e5e5]" style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafaf8" }}>
                  <div className="col-span-3 px-4 py-3 flex items-start border-r border-[#f0f0f0]" style={{ borderLeft: `3px solid ${item.color}` }}>
                    <p className="text-xs font-mono font-bold" style={{ color: item.color }}>{item.section}</p>
                  </div>
                  <div className="col-span-9 px-4 py-3">
                    <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="05" title="Learning from incidents" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A post-mortem document that lives in a shared folder and is never read again is waste. The organizational value of incident review comes from distributing the learning — making it accessible to engineers who were not involved.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Internal publication",  color: "#7c3aed", bg: "#faf5ff", desc: "Publish every post-mortem to a shared internal wiki. Searchable by affected service, root cause category, or date." },
                { title: "Review in team meetings", color: "#0891b2", bg: "#f0fdfa", desc: "Spend 10 minutes reviewing recent incidents in the team meeting. What happened across the org? What should everyone know?" },
                { title: "Trend analysis",         color: "#16a34a", bg: "#f0fdf4", desc: "Quarterly review of incident patterns. What root causes recur? Where is investment in reliability most needed?" },
              ].map(item => (
                <div key={item.title} className="p-5 border" style={{ backgroundColor: item.bg, borderLeft: `3px solid ${item.color}`, borderColor: `${item.color}25` }}>
                  <p className="text-xs font-mono font-bold mb-1.5" style={{ color: item.color }}>{item.title}</p>
                  <p className="text-xs leading-relaxed" style={{ ...serif, color: "#333" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="DevOps Handbook — Part IV" body="The Second Way: Feedback. Chapter 24–26: creating learning from production telemetry, blameless post-mortems, and review cultures." />
              <RefCard title="Google SRE Book — Chapter 15" body="Postmortem Culture: Learning from Failure. The Google blameless postmortem format with examples." />
              <RefCard title="John Allspaw — Blameless PostMortems" body="codeascraft.com. The original Etsy blog post that popularized blameless post-mortems in the DevOps community." />
              <RefCard title="Sidney Dekker — The Field Guide to Human Error" body="The cognitive science behind why 'human error' is not a root cause — and why system design is the real lever." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <a href="/library/ab-testing" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← A/B Testing</a>
        </div>
      </div>
    </main>
  )
}
