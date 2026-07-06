import type { CheckoutFormData } from "@/types/checkout"

interface DropiConfig {
  apiKey: string
  apiUrl: string
  webhookSecret: string
}

const DROPI_CONFIG: DropiConfig = {
  apiKey: process.env.DROPI_API_KEY || "",
  apiUrl: process.env.DROPI_API_URL || "https://api.dropi.cl/v1",
  webhookSecret: process.env.DROPI_WEBHOOK_SECRET || "",
}

export interface DropiProduct {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  images: string[]
}

export interface DropiOrderRequest {
  products: Array<{
    sku: string
    quantity: number
    price: number
  }>
  customer: {
    name: string
    lastName: string
    phone: string
    email: string
  }
  shipping: {
    region: string
    comuna: string
    address: string
    number: string
    reference: string
  }
  payment: {
    method: "cod"
  }
}

export async function fetchDropiProducts(): Promise<DropiProduct[]> {
  if (!DROPI_CONFIG.apiKey) return []

  try {
    const response = await fetch(`${DROPI_CONFIG.apiUrl}/products`, {
      headers: {
        Authorization: `Bearer ${DROPI_CONFIG.apiKey}`,
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) throw new Error(`Dropi API error: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error("[Dropi] Error fetching products:", error)
    return []
  }
}

export async function createDropiOrder(
  formData: CheckoutFormData,
  productSku: string
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  if (!DROPI_CONFIG.apiKey) {
    return { success: false, error: "Dropi no configurado" }
  }

  const orderPayload: DropiOrderRequest = {
    products: [
      {
        sku: productSku,
        quantity: formData.cantidad,
        price: 0,
      },
    ],
    customer: {
      name: formData.nombre,
      lastName: formData.apellido,
      phone: formData.telefono,
      email: formData.email,
    },
    shipping: {
      region: formData.region,
      comuna: formData.comuna,
      address: formData.direccion,
      number: formData.numero,
      reference: formData.referencia,
    },
    payment: {
      method: "cod",
    },
  }

  try {
    const response = await fetch(`${DROPI_CONFIG.apiUrl}/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DROPI_CONFIG.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      return {
        success: false,
        error: errorData?.message || `Error Dropi: ${response.status}`,
      }
    }

    const result = await response.json()
    return { success: true, orderId: result.id }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error de conexión con Dropi",
    }
  }
}

export function isDropiConfigured(): boolean {
  return Boolean(DROPI_CONFIG.apiKey && DROPI_CONFIG.apiUrl)
}
