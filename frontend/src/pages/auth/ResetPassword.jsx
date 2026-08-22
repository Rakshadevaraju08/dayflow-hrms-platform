import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { cn } from '../../lib/utils';

export function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const hasLength = password.length >= 8;
  const hasNumber = /\d/.test(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasLength || !hasNumber) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }, 1000);
  };

  if (success) {
    return (
      <div className="text-center space-y-4 animate-in fade-in duration-300">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 mb-2">
          <Check size={32} className="stroke-[2]" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-surface-900">Password Reset</h1>
        <p className="text-sm text-surface-500">Your password has been successfully updated. Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-surface-900">Reset Password</h1>
        <p className="text-sm text-surface-500">Create a new secure password for your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="password">New Password</Label>
            <PasswordInput 
              id="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
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
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
