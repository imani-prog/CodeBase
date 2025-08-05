/* eslint-disable no-unused-vars */
import { ArrowRight, Bookmark, Calendar, Clock, Eye, Filter, Heart, Search, Share2, Star, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import Discussions from '../../Components/Discussions';
import TrendingTopics from '../../Components/TrendingTopics';
import FeaturedPosts from "../../Components/FeaturedPosts";
import LatestHealthInsights from "../../Components/LatestHealthInsights.jsx";


export const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    
    const categories = [
    { id: 'all', name: 'All Posts', color: 'bg-gradient-to-r from-indigo-500 to-blue-600', count: 24 },
    { id: 'digital-health', name: 'Digital Health', color: 'bg-gradient-to-r from-indigo-500 to-blue-600', count: 8 },
    { id: 'community-care', name: 'Community Care', color: 'bg-gradient-to-r from-indigo-500 to-blue-600', count: 6 },
    { id: 'maternal-health', name: 'Maternal Health', color: 'bg-gradient-to-r from-indigo-500 to-blue-600', count: 5 },
    { id: 'telehealth', name: 'Telehealth', color: 'bg-gradient-to-r from-indigo-500 to-blue-600', count: 5 }
  ];

  const healthUpdates = [
    {
      id: 9,
      title: "WHO Approves New Malaria Prevention Protocol",
      summary: "Revolutionary bed net technology shows 78% reduction in transmission rates during Kenya trials. The new protocol, developed in partnership with local health authorities, leverages smart materials and digital monitoring to ensure maximum protection for vulnerable populations. Early results from pilot programs in rural Kenya indicate a significant decrease in malaria-related hospitalizations and improved community health outcomes.",
      date: "2 hours ago",
      urgent: true,
      source: "WHO Kenya"
    },
    {
      id: 10,
      title: "Ministry of Health Launches Universal Health Coverage Phase 3",
      summary: "Digital health ID cards now available in 25 additional counties with full MediLink integration. This phase expands access to essential healthcare services, enabling seamless patient identification and record management across public and private facilities. The initiative aims to improve efficiency, reduce fraud, and empower citizens with secure, portable health data for better care coordination.",
      date: "6 hours ago",
      urgent: false,
      source: "MOH Kenya"
    }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        {/* Hero Section */}
        <div className="relative overflow-hidden p-6 md:p-12 mb-2">
          <div className="relative z-10 max-w-4xl">
              <div className="flex items-center mb-6">
              
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-2">
                  Health Insights
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-3">Empowering Communities Through Digital Healthcare Innovation</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur rounded-full px-3 sm:px-6 py-2 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-xs sm:text-sm text-blue-700">50,000+ CHWs Connected</span>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-full px-3 sm:px-6 py-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="text-xs sm:text-sm text-blue-700">2M+ Patients Served</span>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-full px-3 sm:px-6 py-2 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                <span className="text-xs sm:text-sm text-blue-700">95% Satisfaction Rate</span>
              </div>
            </div>

          </div>
        </div>

        {/* Health Updates Ticker */}
          <div className="mb-12">
          <div className="p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <div className="bg-white rounded-full p-2 mr-3">
                <TrendingUp className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-blue-900">Breaking Health Updates</h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              {healthUpdates.slice(0, 2).map((update) => (
                <div key={update.id} className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm sm:text-base text-blue-800 leading-tight">{update.title}</h4>
                      {update.urgent && (
                        <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold ml-2 flex-shrink-0">
                          URGENT
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm mb-2">{update.summary}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs mt-4">
                    <span className="font-medium text-gray-500">{update.source}</span>
                    <span className="font-medium text-gray-500">{update.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative overflow-hidden rounded-full px-4 sm:px-6 py-2 sm:py-3 font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-2xl`
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg border border-gray-200'
                }`}
              >
                <span className="relative z-10 flex items-center">
                  {category.name}
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
              </button>
            ))}
          </div>
        </div>

        <FeaturedPosts categories={categories} />
      
                <LatestHealthInsights />

          {/* Health Updates Sidebar */}
              <section className="mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-blue-900">
                  Health Updates & Alerts
                </h2>
                <Discussions />
              </section>
        </main>

        {/* Full-width Newsletter & Community Section */}
        <section className="bg-blue-950 w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
            {/* Newsletter & Community Section */}
            <section className="mb-16">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                        
                        <div className="relative z-10">
                        <div className="flex items-center mb-6">
                          <div className="p-3 mr-4">
                            <Heart className="w-6 text-white h-6" />
                          </div>
                            <div>
                                <h3 className="text-2xl sm:text-3xl text-white font-bold">Stay Informed</h3>
                                <p className="text-white">Weekly health insights & updates</p>
                              </div>
                        </div>
                        <p className="mb-6 text-white leading-relaxed">
                          Get the latest healthcare innovations, research findings, and community health stories delivered to your inbox every week.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-4 py-3 rounded-xl bg-white border focus:outline-none focus:ring-2 focus:ring-white/50"
                          />
                          <button className="px-6 py-3 bg-white text-blue-400 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Subscribe
                          </button>
                        </div>
                        <div className="flex items-center mt-6 lg:mt-10 text-sm text-blue-200">
                          <div className="flex -space-x-2 mr-3">
                            {[1,2,3,4].map(i => (
                              <div key={i} className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white"></div>
                            ))}
                          </div>
                          <span className="font-semibold text-white text-sm sm:text-base lg:text-xl">Join 12,000+ healthcare professionals</span>
                        </div>
                      </div>

                    {/* Community Stats  */}
                    <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-lg">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <Users className="w-5 h-5 mr-2 text-blue-600" />
                        Community Impact
                      </h3>
                      <div className="grid grid-cols-2 lg:flex lg:flex-row lg:justify-between items-center gap-4">
                        {[ 
                          { label: "Active CHWs", value: "50,234", change: "+12%", color: "text-blue-600" },
                          { label: "Patients Served", value: "2.1M", change: "+28%", color: "text-blue-600" },
                          { label: "Health Articles", value: "1,456", change: "+15%", color: "text-blue-600" },
                          { label: "Communities", value: "847", change: "+8%", color: "text-blue-600" }
                        ].map((stat, index) => (
                          <div key={index} className="flex flex-col items-center px-2">
                            <div className={`text-base sm:text-lg font-bold ${stat.color} mb-0.5`}>
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-600 mb-0.5 text-center">{stat.label}</div>
                            <div className={`text-xs font-semibold ${stat.color} bg-opacity-10 px-1.5 py-0.5 rounded-full inline-block`}>
                              {stat.change} this month
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm">Join Our Community</h4>
                            <p className="text-xs text-gray-600">Connect with healthcare professionals</p>
                          </div>
                          <button className="px-3 py-1 bg-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-xs">
                            Join Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <TrendingTopics />

                {/* Call to Action */}
                <section className="text-center py-12 sm:py-16 shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl text-blue-200 font-black mb-4 bg-clip-text">
                      Transform Healthcare Together
                    </h3>
                    <p className="text-lg sm:text-xl mb-8 leading-relaxed text-blue-100">
                      Join thousands of healthcare professionals using MediLink to improve patient outcomes, streamline workflows, and build stronger communities.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                        Start Your Journey
                      </button>
                      <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                        Learn More
                      </button>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-8 text-blue-200">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 mr-2 text-yellow-300" />
                        <span>4.9/5 Rating</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        <span>50K+ Users</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 mr-2 text-red-300" />
                        <span>2M+ Lives Impacted</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </section>

        <main className="max-w-7xl mx-auto px-4 md:px-6">              
        </main>
    </div>
  );
};
export default Blog;
