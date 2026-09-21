import { useEffect, useState, useRef } from 'react'
import GlassButton from '../GlassButton'

const FLIP_WORDS = ['PURPOSE', 'POWER', 'PROGRESS', 'PERFORMANCE', 'PROWESS']

const ABOUT_TABS = [
  {
    id: 'story',
    label: 'Who We Are',
    title: 'Precision Commercial Vehicle Manufacturers',
    badge: 'EST. 1998 • 25+ YEARS',
    quote:
      'We started Modern Assets with one guiding mission: build the strongest, most dependable transport equipment in the industry. Every chassis, weld, and tanker is engineered from the ground up for extreme durability.',
    author: 'Tariq Al-Mansoor',
    role: 'Managing Director & Founder',
    stats: [
      { label: 'Fleet Assets Delivered', value: '5,200+' },
      { label: 'Heavy Haul Rating', value: 'Up to 150T' },
      { label: 'In-House Facility', value: '85,000 sq.ft' },
      { label: 'Certified Compliance', value: 'ADR & ISO 9001' },
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    title: 'High-Tensile Metallurgy & Robotic Precision',
    badge: 'ADVANCED ROBOTICS',
    quote:
      'From 700 MPa high-strength steel tankers to custom multi-axle low-beds, our mechanical engineers run rigorous 3D SolidWorks and FEA stress simulations to eliminate structural fatigue before fabrication.',
    author: 'Eng. Marcus Vance',
    role: 'Head of Metallurgy & FEA Design',
    stats: [
      { label: 'Chassis Material', value: 'Hardox® & Strenx®' },
      { label: 'Robotic Tolerance', value: '±0.5mm Laser' },
      { label: 'Surge Baffle Integrity', value: '100% Tested' },
      { label: 'Standard Warranty', value: '3-Year Chassis' },
    ],
  },
  {
    id: 'promise',
    label: 'Our Promise',
    title: 'Guaranteed Delivery & Full Fleet Support',
    badge: 'TURNKEY FLEET PARTNER',
    quote:
      'When your business moves heavy cargo, downtime costs thousands. We guarantee our build timelines, provide turnkey road documentation, and back every fleet with rapid spare parts and dedicated technical support.',
    author: 'Karim Haddad',
    role: 'VP Fleet Logistics & After-Sales',
    stats: [
      { label: 'On-Schedule Handover', value: '99.4%' },
      { label: 'Build Lead Time', value: '3 - 6 Weeks' },
      { label: 'Field Support Dispatch', value: '24/7 Dedicated' },
      { label: 'Chassis Customization', value: '100% Bespoke' },
    ],
  },
]

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

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

  const currentWord = FLIP_WORDS[wordIdx]
  const tabData = ABOUT_TABS[activeTab]

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
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F6F5F1] via-[#F6F5F1]/90 to-[#F6F5F1]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F6F5F1] via-transparent to-transparent" />
      </div>

      {/* Main Responsive Grid Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-14 items-center min-h-[calc(100vh-6rem)] py-8 lg:py-16">
          
          {/* ── Left Column: Headline, Description & CTAs (7 cols) ── */}
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

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
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
                  const a = document.getElementById('about')
                  if (a) a.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Know About Us ▷
              </GlassButton>
            </div>

            {/* Key Trust Counters */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 border-t border-[#E2DFDC] max-w-lg">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-black text-[#1B2B3A] leading-none">
                  150T+
                </div>
                <div className="font-body text-[11px] sm:text-xs text-[#5C6470] uppercase tracking-wider mt-1">
                  Max Payload
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-black text-[#1B2B3A] leading-none">
                  ±0.5mm
                </div>
                <div className="font-body text-[11px] sm:text-xs text-[#5C6470] uppercase tracking-wider mt-1">
                  Weld Precision
                </div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-black text-[#E07B10] leading-none">
                  25+ Yrs
                </div>
                <div className="font-body text-[11px] sm:text-xs text-[#5C6470] uppercase tracking-wider mt-1">
                  Industry Leader
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: 'Know About Us' Story & Credentials Card (5 cols) ── */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white rounded-3xl border border-[#E2DFDC] shadow-[0_20px_50px_rgba(27,43,58,0.08)] p-6 sm:p-8 flex flex-col gap-5 transition-all duration-300">
              
              {/* Card Header: Live Plant Status & Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-[#ECEAE4]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981]" />
                  <span className="font-display text-sm sm:text-base font-bold tracking-wider uppercase text-[#1B2B3A]">
                    Know About Modern Assets
                  </span>
                </div>
                <span className="font-body text-[10px] sm:text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-[#E07B10]/10 text-[#E07B10]">
                  {tabData.badge}
                </span>
              </div>

              {/* Interactive Navigation Tabs: Who We Are / Engineering / Our Promise */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F6F5F1] rounded-xl border border-[#E2DFDC]">
                {ABOUT_TABS.map((tab, idx) => {
                  const isActive = activeTab === idx
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(idx)}
                      className={`py-2 px-1 text-center font-display text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-white text-[#1B2B3A] shadow-sm'
                          : 'text-[#5C6470] hover:text-[#1B2B3A] bg-transparent'
                      }`}
                    >
                      {tab.label}
                    </button>
                  )
                })}
              </div>

              {/* Card Focus Headline */}
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#1B2B3A] leading-tight">
                  {tabData.title}
                </h3>
              </div>

              {/* Authentic Leadership Dialogue Box */}
              <div className="bg-[#F6F5F1] rounded-2xl p-4 sm:p-5 border border-[#E2DFDC]">
                <div className="flex items-center gap-1.5 font-body text-[11px] font-bold tracking-wider uppercase text-[#E07B10] mb-2">
                  <span>❝</span> DIRECT LEADERSHIP DIALOGUE
                </div>
                <p className="font-body text-xs sm:text-[13px] text-[#1B2B3A] italic leading-relaxed">
                  "{tabData.quote}"
                </p>
                <div className="mt-3 pt-2.5 border-t border-[#E2DFDC]/60 flex items-center justify-between text-[11px] font-body">
                  <span className="font-bold text-[#1B2B3A]">{tabData.author}</span>
                  <span className="text-[#8C949C]">{tabData.role}</span>
                </div>
              </div>

              {/* 2x2 Capabilities & Verified Metrics Matrix */}
              <div className="grid grid-cols-2 gap-2.5">
                {tabData.stats.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-white border border-[#ECEAE4] flex flex-col justify-center"
                  >
                    <span className="font-body text-[10px] uppercase tracking-wider text-[#8C949C] font-semibold">
                      {st.label}
                    </span>
                    <span className="font-display text-base sm:text-lg font-black text-[#1B2B3A] mt-0.5">
                      {st.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Card Footer: Turnkey Badge & About Link */}
              <div className="flex items-center justify-between pt-3 border-t border-[#ECEAE4]">
                <div className="flex items-center gap-1.5 text-xs font-body font-semibold text-[#5C6470]">
                  <span className="text-emerald-600 font-bold text-sm">✓</span>
                  <span>ISO 9001:2015 Registered Plant</span>
                </div>
                
                <button
                  onClick={() => {
                    const aboutSection = document.getElementById('about')
                    if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-[#1B2B3A] hover:bg-[#E07B10] text-white font-display text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <span>Our Story</span>
                  <span>→</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Vertical Scroll Indicator (Hidden on small mobile screens) */}
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

