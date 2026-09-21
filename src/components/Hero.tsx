import { useEffect, useState, useRef } from 'react'
import GlassButton from '../GlassButton'

const FLIP_WORDS = ['PURPOSE', 'POWER', 'PROGRESS', 'PERFORMANCE', 'PROWESS']

const FLEET_SHOWCASE = [
  {
    id: 'tanker',
    num: '01',
    name: '55,000L Fuel Tanker Semi-Trailer',
    category: 'Liquid Petroleum & Chemical Transport',
    img: 'https://images.unsplash.com/photo-1745441062417-5d0fbfcbf48f?w=900&h=650&fit=crop&auto=format',
    tag: 'Liquid Transport',
    badge: 'ADR & SASO Certified',
    capacity: '55,000 Liters',
    chassis: 'Hardox® 450 Robotic',
    leadTime: '3-4 Weeks',
    features: ['Anti-surge internal baffles', 'Multi-compartment manifold', 'BPW air suspension'],
  },
  {
    id: 'lowbed',
    num: '02',
    name: '150-Ton Heavy-Duty Low-Bed Trailer',
    category: 'Abnormal Load & Mining Machinery',
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&h=650&fit=crop&auto=format',
    tag: 'Extreme Heavy Haul',
    badge: '150 Metric Tons',
    capacity: '150,000 KG',
    chassis: 'Strenx 700MC Steel',
    leadTime: '4-6 Weeks',
    features: ['Hydraulic steering axles', 'Heavy bi-fold ramps', 'Extendable drop deck'],
  },
  {
    id: 'flatbed',
    num: '03',
    name: '60-Ton Reinforced ISO Flatbed',
    category: 'General Container & Structural Freight',
    img: 'https://images.unsplash.com/photo-1626121300305-def4dc305387?w=900&h=650&fit=crop&auto=format',
    tag: 'Commercial Freight',
    badge: 'ISO 9001 Certified',
    capacity: '60,000 KG',
    chassis: 'Pre-Cambered I-Beam',
    leadTime: '2-3 Weeks',
    features: ['12x Retractable ISO locks', 'Reinforced impact bulkhead', 'Hardwood / Steel deck'],
  },
  {
    id: 'truckbody',
    num: '04',
    name: 'Custom Heavy Truck Bodies',
    category: 'Bespoke Tipper, Box & Refrigerated',
    img: 'https://images.unsplash.com/photo-1778103617525-76877c583fa5?w=900&h=650&fit=crop&auto=format',
    tag: 'Custom Fabrication',
    badge: 'All OEM Chassis Ready',
    capacity: '18m³ - 65m³ Volume',
    chassis: 'Monocoque Subframe',
    leadTime: '2-4 Weeks',
    features: ['3,000kg Tail-lift hydraulic', 'UV thermal insulation', 'Direct chassis integration'],
  },
]

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [fleetIdx, setFleetIdx] = useState(0)
  const [isCardFlipping, setIsCardFlipping] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollTimeRef = useRef<number>(0)

  // Flip text interval
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIsFlipping(true)
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % FLIP_WORDS.length)
        setIsFlipping(false)
      }, 450)
    }, 3200)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // Mouse wheel scroll listener over the showcase card
  const handleShowcaseWheel = (e: React.WheelEvent) => {
    const now = Date.now()
    if (now - lastScrollTimeRef.current < 450) return // debounce rapid scroll ticks
    lastScrollTimeRef.current = now

    if (e.deltaY > 20) {
      // scroll down -> next fleet item
      setIsCardFlipping(true)
      setTimeout(() => {
        setFleetIdx((prev) => (prev + 1) % FLEET_SHOWCASE.length)
        setIsCardFlipping(false)
      }, 200)
    } else if (e.deltaY < -20) {
      // scroll up -> previous fleet item
      setIsCardFlipping(true)
      setTimeout(() => {
        setFleetIdx((prev) => (prev - 1 + FLEET_SHOWCASE.length) % FLEET_SHOWCASE.length)
        setIsCardFlipping(false)
      }, 200)
    }
  }

  const currentWord = FLIP_WORDS[wordIdx]
  const currentVehicle = FLEET_SHOWCASE[fleetIdx]

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-[#F6F5F1] flex items-center pt-24 pb-16 lg:py-0"
    >
      {/* Background Image with Light Industrial Overlay */}
      <div className="absolute inset-0 bg-[#F6F5F1] pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1778103617525-76877c583fa5?w=1800&h=1000&fit=crop&auto=format"
          alt="Heavy duty vehicle engineering"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F6F5F1] via-[#F6F5F1]/92 to-[#F6F5F1]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F6F5F1] via-transparent to-transparent" />
      </div>

      {/* Main Responsive Grid Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center min-h-[calc(100vh-6rem)] py-8 lg:py-16">
          
          {/* ── Left Column: Headline, CTAs & Scroll Cue (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 font-body text-[11px] sm:text-xs tracking-[0.25em] uppercase font-bold text-[#E07B10] bg-white px-3.5 py-1.5 rounded-full border border-[#E2DFDC] shadow-sm w-fit mb-5">
              <span className="w-2 h-2 rounded-full bg-[#E07B10] animate-pulse" />
              Heavy-Duty Vehicle Solutions
            </div>

            {/* Main Headline: Fixed Top Lines + 3D Flipping Yellow Line */}
            <div className="font-display font-black text-headings leading-[0.9] sm:leading-[0.92] uppercase tracking-tight mb-6">
              <span className="block text-5xl sm:text-7xl md:text-8xl xl:text-9xl text-[#1B2B3A]">
                BUILT WITH
              </span>
              <span className="block text-5xl sm:text-7xl md:text-8xl xl:text-9xl text-[#1B2B3A]">
                PRECISION &amp;
              </span>

              {/* Yellow/Orange 3D Flip Word Container */}
              <div className="h-[1.05em] overflow-hidden inline-flex items-center text-5xl sm:text-7xl md:text-8xl xl:text-9xl text-[#E07B10] [perspective:1000px]">
                <div
                  key={wordIdx}
                  className="inline-flex [transform-style:preserve-3d]"
                >
                  {currentWord.split('').map((char, charIdx) => (
                    <span
                      key={`${currentWord}-${charIdx}`}
                      style={{
                        transformOrigin: '50% 50% -18px',
                        animation: isFlipping
                          ? `letterFlipOut 400ms ease ${charIdx * 25}ms forwards`
                          : `letterFlipIn 500ms cubic-bezier(0.16, 1, 0.3, 1) ${charIdx * 35}ms forwards`,
                      }}
                      className="inline-block"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Subtitle */}
            <p className="font-body text-base sm:text-lg text-[#5C6470] max-w-xl leading-relaxed mb-8">
              Custom truck bodies, tankers, trailers and specialized heavy-haul platforms — built with precision,
              designed for extreme duty cycles, engineered for your fleet.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <GlassButton
                variant="gold"
                size="lg"
                onClick={() => {
                  const p = document.getElementById('products')
                  if (p) p.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Explore Our Products →
              </GlassButton>
              <GlassButton
                variant="ghost"
                size="lg"
                onClick={() => {
                  const c = document.getElementById('capabilities')
                  if (c) c.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Our Capabilities ▷
              </GlassButton>
            </div>

            {/* Interactive Scroll-Down Prompt */}
            <div className="flex items-center gap-4 pt-6 border-t border-[#E2DFDC] max-w-lg">
              <button
                onClick={() => {
                  const p = document.getElementById('products')
                  if (p) p.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group flex items-center gap-3 text-left cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-[#E2DFDC] shadow-sm flex items-center justify-center text-[#E07B10] group-hover:bg-[#E07B10] group-hover:text-white transition-all duration-300 group-hover:scale-105">
                  <span className="text-lg font-bold animate-bounce mt-0.5">↓</span>
                </div>
                <div>
                  <div className="font-display text-sm font-bold uppercase tracking-wider text-[#1B2B3A] group-hover:text-[#E07B10] transition-colors">
                    Scroll to Explore Fleet
                  </div>
                  <div className="font-body text-xs text-[#8C949C]">
                    Discover 3D card deck &amp; custom engineering specs
                  </div>
                </div>
              </button>
            </div>

          </div>

          {/* ── Right Column: Interactive Scroll-Driven Fleet Showcase (5 cols) ── */}
          <div className="lg:col-span-5 w-full">
            <div
              onWheel={handleShowcaseWheel}
              className="group relative bg-white rounded-3xl border border-[#E2DFDC] shadow-[0_25px_60px_rgba(27,43,58,0.09)] overflow-hidden transition-all duration-300 flex flex-col cursor-ns-resize"
            >
              
              {/* Card Top Banner: Scroll Instruction & Progress */}
              <div className="flex items-center justify-between px-6 py-3.5 bg-[#F6F5F1] border-b border-[#E2DFDC]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E07B10] animate-ping" />
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-[#1B2B3A]">
                    Scroll Wheel or Drag
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-display text-xs font-bold text-[#5C6470]">
                  <span className="text-[#E07B10] font-black">{currentVehicle.num}</span>
                  <span>/</span>
                  <span>04</span>
                </div>
              </div>

              {/* Vehicle Showcase Image with Cinematic Overlay */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-[#1B2B3A]">
                <img
                  key={currentVehicle.id}
                  src={currentVehicle.img}
                  alt={currentVehicle.name}
                  className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
                    isCardFlipping ? 'opacity-40 scale-95' : 'opacity-90 scale-100'
                  }`}
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                
                {/* Category & Cert Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-[#E07B10] text-white text-[10px] font-bold font-body uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                    {currentVehicle.tag}
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm text-[#1B2B3A] text-[10px] font-bold font-body uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/40 shadow-sm">
                    {currentVehicle.badge}
                  </span>
                </div>

                {/* Floating Title over Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white/80 font-body text-[11px] uppercase tracking-widest font-semibold mb-1">
                    {currentVehicle.category}
                  </div>
                  <h4 className="font-display text-xl sm:text-2xl font-black uppercase text-white leading-tight">
                    {currentVehicle.name}
                  </h4>
                </div>
              </div>

              {/* Showcase Body & Specs */}
              <div className="p-6 flex flex-col gap-4">
                
                {/* Quick 2-Column Spec Chips */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-[#F6F5F1] border border-[#E2DFDC]">
                    <span className="block font-body text-[10px] uppercase tracking-wider text-[#8C949C] font-semibold">
                      Chassis Spec
                    </span>
                    <span className="block font-display text-base font-black text-[#1B2B3A] mt-0.5">
                      {currentVehicle.chassis}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F6F5F1] border border-[#E2DFDC]">
                    <span className="block font-body text-[10px] uppercase tracking-wider text-[#8C949C] font-semibold">
                      Capacity Rating
                    </span>
                    <span className="block font-display text-base font-black text-[#E07B10] mt-0.5">
                      {currentVehicle.capacity}
                    </span>
                  </div>
                </div>

                {/* Feature Bullet Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {currentVehicle.features.map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      className="text-[11px] font-body font-semibold text-[#5C6470] bg-[#F6F5F1] px-2.5 py-1 rounded-lg border border-[#E2DFDC]"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>

                {/* Interactive Stepper Navigation & CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-[#ECEAE4] mt-1">
                  
                  {/* Step Buttons */}
                  <div className="flex items-center gap-1.5">
                    {FLEET_SHOWCASE.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => setFleetIdx(idx)}
                        className={`h-2 rounded-full transition-all duration-200 cursor-pointer border-none p-0 ${
                          fleetIdx === idx ? 'w-7 bg-[#E07B10]' : 'w-2 bg-[#E2DFDC] hover:bg-[#8C949C]'
                        }`}
                        title={item.name}
                      />
                    ))}
                  </div>

                  {/* Action Link to Products */}
                  <button
                    onClick={() => {
                      const p = document.getElementById('products')
                      if (p) p.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-[#1B2B3A] hover:bg-[#E07B10] text-white font-display text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    <span>View In 3D Stack</span>
                    <span>→</span>
                  </button>
                </div>

              </div>

              {/* Subtle Scroll Hint Bar at Card Bottom */}
              <div className="bg-[#F6F5F1]/80 py-1.5 text-center text-[10px] font-body text-[#8C949C] tracking-wide border-t border-[#E2DFDC]">
                🖱 Scroll mouse wheel here to cycle models
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Vertical Fixed Scroll Indicator (on large screens) */}
      <div className="hidden sm:flex absolute right-6 md:right-10 bottom-8 flex-col items-center gap-2 z-10 pointer-events-none">
        <span className="font-display text-[11px] tracking-[0.25em] uppercase text-[#8C949C] [writing-mode:vertical-rl] font-bold">
          SCROLL
        </span>
        <div className="w-[2px] h-12 bg-gradient-to-b from-[#E07B10] to-transparent" />
      </div>

      {/* 3D Flip Fade Text Keyframes */}
      <style>{`
        @keyframes letterFlipIn {
          0% {
            opacity: 0;
            transform: rotateX(-90deg) translateY(24px);
            filter: blur(4px);
          }
          60% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: rotateX(0deg) translateY(0px);
            filter: blur(0px);
          }
        }

        @keyframes letterFlipOut {
          0% {
            opacity: 1;
            transform: rotateX(0deg) translateY(0px);
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            transform: rotateX(90deg) translateY(-24px);
            filter: blur(4px);
          }
        }
      `}</style>
    </section>
  )
}

