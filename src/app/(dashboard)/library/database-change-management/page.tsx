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

function ExpandContract() {
  const steps = [
    { phase: "Expand", label: "Add new_email column (nullable)", color: "#16a34a", bg: "#f0fdf4", note: "Old code still works — reads old_email. New code can start writing new_email." },
    { phase: "Migrate", label: "Backfill new_email from old_email", color: "#0891b2", bg: "#f0fdfa", note: "Background job copies data. Both columns exist. Both apps work." },
    { phase: "Switch", label: "Deploy code reading new_email", color: "#b45309", bg: "#fffbeb", note: "New code in production. Old column still present as safety net." },
    { phase: "Contract", label: "Drop old_email column", color: "#7c3aed", bg: "#faf5ff", note: "Only after confirming no code reads old_email. Safe to remove." },
  ]
  return (
    <div className="flex flex-col gap-0 border border-[#e5e5e5] overflow-hidden my-4">
      {steps.map((s, i) => (
        <div key={s.phase} className="grid grid-cols-12" style={{ borderBottom: i < 3 ? "1px solid #f0f0f0" : undefined }}>
          <div className="col-span-2 flex items-center justify-center py-4 border-r border-[#f0f0f0]" style={{ backgroundColor: s.bg }}>
            <p className="text-xs font-mono font-bold" style={{ color: s.color }}>{s.phase}</p>
          </div>
          <div className="col-span-4 px-4 py-3 flex items-center border-r border-[#f0f0f0]" style={{ backgroundColor: "#ffffff" }}>
            <p className="text-xs font-mono" style={{ color: s.color }}>{s.label}</p>
          </div>
          <div className="col-span-6 px-4 py-3" style={{ backgroundColor: "#fafaf8" }}>
            <p className="text-xs" style={{ ...serif, color: "#555" }}>{s.note}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function DatabaseChangeManagementPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fafaf8", color: "#0a0a0a", ...serif }}>
      <div className="border-b border-[#e5e5e5] px-8 py-3" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-mono text-gray-400">
            <a href="/library" className="hover:text-[#0891b2] transition-colors">Library</a>
            <span className="mx-2">→</span><span className="text-gray-500">First Way: Flow</span>
            <span className="mx-2">→</span><span className="text-gray-500">Tools &amp; Techniques</span>
            <span className="mx-2">→</span><span className="text-gray-700">Database Change Management</span>
          </p>
        </div>
      </div>

      <div className="border-b border-[#e5e5e5] px-8 py-14" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          <div className="flex items-center gap-2 flex-wrap">
            {["FT-09", "TOOL", "First Way: Flow"].map(tag => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5" style={{ backgroundColor: "#f0fdfa", color: "#0891b2", border: "1px solid #ccfbf1" }}>{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl text-black tracking-tight leading-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Database Change Management</h1>
          <p className="text-base leading-relaxed" style={{ color: "#555" }}>Databases are the hardest part of continuous delivery. How to version-control schema changes, apply them safely, and deploy without downtime.</p>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-mono text-gray-400 mr-1">Sources:</span>
            {["DevOps Handbook", "Evolutionary Database Design — Fowler & Sadalage", "Flyway / Liquibase docs"].map(s => (
              <span key={s} className="text-xs font-mono px-2 py-0.5 text-gray-600" style={{ backgroundColor: "#f5f5f3", border: "1px solid #e5e5e5" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      <VideoNotice />

      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-14">

          <section>
            <SectionLabel num="01" title="The database problem" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Application code is stateless: you can deploy a new version, roll back, and redeploy without consequence. Databases are stateful: every schema change must be applied to existing data, must be backwards compatible with the current application version, and cannot be rolled back the same way code can.</p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>This asymmetry makes databases the most common source of deployment risk. A rename of a column breaks every query that references the old name. Dropping a column that is still referenced causes a runtime error. Adding a NOT NULL column without a default fails inserts from old application code.</p>
            <Callout accent="#dc2626">The most dangerous deployment is one that includes both a schema change and application code that depends on it. If the schema migration runs, then the application deployment fails and rolls back — the application is now running against a schema it was not designed for.</Callout>
          </section>

          <section>
            <SectionLabel num="02" title="Evolutionary database design" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>Martin Fowler and Pramod Sadalage's evolutionary database design treats the schema as a living artifact that changes incrementally — just like application code. The key principles:</p>
            <div className="flex flex-col gap-3">
              {[
                { principle: "Additive changes only",         desc: "Add columns and tables. Never rename or remove them in the same deployment as the code that uses the new name. Renames are two-step: add new, migrate, remove old." },
                { principle: "Backwards compatibility",       desc: "Every schema change must be compatible with the current running application version. The new schema works with the old code. This enables zero-downtime deploys." },
                { principle: "Small, frequent changes",       desc: "One logical change per migration. Small migrations are easy to review, easy to rollback, and have a small blast radius if they fail." },
                { principle: "Version control the schema",    desc: "Every schema change is a versioned migration script in source control, reviewed in a PR, applied by the pipeline — never applied manually to production." },
              ].map(item => (
                <div key={item.principle} className="flex gap-4 p-4 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: "#0891b2" }} />
                  <div>
                    <p className="text-xs font-mono font-bold text-black mb-1">{item.principle}</p>
                    <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="03" title="Database migrations" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>A migration is a versioned SQL script that transforms the schema from one known state to the next. Migration tools like <strong>Flyway</strong> and <strong>Liquibase</strong> track which migrations have been applied and apply the pending ones in version order.</p>
            <div className="p-4 border border-[#e5e5e5] font-mono text-xs mb-4" style={{ backgroundColor: "#f7f7f5" }}>
              <p className="text-gray-400 mb-2">{"# Flyway migration file naming convention"}</p>
              <p className="text-gray-700">{"V1__create_users_table.sql"}</p>
              <p className="text-gray-700">{"V2__add_email_index.sql"}</p>
              <p className="text-gray-700">{"V3__add_premium_tier_column.sql"}</p>
              <p className="text-gray-400 mt-3 mb-1">{"# V3__add_premium_tier_column.sql"}</p>
              <p className="text-gray-700">{"ALTER TABLE users"}</p>
              <p className="text-gray-700">{"  ADD COLUMN tier VARCHAR(20)"}</p>
              <p className="text-gray-700">{"  NOT NULL DEFAULT 'free';"}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-[#e5e5e5]" style={{ backgroundColor: "#f0fdfa" }}>
                <p className="text-xs font-mono font-bold text-[#0891b2] mb-2">Flyway</p>
                <p className="text-xs leading-relaxed mb-2" style={{ ...serif, color: "#555" }}>SQL-first. Migrations are plain SQL files. Simple and predictable. Best for teams that know SQL and want minimal abstraction.</p>
                <p className="text-[10px] font-mono text-gray-400">flyway migrate — applies pending migrations</p>
              </div>
              <div className="p-4 border border-[#e5e5e5]" style={{ backgroundColor: "#faf5ff" }}>
                <p className="text-xs font-mono font-bold text-[#7c3aed] mb-2">Liquibase</p>
                <p className="text-xs leading-relaxed mb-2" style={{ ...serif, color: "#555" }}>XML/YAML/JSON changelogs with database-agnostic syntax. More powerful rollback support. Best for multi-database environments.</p>
                <p className="text-[10px] font-mono text-gray-400">liquibase update — applies pending changesets</p>
              </div>
            </div>
          </section>

          <section>
            <SectionLabel num="04" title="Zero-downtime migrations" />
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#333" }}>The expand-contract pattern makes schema changes safe for zero-downtime deploys. Instead of a single breaking change, the migration is split into backwards-compatible steps that can be deployed independently:</p>
            <ExpandContract />
            <p className="text-sm leading-relaxed mt-3" style={{ color: "#333" }}>Each step can be deployed independently. If any step fails, only that step needs to be addressed — the application continues to function because each step maintains backwards compatibility with the current code version.</p>
          </section>

          <section>
            <SectionLabel num="05" title="Common anti-patterns" />
            <div className="flex flex-col gap-3">
              {[
                { antipattern: "Big bang migration",         desc: "Applying hundreds of schema changes in a single migration. If it fails partway through, the database is in an unknown state. Migrate incrementally — one logical change per script.", risk: "HIGH" },
                { antipattern: "Direct production changes",  desc: "Running ALTER TABLE in a production database console. Not version-controlled, not reviewed, not reproducible. Guaranteed to diverge from other environments eventually.", risk: "CRITICAL" },
                { antipattern: "No rollback plan",           desc: "Dropping a column or renaming a table without a tested rollback procedure. Many DDL operations cannot be rolled back automatically — you need a reverse migration ready.", risk: "HIGH" },
                { antipattern: "Coupled schema + code deploy", desc: "Deploying a schema change and the code that depends on it in the same deployment. If the code deploy fails and rolls back, the application is running against the new schema with old code.", risk: "HIGH" },
                { antipattern: "Unlocked migration files",   desc: "Modifying a migration file after it has been applied to any environment. Flyway will detect the checksum mismatch and refuse to proceed. Treat applied migrations as immutable.", risk: "MED" },
              ].map(item => (
                <div key={item.antipattern} className="flex gap-4 p-4 border border-[#e5e5e5]" style={{ backgroundColor: "#ffffff" }}>
                  <span className="text-[10px] font-mono font-bold shrink-0 mt-0.5 px-1.5 py-0.5" style={{ backgroundColor: item.risk === "CRITICAL" ? "#fee2e2" : item.risk === "HIGH" ? "#fff7ed" : "#fefce8", color: item.risk === "CRITICAL" ? "#dc2626" : item.risk === "HIGH" ? "#ea580c" : "#b45309" }}>{item.risk}</span>
                  <div>
                    <p className="text-xs font-mono font-bold text-black mb-1">{item.antipattern}</p>
                    <p className="text-xs leading-relaxed" style={{ ...serif, color: "#555" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel num="06" title="Further reading" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <RefCard title="Evolutionary Database Design — Fowler & Sadalage" body="martinfowler.com/articles/evodb.html. The foundational article on treating database schema as evolutionary, version-controlled artifacts." />
              <RefCard title="DevOps Handbook — Chapter 15" body="Enable and Practice Continuous Integration of Database Changes. Migrations in the pipeline, zero-downtime patterns." />
              <RefCard title="Flyway Documentation" body="flywaydb.org/documentation. Complete reference for Flyway migrations, versioning conventions, and pipeline integration." />
              <RefCard title="Liquibase Documentation" body="docs.liquibase.com. Complete reference including rollback strategies, changeset authoring, and diff-based migrations." />
            </div>
          </section>

        </div>
      </div>

      <div className="border-t border-[#e5e5e5] px-8 py-8" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/library" className="text-sm font-mono font-bold text-gray-500 hover:text-black transition-colors">← Back to Library</a>
          <div className="flex items-center gap-6">
            <a href="/library/non-functional-requirements" className="text-sm font-mono font-bold text-gray-400 hover:text-black transition-colors">← Non-Functional Requirements</a>
            <a href="/library/infrastructure-as-code" className="text-sm font-mono font-bold hover:underline" style={{ color: "#0891b2" }}>Infrastructure as Code →</a>
          </div>
        </div>
      </div>
    </main>
  )
}
