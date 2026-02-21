"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useOrders } from "@/lib/orders-context"
import { PKWProductionFormEmbedded } from "@/components/pkw-production-form-embedded"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LayoutDashboard, Pencil, Eye } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { use } from "react" // Added import for use

function AuftragDetailContent({ id }: { id: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { getOrder, updateOrder } = useOrders()
  const [order, setOrder] = useState(getOrder(id))
  const [isPreview, setIsPreview] = useState(searchParams.get("preview") === "true")

  useEffect(() => {
    const o = getOrder(id)
    if (!o) {
      router.push("/dashboard/auftraege")
    } else {
      setOrder(o)
    }
  }, [id, getOrder, router])

  if (!order) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    )
  }

  const handleFormDataChange = (formData: Record<string, unknown>) => {
    updateOrder(id, { formData })
  }

  const handleHeaderDataChange = (data: Partial<typeof order>) => {
    updateOrder(id, data)
    setOrder({ ...order, ...data })
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between print:hidden">
        <div>
          <p className="text-sm text-muted-foreground">
            {"Aufträge > "}{isPreview ? "Vorschau" : "Bearbeiten"}
          </p>
          <h1 className="text-2xl font-bold">
            Auftrag: {order.leitzahl}
            {isPreview && (
              <span className="ml-3 text-sm font-normal text-muted-foreground bg-muted px-2 py-1 rounded">
                Nur Ansicht
              </span>
            )}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {isPreview ? (
            <Button
              className="bg-[#1a2234] hover:bg-[#2a3244] text-white"
              onClick={() => setIsPreview(false)}
            >
              <Pencil className="w-4 h-4 mr-2" />
              Bearbeiten
            </Button>
          ) : (
            <Button
              variant="outline"
              className="bg-transparent"
              onClick={() => setIsPreview(true)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Vorschau
            </Button>
          )}
          <Button variant="outline" className="bg-transparent" onClick={() => router.push("/dashboard/auftraege")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Alle Aufträge
          </Button>
          <Button variant="outline" className="bg-transparent" asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* PKW Production Form */}
      <PKWProductionFormEmbedded
        order={order}
        onFormDataChange={handleFormDataChange}
        onHeaderDataChange={handleHeaderDataChange}
        readOnly={isPreview}
      />
    </div>
  )
}

export default function AuftragDetailPage({ params }: { params: { id: string } }) {
  const id = params.id
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    }>
      <AuftragDetailContent id={id} />
    </Suspense>
  )
}
