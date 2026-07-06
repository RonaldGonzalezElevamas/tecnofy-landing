"use client"

import { type ButtonHTMLAttributes, type ReactNode } from "react"

type ButtonVariant = "primary" | "whatsapp" | "outline" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  fullWidth?: boolean
  children: ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-white hover:bg-[var(--accent-dark)] active:scale-[0.98]",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#20BD5C] active:scale-[0.98]",
  outline:
    "border-2 border-[var(--accent)] text-[var(--accent-dark)] hover:bg-[var(--accent)] hover:text-white active:scale-[0.98]",
  ghost:
    "bg-transparent text-[var(--gray-600)] hover:bg-[var(--gray-100)] active:scale-[0.98]",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-2xl shadow-lg",
}

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 font-bold
        transition-all duration-200 cursor-pointer select-none
        touch-manipulation tap-highlight-transparent
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  )
}
