import { useEffect, useState } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Navigation,
  Phone,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Home,
  Filter,
  Plus,
  X,
  Map,
  FileText,
  Save
} from 'lucide-react';
import { syncHomeVisitWorkItems } from '../../../Services/chwAssignmentsStore';

const HomeVisits = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showMap, setShowMap] = useState(false);
  const [completeModal, setCompleteModal] = useState({ open: false, visit: null, outcome: '' });
  const [rescheduleModal, setRescheduleModal] = useState({ open: false, visit: null, date: '', time: '' });

  const emptyScheduleForm = {
    patientName: '',
    patientId: '',
    phone: '',
    date: '',
    time: '',
    location: '',
    type: '',
    priority: 'normal',
    notes: ''
  };
  const [scheduleModal, setScheduleModal] = useState({ open: false });
  const [scheduleForm, setScheduleForm] = useState(emptyScheduleForm);
  const [scheduleErrors, setScheduleErrors] = useState({});

  const openScheduleModal = () => {
    setScheduleForm(emptyScheduleForm);
    setScheduleErrors({});
    setScheduleModal({ open: true });
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleForm(prev => ({ ...prev, [name]: value }));
    if (scheduleErrors[name]) setScheduleErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateSchedule = () => {
    const errs = {};
    if (!scheduleForm.patientName.trim()) errs.patientName = 'Patient name is required';
    if (!scheduleForm.patientId.trim()) errs.patientId = 'Patient ID is required';
    if (!scheduleForm.phone.trim()) errs.phone = 'Phone number is required';
    if (!scheduleForm.date) errs.date = 'Date is required';
    if (!scheduleForm.time) errs.time = 'Time is required';
    if (!scheduleForm.location.trim()) errs.location = 'Location is required';
    if (!scheduleForm.type) errs.type = 'Visit type is required';
    return errs;
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    const errs = validateSchedule();
    if (Object.keys(errs).length > 0) { setScheduleErrors(errs); return; }
    const [h, m] = scheduleForm.time.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hour % 12 || 12}:${m} ${ampm}`;
    setVisits(prev => ({
      ...prev,
      upcoming: [
        ...prev.upcoming,
        {
          id: Date.now(),
          patientName: scheduleForm.patientName.trim(),
          patientId: scheduleForm.patientId.trim(),
          phone: scheduleForm.phone.trim(),
          date: scheduleForm.date,
          time: formattedTime,
          location: scheduleForm.location.trim(),
          type: scheduleForm.type,
          priority: scheduleForm.priority,
          notes: scheduleForm.notes.trim()
        }
      ]
    }));
    setScheduleModal({ open: false });
  };

  const [visits, setVisits] = useState({
    upcoming: [
      {
        id: 1,
        patientName: 'Sarah Wanjiru',
        patientId: 'PT-2023-001',
        phone: '+254790383295',
        date: '2024-10-25',
        time: '10:00 AM',
        location: 'Katoloni AIC Church, House 23',
        coordinates: { lat: -1.3139, lng: 36.7890 },
        type: 'Follow-up Visit',
        priority: 'normal',
        notes: 'Check blood pressure and review medication'
      },
      {
        id: 2,
        patientName: 'John Kamau',
        patientId: 'PT-2023-045',
        phone: '+254723456789',
        date: '2024-10-25',
        time: '2:00 PM',
        location: 'Kathemboni Mosque',
        coordinates: { lat: -1.2627, lng: 36.8598 },
        type: 'Initial Assessment',
        priority: 'urgent',
        notes: 'New patient - comprehensive health assessment needed'
      },
      {
        id: 3,
        patientName: 'Mary Njoki',
        patientId: 'PT-2023-089',
        phone: '+254734567890',
        date: '2024-10-26',
        time: '9:00 AM',
        location: 'Kathayoni Primary School',
        coordinates: { lat: -1.2921, lng: 36.7561 },
        type: 'Prenatal Checkup',
        priority: 'high',
        notes: 'Second trimester checkup - monitor fetal development'
      },
      {
        id: 4,
        patientName: 'Peter Ochieng',
        patientId: 'PT-2023-112',
        phone: '+254745678901',
        date: '2024-10-27',
        time: '11:00 AM',
        location: 'Muthini Estate,',
        coordinates: { lat: -1.2921, lng: 36.7561 },
        type: 'Medication Review',
        priority: 'normal',
        notes: 'Review diabetes medication and diet plan'
      }
    ],
    completed: [
      {
        id: 5,
        patientName: 'Grace Akinyi',
        patientId: 'PT-2023-156',
        phone: '+254756789012',
        date: '2024-10-22',
        time: '10:30 AM',
        location: 'Mathare, House 45',
        type: 'Nutrition Assessment',
        status: 'completed',
        outcome: 'Patient improving - continue current plan'
      },
      {
        id: 6,
        patientName: 'David Mwangi',
        patientId: 'PT-2023-201',
        phone: '+254767890123',
        date: '2024-10-21',
        time: '2:00 PM',
        location: 'Kawangware, Block A',
        type: 'Follow-up Visit',
        status: 'completed',
        outcome: 'Blood pressure stable - medication working well'
      }
    ],
    cancelled: [
      {
        id: 7,
        patientName: 'Jane Wambui',
        patientId: 'PT-2023-178',
        phone: '+254778901234',
        date: '2024-10-20',
        time: '3:00 PM',
        location: 'Muthini Estate, House 5',
        coordinates: { lat: -1.3100, lng: 36.7910 },
        type: 'Follow-up Visit',
        status: 'cancelled',
        reason: 'Patient not available - rescheduled'
      }
    ]
  });

  useEffect(() => {
    syncHomeVisitWorkItems(visits);
  }, [visits]);

  const handleDirections = (visit) => {
    if (!visit.location) return;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(visit.location)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const openCompleteModal = (visit) => setCompleteModal({ open: true, visit, outcome: '' });

  const handleCompleteSubmit = () => {
    const { visit, outcome } = completeModal;
    setVisits(prev => ({
      ...prev,
      upcoming: prev.upcoming.filter(v => v.id !== visit.id),
      completed: [
        { ...visit, status: 'completed', outcome: outcome.trim() || 'Visit completed successfully' },
        ...prev.completed
      ]
    }));
    setCompleteModal({ open: false, visit: null, outcome: '' });
  };

  const openRescheduleModal = (visit) =>
    setRescheduleModal({ open: true, visit, date: visit.date || '', time: '' });

  const handleRescheduleSubmit = () => {
    const { visit, date, time } = rescheduleModal;
    const [h, m] = time.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hour % 12 || 12}:${m} ${ampm}`;
    const { reason: _r, status: _s, ...rest } = visit;
    setVisits(prev => ({
      ...prev,
      cancelled: prev.cancelled.filter(v => v.id !== visit.id),
      upcoming: [...prev.upcoming, { ...rest, date, time: formattedTime }]
    }));
    setRescheduleModal({ open: false, visit: null, date: '', time: '' });
  };

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: visits.upcoming.length, icon: Calendar },
    { id: 'completed', label: 'Completed', count: visits.completed.length, icon: CheckCircle },
    { id: 'cancelled', label: 'Cancelled', count: visits.cancelled.length, icon: XCircle }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-800 border-red-300';
      case 'high':
        return 'text-orange-800 border-orange-300';
      default:
        return 'text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Home Visits</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Manage and track scheduled home visits
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile-only: open map overlay */}
          <button
            onClick={() => setShowMap(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Map className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Coverage Map</span>
          </button>
          <button
            onClick={openScheduleModal}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-md text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Schedule Visit</span>
          </button>
        </div>
      </div>

      {/* Map View — desktop only (lg+), hidden on smaller screens */}
      <div className="hidden lg:block border border-gray-200 overflow-hidden">
        {/* Map Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                Coverage Area Map
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Showing your assigned service zone — Machakos &amp; surrounding regions. Use this map to plan efficient routes between patient home visits.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 shrink-0">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                Upcoming visits
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
                Completed
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
                Cancelled
              </span>
            </div>
          </div>
        </div>
        <iframe
          src={import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL}
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Home Visits Map"
          className="w-full h-[500px] xl:h-[600px]"
        />
      </div>

      {/* Full-screen map overlay — mobile/tablet only */}
      {showMap && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-white">
          {/* Overlay header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm shrink-0">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Coverage Area Map</h2>
                <p className="text-xs text-gray-500">Machakos &amp; surrounding regions</p>
              </div>
            </div>
            <button
              onClick={() => setShowMap(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close map"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          {/* Legend strip */}
          <div className="flex items-center gap-4 px-4 py-2 bg-white border-b border-gray-100 text-xs text-gray-500 shrink-0">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              Upcoming
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
              Completed
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
              Cancelled
            </span>
          </div>
          {/* Map fills the rest of the screen */}
          <iframe
            src={import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0, flex: 1, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Home Visits Map"
            className="flex-1 w-full"
          />
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-3 sm:flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center sm:justify-start gap-1.5 px-3 sm:px-5 py-3 sm:py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden xs:inline sm:inline">{tab.label}</span>
                <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-xs font-bold ${
                  isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upcoming Visits */}
      {activeTab === 'upcoming' && (
        <>
          {/* Desktop Table — lg and above */}
          <div className="hidden lg:block bg-white shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-800">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-800">Date &amp; Time</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-800">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-800">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-00">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Notes</th>
                    <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {visits.upcoming.map((visit) => (
                    <tr key={visit.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{visit.patientName}</p>
                        <p className="text-xs text-gray-500">{visit.patientId}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center text-gray-700 text-sm">
                          <Calendar className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0" />
                          <span>{new Date(visit.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center text-gray-700 text-sm mt-1">
                          <Clock className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0" />
                          <span>{visit.time}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center text-gray-700 text-sm">
                          <MapPin className="w-4 h-4 mr-1.5 text-blue-500 flex-shrink-0" />
                          <span>{visit.location}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{visit.type}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getPriorityColor(visit.priority)}`}>
                          {visit.priority.charAt(0).toUpperCase() + visit.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs">{visit.notes}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleDirections(visit)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
                          >
                            <Navigation className="w-3.5 h-3.5" />
                            <span>Directions</span>
                          </button>
                          <button
                            onClick={() => handleCall(visit.phone)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 active:scale-95 text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </button>
                          <button
                            onClick={() => openCompleteModal(visit)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-700 border border-emerald-300 rounded-lg text-xs font-semibold transition-all"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Complete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile / Tablet Cards — below lg */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visits.upcoming.map((visit) => (
              <div key={visit.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-gray-900">{visit.patientName}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getPriorityColor(visit.priority)}`}>
                    {visit.priority.charAt(0).toUpperCase() + visit.priority.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-3">{visit.patientId}</p>
                <div className="space-y-1.5 mb-3 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    <span>{new Date(visit.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {visit.time}</span>
                  </div>
                  <div className="flex items-start text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{visit.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Home className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    <span>{visit.type}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Phone className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                    <span>{visit.phone}</span>
                  </div>
                </div>
                {visit.notes && (
                  <p className="text-xs text-gray-600 mb-3 bg-gray-50 rounded p-2">
                    <span className="font-semibold">Notes:</span> {visit.notes}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => handleDirections(visit)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Directions</span>
                  </button>
                  <button
                    onClick={() => handleCall(visit.phone)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-green-600 hover:bg-green-700 active:scale-95 text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </button>
                  <button
                    onClick={() => openCompleteModal(visit)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-green-50 hover:bg-green-100 active:scale-95 text-green-700 border border-green-300 rounded-lg text-xs font-semibold transition-all"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Complete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Completed Visits */}
      {activeTab === 'completed' && (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Date &amp; Time</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {visits.completed.map((visit) => (
                    <tr key={visit.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900">{visit.patientName}</p>
                            <p className="text-xs text-gray-500">{visit.patientId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center text-gray-700 text-sm">
                          <Calendar className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span>{new Date(visit.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center text-gray-700 text-sm mt-1">
                          <Clock className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span>{visit.time}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{visit.location}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{visit.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{visit.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visits.completed.map((visit) => (
              <div key={visit.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <h3 className="text-base font-bold text-gray-900">{visit.patientName}</h3>
                </div>
                <p className="text-xs text-gray-500 mb-3">{visit.patientId}</p>
                <div className="space-y-1.5 mb-3 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{new Date(visit.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {visit.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{visit.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Home className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{visit.type}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 bg-green-50 rounded p-2">
                  <span className="font-semibold">Outcome:</span> {visit.outcome}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Cancelled Visits */}
      {activeTab === 'cancelled' && (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Date &amp; Time</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Reason</th>
                    <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {visits.cancelled.map((visit) => (
                    <tr key={visit.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900">{visit.patientName}</p>
                            <p className="text-xs text-gray-500">{visit.patientId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center text-gray-700 text-sm">
                          <Calendar className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span>{new Date(visit.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center text-gray-700 text-sm mt-1">
                          <Clock className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" />
                          <span>{visit.time}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{visit.location}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{visit.type}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{visit.reason}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => openRescheduleModal(visit)}
                          className="flex items-center gap-1.5 ml-auto px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 active:scale-95 text-amber-700 border border-amber-300 rounded-lg text-xs font-semibold transition-all"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Reschedule</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visits.cancelled.map((visit) => (
              <div key={visit.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <h3 className="text-base font-bold text-gray-900">{visit.patientName}</h3>
                </div>
                <p className="text-xs text-gray-500 mb-3">{visit.patientId}</p>
                <div className="space-y-1.5 mb-3 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{new Date(visit.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {visit.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{visit.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Home className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{visit.type}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 bg-red-50 rounded p-2 mb-3">
                  <span className="font-semibold">Reason:</span> {visit.reason}
                </p>
                <button
                  onClick={() => openRescheduleModal(visit)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 active:scale-95 text-amber-700 border border-amber-300 rounded-lg text-xs font-semibold transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reschedule Visit</span>
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Schedule Visit Modal ── */}
      {scheduleModal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white shadow-2xl max-w-2xl w-full h-full sm:h-auto sm:max-h-[90vh] flex flex-col rounded-none sm:rounded-2xl">

            {/* Header */}
            <div className="bg-blue-950 border-b border-gray-200 text-white px-4 py-4 sm:px-8 sm:py-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">Schedule a Visit</h2>
                  <p className="text-xs sm:text-sm">Fill in the details to add a new home visit</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setScheduleModal({ open: false })}
                className="font-bold hover:text-blue-600 hover:bg-blue-300 rounded-full transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Form Content — Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleScheduleSubmit} noValidate className="p-4 sm:p-8 space-y-6">

                {/* Section: Patient Details */}
                <div>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Patient Details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Patient Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="patientName"
                        value={scheduleForm.patientName}
                        onChange={handleScheduleChange}
                        placeholder="Enter patient name"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                          scheduleErrors.patientName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {scheduleErrors.patientName && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{scheduleErrors.patientName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Patient ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="patientId"
                        value={scheduleForm.patientId}
                        onChange={handleScheduleChange}
                        placeholder="e.g. PT-2024-001"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                          scheduleErrors.patientId ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {scheduleErrors.patientId && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{scheduleErrors.patientId}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={scheduleForm.phone}
                        onChange={handleScheduleChange}
                        placeholder="+254 7XX XXX XXX"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                          scheduleErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {scheduleErrors.phone && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{scheduleErrors.phone}</p>}
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Section: Visit Schedule */}
                <div>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Visit Schedule
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={scheduleForm.date}
                        onChange={handleScheduleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                          scheduleErrors.date ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {scheduleErrors.date && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{scheduleErrors.date}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        name="time"
                        value={scheduleForm.time}
                        onChange={handleScheduleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                          scheduleErrors.time ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {scheduleErrors.time && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{scheduleErrors.time}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Location / Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="location"
                          value={scheduleForm.location}
                          onChange={handleScheduleChange}
                          placeholder="e.g. Kibera, Plot 45 or Machakos Town, House 12"
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                            scheduleErrors.location ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {scheduleErrors.location && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{scheduleErrors.location}</p>}
                    </div>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Section: Visit Details */}
                <div>
                  <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Visit Details
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Visit Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="type"
                        value={scheduleForm.type}
                        onChange={handleScheduleChange}
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                          scheduleErrors.type ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select visit type</option>
                        <option value="Follow-up Visit">Follow-up Visit</option>
                        <option value="Initial Assessment">Initial Assessment</option>
                        <option value="Prenatal Checkup">Prenatal Checkup</option>
                        <option value="Postnatal Checkup">Postnatal Checkup</option>
                        <option value="Medication Review">Medication Review</option>
                        <option value="Nutrition Assessment">Nutrition Assessment</option>
                        <option value="Mental Health Check">Mental Health Check</option>
                        <option value="Chronic Disease Management">Chronic Disease Management</option>
                        <option value="Emergency Visit">Emergency Visit</option>
                        <option value="Other">Other</option>
                      </select>
                      {scheduleErrors.type && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{scheduleErrors.type}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                      <div className="flex items-center gap-2 h-[50px]">
                        {[
                          { value: 'normal', label: 'Normal', active: 'bg-blue-600 text-white border-blue-600', idle: 'border-gray-300 text-gray-600 hover:border-blue-400' },
                          { value: 'high',   label: 'High',   active: 'bg-blue-600 text-white border-blue-600', idle: 'border-gray-300 text-gray-600 hover:border-blue-400' },
                          { value: 'urgent', label: 'Urgent', active: 'bg-blue-600 text-white border-blue-600',    idle: 'border-gray-300 text-gray-600 hover:border-blue-400' }
                        ].map(opt => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setScheduleForm(prev => ({ ...prev, priority: opt.value }))}
                            className={`flex-1 h-full border-2 rounded-xl text-sm font-semibold transition-colors ${
                              scheduleForm.priority === opt.value ? opt.active : opt.idle
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Notes / Instructions</label>
                      <textarea
                        name="notes"
                        rows={3}
                        value={scheduleForm.notes}
                        onChange={handleScheduleChange}
                        placeholder="Any specific instructions or notes for this visit..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </div>

              </form>
            </div>

            {/* Action Buttons — Fixed at Bottom */}
            <div className="bg-gray-50 px-4 py-3 sm:px-8 sm:py-4 border-t border-gray-200 flex justify-between items-center gap-2">
              <button
                type="button"
                onClick={() => setScheduleModal({ open: false })}
                className="px-6 py-2.5 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                onClick={handleScheduleSubmit}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Save className="w-4 h-4" />
                <span>Schedule Visit</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Complete Visit Modal */}
      {completeModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Complete Visit
              </h3>
              <button
                onClick={() => setCompleteModal({ open: false, visit: null, outcome: '' })}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-0.5">
              Marking visit for <span className="font-semibold text-gray-800">{completeModal.visit?.patientName}</span> as completed.
            </p>
            <p className="text-xs text-gray-400 mb-4">{completeModal.visit?.patientId} &middot; {completeModal.visit?.type}</p>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Outcome / Notes</label>
            <textarea
              rows={3}
              placeholder="Describe the visit outcome..."
              value={completeModal.outcome}
              onChange={e => setCompleteModal(prev => ({ ...prev, outcome: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-yes"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setCompleteModal({ open: false, visit: null, outcome: '' })}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteSubmit}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Completed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Visit Modal */}
      {rescheduleModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                Reschedule Visit
              </h3>
              <button
                onClick={() => setRescheduleModal({ open: false, visit: null, date: '', time: '' })}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-0.5">
              Rescheduling visit for <span className="font-semibold text-gray-800">{rescheduleModal.visit?.patientName}</span>.
            </p>
            <p className="text-xs text-gray-400 mb-4">{rescheduleModal.visit?.patientId} &middot; {rescheduleModal.visit?.type}</p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">New Date</label>
                <input
                  type="date"
                  value={rescheduleModal.date}
                  onChange={e => setRescheduleModal(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">New Time</label>
                <input
                  type="time"
                  value={rescheduleModal.time}
                  onChange={e => setRescheduleModal(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setRescheduleModal({ open: false, visit: null, date: '', time: '' })}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRescheduleSubmit}
                disabled={!rescheduleModal.date || !rescheduleModal.time}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HomeVisits;
