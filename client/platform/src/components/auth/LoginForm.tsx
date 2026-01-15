import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import type { LoginFormData } from '../../types/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Login failed. Please check your credentials and try again.',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('email')}
              type="email"
              className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base"
              placeholder="your.email@example.com"
            />
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm text-red-600 flex items-center"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.email.message}
            </motion.p>
          )}
        </motion.div>

        {/* Password Field */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('password')}
              type="password"
              className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base"
              placeholder="Enter your password"
            />
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm text-red-600 flex items-center"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.password.message}
            </motion.p>
          )}
        </motion.div>

        {/* Error Message */}
        {errors.root && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl bg-red-50 border-2 border-red-200 p-4"
          >
            <p className="text-sm text-red-600 font-medium flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {errors.root.message}
            </p>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            <span className="flex items-center">
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          )}
        </motion.button>

        {/* Test Accounts Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-5 bg-blue-50 border-2 border-blue-100 rounded-xl"
        >
          <p className="text-xs font-bold text-blue-900 mb-3 uppercase tracking-wider">Test Accounts:</p>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              <code className="bg-white px-2 py-1 rounded font-mono text-xs">admin@example.com</code>
              <span className="ml-2 text-xs">(Admin Dashboard)</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              <code className="bg-white px-2 py-1 rounded font-mono text-xs">lawyer@example.com</code>
              <span className="ml-2 text-xs">(Lawyer Dashboard)</span>
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              <code className="bg-white px-2 py-1 rounded font-mono text-xs">user@example.com</code>
              <span className="ml-2 text-xs">(User Dashboard)</span>
            </li>
          </ul>
          <p className="mt-3 text-xs text-blue-700 font-medium">Use any password with 6+ characters</p>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default LoginForm;