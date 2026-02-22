"use client"

import { Suspense, useState } from "react"
import { useOrders, type Order } from "@/lib/orders-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  LayoutDashboard,
  Plus,
  Search,
  RotateCcw,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

function AuftraegeContent() {
  const { orders, deleteOrder } = useOrders()
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.leitzahl.toLowerCase().includes(search.toLowerCase()) ||
      order.fahrzeug.toLowerCase().includes(search.toLowerCase()) ||
      order.modell.toLowerCase().includes(search.toLowerCase()) ||
      order.fin.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "Fertig":
        return <Badge variant="success">Fertig</Badge>
      case "Neu":
        return <Badge variant="info">Neu</Badge>
      case "In Bearbeitung":
        return <Badge variant="warning">In Bearbeitung</Badge>
      default:
        return <Badge variant="neutral">{status}</Badge>
    }
  }

  const handleDelete = (id: string) => {
    if (confirm("Möchtest du diesen Auftrag wirklich löschen?")) {
      deleteOrder(id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Start</p>
          <h1 className="text-3xl font-bold">Aufträge</h1>
          <p className="text-muted-foreground mt-1">
            Alle PKW-Produktionsaufträge verwalten.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => router.push("/dashboard/auftraege/neu")}>
            <Plus className="w-4 h-4 mr-2" />
            Neuer Auftrag
          </Button>

          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Suche</label>
              <Input
                placeholder="Leitzahl, Fahrzeug, Modell oder FIN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="w-48">
              <label className="text-sm font-medium mb-2 block">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="all">Alle</option>
                <option value="Neu">Neu</option>
                <option value="In Bearbeitung">In Bearbeitung</option>
                <option value="Fertig">Fertig</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <Button>
                <Search className="w-4 h-4 mr-2" />
                Suchen
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setSearch("")
                  setStatusFilter("all")
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    LEITZAHL
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    FAHRZEUG
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    MODELL
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    FIN
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    STATUS
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    EINGANG
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    FERTIG BIS
                  </th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                    AKTION
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border hover:bg-muted/40 transition-colors"
                  >
                    <td className="p-4 font-mono font-medium">{order.leitzahl}</td>
                    <td className="p-4">{order.fahrzeug}</td>
                    <td className="p-4">{order.modell}</td>
                    <td className="p-4 font-mono text-sm">{order.fin}</td>
                    <td className="p-4">{getStatusBadge(order.status)}</td>
                    <td className="p-4 text-sm">{order.eingang}</td>
                    <td className="p-4 text-sm">{order.fertigBis}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => router.push(`/dashboard/auftraege/${order.id}`)}
                        >
                          <Pencil className="w-4 h-4 mr-1" />
                          Bearbeiten
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            router.push(`/dashboard/auftraege/${order.id}?preview=true`)
                          }
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Vorschau
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-500/10"
                          onClick={() => handleDelete(order.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Löschen
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-muted-foreground">
                      Keine Aufträge gefunden.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AuftraegePage() {
  return (
    <Suspense fallback={null}>
      <AuftraegeContent />
    </Suspense>
  )
}
