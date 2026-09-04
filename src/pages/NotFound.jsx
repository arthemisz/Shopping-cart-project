import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto space-y-5">
        <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 block">
          404 Error
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
          The item or page you are attempting to view is unavailable, moved, or does not exist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold rounded-lg text-xs tracking-wide transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold rounded-lg text-xs tracking-wide transition-colors"
          >
            <span>Browse Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
