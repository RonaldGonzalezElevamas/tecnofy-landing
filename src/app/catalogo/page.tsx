import Link from "next/link"
import { getActiveProducts } from "@/config/products"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Catálogo | Tecnofy Chile",
  description: "Descubre nuestros productos de bienestar, seguridad y salud dental. Gadgets para eliminar el dolor muscular, proteger tu hogar y cuidar tu sonrisa. Envío gratis a todo Chile.",
}

function formatPrice(price: number): string {
  return price.toLocaleString("es-CL")
}

export default function CatalogPage() {
  const products = getActiveProducts()

  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-center mb-2">
          Catálogo Tecnofy
        </h1>
        <p className="text-[var(--gray-500)] text-center max-w-lg mx-auto mb-10">
          Soluciones inteligentes para tu bienestar y seguridad. Envío gratis a todo Chile.
        </p>

        {products.length === 0 ? (
          <p className="text-center text-[var(--gray-400)] py-20">
            Pronto tendremos nuevos productos disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/producto/${product.slug}`}
                className="group bg-white rounded-2xl border border-[var(--gray-200)] overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="aspect-square bg-[var(--gray-100)] flex items-center justify-center p-6">
                  <img
                    src={product.images[0]?.src ?? ""}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-bold text-sm mb-2 line-clamp-2">{product.name}</h2>
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
        )}
      </div>
    </main>
  )
}
