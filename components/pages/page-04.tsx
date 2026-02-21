"use client"

import { FormSection } from "../form/form-section"
import { CheckboxField } from "../form/checkbox-field"

interface Page04Props {
  formData: Record<string, string | boolean>
  updateField: (field: string, value: string | boolean) => void
}

export function Page04({ formData, updateField }: Page04Props) {
  const exteriorFields = [
    { key: "aerokit", label: "AEROKIT" },
    { key: "motorosierung", label: "MOTOROSIERUNG" },
    { key: "bremsanlage", label: "BREMSANLAGE" },
    { key: "auspuffanlage", label: "AUSPUFFANLAGE" },
    { key: "verglasung", label: "VERGLASUNG" },
    { key: "felgen", label: "FELGEN" },
    { key: "schriftzuege", label: "SCHRIFTZÜGE" },
    { key: "pinstripes", label: "PINSTRIPES" },
    { key: "trittbretter", label: "TRITTBRETTER" },
    { key: "einstiegsleistenExt", label: "EINSTIEGSLEISTEN" },
    { key: "pedale", label: "PEDALE" },
    { key: "fussmatten", label: "FUßMATTEN" },
    { key: "tuerpins", label: "TÜRPINS" },
    { key: "schaltwippen", label: "SCHALTWIPPEN" },
  ]

  return (
    <>
      {/* EXTERIOR Section */}
      <FormSection title="EXTERIOR">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exteriorFields.map((field) => (
            <CheckboxField
              key={field.key}
              label={field.label}
              value={(formData[field.key] as string) || ""}
              onChange={(v) => updateField(field.key, v)}
              jaChecked={(formData[`${field.key}Ja`] as boolean) || false}
              neinChecked={(formData[`${field.key}Nein`] as boolean) || false}
              onJaChange={(v) => updateField(`${field.key}Ja`, v)}
              onNeinChange={(v) => updateField(`${field.key}Nein`, v)}
            />
          ))}
        </div>
      </FormSection>

      {/* LACK & LASUR Section */}
      <FormSection title="LACK & LASUR">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckboxField
            label="INTERIOR"
            value={(formData.lackInterior as string) || ""}
            onChange={(v) => updateField("lackInterior", v)}
            jaChecked={(formData.lackInteriorJa as boolean) || false}
            neinChecked={(formData.lackInteriorNein as boolean) || false}
            onJaChange={(v) => updateField("lackInteriorJa", v)}
            onNeinChange={(v) => updateField("lackInteriorNein", v)}
          />
          <CheckboxField
            label="EXTERIOR"
            value={(formData.lackExterior as string) || ""}
            onChange={(v) => updateField("lackExterior", v)}
            jaChecked={(formData.lackExteriorJa as boolean) || false}
            neinChecked={(formData.lackExteriorNein as boolean) || false}
            onJaChange={(v) => updateField("lackExteriorJa", v)}
            onNeinChange={(v) => updateField("lackExteriorNein", v)}
          />
        </div>
      </FormSection>

      {/* SOFTLACK Section */}
      <FormSection title="SOFTLACK">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckboxField
            label="STERNENHIMMEL"
            value={(formData.softlackSternenhimmel as string) || ""}
            onChange={(v) => updateField("softlackSternenhimmel", v)}
            jaChecked={(formData.softlackSternenhimmelJa as boolean) || false}
            neinChecked={(formData.softlackSternenhimmelNein as boolean) || false}
            onJaChange={(v) => updateField("softlackSternenhimmelJa", v)}
            onNeinChange={(v) => updateField("softlackSternenhimmelNein", v)}
          />
          <CheckboxField
            label="PERFORATION"
            value={(formData.softlackPerforation as string) || ""}
            onChange={(v) => updateField("softlackPerforation", v)}
            jaChecked={(formData.softlackPerforationJa as boolean) || false}
            neinChecked={(formData.softlackPerforationNein as boolean) || false}
            onJaChange={(v) => updateField("softlackPerforationJa", v)}
            onNeinChange={(v) => updateField("softlackPerforationNein", v)}
          />
        </div>
      </FormSection>
    </>
  )
}
