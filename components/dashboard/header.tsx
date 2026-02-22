"use client"

import { useAuth } from "@/lib/auth-context"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Menu, FileText, Users, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

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
    <header className="sticky top-0 z-50 w-full">
      {/* Glass bar */}
      <div className="glass border-b border-border/70">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6">
          {/* Mobile menu button (visual only) */}
          <button
            className={cn(
              "lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full",
              "ring-1 ring-inset ring-border/60",
              "bg-white/60 dark:bg-black/30",
              "hover:bg-white/80 dark:hover:bg-black/40",
              "active:scale-[0.98] transition"
            )}
            type="button"
            aria-label="Menü"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Nav Pills */}
            <div className="hidden sm:flex items-center gap-2">
              {navItems.map((item) => {
                const active = pathname === item.href
                const Icon = item.icon

                return (
                  <Button
                    key={item.href}
                    size="sm"
                    variant="outline"
                    className={cn(
                      "rounded-full px-4",
                      "ring-1 ring-inset ring-border/60",
                      "bg-white/60 dark:bg-black/30",
                      "hover:bg-white/80 dark:hover:bg-black/40",
                      "active:scale-[0.98] transition",
                      active &&
                        "bg-foreground text-background hover:bg-foreground/90 dark:hover:bg-foreground/90"
                    )}
                    onClick={() => router.push(item.href)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                )
              })}
            </div>

            {/* Mobile: just show current section pill */}
            <div className="sm:hidden">
              {(() => {
                const current = navItems.find((i) => i.href === pathname) ?? navItems[0]
                const Icon = current.icon
                return (
                  <Button
                    size="sm"
                    variant="outline"
                    className={cn(
                      "rounded-full px-4",
                      "ring-1 ring-inset ring-border/60",
                      "bg-foreground text-background hover:bg-foreground/90",
                      "active:scale-[0.98] transition"
                    )}
                    onClick={() => router.push(current.href)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {current.label}
                  </Button>
                )
              })()}
            </div>

            {/* Theme Toggle */}
            <div
              className={cn(
                "inline-flex items-center justify-center",
                "rounded-full ring-1 ring-inset ring-border/60",
                "bg-white/60 dark:bg-black/30",
                "hover:bg-white/80 dark:hover:bg-black/40",
                "active:scale-[0.98] transition"
              )}
            >
              <ThemeToggle />
            </div>

            {/* Logout */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full",
                "text-red-600 hover:text-red-700",
                "hover:bg-red-500/10",
                "active:scale-[0.98] transition"
              )}
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
