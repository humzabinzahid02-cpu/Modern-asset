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
  icon: string;
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
    icon: '◎',
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
    icon: '⬡',
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
    icon: '⚙',
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
    icon: '⬤',
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
            opacity: 0,
            y: 65,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Stagger inner deliverable items
        const deliverables = card.querySelectorAll('.process-deliverable-item');
        if (deliverables.length > 0) {
          gsap.fromTo(
            deliverables,
            { opacity: 0, x: -14 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.07,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(90px, 12vw, 160px) clamp(20px, 5vw, 80px)',
        backgroundColor: '#0c0c14',
      }}
    >
      {/* Background industrial atmosphere & ambient glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <img
          src="https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=1600&h=900&fit=crop&auto=format"
          alt="Industrial welding fabrication"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.07 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 15% 20%, rgba(245,197,24,0.06) 0%, transparent 60%), radial-gradient(circle at 85% 80%, rgba(245,197,24,0.04) 0%, transparent 60%), linear-gradient(180deg, #0c0c14 0%, rgba(12,12,20,0.85) 50%, #0c0c14 100%)',
          }}
        />

        {/* Subtle grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            opacity: 0.35,
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1240, margin: '0 auto' }}>
        {/* Centered Grand Header with ScrollFloat animation */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 80px)', maxWidth: 900, margin: '0 auto clamp(50px, 8vw, 80px)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 16px',
              borderRadius: 24,
              background: 'rgba(245,197,24,0.08)',
              border: '1px solid rgba(245,197,24,0.25)',
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#F5C518',
                boxShadow: '0 0 10px #F5C518',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                fontSize: 12,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#F5C518',
                fontWeight: 700,
              }}
            >
              Our Engineering Lifecycle
            </span>
          </div>

          {/* Headline using ScrollFloat from React Bits */}
          <ScrollFloat
            animationDuration={1.1}
            ease="back.out(1.8)"
            stagger={0.02}
            textStyle={{
              fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
              fontSize: 'clamp(42px, 6vw, 84px)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: '#ffffff',
            }}
          >
            From Concept To Completion
          </ScrollFloat>

          <p
            style={{
              fontFamily: 'var(--font-body, "Outfit", sans-serif)',
              fontSize: 'clamp(16px, 1.8vw, 19px)',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.7,
              margin: '20px auto 0',
              maxWidth: 720,
            }}
          >
            We follow a streamlined, high-precision engineering process to ensure structural excellence,
            regulatory certification, and turnkey deployment — on time, every time.
          </p>
        </div>

        {/* Expansive Full-Width Process Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3.5vw, 40px)' }}>
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
                  padding: 'clamp(28px, 4.5vw, 48px)',
                  background: isHovered
                    ? 'linear-gradient(135deg, rgba(24, 24, 38, 0.95) 0%, rgba(14, 14, 24, 0.95) 100%)'
                    : 'linear-gradient(135deg, rgba(18, 18, 30, 0.85) 0%, rgba(12, 12, 20, 0.9) 100%)',
                  border: isHovered
                    ? '1px solid rgba(245, 197, 24, 0.45)'
                    : '1px solid rgba(245, 197, 24, 0.16)',
                  boxShadow: isHovered
                    ? '0 20px 60px rgba(0,0,0,0.5), 0 0 35px rgba(245,197,24,0.14)'
                    : '0 8px 32px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(16px)',
                  transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-3px)' : 'none',
                }}
              >
                {/* Top Subtle Gold Accent Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 40,
                    right: 40,
                    height: 1,
                    background: isHovered
                      ? 'linear-gradient(90deg, transparent, #F5C518, transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(245,197,24,0.3), transparent)',
                    transition: 'all 350ms ease',
                  }}
                />

                {/* 2-Column Responsive Card Grid */}
                <div className="process-card-inner-grid">
                  {/* Left Column: Big Step Number, Icon, and ScrollFloat Title */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      {/* Badge and Phase */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 10,
                            background: isHovered
                              ? 'linear-gradient(135deg, #F5C518, #E6A800)'
                              : 'rgba(245,197,24,0.08)',
                            border: '1px solid rgba(245,197,24,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: isHovered ? '0 0 20px rgba(245,197,24,0.4)' : 'none',
                            transition: 'all 300ms ease',
                          }}
                        >
                          <span
                            style={{
                              fontSize: 20,
                              color: isHovered ? '#0c0c14' : '#F5C518',
                              fontWeight: 900,
                              transition: 'color 300ms ease',
                            }}
                          >
                            {step.icon}
                          </span>
                        </div>

                        <div>
                          <div
                            style={{
                              fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                              fontSize: 12,
                              letterSpacing: '0.2em',
                              textTransform: 'uppercase',
                              color: '#F5C518',
                              fontWeight: 700,
                            }}
                          >
                            {step.phase}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                              fontSize: 11,
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: 'rgba(255,255,255,0.4)',
                            }}
                          >
                            {step.badge}
                          </div>
                        </div>
                      </div>

                      {/* Prominent Large Step Number & ScrollFloat Animated Title */}
                      <div style={{ margin: '12px 0 8px' }}>
                        <div
                          style={{
                            display: 'inline-block',
                            padding: '3px 10px',
                            borderRadius: 6,
                            background: 'rgba(245,197,24,0.12)',
                            border: '1px solid rgba(245,197,24,0.3)',
                            fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                            fontSize: 14,
                            fontWeight: 800,
                            letterSpacing: '0.12em',
                            color: '#F5C518',
                            marginBottom: 8,
                          }}
                        >
                          STEP {step.num}
                        </div>

                        {/* Huge Step Title Animated with ScrollFloat */}
                        <ScrollFloat
                          as="h3"
                          animationDuration={0.8}
                          ease="back.out(1.8)"
                          stagger={0.025}
                          textStyle={{
                            fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                            fontSize: 'clamp(38px, 4.8vw, 60px)',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.02em',
                            lineHeight: 1.1,
                            color: '#ffffff',
                            display: 'inline-block',
                          }}
                        >
                          {step.title}
                        </ScrollFloat>
                      </div>
                    </div>

                    {/* Quick Specs Callouts for this step */}
                    <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {step.specs.map((spec, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 14px',
                            borderRadius: 8,
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                              fontSize: 11,
                              letterSpacing: '0.15em',
                              textTransform: 'uppercase',
                              color: 'rgba(245,197,24,0.7)',
                              fontWeight: 700,
                            }}
                          >
                            {spec.label}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                              fontSize: 13,
                              fontWeight: 600,
                              color: '#ffffff',
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
                        fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                        fontSize: 'clamp(18px, 2.2vw, 24px)',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        color: '#F5C518',
                        textTransform: 'uppercase',
                        marginBottom: 12,
                      }}
                    >
                      {step.subtitle}
                    </div>

                    <p
                      style={{
                        fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                        fontSize: 'clamp(15px, 1.5vw, 17px)',
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.75,
                        margin: '0 0 24px',
                      }}
                    >
                      {step.desc}
                    </p>

                    {/* Key Deliverables Checkmarks Grid */}
                    <div
                      style={{
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                        paddingTop: 20,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                          fontSize: 12,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.4)',
                          marginBottom: 12,
                          fontWeight: 700,
                        }}
                      >
                        Core Deliverables & Standards
                      </div>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                          gap: '10px 20px',
                        }}
                      >
                        {step.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="process-deliverable-item"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 10,
                              fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                              fontSize: 13.5,
                              color: 'rgba(255,255,255,0.85)',
                            }}
                          >
                            <span
                              style={{
                                color: '#F5C518',
                                fontSize: 13,
                                flexShrink: 0,
                                width: 18,
                                height: 18,
                                borderRadius: '50%',
                                background: 'rgba(245,197,24,0.1)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              ✓
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
          grid-template-columns: minmax(280px, 360px) 1fr;
          gap: clamp(24px, 4vw, 48px);
          align-items: stretch;
        }

        @media (max-width: 860px) {
          .process-card-inner-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
