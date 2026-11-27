import React, { useRef, useState, useEffect } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 6,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  const updateCardTilt = (clientX: number, clientY: number, scale = 1.015) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`)
    setGlarePos({
      x: Math.max(0, Math.min(100, (x / rect.width) * 100)),
      y: Math.max(0, Math.min(100, (y / rect.height) * 100)),
      opacity: 0.18,
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCardTilt(e.clientX, e.clientY)
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlarePos(prev => ({ ...prev, opacity: 0 }))
  }

  // Touch tracking for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches.length) return
    updateCardTilt(e.touches[0].clientX, e.touches[0].clientY, 1.01)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches.length) return
    updateCardTilt(e.touches[0].clientX, e.touches[0].clientY, 1.01)
  }

  const handleTouchEnd = () => {
    setTimeout(() => {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
      setGlarePos(prev => ({ ...prev, opacity: 0 }))
    }, 300)
  }

  // Optional Gyroscope tilt on mobile tilt
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    let isIntersecting = false
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting
    }, { threshold: 0.2 })
    observer.observe(card)

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!isIntersecting || e.gamma === null || e.beta === null) return
      // subtle tilt from phone orientation
      const tiltY = Math.max(-maxTilt, Math.min(maxTilt, (e.gamma / 30) * maxTilt))
      const tiltX = Math.max(-maxTilt, Math.min(maxTilt, ((e.beta - 35) / 30) * -maxTilt))

      setTransform(`perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1, 1, 1)`)
      setGlarePos({
        x: 50 + (tiltY / maxTilt) * 35,
        y: 50 - (tiltX / maxTilt) * 35,
        opacity: 0.12,
      })
    }

    if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true })
    }

    return () => {
      observer.disconnect()
      if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation)
      }
    }
  }, [maxTilt])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}

      {/* Dynamic light sheen */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-sm"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(230, 197, 0, 0.25) 0%, transparent 60%)`,
        }}
      />
    </div>
  )
}
