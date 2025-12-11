import { useState } from 'react';
import { 
  FileText, Download, Share2, Calendar, Activity, 
  File, Upload, Filter, Search, ChevronDown, ChevronUp,
  AlertCircle, CheckCircle, Clock, Pill, Paperclip,
  Image, FileCheck, Folder, TrendingUp, Eye
} from 'lucide-react';

const HealthRecords = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [filterType, setFilterType] = useState('all');

  // Sample health data - replace with actual API data
  // Documents uploaded by healthcare providers or patients
  const uploadedDocuments = [
    { 
      id: 1, 
      name: 'Medical Certificate', 
      type: 'Medical Document', 
      uploadedBy: 'Dr. Sarah Johnson',
      date: '2025-11-20', 
      size: '0.8 MB',
      category: 'report',
      icon: FileCheck,
      color: 'blue'
    },
    { 
      id: 2, 
      name: 'Consultation Notes', 
      type: 'Medical Report', 
      uploadedBy: 'Dr. Sarah Johnson',
      date: '2025-11-18', 
      size: '0.5 MB',
      category: 'report',
      icon: FileText,
      color: 'blue'
    },
    { 
      id: 3, 
      name: 'Prescription - Cetirizine', 
      type: 'Prescription', 
      uploadedBy: 'Dr. Sarah Johnson',
      date: '2025-10-15', 
      size: '0.3 MB',
      category: 'prescription',
      icon: Pill,
      color: 'blue'
    },
    { 
      id: 4, 
      name: 'Vaccination Record Card', 
      type: 'Vaccination Record', 
      uploadedBy: 'Patient Upload',
      date: '2025-10-01', 
      size: '1.2 MB',
      category: 'vaccination',
      icon: File,
      color: 'blue'
    },
    { 
      id: 5, 
      name: 'Insurance Card Copy', 
      type: 'Insurance Document', 
      uploadedBy: 'Patient Upload',
      date: '2025-09-15', 
      size: '0.6 MB',
      category: 'insurance',
      icon: FileText,
      color: 'blue'
    },
  ];

  const healthSummary = [
    {
      id: 1,
      category: 'Allergies',
      items: ['Pollen', 'Dust mites'],
      severity: 'Moderate',
      icon: AlertCircle,
      color: 'blue'
    },
    {
      id: 2,
      category: 'Chronic Conditions',
      items: ['None reported'],
      severity: 'N/A',
      icon: CheckCircle,
      color: 'blue'
    },
    {
      id: 3,
      category: 'Blood Type',
      items: ['O Positive'],
      severity: 'N/A',
      icon: Activity,
      color: 'blue'
    },
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
      type: 'Vaccination',
      provider: 'Community Health Worker',
      vaccine: 'Tetanus Booster',
      notes: 'Vaccination administered at community health outreach.',
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
          <h1 className="text-2xl sm:text-3xl font-bold">Health Records</h1>
          <p className="mt-2">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Total Records</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">24</p>
            </div>
            <FileText className="w-7 h-7 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Active Prescriptions</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{prescriptions.filter(p => p.status === 'active').length}</p>
            </div>
            <Pill className="w-7 h-7 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Upcoming Vaccinations</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{upcomingVaccinations.length}</p>
            </div>
            <Calendar className="w-7 h-7 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Last Checkup</p>
              <p className="text-xs font-semibold text-gray-900 mt-0.5">Oct 15, 2025</p>
            </div>
            <CheckCircle className="w-7 h-7 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {['overview', 'documents', 'medical-history', 'prescriptions'].map((tab) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Recent Documents */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Folder className="w-4 h-4 text-blue-600" />
              Recent Documents
            </h3>
            <div className="space-y-2">
              {uploadedDocuments.slice(0, 3).map((doc) => {
                const Icon = doc.icon;
                return (
                  <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 ${doc.color} rounded`}>
                        <Icon className={`w-4 h-4 text-${doc.color}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                        <p className="text-xs text-gray-600">{doc.type} • {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{doc.size}</span>
                      <Download className="w-3.5 h-3.5 text-gray-400 hover:text-blue-600" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Health Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Health Summary
            </h3>
            <div className="space-y-2">
              {healthSummary.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className={`p-1.5 ${item.color} rounded flex-shrink-0`}>
                        <Icon className={`w-4 h-4 text-${item.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-0.5">
                          <p className="text-sm font-medium text-gray-900">{item.category}</p>
                          {item.severity !== 'N/A' && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                              {item.severity}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{item.items.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Prescriptions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Pill className="w-4 h-4 text-blue-600" />
              Active Prescriptions
            </h3>
            <div className="space-y-2">
              {prescriptions.filter(p => p.status === 'active').map((prescription) => (
                <div key={prescription.id} className="p-2 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{prescription.medication}</p>
                      <p className="text-xs text-gray-600">{prescription.dosage} - {prescription.frequency}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(prescription.status)}`}>
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Refills remaining: {prescription.refills}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Vaccinations */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Upcoming Vaccinations
            </h3>
            <div className="space-y-2">
              {upcomingVaccinations.map((vaccination, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{vaccination.name}</p>
                    <p className="text-xs text-gray-600">Due: {vaccination.dueDate}</p>
                  </div>
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Medical History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Recent Medical History
            </h3>
            <div className="space-y-2">
              {medicalHistory.slice(0, 2).map((record) => (
                <div key={record.id} className="p-2 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{record.type}</p>
                      <p className="text-xs text-gray-600">{record.provider}</p>
                    </div>
                    <p className="text-xs text-gray-500">{record.date}</p>
                  </div>
                  <p className="text-xs text-gray-700">
                    {record.diagnosis || record.testName || record.vaccine}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">My Documents</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>
            
            {/* Filter by category */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['all', 'report', 'prescription', 'vaccination', 'insurance'].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    filterType === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setFilterType(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {uploadedDocuments
                .filter(doc => filterType === 'all' || doc.category === filterType)
                .map((doc) => {
                const Icon = doc.icon;
                return (
                  <div key={doc.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-2 ${doc.color} rounded`}>
                        <Icon className={`w-4 h-4 text-${doc.color}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 truncate">{doc.name}</h4>
                        <p className="text-xs text-gray-500">{doc.type}</p>
                      </div>
                    </div>
                    <div className="space-y-1 mb-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">By:</span>
                        <span className="font-medium text-gray-700 truncate ml-2">{doc.uploadedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date:</span>
                        <span className="text-gray-700">{doc.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Size:</span>
                        <span className="text-gray-700">{doc.size}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 pt-2 border-t border-gray-100">
                      <button className="flex items-center justify-center gap-1 px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                      <button className="flex items-center justify-center px-2 py-1.5 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                        <Download className="w-3 h-3" />
                      </button>
                      <button className="flex items-center justify-center px-2 py-1.5 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                        <Share2 className="w-3 h-3" />
                      </button>
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
                <option value="Vaccination">Vaccinations</option>
                <option value="Referral">Referrals</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {medicalHistory.map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleRecord(record.id)}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded flex-shrink-0">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{record.type}</p>
                        </div>
                        {expandedRecord === record.id ? (
                          <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-xs text-gray-600 truncate">{record.provider} {record.specialty && `- ${record.specialty}`}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{record.date}</div>
                    </div>
                  </div>
                  {expandedRecord === record.id && (
                    <div className="p-3 bg-white border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        {record.diagnosis && (
                          <div>
                            <p className="text-xs font-medium text-gray-700">Diagnosis</p>
                            <p className="text-sm text-gray-900">{record.diagnosis}</p>
                          </div>
                        )}
                        {record.vaccine && (
                          <div>
                            <p className="text-xs font-medium text-gray-700">Vaccine</p>
                            <p className="text-sm text-gray-900">{record.vaccine}</p>
                          </div>
                        )}
                      </div>
                      {record.notes && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Notes</p>
                          <p className="text-sm text-gray-600">{record.notes}</p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                          <Download className="w-3.5 h-3.5" />
                          Download
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                          <Share2 className="w-3.5 h-3.5" />
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
        <div className="rounded-lg border border-gray-200">
          <div className="p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Current Prescriptions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {prescriptions.map((prescription) => (
                <div key={prescription.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <div className="p-1.5 rounded flex-shrink-0">
                        <Pill className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{prescription.medication}</h4>
                        <p className="text-xs text-gray-600">{prescription.dosage} - {prescription.frequency}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${getStatusColor(prescription.status)}`}>
                      {prescription.status}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs mb-2">
                    <div>
                      <p className="text-gray-500">Prescribed By</p>
                      <p className="font-medium text-gray-900 truncate">{prescription.prescribedBy}</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <p className="text-gray-500">Start Date</p>
                        <p className="font-medium text-gray-900">{prescription.startDate}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-500">Duration</p>
                        <p className="font-medium text-gray-900">{prescription.duration}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">{prescription.refills}</span> refills left
                    </p>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
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
