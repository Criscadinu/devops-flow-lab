"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Syne } from "next/font/google"
import { Terminal, Users, BarChart2 } from "lucide-react"

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] })

type Role = "ENGINEER" | "COACH" | "MANAGER"

const ROLES: {
  id: Role
  title: string
  description: string
  Icon: React.ElementType
}[] = [
  {
    id: "ENGINEER",
    title: "Engineer",
    description: "You write code, run pipelines, and ship features",
    Icon: Terminal,
  },
  {
    id: "COACH",
    title: "Coach",
    description: "You guide teams and facilitate improvement",
    Icon: Users,
  },
  {
    id: "MANAGER",
    title: "Manager",
    description: "You lead strategy and track outcomes",
    Icon: BarChart2,
  },
]

export function OnboardingClient() {
  const router = useRouter()
  const [selected, setSelected] = useState<Role | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleStart() {
    if (!selected || submitting) return
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selected }),
      })

      if (res.ok) {
        router.push("/dashboard")
      } else {
        setError("Something went wrong. Please try again.")
        setSubmitting(false)
      }
    } catch {
      setError("Something went wrong. Please try again.")
      setSubmitting(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.55s; }
        .delay-4 { animation-delay: 0.8s; }
      `}</style>

      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
        style={{ backgroundColor: "#000" }}
      >
        <div className="w-full max-w-2xl flex flex-col items-center gap-10 text-center">

          {/* Label */}
          <p className="fade-up delay-1 text-xs font-mono tracking-[0.3em] uppercase"
            style={{ color: "rgb(255,85,0)" }}>
            DevOps Flow Lab
          </p>

          {/* Headings */}
          <div className="fade-up delay-2 flex flex-col gap-3">
            <h1
              className="text-5xl sm:text-6xl text-white tracking-tighter leading-none"
              style={{ ...syne.style, fontWeight: 800 }}
            >
              Welcome to DevOps Flow Lab
            </h1>
            <p className="text-gray-400 text-lg">
              What is your role at Nexus Corp?
            </p>
          </div>

          {/* Role cards */}
          <div className="fade-up delay-3 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {ROLES.map(({ id, title, description, Icon }) => {
              const isSelected = selected === id
              const isComingSoon = id === "COACH" || id === "MANAGER"
              return (
                <button
                  key={id}
                  onClick={() => { if (!isComingSoon && !submitting) setSelected(id) }}
                  disabled={submitting || isComingSoon}
                  className="relative flex flex-col items-start gap-5 p-6 text-left transition-all duration-150 border"
                  style={{
                    backgroundColor: isSelected ? "rgba(255,85,0,0.07)" : "rgba(255,255,255,0.02)",
                    borderColor: isSelected ? "rgb(255,85,0)" : "rgb(31,41,55)",
                    borderLeft: isSelected
                      ? "3px solid rgb(255,85,0)"
                      : "3px solid rgba(255,255,255,0.04)",
                    cursor: isComingSoon || submitting ? "default" : "pointer",
                    opacity: isComingSoon ? 0.5 : submitting && !isSelected ? 0.4 : 1,
                  }}
                >
                  {isComingSoon ? (
                    <span
                      className="font-mono text-xs uppercase px-2 py-0.5"
                      style={{ backgroundColor: "#111", color: "rgb(75,85,99)", borderRadius: 0 }}
                    >
                      COMING SOON
                    </span>
                  ) : (
                    <Icon
                      size={22}
                      style={{ color: isSelected ? "rgb(255,85,0)" : "rgb(75,85,99)" }}
                      strokeWidth={1.5}
                    />
                  )}

                  <div className="flex flex-col gap-1.5">
                    <span
                      className="text-white text-base"
                      style={{ ...syne.style, fontWeight: 700 }}
                    >
                      {title}
                    </span>
                    <span className="text-gray-500 text-sm leading-relaxed">
                      {description}
                    </span>
                  </div>

                  {!isComingSoon && (
                    <div className="mt-auto pt-1">
                      <span
                        className="text-xs font-mono tracking-widest"
                        style={{ color: isSelected ? "rgb(255,85,0)" : "rgb(55,65,81)" }}
                      >
                        {isSelected ? "▸ Selected" : "▸ Choose"}
                      </span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* CTA */}
          <div className="fade-up delay-4 w-full flex flex-col gap-2">
            <button
              onClick={handleStart}
              disabled={!selected || submitting}
              className="w-full py-4 text-sm font-mono tracking-widest uppercase transition-opacity duration-150"
              style={{
                backgroundColor: selected && !submitting ? "rgb(255,85,0)" : "rgb(17,24,39)",
                color: selected && !submitting ? "#000" : "rgb(55,65,81)",
                border: "1px solid",
                borderColor: selected && !submitting ? "rgb(255,85,0)" : "rgb(31,41,55)",
                cursor: !selected || submitting ? "not-allowed" : "pointer",
                fontWeight: 700,
              }}
            >
              {submitting ? "Starting..." : "Start your mission"}
            </button>
            {error && (
              <p className="text-xs font-mono text-center" style={{ color: "rgb(239,68,68)" }}>
                {error}
              </p>
            )}
          </div>

        </div>
      </div>
    </>
  )
}
