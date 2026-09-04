import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { CategoryFilter } from '../components/shop/CategoryFilter';
import { SearchBar } from '../components/shop/SearchBar';
import { SortSelect } from '../components/shop/SortSelect';
import { ProductGrid } from '../components/product/ProductGrid';
import { SkeletonGrid } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';
import { RotateCcw } from 'lucide-react';
import { formatCategory } from '../utils/formatters';

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || null;
  const searchQuery = searchParams.get('search') || '';
  const [sortBy, setSortBy] = useState('default');

  const { products, loading, error, refetch } = useProducts();
  const { categories } = useCategories();

  const categoryCounts = useMemo(
    () => products.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {}),
    [products]
  );

  const updateParam = (key, val) => {
    const next = new URLSearchParams(searchParams);
    if (val?.toString().trim()) next.set(key, val.toString().trim());
    else next.delete(key);
    setSearchParams(next);
  };

  const resetFilters = () => {
    setSearchParams({});
    setSortBy('default');
  };

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = !selectedCategory || p.category?.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });

    const sorters = {
      'price-asc': (a, b) => Number(a.price) - Number(b.price),
      'price-desc': (a, b) => Number(b.price) - Number(a.price),
      'name-asc': (a, b) => a.title.localeCompare(b.title),
      'name-desc': (a, b) => b.title.localeCompare(a.title),
      'rating-desc': (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0),
    };
    if (sorters[sortBy]) list.sort(sorters[sortBy]);
    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const hasActiveFilters = Boolean(selectedCategory || searchQuery.trim() || sortBy !== 'default');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-zinc-200 gap-4">
        <div>
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Catalog</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">
            {selectedCategory ? formatCategory(selectedCategory) : 'All Products'}
          </h1>
        </div>
        {!loading && (
          <div className="text-xs text-zinc-500 font-medium">
            Showing <strong className="text-zinc-900">{filteredProducts.length}</strong> of <strong className="text-zinc-900">{products.length}</strong> items
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-zinc-200 shadow-subtle mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex-1 max-w-md">
            <SearchBar value={searchQuery} onChange={(v) => updateParam('search', v)} onClear={() => updateParam('search', null)} />
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <SortSelect value={sortBy} onChange={setSortBy} />
            {hasActiveFilters && (
              <button onClick={resetFilters} className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer">
                <RotateCcw className="w-3.5 h-3.5" /> <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-100">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => updateParam('category', cat)}
            categoryCounts={categoryCounts}
            totalProducts={products.length}
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <SkeletonGrid count={8} />
      ) : error ? (
        <div className="py-16 text-center bg-white rounded-xl border border-zinc-200 p-8 max-w-md mx-auto shadow-subtle">
          <p className="text-zinc-800 font-semibold mb-2">Failed to load items</p>
          <p className="text-xs text-zinc-500 mb-5">{error}</p>
          <Button variant="primary" size="sm" onClick={refetch}>
            <RotateCcw className="w-3.5 h-3.5" /> <span>Retry Connection</span>
          </Button>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} onResetFilters={hasActiveFilters ? resetFilters : undefined} />
      )}
    </div>
  );
}

export default Shop;
