import { useState, useEffect, useCallback, useRef } from 'react';
import { productsApi } from '../api/products.api';

let categoriesCache = null;

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const fetchCategories = useCallback(async (ignoreCache = false) => {
    if (!ignoreCache && categoriesCache) {
      setCategories(categoriesCache);
      setLoading(false);
      return;
    }
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    setError(null);

    try {
      const data = await productsApi.getCategories(ctrl.signal);
      categoriesCache = data;
      setCategories(data);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message || 'Unable to load categories.');
    } finally {
      if (!ctrl.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    return () => abortRef.current?.abort();
  }, [fetchCategories]);

  return { categories, loading, error, refetch: () => fetchCategories(true) };
}

export default useCategories;
