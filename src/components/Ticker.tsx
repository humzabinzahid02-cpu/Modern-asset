const ITEMS = [
  'Custom Truck Bodies',
  'Tankers',
  'Low-Bed Trailers',
  'Flat-Bed Trailers',
  'Sweepers',
  'Aerial Platforms',
  'Wreckers',
  'Car Carriers',
  'Custom Fabrication',
]

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div style={{
      background: '#FFFFFF',
      borderTop: '1px solid #E2DFDC',
      borderBottom: '1px solid #E2DFDC',
      padding: '14px 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }}>
      <div className="animate-ticker" style={{ display: 'inline-flex', gap: 0 }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#1B2B3A',
            padding: '0 32px',
          }}>
            {item}
            <span style={{ marginLeft: 32, color: '#E07B10' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
