"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import {
  LayoutDashboard,
  FileText,
  Users,
  Lock,
  LogOut,
} from "lucide-react"
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
    <aside className="w-60 bg-surface border-r border-border flex flex-col h-screen sticky top-0">
      
      {/* Branding Section */}
      <div className="py-10 border-b border-border flex justify-center">
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
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  )
}
