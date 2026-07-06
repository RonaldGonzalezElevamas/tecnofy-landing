import type { Product } from "@/types/product"

interface ProblemProps {
  product: Product
}

export default function Problem({ product }: ProblemProps) {
  return (
    <section className="bg-[var(--gray-100)] py-16 md:py-20" id="dolor">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-2">
          ¿Te sientes identificado?
        </p>
        <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold leading-tight mb-2">
          El estrés y la tensión no son normales
        </h2>
        <p className="text-[var(--gray-500)] max-w-xl mx-auto mb-10">
          Si pasas horas frente al computador, manejando o estudias, tus músculos te están pidiendo ayuda
        </p>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {product.painPoints.map((point, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-[var(--gray-200)] transition-all duration-200 hover:border-[var(--primary)]/30 hover:shadow-lg"
            >
              <div className="text-[1.75rem] mb-4">{point.icon}</div>
              <h3 className="font-bold mb-2">{point.title}</h3>
              <p className="text-sm text-[var(--gray-500)] leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
