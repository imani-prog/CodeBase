import { useState } from 'react';
import { 
  Heart, MessageCircle, Trophy, BookOpen,
  Activity, TrendingUp, Users, Calendar,
  Flame, Droplet, Moon, Footprints,
  Award, Star, Target, Clock,
  ChevronRight, Share2, ThumbsUp, 
  MessageSquare, Play, Info, CheckCircle,
  Apple, Utensils, Dumbbell, Brain,
  Sun, Wind, Zap, Coffee
} from 'lucide-react';

const Wellness = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [likedArticles, setLikedArticles] = useState([]);

  // Wellness stats
  const wellnessStats = {
    currentStreak: 12,
    totalPoints: 2450,
    challengesCompleted: 8,
    articlesRead: 24,
    communityRank: 156,
    weeklyGoalProgress: 75
  };

  // Active challenges
  const challenges = [
    {
      id: 1,
      title: '30-Day Hydration Challenge',
      description: 'Drink 8 glasses of water daily for 30 days',
      category: 'Nutrition',
      participants: 1234,
      duration: '30 days',
      progress: 40,
      daysCompleted: 12,
      daysTotal: 30,
      reward: 500,
      icon: Droplet,
      color: 'blue',
      status: 'active',
      dailyGoal: '8 glasses',
      todayProgress: 6,
      todayGoal: 8
    },
    {
      id: 2,
      title: 'Daily Step Goal',
      description: 'Walk 10,000 steps every day this week',
      category: 'Fitness',
      participants: 2156,
      duration: '7 days',
      progress: 71,
      daysCompleted: 5,
      daysTotal: 7,
      reward: 300,
      icon: Footprints,
      color: 'green',
      status: 'active',
      dailyGoal: '10,000 steps',
      todayProgress: 7842,
      todayGoal: 10000
    },
    {
      id: 3,
      title: 'Sleep Well Challenge',
      description: 'Get 7-8 hours of quality sleep every night',
      category: 'Mental Health',
      participants: 987,
      duration: '14 days',
      progress: 50,
      daysCompleted: 7,
      daysTotal: 14,
      reward: 400,
      icon: Moon,
      color: 'purple',
      status: 'active',
      dailyGoal: '8 hours',
      todayProgress: 0,
      todayGoal: 8
    }
  ];

  // Available challenges
  const availableChallenges = [
    {
      id: 4,
      title: 'Meditation Mastery',
      description: '10 minutes of meditation daily for 21 days',
      category: 'Mental Health',
      participants: 756,
      duration: '21 days',
      reward: 450,
      icon: Brain,
      color: 'indigo'
    },
    {
      id: 5,
      title: 'Healthy Eating Week',
      description: 'Cook and eat home-made meals for 7 days',
      category: 'Nutrition',
      participants: 1432,
      duration: '7 days',
      reward: 250,
      icon: Utensils,
      color: 'orange'
    }
  ];

  // Health articles
  const articles = [
    {
      id: 1,
      title: 'Understanding Diabetes Management in Kenya',
      category: 'Chronic Diseases',
      author: 'Dr. Sarah Kamau',
      readTime: '5 min read',
      likes: 234,
      comments: 45,
      image: '🩺',
      excerpt: 'Learn about effective diabetes management strategies tailored for Kenyan patients...',
      date: '2025-11-20'
    },
    {
      id: 2,
      title: '10 Simple Exercises You Can Do at Home',
      category: 'Fitness',
      author: 'Jane Ochieng, Fitness Coach',
      readTime: '7 min read',
      likes: 567,
      comments: 89,
      image: '💪',
      excerpt: 'No gym? No problem! These exercises require no equipment and can be done anywhere...',
      date: '2025-11-18'
    },
    {
      id: 3,
      title: 'Mental Health: Breaking the Stigma',
      category: 'Mental Health',
      author: 'Dr. James Mwangi',
      readTime: '6 min read',
      likes: 892,
      comments: 156,
      image: '🧠',
      excerpt: 'Addressing mental health challenges and resources available in Kenya...',
      date: '2025-11-15'
    },
    {
      id: 4,
      title: 'Nutrition Tips for Busy Professionals',
      category: 'Nutrition',
      author: 'Mary Wanjiku, Nutritionist',
      readTime: '4 min read',
      likes: 445,
      comments: 67,
      image: '🥗',
      excerpt: 'Healthy eating doesn\'t have to be complicated. Quick meal ideas for your busy lifestyle...',
      date: '2025-11-12'
    }
  ];

  // Community posts
  const communityPosts = [
    {
      id: 1,
      author: 'Peter K.',
      avatar: '👨',
      time: '2 hours ago',
      content: 'Just completed day 12 of the hydration challenge! Feeling more energized already. Who else is on this journey?',
      likes: 23,
      comments: 8,
      category: 'Success Story'
    },
    {
      id: 2,
      author: 'Grace M.',
      avatar: '👩',
      time: '5 hours ago',
      content: 'Looking for healthy breakfast ideas that are quick to prepare. What do you eat in the mornings?',
      likes: 15,
      comments: 34,
      category: 'Question'
    },
    {
      id: 3,
      author: 'David O.',
      avatar: '👨',
      time: '1 day ago',
      content: 'Managed to walk 15,000 steps today! The key is taking short walks during lunch breaks. Keep moving everyone! 💪',
      likes: 67,
      comments: 12,
      category: 'Motivation'
    }
  ];

  // Health tips
  const dailyTips = [
    {
      icon: Droplet,
      title: 'Stay Hydrated',
      tip: 'Drink water first thing in the morning to kickstart your metabolism',
      color: 'blue'
    },
    {
      icon: Sun,
      title: 'Get Sunlight',
      tip: 'Spend 15 minutes in morning sunlight for vitamin D',
      color: 'yellow'
    },
    {
      icon: Apple,
      title: 'Eat Your Greens',
      tip: 'Include at least one serving of vegetables in every meal',
      color: 'green'
    },
    {
      icon: Activity,
      title: 'Move More',
      tip: 'Take a 5-minute walking break every hour',
      color: 'red'
    }
  ];

  const toggleLike = (articleId) => {
    if (likedArticles.includes(articleId)) {
      setLikedArticles(likedArticles.filter(id => id !== articleId));
    } else {
      setLikedArticles([...likedArticles, articleId]);
    }
  };

  const getColorClass = (color) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      indigo: 'text-indigo-600 bg-indigo-100',
      orange: 'text-orange-600 bg-orange-100',
      red: 'text-red-600 bg-red-100',
      yellow: 'text-yellow-600 bg-yellow-100'
    };
    return colors[color] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Health & Wellness</h1>
          <p className="text-gray-600 mt-2">
            Your community for health tips, support, and wellness challenges
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Community</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">My Challenges</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col items-center">
            <Flame className="w-6 h-6 text-orange-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{wellnessStats.currentStreak}</p>
            <p className="text-xs text-gray-600 text-center">Day Streak</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col items-center">
            <Star className="w-6 h-6 text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{wellnessStats.totalPoints}</p>
            <p className="text-xs text-gray-600 text-center">Points</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col items-center">
            <Trophy className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{wellnessStats.challengesCompleted}</p>
            <p className="text-xs text-gray-600 text-center">Completed</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col items-center">
            <BookOpen className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{wellnessStats.articlesRead}</p>
            <p className="text-xs text-gray-600 text-center">Articles Read</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col items-center">
            <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">#{wellnessStats.communityRank}</p>
            <p className="text-xs text-gray-600 text-center">Rank</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col items-center">
            <Target className="w-6 h-6 text-red-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{wellnessStats.weeklyGoalProgress}%</p>
            <p className="text-xs text-gray-600 text-center">Weekly Goal</p>
          </div>
        </div>
      </div>

      {/* Daily Health Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg shadow-sm border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-600" />
          Daily Health Tips
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dailyTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="bg-white p-4 rounded-lg">
                <div className={`p-2 rounded-lg w-fit mb-2 ${getColorClass(tip.color)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-medium text-gray-900 text-sm mb-1">{tip.title}</p>
                <p className="text-xs text-gray-600">{tip.tip}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {['dashboard', 'challenges', 'articles', 'community'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Challenges Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-600" />
              Active Challenges
            </h3>
            <div className="space-y-3">
              {challenges.slice(0, 3).map((challenge) => {
                const Icon = challenge.icon;
                return (
                  <div key={challenge.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${getColorClass(challenge.color)}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{challenge.title}</p>
                        <p className="text-xs text-gray-600">{challenge.daysCompleted}/{challenge.daysTotal} days</p>
                      </div>
                      <span className="text-xs font-medium text-blue-600">+{challenge.reward} pts</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-${challenge.color}-600`}
                        style={{ width: `${challenge.progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Articles */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              Trending Articles
            </h3>
            <div className="space-y-3">
              {articles.slice(0, 3).map((article) => (
                <div key={article.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{article.image}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm line-clamp-2">{article.title}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                        <span>{article.readTime}</span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {article.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Community Activity
            </h3>
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <div key={post.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{post.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">{post.author}</p>
                        <span className="text-xs text-gray-500">{post.time}</span>
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-3">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <button className="flex items-center gap-1 hover:text-blue-600">
                          <ThumbsUp className="w-4 h-4" />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-600">
                          <MessageSquare className="w-4 h-4" />
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-600">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-blue-900">How Challenges Work</h3>
                <p className="text-sm text-blue-800 mt-1">
                  Complete daily goals to earn points and maintain your streak. Points can be redeemed for health rewards and premium features.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Active Challenges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {challenges.map((challenge) => {
                const Icon = challenge.icon;
                return (
                  <div key={challenge.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${getColorClass(challenge.color)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        Active
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{challenge.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Overall Progress</span>
                          <span className="font-medium text-gray-900">{challenge.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-${challenge.color}-600`}
                            style={{ width: `${challenge.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Today's Goal: {challenge.dailyGoal}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full bg-${challenge.color}-600`}
                              style={{ width: `${(challenge.todayProgress / challenge.todayGoal) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-900">
                            {challenge.todayProgress}/{challenge.todayGoal}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {challenge.participants.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-blue-600">
                        <Award className="w-4 h-4" />
                        {challenge.reward} points
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Challenges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableChallenges.map((challenge) => {
                const Icon = challenge.icon;
                return (
                  <div key={challenge.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${getColorClass(challenge.color)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{challenge.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {challenge.participants}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {challenge.duration}
                          </span>
                          <span className="flex items-center gap-1 text-blue-600 font-medium">
                            <Award className="w-4 h-4" />
                            {challenge.reward} pts
                          </span>
                        </div>
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          Join Challenge
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Articles Tab */}
      {activeTab === 'articles' && (
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['All', 'Nutrition', 'Fitness', 'Mental Health', 'Chronic Diseases'].map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-sm whitespace-nowrap transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{article.image}</div>
                    <div className="flex-1">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {article.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 mt-2 mb-2">{article.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{article.author}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <span>{article.date}</span>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => toggleLike(article.id)}
                      className={`flex items-center gap-1 text-sm ${
                        likedArticles.includes(article.id) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 ${likedArticles.includes(article.id) ? 'fill-current' : ''}`} />
                      {article.likes + (likedArticles.includes(article.id) ? 1 : 0)}
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
                      <MessageSquare className="w-4 h-4" />
                      {article.comments}
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    <button className="ml-auto text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                      Read More
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community Tab */}
      {activeTab === 'community' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Share Your Story</h3>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="3"
              placeholder="What's on your mind? Share your wellness journey, ask questions, or motivate others..."
            ></textarea>
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  Question
                </button>
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  Success Story
                </button>
                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  Motivation
                </button>
              </div>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Post
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {communityPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{post.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-semibold text-gray-900">{post.author}</p>
                      <span className="text-sm text-gray-500">{post.time}</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                        <ThumbsUp className="w-4 h-4" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                        <MessageSquare className="w-4 h-4" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wellness;
