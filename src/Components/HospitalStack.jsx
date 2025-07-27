import React, { useState, useMemo } from 'react';
import { Search, Filter, Heart, Users, Calendar, Pill, Receipt, Ambulance, UserCheck } from 'lucide-react';

const HospitalStack = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const hospitalServices = useMemo(() => [
    {
      id: 1,
      title: 'Electronic Health Records (EHR)',
      description: 'Digitize patient records, history, prescriptions, lab results. Access across departments with role-based permissions. NHIF-ready reporting.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrX7JVgPZ-MlGk07WTM_XLOAq5ztEnuog41Q&s',
      icon: Heart,
      category: 'records',
      features: ['Digital Records', 'Cross-Department Access', 'NHIF Integration', 'Role-Based Security']
    },
    {
      id: 2,
      title: 'Appointment & Referral System',
      description: 'Automate patient bookings, manage referrals between facilities, SMS/Email reminders for patients.',
      image: 'https://www.consultancy.eu/illustrations/news/detail/2024-11-25-010004496-Nine_technologies_revolutionizing_the_global_healthcare_industry.jpg',
      icon: Calendar,
      category: 'scheduling',
      features: ['Automated Bookings', 'Referral Management', 'SMS/Email Alerts', 'Multi-Facility Support']
    },
    {
      id: 3,
      title: 'Inventory & Pharmacy Management',
      description: 'Track medicine stock levels, auto-generate low-stock alerts, reduce expiry loss with batch tracking.',
      image: 'https://www.consultancy.eu/illustrations/news/detail/2024-11-25-010004496-Nine_technologies_revolutionizing_the_global_healthcare_industry.jpg',
      icon: Pill,
      category: 'inventory',
      features: ['Stock Tracking', 'Low-Stock Alerts', 'Batch Management', 'Expiry Prevention']
    },
    {
      id: 4,
      title: 'Billing & Finance Dashboard',
      description: 'Patient billing + NHIF claim exports, insurance integration (NHIF, SHA, private), track income, expenses, and profits.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrX7JVgPZ-MlGk07WTM_XLOAq5ztEnuog41Q&s',
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
      image: 'https://www.consultancy.eu/illustrations/news/detail/2024-11-25-010004496-Nine_technologies_revolutionizing_the_global_healthcare_industry.jpg',
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredServices.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.id}
              className={`group relative bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg border border-blue-100 transition-all duration-500 hover:shadow-2xl hover:scale-105 cursor-pointer ${
                hoveredCard === service.id ? 'ring-2 ring-blue-400' : ''
              }`}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h5>
                  <div className="grid grid-cols-2 gap-1">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover Action */}
                <div className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-300 ${
                  hoveredCard === service.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    Learn More
                  </button>
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