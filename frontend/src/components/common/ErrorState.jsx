import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export function ErrorState({ 
  title = "Something went wrong", 
  message = "An error occurred while loading this data. Please try again.",
  onRetry 
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300 w-full bg-red-50 rounded-2xl border border-red-100 min-h-[250px]">
      <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle size={28} />
      </div>
      <h3 className="text-lg font-bold text-red-900 mb-2">{title}</h3>
      <p className="text-red-700/80 max-w-sm mb-6">{message}</p>
      
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="bg-white border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800">
          <RefreshCcw size={16} className="mr-2" /> Try Again
        </Button>
      )}
    </div>
  );
}
