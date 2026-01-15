
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: string; // e.g. "blue", "green", "purple"
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, trend, trendUp, color = "blue" }) => {
    const colorClasses = {
        blue: "bg-blue-50 text-blue-700",
        green: "bg-green-50 text-green-700",
        purple: "bg-purple-50 text-purple-700",
        amber: "bg-amber-50 text-amber-700",
    };

    const cssClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                    {trend && (
                        <p className={`text-xs mt-1 font-medium ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
                            {trendUp ? '↑' : '↓'} {trend}
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${cssClass}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
