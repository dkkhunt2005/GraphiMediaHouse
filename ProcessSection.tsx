import React from 'react'

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "UNDERSTAND",
      description: "We learn about your studio, design philosophy, audience, and objectives."
    },
    {
      number: "02",
      title: "DEFINE",
      description: "We establish the creative direction, project scope, and communication strategy."
    },
    {
      number: "03",
      title: "CREATE",
      description: "We bring the agreed concept to life through photography, design, branding, and visual storytelling."
    },
    {
      number: "04",
      title: "PRESENT",
      description: "We deliver the final work according to the agreed scope and help you communicate your work consistently."
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-neutral-200 pb-8 mb-16">
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-8 h-[2px] bg-brand-gold inline-block" />
            <span className="text-xs font-condensed font-bold uppercase tracking-editorial-wider text-brand-charcoal">
              METHODOLOGY &bull; WORKFLOW
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-condensed font-extrabold uppercase tracking-editorial-tight text-brand-black">
            OUR CREATIVE PROCESS
          </h2>
        </div>

        {/* Minimal Typographic Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {steps.map((step) => (
            <div key={step.number} className="relative pt-6 border-t-2 border-neutral-200 group hover:border-black transition-colors">
              <span className="text-4xl sm:text-5xl font-condensed font-extrabold text-neutral-300 group-hover:text-brand-gold transition-colors block mb-4">
                {step.number}
              </span>
              <h3 className="text-xl sm:text-2xl font-condensed font-extrabold uppercase tracking-tight text-brand-black mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
