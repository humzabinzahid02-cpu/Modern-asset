import { useEffect, useState } from 'react'
import GlassButton from '../GlassButton'

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
    <section id="home" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#F6F5F1' }}>
      {/* Background image with light industrial overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#F6F5F1' }}>
        <img
          src="https://images.unsplash.com/photo-1778103617525-76877c583fa5?w=1800&h=1000&fit=crop&auto=format"
          alt="Black semi-truck on a rural highway"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22 }}
        />
        {/* Light gradient overlays */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, #F6F5F1 0%, rgba(244,243,239,0.92) 55%, rgba(244,243,239,0.45) 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(0deg, #F6F5F1 0%, transparent 40%)',
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
        maxWidth: 920,
      }}>
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#E07B10',
          marginBottom: 24,
          fontWeight: 600,
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
            <div style={{ fontSize: 'clamp(56px, 9vw, 108px)', color: '#1B2B3A', display: 'block' }}>
              {h.line1}
            </div>
            <div style={{ fontSize: 'clamp(56px, 9vw, 108px)', color: '#1B2B3A', display: 'block' }}>
              {h.line2}
            </div>
            <div style={{
              fontSize: 'clamp(56px, 9vw, 108px)',
              display: 'block',
              color: '#E07B10',
            }}>
              {h.accent}
            </div>
          </div>
        </div>

        <p style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(15px, 1.8vw, 18px)',
          fontWeight: 400,
          lineHeight: 1.7,
          color: '#5C6470',
          maxWidth: 500,
          marginBottom: 40,
        }}>
          Custom truck bodies, tankers, trailers and specialized equipment — built with precision, designed for performance, made for your business.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
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
            fontSize: '11px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#5C6470',
            writingMode: 'vertical-rl',
            fontWeight: 700,
          }}>Scroll</span>
          <div style={{
            width: 2,
            height: 48,
            background: 'linear-gradient(180deg, #E07B10, transparent)',
          }} />
        </div>
      </div>

      {/* Headline dots */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        left: 'clamp(24px,6vw,100px)',
        display: 'flex',
        gap: 8,
        zIndex: 2,
      }}>
        {HEADLINES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setHIdx(i); setVisible(true) }}
            style={{
              width: i === hIdx ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: i === hIdx ? '#E07B10' : '#E2DFDC',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 300ms ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  )
}
