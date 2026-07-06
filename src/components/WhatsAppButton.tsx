"use client"

import { SITE_CONFIG } from "@/config/site"
import { trackWhatsAppClick } from "@/services/analytics"

interface WhatsAppButtonProps {
  variant?: "small" | "large" | "floating"
  message?: string
  className?: string
  productName?: string
}

function getWhatsAppUrl(message: string): string {
  const text = encodeURIComponent(message)
  const number = SITE_CONFIG.whatsapp.number.replace(/^\+/, "")
  return `https://wa.me/${number}?text=${text}`
}

export default function WhatsAppButton({
  variant = "small",
  message,
  className = "",
  productName,
}: WhatsAppButtonProps) {
  const msg = message || SITE_CONFIG.whatsapp.message
  const url = getWhatsAppUrl(msg)

  function handleClick(): void {
    if (productName) trackWhatsAppClick(productName)
  }

  if (variant === "floating") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`fixed bottom-24 md:bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[#20BD5C] animate-pulse-whatsapp ${className}`}
        aria-label="Pedir por WhatsApp"
      >
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.004 3.996a12.004 12.004 0 0 1 12.004 12.004 12.004 12.004 0 0 1-12.004 12.004c-2.43 0-4.734-.732-6.677-2.004l-6.328 2.004 2.004-6.196A11.92 11.92 0 0 1 4 16.004 12.004 12.004 0 0 1 16.004 3.996zm0 2.666a9.338 9.338 0 0 0-9.338 9.338c0 2.17.732 4.172 2.004 5.778l-1.336 4.004 4.136-1.336A9.27 9.27 0 0 0 16 25.342a9.338 9.338 0 0 0 9.338-9.342A9.338 9.338 0 0 0 16.004 6.662z"/>
        </svg>
      </a>
    )
  }

  if (variant === "large") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 font-bold px-8 py-4 text-lg rounded-2xl bg-[#25D366] text-white hover:bg-[#20BD5C] active:scale-[0.98] transition-all duration-200 w-full shadow-lg ${className}`}
      >
        <svg className="w-6 h-6 fill-white flex-shrink-0" viewBox="0 0 32 32"><path d="M16.004 3.996a12.004 12.004 0 0 1 12.004 12.004 12.004 12.004 0 0 1-12.004 12.004c-2.43 0-4.734-.732-6.677-2.004l-6.328 2.004 2.004-6.196A11.92 11.92 0 0 1 4 16.004 12.004 12.004 0 0 1 16.004 3.996z"/></svg>
        Pedir ahora – Pago contra entrega
      </a>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-sm px-4 py-2 rounded-xl transition-all duration-200 hover:bg-[#20BD5C] active:scale-95 ${className}`}
    >
      <svg className="w-4 h-4 fill-white flex-shrink-0" viewBox="0 0 32 32"><path d="M16.004 3.996a12.004 12.004 0 0 1 12.004 12.004 12.004 12.004 0 0 1-12.004 12.004c-2.43 0-4.734-.732-6.677-2.004l-6.328 2.004 2.004-6.196A11.92 11.92 0 0 1 4 16.004 12.004 12.004 0 0 1 16.004 3.996z"/></svg>
      Pedir ahora
    </a>
  )
}
