import { SITE_CONFIG } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Privacidad | ${SITE_CONFIG.name}`,
  description: "Política de privacidad y tratamiento de datos personales en Tecnofy Chile.",
}

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-center mb-8">
          Política de Privacidad
        </h1>

        <div className="space-y-6 text-sm text-[var(--gray-600)] leading-relaxed">
          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">1. Datos que Recopilamos</h2>
            <p>
              Para procesar tu pedido, recopilamos la siguiente información personal:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Nombre y apellido</li>
              <li>Número de teléfono</li>
              <li>Dirección de envío (calle, número, comuna, región)</li>
              <li>Correo electrónico (opcional)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">2. Uso de los Datos</h2>
            <p>
              Tus datos son utilizados exclusivamente para:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Procesar y enviar tu pedido</li>
              <li>Contactarte para coordinar la entrega</li>
              <li>Mejorar nuestro servicio al cliente</li>
            </ul>
            <p className="mt-2">
              No utilizamos tus datos para fines publicitarios ni los compartimos con terceros no relacionados
              con la logística de tu pedido.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">3. Almacenamiento</h2>
            <p>
              Tus datos se almacenan de forma segura y serán eliminados una vez que el pedido haya sido
              completado exitosamente, salvo que exista una obligación legal de mantenerlos.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">4. Tus Derechos</h2>
            <p>
              Tienes derecho a solicitar la eliminación, modificación o acceso a tus datos personales en
              cualquier momento. Para ejercer estos derechos, contáctanos por WhatsApp al {SITE_CONFIG.contact.phone}
              o por correo a {SITE_CONFIG.contact.email}.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">5. Cookies</h2>
            <p>
              Nuestro sitio web puede utilizar cookies para mejorar la experiencia de navegación y analizar
              el tráfico del sitio. Puedes deshabilitar las cookies desde la configuración de tu navegador.
            </p>
          </section>

          <p className="text-[var(--gray-400)] text-xs pt-4 border-t border-[var(--gray-200)]">
            Última actualización: Julio 2026
          </p>
        </div>
      </div>
    </main>
  )
}
