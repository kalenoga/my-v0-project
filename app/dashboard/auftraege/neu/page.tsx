"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useOrders } from "@/lib/orders-context"
import { PKWProductionFormEmbedded } from "@/components/pkw-production-form-embedded"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export default function NeuerAuftragPage() {
  const router = useRouter()
  const { addOrder, getOrder, updateOrder } = useOrders()
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    leitzahl: "",
    fahrzeug: "",
    modell: "",
    fin: "",
    auftragNr: "",
    status: "Neu" as const,
    eingang: new Date().toISOString().split("T")[0],
    fertigBis: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = addOrder({ ...formData, formData: {} })
    setCreatedOrderId(id)
  }

  // If an order was created, show the embedded 5-page form
  if (createdOrderId) {
    const order = getOrder(createdOrderId)
    if (order) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between print:hidden">
            <div>
              <p className="text-sm text-muted-foreground">{"Aufträge > Neu"}</p>
              <h1 className="text-2xl font-bold">Auftrag: {order.leitzahl}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => router.push("/dashboard/auftraege")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Alle Aufträge
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
            </div>
          </div>

          <PKWProductionFormEmbedded
            order={order}
            onFormDataChange={(data) => updateOrder(createdOrderId, { formData: data })}
            onHeaderDataChange={(data) => updateOrder(createdOrderId, data)}
          />
        </div>
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Aufträge</p>
          <h1 className="text-3xl font-bold">Neuer Auftrag</h1>
          <p className="text-muted-foreground mt-1">Erstelle einen neuen PKW-Produktionsauftrag.</p>
        </div>
        <Button variant="outline" className="bg-transparent" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück
        </Button>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Auftragsdaten</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="leitzahl">Leitzahl *</Label>
                <Input
                  id="leitzahl"
                  value={formData.leitzahl}
                  onChange={(e) => setFormData({ ...formData, leitzahl: e.target.value })}
                  placeholder="z.B. XMR007"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fahrzeug">Fahrzeug *</Label>
                <Input
                  id="fahrzeug"
                  value={formData.fahrzeug}
                  onChange={(e) => setFormData({ ...formData, fahrzeug: e.target.value })}
                  placeholder="z.B. Mercedes"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modell">Modell *</Label>
                <Input
                  id="modell"
                  value={formData.modell}
                  onChange={(e) => setFormData({ ...formData, modell: e.target.value })}
                  placeholder="z.B. S-Klasse"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fin">FIN</Label>
                <Input
                  id="fin"
                  value={formData.fin}
                  onChange={(e) => setFormData({ ...formData, fin: e.target.value })}
                  placeholder="Fahrzeug-Identifizierungsnummer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auftragNr">Auftragsnummer</Label>
                <Input
                  id="auftragNr"
                  value={formData.auftragNr}
                  onChange={(e) => setFormData({ ...formData, auftragNr: e.target.value })}
                  placeholder="z.B. A-2025-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as "Neu" | "In Bearbeitung" | "Fertig" })
                  }
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="Neu">Neu</option>
                  <option value="In Bearbeitung">In Bearbeitung</option>
                  <option value="Fertig">Fertig</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="eingang">Eingang</Label>
                <Input
                  id="eingang"
                  type="date"
                  value={formData.eingang}
                  onChange={(e) => setFormData({ ...formData, eingang: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fertigBis">Fertig bis</Label>
                <Input
                  id="fertigBis"
                  type="date"
                  value={formData.fertigBis}
                  onChange={(e) => setFormData({ ...formData, fertigBis: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button type="button" variant="outline" className="bg-transparent" onClick={() => router.back()}>
                Abbrechen
              </Button>
              <Button type="submit" className="bg-[#1a2234] hover:bg-[#2a3244] text-white">
                <Save className="w-4 h-4 mr-2" />
                Auftrag erstellen & Formular öffnen
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
