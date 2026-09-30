import React from 'react'

interface ServicesSectionProps {
  onOpenQuote?: () => void
}

export default function ServicesSection({ onOpenQuote }: ServicesSectionProps) {
  const serviceColumns = [
    {
      title: 'Heavy Trailer Manufacturing',
      items: [
        'Cement Bulker Semi-Trailers (32m³ - 50m³)',
        'Heavy-Duty Tipper Dump Trailers (HARDOX)',
        'Multi-Axle Heavy Lowbed Transporters',
        'Reinforced Flatbed & Container Chassis',
        'Petroleum & Chemical Road Tankers',
      ],
    },
    {
      title: 'Custom Truck Bodies',
      items: [
        'Heavy-Duty Quarry Rock Dump Bodies',
        'Potable Water & Fuel Tanker Bodies',
        'Hydraulic Recovery & Heavy Tilt Trays',
        'Heavy Machinery Telescopic Crane Mounts',
        'Insulated Refrigerated Cargo Box Bodies',
      ],
    },
    {
      title: 'Fleet Engineering & Solutions',
      items: [
        'Custom Chassis Lengthening & Reinforcement',
        'SASO, ADR & GCC GSO Road Certification',
        'FEA Structural Dynamic Stress Analysis',
        'Complete Fleet Refurbishment & Axle Rebuilds',
        'Telematics & Tire Pressure Monitoring Systems',
      ],
    },
  ]

  return (
    <section className="w-full bg-[#EEEEEE] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y border-[#E2DFDC]">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-[#E07B10] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#E07B10]" />
          Comprehensive Capabilities
        </div>

        {/* Section Heading (DigitalTarka Style: 42px, Extrabold, Dark #111827) */}
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111827] leading-tight mb-6">
          Avoid Fleet Compromises
        </h2>

        {/* Section Description (18px, high contrast, readable) */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-[19px] text-[#1F2937] leading-relaxed mb-16 sm:mb-20">
          Success in heavy transport and desert logistics requires more than off-the-shelf catalog specifications. We focus on understanding your operating duty cycles, identifying payload bottlenecks, and engineering custom transport platforms that deliver measurable fleet gains. Every trailer and truck body is tailored to support your operational goals and deliver lasting reliability.
        </p>

        {/* 3 Columns Grid with Amber Bottom-Line Underline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 text-left max-w-5xl mx-auto">
          {serviceColumns.map((col, idx) => (
            <div key={idx} className="flex flex-col">
              
              {/* Column Title with Full-width Underline */}
              <div className="relative pb-3 mb-6 inline-block w-fit">
                <h3 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
                  {col.title}
                </h3>
                <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#E07B10]" />
              </div>

              {/* Service List */}
              <ul className="space-y-3.5 pl-0 list-none m-0">
                {col.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    onClick={onOpenQuote}
                    className="group flex items-center gap-2.5 text-base sm:text-[17px] font-semibold text-[#1F2937] hover:text-[#E07B10] cursor-pointer transition-all duration-200 hover:translate-x-2"
                  >
                    <span className="text-[#E07B10] text-sm opacity-60 group-hover:opacity-100 transition-opacity">
                      ▪
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

        {/* CTA Bar below services */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[#DCDAD7] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg sm:text-xl font-bold text-[#111827]">
              Need specialized dimensions or abnormal load capacities?
            </h4>
            <p className="text-sm sm:text-base text-[#374151] m-0">
              Our engineering team builds custom prototypes for unique industrial transport challenges.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenQuote}
            className="shrink-0 px-8 py-3.5 rounded-full bg-[#1B2B3A] hover:bg-[#E07B10] text-white font-bold text-sm tracking-wider uppercase transition-colors shadow-md cursor-pointer"
          >
            Request Custom Specification
          </button>
        </div>

      </div>
    </section>
  )
}
