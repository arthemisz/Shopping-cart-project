import React from 'react';
import { formatCategory } from '../../utils/formatters';

export function ProductImages({ image, title, category }) {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-8 sm:p-12 shadow-subtle flex items-center justify-center min-h-[380px] sm:min-h-[460px] relative overflow-hidden">
      {/* Category tag */}
      <span className="absolute top-4 left-4 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest px-2.5 py-1 bg-zinc-100 rounded">
        {formatCategory(category)}
      </span>

      {/* Main product photo */}
      <img
        src={image}
        alt={title}
        className="max-h-[340px] max-w-full object-contain filter drop-shadow-xs"
      />
    </div>
  );
}

export default ProductImages;
