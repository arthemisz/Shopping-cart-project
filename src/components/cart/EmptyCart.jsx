import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export function EmptyCart() {
  return (
    <div className="py-24 text-center max-w-md mx-auto px-4">
      <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500 mx-auto mb-5">
        <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
      </div>

      <h2 className="text-2xl font-bold text-zinc-950 tracking-tight mb-2">
        Your Shopping Bag is Empty
      </h2>

      <p className="text-zinc-500 text-xs sm:text-sm mb-8 leading-relaxed max-w-xs mx-auto">
        You haven't added any items to your shopping bag yet. Explore our latest arrivals and seasonal essentials.
      </p>

      <Link
        to="/shop"
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg font-bold text-xs sm:text-sm tracking-wide transition-colors"
      >
        <span>Explore Collection</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default EmptyCart;
