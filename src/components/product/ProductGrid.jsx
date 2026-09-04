import React from 'react';
import { ProductCard } from './ProductCard';
import { PackageX, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export function ProductGrid({ products, onResetFilters }) {
  if (!products || products.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-xl border border-zinc-200 p-8 max-w-md mx-auto my-8">
        <div className="w-12 h-12 rounded-lg bg-zinc-100 text-zinc-500 flex items-center justify-center mx-auto mb-3">
          <PackageX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-zinc-900 mb-1">
          No matching products
        </h3>
        <p className="text-xs text-zinc-500 mb-5 leading-relaxed">
          No items match your active filters or search terms. Try adjusting your query or resetting filters.
        </p>
        {onResetFilters && (
          <Button variant="outline" size="sm" onClick={onResetFilters}>
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
