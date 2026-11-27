import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  className,
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-condensed font-bold uppercase tracking-editorial-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:opacity-50 disabled:pointer-events-none"

  const variants = {
    primary: "bg-brand-black text-white hover:bg-brand-charcoal active:bg-black border border-brand-black",
    secondary: "bg-white text-brand-black border border-brand-black hover:bg-neutral-100",
    outline: "bg-transparent text-brand-black border border-neutral-300 hover:border-brand-black hover:bg-neutral-50",
    gold: "bg-brand-gold text-brand-black hover:bg-brand-gold-hover border border-brand-gold",
    ghost: "bg-transparent text-brand-charcoal hover:text-brand-black hover:bg-neutral-100"
  }

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4"
  }

  const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className)

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  )
}
