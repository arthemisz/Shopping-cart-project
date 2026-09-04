import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-zinc-500 mb-6 flex-wrap">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />}
            {item.path && !isLast ? (
              <Link
                to={item.path}
                className="hover:text-zinc-900 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={`truncate max-w-[220px] ${isLast ? 'text-zinc-900 font-medium' : ''}`}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
