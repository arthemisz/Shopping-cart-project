import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from '../components/product/ProductCard';
import { Heart, ArrowRight, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Wishlist() {
  const { wishlist, wishlistCount, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddAll = () => {
    wishlist.forEach((p) => addToCart(p, 1));
    addToast({ title: 'Added to Bag', message: `${wishlist.length} saved items added to your bag.`, type: 'cart' });
  };

  if (!wishlistCount) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400 mx-auto mb-5">
          <Heart className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-950 tracking-tight mb-2">Your Wishlist is Empty</h2>
        <p className="text-zinc-500 text-xs sm:text-sm mb-8 leading-relaxed max-w-xs mx-auto">
          Save items you love by tapping the heart icon on any product in the store.
        </p>
        <Link to="/shop" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-lg font-bold text-xs sm:text-sm tracking-wide transition-colors">
          <span>Discover Collection</span> <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-zinc-200 gap-4">
        <div>
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Saved</span>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 tracking-tight">Wishlist</h1>
            <span className="px-2.5 py-0.5 bg-zinc-100 text-zinc-800 text-xs font-bold rounded-md border border-zinc-200">
              {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          <Button variant="primary" size="sm" onClick={handleAddAll}>
            <ShoppingBag className="w-3.5 h-3.5" /> <span>Add All to Bag</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={clearWishlist}>
            <Trash2 className="w-3.5 h-3.5 text-zinc-400" /> <span>Clear</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
