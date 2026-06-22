"use client"

import { useState, useEffect } from "react"


function MobileWarning() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  if (!isMobile) return null
  return (
    <div className="flex flex-col gap-3 p-5 border mb-6" style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(251,146,60,0.4)", borderLeft: "3px solid rgb(251,146,60)" }}>
      <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>Desktop required</p>
      <p className="text-sm text-gray-600 leading-relaxed">This phase requires a terminal, a code editor, and GitHub. These tasks cannot be completed on a mobile device. Open this page on your laptop or desktop to continue.</p>
    </div>
  )
}

function TaskCard({ number, title, done, locked, children }: { number: string; title: string; done: boolean; locked: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5 p-6 border" style={{ backgroundColor: locked ? "var(--bg-card)" : done ? "rgba(34,197,94,0.08)" : "var(--bg)", borderColor: locked ? "var(--border)" : done ? "rgba(34,197,94,0.5)" : "rgba(255,85,0,0.4)", borderLeft: locked ? "3px solid var(--border)" : done ? "3px solid rgb(34,197,94)" : "3px solid var(--af-orange)", opacity: locked ? 0.45 : 1, pointerEvents: locked ? "none" : "auto" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold" style={{ color: locked ? "rgb(75,85,99)" : done ? "rgb(34,197,94)" : "rgb(255,85,0)" }}>{number}</span>
          <h3 className="text-gray-900 text-base" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em" }}>{title}</h3>
        </div>
        <div>
          {done && <span className="text-xs font-mono" style={{ color: "rgb(34,197,94)" }}>✓ DONE</span>}
          {locked && <span className="text-xs font-mono text-gray-700">⊘ LOCKED</span>}
        </div>
      </div>
      {!locked && <div className="flex flex-col gap-4">{children}</div>}
    </div>
  )
}

function MentorNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 p-4 border" style={{ backgroundColor: "var(--bg)", borderColor: "rgba(255,85,0,0.15)", borderLeft: "3px solid rgba(255,85,0,0.5)" }}>
      <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: "var(--af-orange)" }}>//</span>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{children}</p>
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="text-xs font-mono leading-relaxed p-4 overflow-x-auto" style={{ backgroundColor: "#1e1e1e", borderLeft: "3px solid var(--af-orange)", color: "rgb(200,200,200)" }}>
      {children}
    </pre>
  )
}

export function Phase3() {
  const [task1Done, setTask1Done] = useState(false)
  const [task2Done, setTask2Done] = useState(false)
  const [task3Done, setTask3Done] = useState(false)
  const [task4Done, setTask4Done] = useState(false)
  const [task5Done, setTask5Done] = useState(false)
  const [actionsUrl, setActionsUrl] = useState("")
  const allDone = task1Done && task2Done && task3Done && task4Done && task5Done

  return (
    <div className="flex-1 px-6 py-14">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <MobileWarning />

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl text-gray-900 tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em" }}>Your Mission - Red, Green, Refactor</h2>
          <p className="text-gray-500 text-sm leading-relaxed">Write the test first. Watch it fail. Make it pass. Refactor. Wire the verified function into the app.</p>
        </div>

        <div className="flex flex-col gap-5 p-6 border" style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(251,146,60,0.3)", borderLeft: "3px solid rgb(251,146,60)" }}>
          <p className="text-xs font-mono uppercase tracking-widest" style={{ color: "rgb(251,146,60)" }}>Before you start</p>
          <p className="text-gray-400 text-sm leading-relaxed">This mission builds on M-08. Your tests should be split into unit/ and integration/ categories and running in parallel in CI.</p>
        </div>

        <TaskCard number="01" title="Write a failing test first" done={task1Done} locked={false}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">Start with red.</span>{" "}The test should describe the behavior you want, not the code you plan to write. Edge cases are requirements — write them now, before you forget them.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add src/__tests__/unit/discount.test.js</SectionLabel>
            <CodeBlock>{`const { applyDiscount } = require('../../discount')

describe('applyDiscount', () => {
  test('applies a valid discount', () => {
    expect(applyDiscount(100, 20)).toBe(80)
  })

  test('rejects discounts above 100 percent', () => {
    expect(() => applyDiscount(100, 150)).toThrow('Discount cannot exceed 100%')
  })

  test('rejects negative discounts', () => {
    expect(() => applyDiscount(100, -10)).toThrow('Discount cannot be negative')
  })

  test('handles zero discount', () => {
    expect(applyDiscount(100, 0)).toBe(100)
  })
})`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">Run: npm run test:unit — all four tests should fail (red). If they pass, the function already exists.</p>
          </div>
          {!task1Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask1Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Failing tests written — I see red</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="02" title="Write the minimum code to pass" done={task2Done} locked={!task1Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">Green means passing.</span>{" "}Write only what is needed to make the tests pass — nothing more. Resist the urge to add features the tests do not require.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Create src/discount.js</SectionLabel>
            <CodeBlock>{`function applyDiscount(price, discountPercent) {
  if (discountPercent < 0) throw new Error('Discount cannot be negative')
  if (discountPercent > 100) throw new Error('Discount cannot exceed 100%')
  return price * (1 - discountPercent / 100)
}

module.exports = { applyDiscount }`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">Run: npm run test:unit — all four tests should pass (green).</p>
          </div>
          {!task2Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask2Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">All tests pass — I see green</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="03" title="Refactor without breaking tests" done={task3Done} locked={!task2Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">Refactor means improve the structure without changing the behavior.</span>{" "}The tests tell you if you broke something — run them after every change.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Update src/discount.js with input validation</SectionLabel>
            <CodeBlock>{`function applyDiscount(price, discountPercent) {
  if (typeof price !== 'number' || price < 0) {
    throw new Error('Price must be a non-negative number')
  }
  if (typeof discountPercent !== 'number') {
    throw new Error('Discount must be a number')
  }
  if (discountPercent < 0) throw new Error('Discount cannot be negative')
  if (discountPercent > 100) throw new Error('Discount cannot exceed 100%')
  return price * (1 - discountPercent / 100)
}

module.exports = { applyDiscount }`}</CodeBlock>
            <p className="text-xs text-gray-600 leading-relaxed">Run: npm run test:unit — all tests should still pass after the refactor.</p>
          </div>
          {!task3Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask3Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Refactor complete — tests still green</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="04" title="Add the discount endpoint to the app" done={task4Done} locked={!task3Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">Now wire the tested function into the application.</span>{" "}The function is already verified — the integration is all that remains. No surprises.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Add to src/index.js</SectionLabel>
            <CodeBlock>{`const { applyDiscount } = require('./discount')

app.post('/api/orders/discount', (req, res) => {
  const { price, discountPercent } = req.body
  try {
    const finalPrice = applyDiscount(price, discountPercent)
    res.json({ originalPrice: price, discountPercent, finalPrice })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})`}</CodeBlock>
          </div>
          {!task4Done && (
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" onChange={(e) => { if (e.target.checked) setTask4Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
              <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Discount endpoint wired — uses the TDD-verified function</span>
            </label>
          )}
        </TaskCard>

        <TaskCard number="05" title="Commit and push" done={task5Done} locked={!task4Done}>
          <MentorNote>
            <p className="text-sm text-gray-600 leading-relaxed"><span className="text-gray-900">The discount module was built test-first. The 150% discount bug cannot exist here.</span>{" "}It was ruled out before a single line of implementation was written.</p>
          </MentorNote>
          <div className="flex flex-col gap-2">
            <SectionLabel>Commit and push</SectionLabel>
            <CodeBlock>{`git add src/
git commit -m 'feat: discount module built with TDD — red/green/refactor cycle complete'
git push`}</CodeBlock>
          </div>
          {!task5Done && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <SectionLabel>Paste your green Actions run URL</SectionLabel>
                <input type="url" value={actionsUrl} onChange={(e) => setActionsUrl(e.target.value)} placeholder="https://github.com/your-username/nexus-corp-app/actions/runs/..." className="w-full px-3 py-2 text-sm font-mono text-gray-900 outline-none border" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border-bright)" }} />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" onChange={(e) => { if (e.target.checked && actionsUrl.includes("github.com")) setTask5Done(true) }} className="w-4 h-4 accent-orange-500 cursor-pointer" />
                <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">Pipeline is green</span>
              </label>
            </div>
          )}
        </TaskCard>

        {allDone && (
          <div className="flex flex-col gap-5 border p-6" style={{ backgroundColor: "var(--bg-card)", borderColor: "rgba(34,197,94,0.5)", borderLeft: "3px solid rgb(34,197,94)" }}>
            <p className="text-sm font-mono font-bold" style={{ color: "rgb(34,197,94)" }}>✓ Red, green, refactor. The test defined the behavior. The code satisfied it. The endpoint uses it. No surprises.</p>
            <a href="?phase=4" className="self-start px-8 py-3 text-sm font-bold tracking-wide transition-opacity hover:opacity-80" style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", borderRadius: "var(--radius)" }}>See your impact →</a>
          </div>
        )}
      </div>
    </div>
  )
}
