// app/dashboard/auftraege/[id]/print/page.tsx
"use client"

import { useEffect } from "react"
import { useOrders } from "@/lib/orders-context"
import { PKWProductionFormEmbedded } from "@/components/pkw-production-form-embedded"

export default function AuftragPrintPage({ params }: { params: { id: string } }) {
  const { getOrder } = useOrders()
  const order = getOrder(params.id)

  useEffect(() => {
    // Erst rendern lassen, dann drucken
    const t = setTimeout(() => {
      // Sicherheitscheck: Nur drucken, wenn wir wirklich auf /print sind
      if (!window.location.pathname.endsWith("/print")) return
      window.print()
    }, 600)

    return () => clearTimeout(t)
  }, [])

  if (!order) {
    return (
      <div style={{ padding: 24 }}>
        <p style={{ fontSize: 14, color: "#666" }}>Auftrag nicht gefunden.</p>
      </div>
    )
  }

  return (
    <>
      {/* NUR Print-Inhalt */}
      <div className="print-root">
        <PKWProductionFormEmbedded
          order={order}
          onFormDataChange={() => {}}
          onHeaderDataChange={() => {}}
          readOnly={true}
        />
      </div>

      {/* Print-CSS: A4 fix, nichts abgeschnitten, keine Dashboard-UI */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: #fff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Alles verstecken */
          body * {
            visibility: hidden !important;
          }

          /* Nur print-root anzeigen */
          .print-root,
          .print-root * {
            visibility: visible !important;
          }

          /* Druck oben links fixieren + A4 Breite */
          .print-root {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
          }

          /* Verhindert: Boxen werden in der Mitte geteilt */
          .avoid-break {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          /* Verhindert: FIN / IDs werden senkrecht umgebrochen */
          .no-wrap {
            white-space: nowrap !important;
            word-break: keep-all !important;
            overflow-wrap: normal !important;
          }

          /* Generell: normaler Umbruch (kein break-all) */
          .print-root,
          .print-root * {
            word-break: normal !important;
            overflow-wrap: normal !important;
          }
        }
      `}</style>
    </>
  )
}
