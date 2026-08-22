import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, User, CalendarCheck, Clock, 
  CircleDollarSign, Users, Settings, LogOut, X
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function Sidebar({ userRole = 'EMPLOYEE', onClose, className }) {
  const employeeNav = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
    { name: 'Leave', path: '/leave', icon: Clock },
    { name: 'Salary', path: '/salary', icon: CircleDollarSign },
  ];

  const adminNav = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Employees', path: '/admin/employees', icon: Users },
    { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
    { name: 'Leave Requests', path: '/leave-requests', icon: Clock },
    { name: 'Payroll', path: '/payroll', icon: CircleDollarSign },
  ];

  const navItems = userRole === 'ADMIN' || userRole === 'HR' ? adminNav : employeeNav;

  return (
    <aside className={cn("flex flex-col h-full bg-white border-r border-surface-200 w-[260px]", className)}>
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-surface-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-brand-600 rounded-[6px]" />
            <span className="text-xl font-bold tracking-tight text-surface-900">Dayflow</span>
          </div>
          <p className="text-[11px] text-surface-500 font-medium tracking-wide">
            Every workday, perfectly aligned.
          </p>
        </div>
        {/* Mobile Close Button */}
        <button onClick={onClose} className="lg:hidden text-surface-400 hover:text-surface-700">
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-full text-sm font-medium transition-colors",
                isActive 
                  ? "bg-brand-50 text-brand-600" 
                  : "text-surface-600 hover:bg-surface-50 hover:text-surface-900"
              )
            }
          >
            <item.icon size={18} className="stroke-[1.75]" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer Nav */}
      <div className="p-4 border-t border-surface-100 space-y-1.5">
        <NavLink
          to="/settings"
          onClick={onClose}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-full text-sm font-medium transition-colors",
              isActive 
                ? "bg-brand-50 text-brand-600" 
                : "text-surface-600 hover:bg-surface-50 hover:text-surface-900"
            )
          }
        >
          <Settings size={18} className="stroke-[1.75]" />
          Settings
        </NavLink>
        <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-full text-sm font-medium text-surface-600 hover:bg-red-50 hover:text-red-600 transition-colors">
          <LogOut size={18} className="stroke-[1.75]" />
          Logout
        </button>
      </div>
    </aside>
  );
}
