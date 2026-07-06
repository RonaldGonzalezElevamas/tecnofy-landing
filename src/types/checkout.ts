export interface CheckoutFormData {
  nombre: string
  apellido: string
  telefono: string
  email: string
  region: string
  comuna: string
  direccion: string
  numero: string
  referencia: string
  cantidad: number
  observaciones: string
  aceptaTerminos: boolean
}

export interface CheckoutErrors {
  nombre?: string
  apellido?: string
  telefono?: string
  email?: string
  region?: string
  comuna?: string
  direccion?: string
  numero?: string
  cantidad?: string
  aceptaTerminos?: string
}

export interface OrderData {
  id: string
  productId: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  shipping: number
  paymentMethod: "cod"
  customer: {
    nombre: string
    apellido: string
    telefono: string
    email: string
  }
  shippingAddress: {
    region: string
    comuna: string
    direccion: string
    numero: string
    referencia: string
  }
  status: OrderStatus
  createdAt: string
  updatedAt: string
  notes: string
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled"

export interface OrderSummary {
  subtotal: number
  shipping: number
  discount: number
  total: number
  currency: string
}
