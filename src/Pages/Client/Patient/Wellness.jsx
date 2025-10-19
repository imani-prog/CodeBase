import { Heart, MessageCircle, Trophy, BookOpen } from 'lucide-react';

const Wellness = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Health & Wellness</h1>
        <p className="text-gray-600 mt-2">
          Your community for health tips, support, and wellness challenges
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We're creating a vibrant wellness community where you can:
          </p>
          <ul className="text-left space-y-3 mb-8">
            <li className="flex items-start space-x-3">
              <BookOpen className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Access personalized health tips and articles</span>
            </li>
            <li className="flex items-start space-x-3">
              <MessageCircle className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Join community forums and peer support groups</span>
            </li>
            <li className="flex items-start space-x-3">
              <Trophy className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Participate in wellness challenges and earn rewards</span>
            </li>
            <li className="flex items-start space-x-3">
              <Heart className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Track your wellness journey and set health goals</span>
            </li>
          </ul>
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
            <p className="text-sm text-pink-900">
              <strong>Stay tuned!</strong> This feature will be available soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wellness;
