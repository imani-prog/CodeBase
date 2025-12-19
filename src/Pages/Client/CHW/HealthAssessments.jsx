import { useState } from 'react';
import {
  Activity,
  Heart,
  Thermometer,
  Droplet,
  Wind,
  Scale,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  FileText,
  Eye,
  Download
} from 'lucide-react';

const HealthAssessments = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample assessments data
  const assessments = {
    recent: [
      {
        id: 1,
        patientName: 'Sarah Wanjiru',
        patientId: 'PT-2023-001',
        date: '2024-10-24',
        type: 'Blood Pressure & Vitals',
        metrics: {
          bloodPressure: { systolic: 135, diastolic: 85, status: 'elevated' },
          heartRate: { value: 78, status: 'normal' },
          temperature: { value: 98.4, status: 'normal' },
          oxygenSaturation: { value: 98, status: 'normal' }
        },
        notes: 'Blood pressure slightly elevated. Recommend monitoring and lifestyle modifications.'
      },
      {
        id: 2,
        patientName: 'John Kamau',
        patientId: 'PT-2023-045',
        date: '2024-10-23',
        type: 'Diabetes Screening',
        metrics: {
          bloodGlucose: { value: 145, status: 'elevated' },
          weight: { value: 82, status: 'normal' },
          bmi: { value: 27.5, status: 'overweight' }
        },
        notes: 'Blood glucose elevated. Recommend dietary counseling and follow-up testing.'
      },
      {
        id: 3,
        patientName: 'Mary Njoki',
        patientId: 'PT-2023-089',
        date: '2024-10-22',
        type: 'Prenatal Assessment',
        metrics: {
          bloodPressure: { systolic: 118, diastolic: 75, status: 'normal' },
          weight: { value: 68, status: 'normal' },
          fetalHeartRate: { value: 145, status: 'normal' }
        },
        notes: 'Mother and baby doing well. Continue prenatal vitamins and schedule next checkup.'
      },
      {
        id: 4,
        patientName: 'Grace Akinyi',
        patientId: 'PT-2023-156',
        date: '2024-10-21',
        type: 'Nutrition Assessment',
        metrics: {
          weight: { value: 52, status: 'underweight' },
          bmi: { value: 17.8, status: 'underweight' },
          hemoglobin: { value: 10.2, status: 'low' }
        },
        notes: 'Patient showing signs of malnutrition. Initiated nutritional support program.'
      }
    ],
    scheduled: [
      {
        id: 5,
        patientName: 'Peter Ochieng',
        patientId: 'PT-2023-112',
        scheduledDate: '2024-10-26',
        scheduledTime: '10:00 AM',
        type: 'General Health Checkup',
        reason: 'Annual health assessment'
      },
      {
        id: 6,
        patientName: 'David Mwangi',
        patientId: 'PT-2023-201',
        scheduledDate: '2024-10-27',
        scheduledTime: '2:00 PM',
        type: 'Mental Health Screening',
        reason: 'Follow-up assessment for depression screening'
      }
    ]
  };

  const stats = [
    { label: 'Assessments This Month', value: '28', color: 'blue', icon: FileText },
    { label: 'Scheduled', value: '6', color: 'blue', icon: Calendar },
    { label: 'High Risk Identified', value: '3', color: 'blue', icon: Activity },
    { label: 'Follow-ups Needed', value: '5', color: 'blue', icon: TrendingUp }
  ];

  const tabs = [
    { id: 'recent', label: 'Recent Assessments', count: assessments.recent.length },
    { id: 'scheduled', label: 'Scheduled', count: assessments.scheduled.length }
  ];

  const assessmentTypes = [
    { name: 'Blood Pressure & Vitals', icon: Heart, color: 'blue' },
    { name: 'Diabetes Screening', icon: Droplet, color: 'blue' },
    { name: 'Prenatal Assessment', icon: Activity, color: 'blue' },
    { name: 'Nutrition Assessment', icon: Scale, color: 'blue' },
    { name: 'Mental Health Screening', icon: User, color: 'blue' },
    { name: 'General Health Checkup', icon: FileText, color: 'blue' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'elevated':
      case 'high':
        return 'text-red-600';
      case 'low':
      case 'underweight':
        return 'text-orange-600';
      case 'overweight':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'elevated':
      case 'high':
        return 'text-red-800';
      case 'low':
      case 'underweight':
        return 'text-orange-800';
      case 'overweight':
        return 'text-yellow-800';
      default:
        return 'text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Health Assessments</h1>
          <p className="mt-2">
            Track patient health assessments and screenings
          </p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md">
          <Plus className="w-5 h-5" />
          <span>New Assessment</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-8 h-8 text-${stat.color}-600`} />
              </div>
              <p className={`text-3xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</p>
              <p className="">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Assessment Types */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Assessment Types</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {assessmentTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.name}
                className={`flex flex-col items-center p-4 rounded-lg border border-${type.color}-200 hover:border-${type.color}-400 hover:bg-${type.color}-50 transition-all`}
              >
                <Icon className={`w-8 h-8 text-${type.color}-600 mb-2`} />
                <span className="text-center font-medium">{type.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            <span>Filter by Type</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Assessments */}
      {activeTab === 'recent' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {assessments.recent.map((assessment) => (
            <div
              key={assessment.id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow max-w-md"
            >
              <div className="flex flex-col mb-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-base font-bold">{assessment.patientName}</h3>
                      <p className="text-xs">Patient ID: {assessment.patientId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">Assessment Date</p>
                      <p className="text-xs font-semibold">{new Date(assessment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="p-2 mb-3">
                    <p className="text-xs font-semibold text-blue-900">{assessment.type}</p>
                  </div>

                  {/* Metrics Display */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {assessment.metrics.bloodPressure && (
                      <div className="bg-gray-50 rounded p-2">
                        <div className="flex items-center mb-1">
                          <Heart className="w-4 h-4 text-red-600 mr-1" />
                          <span className="text-xs text-gray-600">Blood Pressure</span>
                        </div>
                        <p className={`text-sm font-bold ${getStatusColor(assessment.metrics.bloodPressure.status)}`}>
                          {assessment.metrics.bloodPressure.systolic}/{assessment.metrics.bloodPressure.diastolic}
                        </p>
                        <span className={`text-xs px-1 py-0.5 rounded-full ${getStatusBadge(assessment.metrics.bloodPressure.status)}`}>
                          {assessment.metrics.bloodPressure.status}
                        </span>
                      </div>
                    )}
                    
                    {assessment.metrics.heartRate && (
                      <div className="bg-gray-50 rounded p-2">
                        <div className="flex items-center mb-1">
                          <Activity className="w-4 h-4 text-red-600 mr-1" />
                          <span className="text-xs text-gray-600">Heart Rate</span>
                        </div>
                        <p className={`text-sm font-bold ${getStatusColor(assessment.metrics.heartRate.status)}`}>
                          {assessment.metrics.heartRate.value} bpm
                        </p>
                        <span className={`text-xs px-1 py-0.5 rounded-full ${getStatusBadge(assessment.metrics.heartRate.status)}`}>
                          {assessment.metrics.heartRate.status}
                        </span>
                      </div>
                    )}

                    {assessment.metrics.temperature && (
                      <div className="bg-gray-50 rounded p-2">
                        <div className="flex items-center mb-1">
                          <Thermometer className="w-4 h-4 text-orange-600 mr-1" />
                          <span className="text-xs text-gray-600">Temperature</span>
                        </div>
                        <p className={`text-sm font-bold ${getStatusColor(assessment.metrics.temperature.status)}`}>
                          {assessment.metrics.temperature.value}°F
                        </p>
                        <span className={`text-xs px-1 py-0.5 rounded-full ${getStatusBadge(assessment.metrics.temperature.status)}`}>
                          {assessment.metrics.temperature.status}
                        </span>
                      </div>
                    )}

                    {assessment.metrics.oxygenSaturation && (
                      <div className="bg-gray-50 rounded p-2">
                        <div className="flex items-center mb-1">
                          <Wind className="w-4 h-4 text-blue-600 mr-1" />
                          <span className="text-xs text-gray-600">O₂ Saturation</span>
                        </div>
                        <p className={`text-sm font-bold ${getStatusColor(assessment.metrics.oxygenSaturation.status)}`}>
                          {assessment.metrics.oxygenSaturation.value}%
                        </p>
                        <span className={`text-xs px-1 py-0.5 rounded-full ${getStatusBadge(assessment.metrics.oxygenSaturation.status)}`}>
                          {assessment.metrics.oxygenSaturation.status}
                        </span>
                      </div>
                    )}

                    {assessment.metrics.bloodGlucose && (
                      <div className="bg-gray-50 rounded p-2">
                        <div className="flex items-center mb-1">
                          <Droplet className="w-4 h-4 text-blue-600 mr-1" />
                          <span className="text-xs text-gray-600">Blood Glucose</span>
                        </div>
                        <p className={`text-sm font-bold ${getStatusColor(assessment.metrics.bloodGlucose.status)}`}>
                          {assessment.metrics.bloodGlucose.value} mg/dL
                        </p>
                        <span className={`text-xs px-1 py-0.5 rounded-full ${getStatusBadge(assessment.metrics.bloodGlucose.status)}`}>
                          {assessment.metrics.bloodGlucose.status}
                        </span>
                      </div>
                    )}

                    {assessment.metrics.weight && (
                      <div className="bg-gray-50 rounded p-2">
                        <div className="flex items-center mb-1">
                          <Scale className="w-4 h-4 text-green-600 mr-1" />
                          <span className="text-xs text-gray-600">Weight</span>
                        </div>
                        <p className={`text-sm font-bold ${getStatusColor(assessment.metrics.weight.status)}`}>
                          {assessment.metrics.weight.value} kg
                        </p>
                        <span className={`text-xs px-1 py-0.5 rounded-full ${getStatusBadge(assessment.metrics.weight.status)}`}>
                          {assessment.metrics.weight.status}
                        </span>
                      </div>
                    )}

                    {assessment.metrics.bmi && (
                      <div className="bg-gray-50 rounded p-2">
                        <div className="flex items-center mb-1">
                          <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                          <span className="text-xs text-gray-600">BMI</span>
                        </div>
                        <p className={`text-sm font-bold ${getStatusColor(assessment.metrics.bmi.status)}`}>
                          {assessment.metrics.bmi.value}
                        </p>
                        <span className={`text-xs px-1 py-0.5 rounded-full ${getStatusBadge(assessment.metrics.bmi.status)}`}>
                          {assessment.metrics.bmi.status}
                        </span>
                      </div>
                    )}

                    {assessment.metrics.hemoglobin && (
                      <div className="bg-gray-50 rounded p-2">
                        <div className="flex items-center mb-1">
                          <Droplet className="w-4 h-4 text-red-600 mr-1" />
                          <span className="text-xs text-gray-600">Hemoglobin</span>
                        </div>
                        <p className={`text-sm font-bold ${getStatusColor(assessment.metrics.hemoglobin.status)}`}>
                          {assessment.metrics.hemoglobin.value} g/dL
                        </p>
                        <span className={`text-xs px-1 py-0.5 rounded-full ${getStatusBadge(assessment.metrics.hemoglobin.status)}`}>
                          {assessment.metrics.hemoglobin.status}
                        </span>
                      </div>
                    )}

                    {assessment.metrics.fetalHeartRate && (
                      <div className="bg-gray-50 rounded p-2">
                        <div className="flex items-center mb-1">
                          <Heart className="w-4 h-4 text-pink-600 mr-1" />
                          <span className="text-xs text-gray-600">Fetal Heart Rate</span>
                        </div>
                        <p className={`text-sm font-bold ${getStatusColor(assessment.metrics.fetalHeartRate.status)}`}>
                          {assessment.metrics.fetalHeartRate.value} bpm
                        </p>
                        <span className={`text-xs px-1 py-0.5 rounded-full ${getStatusBadge(assessment.metrics.fetalHeartRate.status)}`}>
                          {assessment.metrics.fetalHeartRate.status}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-yellow-50 rounded p-2 mb-3 border border-yellow-200">
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Notes:</span> {assessment.notes}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                      <Eye className="w-3 h-3" />
                      <span>View Report</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors">
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scheduled Assessments */}
      {activeTab === 'scheduled' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {assessments.scheduled.map((assessment) => (
            <div
              key={assessment.id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:shadow-md transition-shadow max-w-md"
            >
              <div className="flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-base font-bold">{assessment.patientName}</h3>
                      <p className="text-xs">Patient ID: {assessment.patientId}</p>
                    </div>
                  </div>

                  <div className="p-2 mb-3">
                    <p className="text-xs font-semibold text-blue-900">{assessment.type}</p>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-gray-700 text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                      <div>
                        <p className="font-medium">{new Date(assessment.scheduledDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        <p className="text-xs text-gray-500">Scheduled Date</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-700 text-sm">
                      <Activity className="w-4 h-4 mr-2 text-blue-600" />
                      <div>
                        <p className="font-medium">{assessment.scheduledTime}</p>
                        <p className="text-xs text-gray-500">Scheduled Time</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded p-2 mb-3">
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Reason:</span> {assessment.reason}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors">
                      <Plus className="w-3 h-3" />
                      <span>Start</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors">
                      <Calendar className="w-3 h-3" />
                      <span>Reschedule</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthAssessments;
