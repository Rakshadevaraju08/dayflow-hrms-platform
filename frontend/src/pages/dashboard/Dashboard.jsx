import React, { useState } from 'react';
import { 
  CalendarCheck, Clock, FileText, IndianRupee, 
  CheckCircle2, ArrowRight, Activity, MapPin
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { attendanceService } from '../../services/attendanceService';
import { leaveService } from '../../services/leaveService';
import { payrollService } from '../../services/payrollService';
import { Link } from 'react-router-dom';

// Mock Data
export function Dashboard() {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    attendanceStatus: 'BEFORE', // 'BEFORE', 'CHECKED_IN', 'COMPLETED'
    todayCheckIn: null,
    todayCheckOut: null,
    workingHours: '0h 0m',
    leaveBalance: 14,
    pendingLeaves: 0,
    netSalary: 0
  });

  React.useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [attRes, leaveRes, payRes] = await Promise.allSettled([
        attendanceService.getMyAttendance(),
        leaveService.getMyLeaves(),
        payrollService.getMyPayroll()
      ]);

      let attStatus = 'BEFORE', checkIn = null, checkOut = null, hours = '0h 0m';
      if (attRes.status === 'fulfilled' && attRes.value?.data) {
        const records = attRes.value.data;
        const todayDateStr = new Date().toISOString().split('T')[0];
        const recordToday = records.find(r => new Date(r.date).toISOString().split('T')[0] === todayDateStr);
        if (recordToday) {
          checkIn = recordToday.checkIn;
          checkOut = recordToday.checkOut;
          hours = recordToday.workingHours || '0h 0m';
          if (checkOut) attStatus = 'COMPLETED';
          else if (checkIn) attStatus = 'CHECKED_IN';
        }
      }

      let leaveBal = 14, pendLeaves = 0;
      if (leaveRes.status === 'fulfilled' && leaveRes.value?.data) {
        const leaves = leaveRes.value.data;
        pendLeaves = leaves.filter(l => l.status === 'PENDING').length;
        const used = leaves.filter(l => l.status === 'APPROVED').reduce((acc, l) => {
          const s = new Date(l.startDate);
          const e = new Date(l.endDate);
          return acc + (Math.ceil(Math.abs(e - s) / (1000 * 60 * 60 * 24)) + 1);
        }, 0);
        leaveBal = Math.max(0, 14 - used);
      }

      let netPay = 0;
      if (payRes.status === 'fulfilled' && payRes.value?.payroll) {
        netPay = payRes.value.payroll.netSalary || 0;
      }

      setMetrics({
        attendanceStatus: attStatus,
        todayCheckIn: checkIn,
        todayCheckOut: checkOut,
        workingHours: hours,
        leaveBalance: leaveBal,
        pendingLeaves: pendLeaves,
        netSalary: netPay
      });

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await attendanceService.checkIn();
      loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckOut = async () => {
    try {
      await attendanceService.checkOut();
      loadDashboardData();
    } catch (err) {
      console.error(err);
    }
  };
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };
  const formatTime = (dateStr) => {
    if (!dateStr) return '--:--';
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const SUMMARY = [
    { label: 'Attendance', value: 'Active', subtext: 'This month', icon: CalendarCheck, color: 'text-brand-600', bg: 'bg-brand-50' },
    { label: 'Leave Balance', value: `${metrics.leaveBalance} Days`, subtext: 'Available', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Pending Requests', value: metrics.pendingLeaves.toString(), subtext: 'Awaiting approval', icon: FileText, color: 'text-surface-600', bg: 'bg-surface-100' },
    { label: 'Latest Salary', value: formatCurrency(metrics.netSalary), subtext: 'Processed', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-surface-900 mb-1">
          Good morning, {user?.firstName || 'User'}
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
              <Badge variant={metrics.attendanceStatus === 'CHECKED_IN' ? 'primary' : 'default'} className="px-3 py-1 text-sm">
                {metrics.attendanceStatus === 'BEFORE' ? 'Not Checked In' : metrics.attendanceStatus === 'CHECKED_IN' ? 'Active' : 'Completed'}
              </Badge>
            </div>
            
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="grid grid-cols-2 gap-8 flex-1">
                  <div>
                    <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Check-in Time</p>
                    <p className="text-xl font-bold text-surface-900">
                      {metrics.attendanceStatus !== 'BEFORE' ? formatTime(metrics.todayCheckIn) : '--:--'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Check-out Time</p>
                    <p className="text-xl font-bold text-surface-900">
                      {metrics.attendanceStatus === 'COMPLETED' ? formatTime(metrics.todayCheckOut) : '--:--'}
                    </p>
                  </div>
                </div>
                
                <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-surface-100 pt-4 md:pt-0 md:pl-8">
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Working Hours</p>
                  <p className="text-2xl font-bold text-brand-600">
                    {metrics.attendanceStatus === 'BEFORE' ? '0h 0m' : metrics.workingHours}
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
                {metrics.attendanceStatus === 'BEFORE' && (
                  <Button size="lg" className="w-full sm:w-auto" onClick={handleCheckIn} disabled={loading}>
                    Check In Now
                  </Button>
                )}
                {metrics.attendanceStatus === 'CHECKED_IN' && (
                  <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-brand-50 border border-brand-100 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-brand-800">You are currently checked in.</span>
                    </div>
                    <Button variant="danger" size="lg" className="w-full sm:w-auto" onClick={handleCheckOut} disabled={loading}>
                      Check Out
                    </Button>
                  </div>
                )}
                {metrics.attendanceStatus === 'COMPLETED' && (
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
              <Link to="/profile" className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface-50 transition-colors group text-left block">
                <span className="text-sm font-medium text-surface-700 group-hover:text-brand-600 transition-colors">View Profile</span>
                <ArrowRight size={16} className="text-surface-400 group-hover:text-brand-600 transition-colors" />
              </Link>
              <Link to="/attendance" className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface-50 transition-colors group text-left block">
                <span className="text-sm font-medium text-surface-700 group-hover:text-brand-600 transition-colors">Attendance Log</span>
                <ArrowRight size={16} className="text-surface-400 group-hover:text-brand-600 transition-colors" />
              </Link>
              <Link to="/leave" className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface-50 transition-colors group text-left block">
                <span className="text-sm font-medium text-surface-700 group-hover:text-brand-600 transition-colors">Apply for Leave</span>
                <ArrowRight size={16} className="text-surface-400 group-hover:text-brand-600 transition-colors" />
              </Link>
              <Link to="/salary" className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface-50 transition-colors group text-left block">
                <span className="text-sm font-medium text-surface-700 group-hover:text-brand-600 transition-colors">View Salary Slip</span>
                <ArrowRight size={16} className="text-surface-400 group-hover:text-brand-600 transition-colors" />
              </Link>
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
              <div className="flex gap-4">
                <div className="mt-1 relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-surface-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-surface-900">Dashboard Loaded</p>
                  <p className="text-xs font-medium text-surface-500 mt-0.5">Just now</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
