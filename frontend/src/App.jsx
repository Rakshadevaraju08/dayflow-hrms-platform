import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/Card';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { VerifyEmail } from './pages/auth/VerifyEmail';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';

// Dashboard Pages
import { Dashboard } from './pages/dashboard/Dashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { Employees } from './pages/admin/Employees';

// Dummy placeholder component for testing the layout shell
function PlaceholderPage({ title }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>This is a placeholder page to demonstrate the layout.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 rounded-xl border-2 border-dashed border-surface-200 bg-surface-50 flex items-center justify-center text-surface-400">
            Content area for {title}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Protected App Routes */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/employees" element={<Employees />} />
          <Route path="profile" element={<PlaceholderPage title="My Profile" />} />
          <Route path="attendance" element={<PlaceholderPage title="Attendance" />} />
          <Route path="leave" element={<PlaceholderPage title="Leave" />} />
          <Route path="leave-requests" element={<PlaceholderPage title="Leave Requests" />} />
          <Route path="salary" element={<PlaceholderPage title="Salary" />} />
          <Route path="payroll" element={<PlaceholderPage title="Payroll" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
