
"use client"

import { useEffect } from "react"
import { useOrders } from "@/lib/orders-context"
import { PKWProductionFormEmbedded } from "@/components/pkw-production-form-embedded"

export default function AuftragPrintPage({ params }: { params: { id: string } }) {
  const { getOrder } = useOrders()
  const order = getOrder(params.id)

  useEffect(() => {
    // kleinen Delay, damit der Inhalt erst rendert bevor der Druckdialog kommt
    const t = setTimeout(() => {
      window.print()
    }, 300)

    return () => clearTimeout(t)
  }, [])

  if (!order) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Auftrag nicht gefunden.</p>
      </div>
    )
  }

  return (
    <div className="bg-white text-black">
      {/* NUR der Inhalt wird gedruckt */}
      <div className="print-area">
        <PKWProductionFormEmbedded
          order={order}
          onFormDataChange={() => {}}
          onHeaderDataChange={() => {}}
          readOnly={true}
        />
      </div>

      {/* Print-Styles direkt in die Seite eingebettet (damit du nichts anderes anfassen musst) */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm;
          }

          html,
          body {
            background: #ffffff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            height: auto !important;
          }

          /* Alles ausblenden */
          body * {
            visibility: hidden;
          }

          /* Nur print-area anzeigen */
          .print-area,
          .print-area * {
            visibility: visible;
          }

          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
          }

          /* Keine Schatten im Druck */
          .print-area [class*="shadow"] {
            box-shadow: none !important;
          }

          /* Falls irgendwas sticky/fixed ist */
          .print-area [class*="sticky"],
          .print-area [class*="fixed"] {
            position: static !important;
          }
        }
      `}</style>
    </div>
  )
}
