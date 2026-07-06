"use client"

import { useState } from "react"
import type { Product } from "@/types/product"

interface FAQProps {
  product: Product
}

export default function FAQ({ product }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number): void {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-[var(--gray-100)] py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-widest mb-2">
          Preguntas Frecuentes
        </p>
        <h2 className="text-[1.75rem] md:text-[2.25rem] font-extrabold leading-tight mb-10">
          Todo lo que necesitas saber
        </h2>
      </div>
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="space-y-3">
          {product.faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-[var(--gray-200)] rounded-2xl overflow-hidden bg-white"
            >
              <button
                onClick={() => toggle(i)}
                className="flex justify-between items-center w-full p-5 text-left font-semibold text-[0.9375rem] gap-4 cursor-pointer tap-highlight-transparent"
              >
                {faq.question}
                <span
                  className={`text-[1.25rem] text-[var(--primary)] flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`px-5 pb-5 text-sm text-[var(--gray-500)] leading-relaxed ${
                  openIndex === i ? "block" : "hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
