import React from 'react';
import { Star, Briefcase, MessageSquare, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { useChatStore } from '../../store/chatStore';
import type { Lawyer } from '../../types';

interface LawyerCardProps {
  lawyer: Lawyer;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { startChat } = useChatStore();

  const handleMessage = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    startChat({
      id: Number(lawyer.id),
      name: lawyer.name,
      profile_image_url: lawyer.imageUrl
    });
    navigate('/dashboard?tab=messages');
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="relative h-28 sm:h-56 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={lawyer.imageUrl}
          alt={lawyer.name}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center shadow-sm">
          <Star className="h-4 w-4 text-orange-500 fill-orange-500 mr-1" />
          <span className="text-sm font-bold text-gray-900">{lawyer.rating.toFixed(1)}</span>
        </div>
        {Number(lawyer.id) % 2 === 0 && ( // Just for demo, every other lawyer is "Verified"
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-blue-600 text-white p-1 sm:px-3 sm:py-1 rounded-full flex items-center shadow-sm">
            <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Verified</span>
          </div>
        )}
      </div>

      <div className="p-3 sm:p-6 flex-1 flex flex-col">
        <div className="mb-2 sm:mb-4">
          <h3 className="text-sm sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight line-clamp-1">
            {lawyer.name}
          </h3>
          <p className="text-[10px] sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mt-0.5 line-clamp-1">
            {lawyer.specialization}
          </p>
        </div>

        <div className="space-y-1.5 sm:space-y-3 mb-3 sm:mb-6 flex-1">
          <div className="flex items-center text-gray-600">
            <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-gray-400" />
            <span className="text-[11px] sm:text-sm font-medium">{lawyer.experience} Yrs</span>
          </div>
          <div className="flex items-center text-gray-600">
            <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-gray-400" />
            <span className="text-[11px] sm:text-sm font-medium">{lawyer.cases}+ Cases</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mt-auto">
          <button
            onClick={() => navigate(`/lawyer/${lawyer.id}`)}
            className="w-full py-1.5 sm:py-3 border-2 border-gray-100 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
          >
            Profile
          </button>
          <button
            onClick={handleMessage}
            className="w-full bg-blue-600 text-white py-1.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-1 sm:gap-2"
          >
            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-bold text-[10px] sm:text-sm text-center">Chat</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LawyerCard;