import { useState, useEffect } from 'react'
import GlassButton from '../GlassButton'
import { GenerateButton } from './GenerateButton'

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
      background: '#FFFFFF',
      borderBottom: '1px solid #D9DDDE',
      boxShadow: scrolled ? '0 4px 20px rgba(32, 38, 43, 0.06)' : 'none',
      transition: 'box-shadow 250ms ease',
    }}>
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #E58A16 0%, #C8750D 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(229,138,22,0.3)',
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
          color: '#20262B',
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
              color: '#596268',
              textDecoration: 'none',
              transition: 'color 180ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#E58A16')}
            onMouseLeave={e => (e.currentTarget.style.color = '#596268')}
          >
            {link}
          </a>
        ))}
        <GenerateButton
          hue={38}
          text="Request A Quote"
          activeText="Connecting..."
          onClick={() => {
            const c = document.getElementById('contact')
            if (c) c.scrollIntoView({ behavior: 'smooth' })
          }}
        />
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
          color: '#20262B',
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
          background: '#FFFFFF',
          borderBottom: '1px solid #D9DDDE',
          boxShadow: '0 12px 32px rgba(32, 38, 43, 0.08)',
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
                color: '#20262B',
                textDecoration: 'none',
              }}
            >
              {link}
            </a>
          ))}
          <GenerateButton
            hue={38}
            text="Request A Quote"
            activeText="Connecting..."
            onClick={() => {
              setOpen(false)
              const c = document.getElementById('contact')
              if (c) c.scrollIntoView({ behavior: 'smooth' })
            }}
          />
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
