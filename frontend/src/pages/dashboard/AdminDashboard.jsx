import React from 'react';
import { 
  Users, UserCheck, UserMinus, FileClock, 
  MoreHorizontal, Check, X, Clock, Activity, Briefcase
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

// Mock Data
const USER_NAME = "Raksha";

const SUMMARY = [
  { label: 'Total Employees', value: '142', icon: Users, color: 'text-brand-600', bg: 'bg-brand-50' },
  { label: 'Present Today', value: '128', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'On Leave', value: '12', icon: UserMinus, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Pending Leaves', value: '5', icon: FileClock, color: 'text-surface-600', bg: 'bg-surface-100' },
];

const EMPLOYEES = [
  { id: 'DF-042', name: 'Arjun Mehta', role: 'Software Engineer', dept: 'Engineering', status: 'Active', attendance: 'Present' },
  { id: 'DF-055', name: 'Priya Sharma', role: 'Product Manager', dept: 'Product', status: 'Active', attendance: 'On Leave' },
  { id: 'DF-089', name: 'Rohan Kumar', role: 'UX Designer', dept: 'Design', status: 'Active', attendance: 'Present' },
  { id: 'DF-091', name: 'Sneha Patel', role: 'QA Engineer', dept: 'Engineering', status: 'Inactive', attendance: 'Absent' },
];

const PENDING_REQUESTS = [
  { id: 1, name: 'Anjali Desai', type: 'Sick Leave', dates: 'May 24 - May 25', status: 'Pending' },
  { id: 2, name: 'Vikram Singh', type: 'Annual Leave', dates: 'Jun 10 - Jun 15', status: 'Pending' },
];

const RECENT_ACTIVITY = [
  { id: 1, text: 'Arjun Mehta updated his profile details', time: '10 mins ago', icon: UserCheck },
  { id: 2, text: 'New employee Sneha Patel onboarded', time: '2 hours ago', icon: Briefcase },
  { id: 3, text: 'Payroll for May 2026 processed successfully', time: 'Yesterday', icon: Activity },
];

export function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-surface-900 mb-1">
          Good morning, {USER_NAME}
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
                  {EMPLOYEES.map((emp) => (
                    <tr key={emp.id} className="hover:bg-surface-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {emp.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-surface-900">{emp.name}</p>
                            <p className="text-xs text-surface-500">{emp.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-surface-600">{emp.id}</td>
                      <td className="px-6 py-4 text-surface-600">{emp.dept}</td>
                      <td className="px-6 py-4">
                        <Badge variant={emp.status === 'Active' ? 'success' : 'default'}>
                          {emp.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1.5 text-xs font-medium ${
                          emp.attendance === 'Present' ? 'text-green-600' : 
                          emp.attendance === 'On Leave' ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            emp.attendance === 'Present' ? 'bg-green-500' : 
                            emp.attendance === 'On Leave' ? 'bg-amber-500' : 'bg-red-500'
                          }`} />
                          {emp.attendance}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-1.5 text-surface-400 hover:text-surface-900 hover:bg-surface-100 rounded-lg transition-colors">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
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
                    <span className="block text-2xl font-bold text-surface-900">90%</span>
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
                    <span className="text-lg font-bold text-surface-900 pl-5">128</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="text-sm font-medium text-surface-600">On Leave</span>
                    </div>
                    <span className="text-lg font-bold text-surface-900 pl-5">12</span>
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
                    <span className="text-lg font-bold text-surface-900 pl-5">2</span>
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
              {PENDING_REQUESTS.map((req) => (
                <div key={req.id} className="p-4 rounded-2xl bg-surface-50 border border-surface-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-surface-900">{req.name}</p>
                      <p className="text-xs font-medium text-surface-500">{req.type}</p>
                    </div>
                    <Badge variant="warning">{req.status}</Badge>
                  </div>
                  <p className="text-xs text-surface-600 mb-4 flex items-center gap-1.5">
                    <Clock size={12} /> {req.dates}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" className="flex-1 h-8 text-xs font-semibold">
                      <Check size={14} className="mr-1" /> Approve
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 h-8 text-xs font-semibold">
                      <X size={14} className="mr-1" /> Reject
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-transparent shadow-soft">
            <CardHeader className="pb-4 border-b border-surface-50">
              <CardTitle className="text-lg">Recent HR Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-5">
              {RECENT_ACTIVITY.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                    <activity.icon size={14} className="stroke-[2]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-900 leading-snug">{activity.text}</p>
                    <p className="text-xs text-surface-500 mt-1">{activity.time}</p>
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
