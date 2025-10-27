import React, { useState } from 'react';
import { X, Send, Users, AlertCircle } from 'lucide-react';

const CommunicationsModal = ({ isOpen, onClose, action }) => {
  const [message, setMessage] = useState({ title: '', content: '', priority: 'normal' });
  const [recipients, setRecipients] = useState('all');

  if (!isOpen) return null;

  const handleSend = () => {
    console.log('Sending message:', message, 'to:', recipients);
    alert('Message sent successfully!');
    onClose();
  };

  const renderContent = () => {
    switch(action) {
      case 'alerts':
        return (
          <div className="space-y-4">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {[
                { type: 'error', msg: 'Server response time exceeded threshold', time: '5 min ago' },
                { type: 'warning', msg: 'Database backup scheduled in 1 hour', time: '15 min ago' },
                { type: 'info', msg: '50 new user registrations today', time: '1 hour ago' },
                { type: 'success', msg: 'System update completed successfully', time: '2 hours ago' }
              ].map((alert, idx) => (
                <div key={idx} className={`p-3 rounded-lg border ${
                  alert.type === 'error' ? 'bg-red-50 border-red-200' :
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  alert.type === 'success' ? 'bg-green-50 border-green-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{alert.msg}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                    <AlertCircle className={`w-5 h-5 ${
                      alert.type === 'error' ? 'text-red-600' :
                      alert.type === 'warning' ? 'text-yellow-600' :
                      alert.type === 'success' ? 'text-green-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'announcements':
        return (
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={message.title}
                onChange={(e) => setMessage({...message, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Announcement title..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={message.content}
                onChange={(e) => setMessage({...message, content: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="Type your announcement..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={message.priority}
                onChange={(e) => setMessage({...message, priority: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Announcement
            </button>
          </form>
        );

      case 'bulk':
        return (
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
              <select
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Users</option>
                <option value="patients">Patients Only</option>
                <option value="chw">CHWs Only</option>
                <option value="doctors">Doctors Only</option>
                <option value="admins">Admins Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message Type</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>Email</option>
                <option>SMS</option>
                <option>Push Notification</option>
                <option>All Channels</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={message.content}
                onChange={(e) => setMessage({...message, content: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="Type your message..."
                required
              />
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> This message will be sent to all {recipients === 'all' ? 'users' : recipients} in the system.
              </p>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Users className="w-4 h-4 mr-2" />
              Send to {recipients === 'all' ? 'All Users' : recipients}
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  const titles = {
    alerts: 'System Alerts & Messages',
    announcements: 'Send Announcement',
    bulk: 'Bulk Messaging Tools'
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">{titles[action]}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CommunicationsModal;
