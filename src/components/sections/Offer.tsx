import Link from "next/link"
import type { Product } from "@/types/product"
import { SITE_CONFIG } from "@/config/site"
import WhatsAppButton from "@/components/WhatsAppButton"

interface OfferProps {
  product: Product
}

function formatPrice(price: number): string {
  return price.toLocaleString("es-CL")
}

export default function Offer({ product }: OfferProps) {
  return (
    <section className="py-16 md:py-20" id="comprar">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-2">
          Oferta Especial
        </p>
        <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold leading-tight mb-2">
          Elige tu solución
        </h2>
        <p className="text-[var(--gray-500)] max-w-xl mx-auto mb-10">
          Aprovecha el descuento por lanzamiento y dile adiós al dolor — envío gratis a todo Chile
        </p>
      </div>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl border-2 border-[var(--primary)]/20 shadow-2xl overflow-hidden">
          <div className="bg-[var(--primary)] text-white text-center py-3 font-bold text-xs sm:text-sm tracking-wider">
            🎯 OFERTA LANZAMIENTO CHILE — STOCK LIMITADO
          </div>
          <div className="p-6 sm:p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-2 items-center">
              <div className="flex flex-col items-center justify-center">
                <img
                  src={product.images[0]?.src ?? "/images/detail-1.webp"}
                  alt={product.name}
                  className="w-[200px] sm:w-[240px] md:w-[300px] h-auto rounded-2xl object-contain"
                  loading="lazy"
                />
                <div className="flex gap-2 mt-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--gray-600)] bg-white px-2.5 py-1.5 rounded-full border border-[var(--gray-200)]">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="5 9 2 12 5 15"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                    Envío gratis
                  </span>
                  <span className="inline-flex items-center gap-1 bg-[var(--accent)] text-white text-xs font-bold px-2.5 py-1.5 rounded-full border border-[var(--accent)]">
                    ⭐ 4.8
                  </span>
                </div>
              </div>
              <div>
                <div className="offer-options space-y-4">
                  <div className="bg-[var(--gray-100)] rounded-2xl p-6 text-center border-2 border-[var(--gray-200)] relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gray-400)] text-white text-[0.625rem] font-bold px-4 py-1 rounded-full tracking-wider">
                      1 UNIDAD
                    </div>
                    <div className="mt-4">
                      <div className="text-lg text-[var(--gray-400)] line-through">
                        ${formatPrice(product.price.normal)}
                      </div>
                      <div className="flex items-baseline gap-2 justify-center mt-1">
                        <span className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-extrabold">
                          ${formatPrice(product.price.offer)}
                        </span>
                        <span className="bg-[var(--red)] text-white text-xs font-bold px-2 py-0.5 rounded">
                          -{Math.round((1 - product.price.offer / product.price.normal) * 100)}%
                        </span>
                      </div>
                      <p className="text-sm text-[var(--gray-400)] mt-1">Precio final + envío gratis</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/checkout"
                        className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 text-lg rounded-2xl bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] active:scale-[0.98] transition-all duration-200"
                      >
                        Comprar ahora
                      </Link>
                      <WhatsAppButton variant="small" productName={product.name} />
                    </div>
                  </div>

                  {product.price.bundle && (
                    <div className="bg-[var(--primary-light)] rounded-2xl p-6 text-center border-2 border-[var(--primary)] relative">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white text-[0.625rem] font-bold px-4 py-1 rounded-full tracking-wider">
                        ⚡ MÁS AHORRO
                      </div>
                      <div className="inline-block bg-[var(--accent)] text-white text-[0.65rem] font-bold px-2 py-0.5 rounded mt-5">
                        Recomendado
                      </div>
                      <div className="mt-1">
                        <div className="text-lg text-[var(--gray-400)] line-through">
                          ${formatPrice(product.price.normal * 2)}
                        </div>
                        <div className="flex items-baseline gap-2 justify-center mt-1">
                          <span className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-extrabold">
                            ${formatPrice(product.price.bundle.price)}
                          </span>
                          <span className="bg-[var(--red)] text-white text-xs font-bold px-2 py-0.5 rounded">
                            -{Math.round((1 - product.price.bundle.price / (product.price.normal * 2)) * 100)}%
                          </span>
                        </div>
                        <p className="text-sm text-[var(--gray-400)] mt-1">
                          ${formatPrice(Math.round(product.price.bundle.price / product.price.bundle.quantity))} c/u · Ahorras ${formatPrice(product.price.normal * 2 - product.price.bundle.price)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link
                          href="/checkout?quantity=2"
                          className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 text-lg rounded-2xl bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] active:scale-[0.98] transition-all duration-200"
                        >
                          Comprar ahora
                        </Link>
                        <WhatsAppButton variant="small" productName={product.name} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-[var(--gray-200)] pt-6 mt-6">
              <div className="flex flex-wrap gap-4 justify-center mb-4">
                <span className="inline-flex items-center gap-1 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                  {SITE_CONFIG.shipping.freeLabel}
                </span>
                <span className="inline-flex items-center gap-1 bg-[var(--accent)] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                  {SITE_CONFIG.payment.methodLabel}
                </span>
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                  📦 {SITE_CONFIG.shipping.estimateDays}
                </span>
              </div>
              <p className="text-center text-xs text-[var(--gray-400)]">
                🔒 Pago 100% seguro — Pagas solo cuando recibes el producto en tu casa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
