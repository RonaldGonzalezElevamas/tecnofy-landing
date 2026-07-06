import Link from "next/link"
import { SITE_CONFIG } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Pedido confirmado | ${SITE_CONFIG.name}`,
  description: "Tu pedido ha sido recibido. Te contactaremos para coordinar la entrega.",
}

export default async function GraciasPage(props: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await props.searchParams

  return (
    <main className="min-h-screen pt-28 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center max-w-lg">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-[1.75rem] md:text-[2.25rem] font-extrabold mb-4">
          ¡Pedido confirmado!
        </h1>
        <p className="text-lg text-[var(--gray-500)] mb-6 leading-relaxed">
          Hemos recibido tu pedido correctamente. En las próximas horas te contactaremos por WhatsApp para coordinar la entrega.
        </p>

        {id && (
          <div className="bg-[var(--gray-100)] rounded-2xl p-4 mb-6 inline-block">
            <span className="text-xs text-[var(--gray-400)]">N° de pedido</span>
            <p className="font-bold text-lg">{id}</p>
          </div>
        )}

        <div className="bg-[var(--gray-100)] rounded-2xl p-6 mb-8 text-left space-y-3">
          <h3 className="font-bold text-sm">¿Qué sigue?</h3>
          <div className="flex gap-3 text-sm">
            <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
            <p className="text-[var(--gray-500)]">Te contactaremos por WhatsApp para confirmar tu pedido</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
            <p className="text-[var(--gray-500)]">Preparamos tu producto y lo enviamos ({SITE_CONFIG.shipping.estimateDays})</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
            <p className="text-[var(--gray-500)]">Recibes en tu domicilio, revisas y pagas. Sin riesgo.</p>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp.number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl transition-all hover:bg-[#20BD5C]"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 32 32"><path d="M16.004 3.996a12.004 12.004 0 0 1 12.004 12.004 12.004 12.004 0 0 1-12.004 12.004c-2.43 0-4.734-.732-6.677-2.004l-6.328 2.004 2.004-6.196A11.92 11.92 0 0 1 4 16.004 12.004 12.004 0 0 1 16.004 3.996z"/></svg>
            Hablar por WhatsApp
          </a>
          <div>
            <Link href="/" className="text-sm text-[var(--primary)] underline">
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
