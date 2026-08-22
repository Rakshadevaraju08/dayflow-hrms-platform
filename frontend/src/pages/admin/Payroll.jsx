import React, { useState } from 'react';
import { 
  Search, Filter, Edit2, ChevronDown, IndianRupee, CheckCircle2, X
} from 'lucide-react';
import { Card, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { payrollService } from '../../services/payrollService';

export function AdminPayroll() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  
  const [formData, setFormData] = useState({
    baseSalary: '',
    allowances: '',
    deductions: '',
    effectiveDate: ''
  });
  
  const [status, setStatus] = useState('idle');

  React.useEffect(() => {
    loadPayroll();
  }, []);

  const loadPayroll = async () => {
    setLoading(true);
    try {
      const response = await payrollService.getAllPayroll();
      setEmployees(response.data || []);
    } catch (err) {
      setError('Failed to load payroll data.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const openEditModal = (emp) => {
    setSelectedEmp(emp);
    setFormData({
      baseSalary: (emp.basicSalary || 0).toString(),
      allowances: (emp.allowances || 0).toString(),
      deductions: (emp.deductions || 0).toString(),
      effectiveDate: emp.salaryEffectiveDate ? new Date(emp.salaryEffectiveDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setStatus('idle');
    setEditModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      await payrollService.updatePayroll(selectedEmp.employeeId, {
        basicSalary: Number(formData.baseSalary),
        allowances: Number(formData.allowances),
        deductions: Number(formData.deductions),
        salaryEffectiveDate: new Date(formData.effectiveDate).toISOString()
      });
      setStatus('success');
      loadPayroll();
      setTimeout(() => setEditModalOpen(false), 1500);
    } catch (err) {
      setStatus('error');
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={loadPayroll} />;

  const currentGross = Number(formData.baseSalary || 0) + Number(formData.allowances || 0);
  const currentNet = currentGross - Number(formData.deductions || 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-surface-900 mb-1">Payroll</h1>
        <p className="text-surface-500 font-medium">Manage employee salary information.</p>
      </div>

      {/* Main Table */}
      <Card className="border-transparent shadow-soft overflow-hidden bg-white">
        <div className="p-6 border-b border-surface-100 flex flex-col sm:flex-row gap-4 justify-between">
          <CardTitle className="text-lg">Employee Salaries</CardTitle>
          <div className="flex gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" size={16} />
              <Input placeholder="Search employee..." className="pl-9 h-9 text-sm rounded-full" />
            </div>
            <Button variant="outline" size="sm" className="h-9 px-3 rounded-full">
              <Filter size={16} /> Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs font-semibold text-surface-500 uppercase bg-surface-50 border-b border-surface-100">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Employee</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Department</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Base Salary</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Gross Salary</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Net Salary</th>
                <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {employees.map((emp) => {
                const gross = (emp.basicSalary || 0) + (emp.allowances || 0);
                const net = gross - (emp.deductions || 0);
                return (
                  <tr key={emp.employeeId} className="hover:bg-surface-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0 uppercase">
                          {emp.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-surface-900 leading-tight">{emp.name || 'Unknown'}</p>
                          <p className="text-[10px] text-surface-500 font-semibold">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-surface-600 font-medium">{emp.department || '-'}</td>
                    <td className="px-6 py-4 font-medium text-surface-900 text-right">{formatCurrency(emp.basicSalary)}</td>
                    <td className="px-6 py-4 font-semibold text-green-600 text-right">{formatCurrency(gross)}</td>
                    <td className="px-6 py-4 font-bold text-brand-700 text-right">{formatCurrency(net)}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" onClick={() => openEditModal(emp)}>
                        <Edit2 size={14} className="mr-2" /> Edit
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Salary Modal */}
      {editModalOpen && selectedEmp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-soft-lg w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-surface-100 bg-surface-50/50">
              <div>
                <h2 className="text-xl font-bold text-surface-900">Edit Salary</h2>
                <p className="text-sm text-surface-500 mt-1">{selectedEmp.name} ({selectedEmp.email})</p>
              </div>
              <button 
                onClick={() => !status.includes('loading') && setEditModalOpen(false)}
                className="text-surface-400 hover:text-surface-600 transition-colors self-start"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              {status === 'success' && (
                <div className="p-3 bg-green-50 border border-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 size={16} /> Salary updated successfully!
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Base Salary (₹)</Label>
                  <Input 
                    type="number"
                    value={formData.baseSalary}
                    onChange={(e) => setFormData({...formData, baseSalary: e.target.value})}
                    disabled={status !== 'idle'}
                    required
                    min="0"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label>Allowances (₹)</Label>
                  <Input 
                    type="number"
                    value={formData.allowances}
                    onChange={(e) => setFormData({...formData, allowances: e.target.value})}
                    disabled={status !== 'idle'}
                    required
                    min="0"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Deductions (₹)</Label>
                  <Input 
                    type="number"
                    value={formData.deductions}
                    onChange={(e) => setFormData({...formData, deductions: e.target.value})}
                    disabled={status !== 'idle'}
                    required
                    min="0"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Effective Date</Label>
                  <Input 
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
                    disabled={status !== 'idle'}
                    required
                  />
                </div>

                {/* Live Calculation Preview */}
                <div className="mt-6 p-4 bg-brand-50 rounded-xl border border-brand-100 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-brand-700">Gross Salary</span>
                    <span className="font-bold text-brand-800">{formatCurrency(currentGross)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-brand-700">Net Salary</span>
                    <span className="font-bold text-brand-900">{formatCurrency(currentNet)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-surface-100">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setEditModalOpen(false)}
                  disabled={status !== 'idle'}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={status !== 'idle'}
                >
                  {status === 'loading' ? 'Saving...' : 'Confirm & Save'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
