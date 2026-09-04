import React, { useState } from 'react';
import { Star, Heart, Check, Truck, ShieldCheck, RotateCcw, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice, formatCategory, formatRating } from '../../utils/formatters';

const PERKS = [
  { icon: Truck, title: 'Complimentary Shipping', subtitle: 'Orders over $50' },
  { icon: RotateCcw, title: '30-Day Returns', subtitle: 'Hassle-free exchange' },
  { icon: ShieldCheck, title: '2-Year Warranty', subtitle: '100% authentic item' },
];

export function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart, getItemQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const isFavorited = isInWishlist(product.id);
  const inCartQuantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    addToast({ title: 'Added to Bag', message: `${quantity} × ${product.title}`, type: 'cart' });
    setTimeout(() => setAdded(false), 1200);
  };

  const handleWishlistToggle = () => {
    const addedToList = toggleWishlist(product);
    addToast({
      title: addedToList ? 'Saved to Wishlist' : 'Removed from Wishlist',
      message: product.title,
      type: 'wishlist',
    });
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Category & Title */}
      <div>
        <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
          {formatCategory(product.category)}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight leading-tight">
          {product.title}
        </h1>
      </div>

      {/* Rating & Stock */}
      <div className="flex items-center justify-between pb-5 border-b border-zinc-200 gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded">
            <Star className="w-3.5 h-3.5 fill-zinc-950 text-zinc-950" />
            <span>{formatRating(product.rating?.rate)}</span>
          </div>
          <span className="text-zinc-500">({product.rating?.count || 0} reviews)</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>In Stock • Ready to Ship</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl sm:text-4xl font-black text-zinc-950">{formatPrice(product.price)}</span>
        <span className="text-xs text-zinc-500 font-medium">USD, tax calculated at checkout</span>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Overview</h3>
        <p className="text-zinc-600 text-sm leading-relaxed">{product.description}</p>
      </div>

      {/* Action Area: Quantity & Add to Cart */}
      <div className="space-y-4 pt-6 border-t border-zinc-200 mt-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-zinc-200 bg-zinc-50 rounded-lg p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-bold text-sm text-zinc-950">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`flex-1 py-3.5 px-6 rounded-lg font-bold text-sm tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              added ? 'bg-emerald-700 text-white' : 'bg-zinc-950 hover:bg-zinc-800 text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> <span>Added to Bag</span>
              </>
            ) : (
              <span>Add to Bag • {formatPrice(Number(product.price) * quantity)}</span>
            )}
          </button>

          <button
            onClick={handleWishlistToggle}
            className={`p-3.5 rounded-lg border transition-colors cursor-pointer flex items-center justify-center ${
              isFavorited ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-white border-zinc-200 text-zinc-500 hover:text-rose-600 hover:border-zinc-300'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-rose-500' : ''}`} />
          </button>
        </div>

        {inCartQuantity > 0 && (
          <p className="text-xs text-zinc-600 bg-zinc-100 rounded-md p-2 text-center font-medium">
            You currently have <strong>{inCartQuantity}</strong> in your shopping bag.
          </p>
        )}

        {/* Perks */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-zinc-100">
          {PERKS.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="p-3 bg-zinc-50 rounded-lg border border-zinc-200/60 text-center space-y-1">
              <Icon className="w-4 h-4 text-zinc-700 mx-auto" />
              <p className="text-[11px] font-bold text-zinc-900">{title}</p>
              <p className="text-[10px] text-zinc-500">{subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
