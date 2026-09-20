import React from 'react';
import { CatalogItem, CategoryType } from '../types/store';

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'shoe1',
    category: 'shoes',
    badge: 'FOOTWEAR • SHOE 1',
    title: 'AERO-X Apex Shoe',
    desc: 'Targeted flexibility and dynamic lock-down fit with seamless 3D knit upper.',
    price: '$280.00',
    numericPrice: 280,
    buttonText: 'Buy Apex',
    iconType: 'shoe',
    dir: 'ezgif-451cb8066b003a92-jpg',
    tags: ["Seamless Knit", "Anatomical Foam", "All-Terrain Rubber"],
  },
  {
    id: 'shoe2',
    category: 'shoes',
    badge: 'FOOTWEAR • SHOE 2',
    title: 'AERO-X Velocity Shoe 2',
    desc: 'Full-length rigid carbon fiber chassis delivering explosive toe-off energy rebound.',
    price: '$320.00',
    numericPrice: 320,
    buttonText: 'Buy Velocity',
    iconType: 'shoe',
    dir: 'shoe 2',
    tags: ["Carbon Plate", "Aero-Mesh Upper", "Dual-Density Sole"],
  },
  {
    id: 'watch1',
    category: 'watches',
    badge: 'WATCHES • WATCH 1',
    title: 'Chrono Titanium Watch',
    desc: 'Aerospace titanium casing with ceramic bezel and sapphire crystal 3D kinetic module.',
    price: '$450.00',
    numericPrice: 450,
    buttonText: 'Buy Titanium',
    iconType: 'watch',
    dir: 'watch',
    tags: ["Grade-5 Titanium", "Kinetic Movement", "Sapphire Lens"],
  },
  {
    id: 'watch2',
    category: 'watches',
    badge: 'WATCHES • WATCH 2',
    title: 'Chrono Onyx Watch 2',
    desc: 'Ultra-black matte ceramic casing with skeletonized rotor and 80-hour dual mainspring power.',
    price: '$520.00',
    numericPrice: 520,
    buttonText: 'Buy Onyx 2',
    iconType: 'watch',
    dir: 'watch 2',
    tags: ["Matte Onyx Ceramic", "Skeleton Rotor", "80-Hr Power"],
  },
  {
    id: 'shirt',
    category: 'shirts',
    badge: 'APPAREL • SHIRT 1',
    title: 'Aero-Knit Tech Shirt',
    desc: 'Seamless compression apparel with active moisture-wicking technology and thermal-regulating micro-mesh.',
    price: '$120.00',
    numericPrice: 120,
    buttonText: 'Buy Tech Shirt',
    iconType: 'shirt',
    dir: 'shirt',
    tags: ["Micro-Mesh", "Hydrophobic", "Ergonomic Fit"],
  },
  {
    id: 'shirt2',
    category: 'shirts',
    badge: 'APPAREL • SHIRT 2',
    title: 'Aero-Knit Pro Shirt 2',
    desc: 'Dynamic thermal compression micro-mesh with 360-degree zoned ventilation and core recovery matrix.',
    price: '$150.00',
    numericPrice: 150,
    buttonText: 'Buy Pro Shirt 2',
    iconType: 'shirt',
    dir: 'shirt 2',
    tags: ["Pro-Mesh", "Core Support", "360° Airflow"],
  },
];

interface StoreCatalogProps {
  filterCategory?: CategoryType | 'all';
  onAddToCart?: (item: CatalogItem) => void;
  onBuyNow?: (item: CatalogItem) => void;
}

const CategoryIcon: React.FC<{ type: 'shoe' | 'watch' | 'shirt' }> = ({ type }) => {
  if (type === 'shoe') {
    return (
      <svg className="h-6 w-6 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 17l3-7 5 1 6-4 4 2v5H2z" />
        <path d="M5 10l-1 7" />
        <path d="M10 11v6" />
        <path d="M15 8v9" />
        <path d="M2 17h20v2H2z" />
      </svg>
    );
  }
  if (type === 'watch') {
    return (
      <svg className="h-6 w-6 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="7" />
        <polyline points="12 9 12 12 14.5 13.5" />
        <path d="M9 2h6" />
        <path d="M9 22h6" />
        <path d="M12 2v3" />
        <path d="M12 19v3" />
      </svg>
    );
  }
  return (
    <svg className="h-6 w-6 text-[var(--accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
    </svg>
  );
};

export const StoreCatalog: React.FC<StoreCatalogProps> = ({
  filterCategory = 'all',
  onAddToCart,
  onBuyNow,
}) => {
  const filtered =
    filterCategory === 'all' || filterCategory === 'store'
      ? CATALOG_ITEMS
      : CATALOG_ITEMS.filter((item) => item.category === filterCategory);

  const getTitle = () => {
    switch (filterCategory) {
      case 'shoes':
        return 'Footwear Collection';
      case 'watches':
        return 'Chrono Watch Collection';
      case 'shirts':
        return 'Techwear Apparel';
      default:
        return 'Full Store Catalog';
    }
  };

  return (
    <section id="store-catalog" className="relative z-10 py-24 px-6 md:px-16 lg:px-20 max-w-[1300px] mx-auto">
      <div className="text-center mb-16">
        <div className="text-xs font-body font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--accent)' }}>
          // Capabilities & Catalog
        </div>
        <h2 className="font-heading italic accent-text text-5xl md:text-6xl tracking-[-2px]">
          {getTitle()}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const previewImg = `${item.dir}/ezgif-frame-001.jpg`;

          return (
            <div key={item.id} className="catalog-card liquid-glass rounded-[1.25rem] p-6 min-h-[380px] flex flex-col justify-between border border-[var(--glass-border-accent)] hover:border-[var(--accent)] transition-all">
              {/* Top Row: Category Icon & Tags */}
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 liquid-glass rounded-xl flex items-center justify-center border border-[var(--glass-border-accent)] shadow-md">
                  <CategoryIcon type={item.iconType} />
                </div>

                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  {item.tags.map((tag) => (
                    <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/70 font-body whitespace-nowrap">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Middle Content */}
              <div className="mt-6 flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl bg-black/50 overflow-hidden flex-shrink-0 flex items-center justify-center border border-white/10 p-1">
                  <img
                    src={previewImg}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1 text-[var(--accent)] opacity-80">
                    {item.badge}
                  </div>
                  <h3 className="font-heading italic text-white text-2xl md:text-3xl tracking-[-0.5px] leading-tight mb-1 truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/60 font-body font-light line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Row: Price & Action Buttons */}
              <div className="flex items-center justify-between pt-5 mt-6 border-t border-[var(--glass-border-accent)]">
                <span className="font-heading italic text-3xl accent-text">
                  {item.price}
                </span>

                <div className="flex items-center gap-2">
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => onAddToCart && onAddToCart(item)}
                    className="liquid-glass rounded-full px-3 py-2 text-xs font-medium text-white/80 hover:text-white border border-white/15 hover:border-[var(--accent)] transition-all flex items-center gap-1.5"
                    title="Add to Cart"
                  >
                    <svg className="w-3.5 h-3.5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Cart</span>
                  </button>

                  {/* Buy Now Direct Button */}
                  <button
                    onClick={() => onBuyNow && onBuyNow(item)}
                    className="accent-glow-btn rounded-full px-4 py-2 text-xs font-semibold text-white shadow-lg hover:scale-105 transition-transform"
                  >
                    {item.buttonText}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
