import { useState, useEffect } from 'react';
import {
  X, Calendar, Clock, MapPin, Phone, Video, User, FileText,
  AlertCircle, CheckCircle2, Edit3, Search
} from 'lucide-react';

const SAMPLE_PATIENTS = [
  { id: 'PT-2023-001', name: 'Sarah Wanjiru' },
  { id: 'PT-2023-045', name: 'John Kamau' },
  { id: 'PT-2023-089', name: 'Mary Njoki' },
  { id: 'PT-2023-112', name: 'Peter Ochieng' },
  { id: 'PT-2023-156', name: 'Grace Akinyi' },
  { id: 'PT-2023-201', name: 'David Mwangi' },
];

const DURATION_OPTIONS = ['15 min', '30 min', '45 min', '60 min', '90 min'];
const TYPE_OPTIONS = ['In-Person', 'Video Call', 'Phone Call', 'Home Visit'];

const typeIcon = (type) => {
  switch (type) {
    case 'Video Call': return <Video className="w-4 h-4" />;
    case 'Phone Call': return <Phone className="w-4 h-4" />;
    case 'Home Visit': return <MapPin className="w-4 h-4" />;
    default: return <User className="w-4 h-4" />;
  }
};

const InputLabel = ({ children, required }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1.5">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const FieldError = ({ msg }) =>
  msg ? (
    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
      <AlertCircle className="w-3 h-3" /> {msg}
    </p>
  ) : null;

const EditAppointmentModal = ({ isOpen, onClose, onSave, appointment, patients = SAMPLE_PATIENTS }) => {
  const empty = {
    patientId: '',
    date: '',
    time: '',
    duration: '30 min',
    type: 'In-Person',
    location: '',
    reason: '',
    notes: '',
    sendReminder: true,
  };

  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [patientSearch, setPatientSearch] = useState('');
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);

  // Populate form when appointment changes
  useEffect(() => {
    if (appointment) {
      const patient = patients.find((p) => p.id === appointment.patientId);
      setForm({
        patientId: appointment.patientId || '',
        date: appointment.date || '',
        time: appointment.time || '',
        duration: appointment.duration || '30 min',
        type: appointment.type || 'In-Person',
        location: appointment.location || '',
        reason: appointment.reason || '',
        notes: appointment.notes || '',
        sendReminder: true,
      });
      setPatientSearch(patient ? patient.name : appointment.patientName || '');
    }
  }, [appointment, patients]);

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const selectedPatient = patients.find((p) => p.id === form.patientId);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const selectPatient = (patient) => {
    setForm((prev) => ({ ...prev, patientId: patient.id }));
    setPatientSearch(patient.name);
    setShowPatientDropdown(false);
    if (errors.patientId) setErrors((prev) => ({ ...prev, patientId: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.patientId) e.patientId = 'Please select a patient';
    if (!form.date) e.date = 'Date is required';
    if (!form.time) e.time = 'Time is required';
    if (!form.reason.trim()) e.reason = 'Reason is required';
    if (['In-Person', 'Home Visit'].includes(form.type) && !form.location.trim())
      e.location = 'Location is required for this appointment type';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (isSaving || !validate()) return;
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    onSave?.({ ...appointment, ...form, patientName: selectedPatient?.name || appointment?.patientName });
    setIsSaving(false);
    handleClose();
  };

  const handleClose = () => {
    setErrors({});
    setShowPatientDropdown(false);
    onClose?.();
  };

  const today = new Date().toISOString().split('T')[0];

  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleClose} />

      <div className="flex items-center justify-center min-h-screen p-0 sm:p-4">
        <div className="relative bg-white shadow-2xl max-w-2xl w-full h-screen sm:h-auto sm:max-h-[90vh] flex flex-col overflow-hidden">

          {/* Header */}
          <div className="relative px-4 py-4 sm:px-8 sm:py-5 bg-blue-950 text-white flex-shrink-0">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 sm:gap-4 pr-10">
              <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30 flex-shrink-0">
                <Edit3 className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-2xl font-bold leading-tight">Edit Appointment</h2>
                <p className="text-xs sm:text-sm opacity-80 mt-0.5">Update appointment details</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-50 space-y-5">

            {/* Patient */}
            <div className="border border-gray-200 p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-600" /> Patient
              </h3>
              <div className="relative">
                <InputLabel required>Select Patient</InputLabel>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search by name or patient ID…"
                    value={patientSearch}
                    onChange={(e) => {
                      setPatientSearch(e.target.value);
                      setShowPatientDropdown(true);
                      if (!e.target.value) setForm((p) => ({ ...p, patientId: '' }));
                    }}
                    onFocus={() => setShowPatientDropdown(true)}
                    className={`w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all ${
                      errors.patientId ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                </div>
                {showPatientDropdown && filteredPatients.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    {filteredPatients.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onMouseDown={() => selectPatient(p)}
                        className={`w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors flex items-center justify-between text-sm ${
                          form.patientId === p.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-800'
                        }`}
                      >
                        <span>{p.name}</span>
                        <span className="text-xs text-gray-400">{p.id}</span>
                      </button>
                    ))}
                  </div>
                )}
                <FieldError msg={errors.patientId} />
                {selectedPatient && (
                  <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-blue-800 font-medium">{selectedPatient.name}</span>
                    <span className="text-xs text-blue-500 ml-auto">{selectedPatient.id}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Date & Time */}
            <div className="border border-gray-200 p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-blue-600" /> Date & Time
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <InputLabel required>Date</InputLabel>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      min={today}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all ${
                        errors.date ? 'border-red-400' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <FieldError msg={errors.date} />
                </div>
                <div>
                  <InputLabel required>Time</InputLabel>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className={`w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all ${
                        errors.time ? 'border-red-400' : 'border-gray-300'
                      }`}
                    />
                  </div>
                  <FieldError msg={errors.time} />
                </div>
                <div className="sm:col-span-2">
                  <InputLabel>Duration</InputLabel>
                  <div className="flex flex-wrap gap-2">
                    {DURATION_OPTIONS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, duration: d }))}
                        className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
                          form.duration === d
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                            : 'border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Type & Location */}
            <div className="border border-gray-200 p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-blue-600" /> Type & Location
              </h3>
              <div className="space-y-4">
                <div>
                  <InputLabel>Appointment Type</InputLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TYPE_OPTIONS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setForm((p) => ({ ...p, type: t, location: '' }));
                          if (errors.location) setErrors((p) => ({ ...p, location: '' }));
                        }}
                        className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all ${
                          form.type === t
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                            : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <span className={form.type === t ? 'text-white' : 'text-blue-600'}>
                          {typeIcon(t)}
                        </span>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                {(form.type === 'In-Person' || form.type === 'Home Visit') && (
                  <div>
                    <InputLabel required>Location</InputLabel>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        type="text"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder={form.type === 'Home Visit' ? "Patient's home address" : 'e.g. Community Health Center, Block A'}
                        className={`w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all ${
                          errors.location ? 'border-red-400' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    <FieldError msg={errors.location} />
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="border border-gray-200 p-4 sm:p-5">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-600" /> Details
              </h3>
              <div className="space-y-4">
                <div>
                  <InputLabel required>Reason for Appointment</InputLabel>
                  <input
                    type="text"
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                    placeholder="e.g. Blood Pressure Check, Follow-up Consultation"
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all ${
                      errors.reason ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  <FieldError msg={errors.reason} />
                </div>
                <div>
                  <InputLabel>Additional Notes</InputLabel>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any additional notes or instructions…"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-all resize-none"
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="sendReminder"
                    checked={form.sendReminder}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Send SMS reminder to patient</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 bg-white border-t border-gray-200 px-4 py-3 sm:px-8 sm:py-4 flex justify-between items-center gap-3">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span className="text-red-500">*</span> Required fields
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSaving}
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving…
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
