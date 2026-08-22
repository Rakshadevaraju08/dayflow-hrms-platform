import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm',
    secondary: 'bg-brand-50 text-brand-700 hover:bg-brand-100',
    outline: 'border border-surface-200 bg-white hover:bg-surface-50 text-surface-700',
    ghost: 'hover:bg-surface-100 text-surface-600 hover:text-surface-900',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100',
  };

  const sizes = {
    default: 'h-10 py-2 px-6 text-sm',
    sm: 'h-8 px-4 text-xs',
    lg: 'h-12 px-8 text-base',
    icon: 'h-10 w-10',
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});
Button.displayName = 'Button';
