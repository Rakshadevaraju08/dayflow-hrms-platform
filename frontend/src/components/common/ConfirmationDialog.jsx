import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Button } from '../ui/Button';

export function ConfirmationDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-soft-lg w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="p-6 text-center space-y-4">
          <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${variant === 'danger' ? 'bg-red-50 text-red-600' : 'bg-brand-50 text-brand-600'}`}>
            <AlertCircle size={24} />
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-surface-900">{title}</h2>
            <p className="text-surface-500 mt-2 text-sm">{message}</p>
          </div>
        </div>

        <div className="p-4 bg-surface-50 border-t border-surface-100 flex gap-3">
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1 bg-white"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button 
            type="button" 
            variant={variant === 'danger' ? 'danger' : 'default'}
            className="flex-1"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        </div>

      </div>
    </div>
  );
}
