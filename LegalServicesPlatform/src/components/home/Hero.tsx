import { ArrowRight, Shield, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative bg-white pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-blue-50/50 rounded-l-[100px] hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="sm:text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2 animate-pulse" />
              Trusted by 10,000+ Indian Citizens
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block mb-2">Empowering India with</span>
              <span className="block text-blue-600 bg-clip-text">AI-Driven Legal Excellence</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-6 text-lg text-gray-500 sm:max-w-xl sm:mx-auto lg:mx-0">
              Instant consultation with verified Indian lawyers. Get expert advice for property, matrimonial, and criminal cases from the comfort of your home.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
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

            <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center lg:justify-start space-x-8 text-gray-400">
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

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 lg:mt-0 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-[500px] object-cover"
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Modern Courtroom or Legal Office"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Action Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Verified Legal Support</p>
                    <p className="text-xs text-gray-500">Bar Council Registered Lawyers</p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <img
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white"
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="User"
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;