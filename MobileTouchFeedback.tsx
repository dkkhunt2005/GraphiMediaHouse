import React, { useEffect, useState } from 'react'

interface TouchPoint {
  id: number
  x: number
  y: number
}

export const MobileTouchFeedback: React.FC = () => {
  const [touches, setTouches] = useState<TouchPoint[]>([])

  useEffect(() => {
    // Only enable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (!isTouchDevice) return

    let counter = 0

    const handleTouchStart = (e: TouchEvent) => {
      const newTouches: TouchPoint[] = []
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i]
        newTouches.push({
          id: ++counter,
          x: touch.clientX,
          y: touch.clientY,
        })
      }

      setTouches((prev) => [...prev.slice(-3), ...newTouches])

      // Auto-remove touch points after animation finishes
      setTimeout(() => {
        setTouches((prev) => prev.filter((p) => !newTouches.some((nt) => nt.id === p.id)))
      }, 500)
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  if (touches.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      {touches.map((touch) => (
        <div
          key={touch.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center animate-touch-ripple"
          style={{
            left: `${touch.x}px`,
            top: `${touch.y}px`,
          }}
        >
          {/* Expanding Architectural Pulse Ring */}
          <div className="w-10 h-10 rounded-full border border-brand-gold/60 scale-100 opacity-90 animate-ping duration-500" />
          
          {/* Precision Center Reticle */}
          <div className="absolute w-2.5 h-2.5 border-t border-l border-brand-gold" />
          <div className="absolute w-2.5 h-2.5 border-b border-r border-brand-gold" />
          
          {/* Subtle Live Coordinate Tag */}
          <div className="absolute left-4 top-2 bg-black/80 text-brand-gold font-mono text-[9px] px-1 py-0.5 tracking-tighter backdrop-blur-xs border border-brand-gold/30">
            {Math.round(touch.x)}:{Math.round(touch.y)}
          </div>
        </div>
      ))}
    </div>
  )
}
