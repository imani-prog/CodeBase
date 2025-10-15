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
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50 overflow-x-hidden">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 w-full">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-6 sm:py-8 md:py-12 mb-4 sm:mb-6">
          <div className="relative z-10 max-w-4xl">
              <div className="flex items-center mb-4 sm:mb-6">
              
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-900 mb-2 font-serif leading-tight">
                  Health Insights
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-3 text-gray-700">Empowering Communities Through Digital Healthcare Innovation</p>
              </div>
            </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8">
                  <div className="bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-3 sm:px-4 md:px-6 py-2 flex items-center">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-black flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-black font-bold whitespace-nowrap">
                      50,000+ CHWs Connected
                    </span>
                  </div>

                  <div className="bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-3 sm:px-4 md:px-6 py-2 flex items-center">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-black flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-black font-bold whitespace-nowrap">
                      2M+ Patients Served
                    </span>
                  </div>

                  <div className="bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-3 sm:px-4 md:px-6 py-2 flex items-center">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-black flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-black font-bold whitespace-nowrap">
                      95% Satisfaction Rate
                    </span>
                  </div>
                </div>


          </div>
        </div>

        {/* Health Updates Ticker */}
          <div className="mb-8 sm:mb-12">
          <div className="py-3 sm:py-4 md:py-6">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="bg-white rounded-full p-1.5 sm:p-2 mr-2 sm:mr-3">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 font-serif">Breaking Health Updates</h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6">
              {healthUpdates.slice(0, 2).map((update) => (
                <div key={update.id} className="flex-1 bg-white rounded-xl shadow-lg p-3 sm:p-4 md:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h4 className="font-semibold text-sm sm:text-base text-blue-800 leading-tight flex-1">{update.title}</h4>
                      {update.urgent && (
                        <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold flex-shrink-0 whitespace-nowrap">
                          URGENT
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm mb-2 text-gray-600 leading-relaxed">{update.summary}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs mt-3 sm:mt-4 gap-1 sm:gap-0">
                    <span className="font-medium text-gray-500">{update.source}</span>
                    <span className="font-medium text-gray-500">{update.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative overflow-hidden rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 font-semibold transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-2xl`
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg border border-gray-200'
                }`}
              >
                <span className="relative z-10 flex items-center whitespace-nowrap">
                  {category.name}
                  <span className={`ml-1.5 sm:ml-2 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
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
              <section className="mb-12 sm:mb-16">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-blue-900 font-serif">
                  Health Updates & Alerts
                </h2>
                <Discussions />
              </section>
        </main>

        {/* Full-width Newsletter & Community Section */}
        <section className="bg-blue-950 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
            {/* Newsletter & Community Section */}
            <section className="mb-12 sm:mb-16">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                        
                        <div className="relative z-10">
                        <div className="flex items-start sm:items-center mb-4 sm:mb-6">
                          <div className="p-2 sm:p-3 mr-3 sm:mr-4">
                            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-serif text-yellow-300">Stay Informed</h3>
                                <p className="text-white font-bold text-sm sm:text-base">Weekly health insights & updates</p>
                              </div>
                        </div>
                        <p className="mb-4 sm:mb-6 text-white leading-relaxed text-sm sm:text-base">
                          Get the latest healthcare innovations, research findings, and community health stories delivered to your inbox every week.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white border focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                          />
                          <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-blue-400 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base whitespace-nowrap">
                            Subscribe
                          </button>
                        </div>
                        <div className="flex items-center mt-4 sm:mt-6 lg:mt-10 text-sm text-blue-200">
                          <div className="flex -space-x-2 mr-2 sm:mr-3">
                            {[1,2,3,4].map(i => (
                              <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                            ))}
                          </div>
                          <span className="font-semibold text-white text-xs sm:text-sm md:text-base lg:text-xl">Join 12,000+ healthcare professionals</span>
                        </div>
                      </div>

                    {/* Community Stats  */}
                    <div className="rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg">
                        <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-white mb-3 sm:mb-4 flex items-center font-serif">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-white" />
                          Community Impact
                        </h3>

                        <div className="grid grid-cols-2 lg:flex lg:flex-row lg:justify-between items-stretch gap-3 sm:gap-4">
                          {[
                            { label: "Active CHWs", value: "50,234", change: "+12%" },
                            { label: "Patients Served", value: "2.1M", change: "+28%" },
                            { label: "Health Articles", value: "1,456", change: "+15%" },
                            { label: "Communities", value: "847", change: "+8%" }
                          ].map((stat, index) => (
                            <div
                              key={index}
                              className="flex flex-col items-center px-2 sm:px-3 md:px-4 py-2 sm:py-3 bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 w-full lg:max-w-[150px]"
                            >
                              <div className="text-base sm:text-lg font-bold text-black mb-0.5">
                                {stat.value}
                              </div>
                              <div className="text-xs text-black mb-1 text-center leading-tight">{stat.label}</div>
                              <div className="text-xs font-semibold text-black bg-white px-1.5 py-0.5 rounded-xl inline-block whitespace-nowrap">
                                {stat.change} this month
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 sm:mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 text-sm">Join Our Community</h4>
                              <p className="text-xs text-gray-600">Connect with healthcare professionals</p>
                            </div>
                            <button className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-xs whitespace-nowrap">
                              Join Now
                            </button>
                          </div>
                        </div>
                      </div>
                  </div>
                </section>

                <TrendingTopics />

                {/* Call to Action */}
                <section className="text-center py-8 sm:py-12 md:py-16 shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 max-w-4xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-yellow-300 font-black mb-3 sm:mb-4 bg-clip-text leading-tight">
                      Transform Healthcare Together
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed text-white px-2">
                      Join thousands of healthcare professionals using MediLink to improve patient outcomes, streamline workflows, and build stronger communities.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                      <button className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl text-sm sm:text-base">
                        Start Your Journey
                      </button>
                      <button className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                        Learn More
                      </button>
                    </div>


                    <div className="flex flex-col sm:flex-row justify-center items-center mt-6 sm:mt-8 gap-3 sm:gap-4 md:gap-6 text-sm">
                        <div className="flex items-center gap-2 bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-3 sm:px-4 py-2">
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />
                          <span className="text-black font-bold text-xs sm:text-sm whitespace-nowrap">4.9/5 Rating</span>
                        </div>

                        <div className="flex items-center gap-2 bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-3 sm:px-4 py-2">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />
                          <span className="text-black font-bold text-xs sm:text-sm whitespace-nowrap">50K+ Users</span>
                        </div>

                        <div className="flex items-center gap-2 bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-3 sm:px-4 py-2">
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-black flex-shrink-0" />
                          <span className="text-black font-bold text-xs sm:text-sm whitespace-nowrap">2M+ Lives Impacted</span>
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
