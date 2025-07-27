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
      color: "from-cyan-500 to-teal-500",
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
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-indigo-50/30 to-cyan-50/40 rounded-3xl -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] -z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.1),transparent_50%)] -z-10"></div> 
       
      {/* Enhanced Floating elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200/25 to-indigo-200/25 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-cyan-200/25 to-sky-200/25 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-indigo-300/20 to-blue-300/20 rounded-full blur-lg animate-bounce delay-500"></div>

      <div className="relative z-10 pt-8">  
        {/* Enhanced Header */}
        <div className="text-center mb-16">
         
          
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
            Trending Health Topics
          </h2>
          
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover cutting-edge healthcare innovations, breakthrough research, and wellness trends that are revolutionizing the medical industry right now
          </p>
          
          {/* Stats bar */}
          <div className="flex justify-center items-center gap-8 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700 font-medium">41.2k total views</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-indigo-600" />
              <span className="text-gray-700 font-medium">661 discussions</span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-600" />
              <span className="text-gray-700 font-medium">+35% this week</span>
            </div>
          </div>
        </div>

        {/* Enhanced Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingTopics.map((item, index) => {
            const IconComponent = item.icon;
            const isHovered = hoveredIndex === index;
            const isAnimated = animatedStats[index];
            
            return (
              <div 
                key={index} 
                className="group relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-blue-100/80 hover:border-blue-200"
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
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg relative`}>
                    <IconComponent className="w-8 h-8 text-white" />
                    {isAnimated && (
                      <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 animate-ping"></div>
                    )}
                  </div>

                  {/* Enhanced Content */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                        {item.topic}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3 group-hover:text-gray-700 transition-colors leading-relaxed">
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
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{item.engagement}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{item.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="w-3 h-3" />
                          <span>{item.shares}</span>
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
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4">
            <button className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-bold rounded-2xl shadow-2xl relative overflow-hidden">
              {/* Remove animated background and icon rotation */}
              <span className="relative z-10">Explore All Health Innovations</span>
              <ArrowUpRight className="w-6 h-6 relative z-10" />
            </button>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>Updated every hour</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" />
                <span>Join 50k+ healthcare professionals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}