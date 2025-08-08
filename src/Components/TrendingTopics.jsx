import { Activity, ArrowUpRight, Bookmark, Brain, ChevronRight, Clock, Eye, Heart, MessageCircle, Share2, Sparkles, Star, Stethoscope, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function TrendingHealthTopics() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [animatedStats, setAnimatedStats] = useState({});

  const trendingTopics = [
    { 
      topic: "AI-Powered Diagnostics", 
      posts: 24, 
      trend: "+45%", 
      color: "from-blue-600 to-indigo-600",
      icon: Activity,
      description: "Revolutionary machine learning algorithms transforming medical diagnosis accuracy",
      engagement: "12.3k views",
      comments: 156,
      shares: 89,
      timeAgo: "2 hours ago",
      trending: "Hot",
      readTime: "3 min read",
      category: "Innovation"
    },
    { 
      topic: "Digital Mental Wellness", 
      posts: 18, 
      trend: "+32%", 
      color: "from-sky-500 to-blue-500",
      icon: Brain,
      description: "Breakthrough digital therapy platforms revolutionizing mental health support",
      engagement: "8.7k views",
      comments: 203,
      shares: 67,
      timeAgo: "4 hours ago",
      trending: "Rising",
      readTime: "5 min read",
      category: "Wellness"
    },
    { 
      topic: "Remote Healthcare Evolution", 
      posts: 15, 
      trend: "+28%", 
      color: "from-blue-600 to-indigo-600",
      icon: Stethoscope,
      description: "Next-generation telemedicine platforms expanding global healthcare accessibility",
      engagement: "9.2k views",
      comments: 124,
      shares: 45,
      timeAgo: "6 hours ago",
      trending: "Growing",
      readTime: "4 min read",
      category: "Technology"
    },
    { 
      topic: "Smart Preventive Care", 
      posts: 21, 
      trend: "+38%", 
      color: "from-indigo-500 to-blue-600",
      icon: Heart,
      description: "Advanced IoT monitoring systems enabling proactive health management",
      engagement: "11.1k views",
      comments: 178,
      shares: 92,
      timeAgo: "1 hour ago",
      trending: "Premium",
      readTime: "6 min read",
      category: "Prevention"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        ...prev,
        [Math.floor(Math.random() * 4)]: Date.now()
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-20 relative overflow-hidden">
     
       
      {/* Enhanced Floating elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200/25 to-indigo-200/25 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-cyan-200/25 to-sky-200/25 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-indigo-300/20 to-blue-300/20 rounded-full blur-lg animate-bounce delay-500"></div>

      <div className="relative z-10 pt-8 px-4">  
        {/* Enhanced Header */}
        <div className="text-center mb-16">
         
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-yellow-300 bg-clip-text mb-6 leading-tight font-serif">
            Trending Health Topics
          </h2>

          <p className="text-white font-bold text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover cutting-edge healthcare innovations, breakthrough research, and wellness trends that are revolutionizing the medical industry right now
          </p>
          
          {/* Stats bar */}
         <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2 bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-4 py-2">
              <Eye className="w-4 h-4 text-black" />
              <span className="text-black font-bold">41.2k total views</span>
            </div>

            <div className="flex items-center gap-2 bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-4 py-2">
              <MessageCircle className="w-4 h-4 text-black" />
              <span className="text-black font-bold">661 discussions</span>
            </div>

            <div className="flex items-center gap-2 bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-4 py-2">
              <TrendingUp className="w-4 h-4 text-black" />
              <span className="text-black font-bold">+35% this week</span>
            </div>
          </div>



        </div>

        {/* Enhanced Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trendingTopics.map((item, index) => {
            const IconComponent = item.icon;
            const isHovered = hoveredIndex === index;
            const isAnimated = animatedStats[index];
            
            return (
              <div 
                key={index} 
                className="group relative overflow-hidden bg-blue-100 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform cursor-pointer border border-blue-100/80 hover:border-blue-200"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-all duration-500 scale-105`}></div>
                
               
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 blur-2xl transition-all duration-700 scale-110`}></div>

                {/* Top badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                    {item.category}
                  </div>
                  <div className="text-xs font-medium text-gray-500">
                    {item.trending}
                  </div>
                </div>

                <div className="relative z-10">
                  {/* Enhanced Icon with pulse effect */}
                  <div className={`w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg relative`}>
                    <IconComponent className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                    {isAnimated && (
                      <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 animate-ping"></div>
                    )}
                  </div>

                  {/* Enhanced Content */}
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                        {item.topic}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 group-hover:text-gray-700 transition-colors leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Enhanced Stats */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700 font-medium">{item.posts} articles</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-green-600 font-bold">
                          <TrendingUp className="w-4 h-4" />
                          <span>{item.trend}</span>
                        </div>
                      </div>

                      {/* Additional metrics */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span className="text-xs">{item.engagement}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">{item.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          <span className="text-xs">{item.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="w-3 h-3" />
                          <span className="text-xs">{item.shares}</span>
                        </div>
                      </div>

                      {/* Time and interaction bar */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-500">{item.timeAgo}</span>
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-blue-50 rounded-full transition-colors">
                            <Bookmark className="w-3 h-3 text-gray-400 hover:text-blue-600" />
                          </button>
                          <button className="p-1 hover:bg-blue-50 rounded-full transition-colors">
                            <Star className="w-3 h-3 text-gray-400 hover:text-yellow-500" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Call to action */}
                    <div className={`flex items-center justify-between pt-2 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-75'}`}>
                      <span className="text-sm font-semibold text-blue-600">Explore insights</span>
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Enhanced Corner decoration */}
                <div className={`absolute top-6 right-6 w-3 h-3 bg-gradient-to-br ${item.color} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 shadow-lg`}></div>
                
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                  <div className={`h-full bg-gradient-to-r ${item.color} transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center mt-16 text-white">
          <div className="inline-flex flex-col items-center gap-4">
            <button className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-bold rounded-2xl shadow-2xl relative overflow-hidden">
              
              <span className="relative z-10">Explore All Health Innovations</span>
              <ArrowUpRight className="w-5 sm:w-6 h-5 sm:h-6 relative z-10" />
            </button>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 font-extrabold text-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Updated every hour</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Join 50k+ healthcare professionals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}