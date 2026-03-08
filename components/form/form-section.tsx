"use client"

import type { ReactNode } from "react"

interface FormSectionProps {
  title: string
  children: ReactNode
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="mb-6 print:mb-3">
      {/* Main section header with lines */}
      <div className="flex items-center justify-center mb-4 print:mb-2">
        <div className="flex-1 h-px bg-neutral-300 print:bg-gray-400" />
        <div className="bg-foreground text-background px-8 py-2.5 print:px-4 print:py-1.5 rounded-xl font-bold text-sm print:text-xs tracking-wide mx-4">
          {title}
        </div>
        <div className="flex-1 h-px bg-neutral-300 print:bg-gray-400" />
      </div>

      {/* Section Content */}
      <div className="print:gap-1 print:space-y-1">
        {children}
      </div>
    </div>
  )
}
