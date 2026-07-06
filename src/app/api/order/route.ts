import { NextRequest } from "next/server"
import { sendOrderEmail } from "@/services/email"
import { addOrder } from "@/lib/store"

export async function POST(req: NextRequest) {
  try {
    const { order } = await req.json()

    if (!order?.customer?.telefono || !order?.shippingAddress?.region) {
      return Response.json({ error: "Faltan datos requeridos" }, { status: 400 })
    }

    console.log("📦 Nuevo pedido:", JSON.stringify(order, null, 2))

    // Almacenar en servidor para admin 24/7
    await addOrder(order)

    const results: { email?: boolean; sheets?: boolean; webhook?: boolean } = {}

    // Email al admin
    results.email = await sendOrderEmail(order)

    // Google Sheets
    const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (sheetsUrl) {
      try {
        const res = await fetch(sheetsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "order.created", order }),
        })
        results.sheets = res.ok
      } catch { results.sheets = false }
    }

    // Webhook externo
    const webhookUrl = process.env.NEXT_PUBLIC_ORDER_WEBHOOK_URL
    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "order.created", order, site: "Tecnofy Chile" }),
        })
        results.webhook = res.ok
      } catch { results.webhook = false }
    }

    return Response.json({ success: true, ...results })
  } catch {
    return Response.json({ error: "Error al procesar el pedido" }, { status: 500 })
  }
}
