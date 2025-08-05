import { useState } from 'react';

const PatientsReview = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Jane M.",
      comment: "The booking process was simple and the staff were very supportive. Highly recommend MediLink!",
      rating: 5,
      timeAgo: "2 days ago",
      category: "Booking Experience",
      categoryColor: "blue",
      likes: 20
    },
    {
      id: 2,
      name: "David O.",
      comment: "I got my lab results on my phone the same day. Super convenient!",
      rating: 5,
      timeAgo: "1 week ago",
      category: "Lab Services",
      categoryColor: "green",
      likes: 12
    },
    {
      id: 3,
      name: "Fatma K.",
      comment: "The home visit service is a lifesaver for my elderly parents.",
      rating: 5,
      timeAgo: "3 days ago",
      category: "Home Visits",
      categoryColor: "purple",
      likes: 8
    },
    {
      id: 4,
      name: "Brian T.",
      comment: "Telemedicine saved me a trip to the city hospital.",
      rating: 5,
      timeAgo: "5 days ago",
      category: "Telemedicine",
      categoryColor: "indigo",
      likes: 15
    },
    {
      id: 5,
      name: "Lydia N.",
      comment: "I love the reminders for my medication and appointments.",
      rating: 5,
      timeAgo: "1 day ago",
      category: "App Features",
      categoryColor: "orange",
      likes: 10
    },
    {
      id: 6,
      name: "John D.",
      comment: "The app is user-friendly and the support team is very responsive.",
      rating: 5,
      timeAgo: "2 days ago",
      category: "App Features",
      categoryColor: "orange",
      likes: 5
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    rating: 5
  });
  
  const [showNotification, setShowNotification] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
        categoryColor: "green",
        likes: 0
      };
      setReviews(prev => [newReview, ...prev]);
      setFormData({ name: '', comment: '', rating: 5 });
      setShowNotification(true);
      setShowForm(false);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleLike = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
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
    <section className="mb-0 px-2 md:px-6">
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
        <h3 className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-blue-900 mb-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {reviews.map((review, index) => (
            <div 
              key={review.id} 
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[220px] flex flex-col justify-between"
              style={{ minWidth: '260px', maxWidth: '340px' }}
            >
              <div className="flex items-center mb-2">
                <div className={`w-10 h-10 bg-gradient-to-r ${getRandomGradient(index)} rounded-full flex items-center justify-center text-white font-bold text-base`}>
                  {getInitial(review.name)}
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-800 text-base">{review.name}</h4>
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-gray-500 text-xs">{review.rating}.0</span>
                  </div>
                </div>
                <div className="ml-auto text-gray-400 text-xs">{review.timeAgo}</div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-2 text-sm">
                "{review.comment}"
              </p>
              <div className="flex items-center text-xs mb-2">
                <span className={`px-2 py-1 rounded-full ${categoryColors[review.categoryColor] || categoryColors.green}`}>
                  {review.category}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <button
                  className={`flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors text-sm px-2 py-1 rounded-full border border-gray-200 bg-gray-50`}
                  onClick={() => handleLike(review.id)}
                  aria-label="Like review"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 122.88 113.41">
                    <path fill="#065fd4" d="M4.29,47.64h19.3A4.31,4.31,0,0,1,27.88,52V109.1a4.31,4.31,0,0,1-4.29,4.31H4.29A4.31,4.31,0,0,1,0,109.1V52a4.31,4.31,0,0,1,4.29-4.31ZM59,4.77c2.27-11.48,21.07-.91,22.31,17.6A79.82,79.82,0,0,1,79.68,42h26.87c11.17.44,20.92,8.44,14,21.58,1.57,5.72,1.81,12.44-2.45,15.09.53,9-2,14.64-6.65,19.06-.31,4.52-1.27,8.53-3.45,11.62-3.61,5.09-6.54,3.88-12.22,3.88H50.45c-7.19,0-11.11-2-15.81-7.88V54.81C48.16,51.16,55.35,32.66,59,20.51V4.77Z"/>
                  </svg>
                  <span>{review.likes}</span>
                </button>
                <span className="text-gray-400 text-xs">{review.likes} people found this helpful</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/*Review Button & Conditional*/}
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="text-blue-700 border border-blue-300 px-4 py-2 rounded-lg font-bold text-base hover:bg-blue-100 hover:text-blue-900 transition-all duration-200"
              >
                Share Your Experience
              </button>
            )}
            <button
              className="text-blue-700 border border-blue-300 px-4 py-2 rounded-lg font-bold text-base hover:bg-blue-100 hover:text-blue-900 transition-all duration-200"
              onClick={() => window.location.href = '/register-patient'}
            >
              Register as a Patient
            </button>
            {/* Extra Feature: Quick Links */}
            <div className="hidden md:flex flex-col gap-2">
              <a href="/frequent-questions" className="text-blue-700 font-semibold hover:underline">FAQs</a>
              <a href="/contact" className="text-blue-700 font-semibold hover:underline">Contact Support</a>
              <a href="/services/patients" className="text-blue-700 font-semibold hover:underline">Patient Services</a>
            </div>
          </div>
          {showForm && (
            <div className="relative w-full max-w-lg mb-8">
              <div className="bg-blue-50 rounded-2xl p-6 shadow-md">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-blue-600 text-xl font-bold focus:outline-none"
                  aria-label="Close form"
                >
                  ×
                </button>
                <div className="text-left mb-6">
                  <h4 className="text-xl font-bold mb-1 text-gray-800">Share Your Experience</h4>
                  <p className="text-gray-500">Help others by sharing your experience with MediLink</p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-700">Your Name</div>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-700">Rating</div>
                      <div className="flex space-x-1">
                        {renderStars(formData.rating, true, (rating) =>
                          setFormData(prev => ({ ...prev, rating }))
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-gray-700">Your Review</div>
                      <textarea
                        placeholder="Tell us about your experience..."
                        rows="4"
                        value={formData.comment}
                        onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all duration-300 resize-none"
                      />
                    </div>
                    <div className="text-left">
                      <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/*Info Card for Patients */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 ">
            <div className="p-6 flex-1 max-w-md">
              <h5 className="text-lg font-bold text-blue-800 mb-2">Why Join MediLink?</h5>
              <ul className="list-none space-y-3 text-gray-700 text-base mb-2">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Access affordable healthcare from anywhere</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Book appointments and get reminders easily</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Connect with doctors and specialists online</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Track your health records securely</span>
                </li>
              </ul>
              <p className="text-blue-600 italic">"Empowering patients for a healthier tomorrow."</p>
            </div>
            <div className="p-6 flex-1 max-w-md">
              <h5 className="text-lg font-bold text-blue-800 mb-2">Need Help?</h5>
              <ul className="list-none space-y-3 text-gray-700 text-base mb-2">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Visit our <a href="/frequent-questions" className="text-blue-700 hover:underline">FAQ</a> page</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Contact our support team for assistance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Explore patient resources and guides</span>
                </li>
              </ul>
              <p className="text-blue-600 italic">"We're here for you every step of the way."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientsReview;