import fs from "fs"
import path from "path"
import type { OrderData } from "@/types/checkout"

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data")
const ORDERS_FILE = path.join(DATA_DIR, "orders.json")
const STORE_NAME = "tecnofy-orders"

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try { fs.mkdirSync(DATA_DIR, { recursive: true }) } catch {}
  }
}

async function getNetlifyStore() {
  try {
    const { getStore } = await import("@netlify/blobs")
    return getStore(STORE_NAME)
  } catch {
    return null
  }
}

async function readFromNetlify(): Promise<OrderData[]> {
  try {
    const store = await getNetlifyStore()
    if (!store) throw new Error("No store")
    const raw = await store.get("orders", { type: "json" })
    return Array.isArray(raw) ? raw : []
  } catch {
    return []
  }
}

async function writeToNetlify(orders: OrderData[]): Promise<boolean> {
  try {
    const store = await getNetlifyStore()
    if (!store) return false
    await store.setJSON("orders", orders)
    return true
  } catch {
    return false
  }
}

function readFromFile(): OrderData[] {
  try {
    ensureDataDir()
    if (!fs.existsSync(ORDERS_FILE)) return []
    const raw = fs.readFileSync(ORDERS_FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeToFile(orders: OrderData[]): void {
  ensureDataDir()
  try { fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8") } catch {}
}

export async function readOrders(): Promise<OrderData[]> {
  if (process.env.NETLIFY) {
    const fromNetlify = await readFromNetlify()
    if (fromNetlify.length) return fromNetlify
  }
  return readFromFile()
}

export async function writeOrders(orders: OrderData[]): Promise<void> {
  if (process.env.NETLIFY) {
    const ok = await writeToNetlify(orders)
    if (ok) return
  }
  writeToFile(orders)
}

export async function addOrder(order: OrderData): Promise<void> {
  const orders = await readOrders()
  orders.unshift(order)
  await writeOrders(orders)
}

export async function updateOrder(id: string, updates: Partial<OrderData>): Promise<OrderData | null> {
  const orders = await readOrders()
  const index = orders.findIndex((o) => o.id === id)
  if (index === -1) return null
  orders[index] = { ...orders[index], ...updates, updatedAt: new Date().toISOString() }
  await writeOrders(orders)
  return orders[index]
}
