import React from 'react';
import { Star, Briefcase, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';
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
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="relative h-56 overflow-hidden">
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
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full flex items-center shadow-sm">
            <ShieldCheck className="h-4 w-4 mr-1" />
            <span className="text-xs font-bold uppercase tracking-wider">Verified</span>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
            {lawyer.name}
          </h3>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mt-1">
            {lawyer.specialization}
          </p>
        </div>

        <div className="space-y-3 mb-6 flex-1">
          <div className="flex items-center text-gray-600">
            <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm font-medium">{lawyer.experience} Years Experience</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm font-medium">Available for Online Consultation</span>
          </div>
          <div className="flex items-center text-gray-600">
            <ShieldCheck className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm font-medium">{lawyer.cases}+ Cases Resolved</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            onClick={() => navigate(`/lawyer/${lawyer.id}`)}
            className="py-3 px-4 border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all"
          >
            Profile
          </button>
          <button
            onClick={handleMessage}
            className="bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
          >
            <MessageSquare className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span className="font-bold text-sm">Chat Now</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LawyerCard;