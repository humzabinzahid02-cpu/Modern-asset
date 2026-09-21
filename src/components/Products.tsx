import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollExpand from './ScrollExpand'
import ScrollStack, { ScrollStackItem } from './ScrollStack'
import StickyCard002 from './StickyCard002'
import GlassButton from '../GlassButton'

gsap.registerPlugin(ScrollTrigger)

export interface ProductDetail {
  id: string
  name: string
  tag: string
  category: string
  desc: string
  img: string
  specs: { label: string; value: string }[]
  features: string[]
  leadTime: string
}

const PRODUCTS_DATA: ProductDetail[] = [
  {
    id: 'tankers',
    name: 'Precision Tankers',
    tag: 'Liquid Transport',
    category: 'transport',
    desc: 'Fuel, petroleum, chemical, and potable water tankers engineered to SASO, ADR, and ISO standards with multi-compartment baffles.',
    img: 'https://images.unsplash.com/photo-1745441062417-5d0fbfcbf48f?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Payload Capacity', value: '32,000L - 55,000L' },
      { label: 'Chassis Alloy', value: '304/316 Stainless or Al-5182' },
      { label: 'Compartments', value: '1 to 5 Multi-Chamber' },
      { label: 'Certifications', value: 'ADR • SASO • ISO 9001' },
    ],
    features: [
      'Pneumatic bottom-loading safety manifold',
      'Electronic vapor recovery & overfill sensors',
      'BPW air suspension with front lift axle',
      'Anti-corrosion robotic interior weld seams',
    ],
    leadTime: '3 - 5 Weeks',
  },
  {
    id: 'lowbed',
    name: 'Heavy-Duty Low-Bed Trailers',
    tag: 'Heavy Haul',
    category: 'heavy',
    desc: 'Engineered for extreme abnormal load transport, earthmoving machinery, transformers, and industrial plant relocation.',
    img: 'https://images.unsplash.com/photo-1577075473292-5f62dfae5522?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Payload Rating', value: '60 - 150 Metric Tons' },
      { label: 'Axle Configuration', value: '3, 4, 5 & 6-Axle Hydraulic' },
      { label: 'Deck Profile', value: 'Extendable Drop Deck' },
      { label: 'Ramp System', value: 'Heavy Hydraulic Bi-Fold' },
    ],
    features: [
      'High-tensile Strenx 700MC steel construction',
      'Hydraulic steering axles with wireless remote override',
      'Outrigger brackets for wide load accommodation',
      'Integrated heavy-duty lashing points every 500mm',
    ],
    leadTime: '4 - 6 Weeks',
  },
  {
    id: 'flatbed',
    name: 'Reinforced Flat-Bed Trailers',
    tag: 'General Freight',
    category: 'heavy',
    desc: 'High-payload commercial transport platforms featuring versatile container twist-locks, removable stanchions, and reinforced headboards.',
    img: 'https://images.unsplash.com/photo-1626121300305-def4dc305387?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Deck Length', value: '12.5m - 14.5m Standard' },
      { label: 'Payload Capacity', value: '45 - 60 Metric Tons' },
      { label: 'Flooring', value: 'Hardwood or Checkered Steel' },
      { label: 'Twist Locks', value: '12x Retractable ISO Units' },
    ],
    features: [
      'Heavy-duty I-beam fabricated chassis with camber pre-stressing',
      'Full LED hermetically sealed lighting harness',
      'Dual spare wheel carrier with winch mechanism',
      'Certified front impact collision bulkhead',
    ],
    leadTime: '2 - 4 Weeks',
  },
  {
    id: 'truckbodies',
    name: 'Custom Truck Bodies',
    tag: 'Custom Build',
    category: 'custom',
    desc: 'Bespoke cargo boxes, refrigerated insulated units, curtain-siders, and tipper bodies custom manufactured onto any OEM chassis.',
    img: 'https://images.unsplash.com/photo-1778103617525-76877c583fa5?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Body Volume', value: '18m³ - 65m³ Available' },
      { label: 'Side Wall Spec', value: 'Reinforced Monocoque Panels' },
      { label: 'Tail Lift', value: '1,500kg - 3,000kg Hydraulic' },
      { label: 'Chassis Match', value: 'Mercedes, Volvo, MAN, Scania' },
    ],
    features: [
      'Aerodynamic roof radius reducing fuel consumption by up to 7%',
      'Heavy-duty floor substructure with galvanized crossmembers',
      'Flush-mount internal cargo track tie-down systems',
      'Custom exterior paint with UV-resistant clear coat',
    ],
    leadTime: '2 - 3 Weeks',
  },
  {
    id: 'sweepers',
    name: 'Industrial Road Sweepers',
    tag: 'Municipal',
    category: 'municipal',
    desc: 'High-performance regenerative-air and mechanical vacuum road sweepers for municipalities, airports, and construction sites.',
    img: 'https://images.unsplash.com/photo-1782421932252-dbca02aae506?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Hopper Volume', value: '6.0m³ - 9.0m³ Capacity' },
      { label: 'Sweeping Width', value: 'Up to 3,600mm Dual Gutter' },
      { label: 'Water Tank', value: '1,500L Dust Suppression' },
      { label: 'Auxiliary Engine', value: 'Tier 4 / Stage V Diesel' },
    ],
    features: [
      'High-vacuum impeller with variable speed hydraulic drive',
      'Dual steer camera system with cabin telemetry screen',
      'High-pressure front spray bar and handheld washdown lance',
      'Stainless steel debris hopper with automatic wash-out nozzle',
    ],
    leadTime: '4 - 6 Weeks',
  },
  {
    id: 'wreckers',
    name: 'Heavy Recovery Wreckers',
    tag: 'Recovery',
    category: 'municipal',
    desc: 'Rotator boom and slide-back recovery vehicles designed for severe highway clearing, overturn recovery, and heavy vehicle towing.',
    img: 'https://images.unsplash.com/photo-1768759579422-91cf6f113de1?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Boom Capacity', value: '30 - 75 Ton Continuous' },
      { label: 'Underlift Rating', value: '16,000kg Retracted' },
      { label: 'Winches', value: 'Dual 25,000kg Planetary' },
      { label: 'Rotation', value: '360° Continuous Bearing' },
    ],
    features: [
      'Wireless proportional remote control for all hydraulic functions',
      'Outrigger pads with integrated ground pressure sensors',
      'Complete towing adapter suite for buses and articulated trucks',
      'Full emergency strobe perimeter illumination suite',
    ],
    leadTime: '6 - 8 Weeks',
  },
  {
    id: 'aerial',
    name: 'Aerial Work Platforms',
    tag: 'Elevated Work',
    category: 'custom',
    desc: 'Insulated articulated boom and telescopic cherry pickers for power line maintenance, civil infrastructure, and telecommunications.',
    img: 'https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Working Height', value: '14m - 42m Elevation' },
      { label: 'Basket Capacity', value: '250kg - 450kg (2-Person)' },
      { label: 'Insulation Rating', value: 'Up to 69kV Dielectric' },
      { label: 'Rotation', value: 'Continuous 360° Turntable' },
    ],
    features: [
      'Zero-tailswing boom geometry for tight urban corridor access',
      'Automatic leveling fiberglass basket with emergency ground controls',
      'Hydraulic tool circuit outlets in basket',
      'Certified EN 280 / ANSI A92.2 compliance inspection',
    ],
    leadTime: '4 - 6 Weeks',
  },
  {
    id: 'carriers',
    name: 'Multi-Level Car Carriers',
    tag: 'Auto Logistics',
    category: 'transport',
    desc: 'High-density multi-vehicle transporter trailers with hydraulic lifting decks, low angle drive-on ramps, and car tie-down chocks.',
    img: 'https://images.unsplash.com/photo-1766561994067-dbd575e1cff2?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Vehicle Capacity', value: '6 to 10 Passenger Cars' },
      { label: 'Deck Control', value: 'Multi-Valve Hydraulic Lift' },
      { label: 'Ramp Angle', value: 'Ultra-Low 8° Drive-On' },
      { label: 'Gross Weight', value: 'Up to 38,000kg' },
    ],
    features: [
      'Perforated galvanized decking with heavy safety grip punchings',
      'Hydraulic deck locks with mechanical secondary fail-safes',
      'Adjustable wheel stops and ratchet tensioners included',
      'Protected undercarriage hydraulics with zinc-nickel hard piping',
    ],
    leadTime: '3 - 5 Weeks',
  },
  {
    id: 'custom',
    name: 'Bespoke Vehicle Engineering',
    tag: 'Bespoke',
    category: 'custom',
    desc: 'Custom special-purpose builds: mobile clinics, command centers, explosive transport, lubrication trucks, and mining service vehicles.',
    img: 'https://images.unsplash.com/photo-1455165814004-1126a7199f9b?w=1200&h=800&fit=crop&auto=format',
    specs: [
      { label: 'Engineering', value: 'FEA Stress Analysis & CAD' },
      { label: 'Chassis Mod', value: 'Wheelbase Extension / Drop' },
      { label: 'Power Systems', value: 'Integrated Generators / Solar' },
      { label: 'Custom Systems', value: 'HVAC, Hydraulic & Pneumatic' },
    ],
    features: [
      'End-to-end custom design from blank page to road registration',
      'Turnkey equipment integration with automated control PLC',
      'Comprehensive operator manuals and technical training',
      'On-site field commissioning and lifecycle spares support',
    ],
    leadTime: 'Inquire',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Fleet' },
  { id: 'transport', label: 'Liquid & Freight' },
  { id: 'heavy', label: 'Heavy Haul & Trailers' },
  { id: 'municipal', label: 'Municipal & Wreckers' },
  { id: 'custom', label: 'Custom & Elevated' },
]

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack')
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filteredProducts = PRODUCTS_DATA.filter((p) =>
    activeCategory === 'all' ? true : p.category === activeCategory
  )
  const gridCardsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (viewMode !== 'grid') return
    const el = gridCardsRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll('.grid-product-card')
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, el)

    return () => ctx.revert()
  }, [viewMode, activeCategory])

  return (
    <section id="products" style={{ background: '#F6F5F1', position: 'relative' }}>
      {/* ── React Bits <ScrollExpand /> Integration ─────────────────────────────── */}
      <div style={{ position: 'relative', width: '100%', marginBottom: 60 }}>
        <ScrollExpand
          src="https://images.unsplash.com/photo-1577075473292-5f62dfae5522?w=1920&h=1080&fit=crop&auto=format"
          alt="Modern Assets Heavy Fleet Expansion"
          title="BUILT FOR EVERY INDUSTRY"
          scrollHint="SCROLL TO EXPAND FLEET ↓"
          startWidth={44}
          startHeight={60}
          startRadius={24}
          endRadius={0}
          mediaZoom={1.35}
          scrollDistance={1.1}
          holdDistance={0.35}
          smoothing={0.12}
          overlayScrim={0.5}
          useWindowScroll={true}
        >
          {/* Content that fades in over the media once it reaches full bleed */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: 960,
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 18px',
                borderRadius: '9999px',
                background: 'rgba(229,154,35,0.18)',
                border: '1px solid rgba(229,154,35,0.45)',
                backdropFilter: 'blur(12px)',
                fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                fontSize: '11px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#E07B10',
                marginBottom: 16,
              }}
            >
              <span>CHAPTER 02</span>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>HEAVY-DUTY COMMERCIAL FLEET</span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                fontSize: 'clamp(36px, 6vw, 76px)',
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 0.95,
                margin: '0 0 16px',
                color: '#ffffff',
                textShadow: '0 4px 24px rgba(0,0,0,0.7)',
              }}
            >
              ENGINEERED FOR <span style={{ color: '#E07B10' }}>EXTREME PAYLOADS</span>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                fontSize: 'clamp(14px, 1.6vw, 18px)',
                fontWeight: 300,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.85)',
                maxWidth: 620,
                margin: '0 0 28px',
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
              }}
            >
              From certified ADR chemical tankers to 150-ton hydraulic low-bed trailers, our heavy
              commercial solutions are forged for unyielding performance and absolute durability.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <GlassButton
                variant="gold"
                size="lg"
                onClick={() => {
                  const target = document.getElementById('catalog-cards')
                  if (target) target.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Inspect Fleet Catalog ↓
              </GlassButton>
              <GlassButton
                variant="ghost"
                size="lg"
                onClick={() => {
                  const target = document.getElementById('contact')
                  if (target) target.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Request Custom Blueprint →
              </GlassButton>
            </div>
          </div>
        </ScrollExpand>
      </div>

      {/* ── Big Cards Product Catalog ─────────────────────────────────────────── */}
      <div id="catalog-cards" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px) 120px' }}>
        {/* Section Header & Filters */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                  fontSize: '11px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#E07B10',
                  marginBottom: 8,
                  fontWeight: 600,
                }}
              >
                Precision Fleet Catalog
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  margin: 0,
                  color: '#1B2B3A',
                }}
              >
                Tailored for Every Sector
              </h3>
            </div>

            {/* Filter Pills & View Switcher */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 12,
              }}
            >
              {/* Category filters */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  background: '#FFFFFF',
                  padding: '6px',
                  borderRadius: '16px',
                  border: '1px solid #E2DFDC',
                  boxShadow: '0 2px 10px rgba(23,50,77,0.03)',
                }}
              >
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '10px',
                        fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                        fontSize: '14px',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        border: 'none',
                        outline: 'none',
                        transition: 'all 200ms ease',
                        background: isActive ? '#E07B10' : 'transparent',
                        color: isActive ? '#FFFFFF' : '#5C6470',
                        boxShadow: isActive ? '0 2px 10px rgba(229,154,35,0.3)' : 'none',
                      }}
                    >
                      {cat.label}
                    </button>
                  )
                })}
              </div>

              {/* View Switcher: 3D ScrollStack vs 2-Column Grid */}
              <div
                style={{
                  display: 'flex',
                  gap: 6,
                  background: '#FFFFFF',
                  padding: '5px',
                  borderRadius: '14px',
                  border: '1px solid #E2DFDC',
                  boxShadow: '0 2px 10px rgba(23,50,77,0.03)',
                }}
              >
                <button
                  onClick={() => setViewMode('stack')}
                  style={{
                    padding: '7px 16px',
                    borderRadius: '9px',
                    fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                    transition: 'all 200ms ease',
                    background: viewMode === 'stack' ? '#E07B10' : 'transparent',
                    color: viewMode === 'stack' ? '#FFFFFF' : '#5C6470',
                    boxShadow: viewMode === 'stack' ? '0 2px 10px rgba(229,154,35,0.3)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>☰</span>
                  <span>3D ScrollStack</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '7px 16px',
                    borderRadius: '9px',
                    fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                    transition: 'all 200ms ease',
                    background: viewMode === 'grid' ? '#E07B10' : 'transparent',
                    color: viewMode === 'grid' ? '#FFFFFF' : '#5C6470',
                    boxShadow: viewMode === 'grid' ? '0 2px 10px rgba(229,154,35,0.3)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>⊞</span>
                  <span>2-Column Grid</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── View Mode: 3D StickyCard002 Stack or 2-Column Grid ────────────────────────── */}
        {viewMode === 'stack' ? (
          <div style={{ position: 'relative', width: '100%', maxWidth: 1160, margin: '0 auto' }}>
            <StickyCard002
              cards={filteredProducts}
              containerClassName="max-w-5xl"
              renderCard={(p) => (
                <div
                  onClick={() => setSelectedProduct(p)}
                  className="stack-card-inner"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(320px, 1.15fr) 1fr',
                    height: '100%',
                    minHeight: 480,
                    cursor: 'pointer',
                    background: '#FFFFFF',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    border: '1px solid #E2DFDC',
                    boxShadow: '0 20px 50px rgba(23, 50, 77, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
                    transition: 'border-color 200ms ease, box-shadow 200ms ease',
                  }}
                >
                  {/* Left side: Massive Vehicle Image */}
                  <div
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      height: '100%',
                      minHeight: 320,
                      backgroundColor: '#F6F5F1',
                    }}
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(23,50,77,0.05) 0%, rgba(23,50,77,0.55) 100%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 18,
                        left: 18,
                        fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                        background: '#E07B10',
                        padding: '5px 14px',
                        borderRadius: '6px',
                        boxShadow: '0 2px 8px rgba(229,154,35,0.35)',
                      }}
                    >
                      {p.tag}
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        top: 18,
                        right: 18,
                        fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#1B2B3A',
                        background: '#FFFFFF',
                        boxShadow: '0 2px 8px rgba(23,50,77,0.1)',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        border: '1px solid #E2DFDC',
                        fontWeight: 600,
                      }}
                    >
                      Click to Expand ⤢
                    </div>
                  </div>

                  {/* Right side: Detailed Specs & Controls */}
                  <div
                    style={{
                      padding: '36px 36px 40px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      background: '#FFFFFF',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                        fontSize: '11px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#5C6470',
                        marginBottom: 8,
                        fontWeight: 600,
                      }}
                    >
                      Build Lead Time: {p.leadTime}
                    </div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                        fontSize: 'clamp(32px, 4vw, 42px)',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        color: '#1B2B3A',
                        margin: '0 0 12px',
                        lineHeight: 1,
                      }}
                    >
                      {p.name}
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                        fontSize: '14px',
                        color: '#5C6470',
                        lineHeight: 1.65,
                        margin: '0 0 24px',
                      }}
                    >
                      {p.desc}
                    </p>

                    {/* Specs Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 12,
                        padding: '16px',
                        borderRadius: '12px',
                        background: '#F6F5F1',
                        border: '1px solid #E2DFDC',
                        marginBottom: 28,
                      }}
                    >
                      {p.specs.map((s, idx) => (
                        <div key={idx}>
                          <div
                            style={{
                              fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                              fontSize: '11px',
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: '#5C6470',
                              marginBottom: 2,
                            }}
                          >
                            {s.label}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                              fontSize: '17px',
                              fontWeight: 800,
                              color: '#1B2B3A',
                            }}
                          >
                            {s.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: 12 }}>
                      <GlassButton
                        variant="gold"
                        size="md"
                        style={{ flex: 1 }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation()
                          setSelectedProduct(p)
                        }}
                      >
                        Inspect Specs →
                      </GlassButton>
                      <GlassButton
                        variant="ghost"
                        size="md"
                        style={{ flex: 1 }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation()
                          const contactEl = document.getElementById('contact')
                          if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' })
                        }}
                      >
                        Inquire Quote
                      </GlassButton>
                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        ) : (
          /* Big Product Cards Grid - Centered 2 Cards Layout */
          <div
            ref={gridCardsRef}
            className="products-2col-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '40px 36px',
              maxWidth: 1220,
              margin: '0 auto',
              width: '100%',
            }}
          >
            {filteredProducts.map((p) => {
              const isHovered = hoveredId === p.id
              return (
                <div
                  key={p.id}
                  className="grid-product-card"
                  onClick={() => setSelectedProduct(p)}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    position: 'relative',
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: isHovered
                      ? '1px solid #E07B10'
                      : '1px solid #E2DFDC',
                    boxShadow: isHovered
                      ? '0 20px 48px rgba(229,154,35,0.15)'
                      : '0 4px 20px rgba(23,50,77,0.04)',
                    transform: isHovered ? 'translateY(-8px) scale(1.015)' : 'translateY(0) scale(1)',
                    transition: 'all 320ms cubic-bezier(0.22, 1, 0.36, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Visual Image Banner (Bigger 16:9.5 Aspect) */}
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '16/9.5',
                      minHeight: 280,
                      overflow: 'hidden',
                      backgroundColor: '#F6F5F1',
                    }}
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                        transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    />

                    {/* Gradient Scrim */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(23,50,77,0.05) 0%, rgba(23,50,77,0.4) 100%)',
                      }}
                    />

                    {/* Category Badge */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 18,
                        left: 18,
                        fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                        background: '#E07B10',
                        padding: '5px 14px',
                        borderRadius: '6px',
                        boxShadow: '0 2px 8px rgba(229,154,35,0.35)',
                      }}
                    >
                      {p.tag}
                    </div>

                    {/* Lead Time indicator */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 18,
                        right: 18,
                        fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#1B2B3A',
                        background: '#FFFFFF',
                        boxShadow: '0 2px 8px rgba(23,50,77,0.1)',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: '1px solid #E2DFDC',
                        fontWeight: 600,
                      }}
                    >
                      Build: {p.leadTime}
                    </div>

                    {/* Expand Cue on Hover */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 18,
                        right: 18,
                        fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#E07B10',
                        background: '#FFFFFF',
                        boxShadow: '0 2px 8px rgba(23,50,77,0.1)',
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: '1px solid #E2DFDC',
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateY(0)' : 'translateY(-4px)',
                        transition: 'all 240ms ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      <span>Click to Expand</span>
                      <span>⤢</span>
                    </div>

                    {/* Name overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 18,
                        left: 22,
                        right: 120,
                      }}
                    >
                      <h4
                        style={{
                          fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                          fontSize: 'clamp(28px, 3.8vw, 36px)',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          color: '#FFFFFF',
                          margin: 0,
                          lineHeight: 1,
                          textShadow: '0 2px 12px rgba(23,50,77,0.7)',
                        }}
                      >
                        {p.name}
                      </h4>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div
                    style={{
                      padding: '28px 28px 32px',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      background: '#FFFFFF',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                        fontSize: '14.5px',
                        color: '#5C6470',
                        lineHeight: 1.65,
                        margin: '0 0 22px',
                        minHeight: 48,
                      }}
                    >
                      {p.desc}
                    </p>

                    {/* Technical Specs 2x2 Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 12,
                        padding: '18px',
                        borderRadius: '14px',
                        background: '#F6F5F1',
                        border: '1px solid #E2DFDC',
                        marginBottom: 26,
                      }}
                    >
                      {p.specs.map((s, sIdx) => (
                        <div key={sIdx}>
                          <div
                            style={{
                              fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                              fontSize: '11px',
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: '#5C6470',
                              marginBottom: 3,
                            }}
                          >
                            {s.label}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                              fontSize: '17px',
                              fontWeight: 800,
                              color: '#1B2B3A',
                            }}
                          >
                            {s.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons Row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        marginTop: 'auto',
                      }}
                    >
                      <GlassButton
                        variant="gold"
                        size="md"
                        style={{ flex: 1 }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation()
                          setSelectedProduct(p)
                        }}
                      >
                        Inspect Specs →
                      </GlassButton>
                      <GlassButton
                        variant="ghost"
                        size="md"
                        style={{ flex: 1 }}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation()
                          const contactEl = document.getElementById('contact')
                          if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' })
                        }}
                      >
                        Inquire Quote
                      </GlassButton>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Interactive Vehicle Inspection Modal ───────────────────────────────── */}
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(23, 50, 77, 0.45)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeUp 240ms ease forwards',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 920,
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#FFFFFF',
              border: '1px solid #E2DFDC',
              borderRadius: '24px',
              boxShadow: '0 24px 72px rgba(23, 50, 77, 0.18)',
              display: 'flex',
              flexDirection: 'column',
              animation: 'cardModalExpand 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* Modal Header Image */}
            <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(0deg, rgba(23, 50, 77, 0.8) 0%, transparent 60%)',
                }}
              />
              {/* Close button */}
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  position: 'absolute',
                  top: 18,
                  right: 18,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1px solid #E2DFDC',
                  color: '#1B2B3A',
                  fontSize: 18,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 200ms ease',
                  boxShadow: '0 2px 8px rgba(23,50,77,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E07B10'
                  e.currentTarget.style.color = '#FFFFFF'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF'
                  e.currentTarget.style.color = '#1B2B3A'
                }}
              >
                ✕
              </button>
              {/* Header Title */}
              <div style={{ position: 'absolute', bottom: 20, left: 28, right: 28 }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    background: '#E07B10',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    marginBottom: 8,
                    fontWeight: 700,
                  }}
                >
                  {selectedProduct.tag}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                    fontSize: 'clamp(32px, 5vw, 44px)',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    margin: 0,
                  }}
                >
                  {selectedProduct.name}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '28px 32px 36px', background: '#FFFFFF' }}>
              <p
                style={{
                  fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                  fontSize: '15px',
                  color: '#5C6470',
                  lineHeight: 1.65,
                  margin: '0 0 28px',
                }}
              >
                {selectedProduct.desc}
              </p>

              {/* Specs Grid */}
              <h5
                style={{
                  fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                  fontSize: '18px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#1B2B3A',
                  margin: '0 0 14px',
                }}
              >
                Technical Specifications & Limits
              </h5>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                {selectedProduct.specs.map((s, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#F6F5F1',
                      border: '1px solid #E2DFDC',
                      borderRadius: '10px',
                      padding: '12px 16px',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                        fontSize: '11px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#5C6470',
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                        fontSize: '17px',
                        fontWeight: 800,
                        color: '#1B2B3A',
                        marginTop: 4,
                      }}
                    >
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Engineering Features */}
              <h5
                style={{
                  fontFamily: 'var(--font-display, "Barlow Condensed", sans-serif)',
                  fontSize: '18px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#1B2B3A',
                  margin: '0 0 14px',
                }}
              >
                Key Engineering Highlights
              </h5>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 32px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 10,
                }}
              >
                {selectedProduct.features.map((feat, fIdx) => (
                  <li
                    key={fIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                      fontSize: '13.5px',
                      color: '#5C6470',
                    }}
                  >
                    <span style={{ color: '#E07B10', fontSize: '14px', fontWeight: 900 }}>✔</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Modal Actions */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 16,
                  borderTop: '1px solid #E2DFDC',
                  paddingTop: 24,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-body, "Outfit", sans-serif)',
                    fontSize: '13px',
                    color: '#5C6470',
                  }}
                >
                  Custom engineering and dimensions built to order.
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <GlassButton
                    variant="gold"
                    size="md"
                    onClick={() => {
                      setSelectedProduct(null)
                      const c = document.getElementById('contact')
                      if (c) c.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Inquire Specification Blueprint →
                  </GlassButton>
                  <GlassButton
                    variant="ghost"
                    size="md"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Close
                  </GlassButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive & Animation Styles */}
      <style>{`
        @media (max-width: 860px) {
          .stack-card-inner {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 820px) {
          .products-2col-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes cardModalExpand {
          0% {
            opacity: 0;
            transform: scale(0.88) translateY(24px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
