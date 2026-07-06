import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { order } = await req.json()

    if (!order?.customer?.telefono || !order?.shippingAddress?.region) {
      return Response.json({ error: "Faltan datos requeridos" }, { status: 400 })
    }

    console.log("📦 Procesando pedido:", order.id, JSON.stringify(order, null, 2))

    const results: { dropi?: boolean; sheets?: boolean; webhook?: boolean } = {}

    // Dropi
    const dropiKey = process.env.DROPI_API_KEY
    const dropiUrl = process.env.DROPI_API_URL || "https://api.dropi.cl/v1"
    if (dropiKey) {
      try {
        const dropiRes = await fetch(`${dropiUrl}/orders`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${dropiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: [{ sku: order.productId, quantity: order.quantity, price: order.unitPrice }],
            customer: {
              name: order.customer.nombre,
              lastName: order.customer.apellido,
              phone: order.customer.telefono,
              email: order.customer.email,
            },
            shipping: {
              region: order.shippingAddress.region,
              comuna: order.shippingAddress.comuna,
              address: order.shippingAddress.direccion,
              number: order.shippingAddress.numero,
              reference: order.shippingAddress.referencia,
            },
            payment: { method: "cod" },
          }),
        })
        results.dropi = dropiRes.ok
        if (!dropiRes.ok) console.warn("[Dropi] Error:", await dropiRes.text().catch(() => "unknown"))
      } catch (e) {
        console.warn("[Dropi] Error de conexión:", e)
        results.dropi = false
      }
    }

    // Google Sheets
    const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (sheetsUrl) {
      try {
        const sheetsRes = await fetch(sheetsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "order.created",
            timestamp: new Date().toISOString(),
            order: {
              id: order.id,
              producto: order.productName,
              cantidad: order.quantity,
              total: order.totalPrice,
              cliente: `${order.customer.nombre} ${order.customer.apellido}`,
              telefono: order.customer.telefono,
              email: order.customer.email,
              region: order.shippingAddress.region,
              comuna: order.shippingAddress.comuna,
              direccion: `${order.shippingAddress.direccion} ${order.shippingAddress.numero}`,
              referencia: order.shippingAddress.referencia,
              notas: order.notes,
              estado: order.status,
            },
          }),
        })
        results.sheets = sheetsRes.ok
      } catch {
        results.sheets = false
      }
    }

    // Webhook externo
    const webhookUrl = process.env.NEXT_PUBLIC_ORDER_WEBHOOK_URL
    if (webhookUrl) {
      try {
        const whRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "order.created", order, site: "Tecnofy Chile" }),
        })
        results.webhook = whRes.ok
      } catch {
        results.webhook = false
      }
    }

    return Response.json({ success: true, ...results })
  } catch {
    return Response.json({ error: "Error al procesar el pedido" }, { status: 500 })
  }
}
