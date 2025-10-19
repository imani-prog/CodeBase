import { Pill, Package, MapPin, Bell } from 'lucide-react';

const Prescriptions = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Prescriptions</h1>
        <p className="text-gray-600 mt-2">
          Manage your medications, refills, and delivery tracking
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Pill className="w-10 h-10 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We're building a complete prescription management system where you can:
          </p>
          <ul className="text-left space-y-3 mb-8">
            <li className="flex items-start space-x-3">
              <Pill className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">View all active medications and dosages</span>
            </li>
            <li className="flex items-start space-x-3">
              <Package className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Request refills and track delivery status</span>
            </li>
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Find nearby pharmacies and compare prices</span>
            </li>
            <li className="flex items-start space-x-3">
              <Bell className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Set medication reminders and check interactions</span>
            </li>
          </ul>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-900">
              <strong>Stay tuned!</strong> This feature will be available soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;
