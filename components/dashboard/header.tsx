"use client"

import { useAuth } from "@/lib/auth-context"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText, Users, Lock, LogOut, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard/auftraege", label: "Aufträge", icon: FileText },
  { href: "/dashboard/benutzer", label: "Benutzer", icon: Users },
  { href: "/dashboard/passwort", label: "Passwort", icon: Lock },
]

export function DashboardHeader() {
  const { logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Apple glass bar */}
      <div className="glass border-b border-border">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6">
          {/* Mobile menu button (keeps your existing behavior) */}
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface hover:bg-accent transition-colors"
            type="button"
            aria-label="Menü"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          {/* Nav pills */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href
              const Icon = item.icon

              return (
                <Button
                  key={item.href}
                  size="sm"
                  variant={active ? "default" : "outline"}
                  className={cn(
                    "rounded-full px-4",
                    active
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-surface hover:bg-accent"
                  )}
                  onClick={() => router.push(item.href)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              )
            })}

            {/* Logout */}
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-500/10"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
