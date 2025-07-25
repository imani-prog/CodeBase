import React, { useState } from 'react';
import { MessageCircle, ChevronRight, ChevronDown, Heart, Reply, Clock, User } from 'lucide-react';

const CommunityDiscussions = () => {
  const [expandedThread, setExpandedThread] = useState(null);
  const [likes, setLikes] = useState({});
  const [newReplies, setNewReplies] = useState({});

  // discussion data
  const discussions = [
    {
      id: 1,
      topic: "CHW Training Best Practices",
      replies: 23,
      lastActive: "2 hours ago",
      author: "Dr. Sarah Chen",
      initialPost: "What are the most effective training methodologies you've implemented for Community Health Workers? I'm particularly interested in digital training approaches.",
      conversations: [
        {
          id: 1,
          author: "Marcus Johnson",
          avatar: "MJ",
          content: "We've had great success with mobile-based microlearning modules. Breaking down complex topics into 5-minute sessions really improves retention.",
          timestamp: "3 hours ago",
          likes: 12
        },
        {
          id: 2,
          author: "Dr. Amina Hassan",
          avatar: "AH",
          content: "Peer-to-peer learning has been game-changing for us. CHWs teaching other CHWs creates a more supportive environment.",
          timestamp: "2 hours ago",
          likes: 8
        },
        {
          id: 3,
          author: "James Williams",
          avatar: "JW",
          content: "We combine traditional face-to-face with WhatsApp groups for ongoing support. The instant messaging helps with real-time problem solving.",
          timestamp: "1 hour ago",
          likes: 15
        }
      ]
    },
    {
      id: 2,
      topic: "Digital Health Implementation Challenges",
      replies: 18,
      lastActive: "4 hours ago",
      author: "Prof. Michael Roberts",
      initialPost: "We're facing significant resistance to digital health tools in rural communities. What strategies have worked for you in overcoming technology adoption barriers?",
      conversations: [
        {
          id: 4,
          author: "Grace Okonkwo",
          avatar: "GO",
          content: "Start with the community leaders. Once they see the benefits and become advocates, adoption rates increase dramatically.",
          timestamp: "5 hours ago",
          likes: 22
        },
        {
          id: 5,
          author: "Dr. Kumar Patel",
          avatar: "KP",
          content: "We found success with a gradual rollout approach. Begin with the most tech-savvy CHWs and let them become internal champions.",
          timestamp: "4 hours ago",
          likes: 16
        }
      ]
    },
    {
      id: 3,
      topic: "Maternal Health Success Stories",
      replies: 31,
      lastActive: "6 hours ago",
      author: "Nurse Mary Kiprotich",
      initialPost: "Sharing some inspiring outcomes from our maternal health program. Would love to hear your success stories too!",
      conversations: [
        {
          id: 6,
          author: "Dr. Elizabeth Nakamura",
          avatar: "EN",
          content: "Our mobile prenatal screening program reduced maternal mortality by 40% in the target region. Early detection is everything!",
          timestamp: "8 hours ago",
          likes: 45
        },
        {
          id: 7,
          author: "Fatima Al-Rashid",
          avatar: "FR",
          content: "We implemented a text message reminder system for prenatal appointments. Attendance increased from 60% to 85%!",
          timestamp: "7 hours ago",
          likes: 38
        },
        {
          id: 8,
          author: "Dr. Robert Kim",
          avatar: "RK",
          content: "Community birth attendant training with emergency protocols has been life-changing. We've prevented 12 emergency situations this quarter.",
          timestamp: "6 hours ago",
          likes: 41
        }
      ]
    }
  ];

  const toggleThread = (threadId) => {
    setExpandedThread(expandedThread === threadId ? null : threadId);
  };

  const handleLike = (conversationId) => {
    setLikes(prev => ({
      ...prev,
      [conversationId]: !prev[conversationId]
    }));
  };

  const handleNewReply = (threadId, content) => {
    if (content.trim()) {
      const newReply = {
        id: Date.now(),
        author: "You",
        avatar: "YU",
        content: content,
        timestamp: "Just now",
        likes: 0
      };
      
      console.log('New reply added:', newReply);
      setNewReplies(prev => ({ ...prev, [threadId]: '' }));
    }
  };

  const getAvatarColor = (author) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-teal-500'
    ];
    return colors[author.length % colors.length];
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center">
        <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
        Community Discussions
      </h3>
      
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <div key={discussion.id} className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Discussion Header */}
            <div 
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => toggleThread(discussion.id)}
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{discussion.topic}</h4>
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <span>{discussion.replies} replies</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {discussion.lastActive}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {discussion.author}
                  </span>
                </div>
              </div>
              {expandedThread === discussion.id ? 
                <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                <ChevronRight className="w-5 h-5 text-gray-400" />
              }
            </div>

            {/* Thread Content */}
            {expandedThread === discussion.id && (
              <div className="bg-white">
                {/* Initial Post */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 ${getAvatarColor(discussion.author)} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                      {discussion.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">{discussion.author}</span>
                        <span className="text-sm text-gray-500">Original Post</span>
                      </div>
                      <p className="text-gray-700">{discussion.initialPost}</p>
                    </div>
                  </div>
                </div>

                {/* Conversation Replies */}
                <div className="max-h-96 overflow-y-auto">
                  {discussion.conversations.map((message) => (
                    <div key={message.id} className="p-4 border-b border-gray-50 hover:bg-gray-25 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 ${getAvatarColor(message.author)} rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
                          {message.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-semibold text-gray-900">{message.author}</span>
                            <span className="text-sm text-gray-500">{message.timestamp}</span>
                          </div>
                          <p className="text-gray-700 mb-3">{message.content}</p>
                          
                          {/* Like and Reply Actions */}
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleLike(message.id)}
                              className={`flex items-center space-x-1 text-sm transition-colors ${
                                likes[message.id] 
                                  ? 'text-blue-500 hover:text-blue-600' 
                                  : 'text-blue-500 hover:text-blue-500'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${likes[message.id] ? 'fill-current' : ''}`} />
                              <span>{message.likes + (likes[message.id] ? 1 : 0)}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                              <Reply className="w-4 h-4" />
                              <span>Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Reply Input */}
                <div className="p-4 bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      YU
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newReplies[discussion.id] || ''}
                        onChange={(e) => setNewReplies(prev => ({ ...prev, [discussion.id]: e.target.value }))}
                        placeholder="Share your thoughts or experiences..."
                        className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => handleNewReply(discussion.id, newReplies[discussion.id])}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          Post Reply
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

      {/* View All Discussions Link */}
      <div className="mt-6 text-center">
        <button className="text-blue-500 hover:text-blue-600 font-medium transition-colors">
          View All Discussions →
        </button>
      </div>
    </div>
  );
};

export default CommunityDiscussions;