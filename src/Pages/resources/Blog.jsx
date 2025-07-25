/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { useState, useEffect } from "react";
import { Calendar, Clock, User, Eye, Heart, Share2, Search, Filter, Bookmark, TrendingUp, ChevronRight, ArrowRight, Star, Users, MessageCircle } from "lucide-react";


export const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());

    useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    const categories = [
    { id: 'all', name: 'All Posts', color: 'bg-gradient-to-r from-blue-500 to-purple-600', count: 24 },
    { id: 'digital-health', name: 'Digital Health', color: 'bg-gradient-to-r from-green-500 to-teal-600', count: 8 },
    { id: 'community-care', name: 'Community Care', color: 'bg-gradient-to-r from-orange-500 to-red-600', count: 6 },
    { id: 'maternal-health', name: 'Maternal Health', color: 'bg-gradient-to-r from-pink-500 to-rose-600', count: 5 },
    { id: 'telehealth', name: 'Telehealth', color: 'bg-gradient-to-r from-indigo-500 to-blue-600', count: 5 }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "AI-Powered Diagnostics: Revolutionizing Rural Healthcare in Kenya",
      excerpt: "Discover how machine learning algorithms are helping CHWs detect malaria, tuberculosis, and other conditions with 94% accuracy using just smartphone cameras.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      author: "Dr. Sarah Kimani",
      date: "July 20, 2025",
      readTime: "8 min read",
      category: "digital-health",
      views: 2845,
      likes: 187,
      featured: true,
      trending: true
    },
    {
      id: 2,
      title: "Community Health Workers: The Unsung Heroes of COVID-19 Recovery",
      excerpt: "An in-depth look at how CHWs in Turkana County used MediLink's platform to coordinate vaccine distribution and achieve 89% coverage rates.",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&h=600&fit=crop",
      author: "James Mwangi",
      date: "July 18, 2025",
      readTime: "12 min read",
      category: "community-care",
      views: 3124,
      likes: 234,
      featured: true
    }
  ];

  const blogPosts = [
    {
      id: 3,
      title: "Maternal Mortality Drops 35% in Pilot Counties Using Digital Care Plans",
      excerpt: "Comprehensive analysis of how digitized antenatal care protocols are saving lives across rural Kenya.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      author: "Dr. Grace Wanjiku", 
      date: "July 15, 2025",
      readTime: "6 min read",
      category: "maternal-health",
      views: 1876,
      likes: 145,
      tags: ["maternal care", "digital health", "Kenya health"]
    },
    {
      id: 4,
      title: "Blockchain for Medical Records: Securing Patient Data in Kenya",
      excerpt: "How MediLink is implementing blockchain technology to ensure patient privacy and data integrity.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop",
      author: "Tech Team MediLink",
      date: "July 12, 2025", 
      readTime: "10 min read",
      category: "digital-health",
      views: 2156,
      likes: 198,
      tags: ["blockchain", "data security", "privacy"]
    },
    {
      id: 5,
      title: "Telemedicine Success Stories: Connecting Remote Patients to Specialists",
      excerpt: "Real patient stories of how telehealth consultations are bridging the healthcare access gap.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
      author: "Dr. Peter Kiprotich",
      date: "July 10, 2025",
      readTime: "7 min read", 
      category: "telehealth",
      views: 1654,
      likes: 123,
      tags: ["telemedicine", "patient stories", "access"]
    },
    {
      id: 6,
      title: "Mental Health in Rural Communities: Breaking the Silence",
      excerpt: "Addressing mental health stigma and building support systems through community health programs.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
      author: "Dr. Mary Njeri",
      date: "July 8, 2025",
      readTime: "9 min read",
      category: "community-care", 
      views: 2234,
      likes: 189,
      tags: ["mental health", "community care", "stigma"]
    },
    {
      id: 7,
      title: "Nutrition Programs: Fighting Malnutrition with Data-Driven Interventions",
      excerpt: "How predictive analytics is helping identify at-risk children and pregnant mothers.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      author: "Nutritionist Team",
      date: "July 5, 2025",
      readTime: "5 min read",
      category: "community-care",
      views: 1432,
      likes: 98,
      tags: ["nutrition", "data analytics", "prevention"]
    },
    {
      id: 8,
      title: "The Future of Preventive Care: IoT Devices in Rural Health Monitoring",
      excerpt: "Exploring how wearable devices and IoT sensors are enabling continuous health monitoring.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      author: "Innovation Lab",
      date: "July 3, 2025",
      readTime: "11 min read",
      category: "digital-health",
      views: 1789,
      likes: 156,
      tags: ["IoT", "wearables", "prevention"]
    }
  ];

  const healthUpdates = [
    {
      id: 9,
      title: "WHO Approves New Malaria Prevention Protocol",
      summary: "Revolutionary bed net technology shows 78% reduction in transmission rates during Kenya trials.",
      date: "2 hours ago",
      urgent: true,
      source: "WHO Kenya"
    },
    {
      id: 10,
      title: "Ministry of Health Launches Universal Health Coverage Phase 3",
      summary: "Digital health ID cards now available in 25 additional counties with full MediLink integration.",
      date: "6 hours ago",
      urgent: false,
      source: "MOH Kenya"
    },
    {
      id: 11,
      title: "New CHW Training Certification Program Live",
      summary: "Advanced digital health skills certification now available on MediLink Learning Platform.",
      date: "1 day ago", 
      urgent: false,
      source: "MediLink Academy"
    },
    {
      id: 12,
      title: "Research: Mobile Health Apps Reduce Hospital Readmissions by 42%",
      summary: "Comprehensive study across 15 counties shows significant impact of app-based care coordination.",
      date: "2 days ago",
      urgent: false,
      source: "Health Research Institute"
    }
  ];

  const toggleLike = (postId) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  const toggleBookmark = (postId) => {
    const newBookmarked = new Set(bookmarkedPosts);
    if (newBookmarked.has(postId)) {
      newBookmarked.delete(postId);
    } else {
      newBookmarked.add(postId);
    }
    setBookmarkedPosts(newBookmarked);
  };
  
   const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden  p-12 mb-16">
          <div className="relative z-10 max-w-4xl">
              <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-3 mr-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2">
                  Health Insights
                </h1>
                <p className="text-xl md:text-2xl mb-3">Empowering Communities Through Digital Healthcare Innovation</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur rounded-full px-6 py-2 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">50,000+ CHWs Connected</span>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-full px-6 py-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="text-sm">2M+ Patients Served</span>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-full px-6 py-2 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                <span className="text-sm">95% Satisfaction Rate</span>
              </div>
            </div>

          </div>
        </div>

        {/* Health Updates Ticker */}
          <div className="mb-12">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center mb-4">
              <div className="bg-white rounded-full p-2 mr-3">
                <TrendingUp className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold">Breaking Health Updates</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {healthUpdates.slice(0, 2).map((update) => (
                <div key={update.id} className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm leading-tight">{update.title}</h4>
                    {update.urgent && (
                      <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold ml-2 flex-shrink-0">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-white/80 text-xs mb-2">{update.summary}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/60">{update.source}</span>
                    <span className="text-white/60">{update.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative overflow-hidden rounded-full px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 ${
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

        {/* Featured Posts */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent">
              ⭐ Featured Stories
            </h2>
            <button className="flex items-center text-blue-600 hover:text-blue-800 font-semibold group">
              View All
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {post.featured && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                        FEATURED
                      </span>
                    )}
                    {post.trending && (
                      <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        TRENDING
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {categories.find(c => c.id === post.category)?.name}
                    </span>
                    <div className="flex items-center space-x-4 text-gray-500 text-sm">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views.toLocaleString()}
                      </div>
                      <button 
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center transition-colors ${
                          likedPosts.has(post.id) ? 'text-red-500' : 'hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                        {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                      </button>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{post.author}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {post.date}
                          <Clock className="w-3 h-3 ml-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => toggleBookmark(post.id)}
                        className={`p-2 rounded-full transition-colors ${
                          bookmarkedPosts.has(post.id) 
                            ? 'bg-yellow-100 text-yellow-600' 
                            : 'bg-gray-100 text-gray-400 hover:bg-yellow-100 hover:text-yellow-600'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Blog Posts Grid  */}
                <section className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent">
                      📚 Latest Health Insights
                    </h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search articles..."
                          className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50">
                        <Filter className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
        
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                      <article key={post.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                              {categories.find(c => c.id === post.category)?.name}
                            </span>
                            <div className="flex items-center space-x-2 text-gray-400 text-sm">
                              <Eye className="w-3 h-3" />
                              <span>{post.views}</span>
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.tags?.map((tag, index) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2">
                                {post.author.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 text-sm">{post.author}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span>{post.date}</span>
                                  <span className="mx-1">•</span>
                                  <span>{post.readTime}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex space-x-1">
                              <button 
                                onClick={() => toggleLike(post.id)}
                                className={`p-1.5 rounded-full transition-colors ${
                                  likedPosts.has(post.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                              </button>
                              <button 
                                onClick={() => toggleBookmark(post.id)}
                                className={`p-1.5 rounded-full transition-colors ${
                                  bookmarkedPosts.has(post.id) ? 'text-yellow-600' : 'text-gray-400 hover:text-yellow-600'
                                }`}
                              >
                                <Bookmark className={`w-4 h-4 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

          {/* Health Updates Sidebar */}
              <section className="mb-16">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-8">
                  🔔 Health Updates & Alerts
                </h2>
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                        Community Discussions
                      </h3>
                      <div className="space-y-4">
                        {[
                          { topic: "CHW Training Best Practices", replies: 23, lastActive: "2 hours ago" },
                          { topic: "Digital Health Implementation Challenges", replies: 18, lastActive: "4 hours ago" },
                          { topic: "Maternal Health Success Stories", replies: 31, lastActive: "6 hours ago" }
                        ].map((discussion, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                            <div>
                              <h4 className="font-semibold text-gray-900">{discussion.topic}</h4>
                              <p className="text-sm text-gray-600">{discussion.replies} replies • {discussion.lastActive}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {healthUpdates.map((update) => (
                      <div key={update.id} className={`rounded-xl p-4 shadow-lg ${
                        update.urgent ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' : 'bg-white'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className={`font-semibold text-sm leading-tight ${
                            update.urgent ? 'text-white' : 'text-gray-900'
                          }`}>
                            {update.title}
                          </h4>
                          {update.urgent && (
                            <span className="bg-white text-red-500 text-xs px-2 py-1 rounded-full font-bold ml-2 flex-shrink-0">
                              URGENT
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mb-2 ${
                          update.urgent ? 'text-white/90' : 'text-gray-600'
                        }`}>
                          {update.summary}
                        </p>
                        <div className="flex justify-between items-center text-xs">
                          <span className={update.urgent ? 'text-white/70' : 'text-gray-500'}>
                            {update.source}
                          </span>
                          <span className={update.urgent ? 'text-white/70' : 'text-gray-500'}>
                            {update.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Newsletter & Community Section */}
              <section className="mb-16">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.05" fill-rule="evenodd"%3E%3Cpath d="m0 40l40-40h-40z"/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div> */}
                    <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="bg-white/20 rounded-full p-3 mr-4">
                        <Heart className="w-6 h-6" />
                      </div>
                        <div>
                            <h3 className="text-2xl font-bold">Stay Informed</h3>
                            <p className="text-blue-100">Weekly health insights & updates</p>
                          </div>
                    </div>
                    <p className="text-blue-100 mb-6 leading-relaxed">
                      Get the latest healthcare innovations, research findings, and community health stories delivered to your inbox every week.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Subscribe
                      </button>
                    </div>
                    <div className="flex items-center mt-4 text-sm text-blue-200">
                      <div className="flex -space-x-2 mr-3">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white"></div>
                        ))}
                      </div>
                      <span>Join 12,000+ healthcare professionals</span>
                    </div>
                  </div>
                </div>

                {/* Community Stats  */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Users className="w-6 h-6 mr-3 text-green-600" />
                    Community Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "Active CHWs", value: "50,234", change: "+12%", color: "text-green-600" },
                      { label: "Patients Served", value: "2.1M", change: "+28%", color: "text-blue-600" },
                      { label: "Health Articles", value: "1,456", change: "+15%", color: "text-purple-600" },
                      { label: "Communities", value: "847", change: "+8%", color: "text-orange-600" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                        <div className={`text-xs font-semibold ${stat.color} bg-opacity-10 px-2 py-1 rounded-full inline-block`}>
                          {stat.change} this month
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">Join Our Community</h4>
                        <p className="text-sm text-gray-600">Connect with healthcare professionals</p>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        Join Now
                      </button>
                    </div>
                  </div>
                </div>

              {/* </div> */}
            </section>

            {/* Trending Topics */}
             <section className="mb-16">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-8 flex items-center">
                        🔥 Trending Health Topics
                      </h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { topic: "AI in Healthcare", posts: 24, trend: "+45%", color: "from-blue-500 to-cyan-500" },
                          { topic: "Mental Health Support", posts: 18, trend: "+32%", color: "from-green-500 to-teal-500" },
                          { topic: "Telemedicine Growth", posts: 15, trend: "+28%", color: "from-purple-500 to-pink-500" },
                          { topic: "Preventive Care", posts: 21, trend: "+38%", color: "from-orange-500 to-red-500" }
                        ].map((item, index) => (
                          <div key={index} className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                            <div className="relative z-10">
                              <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <TrendingUp className="w-6 h-6 text-white" />
                              </div>
                              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {item.topic}
                              </h3>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">{item.posts} articles</span>
                                <span className="text-green-600 font-semibold">{item.trend}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
              </section>

              {/* Call to Action */}
              <section className="text-center py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl text-white relative overflow-hidden">
                  {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E')] opacity-20"></div> */}
                  <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="flex justify-center mb-6">
                      <div className="bg-white/20 backdrop-blur rounded-full p-4">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      Transform Healthcare Together
                    </h3>
                    <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                      Join thousands of healthcare professionals using MediLink to improve patient outcomes, streamline workflows, and build stronger communities.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                        Start Your Journey
                      </button>
                      <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-2xl hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105">
                        Learn More
                      </button>
                    </div>
                    <div className="flex justify-center items-center mt-8 space-x-8 text-blue-200">
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
        </main>
      ?
        <Footer />
    </div>
  );
};
export default Blog;
