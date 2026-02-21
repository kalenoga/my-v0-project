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
    <div className="relative border border-neutral-300 rounded-2xl pt-5 pb-3 px-4 min-h-[100px]">
      <div className="absolute -top-3 left-4 right-4 flex items-center justify-between">
        <span className="bg-foreground text-background px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap">
          {label}
        </span>

        <div className="flex items-center gap-2 bg-background px-2">
          <span className="flex items-center gap-1 text-xs font-medium">
            JA
            <input
              type="checkbox"
              checked={jaChecked}
              onChange={(e) => {
                const newVal = e.target.checked
                onJaChange(newVal)
                if (newVal) onNeinChange(false)
              }}
              className="w-5 h-5 accent-foreground cursor-pointer"
            />
          </span>
          <span className="flex items-center gap-1 text-xs font-medium">
            NEIN
            <input
              type="checkbox"
              checked={neinChecked}
              onChange={(e) => {
                const newVal = e.target.checked
                onNeinChange(newVal)
                if (newVal) onJaChange(false)
              }}
              className="w-5 h-5 accent-foreground cursor-pointer"
            />
          </span>
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
