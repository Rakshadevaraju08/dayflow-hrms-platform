import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import EmployeeProfile from './pages/EmployeeProfile';
import EditProfile from './pages/EditProfile';
import PersonalJobDetails from './pages/PersonalJobDetails';
import Salary from './pages/Salary';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/employee-profile" element={<EmployeeProfile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/profile/details" element={<PersonalJobDetails />} />
              <Route path="/profile/salary" element={<Salary />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/leave" element={<Leave />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['HR', 'ADMIN', 'hr', 'admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;