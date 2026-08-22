import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
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
import { Profile } from './pages/employee/Profile';
import { Attendance } from './pages/employee/Attendance';
import { AdminAttendance } from './pages/admin/Attendance';
import { Leave } from './pages/employee/Leave';
import { AdminLeave } from './pages/admin/Leave';
import { Salary } from './pages/employee/Salary';
import { AdminPayroll } from './pages/admin/Payroll';
import { Settings } from './pages/dashboard/Settings';

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
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            {/* Employee Routes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leave" element={<Leave />} />
            <Route path="salary" element={<Salary />} />
            <Route path="settings" element={<Settings />} />

            {/* HR/Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['HR', 'ADMIN']} />}>
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/employees" element={<Employees />} />
              <Route path="admin/attendance" element={<AdminAttendance />} />
              <Route path="leave-requests" element={<AdminLeave />} />
              <Route path="payroll" element={<AdminPayroll />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
