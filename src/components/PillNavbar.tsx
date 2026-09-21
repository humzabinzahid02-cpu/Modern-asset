import React from 'react';
import { CategoryType } from '../types/store';

interface PillNavbarProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  cartCount: number;
  onOpenCart: () => void;
  onClaimClick: () => void;
}

const ArrowUpRight: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

const NAV_ITEMS: { key: CategoryType; label: string }[] = [
  { key: 'shoes', label: 'Shoes' },
  { key: 'watches', label: 'Watches' },
  { key: 'shirts', label: 'Shirts' },
  { key: 'store', label: 'Store' },
];

export const PillNavbar: React.FC<PillNavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onClaimClick,
}) => {
  return (
    <header className="fixed top-2 sm:top-4 left-0 right-0 px-2 sm:px-6 lg:px-12 z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => onSelectCategory('shoes')}
          className="w-9 h-9 sm:w-11 sm:h-11 liquid-glass rounded-full flex items-center justify-center pointer-events-auto cursor-pointer shrink-0 hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300 border border-[var(--glass-border-accent)]"
        >
          <span className="font-heading italic text-lg sm:text-2xl accent-text">a</span>
        </div>

        {/* Center Category Navigation Pill */}
        <div className="pill-nav-container liquid-glass rounded-full p-1 flex items-center gap-1 sm:gap-1.5 pointer-events-auto shrink min-w-0 border border-[var(--glass-border-accent)] overflow-x-auto no-scrollbar">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => onSelectCategory(item.key)}
              className={`relative px-2.5 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium font-body transition-all duration-300 rounded-full whitespace-nowrap ${
                activeCategory === item.key
                  ? 'nav-tab-active'
                  : 'text-white/60 hover:text-white/90'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Actions: Claim & Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto shrink-0">
          {/* Claim Button */}
          <button
            onClick={onClaimClick}
            className="hidden sm:flex accent-glow-btn rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap items-center gap-1 text-white hover:opacity-90 transition-all shadow-md"
          >
            <span>Claim</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="liquid-glass rounded-full px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap flex items-center gap-1.5 text-white border border-[var(--glass-border-accent)] hover:border-[var(--accent)] transition-all shadow-md"
          >
            <svg className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="hidden xs:inline">Cart</span>
            <span className="bg-[var(--accent)] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shrink-0">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
