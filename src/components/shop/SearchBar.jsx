import React from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'Search by product title or keyword...',
}) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2 bg-white border border-zinc-200 rounded-lg text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus-ring shadow-subtle transition-colors"
      />
      {value && (
        <button
          onClick={onClear}
          type="button"
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-700"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
