import type { AnalyticsEvent, AnalyticsPayload } from "@/types/analytics"
import { SITE_CONFIG } from "@/config/site"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    ttq?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

const { ga4, meta, tiktok } = SITE_CONFIG.analytics

function isBrowser(): boolean {
  return typeof window !== "undefined"
}

export function trackEvent(event: AnalyticsEvent, payload?: Partial<AnalyticsPayload>): void {
  if (!isBrowser()) return

  const data = payload?.data ?? {}

  if (ga4?.measurementId && typeof window.gtag === "function") {
    window.gtag("event", event, data)
  }

  if (meta?.pixelId && typeof window.fbq === "function") {
    window.fbq("track", event, data)
  }

  if (tiktok?.pixelId && typeof window.ttq === "function") {
    window.ttq("track", event, data)
  }
}

export function trackViewProduct(productId: string, productName: string, price: number): void {
  trackEvent("view_content", {
    data: {
      content_id: productId,
      content_name: productName,
      value: price,
      currency: "CLP",
    },
  })
}

export function trackBeginCheckout(productId: string, quantity: number, total: number): void {
  trackEvent("begin_checkout", {
    data: {
      content_id: productId,
      quantity,
      value: total,
      currency: "CLP",
    },
  })
}

export function trackPurchase(orderId: string, total: number, productId: string): void {
  trackEvent("purchase", {
    data: {
      transaction_id: orderId,
      value: total,
      currency: "CLP",
      items: [{ id: productId, quantity: 1 }],
    },
  })
}

export function trackWhatsAppClick(productName: string): void {
  trackEvent("whatsapp_click", {
    data: { product: productName },
  })
}

export function trackScroll(depth: number): void {
  trackEvent("scroll", {
    data: { scroll_depth: depth },
  })
}
