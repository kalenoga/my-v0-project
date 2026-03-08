"use client"

interface CheckboxFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  jaChecked: boolean
  neinChecked: boolean
  onJaChange: (checked: boolean) => void
  onNeinChange: (checked: boolean) => void
}

export function CheckboxField({
  label,
  value,
  onChange,
  jaChecked,
  neinChecked,
  onJaChange,
  onNeinChange,
}: CheckboxFieldProps) {
  return (
    <div className="relative border border-neutral-300 rounded-2xl print:rounded pt-5 print:pt-3 pb-3 print:pb-1.5 px-4 print:px-2 min-h-[100px] print:min-h-[25px]">
      <div className="absolute -top-3 print:-top-2 left-4 print:left-2 right-4 flex items-center justify-between">
        <span className="bg-foreground text-background px-4 print:px-2 py-1.5 print:py-0.5 rounded-full text-xs print:text-7px font-bold whitespace-nowrap">
          {label}
        </span>

        <div className="flex items-center gap-2 print:gap-1 bg-background print:bg-white px-2 print:px-0.5">
          <span className="flex items-center gap-1 print:gap-0.5 text-xs print:text-7px font-medium">
            JA
            <input
              type="checkbox"
              checked={jaChecked}
              onChange={(e) => {
                const newVal = e.target.checked
                onJaChange(newVal)
                if (newVal) onNeinChange(false)
              }}
              className="w-5 h-5 print:w-3 print:h-3 accent-foreground cursor-pointer"
            />
          </span>
          <span className="flex items-center gap-1 print:gap-0.5 text-xs print:text-7px font-medium">
            NEIN
            <input
              type="checkbox"
              checked={neinChecked}
              onChange={(e) => {
                const newVal = e.target.checked
                onNeinChange(newVal)
                if (newVal) onJaChange(false)
              }}
              className="w-5 h-5 print:w-3 print:h-3 accent-foreground cursor-pointer"
            />
          </span>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-xs print:text-8px resize-none outline-none min-h-[60px] print:min-h-[15px] leading-relaxed print:leading-tight mt-2 print:mt-0.5"
        placeholder=""
      />
    </div>
  )
}
