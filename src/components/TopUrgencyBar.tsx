"use client"

import { useEffect, useState } from "react"

export default function TopUrgencyBar() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return
    const timer = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-60 bg-[var(--red)] text-white text-center py-2 px-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5">
      <span className="w-[5px] h-[5px] rounded-full bg-white inline-block animate-ping" />
      🚚 Envío{' '}
      <span className="bg-[var(--accent)] text-white font-black px-2.5 py-0.5 rounded-full text-sm inline-block shadow-md shadow-[var(--accent)]/40">
        GRATIS
      </span>
      {' '}· Paga al recibir
    </div>
  )
}
