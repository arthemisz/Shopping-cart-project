import { useState, useCallback } from 'react';
import { storageGet, storageSet, storageRemove } from '../utils/storage';

const RECENTLY_VIEWED_KEY = 'nexus_store_recent_v2';
const MAX_ITEMS = 6;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    return storageGet(RECENTLY_VIEWED_KEY, []);
  });

  const addRecentlyViewed = useCallback((product) => {
    if (!product || !product.id) return;

    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      storageSet(RECENTLY_VIEWED_KEY, updated);
      return updated;
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
    storageRemove(RECENTLY_VIEWED_KEY);
  }, []);

  return { recentlyViewed, addRecentlyViewed, clearRecentlyViewed };
}

export default useRecentlyViewed;
