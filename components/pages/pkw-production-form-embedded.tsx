
"use client"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { FormHeader } from "@/components/form/form-header"
import { Page01 } from "@/components/pages/page-01"
import { Page02 } from "@/components/pages/page-02"
import { Page03 } from "@/components/pages/page-03"
import { Page04 } from "@/components/pages/page-04"
import { Page05 } from "@/components/pages/page-05"
import { ChevronLeft, ChevronRight, Save, Printer, RotateCcw } from "lucide-react"
import type { Order } from "@/lib/orders-context"

// Print-optimized page wrapper component
function PrintPage({ 
  children, 
  pageNumber, 
  headerState, 
  isLast = false 
}: { 
  children: React.ReactNode
  pageNumber: number
  headerState: Record<string, string>
  isLast?: boolean
}) {
  return (
    <div 
      className={`print-page bg-white ${!isLast ? 'page-break-after' : ''}`}
      style={{
        width: '190mm',
        minHeight: '277mm',
        maxHeight: '277mm',
        padding: '5mm',
        boxSizing: 'border-box',
        overflow: 'hidden',
        pageBreakAfter: isLast ? 'auto' : 'always',
        pageBreakInside: 'avoid',
      }}
    >
      <FormHeader 
        formData={headerState as any} 
        updateField={() => {}} 
        currentPage={pageNumber} 
      />
      <div style={{ transform: 'scale(0.85)', transformOrigin: 'top left', width: '117.6%' }}>
        {children}
      </div>
    </div>
  )
}

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

  const updateFormField = useCallback((field: string, value: string | boolean) => {
    if (readOnly) return
    setFormData(prev => {
      const updated = { ...prev, [field]: value }
      onFormDataChange(updated)
      return updated
    })
  }, [readOnly, onFormDataChange])

  const updateHeaderField = useCallback((field: string, value: string) => {
    if (readOnly) return
    setHeaderState(prev => ({ ...prev, [field]: value }))
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
  }, [readOnly, onHeaderDataChange])

  const handleSave = () => {
    onFormDataChange(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const [showPrintView, setShowPrintView] = useState(false)
  const printContainerRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    setShowPrintView(true)
    setTimeout(() => {
      window.print()
      setTimeout(() => setShowPrintView(false), 500)
    }, 100)
  }

  const handleReset = () => {
    if (confirm("Alle Formulardaten zuruecksetzen?")) {
      setFormData({})
      onFormDataChange({})
    }
  }

  const totalPages = 5

  // Print view renders all 5 pages
  if (showPrintView) {
    return (
      <div ref={printContainerRef} className="print-container">
        <PrintPage pageNumber={1} headerState={headerState}>
          <Page01 formData={formData as Record<string, string>} updateField={() => {}} />
        </PrintPage>
        <PrintPage pageNumber={2} headerState={headerState}>
          <Page02 formData={formData} updateField={() => {}} />
        </PrintPage>
        <PrintPage pageNumber={3} headerState={headerState}>
          <Page03 formData={formData} updateField={() => {}} />
        </PrintPage>
        <PrintPage pageNumber={4} headerState={headerState}>
          <Page04 formData={formData} updateField={() => {}} />
        </PrintPage>
        <PrintPage pageNumber={5} headerState={headerState} isLast>
          <Page05 formData={formData as Record<string, string>} updateField={() => {}} />
        </PrintPage>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border print:hidden">
      {/* Form Header */}
      <FormHeader
        formData={headerState}
        updateField={readOnly ? () => {} : updateHeaderField}
        currentPage={currentPage}
      />

      {/* Page Content */}
      <div className={`p-6 print:p-4 ${readOnly ? "opacity-90 pointer-events-none select-none" : ""}`}>
        {currentPage === 1 && (
          <Page01 formData={formData as Record<string, string>} updateField={updateFormField} />
        )}
        {currentPage === 2 && (
          <Page02 formData={formData} updateField={updateFormField} />
        )}
        {currentPage === 3 && (
          <Page03 formData={formData} updateField={updateFormField} />
        )}
        {currentPage === 4 && (
          <Page04 formData={formData} updateField={updateFormField} />
        )}
        {currentPage === 5 && (
          <Page05 formData={formData as Record<string, string>} updateField={updateFormField} />
        )}
      </div>

      {/* Navigation & Actions */}
      <div className="flex items-center justify-between p-4 border-t print:hidden">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {"Zurück"}
          </Button>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className={`w-8 h-8 p-0 ${currentPage === page ? "bg-[#1a2234] text-white" : "bg-transparent"}`}
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

        {!readOnly && (
          <div className="flex items-center gap-2">
            <Button onClick={handleReset} variant="outline" size="sm" className="bg-transparent">
              <RotateCcw className="w-4 h-4 mr-2" />
              {"Zurücksetzen"}
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
        )}

        {readOnly && (
          <Button onClick={handlePrint} variant="outline" size="sm" className="bg-transparent">
            <Printer className="w-4 h-4 mr-2" />
            Drucken
          </Button>
        )}
      </div>
    </div>
  )
}
