import type { Product } from "@/types/product"

interface SpecsProps {
  product: Product
}

export default function Specs({ product }: SpecsProps) {
  return (
    <section className="bg-[var(--gray-100)] py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-2">
          Especificaciones
        </p>
        <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold leading-tight mb-10">
          Diseñado para tu bienestar
        </h2>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
          {product.specs.map((spec, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 text-center border border-[var(--gray-200)]"
            >
              <div className="text-[1.5rem] mb-2">{spec.icon}</div>
              <div className="text-[0.6875rem] text-[var(--gray-400)] uppercase tracking-wider font-semibold">
                {spec.label}
              </div>
              <div className="text-sm font-semibold mt-1">{spec.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
