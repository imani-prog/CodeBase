import React, { useState } from 'react';
import { MessageCircle, Heart, Repeat2, Share, MoreHorizontal, Clock, User, Stethoscope, UserCheck, AlertCircle, Filter, BookOpen, Award, Menu, X } from 'lucide-react';

const CommunityDiscussions = () => {
  const [likes, setLikes] = useState({});
  const [retweets, setRetweets] = useState({});
  const [showReplyForm, setShowReplyForm] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [bookmarked, setBookmarked] = useState({});
  const [following, setFollowing] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Flattened discussion data to look more like Twitter posts
  const posts = [
    {
      id: 1,
      author: "Dr. Sarah Chen",
      handle: "@sarahchen_md",
      avatar: "SC",
      specialty: "Public Health",
      verified: true,
      content: "What are the most effective training methodologies you've implemented for Community Health Workers? I'm particularly interested in digital training approaches. #CHWTraining #DigitalHealth",
      timestamp: "2h",
      likes: 23,
      retweets: 8,
      replies: 12,
      isOriginalPost: true,
      category: "training"
    },
    {
      id: 2,
      author: "Marcus Johnson",
      handle: "@marcus_health",
      avatar: "MJ",
      specialty: "Health Technology",
      verified: false,
      content: "We've had great success with mobile-based microlearning modules. Breaking down complex topics into 5-minute sessions really improves retention. Game changer for our CHW program! ",
      timestamp: "1h",
      likes: 45,
      retweets: 12,
      replies: 8,
      replyingTo: "Dr. Sarah Chen",
      category: "technology"
    },
    {
      id: 3,
      author: "Dr. Amina Hassan",
      handle: "@amina_hassan",
      avatar: "AH",
      specialty: "Community Medicine",
      verified: true,
      content: "Peer-to-peer learning has been revolutionary for us. CHWs teaching other CHWs creates a more supportive and culturally relevant environment. The knowledge retention rates speak for themselves.",
      timestamp: "45m",
      likes: 67,
      retweets: 23,
      replies: 15,
      replyingTo: "Dr. Sarah Chen",
      category: "education"
    },
    {
      id: 4,
      author: "Prof. Michael Roberts",
      handle: "@prof_roberts",
      avatar: "MR",
      specialty: "Digital Health",
      verified: true,
      content: "We're facing significant resistance to digital health tools in rural communities. What strategies have worked for you in overcoming technology adoption barriers? Need insights! 🤔 #DigitalHealth #RuralHealth",
      timestamp: "3h",
      likes: 34,
      retweets: 18,
      replies: 22,
      isOriginalPost: true,
      category: "rural-health"
    },
    {
      id: 5,
      author: "Grace Okonkwo",
      handle: "@grace_health",
      avatar: "GO",
      specialty: "Community Outreach",
      verified: false,
      content: "Start with the community leaders! Once they see the benefits and become advocates, adoption rates increase dramatically. We saw 300% improvement after getting elders on board. ",
      timestamp: "2h",
      likes: 89,
      retweets: 34,
      replies: 28,
      replyingTo: "Prof. Michael Roberts",
      category: "community"
    },
    {
      id: 6,
      author: "Dr. Elizabeth Nakamura",
      handle: "@liz_maternal",
      avatar: "EN",
      specialty: "Maternal Health",
      verified: true,
      content: "Our mobile prenatal screening program reduced maternal mortality by 40% in the target region. Early detection is everything! Proud of what technology can achieve when implemented thoughtfully. ",
      timestamp: "4h",
      likes: 156,
      retweets: 67,
      replies: 43,
      isOriginalPost: true,
      category: "maternal-health"
    },
    {
      id: 7,
      author: "James Williams",
      handle: "@james_chw",
      avatar: "JW",
      specialty: "Field Medicine",
      verified: false,
      content: "We combine traditional face-to-face with WhatsApp groups for ongoing support. The instant messaging helps with real-time problem solving. Best of both worlds approach! ",
      timestamp: "30m",
      likes: 72,
      retweets: 19,
      replies: 11,
      replyingTo: "Dr. Sarah Chen",
      category: "communication"
    }
  ];

  const trendingTopics = [
    { topic: "Digital Health Tools", posts: "45K posts" },
    { topic: "CHW Training", posts: "32K posts" },
    { topic: "Rural Healthcare", posts: "28K posts" },
    { topic: "Maternal Health", posts: "24K posts" },
    { topic: "Telemedicine", posts: "19K posts" }
  ];

  const suggestedFollows = [
    { name: "WHO", handle: "@WHO", verified: true, avatar: "WHO" },
    { name: "UNICEF", handle: "@UNICEF", verified: true, avatar: "UNI" },
    { name: "Gates Foundation", handle: "@gatesfoundation", verified: true, avatar: "GF" },
    { name: "PATH", handle: "@PATHtweets", verified: true, avatar: "PT" }
  ];

  const handleLike = (postId) => {
    setLikes(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleRetweet = (postId) => {
    setRetweets(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleBookmark = (postId) => {
    setBookmarked(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleFollow = (userName) => {
    setFollowing(prev => ({
      ...prev,
      [userName]: !prev[userName]
    }));
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const toggleReplyForm = (postId) => {
    setShowReplyForm(showReplyForm === postId ? null : postId);
    setReplyText('');
  };

  const handleReply = (postId) => {
    if (replyText.trim()) {
      console.log('Reply to post', postId, ':', replyText);
      setReplyText('');
      setShowReplyForm(null);
    }
  };

  const getAvatarColor = (author) => {
    const blueColors = [
      'bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-sky-500', 
      'bg-sky-600', 'bg-cyan-500', 'bg-cyan-600', 'bg-slate-600'
    ];
    return blueColors[author.length % blueColors.length];
  };


  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="flex flex-col lg:flex-row">
        {/* Main Feed */}
        <div className="flex-1 lg:max-w-2xl border-x border-gray-200">
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Stethoscope className="w-6 h-6 text-blue-500" />
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Medical Discussions</h2>
                  <p className="text-xs sm:text-sm text-gray-500">Healthcare professionals sharing insights</p>
                </div>
              </div>
              
              {/* Mobile sidebar toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-5 h-5 text-gray-600" />
                {/* Notification badge */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>
              </button>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
              {[
                { id: 'all', label: 'All', icon: null },
                { id: 'training', label: 'Training', icon: BookOpen },
                { id: 'technology', label: 'Technology', icon: AlertCircle },
                { id: 'community', label: 'Community', icon: User }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleFilterChange(filter.id)}
                  className={`flex items-center space-x-2 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    activeFilter === filter.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {filter.icon && <filter.icon className="w-4 h-4" />}
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div className="divide-y divide-gray-200">
            {posts
              .filter(post => activeFilter === 'all' || post.category === activeFilter)
              .map((post) => (
              <div key={post.id}>
                <article className="px-4 pt-3 pb-2 hover:bg-blue-50/30 transition-colors cursor-pointer">
                  {/* Reply indicator */}
                  {post.replyingTo && (
                    <div className="flex items-center mb-2 text-sm text-gray-500">
                      <MessageCircle className="w-4 h-4 mr-2 text-blue-400" />
                      <span>Replying to <span className="text-blue-500">@{post.replyingTo.toLowerCase().replace(/\s+/g, '_')}</span></span>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    {/* Avatar */}
                    <div className={`w-12 h-12 ${getAvatarColor(post.author)} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ring-2 ring-blue-100`}>
                      {post.avatar}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center flex-wrap gap-1 mb-1">
                        <span className="font-bold text-gray-900 hover:underline text-sm sm:text-base">{post.author}</span>
                        {post.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <UserCheck className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <span className="text-gray-500 text-sm">{post.handle}</span>
                        <span className="text-gray-500 hidden sm:inline">·</span>
                        <span className="text-gray-500 text-sm">{post.timestamp}</span>
                        {post.specialty && (
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                            {post.specialty}
                          </span>
                        )}
                        {post.isOriginalPost && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                            Discussion Starter
                          </span>
                        )}
                      </div>

                      {/* Post content */}
                      <div className="text-gray-900 mb-3 leading-relaxed text-sm sm:text-base">
                        {post.content}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between max-w-md">
                        <button
                          onClick={() => toggleReplyForm(post.id)}
                          className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-blue-500 transition-colors group"
                        >
                          <div className="p-1.5 sm:p-2 rounded-full group-hover:bg-blue-50">
                            <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                          </div>
                          <span className="text-xs sm:text-sm">{post.replies}</span>
                        </button>

                        <button
                          onClick={() => handleRetweet(post.id)}
                          className={`flex items-center space-x-1 sm:space-x-2 transition-colors group ${
                            retweets[post.id] ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
                          }`}
                        >
                          <div className="p-1.5 sm:p-2 rounded-full group-hover:bg-blue-50">
                            <Repeat2 className="w-4 sm:w-5 h-4 sm:h-5" />
                          </div>
                          <span className="text-xs sm:text-sm">{post.retweets + (retweets[post.id] ? 1 : 0)}</span>
                        </button>

                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-1 sm:space-x-2 transition-colors group ${
                            likes[post.id] ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
                          }`}
                        >
                          <div className="p-1.5 sm:p-2 rounded-full group-hover:bg-blue-50">
                            <Heart className={`w-4 sm:w-5 h-4 sm:h-5 ${likes[post.id] ? 'fill-current' : ''}`} />
                          </div>
                          <span className="text-xs sm:text-sm">{post.likes + (likes[post.id] ? 1 : 0)}</span>
                        </button>

                        <button
                          onClick={() => handleBookmark(post.id)}
                          className={`flex items-center space-x-1 sm:space-x-2 transition-colors group ${
                            bookmarked[post.id] ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
                          }`}
                        >
                          <div className="p-1.5 sm:p-2 rounded-full group-hover:bg-blue-50">
                            <BookOpen className={`w-4 sm:w-5 h-4 sm:h-5 ${bookmarked[post.id] ? 'fill-current' : ''}`} />
                          </div>
                        </button>

                        <button className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
                          <div className="p-1.5 sm:p-2 rounded-full group-hover:bg-blue-50">
                            <Share className="w-4 sm:w-5 h-4 sm:h-5" />
                          </div>
                        </button>

                        <button className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
                          <div className="p-1.5 sm:p-2 rounded-full group-hover:bg-blue-50">
                            <MoreHorizontal className="w-4 sm:w-5 h-4 sm:h-5" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Reply Form */}
                {showReplyForm === post.id && (
                  <div className="border-t border-blue-100 px-4 py-3 bg-blue-50/30">
                    <div className="flex space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        YU
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`Reply to ${post.author}...`}
                          className="w-full p-3 border border-blue-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows="3"
                        />
                        <div className="flex justify-between items-center mt-3">
                          <div className="text-sm text-gray-500">
                            {280 - replyText.length} characters remaining
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setShowReplyForm(null)}
                              className="px-4 py-2 text-blue-600 border border-blue-300 rounded-full hover:bg-blue-50 transition-colors text-sm font-medium"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleReply(post.id)}
                              disabled={!replyText.trim()}
                              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Load more */}
          <div className="p-4 text-center border-t border-blue-100">
            <button className="text-blue-500 hover:text-blue-600 font-medium bg-blue-50 px-6 py-2 rounded-full hover:bg-blue-100 transition-colors">
              Show more discussions
            </button>
            
            {/* Mobile sidebar hint */}
            <div className="lg:hidden mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
              <Menu className="w-4 h-4" />
              <span>Tap menu for trending topics & quick actions</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={`lg:block w-80 p-4 space-y-4 ${
          sidebarOpen ? 'fixed top-0 right-0 h-full bg-white z-50 shadow-xl overflow-y-auto' : 'hidden'
        } lg:relative lg:shadow-none lg:z-auto lg:overflow-visible`}>
          
          {/* Mobile close button */}
          <div className="lg:hidden flex justify-between items-center mb-4 pb-3 border-b border-gray-200 sticky top-0 bg-white">
            <h3 className="text-lg font-bold text-gray-900">Discussions Sidebar</h3>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          {/* Search */}
          <div className="sticky top-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search medical discussions"
                className="w-full px-4 py-3 pl-10 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              />
              <Filter className="absolute left-3 top-3.5 w-4 h-4 text-blue-400" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className=" rounded-2xl p-4 border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 rounded-lg hover:bg-blue-50 transition-colors text-blue-700 text-sm">
                Start New Discussion
              </button>
              <button className="w-full text-left p-2 rounded-lg hover:bg-blue-50 transition-colors text-blue-700 text-sm">
                 Join Study Group
              </button>
              <button className="w-full text-left p-2 rounded-lg hover:bg-blue-50 transition-colors text-blue-700 text-sm">
                Medical Guidelines
              </button>
              <button className="w-full text-left p-2 rounded-lg hover:bg-blue-50 transition-colors text-blue-700 text-sm">
                Emergency Alerts
              </button>
            </div>
          </div>

          {/* Trending */}
          <div className=" rounded-2xl p-4 border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-3">Trending in Healthcare</h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="cursor-pointer hover:bg-blue-50 p-3 rounded-lg transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 mb-1">Trending in Healthcare</p>
                      <p className="font-bold text-blue-900">#{topic.topic}</p>
                      <p className="text-sm text-blue-600">{topic.posts}</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">#{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Professionals to follow */}
          <div className="rounded-2xl p-4 border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center">
              <UserCheck className="w-5 h-5 mr-2" />
              Medical Professionals
            </h3>
            <div className="space-y-3">
              {suggestedFollows.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${getAvatarColor(user.name)} rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-blue-200`}>
                      {user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-blue-900 text-sm">{user.name}</span>
                        {user.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <UserCheck className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <span className="text-blue-600 text-sm">{user.handle}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleFollow(user.name)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      following[user.name] 
                        ? 'bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {following[user.name] ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Medical Community Stats */}
          <div className="rounded-2xl p-4 border border-blue-100">
            <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center">
              <Stethoscope className="w-5 h-5 mr-2" />
              Community Insights
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-900 font-bold">Healthcare Professionals</span>
                <span className="font-bold text-blue-900">1.2K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-900 font-bold">Active Discussions</span>
                <span className="font-bold text-blue-900">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-900 font-bold">Medical Cases Shared</span>
                <span className="font-bold text-blue-900">3.8K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-900 font-bold">Research Papers</span>
                <span className="font-bold text-blue-900">892</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-900 font-bold">Training Modules</span>
                <span className="font-bold text-blue-900">156</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDiscussions;