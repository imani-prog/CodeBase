import { FileText, Download, Share2, Calendar, Activity } from 'lucide-react';

const HealthRecords = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Health Records</h1>
        <p className="text-gray-600 mt-2">
          View and manage your medical history, lab results, and vital signs
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We're working on bringing you a comprehensive health records system where you can:
          </p>
          <ul className="text-left space-y-3 mb-8">
            <li className="flex items-start space-x-3">
              <Activity className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">View your complete medical history timeline</span>
            </li>
            <li className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Access lab results and test reports</span>
            </li>
            <li className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Track vaccination records and vital signs</span>
            </li>
            <li className="flex items-start space-x-3">
              <Download className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Download and share medical records securely</span>
            </li>
          </ul>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Stay tuned!</strong> This feature will be available soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
