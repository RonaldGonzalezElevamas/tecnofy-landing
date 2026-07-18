import type { Product } from "@/types/product"

interface SolutionProps {
  product: Product
}

export default function Solution({ product }: SolutionProps) {
  return (
    <section className="py-16 md:py-20" id="solucion">
      <div className="container mx-auto px-4">
        <div className="grid gap-14 md:grid-cols-2 items-center">
          <div className="flex items-center justify-center order-2 md:order-1">
            <div className="w-[240px] h-[240px] sm:w-[256px] sm:h-[256px] md:w-[300px] md:h-[300px] bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-2xl flex flex-col items-center justify-center text-center p-4">
              <img
                src={product.images[1]?.src ?? product.images[0]?.src ?? "/images/offer.png"}
                alt={product.name}
                className="w-[180px] md:w-[220px] h-auto rounded-xl object-contain"
                loading="lazy"
              />
              <div className="text-[var(--gray-400)] text-xs mt-3">
                {product.solutionImageLabel ?? "Alivio 4D · Calor · Portátil"}
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-2">
              {product.solutionLabel ?? "La Solución"}
            </p>
            <h2
              className="text-[1.5rem] sm:text-[1.75rem] md:text-[2.25rem] font-extrabold leading-tight mb-1"
              dangerouslySetInnerHTML={{ __html: product.solutionTitle ?? "Alivia el dolor muscular <span class=\"text-[var(--primary)]\">donde y cuando quieras</span>" }}
            />
            <div className="space-y-4 mt-6">
              {product.features.map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[var(--accent)]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-[var(--accent-dark)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[0.9375rem]">{feature.title}</h3>
                    <p className="text-sm text-[var(--gray-500)] mt-1 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
