import { useState, useEffect } from 'react'

import { useRef } from 'react'

const LINKS = [
  { name: 'Home', target: 'home' },
  { name: 'Products', target: 'products' },
  { name: 'Our Process', target: 'process' },
  { name: 'Why Us', target: 'why-us' },
  { name: 'Contact', target: 'contact' },
]

interface NavProps {
  currentPage?: 'home' | 'quote'
  onNavigate?: (page: 'home' | 'quote', sectionId?: string) => void
}

export default function Nav({ currentPage = 'home', onNavigate }: NavProps) {
  const [visible, setVisible] = useState(true)
  const [open, setOpen] = useState(false)
  const [darkBackground, setDarkBackground] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const detectBackground = () => {
      if (window.scrollY < 80) {
        setDarkBackground(false)
        return
      }
      const nav = navRef.current
      if (!nav) return
      const oldPointerEvents = nav.style.pointerEvents
      nav.style.pointerEvents = 'none'
      const element = document.elementFromPoint(window.innerWidth / 2, Math.min(60, window.innerHeight - 1))
      nav.style.pointerEvents = oldPointerEvents

      let current: Element | null = element?.closest('section') ?? element
      let isDark = false
      while (current && current !== document.documentElement) {
        const channels = getComputedStyle(current).backgroundColor.match(/[\d.]+/g)?.map(Number)
        if (channels && channels.length >= 3 && (channels[3] ?? 1) > 0.1) {
          const [red, green, blue] = channels
          isDark = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255 < 0.22
          break
        }
        current = current.parentElement
      }
      setDarkBackground(isDark)
    }

    detectBackground()
    window.addEventListener('scroll', detectBackground, { passive: true })
    window.addEventListener('resize', detectBackground)
    return () => {
      window.removeEventListener('scroll', detectBackground)
      window.removeEventListener('resize', detectBackground)
    }
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY
    const onScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 80 || currentScrollY < lastScrollY - 4) setVisible(true)
      else if (currentScrollY > lastScrollY + 4 && !open) setVisible(false)
      lastScrollY = currentScrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  const handleLinkClick = (target: string, e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)

    if (target === 'contact') {
      if (onNavigate) {
        onNavigate('quote')
      } else {
        const c = document.getElementById('contact')
        if (c) c.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }

    if (currentPage === 'quote') {
      if (onNavigate) {
        onNavigate('home', target)
      }
    } else {
      const el = document.getElementById(target)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleGetInTouch = () => {
    setOpen(false)
    if (onNavigate) {
      onNavigate('quote')
    } else {
      const c = document.getElementById('contact')
      if (c) c.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (currentPage === 'quote' && onNavigate) {
      onNavigate('home', 'home')
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 clamp(14px, 3.7vw, 72px)',
        paddingLeft: 'clamp(12px, 1.5vw, 20px)',
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        transform: `translate3d(0, ${visible ? '0' : '-100%'}, 0)`,
        willChange: 'transform',
        borderBottom: 'none',
        boxShadow: 'none',
        transition: 'transform 300ms ease',
      }}
    >
      {/* Specular Liquid Gleam line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 25%, rgba(224,123,16,0.35) 50%, rgba(255,255,255,0.9) 75%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* 1. Left: Logo (Positioned slightly left, bigger icon & text) */}
      <div className="flex-1 flex items-center justify-start">
        <button
          onClick={handleLogoClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
          className="group select-none"
        >
          <img
            src={`${import.meta.env.BASE_URL}modern-assets-logo.png`}
            alt="Modern Assets — Heavy Vehicle Solutions"
            style={{ width: 'clamp(240px, 27vw, 288px)', height: 92, objectFit: 'contain', transition: 'transform 200ms ease' }}
            className="group-hover:scale-105"
          />
        </button>
      </div>

      {/* 2. Center: Navigation Links (Centered, bigger font, animated underline on hover) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(26px, 2.6vw, 48px)',
        }}
        className="nav-links"
      >
        {LINKS.map((link) => (
          <a
            key={link.name}
            href={`#${link.target}`}
            onClick={(e) => handleLinkClick(link.target, e)}
            className="group relative select-none"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '16.5px',
              fontWeight: 700,
              letterSpacing: '0.01em',
              color: link.target === 'contact' && currentPage === 'quote' ? '#E07B10' : darkBackground ? '#E07B10' : '#1B2B3A',
              textDecoration: 'none',
              padding: '6px 0',
              transition: 'color 180ms ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#E07B10'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color =
                link.target === 'contact' && currentPage === 'quote'
                  ? '#E07B10'
                  : darkBackground ? '#E07B10' : '#1B2B3A'
            }}
          >
            <span>{link.name}</span>
            {/* Animated Underline on Hover */}
            <span
              className={`absolute -bottom-0.5 left-0 w-full h-[2.5px] bg-[#E07B10] rounded-full transition-transform duration-250 ease-out origin-center ${
                link.target === 'contact' && currentPage === 'quote'
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}
            />
          </a>
        ))}
      </div>

      {/* 3. Right: Big 'Get in touch' Button (Positioned slightly right, bigger size) */}
      <div className="flex-1 flex items-center justify-end">
        <button
          onClick={handleGetInTouch}
          style={{
            background: darkBackground ? '#E07B10' : '#1B2B3A',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9999px',
            padding: '13px 34px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800,
            fontSize: '15.5px',
            letterSpacing: '0.02em',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(27, 43, 58, 0.22)',
            transition: 'all 250ms ease',
            whiteSpace: 'nowrap',
          }}
          className="hidden md:inline-flex"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#E07B10'
            e.currentTarget.style.color = '#FFFFFF'
            e.currentTarget.style.transform = 'scale(1.03)'
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(224, 123, 16, 0.35)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = darkBackground ? '#E07B10' : '#1B2B3A'
            e.currentTarget.style.color = '#FFFFFF'
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 18px rgba(27, 43, 58, 0.22)'
          }}
        >
          Get in touch
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: darkBackground ? '#E07B10' : '#1B2B3A',
          }}
          className="hamburger"
          aria-label="Toggle menu"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(226, 223, 220, 0.9)',
            boxShadow: '0 20px 40px rgba(27, 43, 58, 0.12)',
            padding: '28px clamp(20px, 5vw, 40px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            animation: 'fadeUp 200ms ease',
          }}
        >
          {LINKS.map((link) => (
            <a
              key={link.name}
              href={`#${link.target}`}
              onClick={(e) => handleLinkClick(link.target, e)}
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '18px',
                fontWeight: 700,
                color: '#1B2B3A',
                textDecoration: 'none',
                cursor: 'pointer',
                padding: '6px 0',
              }}
            >
              {link.name}
            </a>
          ))}
          <div style={{ paddingTop: 12 }}>
            <button
              onClick={handleGetInTouch}
              style={{
                width: '100%',
                background: '#1B2B3A',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '9999px',
                padding: '14px 28px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Get in touch
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
