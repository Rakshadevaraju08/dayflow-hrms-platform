import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, KeyRound } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';

export function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
            <KeyRound size={32} className="stroke-[1.5]" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-surface-900">Check your email</h1>
          <p className="text-sm text-surface-500 px-4">
            If an account exists, we have sent password reset instructions to your email.
          </p>
        </div>
        <div className="pt-4">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors">
            <ArrowLeft size={16} /> Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-surface-900">Forgot Password</h1>
        <p className="text-sm text-surface-500">Enter your email and we'll send a reset link</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="name@company.com" required />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending link..." : "Send Reset Link"}
        </Button>
      </form>

      <div className="text-center">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors">
          <ArrowLeft size={16} /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
