import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '../../lib/utils';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Simple title mapping based on route
  const getPageTitle = (pathname) => {
    const path = pathname.split('/')[1];
    if (!path) return 'Dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-surface-50 font-sans text-surface-900">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-surface-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile drawer & Desktop fixed */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:static lg:translate-x-0 shadow-soft lg:shadow-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar 
          userRole="HR" 
          onClose={() => setSidebarOpen(false)} 
        />
      </div>

      {/* Main Layout Area */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Header 
          onOpenSidebar={() => setSidebarOpen(true)} 
          pageTitle={getPageTitle(location.pathname)}
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}
