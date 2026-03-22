import React from 'react';
import type { LucideIcon } from 'lucide-react';
import StatsCard from '../StatsCard';

interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface AdminStatsProps {
  stats: StatItem[];
}

const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
  const colors = ["blue", "green", "purple", "amber"];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.label}
          value={stat.value}
          icon={stat.icon}
          color={colors[index % colors.length] as "blue" | "green" | "purple" | "amber"}
        />
      ))}
    </div>
  );
};

export default AdminStats;