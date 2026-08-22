import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MailCheck, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function VerifyEmail() {
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setResendSuccess(true);
    }, 1000);
  };

  return (
    <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center">
          <MailCheck size={32} className="stroke-[1.5]" />
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight text-surface-900">Check your email</h1>
        <p className="text-sm text-surface-500 px-4">
          We sent a verification link to <span className="font-medium text-surface-900">name@company.com</span>. 
          Please check your inbox and verify your email to continue.
        </p>
      </div>

      {resendSuccess && (
        <div className="p-3 bg-green-50 border border-green-100 text-green-700 text-sm font-medium rounded-2xl">
          Verification email sent successfully!
        </div>
      )}

      <div className="space-y-3 pt-2">
        <Button onClick={handleResend} disabled={resending || resendSuccess} className="w-full">
          {resending ? "Sending..." : resendSuccess ? "Sent!" : "Resend Verification Email"}
        </Button>
        <Link to="/login" className="inline-flex items-center gap-2 text-sm font-medium text-surface-500 hover:text-surface-900 transition-colors">
          <ArrowLeft size={16} /> Back to Sign In
        </Link>
      </div>

    </div>
  );
}
