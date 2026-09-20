import { useState, useEffect } from 'react'

const LINKS = ['Products', 'Capabilities', 'Projects', 'About', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
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
      background: scrolled ? 'rgba(12,12,20,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(245,197,24,0.08)' : '1px solid transparent',
      transition: 'background 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease',
    }}>
      {/* Logo */}
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div style={{
          width: 34,
          height: 34,
          background: 'linear-gradient(135deg,#F5C518,#E6A800)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 900,
            fontSize: 18,
            color: '#0c0c14',
          }}>M</span>
        </div>
        <span style={{
          fontFamily: 'Barlow Condensed, sans-serif',
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: '#ffffff',
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
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
              transition: 'color 180ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5C518')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          >
            {link}
          </a>
        ))}
        <button className="btn-primary" style={{ padding: '10px 22px', fontSize: '13px' }}>
          Request a Quote →
        </button>
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
          color: '#fff',
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
          background: 'rgba(12,12,20,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(245,197,24,0.12)',
          padding: '20px clamp(24px,5vw,80px)',
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
                fontSize: '20px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
              }}
            >
              {link}
            </a>
          ))}
          <button className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
            Request a Quote →
          </button>
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
