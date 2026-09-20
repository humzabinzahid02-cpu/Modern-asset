import React, { useState } from 'react';
import { CartItem } from '../types/store';

declare global {
  interface Window {
    confetti?: any;
  }
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  directProduct?: CartItem | null;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  directProduct,
  onSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    name: 'Alex Mercer',
    email: 'alex.mercer@aero-x.io',
    address: '77 Aerospace Way, Orbit Suite 4',
    city: 'San Francisco, CA 94107',
    paymentMethod: 'card',
  });

  if (!isOpen) return null;

  const checkoutItems = directProduct ? [directProduct] : items;
  const totalPrice = checkoutItems.reduce((sum, i) => sum + i.numericPrice * i.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');

    // Trigger celebration confetti
    try {
      if (typeof window !== 'undefined' && window.confetti) {
        window.confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } catch (err) {}

    setTimeout(() => {
      onSuccess();
    }, 2500);
  };

  const handleClose = () => {
    setStep('details');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#120e0e] border border-[var(--glass-border-accent)] rounded-2xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden text-white">
        {/* Glow header ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[var(--accent-glow)] blur-3xl opacity-20 pointer-events-none" />

        {step === 'details' ? (
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-[10px] font-semibold text-[var(--accent)] tracking-widest uppercase">
                  AERO-X DIRECT ORDER
                </span>
                <h2 className="font-heading italic text-3xl text-white">Complete Acquisition</h2>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Order Items Summary */}
            <div className="bg-black/40 rounded-xl p-3.5 border border-white/10 mb-6 space-y-2 max-h-40 overflow-y-auto no-scrollbar">
              {checkoutItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <div className="truncate pr-2">
                    <span className="text-white font-medium">{item.title}</span>
                    <span className="text-white/40 ml-2">x{item.quantity}</span>
                  </div>
                  <span className="accent-text font-semibold whitespace-nowrap">
                    ${(item.numericPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-semibold">
                <span>Total Amount</span>
                <span className="accent-text font-heading italic text-xl">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-medium text-white/60 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-white/60 uppercase mb-1">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-white/60 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-white/60 uppercase mb-1">Payment Method</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--accent)]"
                  >
                    <option value="card" className="bg-[#120e0e]">Credit Card (Visa / Mastercard)</option>
                    <option value="apple" className="bg-[#120e0e]">Apple Pay</option>
                    <option value="crypto" className="bg-[#120e0e]">Crypto / Solana Pay</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-full text-xs text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="accent-glow-btn px-6 py-2.5 rounded-full text-xs font-semibold text-white shadow-xl flex items-center gap-1.5"
                >
                  <span>Confirm & Pay ${totalPrice.toFixed(2)}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[var(--accent-ghost)] border border-[var(--accent)] mx-auto flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-heading italic text-4xl text-white">Acquisition Confirmed!</h3>
            <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your 3D order has been dispatched via Aerospace Express. Tracking confirmation sent to <span className="text-[var(--accent)]">{formData.email}</span>.
            </p>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="accent-glow-btn px-8 py-2.5 rounded-full text-xs font-semibold text-white"
              >
                Return to Voyage
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
