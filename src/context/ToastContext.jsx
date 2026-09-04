import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, ShoppingBag, Heart, X, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  cart: <ShoppingBag className="w-4 h-4 text-zinc-300" />,
  wishlist: <Heart className="w-4 h-4 text-rose-400 fill-current" />,
  success: <Check className="w-4 h-4 text-emerald-400" />,
  error: <AlertCircle className="w-4 h-4 text-rose-400" />,
  info: <Info className="w-4 h-4 text-zinc-300" />,
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(({ title, message, type = 'success', duration = 2800 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    if (duration > 0) setTimeout(() => removeToast(id), duration);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div aria-live="polite" className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map(({ id, title, message, type }) => (
          <div key={id} className="pointer-events-auto flex items-start gap-3 p-3.5 bg-zinc-900 text-white rounded-lg shadow-elevated border border-zinc-800">
            <div className="shrink-0 mt-0.5">{ICONS[type] || ICONS.info}</div>
            <div className="flex-1 min-w-0">
              {title && <p className="text-xs font-semibold tracking-tight text-white leading-tight">{title}</p>}
              {message && <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug line-clamp-2">{message}</p>}
            </div>
            <button onClick={() => removeToast(id)} className="text-zinc-500 hover:text-white p-0.5 rounded transition-colors" aria-label="Close">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export default ToastContext;
