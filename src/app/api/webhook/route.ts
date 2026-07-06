import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, data } = body

    console.log(`🔔 Webhook recibido [${type}]:`, JSON.stringify(data, null, 2))

    switch (type) {
      case "order.created":
        console.log("✅ Pedido creado:", data.id)
        break
      case "order.updated":
        console.log("🔄 Pedido actualizado:", data.id, "->", data.status)
        break
      case "order.cancelled":
        console.log("❌ Pedido cancelado:", data.id)
        break
      default:
        console.log("ℹ️ Tipo de evento desconocido:", type)
    }

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: "Error al procesar webhook" }, { status: 500 })
  }
}

export async function GET() {
  return Response.json({ message: "Webhook endpoint Tecnofy" })
}
