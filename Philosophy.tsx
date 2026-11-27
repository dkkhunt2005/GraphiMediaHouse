import React from 'react'

export const Philosophy: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-36 bg-black text-white relative overflow-hidden border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Decorative Top Accent */}
        <div className="flex items-center space-x-3 mb-6 sm:mb-8">
          <span className="w-10 h-[2px] bg-brand-gold inline-block" />
          <span className="text-xs font-condensed font-bold uppercase tracking-editorial-wider text-brand-gold">
            CORE PHILOSOPHY &bull; THE GMH DISTINCTION
          </span>
        </div>

        {/* Large Typographic Statement with Text Hover Effects */}
        <div className="max-w-5xl space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-condensed font-extrabold uppercase tracking-editorial-tight leading-[0.94] text-white">
            <span className="hover:text-neutral-400 transition-colors duration-300">WE DON'T CHASE TRENDS.</span><br />
            <span className="text-brand-gold hover:text-white transition-colors duration-300">WE CREATE PERCEPTION.</span>
          </h2>

          <div className="pt-2">
            <p className="text-lg sm:text-2xl lg:text-3xl font-condensed font-medium tracking-wide text-neutral-300 border-l-2 border-neutral-700 pl-4 sm:pl-6 quote-hover-expand transition-all duration-300 cursor-default">
              Because people remember stories long after they forget images.
            </p>
          </div>

          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-neutral-800 text-neutral-400">
            <div className="group cursor-default p-2 rounded-sm hover:bg-neutral-900/60 transition-colors duration-300">
              <span className="text-brand-gold font-condensed font-bold text-sm tracking-widest block mb-1 group-hover:translate-x-1 transition-transform">
                01 / ARCHITECTURE
              </span>
              <p className="text-xs font-sans text-neutral-300 group-hover:text-white transition-colors">
                Is not merely a product or square footage. It is an experiential space.
              </p>
            </div>

            <div className="group cursor-default p-2 rounded-sm hover:bg-neutral-900/60 transition-colors duration-300">
              <span className="text-brand-gold font-condensed font-bold text-sm tracking-widest block mb-1 group-hover:translate-x-1 transition-transform">
                02 / PHOTOGRAPHY
              </span>
              <p className="text-xs font-sans text-neutral-300 group-hover:text-white transition-colors">
                Captures light, shadow, texture, and the atmosphere of built reality.
              </p>
            </div>

            <div className="group cursor-default p-2 rounded-sm hover:bg-neutral-900/60 transition-colors duration-300">
              <span className="text-brand-gold font-condensed font-bold text-sm tracking-widest block mb-1 group-hover:translate-x-1 transition-transform">
                03 / STORYTELLING
              </span>
              <p className="text-xs font-sans text-neutral-300 group-hover:text-white transition-colors">
                Gives emotional resonance, context, and philosophical meaning.
              </p>
            </div>

            <div className="group cursor-default p-2 rounded-sm hover:bg-neutral-900/60 transition-colors duration-300">
              <span className="text-brand-gold font-condensed font-bold text-sm tracking-widest block mb-1 group-hover:translate-x-1 transition-transform">
                04 / BRANDING
              </span>
              <p className="text-xs font-sans text-neutral-300 group-hover:text-white transition-colors">
                Makes the architect's legacy and studio recognized and remembered.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
