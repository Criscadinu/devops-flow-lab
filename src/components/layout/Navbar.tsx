"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Info, Map, BookOpen, LayoutDashboard, LogOut, User } from "lucide-react"

type NavbarProps = {
  user?: { name?: string | null; email?: string | null } | null
}

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    const parts = name.trim().split(" ")
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase()
  }
  if (email) return email[0].toUpperCase()
  return "?"
}

const navLinks = [
  { href: "/#how-it-works", label: "How it works", icon: Info,            authOnly: false, missionsLink: false },
  { href: "/#missions",     label: "Missions",     icon: Map,             authOnly: false, missionsLink: true  },
  { href: "/library",       label: "Library",      icon: BookOpen,        authOnly: false, missionsLink: false },
  { href: "/dashboard",     label: "Dashboard",    icon: LayoutDashboard, authOnly: true,  missionsLink: false },
]

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  function isActive(href: string) {
    if (href.startsWith("/#")) return false
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <nav
      className="w-full sticky top-0 z-50 px-6 py-4 backdrop-blur-md"
      style={{ backgroundColor: "rgba(255,255,255,0.92)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a href="/" className="flex items-center gap-2.5">
            <span className="w-0.5 h-5 shrink-0" style={{ background: "var(--af-gradient)" }} aria-hidden />
            <span className="font-bold text-lg tracking-tight whitespace-nowrap" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>
              DEVOPS{" "}
              <span style={{ background: "var(--af-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                FLOW
              </span>
              {" "}LAB
            </span>
          </a>
          <span
            className="text-[10px] uppercase tracking-widest px-2 py-0.5"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--af-orange)", backgroundColor: "rgba(255,85,0,0.08)", border: "1px solid var(--af-orange)", borderRadius: "20px" }}
          >
            BETA
          </span>
        </div>

        {/* Nav links + user area */}
        <div className="flex items-center gap-5 md:gap-7">
          {navLinks.filter((link) => !link.authOnly || !!user).map((link) => {
            const href = link.missionsLink && user ? "/dashboard" : link.href
            const active = isActive(href)
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={href}
                className="flex items-center gap-1.5 text-sm transition-colors"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: active ? "var(--af-orange)" : "var(--text-muted)" }}
              >
                <Icon size={16} strokeWidth={1.75} className="shrink-0" />
                <span className="hidden md:inline">{link.label}</span>
              </a>
            )
          })}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center justify-center w-8 h-8 text-xs font-bold transition-opacity hover:opacity-80 focus:outline-none"
                style={{ background: "var(--af-gradient)", color: "#fff", borderRadius: "50%", fontFamily: "var(--font-heading)" }}
                aria-label="User menu"
              >
                {getInitials(user.name, user.email)}
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 py-1 z-50"
                  style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
                >
                  <div className="px-4 py-2.5 border-b flex items-center gap-2" style={{ borderColor: "var(--border)" }}>
                    <User size={13} className="text-gray-400 shrink-0" />
                    <p className="text-xs font-mono text-gray-500 truncate">{user.name ?? user.email}</p>
                  </div>
                  <a href="/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors" onClick={() => setDropdownOpen(false)}>
                    <LayoutDashboard size={14} className="shrink-0" />
                    Dashboard
                  </a>
                  <a href="/api/auth/signout" className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => setDropdownOpen(false)}>
                    <LogOut size={14} className="shrink-0" />
                    Sign out
                  </a>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/api/auth/signin"
              className="text-sm transition-opacity hover:opacity-80"
              style={{ background: "var(--af-gradient)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: "var(--radius)", padding: "8px 20px" }}
            >
              Start for free
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}
