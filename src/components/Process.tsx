import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from './ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

interface StepItem {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
  phase: string;
  badge: string;
  deliverables: string[];
  specs: { label: string; val: string }[];
}

const STEPS: StepItem[] = [
  {
    num: '01',
    title: 'Consultation',
    subtitle: 'Operational Assessment & Regulatory Architecture',
    desc: 'We conduct deep engineering discovery into your operational payload demands, duty-cycle parameters, regional DOT/EPA regulations, and fleet integration needs before cutting a single sheet of steel.',
    icon: (
      <svg className="w-4 h-4 text-[#E07B10]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
    phase: 'Phase 1 • Weeks 1-2',
    badge: 'Discovery & Audit',
    deliverables: [
      'Payload & Axle Weight Distribution Profiling',
      'DOT & Regional Road Compliance Review',
      'Route Feasibility & Low-Clearance Mapping',
      'Guaranteed Fixed Pricing & Delivery Schedule',
    ],
    specs: [
      { label: 'DISCOVERY', val: 'Turnkey Feasibility' },
      { label: 'COMPLIANCE', val: 'DOT / FMVSS Ready' },
    ],
  },
  {
    num: '02',
    title: 'Design',
    subtitle: 'Parametric 3D CAD & FEA Stress Modeling',
    desc: 'Our mechanical aerospace and heavy-equipment engineers construct full-fidelity 3D SolidWorks models, running rigorous Finite Element Analysis (FEA) to maximize structural rigidity while trimming deadweight.',
    icon: (
      <svg className="w-4 h-4 text-[#E07B10]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    phase: 'Phase 2 • Weeks 3-4',
    badge: '3D Simulation',
    deliverables: [
      'Parametric SolidWorks 3D CAD Modeling',
      'Finite Element Analysis (FEA) Stress Testing',
      'Custom Hydraulic & Electrical Wire Routing',
      'Full Interactive 3D Model Client Sign-Off',
    ],
    specs: [
      { label: 'TOLERANCE', val: '±0.5mm Precision' },
      { label: 'SIMULATION', val: '100% FEA Validated' },
    ],
  },
  {
    num: '03',
    title: 'Fabrication',
    subtitle: 'Robotic CNC, Certified Metallurgy & Mil-Spec Coating',
    desc: 'Manufacturing occurs in our ISO 9001:2015 facility utilizing ultra-high-power fiber laser cutting, precision CNC press brakes, AWS D1.1 certified robotic welding, and multi-stage anti-corrosion urethane finishes.',
    icon: (
      <svg className="w-4 h-4 text-[#E07B10]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    phase: 'Phase 3 • Weeks 5-7',
    badge: 'Heavy Fabrication',
    deliverables: [
      'High-Yield Hardox® / Domex® High-Tensile Steel',
      'AWS D1.1 Certified Multi-Pass MIG/TIG Welds',
      'Multi-Stage Epoxy Zinc Primer & UV Polyurethane',
      'Laser-Calibrated Alignment & Deflection Checks',
    ],
    specs: [
      { label: 'STEEL GRADE', val: 'Hardox® 450 / Domex' },
      { label: 'WELD CERT', val: 'AWS D1.1 / ISO 3834' },
    ],
  },
  {
    num: '04',
    title: 'Delivery',
    subtitle: 'Dynamic Load Testing, Final Certification & Fleet Handover',
    desc: 'Every completed asset undergoes multi-point dynamic road trials, hydraulic pressure proofing, and full regulatory certification before turnkey transport to your depot with full schematics and operational documentation.',
    icon: (
      <svg className="w-4 h-4 text-[#E07B10]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    phase: 'Phase 4 • Week 8',
    badge: 'Turnkey Handover',
    deliverables: [
      'Dynamic Highway & Off-Road Load Certification',
      'Complete Hydraulic & Electrical Schematics Packet',
      'DOT Safety Compliance Identification Plate',
      'Comprehensive 3-Year Fleet Warranty & Support',
    ],
    specs: [
      { label: 'DEPLOYMENT', val: 'Turnkey Field-Ready' },
      { label: 'WARRANTY', val: '3-Year Fleet Protection' },
    ],
  },
];

export default function Process() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      STEPS.forEach((step) => {
        const card = document.getElementById(`process-step-${step.num}`);
        if (!card) return;

        // Card entrance animation as you scroll to each step
        gsap.fromTo(
          card,
          {
            opacity: 0.1,
            y: 35,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
            onComplete: () => {
              gsap.set(card, { clearProps: 'opacity,transform' });
            },
          }
        );

        // Stagger inner deliverable items
        const deliverables = card.querySelectorAll('.process-deliverable-item');
        if (deliverables.length > 0) {
          gsap.fromTo(
            deliverables,
            { opacity: 0.2, x: -8 },
            {
              opacity: 1,
              x: 0,
              duration: 0.45,
              stagger: 0.04,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, el);

    // Safeguard: ensure cards are visible even if ScrollTrigger didn't fire
    const safetyTimer = setTimeout(() => {
      STEPS.forEach((step) => {
        const card = document.getElementById(`process-step-${step.num}`);
        if (card) {
          card.style.opacity = '1';
          card.style.transform = 'none';
          const deliverables = card.querySelectorAll('.process-deliverable-item');
          deliverables.forEach((d) => {
            (d as HTMLElement).style.opacity = '1';
          });
        }
      });
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(safetyTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(60px, 9vw, 140px) clamp(16px, 4vw, 80px)',
        backgroundColor: '#F6F5F1',
      }}
    >
      {/* Background industrial atmosphere & ambient glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <img
          src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=1600&h=900&fit=crop&auto=format"
          alt="Industrial welding fabrication"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.04 }}
        />
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '-10%',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(224,123,16,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Centered Grand Header with ScrollFloat animation */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 70px)', maxWidth: 900, margin: '0 auto clamp(40px, 6vw, 70px)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 14px',
              borderRadius: 24,
              background: 'rgba(229,154,35,0.12)',
              border: '1px solid rgba(229,154,35,0.3)',
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#E07B10',
                boxShadow: '0 0 8px #E07B10',
              }}
            />
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#E07B10',
                fontWeight: 700,
              }}
            >
              Our Engineering Lifecycle
            </span>
          </div>

          {/* Headline using ScrollFloat from React Bits */}
          <ScrollFloat
            animationDuration={1.0}
            ease="back.out(1.8)"
            stagger={0.02}
            textStyle={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(36px, 5.5vw, 76px)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: '#1B2B3A',
            }}
          >
            From Concept To Completion
          </ScrollFloat>

          <p
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(14px, 1.5vw, 17px)',
              color: '#5C6470',
              lineHeight: 1.65,
              margin: '16px auto 0',
              maxWidth: 680,
            }}
          >
            We follow a streamlined, high-precision engineering process to ensure structural excellence,
            regulatory certification, and turnkey deployment - on time, every time.
          </p>
        </div>

        {/* Expansive Full-Width Process Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vw, 36px)' }}>
          {STEPS.map((step, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={step.num}
                id={`process-step-${step.num}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  position: 'relative',
                  borderRadius: 20,
                  padding: 'clamp(20px, 4vw, 44px)',
                  background: '#FFFFFF',
                  border: isHovered
                    ? '1px solid #E07B10'
                    : '1px solid #E2DFDC',
                  boxShadow: isHovered
                    ? '0 16px 40px rgba(229,154,35,0.12), 0 4px 12px rgba(23,50,77,0.04)'
                    : '0 8px 24px rgba(23,50,77,0.04)',
                  transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-3px)' : 'none',
                }}
              >
                {/* Top Subtle Gold Accent Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 36,
                    right: 36,
                    height: 2,
                    background: isHovered
                      ? 'linear-gradient(90deg, transparent, #E07B10, transparent)'
                      : 'transparent',
                    transition: 'all 300ms ease',
                  }}
                />

                <div className="process-card-inner-grid">
                  {/* Left Column: Phase badge, Step Number, and Quick Specs */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRight: '1px solid #E2DFDC',
                      paddingRight: 'clamp(16px, 3vw, 36px)',
                    }}
                    className="process-card-left-col"
                  >
                    <div>
                      {/* Phase metadata and stage tag */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 12,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: 11,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#8C949C',
                            fontWeight: 600,
                          }}
                        >
                          {step.phase}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#E07B10]/10">{step.icon}</span>
                          <div
                            style={{
                              fontFamily: 'Poppins, sans-serif',
                              fontSize: 10,
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.12em',
                              padding: '2px 8px',
                              borderRadius: 4,
                              background: '#F6F5F1',
                              color: '#1B2B3A',
                            }}
                          >
                            {step.badge}
                          </div>
                        </div>
                      </div>

                      {/* Prominent Large Step Number & Title */}
                      <div style={{ margin: '8px 0' }}>
                        <div
                          style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: 6,
                            background: 'rgba(229,154,35,0.12)',
                            border: '1px solid rgba(229,154,35,0.3)',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: 13,
                            fontWeight: 800,
                            letterSpacing: '0.12em',
                            color: '#E07B10',
                            marginBottom: 6,
                          }}
                        >
                          STEP {step.num}
                        </div>

                        {/* Step Title Animated with ScrollFloat */}
                        <ScrollFloat
                          as="h3"
                          animationDuration={0.8}
                          ease="back.out(1.8)"
                          stagger={0.02}
                          textStyle={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: 'clamp(32px, 4vw, 54px)',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.02em',
                            lineHeight: 1.05,
                            color: '#1B2B3A',
                            display: 'inline-block',
                          }}
                        >
                          {step.title}
                        </ScrollFloat>
                      </div>
                    </div>

                    {/* Quick Specs Callouts for this step */}
                    <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {step.specs.map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '6px 12px',
                            borderRadius: 8,
                            background: '#F6F5F1',
                            border: '1px solid #E2DFDC',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'Poppins, sans-serif',
                              fontSize: 11,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: '#5C6470',
                              fontWeight: 700,
                            }}
                          >
                            {spec.label}
                          </span>
                          <span
                            style={{
                              fontFamily: 'Poppins, sans-serif',
                              fontSize: 12,
                              fontWeight: 700,
                              color: '#1B2B3A',
                            }}
                          >
                            {spec.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Subtitle, Comprehensive Body, and Deliverables */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 'clamp(16px, 2vw, 22px)',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        color: '#E07B10',
                        textTransform: 'uppercase',
                        marginBottom: 10,
                      }}
                    >
                      {step.subtitle}
                    </div>

                    <p
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 'clamp(13.5px, 1.4vw, 16px)',
                        color: '#5C6470',
                        lineHeight: 1.7,
                        margin: '0 0 20px',
                      }}
                    >
                      {step.desc}
                    </p>

                    {/* Key Deliverables Checkmarks Grid */}
                    <div
                      style={{
                        borderTop: '1px solid #E2DFDC',
                        paddingTop: 16,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: 11,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: '#1B2B3A',
                          marginBottom: 10,
                          fontWeight: 700,
                        }}
                      >
                        Core Deliverables & Standards
                      </div>
                      <div className="process-deliverables-grid">
                        {step.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="process-deliverable-item"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              fontFamily: 'Poppins, sans-serif',
                              fontSize: 13,
                              color: '#5C6470',
                            }}
                          >
                            <span
                              style={{
                                color: '#E07B10',
                                flexShrink: 0,
                                width: 18,
                                height: 18,
                                borderRadius: '50%',
                                background: 'rgba(229,154,35,0.12)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <svg className="w-2.5 h-2.5 text-[#E07B10]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .process-card-inner-grid {
          display: grid;
          grid-template-columns: minmax(260px, 340px) 1fr;
          gap: clamp(20px, 3.5vw, 40px);
          align-items: stretch;
        }

        .process-deliverables-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px 16px;
        }

        @media (min-width: 640px) {
          .process-deliverables-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 860px) {
          .process-card-inner-grid {
            grid-template-columns: 1fr;
          }
          .process-card-left-col {
            border-right: none !important;
            border-bottom: 1px solid #E2DFDC;
            padding-right: 0 !important;
            padding-bottom: 20px;
          }
        }
      `}</style>
    </section>
  );
}
