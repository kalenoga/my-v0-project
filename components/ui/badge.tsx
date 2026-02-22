"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium leading-none ring-1 ring-inset transition-colors",
  {
    variants: {
      variant: {
        neutral: "bg-muted text-foreground/70 ring-border/60",
        info: "bg-[--tint-info] text-[--tint-info-fg] ring-[--tint-info-ring]",
        success:
          "bg-[--tint-success] text-[--tint-success-fg] ring-[--tint-success-ring]",
        warning:
          "bg-[--tint-warning] text-[--tint-warning-fg] ring-[--tint-warning-ring]",
        danger:
          "bg-[--tint-danger] text-[--tint-danger-fg] ring-[--tint-danger-ring]",
        primary:
          "bg-[--tint-primary] text-[--tint-primary-fg] ring-[--tint-primary-ring]",
      },
      size: {
        sm: "px-2.5 py-1 text-[11px]",
        md: "px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}
