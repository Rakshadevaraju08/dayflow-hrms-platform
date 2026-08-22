import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from '../ui/Button';

export function EmptyState({ 
  icon: Icon = Inbox, 
  title = "No data found", 
  description = "There is currently no data to display here.",
  actionLabel,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-300 w-full bg-white rounded-2xl border border-surface-100 shadow-soft border-dashed min-h-[300px]">
      <div className="w-16 h-16 bg-surface-50 rounded-full flex items-center justify-center mb-4 text-surface-400">
        <Icon size={32} />
      </div>
      <h3 className="text-lg font-bold text-surface-900 mb-2">{title}</h3>
      <p className="text-surface-500 max-w-sm mb-6">{description}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
