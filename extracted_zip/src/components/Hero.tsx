import { useEffect, useState } from 'react'

const HEADLINES = [
  { line1: 'ENGINEERED', line2: 'FOR A STRONGER', accent: 'TOMORROW' },
  { line1: 'BUILT WITH', line2: 'PRECISION &', accent: 'PURPOSE' },
  { line1: 'FORGED FOR', line2: 'EVERY', accent: 'INDUSTRY' },
]

export default function Hero() {
  const [hIdx, setHIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setHIdx(i => (i + 1) % HEADLINES.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const h = HEADLINES[hIdx]

  return (
    <section id="home" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#111' }}>
        <img
          src="https://images.unsplash.com/photo-1778103617525-76877c583fa5?w=1800&h=1000&fit=crop&auto=format"
          alt="Black semi-truck on a rural highway"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
        />
        {/* Dark gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(12,12,20,0.95) 0%, rgba(12,12,20,0.5) 60%, rgba(12,12,20,0.1) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(0deg, rgba(12,12,20,1) 0%, transparent 40%)',
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 'clamp(100px,12vw,160px) clamp(24px,6vw,100px) 80px',
        maxWidth: 900,
      }}>
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#F5C518',
          marginBottom: 28,
          opacity: 0.9,
        }}>
          Heavy-Duty Vehicle Solutions
        </div>

        <div style={{
          transition: 'opacity 400ms ease, transform 400ms ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
        }}>
          <div style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            lineHeight: 0.92,
            textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            <div style={{ fontSize: 'clamp(56px, 9vw, 108px)', color: '#ffffff', display: 'block' }}>
              {h.line1}
            </div>
            <div style={{ fontSize: 'clamp(56px, 9vw, 108px)', color: '#ffffff', display: 'block' }}>
              {h.line2}
            </div>
            <div style={{
              fontSize: 'clamp(56px, 9vw, 108px)',
              display: 'block',
              background: 'linear-gradient(90deg, #F5C518 0%, #ffffff 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {h.accent}
            </div>
          </div>
        </div>

        <p style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(14px, 1.8vw, 17px)',
          fontWeight: 300,
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.6)',
          maxWidth: 420,
          marginBottom: 40,
        }}>
          Custom truck bodies, tankers, trailers and specialized equipment — built with precision, designed for performance, made for your business.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <button className="btn-primary">Explore Our Products →</button>
          <button className="btn-ghost">Watch Our Story ▷</button>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          right: 'clamp(24px,4vw,60px)',
          bottom: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '10px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            writingMode: 'vertical-rl',
          }}>Scroll</span>
          <div style={{
            width: 1,
            height: 48,
            background: 'linear-gradient(180deg, rgba(245,197,24,0.6), transparent)',
          }} />
        </div>
      </div>

      {/* Headline dots */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        left: 'clamp(24px,6vw,100px)',
        display: 'flex',
        gap: 6,
        zIndex: 2,
      }}>
        {HEADLINES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setHIdx(i); setVisible(true) }}
            style={{
              width: i === hIdx ? 24 : 6,
              height: 6,
              borderRadius: 3,
              background: i === hIdx ? '#F5C518' : 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'width 300ms ease, background 300ms ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  )
}
