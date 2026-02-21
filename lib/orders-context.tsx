"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Order {
  id: string
  leitzahl: string
  fahrzeug: string
  modell: string
  fin: string
  auftragNr: string
  status: "Neu" | "In Bearbeitung" | "Fertig"
  eingang: string
  fertigBis: string
  formData: Record<string, unknown>
}

interface OrdersContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, "id">) => string
  updateOrder: (id: string, data: Partial<Order>) => void
  deleteOrder: (id: string) => void
  getOrder: (id: string) => Order | undefined
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

const defaultOrders: Order[] = [
  {
    id: "1",
    leitzahl: "XMR007",
    fahrzeug: "Mercedes",
    modell: "S-Klasse",
    fin: "WDB1234567890",
    auftragNr: "A-2025-001",
    status: "Fertig",
    eingang: "2025-12-28",
    fertigBis: "2025-12-31",
    formData: {},
  },
  {
    id: "2",
    leitzahl: "WMB 6X",
    fahrzeug: "BMW",
    modell: "M5",
    fin: "WBA9876543210",
    auftragNr: "A-2025-002",
    status: "Neu",
    eingang: "2025-12-29",
    fertigBis: "2025-12-30",
    formData: {},
  },
  {
    id: "3",
    leitzahl: "01012026",
    fahrzeug: "AUDI",
    modell: "RS6",
    fin: "WAUXXXXXX123",
    auftragNr: "A-2025-003",
    status: "In Bearbeitung",
    eingang: "2025-12-24",
    fertigBis: "2025-12-26",
    formData: {},
  },
  {
    id: "4",
    leitzahl: "26122025",
    fahrzeug: "VW",
    modell: "Golf R",
    fin: "WVWZZZ3CXXX",
    auftragNr: "A-2025-004",
    status: "In Bearbeitung",
    eingang: "2025-12-23",
    fertigBis: "2025-12-25",
    formData: {},
  },
]

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const storedOrders = localStorage.getItem("ruehl_orders")
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    } else {
      setOrders(defaultOrders)
      localStorage.setItem("ruehl_orders", JSON.stringify(defaultOrders))
    }
  }, [])

  const addOrder = (orderData: Omit<Order, "id">): string => {
    const id = Date.now().toString()
    const newOrder = { ...orderData, id }
    const updatedOrders = [...orders, newOrder]
    setOrders(updatedOrders)
    localStorage.setItem("ruehl_orders", JSON.stringify(updatedOrders))
    return id
  }

  const updateOrder = (id: string, data: Partial<Order>) => {
    const updatedOrders = orders.map((o) => (o.id === id ? { ...o, ...data } : o))
    setOrders(updatedOrders)
    localStorage.setItem("ruehl_orders", JSON.stringify(updatedOrders))
  }

  const deleteOrder = (id: string) => {
    const updatedOrders = orders.filter((o) => o.id !== id)
    setOrders(updatedOrders)
    localStorage.setItem("ruehl_orders", JSON.stringify(updatedOrders))
  }

  const getOrder = (id: string) => orders.find((o) => o.id === id)

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrder, deleteOrder, getOrder }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}
