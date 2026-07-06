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
  sendToIntegrations(order)

  return order
}

async function sendToIntegrations(order: OrderData): Promise<void> {
  const { createDropiOrder, isDropiConfigured } = await import("@/services/dropi")
  const { sendOrderToSheets, isSheetsConfigured } = await import("@/services/sheets")
  const { sendOrderWebhook } = await import("@/services/order")

  const promises: Promise<boolean>[] = []

  if (isDropiConfigured()) {
    promises.push(
      createDropiOrder(
        {
          nombre: order.customer.nombre,
          apellido: order.customer.apellido,
          telefono: order.customer.telefono,
          email: order.customer.email,
          region: order.shippingAddress.region,
          comuna: order.shippingAddress.comuna,
          direccion: order.shippingAddress.direccion,
          numero: order.shippingAddress.numero,
          referencia: order.shippingAddress.referencia,
          cantidad: order.quantity,
          observaciones: order.notes,
          aceptaTerminos: true,
        } as CheckoutFormData,
        order.productId
      ).then((r) => r.success)
    )
  }

  if (isSheetsConfigured()) {
    promises.push(sendOrderToSheets(order))
  }

  promises.push(sendOrderWebhook(order))

  await Promise.allSettled(promises)
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

export async function sendOrderWebhook(order: OrderData): Promise<boolean> {
  const webhookUrl = process.env.NEXT_PUBLIC_ORDER_WEBHOOK_URL
  if (!webhookUrl) return false

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "order.created",
        order,
        site: "Tecnofy Chile",
      }),
    })
    return response.ok
  } catch {
    return false
  }
}
