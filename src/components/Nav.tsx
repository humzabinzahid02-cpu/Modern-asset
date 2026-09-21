import { useState, useEffect } from 'react'
import GlassButton from '../GlassButton'
import { GenerateButton } from './GenerateButton'
import CreepyButton from './CreepyButton'

const LINKS = ['Products', 'Capabilities', 'Projects', 'About', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '0 clamp(24px, 5vw, 80px)',
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(255, 255, 255, 0.65)' : 'rgba(255, 255, 255, 0.35)',
      backdropFilter: 'blur(24px) saturate(190%)',
      WebkitBackdropFilter: 'blur(24px) saturate(190%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.45)',
      boxShadow: scrolled
        ? '0 12px 36px -4px rgba(27, 43, 58, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 0 0 rgba(255, 255, 255, 0.2)'
        : '0 4px 24px -2px rgba(27, 43, 58, 0.04), inset 0 1px 1px 0 rgba(255, 255, 255, 0.85)',
      transition: 'background 350ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 350ms ease, border-color 350ms ease',
    }}>
      {/* Specular Liquid Glass Top Gleam */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.95) 80%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Specular Liquid Glass Bottom Refraction Line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, rgba(226,223,220,0.2) 0%, rgba(255,255,255,0.8) 25%, rgba(224,123,16,0.3) 50%, rgba(255,255,255,0.8) 75%, rgba(226,223,220,0.2) 100%)',
        pointerEvents: 'none',
      }} />
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #E07B10 0%, #C46C0C 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(224,123,16,0.3)',
        }}>
          <span style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            fontSize: 20,
            color: '#FFFFFF',
          }}>M</span>
        </div>
        <span style={{
          fontFamily: 'Barlow Condensed, sans-serif',
          fontWeight: 800,
          fontSize: 20,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: '#1B2B3A',
        }}>Modern Assets</span>
      </a>

      {/* Desktop links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 36,
      }} className="nav-links">
        {LINKS.map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#5C6470',
              textDecoration: 'none',
              transition: 'color 180ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#E07B10')}
            onMouseLeave={e => (e.currentTarget.style.color = '#5C6470')}
          >
            {link}
          </a>
        ))}
        <CreepyButton
          onClick={() => {
            const c = document.getElementById('contact')
            if (c) c.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          START A PROJECT
        </CreepyButton>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          color: '#1B2B3A',
        }}
        className="hamburger"
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open
            ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
          }
        </svg>
      </button>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 72,
          left: 0,
          right: 0,
          background: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(24px) saturate(190%)',
          WebkitBackdropFilter: 'blur(24px) saturate(190%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 20px 40px rgba(27, 43, 58, 0.1), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
          padding: '24px clamp(24px,5vw,80px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          animation: 'fadeUp 200ms ease',
        }}>
          {LINKS.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#1B2B3A',
                textDecoration: 'none',
              }}
            >
              {link}
            </a>
          ))}
          <CreepyButton
            onClick={() => {
              setOpen(false)
              const c = document.getElementById('contact')
              if (c) c.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            START A PROJECT
          </CreepyButton>
        </div>
      )}

      <style>{`
        @media (max-width: 800px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
