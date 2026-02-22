"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { LayoutDashboard, FileText, Users, Lock, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/auftraege", label: "Aufträge", icon: FileText },
  { href: "/dashboard/benutzer", label: "Benutzerverwaltung", icon: Users },
  { href: "/dashboard/passwort", label: "Passwort ändern", icon: Lock },
]

export function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside className="w-56 bg-card border-r border-border flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="px-4 py-5 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src="/ruehl-logo.svg"
              alt="Rühl Automotive"
              width={40}
              height={40}
              priority
              className="filter-none invert-0"
            />
          </div>

          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">Rühl Automotive</div>
            <div className="text-xs text-muted-foreground">Dashboard</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                isActive
                  ? "bg-amber-50 text-amber-800"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {/* Left accent (only active) */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-amber-500" />
              )}

              <item.icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-amber-700" : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              <span className={cn("truncate", isActive && "font-medium")}>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-border">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}
