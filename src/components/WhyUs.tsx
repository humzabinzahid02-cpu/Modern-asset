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
          { opacity: 0, x: -50, scale: 0.96 },
          {
            opacity: 1, x: 0, scale: 1,
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.7, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (featuresGridRef.current) {
        const cards = featuresGridRef.current.querySelectorAll('.why-feature-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.75, stagger: 0.12, ease: 'power2.out',
            scrollTrigger: {
              trigger: featuresGridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── Marquee Divider Strip (like digitaltarka.com transition) ── */}
      <div style={{
        background: '#1B2B3A',
        overflow: 'hidden',
        padding: '20px 0',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div className="whyus-marquee-track" style={{ display: 'flex', width: 'max-content' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{
              flexShrink: 0,
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              fontWeight: 800,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(224,123,16,0.45)',
              whiteSpace: 'nowrap',
              padding: '0 clamp(24px,3vw,48px)',
              userSelect: 'none',
            }}>
              {item}
              <span style={{
                color: '#E07B10',
                WebkitTextStroke: '0',
                marginLeft: 'clamp(20px,2.5vw,40px)',
                opacity: 0.7,
                fontSize: '0.6em',
              }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main Why Us Section ── */}
      <section
        id="about"
        ref={sectionRef}
        style={{
          padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,100px)',
          background: '#F6F5F1',
          color: '#5C6470',
        }}
      >
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px,6vw,100px)',
          alignItems: 'center',
        }}>
          {/* Left: image */}
          <div ref={leftColRef} style={{ position: 'relative' }}>
            <div style={{
              backgroundColor: '#E2DFDC',
              aspectRatio: '4/5',
              overflow: 'hidden',
              borderRadius: 16,
            }}>
              <img
                src="https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?w=700&h=900&fit=crop&auto=format"
                alt="Welder working with sparks flying"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(45deg, rgba(224,123,16,0.12) 0%, transparent 60%)',
              }} />
            </div>

            {/* Floating badge — bottom left */}
            <div style={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              background: '#FFFFFF',
              borderRadius: '12px',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 8px 24px rgba(27,43,58,0.08)',
              border: '1px solid #E2DFDC',
              zIndex: 2,
            }}>
              <div style={{
                width: 30, height: 30,
                background: '#1B2B3A',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 900,
                  fontSize: 17,
                  color: '#ffffff',
                }}>M</span>
              </div>
              <span style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 600,
                fontSize: 13,
                color: '#1B2B3A',
                lineHeight: 1.3,
              }}>
                Precision<br />in Every Detail
              </span>
              <span style={{ marginLeft: 8, color: '#E07B10', fontWeight: 700, fontSize: 16 }}>→</span>
            </div>

            {/* Stat card — bottom right */}
            <div style={{
              position: 'absolute',
              bottom: -24,
              right: -24,
              background: '#E07B10',
              borderRadius: 12,
              padding: '24px 28px',
              maxWidth: 200,
              boxShadow: '0 12px 30px rgba(224,123,16,0.25)',
            }}>
              <div style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 900,
                fontSize: 40,
                color: '#FFFFFF',
                lineHeight: 1,
              }}>15+</div>
              <div style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 12,
                color: 'rgba(255,255,255,0.9)',
                marginTop: 4,
              }}>Years of precision fabrication across the region</div>
            </div>
          </div>

          {/* Right: content */}
          <div>
            <div ref={headingRef}>
              <div style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#E07B10',
                marginBottom: 16,
                fontWeight: 700,
              }}>Why Modern Assets</div>
              <h2 style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: 'clamp(40px,5vw,68px)',
                fontWeight: 900,
                lineHeight: 0.93,
                textTransform: 'uppercase',
                margin: '0 0 20px',
                color: '#1B2B3A',
              }}>
                We Don't Just<br />
                <span style={{
                  background: 'linear-gradient(90deg, #E07B10, #1B2B3A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Build — We Engineer</span>
              </h2>
              <p style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 15,
                color: '#5C6470',
                lineHeight: 1.72,
                margin: '0 0 36px',
                maxWidth: 430,
              }}>
                You need more than a fabricator. You need a partner who understands operational demands, respects your timelines, and builds equipment that genuinely keeps your fleet running.
              </p>
            </div>

            <div
              ref={featuresGridRef}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '18px 20px',
              }}
            >
              {FEATURES.map(f => {
                const isHovered = hoveredFeature === f.title
                return (
                  <div
                    key={f.title}
                    className="why-feature-card"
                    onMouseEnter={() => setHoveredFeature(f.title)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 16,
                      padding: '20px 20px',
                      border: isHovered ? '1px solid #E07B10' : '1px solid #E2DFDC',
                      boxShadow: isHovered
                        ? '0 12px 32px rgba(224,123,16,0.1), 0 4px 12px rgba(27,43,58,0.04)'
                        : '0 2px 12px rgba(27,43,58,0.05)',
                      transform: isHovered ? 'translateY(-4px)' : 'none',
                      transition: 'all 280ms cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'default',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <div style={{
                        width: 38,
                        height: 38,
                        borderRadius: 9,
                        background: isHovered ? '#E07B10' : 'rgba(224,123,16,0.08)',
                        border: '1px solid rgba(224,123,16,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 17,
                        color: isHovered ? '#FFFFFF' : '#E07B10',
                        transition: 'all 280ms ease',
                        flexShrink: 0,
                      }}>
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
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontFamily: 'Barlow Condensed, sans-serif',
                          fontSize: '22px',
                          fontWeight: 900,
                          color: isHovered ? '#E07B10' : '#1B2B3A',
                          lineHeight: 1,
                          transition: 'color 280ms',
                        }}>{f.stat}</div>
                        <div style={{
                          fontFamily: 'Outfit, sans-serif',
                          fontSize: '10px',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#8C949C',
                        }}>{f.statLabel}</div>
                      </div>
                    </div>
                    <div style={{
                      fontFamily: 'Barlow Condensed, sans-serif',
                      fontSize: '17px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: '#1B2B3A',
                      marginBottom: 7,
                    }}>
                      {f.title}
                    </div>
                    <div style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '12.5px',
                      color: '#5C6470',
                      lineHeight: 1.62,
                    }}>
                      {f.desc}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 800px) {
            #about > div { grid-template-columns: 1fr !important; }
            #about > div > div:first-child { display: none; }
          }
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
