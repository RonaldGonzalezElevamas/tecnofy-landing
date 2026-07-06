import type { Product } from "@/types/product"

interface UrgencyProps {
  product: Product
}

export default function Urgency({ product }: UrgencyProps) {
  return (
    <section className="bg-[var(--dark)] text-white py-16 md:py-20 text-center" id="urgencia">
      <div className="container mx-auto px-4">
        <div className="inline-flex items-center gap-2 bg-[var(--red)]/15 text-red-400 text-xs font-bold px-5 py-2 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-ping" />
          Stock limitado — Alta demanda
        </div>
        <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold leading-tight mb-8">
          Últimas unidades disponibles <br />esta <span className="text-[var(--accent)]">semana</span>
        </h2>
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="text-[1.5rem] font-bold text-[var(--accent)]">350+</div>
            <div className="text-xs text-[var(--gray-400)] mt-1">Vendidos esta semana</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="text-[1.5rem] font-bold text-[var(--accent)]">94%</div>
            <div className="text-xs text-[var(--gray-400)] mt-1">Clientes satisfechos</div>
          </div>
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="text-[1.5rem] font-bold text-[var(--accent)]">{product.stock ?? 42}</div>
            <div className="text-xs text-[var(--gray-400)] mt-1">Unidades restantes</div>
          </div>
        </div>
        <div className="max-w-md mx-auto mb-4 h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] rounded-full"
            style={{ width: `${Math.min(95, Math.max(10, 100 - (product.stock ?? 0) / 5))}%` }}
          />
        </div>
        <p className="text-sm text-[var(--gray-400)]">
          No te quedes sin el tuyo — Una vez que se acabe el stock, no sabremos cuándo volverá
        </p>
      </div>
    </section>
  )
}
