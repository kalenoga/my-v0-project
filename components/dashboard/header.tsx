"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard/auftraege", label: "Aufträge" },
  { href: "/dashboard/benutzer", label: "Benutzer" },
  { href: "/dashboard/passwort", label: "Passwort" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Glass bar */}
      <div className="glass border-b border-border">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-end gap-2 px-4 sm:px-6">
          {/* Nav Pills */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-foreground text-background shadow-sm"
                      : "bg-surface text-foreground border border-border hover:bg-accent"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Logout (safe fallback: just go to login) */}
          <Link href="/login">
            <Button
              variant="ghost"
              className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
