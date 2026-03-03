
// app/dashboard/auftraege/[id]/print/layout.tsx
"use client"

import type React from "react"
import { OrdersProvider } from "@/lib/orders-context"

export default function PrintLayout({ children }: { children: React.ReactNode }) {
  // Wichtig: KEINE Sidebar, KEIN Header, KEIN main-padding.
  // Nur Provider + Inhalt.
  return <OrdersProvider>{children}</OrdersProvider>
}
