import { useLanguage } from '../LanguageContext'

interface Props {
  onClose: () => void
}

export default function PrivacyPolicy({ onClose }: Props) {
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
              {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
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
                <h3 className="font-display font-bold text-white text-base mb-2">١. المعلومات التي نجمعها</h3>
                <p>نجمع المعلومات التي تقدمها طوعاً عند ملء نماذج التواصل أو طلب عروض الأسعار، بما في ذلك: الاسم، رقم الهاتف، البريد الإلكتروني، واسم الشركة. لا نجمع أي بيانات شخصية تلقائياً دون موافقتك.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">٢. استخدام المعلومات</h3>
                <p>تُستخدم المعلومات المجمعة حصراً للرد على استفساراتك وتقديم عروض الأسعار المطلوبة، وتحسين خدماتنا، والتواصل معك بشأن منتجاتنا.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">٣. حماية البيانات</h3>
                <p>نلتزم بحماية بياناتك الشخصية وفق أفضل معايير الأمن الرقمي. لا نبيع أو نؤجر أو نشارك معلوماتك مع أطراف ثالثة لأغراض تجارية.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">٤. ملفات الارتباط (Cookies)</h3>
                <p>قد يستخدم موقعنا ملفات الارتباط لتحسين تجربة المستخدم. يمكنك تعطيلها من إعدادات متصفحك في أي وقت.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">٥. حقوقك</h3>
                <p>يحق لك الاطلاع على بياناتك الشخصية أو تعديلها أو طلب حذفها في أي وقت بالتواصل معنا عبر البريد الإلكتروني.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">٦. التواصل</h3>
                <p>لأي استفسار بشأن سياسة الخصوصية، تواصل معنا على: <a href="mailto:info@modern-assets.com" className="text-[#E07B10] hover:underline">info@modern-assets.com</a></p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">1. Information We Collect</h3>
                <p>We collect information you voluntarily provide when filling out contact forms or requesting quotations, including: your name, phone number, email address, and company name. We do not collect personal data automatically without your consent.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">2. Use of Information</h3>
                <p>Collected information is used exclusively to respond to your inquiries and provide requested quotations, improve our services, and communicate with you regarding our products.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">3. Data Protection</h3>
                <p>We are committed to protecting your personal data according to the best digital security standards. We do not sell, rent, or share your information with third parties for commercial purposes.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">4. Cookies</h3>
                <p>Our website may use cookies to enhance the user experience. You may disable them from your browser settings at any time.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">5. Your Rights</h3>
                <p>You have the right to access, modify, or request deletion of your personal data at any time by contacting us via email.</p>
              </section>
              <section>
                <h3 className="font-display font-bold text-white text-base mb-2">6. Contact</h3>
                <p>For any questions regarding this privacy policy, contact us at: <a href="mailto:info@modern-assets.com" className="text-[#E07B10] hover:underline">info@modern-assets.com</a></p>
              </section>
            </>
          )}

          {/* Company registration box */}
          <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/3 text-xs text-[#8C949C] space-y-0.5">
            <div className="text-white font-bold mb-1">MODERN ASSETS Establishment For Manufacturing</div>
            <div>{isArabic ? 'رقم السجل التجاري:' : 'Commercial Registration No.:'} <span className="text-[#E07B10]">7038446733</span></div>
            <div>{isArabic ? 'المدينة:' : 'City:'} {isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Kingdom of Saudi Arabia'}</div>
            <div>{isArabic ? 'الشارع:' : 'Street:'} {isArabic ? 'حمد بن فارس، حي المشاعل، الرياض ١٤٣٢٦' : '4326 Hamad Ibn Faris St., Al Mishael Dist., Riyadh 14326'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
