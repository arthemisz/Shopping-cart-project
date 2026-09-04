import React from 'react';

const variants = {
  primary:
    'bg-zinc-900 text-white hover:bg-zinc-800 border border-transparent shadow-subtle',
  secondary:
    'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-transparent',
  outline:
    'bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300',
  ghost:
    'bg-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-transparent',
  danger:
    'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/60',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs font-semibold rounded-md',
  md: 'px-4 py-2.5 text-sm font-semibold rounded-lg',
  lg: 'px-6 py-3.5 text-base font-semibold rounded-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 transition-colors cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed focus-ring ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
