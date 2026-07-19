import { getActiveProducts } from "@/config/products"
import Link from "next/link"
import Hero from "@/components/sections/Hero"
import Problem from "@/components/sections/Problem"
import Solution from "@/components/sections/Solution"
import Benefits from "@/components/sections/Benefits"
import Gallery from "@/components/sections/Gallery"
import HowItWorks from "@/components/sections/HowItWorks"
import Specs from "@/components/sections/Specs"
import VideoDemo from "@/components/sections/VideoDemo"
import Testimonials from "@/components/sections/Testimonials"
import Offer from "@/components/sections/Offer"
import Urgency from "@/components/sections/Urgency"
import FinalCTA from "@/components/sections/FinalCTA"
import FAQ from "@/components/sections/FAQ"

function formatPrice(price: number): string {
  return price.toLocaleString("es-CL")
}

export default function Home() {
  const products = getActiveProducts()
  const featured = products[0]

  if (!featured) {
    return (
      <main className="min-h-screen flex items-center justify-center text-[var(--gray-500)]">
        No hay productos disponibles
      </main>
    )
  }

  return (
    <main>
      <Hero product={featured} />
      <Problem product={featured} />
      <Solution product={featured} />
      <Benefits product={featured} />
      <Gallery product={featured} />
      <HowItWorks product={featured} />
      <Specs product={featured} />
      <VideoDemo product={featured} />
      <Testimonials product={featured} />
      <Offer product={featured} />
      <Urgency product={featured} />
      <FinalCTA productName={featured.name} finalCtaTitle={featured.finalCtaTitle} productSlug={featured.slug} />
      <FAQ product={featured} />

      {products.length > 1 && (
        <section className="py-16 px-4 bg-[var(--gray-100)]">
          <div className="container mx-auto">
            <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-center mb-2">
              Nuestros Productos
            </h2>
            <p className="text-[var(--gray-500)] text-center max-w-lg mx-auto mb-10">
              Soluciones inteligentes para tu bienestar, seguridad y salud dental. Envío gratis a todo Chile.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/producto/${product.slug}`}
                  className="group bg-white rounded-2xl border border-[var(--gray-200)] overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] bg-[var(--gray-100)] flex items-center justify-center p-6">
                    <img
                      src={product.images[0]?.src ?? ""}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-sm mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-[var(--gray-500)] mb-3 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[1.25rem] font-extrabold">
                        ${formatPrice(product.price.offer)}
                      </span>
                      <span className="text-xs text-[var(--gray-400)] line-through">
                        ${formatPrice(product.price.normal)}
                      </span>
                      <span className="bg-[var(--red)] text-white text-[0.625rem] font-bold px-1.5 py-0.5 rounded ml-auto">
                        -{Math.round((1 - product.price.offer / product.price.normal) * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-[0.65rem] text-[var(--accent-dark)] font-bold">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="5 9 2 12 5 15"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
                      Envío gratis
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
