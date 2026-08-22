import React from 'react';
import { 
  Search, Filter, Download, ChevronDown, CheckCircle2, AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { attendanceService } from '../../services/attendanceService';

const FILTERS = ['Employee', 'Department', 'Date', 'Status'];

export function AdminAttendance() {
  const [records, setRecords] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    setLoading(true);
    try {
      const response = await attendanceService.getAllAttendance();
      setRecords(response.data || []);
    } catch (err) {
      setError('Failed to load attendance.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={loadAttendance} />;

  const summary = [
    { label: 'Total Records', value: records.length },
    { label: 'Present Today', value: records.filter(r => r.status === 'PRESENT').length },
    { label: 'Absent', value: records.filter(r => r.status === 'ABSENT').length },
    { label: 'On Leave', value: records.filter(r => r.status === 'ON_LEAVE').length },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PRESENT': return <Badge variant="success">Present</Badge>;
      case 'HALF_DAY': return <Badge variant="warning">Half-day</Badge>;
      case 'ON_LEAVE': return <Badge variant="default" className="bg-surface-200 text-surface-700">Leave</Badge>;
      case 'ABSENT': return <Badge variant="danger">Absent</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return '--:--';
    return new Date(dateStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-surface-900 mb-1">Company Attendance</h1>
        <p className="text-surface-500 font-medium">Monitor organization-wide daily attendance.</p>
      </div>

      {/* Summary Metrics */}
      <div className="flex gap-8 border-y border-surface-200 py-4 overflow-x-auto hide-scrollbar">
        {summary.map((item, idx) => (
          <div key={idx} className={`flex flex-col min-w-[120px] ${idx !== 0 ? 'pl-8 border-l border-surface-200' : ''}`}>
            <span className="text-2xl font-bold text-surface-900">{item.value}</span>
            <span className="text-sm font-semibold text-surface-500">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="space-y-4">
        
        {/* Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          
          <div className="flex flex-wrap gap-2 items-center">
            {FILTERS.map((filter) => (
              <button 
                key={filter}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white border border-surface-200 rounded-full hover:bg-surface-50 text-surface-700 transition-colors"
              >
                {filter} <ChevronDown size={14} className="text-surface-400" />
              </button>
            ))}
          </div>

          <div className="flex gap-2 items-center lg:justify-end shrink-0 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={16} />
              <Input placeholder="Search employee..." className="pl-9 h-9 text-sm rounded-full" />
            </div>
            <Button variant="outline" size="sm" className="h-9 px-3 rounded-full">
              <Filter size={16} />
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-3 rounded-full">
              <Download size={16} />
            </Button>
          </div>
        </div>

        {/* Attendance Table */}
        <Card className="border-transparent shadow-soft overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs font-semibold text-surface-500 uppercase bg-surface-50 border-b border-surface-100">
                <tr>
                  <th className="px-6 py-5 font-semibold tracking-wider">Employee</th>
                  <th className="px-6 py-5 font-semibold tracking-wider">Department</th>
                  <th className="px-6 py-5 font-semibold tracking-wider">Date</th>
                  <th className="px-6 py-5 font-semibold tracking-wider">Check-in</th>
                  <th className="px-6 py-5 font-semibold tracking-wider">Check-out</th>
                  <th className="px-6 py-5 font-semibold tracking-wider">Hours</th>
                  <th className="px-6 py-5 font-semibold tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {records.length > 0 ? records.map((record) => {
                  const empName = record.user ? `${record.user.firstName} ${record.user.lastName}` : 'Unknown';
                  return (
                  <tr key={record.id} className="hover:bg-surface-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0 uppercase">
                          {empName.charAt(0)}
                        </div>
                        <p className="font-bold text-surface-900">{empName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-surface-600 font-medium">{record.user?.employeeProfile?.department || '-'}</td>
                    <td className="px-6 py-4 font-medium text-surface-900">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-surface-600">{formatTime(record.checkIn)}</td>
                    <td className="px-6 py-4 text-surface-600">{formatTime(record.checkOut)}</td>
                    <td className="px-6 py-4 text-surface-700 font-medium">{record.workingHours || '-'}</td>
                    <td className="px-6 py-4 text-right">
                      {getStatusBadge(record.status)}
                    </td>
                  </tr>
                )}) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-surface-500">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-surface-100 flex items-center justify-between text-sm text-surface-500">
            <span>Showing {records.length} records</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
