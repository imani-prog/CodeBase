import React, { useState } from 'react';
import { Users, UserCheck, AlertCircle, Shield, TrendingUp, Clock, Activity, ArrowUpRight, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatsCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Active Patients',
      value: '1,245',
      change: '+12% from last month',
      icon: Users,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trendIcon: TrendingUp,
      trendColor: 'text-green-600',
      badge: 'Growing',
      badgeColor: 'bg-green-50 text-green-700 border-green-200',
      lastUpdate: '2 min ago',
      link: '/admin/active-patients'
    },
    {
      title: 'Active CHWs',
      value: '87',
      change: '+5% from last month',
      icon: UserCheck,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trendIcon: TrendingUp,
      trendColor: 'text-green-600',
      badge: 'On Track',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      lastUpdate: '5 min ago',
      link: '/admin/active-chw'
    },
    {
      title: 'Pending Approvals',
      value: '12',
      change: '3 urgent',
      icon: AlertCircle,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trendIcon: Clock,
      trendColor: 'text-yellow-600',
      badge: 'Attention',
      badgeColor: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      lastUpdate: '1 min ago',
      link: '/admin/approve-requests'
    },
    {
      title: 'System Health',
      value: '98.5%',
      change: 'All systems operational',
      icon: Shield,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trendIcon: Activity,
      trendColor: 'text-gray-500',
      badge: 'Excellent',
      badgeColor: 'bg-green-50 text-green-700 border-green-200',
      lastUpdate: 'Just now',
      link: '/admin/system-logs'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trendIcon;
        
        return (
          <div 
            key={index} 
            className={`bg-white shadow-sm p-6 border border-gray-100 rounded-xl cursor-pointer 
              transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
              ${hoveredCard === index ? 'border-blue-300 shadow-blue-100' : ''}
              relative overflow-hidden group`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header with badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${stat.badgeColor}`}>
                  {stat.badge}
                </span>
                <div className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center 
                  transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>

              {/* Title */}
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>

              {/* Value with animated underline */}
              <div className="flex items-baseline justify-between mb-4">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <ArrowUpRight className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Trend and timestamp */}
              <div className="flex items-center justify-between">
                <p className={`text-sm ${stat.trendColor} flex items-center`}>
                  <TrendIcon className="w-4 h-4 mr-1" />
                  {stat.change}
                </p>
                <span className="text-xs text-gray-400 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {stat.lastUpdate}
                </span>
              </div>

              {/* View details link */}
              <div className="mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => navigate(stat.link)}
                  className="text-sm text-blue-600 font-medium flex items-center hover:text-blue-700 transition-colors"
                >
                  View details
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
