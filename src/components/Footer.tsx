import Link from "next/link"
import { SITE_CONFIG } from "@/config/site"

export default function Footer() {
  return (
    <footer className="bg-[var(--dark)] text-[var(--gray-400)] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <h3 className="text-white font-bold mb-3">{SITE_CONFIG.name}</h3>
            <p className="text-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Información</h4>
            <ul className="text-sm space-y-2">
              <li>🚚 {SITE_CONFIG.shipping.freeLabel} ({SITE_CONFIG.shipping.estimateDays})</li>
              <li>💵 {SITE_CONFIG.payment.methodLabel}</li>
              <li>🔄 Cambios y devoluciones</li>
              <li>
                <Link href="/politicas" className="hover:text-[var(--accent)] transition-colors">
                  Políticas de envío
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="hover:text-[var(--accent)] transition-colors">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contacto</h4>
            <ul className="text-sm space-y-2">
              <li>
                WhatsApp:{' '}
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] no-underline"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-[var(--accent)] transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li>{SITE_CONFIG.contact.address}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 mt-10 pt-6 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name} Chile. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
