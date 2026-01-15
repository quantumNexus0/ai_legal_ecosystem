import React from 'react';
import { Search } from 'lucide-react';

interface LawyerFiltersProps {
  filters: {
    specialization: string;
    experience: string;
    rating: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

const LawyerFilters: React.FC<LawyerFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search lawyers..."
            className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <select
            value={filters.specialization}
            onChange={(e) => onFilterChange('specialization', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Specializations</option>
            <option value="Corporate Law">Corporate Law</option>
            <option value="Criminal Law">Criminal Law</option>
            <option value="Family Law">Family Law</option>
            <option value="Civil Rights">Civil Rights</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Intellectual Property">Intellectual Property</option>
            <option value="Immigration Law">Immigration Law</option>
            <option value="Environmental Law">Environmental Law</option>
            <option value="Employment Law">Employment Law</option>
            <option value="Tax Law">Tax Law</option>
            <option value="Healthcare Law">Healthcare Law</option>
            <option value="International Law">International Law</option>
            <option value="Civil Litigation">Civil Litigation</option>
            <option value="Banking Law">Banking Law</option>
            <option value="Human Rights">Human Rights</option>
          </select>
        </div>

        <div>
          <select
            value={filters.experience}
            onChange={(e) => onFilterChange('experience', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Experience Level</option>
            <option value="0-5">0-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>

        <div>
          <select
            value={filters.rating}
            onChange={(e) => onFilterChange('rating', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Rating</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LawyerFilters;