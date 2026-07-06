import { SITE_CONFIG } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Términos y Condiciones | ${SITE_CONFIG.name}`,
  description: "Términos y condiciones de compra en Tecnofy Chile. Pago contra entrega, envío gratis, cambios y devoluciones.",
}

export default function TerminosPage() {
  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-center mb-8">
          Términos y Condiciones
        </h1>

        <div className="space-y-6 text-sm text-[var(--gray-600)] leading-relaxed">
          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">1. Información General</h2>
            <p>
              Al realizar una compra en {SITE_CONFIG.name} ({SITE_CONFIG.url}), aceptas los siguientes términos y condiciones.
              {SITE_CONFIG.name} es una tienda online con envíos a todo Chile.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">2. Productos</h2>
            <p>
              Todos los productos ofrecidos en nuestro sitio web cuentan con descripciones detalladas,
              imágenes representativas y especificaciones técnicas. Hacemos todo lo posible por mostrar
              los colores y detalles de forma precisa, pero no podemos garantizar que tu monitor muestre
              los colores de manera exacta.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">3. Precios y Pagos</h2>
            <p>
              Todos los precios están expresados en pesos chilenos (CLP) e incluyen IVA. El método de pago
              disponible es <strong>{SITE_CONFIG.payment.methodLabel}</strong>: pagas en efectivo al momento
              de recibir tu pedido. No almacenamos información de tarjetas de crédito ni débito.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">4. Envíos</h2>
            <p>
              Realizamos envíos a todo Chile a través de empresas de logística asociadas.
              El plazo de entrega estimado es de <strong>{SITE_CONFIG.shipping.estimateDays}</strong> una vez
              confirmado el pedido. El envío es <strong>{SITE_CONFIG.shipping.freeLabel}</strong> para todos
              los pedidos. No nos hacemos responsables por demoras causadas por la empresa de logística o
              por datos de entrega incorrectos proporcionados por el cliente.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">5. Cambios y Devoluciones</h2>
            <p>
              Aceptamos cambios y devoluciones dentro de los primeros 5 días hábiles desde la recepción del
              producto, siempre que este se encuentre en su empaque original y sin signos de uso. Para iniciar
              un proceso de cambio o devolución, contáctanos por WhatsApp al {SITE_CONFIG.contact.phone}.
              Los costos de envío por cambios son compartidos entre el cliente y la empresa.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">6. Privacidad de Datos</h2>
            <p>
              Tus datos personales (nombre, teléfono, dirección) son utilizados exclusivamente para procesar
              y entregar tu pedido. No compartimos tu información con terceros para fines publicitarios.
              Al realizar una compra, autorizas el uso de tus datos para los fines logísticos de la compra.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">7. Contacto</h2>
            <p>
              Para cualquier consulta sobre estos términos, puedes contactarnos a través de:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>WhatsApp: {SITE_CONFIG.contact.phone}</li>
              <li>Email: {SITE_CONFIG.contact.email}</li>
            </ul>
          </section>

          <p className="text-[var(--gray-400)] text-xs pt-4 border-t border-[var(--gray-200)]">
            Última actualización: Julio 2026
          </p>
        </div>
      </div>
    </main>
  )
}
