import React from 'react'

const NAV_COLS = [
  {
    heading: 'Products',
    links: ['Tankers', 'Trailers', 'Truck Bodies', 'Sweepers', 'Wreckers', 'Aerial Platforms'],
  },
  {
    heading: 'Company',
    links: ['About Us', 'Our Process', 'Projects', 'Careers', 'News'],
  },
  {
    heading: 'Support',
    links: ['Request a Quote', 'Contact Us', 'After-Sales Service', 'Parts & Spares'],
  },
]

interface FooterProps {
  onOpenQuote?: () => void
}

export default function Footer({ onOpenQuote }: FooterProps) {
  const handleLinkClick = (link: string, e: React.MouseEvent) => {
    if (link === 'Request a Quote' || link === 'Contact Us') {
      e.preventDefault()
      if (onOpenQuote) onOpenQuote()
    }
  }

  return (
    <footer id="contact-footer" style={{
      background: '#1C2128',
      borderTop: '1px solid #252D35',
      padding: 'clamp(48px,6vw,80px) clamp(24px,6vw,100px) 32px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px repeat(3, 1fr)',
          gap: 48,
          marginBottom: 64,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 7,
                background: 'linear-gradient(135deg, #E07B10 0%, #C46C0C 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontWeight: 900,
                  fontSize: 18,
                  color: '#FFFFFF',
                }}>M</span>
              </div>
              <span style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontWeight: 700,
                fontSize: 17,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
              }}>Modern Assets</span>
            </div>
            <p style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 13,
              color: '#B0B8BC',
              lineHeight: 1.7,
              margin: '0 0 24px',
            }}>
              Custom fabrication of heavy-duty commercial vehicles and equipment — built for strength, precision &amp; performance.
            </p>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#B0B8BC',
            }}>
              🇸🇦 Riyadh, Saudi Arabia
            </div>
          </div>

          {NAV_COLS.map(col => (
            <div key={col.heading}>
              <div style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                marginBottom: 20,
              }}>
                {col.heading}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(link => (
                  <a
                    key={link}
                    href="#"
                    onClick={(e) => handleLinkClick(link, e)}
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '13px',
                      color: '#E2DFDC',
                      textDecoration: 'none',
                      transition: 'color 180ms ease',
                      cursor: (link === 'Request a Quote' || link === 'Contact Us') ? 'pointer' : 'default',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E07B10')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#E2DFDC')}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #252D35',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 12,
            color: '#B0B8BC',
            margin: 0,
          }}>
            &copy; {new Date().getFullYear()} Modern Assets. All rights reserved. Saudi Vision 2030 Fleet Partner.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service', 'Safety Certifications'].map(item => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: 12,
                  color: '#B0B8BC',
                  textDecoration: 'none',
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
