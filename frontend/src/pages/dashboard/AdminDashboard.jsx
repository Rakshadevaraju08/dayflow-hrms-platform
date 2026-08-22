import React from 'react';
import { 
  Users, UserCheck, UserMinus, FileClock, 
  MoreHorizontal, Check, X, Clock, Activity, Briefcase
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { employeeService } from '../../services/employeeService';
import { attendanceService } from '../../services/attendanceService';
import { leaveService } from '../../services/leaveService';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';

// Mock Data
export function AdminDashboard() {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    totalEmployees: 0,
    presentToday: 0,
    onLeaveToday: 0,
    pendingLeavesCount: 0,
    employees: [],
    pendingLeaves: []
  });

  React.useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [empRes, attRes, leaveRes] = await Promise.allSettled([
        employeeService.getAllEmployees(),
        attendanceService.getAllAttendance(),
        leaveService.getAllLeaves()
      ]);

      let employees = [];
      let totalEmp = 0;
      if (empRes.status === 'fulfilled' && empRes.value?.data) {
        employees = empRes.value.data;
        totalEmp = employees.length;
      }

      let presentCount = 0;
      if (attRes.status === 'fulfilled' && attRes.value?.data) {
        const todayStr = new Date().toISOString().split('T')[0];
        const todaysRecords = attRes.value.data.filter(r => new Date(r.date).toISOString().split('T')[0] === todayStr);
        presentCount = todaysRecords.length;
      }

      let pendCount = 0;
      let onLeaveCount = 0;
      let pendLeaves = [];
      if (leaveRes.status === 'fulfilled' && leaveRes.value?.data) {
        const leaves = leaveRes.value.data;
        pendLeaves = leaves.filter(l => l.status === 'PENDING').slice(0, 5); // top 5
        pendCount = leaves.filter(l => l.status === 'PENDING').length;
        
        const today = new Date();
        today.setHours(0,0,0,0);
        onLeaveCount = leaves.filter(l => {
          if (l.status !== 'APPROVED') return false;
          const start = new Date(l.startDate); start.setHours(0,0,0,0);
          const end = new Date(l.endDate); end.setHours(23,59,59,999);
          return today >= start && today <= end;
        }).length;
      }

      setMetrics({
        totalEmployees: totalEmp,
        presentToday: presentCount,
        onLeaveToday: onLeaveCount,
        pendingLeavesCount: pendCount,
        employees: employees.slice(0, 5), // show 5
        pendingLeaves: pendLeaves
      });

    } catch (err) {
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveAction = async (id, status) => {
    try {
      await leaveService.updateLeaveStatus(id, { status });
      loadDashboard();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={loadDashboard} />;

  const SUMMARY = [
    { label: 'Total Employees', value: metrics.totalEmployees.toString(), icon: Users, color: 'text-brand-600', bg: 'bg-brand-50' },
    { label: 'Present Today', value: metrics.presentToday.toString(), icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'On Leave', value: metrics.onLeaveToday.toString(), icon: UserMinus, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Pending Leaves', value: metrics.pendingLeavesCount.toString(), icon: FileClock, color: 'text-surface-600', bg: 'bg-surface-100' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-surface-900 mb-1">
          Good morning, {user?.firstName || 'Admin'}
        </h1>
        <p className="text-surface-500 font-medium">Here's your workforce overview.</p>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY.map((item, idx) => (
          <Card key={idx} className="border-transparent shadow-soft hover:shadow-soft-lg transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                  <item.icon size={24} className="stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-surface-900">{item.value}</p>
                  <p className="text-sm font-semibold text-surface-600">{item.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column - Employee Table */}
        <div className="lg:col-span-2 space-y-8">
          
          <Card className="border-transparent shadow-soft overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-surface-100">
              <CardTitle className="text-lg">Employee Overview</CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs font-semibold text-surface-500 uppercase bg-surface-50/50">
                  <tr>
                    <th className="px-6 py-4 font-semibold tracking-wider">Employee</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">ID</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Department</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Attendance</th>
                    <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {metrics.employees.map((emp) => (
                    <tr key={emp.employeeId} className="hover:bg-surface-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0 uppercase">
                            {emp.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-surface-900">{emp.name || 'Unknown'}</p>
                            <p className="text-xs text-surface-500">{emp.role || '-'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-surface-600">{emp.employeeId}</td>
                      <td className="px-6 py-4 text-surface-600">{emp.department || '-'}</td>
                      <td className="px-6 py-4">
                        <Badge variant="success">Active</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-surface-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-surface-400" />
                          Unknown
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 text-surface-400 hover:text-surface-900 hover:bg-surface-100 rounded-lg transition-colors">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {metrics.employees.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-surface-500">No employees found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Attendance Overview Visualization */}
          <Card className="border-transparent shadow-soft">
            <CardHeader className="pb-4 border-b border-surface-100">
              <CardTitle className="text-lg">Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center gap-8">
                {/* Simulated Chart Ring */}
                <div className="relative w-32 h-32 shrink-0 rounded-full border-[12px] border-brand-100 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[12px] border-brand-600 border-t-transparent border-l-transparent transform -rotate-45" />
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-surface-900">
                      {metrics.totalEmployees > 0 ? Math.round((metrics.presentToday / metrics.totalEmployees) * 100) : 0}%
                    </span>
                    <span className="block text-xs text-surface-500 font-medium">Present</span>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="flex-1 grid grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-brand-600" />
                      <span className="text-sm font-medium text-surface-600">Present</span>
                    </div>
                    <span className="text-lg font-bold text-surface-900 pl-5">{metrics.presentToday}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="text-sm font-medium text-surface-600">On Leave</span>
                    </div>
                    <span className="text-lg font-bold text-surface-900 pl-5">{metrics.onLeaveToday}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-brand-200" />
                      <span className="text-sm font-medium text-surface-600">Half-day</span>
                    </div>
                    <span className="text-lg font-bold text-surface-900 pl-5">0</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-sm font-medium text-surface-600">Absent</span>
                    </div>
                    <span className="text-lg font-bold text-surface-900 pl-5">
                      {Math.max(0, metrics.totalEmployees - metrics.presentToday - metrics.onLeaveToday)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Side Column - Approvals & Activity */}
        <div className="space-y-8">
          
          {/* Pending Approvals */}
          <Card className="border-transparent shadow-soft">
            <CardHeader className="pb-4 border-b border-surface-50">
              <div className="flex items-center gap-2 text-surface-900">
                <Clock size={18} className="text-amber-500" />
                <CardTitle className="text-lg">Pending Approvals</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {metrics.pendingLeaves.map((req) => (
                <div key={req.id} className="p-4 rounded-2xl bg-surface-50 border border-surface-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-surface-900">{req.user?.firstName} {req.user?.lastName}</p>
                      <p className="text-xs font-medium text-surface-500 capitalize">{req.leaveType?.toLowerCase()} Leave</p>
                    </div>
                    <Badge variant="warning">{req.status}</Badge>
                  </div>
                  <p className="text-xs text-surface-600 mb-4 flex items-center gap-1.5">
                    <Clock size={12} /> {new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1 h-8 text-xs font-semibold" onClick={() => handleLeaveAction(req.id, 'APPROVED')}>
                      <Check size={14} className="mr-1" /> Approve
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 h-8 text-xs font-semibold" onClick={() => handleLeaveAction(req.id, 'REJECTED')}>
                      <X size={14} className="mr-1" /> Reject
                    </Button>
                  </div>
                </div>
              ))}
              {metrics.pendingLeaves.length === 0 && (
                <p className="text-sm text-surface-500 text-center py-4">No pending leave requests.</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-transparent shadow-soft">
            <CardHeader className="pb-4 border-b border-surface-50">
              <CardTitle className="text-lg">Recent HR Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-5">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Activity size={14} className="stroke-[2]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-900 leading-snug">Dashboard Loaded</p>
                  <p className="text-xs text-surface-500 mt-1">Just now</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
