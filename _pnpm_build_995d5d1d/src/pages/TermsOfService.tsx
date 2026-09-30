import { useLanguage } from '../LanguageContext'

interface Props {
  onClose: () => void
}

export default function TermsOfService({ onClose }: Props) {
  const { isArabic } = useLanguage()

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,14,20,0.88)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        dir={isArabic ? 'rtl' : 'ltr'}
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl bg-[#1C2128] border border-white/10 shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-10 py-5 bg-[#1C2128] border-b border-white/10">
          <div>
            <div className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#E07B10] mb-0.5">
              {isArabic ? 'مودرن أسيتس للتصنيع' : 'Modern Assets For Manufacturing'}
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
              {isArabic ? 'شروط الاستخدام' : 'Terms of Service'}
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

        {/* Body */}
        <div className="px-6 sm:px-10 py-8 space-y-7 font-body text-[#B0B8BC] text-sm sm:text-[15px] leading-relaxed">
          <p className="text-[#8C949C] text-xs">
            {isArabic ? 'آخر تحديث: سبتمبر 2026' : 'Last updated: September 2026'}
          </p>

          {isArabic ? (
            <>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">١. القبول بالشروط</h3>
                <p>باستخدامك لموقع مودرن أسيتس، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يُرجى التوقف عن استخدام الموقع.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">٢. طبيعة الخدمات</h3>
                <p>تقدم مؤسسة مودرن أسيتس للتصنيع خدمات تصنيع المركبات التجارية الثقيلة والمقطورات المخصصة في المملكة العربية السعودية. جميع العروض والأسعار المقدمة عبر الموقع هي تقديرية وتخضع للمراجعة والتأكيد الرسمي.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">٣. حقوق الملكية الفكرية</h3>
                <p>جميع المحتويات المنشورة على الموقع من نصوص وصور وتصاميم وشعارات هي ملك حصري لمؤسسة مودرن أسيتس للتصنيع ومحمية بموجب قوانين الملكية الفكرية. لا يُسمح باستخدامها أو نسخها دون إذن كتابي مسبق.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">٤. حدود المسؤولية</h3>
                <p>لا تتحمل مؤسسة مودرن أسيتس للتصنيع أي مسؤولية عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام الموقع أو الاعتماد على المعلومات الواردة فيه.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">٥. الاتصالات والتسويق</h3>
                <p>بتقديم بياناتك عبر نماذج التواصل، توافق على تلقي ردود تتعلق باستفساراتك. لن نستخدم بياناتك لأي أغراض تسويقية دون موافقتك الصريحة.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">٦. القانون المعمول به</h3>
                <p>تخضع هذه الشروط وتُفسَّر وفقاً لأنظمة ولوائح المملكة العربية السعودية. وتختص المحاكم السعودية بالنظر في أي نزاعات تنشأ عن هذه الشروط.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">٧. التعديلات</h3>
                <p>نحتفظ بحقنا في تعديل هذه الشروط في أي وقت. يُنصح بمراجعة هذه الصفحة بشكل دوري للاطلاع على أحدث الشروط.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">1. Acceptance of Terms</h3>
                <p>By using the Modern Assets website, you agree to be bound by these terms and conditions. If you do not agree with any of these terms, please discontinue use of the site.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">2. Nature of Services</h3>
                <p>Modern Assets Establishment For Manufacturing provides heavy-duty commercial vehicle and custom trailer manufacturing services in the Kingdom of Saudi Arabia. All quotations and prices presented through the website are estimates subject to formal review and confirmation.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">3. Intellectual Property</h3>
                <p>All content published on the site including text, images, designs, and logos are the exclusive property of Modern Assets Establishment For Manufacturing and are protected by intellectual property law. Use or reproduction without prior written permission is prohibited.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">4. Limitation of Liability</h3>
                <p>Modern Assets Establishment For Manufacturing shall not be liable for any direct or indirect damages arising from the use of this website or reliance on information contained herein.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">5. Communications & Marketing</h3>
                <p>By submitting your information through contact forms, you agree to receive responses related to your inquiries. We will not use your data for marketing purposes without your explicit consent.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">6. Governing Law</h3>
                <p>These terms are governed by and construed in accordance with the laws and regulations of the Kingdom of Saudi Arabia. Saudi courts shall have jurisdiction over any disputes arising from these terms.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">7. Amendments</h3>
                <p>We reserve the right to modify these terms at any time. We recommend reviewing this page periodically for the latest terms.</p>
              </section>
            </>
          )}

          {/* Company registration box */}
          <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/3 text-xs text-[#8C949C] space-y-0.5">
            <div className="text-white font-bold mb-1">MODERN ASSETS Establishment For Manufacturing</div>
            <div>{isArabic ? 'رقم السجل التجاري:' : 'Commercial Registration No.:'} <span className="text-[#E07B10]">7038446733</span></div>
            <div>{isArabic ? 'تاريخ الإصدار:' : 'Release Date:'} 25/02/2024</div>
            <div>{isArabic ? 'الحالة:' : 'Status:'} <span className="text-green-400">{isArabic ? 'نشط' : 'Active'}</span></div>
            <div>{isArabic ? 'المدينة:' : 'City:'} {isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Kingdom of Saudi Arabia'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
