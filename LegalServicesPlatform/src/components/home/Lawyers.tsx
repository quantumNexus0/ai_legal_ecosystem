import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LawyerCard from './LawyerCard';
import LawyerFilters from './LawyerFilters';
import type { Lawyer } from '../../types';
import { lawyerService } from '../../services/lawyerService';
import { Search, Users } from 'lucide-react';

const Lawyers = () => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    specialization: '',
    experience: '',
    rating: ''
  });

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        setLoading(true);
        const data = await lawyerService.fetchLawyers();
        const mappedLawyers: Lawyer[] = data.map(lawyer => ({
          id: String(lawyer.id),
          name: lawyer.full_name || 'Unknown',
          specialization: lawyer.specialization || 'General Practice',
          experience: lawyer.experience_years || 0,
          rating: lawyer.rating || 0,
          cases: lawyer.cases_handled || 0,
          imageUrl: lawyer.profile_image_url || `https://ui-avatars.com/api/?name=${lawyer.full_name}&background=random&size=200`
        }));
        setLawyers(mappedLawyers);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch lawyers:', err);
        setError('Failed to load lawyers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredLawyers = useMemo(() => {
    return lawyers.filter(lawyer => {
      if (filters.specialization && lawyer.specialization !== filters.specialization) return false;
      if (filters.experience) {
        const [min, max] = filters.experience.split('-').map(Number);
        if (max) {
          if (lawyer.experience < min || lawyer.experience > max) return false;
        } else if (lawyer.experience < min) return false;
      }
      if (filters.rating && lawyer.rating < Number(filters.rating)) return false;
      return true;
    });
  }, [filters, lawyers]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <section id="lawyers" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-lg mb-4">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-blue-700 font-bold uppercase tracking-widest text-xs">Directory</span>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
              Connect with Top-Rated Legal Experts
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Find specialized lawyers across India for instant advice and representation.
            </p>
          </motion.div>
        </div>

        <div className="mb-12">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Search className="h-24 w-24" />
            </div>
            <LawyerFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </div>

        {loading ? (
          <div className="mt-12 text-center py-20 flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Scanning our network of experts...</p>
          </div>
        ) : error ? (
          <div className="mt-12 text-center py-20 bg-red-50 rounded-2xl border border-red-100">
            <p className="text-red-600 font-bold text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Try refreshing the page
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filteredLawyers.length}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredLawyers.length > 0 ? (
                filteredLawyers.map((lawyer) => (
                  <motion.div key={lawyer.id} variants={itemVariants}>
                    <LawyerCard lawyer={lawyer} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200"
                >
                  <p className="text-gray-500 text-lg font-medium">
                    No lawyers found matching your current filters.
                  </p>
                  <button
                    onClick={() => setFilters({ specialization: '', experience: '', rating: '' })}
                    className="mt-4 text-blue-600 font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default Lawyers;