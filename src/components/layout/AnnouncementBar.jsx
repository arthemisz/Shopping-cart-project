import React from 'react';
import { Link } from 'react-router-dom';

export function AnnouncementBar() {
  return (
    <div className="bg-zinc-950 text-zinc-300 text-[11px] font-medium tracking-wider uppercase py-2 px-4 text-center border-b border-zinc-900">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span>Complimentary express delivery on orders over $50</span>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-100 font-semibold">Code: NEXUS15 for 15% off</span>
        <Link to="/shop" className="underline underline-offset-4 text-white hover:text-zinc-300 ml-1">
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default AnnouncementBar;
