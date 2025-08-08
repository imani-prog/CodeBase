import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  MapPin, 
  Cloud, 
  Phone, 
  CheckCircle, 
  Users, 
  Headphones, 
  BookOpen,
  ArrowRight,
  Star,
  Zap,
  Globe
} from 'lucide-react';

const CTA = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate features every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const securityFeatures = [
    {
      id: 0,
      icon: MapPin,
      emoji: '',
      title: 'Kenya MoH & NHIF Compliant',
      description: 'Fully certified and compliant with Kenyan healthcare regulations',
      highlight: 'Ministry Approved'
    },
    {
      id: 1,
      icon: Shield,
      emoji: '',
      title: 'End-to-End Encryption',
      description: 'Bank-level security with advanced data protection protocols',
      highlight: 'ISO 27001 Certified'
    },
    {
      id: 2,
      icon: Cloud,
      emoji: '',
      title: 'Flexible Deployment',
      description: 'Choose between secure cloud hosting or on-premise installation',
      highlight: '99.9% Uptime'
    }
  ];

  const supportFeatures = [
    {
      icon: Users,
      text: 'Onboarding Support',
      description: 'Complete setup assistance'
    },
    {
      icon: BookOpen,
      text: 'Staff Training',
      description: 'Comprehensive team education'
    },
    {
      icon: Headphones,
      text: '24/7 Technical Support',
      description: 'Round-the-clock assistance'
    }
  ];

  const handleCTAClick = (action) => {
    console.log(`CTA clicked: ${action}`);
    // In a real app, this would handle navigation
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-4 lg:p-6 space-y-6 sm:space-y-8">
      {/* Security Features Section */}
      <div className={`relative p-4 sm:p-6 lg:p-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center font-serif text-blue-600">Built for Africa, Backed by Security</h3>
            </div>
            <p className="text-sm sm:text-base lg:text-lg">Trusted by healthcare providers across Kenya</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              const isActive = activeFeature === index;
              
              return (
                <div
                  key={feature.id}
                  className={`relative group cursor-pointer transition-all duration-500 ${
                    isActive ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className={`bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border-2 transition-all duration-500 ${
                    isActive 
                      ? 'border-blue-400 shadow-2xl bg-gradient-to-br from-white to-blue-50' 
                      : 'border-blue-100 shadow-lg hover:border-blue-300 hover:shadow-xl'
                  }`}>
                    {/* Feature highlight badge */}
                    {isActive && (
                      <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                        {feature.highlight}
                      </div>
                    )}
                    
                    <div className="text-center">
                      <div className="relative mb-3 sm:mb-4">
                        <div className={`text-3xl sm:text-4xl lg:text-5xl mb-2 transition-transform duration-500 ${
                          isActive ? 'scale-110' : 'group-hover:scale-105'
                        }`}>
                          {feature.emoji}
                        </div>
                        <div className={`absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 transition-all duration-500 ${
                          isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                        }`}>
                          <div className="bg-blue-500 rounded-full p-1">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <h4 className={`font-bold font-serif mb-2 transition-colors duration-300 text-sm sm:text-base ${
                        isActive ? 'text-blue-700 lg:text-lg' : 'text-gray-800'
                      }`}>
                        {feature.title}
                      </h4>
                      
                      <p className={`text-xs sm:text-sm leading-relaxed transition-all duration-300 ${
                        isActive ? 'text-blue-600 opacity-100' : 'text-gray-600 opacity-80'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center space-x-2 mt-4 sm:mt-6">
            {securityFeatures.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  activeFeature === index 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-blue-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main CTA Section */}
      <div className={`p-4 sm:p-6 lg:p-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Animated background elements */}
        <div className="absolute top-0 left-1/4 w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-xl animate-pulse delay-1000" />
        
        <div className="relative z-10 text-center">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3 sm:mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2 sm:p-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-blue-600 text-center">
                Ready to Transform Your Hospital?
              </h3>
            </div>
            
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed">
              Whether you're a rural clinic or a major hospital, MediLink offers a customizable platform to 
              <span className="font-semibold text-blue-700"> digitize your operations</span> and 
              <span className="font-semibold text-blue-700"> serve more patients efficiently</span>.
            </p>
          </div>

          {/* Support Features */}
          <div className="mb-6 sm:mb-8">
            <h4 className="text-lg sm:text-xl font-bold font-serif text-gray-800 mb-4 sm:mb-6 flex items-center justify-center space-x-2">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              <span>What You Get</span>
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {supportFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={index}
                    className="group bg-white/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                      <div className="bg-blue-100 group-hover:bg-blue-200 rounded-full p-1.5 sm:p-2 transition-colors duration-300">
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold font-serif text-blue-800 text-xs sm:text-sm">{feature.text}</p>
                        <p className="text-xs text-gray-600">{feature.description}</p>
                      </div>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={() => handleCTAClick('contact')}
                className="group relative bg-blue-600 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center space-x-2">
                  <span className="text-sm sm:text-base">Contact Us to Get Started</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
              
              <button
                onClick={() => handleCTAClick('demo')}
                className="group relative bg-blue-600 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center space-x-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Request a Demo</span>
                </div>
              </button>
            </div>
            
            <button
              onClick={() => handleCTAClick('success-stories')}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 text-blue-800 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 font-semibold border border-blue-200 hover:border-blue-300"
            >
              <div className="flex items-center justify-center space-x-2">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span className="text-sm sm:text-base text-white">See Hospital Success Stories</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2 bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-3 py-2">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                  <span className="text-black font-medium">Secure & Compliant</span>
                </div>

                <div className="flex items-center gap-2 bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-3 py-2">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                  <span className="text-black font-medium">50+ Hospitals Trust Us</span>
                </div>

                <div className="flex items-center gap-2 bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-3 py-2">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                  <span className="text-black font-medium">5-Star Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CTA;