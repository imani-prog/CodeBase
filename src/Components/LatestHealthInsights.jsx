import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Heart, 
  Bookmark 
} from 'lucide-react';

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
    image: "https://www.emro.who.int/images/stories/nutrition/nutritionist-healthy-diet.jpg",
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

const LatestHealthInsights = ({ categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

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
    <section className="mb-12 sm:mb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 bg-clip-text font-serif">
          Latest Health Insights
        </h2>
        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
            <input
              type="text"
              placeholder="Search articles..."
              className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 flex-shrink-0">
            <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {filteredPosts.map((post) => (
          <article key={post.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            <div className="p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {categories.find(c => c.id === post.category)?.name || post.category}
                </span>
                <div className="flex items-center space-x-1 sm:space-x-2 text-gray-400 text-xs sm:text-sm">
                  <Eye className="w-3 h-3" />
                  <span>{post.views}</span>
                </div>
              </div>
              
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{post.excerpt}</p>
              
              <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                {post.tags?.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2 flex-shrink-0">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">{post.author}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="truncate">{post.date}</span>
                      <span className="mx-1">•</span>
                      <span className="whitespace-nowrap">{post.readTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-1 flex-shrink-0 ml-2">
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`p-1.5 rounded-full transition-colors ${
                      likedPosts.has(post.id) ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'
                    }`}
                  >
                    <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    onClick={() => toggleBookmark(post.id)}
                    className={`p-1.5 rounded-full transition-colors ${
                      bookmarkedPosts.has(post.id) ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'
                    }`}
                  >
                    <Bookmark className={`w-3 h-3 sm:w-4 sm:h-4 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LatestHealthInsights;