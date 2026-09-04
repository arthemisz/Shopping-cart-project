import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsApi } from '../api/products.api';
import { ProductImages } from '../components/product/ProductImages';
import { ProductInfo } from '../components/product/ProductInfo';
import { RelatedProducts } from '../components/product/RelatedProducts';
import { ProductCard } from '../components/product/ProductCard';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { ArrowLeft, RotateCcw, PackageX } from 'lucide-react';
import { formatCategory } from '../utils/formatters';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);
  const { recentlyViewed, addRecentlyViewed } = useRecentlyViewed();

  const fetchProduct = async () => {
    if (abortRef.current) abortRef.current.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    setError(null);

    try {
      const data = await productsApi.getProductById(id, ctrl.signal);
      if (!data?.id) throw new Error('Product not found.');
      setProduct(data);
      addRecentlyViewed(data);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message || 'Unable to load product.');
    } finally {
      if (!ctrl.signal.aborted) setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    return () => abortRef.current?.abort();
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  const recentItems = recentlyViewed.filter((item) => item?.id !== Number(id)).slice(0, 4);

  const crumbs = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    ...(product?.category ? [{ label: formatCategory(product.category), path: `/shop?category=${encodeURIComponent(product.category)}` }] : []),
    ...(product?.title ? [{ label: product.title }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <Breadcrumbs items={crumbs} />
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer shrink-0">
          <ArrowLeft className="w-3.5 h-3.5" /> <span>Back</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-6 h-[420px] bg-zinc-100 rounded-xl border border-zinc-200" />
          <div className="lg:col-span-6 space-y-4">
            <div className="h-3 bg-zinc-100 rounded w-1/4" />
            <div className="h-8 bg-zinc-100 rounded w-4/5" />
            <div className="h-6 bg-zinc-100 rounded w-1/3" />
            <div className="h-24 bg-zinc-100 rounded-lg" />
            <div className="h-12 bg-zinc-100 rounded-lg w-full" />
          </div>
        </div>
      ) : error ? (
        <div className="py-20 text-center bg-white rounded-xl border border-zinc-200 p-8 max-w-md mx-auto shadow-subtle">
          <div className="w-12 h-12 rounded-lg bg-zinc-100 text-zinc-600 flex items-center justify-center mx-auto mb-4">
            <PackageX className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-zinc-950 mb-1">Item Unavailable</h2>
          <p className="text-xs text-zinc-500 mb-6">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" size="sm" onClick={fetchProduct}>
              <RotateCcw className="w-3.5 h-3.5" /> <span>Retry</span>
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/shop')}>Browse Catalog</Button>
          </div>
        </div>
      ) : product ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6">
              <ProductImages image={product.image} title={product.title} category={product.category} />
            </div>
            <div className="lg:col-span-6">
              <ProductInfo product={product} />
            </div>
          </div>

          <RelatedProducts category={product.category} currentProductId={product.id} />

          {recentItems.length > 0 && (
            <section className="mt-16 pt-12 border-t border-zinc-200">
              <div className="mb-6">
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">History</span>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">Recently Viewed</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentItems.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </section>
          )}
        </>
      ) : null}
    </div>
  );
}

export default ProductDetail;
