/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Shield, 
  Puzzle, 
  Rocket, 
  Server, 
  Database, 
  Cloud, 
  Smartphone, 
  Globe, 
  Lock, 
  Wifi, 
  Layers,
  CheckCircle,
  ArrowRight,
  Code,
  Monitor,
  Gauge,
  Eye
} from 'lucide-react';

const TechnicalFeatures = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const [visibleSection, setVisibleSection] = useState('');
  const [animationTrigger, setAnimationTrigger] = useState(false);

  useEffect(() => {
    setAnimationTrigger(true);
  }, []);

  const performanceFeatures = [
    { icon: Code, text: "Java Spring Boot backend for reliability and speed", category: "Backend" },
    { icon: Database, text: "PostgreSQL / MySQL databases for robust data management", category: "Database" },
    { icon: Gauge, text: "Redis caching for high-speed data access", category: "Performance" },
    { icon: Cloud, text: "Cloud-based infrastructure for high availability and scalability", category: "Infrastructure" },
    { icon: Smartphone, text: "Progressive Web App (PWA) for seamless experience on any device", category: "Frontend" },
    { icon: Lock, text: "Secure authentication and role-based access for patients, CHWs, and clinics", category: "Security" },
    { icon: Shield, text: "End-to-end encryption for all health records and communications", category: "Security" },
    { icon: Globe, text: "Real-time notifications and updates", category: "Real-time" },
    { icon: Monitor, text: "Integration with payment gateways (M-Pesa, Stripe, Flutterwave)", category: "Payments" },
    { icon: Puzzle, text: "APIs for partner and third-party integrations", category: "Integration" },
    { icon: Wifi, text: "Offline support for rural and low-connectivity areas", category: "Connectivity" },
    { icon: Server, text: "Hosted on scalable platforms (AWS, Railway, Azure) for global reach", category: "Infrastructure" },
    { icon: Layers, text: "Modular microservices architecture enables rapid feature development", category: "Architecture" },
    { icon: Eye, text: "CHW and Patient portals feature unique UIs tailored to their workflows", category: "UX/UI" }
  ];

  const securityFeatures = [
    "GDPR & Kenya Data Protection Act 2019 compliant",
    "Regular security audits and vulnerability assessments",
    "Data stored in secure, encrypted cloud environments",
    "Strict access controls and monitoring"
  ];

  const integrations = [
    { icon: "", text: "Insurance systems (NHIF, SHA)", color: "bg-blue-100" },
    { icon: "", text: "Health information exchanges", color: "bg-green-100" },
    { icon: "", text: "Partner clinics, hospitals, and NGOs", color: "bg-purple-100" },
    { icon: "", text: "Mobile and USSD support for rural outreach", color: "bg-orange-100" }
  ];

  const categories = [...new Set(performanceFeatures.map(f => f.category))];

  const filteredFeatures = activeTab === 'performance' 
    ? performanceFeatures 
    : performanceFeatures.filter(f => f.category.toLowerCase().includes(activeTab));

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className={`text-center transition-all duration-1000 ${animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
          Technical Excellence
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Built with cutting-edge technology to deliver secure, scalable, and reliable healthcare solutions
        </p>
      </div>

      {/* Main Technical Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance & Scalability Section */}
        <section className={`relative bg-gradient-to-br from-white via-blue-50/50 to-purple-50/30 rounded-3xl shadow-2xl border border-blue-200/50 p-8 overflow-hidden transition-all duration-1000 delay-200 ${animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Background Tech Image */}
          <div className="absolute top-0 right-0 w-48 h-48 opacity-10 overflow-hidden rounded-3xl">
            <img 
              src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=500&fit=crop" 
              alt="Technology Background"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl" />
          <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-lg" />
          
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-3 mr-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Performance & Scalability</h2>
                <p className="text-gray-600">Enterprise-grade architecture</p>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveTab('performance')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === 'performance'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/60 text-gray-600 hover:bg-blue-100'
                }`}
              >
                All Features
              </button>
              {categories.slice(0, 3).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category.toLowerCase())}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                    activeTab === category.toLowerCase()
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white/60 text-gray-600 hover:bg-purple-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {(activeTab === 'performance' ? performanceFeatures : 
                performanceFeatures.filter(f => f.category.toLowerCase() === activeTab))
                .map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={index}
                    className="group bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-blue-100/50 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-2 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                          {feature.text}
                        </span>
                        <div className="mt-1">
                          <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-xs font-semibold">
                            {feature.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Security & Compliance Section */}
        <section className={`relative bg-gradient-to-br from-white via-green-50/50 to-blue-50/30 rounded-3xl shadow-2xl border border-green-200/50 p-8 overflow-hidden transition-all duration-1000 delay-400 ${animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Background Security Image */}
          <div className="absolute top-0 right-0 w-48 h-48 opacity-10 overflow-hidden rounded-3xl">
            <img 
              src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&h=500&fit=crop" 
              alt="Security Background"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl" />
          <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-lg" />
          
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-3 mr-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Security & Compliance</h2>
                <p className="text-gray-600">Bank-level security standards</p>
              </div>
            </div>

            <div className="space-y-6">
              {securityFeatures.map((item, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-green-100/50 hover:border-green-300 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-700 leading-relaxed font-medium group-hover:text-gray-900 transition-colors duration-300">
                        {item}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Security Badge */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-xl border border-green-200">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 text-green-700 font-semibold">
                  <Lock className="w-5 h-5" />
                  <span>ISO 27001 & HIPAA Ready</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Integrations Section */}
        <section className={`relative bg-gradient-to-br from-white via-purple-50/50 to-pink-50/30 rounded-3xl shadow-2xl border border-purple-200/50 p-8 overflow-hidden transition-all duration-1000 delay-600 ${animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-3 mr-4">
                <Puzzle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Integrations & Extensibility</h2>
                <p className="text-gray-600">Connect with existing systems</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrations.map((item, index) => (
                <div key={index} className={`group ${item.color} hover:scale-105 rounded-2xl p-6 border border-white/50 text-center transition-all duration-300 hover:shadow-lg cursor-pointer`}>
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <p className="text-gray-700 font-medium text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Integration Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/60 rounded-xl border border-purple-100">
                <div className="text-2xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-gray-600">API Endpoints</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-xl border border-purple-100">
                <div className="text-2xl font-bold text-purple-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime SLA</div>
              </div>
            </div>
          </div>
        </section>

        {/* Built for Impact Section */}
        <section className={`relative bg-gradient-to-br from-white via-cyan-50/50 to-blue-50/30 rounded-3xl shadow-2xl border border-cyan-200/50 p-8 overflow-hidden transition-all duration-1000 delay-800 ${animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl" />
          
          <div className="relative z-10 flex flex-col justify-center h-full">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-3 mr-4">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Built for Impact</h2>
                <p className="text-gray-600">Innovation meets reliability</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-cyan-100/50 hover:shadow-xl transition-all duration-300">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our tech team is committed to continuous improvement, innovation, and reliability. We welcome 
                <span className="font-semibold text-cyan-700"> feedback and collaboration</span> from partners, 
                developers, and users to make MediLink even better.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">24/7</div>
                  <div className="text-xs text-gray-600">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">100+</div>
                  <div className="text-xs text-gray-600">Features</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-600">5min</div>
                  <div className="text-xs text-gray-600">Setup</div>
                </div>
              </div>

              <div className="text-center">
                <button className="group inline-flex items-center bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <span>Partner With Us</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default TechnicalFeatures;