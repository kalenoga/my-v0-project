
"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { FormHeader } from "./form/form-header"
import { Page01 } from "./pages/page-01"
import { Page02 } from "./pages/page-02"
import { Page03 } from "./pages/page-03"
import { Page04 } from "./pages/page-04"
import { Page05 } from "./pages/page-05"
import { Button } from "@/components/ui/button"
import { Save, Printer, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"

// Print-optimized page wrapper
function PrintPage({ 
  children, 
  pageNumber, 
  formData,
  isLast = false 
}: { 
  children: React.ReactNode
  pageNumber: number
  formData: Record<string, string>
  isLast?: boolean
}) {
  return (
    <div 
      className="print-page bg-white"
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
        formData={formData} 
        updateField={() => {}} 
        currentPage={pageNumber} 
      />
      <div style={{ transform: 'scale(0.85)', transformOrigin: 'top left', width: '117.6%' }}>
        {children}
      </div>
    </div>
  )
}

const getInitialFormData = () => {
  const today = new Date()
  const formattedDate = `${today.getDate().toString().padStart(2, "0")}.${(today.getMonth() + 1).toString().padStart(2, "0")}.${today.getFullYear()}`

  return {
    // Header fields
    datum: formattedDate,
    status: "",
    fahrzeug: "",
    modell: "",
    fin: "",
    auftragNr: "",
    eingang: "",
    fertigBis: "",
    leitzahl: "",
  }
}

export function PKWProductionForm() {
  const [formData, setFormData] = useState<Record<string, string | boolean>>(getInitialFormData())
  const [saved, setSaved] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [showPrintView, setShowPrintView] = useState(false)

  const updateField = useCallback((field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setSaved(false)
  }, [])

  const handleSave = useCallback(() => {
    localStorage.setItem("pkw-production-form", JSON.stringify(formData))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [formData])

  const handlePrint = useCallback(() => {
    setShowPrintView(true)
    setTimeout(() => {
      window.print()
      setTimeout(() => setShowPrintView(false), 500)
    }, 100)
  }, [])

  const handleReset = useCallback(() => {
    setFormData(getInitialFormData())
    localStorage.removeItem("pkw-production-form")
  }, [])

  useEffect(() => {
    const savedData = localStorage.getItem("pkw-production-form")
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (e) {
        console.error("Failed to load saved form data")
      }
    }
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <Page01 formData={formData as Record<string, string>} updateField={updateField} />
      case 2:
        return <Page02 formData={formData} updateField={updateField} />
      case 3:
        return <Page03 formData={formData} updateField={updateField} />
      case 4:
        return <Page04 formData={formData} updateField={updateField} />
      case 5:
        return <Page05 formData={formData as Record<string, string>} updateField={updateField} />
      default:
        return <Page01 formData={formData as Record<string, string>} updateField={updateField} />
    }
  }

  // Print view renders all 5 pages with proper A4 formatting
  if (showPrintView) {
    const headerData = formData as Record<string, string>
    return (
      <div className="print-container">
        <PrintPage pageNumber={1} formData={headerData}>
          <Page01 formData={headerData} updateField={() => {}} />
        </PrintPage>
        <PrintPage pageNumber={2} formData={headerData}>
          <Page02 formData={formData} updateField={() => {}} />
        </PrintPage>
        <PrintPage pageNumber={3} formData={headerData}>
          <Page03 formData={formData} updateField={() => {}} />
        </PrintPage>
        <PrintPage pageNumber={4} formData={headerData}>
          <Page04 formData={formData} updateField={() => {}} />
        </PrintPage>
        <PrintPage pageNumber={5} formData={headerData} isLast>
          <Page05 formData={headerData} updateField={() => {}} />
        </PrintPage>
      </div>
    )
  }

  return (
    <div className="max-w-[1000px] mx-auto bg-background print:hidden">
      {/* Action buttons - hidden on print */}
      <div className="flex flex-wrap gap-2 mb-4 print:hidden items-center justify-between">
        <div className="flex gap-2">
          <Button onClick={handleSave} variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            {saved ? "Gespeichert!" : "Speichern"}
          </Button>
          <Button onClick={handlePrint} variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Drucken
          </Button>
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Zurücksetzen
          </Button>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="w-8 h-8 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(5, p + 1))}
            variant="outline"
            size="sm"
            disabled={currentPage === 5}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Form Container */}
      <div className="border border-neutral-200 rounded-3xl p-6 print:border print:p-4 shadow-sm">
        <FormHeader formData={formData as Record<string, string>} updateField={updateField} currentPage={currentPage} />

        {/* Render current page content */}
        {renderPage()}
      </div>
    </div>
  )
}
