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
    <aside className="hidden lg:flex w-64 bg-card/80 backdrop-blur-xl border-r border-border/70 flex-col h-screen sticky top-0">
      {/* Branding Section */}
      <div className="py-10 border-b border-border/70 flex justify-center">
        <Link href="/dashboard" className="group">
          <Image
            src="/ruehl-logo.svg"
            alt="Rühl Automotive"
            width={120}
            height={120}
            priority
            className="transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium",
                "transition-all duration-200",
                "active:scale-[0.99]",
                isActive
                  ? "bg-[rgba(0,122,255,0.10)] text-[rgba(0,84,204,1)] ring-1 ring-inset ring-[rgba(0,122,255,0.18)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-[rgba(0,0,0,0.035)] ring-1 ring-inset ring-transparent hover:ring-border/60",
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-[rgba(0,84,204,1)]" : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border/70">
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium",
            "text-muted-foreground hover:text-foreground",
            "hover:bg-[rgba(0,0,0,0.035)]",
            "ring-1 ring-inset ring-transparent hover:ring-border/60",
            "transition-all duration-200 active:scale-[0.99]",
          )}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}
