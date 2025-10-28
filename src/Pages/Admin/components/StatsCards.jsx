import React, { useState } from 'react';
import { Users, UserCheck, AlertCircle, DollarSign, TrendingUp, TrendingDown, Clock, ArrowUpRight, ChevronRight, Wallet, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatsCards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Active Patients',
      value: '1,245',
      change: '+12%',
      icon: Users,
      iconColor: 'text-blue-600',
      trendColor: 'text-green-600',
      isPositive: true,
      link: '/admin/active-patients'
    },
    {
      title: 'Active CHWs',
      value: '87',
      change: '+5%',
      icon: UserCheck,
      iconColor: 'text-blue-600',
      trendColor: 'text-green-600',
      isPositive: true,
      link: '/admin/active-chw'
    },
    {
      title: 'Pending Approvals',
      value: '12',
      change: '3 urgent',
      icon: AlertCircle,
      iconColor: 'text-blue-600',
      trendColor: 'text-yellow-600',
      isPositive: false,
      link: '/admin/approve-requests'
    },
    {
      title: 'Total Revenue',
      value: 'Ksh 458,200',
      change: '+18%',
      icon: DollarSign,
      iconColor: 'text-blue-600',
      trendColor: 'text-green-600',
      isPositive: true,
      link: '/admin/financial-management'
    },
    {
      title: 'Total Expenses',
      value: 'Ksh 280,500',
      change: '+8%',
      icon: CreditCard,
      iconColor: 'text-blue-600',
      trendColor: 'text-red-600',
      isPositive: false,
      link: '/admin/financial-management'
    },
    {
      title: 'Net Income',
      value: 'Ksh 168,700',
      change: '+24%',
      icon: Wallet,
      iconColor: 'text-blue-600',
      trendColor: 'text-green-600',
      isPositive: true,
      link: '/admin/financial-management'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const TrendIcon = stat.isPositive ? TrendingUp : TrendingDown;
        
        return (
          <div 
            key={index} 
            className={`bg-white shadow-sm p-4 border border-gray-100 cursor-pointer 
              transition-all duration-300 hover:shadow-lg hover:-translate-y-1 
              ${hoveredCard === index ? 'border-blue-300 shadow-blue-100' : ''}
              relative overflow-hidden group`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate(stat.link)}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Icon and arrow */}
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${stat.iconBg} rounded-lg flex items-center justify-center 
                  transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Title */}
              <p className="text-xs font-medium text-gray-600 mb-1">{stat.title}</p>

              {/* Value */}
              <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>

              {/* Trend */}
              <div className="flex items-center">
                <TrendIcon className={`w-3 h-3 mr-1 ${stat.trendColor}`} />
                <p className={`text-xs font-medium ${stat.trendColor}`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
