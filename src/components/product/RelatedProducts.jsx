import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from './ProductCard';
import { SkeletonCard } from '../ui/Skeleton';
import { formatCategory } from '../../utils/formatters';

export function RelatedProducts({ category, currentProductId }) {
  const { products, loading } = useProducts(category);

  const related = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (!loading && related.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-zinc-200">
      <div className="mb-6">
        <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
          Recommendations
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
          More from {formatCategory(category)}
        </h3>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default RelatedProducts;
