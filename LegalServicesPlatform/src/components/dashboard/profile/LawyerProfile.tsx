import { User, Mail, Phone, MapPin, Award, Briefcase } from 'lucide-react';
import useAuthStore from '../../../store/authStore';
import { useNavigate } from 'react-router-dom';

const LawyerProfile = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <div className="inline-block relative">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name}&size=150&background=random`}
            alt="Profile"
            className="rounded-full w-32 h-32"
          />
          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
            <User className="h-4 w-4" />
          </button>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">{user?.name}</h2>
        <p className="text-blue-600">{user?.specialization || 'Lawyer'}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-900">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-gray-900">{user?.phone || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Office Address</p>
            <p className="text-gray-900">{user?.office_address || 'Not provided'}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Award className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Experience</p>
            <p className="text-gray-900">{user?.experience_years || 0} years</p>
          </div>
        </div>
        <div className="flex items-center">
          <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm text-gray-500">Specialization</p>
            <p className="text-gray-900">{user?.specialization || 'Not specified'}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={() => navigate('/dashboard/profile')}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default LawyerProfile;