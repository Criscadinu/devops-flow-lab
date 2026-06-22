"use client"

import { useState } from "react"

type FAQItem = {
  question: string
  answer: string
}

type MissionFAQProps = {
  items: FAQItem[]
  title?: string
}

export function MissionFAQ({ items, title = "Frequently Asked Questions" }: MissionFAQProps) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)

  function toggle(i: number) {
    setExpanded((prev) => (prev === i ? null : i))
  }

  return (
    <div className="flex flex-col">
      {/* Master toggle */}
      <button
        onClick={() => { setOpen((v) => !v); setExpanded(null) }}
        className="flex items-center justify-between w-full px-5 py-3 text-left"
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
            {title}
          </span>
          <span className="text-xs font-mono text-gray-700">
            {items.length} questions
          </span>
        </div>
        <span className="text-xs font-mono text-gray-600">
          {open ? "▲ hide" : "▼ show"}
        </span>
      </button>

      {/* Accordion */}
      {open && (
        <div className="flex flex-col" style={{ borderLeft: "1px solid rgb(31,41,55)", borderRight: "1px solid rgb(31,41,55)", borderBottom: "1px solid rgb(31,41,55)" }}>
          {items.map((item, i) => {
            const isExpanded = expanded === i
            return (
              <div key={i} style={{ borderTop: i > 0 ? "1px solid rgb(31,41,55)" : undefined }}>
                <button
                  onClick={() => toggle(i)}
                  className="flex items-start justify-between w-full px-5 py-4 text-left gap-4"
                  style={{
                    backgroundColor: isExpanded ? "#0a0a0a" : "transparent",
                    borderLeft: isExpanded
                      ? "3px solid rgb(255,85,0)"
                      : "3px solid rgb(31,41,55)",
                  }}
                >
                  <span className="text-sm text-gray-900 leading-snug">{item.question}</span>
                  <span
                    className="text-xs font-mono shrink-0 pt-0.5"
                    style={{ color: isExpanded ? "rgb(255,85,0)" : "rgb(75,85,99)" }}
                  >
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>

                {isExpanded && (
                  <div
                    className="px-5 pb-5 pt-1"
                    style={{
                      backgroundColor: "var(--bg)",
                      borderLeft: "3px solid rgb(255,85,0)",
                    }}
                  >
                    <p className="text-sm text-gray-400 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
