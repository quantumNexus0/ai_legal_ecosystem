import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Scale, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '#services' },
    { name: 'Templates', href: `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/template-portal/templates/index.html` },
    { name: 'Our Lawyers', href: '#lawyers' },
    { name: 'AI Analyzer', href: 'http://localhost:5174/index.html#analyze' },
    { name: 'Legal Research', href: 'http://localhost:5174/index.html#refs' },
    { name: 'Nyaya-AI', href: 'http://localhost:5174/index.html' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* ── NAVBAR BAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? 'py-3 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">

            {/* Logo */}
            <Link to="/" className="flex items-center group flex-shrink-0">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-xl shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <Scale className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2.5 text-xl font-black tracking-tighter uppercase bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Nyaya<span className="text-blue-600">AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-xs font-bold text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50/50 transition-all uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-6 w-px bg-gray-200 mx-3" />
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/dashboard"
                    className="px-3 py-2 text-xs font-bold text-gray-600 hover:text-blue-600 flex items-center gap-2 uppercase tracking-widest"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <div className="relative group/user">
                    <button className="flex items-center gap-2 p-1 pr-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                      <img
                        className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                        src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                        alt=""
                      />
                      <span className="text-xs font-bold text-gray-700">{user?.name?.split(' ')[0]}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all p-2 origin-top-right">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3 ml-2">
                  <Link to="/login" className="px-5 py-2 text-xs font-bold text-gray-700 hover:text-blue-600 uppercase tracking-widest transition-colors">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95 uppercase tracking-widest"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile: Sign Up shortcut + Hamburger */}
            <div className="xl:hidden flex items-center gap-3">
              {!isAuthenticated && (
                <Link
                  to="/signup"
                  className="hidden sm:block px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md uppercase tracking-widest"
                >
                  Sign Up
                </Link>
              )}
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="p-2.5 rounded-xl bg-gray-100 text-gray-900 hover:bg-gray-200 transition-all"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER (rendered outside <nav> so z-index is clean) ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-[200] xl:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-xs sm:max-w-sm bg-white z-[300] shadow-2xl xl:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center">
                  <div className="bg-blue-600 p-1.5 rounded-lg">
                    <Scale className="h-4 w-4 text-white" />
                  </div>
                  <span className="ml-2 text-lg font-black tracking-tighter uppercase">
                    Nyaya<span className="text-blue-600">AI</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  <X className="h-5 w-5 text-gray-700" />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-3 mb-3">Navigation</p>
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                    >
                      {link.name}
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-200" />
                    </motion.a>
                  ))}
                </div>

                <div className="h-px bg-gray-100 my-5" />

                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-3 mb-3">Account</p>

                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl mb-3">
                      <img
                        className="h-10 w-10 rounded-full border-2 border-white shadow"
                        src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                        alt=""
                      />
                      <div>
                        <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 w-full px-4 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-2xl transition-all"
                    >
                      <LayoutDashboard className="w-5 h-5 text-gray-400" />
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 px-1">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center py-3.5 text-sm font-bold text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-2xl border border-gray-200 transition-all"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                <p className="text-[10px] text-gray-400 text-center">
                  © {new Date().getFullYear()} NyayaAI Ecosystem. All rights reserved.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;