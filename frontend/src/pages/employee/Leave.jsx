import React, { useState } from 'react';
import { 
  Calendar, FileText, CheckCircle2, AlertCircle, X, Check
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { leaveService } from '../../services/leaveService';
import { useAuth } from '../../context/AuthContext';

// Mock Data
export function Leave() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({ type: 'Paid', startDate: '', endDate: '', remarks: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      if (!user?.id) return;
      const response = await leaveService.getMyLeaves(user.id);
      setLeaves(response.data || []);
    } catch (err) {
      setFetchError('Failed to load leave history.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'APPROVED': return <Badge variant="success">Approved</Badge>;
      case 'PENDING': return <Badge variant="warning">Pending</Badge>;
      case 'REJECTED': return <Badge variant="danger">Rejected</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    if (e < s) return 0;
    const diffTime = Math.abs(e - s);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    return diffDays;
  };

  const selectedDays = calculateDays(formData.startDate, formData.endDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.startDate) newErrors.startDate = 'Required';
    if (!formData.endDate) newErrors.endDate = 'Required';
    else if (new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date cannot be before start date';
    }
    if (!formData.remarks) newErrors.remarks = "Remarks are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('loading');
    
    try {
      await leaveService.applyLeave({
        leaveType: formData.type.toUpperCase(),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        reason: formData.remarks
      }, user.id);
      
      setStatus('success');
      loadLeaves();
      
      setTimeout(() => {
        setIsApplying(false);
        setStatus('idle');
        setFormData({ type: 'Paid', startDate: '', endDate: '', remarks: '' });
      }, 1500);
    } catch (err) {
      setStatus('error');
    }
  };

  if (loading) return <LoadingState />;
  if (fetchError) return <ErrorState message={fetchError} onRetry={loadLeaves} />;

  const usedLeave = leaves.filter(l => l.status === 'APPROVED').reduce((acc, l) => acc + calculateDays(l.startDate, l.endDate), 0);
  const pendingRequests = leaves.filter(l => l.status === 'PENDING').length;
  
  const summary = [
    { label: 'Available Leave', value: `${Math.max(0, 14 - usedLeave)} Days` },
    { label: 'Used Leave', value: `${usedLeave} Days` },
    { label: 'Pending Requests', value: pendingRequests.toString() },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-surface-900 mb-1">Leave Management</h1>
          <p className="text-surface-500 font-medium">Apply for and track your time off.</p>
        </div>
        <Button className="shrink-0" onClick={() => setIsApplying(true)}>
          <Calendar size={18} className="mr-2" /> Apply for Leave
        </Button>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summary.map((item, idx) => (
          <Card key={idx} className="border-transparent shadow-soft bg-white">
            <CardContent className="p-6">
              <span className="text-sm font-semibold text-surface-500 block mb-1">{item.label}</span>
              <span className="text-3xl font-bold text-surface-900">{item.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leave History */}
      <Card className="border-transparent shadow-soft overflow-hidden bg-white">
        <div className="p-6 border-b border-surface-100">
          <CardTitle className="text-lg">Leave History</CardTitle>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs font-semibold text-surface-500 uppercase bg-surface-50 border-b border-surface-100">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Leave Type</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Start Date</th>
                <th className="px-6 py-4 font-semibold tracking-wider">End Date</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Days</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Remarks</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {leaves.length > 0 ? leaves.map((record) => (
                <tr key={record.id} className="hover:bg-surface-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-surface-900 capitalize">{record.leaveType?.toLowerCase()}</td>
                  <td className="px-6 py-4 text-surface-600">{new Date(record.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-surface-600">{new Date(record.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium text-surface-700">{calculateDays(record.startDate, record.endDate)}</td>
                  <td className="px-6 py-4 text-surface-600">{record.reason}</td>
                  <td className="px-6 py-4">{getStatusBadge(record.status)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-surface-500">No leave history found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Apply Leave Modal */}
      {isApplying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-soft-lg w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-surface-100 shrink-0">
              <h2 className="text-xl font-bold text-surface-900">Apply for Leave</h2>
              <button 
                onClick={() => !status.includes('loading') && setIsApplying(false)}
                className="text-surface-400 hover:text-surface-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
              {status === 'success' && (
                <div className="p-3 bg-green-50 border border-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 size={16} /> Leave request submitted successfully!
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Leave Type</Label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    disabled={status !== 'idle'}
                    className="flex w-full rounded-xl border border-surface-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 shadow-sm"
                  >
                    <option value="Paid">Paid Leave</option>
                    <option value="Sick">Sick Leave</option>
                    <option value="Unpaid">Unpaid Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Start Date</Label>
                    <Input 
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      disabled={status !== 'idle'}
                      className={errors.startDate ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    />
                    {errors.startDate && <p className="text-xs text-red-500 font-medium">{errors.startDate}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label>End Date</Label>
                    <Input 
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      disabled={status !== 'idle'}
                      className={errors.endDate ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    />
                    {errors.endDate && <p className="text-xs text-red-500 font-medium">{errors.endDate}</p>}
                  </div>
                </div>
                
                {selectedDays > 0 && (
                  <div className="p-3 bg-brand-50 rounded-lg text-brand-800 text-sm font-medium flex justify-between">
                    <span>Duration: {selectedDays} Day{selectedDays > 1 ? 's' : ''}</span>
                    <span>Remaining Balance: {14 - selectedDays} Days</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label>Remarks</Label>
                  <textarea 
                    value={formData.remarks}
                    onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                    disabled={status !== 'idle'}
                    rows={3}
                    placeholder="Briefly state the reason..."
                    className={`flex w-full rounded-xl border ${errors.remarks ? 'border-red-500 focus-visible:ring-red-500' : 'border-surface-200 focus-visible:ring-brand-500'} bg-white px-3 py-2 text-sm placeholder:text-surface-400 focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 shadow-sm`}
                  />
                  {errors.remarks && <p className="text-xs text-red-500 font-medium">{errors.remarks}</p>}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-surface-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsApplying(false)}
                  disabled={status !== 'idle'}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={status !== 'idle'}
                >
                  {status === 'loading' ? 'Submitting...' : 'Submit Request'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
