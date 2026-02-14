import React, { useState } from 'react';
import { X, User, Mail, Phone, BookOpen, Calendar, TrendingUp, Award, Clock, CheckCircle, Activity } from 'lucide-react';

const StudentDetailsModal = ({ showModal, setShowModal, student, course }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!showModal || !student) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'progress', label: 'Course Progress', icon: TrendingUp },
    { id: 'assessments', label: 'Assessments', icon: CheckCircle },
    { id: 'activity', label: 'Activity Log', icon: Clock }
  ];

  // Mock data for modules progress
  const moduleProgress = [
    { id: 1, name: 'Basic Health Assessment', status: 'completed', score: 95, completedDate: '2024-07-10' },
    { id: 2, name: 'Community Health Education', status: 'completed', score: 92, completedDate: '2024-07-25' },
    { id: 3, name: 'Patient Referral Systems', status: 'in-progress', score: null, completedDate: null },
    { id: 4, name: 'Health Data Collection', status: 'not-started', score: null, completedDate: null },
    { id: 5, name: 'Emergency Response', status: 'not-started', score: null, completedDate: null },
    { id: 6, name: 'Communication Skills', status: 'not-started', score: null, completedDate: null }
  ];

  const assessments = [
    { id: 1, title: 'Module 1 Quiz', type: 'Quiz', score: 95, maxScore: 100, submittedDate: '2024-07-10', status: 'Passed' },
    { id: 2, title: 'Module 2 Assignment', type: 'Assignment', score: 92, maxScore: 100, submittedDate: '2024-07-25', status: 'Passed' },
    { id: 3, title: 'Midterm Exam', type: 'Exam', score: 88, maxScore: 100, submittedDate: '2024-08-15', status: 'Passed' }
  ];

  const activityLog = [
    { id: 1, action: 'Completed Module 2', date: '2024-07-25', time: '14:30' },
    { id: 2, action: 'Submitted Module 2 Assignment', date: '2024-07-25', time: '16:45' },
    { id: 3, action: 'Started Module 3', date: '2024-08-01', time: '10:15' },
    { id: 4, action: 'Accessed Course Materials', date: '2024-08-05', time: '09:20' },
    { id: 5, action: 'Completed Midterm Exam', date: '2024-08-15', time: '11:00' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)} />
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl transform transition-all max-w-5xl w-full overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="relative px-8 py-6 bg-blue-950 text-white">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-6">
              <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <User className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{student.name}</h2>
                <p className="text-sm text-blue-100">Student ID: STU-{student.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-100">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  student.status === 'Completed' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 text-white'
                }`}>
                  {student.status}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex overflow-x-auto px-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-gray-200 p-4">
                    <div className="flex items-center mb-2">
                      <Mail className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Email</span>
                    </div>
                    <p className="text-gray-900">{student.email}</p>
                  </div>
                  <div className="border border-gray-200 p-4">
                    <div className="flex items-center mb-2">
                      <Phone className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Phone</span>
                    </div>
                    <p className="text-gray-900">{student.phone}</p>
                  </div>
                  <div className="border border-gray-200 p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Enrolled</span>
                    </div>
                    <p className="text-gray-900">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Course Information */}
                <div className="border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                    Enrolled Course
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Course Title</span>
                      <span className="font-medium text-gray-900">{course?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium text-gray-900">{course?.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium text-gray-900">{course?.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Instructor</span>
                      <span className="font-medium text-gray-900">{course?.instructor}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                      <span className="text-2xl">{student.progress}%</span>
                    </div>
                    <p className="text-sm">Course Progress</p>
                  </div>
                  <div className=" p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <Award className="w-6 h-6 text-blue-500" />
                      <span className="text-2xl">{student.score}%</span>
                    </div>
                    <p className="text-sm">Average Score</p>
                  </div>
                  <div className="p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <CheckCircle className="w-6 h-6 text-blue-500" />
                      <span className="text-2xl">{moduleProgress.filter(m => m.status === 'completed').length}/{moduleProgress.length}</span>
                    </div>
                    <p className="text-sm">Modules Completed</p>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <div className="space-y-6">
                <div className="p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Overall Progress </span>
                    <span className="text-lg">{student.progress}%</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-4">Module Progress</h3>
                <div className="space-y-4">
                  {moduleProgress.map((module) => (
                    <div key={module.id} className="border border-gray-200 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{module.name}</h4>
                          {module.completedDate && (
                            <p className="text-xs text-gray-500">Completed on {new Date(module.completedDate).toLocaleDateString()}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          {module.score !== null && (
                            <span className="text-sm font-semibold">{module.score}%</span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            module.status === 'completed' 
                              ? ' text-green-800' 
                              : module.status === 'in-progress'
                              ? ' text-yellow-800'
                              : 'text-gray-800'
                          }`}>
                            {module.status === 'completed' ? 'Completed' : module.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                          </span>
                        </div>
                      </div>
                      {module.status === 'in-progress' && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Assessments Tab */}
            {activeTab === 'assessments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Assessment Results</h3>
                  <div className="px-4 py-2 ">
                    <span className="text-sm">Average: </span>
                    <span className="text-lg font-bold">{student.score}%</span>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase">Assessment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase">Type</th>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase">Score</th>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase">Submitted</th>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {assessments.map((assessment) => (
                        <tr key={assessment.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <p className="font-medium">{assessment.title}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-700">{assessment.type}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="font-semibold ">{assessment.score}/{assessment.maxScore}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="text-gray-700">{new Date(assessment.submittedDate).toLocaleDateString()}</span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              assessment.status === 'Passed' 
                                ? ' text-green-800' 
                                : ' text-red-800'
                            }`}>
                              {assessment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Activity Log Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {activityLog.map((activity) => (
                    <div key={activity.id} className="bg-white border border-gray-200 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4"></div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            <span>{new Date(activity.date).toLocaleDateString()}</span>
                            <Clock className="w-3 h-3 ml-3 mr-1" />
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-8 py-4 bg-gray-50 flex justify-end">
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;
