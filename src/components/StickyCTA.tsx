"use client"

import { useEffect, useState } from "react"
import { SITE_CONFIG } from "@/config/site"
import WhatsAppButton from "@/components/WhatsAppButton"

function formatPrice(price: number): string {
  return price.toLocaleString("es-CL")
}

export default function StickyCTA() {
  const [show, setShow] = useState(false)
  const [product, setProduct] = useState<{ price: number; oldPrice: number; slug: string; name: string } | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    async function load() {
      try {
        const { getActiveProducts } = await import("@/config/products")
        const p = getActiveProducts()[0]
        if (p) {
          setProduct({ price: p.price.offer, oldPrice: p.price.normal, slug: p.slug, name: p.name })
        }
      } catch { /* ignore */ }
    }
    load()

    function handleScroll() {
      const shouldShow = window.scrollY > 600
      setShow(shouldShow)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[var(--gray-200)] px-3 py-2.5 transition-transform duration-300 shadow-lg shadow-black/5 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
        <div className="flex items-center gap-3 max-w-md mx-auto">
          {product && (
            <>
              <div className="text-center flex-shrink-0 leading-tight min-w-[70px]">
                <div className="text-[0.6rem] text-[var(--gray-400)] line-through">
                  ${formatPrice(product.oldPrice)}
                </div>
                <div className="text-sm font-bold text-[var(--primary)]">
                  ${formatPrice(product.price)}
                </div>
                <div className="text-[0.5rem] text-[var(--accent-dark)] font-semibold">
                  🚚 Envío gratis
                </div>
              </div>
              <WhatsAppButton variant="small" productName={product.name} />
            </>
          )}
        </div>
    </div>
  )
}
