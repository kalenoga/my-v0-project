"use client"

import type React from "react"

import { Suspense, useMemo, useState, useEffect } from "react"
import { useAuth, type User } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { LayoutDashboard, UserPlus, Search, RotateCcw, Pencil, Key, UserX, UserCheck } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

function BenutzerContent() {
  const router = useRouter()
  const { users, user: currentUser, addUser, updateUser, resetPassword } = useAuth()

  const isAdmin = currentUser?.role === "admin"

  // Optional: Wenn nicht eingeloggt, weg navigieren
  useEffect(() => {
    if (!currentUser) {
      router.push("/login")
    }
  }, [currentUser, router])

  // Shared state
  const [search, setSearch] = useState("")
  const [showNewUserDialog, setShowNewUserDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    role: "user" as "admin" | "user",
    password: "",
  })
  const [newPassword, setNewPassword] = useState("")

  const filteredUsers = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase()),
    )
  }, [users, search])

  // ---------- Guards (Defense in depth) ----------
  const canEditUser = (u: User) => isAdmin
  const canToggleStatus = (u: User) => isAdmin && u.id !== currentUser?.id
  const canResetPasswordFor = (u: User) => isAdmin || u.id === currentUser?.id

  // ---------- Handlers ----------
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAdmin) return

    addUser(
      {
        name: newUserData.name,
        email: newUserData.email,
        role: newUserData.role,
        status: "aktiv",
      },
      newUserData.password,
    )
    setShowNewUserDialog(false)
    setNewUserData({ name: "", email: "", role: "user", password: "" })
  }

  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAdmin) return

    if (selectedUser) {
      updateUser(selectedUser.id, {
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
      })
      setShowEditDialog(false)
      setSelectedUser(null)
    }
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser || !newPassword) return
    if (!canResetPasswordFor(selectedUser)) return

    resetPassword(selectedUser.id, newPassword)
    setShowPasswordDialog(false)
    setSelectedUser(null)
    setNewPassword("")
  }

  const handleToggleStatus = (user: User) => {
    if (!canToggleStatus(user)) return
    const newStatus = user.status === "aktiv" ? "deaktiv" : "aktiv"
    updateUser(user.id, { status: newStatus })
  }

  const getRoleBadge = (role: string) => {
    if (role === "admin") {
      return <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">admin</span>
    }
    return <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">user</span>
  }

  const getStatusBadge = (status: string) => {
    if (status === "aktiv") {
      return <span className="px-3 py-1 rounded text-xs font-medium bg-green-100 text-green-700">aktiv</span>
    }
    return <span className="px-3 py-1 rounded text-xs font-medium bg-red-100 text-red-700">deaktiv</span>
  }

  // =========================
  // NON-ADMIN VIEW (nur eigenes Passwort ändern)
  // =========================
  if (currentUser && !isAdmin) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Start</p>
            <h1 className="text-3xl font-bold">Mein Konto</h1>
            <p className="text-muted-foreground mt-1">Du kannst nur dein eigenes Passwort ändern.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Konto-Card */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="text-sm">
              <div className="font-medium">{currentUser.name}</div>
              <div className="text-muted-foreground">{currentUser.email}</div>
              <div className="mt-2">{getRoleBadge(currentUser.role)}</div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedUser(currentUser)
                  setShowPasswordDialog(true)
                }}
              >
                <Key className="w-4 h-4 mr-2" />
                Passwort ändern
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Password Reset Dialog (nur für sich selbst) */}
        <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Passwort ändern</DialogTitle>
              <DialogDescription>Setze ein neues Passwort für dein Konto.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleResetPassword} className="space-y-4">
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
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowPasswordDialog(false)}>
                  Abbrechen
                </Button>
                <Button type="submit" className="bg-[#1a2234] hover:bg-[#2a3244] text-white">
                  Passwort speichern
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // =========================
  // ADMIN VIEW (volle Benutzerverwaltung)
  // =========================
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Start</p>
          <h1 className="text-3xl font-bold">Benutzerverwaltung</h1>
          <p className="text-muted-foreground mt-1">Benutzer anlegen, bearbeiten, aktivieren/deaktivieren.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-[#1a2234] hover:bg-[#2a3244] text-white" onClick={() => setShowNewUserDialog(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Neuer Benutzer
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Suche</label>
              <Input
                placeholder="Name, E-Mail oder Rolle..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button className="bg-[#1a2234] hover:bg-[#2a3244] text-white">
                <Search className="w-4 h-4 mr-2" />
                Suchen
              </Button>
              <Button variant="outline" onClick={() => setSearch("")}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">ID</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">NAME</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">E-MAIL</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">ROLLE</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">STATUS</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">ERSTELLT</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">AKTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="p-4">{u.id}</td>
                    <td className="p-4 font-medium">{u.name}</td>
                    <td className="p-4 text-sm">{u.email}</td>
                    <td className="p-4">{getRoleBadge(u.role)}</td>
                    <td className="p-4">{getStatusBadge(u.status)}</td>
                    <td className="p-4 text-sm">{u.createdAt}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        {canEditUser(u) && (
                          <Button
                            size="sm"
                            className="bg-[#1a2234] hover:bg-[#2a3244] text-white"
                            onClick={() => {
                              setSelectedUser(u)
                              setShowEditDialog(true)
                            }}
                          >
                            <Pencil className="w-4 h-4 mr-1" />
                            Bearbeiten
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedUser(u)
                            setShowPasswordDialog(true)
                          }}
                        >
                          <Key className="w-4 h-4 mr-1" />
                          Passwort Reset
                        </Button>

                        {canToggleStatus(u) && (
                          <Button
                            size="sm"
                            variant="outline"
                            className={
                              u.status === "aktiv"
                                ? "text-red-500 hover:text-red-600 hover:bg-red-50 bg-transparent"
                                : "text-green-500 hover:text-green-600 hover:bg-green-50 bg-transparent"
                            }
                            onClick={() => handleToggleStatus(u)}
                          >
                            {u.status === "aktiv" ? (
                              <>
                                <UserX className="w-4 h-4 mr-1" />
                                Deaktivieren
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-1" />
                                Aktivieren
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* New User Dialog (Admin only) */}
      <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Neuer Benutzer</DialogTitle>
            <DialogDescription>Erstelle einen neuen Benutzer für das System.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newUserData.name}
                onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                value={newUserData.email}
                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rolle</Label>
              <select
                id="role"
                value={newUserData.role}
                onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as "admin" | "user" })}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="user">Benutzer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={newUserData.password}
                onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowNewUserDialog(false)}>
                Abbrechen
              </Button>
              <Button type="submit" className="bg-[#1a2234] hover:bg-[#2a3244] text-white">
                Benutzer erstellen
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog (Admin only) */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Benutzer bearbeiten</DialogTitle>
            <DialogDescription>Bearbeite die Daten des Benutzers.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <form onSubmit={handleEditUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">E-Mail</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">Rolle</Label>
                <select
                  id="edit-role"
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value as "admin" | "user" })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="user">Benutzer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)}>
                  Abbrechen
                </Button>
                <Button type="submit" className="bg-[#1a2234] hover:bg-[#2a3244] text-white">
                  Speichern
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Password Reset Dialog (Admin + self allowed) */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Passwort zurücksetzen</DialogTitle>
            <DialogDescription>Setze ein neues Passwort für {selectedUser?.name}.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetPassword} className="space-y-4">
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
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowPasswordDialog(false)}>
                Abbrechen
              </Button>
              <Button type="submit" className="bg-[#1a2234] hover:bg-[#2a3244] text-white">
                Passwort setzen
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function BenutzerPage() {
  return (
    <Suspense fallback={null}>
      <BenutzerContent />
    </Suspense>
  )
}
