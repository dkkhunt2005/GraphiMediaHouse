import React, { useEffect, useState, useRef } from 'react'

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ x: -100, y: -100 })
  const [target, setTarget] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isTextHover, setIsTextHover] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable custom cursor for devices with mouse/trackpad
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!hasFinePointer) return

    let animationFrameId: number

    const handleMouseMove = (e: MouseEvent) => {
      setTarget({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      // Detect hover target
      const targetElement = e.target as HTMLElement | null
      if (targetElement) {
        const interactiveParent = targetElement.closest('a, button, [role="button"], input, select, textarea, .clickable')
        const viewCard = targetElement.closest('[data-cursor="view"], .group')
        const isHeadingOrText = targetElement.closest('h1, h2, h3, p, blockquote, .quote-hover-expand')

        if (viewCard && (viewCard.querySelector('img') || viewCard.getAttribute('data-cursor') === 'view')) {
          setIsHovered(true)
          setCursorText('VIEW')
          setIsTextHover(false)
        } else if (interactiveParent) {
          setIsHovered(true)
          setCursorText('')
          setIsTextHover(false)
        } else if (isHeadingOrText) {
          setIsHovered(false)
          setCursorText('')
          setIsTextHover(true)
        } else {
          setIsHovered(false)
          setCursorText('')
          setIsTextHover(false)
        }
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Smooth physics loop (lerp)
    const updateCursor = () => {
      setCoords((prev) => ({
        x: prev.x + (target.x - prev.x) * 0.22,
        y: prev.y + (target.y - prev.y) * 0.22,
      }))
      animationFrameId = requestAnimationFrame(updateCursor)
    }

    animationFrameId = requestAnimationFrame(updateCursor)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVisible, target])

  if (!isVisible) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300"
      style={{
        transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
        willChange: 'transform',
      }}
    >
      {/* Precision Center Dot */}
      <div
        className={`absolute -top-1 -left-1 w-2 h-2 rounded-full bg-brand-gold transition-transform duration-150 ${
          isClicking ? 'scale-50' : isHovered ? 'scale-0' : isTextHover ? 'scale-75' : 'scale-100'
        }`}
      />

      {/* Architectural Text Reading Guide (When hovering headings or body copy) */}
      {isTextHover && !isHovered && !cursorText && (
        <div className="absolute -top-3 -left-4 flex items-center space-x-1 pointer-events-none animate-in fade-in duration-200">
          <div className="w-8 h-[2px] bg-brand-gold/70" />
          <span className="text-[8px] font-mono text-brand-gold tracking-tight uppercase">[READ]</span>
        </div>
      )}

      {/* Architectural Crosshairs */}
      {!isHovered && !isTextHover && (
        <div className="absolute -top-3 -left-3 w-6 h-6 pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-0 w-6 h-[1px] bg-black -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 h-6 w-[1px] bg-black -translate-x-1/2" />
        </div>
      )}

      {/* Outer Floating Ring / Expanded View Badge */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out ${
          cursorText
            ? 'w-20 h-20 bg-black/95 text-brand-gold border border-brand-gold/80 rounded-full shadow-2xl backdrop-blur-sm'
            : isHovered
            ? 'w-12 h-12 border-2 border-brand-gold rounded-full bg-brand-gold/10 backdrop-blur-[2px]'
            : isTextHover
            ? 'w-6 h-6 border border-brand-gold/40 rounded-full'
            : 'w-8 h-8 border border-neutral-400/50 rounded-full'
        } ${isClicking ? 'scale-90' : 'scale-100'}`}
      >
        {cursorText && (
          <span className="text-[10px] font-condensed font-extrabold tracking-widest uppercase">
            {cursorText}
          </span>
        )}
      </div>

      {/* Realtime Architectural Coordinates */}
      {!cursorText && (
        <div className="absolute top-4 left-4 font-mono text-[9px] text-neutral-400 tracking-tighter uppercase whitespace-nowrap opacity-60">
          [{Math.round(coords.x)}, {Math.round(coords.y)}]
        </div>
      )}
    </div>
  )
}
