const STEPS = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'Understand your operational needs, load specs, and regulatory requirements.',
    icon: '◎',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Turn your vision into precise engineering drawings and material plans.',
    icon: '⬡',
  },
  {
    num: '03',
    title: 'Fabrication',
    desc: 'Precision manufacturing using advanced CNC, welding, and coating technology.',
    icon: '⚙',
  },
  {
    num: '04',
    title: 'Delivery',
    desc: 'On-time delivery, certified and ready to deploy, wherever you are.',
    icon: '⬤',
  },
]

export default function Process() {
  return (
    <section id="capabilities" style={{
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,100px)',
    }}>
      {/* Background image with overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0d0d1a' }}>
        <img
          src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=1600&h=900&fit=crop&auto=format"
          alt="Industrial welding fabrication"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12 }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(12,12,20,0.98) 0%, rgba(12,12,20,0.7) 100%)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(220px, 360px) 1fr',
          gap: 'clamp(40px,6vw,100px)',
          alignItems: 'start',
        }}>
          {/* Left */}
          <div>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#F5C518',
              marginBottom: 16,
            }}>Our Process</div>
            <h2 style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: 'clamp(40px,5vw,64px)',
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: 'uppercase',
              margin: '0 0 20px',
            }}>
              From Concept<br />
              <span style={{
                background: 'linear-gradient(90deg,#F5C518,#fff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>to Completion</span>
            </h2>
            <p style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7,
              margin: 0,
            }}>
              We follow a streamlined process to ensure quality, efficiency and on-time delivery — every time.
            </p>
          </div>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {STEPS.map((step, i) => (
              <div key={step.num} style={{ display: 'flex', gap: 0 }}>
                {/* Connector line */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 48,
                  flexShrink: 0,
                }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    border: '1px solid rgba(245,197,24,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    background: 'rgba(245,197,24,0.05)',
                  }}>
                    <span style={{ color: '#F5C518', fontSize: 16 }}>{step.icon}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{
                      width: 1,
                      flex: 1,
                      minHeight: 40,
                      background: 'linear-gradient(180deg, rgba(245,197,24,0.3), rgba(245,197,24,0.05))',
                      margin: '4px 0',
                    }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '0 0 40px 24px' }}>
                  <div style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    color: 'rgba(245,197,24,0.6)',
                    marginBottom: 6,
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '24px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: '#ffffff',
                    margin: '0 0 8px',
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.65,
                    margin: 0,
                    maxWidth: 320,
                  }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          section > div > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
