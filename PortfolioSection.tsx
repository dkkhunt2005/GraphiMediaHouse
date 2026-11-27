import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { portfolioProjects, Project } from '../../data/projects'
import { ArrowUpRight } from 'lucide-react'
import { WebGLImageDisplacement } from '../webgl/WebGLImageDisplacement'
import { TiltCard } from '../ui/TiltCard'
import { Magnetic } from '../ui/Magnetic'

const CATEGORIES = ['ALL WORK', 'ARCHITECTURE', 'INTERIORS', 'BRANDING', 'GRAPHIC DESIGN', 'FILMS'] as const

export const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL WORK')

  const filteredProjects = activeCategory === 'ALL WORK'
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeCategory)

  return (
    <section className="py-20 lg:py-32 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 pb-8 mb-10">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[2px] bg-brand-gold inline-block" />
              <span className="text-xs font-condensed font-bold uppercase tracking-editorial-wider text-brand-charcoal">
                SELECTED WORK &bull; PORTFOLIO ARCHIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-condensed font-extrabold uppercase tracking-editorial-tight text-brand-black">
              SPACES &bull; IDENTITIES &bull; STORIES
            </h2>
          </div>

          <div className="mt-4 md:mt-0">
            <Magnetic strength={0.25}>
              <Link
                to="/portfolio"
                className="inline-flex items-center space-x-2 text-xs font-condensed font-bold uppercase tracking-editorial-wider text-brand-black hover:text-brand-gold transition-colors group p-1"
              >
                <span>EXPLORE ALL CASE STUDIES</span>
                <ArrowUpRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-4 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-condensed font-bold uppercase tracking-editorial-wide px-4 py-2 border transition-all duration-200 ${
                  isActive
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-black hover:text-black hover:shadow-sm'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Demonstration Disclaimer Notice */}
        <div className="mb-10 px-4 py-2.5 bg-neutral-50 border-l-2 border-neutral-400 text-[11px] text-neutral-500 font-sans flex items-center justify-between">
          <span>
            <strong>Curated Project Archive:</strong> Selected works are curated demonstration case studies highlighting the architectural composition, editorial rigor, and narrative methodology of Graphi Media House.
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-neutral-400">DEMO ARCHIVE</span>
        </div>

        {/* Editorial Project Grid with WebGL Image Rippling and 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProjects.map((project: Project, idx: number) => {
            const isFeatured = idx === 0
            return (
              <TiltCard
                key={project.slug}
                maxTilt={4}
                className={`group flex flex-col justify-between border-b border-neutral-200 pb-8 ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div data-cursor="view">
                  <Link to={`/portfolio/${project.slug}`} className="block overflow-hidden relative bg-neutral-900 shadow-sm border border-neutral-200 rounded-sm">
                    <WebGLImageDisplacement
                      src={project.heroImage}
                      alt={project.title}
                      aspectRatio={isFeatured ? 'aspect-[16/9]' : 'aspect-[4/3]'}
                      priority={idx < 2}
                    />

                    {/* Metadata overlays */}
                    <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-sm text-brand-gold text-[10px] font-condensed font-bold tracking-widest px-2.5 py-1 border border-brand-gold/30 z-10 pointer-events-none">
                      {project.category}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/95 text-black text-[10px] font-condensed font-bold tracking-widest px-2.5 py-1 z-10 pointer-events-none">
                      {project.location}
                    </div>
                  </Link>
                </div>

                <div className="pt-5 space-y-2 flex-grow">
                  <div className="flex items-baseline justify-between text-xs text-neutral-500 font-condensed tracking-wider">
                    <span>{project.studio}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-condensed font-extrabold uppercase tracking-tight text-brand-black group-hover:text-brand-gold transition-colors duration-200">
                    <Link to={`/portfolio/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 font-sans line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="pt-4">
                  <Magnetic strength={0.2}>
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="inline-flex items-center space-x-2 text-xs font-condensed font-bold uppercase tracking-editorial-wider text-black group-hover:text-brand-gold transition-colors duration-200 p-1"
                    >
                      <span>VIEW CASE STUDY</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                    </Link>
                  </Magnetic>
                </div>
              </TiltCard>
            )
          })}
        </div>

      </div>
    </section>
  )
}
