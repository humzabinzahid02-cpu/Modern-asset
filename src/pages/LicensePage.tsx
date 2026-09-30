import { useLanguage } from '../LanguageContext'

interface Props {
  onClose: () => void
}

export default function LicensePage({ onClose }: Props) {
  const { isArabic } = useLanguage()

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,14,20,0.92)', backdropFilter: 'blur(10px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        dir={isArabic ? 'rtl' : 'ltr'}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#1C2128] border border-white/10 shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-8 py-4 bg-[#1C2128] border-b border-white/10">
          <div>
            <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#E07B10] mb-0.5 font-body">
              {isArabic ? 'وزارة التجارة — المملكة العربية السعودية' : 'Ministry of Commerce — Kingdom of Saudi Arabia'}
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
              {isArabic ? 'شهادة السجل التجاري' : 'Commercial Registration Certificate'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-[#B0B8BC] hover:bg-[#E07B10] hover:border-[#E07B10] hover:text-white transition-all"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Certificate Image */}
        <div className="px-6 sm:px-8 pt-6 pb-2">
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <img
              src="/image.png"
              alt="Commercial Registration Certificate — MODERN ASSETS Establishment For Manufacturing"
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        </div>

        {/* Key Details */}
        <div className="px-6 sm:px-8 py-5 space-y-4 font-body">
          {/* Verify link (on top) */}
          <a
            href="https://mc.gov.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-xl border border-[#006C5B]/40 bg-[#006C5B]/15 hover:bg-[#006C5B]/25 transition-all no-underline group shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#006C5B]/30 flex items-center justify-center text-[#00C49A] shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                {isArabic ? 'التحقق عبر وزارة التجارة الرسمية' : 'Verify via Ministry of Commerce portal'}
              </span>
            </div>
            <span className="text-[#00C49A] font-bold text-xs sm:text-sm flex items-center gap-1 group-hover:translate-x-0.5 transition-transform" dir="ltr">
              mc.gov.sa ↗
            </span>
          </a>

          {/* Key Details Cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: isArabic ? 'الرقم الوطني' : 'National Number', value: '7038446733', orange: true },
              { label: isArabic ? 'تاريخ الإصدار' : 'Release Date', value: '25/02/2024' },
              { label: isArabic ? 'نوع الكيان' : 'Entity Type', value: isArabic ? 'مؤسسة' : 'Establishment' },
              { label: isArabic ? 'الحالة' : 'Status', value: isArabic ? 'نشط' : 'Active', green: true },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-xl bg-white/4 border border-white/8">
                <div className="text-[#8C949C] text-[10px] uppercase tracking-wider mb-0.5">{item.label}</div>
                <div
                  className={`font-display font-bold text-sm ${
                    (item as any).orange ? 'text-[#E07B10] font-mono tracking-widest'
                    : (item as any).green ? 'text-green-400'
                    : 'text-white'
                  }`}
                  dir="ltr"
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
