"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Lock, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const success = await login(email, password)

    if (success) {
      router.push("/dashboard")
    } else {
      setError("Ungültige Anmeldedaten oder Benutzer ist deaktiviert.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-background">
      {/* Apple background wash */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,rgba(0,122,255,0.10),transparent_45%),radial-gradient(900px_circle_at_80%_20%,rgba(52,199,89,0.08),transparent_50%),radial-gradient(900px_circle_at_50%_100%,rgba(255,149,0,0.07),transparent_55%)]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Glass card */}
        <div className="glass rounded-3xl border border-border shadow-lg px-8 py-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/ruehl-logo.svg"
              alt="Rühl Automotive"
              width={190}
              height={190}
              priority
              style={{
                filter: "none",
                WebkitFilter: "none",
              }}
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">Willkommen</h1>
            <p className="text-muted-foreground mt-2">
              Bitte melde dich mit deinen Zugangsdaten an.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                E-Mail
              </Label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  placeholder="name@beispiel.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-surface border border-border focus-visible:ring-2 focus-visible:ring-ring/30"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Passwort
              </Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12 bg-surface border border-border focus-visible:ring-2 focus-visible:ring-ring/30"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Passwort vergessen?
              </button>
            </div>

            <Button type="submit" className="w-full h-12 rounded-2xl" disabled={isLoading}>
              {isLoading ? "Anmelden..." : "Anmelden"}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2026 Rühl Automotive. Alle Rechte vorbehalten.
        </p>
      </div>
    </div>
  )
}
