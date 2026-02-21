"use client"

import { FormSection } from "../form/form-section"
import { FormField } from "../form/form-field"
import { CheckboxField } from "../form/checkbox-field"

interface Page03Props {
  formData: Record<string, string | boolean>
  updateField: (field: string, value: string | boolean) => void
}

export function Page03({ formData, updateField }: Page03Props) {
  return (
    <>
      {/* HIMMEL Section */}
      <FormSection title="HIMMEL">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormField
            label="HIMMEL"
            value={(formData.himmel as string) || ""}
            onChange={(v) => updateField("himmel", v)}
          />
          <FormField
            label="A-B-C SÄULEN"
            value={(formData.abcSaeulen as string) || ""}
            onChange={(v) => updateField("abcSaeulen", v)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormField
            label="SONNENBLENDEN"
            value={(formData.sonnenblenden as string) || ""}
            onChange={(v) => updateField("sonnenblenden", v)}
          />
          <FormField
            label="SCHIEBEDACH"
            value={(formData.schiebedach as string) || ""}
            onChange={(v) => updateField("schiebedach", v)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CheckboxField
            label="STERNENHIMMEL"
            value={(formData.himmelSternenhimmel as string) || ""}
            onChange={(v) => updateField("himmelSternenhimmel", v)}
            jaChecked={(formData.himmelSternenhimmelJa as boolean) || false}
            neinChecked={(formData.himmelSternenhimmelNein as boolean) || false}
            onJaChange={(v) => updateField("himmelSternenhimmelJa", v)}
            onNeinChange={(v) => updateField("himmelSternenhimmelNein", v)}
          />
          <CheckboxField
            label="PERFORATION"
            value={(formData.himmelPerforation as string) || ""}
            onChange={(v) => updateField("himmelPerforation", v)}
            jaChecked={(formData.himmelPerforationJa as boolean) || false}
            neinChecked={(formData.himmelPerforationNein as boolean) || false}
            onJaChange={(v) => updateField("himmelPerforationJa", v)}
            onNeinChange={(v) => updateField("himmelPerforationNein", v)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckboxField
            label="STERNSCHNUPPE"
            value={(formData.sternschnuppe as string) || ""}
            onChange={(v) => updateField("sternschnuppe", v)}
            jaChecked={(formData.sternschnuppeJa as boolean) || false}
            neinChecked={(formData.sternschnuppeNein as boolean) || false}
            onJaChange={(v) => updateField("sternschnuppeJa", v)}
            onNeinChange={(v) => updateField("sternschnuppeNein", v)}
          />
          <CheckboxField
            label="DACHKONSOLE"
            value={(formData.dachkonsole as string) || ""}
            onChange={(v) => updateField("dachkonsole", v)}
            jaChecked={(formData.dachkonsoleJa as boolean) || false}
            neinChecked={(formData.dachkonsoleNein as boolean) || false}
            onJaChange={(v) => updateField("dachkonsoleJa", v)}
            onNeinChange={(v) => updateField("dachkonsoleNein", v)}
          />
        </div>
      </FormSection>

      {/* EINSTIEGSLEISTEN Section */}
      <FormSection title="EINSTIEGSLEISTEN">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="FAHRER-BEIFAHRER VORNE"
            value={(formData.fahrerBeifahrerVorne as string) || ""}
            onChange={(v) => updateField("fahrerBeifahrerVorne", v)}
          />
          <FormField
            label="FAHRER-BEIFAHRER HINTEN"
            value={(formData.fahrerBeifahrerHinten as string) || ""}
            onChange={(v) => updateField("fahrerBeifahrerHinten", v)}
          />
        </div>
      </FormSection>

      {/* TEPPICHBODEN Section */}
      <FormSection title="TEPPICHBODEN">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <CheckboxField
            label="STERNENHIMMEL"
            value={(formData.teppichSternenhimmel1 as string) || ""}
            onChange={(v) => updateField("teppichSternenhimmel1", v)}
            jaChecked={(formData.teppichSternenhimmel1Ja as boolean) || false}
            neinChecked={(formData.teppichSternenhimmel1Nein as boolean) || false}
            onJaChange={(v) => updateField("teppichSternenhimmel1Ja", v)}
            onNeinChange={(v) => updateField("teppichSternenhimmel1Nein", v)}
          />
          <CheckboxField
            label="PERFORATION"
            value={(formData.teppichPerforation1 as string) || ""}
            onChange={(v) => updateField("teppichPerforation1", v)}
            jaChecked={(formData.teppichPerforation1Ja as boolean) || false}
            neinChecked={(formData.teppichPerforation1Nein as boolean) || false}
            onJaChange={(v) => updateField("teppichPerforation1Ja", v)}
            onNeinChange={(v) => updateField("teppichPerforation1Nein", v)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckboxField
            label="STERNENHIMMEL"
            value={(formData.teppichSternenhimmel2 as string) || ""}
            onChange={(v) => updateField("teppichSternenhimmel2", v)}
            jaChecked={(formData.teppichSternenhimmel2Ja as boolean) || false}
            neinChecked={(formData.teppichSternenhimmel2Nein as boolean) || false}
            onJaChange={(v) => updateField("teppichSternenhimmel2Ja", v)}
            onNeinChange={(v) => updateField("teppichSternenhimmel2Nein", v)}
          />
          <CheckboxField
            label="PERFORATION"
            value={(formData.teppichPerforation2 as string) || ""}
            onChange={(v) => updateField("teppichPerforation2", v)}
            jaChecked={(formData.teppichPerforation2Ja as boolean) || false}
            neinChecked={(formData.teppichPerforation2Nein as boolean) || false}
            onJaChange={(v) => updateField("teppichPerforation2Ja", v)}
            onNeinChange={(v) => updateField("teppichPerforation2Nein", v)}
          />
        </div>
      </FormSection>

      {/* CARBON Section */}
      <FormSection title="CARBON">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CheckboxField
            label="INTERIOR"
            value={(formData.carbonInterior as string) || ""}
            onChange={(v) => updateField("carbonInterior", v)}
            jaChecked={(formData.carbonInteriorJa as boolean) || false}
            neinChecked={(formData.carbonInteriorNein as boolean) || false}
            onJaChange={(v) => updateField("carbonInteriorJa", v)}
            onNeinChange={(v) => updateField("carbonInteriorNein", v)}
          />
          <CheckboxField
            label="EXTERIOR"
            value={(formData.carbonExterior as string) || ""}
            onChange={(v) => updateField("carbonExterior", v)}
            jaChecked={(formData.carbonExteriorJa as boolean) || false}
            neinChecked={(formData.carbonExteriorNein as boolean) || false}
            onJaChange={(v) => updateField("carbonExteriorJa", v)}
            onNeinChange={(v) => updateField("carbonExteriorNein", v)}
          />
        </div>
      </FormSection>
    </>
  )
}
