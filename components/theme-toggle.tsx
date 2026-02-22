"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()

  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="rounded-full bg-surface hover:bg-accent"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Theme umschalten"
      title="Theme umschalten"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}