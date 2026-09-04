import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice, formatCategory } from '../../utils/formatters';
import { createProductUrl } from '../../constants/routes';

export function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { addToast } = useToast();

  const handleRemove = () => {
    removeFromCart(item.id);
    addToast({ title: 'Item Removed', message: `${item.title} was removed from your bag.`, type: 'info' });
  };

  const productUrl = createProductUrl(item.id);

  return (
    <div className="py-5 border-b border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 last:border-b-0">
      {/* Left */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Link to={productUrl} className="w-20 h-20 bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 flex items-center justify-center shrink-0 hover:border-zinc-400 transition-colors">
          <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
        </Link>
        <div className="flex-1 min-w-0 space-y-1">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">{formatCategory(item.category)}</span>
          <Link to={productUrl} className="text-sm font-semibold text-zinc-900 hover:text-zinc-600 transition-colors line-clamp-1 block">
            {item.title}
          </Link>
          <span className="text-xs text-zinc-500 block">Unit: {formatPrice(item.price)}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-100">
        <div className="flex items-center border border-zinc-200 bg-zinc-50 rounded-md p-1">
          <button
            onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-6 h-6 rounded bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Decrease"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-8 text-center font-bold text-xs text-zinc-900">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-6 h-6 rounded bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Increase"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <div className="text-right min-w-[75px]">
          <span className="text-sm font-bold text-zinc-950">{formatPrice(Number(item.price) * item.quantity)}</span>
        </div>

        <button onClick={handleRemove} className="p-1.5 text-zinc-400 hover:text-rose-600 rounded transition-colors cursor-pointer" aria-label="Remove item">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
