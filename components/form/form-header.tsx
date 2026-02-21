"use client"

import Image from "next/image"

interface FormHeaderProps {
  formData: {
    datum: string
    status: string
    fahrzeug: string
    modell: string
    fin: string
    auftragNr: string
    eingang: string
    fertigBis: string
    leitzahl: string
  }
  updateField: (field: string, value: string) => void
  currentPage: number
}

export function FormHeader({ formData, updateField, currentPage }: FormHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      {/* Logo and Title */}
      <div className="flex items-start gap-4 flex-1">
        {/* Rühl Logo */}
        <div className="w-20 h-20 flex-shrink-0">
          <Image src="/ruehl-logo.svg" alt="Rühl Logo" width={80} height={80} className="w-full h-full" />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">
            PKW | PRODUKTIONS-
            <br />
            AUFTRAG
          </h1>

          {/* Leitzahl - Important field */}
          <div className="mt-4 inline-flex items-center border-2 border-foreground rounded-full px-6 py-2">
            <span className="font-bold mr-2">Leitzahl:</span>
            <input
              type="text"
              value={formData.leitzahl}
              onChange={(e) => updateField("leitzahl", e.target.value)}
              className="w-20 bg-transparent font-bold outline-none text-center text-lg"
              placeholder="000"
            />
          </div>
        </div>
      </div>

      {/* Right side metadata */}
      <div className="text-sm space-y-0.5 min-w-[200px]">
        <MetaField label="DATUM:" value={formData.datum} onChange={(v) => updateField("datum", v)} editable />
        <MetaField label="STATUS:" value={formData.status} onChange={(v) => updateField("status", v)} />
        <MetaField label="FAHRZEUG:" value={formData.fahrzeug} onChange={(v) => updateField("fahrzeug", v)} />
        <MetaField label="MODELL:" value={formData.modell} onChange={(v) => updateField("modell", v)} />
        <MetaField label="FIN:" value={formData.fin} onChange={(v) => updateField("fin", v)} />
        <MetaField label="AUFTRAGNR:" value={formData.auftragNr} onChange={(v) => updateField("auftragNr", v)} />
        <MetaField label="EINGANG:" value={formData.eingang} onChange={(v) => updateField("eingang", v)} />
        <MetaField label="FERTIG BIS:" value={formData.fertigBis} onChange={(v) => updateField("fertigBis", v)} />
        <MetaField label="SEITE:" value={`0${currentPage}`} onChange={() => {}} readOnly />
      </div>
    </div>
  )
}

function MetaField({
  label,
  value,
  onChange,
  editable = true,
  readOnly = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  editable?: boolean
  readOnly?: boolean
}) {
  return (
    <div className="flex items-center">
      <span className="font-medium w-24 text-xs tracking-wide">{label}</span>
      {readOnly ? (
        <span className="flex-1 px-1 text-xs">{value}</span>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none px-1 text-xs"
          readOnly={!editable && readOnly}
        />
      )}
    </div>
  )
}
