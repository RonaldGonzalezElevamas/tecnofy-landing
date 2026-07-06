import type { Product } from "@/types/product"

interface HowItWorksProps {
  product: Product
}

export default function HowItWorks({ product }: HowItWorksProps) {
  return (
    <section className="py-16 md:py-20" id="como-funciona">
      <div className="container mx-auto px-4">
        <div className="grid gap-14 md:grid-cols-2 items-center">
          <div className="flex items-center justify-center order-2 md:order-1">
            <div className="w-[240px] h-[240px] sm:w-[256px] sm:h-[256px] md:w-[300px] md:h-[300px] bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 rounded-2xl flex flex-col items-center justify-center text-center p-4">
              <img
                src="/images/detail-3.webp"
                alt="Masajeador 4D en uso"
                className="w-[180px] md:w-[220px] h-auto rounded-xl object-contain"
                loading="lazy"
              />
              <div className="text-[var(--gray-400)] text-xs mt-3">
                Alivio completo · Cualquier zona
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-2">
              Cómo aliviar el dolor
            </p>
            <h2 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2.25rem] font-extrabold leading-tight mb-2">
              Relajación en <span className="text-[var(--primary)]">3 pasos</span>
            </h2>
            <div className="space-y-6 mt-6">
              {product.howItWorks.map((step) => (
                <div key={step.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-extrabold text-lg flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="text-sm text-[var(--gray-500)] mt-0.5">{step.description}</p>
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
