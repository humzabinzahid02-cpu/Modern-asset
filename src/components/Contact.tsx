import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

type FormState = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const headingRef = useRef<HTMLDivElement | null>(null)
  const formRef = useRef<HTMLDivElement | null>(null)
  const infoRef = useRef<HTMLDivElement | null>(null)

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    vehicleType: '',
    message: '',
  })
  const [formState, setFormState] = useState<FormState>('idle')

  const VEHICLE_TYPES = [
    'Custom Truck Body',
    'Petroleum Tanker',
    'Low-Bed Trailer',
    'Flat-Bed Trailer',
    'Street Sweeper',
    'Aerial Work Platform',
    'Wrecker / Recovery',
    'Car Carrier',
    'Other / Custom Build',
  ]

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1, x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current.querySelectorAll('.contact-info-item'),
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, el)
    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('sending')
    setTimeout(() => {
      setFormState('success')
      setForm({ name: '', company: '', email: '', phone: '', vehicleType: '', message: '' })
    }, 1600)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#F6F5F1',
    border: '1.5px solid #E2DFDC',
    borderRadius: 10,
    padding: '14px 16px',
    fontFamily: 'Outfit, sans-serif',
    fontSize: 15,
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
    color: '#5C6470',
    marginBottom: 7,
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: '#1B2B3A',
        padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,100px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: -120,
        right: -120,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(224,123,16,0.12) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -80,
        left: -80,
        width: 360,
        height: 360,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(224,123,16,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section heading */}
        <div ref={headingRef} style={{ marginBottom: 64 }}>
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#E07B10',
            marginBottom: 16,
            fontWeight: 700,
          }}>
            Get in Touch
          </div>
          <h2 style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontSize: 'clamp(38px,5vw,72px)',
            fontWeight: 900,
            lineHeight: 0.93,
            textTransform: 'uppercase',
            color: '#FFFFFF',
            margin: '0 0 18px',
          }}>
            Let's Build Your<br />
            <span style={{
              background: 'linear-gradient(90deg, #E07B10 0%, #F5A623 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Vision Together</span>
          </h2>
          <p style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 16,
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.65,
            margin: 0,
            maxWidth: 520,
          }}>
            Tell us about your fleet requirements and our engineering team will respond within 24 hours with a tailored proposal — fixed pricing and guaranteed timelines included.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.35fr',
          gap: 'clamp(40px,6vw,80px)',
          alignItems: 'start',
        }}>

          {/* Left: Info + details */}
          <div ref={infoRef}>
            {/* Info cards */}
            {[
              {
                icon: 'location',
                label: 'Headquarters',
                value: 'Riyadh, Saudi Arabia',
                sub: 'Available across KSA',
              },
              {
                icon: 'email',
                label: 'Email',
                value: 'info@modern-assets.com',
                sub: 'We reply within 24h',
              },
              {
                icon: 'phone',
                label: 'Phone',
                value: '+966 XX XXX XXXX',
                sub: 'Sun – Thu, 8am – 5pm',
              },
              {
                icon: 'clock',
                label: 'Lead Time',
                value: '4–8 Weeks Average',
                sub: 'Depends on specifications',
              },
            ].map(item => (
              <div
                key={item.label}
                className="contact-info-item"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  marginBottom: 28,
                  padding: '20px 22px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14,
                  transition: 'border-color 250ms ease, background 250ms ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(224,123,16,0.4)'
                  ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(224,123,16,0.06)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'
                  ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)'
                }}
              >
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: 'rgba(224,123,16,0.15)',
                  border: '1px solid rgba(224,123,16,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  flexShrink: 0,
                }}>
                  {item.icon === 'location' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E07B10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  )}
                  {item.icon === 'email' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E07B10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  )}
                  {item.icon === 'phone' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E07B10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.99 5.99l1.01-1.01a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  )}
                  {item.icon === 'clock' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E07B10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  )}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: 4,
                    fontWeight: 700,
                  }}>{item.label}</div>
                  <div style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '0.02em',
                    marginBottom: 2,
                  }}>{item.value}</div>
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.45)',
                  }}>{item.sub}</div>
                </div>
              </div>
            ))}

            {/* Trust badges */}
            <div style={{
              marginTop: 12,
              padding: '20px 22px',
              background: 'rgba(224,123,16,0.08)',
              border: '1px solid rgba(224,123,16,0.2)',
              borderRadius: 14,
            }}>
              <div style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#E07B10',
                marginBottom: 12,
                fontWeight: 700,
              }}>Why Choose Us</div>
              {[
                '✓  ISO 9001:2015 Certified Manufacturing',
                '✓  15+ Years Regional Experience',
                '✓  Fixed Pricing & Guaranteed Delivery',
                '✓  24-Hour Engineering Response',
              ].map(badge => (
                <div key={badge} style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.6,
                  marginBottom: 4,
                }}>{badge}</div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div ref={formRef}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: 20,
              padding: 'clamp(32px,4vw,52px)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
            }}>
              {formState === 'success' ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'rgba(224,123,16,0.1)',
                    border: '2px solid #E07B10',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 32,
                    margin: '0 auto 24px',
                  }}>✓</div>
                  <h3 style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: 32,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: '#1B2B3A',
                    margin: '0 0 12px',
                  }}>Request Received!</h3>
                  <p style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 15,
                    color: '#5C6470',
                    lineHeight: 1.65,
                    margin: 0,
                  }}>
                    Our engineering team will review your requirements and reach out within 24 hours with a tailored proposal.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    style={{
                      marginTop: 28,
                      background: 'transparent',
                      border: '1.5px solid #E2DFDC',
                      borderRadius: 8,
                      padding: '10px 24px',
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: 13,
                      color: '#5C6470',
                      cursor: 'pointer',
                      transition: 'all 200ms',
                    }}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: 26,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: '#1B2B3A',
                    marginBottom: 4,
                    letterSpacing: '0.03em',
                  }}>Request a Quote</div>
                  <p style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 13,
                    color: '#5C6470',
                    lineHeight: 1.6,
                    margin: '-8px 0 4px',
                  }}>
                    Fill in your details below and our team will get back to you within 24 hours.
                  </p>

                  {/* Name + Company */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Ahmed Al-Rashidi"
                        style={inputStyle}
                        onFocus={e => {
                          e.target.style.borderColor = '#E07B10'
                          e.target.style.boxShadow = '0 0 0 3px rgba(224,123,16,0.12)'
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = '#E2DFDC'
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Company</label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Al-Rashidi Transport Co."
                        style={inputStyle}
                        onFocus={e => {
                          e.target.style.borderColor = '#E07B10'
                          e.target.style.boxShadow = '0 0 0 3px rgba(224,123,16,0.12)'
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = '#E2DFDC'
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="ahmed@company.com"
                        style={inputStyle}
                        onFocus={e => {
                          e.target.style.borderColor = '#E07B10'
                          e.target.style.boxShadow = '0 0 0 3px rgba(224,123,16,0.12)'
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = '#E2DFDC'
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+966 5X XXX XXXX"
                        style={inputStyle}
                        onFocus={e => {
                          e.target.style.borderColor = '#E07B10'
                          e.target.style.boxShadow = '0 0 0 3px rgba(224,123,16,0.12)'
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = '#E2DFDC'
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Vehicle Type */}
                  <div>
                    <label style={labelStyle}>Vehicle / Product Type</label>
                    <select
                      name="vehicleType"
                      value={form.vehicleType}
                      onChange={handleChange}
                      style={{
                        ...inputStyle,
                        cursor: 'pointer',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235C6470' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                        paddingRight: 44,
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#E07B10'
                        e.target.style.boxShadow = '0 0 0 3px rgba(224,123,16,0.12)'
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = '#E2DFDC'
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      <option value="">Select a product type...</option>
                      {VEHICLE_TYPES.map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>Project Requirements</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe your payload requirements, fleet size, delivery timeline, or any specific engineering needs..."
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                        minHeight: 110,
                        lineHeight: 1.6,
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#E07B10'
                        e.target.style.boxShadow = '0 0 0 3px rgba(224,123,16,0.12)'
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = '#E2DFDC'
                        e.target.style.boxShadow = 'none'
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    style={{
                      width: '100%',
                      padding: '16px 32px',
                      background: formState === 'sending'
                        ? '#C46E0E'
                        : 'linear-gradient(135deg, #E07B10 0%, #C46E0E 100%)',
                      border: 'none',
                      borderRadius: 12,
                      fontFamily: 'Barlow Condensed, sans-serif',
                      fontSize: 17,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#FFFFFF',
                      cursor: formState === 'sending' ? 'not-allowed' : 'pointer',
                      transition: 'all 250ms ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      opacity: formState === 'sending' ? 0.8 : 1,
                      boxShadow: '0 8px 24px rgba(224,123,16,0.35)',
                    }}
                    onMouseEnter={e => {
                      if (formState !== 'sending') {
                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
                        ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 32px rgba(224,123,16,0.45)'
                      }
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.transform = 'none'
                      ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(224,123,16,0.35)'
                    }}
                  >
                    {formState === 'sending' ? (
                      <>
                        <span style={{
                          width: 18, height: 18,
                          border: '2px solid rgba(255,255,255,0.4)',
                          borderTopColor: '#fff',
                          borderRadius: '50%',
                          animation: 'spin 700ms linear infinite',
                          display: 'inline-block',
                        }} />
                        Sending Request...
                      </>
                    ) : (
                      <>Send Request →</>
                    )}
                  </button>

                  <p style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '11px',
                    color: '#8C949C',
                    textAlign: 'center',
                    margin: '-8px 0 0',
                  }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8C949C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      Your information is secure and will never be shared.
                    </span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #contact > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder, textarea::placeholder {
          color: #A0A8B0;
        }
        select option {
          color: #1B2B3A;
          background: #fff;
        }
      `}</style>
    </section>
  )
}
