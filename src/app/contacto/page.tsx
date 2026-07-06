import { SITE_CONFIG } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Contacto | ${SITE_CONFIG.name}`,
  description: "Contáctanos por WhatsApp o correo electrónico. Estamos en Chile para ayudarte.",
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-lg">
        <h1 className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-center mb-4">
          Contacto
        </h1>
        <p className="text-center text-[var(--gray-500)] mb-10">
          ¿Tienes dudas? Estamos aquí para ayudarte.
        </p>

        <div className="space-y-4">
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp.number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#25D366] text-white p-5 rounded-2xl transition-all hover:bg-[#20BD5C] hover:-translate-y-0.5"
          >
            <svg className="w-8 h-8 fill-white flex-shrink-0" viewBox="0 0 32 32"><path d="M16.004 3.996a12.004 12.004 0 0 1 12.004 12.004 12.004 12.004 0 0 1-12.004 12.004c-2.43 0-4.734-.732-6.677-2.004l-6.328 2.004 2.004-6.196A11.92 11.92 0 0 1 4 16.004 12.004 12.004 0 0 1 16.004 3.996z"/></svg>
            <div>
              <p className="font-bold">{SITE_CONFIG.contact.phone}</p>
              <p className="text-sm opacity-90">Respuesta en minutos</p>
            </div>
          </a>

          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="flex items-center gap-4 bg-[var(--gray-100)] p-5 rounded-2xl transition-all hover:bg-[var(--gray-200)] hover:-translate-y-0.5"
          >
            <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <div>
              <p className="font-bold text-[var(--gray-700)]">{SITE_CONFIG.contact.email}</p>
              <p className="text-sm text-[var(--gray-400)]">Escríbenos cuando quieras</p>
            </div>
          </a>
        </div>

        <div className="mt-10 bg-[var(--gray-100)] rounded-2xl p-6 text-sm text-[var(--gray-500)] leading-relaxed">
          <p className="font-bold text-[var(--gray-700)] mb-2">{SITE_CONFIG.name}</p>
          {SITE_CONFIG.contact.address && <p>{SITE_CONFIG.contact.address}</p>}
          <p className="mt-2">{SITE_CONFIG.contact.schedule}</p>
        </div>
      </div>
    </main>
  )
}
