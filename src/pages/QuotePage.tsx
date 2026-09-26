import React, { useState } from 'react'
import { sendFormEmail, openEmailClient, getGmailComposeLink, getMailtoLink, TARGET_EMAIL } from '../lib/sendFormEmail'

interface QuotePageProps {
  onBackToHome: () => void
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function QuotePage({ onBackToHome }: QuotePageProps) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formError, setFormError] = useState('')
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Launch email composer SYNCHRONOUSLY at the exact same moment of click
    openEmailClient('New Fleet Quote Request', form)

    // Immediately show success screen
    setFormState('success')
    setFormError('')

    // Send silent background backup copy via EmailJS
    sendFormEmail('New Fleet Quote Request', form).catch(console.error)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#FFFFFF',
    border: '1.5px solid #E2DFDC',
    borderRadius: '10px',
    padding: '12px 14px',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '14.5px',
    color: '#1B2B3A',
    outline: 'none',
    transition: 'border-color 200ms ease, box-shadow 200ms ease',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: '#1B2B3A',
    marginBottom: '6px',
  }

  return (
    <div className="min-h-screen bg-[#F6F5F1] text-[#1B2B3A] flex flex-col selection:bg-[#E07B10] selection:text-white">
      {/* Top Header Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-[#E2DFDC] px-4 sm:px-8 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 sm:gap-2.5 text-left bg-transparent border-none cursor-pointer p-0 group"
          >
            <img src={`${import.meta.env.BASE_URL}modern-assets-logo.png`} alt="Modern Assets — Heavy Vehicle Solutions" className="w-40 sm:w-52 h-12 object-contain group-hover:scale-[1.03] transition-transform" />
          </button>

          {/* Back to Home Button */}
          <button
            onClick={onBackToHome}
            className="group flex items-center gap-1.5 sm:gap-2 font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B2B3A] bg-white border border-[#E2DFDC] hover:border-[#E07B10] hover:text-[#E07B10] px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-xs transition-all cursor-pointer shrink-0"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span className="hidden sm:inline">Back to Fleet &amp; Overview</span>
            <span className="sm:hidden">Back</span>
          </button>

        </div>
      </header>

      {/* ── Hero Banner with Visual Background ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#14212D] via-[#1B2B3A] to-[#243B50]">
        {/* Subtle dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#F6F5F1 1.2px, transparent 1.2px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Floating geometric accents */}
        <div className="absolute top-8 left-[10%] w-40 h-40 rounded-full bg-[#E07B10]/[0.06] blur-3xl pointer-events-none" />
        <div className="absolute bottom-4 right-[8%] w-56 h-56 rounded-full bg-[#E07B10]/[0.04] blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.03] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#E07B10]/[0.06] pointer-events-none" />

        {/* Diagonal accent lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" preserveAspectRatio="none" viewBox="0 0 1440 400">
          <line x1="0" y1="400" x2="500" y2="0" stroke="#E07B10" strokeWidth="1" />
          <line x1="200" y1="400" x2="700" y2="0" stroke="#F6F5F1" strokeWidth="0.5" />
          <line x1="800" y1="400" x2="1300" y2="0" stroke="#E07B10" strokeWidth="0.5" />
          <line x1="1000" y1="400" x2="1440" y2="80" stroke="#F6F5F1" strokeWidth="1" />
        </svg>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 font-body text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-bold text-[#E07B10] mb-5">
              <span className="w-8 h-px bg-[#E07B10]" />
              <span>Fleet Specification Request</span>
            </div>

            {/* Title */}
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-white uppercase tracking-tight leading-[0.92] mb-5">
              LET'S BUILD YOUR<br />
              <span className="text-[#E07B10]">FLEET TOGETHER</span>
            </h1>

            {/* Subtitle */}
            <p className="font-body text-sm sm:text-base lg:text-lg text-white/60 leading-relaxed max-w-xl mb-8">
              Tell us about your specialized vehicle requirements. Our chief engineering team in Riyadh will issue a comprehensive, fixed-cost proposal within 24 hours.
            </p>

            {/* Trust badges row */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {[
                { icon: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1.18V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z', label: 'ISO 9001 Certified' },
                { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label: 'SASO Compliant' },
                { icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', label: '24h CAD Response' },
              ].map(badge => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm"
                >
                  <svg className="w-3.5 h-3.5 text-[#E07B10] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={badge.icon} />
                  </svg>
                  <span className="font-body text-[10px] sm:text-[11px] tracking-widest uppercase text-white/70 font-semibold">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade to cream */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F6F5F1] to-transparent pointer-events-none" />
      </div>

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-body uppercase tracking-wider text-[#8C949C] mb-6 sm:mb-8">
          <button onClick={onBackToHome} className="hover:text-[#E07B10] transition-colors cursor-pointer bg-transparent border-none p-0">
            Home
          </button>
          <span>/</span>
          <span className="text-[#E07B10] font-bold">Request a Formal Quote</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Value Prop & Contact Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 font-body text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold text-[#E07B10] bg-white px-3 sm:px-3.5 py-1.5 rounded-full border border-[#E2DFDC] shadow-xs w-fit mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E07B10] animate-pulse" />
              Direct Factory Engineering • KSA
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#1B2B3A] uppercase tracking-tight leading-[0.95] mb-4 sm:mb-5">
              WHY WORK WITH<br />
              <span className="text-[#E07B10]">MODERN ASSETS?</span>
            </h2>

            <p className="font-body text-sm sm:text-base text-[#5C6470] leading-relaxed mb-6 sm:mb-8">
              From custom truck bodies to multi-axle lowbeds — every project gets dedicated engineering oversight, certified materials, and on-time delivery.
            </p>

            {/* Key Assurance Cards */}
            <div className="space-y-3 mb-8 sm:mb-10">
              <div className="flex items-start gap-3.5 bg-white p-3.5 sm:p-4 rounded-xl border border-[#E2DFDC] shadow-xs">
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

              <div className="flex items-start gap-3.5 bg-white p-3.5 sm:p-4 rounded-xl border border-[#E2DFDC] shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#E07B10]/10 text-[#E07B10] flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
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

              <div className="flex items-start gap-3.5 bg-white p-3.5 sm:p-4 rounded-xl border border-[#E2DFDC] shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#E07B10]/10 text-[#E07B10] flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
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
            <div className="bg-[#1B2B3A] text-white p-5 sm:p-6 rounded-2xl border border-[#2A3B4D] shadow-md">
              <span className="font-body text-[10px] tracking-widest uppercase text-[#E07B10] font-bold block mb-3">
                Riyadh Engineering Office
              </span>
              <div className="space-y-3 font-body text-xs sm:text-sm text-[#D1D5DB]">
                <div className="flex items-center gap-3">
                  <span className="text-[#E07B10] flex items-center shrink-0">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <span>Industrial City 2, Riyadh, Kingdom of Saudi Arabia</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#E07B10] flex items-center shrink-0">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  <span>proposals@modern-assets.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#E07B10] flex items-center shrink-0">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.99 5.99l1.01-1.01a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </span>
                  <span>+966 (11) 234-5678 (Toll Free KSA)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Request a Quote Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#E2DFDC] shadow-[0_20px_50px_rgba(27,43,58,0.07)]">
              
              {formState === 'success' ? (
                /* Success State Confirmation */
                <div className="py-10 sm:py-12 px-2 sm:px-4 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E07B10]/15 text-[#E07B10] rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h2 className="font-display font-black text-2xl sm:text-4xl uppercase text-[#1B2B3A] mb-2 sm:mb-3">
                    Email Created & Ready To Send!
                  </h2>
                  <p className="font-body text-sm sm:text-base text-[#5C6470] max-w-lg mx-auto leading-relaxed mb-4">
                    Your email app has been opened with your full specifications pre-written to <strong className="text-[#1B2B3A]">{TARGET_EMAIL}</strong>. Simply click <strong>Send</strong> in your mail app!
                  </p>

                  {/* Direct Launch Buttons */}
                  <div className="bg-[#F8F7F4] border border-[#E2DFDC] rounded-2xl p-4 sm:p-5 max-w-md mx-auto mb-8 text-center">
                    <p className="font-body text-xs font-semibold text-[#1B2B3A] mb-3">Didn't open automatically? Choose your preferred client:</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                      <a
                        href={getGmailComposeLink('New Fleet Quote Request', form)}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#EA4335] text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 transition-opacity no-underline"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.266H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
                        <span>Open in Gmail Web</span>
                      </a>
                      <a
                        href={getMailtoLink('New Fleet Quote Request', form)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1B2B3A] text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#E07B10] transition-colors no-underline"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        <span>Open Default Mail App</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={onBackToHome}
                      className="w-full sm:w-auto font-display font-bold text-sm uppercase tracking-wider bg-[#1B2B3A] hover:bg-[#E07B10] text-white px-7 py-3.5 rounded-full transition-all cursor-pointer shadow-md"
                    >
                      Return to Main Site
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormState('idle')}
                      className="w-full sm:w-auto font-display font-bold text-sm uppercase tracking-wider bg-transparent text-[#5C6470] hover:text-[#1B2B3A] px-5 py-3.5 rounded-full transition-all cursor-pointer"
                    >
                      Submit Another Vehicle Spec
                    </button>
                  </div>
                </div>
              ) : (
                /* Form Inputs */
                <form onSubmit={handleSubmit}>
                  <div className="border-b border-[#E2DFDC] pb-4 sm:pb-6 mb-6 sm:mb-8">
                    <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-[#1B2B3A] m-0">
                      REQUEST A FORMAL FLEET PROPOSAL
                    </h3>
                    <p className="font-body text-xs text-[#5C6470] m-0 mt-1">
                      Fill in your specifications below. Fields marked with an asterisk (*) are required.
                    </p>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    
                    {/* Row 1: Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
                          placeholder="+966 50 123 4567"
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    {/* Row 3: Vehicle Type & Fleet Size */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label style={labelStyle}>Vehicle Platform *</label>
                        <select
                          name="vehicleType"
                          value={form.vehicleType}
                          onChange={handleChange}
                          style={inputStyle}
                        >
                          {VEHICLE_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Required Fleet Size *</label>
                        <select
                          name="fleetSize"
                          value={form.fleetSize}
                          onChange={handleChange}
                          style={inputStyle}
                        >
                          {FLEET_SIZES.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
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
                        {TIMELINES.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    {/* Row 5: Detailed Specifications */}
                    <div>
                      <label style={labelStyle}>Technical Payload / Special Specifications (Optional)</label>
                      <textarea
                        name="specifications"
                        rows={4}
                        value={form.specifications}
                        onChange={handleChange}
                        placeholder="Mention desired payload weight (tons), OEM chassis brand (Mercedes, Volvo, MAN), fluid capacity, hydraulic crane ratings, or extreme duty environments..."
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      {formState === 'error' && (
                        <p role="alert" className="mb-3 text-center text-sm font-medium text-red-600">
                          {formError || 'We couldn’t send your request. Please try again.'}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={formState === 'submitting'}
                        className="w-full bg-[#E07B10] hover:bg-[#C46C0C] disabled:bg-[#8C949C] text-white font-display font-black text-base sm:text-lg tracking-wider uppercase py-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-none flex items-center justify-center gap-2"
                      >
                        {formState === 'submitting' ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>PROCESSING SPECIFICATION DOSSIER...</span>
                          </>
                        ) : (
                          <>
                            <span>SUBMIT & OPEN EMAIL (READY TO SEND)</span>
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </>
                        )}
                      </button>
                      <p className="font-body text-[11px] text-[#8C949C] text-center mt-2.5 mb-0 flex items-center justify-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-[#8C949C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <span>Confidential commercial inquiry. Guaranteed factory non-disclosure.</span>
                      </p>
                    </div>

                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </main>
    </div>
  )
}
