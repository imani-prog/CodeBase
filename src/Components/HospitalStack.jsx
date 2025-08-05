import React, { useState, useMemo } from 'react';
import { Search, Filter, Heart, Users, Calendar, Pill, Receipt, Ambulance, UserCheck } from 'lucide-react';

const HospitalStack = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const hospitalServices = useMemo(() => [
    {
      id: 1,
      title: 'Electronic Health Records (EHR)',
      description: 'Digitize patient records, history, prescriptions, lab results. Access across departments with role-based permissions. NHIF-ready reporting.',
      image: 'https://www.xevensolutions.com/wp-content/uploads/2024/09/Top-6-Must-Have-Features-of-Electronic-Health-Records-EHR-Systems.jpg',
      icon: Heart,
      category: 'records',
      features: ['Digital Records', 'Cross-Department Access', 'NHIF Integration', 'Role-Based Security']
    },
    {
      id: 2,
      title: 'Appointment & Referral System',
      description: 'Automate patient bookings, manage referrals between facilities, SMS/Email reminders for patients.',
      image: 'https://www.bigscal.com/wp-content/uploads/2023/12/Patient-Referral-Management-Software.webp',
      icon: Calendar,
      category: 'scheduling',
      features: ['Automated Bookings', 'Referral Management', 'SMS/Email Alerts', 'Multi-Facility Support']
    },
    {
      id: 3,
      title: 'Inventory & Pharmacy Management',
      description: 'Track medicine stock levels, auto-generate low-stock alerts, reduce expiry loss with batch tracking.',
      image: 'https://cdn-lipbd.nitrocdn.com/NmtxoNywbwrhgCusRjwzXqAEjXRnHzOa/assets/images/optimized/rev-914be96/www.osplabs.com/wp-content/uploads/2022/01/How-Pharmacy-Inventory-Management-is-Efficient-Through-Technology.jpg',
      icon: Pill,
      category: 'inventory',
      features: ['Stock Tracking', 'Low-Stock Alerts', 'Batch Management', 'Expiry Prevention']
    },
    {
      id: 4,
      title: 'Billing & Finance Dashboard',
      description: 'Patient billing + NHIF claim exports, insurance integration (NHIF, SHA, private), track income, expenses, and profits.',
      image: 'https://cdn-lipbd.nitrocdn.com/NmtxoNywbwrhgCusRjwzXqAEjXRnHzOa/assets/images/optimized/rev-914be96/www.osplabs.com/wp-content/uploads/2022/10/Payment-Wallet-Dashboard-1-1024x576.jpg',
      icon: Receipt,
      category: 'finance',
      features: ['Patient Billing', 'Insurance Integration', 'Financial Tracking', 'Profit Analysis']
    },
    {
      id: 5,
      title: 'Ambulance Dispatch Console',
      description: 'CHW or emergency team dispatch tracking, live location + routing support, Red Cross and County Ambulance coordination module.',
      image: 'https://www.southwestsolutions.com/wp-content/uploads/2022/07/dispatch-control-center.jpg',
      icon: Ambulance,
      category: 'emergency',
      features: ['Live Tracking', 'Route Optimization', 'Emergency Dispatch', 'Multi-Agency Coordination']
    },
    {
      id: 6,
      title: 'Staff & Payroll Management',
      description: 'Schedule shifts, track attendance, handle salaries and CHW incentives, performance reports and KPIs.',
      image: 'https://ristsys.com/wp-content/uploads/2018/09/hr-chart.jpg',
      icon: UserCheck,
      category: 'management',
      features: ['Shift Scheduling', 'Attendance Tracking', 'Payroll Processing', 'Performance KPIs']
    }
  ], []);

  // Filter services based on search and category
  const filteredServices = useMemo(() => {
    return hospitalServices.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [hospitalServices, searchTerm, selectedCategory]);

  const categories = [
    { value: 'all', label: 'All Services', icon: Users },
    { value: 'records', label: 'Records', icon: Heart },
    { value: 'scheduling', label: 'Scheduling', icon: Calendar },
    { value: 'inventory', label: 'Inventory', icon: Pill },
    { value: 'finance', label: 'Finance', icon: Receipt },
    { value: 'emergency', label: 'Emergency', icon: Ambulance },
    { value: 'management', label: 'Management', icon: UserCheck }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-8 lg:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-800 mb-3 sm:mb-4">
          Hospital Technology Stack
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Comprehensive digital solutions designed for modern healthcare facilities, 
          enhancing patient care and operational efficiency.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">{category.label.length > 8 ? category.label.slice(0, 8) + '...' : category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid - Separated Image and Text Cards */}
      <div className="space-y-8 sm:space-y-10 lg:space-y-12 mb-6 sm:mb-8 lg:mb-10">
        {filteredServices.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.id}
              className="group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
                {/* Image Card */}
                <div 
                  className={`relative bg-white backdrop-blur-lg rounded-2xl overflow-hidden border border-blue-100 cursor-pointer ${
                    service.id % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                  style={{
                    boxShadow: service.id % 2 === 1 
                      ? `-4px 4px 0px rgba(59, 130, 246, 0.3), -8px 8px 0px rgba(59, 130, 246, 0.2), -12px 12px 0px rgba(59, 130, 246, 0.1), -16px 16px 20px rgba(0, 0, 0, 0.1)`
                      : `4px 4px 0px rgba(59, 130, 246, 0.3), 8px 8px 0px rgba(59, 130, 246, 0.2), 12px 12px 0px rgba(59, 130, 246, 0.1), 16px 16px 20px rgba(0, 0, 0, 0.1)`
                  }}
                >
                  <div className="relative h-48 sm:h-56 md:h-64 lg:h-80 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-all duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600" />
                    </div>
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1">
                      <span className="text-xs sm:text-sm font-medium text-gray-700 capitalize">{service.category}</span>
                    </div>
                  </div>
                </div>

                {/* Text Card */}
                <div 
                  className={`p-4 sm:p-6 lg:p-8 ${
                    service.id % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-3 sm:mb-4">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 sm:space-y-3">
                      <h5 className="text-base sm:text-lg font-semibold text-gray-700">Key Features:</h5>
                      <div className="grid grid-cols-1 gap-2 sm:gap-3">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-start text-xs sm:text-sm text-gray-600">
                            <span className="text-blue-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-1">✓</span>
                            <span className="leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      <button className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results State */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No services found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

     
    </div>
  );
};

export default HospitalStack;