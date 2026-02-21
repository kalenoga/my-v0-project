"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LayoutDashboard, Save, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function PasswortPage() {
  const { user, changePassword } = useAuth()
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("idle")
    setMessage("")

    if (newPassword !== confirmPassword) {
      setStatus("error")
      setMessage("Die neuen Passwörter stimmen nicht überein.")
      return
    }

    if (newPassword.length < 6) {
      setStatus("error")
      setMessage("Das neue Passwort muss mindestens 6 Zeichen lang sein.")
      return
    }

    setIsLoading(true)
    const success = await changePassword(oldPassword, newPassword)
    setIsLoading(false)

    if (success) {
      setStatus("success")
      setMessage("Dein Passwort wurde erfolgreich geändert.")
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } else {
      setStatus("error")
      setMessage("Das aktuelle Passwort ist falsch.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Start</p>
          <h1 className="text-3xl font-bold">Passwort ändern</h1>
          <p className="text-muted-foreground mt-1">Ändere dein persönliches Passwort.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Link>
        </Button>
      </div>

      {/* Password Form */}
      <div className="max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Neues Passwort setzen</CardTitle>
            <CardDescription>
              Angemeldet als: <strong>{user?.email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="old-password">Aktuelles Passwort</Label>
                <Input
                  id="old-password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Neues Passwort</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Neues Passwort bestätigen</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {status !== "idle" && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg ${status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                >
                  {status === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  {message}
                </div>
              )}

              <Button type="submit" className="w-full bg-[#1a2234] hover:bg-[#2a3244] text-white" disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Wird gespeichert..." : "Passwort ändern"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
