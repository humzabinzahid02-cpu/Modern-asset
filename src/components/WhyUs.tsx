import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    icon: 'shield',
    title: 'Uncompromising Quality',
    desc: 'ISO 9001:2015 certified. Every weld, every cut, every finish — engineered to outlast the harshest Saudi desert conditions.',
    stat: '15+',
    statLabel: 'Years',
  },
  {
    icon: 'settings',
    title: 'Built Around Your Needs',
    desc: 'No off-the-shelf compromises. Every unit is custom-engineered from first principles around your exact payload and duty cycle.',
    stat: '100%',
    statLabel: 'Custom',
  },
  {
    icon: 'users',
    title: 'Partnerships That Last',
    desc: 'From the first consultation to years of after-sales support — we stay accountable. Your uptime is our reputation.',
    stat: '24h',
    statLabel: 'Response',
  },
  {
    icon: 'truck',
    title: 'Delivery You Can Plan For',
    desc: 'Fixed timelines, fixed pricing. We commit to your schedule because we know delays cost you more than money.',
    stat: '98%',
    statLabel: 'On Time',
  },
]

const MARQUEE_ITEMS = [
  'PRECISION FABRICATION',
  'CUSTOM ENGINEERING',
  'ISO CERTIFIED',
  'HEAVY DUTY SOLUTIONS',
  'SAUDI ARABIA',
  'VISION 2030 READY',
]

export default function WhyUs() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const leftColRef = useRef<HTMLDivElement | null>(null)
  const featuresGridRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0.1, x: -30, scale: 0.98 },
          {
            opacity: 1, x: 0, scale: 1,
            duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            onComplete: () => {
              if (leftColRef.current) gsap.set(leftColRef.current, { clearProps: 'opacity,transform' })
            },
          }
        )
      }

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { opacity: 0.1, y: 24 },
          {
            opacity: 1, y: 0,
            duration: 0.6, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            onComplete: () => {
              if (headingRef.current) gsap.set(headingRef.current.children, { clearProps: 'opacity,transform' })
            },
          }
        )
      }

      if (featuresGridRef.current) {
        const cards = featuresGridRef.current.querySelectorAll('.why-feature-card')
        gsap.fromTo(
          cards,
          { opacity: 0.1, y: 30, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6, stagger: 0.06, ease: 'power2.out',
            scrollTrigger: {
              trigger: featuresGridRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            onComplete: () => {
              gsap.set(cards, { clearProps: 'opacity,transform' })
            },
          }
        )
      }
    }, el)

    const safetyTimer = setTimeout(() => {
      if (leftColRef.current) {
        leftColRef.current.style.opacity = '1'
        leftColRef.current.style.transform = 'none'
      }
      if (headingRef.current) {
        Array.from(headingRef.current.children).forEach((c) => {
          ;(c as HTMLElement).style.opacity = '1'
          ;(c as HTMLElement).style.transform = 'none'
        })
      }
      if (featuresGridRef.current) {
        featuresGridRef.current.querySelectorAll('.why-feature-card').forEach((c) => {
          ;(c as HTMLElement).style.opacity = '1'
          ;(c as HTMLElement).style.transform = 'none'
        })
      }
      ScrollTrigger.refresh()
    }, 1000)

    return () => {
      clearTimeout(safetyTimer)
      ctx.revert()
    }
  }, [])

  return (
    <>
      {/* Marquee Divider Strip */}
      <div className="bg-[#1B2B3A] overflow-hidden py-4 sm:py-5 border-y border-white/10 w-full">
        <div className="whyus-marquee-track flex w-max">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="shrink-0 font-display text-lg sm:text-2xl font-black tracking-[0.25em] uppercase text-transparent [-webkit-text-stroke:1.5px_rgba(224,123,16,0.45)] whitespace-nowrap px-6 sm:px-10 flex items-center select-none"
            >
              {item}
              <span className="text-[#E07B10] [-webkit-text-stroke:0] ml-6 sm:ml-10 opacity-70 inline-flex items-center">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" />
                </svg>
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Why Us Section */}
      <section
        id="why-us"
        ref={sectionRef}
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#F6F5F1] text-[#5C6470] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Visual Image & Floating Badges (5 cols) */}
          <div ref={leftColRef} className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:max-w-none">
            <div className="relative bg-[#E2DFDC] aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?w=700&h=900&fit=crop&auto=format"
                alt="Welder working with sparks flying"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1B2B3A]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating badge: Bottom Left */}
            <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-4 flex items-center gap-3 shadow-md border border-[#E2DFDC] z-10">
              <div className="w-8 h-8 bg-[#1B2B3A] rounded-lg flex items-center justify-center shrink-0">
                <span className="font-display font-black text-sm sm:text-base text-white">M</span>
              </div>
              <div>
                <span className="font-display font-extrabold text-xs sm:text-sm text-[#1B2B3A] leading-tight block uppercase">
                  Precision in Every Detail
                </span>
                <span className="font-body text-[10px] text-[#E07B10] font-bold block">
                  Saudi Quality Standard
                </span>
              </div>
            </div>

            {/* Stat card: Top Right */}
            <div className="absolute top-3 right-3 sm:top-5 sm:right-5 bg-[#E07B10] text-white rounded-xl p-3.5 sm:p-5 shadow-lg max-w-[140px] sm:max-w-[160px] z-10">
              <div className="font-display font-black text-2xl sm:text-4xl leading-none">
                15+
              </div>
              <div className="font-body text-[10px] sm:text-xs text-white/90 mt-1 leading-snug">
                Years of industrial engineering in KSA
              </div>
            </div>
          </div>

          {/* Right Column: Heading & Features Grid (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div ref={headingRef}>
              <div className="font-body text-[11px] tracking-[0.3em] uppercase text-[#E07B10] mb-3 font-bold">
                Why Modern Assets
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#1B2B3A] uppercase tracking-tight leading-[0.93] mb-4">
                We Don't Just Build — <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07B10] to-[#1B2B3A]">
                  We Engineer
                </span>
              </h2>
              <p className="font-body text-sm sm:text-base text-[#5C6470] leading-relaxed mb-8 max-w-xl">
                You need more than a fabricator. You need a partner who understands operational demands, respects your timelines, and builds equipment that genuinely keeps your fleet running.
              </p>
            </div>

            {/* Responsive 1 col on mobile, 2 cols on tablet/desktop */}
            <div
              ref={featuresGridRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            >
              {FEATURES.map((f) => {
                const isHovered = hoveredFeature === f.title
                return (
                  <div
                    key={f.title}
                    className="why-feature-card bg-white rounded-2xl p-5 border border-[#E2DFDC] hover:border-[#E07B10] shadow-xs hover:shadow-md transition-all cursor-default flex flex-col justify-between"
                    onMouseEnter={() => setHoveredFeature(f.title)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                            isHovered
                              ? 'bg-[#E07B10] text-white'
                              : 'bg-[#E07B10]/10 text-[#E07B10]'
                          }`}
                        >
                          {f.icon === 'shield' && (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                          )}
                          {f.icon === 'settings' && (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                          )}
                          {f.icon === 'users' && (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                          )}
                          {f.icon === 'truck' && (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                          )}
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-display font-black text-xl leading-none transition-colors ${
                              isHovered ? 'text-[#E07B10]' : 'text-[#1B2B3A]'
                            }`}
                          >
                            {f.stat}
                          </div>
                          <div className="font-body text-[9px] tracking-wider uppercase text-[#8C949C] mt-0.5">
                            {f.statLabel}
                          </div>
                        </div>
                      </div>
                      <div className="font-display font-extrabold text-base uppercase text-[#1B2B3A] mb-1.5 leading-tight">
                        {f.title}
                      </div>
                      <div className="font-body text-xs text-[#5C6470] leading-relaxed">
                        {f.desc}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

        <style>{`
          .whyus-marquee-track {
            animation: whyusMarquee 28s linear infinite;
          }
          @keyframes whyusMarquee {
            from { transform: translateX(0); }
            to { transform: translateX(-33.333%); }
          }
        `}</style>
      </section>
    </>
  )
}
