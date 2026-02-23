"use client"

import { useEffect } from "react"
import { useOrders } from "@/lib/orders-context"
import { PKWProductionFormEmbedded } from "@/components/pkw-production-form-embedded"

export default function AuftragPrintPage({ params }: { params: { id: string } }) {
  const { getOrder } = useOrders()
  const order = getOrder(params.id)

  useEffect(() => {
    const t = setTimeout(() => {
      const el = document.getElementById("print-root")
      if (!el) return

      const w = window.open("", "_blank", "width=900,height=1200")
      if (!w) return

      w.document.open()
      w.document.write(`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Druck</title>
            <style>
              @page { size: A4; margin: 12mm; }
              html, body { margin: 0; padding: 0; background: #fff; }
              * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

              /* A4 Breite */
              .sheet { width: 210mm; margin: 0 auto; }

              /* Verhindert hässliche Teilungen */
              .avoid-break { break-inside: avoid; page-break-inside: avoid; }

              /* Schatten entfernen */
              [class*="shadow"] { box-shadow: none !important; }
            </style>
          </head>
          <body>
            <div class="sheet">
              ${el.innerHTML}
            </div>
          </body>
        </html>
      `)
      w.document.close()

      w.focus()
      w.print()

      // optional schließen
      setTimeout(() => w.close(), 400)
    }, 700)

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
      {/* Das ist nur die Quelle, die ins Druckfenster kopiert wird */}
      <div id="print-root">
        <PKWProductionFormEmbedded
          order={order}
          onFormDataChange={() => {}}
          onHeaderDataChange={() => {}}
          readOnly={true}
        />
      </div>

      {/* Bildschirmhinweis */}
      <div className="p-6 print:hidden">
        <p className="text-sm text-muted-foreground">Druckansicht wird geöffnet…</p>
      </div>
    </div>
  )
}
