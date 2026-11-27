import React, { useState, useEffect } from 'react'

export const StudioIntroLoader: React.FC = () => {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'revealing' | 'complete'>('loading')
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "01 / INITIALIZING SPATIAL CANVAS",
    "02 / CALIBRATING LIGHT & MATERIALITY",
    "03 / COMPOSING SPATIAL IDENTITIES",
    "04 / GREAT ARCHITECTURE DESERVES GREAT STORYTELLING"
  ]

  useEffect(() => {
    // Step ticker interval synchronized with progress
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 550)

    // Smooth accelerating progress counter
    const startTime = performance.now()
    const duration = 2200 // 2.2 seconds cinematic load

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const rawProgress = Math.min(elapsed / duration, 1.0)
      
      // Easing: smooth cinematic acceleration
      const eased = Math.min(100, Math.round(rawProgress * 100))
      setProgress(eased)

      if (rawProgress < 1.0) {
        requestAnimationFrame(updateProgress)
      } else {
        // Complete loading, hold for a brief majestic moment, then reveal
        clearInterval(stepInterval)
        setCurrentStep(steps.length - 1)
        setTimeout(() => {
          setPhase('revealing')
          setTimeout(() => {
            setPhase('complete')
          }, 1000) // Duration of curtain lift animation
        }, 300)
      }
    }

    const frameId = requestAnimationFrame(updateProgress)

    // Listen for ESC key to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(frameId)
      clearInterval(stepInterval)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleSkip = () => {
    setPhase('revealing')
    setTimeout(() => {
      setPhase('complete')
    }, 600)
  }

  if (phase === 'complete') return null

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-[#090909] text-white flex flex-col justify-between p-6 sm:p-12 transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] select-none ${
        phase === 'revealing' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Background Architectural Blueprint Grid Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-neutral-800/80 pb-4">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 bg-brand-gold animate-pulse inline-block" />
          <span className="text-xs font-condensed font-bold uppercase tracking-editorial-wider text-neutral-300">
            GRAPHI MEDIA HOUSE &bull; ARCHIVE INITIALIZATION
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <span className="hidden sm:inline font-mono text-[11px] text-neutral-500 tracking-wider">
            SURAT, GUJARAT [21.1702&deg; N, 72.8311&deg; E]
          </span>

          <button
            onClick={handleSkip}
            className="text-[10px] font-mono tracking-widest text-neutral-400 hover:text-brand-gold uppercase border border-neutral-800 hover:border-brand-gold px-2.5 py-1 transition-colors"
          >
            SKIP [ESC]
          </button>
        </div>
      </div>

      {/* Centerpiece: Studio Monogram + Huge Counter + Step Ticker */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto py-8">
        <div className="space-y-6">
          
          {/* Studio Brand Monogram */}
          <div className="flex items-center space-x-4">
            <div className="bg-black px-4 py-2 border border-neutral-800 shadow-2xl inline-flex items-center justify-center">
              <img
                src="/assets/logo_original_black.png"
                alt="Graphi Media House"
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>
            <div className="h-6 w-[1px] bg-neutral-800" />
            <span className="text-[11px] font-condensed font-bold tracking-widest uppercase text-brand-gold">
              ARCHITECTURE-LED CREATIVE STUDIO
            </span>
          </div>

          {/* Monumental Percentage Metric */}
          <div className="flex items-baseline space-x-4">
            <h1 className="text-7xl sm:text-9xl font-condensed font-extrabold uppercase tracking-editorial-tight text-white leading-none">
              {progress < 10 ? `0${progress}` : progress}
            </h1>
            <span className="text-3xl sm:text-5xl font-condensed font-bold text-brand-gold">
              %
            </span>
          </div>

          {/* Dynamic Editorial Step Ticker */}
          <div className="pt-2 border-t border-neutral-800/80 flex items-center space-x-3">
            <span className="w-1.5 h-1.5 bg-brand-gold flex-shrink-0" />
            <p className="font-mono text-xs sm:text-sm text-neutral-300 tracking-widest uppercase transition-all duration-200">
              {steps[currentStep]}
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Progress Indicator Line + Studio Leadership Note */}
      <div className="relative z-10 space-y-4">
        {/* Animated Gold Progress Line */}
        <div className="w-full h-[2px] bg-neutral-800 overflow-hidden">
          <div
            className="h-full bg-brand-gold transition-all duration-100 ease-out shadow-[0_0_12px_#E6C500]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-500 font-sans gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-condensed font-bold uppercase tracking-wider text-neutral-400">
              FOUNDED BY AR. PRASAD MEVASA
            </span>
            <span className="text-neutral-700">&bull;</span>
            <span>VP ER. MAN LAVANI</span>
          </div>

          <span className="font-mono text-[10px] text-neutral-600 tracking-wider">
            ALL SYSTEMS READY &bull; ENJOY EXPERIENCE
          </span>
        </div>
      </div>
    </div>
  )
}
