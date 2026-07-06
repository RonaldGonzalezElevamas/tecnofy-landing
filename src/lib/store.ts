import fs from "fs"
import path from "path"
import type { OrderData } from "@/types/checkout"

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data")
const ORDERS_FILE = path.join(DATA_DIR, "orders.json")

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try { fs.mkdirSync(DATA_DIR, { recursive: true }) } catch {}
  }
}

async function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  try {
    const { Redis } = await import("@upstash/redis")
    return new Redis({ url, token })
  } catch {
    return null
  }
}

const REDIS_KEY = "tecnofy:orders"

async function readFromRedis(): Promise<OrderData[]> {
  try {
    const redis = await getRedis()
    if (!redis) return []
    const raw = await redis.get(REDIS_KEY)
    if (!raw) return []
    if (typeof raw === "string") return JSON.parse(raw)
    return raw as OrderData[]
  } catch {
    return []
  }
}

async function writeToRedis(orders: OrderData[]): Promise<boolean> {
  try {
    const redis = await getRedis()
    if (!redis) return false
    await redis.set(REDIS_KEY, JSON.stringify(orders))
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

function hasRedis(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL)
}

export async function readOrders(): Promise<OrderData[]> {
  if (hasRedis()) {
    const fromRedis = await readFromRedis()
    if (fromRedis.length) return fromRedis
  }
  const fromFile = readFromFile()
  if (fromFile.length) return fromFile
  // Si Redis está configurado pero vacío, intentamos migrar datos del archivo
  if (hasRedis() && fromFile.length) {
    await writeToRedis(fromFile)
  }
  return fromFile
}

export async function writeOrders(orders: OrderData[]): Promise<void> {
  if (hasRedis()) {
    const ok = await writeToRedis(orders)
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
