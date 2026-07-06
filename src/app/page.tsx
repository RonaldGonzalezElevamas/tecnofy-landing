import { getActiveProducts } from "@/config/products"
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

export default function Home() {
  const products = getActiveProducts()
  const product = products[0]

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center text-[var(--gray-500)]">
        No hay productos disponibles
      </main>
    )
  }

  return (
    <main>
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
