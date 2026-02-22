"use client"

import type React from "react"

import { Suspense, useState } from "react"
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
import {
  LayoutDashboard,
  UserPlus,
  Search,
  RotateCcw,
  Pencil,
  Key,
  UserX,
  UserCheck,
} from "lucide-react"
import Link from "next/link"

/**
 * ✅ Apple-like Chips (guaranteed visible)
 * - admin -> blue
 * - aktiv -> green
 * - deaktiv -> red
 */
function RoleChip({ role }: { role: string }) {
  if (role === "admin") {
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset bg-[rgba(0,122,255,0.14)] text-[rgba(0,84,204,1)] ring-[rgba(0,122,255,0.26)]">
        admin
      </span>
    )
  }

  // "user" -> subtle dot like Apple
  return (
    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <span className="w-2 h-2 rounded-full bg-muted-foreground/40 inline-block" />
    </span>
  )
}

function StatusChip({ status }: { status: string }) {
  if (status === "aktiv") {
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset bg-[rgba(52,199,89,0.18)] text-[rgba(16,120,52,1)] ring-[rgba(52,199,89,0.30)]">
        aktiv
      </span>
    )
  }

  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset bg-[rgba(255,59,48,0.18)] text-[rgba(170,30,24,1)] ring-[rgba(255,59,48,0.30)]">
      deaktiv
    </span>
  )
}

function BenutzerContent() {
  const { users, user: currentUser, addUser, updateUser, resetPassword } = useAuth()
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

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()),
  )

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
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
    if (selectedUser && newPassword) {
      resetPassword(selectedUser.id, newPassword)
      setShowPasswordDialog(false)
      setSelectedUser(null)
      setNewPassword("")
    }
  }

  const handleToggleStatus = (user: User) => {
    const newStatus = user.status === "aktiv" ? "deaktiv" : "aktiv"
    updateUser(user.id, { status: newStatus })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Start</p>
          <h1 className="text-3xl font-bold">Benutzerverwaltung</h1>
          <p className="text-muted-foreground mt-1">
            Benutzer anlegen, bearbeiten, aktivieren/deaktivieren.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => setShowNewUserDialog(true)}>
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
              <Button>
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
                  <tr key={u.id} className="border-b border-border hover:bg-muted/40 transition-colors">
                    <td className="p-4">{u.id}</td>
                    <td className="p-4 font-medium">{u.name}</td>
                    <td className="p-4 text-sm">{u.email}</td>
                    <td className="p-4">
                      <RoleChip role={u.role} />
                    </td>
                    <td className="p-4">
                      <StatusChip status={u.status} />
                    </td>
                    <td className="p-4 text-sm">{u.createdAt}</td>

                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedUser(u)
                            setShowEditDialog(true)
                          }}
                        >
                          <Pencil className="w-4 h-4 mr-1" />
                          Bearbeiten
                        </Button>

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

                        {u.id !== currentUser?.id && (
                          <Button
                            size="sm"
                            variant="outline"
                            className={
                              u.status === "aktiv"
                                ? "text-red-600 hover:text-red-700 hover:bg-red-500/10"
                                : "text-green-600 hover:text-green-700 hover:bg-green-500/10"
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

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                      Keine Benutzer gefunden.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* New User Dialog */}
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
              <Button type="submit">
                Benutzer erstellen
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
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
                <Button type="submit">Speichern</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Password Reset Dialog */}
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
              <Button type="submit">Passwort setzen</Button>
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
