const FEATURES = [
  { icon: '◈', title: 'Superior Quality', desc: 'Built to last, in every condition. ISO-certified fabrication with premium-grade steel.' },
  { icon: '⬡', title: 'Custom Engineering', desc: 'Tailored to your exact needs. No off-the-shelf compromises.' },
  { icon: '◉', title: 'Reliable Support', desc: 'From start to finish and beyond — dedicated after-sales service.' },
  { icon: '▲', title: 'On-Time Delivery', desc: 'Because your time matters. Guaranteed delivery schedules.' },
]

export default function WhyUs() {
  return (
    <section id="about" style={{
      padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,100px)',
      background: '#f8f5ed',
      color: '#0c0c14',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(40px,6vw,100px)',
        alignItems: 'center',
      }}>
        {/* Left: image */}
        <div style={{ position: 'relative' }}>
          <div style={{ backgroundColor: '#d6cfc0', aspectRatio: '4/5', overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?w=700&h=900&fit=crop&auto=format"
              alt="Welder working with sparks flying"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(45deg, rgba(245,197,24,0.15) 0%, transparent 60%)',
            }} />
          </div>
          {/* Tag card */}
          <div style={{
            position: 'absolute',
            bottom: -24,
            right: -24,
            background: '#F5C518',
            padding: '24px 28px',
            maxWidth: 200,
          }}>
            <div style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontWeight: 900,
              fontSize: 32,
              color: '#0c0c14',
              lineHeight: 1,
            }}>15+</div>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 12,
              color: 'rgba(12,12,20,0.65)',
              marginTop: 4,
            }}>Years of precision fabrication in the region</div>
          </div>
        </div>

        {/* Right: content */}
        <div>
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#E6A800',
            marginBottom: 16,
          }}>Why Modern Assets</div>
          <h2 style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: 'clamp(40px,5vw,68px)',
            fontWeight: 800,
            lineHeight: 0.95,
            textTransform: 'uppercase',
            margin: '0 0 24px',
            color: '#0c0c14',
          }}>
            More Than<br />
            <span style={{
              background: 'linear-gradient(90deg,#E6A800,#0c0c14)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Just Manufacturing</span>
          </h2>
          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 15,
            color: 'rgba(12,12,20,0.6)',
            lineHeight: 1.7,
            margin: '0 0 40px',
            maxWidth: 420,
          }}>
            We combine engineering expertise, advanced technology and a customer-first approach to deliver solutions that keep your business moving.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '28px 32px',
          }}>
            {FEATURES.map(f => (
              <div key={f.title}>
                <div style={{
                  width: 36,
                  height: 36,
                  background: 'rgba(230,168,0,0.1)',
                  border: '1px solid rgba(230,168,0,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                  fontSize: 16,
                  color: '#E6A800',
                }}>
                  {f.icon}
                </div>
                <div style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: '#0c0c14',
                  marginBottom: 6,
                }}>
                  {f.title}
                </div>
                <div style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '13px',
                  color: 'rgba(12,12,20,0.5)',
                  lineHeight: 1.6,
                }}>
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          #about > div { grid-template-columns: 1fr !important; }
          #about > div > div:first-child { display: none; }
        }
      `}</style>
    </section>
  )
}
