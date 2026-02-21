"use client"

interface FormFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function FormField({ label, value, onChange }: FormFieldProps) {
  return (
    <div className="relative border border-neutral-300 rounded-2xl pt-5 pb-3 px-4 min-h-[100px]">
      {/* Label badge positioned on top of the border */}
      <div className="absolute -top-3 left-4">
        <span className="bg-foreground text-background px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap">
          {label}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-xs resize-none outline-none min-h-[60px] leading-relaxed mt-1"
        placeholder=""
      />
    </div>
  )
}
