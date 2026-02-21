"use client"

interface SimpleCheckboxFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function SimpleCheckboxField({ label, value, onChange, checked, onCheckedChange }: SimpleCheckboxFieldProps) {
  return (
    <div className="relative border border-neutral-300 rounded-2xl pt-5 pb-3 px-4 min-h-[100px]">
      <div className="absolute -top-3 left-4 right-4 flex items-center justify-between">
        <span className="bg-foreground text-background px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap">
          {label}
        </span>

        <div className="bg-background px-2">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onCheckedChange(e.target.checked)}
            className="w-5 h-5 accent-foreground cursor-pointer"
          />
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-xs resize-none outline-none min-h-[60px] leading-relaxed mt-2"
        placeholder=""
      />
    </div>
  )
}
