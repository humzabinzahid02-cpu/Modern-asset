import React from 'react'

const NAV_COLS = [
  {
    heading: 'Products',
    links: ['Tankers', 'Trailers', 'Truck Bodies', 'Sweepers', 'Wreckers', 'Aerial Platforms'],
  },
  {
    heading: 'Company',
    links: ['About Us', 'Our Process', 'Projects', 'Careers', 'News'],
  },
  {
    heading: 'Support',
    links: ['Request a Quote', 'Contact Us', 'After-Sales Service', 'Parts & Spares'],
  },
]

interface FooterProps {
  onOpenQuote?: () => void
}

export default function Footer({ onOpenQuote }: FooterProps) {
  const handleLinkClick = (link: string, e: React.MouseEvent) => {
    if (link === 'Request a Quote' || link === 'Contact Us') {
      e.preventDefault()
      if (onOpenQuote) onOpenQuote()
    }
  }

  return (
    <footer
      id="contact-footer"
      className="bg-[#1C2128] border-t border-[#252D35] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          
          {/* Brand Column (2 cols on tablet & desktop) */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E07B10] to-[#C46C0C] flex items-center justify-center shrink-0">
                <span className="font-display font-black text-lg text-white">M</span>
              </div>
              <span className="font-display font-bold text-lg tracking-wider uppercase text-white">
                Modern Assets
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-[#B0B8BC] leading-relaxed mb-5 max-w-sm">
              Custom fabrication of heavy-duty commercial vehicles and specialized transport equipment — built for strength, precision &amp; operational endurance in extreme desert duty cycles.
            </p>
            <div className="font-body text-xs tracking-wider uppercase text-[#B0B8BC] font-medium">
              🇸🇦 Riyadh, Kingdom of Saudi Arabia
            </div>
          </div>

          {/* Navigation Links Columns (1 col each) */}
          {NAV_COLS.map((col) => (
            <div key={col.heading} className="flex flex-col">
              <div className="font-display font-black text-sm tracking-widest uppercase text-white mb-4">
                {col.heading}
              </div>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    onClick={(e) => handleLinkClick(link, e)}
                    className="font-body text-xs sm:text-sm text-[#B0B8BC] hover:text-[#E07B10] transition-colors no-underline cursor-pointer"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#252D35] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="font-body text-xs text-[#8C949C] m-0">
            &copy; {new Date().getFullYear()} Modern Assets. All rights reserved. Saudi Vision 2030 Fleet Partner.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-5">
            {['Privacy Policy', 'Terms of Service', 'Safety Certifications'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-body text-xs text-[#8C949C] hover:text-white transition-colors no-underline"
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
