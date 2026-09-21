import React from 'react';
import { CartItem } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-[10000] flex justify-end">
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#0f0c0c] border-l border-[var(--glass-border-accent)] h-full flex flex-col justify-between shadow-2xl z-10 p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[var(--glass-border-accent)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 liquid-glass rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h2 className="font-heading italic text-2xl text-white tracking-tight">Your Cart</h2>
              <span className="text-xs text-white/50 font-body">{totalItems} {totalItems === 1 ? 'item' : 'items'} selected</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-white/40">
              <svg className="w-16 h-16 mb-4 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="font-heading italic text-2xl text-white/70 mb-2">Cart is empty</p>
              <p className="text-xs text-white/50 max-w-[240px] mb-6">Explore the 3D showcase and add products to your cart.</p>
              <button
                onClick={onClose}
                className="accent-glow-btn rounded-full px-6 py-2.5 text-xs font-semibold text-white"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="liquid-glass rounded-xl p-3.5 flex items-center gap-4 border border-[var(--glass-border-accent)]"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-lg bg-black/60 overflow-hidden flex-shrink-0 flex items-center justify-center border border-white/10">
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-contain p-1"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold text-[var(--accent)] tracking-wider uppercase mb-0.5">
                    {item.badge}
                  </div>
                  <h4 className="font-heading italic text-lg text-white truncate leading-tight">
                    {item.title}
                  </h4>
                  <div className="accent-text text-sm font-semibold mt-1">
                    {item.price}
                  </div>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-white/40 hover:text-red-400 text-xs transition-colors p-1"
                    title="Remove item"
                  >
                    ✕
                  </button>

                  <div className="flex items-center gap-2 bg-black/40 rounded-full border border-white/10 px-2 py-0.5">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-5 h-5 flex items-center justify-center text-white/60 hover:text-white text-xs"
                    >
                      -
                    </button>
                    <span className="text-xs text-white font-semibold min-w-[14px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-5 h-5 flex items-center justify-center text-white/60 hover:text-white text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-[var(--glass-border-accent)] space-y-4">
            {/* Free Shipping Meter */}
            <div className="bg-white/5 rounded-lg p-2.5 text-center text-xs text-white/70 flex items-center justify-center gap-2">
              <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
              <span><strong className="text-[var(--accent)] font-semibold">Complimentary Express Shipping</strong> included</span>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Subtotal</span>
              <span className="font-heading italic text-2xl accent-text">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onClearCart}
                className="py-2.5 rounded-full text-xs font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
              >
                Clear Cart
              </button>

              <button
                onClick={onCheckout}
                className="accent-glow-btn py-2.5 rounded-full text-xs font-semibold text-white shadow-lg flex items-center justify-center gap-1.5"
              >
                <span>Checkout Now</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
