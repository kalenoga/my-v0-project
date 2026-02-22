"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText, Users, Lock, LogOut, Menu } from "lucide-react"

export function DashboardHeader() {
  const { logout } = useAuth()
  const router = useRouter()

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 sticky top-0 z-10">
      <button className="lg:hidden p-2 hover:bg-muted rounded-lg">
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          className="bg-[#1a2234] hover:bg-[#2a3244] text-white"
          onClick={() => router.push("/dashboard/auftraege")}
        >
          <FileText className="w-4 h-4 mr-2" />
          Aufträge
        </Button>
        <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/benutzer")}>
          <Users className="w-4 h-4 mr-2" />
          Benutzer
        </Button>
        <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/passwort")}>
          <Lock className="w-4 h-4 mr-2" />
          Passwort
        </Button>
        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  )
}
