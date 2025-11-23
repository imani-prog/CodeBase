import React, { useState } from 'react';
import { 
  ArrowRight, 
  Eye, 
  Heart, 
  Calendar, 
  Clock, 
  Bookmark, 
  Share2, 
  TrendingUp 
} from 'lucide-react';

const FeaturedPosts = ({ categories = [] }) => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());

  const featuredPosts = [
    {
      id: 1,
      title: "AI-Powered Diagnostics: Revolutionizing Rural Healthcare in Kenya",
      excerpt: "Discover how machine learning algorithms are helping CHWs detect malaria, tuberculosis, and other conditions with 94% accuracy using just smartphone cameras.",
      image: "https://media.licdn.com/dms/image/v2/D4D12AQHXIxl3VeD1xw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1694012235854?e=2147483647&v=beta&t=w1DzSrZeWeuKNU_1HA-q5dQoNJI4dqFeIESRAhwEreI",
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
      excerpt: "An in-depth look at how CHWs in Turkana County used MediLink's platform to coordinate vaccine distribution and achieve 89% coverage rates.This article explores the critical role of community health workers in Kenya's COVID-19 response, highlighting their efforts in vaccine distribution and public health education.",
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

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <section className="mb-12 sm:mb-16 overflow-hidden">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 bg-clip-text font-serif">
          Featured Stories
        </h2>
        <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold group text-sm sm:text-base">
          View All
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      
      <div className="space-y-4 sm:space-y-6">
        {featuredPosts.map((post, index) => (
          <div key={post.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            {/* Conditional Layout based on index */}
            {index % 2 === 0 ? (
              <>
                {/* Text Card - Left Side (for even index) */}
                <article className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-6 lg:mb-8 order-2 lg:order-1">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {categories.find(c => c.id === post.category)?.name || post.category}
                        </span>
                        <div className="flex space-x-2">
                          {post.featured && (
                            <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold">
                              FEATURED
                            </span>
                          )}
                          {post.trending && (
                            <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              TRENDING
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">{post.excerpt}</p>
                      
                      <div className="flex items-center space-x-4 text-gray-500 text-sm mb-4">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views.toLocaleString()}
                        </div>
                        <button 
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center transition-colors ${
                            likedPosts.has(post.id) ? 'text-blue-500' : 'hover:text-blue-500'
                          }`}
                        >
                          <Heart className={`w-4 h-4 mr-1 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                          {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm mr-3">
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
                
                {/* Image Card - Right Side (for even index) */}
                <article className="bg-white rounded-2xl shadow-xl mb-6 lg:mb-8 order-1 lg:order-2">
                  <div className="relative h-48 sm:h-64 lg:h-full lg:min-h-[300px]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-2xl border-2 border-blue-400 bg-white"
                    
                      style={{
                            boxShadow: post.id % 2 === 1 
                            ? `0 8px 16px rgba(0, 0, 0, 0.1)`
                            : `0 8px 16px rgba(0, 0, 0, 0.1)`
                        }}
                    />
                  </div>
                </article>
              </>
            ) : (
              <>
                {/* Image Card - Left Side (for odd index) */}
                <article className="bg-white rounded-2xl shadow-xl mb-6 lg:mb-8 order-1">
                  <div className="relative h-48 sm:h-64 lg:h-full lg:min-h-[300px]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-2xl border-2 border-blue-400 bg-white"
                      style={{
                            boxShadow: `0 8px 16px rgba(0, 0, 0, 0.1)`
                        }}
                    />
                  </div>
                </article>
                
                {/* Text Card - Right Side (for odd index) */}
                <article className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-6 lg:mb-8 order-2">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {categories.find(c => c.id === post.category)?.name || post.category}
                        </span>
                        <div className="flex space-x-2">
                          {post.featured && (
                            <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold">
                              FEATURED
                            </span>
                          )}
                          {post.trending && (
                            <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold flex items-center">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              TRENDING
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">{post.excerpt}</p>
                      
                      <div className="flex items-center space-x-4 text-gray-500 text-sm mb-4">
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
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm mr-3">
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
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;