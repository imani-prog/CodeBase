import { useState } from 'react';
import { 
  Pill, Package, MapPin, Bell, 
  Clock, Download, Share2, Search,
  AlertCircle, CheckCircle, Phone, 
  ChevronDown, ChevronUp, Calendar,
  ShoppingCart, AlertTriangle, Smartphone,
  Info, Repeat, TrendingUp, DollarSign
} from 'lucide-react';

const Prescriptions = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPrescription, setExpandedPrescription] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);

  // Sample prescription data
  const prescriptions = {
    active: [
      {
        id: 1,
        medication: 'Amoxicillin',
        genericName: 'Amoxicillin Trihydrate',
        dosage: '500mg',
        frequency: 'Three times daily',
        prescribedBy: 'Dr. Sarah Kamau',
        specialty: 'General Practitioner',
        prescribedDate: '2025-11-01',
        startDate: '2025-11-01',
        endDate: '2025-11-21',
        duration: '21 days',
        refillsRemaining: 2,
        totalRefills: 3,
        instructions: 'Take with food. Complete the full course even if symptoms improve.',
        purpose: 'Bacterial infection treatment',
        sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset'],
        warnings: 'Avoid alcohol. Inform doctor if allergic to penicillin.',
        pharmacy: 'Nairobi Central Pharmacy',
        status: 'active',
        progress: 65,
        nextDose: '2025-11-23 14:00',
        reminderSet: true
      },
      {
        id: 2,
        medication: 'Metformin',
        genericName: 'Metformin Hydrochloride',
        dosage: '850mg',
        frequency: 'Twice daily',
        prescribedBy: 'Dr. John Mwangi',
        specialty: 'Endocrinologist',
        prescribedDate: '2025-09-15',
        startDate: '2025-09-15',
        endDate: '2026-03-15',
        duration: '6 months',
        refillsRemaining: 3,
        totalRefills: 5,
        instructions: 'Take with breakfast and dinner. Monitor blood sugar levels regularly.',
        purpose: 'Type 2 Diabetes management',
        sideEffects: ['Stomach discomfort', 'Metallic taste'],
        warnings: 'Regular kidney function tests required. Avoid excessive alcohol.',
        pharmacy: 'Westlands MedPlus',
        status: 'active',
        progress: 45,
        nextDose: '2025-11-23 19:00',
        reminderSet: true
      },
      {
        id: 3,
        medication: 'Lisinopril',
        genericName: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        prescribedBy: 'Dr. John Mwangi',
        specialty: 'Cardiologist',
        prescribedDate: '2025-10-01',
        startDate: '2025-10-01',
        endDate: '2026-04-01',
        duration: '6 months',
        refillsRemaining: 4,
        totalRefills: 5,
        instructions: 'Take at the same time each day, preferably in the morning.',
        purpose: 'Blood pressure management',
        sideEffects: ['Dizziness', 'Dry cough', 'Headache'],
        warnings: 'Avoid potassium supplements. Report persistent cough to doctor.',
        pharmacy: 'Nairobi Central Pharmacy',
        status: 'active',
        progress: 30,
        nextDose: '2025-11-24 08:00',
        reminderSet: true
      }
    ],
    history: [
      {
        id: 4,
        medication: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'As needed (max 3 times daily)',
        prescribedBy: 'Dr. Sarah Kamau',
        prescribedDate: '2025-09-10',
        startDate: '2025-09-10',
        endDate: '2025-09-20',
        duration: '10 days',
        purpose: 'Pain and inflammation relief',
        status: 'completed',
        completedDate: '2025-09-20'
      },
      {
        id: 5,
        medication: 'Cetirizine',
        dosage: '10mg',
        frequency: 'Once daily',
        prescribedBy: 'Dr. Mary Wanjiku',
        prescribedDate: '2025-08-15',
        startDate: '2025-08-15',
        endDate: '2025-09-14',
        duration: '30 days',
        purpose: 'Seasonal allergies',
        status: 'completed',
        completedDate: '2025-09-14'
      }
    ]
  };

  // Nearby pharmacies
  const nearbyPharmacies = [
    {
      id: 1,
      name: 'Nairobi Central Pharmacy',
      address: 'Kimathi Street, Nairobi CBD',
      distance: '1.2 km',
      rating: 4.8,
      phone: '+254 712 345 678',
      hours: 'Mon-Sat: 8AM-8PM, Sun: 9AM-6PM',
      services: ['Home Delivery', 'NHIF Accepted', 'Emergency Service'],
      deliveryFee: 'KSh 200',
      estimatedDelivery: '1-2 hours'
    },
    {
      id: 2,
      name: 'Westlands MedPlus',
      address: 'Parklands Road, Westlands',
      distance: '3.5 km',
      rating: 4.6,
      phone: '+254 723 456 789',
      hours: 'Mon-Sun: 7AM-10PM',
      services: ['24/7 Emergency', 'Home Delivery', 'NHIF Accepted'],
      deliveryFee: 'KSh 300',
      estimatedDelivery: '2-3 hours'
    },
    {
      id: 3,
      name: 'HealthMart Karen',
      address: 'Karen Road, Karen',
      distance: '5.8 km',
      rating: 4.9,
      phone: '+254 734 567 890',
      hours: 'Mon-Sat: 8AM-9PM, Sun: 9AM-7PM',
      services: ['Prescription Delivery', 'NHIF/SHA Accepted', 'Free Delivery'],
      deliveryFee: 'Free',
      estimatedDelivery: '3-4 hours'
    }
  ];

  const handleRefillRequest = (prescription) => {
    setSelectedMedication(prescription);
    setShowRefillModal(true);
  };

  const togglePrescription = (id) => {
    setExpandedPrescription(expandedPrescription === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'completed': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'expired': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const RefillModal = () => (
    <div className="fixed inset-0 bg-opacity-50 z-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Request Refill</h2>
            <button
              onClick={() => setShowRefillModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
          </div>
        </div>

        {selectedMedication && (
          <div className="p-6">
            <div className="border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Pill className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{selectedMedication.medication}</h3>
                  <p className="text-sm text-gray-600">{selectedMedication.dosage} - {selectedMedication.frequency}</p>
                  <p className="text-sm text-gray-600 mt-1">Refills remaining: {selectedMedication.refillsRemaining}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Pharmacy
                </label>
                <div className="space-y-2">
                  {nearbyPharmacies.slice(0, 2).map((pharmacy) => (
                    <button
                      key={pharmacy.id}
                      onClick={() => setSelectedPharmacy(pharmacy.id)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedPharmacy === pharmacy.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{pharmacy.name}</p>
                          <p className="text-sm text-gray-600">{pharmacy.address}</p>
                          <p className="text-sm text-gray-600 mt-1">Delivery: {pharmacy.deliveryFee} • {pharmacy.estimatedDelivery}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{pharmacy.distance}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-blue-500">★</span>
                            <span className="text-sm text-gray-600">{pharmacy.rating}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 border-2 border-blue-600 bg-blue-50 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-blue-600">Home Delivery</p>
                  </button>
                  <button className="p-3 border-2 border-gray-200 rounded-lg hover:border-blue-300">
                    <ShoppingCart className="w-5 h-5 text-gray-600 mx-auto mb-1" />
                    <p className="text-sm font-medium text-gray-600">Pick Up</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Instructions (Optional)
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg"
                  rows="3"
                  placeholder="Any special delivery instructions or questions..."
                ></textarea>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">NHIF/SHA Coverage</p>
                  <p>This medication is covered under your insurance. You may need to pay a small co-payment at delivery.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRefillModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Submit Refill Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-600 mt-2">
            Manage your medications, refills, and delivery tracking
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">Pharmacies</span>
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
              <p className="text-xs text-gray-600">Active Prescriptions</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{prescriptions.active.length}</p>
            </div>
            <Pill className="w-7 h-7 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Refills Available</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">
                {prescriptions.active.reduce((sum, p) => sum + p.refillsRemaining, 0)}
              </p>
            </div>
            <Repeat className="w-7 h-7 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Reminders Set</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">
                {prescriptions.active.filter(p => p.reminderSet).length}
              </p>
            </div>
            <Bell className="w-7 h-7 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Nearby Pharmacies</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{nearbyPharmacies.length}</p>
            </div>
            <MapPin className="w-7 h-7 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Important Alert */}
      {/* <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-yellow-900">Medication Reminder</h3>
            <p className="text-sm text-yellow-800 mt-1">
              Your next dose of <strong>Amoxicillin</strong> is due today at 2:00 PM. Don't forget to take it with food.
            </p>
          </div>
        </div>
      </div> */}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          {['active', 'history', 'pharmacies'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Active Prescriptions Tab */}
      {activeTab === 'active' && (
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search medications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {prescriptions.active.map((prescription) => (
            <div key={prescription.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div
                className="p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => togglePrescription(prescription.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="p-2 rounded flex-shrink-0">
                      <Pill className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base truncate">{prescription.medication}</h3>
                          <p className="text-xs text-gray-600 truncate">{prescription.genericName}</p>
                          <p className="text-xs text-gray-700 mt-0.5">{prescription.dosage} • {prescription.frequency}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ml-2 flex-shrink-0 ${getStatusColor(prescription.status)}`}>
                          {prescription.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2 text-xs">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">Next: {new Date(prescription.nextDose).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Repeat className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{prescription.refillsRemaining} refills left</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600">Treatment Progress</span>
                          <span className="font-medium text-gray-900">{prescription.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full transition-all"
                            style={{ width: `${prescription.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {expandedPrescription === prescription.id ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                </div>
              </div>

              {expandedPrescription === prescription.id && (
                <div className="p-3 bg-gray-50 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-0.5">Prescribed By</p>
                      <p className="text-sm text-gray-900">{prescription.prescribedBy}</p>
                      <p className="text-xs text-gray-600">{prescription.specialty}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-0.5">Duration</p>
                      <p className="text-sm text-gray-900">{prescription.duration}</p>
                      <p className="text-xs text-gray-600">{prescription.startDate} to {prescription.endDate}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-0.5">Purpose</p>
                      <p className="text-sm text-gray-900">{prescription.purpose}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-0.5">Pharmacy</p>
                      <p className="text-sm text-gray-900">{prescription.pharmacy}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-700 mb-0.5">Instructions</p>
                    <p className="text-gray-700 text-xs">{prescription.instructions}</p>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-700 mb-1">Possible Side Effects</p>
                    <div className="flex flex-wrap gap-1.5">
                      {prescription.sideEffects.map((effect, index) => (
                        <span key={index} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                          {effect}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-yellow-900">Important Warnings</p>
                        <p className="text-xs text-yellow-800 mt-0.5">{prescription.warnings}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleRefillRequest(prescription)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs font-medium"
                    >
                      <Repeat className="w-3.5 h-3.5" />
                      Request Refill
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-xs font-medium">
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-xs font-medium">
                      <Share2 className="w-3.5 h-3.5" />
                      Share
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-xs font-medium">
                      <Bell className="w-3.5 h-3.5" />
                      {prescription.reminderSet ? 'Edit Reminder' : 'Set Reminder'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div>
          <p className="text-xs text-gray-600 mb-3">
            View your completed and expired prescriptions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {prescriptions.history.map((prescription) => (
            <div key={prescription.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded flex-shrink-0">
                    <Pill className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{prescription.medication}</h3>
                    <p className="text-xs text-gray-600">{prescription.dosage} • {prescription.frequency}</p>
                    <p className="text-xs text-gray-600 mt-0.5">Prescribed by {prescription.prescribedBy}</p>
                    <p className="text-xs text-gray-600">{prescription.startDate} to {prescription.endDate}</p>
                    <p className="text-xs text-gray-700 mt-1">Purpose: {prescription.purpose}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(prescription.status)}`}>
                  {prescription.status}
                </span>
              </div>
            </div>
          ))}
          </div>
        </div>
      )}

      {/* Pharmacies Tab */}
      {activeTab === 'pharmacies' && (
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-blue-900">Find Nearby Pharmacies</h3>
                <p className="text-sm text-blue-800 mt-1">
                  All listed pharmacies accept NHIF/SHA and offer home delivery services. Compare prices and services to find the best option.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {nearbyPharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base truncate">{pharmacy.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                    <p className="text-xs text-gray-600 truncate">{pharmacy.address}</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                    <p className="text-xs text-gray-600">{pharmacy.hours}</p>
                  </div>
                </div>
                <div className="text-right ml-2 flex-shrink-0">
                  <p className="text-xs font-medium text-gray-900">{pharmacy.distance} away</p>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <span className="text-blue-500 text-sm">★</span>
                    <span className="text-xs font-medium text-gray-900">{pharmacy.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {pharmacy.services.map((service, index) => (
                  <span key={index} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                    {service}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-gray-600">Delivery Fee</p>
                  <p className="font-medium text-gray-900">{pharmacy.deliveryFee}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-gray-600">Est. Delivery Time</p>
                  <p className="font-medium text-gray-900">{pharmacy.estimatedDelivery}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs font-medium">
                  <Phone className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Call</span>
                </button>
                <button className="flex items-center justify-center gap-1 px-2.5 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Directions</span>
                </button>
              </div>
            </div>
          ))}
          </div>
        </div>
      )}

      {/* Refill Modal */}
      {showRefillModal && <RefillModal />}
    </div>
  );
};

export default Prescriptions;
