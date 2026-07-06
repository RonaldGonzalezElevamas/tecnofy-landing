"use client"

import { useState, useCallback, useEffect } from "react"
import { getOrders, getOrderStats } from "@/services/order"
import type { OrderData } from "@/types/checkout"
import { SITE_CONFIG } from "@/config/site"

const WHATSAPP_NUMBER = SITE_CONFIG.whatsapp.number.replace(/^\+/, "")

function formatPrice(n: number): string {
  return n.toLocaleString("es-CL")
}

function formatDate(iso: string): string {
  if (!iso) return ""
  try {
    return new Date(iso).toLocaleString("es-CL", { dateStyle: "short", timeStyle: "short" })
  } catch {
    return iso
  }
}

function computeStats(orders: OrderData[]) {
  return {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    revenue: orders.filter((o) => o.status !== "cancelled").reduce((sum, o) => sum + (o.totalPrice ?? 0), 0),
  }
}

interface AdminClientProps {
  initialOrders: OrderData[]
}

export default function AdminClient({ initialOrders }: AdminClientProps) {
  const [orders, setOrders] = useState<OrderData[]>(initialOrders)
  const [stats, setStats] = useState(computeStats(initialOrders))
  const [synced, setSynced] = useState(false)

  useEffect(() => {
    if (synced) return
    setSynced(true)
    // Combinar pedidos del servidor + localStorage
    const local = getOrders()
    const allIds = new Set(orders.map((o) => o.id))
    const merged = [...orders]
    for (const o of local) {
      if (!allIds.has(o.id)) {
        merged.push(o)
        allIds.add(o.id)
      }
    }
    if (merged.length !== orders.length) {
      setOrders(merged)
      setStats(computeStats(merged))
    }
  }, [orders, synced])

  const handleStatusChange = useCallback(async (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus as OrderData["status"], updatedAt: new Date().toISOString() } : o
    )
    setOrders(updatedOrders)
    setStats(computeStats(updatedOrders))
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateStatus", id: orderId, status: newStatus }),
      })
    } catch {}
    try {
      const { updateOrderStatus } = await import("@/services/order")
      updateOrderStatus(orderId, newStatus as OrderData["status"])
    } catch {}
  }, [orders])

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }

  return (
    <>
      <p className="text-sm text-[var(--gray-500)] mb-8">{orders.length} pedidos totales</p>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
        {[
          { label: "Total", value: stats.total, color: "bg-white" },
          { label: "Pendientes", value: stats.pending, color: "bg-yellow-50" },
          { label: "Confirmados", value: stats.confirmed, color: "bg-blue-50" },
          { label: "Enviados", value: stats.shipped, color: "bg-purple-50" },
          { label: "Entregados", value: stats.delivered, color: "bg-green-50" },
          { label: "Ingresos", value: `$${formatPrice(stats.revenue)}`, color: "bg-white" },
        ].map((s) => (
          <div key={s.label} className={`${s.color} rounded-xl p-4 text-center border border-[var(--gray-200)]`}>
            <div className="text-2xl font-extrabold">{s.value}</div>
            <div className="text-xs text-[var(--gray-500)] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-[var(--gray-400)]">No hay pedidos aún</div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const c = order.customer ?? ({} as any)
            const s = order.shippingAddress ?? ({} as any)
            return (
              <div key={order.id} className="bg-white rounded-2xl p-5 border border-[var(--gray-200)]">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">#{order.id}</span>
                      <span
                        className={`text-[0.65rem] font-semibold px-2 py-0.5 rounded-full ${statusColors[order.status] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--gray-400)] mt-0.5">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">${formatPrice(order.totalPrice)}</p>
                    <p className="text-[0.65rem] text-[var(--gray-400)]">{order.quantity} unidad(es)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[var(--gray-600)] mb-3">
                  <div>
                    <span className="text-[var(--gray-400)]">Cliente:</span> {c.nombre ?? ""} {c.apellido ?? ""}
                  </div>
                  <div>
                    <span className="text-[var(--gray-400)]">Teléfono:</span> {c.telefono ?? ""}
                  </div>
                  <div>
                    <span className="text-[var(--gray-400)]">Dirección:</span> {s.direccion ?? ""} {s.numero ?? ""}, {s.comuna ?? ""}, {s.region ?? ""}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-[var(--gray-200)] bg-white cursor-pointer"
                  >
                    <option value="pending">Pendiente</option>
                    <option value="confirmed">Confirmado</option>
                    <option value="shipped">Enviado</option>
                    <option value="delivered">Entregado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(
                        `🛒 Pedido: ${order.id}\n` +
                        `${order.productName} x${order.quantity}\n` +
                        `Total: $${formatPrice(order.totalPrice)}\n\n` +
                        `👤 ${c.nombre ?? ""} ${c.apellido ?? ""}\n` +
                        `📞 ${c.telefono ?? ""}\n` +
                        `📍 ${s.direccion ?? ""} ${s.numero ?? ""}, ${s.comuna ?? ""}\n` +
                        `📝 ${order.notes || "Sin observaciones"}`
                      )
                      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank")
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#25D366] text-white font-bold cursor-pointer hover:bg-[#20BD5C] transition-colors"
                  >
                    Enviar a mi WhatsApp
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
