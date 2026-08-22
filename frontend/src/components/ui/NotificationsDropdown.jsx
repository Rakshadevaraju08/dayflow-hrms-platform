import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, Clock, FileText, User } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'leave_approved', text: 'Your leave request for 18 May was approved.', time: '10m ago', read: false },
  { id: 2, type: 'attendance', text: 'Don\'t forget to check out today.', time: '1h ago', read: false },
  { id: 3, type: 'profile', text: 'Your profile update was successful.', time: '1d ago', read: true },
  { id: 4, type: 'leave_rejected', text: 'Your leave request for 25 May was rejected.', time: '2d ago', read: true },
];

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'leave_approved': return <Check size={16} className="text-green-600" />;
      case 'leave_rejected': return <Clock size={16} className="text-red-600" />;
      case 'attendance': return <Clock size={16} className="text-brand-600" />;
      case 'profile': return <User size={16} className="text-surface-600" />;
      default: return <Bell size={16} className="text-surface-600" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'leave_approved': return 'bg-green-100';
      case 'leave_rejected': return 'bg-red-100';
      case 'attendance': return 'bg-brand-100';
      case 'profile': return 'bg-surface-100';
      default: return 'bg-surface-100';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-surface-400 hover:text-brand-600 transition-colors relative focus:outline-none"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-soft-xl border border-surface-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="flex items-center justify-between p-4 border-b border-surface-100 bg-surface-50/50">
            <h3 className="font-bold text-surface-900">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-[320px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-surface-500 text-sm">
                You're all caught up!
              </div>
            ) : (
              <div className="divide-y divide-surface-50">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-4 flex gap-3 hover:bg-surface-50 transition-colors cursor-pointer ${!notif.read ? 'bg-brand-50/30' : ''}`}
                    onClick={() => {
                      setNotifications(notifications.map(n => n.id === notif.id ? { ...n, read: true } : n));
                    }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getIconBg(notif.type)}`}>
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!notif.read ? 'font-semibold text-surface-900' : 'text-surface-700'}`}>
                        {notif.text}
                      </p>
                      <p className="text-xs text-surface-400 mt-1 font-medium">{notif.time}</p>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 shrink-0"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-surface-100 bg-surface-50/50 text-center">
            <button className="text-sm font-semibold text-surface-600 hover:text-surface-900 transition-colors">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
