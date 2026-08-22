import React from 'react';
import { cn } from '../../lib/utils';

export function Badge({ className, variant = 'default', ...props }) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2";
  
  const variants = {
    default: "bg-surface-100 text-surface-900 hover:bg-surface-200",
    primary: "bg-brand-100 text-brand-700 hover:bg-brand-200",
    success: "bg-green-100 text-green-700 hover:bg-green-200",
    warning: "bg-amber-100 text-amber-700 hover:bg-amber-200",
    danger: "bg-red-100 text-red-700 hover:bg-red-200",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}
