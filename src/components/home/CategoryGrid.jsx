import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORY_METADATA } from '../../constants/navigation';
import { createCategoryUrl } from '../../constants/routes';

export function CategoryGrid() {
  return (
    <section className="py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Collections</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">Curated Categories</h2>
        </div>
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-zinc-600 transition-colors">
          <span>View All Products</span> <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORY_METADATA.map(({ id, name, tagline, image }) => (
          <Link key={id} to={createCategoryUrl(id)} className="group bg-white rounded-xl border border-zinc-200 p-6 flex flex-col justify-between hover:border-zinc-400 transition-colors shadow-subtle">
            <div className="h-44 bg-zinc-50 rounded-lg p-4 flex items-center justify-center mb-6">
              <img src={image} alt={name} loading="lazy" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="space-y-1.5 border-t border-zinc-100 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-zinc-950">{name}</h3>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
              </div>
              <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;
