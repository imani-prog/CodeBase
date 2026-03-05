import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, MessageSquare, Stethoscope, AlertCircle, User, Clock } from 'lucide-react';

const QUICK_TEMPLATES = [
  'Patient update required',
  'Schedule change needed',
  'Technical issue reported',
  'Billing query',
  'Urgent patient referral',
  'Other',
];

const MessageDoctorModal = ({ isOpen, onClose, doctor, onConfirm }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('normal');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubject('');
      setMessage('');
      setPriority('normal');
      setSelectedTemplate('');
      setSent(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (sent) {
      const t = setTimeout(() => { setSent(false); onClose(); }, 2500);
      return () => clearTimeout(t);
    }
  }, [sent, onClose]);

  const handleTemplateSelect = (tpl) => {
    setSelectedTemplate(tpl);
    if (tpl !== 'Other') setSubject(tpl);
    else setSubject('');
  };

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) return;
    onConfirm && onConfirm({ doctorId: doctor.id, subject, message, priority });
    setSent(true);
  };

  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={sent ? undefined : onClose}
      />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl max-w-xl w-full overflow-hidden">

          {/* ── SUCCESS STATE ── */}
          {sent ? (
            <div className="px-8 py-14 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
              <p className="text-sm text-gray-600">
                Your message to <span className="font-semibold text-gray-800">{doctor.name}</span> has been
                delivered successfully.
              </p>
              <p className="text-xs text-gray-400">The doctor has been notified.</p>
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
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Message Doctor</h2>
                    <p className="text-sm text-blue-200">Send a direct message to this doctor</p>
                  </div>
                </div>
              </div>

              {/* ── BODY ── */}
              <div className="px-8 py-6 space-y-5">
                {/* Doctor summary */}
                <div className="bg-gray-50 p-4 flex items-center gap-4">
                  <img src={doctor.photo} alt={doctor.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{doctor.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Stethoscope className="w-3 h-3" /> {doctor.specialty}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400">Status</p>
                    <p className={`text-xs font-semibold capitalize ${
                      doctor.currentStatus === 'available' ? 'text-green-600' :
                      doctor.currentStatus === 'busy' ? 'text-yellow-600' : 'text-red-600'
                    }`}>{doctor.currentStatus}</p>
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Message Priority
                  </label>
                  <div className="flex gap-6">
                    {[{ val: 'normal', label: 'Normal' }, { val: 'urgent', label: 'Urgent' }].map(({ val, label }) => (
                      <label key={val} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="msgPriority"
                          value={val}
                          checked={priority === val}
                          onChange={() => setPriority(val)}
                          className="accent-blue-600 w-4 h-4"
                        />
                        <span className="text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Quick templates */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-1.5 mb-3">
                    {QUICK_TEMPLATES.map((tpl) => (
                      <label
                        key={tpl}
                        className={`flex items-center gap-3 px-3 py-2.5 border rounded-lg cursor-pointer transition-colors ${
                          selectedTemplate === tpl ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="msgTemplate"
                          value={tpl}
                          checked={selectedTemplate === tpl}
                          onChange={() => handleTemplateSelect(tpl)}
                          className="accent-blue-600"
                        />
                        <span className="text-sm text-gray-700">{tpl}</span>
                      </label>
                    ))}
                  </div>
                  {selectedTemplate === 'Other' && (
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter custom subject..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Type your message here..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-textarea"
                  />
                  <p className="text-xs text-gray-400 mt-1 text-right">{message.length} characters</p>
                </div>

                {priority === 'urgent' && (
                  <div className="flex items-start gap-2 text-xs text-red-700 bg-red-50 border border-red-200 px-3 py-2.5">
                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>This message is marked urgent. The doctor will receive an immediate push notification.</span>
                  </div>
                )}
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
                  onClick={handleSend}
                  disabled={!subject.trim() || !message.trim()}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white hover:bg-blue-800 transition-colors text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageDoctorModal;
