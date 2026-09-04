import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export function SortSelect({ value, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
        <ArrowUpDown className="w-3.5 h-3.5" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-8 pr-8 py-2 bg-white border border-zinc-200 rounded-lg text-xs sm:text-sm font-medium text-zinc-800 shadow-subtle hover:border-zinc-300 focus-ring transition-colors appearance-none cursor-pointer"
        aria-label="Sort products"
      >
        <option value="default">Sort: Curated</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Alphabetical: A to Z</option>
        <option value="name-desc">Alphabetical: Z to A</option>
        <option value="rating-desc">Rating: Highest First</option>
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400">
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
}

export default SortSelect;
