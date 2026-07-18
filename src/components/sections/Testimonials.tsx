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
              <div className="aspect-[4/3] bg-[var(--gray-100)] overflow-hidden">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-[var(--gray-300)]">
                    {t.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex gap-0.5 mb-2 text-sm">{Array(t.rating).fill("⭐").join("")}</div>
                <p className="text-sm text-[var(--gray-600)] leading-relaxed mb-3">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-[0.6875rem] text-[var(--gray-400)]">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
