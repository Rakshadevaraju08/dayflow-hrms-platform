import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { cn } from '../../lib/utils';

export function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState('EMPLOYEE');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Simple password validation checks
  const hasLength = password.length >= 8;
  const hasNumber = /\d/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasLength || !hasNumber) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/verify-email');
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-surface-900">Create account</h1>
        <p className="text-sm text-surface-500">Set up your Dayflow workspace</p>
      </div>

      {/* Segmented Role Toggle */}
      <div className="flex p-1 bg-surface-100 rounded-2xl">
        <button
          type="button"
          onClick={() => setRole('EMPLOYEE')}
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-[12px] transition-all",
            role === 'EMPLOYEE' ? "bg-white text-brand-700 shadow-sm" : "text-surface-500 hover:text-surface-900"
          )}
        >
          Employee
        </button>
        <button
          type="button"
          onClick={() => setRole('HR')}
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-[12px] transition-all",
            role === 'HR' ? "bg-white text-brand-700 shadow-sm" : "text-surface-500 hover:text-surface-900"
          )}
        >
          HR / Admin
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input id="employeeId" placeholder="DF-001" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="name@company.com" required />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <PasswordInput 
              id="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <PasswordInput id="confirmPassword" placeholder="••••••••" required />
          </div>

          {/* Password Validation Checklist */}
          {password.length > 0 && (
            <div className="space-y-2 p-4 bg-surface-50 rounded-2xl border border-surface-100">
              <p className="text-xs font-semibold text-surface-600 uppercase tracking-wider">Password Requirements</p>
              <ul className="space-y-1.5 text-sm">
                <li className={cn("flex items-center gap-2", hasLength ? "text-green-600" : "text-surface-500")}>
                  {hasLength ? <Check size={14} /> : <X size={14} />} At least 8 characters
                </li>
                <li className={cn("flex items-center gap-2", hasNumber ? "text-green-600" : "text-surface-500")}>
                  {hasNumber ? <Check size={14} /> : <X size={14} />} Contains a number
                </li>
              </ul>
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-surface-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-800 transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
