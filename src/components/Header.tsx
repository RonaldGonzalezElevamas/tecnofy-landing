"use client"

import Link from "next/link"
import { SITE_CONFIG } from "@/config/site"
import WhatsAppButton from "@/components/WhatsAppButton"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[var(--gray-200)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-[64px] mt-[30px]">
          <Link href="/" className="flex items-center gap-2 font-extrabold text-lg text-[var(--primary)]">
            <img
              src={SITE_CONFIG.logo}
              alt={SITE_CONFIG.name}
              className="w-[120px] sm:w-[200px] h-auto"
            />
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs text-[var(--gray-500)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            Stock disponible
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-[0.65rem] text-[var(--accent-dark)] font-bold">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="5 9 2 12 5 15"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/></svg>
              {SITE_CONFIG.shipping.freeLabel}
            </div>
            <Link
              href="/checkout"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[var(--primary)] text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all hover:bg-[var(--primary-dark)]"
            >
              Comprar
            </Link>
            <WhatsAppButton variant="small" />
          </div>
        </div>
      </div>
    </header>
  )
}
