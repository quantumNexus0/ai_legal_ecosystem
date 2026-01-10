import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserCircle, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import type { SignupFormData } from '../../types/auth';
import { authService } from '../../services/authService';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  role: z.enum(['lawyer', 'user']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: 'user',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await authService.signup(data);
      navigate('/login');
    } catch (error: any) {
      console.error('Signup failed:', error);
      setError('root', {
        type: 'manual',
        message: error.response?.data?.detail || 'Registration failed. Please try again.',
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Full Name */}
        <motion.div variants={itemVariants}>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('name')}
              type="text"
              className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base"
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm text-red-600 flex items-center"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.name.message}
            </motion.p>
          )}
        </motion.div>

        {/* Email */}
        <motion.div variants={itemVariants}>
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

        {/* Role Selection */}
        <motion.div variants={itemVariants}>
          <label htmlFor="role" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">
            I am a
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <UserCircle className="h-5 w-5 text-gray-400" />
            </div>
            <select
              {...register('role')}
              className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base appearance-none bg-white cursor-pointer"
            >
              <option value="user">Client / Individual</option>
              <option value="lawyer">Lawyer / Legal Professional</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.role && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm text-red-600 flex items-center"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.role.message}
            </motion.p>
          )}
        </motion.div>

        {/* Password */}
        <motion.div variants={itemVariants}>
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
              placeholder="Create a strong password"
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

        {/* Confirm Password */}
        <motion.div variants={itemVariants}>
          <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('confirmPassword')}
              type="password"
              className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base"
              placeholder="Re-enter your password"
            />
          </div>
          {errors.confirmPassword && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm text-red-600 flex items-center"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.confirmPassword.message}
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
          variants={itemVariants}
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
              Creating your account...
            </span>
          ) : (
            <span className="flex items-center">
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          )}
        </motion.button>

        {/* Terms Notice */}
        <motion.div
          variants={itemVariants}
          className="mt-6 p-4 bg-green-50 border-2 border-green-100 rounded-xl"
        >
          <p className="text-xs text-green-800 flex items-start">
            <CheckCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <span>
              By creating an account, you agree to our Terms of Service and Privacy Policy.
              Your information is encrypted and secure.
            </span>
          </p>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default SignupForm;