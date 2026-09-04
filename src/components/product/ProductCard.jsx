import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Check, Plus, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice, formatCategory, formatRating } from '../../utils/formatters';
import { createProductUrl } from '../../constants/routes';

export function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const productUrl = createProductUrl(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    addToast({ title: 'Added to Bag', message: `${product.title} added to bag.`, type: 'cart' });
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    addToast({ title: added ? 'Saved to Wishlist' : 'Removed from Wishlist', message: product.title, type: 'wishlist' });
  };

  return (
    <div className="group bg-white rounded-xl border border-zinc-200 flex flex-col h-full overflow-hidden hover:border-zinc-400 transition-colors shadow-subtle">
      {/* Visual */}
      <div className="relative pt-[92%] bg-zinc-50 p-6 flex items-center justify-center border-b border-zinc-100">
        <Link to={productUrl} className="absolute inset-0 p-6 flex items-center justify-center">
          <img src={product.image} alt={product.title} loading="lazy" className="max-h-full max-w-full object-contain" />
        </Link>
        <span className="absolute top-3 left-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 py-0.5 bg-white/90 border border-zinc-200/60 rounded">
          {formatCategory(product.category)}
        </span>
        <button
          onClick={handleToggleWishlist}
          aria-label="Wishlist"
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 border border-zinc-200/80 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-1 font-medium text-zinc-700">
            <Star className="w-3 h-3 text-zinc-950 fill-zinc-950" />
            <span>{formatRating(product.rating?.rate)}</span>
          </div>
          <span>({product.rating?.count || 0} reviews)</span>
        </div>

        <Link to={productUrl} className="font-semibold text-zinc-900 hover:text-zinc-600 transition-colors text-xs sm:text-sm line-clamp-2 leading-snug flex-1">
          {product.title}
        </Link>

        <div className="pt-3 border-t border-zinc-100 mt-auto flex items-center justify-between gap-3">
          <span className="text-base font-bold text-zinc-950">{formatPrice(product.price)}</span>
          <button
            onClick={handleAddToCart}
            disabled={justAdded}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer ${
              justAdded ? 'bg-emerald-700 text-white' : inCart ? 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200' : 'bg-zinc-950 text-white hover:bg-zinc-800'
            }`}
          >
            {justAdded ? (
              <><Check className="w-3.5 h-3.5" /><span>Added</span></>
            ) : inCart ? (
              <><Plus className="w-3.5 h-3.5" /><span>In Bag</span></>
            ) : (
              <span>Add to Bag</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
