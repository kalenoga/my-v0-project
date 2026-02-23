"use client"

import { useEffect } from "react"
import { useOrders } from "@/lib/orders-context"
import { PKWProductionFormEmbedded } from "@/components/pkw-production-form-embedded"

export default function AuftragPrintPage({ params }: { params: { id: string } }) {
  const { getOrder } = useOrders()
  const order = getOrder(params.id)

  useEffect(() => {
    // Wichtig: erst rendern lassen, dann Print
    const t = setTimeout(() => {
      // Nur drucken, wenn wir wirklich auf /print sind
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
    <div className="print-only-root">
      {/* NUR das Formular */}
      <PKWProductionFormEmbedded
        order={order}
        onFormDataChange={() => {}}
        onHeaderDataChange={() => {}}
        readOnly={true}
      />

      {/* Hard-Print CSS: Dashboard/Sidebar komplett killen */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }

          html,
          body {
            background: #fff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Alles ausblenden */
          body * {
            visibility: hidden !important;
          }

          /* Nur unser Print-Root sichtbar */
          .print-only-root,
          .print-only-root * {
            visibility: visible !important;
          }

          .print-only-root {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
          }

          /* Alles, was irgendwie "Navigation" sein könnte, niemals drucken */
          nav,
          header,
          footer,
          button,
          a {
            display: none !important;
          }

          /* Schatten raus */
          [class*="shadow"] {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  )
}
