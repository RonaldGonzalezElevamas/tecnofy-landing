import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, apellido, telefono, email, region, comuna, direccion, numero, referencia, cantidad, producto, total } = body

    if (!nombre || !telefono || !region || !comuna || !direccion || !numero) {
      return Response.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      )
    }

    const orderData = {
      id: `TECNOFY-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      product: producto || "Producto Tecnofy",
      price: total || 0,
      currency: "CLP",
      customer: { nombre, apellido, telefono, email },
      address: { region, comuna, direccion, numero, referencia },
      quantity: cantidad || 1,
      payment: "Contra entrega (COD)",
      shipping: "Envío gratis a todo Chile",
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    console.log("📦 Nuevo pedido:", JSON.stringify(orderData, null, 2))

    return Response.json({ success: true, order: orderData })
  } catch {
    return Response.json({ error: "Error al procesar el pedido" }, { status: 500 })
  }
}

export async function GET() {
  return Response.json({ message: "API de pedidos Tecnofy" })
}
