import React from 'react'
import { Link } from 'react-router-dom'
import { servicesData } from '../../data/services'
import { ArrowUpRight } from 'lucide-react'
import { WebGLImageDisplacement } from '../webgl/WebGLImageDisplacement'
import { TiltCard } from '../ui/TiltCard'
import { Magnetic } from '../ui/Magnetic'

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 pb-8 mb-16">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[2px] bg-brand-gold inline-block" />
              <span className="text-xs font-condensed font-bold uppercase tracking-editorial-wider text-brand-charcoal">
                CAPABILITIES &bull; EXPERTISE
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-condensed font-extrabold uppercase tracking-editorial-tight text-brand-black">
              DISCIPLINES &amp; SERVICES
            </h2>
          </div>

          <div className="mt-4 md:mt-0">
            <Magnetic strength={0.25}>
              <Link
                to="/services"
                className="inline-flex items-center space-x-2 text-xs font-condensed font-bold uppercase tracking-editorial-wider text-brand-black hover:text-brand-gold transition-colors group p-1"
              >
                <span>VIEW DETAILED SERVICE SCOPES</span>
                <ArrowUpRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Editorial Service Grid with 3D Tilt and WebGL Image Rippling */}
        <div className="space-y-16 lg:space-y-24">
          {servicesData.map((service, index) => {
            const isEven = index % 2 === 1
            return (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                } border-b border-neutral-100 pb-16 lg:pb-24 last:border-b-0`}
              >
                {/* Image Composition */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <TiltCard maxTilt={4}>
                    <div data-cursor="view" className="relative group overflow-hidden bg-neutral-900 shadow-md border border-neutral-200 rounded-sm">
                      <WebGLImageDisplacement
                        src={service.image}
                        alt={service.title}
                        aspectRatio="aspect-[16/10]"
                        priority={index < 2}
                      />
                      <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-sm text-brand-gold px-3 py-1 font-condensed font-bold text-xs tracking-widest border border-brand-gold/30 z-10 pointer-events-none">
                        SERVICE {service.number}
                      </div>
                    </div>
                  </TiltCard>
                </div>

                {/* Text Content */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="space-y-2">
                    <span className="text-xs font-condensed font-bold text-neutral-400 tracking-editorial-wider uppercase">
                      DISCIPLINE {service.number}
                    </span>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-condensed font-extrabold uppercase tracking-tight text-brand-black">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-base sm:text-lg text-neutral-700 font-sans leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Key Deliverables Pills / List */}
                  <div className="pt-2">
                    <span className="text-xs font-condensed font-bold uppercase tracking-wider text-black block mb-3">
                      SCOPE INCLUDES:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600 font-sans">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-brand-gold flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Magnetic strength={0.25}>
                      <Link
                        to={`/contact?service=${encodeURIComponent(service.deliverables[0] || service.title)}`}
                        className="inline-flex items-center space-x-2 bg-brand-black text-white hover:bg-neutral-800 px-6 py-3 text-xs font-condensed font-bold uppercase tracking-editorial-wide border border-black transition-all duration-200 group shadow-sm"
                      >
                        <span>{service.ctaText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Link>
                    </Magnetic>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
