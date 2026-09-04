import { useState, useEffect, useCallback, useRef } from 'react';
import { productsApi } from '../api/products.api';

const cache = new Map();

export function useProducts(category = null) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheKey = category ? `cat_${category}` : 'all';
  const abortRef = useRef(null);

  const fetchProducts = useCallback(async (ignoreCache = false) => {
    if (!ignoreCache && cache.has(cacheKey)) {
      setProducts(cache.get(cacheKey));
      setLoading(false);
      return;
    }
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    setError(null);

    try {
      const data = await productsApi.getProducts(category, ctrl.signal);
      cache.set(cacheKey, data);
      setProducts(data);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message || 'Unable to retrieve products.');
    } finally {
      if (!ctrl.signal.aborted) setLoading(false);
    }
  }, [category, cacheKey]);

  useEffect(() => {
    fetchProducts();
    return () => abortRef.current?.abort();
  }, [fetchProducts]);

  return { products, loading, error, refetch: () => fetchProducts(true) };
}

export default useProducts;
