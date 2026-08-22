import React, { useState } from 'react';
import { 
  Calendar, Clock, CheckCircle2, AlertCircle, Filter, 
  ChevronDown, Search, ArrowRight, Download
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { attendanceService } from '../../services/attendanceService';

export function Attendance() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attendanceState, setAttendanceState] = useState('BEFORE'); // 'BEFORE', 'CHECKED_IN', 'COMPLETED'
  const [todayRecord, setTodayRecord] = useState(null);
  
  React.useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    setLoading(true);
    try {
      const response = await attendanceService.getMyAttendance();
      const records = response.data || [];
      setHistory(records);
      
      // Determine today's state
      const todayDateStr = new Date().toISOString().split('T')[0];
      const recordToday = records.find(r => new Date(r.date).toISOString().split('T')[0] === todayDateStr);
      
      if (recordToday) {
        setTodayRecord(recordToday);
        if (recordToday.checkOut) setAttendanceState('COMPLETED');
        else if (recordToday.checkIn) setAttendanceState('CHECKED_IN');
      } else {
        setAttendanceState('BEFORE');
      }
    } catch (err) {
      setError('Failed to load attendance.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await attendanceService.checkIn();
      loadAttendance();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckOut = async () => {
    try {
      await attendanceService.checkOut();
      loadAttendance();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={loadAttendance} />;
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

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
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-surface-900 mb-1">My Attendance</h1>
        <p className="text-surface-500 font-medium">Track your daily attendance and working hours.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Today's Attendance (Takes 1 column) */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-transparent shadow-soft bg-white overflow-hidden">
            <div className="bg-brand-50 p-6 flex flex-col gap-1 border-b border-brand-100">
              <h2 className="text-lg font-bold text-brand-900">Today's Attendance</h2>
              <p className="text-sm font-medium text-brand-600/80">{today}</p>
            </div>
            <CardContent className="p-6">
              
              <div className="flex flex-col items-center justify-center py-6 mb-4">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-sm ${
                  attendanceState === 'BEFORE' ? 'bg-surface-100 text-surface-400' : 
                  attendanceState === 'CHECKED_IN' ? 'bg-brand-100 text-brand-600' : 'bg-green-100 text-green-600'
                }`}>
                  {attendanceState === 'BEFORE' ? <Clock size={32} /> : 
                   attendanceState === 'CHECKED_IN' ? <div className="w-4 h-4 rounded-full bg-brand-500 animate-pulse" /> : 
                   <CheckCircle2 size={32} />}
                </div>
                
                <h3 className="text-2xl font-bold text-surface-900 mb-1">
                  {attendanceState === 'BEFORE' ? 'Not Checked In' : 
                   attendanceState === 'CHECKED_IN' ? '4h 15m' : '8h 53m'}
                </h3>
                <p className="text-sm font-medium text-surface-500">
                  {attendanceState === 'BEFORE' ? 'Ready to start your day?' : 
                   attendanceState === 'CHECKED_IN' ? 'Working Hours Today' : 'Attendance Completed'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-surface-50 rounded-2xl border border-surface-100">
                <div className="text-center border-r border-surface-200">
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Check-in</p>
                  <p className="text-lg font-bold text-surface-900">
                    {attendanceState !== 'BEFORE' ? formatTime(todayRecord?.checkIn) : '--:--'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-1">Check-out</p>
                  <p className="text-lg font-bold text-surface-900">
                    {attendanceState === 'COMPLETED' ? formatTime(todayRecord?.checkOut) : '--:--'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center">
                {attendanceState === 'BEFORE' && (
                  <Button size="lg" className="w-full" onClick={handleCheckIn}>
                    Check In Now
                  </Button>
                )}
                {attendanceState === 'CHECKED_IN' && (
                  <Button variant="danger" size="lg" className="w-full" onClick={handleCheckOut}>
                    Check Out
                  </Button>
                )}
                {attendanceState === 'COMPLETED' && (
                  <Button size="lg" variant="outline" className="w-full" disabled>
                    Checked Out
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Visualization */}
          <Card className="border-transparent shadow-soft bg-white">
            <CardHeader className="pb-4 border-b border-surface-50">
              <CardTitle className="text-base">Weekly Overview</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-between items-end">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm bg-surface-100 text-surface-500">
                       {day.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-surface-500 uppercase">{day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History Table (Takes 2 columns) */}
        <div className="lg:col-span-2">
          <Card className="border-transparent shadow-soft overflow-hidden bg-white h-full flex flex-col">
            <div className="p-6 border-b border-surface-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <CardTitle className="text-lg">Attendance History</CardTitle>
              
              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white border border-surface-200 rounded-full hover:bg-surface-50 text-surface-700 transition-colors">
                  Date Range <ChevronDown size={14} className="text-surface-400" />
                </button>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-white border border-surface-200 rounded-full hover:bg-surface-50 text-surface-700 transition-colors">
                  This Month <ChevronDown size={14} className="text-surface-400" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs font-semibold text-surface-500 uppercase bg-surface-50 border-b border-surface-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Check-in</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Check-out</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Working Hours</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {history.length > 0 ? history.map((record) => (
                    <tr key={record.id} className="hover:bg-surface-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-surface-900">{new Date(record.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-surface-600">{formatTime(record.checkIn)}</td>
                      <td className="px-6 py-4 text-surface-600">{formatTime(record.checkOut)}</td>
                      <td className="px-6 py-4 font-medium text-surface-700">{record.workingHours || '-'}</td>
                      <td className="px-6 py-4">{getStatusBadge(record.status)}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-surface-500">No attendance records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 border-t border-surface-100 flex items-center justify-between text-sm text-surface-500 bg-surface-50">
              <span>Showing {history.length} records</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
