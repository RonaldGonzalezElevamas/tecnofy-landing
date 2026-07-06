import { redirect } from "next/navigation"
import { getActiveProducts } from "@/config/products"
import { SITE_CONFIG } from "@/config/site"
import CheckoutForm from "@/components/checkout/CheckoutForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Checkout | ${SITE_CONFIG.name}`,
  description: "Completa tu pedido. Pago contra entrega. Envío gratis a todo Chile.",
}

export default async function CheckoutPage(props: { searchParams: Promise<{ quantity?: string }> }) {
  const searchParams = await props.searchParams
  const products = getActiveProducts()
  const product = products[0]
  if (!product) redirect("/")

  const initialQuantity = Math.max(1, Math.min(10, parseInt(searchParams.quantity ?? "1", 10) || 1))
  const isBundle = initialQuantity === 2 && product.price.bundle
  const unitPrice = isBundle ? Math.round(product.price.bundle!.price / product.price.bundle!.quantity) : product.price.offer
  const bundleTotalPrice = isBundle ? product.price.bundle!.price : undefined

  return (
    <main className="min-h-screen pt-28 pb-16 bg-[var(--gray-100)]">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-[1.75rem] font-extrabold mb-2">Completa tu pedido</h1>
          <p className="text-sm text-[var(--gray-500)]">
            {SITE_CONFIG.payment.methodLabel} — Recibes, revisas y pagas
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-[var(--gray-200)]">
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[var(--gray-200)]">
            <img
              src={product.images[0]?.src ?? ""}
              alt={product.name}
              className="w-16 h-16 rounded-xl object-cover bg-[var(--gray-100)]"
            />
            <div>
              <h2 className="font-bold text-sm">{product.name}</h2>
              <p className="text-[var(--primary)] font-bold text-lg">
                ${unitPrice.toLocaleString("es-CL")} {isBundle ? "/u" : ""}
              </p>
            </div>
          </div>
          <CheckoutForm
            productId={product.id}
            productName={product.name}
            productPrice={unitPrice}
            productSlug={product.slug}
            initialQuantity={initialQuantity}
            bundleTotalPrice={bundleTotalPrice}
          />
        </div>
      </div>
    </main>
  )
}
