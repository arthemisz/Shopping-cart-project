import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Star } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

const TRUST_BADGES = [
  { icon: Truck, text: 'Complimentary Shipping Over $50' },
  { icon: ShieldCheck, text: '2-Year Authenticity Guarantee' },
  { icon: Star, text: '4.8/5 Verified Buyer Rating', fill: true },
];

export function HeroBanner() {
  return (
    <section className="bg-zinc-950 text-white rounded-2xl overflow-hidden border border-zinc-900 my-4 sm:my-6">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium tracking-wide uppercase">
              <span>Edition 2026 • Spring Curation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Essential Objects. <br /> Refined Living.
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed font-normal">
              An uncompromising selection of timeless menswear, contemporary women's apparel, fine jewelry, and high-performance electronics.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link to="/shop" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-zinc-150 text-zinc-950 font-bold rounded-lg transition-colors text-sm tracking-wide">
                <span>Shop All Items</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/shop?category=electronics" className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-200 font-semibold rounded-lg transition-colors text-sm tracking-wide">
                <span>Explore Electronics</span>
              </Link>
            </div>

            <div className="pt-6 border-t border-zinc-900 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
              {TRUST_BADGES.map(({ icon: Icon, text, fill }, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 text-zinc-300 ${fill ? 'fill-zinc-300' : ''}`} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-zinc-900 rounded-xl border border-zinc-800 p-6 space-y-4">
              <div className="bg-white rounded-lg p-8 flex items-center justify-center h-64 border border-zinc-200">
                <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png" alt="Fjallraven Backpack" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="uppercase tracking-wider font-semibold text-zinc-300">Featured Highlight</span>
                  <span>4.2 / 5</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug">Fjallraven - Foldsack No. 1 Backpack</h3>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                  <span className="text-xl font-bold text-white">{formatPrice(109.95)}</span>
                  <Link to="/shop/1" className="px-4 py-2 bg-white text-zinc-950 hover:bg-zinc-200 rounded-md text-xs font-bold transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
