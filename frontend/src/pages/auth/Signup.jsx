import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

export function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [role, setRole] = useState('EMPLOYEE');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simple password validation checks
  const hasLength = password.length >= 8;
  const hasNumber = /\d/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasLength || !hasNumber) return;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await signup({ 
        firstName, 
        lastName, 
        email, 
        password,
        role 
      });
      navigate('/dashboard'); // Go directly to dashboard for this prototype
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
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
        
        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-sm font-medium rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                placeholder="John" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                placeholder="Doe" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required 
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
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
            <PasswordInput 
              id="confirmPassword" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
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
