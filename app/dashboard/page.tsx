"use client"

import { useOrders, type Order } from "@/lib/orders-context"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, AlertCircle, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

/**
 * ✅ Apple-like Ampel Chips (consistent with Aufträge)
 * Rot -> Neu, Orange -> In Bearbeitung, Grün -> Fertig
 */
function StatusChip({ status }: { status: Order["status"] }) {
  if (status === "Fertig") {
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset backdrop-blur-[2px] bg-[rgba(52,199,89,0.18)] text-[rgba(16,120,52,1)] ring-[rgba(52,199,89,0.30)]">
        Fertig
      </span>
    )
  }

  if (status === "Neu") {
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset backdrop-blur-[2px] bg-[rgba(255,59,48,0.18)] text-[rgba(170,30,24,1)] ring-[rgba(255,59,48,0.30)]">
        Neu
      </span>
    )
  }

  if (status === "In Bearbeitung") {
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset backdrop-blur-[2px] bg-[rgba(255,149,0,0.18)] text-[rgba(170,92,0,1)] ring-[rgba(255,149,0,0.30)]">
        In Bearbeitung
      </span>
    )
  }

  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset bg-muted text-foreground/70 ring-border/60">
      {status}
    </span>
  )
}

export default function DashboardPage() {
  const { orders } = useOrders()

  const stats = {
    total: orders.length,
    inProgress: orders.filter((o) => o.status === "In Bearbeitung").length,
    done: orders.filter((o) => o.status === "Fertig").length,
    new: orders.filter((o) => o.status === "Neu").length,
  }

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.eingang).getTime() - new Date(a.eingang).getTime())
    .slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <p className="text-sm text-muted-foreground">Start</p>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* Stats Cards (Apple-like) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="apple-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gesamt Aufträge</p>
                <p className="text-3xl font-bold mt-1 tracking-tight">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-full ring-1 ring-inset ring-border/60 bg-[rgba(0,122,255,0.10)] flex items-center justify-center">
                <FileText className="w-6 h-6 text-[rgba(0,84,204,1)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="apple-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Bearbeitung</p>
                <p className="text-3xl font-bold mt-1 tracking-tight">{stats.inProgress}</p>
              </div>
              <div className="w-12 h-12 rounded-full ring-1 ring-inset ring-border/60 bg-[rgba(255,149,0,0.14)] flex items-center justify-center">
                <Clock className="w-6 h-6 text-[rgba(170,92,0,1)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="apple-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fertig</p>
                <p className="text-3xl font-bold mt-1 tracking-tight">{stats.done}</p>
              </div>
              <div className="w-12 h-12 rounded-full ring-1 ring-inset ring-border/60 bg-[rgba(52,199,89,0.14)] flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[rgba(16,120,52,1)]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="apple-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Neu</p>
                <p className="text-3xl font-bold mt-1 tracking-tight">{stats.new}</p>
              </div>
              <div className="w-12 h-12 rounded-full ring-1 ring-inset ring-border/60 bg-[rgba(255,59,48,0.12)] flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-[rgba(170,30,24,1)]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Access */}
        <Card className="apple-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold tracking-tight">Schnellzugriff</h2>
            </div>

            <div className="space-y-2">
              <Link
                href="/dashboard/auftraege/neu"
                className="group flex items-center gap-4 p-4 rounded-2xl ring-1 ring-inset ring-border/60 bg-[rgba(0,0,0,0.02)] hover:bg-[rgba(0,0,0,0.035)] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl ring-1 ring-inset ring-border/60 bg-white flex items-center justify-center shadow-sm">
                  <FileText className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <div>
                  <p className="font-medium">Neuer Auftrag</p>
                  <p className="text-sm text-muted-foreground">Auftrag erstellen</p>
                </div>
              </Link>

              <Link
                href="/dashboard/benutzer"
                className="group flex items-center gap-4 p-4 rounded-2xl ring-1 ring-inset ring-border/60 bg-[rgba(0,0,0,0.02)] hover:bg-[rgba(0,0,0,0.035)] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl ring-1 ring-inset ring-border/60 bg-white flex items-center justify-center shadow-sm">
                  <Users className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <div>
                  <p className="font-medium">Benutzerverwaltung</p>
                  <p className="text-sm text-muted-foreground">Benutzer verwalten</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="apple-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold tracking-tight">Letzte Aufträge</h2>
              <Link href="/dashboard/auftraege" className="text-sm text-primary hover:underline">
                Alle anzeigen
              </Link>
            </div>

            <div className="space-y-2">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/dashboard/auftraege/${order.id}`}
                  className="group flex items-center justify-between p-3 rounded-2xl ring-1 ring-inset ring-border/60 bg-white/70 hover:bg-white transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-medium">{order.leitzahl}</span>
                    <span className="text-muted-foreground">{order.fahrzeug}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <StatusChip status={order.status} />
                    <span className="text-sm text-muted-foreground">{order.fertigBis}</span>
                  </div>
                </Link>
              ))}

              {recentOrders.length === 0 && (
                <div className="p-6 text-center text-muted-foreground">
                  Keine Aufträge vorhanden.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
