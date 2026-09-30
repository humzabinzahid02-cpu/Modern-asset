import { useLanguage } from '../LanguageContext'

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
  const { isArabic } = useLanguage()
  const arabicItems = ['هياكل شاحنات مخصصة', 'صهاريج', 'مقطورات منخفضة', 'مقطورات مسطحة', 'آليات كنس', 'منصات عمل جوية', 'شاحنات إنقاذ', 'ناقلات سيارات', 'تصنيع مخصص']
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
      <div className="animate-ticker" style={{ display: 'inline-flex', gap: 0, willChange: 'transform', transform: 'translateZ(0)' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#1B2B3A',
            padding: '0 32px',
            display: 'inline-flex',
            alignItems: 'center',
          }}>
            <span>{isArabic ? arabicItems[i % ITEMS.length] : item}</span>
            <span style={{ marginLeft: 32, display: 'inline-flex', alignItems: 'center' }}>
              <svg className="w-2.5 h-2.5 text-[#E07B10] fill-current" viewBox="0 0 24 24">
                <polygon points="12 2 22 12 12 22 2 12" />
              </svg>
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
