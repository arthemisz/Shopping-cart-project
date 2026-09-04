import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../product/ProductCard';
import { SkeletonGrid } from '../ui/Skeleton';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export function FeaturedProducts() {
  const { products, loading, error, refetch } = useProducts();
  const featured = [...products].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)).slice(0, 8);

  return (
    <section className="py-12 sm:py-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Top Rated</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">Featured Highlights</h2>
        </div>
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-zinc-600 transition-colors">
          <span>See Full Catalog</span> <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <SkeletonGrid count={8} />
      ) : error ? (
        <div className="py-12 text-center bg-white rounded-xl border border-zinc-200 p-8">
          <p className="text-zinc-700 font-semibold mb-3">Unable to load featured products.</p>
          <Button variant="outline" size="sm" onClick={refetch}>
            <RotateCcw className="w-3.5 h-3.5" /> <span>Retry</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedProducts;
