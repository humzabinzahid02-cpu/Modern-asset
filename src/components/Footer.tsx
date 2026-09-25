import React from 'react'

interface FooterProps {
  onOpenQuote?: () => void
}

const FLEET_PRODUCTS = [
  'Precision Tankers',
  'Heavy Lowbeds',
  'Tipper Trailers',
  'Flatbed Transporters',
  'Sweepers & Wreckers',
  'Custom Truck Bodies',
]

const SITE_LINKS = [
  { name: 'Home', target: 'home' },
  { name: 'Products', target: 'products' },
  { name: 'Our Process', target: 'process' },
  { name: 'Why Us', target: 'why-us' },
  { name: 'Contact', target: 'contact' },
]

export default function Footer({ onOpenQuote }: FooterProps) {
  const handleLinkClick = (target: string, e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(target)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      id="contact-footer"
      className="w-full min-h-[550px] bg-[#1C2128] px-4 sm:px-6 lg:px-13 pt-10 sm:pt-9 lg:pt-10 pb-4 sm:pb-5 text-[#B0B8BC] overflow-hidden"
    >
      <div className="max-w-[100rem] mx-auto">
        {/* Top Section: CTA on Left, Link Columns on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-4 sm:mb-6">
          
          {/* Left Column: Headline & Direct Contact CTA */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] uppercase text-[#E07B10] mb-2 font-body">
                <span className="w-2 h-2 rounded-full bg-[#E07B10]" />
                Saudi Vision 2030 Fleet Partner
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-[38px] uppercase tracking-tight text-white mb-2.5 leading-[0.98]">
                See how we can help you. <br />
                <span className="text-[#E07B10]">Get in touch today.</span>
              </h3>

              <p className="font-body text-xs sm:text-[13px] text-[#B0B8BC] leading-relaxed max-w-lg mb-4">
                Custom fabrication of heavy-duty commercial vehicles and specialized transport platforms — built for strength, precision &amp; operational endurance.
              </p>
            </div>

            {/* Direct Email & Social Links */}
            <div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  if (onOpenQuote) onOpenQuote()
                }}
                className="font-display font-bold text-base sm:text-lg text-white hover:text-[#E07B10] transition-colors inline-flex items-center gap-2 mb-3.5 tracking-wide underline underline-offset-4 decoration-[#E07B10]"
              >
                <span>info@modernassets.sa</span>
                <svg className="w-4 h-4 text-[#E07B10]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              {/* Social Media Pill Badges */}
              <div className="flex items-center gap-2.5">
                {[
                  {
                    name: 'LinkedIn',
                    svg: (
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    ),
                  },
                  {
                    name: 'Instagram',
                    svg: (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    ),
                  },
                  {
                    name: 'X',
                    svg: (
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    ),
                  },
                  {
                    name: 'YouTube',
                    svg: (
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    ),
                  },
                ].map((s) => (
                  <a
                    key={s.name}
                    href="#contact"
                    title={s.name}
                    className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-[#E07B10] hover:border-[#E07B10] hover:text-white text-[#B0B8BC] flex items-center justify-center transition-all duration-200 cursor-pointer no-underline"
                  >
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Columns: Products & Site Links + Spanning Location */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
            
            {/* Products Column */}
            <div>
              <div className="font-display font-black text-sm tracking-wider uppercase text-white mb-2.5">
                Fleet Products
              </div>
              <ul className="space-y-1.5 p-0 m-0 list-none font-body text-xs sm:text-[13px]">
                {FLEET_PRODUCTS.map((prod) => (
                  <li key={prod}>
                    <a
                      href="#products"
                      onClick={(e) => handleLinkClick('products', e)}
                      className="text-[#C5CCD2] hover:text-[#E07B10] transition-all no-underline cursor-pointer flex items-center gap-1.5 group font-medium"
                    >
                      <span className="text-[#E07B10] text-xs font-bold opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">›</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">{prod}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Site Navigation Links */}
            <div>
              <div className="font-display font-black text-sm tracking-wider uppercase text-white mb-2.5">
                Site Links
              </div>
              <ul className="space-y-1.5 p-0 m-0 list-none font-body text-xs sm:text-[13px]">
                {SITE_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      href={`#${link.target}`}
                      onClick={(e) => handleLinkClick(link.target, e)}
                      className="text-[#C5CCD2] hover:text-[#E07B10] transition-all no-underline cursor-pointer flex items-center gap-1.5 group font-medium"
                    >
                      <span className="text-[#E07B10] text-xs font-bold opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">›</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Headquarters — SPANS ACROSS BOTH COLUMNS & ENLARGED WITH HIGHLIGHT */}
            <div className="sm:col-span-2 mt-2 pt-1">
              <div className="font-body text-xs tracking-wider uppercase text-white font-bold mb-1 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#E07B10]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Headquarters</span>
              </div>
              <div className="font-body text-xs sm:text-sm text-[#D0D6DC] leading-relaxed">
                <span className="text-[#E07B10] font-bold">Industrial Area 2</span>, Riyadh, Kingdom of Saudi Arabia
              </div>
            </div>

          </div>

        </div>

        {/* Giant Typographic Brand Display — BORDERLESS, FULL, AND PROMINENT */}
        <div className="w-full pt-2 sm:pt-3 pb-2 select-none overflow-hidden text-center">
          <div className="font-display font-black text-[clamp(2.5rem,11vw,10.5rem)] tracking-tight uppercase leading-[0.82] whitespace-nowrap select-none">
            <span className="text-white">Modern </span>
            <span className="text-[#E07B10]">Assets.</span>
          </div>
        </div>

        {/* Small Copyright & Legal Metadata Bar — Clean & Borderless */}
        <div className="pt-2 pb-1 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left text-[11px] font-body text-[#8C949C]">
          <div>
            &copy; {new Date().getFullYear()} Modern Assets. All rights reserved. Saudi Vision 2030 Fleet Partner.
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-3.5">
            {['Privacy Policy', 'Terms of Service', 'ISO 9001 Certifications'].map((item) => (
              <a
                key={item}
                href="#contact"
                className="text-[#8C949C] hover:text-white transition-colors no-underline"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
