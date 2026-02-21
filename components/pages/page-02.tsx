"use client"

import { FormSection } from "../form/form-section"
import { FormField } from "../form/form-field"
import { CheckboxField } from "../form/checkbox-field"
import { SimpleCheckboxField } from "../form/simple-checkbox-field"

interface Page02Props {
  formData: Record<string, string | boolean>
  updateField: (field: string, value: string | boolean) => void
}

export function Page02({ formData, updateField }: Page02Props) {
  return (
    <>
      {/* TÜRVERKLEIDUNGEN Section */}
      <FormSection title="TÜRVERKLEIDUNGEN">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormField
            label="AUSSENRAHMEN"
            value={(formData.aussenrahmen as string) || ""}
            onChange={(v) => updateField("aussenrahmen", v)}
          />
          <FormField
            label="INLAYS"
            value={(formData.inlays as string) || ""}
            onChange={(v) => updateField("inlays", v)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="STAUFACH"
            value={(formData.staufach as string) || ""}
            onChange={(v) => updateField("staufach", v)}
          />
          <FormField
            label="ARMLEHNE"
            value={(formData.armlehne as string) || ""}
            onChange={(v) => updateField("armlehne", v)}
          />
        </div>
      </FormSection>

      {/* HECKTÜREN Section */}
      <FormSection title="HECKTÜREN">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormField
            label="FENSTERRAHMEN"
            value={(formData.fensterrahmen as string) || ""}
            onChange={(v) => updateField("fensterrahmen", v)}
          />
          <FormField
            label="TÜRVERKLEIDUNG OBEN"
            value={(formData.tuerverkleidungOben as string) || ""}
            onChange={(v) => updateField("tuerverkleidungOben", v)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="TÜRVERKLEIDUNG UNTEN"
            value={(formData.tuerverkleidungUnten as string) || ""}
            onChange={(v) => updateField("tuerverkleidungUnten", v)}
          />
          <FormField
            label="TÜRINLAYS"
            value={(formData.tuerinlays as string) || ""}
            onChange={(v) => updateField("tuerinlays", v)}
          />
        </div>
      </FormSection>

      {/* LENKRAD Section */}
      <FormSection title="LENKRAD">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CheckboxField
            label="LENKRAD"
            value={(formData.lenkrad as string) || ""}
            onChange={(v) => updateField("lenkrad", v)}
            jaChecked={(formData.lenkradJa as boolean) || false}
            neinChecked={(formData.lenkradNein as boolean) || false}
            onJaChange={(v) => updateField("lenkradJa", v)}
            onNeinChange={(v) => updateField("lenkradNein", v)}
          />
          <CheckboxField
            label="AIRBAG"
            value={(formData.airbag as string) || ""}
            onChange={(v) => updateField("airbag", v)}
            jaChecked={(formData.airbagJa as boolean) || false}
            neinChecked={(formData.airbagNein as boolean) || false}
            onJaChange={(v) => updateField("airbagJa", v)}
            onNeinChange={(v) => updateField("airbagNein", v)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <SimpleCheckboxField
            label="SOFTLACK"
            value={(formData.softlackLenkrad as string) || ""}
            onChange={(v) => updateField("softlackLenkrad", v)}
            checked={(formData.softlackLenkradChecked as boolean) || false}
            onCheckedChange={(v) => updateField("softlackLenkradChecked", v)}
          />
          <SimpleCheckboxField
            label="LEDER"
            value={(formData.lederLenkrad as string) || ""}
            onChange={(v) => updateField("lederLenkrad", v)}
            checked={(formData.lederLenkradChecked as boolean) || false}
            onCheckedChange={(v) => updateField("lederLenkradChecked", v)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckboxField
            label="LENKRAD CARBON"
            value={(formData.lenkradCarbon as string) || ""}
            onChange={(v) => updateField("lenkradCarbon", v)}
            jaChecked={(formData.lenkradCarbonJa as boolean) || false}
            neinChecked={(formData.lenkradCarbonNein as boolean) || false}
            onJaChange={(v) => updateField("lenkradCarbonJa", v)}
            onNeinChange={(v) => updateField("lenkradCarbonNein", v)}
          />
        </div>
      </FormSection>
    </>
  )
}
