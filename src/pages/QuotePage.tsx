import React, { useState } from 'react'

interface QuotePageProps {
  onBackToHome: () => void
}

type FormState = 'idle' | 'submitting' | 'success'

export default function QuotePage({ onBackToHome }: QuotePageProps) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    vehicleType: 'Custom Truck Body',
    fleetSize: '1 - 2 Units',
    timeline: 'Within 1 - 3 Months',
    specifications: '',
  })

  const VEHICLE_OPTIONS = [
    'Custom Truck Body',
    'Petroleum & Chemical Tanker',
    'Heavy-Duty Low-Bed Trailer',
    'Multi-Axle Flat-Bed Trailer',
    'High-Capacity Street Sweeper',
    'Insulated Aerial Work Platform',
    'Heavy Recovery & Wrecker Truck',
    'Multi-Deck Car Carrier',
    'Specialized Military / Desert Transport',
    'Other Bespoke Fabrication',
  ]

  const FLEET_SIZES = [
    '1 - 2 Units (Prototype / Urgent)',
    '3 - 5 Units (Fleet Expansion)',
    '6 - 15 Units (Major Contract)',
    '16+ Units (Enterprise / Megaproject)',
  ]

  const TIMELINES = [
    'Immediate (Urgent Requirement)',
    'Within 1 - 3 Months',
    '3 - 6 Months (Scheduled Rollout)',
    'Saudi Vision 2030 Project (2026 - 2027)',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    setTimeout(() => {
      setFormState('success')
    }, 1200)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#FFFFFF',
    border: '1.5px solid #E2DFDC',
    borderRadius: '10px',
    padding: '13px 16px',
    fontFamily: 'Outfit, sans-serif',
    fontSize: '15px',
    color: '#1B2B3A',
    outline: 'none',
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Outfit, sans-serif',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#1B2B3A',
    marginBottom: '8px',
  }

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#1B2B3A] flex flex-col selection:bg-[#E07B10] selection:text-white">
      {/* ── Top Header Navigation Bar ── */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-[#E2DFDC] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-left bg-transparent border-none cursor-pointer p-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#E07B10] to-[#C46C0C] flex items-center justify-center text-white font-display font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <span className="font-display font-black text-xl tracking-wide uppercase text-[#1B2B3A] block leading-none">
                Modern Assets
              </span>
              <span className="font-body text-[10px] tracking-widest uppercase text-[#8C949C] block">
                Heavy Vehicle Solutions • KSA
              </span>
            </div>
          </button>

          {/* Back to Home Button */}
          <button
            onClick={onBackToHome}
            className="group flex items-center gap-2 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B2B3A] bg-white border border-[#E2DFDC] hover:border-[#E07B10] hover:text-[#E07B10] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span>
            <span>Back to Fleet &amp; Overview</span>
          </button>

        </div>
      </header>

      {/* ── Main Page Content ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-body uppercase tracking-wider text-[#8C949C] mb-8">
          <button onClick={onBackToHome} className="hover:text-[#E07B10] transition-colors cursor-pointer bg-transparent border-none p-0">
            Home
          </button>
          <span>/</span>
          <span className="text-[#E07B10] font-bold">Request a Formal Quote</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── Left Column: Value Prop & Contact Info (5 cols) ── */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.25em] uppercase font-bold text-[#E07B10] bg-white px-3.5 py-1.5 rounded-full border border-[#E2DFDC] shadow-sm w-fit mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E07B10] animate-pulse" />
              Direct Factory Engineering • KSA
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#1B2B3A] uppercase tracking-tight leading-[0.93] mb-6">
              LET'S BUILD YOUR<br />
              <span className="text-[#E07B10]">FLEET TOGETHER</span>
            </h1>

            <p className="font-body text-base text-[#5C6470] leading-relaxed mb-8">
              Tell us about your specialized vehicle requirements. Our chief engineering team in Riyadh will review your specifications and issue a comprehensive, fixed-cost proposal with CAD schematics within 24 hours.
            </p>

            {/* Key Assurance Cards */}
            <div className="space-y-3 mb-10">
              <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-[#E2DFDC] shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#E07B10]/10 text-[#E07B10] flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm uppercase text-[#1B2B3A] m-0">
                    SASO &amp; Aramco Certified
                  </h4>
                  <p className="font-body text-xs text-[#5C6470] m-0 mt-0.5">
                    100% compliant with Saudi transport regulations and safety codes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-[#E2DFDC] shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#E07B10]/10 text-[#E07B10] flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm uppercase text-[#1B2B3A] m-0">
                    24-Hour Guaranteed Turnaround
                  </h4>
                  <p className="font-body text-xs text-[#5C6470] m-0 mt-0.5">
                    Fast turnaround with itemized bill of materials and delivery schedules.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-[#E2DFDC] shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#E07B10]/10 text-[#E07B10] flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm uppercase text-[#1B2B3A] m-0">
                    Custom Technical CAD Included
                  </h4>
                  <p className="font-body text-xs text-[#5C6470] m-0 mt-0.5">
                    Axle weight distribution, hydraulic schematics, and payload analysis.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Factory Contacts */}
            <div className="bg-[#1B2B3A] text-white p-6 rounded-2xl border border-[#2A3B4D] shadow-lg">
              <span className="font-body text-[10px] tracking-widest uppercase text-[#E07B10] font-bold block mb-3">
                Riyadh Engineering Office
              </span>
              <div className="space-y-3 font-body text-sm text-[#D1D5DB]">
                <div className="flex items-center gap-3">
                  <span className="text-[#E07B10] flex items-center">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <span>Industrial City 2, Riyadh, Kingdom of Saudi Arabia</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#E07B10] flex items-center">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  <span>proposals@modern-assets.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#E07B10] flex items-center">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.99 5.99l1.01-1.01a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </span>
                  <span>+966 (11) 234-5678 (Toll Free KSA)</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── Right Column: Request a Quote Form (7 cols) ── */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2DFDC] shadow-[0_20px_50px_rgba(27,43,58,0.07)]">
              
              {formState === 'success' ? (
                /* Success State Confirmation */
                <div className="py-12 px-4 text-center">
                  <div className="w-20 h-20 bg-[#E07B10]/15 text-[#E07B10] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-[#1B2B3A] mb-3">
                    Quote Request Received
                  </h2>
                  <p className="font-body text-base text-[#5C6470] max-w-md mx-auto leading-relaxed mb-8">
                    Thank you, <strong className="text-[#1B2B3A]">{form.name}</strong>. Your project dossier has been assigned to our commercial engineering desk. We will reach out within 24 hours.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={onBackToHome}
                      className="font-display font-bold text-sm uppercase tracking-wider bg-[#1B2B3A] hover:bg-[#E07B10] text-white px-7 py-3.5 rounded-full transition-all cursor-pointer shadow-md"
                    >
                      Return to Main Site
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormState('idle')}
                      className="font-display font-bold text-sm uppercase tracking-wider bg-transparent text-[#5C6470] hover:text-[#1B2B3A] px-5 py-3.5 rounded-full transition-all cursor-pointer"
                    >
                      Submit Another Vehicle Spec
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Inputs */
                <form onSubmit={handleSubmit}>
                  <div className="border-b border-[#E2DFDC] pb-6 mb-8">
                    <h3 className="font-display font-black text-2xl uppercase tracking-tight text-[#1B2B3A] m-0">
                      REQUEST A FORMAL FLEET PROPOSAL
                    </h3>
                    <p className="font-body text-xs text-[#5C6470] m-0 mt-1">
                      Fill in your specifications below. Fields marked with an asterisk (*) are required.
                    </p>
                  </div>

                  <div className="space-y-6">
                    
                    {/* Row 1: Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Abdullah Al-Harbi"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Company / Fleet Name *</label>
                        <input
                          type="text"
                          name="company"
                          required
                          value={form.company}
                          onChange={handleChange}
                          placeholder="e.g. Al-Tamimi Transport Group"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label style={labelStyle}>Business Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="abdullah@company.com"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Phone / WhatsApp (+966) *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+966 50 000 0000"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    {/* Row 3: Vehicle Type & Quantity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label style={labelStyle}>Vehicle / Body Category *</label>
                        <select
                          name="vehicleType"
                          value={form.vehicleType}
                          onChange={handleChange}
                          style={inputStyle}
                        >
                          {VEHICLE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Estimated Fleet Quantity *</label>
                        <select
                          name="fleetSize"
                          value={form.fleetSize}
                          onChange={handleChange}
                          style={inputStyle}
                        >
                          {FLEET_SIZES.map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Timeline */}
                    <div>
                      <label style={labelStyle}>Target Delivery Timeline *</label>
                      <select
                        name="timeline"
                        value={form.timeline}
                        onChange={handleChange}
                        style={inputStyle}
                      >
                        {TIMELINES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Row 5: Custom Specifications */}
                    <div>
                      <label style={labelStyle}>
                        Project Details, Chassis Make, or Custom Requirements
                      </label>
                      <textarea
                        name="specifications"
                        rows={4}
                        value={form.specifications}
                        onChange={handleChange}
                        placeholder="Detail any specific chassis (Mercedes Actros, MAN, Volvo, Isuzu), tank capacities (m³), hydraulic cranes, desert cooling packs, or hazardous chemical standards..."
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="w-full group relative overflow-hidden bg-[#E07B10] hover:bg-[#C46C0C] text-white font-display font-black text-base sm:text-lg uppercase tracking-wider py-4 rounded-xl shadow-[0_10px_25px_rgba(224,123,16,0.35)] transition-all cursor-pointer border-none flex items-center justify-center gap-3 disabled:opacity-75"
                      >
                        {formState === 'submitting' ? (
                          <span>Processing Fleet Dossier...</span>
                        ) : (
                          <>
                            <span>Submit Formal Quote Request</span>
                            <span className="transition-transform group-hover:translate-x-1.5">→</span>
                          </>
                        )}
                      </button>
                      <p className="text-center font-body text-[11px] text-[#8C949C] mt-3 flex items-center justify-center gap-1.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        Confidential. All intellectual property and fleet specs are protected under NDA.
                      </p>
                    </div>

                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-[#E2DFDC] bg-white py-6 px-4 text-center font-body text-xs text-[#8C949C]">
        <p className="m-0">
          © {new Date().getFullYear()} Modern Assets Co. Heavy-Duty Vehicle Solutions. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
