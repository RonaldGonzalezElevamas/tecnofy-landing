import { NextRequest } from "next/server"
import { readOrders, addOrder, updateOrder } from "@/lib/store"

export async function GET() {
  try {
    const orders = await readOrders()
    return Response.json({ orders })
  } catch {
    return Response.json({ orders: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (body.action === "updateStatus") {
      const updated = await updateOrder(body.id, { status: body.status })
      if (!updated) return Response.json({ error: "Order not found" }, { status: 404 })
      return Response.json({ success: true, order: updated })
    }

    const { order } = body
    if (!order?.id) {
      return Response.json({ error: "Order data required" }, { status: 400 })
    }

    await addOrder(order)
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: "Error processing request" }, { status: 500 })
  }
}
