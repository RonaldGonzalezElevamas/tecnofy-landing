export type AnalyticsEvent =
  | "page_view"
  | "view_content"
  | "scroll"
  | "click_buy"
  | "begin_checkout"
  | "add_to_cart"
  | "submit_form"
  | "purchase"
  | "whatsapp_click"

export interface AnalyticsConfig {
  ga4?: { measurementId: string }
  meta?: { pixelId: string }
  tiktok?: { pixelId: string }
  gtm?: { containerId: string }
}

export interface AnalyticsPayload {
  event: AnalyticsEvent
  data?: Record<string, unknown>
  product?: {
    id: string
    name: string
    price: number
    category?: string
  }
  user?: {
    id?: string
    email?: string
    phone?: string
  }
}
