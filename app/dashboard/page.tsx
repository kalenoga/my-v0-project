"use client"

import { useOrders } from "@/lib/orders-context"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, AlertCircle, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Fertig":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Fertig</span>
      case "Neu":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Neu</span>
      case "In Bearbeitung":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
            In Bearbeitung
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <p className="text-sm text-muted-foreground">Start</p>
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gesamt Aufträge</p>
                <p className="text-3xl font-bold mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Bearbeitung</p>
                <p className="text-3xl font-bold mt-1">{stats.inProgress}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fertig</p>
                <p className="text-3xl font-bold mt-1">{stats.done}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Neu</p>
                <p className="text-3xl font-bold mt-1">{stats.new}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-cyan-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Access */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Schnellzugriff</h2>
            </div>
            <div className="space-y-2">
              <Link
                href="/dashboard/auftraege/neu"
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Neuer Auftrag</p>
                  <p className="text-sm text-muted-foreground">Auftrag erstellen</p>
                </div>
              </Link>
              <Link
                href="/dashboard/benutzer"
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                  <Users className="w-5 h-5 text-muted-foreground" />
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
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Letzte Aufträge</h2>
              <Link href="/dashboard/auftraege" className="text-sm text-primary hover:underline">
                Alle anzeigen
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/dashboard/auftraege/${order.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-medium">{order.leitzahl}</span>
                    <span className="text-muted-foreground">{order.fahrzeug}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(order.status)}
                    <span className="text-sm text-muted-foreground">{order.fertigBis}</span>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
