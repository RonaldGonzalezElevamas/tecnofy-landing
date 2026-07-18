export interface ProductImage {
  src: string
  alt: string
  label?: string
}

export interface ProductPrice {
  normal: number
  offer: number
  bundle?: {
    quantity: number
    price: number
    label: string
  }
}

export interface ProductFeature {
  title: string
  description: string
  icon: string
}

export interface ProductBenefit {
  text: string
  icon?: string
}

export interface ProductSpec {
  label: string
  value: string
  icon: string
}

export interface ProductTestimonial {
  name: string
  location: string
  rating: number
  text: string
  avatar?: string
}

export interface ProductFAQ {
  question: string
  answer: string
}

export interface ProductSEO {
  title: string
  description: string
  keywords: string
  ogImage?: string
}

export interface HeroTrustBadge {
  icon: string
  label: string
}

export interface Product {
  id: string
  slug: string
  name: string
  shortDescription: string
  longDescription: string
  price: ProductPrice
  category: string
  brand: string
  sku: string
  images: ProductImage[]
  gallery: ProductImage[]
  benefits: ProductBenefit[]
  features: ProductFeature[]
  specs: ProductSpec[]
  testimonials: ProductTestimonial[]
  faqs: ProductFAQ[]
  painPoints: { icon: string; title: string; description: string }[]
  howItWorks: { step: number; title: string; description: string }[]
  stock: number | null
  status: "active" | "inactive"
  tags: string[]
  seo: ProductSEO
  createdAt: string
  updatedAt: string
  heroTitle?: string
  heroTrustBadges?: HeroTrustBadge[]
  solutionLabel?: string
  solutionTitle?: string
  solutionImageLabel?: string
  galleryTitle?: string
  galleryDescription?: string
  finalCtaTitle?: string
  problemLabel?: string
  problemTitle?: string
  problemDescription?: string
  offerDescription?: string
  videoDemo?: { src: string; poster: string; label: string }[]
  videoDemoTitle?: string
  videoDemoDescription?: string
}
