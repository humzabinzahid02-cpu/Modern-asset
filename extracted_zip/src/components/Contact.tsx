export default function Contact() {
  return (
    <section id="contact" style={{
      padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,100px)',
      background: '#0c0c14',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* CTA Banner */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          background: '#13131f',
          border: '1px solid rgba(245,197,24,0.12)',
          padding: 'clamp(48px,6vw,80px) clamp(32px,5vw,80px)',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 40,
          alignItems: 'center',
        }}>
          {/* Background accent */}
          <div style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,197,24,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#F5C518',
              marginBottom: 16,
            }}>Get in Touch</div>
            <h2 style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: 'clamp(36px,5vw,68px)',
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: 'uppercase',
              margin: '0 0 16px',
            }}>
              Ready to Build<br />
              <span style={{
                background: 'linear-gradient(90deg,#F5C518,#fff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Your Vision?</span>
            </h2>
            <p style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 400,
            }}>
              Tell us about your project and our team will respond within 24 hours with a tailored proposal.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
            <button className="btn-primary" style={{ whiteSpace: 'nowrap' }}>Request a Quote →</button>
            <button className="btn-ghost" style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>+966 XX XXX XXXX</button>
          </div>
        </div>

        {/* Contact details row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 1,
          marginTop: 1,
        }}>
          {[
            { label: 'Headquarters', value: 'Riyadh, Saudi Arabia' },
            { label: 'Email', value: 'info@modern-assets.com' },
            { label: 'Phone', value: '+966 XX XXX XXXX' },
            { label: 'Working Hours', value: 'Sun – Thu, 8am – 5pm' },
          ].map(c => (
            <div key={c.label} style={{
              background: '#13131f',
              padding: '24px 28px',
              borderTop: '2px solid transparent',
              borderImage: 'linear-gradient(90deg,#F5C518,transparent) 1',
            }}>
              <div style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                marginBottom: 6,
              }}>{c.label}</div>
              <div style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: '0.02em',
              }}>{c.value}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          #contact > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
