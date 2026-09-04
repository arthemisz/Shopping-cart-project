import React from 'react';
import { Link } from 'react-router-dom';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { ArrowRight, Star } from 'lucide-react';

const REVIEWS = [
  { name: 'Marcus C.', text: 'The backpack arrived precisely within 48 hours. Stitching and hardware quality are exceptional, and the checkout was seamless.' },
  { name: 'Elena R.', text: 'The jewelry items look even more exquisite in person than online. Delivered in premium packaging with full documentation.' },
  { name: 'David M.', text: 'Crisp search, instant filtering, and responsive design. Everything from tech gear to tailored jackets in one reliable place.' },
];

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />

      {/* Promo Banner Strip */}
      <section className="my-16 bg-zinc-950 text-white rounded-xl p-8 sm:p-12 border border-zinc-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Limited Curation</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">15% Off Your First Purchase</h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            Apply promotional coupon <code className="bg-zinc-800 text-white px-2 py-0.5 rounded font-mono font-bold">NEXUS15</code> during checkout. Automatic complimentary delivery applied for orders above $50.
          </p>
        </div>
        <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-zinc-950 hover:bg-zinc-200 rounded-lg font-bold text-xs sm:text-sm tracking-wide transition-colors shrink-0">
          <span>Explore The Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Testimonials */}
      <section className="py-12 border-t border-zinc-200">
        <div className="mb-8">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Testimonials</span>
          <h2 className="text-2xl font-bold text-zinc-950 tracking-tight">Client Impressions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map(({ name, text }) => (
            <div key={name} className="bg-white p-6 rounded-xl border border-zinc-200 space-y-3 shadow-subtle">
              <div className="flex text-zinc-950 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-zinc-950" />
                ))}
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">"{text}"</p>
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-zinc-900">{name}</span>
                <span className="text-zinc-400">Verified Client</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
