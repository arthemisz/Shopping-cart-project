import React from 'react';

const badgeVariants = {
  default: 'bg-zinc-100 text-zinc-700 border-zinc-200/70',
  dark: 'bg-zinc-900 text-zinc-100 border-zinc-900',
  outline: 'bg-white text-zinc-700 border-zinc-200',
  sale: 'bg-amber-50 text-amber-900 border-amber-200/80 font-semibold',
  success: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
};

export function Badge({
  children,
  variant = 'default',
  className = '',
  ...props
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase rounded-full border ${
        badgeVariants[variant] || badgeVariants.default
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
