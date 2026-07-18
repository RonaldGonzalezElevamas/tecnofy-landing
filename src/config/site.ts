export const SITE_CONFIG = {
  name: "Tecnofy",
  tagline: "Tecnología para tu bienestar",
  description: "Soluciones inteligentes para tu bienestar y seguridad. Envíos a todo Chile con pago contra entrega.",
  url: "https://tecnofy.cl",
  logo: "/logo.png",
  currency: "CLP",
  currencySymbol: "$",
  country: "Chile",
  locale: "es_CL",
  whatsapp: {
    number: "+56983956073",
    message: "Hola 👋 quiero eliminar el dolor muscular. ¿Cómo puedo pedir el alivio 4D con pago contra entrega?",
    messageBundle: "Hola 👋 quiero eliminar el dolor muscular. ¿Cómo puedo pedir 2 unidades del alivio 4D con pago contra entrega?",
  },
  contact: {
    email: "contacto.elevamas@gmail.com",
    phone: "+56 9 8395 6073",
    address: "Santiago, Chile",
    schedule: "Lun - Sáb: 9:00 a 20:00",
  },
  social: {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
  },
  shipping: {
    free: true,
    freeLabel: "Envío gratis a todo Chile",
    estimateDays: "3 a 7 días hábiles",
  },
  payment: {
    method: "cod",
    methodLabel: "Pago contra entrega",
    methodNote: "Recibes, revisas y pagas. Sin riesgo.",
  },
  seo: {
    keywords: [
      "tecnofy",
      "eliminar dolor muscular",
      "masajeador 4d",
      "pago contra entrega chile",
      "envío gratis chile",
      "alivio muscular",
      "compra online chile",
    ],
    favicon: "/favicon.svg",
  },
  analytics: {
    ga4: { measurementId: process.env.NEXT_PUBLIC_GA4_ID || "" },
    meta: { pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "" },
    tiktok: { pixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "" },
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  },
  admin: {
    email: process.env.ADMIN_EMAIL || "contacto.elevamas@gmail.com",
    whatsapp: process.env.ADMIN_WHATSAPP || "+56983956073",
  },
} as const

export const COLORS = {
  primary: "#0066FF",
  primaryDark: "#0052CC",
  primaryLight: "#E8F0FE",
  accent: "#00D26A",
  accentDark: "#00B85E",
  dark: "#0B0B0B",
  orange: "#FF6B35",
  red: "#EF4444",
  yellow: "#FFC107",
} as const
