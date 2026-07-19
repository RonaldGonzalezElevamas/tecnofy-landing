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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {product.testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-[var(--gray-200)] shadow-sm"
            >
              {t.avatar && (
                <div className="px-5 pt-5 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[var(--primary)]/20"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-[0.6875rem] text-[var(--gray-400)]">{t.location}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5 text-sm">{Array(t.rating).fill("\u2B50").join("")}</div>
                </div>
              )}
              <div className="p-5">
                {!t.avatar && (
                  <>
                    <div className="flex gap-0.5 mb-2 text-sm">{Array(t.rating).fill("\u2B50").join("")}</div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-[0.6875rem] text-[var(--gray-400)] mb-3">{t.location}</div>
                  </>
                )}
                <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
