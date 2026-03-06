import React, { useState, useEffect } from 'react';
import { X, Save, CheckCircle, Edit, Stethoscope, AlertCircle, MapPin, Globe, CheckCircle2, Clock, XCircle } from 'lucide-react';

const SPECIALTIES = [
  'General Medicine', 'Cardiology', 'Pediatrics', 'Dermatology',
  'Psychiatry', 'Orthopedics', 'Gynecology', 'Neurology', 'Oncology', 'Radiology'
];

const STATUS_OPTIONS = [
  { value: 'available', label: 'Available', Icon: CheckCircle2, iconClass: 'text-blue-500' },
  { value: 'busy',      label: 'Busy',      Icon: Clock,        iconClass: 'text-blue-500' },
  { value: 'offline',   label: 'Offline',   Icon: XCircle,      iconClass: 'text-blue-500' },
];

const EditDoctorModal = ({ isOpen, onClose, doctor, onSave }) => {
  const [status, setStatus] = useState('available');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [languages, setLanguages] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen && doctor) {
      setStatus(doctor.currentStatus || 'available');
      setSpecialty(doctor.specialty || '');
      setLocation(doctor.location || '');
      setLanguages(doctor.languages?.join(', ') || '');
      setSaved(false);
    }
  }, [isOpen, doctor]);

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => { setSaved(false); onClose(); }, 2500);
      return () => clearTimeout(t);
    }
  }, [saved, onClose]);

  const handleSave = () => {
    onSave({
      ...doctor,
      currentStatus: status,
      specialty,
      location,
      languages: languages.split(',').map((l) => l.trim()).filter(Boolean),
    });
    setSaved(true);
  };

  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={saved ? undefined : onClose}
      />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl max-w-xl w-full overflow-hidden">

          {/* ── SUCCESS STATE ── */}
          {saved ? (
            <div className="px-8 py-14 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Profile Updated!</h3>
              <p className="text-sm text-gray-600">
                Changes for <span className="font-semibold text-gray-800">{doctor.name}</span> have been saved successfully.
              </p>
              <p className="text-xs text-gray-400">The updated details are now live in the system.</p>
              <p className="text-xs text-gray-400 mt-2">Closing automatically…</p>
            </div>
          ) : (
            <>
              {/* ── HEADER ── */}
              <div className="relative px-8 py-5 bg-blue-950 text-white flex-shrink-0">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center ring-4 ring-white/30 flex-shrink-0">
                    <Edit className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Edit Doctor Profile</h2>
                    <p className="text-sm text-blue-200">Update doctor information and availability</p>
                  </div>
                </div>
              </div>

              {/* ── BODY ── */}
              <div className="px-8 py-6 space-y-5">

                {/* Doctor summary */}
                <div className="bg-gray-50 p-4 flex items-center gap-4">
                  <img src={doctor.photo} alt={doctor.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">{doctor.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Stethoscope className="w-3 h-3" /> {doctor.specialty} &mdash; {doctor.id}
                    </p>
                  </div>
                </div>

                {/* Availability status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Availability Status <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-6">
                    {STATUS_OPTIONS.map((opt) => (
                      <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="doctorStatus"
                          value={opt.value}
                          checked={status === opt.value}
                          onChange={() => setStatus(opt.value)}
                          className="accent-blue-600 w-4 h-4"
                        />
                        <opt.Icon className={`w-4 h-4 ${opt.iconClass}`} />
                        <span className="text-sm text-gray-700">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Specialty */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Specialty <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SPECIALTIES.map((s) => (
                      <label
                        key={s}
                        className={`flex items-center gap-2 px-3 py-2.5 border rounded-lg cursor-pointer transition-colors ${
                          specialty === s ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="specialty"
                          value={s}
                          checked={specialty === s}
                          onChange={() => setSpecialty(s)}
                          className="accent-blue-600"
                        />
                        <span className="text-sm text-gray-700">{s}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location & Languages */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-3.5 h-3.5 inline mr-1" />Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Nairobi"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Globe className="w-3.5 h-3.5 inline mr-1" />Languages
                    </label>
                    <input
                      type="text"
                      value={languages}
                      onChange={(e) => setLanguages(e.target.value)}
                      placeholder="e.g. English, Swahili"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-400 mt-1">Comma-separated</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-blue-700 bg-blue-50 border border-blue-200 px-3 rounded-lg py-2.5">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>Changes will be reflected immediately across all active views and the doctor profile.</span>
                </div>
              </div>

              {/* ── FOOTER ── */}
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!specialty}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white hover:bg-blue-800 transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditDoctorModal;
