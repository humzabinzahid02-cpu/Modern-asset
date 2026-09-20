import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { icon: '◈', title: 'Superior Quality', desc: 'Built to last, in every condition. ISO-certified fabrication with premium-grade steel.' },
  { icon: '⬡', title: 'Custom Engineering', desc: 'Tailored to your exact needs. No off-the-shelf compromises.' },
  { icon: '◉', title: 'Reliable Support', desc: 'From start to finish and beyond — dedicated after-sales service.' },
  { icon: '▲', title: 'On-Time Delivery', desc: 'Because your time matters. Guaranteed delivery schedules.' },
]

export default function WhyUs() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const leftColRef = useRef<HTMLDivElement | null>(null)
  const featuresGridRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Left side visual entrance
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -50, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Feature cards staggered entrance
      if (featuresGridRef.current) {
        const cards = featuresGridRef.current.querySelectorAll('.why-feature-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power2.out',
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
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,100px)',
        background: '#f8f5ed',
        color: '#0c0c14',
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
          <div style={{ backgroundColor: '#d6cfc0', aspectRatio: '4/5', overflow: 'hidden', borderRadius: 16 }}>
            <img
              src="https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?w=700&h=900&fit=crop&auto=format"
              alt="Welder working with sparks flying"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(45deg, rgba(245,197,24,0.15) 0%, transparent 60%)',
            }} />
          </div>
          {/* Translucent reference badge matching mockup */}
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.8)',
            zIndex: 2,
          }}>
            <div style={{
              width: 30,
              height: 30,
              background: '#0c0c14',
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
              color: '#0c0c14',
              lineHeight: 1.3,
            }}>
              Precision<br />in Every Detail
            </span>
            <span style={{
              marginLeft: 8,
              color: '#0c0c14',
              fontWeight: 700,
              fontSize: 16,
            }}>→</span>
          </div>

          {/* Tag card */}
          <div style={{
            position: 'absolute',
            bottom: -24,
            right: -24,
            background: '#F5C518',
            padding: '24px 28px',
            maxWidth: 200,
            boxShadow: '0 12px 30px rgba(245,197,24,0.3)',
          }}>
            <div style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 32,
              color: '#0c0c14',
              lineHeight: 1,
            }}>15+</div>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 12,
              color: 'rgba(12,12,20,0.65)',
              marginTop: 4,
            }}>Years of precision fabrication in the region</div>
          </div>
        </div>

        {/* Right: content */}
        <div>
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#E6A800',
            marginBottom: 16,
          }}>Why Modern Assets</div>
          <h2 style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: 'clamp(40px,5vw,68px)',
            fontWeight: 800,
            lineHeight: 0.95,
            textTransform: 'uppercase',
            margin: '0 0 24px',
            color: '#0c0c14',
          }}>
            More Than<br />
            <span style={{
              background: 'linear-gradient(90deg,#E6A800,#0c0c14)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Just Manufacturing</span>
          </h2>
          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 15,
            color: 'rgba(12,12,20,0.6)',
            lineHeight: 1.7,
            margin: '0 0 40px',
            maxWidth: 420,
          }}>
            We combine engineering expertise, advanced technology and a customer-first approach to deliver solutions that keep your business moving.
          </p>

          <div
            ref={featuresGridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px 24px',
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
                    background: isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: 16,
                    padding: '22px 20px',
                    border: isHovered ? '1px solid rgba(230,168,0,0.5)' : '1px solid rgba(12,12,20,0.07)',
                    boxShadow: isHovered ? '0 16px 36px rgba(230,168,0,0.12), 0 4px 12px rgba(0,0,0,0.04)' : '0 4px 20px rgba(0,0,0,0.03)',
                    transform: isHovered ? 'translateY(-4px)' : 'none',
                    transition: 'all 280ms cubic-bezier(0.16, 1, 0.3, 1)',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: isHovered ? 'linear-gradient(135deg, #F5C518, #E6A800)' : 'rgba(230,168,0,0.12)',
                    border: '1px solid rgba(230,168,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 14,
                    fontSize: 18,
                    color: isHovered ? '#0c0c14' : '#E6A800',
                    transition: 'all 280ms ease',
                  }}>
                    {f.icon}
                  </div>
                  <div style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '18px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: '#0c0c14',
                    marginBottom: 8,
                  }}>
                    {f.title}
                  </div>
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '13px',
                    color: 'rgba(12,12,20,0.65)',
                    lineHeight: 1.6,
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
      `}</style>
    </section>
  )
}
