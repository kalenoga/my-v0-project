"use client"

import type { ReactNode } from "react"

interface FormSectionProps {
  title: string
  children: ReactNode
}

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="mb-8">
      {/* Main section header with lines */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex-1 h-px bg-neutral-300" />
        <div className="bg-foreground text-background px-8 py-2.5 rounded-xl font-bold text-sm tracking-wide mx-4">
          {title}
        </div>
        <div className="flex-1 h-px bg-neutral-300" />
      </div>

      {/* Section Content */}
      {children}
    </div>
  )
}
