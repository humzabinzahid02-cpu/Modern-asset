import { useEffect, useState, useRef } from 'react'
import GlassButton from '../GlassButton'

const FLIP_WORDS = ['PURPOSE', 'POWER', 'PROGRESS', 'PERFORMANCE', 'PROWESS']

const FLEET_PROFILES = [
  {
    id: 'tanker',
    name: '55,000L Fuel Tanker',
    category: 'Liquid Transport',
    yieldStrength: '700 MPa Hardox®',
    tolerance: '±0.5mm Robotic',
    capacity: '55,000 Liters',
    cert: 'ADR & SASO Ready',
    dialogue:
      'Engineered with internal baffle anti-surge compartments and laser-welded robotic seam welds for zero vapor leak tolerance.',
    leadTime: '3-4 Weeks',
  },
  {
    id: 'lowbed',
    name: '150T Low-Bed Trailer',
    category: 'Abnormal Heavy Haul',
    yieldStrength: 'Strenx 700MC',
    tolerance: '±0.3mm Laser',
    capacity: '150 Metric Tons',
    cert: 'DOT & FMVSS Heavy',
    dialogue:
      'Hydraulic gooseneck with wireless steering override. Built to haul abnormal industrial mining transformers and excavators.',
    leadTime: '4-6 Weeks',
  },
  {
    id: 'flatbed',
    name: '60T Reinforced Flatbed',
    category: 'General Freight',
    yieldStrength: 'Pre-Stressed I-Beam',
    tolerance: '±0.5mm Camber',
    capacity: '60 Metric Tons',
    cert: 'ISO 9001 Certified',
    dialogue:
      'Monocoque chassis pre-cambered to counteract high cargo deflection with 12 retractable ISO twist locks.',
    leadTime: '2-3 Weeks',
  },
]

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [activeProfile, setActiveProfile] = useState(0)
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
  const profile = FLEET_PROFILES[activeProfile]

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#F6F5F1',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background image with light industrial overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#F6F5F1', pointerEvents: 'none' }}>
        <img
          src="https://images.unsplash.com/photo-1778103617525-76877c583fa5?w=1800&h=1000&fit=crop&auto=format"
          alt="Heavy duty vehicle engineering"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
        />
        {/* Light gradient overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, #F6F5F1 0%, rgba(246,245,241,0.92) 50%, rgba(246,245,241,0.65) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, #F6F5F1 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Main Container - 2-Column Responsive Layout */}
      <div
        className="hero-grid-container"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
          gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'center',
          minHeight: '100vh',
          padding: 'clamp(110px, 13vw, 150px) clamp(24px, 5vw, 80px) 70px',
          maxWidth: 1400,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* ── Left Column: Headline & Primary CTAs ── */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Eyebrow badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-body, "Outfit", sans-serif)',
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#E07B10',
              marginBottom: 20,
              fontWeight: 700,
              background: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid #E2DFDC',
              boxShadow: '0 2px 8px rgba(27,43,58,0.04)',
              width: 'fit-content',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#E07B10',
                display: 'inline-block',
                boxShadow: '0 0 8px #E07B10',
              }}
            />
            Heavy-Duty Vehicle Solutions
          </div>

          {/* Headline with FIXED black text and ONLY YELLOW TEXT FLIPPING */}
          <div
            style={{
              fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
              fontWeight: 900,
              lineHeight: 0.92,
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            {/* Fixed First Line */}
            <div
              style={{
                fontSize: 'clamp(52px, 7.5vw, 98px)',
                color: '#1B2B3A',
                letterSpacing: '-0.01em',
              }}
            >
              BUILT WITH
            </div>

            {/* Fixed Second Line */}
            <div
              style={{
                fontSize: 'clamp(52px, 7.5vw, 98px)',
                color: '#1B2B3A',
                letterSpacing: '-0.01em',
              }}
            >
              PRECISION &amp;
            </div>

            {/* Third Line: ONLY FLIP THE YELLOW / ORANGE TEXT */}
            <div
              style={{
                fontSize: 'clamp(52px, 7.5vw, 98px)',
                color: '#E07B10',
                height: '1.05em',
                overflow: 'hidden',
                display: 'inline-flex',
                alignItems: 'center',
                perspective: '1000px',
                position: 'relative',
              }}
            >
              <div
                key={wordIdx}
                className="flip-text-word"
                style={{
                  display: 'inline-flex',
                  transformStyle: 'preserve-3d',
                }}
              >
                {currentWord.split('').map((char, charIdx) => (
                  <span
                    key={`${currentWord}-${charIdx}`}
                    style={{
                      display: 'inline-block',
                      transformOrigin: '50% 50% -18px',
                      animation: isFlipping
                        ? `letterFlipOut 400ms ease ${charIdx * 25}ms forwards`
                        : `letterFlipIn 500ms cubic-bezier(0.16, 1, 0.3, 1) ${charIdx * 35}ms forwards`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body, "Outfit", sans-serif)',
              fontSize: 'clamp(15px, 1.4vw, 17px)',
              fontWeight: 400,
              lineHeight: 1.65,
              color: '#5C6470',
              maxWidth: 520,
              marginBottom: 36,
            }}
          >
            Custom truck bodies, tankers, trailers and specialized heavy haul platforms — built with precision,
            designed for extreme duty cycles, engineered for your fleet.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
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
                const s = document.getElementById('capabilities')
                if (s) s.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Watch Our Story ▷
            </GlassButton>
          </div>

          {/* Quick trust metrics */}
          <div
            style={{
              display: 'flex',
              gap: 28,
              marginTop: 40,
              paddingTop: 24,
              borderTop: '1px solid #E2DFDC',
              maxWidth: 500,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                  fontSize: '26px',
                  fontWeight: 900,
                  color: '#1B2B3A',
                  lineHeight: 1,
                }}
              >
                150T+
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                  fontSize: '11px',
                  color: '#5C6470',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginTop: 4,
                }}
              >
                Max Abnormal Load
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                  fontSize: '26px',
                  fontWeight: 900,
                  color: '#1B2B3A',
                  lineHeight: 1,
                }}
              >
                ±0.5mm
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                  fontSize: '11px',
                  color: '#5C6470',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginTop: 4,
                }}
              >
                Robotic Weld Precision
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                  fontSize: '26px',
                  fontWeight: 900,
                  color: '#E07B10',
                  lineHeight: 1,
                }}
              >
                100%
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                  fontSize: '11px',
                  color: '#5C6470',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginTop: 4,
                }}
              >
                FEA Stress Validated
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column: Engineering Dispatch Console & Dialogue Card ── */}
        <div
          className="hero-right-card"
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #E2DFDC',
            boxShadow: '0 25px 60px rgba(27, 43, 58, 0.08), 0 2px 10px rgba(0, 0, 0, 0.03)',
            padding: 'clamp(24px, 3.5vw, 36px)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Card Header: Live Dispatch Telemetry */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #ECEAE4',
              paddingBottom: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 10px #10B981',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#1B2B3A',
                }}
              >
                Fleet Engineering Telemetry
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: '#E07B10',
                background: 'rgba(224, 123, 16, 0.09)',
                padding: '4px 10px',
                borderRadius: '6px',
              }}
            >
              SPEC #MA-2026
            </span>
          </div>

          {/* Interactive Profile Selector Tabs */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                fontSize: '11px',
                fontWeight: 600,
                color: '#737E88',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              Select Active Build Architecture:
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 6,
                background: '#F6F5F1',
                padding: 4,
                borderRadius: '12px',
                border: '1px solid #E2DFDC',
              }}
            >
              {FLEET_PROFILES.map((p, idx) => {
                const isActive = activeProfile === idx
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveProfile(idx)}
                    style={{
                      padding: '8px 6px',
                      borderRadius: '8px',
                      border: 'none',
                      outline: 'none',
                      cursor: 'pointer',
                      background: isActive ? '#FFFFFF' : 'transparent',
                      color: isActive ? '#1B2B3A' : '#5C6470',
                      boxShadow: isActive ? '0 2px 8px rgba(27,43,58,0.08)' : 'none',
                      fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      transition: 'all 200ms ease',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {p.name.split(' ')[0]} {p.name.split(' ')[1]}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Dialogue & Quotation Box */}
          <div
            style={{
              background: '#F6F5F1',
              borderRadius: '16px',
              padding: '18px 20px',
              border: '1px solid #E2DFDC',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                fontSize: '11px',
                color: '#E07B10',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: 6,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>❝</span> CHIEF METALLURGY &amp; WELD ENGINEER DIALOGUE
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#1B2B3A',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              "{profile.dialogue}"
            </p>
            <div
              style={{
                marginTop: 10,
                fontSize: '11px',
                fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                color: '#737E88',
                fontWeight: 600,
              }}
            >
              — Modern Assets Heavy Fabrication Workshop • {profile.leadTime} Lead Time
            </div>
          </div>

          {/* Live Specs Matrix */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
            }}
          >
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                background: '#FFFFFF',
                border: '1px solid #ECEAE4',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                  color: '#737E88',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                Yield Material
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                  fontSize: '17px',
                  fontWeight: 800,
                  color: '#1B2B3A',
                  marginTop: 2,
                }}
              >
                {profile.yieldStrength}
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                background: '#FFFFFF',
                border: '1px solid #ECEAE4',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                  color: '#737E88',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                Operating Capacity
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                  fontSize: '17px',
                  fontWeight: 800,
                  color: '#E07B10',
                  marginTop: 2,
                }}
              >
                {profile.capacity}
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                background: '#FFFFFF',
                border: '1px solid #ECEAE4',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                  color: '#737E88',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                Chassis Tolerance
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                  fontSize: '17px',
                  fontWeight: 800,
                  color: '#1B2B3A',
                  marginTop: 2,
                }}
              >
                {profile.tolerance}
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                background: '#FFFFFF',
                border: '1px solid #ECEAE4',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                  color: '#737E88',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                Compliance Rating
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                  fontSize: '17px',
                  fontWeight: 800,
                  color: '#1B2B3A',
                  marginTop: 2,
                }}
              >
                {profile.cert}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 8,
              borderTop: '1px solid #ECEAE4',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#E07B10', fontSize: '13px' }}>✓</span>
              <span
                style={{
                  fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#5C6470',
                }}
              >
                Turnkey Field Delivery
              </span>
            </div>

            <button
              onClick={() => {
                const c = document.getElementById('contact')
                if (c) c.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                padding: '8px 18px',
                background: '#1B2B3A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 200ms ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E07B10'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#1B2B3A'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span>Configure Blueprint</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vertical Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(20px, 3vw, 40px)',
          bottom: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
            fontSize: '11px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#737E88',
            writingMode: 'vertical-rl',
            fontWeight: 700,
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 2,
            height: 48,
            background: 'linear-gradient(180deg, #E07B10, transparent)',
          }}
        />
      </div>

      {/* CSS Keyframes for 3D Flip Fade Text & Responsive Layout */}
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

        @media (max-width: 1024px) {
          .hero-grid-container {
            grid-template-columns: 1fr !important;
            padding-top: 130px !important;
            gap: 40px !important;
          }
          .hero-right-card {
            max-width: 600px;
            margin: 0 auto;
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
