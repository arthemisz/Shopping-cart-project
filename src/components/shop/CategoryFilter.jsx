import React from 'react';
import { formatCategory } from '../../utils/formatters';

export function CategoryFilter({ categories = [], selectedCategory, onSelectCategory, categoryCounts = {}, totalProducts = 0 }) {
  const btnClass = (isActive) =>
    `px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wide whitespace-nowrap transition-colors cursor-pointer border ${
      isActive ? 'bg-zinc-950 text-white border-zinc-950' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border-transparent'
    }`;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      <button type="button" onClick={() => onSelectCategory(null)} className={btnClass(!selectedCategory)}>
        <span>All Items</span>
        {totalProducts > 0 && <span className="ml-1.5 opacity-70">({totalProducts})</span>}
      </button>

      {categories.map((cat) => {
        const isSel = selectedCategory?.toLowerCase() === cat.toLowerCase();
        const count = categoryCounts[cat] || 0;
        return (
          <button key={cat} type="button" onClick={() => onSelectCategory(cat)} className={btnClass(isSel)}>
            <span>{formatCategory(cat)}</span>
            {count > 0 && <span className="ml-1.5 opacity-70">({count})</span>}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
