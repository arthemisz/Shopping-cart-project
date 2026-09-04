import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageGet, storageSet } from '../utils/storage';

const KEY = 'nexus_store_wishlist_v2';
const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => storageGet(KEY, []));

  useEffect(() => {
    storageSet(KEY, wishlist);
  }, [wishlist]);

  const toggleWishlist = (product) => {
    let willAdd = false;
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      willAdd = !exists;
      return exists ? prev.filter((i) => i.id !== product.id) : [...prev, product];
    });
    return willAdd;
  };

  const removeFromWishlist = (id) => setWishlist((prev) => prev.filter((i) => i.id !== id));
  const isInWishlist = (id) => wishlist.some((i) => i.id === id);
  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};

export default WishlistContext;
