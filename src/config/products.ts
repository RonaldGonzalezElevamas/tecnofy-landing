import type { Product } from "@/types/product"

const products: Product[] = [
  {
    id: "massager-4d",
    slug: "masajeador-4d-portatil",
    name: "Masajeador Eléctrico Dedos 4D Portátil",
    shortDescription: "Alivia cuello, hombros y espalda al instante con tecnología de amasado 4D y calor. Inalámbrico, recargable y ultra silencioso.",
    longDescription: "Adiós a la tensión muscular. Este masajeador portátil combina 4 dedos de amasado que simulan la presión de manos humanas con calor terapéutico para eliminar contracturas, desinflamar tejidos y relajar los músculos más profundos. Diseñado para cuello, hombros, espalda, piernas y pies. Inalámbrico, recargable por USB y tan silencioso que lo puedes usar mientras trabajas o ves TV.",
    price: {
      normal: 69990,
      offer: 34990,
      bundle: {
        quantity: 2,
        price: 59990,
        label: "2x $59.990 (ahorras $9.990)",
      },
    },
    category: "masaje",
    brand: "Tecnofy",
    sku: "TEC-4D-001",
    images: [
      { src: "/images/hero.webp", alt: "Masajeador 4D portátil Tecnofy" },
      { src: "/images/offer.png", alt: "Masajeador 4D vista frontal" },
    ],
    gallery: [
      { src: "/images/detail-4.webp", alt: "Portátil y recargable", label: "Portátil y recargable" },
      { src: "/images/detail-2.webp", alt: "Aplicación en cuello", label: "Alivio en cuello y hombros" },
      { src: "/images/detail-1.webp", alt: "Dedos de amasado 4D", label: "Dedos de amasado 4D" },
      { src: "/images/solution.png", alt: "Aplicación versátil", label: "Aplicación versátil" },
    ],
    benefits: [
      { text: "Alivia cuello y hombros" },
      { text: "Reduce el estrés muscular" },
      { text: "Calor calmante integrado" },
      { text: "Inalámbrico y recargable" },
      { text: "Ultra silencioso" },
      { text: "Correa ajustable incluida" },
    ],
    features: [
      {
        title: "Elimina contracturas en minutos",
        description: "No es solo vibración. La tecnología 4D simula la presión de manos humanas para deshacer nudos musculares, combinado con calor terapéutico.",
        icon: "💆",
      },
      {
        title: "Calor que desinflama y relaja",
        description: "Activa el modo calor para mejorar la circulación, desinflamar los tejidos y potenciar el alivio muscular en cada sesión.",
        icon: "🔥",
      },
      {
        title: "Llega a cualquier zona dolorida",
        description: "Cuello, hombros, espalda, piernas o pies. La correa ajustable te permite enfocar el alivio justo donde más te duele. Inalámbrico y silencioso.",
        icon: "⚡",
      },
      {
        title: "Relájate sin preocupaciones",
        description: "Apagado automático a los 15 minutos para evitar sobreuso. Seguridad inteligente mientras te olvidas del dolor.",
        icon: "🛡️",
      },
    ],
    specs: [
      { label: "Tecnología", value: "Amasado 4D + Calor", icon: "🔄" },
      { label: "Alimentación", value: "USB Recargable", icon: "🔋" },
      { label: "Auto apagado", value: "15 minutos", icon: "⏱️" },
      { label: "Peso", value: "300 g (ultra ligero)", icon: "🏋️" },
      { label: "Ruido", value: "Ultra silencioso", icon: "🔇" },
      { label: "Portabilidad", value: "Inalámbrico / Compacto", icon: "🎒" },
    ],
    testimonials: [
      { name: "Carlos M.", location: "Santiago", rating: 5, text: "Trabajo en oficina 9 horas y siempre terminaba con el cuello tieso. Esto me cambió la vida, lo uso todos los días." },
      { name: "Andrea G.", location: "Valparaíso", rating: 5, text: "Pensé que era otro producto más pero el calor y los dedos 4D son increíbles. Se siente como un masaje real." },
      { name: "Pedro L.", location: "Concepción", rating: 5, text: "Lo compré para mi papá que tiene contracturas crónicas y le encantó. Ahora lo usa después de cada jornada." },
      { name: "Camila R.", location: "Antofagasta", rating: 5, text: "Ideal para después del gym. Lo uso en los hombros y piernas. Bien potente y el calor es un plus enorme." },
    ],
    faqs: [
      { question: "¿Cómo alivia el dolor muscular?", answer: "Utiliza 4 puntos de presión que simulan el movimiento de amasado de manos humanas, combinado con calor suave. No es una simple vibración: realmente presiona y trabaja los músculos tensos." },
      { question: "¿Duele la función de calor?", answer: "Para nada. El calor es suave y regulado a una temperatura segura. Puedes activarlo o desactivarlo según tu preferencia." },
      { question: "¿Cuánto dura la batería?", answer: "Con una carga completa vía USB (aprox 1-2 horas) puedes usar varias sesiones de 15 minutos. Tiene apagado automático para ahorrar batería." },
      { question: "¿Cómo es el envío y el pago?", answer: "Hacemos envíos a todo Chile. El pago es contra entrega: recibes el producto, lo revisas y solo entonces pagas. Sin adelantos, sin riesgo." },
      { question: "¿En cuánto tiempo llega?", answer: "El tiempo de entrega es de 3 a 7 días hábiles dependiendo de tu comuna y región." },
      { question: "¿Tiene garantía?", answer: "Sí, todos nuestros productos cuentan con 3 meses de garantía. Si tienes cualquier problema, contáctanos por WhatsApp." },
    ],
    painPoints: [
      { icon: "💆‍♂️", title: "Cuello rígido", description: "Esa contractura molesta después de largas horas frente a la pantalla" },
      { icon: "🔥", title: "Hombros tensos", description: "La carga del estrés se acumula en los hombros generando puntos de dolor" },
      { icon: "⚡", title: "Espalda dolorida", description: "Tensión lumbar y dorsal que empeora con malas posturas" },
      { icon: "😫", title: "Estrés acumulado", description: "El cansancio físico y mental del día a día que no te deja descansar" },
    ],
    howItWorks: [
      { step: 1, title: "Carga", description: "Cárgalo vía USB (cable incluido). Una hora de carga te da varias sesiones de alivio." },
      { step: 2, title: "Coloca donde te duele", description: "Ajusta la correa en la zona con dolor: cuello, hombros, espalda o piernas." },
      { step: 3, title: "Relájate y olvídate del dolor", description: "Enciende, elige tu modo y deja que la tecnología 4D con calor elimine la tensión." },
    ],
    stock: 42,
    status: "active",
    tags: ["masaje", "4d", "calor", "cuello", "hombros", "espalda", "portatil"],
    seo: {
      title: "Masajeador 4D Portátil | Alivia tu dolor muscular — $34.990",
      description: "Elimina la tensión en cuello y hombros sin depender de nadie. Solución de amasado 4D con calor. $34.990 – Envío gratis a todo Chile – Pago contra entrega.",
      keywords: "alivio dolor muscular, tension cuello, contracturas, dolor hombros, relajacion muscular, pago contra entrega, envio gratis, Chile",
      ogImage: "/images/hero.webp",
    },
    createdAt: "2026-06-01",
    updatedAt: "2026-07-05",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getActiveProducts(): Product[] {
  return products.filter((p) => p.status === "active")
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export default products
