import { useState } from 'react'

const PRODUCTS = [
  {
    name: 'Tankers',
    desc: 'Fuel, water & chemical tankers built to international standards.',
    img: 'https://images.unsplash.com/photo-1745441062417-5d0fbfcbf48f?w=600&h=400&fit=crop&auto=format',
    tag: 'Liquid Transport',
  },
  {
    name: 'Low-Bed Trailers',
    desc: 'Heavy-haul platforms for oversized and abnormal loads.',
    img: 'https://images.unsplash.com/photo-1577075473292-5f62dfae5522?w=600&h=400&fit=crop&auto=format',
    tag: 'Heavy Haul',
  },
  {
    name: 'Flat-Bed Trailers',
    desc: 'Versatile flatbeds with custom stanchions and side kits.',
    img: 'https://images.unsplash.com/photo-1626121300305-def4dc305387?w=600&h=400&fit=crop&auto=format',
    tag: 'General Freight',
  },
  {
    name: 'Truck Bodies',
    desc: 'Steel and aluminum bodies engineered for maximum payload.',
    img: 'https://images.unsplash.com/photo-1778103617525-76877c583fa5?w=600&h=400&fit=crop&auto=format',
    tag: 'Custom Build',
  },
  {
    name: 'Sweepers',
    desc: 'Municipal and industrial road sweepers for any surface.',
    img: 'https://images.unsplash.com/photo-1782421932252-dbca02aae506?w=600&h=400&fit=crop&auto=format',
    tag: 'Municipal',
  },
  {
    name: 'Wreckers',
    desc: 'Recovery and towing vehicles from light to heavy-duty.',
    img: 'https://images.unsplash.com/photo-1768759579422-91cf6f113de1?w=600&h=400&fit=crop&auto=format',
    tag: 'Recovery',
  },
  {
    name: 'Aerial Platforms',
    desc: 'Bucket trucks and articulated boom lifts for elevated work.',
    img: 'https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?w=600&h=400&fit=crop&auto=format',
    tag: 'Elevated Work',
  },
  {
    name: 'Car Carriers',
    desc: 'Multi-level auto transport for dealerships and OEMs.',
    img: 'https://images.unsplash.com/photo-1766561994067-dbd575e1cff2?w=600&h=400&fit=crop&auto=format',
    tag: 'Auto Logistics',
  },
  {
    name: 'Custom Solutions',
    desc: 'Any specialized vehicle configuration — engineered to spec.',
    img: 'https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=600&h=400&fit=crop&auto=format',
    tag: 'Bespoke',
  },
]

export default function Products() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="products" style={{
      padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,100px)',
      background: '#0c0c14',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'flex-end',
          gap: 24,
          marginBottom: 56,
        }}>
          <div>
            <div style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#F5C518',
              marginBottom: 12,
            }}>Our Products</div>
            <h2 style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Built for<br />
              <span style={{
                background: 'linear-gradient(90deg,#F5C518,#fff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Every Industry</span>
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 280,
              lineHeight: 1.65,
              margin: '0 0 16px',
            }}>
              From tankers to trailers, we provide robust and reliable solutions for multiple sectors.
            </p>
            <a href="#" style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#F5C518',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(245,197,24,0.4)',
              paddingBottom: 2,
            }}>View All Products →</a>
          </div>
        </div>

        {/* Product grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 2,
        }}>
          {PRODUCTS.map((p, i) => (
            <div
              key={p.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                aspectRatio: '4/3',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: '#1a1a2e',
              }}
            >
              <img
                src={p.img}
                alt={p.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 600ms cubic-bezier(0.22,1,0.36,1)',
                  transform: hovered === i ? 'scale(1.08)' : 'scale(1)',
                }}
              />

              {/* Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: hovered === i
                  ? 'linear-gradient(0deg, rgba(12,12,20,0.92) 0%, rgba(12,12,20,0.4) 60%)'
                  : 'linear-gradient(0deg, rgba(12,12,20,0.85) 0%, rgba(12,12,20,0.1) 55%)',
                transition: 'background 400ms ease',
              }} />

              {/* Tag */}
              <div style={{
                position: 'absolute',
                top: 16,
                left: 16,
                fontFamily: 'Outfit, sans-serif',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#0c0c14',
                background: '#F5C518',
                padding: '3px 8px',
              }}>
                {p.tag}
              </div>

              {/* Text */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '0 20px 20px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: hovered === i ? 8 : 0,
                }}>
                  <h3 style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '22px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    margin: 0,
                    letterSpacing: '0.04em',
                  }}>
                    {p.name}
                  </h3>
                  <span style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '18px',
                    color: '#F5C518',
                    transition: 'transform 300ms ease',
                    transform: hovered === i ? 'translateX(4px)' : 'translateX(0)',
                    display: 'inline-block',
                  }}>→</span>
                </div>
                <div style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.5,
                  maxHeight: hovered === i ? 60 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 350ms ease, opacity 350ms ease',
                  opacity: hovered === i ? 1 : 0,
                }}>
                  {p.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
