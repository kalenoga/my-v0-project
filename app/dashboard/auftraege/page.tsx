"use client"

import { Suspense, useState } from "react"
import { useOrders, type Order } from "@/lib/orders-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { LayoutDashboard, Plus, Search, RotateCcw, Pencil, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"

/**
 * ✅ Apple-like Ampel Chips (guaranteed visible)
 * Rot -> Neu, Orange -> In Bearbeitung, Grün -> Fertig
 */
function StatusChip({ status }: { status: Order["status"] }) {
  if (status === "Fertig") {
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset bg-[rgba(52,199,89,0.18)] text-[rgba(16,120,52,1)] ring-[rgba(52,199,89,0.30)]">
        Fertig
      </span>
    )
  }

  if (status === "Neu") {
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset bg-[rgba(255,59,48,0.18)] text-[rgba(170,30,24,1)] ring-[rgba(255,59,48,0.30)]">
        Neu
      </span>
    )
  }

  if (status === "In Bearbeitung") {
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset bg-[rgba(255,149,0,0.18)] text-[rgba(170,92,0,1)] ring-[rgba(255,149,0,0.30)]">
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

  const handleDelete = (id: string) => {
    if (confirm("Möchtest du diesen Auftrag wirklich löschen?")) {
      deleteOrder(id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Start</p>
          <h1 className="text-3xl font-bold">Aufträge</h1>
          <p className="text-muted-foreground mt-1">Alle PKW-Produktionsaufträge verwalten.</p>
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
      <Card className="apple-card">
        <CardContent className="p-5">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Suche</label>
              <Input
                placeholder="Leitzahl, Fahrzeug, Modell oder FIN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="w-full sm:w-64 lg:w-56">
              <label className="text-sm font-medium mb-2 block">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="select-apple"
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

      {/* Orders Table (Mobile scroll fix) */}
      <div className="-mx-4 sm:mx-0">
        <Table className="min-w-[980px]">
          <TableHeader>
            <TableRow>
              <TableHead>LEITZAHL</TableHead>
              <TableHead>FAHRZEUG</TableHead>
              <TableHead>MODELL</TableHead>
              <TableHead>FIN</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>EINGANG</TableHead>
              <TableHead>FERTIG BIS</TableHead>
              <TableHead className="text-right">AKTION</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono font-medium">{order.leitzahl}</TableCell>
                <TableCell>{order.fahrzeug}</TableCell>
                <TableCell>{order.modell}</TableCell>
                <TableCell className="font-mono text-sm">{order.fin}</TableCell>

                <TableCell>
                  <StatusChip status={order.status} />
                </TableCell>

                <TableCell className="text-sm">{order.eingang}</TableCell>
                <TableCell className="text-sm">{order.fertigBis}</TableCell>

                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button size="sm" onClick={() => router.push(`/dashboard/auftraege/${order.id}`)}>
                      <Pencil className="w-4 h-4 mr-1" />
                      Bearbeiten
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`/dashboard/auftraege/${order.id}?preview=true`)}
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
                </TableCell>
              </TableRow>
            ))}

            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                  Keine Aufträge gefunden.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
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
