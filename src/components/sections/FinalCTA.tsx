import Link from "next/link"
import { SITE_CONFIG } from "@/config/site"
import WhatsAppButton from "@/components/WhatsAppButton"

interface FinalCTAProps {
  productName?: string
}

export default function FinalCTA({ productName }: FinalCTAProps) {
  return (
    <section
      className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16 md:py-24 text-center"
      id="pedir"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-[1.75rem] md:text-[2.75rem] font-extrabold leading-tight mb-4">
          ¿Listo para relajar tus músculos<br />sin depender de nadie?
        </h2>
        <p className="text-lg opacity-80 max-w-lg mx-auto mb-8 leading-relaxed">
          Pide ahora y paga solo cuando recibas el producto en tu casa. Sin riesgos, sin tarjetas, sin complicaciones.
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="max-w-md w-full space-y-3">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 text-lg rounded-2xl bg-white text-[var(--primary)] hover:bg-gray-100 active:scale-[0.98] transition-all duration-200 w-full"
            >
              Comprar ahora
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <WhatsAppButton variant="large" productName={productName} />
          </div>
          <span className="text-sm opacity-60 flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
            {SITE_CONFIG.payment.methodNote}
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm opacity-60">
          <span>🚚 {SITE_CONFIG.shipping.freeLabel}</span>
          <span>🔒 Pago seguro</span>
          <span>🔄 Satisfacción garantizada</span>
        </div>
      </div>
    </section>
  )
}
