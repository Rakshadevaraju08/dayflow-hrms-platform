import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, Search, Filter, MessageSquare, X
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { leaveService } from '../../services/leaveService';

export function AdminLeave() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectStatus, setRejectStatus] = useState('idle');

  React.useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    setLoading(true);
    try {
      const response = await leaveService.getAllLeaves();
      setRequests(response.data || []);
    } catch (err) {
      setError('Failed to load leave requests.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case 'APPROVED': return <Badge variant="success">Approved</Badge>;
      case 'PENDING': return <Badge variant="warning">Pending</Badge>;
      case 'REJECTED': return <Badge variant="danger">Rejected</Badge>;
      default: return null;
    }
  };

  const handleApprove = async (id) => {
    try {
      await leaveService.updateLeaveStatus(id, { status: 'APPROVED' });
      setRequests(requests.map(req => req.id === id ? { ...req, status: 'APPROVED' } : req));
    } catch (err) {
      console.error(err);
    }
  };

  const openRejectModal = (req) => {
    setSelectedRequest(req);
    setRejectReason('');
    setRejectStatus('idle');
    setRejectModalOpen(true);
  };

  const handleRejectSubmit = async (e) => {
    e.preventDefault();
    if (!rejectReason.trim()) return;

    setRejectStatus('loading');
    try {
      await leaveService.updateLeaveStatus(selectedRequest.id, { 
        status: 'REJECTED',
        remarks: rejectReason 
      });
      setRequests(requests.map(req => req.id === selectedRequest.id ? { ...req, status: 'REJECTED' } : req));
      setRejectStatus('success');
      setTimeout(() => {
        setRejectModalOpen(false);
      }, 1000);
    } catch (err) {
      setRejectStatus('error');
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={loadLeaves} />;

  const summary = [
    { label: 'Pending', value: requests.filter(r => r.status === 'PENDING').length },
    { label: 'Approved', value: requests.filter(r => r.status === 'APPROVED').length },
    { label: 'Rejected', value: requests.filter(r => r.status === 'REJECTED').length },
  ];

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    if (e < s) return 0;
    const diffTime = Math.abs(e - s);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-surface-900 mb-1">Leave Requests</h1>
        <p className="text-surface-500 font-medium">Manage and approve employee time off.</p>
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

      {/* Main Table */}
      <Card className="border-transparent shadow-soft overflow-hidden bg-white">
        <div className="p-6 border-b border-surface-100 flex flex-col sm:flex-row gap-4 justify-between">
          <CardTitle className="text-lg">All Requests</CardTitle>
          <div className="flex gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={16} />
              <Input placeholder="Search employee..." className="pl-9 h-9 text-sm rounded-full" />
            </div>
            <Button variant="outline" size="sm" className="h-9 px-3 rounded-full">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs font-semibold text-surface-500 uppercase bg-surface-50 border-b border-surface-100">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Employee</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Leave Type</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Date Range</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Days</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Reason</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {requests.length > 0 ? requests.map((req) => {
                const empName = req.user ? `${req.user.firstName} ${req.user.lastName}` : 'Unknown';
                const empId = req.user?.employeeProfile?.employeeId || 'Pending';
                
                return (
                <tr key={req.id} className="hover:bg-surface-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0 uppercase">
                        {empName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-surface-900 leading-tight">{empName}</p>
                        <p className="text-[10px] text-surface-500 font-semibold">{empId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-surface-900 capitalize">{req.leaveType?.toLowerCase()}</td>
                  <td className="px-6 py-4 text-surface-600">{new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium text-surface-700">{calculateDays(req.startDate, req.endDate)}</td>
                  <td className="px-6 py-4 text-surface-600 max-w-[200px] truncate">{req.reason}</td>
                  <td className="px-6 py-4">{getStatusBadge(req.status)}</td>
                  <td className="px-6 py-4 text-right">
                    {req.status === 'PENDING' ? (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleApprove(req.id)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-200"
                          title="Approve"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                        <button 
                          onClick={() => openRejectModal(req)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                          title="Reject"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-surface-400 text-xs font-medium px-2">—</span>
                    )}
                  </td>
                </tr>
              )}) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-surface-500">No leave requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Reject Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-soft-lg w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-surface-100">
              <h2 className="text-xl font-bold text-surface-900 flex items-center gap-2">
                <XCircle className="text-red-500" size={24} /> Reject Leave
              </h2>
              <button 
                onClick={() => !rejectStatus.includes('loading') && setRejectModalOpen(false)}
                className="text-surface-400 hover:text-surface-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleRejectSubmit} className="p-6 space-y-5">
              <div className="p-3 bg-surface-50 rounded-xl border border-surface-200 text-sm">
                <p className="text-surface-600 mb-1">Rejecting leave for:</p>
                <p className="font-bold text-surface-900">{selectedRequest?.user?.firstName} {selectedRequest?.user?.lastName} ({selectedRequest?.leaveType} Leave)</p>
                <p className="text-surface-600 mt-1">{selectedRequest && `${new Date(selectedRequest.startDate).toLocaleDateString()} - ${new Date(selectedRequest.endDate).toLocaleDateString()}`}</p>
              </div>

              {rejectStatus === 'success' && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded-lg text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 size={16} /> Leave rejected successfully.
                </div>
              )}

              <div className="space-y-1.5">
                <Label>Reason for Rejection <span className="text-red-500">*</span></Label>
                <textarea 
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  disabled={rejectStatus !== 'idle'}
                  rows={3}
                  placeholder="Provide a reason for rejecting this leave request..."
                  className={`flex w-full rounded-xl border border-surface-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50 shadow-sm`}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-surface-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setRejectModalOpen(false)}
                  disabled={rejectStatus !== 'idle'}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="danger"
                  className="flex-1"
                  disabled={rejectStatus !== 'idle' || !rejectReason.trim()}
                >
                  {rejectStatus === 'loading' ? 'Rejecting...' : 'Reject Request'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
