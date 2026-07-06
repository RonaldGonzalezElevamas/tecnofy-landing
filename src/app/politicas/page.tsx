import { SITE_CONFIG } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Políticas de Envío | ${SITE_CONFIG.name}`,
  description: "Políticas de envío, cobertura, plazos de entrega y condiciones de pago contra entrega en Tecnofy Chile.",
}

export default function PoliticasPage() {
  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-[1.75rem] md:text-[2.25rem] font-extrabold text-center mb-8">
          Políticas de Envío
        </h1>

        <div className="space-y-6 text-sm text-[var(--gray-600)] leading-relaxed">
          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">Cobertura</h2>
            <p>
              Realizamos envíos a <strong>todas las regiones y comunas de Chile</strong>, desde Arica hasta
              Punta Arenas. No importa dónde estés, si hay dirección, llegamos.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">Plazos de Entrega</h2>
            <p>
              El tiempo estimado de entrega es de <strong>{SITE_CONFIG.shipping.estimateDays}</strong> hábiles
              una vez confirmado el pedido. Los plazos pueden variar según la región:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Región Metropolitana: 1-3 días hábiles</li>
              <li>Zonas urbanas (Valparaíso, Concepción, etc.): 2-4 días hábiles</li>
              <li>Zonas extremas y rurales: 3-8 días hábiles</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">Costo de Envío</h2>
            <p>
              El envío es <strong>{SITE_CONFIG.shipping.freeLabel}</strong> para todos los pedidos, sin
              monto mínimo de compra. No existen costos ocultos. El precio que ves en la ficha del producto
              es el precio final que pagas.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">Proceso de Entrega</h2>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>Recibes tu pedido en la dirección indicada</li>
              <li>El repartidor te entregará el producto</li>
              <li>Pagas en efectivo el valor del pedido</li>
              <li>Si no estás conforme, puedes rechazar el pedido sin costo</li>
            </ol>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">Confirmación de Pedido</h2>
            <p>
              Una vez realizado tu pedido, te contactaremos por WhatsApp para confirmar los datos de entrega.
              Es importante que respondas para agilizar el proceso. Si no podemos contactarte en 48 horas,
              el pedido será cancelado automáticamente.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-[var(--gray-800)] text-base mb-2">Dirección Incorrecta</h2>
            <p>
              Si los datos de entrega proporcionados son incorrectos y el pedido no puede ser entregado,
              el cliente deberá coordinar un nuevo envío. {SITE_CONFIG.name} no se hace responsable por
              direcciones mal ingresadas por el cliente.
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
