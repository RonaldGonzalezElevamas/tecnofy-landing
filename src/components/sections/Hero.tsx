import Link from "next/link"
import type { Product } from "@/types/product"
import { SITE_CONFIG } from "@/config/site"
import WhatsAppButton from "@/components/WhatsAppButton"
import Countdown from "@/components/Countdown"

interface HeroProps {
  product: Product
}

function formatPrice(price: number): string {
  return price.toLocaleString("es-CL")
}

export default function Hero({ product }: HeroProps) {
  const discount = Math.round(
    ((product.price.normal - product.price.offer) / product.price.normal) * 100
  )

  return (
    <section className="bg-gradient-to-b from-[var(--primary-light)] to-white pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[var(--accent)]/10 text-[var(--accent-dark)] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              Oferta por tiempo limitado
            </div>

            <Countdown />

            <h1
              className="text-[1.65rem] sm:text-4xl md:text-[2.75rem] lg:text-[3.25rem] font-extrabold leading-tight mb-3"
              dangerouslySetInnerHTML={{ __html: product.heroTitle ?? "¿Cuello y hombros <span class=\"text-[var(--primary)]\">destruidos</span> por el estrés?" }}
            />

            <p className="text-lg text-[var(--gray-500)] max-w-lg mx-auto md:mx-0 mb-6">
              {product.shortDescription}
            </p>

            <div className="bg-white/80 border-2 border-[var(--accent)]/30 rounded-2xl p-4 mb-4 flex flex-wrap items-center gap-3 justify-center md:inline-flex md:justify-start">
              <div>
                <div className="text-sm text-[var(--gray-400)] line-through">
                  ${formatPrice(product.price.normal)}
                </div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[1.75rem] md:text-[2rem] font-extrabold text-[var(--dark)]">
                    ${formatPrice(product.price.offer)}
                  </span>
                  <span className="bg-[var(--red)] text-white text-[0.625rem] font-bold px-1.5 py-0.5 rounded">
                    -{discount}%
                  </span>
                </div>
              </div>
              {product.price.bundle && (
                <div className="border-l border-[var(--gray-200)] pl-4">
                  <div className="text-sm text-[var(--gray-500)] font-semibold">
                    <strong className="text-[var(--primary)]">{product.price.bundle.label.split(" (")[0]}</strong>
                  </div>
                  <div className="text-[0.65rem] text-[var(--gray-400)]">
                    $29.995 c/u · Ahorras ${formatPrice(product.price.offer * 2 - product.price.bundle.price)}
                  </div>
                </div>
              )}
              <div className="inline-flex items-center gap-1 bg-[var(--accent)]/10 text-[var(--accent-dark)] text-[0.7rem] font-bold px-2 py-1 rounded-md whitespace-nowrap">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="5 9 2 12 5 15"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2v20"/></svg>
                Envío gratis
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-semibold px-2.5 py-1.5 rounded-full border border-amber-200">
                ⚠️ Solo {product.stock} uds. disponibles
              </span>
              <span className="inline-flex items-center gap-1 bg-[var(--accent)] text-white text-xs font-bold px-2.5 py-1.5 rounded-full border border-[var(--accent)]">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                {SITE_CONFIG.shipping.freeLabel}
              </span>
              <span className="inline-flex items-center gap-1 bg-[var(--accent)] text-white text-xs font-bold px-2.5 py-1.5 rounded-full border border-[var(--accent)]">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                {SITE_CONFIG.payment.methodLabel}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <WhatsAppButton variant="large" productName={product.name} />
              <Link
                href={`/checkout?product=${product.slug}`}
                className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 text-lg rounded-2xl bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] active:scale-[0.98] transition-all duration-200"
              >
                Comprar ahora
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            <div className="flex items-center gap-2 justify-center md:justify-start mt-4 text-sm text-[var(--gray-400)]">
              <div className="flex">
                {["C", "A", "P"].map((initial, i) => (
                  <span
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[0.625rem] font-bold text-[var(--gray-500)] bg-[var(--gray-200)] -mr-2 last:mr-0"
                  >
                    {initial}
                  </span>
                ))}
              </div>
              <span>+850 vendidos · ⭐ 4.8</span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
              <span className="inline-flex items-center gap-1 text-[0.65rem] text-[var(--gray-500)] bg-white px-2 py-1 rounded-full border border-[var(--gray-200)]">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                SSL Seguro
              </span>
              <span className="inline-flex items-center gap-1 text-[0.65rem] text-[var(--gray-500)] bg-white px-2 py-1 rounded-full border border-[var(--gray-200)]">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Pago contra entrega
              </span>
              <span className="inline-flex items-center gap-1 text-[0.65rem] text-[var(--gray-500)] bg-white px-2 py-1 rounded-full border border-[var(--gray-200)]">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Garantía 3 meses
              </span>
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
              {(product.heroTrustBadges ?? [
                { icon: "Alivio 4D", label: "Alivio 4D" },
                { icon: "Con calor", label: "Con calor" },
                { icon: "USB Recargable", label: "USB Recargable" },
                { icon: "Ultra silencioso", label: "Ultra silencioso" },
              ]).map((badge) => (
                <span key={badge.label} className="flex items-center gap-1.5 text-xs text-[var(--gray-500)]">
                  <svg className="w-3.5 h-3.5 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] md:w-[380px] md:h-[380px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/15 to-[var(--accent)]/15 rounded-full animate-pulse" />
              <div className="absolute inset-3 bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center border border-[var(--gray-100)] p-4">
                <img
                  src={product.images[0]?.src ?? "/images/hero.webp"}
                  alt={product.name}
                  className="w-auto h-[220px] sm:h-[240px] md:h-[300px] object-contain rounded-xl"
                  fetchPriority="high"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-white rounded-xl shadow-md px-3 py-2 flex items-center gap-1.5 border border-[var(--gray-100)] text-sm font-bold">
                ⭐ 4.8
              </div>
              <div className="absolute -top-3 -left-3 bg-[var(--orange)] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-[var(--orange)]/30">
                -{discount}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
