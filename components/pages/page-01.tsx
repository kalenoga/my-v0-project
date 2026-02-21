"use client"

import { FormSection } from "../form/form-section"
import { FormField } from "../form/form-field"

interface Page01Props {
  formData: Record<string, string>
  updateField: (field: string, value: string) => void
}

export function Page01({ formData, updateField }: Page01Props) {
  return (
    <>
      {/* Allgemeine Informationen Section */}
      <FormSection title="Allgemeine Informationen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <FormField label="LEDER 1" value={formData.leder1 || ""} onChange={(v) => updateField("leder1", v)} />
          <FormField label="LEDER 2" value={formData.leder2 || ""} onChange={(v) => updateField("leder2", v)} />
          <FormField label="ALCANTARA" value={formData.alcantara || ""} onChange={(v) => updateField("alcantara", v)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <FormField label="DESIGN" value={formData.design || ""} onChange={(v) => updateField("design", v)} />
          <FormField
            label="PERFORATION"
            value={formData.perforationInfo || ""}
            onChange={(v) => updateField("perforationInfo", v)}
          />
          <FormField label="LOGO" value={formData.logo || ""} onChange={(v) => updateField("logo", v)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <FormField
            label="NAHTFARBE 1"
            value={formData.nahtfarbe1 || ""}
            onChange={(v) => updateField("nahtfarbe1", v)}
          />
          <FormField
            label="NAHTFARBE 2"
            value={formData.nahtfarbe2 || ""}
            onChange={(v) => updateField("nahtfarbe2", v)}
          />
          <FormField label="BIESE" value={formData.biese || ""} onChange={(v) => updateField("biese", v)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            label="FUSSMATTEN"
            value={formData.fussmattenInfo || ""}
            onChange={(v) => updateField("fussmattenInfo", v)}
          />
        </div>
      </FormSection>

      {/* SITZANLAGEN Section */}
      <FormSection title="SITZANLAGEN">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormField
            label="SITZANLAGE VORNE"
            value={formData.sitzanlageVorne || ""}
            onChange={(v) => updateField("sitzanlageVorne", v)}
          />
          <FormField
            label="SEITLICHER SITZVERKELIDUNG"
            value={formData.seitlicherSitzverkleidung || ""}
            onChange={(v) => updateField("seitlicherSitzverkleidung", v)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="RÜCKENDECKEL"
            value={formData.rueckendeckel || ""}
            onChange={(v) => updateField("rueckendeckel", v)}
          />
          <FormField
            label="SITZANLAGE HINTEN"
            value={formData.sitzanlageHinten || ""}
            onChange={(v) => updateField("sitzanlageHinten", v)}
          />
        </div>
      </FormSection>

      {/* ARMATURENBRETT Section */}
      <FormSection title="ARMATURENBRETT">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="OBEN"
            value={formData.armaturenbrettOben || ""}
            onChange={(v) => updateField("armaturenbrettOben", v)}
          />
          <FormField
            label="UNTEN"
            value={formData.armaturenbrettUnten || ""}
            onChange={(v) => updateField("armaturenbrettUnten", v)}
          />
        </div>
      </FormSection>

      {/* MITTELKONSOLE Section */}
      <FormSection title="MITTELKONSOLE">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="MK-ARMLEHNE"
            value={formData.mkArmlehne || ""}
            onChange={(v) => updateField("mkArmlehne", v)}
          />
          <FormField
            label="MK-HAUPTTEIL"
            value={formData.mkHauptteil || ""}
            onChange={(v) => updateField("mkHauptteil", v)}
          />
        </div>
      </FormSection>
    </>
  )
}
