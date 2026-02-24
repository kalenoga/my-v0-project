"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { FormHeader } from "@/components/form/form-header"
import { Page01 } from "@/components/pages/page-01"
import { Page02 } from "@/components/pages/page-02"
import { Page03 } from "@/components/pages/page-03"
import { Page04 } from "@/components/pages/page-04"
import { Page05 } from "@/components/pages/page-05"
import { ChevronLeft, ChevronRight, Save, Printer, RotateCcw } from "lucide-react"
import type { Order } from "@/lib/orders-context"

interface PKWProductionFormEmbeddedProps {
  order: Order
  onFormDataChange: (formData: Record<string, unknown>) => void
  onHeaderDataChange: (data: Partial<Order>) => void
  readOnly?: boolean
}

export function PKWProductionFormEmbedded({
  order,
  onFormDataChange,
  onHeaderDataChange,
  readOnly = false,
}: PKWProductionFormEmbeddedProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [formData, setFormData] = useState<Record<string, string | boolean>>(() => {
    return (order.formData as Record<string, string | boolean>) || {}
  })
  const [saved, setSaved] = useState(false)

  const [headerState, setHeaderState] = useState({
    datum: order.eingang || new Date().toISOString().split("T")[0],
    status: order.status,
    fahrzeug: order.fahrzeug,
    modell: order.modell,
    fin: order.fin,
    auftragNr: order.auftragNr,
    eingang: order.eingang,
    fertigBis: order.fertigBis,
    leitzahl: order.leitzahl,
  })

  const updateFormField = useCallback(
    (field: string, value: string | boolean) => {
      if (readOnly) return
      setFormData((prev) => {
        const updated = { ...prev, [field]: value }
        onFormDataChange(updated)
        return updated
      })
    },
    [readOnly, onFormDataChange]
  )

  const updateHeaderField = useCallback(
    (field: string, value: string) => {
      if (readOnly) return
      setHeaderState((prev) => ({ ...prev, [field]: value }))

      const fieldMap: Record<string, string> = {
        datum: "eingang",
        status: "status",
        fahrzeug: "fahrzeug",
        modell: "modell",
        fin: "fin",
        auftragNr: "auftragNr",
        eingang: "eingang",
        fertigBis: "fertigBis",
        leitzahl: "leitzahl",
      }

      const orderField = fieldMap[field] || field
      onHeaderDataChange({ [orderField]: value } as Partial<Order>)
    },
    [readOnly, onHeaderDataChange]
  )

  const handleSave = () => {
    onFormDataChange(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handlePrint = () => window.print()

  const handleReset = () => {
    if (confirm("Alle Formulardaten zuruecksetzen?")) {
      setFormData({})
      onFormDataChange({})
    }
  }

  const totalPages = 5

  const RenderPage = ({ page }: { page: number }) => {
    if (page === 1) return <Page01 formData={formData as Record<string, string>} updateField={() => {}} />
    if (page === 2) return <Page02 formData={formData} updateField={() => {}} />
    if (page === 3) return <Page03 formData={formData} updateField={() => {}} />
    if (page === 4) return <Page04 formData={formData} updateField={() => {}} />
    return <Page05 formData={formData as Record<string, string>} updateField={() => {}} />
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">

      {/* ================= PRINT STYLES ================= */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          html,
          body {
            background: #fff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .no-print {
            display: none !important;
          }

          .a4-sheet {
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 2mm !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            break-after: page !important;
            page-break-after: always !important;
          }

          .a4-sheet:last-child {
            break-after: auto !important;
            page-break-after: auto !important;
          }

          .a4-scale {
            transform: scale(0.58);
            transform-origin: top left;
            width: calc(210mm - 12mm);
          }

          [class*="shadow"] {
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* ================= SCREEN VERSION ================= */}
      <div className="no-print">
        <FormHeader
          formData={headerState}
          updateField={readOnly ? () => {} : updateHeaderField}
          currentPage={currentPage}
        />

        <div className={`p-6 ${readOnly ? "opacity-90 pointer-events-none select-none" : ""}`}>
          {currentPage === 1 && <Page01 formData={formData as Record<string, string>} updateField={updateFormField} />}
          {currentPage === 2 && <Page02 formData={formData} updateField={updateFormField} />}
          {currentPage === 3 && <Page03 formData={formData} updateField={updateFormField} />}
          {currentPage === 4 && <Page04 formData={formData} updateField={updateFormField} />}
          {currentPage === 5 && <Page05 formData={formData as Record<string, string>} updateField={updateFormField} />}
        </div>
      </div>

      {/* ================= PRINT VERSION ================= */}
      <div className="hidden print:block">
        {[1, 2, 3, 4, 5].map((p) => (
          <div className="a4-sheet" key={p}>
            <div className="a4-scale">
              <FormHeader formData={headerState} updateField={() => {}} currentPage={p} />
              <div style={{ paddingTop: "5mm" }}>
                <RenderPage page={p} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= NAVIGATION ================= */}
      <div className="flex items-center justify-between p-4 border-t no-print">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Zurück
          </Button>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className={`w-8 h-8 p-0 ${
                  currentPage === page ? "bg-[#1a2234] text-white" : "bg-transparent"
                }`}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="bg-transparent"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Weiter
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {!readOnly ? (
          <div className="flex items-center gap-2">
            <Button onClick={handleReset} variant="outline" size="sm" className="bg-transparent">
              <RotateCcw className="w-4 h-4 mr-2" />
              Zurücksetzen
            </Button>
            <Button onClick={handleSave} variant="outline" size="sm" className="bg-transparent">
              <Save className="w-4 h-4 mr-2" />
              {saved ? "Gespeichert!" : "Speichern"}
            </Button>
            <Button onClick={handlePrint} variant="outline" size="sm" className="bg-transparent">
              <Printer className="w-4 h-4 mr-2" />
              Drucken
            </Button>
          </div>
        ) : (
          <Button onClick={handlePrint} variant="outline" size="sm" className="bg-transparent">
            <Printer className="w-4 h-4 mr-2" />
            Drucken
          </Button>
        )}
      </div>
    </div>
  )
}
