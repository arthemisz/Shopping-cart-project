import React from 'react';

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-zinc-200/70 p-4 flex flex-col h-full">
      <div className="pt-[85%] bg-zinc-50 rounded-lg mb-4" />
      <div className="space-y-2 flex-1">
        <div className="h-3 bg-zinc-100 rounded w-1/3" />
        <div className="h-4 bg-zinc-100 rounded w-4/5" />
        <div className="h-4 bg-zinc-100 rounded w-1/2" />
      </div>
      <div className="pt-4 border-t border-zinc-100 mt-4 flex items-center justify-between">
        <div className="h-5 bg-zinc-100 rounded w-16" />
        <div className="h-8 bg-zinc-100 rounded w-24" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default SkeletonCard;
