import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;
  const isAdmin = ['HR', 'ADMIN', 'hr', 'admin'].includes(user.role);
  function handleLogout() { logout(); navigate('/login'); }

  return <nav className="bg-white shadow-sm px-6 py-4 flex flex-wrap gap-4 justify-between items-center">
    <Link to={isAdmin ? '/admin/dashboard' : '/dashboard'} className="text-xl font-bold text-indigo-600">Dayflow HRMS</Link>
    <div className="flex flex-wrap items-center gap-4">
      <Link to={isAdmin ? '/admin/dashboard' : '/dashboard'} className="text-gray-600 hover:text-indigo-600">{isAdmin ? 'Admin dashboard' : 'Dashboard'}</Link>
      <Link to="/profile" className="text-gray-600 hover:text-indigo-600">Profile</Link>
      <Link to="/attendance" className="text-gray-600 hover:text-indigo-600">Attendance</Link>
      <Link to="/leave" className="text-gray-600 hover:text-indigo-600">Leave</Link>
      <button type="button" onClick={handleLogout} className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Log out</button>
    </div>
  </nav>;
}