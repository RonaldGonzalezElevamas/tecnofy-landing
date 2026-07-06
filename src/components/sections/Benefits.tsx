import type { Product } from "@/types/product"

interface BenefitsProps {
  product: Product
}

export default function Benefits({ product }: BenefitsProps) {
  return (
    <section className="bg-[var(--gray-100)] py-16 md:py-20" id="beneficios">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-2">
          Beneficios
        </p>
        <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold leading-tight mb-10">
          ¿Por qué elegir esta solución?
        </h2>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {product.benefits.map((benefit, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-[var(--gray-200)] flex items-center gap-4 transition-all duration-200 hover:shadow-md"
            >
              <div className="w-10 h-10 bg-[var(--primary-light)] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
