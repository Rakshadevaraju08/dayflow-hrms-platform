import React from 'react';
import { 
  CreditCard, IndianRupee, Download, TrendingUp, TrendingDown,
  FileText
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { LoadingState } from '../../components/common/LoadingState';
import { ErrorState } from '../../components/common/ErrorState';
import { payrollService } from '../../services/payrollService';

export function Salary() {
  const [salaryData, setSalaryData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    loadPayroll();
  }, []);

  const loadPayroll = async () => {
    setLoading(true);
    try {
      const response = await payrollService.getMyPayroll();
      setSalaryData(response.payroll);
    } catch (err) {
      setError('Failed to load salary details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={loadPayroll} />;

  const baseSalary = salaryData?.basicSalary || 0;
  const allowancesAmount = salaryData?.allowances || 0;
  const deductionsAmount = salaryData?.deductions || 0;
  const grossSalary = salaryData?.grossSalary || (baseSalary + allowancesAmount);
  const netSalary = salaryData?.netSalary || (grossSalary - deductionsAmount);
  
  const effectiveDate = salaryData?.salaryEffectiveDate 
    ? new Date(salaryData.salaryEffectiveDate).toLocaleDateString()
    : 'Not Specified';

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-surface-900 mb-1">My Salary</h1>
          <p className="text-surface-500 font-medium">View your current compensation details.</p>
        </div>
        <Button variant="outline" className="shrink-0 bg-white">
          <Download size={18} className="mr-2" /> Download Payslip
        </Button>
      </div>

      {/* Main Net Salary Highlight */}
      <Card className="border-transparent shadow-soft bg-gradient-to-r from-brand-600 to-brand-800 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <IndianRupee size={120} />
        </div>
        <CardContent className="p-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-brand-100 font-medium mb-1 uppercase tracking-wider text-sm">Net Monthly Salary</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-2">{formatCurrency(netSalary)}</h2>
              <p className="text-brand-200 text-sm">Effective from {effectiveDate}</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <CreditCard size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-brand-100 uppercase tracking-wider font-semibold">Salary Account</p>
                  <p className="font-bold">Company Default</p>
                </div>
              </div>
              <p className="text-sm font-medium text-brand-100 tracking-wider text-right">**** **** 1234</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Earnings */}
        <Card className="border-transparent shadow-soft bg-white">
          <CardHeader className="border-b border-surface-100 pb-4">
            <CardTitle className="text-lg flex items-center gap-2 text-surface-900">
              <TrendingUp size={18} className="text-green-500" /> Earnings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-surface-100">
              <div className="flex justify-between items-center p-5">
                <div>
                  <p className="font-semibold text-surface-900">Base Salary</p>
                  <p className="text-xs text-surface-500">Fixed monthly</p>
                </div>
                <p className="font-bold text-surface-900">{formatCurrency(baseSalary)}</p>
              </div>
              
              <div className="flex justify-between items-center p-5 bg-surface-50/50">
                <p className="font-medium text-surface-600">Total Allowances</p>
                <p className="font-semibold text-surface-900">{formatCurrency(allowancesAmount)}</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-5 bg-green-50 border-t border-green-100">
              <p className="font-bold text-green-900">Gross Earnings</p>
              <p className="font-bold text-green-700 text-lg">{formatCurrency(grossSalary)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Deductions */}
        <div className="space-y-8">
          <Card className="border-transparent shadow-soft bg-white">
            <CardHeader className="border-b border-surface-100 pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-surface-900">
                <TrendingDown size={18} className="text-red-500" /> Deductions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-surface-100">
                <div className="flex justify-between items-center p-5 bg-surface-50/50">
                  <p className="font-medium text-surface-600">Total Deductions</p>
                  <p className="font-semibold text-surface-900">{formatCurrency(deductionsAmount)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-5 bg-red-50 border-t border-red-100">
                <p className="font-bold text-red-900">Total Deductions</p>
                <p className="font-bold text-red-700 text-lg">{formatCurrency(deductionsAmount)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payslips */}
          <Card className="border-transparent shadow-soft bg-white">
            <CardHeader className="border-b border-surface-100 pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-surface-900">
                <FileText size={18} className="text-brand-500" /> Recent Payslips
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {['April 2026', 'March 2026', 'February 2026'].map((month, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 hover:bg-surface-50 rounded-xl transition-colors border border-transparent hover:border-surface-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                      <FileText size={18} />
                    </div>
                    <p className="font-semibold text-surface-900">Payslip - {month}</p>
                  </div>
                  <button className="p-2 text-surface-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
