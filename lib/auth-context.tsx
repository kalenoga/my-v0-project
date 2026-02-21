"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: number
  name: string
  email: string
  role: "admin" | "user"
  status: "aktiv" | "deaktiv"
  createdAt: string
}

interface AuthContextType {
  user: User | null
  users: User[]
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  addUser: (user: Omit<User, "id" | "createdAt">, password: string) => void
  updateUser: (id: number, data: Partial<User>) => void
  deleteUser: (id: number) => void
  resetPassword: (id: number, newPassword: string) => void
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users with passwords
const defaultUsers: (User & { password: string })[] = [
  {
    id: 1,
    name: "Admin",
    email: "design@ruehl-automotive.de",
    role: "admin",
    status: "aktiv",
    createdAt: "2025-12-25 19:56:46",
    password: "admin123",
  },
  {
    id: 2,
    name: "Burhan Karpuz",
    email: "burhan.karpuz@ruehl-automotive.de",
    role: "user",
    status: "aktiv",
    createdAt: "2025-12-27 19:54:03",
    password: "user123",
  },
  {
    id: 3,
    name: "Engin Ergin",
    email: "engin.ergin@ruehl-automotive.de",
    role: "user",
    status: "deaktiv",
    createdAt: "2025-12-27 19:55:55",
    password: "user123",
  },
  {
    id: 4,
    name: "Fabian Blasch",
    email: "fabian.blasch@ruehl-automotive.de",
    role: "user",
    status: "deaktiv",
    createdAt: "2025-12-30 02:09:11",
    password: "user123",
  },
  {
    id: 5,
    name: "Dario Karpuz",
    email: "dario.karpuz@ruehl-automotive.de",
    role: "user",
    status: "deaktiv",
    createdAt: "2025-12-30 02:26:14",
    password: "user123",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<(User & { password: string })[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load users from localStorage or use defaults
    const storedUsers = localStorage.getItem("ruehl_users")
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    } else {
      setUsers(defaultUsers)
      localStorage.setItem("ruehl_users", JSON.stringify(defaultUsers))
    }

    // Check for existing session
    const storedUser = localStorage.getItem("ruehl_current_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find((u) => u.email === email && u.password === password)
    if (foundUser && foundUser.status === "aktiv") {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("ruehl_current_user", JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ruehl_current_user")
  }

  const addUser = (userData: Omit<User, "id" | "createdAt">, password: string) => {
    const newUser = {
      ...userData,
      id: Math.max(...users.map((u) => u.id)) + 1,
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 19),
      password,
    }
    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem("ruehl_users", JSON.stringify(updatedUsers))
  }

  const updateUser = (id: number, data: Partial<User>) => {
    const updatedUsers = users.map((u) => (u.id === id ? { ...u, ...data } : u))
    setUsers(updatedUsers)
    localStorage.setItem("ruehl_users", JSON.stringify(updatedUsers))
  }

  const deleteUser = (id: number) => {
    const updatedUsers = users.filter((u) => u.id !== id)
    setUsers(updatedUsers)
    localStorage.setItem("ruehl_users", JSON.stringify(updatedUsers))
  }

  const resetPassword = (id: number, newPassword: string) => {
    const updatedUsers = users.map((u) => (u.id === id ? { ...u, password: newPassword } : u))
    setUsers(updatedUsers)
    localStorage.setItem("ruehl_users", JSON.stringify(updatedUsers))
  }

  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    if (!user) return false
    const currentUser = users.find((u) => u.id === user.id)
    if (currentUser && currentUser.password === oldPassword) {
      resetPassword(user.id, newPassword)
      return true
    }
    return false
  }

  const usersWithoutPasswords = users.map(({ password: _, ...u }) => u)

  return (
    <AuthContext.Provider
      value={{
        user,
        users: usersWithoutPasswords,
        isLoading,
        login,
        logout,
        addUser,
        updateUser,
        deleteUser,
        resetPassword,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
