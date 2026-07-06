import { readOrders } from "@/lib/store"
import { SITE_CONFIG } from "@/config/site"
import AdminClient from "./AdminClient"
import type { OrderData } from "@/types/checkout"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  let initialOrders: OrderData[] = []
  try {
    initialOrders = await readOrders()
  } catch {}

  return (
    <main className="min-h-screen pt-28 pb-16 bg-[var(--gray-100)]">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-[1.75rem] font-extrabold mb-2">Admin Dashboard</h1>
        <AdminClient initialOrders={initialOrders} />
      </div>
    </main>
  )
}
