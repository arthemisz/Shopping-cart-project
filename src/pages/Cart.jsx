import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { OrderSummary } from '../components/cart/OrderSummary';
import { EmptyCart } from '../components/cart/EmptyCart';
import { ClearCartModal } from '../components/cart/ClearCartModal';
import { CheckoutModal } from '../components/cart/CheckoutModal';
import { ArrowLeft, Trash2 } from 'lucide-react';

export function Cart() {
  const { items, totalCount, clearCart } = useCart();
  const [clearOpen, setClearOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (!items.length) return <EmptyCart />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-zinc-200 gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">Shopping Bag</h1>
            <span className="px-2.5 py-0.5 bg-zinc-100 text-zinc-800 text-xs font-bold rounded-md border border-zinc-200">
              {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <p className="text-zinc-500 text-xs mt-1">Review your items and proceed to secure checkout.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <Link to="/shop" className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> <span>Continue Shopping</span>
          </Link>
          <button onClick={() => setClearOpen(true)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-500 hover:text-rose-600 transition-colors cursor-pointer" title="Empty bag">
            <Trash2 className="w-3.5 h-3.5" /> <span>Clear Bag</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl border border-zinc-200 p-5 sm:p-6 shadow-subtle divide-y divide-zinc-200">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 px-1">
            <span>Applicable local taxes calculated at checkout</span>
            <Link to="/shop" className="font-semibold text-zinc-900 hover:underline">Add more items</Link>
          </div>
        </div>

        <div className="lg:col-span-4">
          <OrderSummary onProceedCheckout={() => setCheckoutOpen(true)} />
        </div>
      </div>

      <ClearCartModal isOpen={clearOpen} onClose={() => setClearOpen(false)} onConfirm={clearCart} />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}

export default Cart;
