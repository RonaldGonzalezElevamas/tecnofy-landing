"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { CheckoutFormData, CheckoutErrors } from "@/types/checkout"
import { createOrder, submitOrderToServer } from "@/services/order"
import { trackBeginCheckout } from "@/services/analytics"
import { SITE_CONFIG } from "@/config/site"

interface CheckoutFormProps {
  productId: string
  productName: string
  productPrice: number
  productSlug: string
  initialQuantity?: number
  bundleTotalPrice?: number
}

const REGIONES_COMUNA: Record<string, string[]> = {
  "Región de Arica y Parinacota": [
    "Arica", "Camarones", "Putre", "General Lagos",
  ],
  "Región de Tarapacá": [
    "Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica",
  ],
  "Región de Antofagasta": [
    "Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama",
    "Tocopilla", "María Elena",
  ],
  "Región de Atacama": [
    "Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen",
    "Freirina", "Huasco",
  ],
  "Región de Coquimbo": [
    "La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela",
    "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado",
  ],
  "Región de Valparaíso": [
    "Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar",
    "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo",
    "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales",
    "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe",
    "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué",
    "Villa Alemana",
  ],
  "Región Metropolitana": [
    "Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba",
    "Independencia", "La Cisterna", "La Granja", "La Florida", "La Pintana", "La Reina", "Las Condes",
    "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda",
    "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca",
    "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Colina", "Lampa", "Til Til", "Pirque",
    "Puente Alto", "San José de Maipo", "Buin", "Calera de Tango", "Paine", "San Bernardo",
    "Alhué", "Curacaví", "María Pinto", "Melipilla", "San Pedro", "Talagante", "El Monte",
    "Isla de Maipo", "Padre Hurtado", "Peñaflor",
  ],
  "Región del Libertador General Bernardo O'Higgins": [
    "Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí",
    "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa",
    "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones",
    "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo",
    "Placilla", "Pumanque", "Santa Cruz",
  ],
  "Región del Maule": [
    "Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro",
    "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén",
    "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún",
    "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas",
  ],
  "Región de Ñuble": [
    "Chillán", "Chillán Viejo", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "El Carmen",
    "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil",
    "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay",
  ],
  "Región del Biobío": [
    "Concepción", "Coronel", "Chiguayante", "Florida", "Hualpén", "Hualqui", "Lota", "Penco",
    "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Lebu", "Arauco", "Cañete",
    "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero",
    "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo",
    "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío",
  ],
  "Región de La Araucanía": [
    "Temuco", "Carahue", "Cholchol", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea",
    "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco",
    "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica",
    "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco",
    "Purén", "Renaico", "Traiguén", "Victoria",
  ],
  "Región de Los Ríos": [
    "Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli",
    "La Unión", "Futrono", "Lago Ranco", "Río Bueno",
  ],
  "Región de Los Lagos": [
    "Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Llanquihue", "Los Muermos",
    "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue",
    "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puyehue", "Río Negro",
    "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena",
  ],
  "Región de Aysén del General Carlos Ibáñez del Campo": [
    "Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Chile Chico", "Río Ibáñez",
    "Cochrane", "O'Higgins", "Tortel", "Villa O'Higgins",
  ],
  "Región de Magallanes y de la Antártica Chilena": [
    "Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica",
    "Porvenir", "Primavera", "Timaukel", "Puerto Natales", "Torres del Paine",
  ],
}

export default function CheckoutForm({ productId, productName, productPrice, productSlug, initialQuantity = 1, bundleTotalPrice }: CheckoutFormProps) {
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
    cantidad: initialQuantity,
    observaciones: "",
    aceptaTerminos: false,
  })
  const [errors, setErrors] = useState<CheckoutErrors>({})

  const isBundleQuantity = bundleTotalPrice !== undefined && formData.cantidad === 2
  const total = isBundleQuantity ? bundleTotalPrice! : (productPrice * formData.cantidad)

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
    if (formData.cantidad > 2) newErrors.cantidad = "Máximo 2 unidades por pedido"
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

      const actualUnitPrice = isBundleQuantity ? Math.round(bundleTotalPrice! / formData.cantidad) : productPrice
      const order = createOrder(formData, productSlug, {
        unitPrice: actualUnitPrice,
        totalPrice: total,
      })
      await submitOrderToServer(order)

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
              onClick={() => updateField("cantidad", Math.min(2, formData.cantidad + 1))}
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
