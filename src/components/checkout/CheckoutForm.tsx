"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { CheckoutFormData, CheckoutErrors } from "@/types/checkout"
import { createOrder, sendOrderWebhook } from "@/services/order"
import { trackBeginCheckout } from "@/services/analytics"
import { SITE_CONFIG } from "@/config/site"

interface CheckoutFormProps {
  productId: string
  productName: string
  productPrice: number
  productSlug: string
}

const REGIONES_COMUNA: Record<string, string[]> = {
  "Región Metropolitana": ["Santiago", "Puente Alto", "Maipú", "La Florida", "Las Condes", "Ñuñoa", "Providencia", "Vitacura", "Lo Barnechea", "Peñalolén", "San Miguel", "Macul", "Quilicura", "Renca", "Independencia", "Recoleta", "Cerro Navia", "Conchalí", "Huechuraba", "Estación Central", "Cerrillos", "Pedro Aguirre Cerda", "La Cisterna", "La Granja", "San Ramón", "La Pintana", "El Bosque", "Pudahuel", "Lo Prado", "Quinta Normal"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Concón", "Quilpué", "Villa Alemana", "San Antonio", "Los Andes", "San Felipe", "Quillota", "La Calera"],
  "Región del Biobío": ["Concepción", "Talcahuano", "Chillán", "Los Ángeles", "Coronel", "Hualpén", "San Pedro de la Paz", "Chiguayante", "Lota"],
  "Región de La Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol", "Victoria", "Lautaro"],
  "Región de Los Lagos": ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas", "Llanquihue"],
  "Región de Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña"],
  "Región de Antofagasta": ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "San Pedro de Atacama"],
  "Región de Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"],
  "Región de O'Higgins": ["Rancagua", "San Fernando", "Rengo", "Machalí", "Santa Cruz"],
  "Región del Maule": ["Talca", "Curicó", "Linares", "Constitución", "Molina", "San Javier"],
  "Región de Arica y Parinacota": ["Arica", "Putre"],
  "Región de Atacama": ["Copiapó", "Vallenar", "Huasco", "Caldera", "Chañaral"],
  "Región de Aysén": ["Coyhaique", "Puerto Aysén", "Chile Chico", "Cochrane"],
  "Región de Magallanes": ["Punta Arenas", "Puerto Natales", "Porvenir"],
  "Región de Los Ríos": ["Valdivia", "La Unión", "Río Bueno", "Lanco", "Futrono"],
  "Región de Ñuble": ["Chillán", "San Carlos", "Quirihue", "Bulnes", "Yungay"],
}

export default function CheckoutForm({ productId, productName, productPrice, productSlug }: CheckoutFormProps) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState<CheckoutFormData>({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    region: "",
    comuna: "",
    direccion: "",
    numero: "",
    referencia: "",
    cantidad: 1,
    observaciones: "",
    aceptaTerminos: false,
  })
  const [errors, setErrors] = useState<CheckoutErrors>({})

  const total = productPrice * formData.cantidad

  const comunas = REGIONES_COMUNA[formData.region] ?? []

  function validate(): boolean {
    const newErrors: CheckoutErrors = {}
    if (!formData.nombre.trim()) newErrors.nombre = "Ingresa tu nombre"
    if (!formData.apellido.trim()) newErrors.apellido = "Ingresa tu apellido"
    if (!formData.telefono.trim()) newErrors.telefono = "Ingresa tu teléfono"
    if (!formData.region) newErrors.region = "Selecciona una región"
    if (!formData.comuna) newErrors.comuna = "Selecciona una comuna"
    if (!formData.direccion.trim()) newErrors.direccion = "Ingresa tu dirección"
    if (!formData.numero.trim()) newErrors.numero = "Ingresa el número"
    if (formData.cantidad < 1) newErrors.cantidad = "Mínimo 1 unidad"
    if (!formData.aceptaTerminos) newErrors.aceptaTerminos = "Debes aceptar los términos"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)

    try {
      trackBeginCheckout(productId, formData.cantidad, total)

      const order = createOrder(formData, productSlug)
      await sendOrderWebhook(order)

      router.push(`/gracias?id=${order.id}`)
    } catch {
      alert("Ocurrió un error al procesar tu pedido. Intenta nuevamente.")
    } finally {
      setSubmitting(false)
    }
  }

  function updateField<K extends keyof CheckoutFormData>(key: K, value: CheckoutFormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (key in errors) setErrors((prev) => ({ ...prev, [key as keyof CheckoutErrors]: undefined }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Nombre *</label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => updateField("nombre", e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${errors.nombre ? "border-red-500" : "border-[var(--gray-200)]"} bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all`}
            placeholder="Ej: Carlos"
          />
          {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Apellido *</label>
          <input
            type="text"
            value={formData.apellido}
            onChange={(e) => updateField("apellido", e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${errors.apellido ? "border-red-500" : "border-[var(--gray-200)]"} bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all`}
            placeholder="Ej: Muñoz"
          />
          {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Teléfono *</label>
          <input
            type="tel"
            value={formData.telefono}
            onChange={(e) => updateField("telefono", e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${errors.telefono ? "border-red-500" : "border-[var(--gray-200)]"} bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all`}
            placeholder="+56 9 1234 5678"
          />
          {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Correo (opcional)</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[var(--gray-200)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all"
            placeholder="correo@ejemplo.cl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Región *</label>
          <select
            value={formData.region}
            onChange={(e) => {
              updateField("region", e.target.value)
              updateField("comuna", "")
            }}
            className={`w-full px-4 py-3 rounded-xl border ${errors.region ? "border-red-500" : "border-[var(--gray-200)]"} bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all`}
          >
            <option value="">Selecciona una región</option>
            {Object.keys(REGIONES_COMUNA).map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {errors.region && <p className="text-red-500 text-xs mt-1">{errors.region}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Comuna *</label>
          <select
            value={formData.comuna}
            onChange={(e) => updateField("comuna", e.target.value)}
            disabled={!formData.region}
            className={`w-full px-4 py-3 rounded-xl border ${errors.comuna ? "border-red-500" : "border-[var(--gray-200)]"} bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all disabled:opacity-50`}
          >
            <option value="">Selecciona una comuna</option>
            {comunas.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.comuna && <p className="text-red-500 text-xs mt-1">{errors.comuna}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Dirección *</label>
          <input
            type="text"
            value={formData.direccion}
            onChange={(e) => updateField("direccion", e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${errors.direccion ? "border-red-500" : "border-[var(--gray-200)]"} bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all`}
            placeholder="Calle / Avenida"
          />
          {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Número *</label>
          <input
            type="text"
            value={formData.numero}
            onChange={(e) => updateField("numero", e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${errors.numero ? "border-red-500" : "border-[var(--gray-200)]"} bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all`}
            placeholder="123"
          />
          {errors.numero && <p className="text-red-500 text-xs mt-1">{errors.numero}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Referencia (opcional)</label>
        <input
          type="text"
          value={formData.referencia}
          onChange={(e) => updateField("referencia", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[var(--gray-200)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all"
          placeholder="Ej: Casa blanca, departamento 2B"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Cantidad *</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateField("cantidad", Math.max(1, formData.cantidad - 1))}
              className="w-10 h-10 rounded-xl border border-[var(--gray-200)] flex items-center justify-center font-bold text-lg cursor-pointer hover:bg-[var(--gray-100)] transition-colors"
            >
              -
            </button>
            <span className="w-10 text-center font-bold text-lg">{formData.cantidad}</span>
            <button
              type="button"
              onClick={() => updateField("cantidad", Math.min(10, formData.cantidad + 1))}
              className="w-10 h-10 rounded-xl border border-[var(--gray-200)] flex items-center justify-center font-bold text-lg cursor-pointer hover:bg-[var(--gray-100)] transition-colors"
            >
              +
            </button>
          </div>
          {errors.cantidad && <p className="text-red-500 text-xs mt-1">{errors.cantidad}</p>}
        </div>
        <div className="flex flex-col justify-end">
          <div className="bg-[var(--gray-100)] rounded-xl p-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{productName} x{formData.cantidad}</span>
              <span>${(productPrice * formData.cantidad).toLocaleString("es-CL")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{SITE_CONFIG.shipping.freeLabel}</span>
              <span className="text-[var(--accent-dark)] font-semibold">GRATIS</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-[var(--gray-200)] pt-2 mt-2">
              <span>Total</span>
              <span className="text-[var(--primary)]">${total.toLocaleString("es-CL")}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Observaciones (opcional)</label>
        <textarea
          value={formData.observaciones}
          onChange={(e) => updateField("observaciones", e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[var(--gray-200)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all resize-none"
          rows={2}
          placeholder="¿Algo que debamos saber?"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="terminos"
          checked={formData.aceptaTerminos}
          onChange={(e) => updateField("aceptaTerminos", e.target.checked)}
          className="mt-1 w-4 h-4 accent-[var(--accent)]"
        />
        <label htmlFor="terminos" className="text-sm text-[var(--gray-500)]">
          Acepto las{' '}
          <a href="/terminos" target="_blank" className="text-[var(--primary)] underline">
            políticas de tratamiento de datos
          </a>{' '}
          y confirmo que los datos ingresados son correctos para realizar la entrega.
        </label>
      </div>
      {errors.aceptaTerminos && <p className="text-red-500 text-xs -mt-4">{errors.aceptaTerminos}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[var(--accent)] text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-[var(--accent)]/25 transition-all duration-200 hover:bg-[var(--accent-dark)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Procesando..." : `Confirmar pedido — $${total.toLocaleString("es-CL")}`}
      </button>

      <p className="text-center text-xs text-[var(--gray-400)]">
        🔒 Pago contra entrega — Recibes, revisas y pagas en tu domicilio
      </p>
    </form>
  )
}
