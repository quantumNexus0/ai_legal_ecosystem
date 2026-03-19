import { Scale, Briefcase, Users, Home, Gavel, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Property & Real Estate',
    description: 'Expert help with property disputes, title verification, registration, and RERA matters.',
    icon: Home,
    color: 'blue'
  },
  {
    title: 'Family & Matrimonial',
    description: 'Compassionate assistance for divorce, alimony, child custody, and family settlements.',
    icon: Users,
    color: 'orange'
  },
  {
    title: 'Criminal Defense',
    description: 'Strong representation for bail, FIR matters, and criminal litigation in all courts.',
    icon: Gavel,
    color: 'red'
  },
  {
    title: 'Corporate & Startup',
    description: 'Full legal support for company registration, GST, contracts, and compliance.',
    icon: Briefcase,
    color: 'indigo'
  },
  {
    title: 'Civil Litigation',
    description: 'Professional handling of recovery suits, injunctions, and civil appeals.',
    icon: Scale,
    color: 'purple'
  },
  {
    title: 'Legal Documentation',
    description: 'Quick drafting of sale deeds, wills, NDAs, and all types of legal notices.',
    icon: FileCheck,
    color: 'green'
  }
];

const Services = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="services" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Expert Legal Solutions for Every Need
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Tailored legal services designed for Indian citizens, businesses, and NRIs.
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-3"
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-blue-50 flex items-center justify-center mb-3 sm:mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Icon className="h-5 w-5 sm:h-7 sm:w-7 text-blue-600 group-hover:text-white" />
              </div>
              <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-3 tracking-tight line-clamp-1">
                {service.title}
              </h3>
              <p className="text-[11px] sm:text-base text-gray-600 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                {service.description}
              </p>
              <div className="mt-4 sm:mt-6">
                <a href="#lawyers" className="text-[11px] sm:text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center">
                  Browse Lawyers
                  <svg className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Services;