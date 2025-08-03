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
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Hospital Management Stack
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Comprehensive healthcare solutions designed for modern medical facilities
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid - Separated Image and Text Cards */}
      <div className="space-y-12 mb-10">
        {filteredServices.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.id}
              className="group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Image Card */}
                <div 
                  className={`relative bg-white backdrop-blur-lg rounded-2xl overflow-hidden border border-blue-100 cursor-pointer ${
                    service.id % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                  style={{
                    boxShadow: service.id % 2 === 1 
                      ? `-8px 8px 0px rgba(59, 130, 246, 0.3), -16px 16px 0px rgba(59, 130, 246, 0.2), -24px 24px 0px rgba(59, 130, 246, 0.1), -32px 32px 20px rgba(0, 0, 0, 0.1)`
                      : `8px 8px 0px rgba(59, 130, 246, 0.3), 16px 16px 0px rgba(59, 130, 246, 0.2), 24px 24px 0px rgba(59, 130, 246, 0.1), 32px 32px 20px rgba(0, 0, 0, 0.1)`
                  }}
                >
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-all duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">{service.category}</span>
                    </div>
                  </div>
                </div>

                {/* Text Card */}
                <div 
                  className={`p-8 ${
                    service.id % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3">
                      <h5 className="text-lg font-semibold text-gray-700">Key Features:</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium">
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