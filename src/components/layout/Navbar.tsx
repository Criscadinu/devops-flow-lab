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
  { href: "/#how-it-works", label: "How it works", icon: Info,            iconColor: "text-gray-400",  authOnly: false, missionsLink: false },
  { href: "/#missions",     label: "Missions",     icon: Map,             iconColor: "text-cyan-500",  authOnly: false, missionsLink: true  },
  { href: "/library",       label: "Library",      icon: BookOpen,        iconColor: "text-amber-400", authOnly: false, missionsLink: false },
  { href: "/dashboard",     label: "Dashboard",    icon: LayoutDashboard, iconColor: "text-cyan-500",  authOnly: true,  missionsLink: false },
]

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
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
    if (href.startsWith("/#")) return false // anchor links never "active"
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <nav
      className="w-full sticky top-0 z-50 px-6 py-4 backdrop-blur-md border-b border-gray-900"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.80)" }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a href="/" className="flex items-center gap-2.5">
            <span className="w-0.5 h-5 shrink-0" style={{ backgroundColor: "rgb(6,182,212)" }} aria-hidden />
            <span className="text-white font-bold text-lg tracking-tight whitespace-nowrap">
              DevOps <span className="text-cyan-400">Flow Lab</span>
            </span>
          </a>
          <span
            className="font-mono text-[10px] uppercase tracking-widest px-1.5 py-0.5"
            style={{
              color: "rgb(6,182,212)",
              backgroundColor: "rgba(6,182,212,0.1)",
              border: "1px solid rgba(6,182,212,0.3)",
            }}
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
                className={`flex items-center gap-1.5 text-sm transition-colors ${active ? "text-cyan-400" : "text-gray-400 hover:text-white"}`}
              >
                <Icon size={16} strokeWidth={1.75} className={`shrink-0 ${link.iconColor}`} />
                <span className="hidden md:inline">{link.label}</span>
              </a>
            )
          })}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar button */}
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold font-mono transition-opacity hover:opacity-80 focus:outline-none"
                style={{
                  backgroundColor: "rgba(6,182,212,0.15)",
                  border: "1px solid rgba(6,182,212,0.35)",
                  color: "rgb(34,211,238)",
                }}
                aria-label="User menu"
              >
                {getInitials(user.name, user.email)}
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 py-1 z-50"
                  style={{
                    backgroundColor: "#0a0a0a",
                    border: "1px solid rgb(31,41,55)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                  }}
                >
                  {/* User info */}
                  <div className="px-4 py-2.5 border-b border-gray-800 flex items-center gap-2">
                    <User size={13} className="text-gray-600 shrink-0" />
                    <p className="text-xs font-mono text-gray-400 truncate">{user.name ?? user.email}</p>
                  </div>
                  <a
                    href="/dashboard"
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-900 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <LayoutDashboard size={14} className="shrink-0" />
                    Dashboard
                  </a>
                  <a
                    href="/api/auth/signout"
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-500 hover:text-gray-300 hover:bg-gray-900 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <LogOut size={14} className="shrink-0" />
                    Sign out
                  </a>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/api/auth/signin"
              className="bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold px-5 py-2 transition-colors"
            >
              Start for free
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}
