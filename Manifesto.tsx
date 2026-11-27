import React from 'react'
import { TiltCard } from '../ui/TiltCard'

export const Manifesto: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="w-8 h-[2px] bg-brand-gold inline-block" />
          <span className="text-xs font-condensed font-bold uppercase tracking-editorial-wider text-brand-charcoal">
            OUR BELIEF &bull; BRAND MANIFESTO
          </span>
        </div>

        {/* Editorial Two-Column Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Monumental Headline with Text Hover Effects */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-condensed font-extrabold uppercase tracking-editorial-tight text-brand-black leading-[0.95]">
              <span className="hover:text-brand-gold transition-colors duration-300">WE BELIEVE ARCHITECTURE DESERVES MORE THAN DOCUMENTATION.</span>{' '}
              <span className="text-neutral-400 hover:text-black transition-colors duration-300">IT DESERVES AN IDENTITY.</span>
            </h2>

            <div className="w-16 h-1 bg-brand-gold mt-6" />

            <div className="pt-4">
              <TiltCard maxTilt={4}>
                <div className="overflow-hidden rounded-sm border border-neutral-200 shadow-sm bg-neutral-100 group">
                  <img
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop"
                    alt="Architectural detail, materiality and light"
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
              </TiltCard>
              <p className="text-[11px] font-condensed tracking-wider text-neutral-500 uppercase mt-2">
                Materiality, scale, and tectonic precision in dialogue with natural light.
              </p>
            </div>
          </div>

          {/* Right Column: Deep Editorial Copy with Interactive Text Elements */}
          <div className="lg:col-span-6 space-y-6 lg:pt-2">
            <div className="space-y-6 text-base sm:text-lg text-neutral-700 font-sans leading-relaxed font-normal">
              <p className="text-xl sm:text-2xl font-light text-brand-charcoal border-l-2 border-brand-gold pl-4 italic quote-hover-expand cursor-default">
                “Every line you draw carries intent. Every space you design solves a problem, shapes an experience, and reflects years of learning.”
              </p>

              <p>
                Yet exceptional work is often reduced to a few hurried photographs on social media feeds, stripped of context, scale, and intellectual weight.
              </p>

              <p>
                As an <strong>architect-led creative studio</strong>, we understand the intimate language of design. We know what makes a space meaningful, what makes a detail worth noticing, and what makes a studio fundamentally different from the rest.
              </p>

              <p className="p-5 bg-neutral-50 border-l-4 border-black text-brand-black font-medium hover:border-brand-gold hover:bg-neutral-100/70 transition-all duration-300 shadow-xs cursor-default">
                We don’t create content just to fill a feed. We build brands for people.
              </p>

              <p>
                Through architectural photography, branding, graphic design, films, print, and digital experiences, we transform projects into stories that connect, inspire, and leave an indelible, lasting impression.
              </p>
            </div>

            {/* Studio Pillars Snapshot */}
            <div className="pt-6 grid grid-cols-2 gap-4 border-t border-neutral-200">
              <div className="p-2 rounded-sm hover:bg-neutral-50 transition-colors group cursor-default">
                <span className="text-2xl font-condensed font-bold text-brand-black block group-hover:text-brand-gold transition-colors">
                  EXPERIENCE
                </span>
                <span className="text-xs text-neutral-500 font-sans">
                  Rooted in architectural education &amp; construction realities.
                </span>
              </div>
              <div className="p-2 rounded-sm hover:bg-neutral-50 transition-colors group cursor-default">
                <span className="text-2xl font-condensed font-bold text-brand-black block group-hover:text-brand-gold transition-colors">
                  PERCEPTION
                </span>
                <span className="text-xs text-neutral-500 font-sans">
                  Crafting reputation long after construction concludes.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
