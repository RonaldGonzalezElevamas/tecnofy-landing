import type { Product } from "@/types/product"

interface GalleryProps {
  product: Product
}

export default function Gallery({ product }: GalleryProps) {
  if (!product.gallery.length) return null

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-2">
          Galería
        </p>
        <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold leading-tight mb-2">
          Así es tu solución anti-dolor
        </h2>
        <p className="text-[var(--gray-500)] max-w-xl mx-auto mb-10">
          Cada detalle está diseñado para darte el alivio muscular que necesitas
        </p>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.gallery.map((item, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden aspect-square border border-[var(--gray-200)] bg-[var(--gray-100)] cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:border-[var(--primary)] group"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              {item.label && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white text-[0.65rem] sm:text-xs font-semibold px-3 py-2 pt-6">
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
