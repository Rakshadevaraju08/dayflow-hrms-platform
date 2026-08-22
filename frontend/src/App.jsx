import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">Dayflow HRMS</Link>
          <div className="space-x-4">
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
            <Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile</Link>
            <Link to="/attendance" className="text-gray-600 hover:text-blue-600">Attendance</Link>
            <Link to="/leave" className="text-gray-600 hover:text-blue-600">Leave</Link>
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Login</Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leave" element={<Leave />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
