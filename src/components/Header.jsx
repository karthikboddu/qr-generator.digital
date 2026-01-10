import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { QrCode, LayoutDashboard, LogOut, User,LogIn,Newspaper } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };


  const navItems = [
    { path: '/', label: 'Generator', icon: QrCode },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/blog', label: 'Blog', icon: Newspaper },
  ];


  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">QR Gen</span>
          </Link>

          <nav className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center px-3 sm:px-4 py-2 rounded-lg font-medium transition ${
                  location.pathname === path || (path === '/blog' && location.pathname.startsWith('/blog'))
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 sm:mr-2" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}

            {user && (
            <div className="hidden sm:flex items-center ml-4 pl-4 border-l border-gray-200">
              <span className="text-sm text-gray-600 mr-3 flex items-center">
                <User className="w-4 h-4 mr-1" />
                {user?.name || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </div>
            )}

            <button
              onClick={handleLogout}
              className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
            {!user && (
            <div className="hidden sm:flex items-center ml-4 pl-4 border-l border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </button>
              
            </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
