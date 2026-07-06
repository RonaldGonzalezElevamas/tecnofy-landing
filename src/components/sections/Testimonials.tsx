import type { Product } from "@/types/product"

interface TestimonialsProps {
  product: Product
}

export default function Testimonials({ product }: TestimonialsProps) {
  return (
    <section className="py-16 md:py-20" id="testimonios">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-2">
          Testimonios
        </p>
        <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold leading-tight mb-2">
          +{Math.floor(Math.random() * 500 + 800)} chilenos ya lo probaron
        </h2>
        <p className="text-[var(--gray-500)] max-w-xl mx-auto mb-10">
          Esto es lo que dicen de nosotros
        </p>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {product.testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[var(--gray-100)] rounded-2xl p-6 border border-[var(--gray-200)]"
            >
              <div className="flex gap-0.5 mb-3 text-lg">{Array(t.rating).fill("⭐").join("")}</div>
              <p className="text-sm text-[var(--gray-600)] leading-relaxed mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[var(--primary)]/15 flex items-center justify-center text-xs font-bold text-[var(--primary)]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-[0.8125rem] font-semibold">{t.name}</div>
                  <div className="text-[0.6875rem] text-[var(--gray-400)]">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
