import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LogOut, Settings, User, Home, Sparkles, FileText, Bot, Database, Menu, X, Scale, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user, isInitialized } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { name: 'Case Analyzer', path: 'http://localhost:5174/index.html#analyze', icon: Sparkles, type: 'external', color: 'text-amber-400', glow: 'bg-amber-400/10' },
    { name: 'Legal Research', path: 'http://localhost:5174/index.html#refs', icon: Database, type: 'external' },
    { name: 'Nyaya-AI', path: 'http://localhost:5174/index.html', icon: Bot, type: 'external', color: 'text-indigo-400', glow: 'bg-indigo-400/10' },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (user?.role === 'admin') {
      return !['Templates', 'Case Analyzer', 'Legal Research', 'Nyaya-AI'].includes(item.name);
    }
    return true;
  });

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0B0E14] text-gray-400">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center justify-between flex-shrink-0 px-6 mb-8">
          <Link to="/" className="flex items-center group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-black text-white tracking-tighter uppercase">
              Nyaya<span className="text-blue-600">AI</span>
            </span>
          </Link>
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            const content = (
              <>
                <div className={`p-2 rounded-lg mr-3 transition-colors ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-800 group-hover:bg-gray-700'}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="flex-1 font-medium">{item.name}</span>
                {item.type === 'external' && <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-50 transition-opacity" />}
              </>
            );

            if (item.type === 'external') {
              return (
                <a
                  key={item.name}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center px-3 py-2.5 text-sm rounded-xl transition-all hover:bg-white/5 hover:text-white ${item.color || ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {content}
                </a>
              );
            }
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-3 py-2.5 text-sm rounded-xl transition-all ${
                  isActive ? 'bg-white/5 text-white' : 'hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {content}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="flex-shrink-0 p-4 border-t border-white/5 bg-black/20">
        <div className="bg-white/5 rounded-2xl p-4">
          <div className="flex items-center mb-4">
            <img
              className="h-10 w-10 rounded-xl border-2 border-white/10"
              src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
              alt=""
            />
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 rounded-xl transition-all"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Mobile Drawer (Framer Motion) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Fixed) */}
      <div className="hidden lg:flex lg:flex-shrink-0 w-72 border-r border-gray-200">
        <SidebarContent />
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Responsive Mobile Header */}
        <div className="lg:hidden flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-gray-100 px-4 py-3 sticky top-0 z-30">
          <Link to="/" className="flex items-center">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Scale className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2.5 text-lg font-black text-gray-900 tracking-tighter uppercase">
              Nyaya<span className="text-blue-600">AI</span>
            </span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-xl bg-gray-50 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-[#F8FAFC]">
          <div className="py-6 sm:py-8 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;