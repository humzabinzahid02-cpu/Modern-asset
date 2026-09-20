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

export default function Footer() {
  return (
    <footer id="contact-footer" style={{
      background: '#07070f',
      borderTop: '1px solid rgba(245,197,24,0.08)',
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
                background: 'linear-gradient(135deg,#F5C518,#E6A800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                fontSize: 17,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#ffffff',
              }}>Modern Assets</span>
            </div>
            <p style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 13,
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.7,
              margin: '0 0 24px',
            }}>
              Custom fabrication of heavy-duty commercial vehicles and equipment — built for strength, precision & performance.
            </p>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
            }}>
              🇸🇦 Riyadh, Saudi Arabia
            </div>
          </div>

          {NAV_COLS.map(col => (
            <div key={col.heading}>
              <div style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#F5C518',
                marginBottom: 20,
              }}>
                {col.heading}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(link => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.4)',
                      textDecoration: 'none',
                      transition: 'color 180ms ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
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
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.2)',
          }}>
            © 2026 Modern Assets. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Use'].map(link => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.2)',
                  textDecoration: 'none',
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
