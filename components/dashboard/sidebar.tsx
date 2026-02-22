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
      
      {/* Branding Section */}
      <div className="py-8 border-b border-border flex justify-center">
        <Link href="/dashboard" className="group">
          <Image
            src="/ruehl-logo.svg"
            alt="Rühl Automotive"
            width={130}
            height={130}
            priority
            className="filter-none invert-0 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                isActive
                  ? "bg-amber-50 text-amber-800 font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
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
