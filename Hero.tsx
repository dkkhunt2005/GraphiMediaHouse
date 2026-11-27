import React from 'react'
import { Button } from '../ui/Button'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { ArchitecturalGridCanvas } from '../webgl/ArchitecturalGridCanvas'
import { WebGLImageDisplacement } from '../webgl/WebGLImageDisplacement'
import { Magnetic } from '../ui/Magnetic'

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full bg-white pt-4 pb-8 lg:pt-6 lg:pb-10 overflow-hidden border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Eyebrow & Location Label */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-3 mb-4 sm:mb-6 gap-2">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-brand-gold inline-block flex-shrink-0 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-condensed font-bold uppercase tracking-editorial-wider text-brand-charcoal hover:text-black transition-colors cursor-default">
              ARCHITECTURE-LED CREATIVE STUDIO
            </span>
          </div>

          <div className="text-[11px] sm:text-xs font-condensed font-bold uppercase tracking-editorial-wider text-neutral-500 flex items-center space-x-2">
            <span className="hover:text-black transition-colors">SURAT, GUJARAT, INDIA</span>
            <span className="text-brand-gold font-bold">&bull;</span>
            <span className="text-neutral-400 font-mono text-[10px]">EST. 2024</span>
          </div>
        </div>

        {/* Hero Composition: Screen-Fitted Architectural Visual + WebGL Shader + Editorial Text */}
        <div className="relative">
          
          {/* Main Visual: WebGL Interactive Displacement Canvas */}
          <div className="relative w-full min-h-[500px] sm:min-h-[440px] md:min-h-[460px] lg:aspect-[21/9] lg:min-h-0 overflow-hidden bg-neutral-900 shadow-xl border border-neutral-800">
            
            {/* Interactive WebGL Image Shader */}
            <div className="absolute inset-0 w-full h-full">
              <WebGLImageDisplacement
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2200&auto=format&fit=crop"
                alt="Monumental contemporary concrete architecture with dramatic light and shadow"
                aspectRatio="h-full w-full"
                priority={true}
              />
            </div>

            {/* GPU Architectural Grid Wave Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen">
              <ArchitecturalGridCanvas intensity={0.7} />
            </div>

            {/* Subtle photographic vignette overlay to ensure text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25 pointer-events-none" />
            
            {/* Embedded Editorial Title Block inside the lower portion */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-12 text-white pointer-events-none">
              <div className="max-w-4xl space-y-3 sm:space-y-4 pointer-events-auto">
                <div className="inline-flex items-center space-x-2 bg-brand-gold text-black px-3 py-1 text-[11px] font-condensed font-extrabold uppercase tracking-editorial-wider w-fit shadow-md hover:bg-white transition-colors duration-200">
                  <span>GRAPHI MEDIA HOUSE</span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-condensed font-extrabold uppercase tracking-editorial-tight leading-[0.94] text-white">
                  <span className="hover:text-brand-gold transition-colors duration-300">GREAT ARCHITECTURE</span><br />
                  <span className="text-neutral-300 hover:text-white transition-colors duration-300">DESERVES GREAT</span>{' '}
                  <span className="text-hover-reveal">STORYTELLING.</span>
                </h1>

                <p className="text-xs sm:text-base lg:text-lg text-neutral-200 max-w-2xl font-sans font-light leading-relaxed pt-1">
                  We help architects and designers transform exceptional spaces into distinctive brands through architectural photography, thoughtful design, and strategic visual storytelling.
                </p>

                {/* Hero Action Buttons with Magnetic Physics */}
                <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <Magnetic strength={0.3}>
                    <Button
                      to="/portfolio"
                      variant="gold"
                      size="md"
                      className="w-full sm:w-auto space-x-2 shadow-lg"
                    >
                      <span>EXPLORE OUR WORK</span>
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                  </Magnetic>

                  <Magnetic strength={0.25}>
                    <Button
                      to="/contact"
                      variant="secondary"
                      size="md"
                      className="w-full sm:w-auto space-x-2 bg-white/90 backdrop-blur-sm text-black border-white hover:bg-white shadow-lg"
                    >
                      <span>START A PROJECT</span>
                      <ArrowUpRight className="w-4 h-4 text-black" />
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>

          {/* Under-Hero Editorial Sub-bar with Live Hover Indicators */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-neutral-200 text-xs text-neutral-600 font-sans">
            <div className="p-3 bg-neutral-50/80 border border-neutral-200/80 hover:border-black hover:bg-white transition-all duration-300 group rounded-sm">
              <span className="font-condensed font-bold uppercase tracking-wider text-black block mb-1 flex items-center space-x-1.5 group-hover:text-brand-gold transition-colors">
                <span className="w-1.5 h-1.5 bg-brand-gold flex-shrink-0" />
                <span className="text-hover-reveal">DISCIPLINE &amp; FOCUS</span>
              </span>
              Architectural photography, monograph publication, film direction, and comprehensive studio identity systems.
            </div>

            <div className="p-3 bg-neutral-50/80 border border-neutral-200/80 hover:border-black hover:bg-white transition-all duration-300 group rounded-sm">
              <span className="font-condensed font-bold uppercase tracking-wider text-black block mb-1 flex items-center space-x-1.5 group-hover:text-brand-gold transition-colors">
                <span className="w-1.5 h-1.5 bg-brand-gold flex-shrink-0" />
                <span className="text-hover-reveal">LED BY ARCHITECTS</span>
              </span>
              Conceived by architects who understand tectonics, daylight angles, structural joints, and design philosophy.
            </div>

            <div className="p-3 bg-neutral-50/80 border border-neutral-200/80 hover:border-black hover:bg-white transition-all duration-300 group rounded-sm">
              <span className="font-condensed font-bold uppercase tracking-wider text-black block mb-1 flex items-center space-x-1.5 group-hover:text-brand-gold transition-colors">
                <span className="w-1.5 h-1.5 bg-brand-gold flex-shrink-0" />
                <span className="text-hover-reveal">HEADQUARTERS &amp; REACH</span>
              </span>
              Based in Surat, Gujarat; executing architectural documentation and branding commissions across India.
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
