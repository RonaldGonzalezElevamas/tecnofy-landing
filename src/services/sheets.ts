import type { OrderData } from "@/types/checkout"

const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || ""

export function isSheetsConfigured(): boolean {
  return Boolean(WEBHOOK_URL)
}

export async function sendOrderToSheets(order: OrderData): Promise<boolean> {
  if (!WEBHOOK_URL) return false

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "order.created",
        timestamp: new Date().toISOString(),
        order: {
          id: order.id,
          producto: order.productName,
          cantidad: order.quantity,
          precioUnitario: order.unitPrice,
          total: order.totalPrice,
          metodoPago: "Contra entrega",
          envio: "Gratis a todo Chile",
          cliente: `${order.customer.nombre} ${order.customer.apellido}`,
          telefono: order.customer.telefono,
          email: order.customer.email,
          region: order.shippingAddress.region,
          comuna: order.shippingAddress.comuna,
          direccion: `${order.shippingAddress.direccion} ${order.shippingAddress.numero}`,
          referencia: order.shippingAddress.referencia,
          notas: order.notes,
          estado: order.status,
          urlAdmin: `https://tecnofy.cl/admin`,
        },
      }),
    })
    return response.ok
  } catch {
    console.warn("[Sheets] Error enviando pedido a Google Sheets")
    return false
  }
}
