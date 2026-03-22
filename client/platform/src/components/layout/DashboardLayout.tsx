import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LogOut, Settings, User, Home, Sparkles, FileText, Bot, Database, Menu, X } from 'lucide-react';
import useAuthStore from '../../store/authStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user, isInitialized } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Diagnostic logging for deployment debugging
  React.useEffect(() => {
    if (isInitialized) {
      console.log("[DashboardLayout] Initialized. User:", user?.email, "Role:", user?.role);
    }
  }, [isInitialized, user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home, type: 'link' },
    { name: 'Templates', path: `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/template-portal/templates/index.html`, icon: FileText, type: 'external' },
    { name: 'Profile', path: '/dashboard/profile', icon: User, type: 'link' },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings, type: 'link' },
    { name: 'Case Analyzer', path: '/dashboard/analysis', icon: Sparkles, type: 'link', color: 'text-amber-400' },
    { name: 'Legal Research', path: '/dashboard/research', icon: Database, type: 'link' },
    { name: 'NyayaAssist AI', path: import.meta.env.VITE_ASSISTANT_URL || 'https://nyayaassist-assistant.vercel.app/', icon: Bot, type: 'external', color: 'text-indigo-400' },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (user?.role === 'admin') {
      return !['Templates', 'Case Analyzer', 'Legal Research', 'NyayaAssist AI'].includes(item.name);
    }
    return true;
  });

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center justify-between flex-shrink-0 px-4">
          <span className="text-xl font-semibold text-white">LegalPro</span>
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            if (item.type === 'external') {
              return (
                <a
                  key={item.name}
                  href={item.path}
                  target={item.name === 'NyayaAssist AI' ? "_blank" : "_self"}
                  rel={item.name === 'NyayaAssist AI' ? "noopener noreferrer" : ""}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.color || 'text-gray-300'
                  } hover:bg-gray-700 hover:text-white`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="mr-3 h-6 w-6" />
                  {item.name}
                </a>
              );
            }
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } ${item.color || ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon className="mr-3 h-6 w-6" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
        <div className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs font-medium text-gray-400">
                {user?.role}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-3 flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <LogOut className="mr-3 h-6 w-6" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed inset-0 z-40 flex ${isMobileMenuOpen ? "visible" : "invisible"}`}>
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-gray-800 transform transition duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <SidebarContent />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
          <span className="text-xl font-semibold">LegalPro</span>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;