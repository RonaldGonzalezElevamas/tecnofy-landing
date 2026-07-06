import { notFound } from "next/navigation"
import { getProductBySlug, getActiveProducts } from "@/config/products"
import Hero from "@/components/sections/Hero"
import Problem from "@/components/sections/Problem"
import Solution from "@/components/sections/Solution"
import Benefits from "@/components/sections/Benefits"
import Gallery from "@/components/sections/Gallery"
import HowItWorks from "@/components/sections/HowItWorks"
import Specs from "@/components/sections/Specs"
import Testimonials from "@/components/sections/Testimonials"
import Offer from "@/components/sections/Offer"
import Urgency from "@/components/sections/Urgency"
import FinalCTA from "@/components/sections/FinalCTA"
import FAQ from "@/components/sections/FAQ"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = getActiveProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords,
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      images: product.seo.ogImage ? [{ url: product.seo.ogImage }] : [],
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: product.images[0]?.src,
            description: product.shortDescription,
            brand: { "@type": "Brand", name: product.brand },
            offers: {
              "@type": "Offer",
              url: `/producto/${product.slug}`,
              priceCurrency: "CLP",
              price: product.price.offer,
              availability: "https://schema.org/InStock",
              seller: { "@type": "Organization", name: "Tecnofy Chile" },
            },
          }),
        }}
      />
      <Hero product={product} />
      <Problem product={product} />
      <Solution product={product} />
      <Benefits product={product} />
      <Gallery product={product} />
      <HowItWorks product={product} />
      <Specs product={product} />
      <Testimonials product={product} />
      <Offer product={product} />
      <Urgency product={product} />
      <FinalCTA productName={product.name} />
      <FAQ product={product} />
    </main>
  )
}
