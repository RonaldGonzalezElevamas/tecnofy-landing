import type { CheckoutFormData, OrderData, OrderStatus } from "@/types/checkout"
import { getProductBySlug } from "@/config/products"
import { trackPurchase } from "@/services/analytics"

const ORDERS_KEY = "tecnofy_orders"

function generateId(): string {
  return `TEC-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
}

function getStoredOrders(): OrderData[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveOrders(orders: OrderData[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function createOrder(formData: CheckoutFormData, productSlug: string): OrderData {
  const product = getProductBySlug(productSlug)
  const unitPrice = product?.price.offer ?? 0
  const quantity = formData.cantidad
  const totalPrice = unitPrice * quantity

  const order: OrderData = {
    id: generateId(),
    productId: product?.id ?? productSlug,
    productName: product?.name ?? productSlug,
    quantity,
    unitPrice,
    totalPrice,
    shipping: 0,
    paymentMethod: "cod",
    customer: {
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
      email: formData.email,
    },
    shippingAddress: {
      region: formData.region,
      comuna: formData.comuna,
      direccion: formData.direccion,
      numero: formData.numero,
      referencia: formData.referencia,
    },
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes: formData.observaciones,
  }

  const orders = getStoredOrders()
  orders.unshift(order)
  saveOrders(orders)

  trackPurchase(order.id, totalPrice, order.productId)

  return order
}

export async function submitOrderToServer(order: OrderData): Promise<{ success: boolean; dropi?: boolean }> {
  try {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order }),
    })
    if (!res.ok) return { success: false }
    const data = await res.json()
    return { success: true, dropi: data.dropi }
  } catch {
    return { success: false }
  }
}

export function getOrders(): OrderData[] {
  return getStoredOrders()
}

export function getOrderById(id: string): OrderData | undefined {
  return getStoredOrders().find((o) => o.id === id)
}

export function updateOrderStatus(id: string, status: OrderStatus): void {
  const orders = getStoredOrders()
  const index = orders.findIndex((o) => o.id === id)
  if (index === -1) return
  orders[index].status = status
  orders[index].updatedAt = new Date().toISOString()
  saveOrders(orders)
}

export function deleteOrder(id: string): void {
  const orders = getStoredOrders().filter((o) => o.id !== id)
  saveOrders(orders)
}

export function getOrderStats() {
  const orders = getStoredOrders()
  return {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    revenue: orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.totalPrice, 0),
  }
}
