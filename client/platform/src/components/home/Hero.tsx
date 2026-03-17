import { ArrowRight, Shield } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import GovernmentServices from './GovernmentServices';

const Hero = () => {
  // Container animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Item animation
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut', // ✅ now valid because of Variants typing
      },
    },
  };

  return (
    <div className="relative bg-white pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-blue-50/50 rounded-l-[100px] hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="sm:text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2 animate-pulse" />
              Trusted by 10,000+ Indian Citizens
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
            >
              <span className="block mb-2">Empowering India with</span>
              <span className="block text-blue-600 bg-clip-text">
                AI-Driven Legal Excellence
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-gray-500 sm:max-w-xl sm:mx-auto lg:mx-0"
            >
              Instant consultation with verified Indian lawyers. Get expert advice
              for property, matrimonial, and criminal cases from the comfort of your home.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 sm:flex sm:justify-center lg:justify-start gap-4"
            >
              <a
                href="#lawyers"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-1 md:text-lg"
              >
                Find a Lawyer
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-base font-bold rounded-xl text-blue-600 bg-white hover:bg-blue-50 transition-all transform hover:-translate-y-1 md:text-lg"
              >
                Our Services
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex items-center justify-center lg:justify-start space-x-8 text-gray-400"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-gray-900">4.9/5</span>
                <span className="text-sm">User Rating</span>
              </div>

              <div className="h-8 w-px bg-gray-200" />

              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-gray-900">500+</span>
                <span className="text-sm">Verified Lawyers</span>
              </div>

              <div className="h-8 w-px bg-gray-200" />

              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-gray-900">15m</span>
                <span className="text-sm">Avg. Response</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: 'easeOut',
            }}
            className="mt-12 lg:mt-0 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/50 backdrop-blur-sm border border-white/50 p-6 md:p-8">
              <div className="absolute top-0 right-0 -z-10 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 opacity-80" />

              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Official Judiciary Services
                </h3>

                <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  Live Access
                </span>
              </div>

              <GovernmentServices compact={true} />

              <div className="mt-6 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white"
                      src={`https://i.pravatar.cc/100?img=${i + 15}`}
                      alt="User"
                    />
                  ))}
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold">
                    +2k
                  </div>
                </div>

                <p>Used by 2,000+ lawyers daily</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;