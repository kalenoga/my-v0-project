"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { OrdersProvider } from "@/lib/orders-context"
import { Sidebar, MobileSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // ✅ Print-Seiten erkennen (alles was /print enthält)
  const isPrintRoute = pathname?.includes("/print")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // ✅ ESC closes drawer
  useEffect(() => {
    if (!mobileNavOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileNavOpen])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!user) return null

  // ✅ WICHTIG: Für /print KEINE Sidebar, KEIN Header, KEIN Padding
  if (isPrintRoute) {
    return (
      <OrdersProvider>
        <div style={{ margin: 0, padding: 0, background: "#fff" }}>{children}</div>
      </OrdersProvider>
    )
  }

  // ✅ Normaler Dashboard-Modus
  return (
    <OrdersProvider>
      <div className="flex min-h-screen bg-muted/30">
        <Sidebar />
        <MobileSidebar open={mobileNavOpen} onOpenChange={setMobileNavOpen} />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader onMenuClick={() => setMobileNavOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 min-w-0">{children}</main>
        </div>
      </div>
    </OrdersProvider>
  )
}
