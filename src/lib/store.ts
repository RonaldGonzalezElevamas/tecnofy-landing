import fs from "fs"
import path from "path"

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data")
const ORDERS_FILE = path.join(DATA_DIR, "orders.json")

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function readOrders(): any[] {
  try {
    ensureDataDir()
    if (!fs.existsSync(ORDERS_FILE)) return []
    const raw = fs.readFileSync(ORDERS_FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function writeOrders(orders: any[]): void {
  ensureDataDir()
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8")
}

export function addOrder(order: any): void {
  const orders = readOrders()
  orders.unshift(order)
  writeOrders(orders)
}

export function updateOrder(id: string, updates: Partial<any>): any | null {
  const orders = readOrders()
  const index = orders.findIndex((o: any) => o.id === id)
  if (index === -1) return null
  orders[index] = { ...orders[index], ...updates, updatedAt: new Date().toISOString() }
  writeOrders(orders)
  return orders[index]
}
