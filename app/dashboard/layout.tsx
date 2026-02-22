"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { OrdersProvider } from "@/lib/orders-context"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-9 w-9 rounded-full border-2 border-border border-t-foreground/60 animate-spin" />
      </div>
    )
  }

  if (!user) return null

  return (
    <OrdersProvider>
      <div className="min-h-screen bg-background">
        <div className="flex min-h-screen bg-muted/20">
          {/* Desktop Sidebar only (already hidden in component via hidden lg:flex) */}
          <Sidebar />

          {/* Main column */}
          <div className="flex-1 flex flex-col min-w-0">
            <DashboardHeader />

            {/* Content */}
            <main className="flex-1">
              <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </OrdersProvider>
  )
}
