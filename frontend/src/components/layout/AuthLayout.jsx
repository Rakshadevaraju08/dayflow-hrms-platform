import React from 'react';
import { Outlet } from 'react-router-dom';
import { Card } from '../ui/Card';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-brand-50 flex flex-col items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-[480px]">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-brand-600 rounded-[8px] shadow-sm" />
            <span className="text-2xl font-bold tracking-tight text-brand-900">Dayflow</span>
          </div>
          <p className="text-sm font-medium text-surface-500 tracking-wide">
            Every workday, perfectly aligned.
          </p>
        </div>

        {/* Content Card */}
        <Card className="p-8 sm:p-10 shadow-soft-lg w-full">
          <Outlet />
        </Card>
      </div>
    </div>
  );
}
