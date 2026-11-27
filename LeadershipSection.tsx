import React from 'react'
import { leadershipData } from '../../data/leadership'
import { TiltCard } from '../ui/TiltCard'

export const LeadershipSection: React.FC = () => {
  const founder = leadershipData.find(m => m.id === 'founder') || leadershipData[0]
  const vp = leadershipData.find(m => m.id === 'vice-president') || leadershipData[1]

  return (
    <section className="py-20 lg:py-32 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-neutral-200 pb-8 mb-16">
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-8 h-[2px] bg-brand-gold inline-block" />
            <span className="text-xs font-condensed font-bold uppercase tracking-editorial-wider text-brand-charcoal">
              STUDIO DIRECTION &bull; LEADERSHIP
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-condensed font-extrabold uppercase tracking-editorial-tight text-brand-black">
            LED BY ARCHITECTURAL THINKING
          </h2>
        </div>

        {/* Founder Feature: Editorial Layout with 3D Tilt Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-neutral-100">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 space-y-4">
            <TiltCard maxTilt={5}>
              <div className="relative border border-neutral-300 bg-neutral-100 shadow-md overflow-hidden rounded-sm group">
                <img
                  src={founder.portrait}
                  alt={founder.portraitAlt}
                  className="w-full aspect-[4/4.2] object-cover filter grayscale contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/95 text-white p-4 border-t border-neutral-800">
                  <span className="text-xs font-condensed text-brand-gold uppercase tracking-widest block mb-0.5">
                    FOUNDER &bull; GRAPHI MEDIA HOUSE
                  </span>
                  <span className="text-xl font-condensed font-bold uppercase tracking-wide text-white">
                    {founder.name}
                  </span>
                </div>
              </div>
            </TiltCard>
            
            <p className="text-[11px] font-sans text-neutral-500 italic">
              Original founder portrait extracted directly from the verified brand archive.
            </p>
          </div>

          {/* Biography Column */}
          <div className="lg:col-span-7 space-y-6 lg:pt-2">
            <div>
              <span className="text-xs font-condensed font-bold uppercase tracking-editorial-wider text-neutral-400 block mb-1">
                MEET THE FOUNDER
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-condensed font-extrabold uppercase tracking-tight text-brand-black">
                {founder.name}
              </h3>
              <p className="text-sm font-condensed font-semibold text-brand-gold tracking-widest uppercase mt-1">
                {founder.title}
              </p>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-neutral-700 font-sans leading-relaxed">
              <p>
                {founder.bio}
              </p>
              <p>
                With experience in building <strong>20+ brands</strong> across diverse industries, collaborating with <strong>10+ architects and design studios</strong>, and professionally documenting <strong>30+ architectural projects</strong>, he brings together architecture, branding, and visual storytelling under one cohesive vision.
              </p>
              <p className="text-sm text-neutral-600 border-l-2 border-brand-gold pl-4 py-1 italic font-light">
                “His architectural background ensures every story is authentic. His branding experience ensures every project is memorable. Together, they create a creative approach that doesn't just showcase architecture—it builds brands around it.”
              </p>
            </div>

            {/* Metrics */}
            {founder.experienceMetrics && (
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-neutral-200">
                {founder.experienceMetrics.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-3xl sm:text-4xl font-condensed font-extrabold text-brand-black block">
                      {m.value}
                    </span>
                    <span className="text-xs font-sans text-neutral-500 block leading-tight">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Vice President Profile with Tilt Card */}
        <div className="pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <TiltCard maxTilt={5}>
              <div className="relative border border-neutral-300 bg-neutral-100 overflow-hidden rounded-sm group shadow-sm">
                <img
                  src={vp.portrait}
                  alt={vp.portraitAlt}
                  className="w-full aspect-square object-cover filter grayscale contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="p-4 bg-black text-white">
                  <span className="text-xs font-condensed text-brand-gold uppercase tracking-widest block mb-0.5">
                    VICE PRESIDENT
                  </span>
                  <span className="text-lg font-condensed font-bold uppercase tracking-wide">
                    {vp.name}
                  </span>
                </div>
              </div>
            </TiltCard>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div>
              <span className="text-xs font-condensed font-bold uppercase tracking-editorial-wider text-neutral-400 block mb-1">
                EXECUTIVE OPERATIONS
              </span>
              <h3 className="text-2xl sm:text-3xl font-condensed font-extrabold uppercase tracking-tight text-brand-black">
                {vp.name}
              </h3>
              <p className="text-sm font-condensed font-semibold text-neutral-500 tracking-widest uppercase">
                {vp.title}
              </p>
            </div>

            <p className="text-base text-neutral-700 font-sans leading-relaxed">
              {vp.bio}
            </p>

            <div className="pt-2 text-xs text-neutral-500 font-sans bg-neutral-50 p-4 border border-neutral-200">
              <span className="font-semibold text-black block mb-1">Studio Collaboration Philosophy:</span>
              Bridging engineering precision and artistic visual narrative so every project is executed without friction, from initial site reconnaissance in Gujarat to final publication dossiers.
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
