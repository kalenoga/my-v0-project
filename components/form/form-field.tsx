"use client"

interface FormFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function FormField({ label, value, onChange }: FormFieldProps) {
  return (
    <div className="relative border border-neutral-300 rounded-2xl print:rounded pt-5 pb-3 px-4 print:px-2 min-h-[100px] print:min-h-[30px]">
      {/* Label badge positioned on top of the border */}
      <div className="absolute -top-3 print:-top-2 left-4 print:left-2">
        <span className="bg-foreground text-background px-4 py-1.5 print:px-2 print:py-0.5 rounded-full text-xs print:text-7px font-bold whitespace-nowrap">
          {label}
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-xs print:text-8px resize-none outline-none min-h-[60px] print:min-h-[20px] leading-relaxed print:leading-tight mt-1 print:mt-0.5"
        placeholder=""
      />
    </div>
  )
}
