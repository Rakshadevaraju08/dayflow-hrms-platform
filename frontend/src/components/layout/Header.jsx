import React from 'react';
import { Menu, Search, ChevronDown } from 'lucide-react';
import { Input } from '../ui/Input';
import { NotificationsDropdown } from '../ui/NotificationsDropdown';
import { useAuth } from '../../context/AuthContext';

export function Header({ onOpenSidebar, pageTitle = "Dashboard" }) {
  const { user } = useAuth();
  
  const getInitials = (name) => name ? name.charAt(0) : 'U';


  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-surface-200 bg-white px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden text-surface-500 hover:text-surface-900 focus:outline-none"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-surface-900 hidden sm:block">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:block w-72">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search employees, leaves..." 
              className="pl-10 h-10 rounded-full bg-surface-50 border-transparent focus:bg-white"
            />
          </div>
        </div>

        <NotificationsDropdown />

        <div className="flex items-center gap-3 cursor-pointer group pl-2 border-l border-surface-200">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-surface-900">{user?.firstName || 'User'}</span>
            <span className="text-xs font-medium text-surface-500 capitalize">{user?.role?.toLowerCase() || 'Employee'}</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm uppercase">
            {getInitials(user?.firstName)}
          </div>
          <ChevronDown size={16} className="text-surface-400 group-hover:text-surface-900 transition-colors hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
