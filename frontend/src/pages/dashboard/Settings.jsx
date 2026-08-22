import React, { useState } from 'react';
import { 
  User, Bell, Palette, LogOut, CheckCircle2, ChevronRight, Moon, Sun
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

const PREFERENCES_KEY = 'dayflow_notification_preferences';
const DEFAULT_PREFERENCES = {
  leaveApprovals: true,
  attendanceReminders: true,
  payrollUpdates: true,
  companyAnnouncements: false,
};

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState('light');
  const [preferences, setPreferences] = useState(() => {
    try {
      return {
        ...DEFAULT_PREFERENCES,
        ...JSON.parse(localStorage.getItem(PREFERENCES_KEY) || '{}'),
      };
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });
  const [preferencesSaved, setPreferencesSaved] = useState(false);
  
  const TABS = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const notificationPreferences = [
    { key: 'leaveApprovals', title: 'Leave Approvals', desc: 'Get notified when your leave is approved or rejected.' },
    { key: 'attendanceReminders', title: 'Attendance Reminders', desc: 'Daily reminders to check in and check out.' },
    { key: 'payrollUpdates', title: 'Payroll Updates', desc: 'Alerts when new salary slips are generated.' },
    { key: 'companyAnnouncements', title: 'Company Announcements', desc: 'Important news from HR.' },
  ];

  const handlePreferenceChange = (key) => {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
    setPreferencesSaved(false);
  };

  const savePreferences = () => {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    setPreferencesSaved(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-surface-900 mb-1">Settings</h1>
        <p className="text-surface-500 font-medium">Manage your account preferences and application settings.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Settings Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          <Card className="border-transparent shadow-soft bg-white">
            <div className="p-2 flex flex-col gap-1">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-left ${
                    activeTab === tab.id 
                      ? 'bg-brand-50 text-brand-700 font-semibold' 
                      : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                  }`}
                >
                  <tab.icon size={18} className={activeTab === tab.id ? 'text-brand-600' : 'text-surface-400'} />
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-surface-100">
              <Button variant="danger" className="w-full bg-red-50 text-red-600 hover:bg-red-100 border-0">
                <LogOut size={16} className="mr-2" /> Logout
              </Button>
            </div>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <Card className="border-transparent shadow-soft bg-white min-h-[400px]">
            <CardContent className="p-8">
              
              {activeTab === 'profile' && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-xl font-bold text-surface-900 mb-6">Profile Settings</h2>
                  <p className="text-surface-500 mb-8">To update your profile information, please navigate to the Profile page.</p>
                  
                  <div className="p-4 bg-surface-50 border border-surface-200 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-surface-900">Go to Profile</p>
                      <p className="text-sm text-surface-500">View and edit your personal details.</p>
                    </div>
                    <Button variant="outline">
                      View Profile <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-xl font-bold text-surface-900 mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {notificationPreferences.map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 border border-surface-100 rounded-xl hover:border-brand-200 transition-colors">
                        <div>
                          <p className="font-semibold text-surface-900">{item.title}</p>
                          <p className="text-sm text-surface-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={preferences[item.key]}
                            onChange={() => handlePreferenceChange(item.key)}
                          />
                          <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex items-center gap-4">
                      <Button onClick={savePreferences}>Save Preferences</Button>
                      {preferencesSaved && (
                        <span className="flex items-center gap-1 text-sm font-medium text-green-600" role="status">
                          <CheckCircle2 size={16} /> Preferences saved
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6 animate-in fade-in">
                  <h2 className="text-xl font-bold text-surface-900 mb-6">Appearance</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`p-6 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all ${theme === 'light' ? 'border-brand-500 bg-brand-50' : 'border-surface-200 hover:border-brand-300 bg-white'}`}
                    >
                      <Sun size={32} className={theme === 'light' ? 'text-brand-600' : 'text-surface-400'} />
                      <span className="font-semibold text-surface-900">Light Mode</span>
                    </button>
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`p-6 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all ${theme === 'dark' ? 'border-brand-500 bg-brand-50' : 'border-surface-200 hover:border-brand-300 bg-white'}`}
                    >
                      <Moon size={32} className={theme === 'dark' ? 'text-brand-600' : 'text-surface-400'} />
                      <span className="font-semibold text-surface-900">Dark Mode</span>
                      <span className="text-xs text-brand-600 font-bold px-2 py-0.5 bg-brand-100 rounded-full">Coming Soon</span>
                    </button>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
