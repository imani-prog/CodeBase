import React, { useState } from 'react';

const PatientsReview = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Jane M.",
      comment: "The booking process was simple and the staff were very supportive. Highly recommend MediLink!",
      rating: 5,
      timeAgo: "2 days ago",
      category: "Booking Experience",
      categoryColor: "blue"
    },
    {
      id: 2,
      name: "David O.",
      comment: "I got my lab results on my phone the same day. Super convenient!",
      rating: 5,
      timeAgo: "1 week ago",
      category: "Lab Services",
      categoryColor: "green"
    },
    {
      id: 3,
      name: "Fatma K.",
      comment: "The home visit service is a lifesaver for my elderly parents.",
      rating: 5,
      timeAgo: "3 days ago",
      category: "Home Visits",
      categoryColor: "purple"
    },
    {
      id: 4,
      name: "Brian T.",
      comment: "Telemedicine saved me a trip to the city hospital.",
      rating: 5,
      timeAgo: "5 days ago",
      category: "Telemedicine",
      categoryColor: "indigo"
    },
    {
      id: 5,
      name: "Lydia N.",
      comment: "I love the reminders for my medication and appointments.",
      rating: 5,
      timeAgo: "1 day ago",
      category: "App Features",
      categoryColor: "orange"
    },
    {
        id: 6,
        name: "John D.",
        comment: "The app is user-friendly and the support team is very responsive.",
        rating: 5,
        timeAgo: "2 days ago",
        category: "App Features",
        categoryColor: "orange"
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    rating: 5
  });
  
  const [showNotification, setShowNotification] = useState(false);

  const gradientColors = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600', 
    'from-pink-500 to-rose-600',
    'from-indigo-500 to-blue-600',
    'from-orange-500 to-red-600'
  ];

  const categoryColors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    orange: 'bg-orange-100 text-orange-800'
  };

  const handleSubmit = () => {
    if (formData.name.trim() && formData.comment.trim()) {
      const newReview = {
        id: Date.now(),
        name: formData.name.trim(),
        comment: formData.comment.trim(),
        rating: formData.rating,
        timeAgo: "Just now",
        category: "New Review",
        categoryColor: "green"
      };
      
      setReviews(prev => [newReview, ...prev]);
      setFormData({ name: '', comment: '', rating: 5 });
      
      // Show success notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => interactive && onStarClick && onStarClick(index + 1)}
        className={`text-xl ${interactive ? 'hover:text-yellow-300 transition-colors cursor-pointer' : ''} ${
          index < rating ? 'text-yellow-400' : interactive ? 'text-white/50' : 'text-gray-300'
        }`}
      >
        ★
      </button>
    ));
  };

  const getInitial = (name) => name.charAt(0).toUpperCase();
  const getRandomGradient = (index) => gradientColors[index % gradientColors.length];

  return (
    <section className="mb-12">
      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 transform transition-transform duration-300">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-500 text-sm">✓</span>
            </div>
            <span className="font-medium">Review submitted successfully!</span>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="text-center mb-12">
        <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Patient Reviews & Testimonials
        </h3>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Hear what our patients have to say about their experience with MediLink
        </p>
        <div className="flex items-center justify-center mt-4 space-x-2">
          <div className="flex space-x-1">
            <span className="text-yellow-400 text-2xl">★★★★★</span>
          </div>
          <span className="text-gray-700 font-semibold">4.9/5</span>
          <span className="text-gray-500">(1,234 reviews)</span>
        </div>
      </div>
      
      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <div 
              key={review.id} 
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${getRandomGradient(index)} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {getInitial(review.name)}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">{review.name}</h4>
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-gray-500 text-sm">{review.rating}.0</span>
                  </div>
                </div>
                <div className="ml-auto text-gray-400 text-sm">{review.timeAgo}</div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "{review.comment}"
              </p>
              <div className="flex items-center text-sm">
                <span className={`px-2 py-1 rounded-full ${categoryColors[review.categoryColor] || categoryColors.green}`}>
                  {review.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add Review Form */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-32 h-32 bg-white rounded-full -top-8 -right-8 absolute"></div>
            <div className="w-24 h-24 bg-white rounded-full top-20 -left-4 absolute"></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold mb-2">Share Your Experience</h4>
              <p className="text-blue-100">Help others by sharing your experience with MediLink</p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-blue-100">Your Name</div>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-blue-100">Rating</div>
                  <div className="flex space-x-1">
                    {renderStars(formData.rating, true, (rating) => 
                      setFormData(prev => ({ ...prev, rating }))
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-blue-100">Your Review</div>
                <textarea 
                  placeholder="Tell us about your experience..." 
                  rows="4"
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 resize-none" 
                />
              </div>
              
              <div className="text-center">
                <button 
                  onClick={handleSubmit} 
                  className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientsReview;