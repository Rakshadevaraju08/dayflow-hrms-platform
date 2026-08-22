import React, { useState } from 'react';
import { 
  CalendarCheck, Clock, FileText, IndianRupee, 
  CheckCircle2, ArrowRight, Activity, MapPin
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

// Mock Data
const USER_NAME = "Raksha";
const SUMMARY = [
  { label: 'Attendance', value: '96%', subtext: 'This month', icon: CalendarCheck, color: 'text-brand-600', bg: 'bg-brand-50' },
  { label: 'Leave Balance', value: '14 Days', subtext: 'Available', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Pending Requests', value: '1', subtext: 'Awaiting approval', icon: FileText, color: 'text-surface-600', bg: 'bg-surface-100' },
  { label: 'Latest Salary', value: '₹45,000', subtext: 'Processed May 2026', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
];

const RECENT_ACTIVITY = [
  { id: 1, title: 'Checked In', time: '09:12 AM', type: 'Attendance' },
  { id: 2, title: 'Sick Leave Approved', time: 'Yesterday', type: 'Leave' },
  { id: 3, title: 'Profile Updated', time: 'May 18', type: 'Profile' },
];

const QUICK_ACTIONS = [
  { label: 'View Profile', icon: ArrowRight },
  { label: 'Attendance Log', icon: ArrowRight },
  { label: 'Apply for Leave', icon: ArrowRight },
  { label: 'View Salary Slip', icon: ArrowRight },
];

export function Dashboard() {
  const [attendanceState, setAttendanceState] = useState('CHECKED_IN'); // 'BEFORE', 'CHECKED_IN', 'COMPLETED'
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-surface-900 mb-1">
          Good morning, {USER_NAME}
        </h1>
        <p className="text-surface-500 font-medium">Here's your workday overview.</p>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY.map((item, idx) => (
          <Card key={idx} className="border-transparent shadow-soft hover:shadow-soft-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
                  <item.icon size={24} className="stroke-[1.5]" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-surface-900 mb-1">{item.value}</p>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-surface-700">{item.label}</span>
                  <span className="text-xs text-surface-500">{item.subtext}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column - Today's Attendance & Activity */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Today's Attendance Card */}
          <Card className="overflow-hidden border-transparent shadow-soft">
            <div className="bg-brand-50/50 border-b border-surface-100 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-surface-900">Today's Attendance</h2>
                <p className="text-sm text-surface-500">{today}</p>
              </div>
              <Badge variant={attendanceState === 'CHECKED_IN' ? 'primary' : 'default'} className="px-3 py-1 text-sm">
                {attendanceState === 'BEFORE' ? 'Not Checked In' : attendanceState === 'CHECKED_IN' ? 'Active' : 'Completed'}
              </Badge>
            </div>
            
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="grid grid-cols-2 gap-8 flex-1">
                  <div>
                    <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Check-in Time</p>
                    <p className="text-xl font-bold text-surface-900">
                      {attendanceState !== 'BEFORE' ? '09:12 AM' : '--:--'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Check-out Time</p>
                    <p className="text-xl font-bold text-surface-900">
                      {attendanceState === 'COMPLETED' ? '06:05 PM' : '--:--'}
                    </p>
                  </div>
                </div>
                
                <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-surface-100 pt-4 md:pt-0 md:pl-8">
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Working Hours</p>
                  <p className="text-2xl font-bold text-brand-600">
                    {attendanceState === 'BEFORE' ? '0h 0m' : attendanceState === 'CHECKED_IN' ? '4h 15m' : '8h 53m'}
                  </p>
                </div>
              </div>

              {/* Weekly Visualization */}
              <div className="mb-8 p-4 rounded-2xl bg-surface-50 border border-surface-100 flex items-center justify-between">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i < 3 ? 'bg-green-100 text-green-700' : i === 3 ? 'bg-brand-600 text-white shadow-md' : 'bg-surface-200 text-surface-500'}`}>
                      {i < 3 ? <CheckCircle2 size={16} /> : day.charAt(0)}
                    </div>
                    <span className="text-[10px] font-bold text-surface-500 uppercase">{day}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="flex justify-center">
                {attendanceState === 'BEFORE' && (
                  <Button size="lg" className="w-full sm:w-auto" onClick={() => setAttendanceState('CHECKED_IN')}>
                    Check In Now
                  </Button>
                )}
                {attendanceState === 'CHECKED_IN' && (
                  <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-brand-50 border border-brand-100 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-brand-800">You are currently checked in.</span>
                    </div>
                    <Button variant="danger" size="lg" className="w-full sm:w-auto" onClick={() => setAttendanceState('COMPLETED')}>
                      Check Out
                    </Button>
                  </div>
                )}
                {attendanceState === 'COMPLETED' && (
                  <div className="w-full text-center p-4 bg-surface-50 rounded-2xl border border-surface-200 text-surface-600 font-medium">
                    Attendance completed for today.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Side Column - Activity & Actions */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <Card className="border-transparent shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {QUICK_ACTIONS.map((action, idx) => (
                <button key={idx} className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface-50 transition-colors group text-left">
                  <span className="text-sm font-medium text-surface-700 group-hover:text-brand-600 transition-colors">
                    {action.label}
                  </span>
                  <action.icon size={16} className="text-surface-400 group-hover:text-brand-600 transition-colors" />
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-transparent shadow-soft">
            <CardHeader className="pb-4 border-b border-surface-50">
              <div className="flex items-center gap-2 text-surface-900">
                <Activity size={18} className="text-brand-500" />
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-5">
              {RECENT_ACTIVITY.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="mt-1 relative flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-surface-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-900">{activity.title}</p>
                    <p className="text-xs font-medium text-surface-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
