"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Syne } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

type Role = "engineer" | "manager" | "coach";

const roles: { id: Role; icon: string; title: string; description: string }[] = [
  {
    id: "engineer",
    icon: "👩‍💻",
    title: "Engineer",
    description: "You build pipelines, write code, and want to understand the technical practices",
  },
  {
    id: "manager",
    icon: "📊",
    title: "Manager",
    description: "You want to understand why flow matters and what your team needs",
  },
  {
    id: "coach",
    icon: "🎓",
    title: "Coach / Trainer",
    description: "You use the platform alongside your training sessions",
  },
];

export function OnboardingScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<Role | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSelect(role: Role) {
    if (submitting) return;
    console.log("[OnboardingScreen] card clicked, role:", role);
    setSelected(role);
    setSubmitting(true);

    try {
      const res = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      console.log("[OnboardingScreen] fetch response status:", res.status);
      const data = await res.json();
      console.log("[OnboardingScreen] fetch response body:", data);

      if (res.ok) {
        console.log("[OnboardingScreen] success, redirecting to /dashboard");
        router.push("/dashboard");
      } else {
        console.error("[OnboardingScreen] API error:", data);
        setSubmitting(false);
        setSelected(null);
      }
    } catch (err) {
      console.error("[OnboardingScreen] fetch threw:", err);
      setSubmitting(false);
      setSelected(null);
    }
  }

  return (
    <>
      <style>{`
        @keyframes scanline {
          0%   { transform: translateY(-80px); }
          100% { transform: translateY(100vh); }
        }
        .scanline {
          animation: scanline 2.8s linear 0.3s 1 forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.5s; }
        .delay-3 { animation-delay: 0.85s; }
        .delay-4 { animation-delay: 1.15s; }
        .delay-5 { animation-delay: 1.4s; }
      `}</style>

      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden"
        style={{ backgroundColor: "#000" }}
      >
        {/* Scanline sweep */}
        <div
          aria-hidden
          className="scanline pointer-events-none absolute inset-x-0 top-0"
          style={{
            height: "80px",
            background: "linear-gradient(to bottom, transparent, rgba(0,255,255,0.12), transparent)",
          }}
        />

        {/* Vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        <div className="relative max-w-3xl w-full flex flex-col items-center gap-10 text-center">

          {/* Classification label */}
          <p className="fade-up delay-1 text-xs font-mono tracking-[0.3em] text-cyan-700 uppercase">
            Nexus Corp - Classified Briefing
          </p>

          {/* Main heading */}
          <div className="fade-up delay-2 flex flex-col gap-5">
            <h1
              className="text-6xl sm:text-7xl text-white tracking-tighter leading-none"
              style={{ ...syne.style, fontWeight: 800 }}
            >
              You&apos;ve been hired.
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto">
              The system is broken. The DORA metrics are red. Four teams are
              working in silos. You are the new engineer who will fix this.
            </p>
          </div>

          {/* Divider */}
          <div className="fade-up delay-3 w-full flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-900" />
            <span className="text-xs font-mono text-gray-700 tracking-widest uppercase">
              Choose your role
            </span>
            <div className="flex-1 h-px bg-gray-900" />
          </div>

          {/* Role cards */}
          <div className="fade-up delay-4 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {roles.map((role) => {
              const isSelected = selected === role.id;
              const isDisabled = submitting && !isSelected;

              return (
                <button
                  key={role.id}
                  onClick={() => handleSelect(role.id)}
                  disabled={isDisabled}
                  className="group flex flex-col items-start gap-5 p-6 text-left transition-all duration-200 border"
                  style={{
                    backgroundColor: isSelected
                      ? "rgba(6,182,212,0.07)"
                      : "rgba(255,255,255,0.02)",
                    borderColor: isSelected ? "rgb(6,182,212)" : "rgb(31,41,55)",
                    borderLeft: isSelected
                      ? "3px solid rgb(6,182,212)"
                      : "3px solid rgba(255,255,255,0.04)",
                    opacity: isDisabled ? 0.35 : 1,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                  }}
                >
                  <span className="text-3xl">{role.icon}</span>

                  <div className="flex flex-col gap-1.5">
                    <span
                      className="text-white text-lg"
                      style={{ ...syne.style, fontWeight: 700 }}
                    >
                      {role.title}
                    </span>
                    <span className="text-gray-500 text-sm leading-relaxed">
                      {role.description}
                    </span>
                  </div>

                  <div className="mt-auto pt-2">
                    {isSelected ? (
                      <span className="text-xs font-mono text-cyan-500 tracking-widest">
                        ▸ Loading...
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-gray-800 group-hover:text-cyan-700 transition-colors tracking-widest">
                        ▸ Choose this role
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <p className="fade-up delay-5 text-xs text-gray-800 font-mono">
            Your choice determines your starting perspective - you can change it later
          </p>
        </div>
      </div>
    </>
  );
}
