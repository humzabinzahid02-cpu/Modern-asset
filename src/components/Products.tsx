import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollExpand from './ScrollExpand'
import StickyCard002 from './StickyCard002'
import GlassButton from '../GlassButton'

gsap.registerPlugin(ScrollTrigger)

export interface ProductDetail {
  id: string
  name: string
  tag: string
  category: string
  desc: string
  img: string
  specs: { label: string; value: string }[]
  features: string[]
  leadTime: string
}

const PRODUCTS_DATA: ProductDetail[] = [
  {
    id: 'tankers',
    name: 'Precision Tankers',
    tag: 'Liquid Transport',
    category: 'transport',
    desc: 'Fuel, petroleum, chemical, and potable water tankers engineered to SASO, ADR, and ISO standards with multi-compartment baffles.',
    img: 'https://images.unsplash.com/photo-1745441062417-5d0fbfcbf48f?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Payload Capacity', value: '32,000L - 55,000L' },
      { label: 'Chassis Alloy', value: '304/316 Stainless or Al-5182' },
      { label: 'Compartments', value: '1 to 5 Multi-Chamber' },
      { label: 'Certifications', value: 'ADR • SASO • ISO 9001' },
    ],
    features: [
      'Pneumatic bottom-loading safety manifold',
      'Electronic vapor recovery & overfill sensors',
      'BPW air suspension with front lift axle',
      'Anti-corrosion robotic interior weld seams',
    ],
    leadTime: '3 - 5 Weeks',
  },
  {
    id: 'lowbed',
    name: 'Heavy-Duty Low-Bed Trailers',
    tag: 'Heavy Haul',
    category: 'heavy',
    desc: 'Engineered for multi-ton abnormal haulage, industrial transformers, earthmoving equipment, and extreme plant relocation with zero chassis deflection.',
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Payload Rating', value: '60 - 150 Metric Tons' },
      { label: 'Axle Configuration', value: '3, 4, 5 & 6-Axle Hydraulic' },
      { label: 'Chassis Alloy', value: 'Strenx 700MC High-Tensile' },
      { label: 'Ramp System', value: 'Heavy Hydraulic Bi-Fold' },
    ],
    features: [
      'High-tensile Strenx 700MC steel construction',
      'Hydraulic steering axles with wireless remote override',
      'Outrigger brackets for wide load accommodation',
      'Integrated heavy-duty lashing points every 500mm',
    ],
    leadTime: '4 - 6 Weeks Guaranteed',
  },
  {
    id: 'flatbed',
    name: 'Reinforced Flat-Bed Trailers',
    tag: 'General Freight',
    category: 'heavy',
    desc: 'High-payload commercial transport platforms featuring versatile container twist-locks, removable stanchions, and reinforced headboards.',
    img: 'https://images.unsplash.com/photo-1626121300305-def4dc305387?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Deck Length', value: '12.5m - 14.5m Standard' },
      { label: 'Payload Capacity', value: '45 - 60 Metric Tons' },
      { label: 'Flooring', value: 'Hardwood or Checkered Steel' },
      { label: 'Twist Locks', value: '12x Retractable ISO Units' },
    ],
    features: [
      'Heavy-duty I-beam fabricated chassis with camber pre-stressing',
      'Full LED hermetically sealed lighting harness',
      'Dual spare wheel carrier with winch mechanism',
      'Certified front impact collision bulkhead',
    ],
    leadTime: '2 - 4 Weeks',
  },
  {
    id: 'truckbodies',
    name: 'Custom Truck Bodies',
    tag: 'Custom Build',
    category: 'custom',
    desc: 'Bespoke cargo boxes, refrigerated insulated units, curtain-siders, and tipper bodies custom manufactured onto any OEM chassis.',
    img: 'https://images.unsplash.com/photo-1778103617525-76877c583fa5?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Body Volume', value: '18m³ - 65m³ Available' },
      { label: 'Side Wall Spec', value: 'Reinforced Monocoque Panels' },
      { label: 'Tail Lift', value: '1,500kg - 3,000kg Hydraulic' },
      { label: 'Chassis Match', value: 'Mercedes, Volvo, MAN, Scania' },
    ],
    features: [
      'Aerodynamic roof radius reducing fuel consumption by up to 7%',
      'Heavy-duty floor substructure with galvanized crossmembers',
      'Flush-mount internal cargo track tie-down systems',
      'Custom exterior paint with UV-resistant clear coat',
    ],
    leadTime: '2 - 3 Weeks',
  },
  {
    id: 'sweepers',
    name: 'Industrial Road Sweepers',
    tag: 'Municipal',
    category: 'municipal',
    desc: 'High-performance regenerative-air and mechanical vacuum road sweepers for municipalities, airports, and construction sites.',
    img: 'https://images.unsplash.com/photo-1782421932252-dbca02aae506?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Hopper Volume', value: '6.0m³ - 9.0m³ Capacity' },
      { label: 'Sweeping Width', value: 'Up to 3,600mm Dual Gutter' },
      { label: 'Water Tank', value: '1,500L Dust Suppression' },
      { label: 'Auxiliary Engine', value: 'Tier 4 / Stage V Diesel' },
    ],
    features: [
      'High-vacuum impeller with variable speed hydraulic drive',
      'Dual steer camera system with cabin telemetry screen',
      'High-pressure front spray bar and handheld washdown lance',
      'Stainless steel debris hopper with automatic wash-out nozzle',
    ],
    leadTime: '4 - 6 Weeks',
  },
  {
    id: 'wreckers',
    name: 'Heavy Recovery Wreckers',
    tag: 'Recovery',
    category: 'municipal',
    desc: 'Rotator boom and slide-back recovery vehicles designed for severe highway clearing, overturn recovery, and heavy vehicle towing.',
    img: 'https://images.unsplash.com/photo-1768759579422-91cf6f113de1?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Boom Capacity', value: '30 - 75 Ton Continuous' },
      { label: 'Underlift Rating', value: '16,000kg Retracted' },
      { label: 'Winches', value: 'Dual 25,000kg Planetary' },
      { label: 'Rotation', value: '360° Continuous Bearing' },
    ],
    features: [
      'Wireless proportional remote control for all hydraulic functions',
      'Outrigger pads with integrated ground pressure sensors',
      'Complete towing adapter suite for buses and articulated trucks',
      'Full emergency strobe perimeter illumination suite',
    ],
    leadTime: '6 - 8 Weeks',
  },
  {
    id: 'aerial',
    name: 'Aerial Work Platforms',
    tag: 'Elevated Work',
    category: 'custom',
    desc: 'Insulated articulated boom and telescopic cherry pickers for power line maintenance, civil infrastructure, and telecommunications.',
    img: 'https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Working Height', value: '14m - 42m Elevation' },
      { label: 'Basket Capacity', value: '250kg - 450kg (2-Person)' },
      { label: 'Insulation Rating', value: 'Up to 69kV Dielectric' },
      { label: 'Rotation', value: 'Continuous 360° Turntable' },
    ],
    features: [
      'Zero-tailswing boom geometry for tight urban corridor access',
      'Automatic leveling fiberglass basket with emergency ground controls',
      'Hydraulic tool circuit outlets in basket',
      'Certified EN 280 / ANSI A92.2 compliance inspection',
    ],
    leadTime: '4 - 6 Weeks',
  },
  {
    id: 'carriers',
    name: 'Multi-Level Car Carriers',
    tag: 'Auto Logistics',
    category: 'transport',
    desc: 'High-density multi-vehicle transporter trailers with hydraulic lifting decks, low angle drive-on ramps, and car tie-down chocks.',
    img: 'https://images.unsplash.com/photo-1766561994067-dbd575e1cff2?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Vehicle Capacity', value: '6 to 10 Passenger Cars' },
      { label: 'Deck Control', value: 'Multi-Valve Hydraulic Lift' },
      { label: 'Ramp Angle', value: 'Ultra-Low 8° Drive-On' },
      { label: 'Gross Weight', value: 'Up to 38,000kg' },
    ],
    features: [
      'Perforated galvanized decking with heavy safety grip punchings',
      'Hydraulic deck locks with mechanical secondary fail-safes',
      'Adjustable wheel stops and ratchet tensioners included',
      'Protected undercarriage hydraulics with zinc-nickel hard piping',
    ],
    leadTime: '3 - 5 Weeks',
  },
  {
    id: 'custom',
    name: 'Bespoke Vehicle Engineering',
    tag: 'Bespoke',
    category: 'custom',
    desc: 'Custom special-purpose builds: mobile clinics, command centers, explosive transport, lubrication trucks, and mining service vehicles.',
    img: 'https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Engineering', value: 'FEA Stress Analysis & CAD' },
      { label: 'Chassis Mod', value: 'Wheelbase Extension / Drop' },
      { label: 'Power Systems', value: 'Integrated Generators / Solar' },
      { label: 'Custom Systems', value: 'HVAC, Hydraulic & Pneumatic' },
    ],
    features: [
      'End-to-end custom design from blank page to road registration',
      'Turnkey equipment integration with automated control PLC',
      'Comprehensive operator manuals and technical training',
      'On-site field commissioning and lifecycle spares support',
    ],
    leadTime: 'Inquire',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Fleet' },
  { id: 'transport', label: 'Liquid & Freight' },
  { id: 'heavy', label: 'Heavy Haul & Trailers' },
  { id: 'municipal', label: 'Municipal & Wreckers' },
  { id: 'custom', label: 'Custom & Elevated' },
]

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack')
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filteredProducts = PRODUCTS_DATA.filter((p) =>
    activeCategory === 'all' ? true : p.category === activeCategory
  )
  const gridCardsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (viewMode !== 'grid') return
    const el = gridCardsRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.grid-product-card')
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 40,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, el)

    return () => ctx.revert()
  }, [viewMode, activeCategory])

  return (
    <section id="products" className="bg-[#F6F5F1] relative w-full overflow-x-clip">
      {/* ScrollExpand Section */}
      <div className="relative w-full mb-4 sm:mb-8">
        <ScrollExpand
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&h=1080&fit=crop&auto=format"
          alt="Modern Assets Heavy Fleet Expansion"
          title="BUILT FOR EVERY INDUSTRY"
          badge="CHAPTER 02 • COMMERCIAL FLEET"
          scrollHint="SCROLL TO EXPAND FLEET"
          startWidth={76}
          startHeight={78}
          startRadius={24}
          endRadius={0}
          mediaZoom={1.25}
          scrollDistance={0.9}
          holdDistance={0.15}
          smoothing={0.03}
          overlayScrim={0.5}
          useWindowScroll={true}
        >
          {/* Content that fades in over the media once it reaches full bleed */}
          <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E07B10]/20 border border-[#E07B10]/40 backdrop-blur-md font-body text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#E07B10] mb-4">
              <span>CHAPTER 02</span>
              <span className="opacity-40">•</span>
              <span>HEAVY-DUTY COMMERCIAL FLEET</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase leading-[0.95] mb-4 text-white drop-shadow-md">
              ENGINEERED FOR <span className="text-[#E07B10]">EXTREME PAYLOADS</span>
            </h2>

            <p className="font-body text-xs sm:text-base md:text-lg font-light leading-relaxed text-white/90 max-w-xl mb-6 drop-shadow-sm">
              From certified ADR chemical tankers to 150-ton hydraulic low-bed trailers, our heavy
              commercial solutions are forged for unyielding performance and absolute durability.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <GlassButton
                variant="gold"
                size="md"
                onClick={() => {
                  const target = document.getElementById('catalog-cards')
                  if (target) target.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span className="inline-flex items-center gap-1.5">Inspect Fleet Catalog <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg></span>
              </GlassButton>
              <GlassButton
                variant="ghost-white"
                size="md"
                onClick={() => {
                  const target = document.getElementById('contact')
                  if (target) target.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span className="inline-flex items-center gap-1.5">Request Custom Blueprint <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></span>
              </GlassButton>
            </div>
          </div>
        </ScrollExpand>
      </div>

      {/* Product Catalog Grid Container */}
      <div id="catalog-cards" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
        
        {/* Section Header & Filters */}
        <div className="flex flex-col gap-6 mb-8 sm:mb-12">
          <div className="flex flex-col items-stretch gap-6">
            <div>
              <div className="font-body text-[11px] tracking-[0.3em] uppercase text-[#E07B10] mb-2 font-bold">
                Precision Fleet Catalog
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase leading-none text-[#1B2B3A]">
                Tailored for Every Sector
              </h3>
            </div>

            {/* Filter Pills & View Switcher strictly in one horizontal line */}
            <div className="flex w-full flex-nowrap items-center justify-between gap-3 max-w-full pb-1 sm:pb-0">
              {/* Category filters — Single Line */}
              <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-1 sm:gap-1.5 bg-white p-1 sm:p-1.5 rounded-2xl border border-[#E2DFDC] shadow-xs max-w-full overflow-x-auto xl:overflow-visible no-scrollbar whitespace-nowrap">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`shrink-0 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-display text-[11px] sm:text-xs font-bold tracking-wider uppercase cursor-pointer border-none transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-[#E07B10] text-white shadow-xs'
                          : 'bg-transparent text-[#5C6470] hover:text-[#1B2B3A]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  )
                })}
              </div>

              {/* View Switcher: 3D ScrollStack vs 2-Column Grid */}
              <div className="flex shrink-0 items-center gap-1 bg-white p-1 sm:p-1.5 rounded-2xl border border-[#E2DFDC] shadow-xs">
                <button
                  onClick={() => setViewMode('stack')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-display text-[11px] sm:text-xs font-bold tracking-wider uppercase cursor-pointer border-none transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    viewMode === 'stack'
                      ? 'bg-[#E07B10] text-white shadow-xs'
                      : 'bg-transparent text-[#5C6470] hover:text-[#1B2B3A]'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                  <span>Stack</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-display text-[11px] sm:text-xs font-bold tracking-wider uppercase cursor-pointer border-none transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    viewMode === 'grid'
                      ? 'bg-[#E07B10] text-white shadow-xs'
                      : 'bg-transparent text-[#5C6470] hover:text-[#1B2B3A]'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                  <span>Grid</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode: Responsive Stack or 2-Column Grid */}
        {viewMode === 'stack' ? (
          <div className="relative w-full max-w-7xl mx-auto">
            <StickyCard002
              cards={filteredProducts}
              containerClassName="max-w-6xl xl:max-w-[1340px]"
              renderCard={(p) => (
                <div
                  onClick={() => setSelectedProduct(p)}
                  className="stack-card-inner group grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[540px] cursor-pointer bg-white rounded-2xl sm:rounded-3xl lg:rounded-[34px] overflow-hidden border border-[#E2DFDC] shadow-xs hover:shadow-md transition-all"
                >
                  {/* Vehicle Image (Top on mobile, Left 7-cols on desktop) */}
                  <div className="relative lg:col-span-7 overflow-hidden h-56 sm:h-72 lg:h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[360px] bg-[#F6F5F1]">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B3A]/40 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 font-body text-[10px] sm:text-xs font-bold tracking-wider uppercase text-white bg-[#E07B10] px-3 py-1 rounded-md shadow-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>{p.tag}</span>
                    </div>

                    {/* Expand Cue */}
                    <div className="absolute top-4 right-4 font-body text-[10px] sm:text-xs tracking-wider uppercase text-[#1B2B3A] bg-white/90 backdrop-blur-xs px-3 py-1 rounded-md border border-[#E2DFDC] font-semibold">
                      Inspect Specs ↗
                    </div>
                  </div>

                  {/* Detailed Specs & Controls (Bottom on mobile, Right 5-cols on desktop) */}
                  <div className="lg:col-span-5 p-5 sm:p-7 lg:p-8 xl:p-10 flex flex-col justify-center bg-white">
                    <div className="font-body text-[10px] sm:text-xs tracking-widest uppercase text-[#E07B10] font-bold mb-1.5">
                      Build Lead Time: {p.leadTime}
                    </div>
                    <h4 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase text-[#1B2B3A] mb-2 sm:mb-3 leading-tight">
                      {p.name}
                    </h4>
                    <p className="font-body text-xs sm:text-sm text-[#5C6470] leading-relaxed mb-4 sm:mb-6 line-clamp-3 lg:line-clamp-none">
                      {p.desc}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl bg-[#F6F5F1] border border-[#E2DFDC] mb-5 sm:mb-6">
                      {p.specs.map((s, idx) => (
                        <div key={idx}>
                          <div className="font-body text-[10px] sm:text-[11px] tracking-wider uppercase text-[#5C6470] mb-0.5 font-semibold">
                            {s.label}
                          </div>
                          <div className="font-display font-extrabold text-sm sm:text-base lg:text-lg text-[#1B2B3A] leading-tight">
                            {s.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                      <GlassButton
                        variant="gold"
                        size="md"
                        style={{ flex: 1, justifyContent: 'center' }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation()
                          setSelectedProduct(p)
                        }}
                      >
                        <span className="inline-flex items-center gap-1.5">Inspect Specs <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></span>
                      </GlassButton>
                      <GlassButton
                        variant="ghost"
                        size="md"
                        style={{ flex: 1, justifyContent: 'center' }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation()
                          const contactEl = document.getElementById('contact')
                          if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' })
                        }}
                      >
                        Inquire Quote
                      </GlassButton>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        ) : (
          /* Product Cards Grid: 1 Col on Mobile, 2 Col on Tablet/Desktop */
          <div
            ref={gridCardsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto w-full"
          >
            {filteredProducts.map((p) => {
              const isHovered = hoveredId === p.id
              return (
                <div
                  key={p.id}
                  className="grid-product-card bg-white rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border border-[#E2DFDC] hover:border-[#E07B10] shadow-xs hover:shadow-lg transition-all flex flex-col"
                  onClick={() => setSelectedProduct(p)}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Visual Image Banner */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] min-h-[200px] overflow-hidden bg-[#F6F5F1]">
                    <img
                      src={p.img}
                      alt={p.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                        isHovered ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B3A]/60 via-transparent to-transparent pointer-events-none" />

                    {/* Category Badge */}
                    <div className="absolute top-3.5 left-3.5 font-body text-[10px] sm:text-xs font-bold tracking-wider uppercase text-white bg-[#E07B10] px-2.5 py-1 rounded-md shadow-xs">
                      {p.tag}
                    </div>

                    {/* Lead Time indicator */}
                    <div className="absolute top-3.5 right-3.5 font-body text-[10px] sm:text-xs tracking-wider uppercase text-[#1B2B3A] bg-white px-2.5 py-1 rounded-md border border-[#E2DFDC] font-semibold">
                      Build: {p.leadTime}
                    </div>

                    {/* Name overlay */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5">
                      <h4 className="font-display font-black text-xl sm:text-2xl lg:text-3xl uppercase text-white drop-shadow-md m-0">
                        {p.name}
                      </h4>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 bg-white">
                    <p className="font-body text-xs sm:text-sm text-[#5C6470] leading-relaxed mb-4 line-clamp-2">
                      {p.desc}
                    </p>

                    {/* Technical Specs 2x2 Grid */}
                    <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#F6F5F1] border border-[#E2DFDC] mb-5">
                      {p.specs.map((s, sIdx) => (
                        <div key={sIdx}>
                          <div className="font-body text-[10px] tracking-wider uppercase text-[#5C6470] mb-0.5">
                            {s.label}
                          </div>
                          <div className="font-display font-bold text-sm sm:text-base text-[#1B2B3A]">
                            {s.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex gap-2.5 mt-auto">
                      <GlassButton
                        variant="gold"
                        size="sm"
                        style={{ flex: 1, justifyContent: 'center' }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation()
                          setSelectedProduct(p)
                        }}
                      >
                        <span className="inline-flex items-center gap-1.5">Inspect Specs <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></span>
                      </GlassButton>
                      <GlassButton
                        variant="ghost"
                        size="sm"
                        style={{ flex: 1, justifyContent: 'center' }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation()
                          const contactEl = document.getElementById('contact')
                          if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' })
                        }}
                      >
                        Inquire Quote
                      </GlassButton>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Interactive Vehicle Inspection Modal */}
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 z-[99999] bg-[#1B2B3A]/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white border border-[#E2DFDC] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col"
          >
            {/* Modal Header Image */}
            <div className="relative h-48 sm:h-64 overflow-hidden shrink-0">
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B3A]/80 via-[#1B2B3A]/20 to-transparent" />
              
              {/* Close button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white hover:bg-[#E07B10] text-[#1B2B3A] hover:text-white border border-[#E2DFDC] flex items-center justify-center cursor-pointer transition-colors shadow-sm"
                aria-label="Close modal"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Header Title */}
              <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6">
                <span className="inline-block font-body text-[10px] tracking-wider uppercase text-white bg-[#E07B10] px-3 py-1 rounded-md mb-1.5 font-bold">
                  {selectedProduct.tag}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-4xl uppercase text-white m-0 leading-tight">
                  {selectedProduct.name}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 md:p-8 bg-white flex flex-col">
              <p className="font-body text-xs sm:text-sm text-[#5C6470] leading-relaxed mb-6">
                {selectedProduct.desc}
              </p>

              {/* Specs Grid */}
              <h5 className="font-display font-extrabold text-base sm:text-lg tracking-wider uppercase text-[#1B2B3A] mb-3">
                Technical Specifications &amp; Limits
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6">
                {selectedProduct.specs.map((s, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F6F5F1] border border-[#E2DFDC] rounded-xl p-3"
                  >
                    <div className="font-body text-[10px] tracking-wider uppercase text-[#5C6470]">
                      {s.label}
                    </div>
                    <div className="font-display font-extrabold text-sm sm:text-base text-[#1B2B3A] mt-1">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Engineering Features */}
              <h5 className="font-display font-extrabold text-base sm:text-lg tracking-wider uppercase text-[#1B2B3A] mb-3">
                Key Engineering Highlights
              </h5>
              <ul className="list-none p-0 m-0 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProduct.features.map((feat, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-center gap-2.5 font-body text-xs sm:text-sm text-[#5C6470]"
                  >
                    <span className="w-4 h-4 rounded-full bg-[#E07B10]/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-[#E07B10]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E2DFDC] pt-5 mt-auto">
                <div className="font-body text-xs text-[#5C6470] text-center sm:text-left">
                  Custom engineering and dimensions built to order in KSA.
                </div>
                <div className="flex gap-2.5 w-full sm:w-auto">
                  <GlassButton
                    variant="gold"
                    size="md"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => {
                      setSelectedProduct(null)
                      const c = document.getElementById('contact')
                      if (c) c.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <span className="inline-flex items-center gap-1.5">Inquire Blueprint <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg></span>
                  </GlassButton>
                  <GlassButton
                    variant="ghost"
                    size="md"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </GlassButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
