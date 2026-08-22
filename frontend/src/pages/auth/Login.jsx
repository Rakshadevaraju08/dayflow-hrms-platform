import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { useAuth } from '../../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-surface-900">Welcome back</h1>
        <p className="text-sm text-surface-500">Sign in to your Dayflow workspace</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-sm font-medium rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="space-y-4">
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
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="remember" 
              className="w-4 h-4 rounded border-surface-300 text-brand-600 focus:ring-brand-500"
            />
            <Label htmlFor="remember" className="font-normal cursor-pointer">Remember me</Label>
          </div>
          <Link to="/forgot-password" className="text-sm font-medium text-brand-600 hover:text-brand-800 transition-colors">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-surface-500">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-brand-600 hover:text-brand-800 transition-colors">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
