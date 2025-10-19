import { Shield, FileText, CreditCard, DollarSign } from 'lucide-react';

const Insurance = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Insurance & Billing</h1>
        <p className="text-gray-600 mt-2">
          Manage your insurance coverage, claims, and payment information
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We're developing an integrated insurance and billing system where you can:
          </p>
          <ul className="text-left space-y-3 mb-8">
            <li className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Link NHIF/SHA and view coverage details</span>
            </li>
            <li className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Submit and track insurance claims</span>
            </li>
            <li className="flex items-start space-x-3">
              <CreditCard className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Manage payment methods and billing history</span>
            </li>
            <li className="flex items-start space-x-3">
              <DollarSign className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">View invoices and make secure payments</span>
            </li>
          </ul>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-900">
              <strong>Stay tuned!</strong> This feature will be available soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance;
