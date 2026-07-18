"use client"

import { useState, useEffect } from "react"

export default function Countdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const end = new Date("2026-07-12T23:59:00-04:00")

    function update() {
      const diff = Math.max(0, end.getTime() - Date.now())
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex gap-2 justify-center my-3">
      {[
        { val: time.d, lbl: "Días" },
        { val: time.h, lbl: "Horas" },
        { val: time.m, lbl: "Min" },
        { val: time.s, lbl: "Seg" },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-[var(--dark)] text-white px-2 py-1.5 rounded-lg min-w-[44px] text-center"
        >
          <div className="text-lg font-bold leading-tight">
            {String(item.val).padStart(2, "0")}
          </div>
          <div className="text-[0.5rem] text-[var(--gray-400)] uppercase">
            {item.lbl}
          </div>
        </div>
      ))}
    </div>
  )
}
