import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault(); setError(''); setSubmitting(true);
    try { const user = await login(form); navigate(['HR', 'ADMIN', 'hr', 'admin'].includes(user.role) ? '/admin/dashboard' : '/dashboard'); }
    catch (submitError) { setError(submitError.message); }
    finally { setSubmitting(false); }
  }
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
        <p className="text-center text-gray-600">Enter your credentials to access the HRMS</p>
        {error && <div role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm" required />
          </div>
          <button type="submit" disabled={submitting} className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">Need an account? <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-700">Create one</Link></p>
      </div>
    </div>
  );
}
