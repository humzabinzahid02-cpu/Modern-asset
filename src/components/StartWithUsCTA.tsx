import React from 'react'
import { useLanguage } from '../LanguageContext'

interface StartWithUsCTAProps {
  onOpenQuote: () => void
}

export default function StartWithUsCTA({ onOpenQuote }: StartWithUsCTAProps) {
  const { isArabic } = useLanguage()
  return (
    <section
      id="contact"
      className="relative w-full bg-[#1B2B3A] text-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-80 sm:w-[550px] h-80 sm:h-[550px] bg-radial from-[#E07B10]/20 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 sm:w-[450px] h-72 sm:h-[450px] bg-radial from-[#E07B10]/10 to-transparent rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/4" />

      {/* Subtle industrial grid lines */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left: Main Copy & Callout (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 font-body text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase font-bold text-[#E07B10] mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E07B10] animate-pulse" />
              START WITH US • KSA FLEET PARTNER
            </div>

            {/* Headline */}
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[0.93] mb-4 sm:mb-6">
              {isArabic ? 'لنبنِ' : "LET'S BUILD YOUR"}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07B10] via-[#F5A623] to-[#E07B10]">
                {isArabic ? 'رؤيتك معاً' : 'VISION TOGETHER'}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="font-body text-sm sm:text-base lg:text-lg text-[#9CA3AF] max-w-xl leading-relaxed mb-6 sm:mb-8">
              {isArabic ? 'أخبرنا عن احتياجات أسطولك، وسيرد فريقنا الهندسي خلال 24 ساعة بعرض مخصص وأسعار ثابتة ومواعيد تسليم مضمونة.' : 'Tell us about your fleet requirements and our engineering team will respond within 24 hours with a tailored proposal — fixed pricing and guaranteed timelines included.'}
            </p>

            {/* Action Button: BECOME A CLIENT */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onOpenQuote}
                className="group inline-flex items-center justify-center gap-3 font-display font-extrabold text-sm sm:text-base tracking-[0.1em] uppercase text-white bg-[#E07B10] hover:bg-[#C96B0A] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border-2 border-[#E07B10] shadow-[0_8px_25px_rgba(224,123,16,0.35)] hover:shadow-[0_12px_32px_rgba(224,123,16,0.5)] transition-all duration-300 cursor-pointer w-full sm:w-auto text-center"
              >
                <span>{isArabic ? 'كن عميلاً' : 'BECOME A CLIENT'}</span>
                <span className="text-lg font-black transition-transform group-hover:translate-x-1">›</span>
              </button>
            </div>

          </div>

          {/* Right: Fast Contact / HQ Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4 mt-4 lg:mt-0">
            
            {/* Card 1: Headquarters */}
            <div className="bg-[#243447]/70 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 flex items-start gap-3.5 sm:gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E07B10]/15 text-[#E07B10] flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <span className="font-body text-[10px] tracking-widest uppercase text-[#9CA3AF] font-bold block">
                  {isArabic ? 'المقر الرئيسي' : 'Headquarters'}
                </span>
                <h4 className="font-display font-bold text-base text-white uppercase mt-0.5 mb-1">
                  {isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                </h4>
                <p className="font-body text-xs text-[#9CA3AF] m-0">
                  <span className="text-[#E07B10] font-semibold">{isArabic ? 'المدينة الصناعية الثانية' : 'Industrial City 2'}</span> • {isArabic ? 'توصيل الأساطيل متاح لجميع أنحاء المملكة' : 'Fleet deliveries available nationwide'}
                </p>
              </div>
            </div>

            {/* Card 2: 24h Response Commitment */}
            <div className="bg-[#243447]/70 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 flex items-start gap-3.5 sm:gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E07B10]/15 text-[#E07B10] flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <span className="font-body text-[10px] tracking-widest uppercase text-[#9CA3AF] font-bold block">
                  {isArabic ? 'الاستجابة التجارية' : 'Commercial Response'}
                </span>
                <h4 className="font-display font-bold text-base text-white uppercase mt-0.5 mb-1">
                  {isArabic ? 'عرض خلال 24 ساعة' : '24-Hour Proposal Turnaround'}
                </h4>
                <p className="font-body text-xs text-[#9CA3AF] m-0">
                  {isArabic ? 'عروض أسعار ثابتة مع تحليل كامل لأوزان المحاور ومواعيد التسليم' : 'Fixed quotes with complete axle weight analysis & delivery dates'}
                </p>
              </div>
            </div>

            {/* Card 3: Quick Direct Contact */}
            <div className="bg-[#243447]/70 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 flex items-start gap-3.5 sm:gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E07B10]/15 text-[#E07B10] flex items-center justify-center shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div className="flex-1">
                <span className="font-body text-[10px] tracking-widest uppercase text-[#9CA3AF] font-bold block">
                  {isArabic ? 'التواصل المباشر مع الهندسة' : 'Direct Engineering Desk'}
                </span>
                <h4 className="font-display font-bold text-base text-white uppercase mt-0.5 mb-1">
                  proposals@modern-assets.com
                </h4>
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="font-body text-xs text-[#E07B10] hover:underline font-bold bg-transparent border-none p-0 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>{isArabic ? 'افتح نموذج مواصفات الأسطول' : 'Open Dedicated Fleet Spec Form'}</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
