import { useState } from 'react';
import { 
  FileText, Download, Share2, Calendar, Activity, 
  Heart, Thermometer, Droplet, Weight, Eye, 
  Upload, Filter, Search, ChevronDown, ChevronUp,
  AlertCircle, CheckCircle, Clock, Pill
} from 'lucide-react';

const HealthRecords = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [filterType, setFilterType] = useState('all');

  // Sample health data - replace with actual API data
  const vitalSigns = [
    { id: 1, type: 'Blood Pressure', value: '120/80', unit: 'mmHg', date: '2025-11-20', status: 'normal', icon: Heart, color: 'green' },
    { id: 2, type: 'Heart Rate', value: '72', unit: 'bpm', date: '2025-11-20', status: 'normal', icon: Activity, color: 'green' },
    { id: 3, type: 'Temperature', value: '36.8', unit: '°C', date: '2025-11-20', status: 'normal', icon: Thermometer, color: 'green' },
    { id: 4, type: 'Weight', value: '70', unit: 'kg', date: '2025-11-15', status: 'normal', icon: Weight, color: 'green' },
    { id: 5, type: 'Blood Sugar', value: '95', unit: 'mg/dL', date: '2025-11-18', status: 'normal', icon: Droplet, color: 'green' },
  ];

  const medicalHistory = [
    {
      id: 1,
      date: '2025-10-15',
      type: 'Consultation',
      provider: 'Dr. Sarah Johnson',
      specialty: 'General Practitioner',
      diagnosis: 'Seasonal Allergies',
      notes: 'Patient presented with mild respiratory symptoms. Prescribed antihistamines.',
      status: 'completed'
    },
    {
      id: 2,
      date: '2025-09-08',
      type: 'Lab Test',
      provider: 'MediLink Laboratory',
      testName: 'Complete Blood Count',
      result: 'All values within normal range',
      status: 'completed'
    },
    {
      id: 3,
      date: '2025-08-22',
      type: 'Vaccination',
      provider: 'Dr. Michael Brown',
      vaccine: 'Influenza Vaccine',
      notes: 'Annual flu shot administered. No adverse reactions.',
      status: 'completed'
    },
  ];

  const prescriptions = [
    {
      id: 1,
      medication: 'Cetirizine',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: '2025-10-15',
      duration: '30 days',
      status: 'active',
      refills: 2
    },
    {
      id: 2,
      medication: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: '2025-09-01',
      duration: '90 days',
      status: 'active',
      refills: 1
    },
  ];

  const upcomingVaccinations = [
    { name: 'Tetanus Booster', dueDate: '2026-03-15', status: 'upcoming' },
    { name: 'COVID-19 Booster', dueDate: '2026-05-20', status: 'upcoming' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      case 'active': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const toggleRecord = (id) => {
    setExpandedRecord(expandedRecord === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Health Records</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive view of your medical history, lab results, and vital signs
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export All</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Records</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Prescriptions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{prescriptions.filter(p => p.status === 'active').length}</p>
            </div>
            <Pill className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming Vaccinations</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{upcomingVaccinations.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last Checkup</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">Oct 15, 2025</p>
            </div>
            <CheckCircle className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {['overview', 'vital-signs', 'medical-history', 'prescriptions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Vital Signs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Recent Vital Signs
            </h3>
            <div className="space-y-3">
              {vitalSigns.slice(0, 3).map((vital) => {
                const Icon = vital.icon;
                return (
                  <div key={vital.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 text-${vital.color}-600`} />
                      <div>
                        <p className="font-medium text-gray-900">{vital.type}</p>
                        <p className="text-sm text-gray-600">{vital.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{vital.value} {vital.unit}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(vital.status)}`}>
                        {vital.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Prescriptions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Pill className="w-5 h-5 text-green-600" />
              Active Prescriptions
            </h3>
            <div className="space-y-3">
              {prescriptions.filter(p => p.status === 'active').map((prescription) => (
                <div key={prescription.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{prescription.medication}</p>
                      <p className="text-sm text-gray-600">{prescription.dosage} - {prescription.frequency}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(prescription.status)}`}>
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Refills remaining: {prescription.refills}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Vaccinations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Upcoming Vaccinations
            </h3>
            <div className="space-y-3">
              {upcomingVaccinations.map((vaccination, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{vaccination.name}</p>
                    <p className="text-sm text-gray-600">Due: {vaccination.dueDate}</p>
                  </div>
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Medical History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" />
              Recent Medical History
            </h3>
            <div className="space-y-3">
              {medicalHistory.slice(0, 2).map((record) => (
                <div key={record.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{record.type}</p>
                      <p className="text-sm text-gray-600">{record.provider}</p>
                    </div>
                    <p className="text-xs text-gray-500">{record.date}</p>
                  </div>
                  <p className="text-sm text-gray-700">
                    {record.diagnosis || record.testName || record.vaccine}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vital Signs Tab */}
      {activeTab === 'vital-signs' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vitalSigns.map((vital) => {
                const Icon = vital.icon;
                return (
                  <div key={vital.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-${vital.color}-100 rounded-lg`}>
                          <Icon className={`w-5 h-5 text-${vital.color}-600`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{vital.type}</p>
                          <p className="text-xs text-gray-500">{vital.date}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(vital.status)}`}>
                        {vital.status}
                      </span>
                    </div>
                    <div className="text-center py-2">
                      <p className="text-3xl font-bold text-gray-900">{vital.value}</p>
                      <p className="text-sm text-gray-600">{vital.unit}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Medical History Tab */}
      {activeTab === 'medical-history' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medical records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Records</option>
                <option value="Consultation">Consultations</option>
                <option value="Lab Test">Lab Tests</option>
                <option value="Vaccination">Vaccinations</option>
              </select>
            </div>

            <div className="space-y-4">
              {medicalHistory.map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleRecord(record.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{record.type}</p>
                          <p className="text-sm text-gray-600">{record.provider} {record.specialty && `- ${record.specialty}`}</p>
                          <p className="text-xs text-gray-500 mt-1">{record.date}</p>
                        </div>
                      </div>
                      {expandedRecord === record.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {expandedRecord === record.id && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {record.diagnosis && (
                          <div>
                            <p className="text-sm font-medium text-gray-700">Diagnosis</p>
                            <p className="text-gray-900">{record.diagnosis}</p>
                          </div>
                        )}
                        {record.testName && (
                          <div>
                            <p className="text-sm font-medium text-gray-700">Test Name</p>
                            <p className="text-gray-900">{record.testName}</p>
                          </div>
                        )}
                        {record.result && (
                          <div>
                            <p className="text-sm font-medium text-gray-700">Result</p>
                            <p className="text-gray-900">{record.result}</p>
                          </div>
                        )}
                        {record.vaccine && (
                          <div>
                            <p className="text-sm font-medium text-gray-700">Vaccine</p>
                            <p className="text-gray-900">{record.vaccine}</p>
                          </div>
                        )}
                      </div>
                      {record.notes && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
                          <p className="text-gray-600">{record.notes}</p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Prescriptions Tab */}
      {activeTab === 'prescriptions' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Current Prescriptions</h3>
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Pill className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{prescription.medication}</h4>
                        <p className="text-gray-600">{prescription.dosage} - {prescription.frequency}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(prescription.status)}`}>
                      {prescription.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Prescribed By</p>
                      <p className="font-medium text-gray-900">{prescription.prescribedBy}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Start Date</p>
                      <p className="font-medium text-gray-900">{prescription.startDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-medium text-gray-900">{prescription.duration}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{prescription.refills}</span> refills remaining
                    </p>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Request Refill
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthRecords;
