import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { order } = await req.json()

    if (!order?.customer?.telefono || !order?.shippingAddress?.region) {
      return Response.json({ error: "Faltan datos requeridos" }, { status: 400 })
    }

    console.log("📦 Nuevo pedido:", JSON.stringify(order, null, 2))

    const message = encodeURIComponent(
      `🛒 *NUEVO PEDIDO* 🛒\n\n` +
      `ID: ${order.id}\n` +
      `Producto: ${order.productName}\n` +
      `Cantidad: ${order.quantity}\n` +
      `Total: $${order.totalPrice.toLocaleString("es-CL")}\n\n` +
      `👤 *Cliente*\n` +
      `Nombre: ${order.customer.nombre} ${order.customer.apellido}\n` +
      `Teléfono: ${order.customer.telefono}\n` +
      `Email: ${order.customer.email || "No registrado"}\n\n` +
      `📍 *Dirección*\n` +
      `${order.shippingAddress.direccion} ${order.shippingAddress.numero}\n` +
      `${order.shippingAddress.comuna}, ${order.shippingAddress.region}\n` +
      `Ref: ${order.shippingAddress.referencia || "Sin referencia"}\n\n` +
      `📝 ${order.notes || "Sin observaciones"}\n\n` +
      `→ Admin: tecnofy.cl/admin`
    )

    const adminNumber = process.env.ADMIN_WHATSAPP?.replace?.(/^\+/, "") || "56983956073"

    const results: { sheets?: boolean; webhook?: boolean } = {}

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

    return Response.json({
      success: true,
      adminUrl: `https://wa.me/${adminNumber}?text=${message}`,
      ...results,
    })
  } catch {
    return Response.json({ error: "Error al procesar el pedido" }, { status: 500 })
  }
}
