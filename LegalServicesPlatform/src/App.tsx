import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import DashboardLayout from './components/layout/DashboardLayout';
import Hero from './components/home/Hero';
import Services from './components/home/Services';
import Lawyers from './components/home/Lawyers';
import Contact from './components/home/Contact';
import Footer from './components/home/Footer';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import AdminDashboard from './components/dashboard/AdminDashboard';
import LawyerDashboard from './components/dashboard/LawyerDashboard';
import UserDashboard from './components/dashboard/UserDashboard';
import ProfileEdit from './components/dashboard/ProfileEdit';
import FindLawyerPage from './components/home/FindLawyerPage';
import DocumentDrafting from './components/dashboard/documents/DocumentDrafting';
import NewCasePage from './components/dashboard/cases/NewCasePage';
import NewAppointmentPage from './components/dashboard/appointments/NewAppointmentPage';
import useAuthStore from './store/authStore';

const PrivateRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { isAuthenticated, isInitialized, user } = useAuthStore();

  if (!isInitialized) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

const DashboardRouter = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'lawyer':
      return <LawyerDashboard />;
    case 'user':
      return <UserDashboard />;
    default:
      return <Navigate to="/" />;
  }
};

function App() {
  const { checkAuth } = useAuthStore();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div className="pt-16">
                <Hero />
                <Services />
                <Lawyers />
                <Contact />
                <Footer />
              </div>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                  <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                  </div>
                  <LoginForm />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                  <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
                  </div>
                  <SignupForm />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute allowedRoles={['admin', 'lawyer', 'user']}>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<DashboardRouter />} />
                  <Route path="/cases/new" element={<NewCasePage />} />
                  <Route path="/appointments/new" element={<NewAppointmentPage />} />
                  <Route path="/profile" element={<ProfileEdit />} />
                  <Route path="/draft" element={<DocumentDrafting />} />
                  <Route path="/lawyers" element={<FindLawyerPage hideNav={true} />} />
                </Routes>
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route path="/lawyers" element={<FindLawyerPage />} />
      </Routes>
    </Router>
  );
}

export default App;