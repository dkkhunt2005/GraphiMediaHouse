import React from 'react'
import { TiltCard } from '../ui/TiltCard'

export const IndustriesSection: React.FC = () => {
  const industries = [
    {
      title: "ARCHITECTURE STUDIOS",
      tagline: "Build a distinctive identity around your design philosophy and the spaces you create.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "INTERIOR DESIGNERS",
      tagline: "Present the character, materiality, and experience of your interiors through thoughtful visual storytelling.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "REAL ESTATE & DEVELOPMENT",
      tagline: "Communicate the value of projects through architectural imagery and consistent brand presentation.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "HOSPITALITY & COMMERCIAL SPACES",
      tagline: "Showcase spaces through imagery and storytelling that communicate atmosphere and experience.",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop"
    }
  ]

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-neutral-200 pb-8 mb-12">
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-8 h-[2px] bg-brand-gold inline-block" />
            <span className="text-xs font-condensed font-bold uppercase tracking-editorial-wider text-brand-charcoal">
              CLIENT SECTORS &bull; ALIGNMENT
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-condensed font-extrabold uppercase tracking-editorial-tight text-brand-black">
            INDUSTRIES WE SERVE
          </h2>
        </div>

        {/* 4 Sector Cards with 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, i) => (
            <TiltCard key={i} maxTilt={5}>
              <div className="group border border-neutral-200 bg-neutral-50/50 p-5 flex flex-col justify-between hover:border-black hover:shadow-lg transition-all duration-300 h-full rounded-sm">
                <div>
                  <div className="w-full aspect-[4/3] overflow-hidden bg-neutral-900 mb-4 border border-neutral-200">
                    <img
                      src={ind.image}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] font-condensed font-bold text-brand-gold tracking-widest block mb-1">
                    SECTOR 0{i + 1}
                  </span>
                  <h3 className="text-xl font-condensed font-bold uppercase tracking-tight text-brand-black mb-2 group-hover:text-brand-gold transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    {ind.tagline}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  )
}
