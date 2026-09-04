import React, { useState } from 'react';
import { ShieldCheck, Tag, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { validateCoupon } from '../../constants/coupons';
import { formatPrice } from '../../utils/formatters';

export function OrderSummary({ onProceedCheckout }) {
  const { subtotal, shipping, isFreeShipping, shippingThreshold, totalCount } = useCart();
  const { addToast } = useToast();
  const [promoInput, setPromoInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const coupon = validateCoupon(promoInput);
    if (!coupon) {
      addToast({ title: 'Invalid Promo Code', message: 'Valid test codes: NEXUS15 or PRO20', type: 'error' });
      return;
    }
    setAppliedCoupon(coupon);
    addToast({ title: 'Promo Applied', message: `${coupon.discountPercent}% discount applied.`, type: 'success' });
    setPromoInput('');
  };

  const discountPercent = appliedCoupon ? appliedCoupon.discountPercent : 0;
  const discountAmount = discountPercent > 0 ? subtotal * (discountPercent / 100) : 0;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const calculatedTax = discountedSubtotal * 0.15;
  const grandTotal = discountedSubtotal + calculatedTax + shipping;
  const freeShippingDiff = Math.max(0, shippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-7 shadow-subtle space-y-6 sticky top-28">
      <h3 className="text-base font-bold text-zinc-950 pb-4 border-b border-zinc-100 uppercase tracking-wide">
        Order Summary
      </h3>

      {/* Shipping Progress */}
      <div className="bg-zinc-50 border border-zinc-200/80 rounded-lg p-3.5 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-800">
          {isFreeShipping ? (
            <span className="text-emerald-800 flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Free express delivery unlocked
            </span>
          ) : (
            <span>Add <strong className="text-zinc-950">{formatPrice(freeShippingDiff)}</strong> for free delivery</span>
          )}
          <span className="text-zinc-500 font-mono text-[11px]">{shippingProgress}%</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-300 rounded-full ${isFreeShipping ? 'bg-emerald-600' : 'bg-zinc-900'}`} style={{ width: `${shippingProgress}%` }} />
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="flex justify-between text-zinc-600">
          <span>Items Total ({totalCount} {totalCount === 1 ? 'item' : 'items'})</span>
          <span className="font-semibold text-zinc-900">{formatPrice(subtotal)}</span>
        </div>

        {appliedCoupon && (
          <div className="flex justify-between text-emerald-700 font-medium items-center">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> {appliedCoupon.code} (-{discountPercent}%)
              <button type="button" onClick={() => setAppliedCoupon(null)} className="text-[10px] underline ml-1 text-zinc-400 hover:text-zinc-700 cursor-pointer">remove</button>
            </span>
            <span className="font-bold">-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-zinc-600">
          <span>Estimated Sales Tax (15%)</span>
          <span className="font-semibold text-zinc-900">{formatPrice(calculatedTax)}</span>
        </div>

        <div className="flex justify-between text-zinc-600">
          <span>Delivery</span>
          {isFreeShipping ? (
            <span className="text-emerald-700 font-bold uppercase text-xs">Complimentary</span>
          ) : (
            <span className="font-semibold text-zinc-900">{formatPrice(shipping)}</span>
          )}
        </div>

        <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline">
          <span className="text-base font-bold text-zinc-950">Total</span>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-zinc-950">{formatPrice(grandTotal)}</span>
            <span className="block text-[11px] text-zinc-500 font-normal">USD, all fees included</span>
          </div>
        </div>
      </div>

      {/* Promo Form */}
      {!appliedCoupon && (
        <form onSubmit={handleApplyPromo} className="flex gap-2 pt-1">
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            placeholder="Promo code (NEXUS15)"
            className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-xs uppercase tracking-wider text-zinc-900 placeholder-zinc-400 focus-ring"
          />
          <button type="submit" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md text-xs font-semibold tracking-wide transition-colors shrink-0 cursor-pointer">
            Apply
          </button>
        </form>
      )}

      {/* Action */}
      <button
        onClick={onProceedCheckout}
        disabled={totalCount === 0}
        className="w-full py-3.5 px-6 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-subtle"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 text-center">
        <ShieldCheck className="w-4 h-4 text-zinc-700 shrink-0" />
        <span>256-Bit SSL Encrypted Checkout</span>
      </div>
    </div>
  );
}

export default OrderSummary;
