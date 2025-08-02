/* eslint-disable no-unused-vars */
import {
    ArrowRight,
    CheckCircle,
    Cloud,
    Code,
    Database,
    Eye,
    Gauge,
    Globe,
    Layers,
    Lock,
    Monitor,
    Puzzle,
    Rocket,
    Server,
    Shield,
    Smartphone,
    Wifi,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

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
    { 
      icon: "", 
      text: "Insurance systems (NHIF, SHA)", 
      color: "bg-blue-100",
    },
    { 
      icon: "", 
      text: "Health information exchanges", 
      color: "bg-blue-100",
    },
    { 
      icon: "", 
      text: "Partner clinics, hospitals, and NGOs", 
      color: "bg-blue-100",
    },
    { 
      icon: "", 
      text: "Mobile and USSD support for rural outreach", 
      color: "bg-blue-100",
    }
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
      <div className="space-y-12">
        {/* Performance & Scalability Section */}
        <div className={`grid grid-cols-2 gap-20 mb-25 transition-all duration-1000 delay-200 ${animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
         
          
          {/* Content Card */}
          <div className="p-8 h-[400px]">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-3 mr-4">
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
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white/60 text-gray-600 hover:bg-blue-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-2">
              {(activeTab === 'performance' ? performanceFeatures.slice(0, 8) : 
                performanceFeatures.filter(f => f.category.toLowerCase() === activeTab).slice(0, 8))
                .map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    <IconComponent className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

           {/* Image Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-blue-200/50 overflow-hidden h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&h=500&fit=crop" 
              alt="Technology Background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Security & Compliance Section */}
        <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-400 ${animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>


           {/* Image Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-blue-200/50 overflow-hidden h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&h=500&fit=crop" 
              alt="Security Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Card */}
          <div className="p-8 h-[400px]">
            <div className="flex items-center mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-3 mr-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Security & Compliance</h2>
                <p className="text-gray-600">Bank-level security standards</p>
              </div>
            </div>

            <div className="space-y-3">
              {securityFeatures.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Security Badge */}
            <div className="mt-6 p-3 bg-gradient-to-r from-blue-600/10 to-blue-400/10 rounded-xl border border-blue-200">
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 text-blue-700 font-semibold">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">ISO 27001 & HIPAA Ready</span>
                </div>
              </div>
            </div>
          </div>
          
         
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-8">
        {/* Integrations Section */}
        <section className={`relative  p-8 overflow-hidden transition-all duration-1000 delay-600 ${animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-200/20 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400  rounded-xl p-3 mr-4">
                <Puzzle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-blue-800">Integrations & Extensibility</h2>
                <p className="">Connect with existing systems</p>
              </div>
            </div>
            
            {/* Horizontal Integration Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {integrations.map((item, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] p-6 text-center">
                  <p className="text-gray-700 font-medium text-base leading-relaxed group-hover:text-gray-900 transition-colors duration-300 mb-3">
                    {item.text}
                  </p>
                  <div className="flex items-center justify-center text-blue-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    <span className="text-sm font-semibold">Integration Ready</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Integration Stats */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="text-center p-4 bg-white/60 rounded-xl border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">API Endpoints</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-xl border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime SLA</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Built for Impact Section */}
        <section className={`relative  p-8 overflow-hidden transition-all duration-1000 delay-800 ${animationTrigger ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-200/20 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-3 mr-4">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-blue-800">Built for Impact</h2>
                <p className="">Innovation meets reliability</p>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
                Our tech team is committed to continuous improvement, innovation, and reliability. We welcome 
                <span className="font-semibold text-blue-700"> feedback and collaboration</span> from partners, 
                developers, and users to make MediLink even better.
              </p>
              
              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-xs text-gray-600">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">100+</div>
                  <div className="text-xs text-gray-600">Features</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5min</div>
                  <div className="text-xs text-gray-600">Setup</div>
                </div>
              </div>
              
              <div className="text-center">
                <button className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
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
          background: #e0e7ff;
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