"use client"

import { FormSection } from "../form/form-section"

interface Page05Props {
  formData: Record<string, string>
  updateField: (field: string, value: string) => void
}

export function Page05({ formData, updateField }: Page05Props) {
  return (
    <>
      {/* SONSTIGES | INFORMATIONEN Section */}
      <FormSection title="SONSTIGES | INFORMATIONEN">
        <div className="border border-neutral-300 rounded-2xl p-4 min-h-[500px]">
          <textarea
            value={formData.sonstigesInformationen || ""}
            onChange={(e) => updateField("sonstigesInformationen", e.target.value)}
            className="w-full h-full bg-transparent text-sm resize-none outline-none min-h-[480px] leading-relaxed"
            placeholder=""
          />
        </div>
      </FormSection>
    </>
  )
}
