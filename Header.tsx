import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight, MapPin } from 'lucide-react'
import { Button } from '../ui/Button'
import { Magnetic } from '../ui/Magnetic'
import { cn } from '../../lib/utils'

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>('')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const location = useLocation()

  // Live Surat / IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now)
      setCurrentTime(timeString)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on page transition
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const handleNavClick = (path: string) => {
    setIsOpen(false)
    if (location.pathname === path) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  const navLinks = [
    { name: 'HOME', path: '/', num: '01' },
    { name: 'ABOUT', path: '/about', num: '02' },
    { name: 'SERVICES', path: '/services', num: '03' },
    { name: 'WORK', path: '/portfolio', num: '04' },
    { name: 'CONTACT', path: '/contact', num: '05' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-neutral-200 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
          : "bg-white/90 backdrop-blur-sm border-b border-neutral-100 py-3.5 lg:py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with Original Black Badge Treatment + subtle interactive hover glow */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center group transition-transform duration-200 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm relative"
              aria-label="Graphi Media House Home"
            >
              <div className="bg-brand-black px-3.5 py-1.5 flex items-center justify-center border border-black shadow-sm group-hover:border-brand-gold transition-colors duration-300">
                <img
                  src="/assets/logo_original_black.png"
                  alt="Graphi Media House"
                  className="h-7 sm:h-8 w-auto object-contain"
                  width="160"
                  height="52"
                />
              </div>
            </Link>

            {/* Studio Live Location & IST Time Ticker (Desktop) */}
            <div className="hidden xl:flex items-center space-x-2 text-[11px] font-mono tracking-tight text-neutral-500 border-l border-neutral-200 pl-4 py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <span>SURAT {currentTime || '16:00:00'} IST</span>
              <span className="text-neutral-300">&bull;</span>
              <span className="font-condensed font-semibold tracking-wider text-neutral-600">
                OPEN FOR COMMISSIONS
              </span>
            </div>
          </div>

          {/* Desktop Navigation with Animated Micro-Numerals & Hover Line */}
          <nav
            className="hidden md:flex items-center space-x-1 lg:space-x-2 p-1 bg-neutral-100/60 rounded-full border border-neutral-200/80 backdrop-blur-sm"
            aria-label="Main Navigation"
          >
            {navLinks.map((link, idx) => {
              const active = isActive(link.path)
              const isHovered = hoveredIndex === idx

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    "relative px-4 py-1.5 text-xs font-condensed font-bold tracking-editorial-wider transition-all duration-200 rounded-full flex items-center space-x-1.5 group",
                    active
                      ? "text-black bg-white shadow-sm font-extrabold"
                      : "text-neutral-600 hover:text-black"
                  )}
                >
                  <span className={cn(
                    "text-[10px] font-mono transition-opacity duration-200",
                    active ? "text-brand-gold font-bold opacity-100" : isHovered ? "text-neutral-400 opacity-100" : "opacity-40"
                  )}>
                    {link.num}
                  </span>
                  <span>{link.name}</span>

                  {/* Active bottom micro-indicator */}
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold inline-block ml-0.5" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA with Magnetic Physics */}
          <div className="hidden md:flex items-center space-x-4">
            <Magnetic strength={0.25}>
              <Button
                to="/contact"
                variant="primary"
                size="sm"
                className="tracking-editorial-wide text-xs group relative overflow-hidden shadow-sm"
              >
                <span className="relative z-10 flex items-center space-x-1">
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </span>
                {/* Subtle hover gradient background slide */}
                <span className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Button>
            </Magnetic>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 text-brand-charcoal hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold border border-neutral-200 bg-neutral-50 rounded-sm"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close main navigation menu" : "Open main navigation menu"}
            >
              {isOpen ? <X className="w-6 h-6 text-brand-gold" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Staggered Visual Design */}
      {isOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-neutral-300 px-6 pt-5 pb-8 space-y-6 animate-in slide-in-from-top-4 duration-300 shadow-xl">
          {/* Mobile Location & Live Clock */}
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 border-b border-neutral-100 pb-3">
            <div className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>SURAT, GUJARAT, INDIA</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{currentTime} IST</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2 pt-1">
            {navLinks.map((link) => {
              const active = isActive(link.path)
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => {
                    handleNavClick(link.path)
                  }}
                  className={cn(
                    "text-xl font-condensed font-extrabold tracking-editorial-wide py-3 px-3 rounded-sm border-b border-neutral-100 flex items-center justify-between transition-colors",
                    active
                      ? "text-black bg-brand-gold/10 border-brand-gold/40"
                      : "text-neutral-700 hover:text-black hover:bg-neutral-50"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs text-neutral-400">{link.num}</span>
                    <span>{link.name}</span>
                  </div>
                  {active ? (
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="pt-2 space-y-3">
            <Button
              to="/contact"
              variant="primary"
              size="md"
              className="w-full flex items-center justify-center space-x-2 py-3.5 shadow-md"
              onClick={() => setIsOpen(false)}
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4 text-brand-gold" />
            </Button>
            
            <a
              href="https://wa.me/919978866210?text=Hello%20Graphi%20Media%20House,%20I'd%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-2.5 text-xs font-condensed font-bold uppercase tracking-editorial-wide text-neutral-700 hover:text-black bg-neutral-100 border border-neutral-200 transition-colors"
            >
              <span>WHATSAPP DIRECT: +91 99788 66210</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
