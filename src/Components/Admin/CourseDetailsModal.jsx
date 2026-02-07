import React, { useState } from 'react';
import { X, BookOpen, Users, Clock, Award, Star, DollarSign, TrendingUp, Calendar, User, Mail, Phone } from 'lucide-react';

const CourseDetailsModal = ({ showModal, setShowModal, course, students }) => {
  const [activeDetailTab, setActiveDetailTab] = useState('overview');

  if (!showModal || !course) return null;

  // Use students passed from parent component
  const enrolledStudents = students || [];

  const detailTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'students', label: 'Enrolled Students' },
    { id: 'modules', label: 'Course Modules' },
    { id: 'performance', label: 'Performance' }
  ];

  const formatCurrency = (amount) => {
    return `Ksh ${amount.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)} />
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl transform transition-all max-w-6xl w-full overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="relative px-8 py-5 bg-blue-950 text-white">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{course.title}</h2>
                <p className="text-sm">Detailed course information and enrolled students</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 bg-white">
            <div className="flex overflow-x-auto px-8">
              {detailTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDetailTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeDetailTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {/* Overview Tab */}
            {activeDetailTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-gray-200 p-4">
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-600">Enrolled Students</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{course.enrolledStudents}/{course.maxStudents}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round((course.enrolledStudents / course.maxStudents) * 100)}% capacity
                    </p>
                  </div>

                  <div className="border border-gray-200 p-4">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-600">Completion Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{course.completionRate}%</p>
                    <p className="text-xs text-gray-500 mt-1">Pass Rate: {course.passRate}%</p>
                  </div>

                  <div className="border border-gray-200 p-4">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm text-gray-600">Revenue</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(course.revenue)}</p>
                    <p className="text-xs text-gray-500 mt-1">Price: {formatCurrency(course.price)}</p>
                  </div>
                </div>

                <div className="border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-medium text-gray-900">{course.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Level</p>
                      <p className="font-medium text-gray-900">{course.difficulty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-medium text-gray-900">{course.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Instructor</p>
                      <p className="font-medium text-gray-900">{course.instructor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Certification</p>
                      <p className="font-medium text-gray-900">{course.certification}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-blue-500 mr-1" />
                        <span className="font-medium text-gray-900">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700">{course.description}</p>
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeDetailTab === 'students' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Enrolled Students ({enrolledStudents.length})
                  </h3>
                </div>

                <div className="bg-white border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Student</th>
                        <th className="px-4 py-3 text-left font-medium">Contact</th>
                        <th className="px-4 py-3 text-center font-medium">Enrollment Date</th>
                        <th className="px-4 py-3 text-center font-medium">Progress</th>
                        <th className="px-4 py-3 text-center font-medium">Score</th>
                        <th className="px-4 py-3 text-center font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {enrolledStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <div className="w-8 h-8 flex items-center justify-center mr-3">
                                <User className="w-6 h-6 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{student.name}</p>
                                <p className="text-xs text-gray-500">ID: STU-{student.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm">
                              <div className="flex items-center text-gray-600 mb-1">
                                <Mail className="w-3 h-3 mr-1" />
                                {student.email}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Phone className="w-3 h-3 mr-1" />
                                {student.phone}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex items-center justify-center text-gray-700">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(student.enrollmentDate).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex flex-col items-center">
                              <span className="text-sm font-medium mb-1">{student.progress}%</span>
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="font-semibold text-gray-900">{student.score}%</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              student.status === 'Completed' 
                                ? 'text-green-800' 
                                : 'text-blue-800'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Modules Tab */}
            {activeDetailTab === 'modules' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Course Modules ({course.modules?.length || 0})
                </h3>
                <div className="space-y-3">
                  {course.modules?.map((module, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold mr-3">
                          {index + 1}
                        </div>
                        <p className="font-medium text-gray-900">{module}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeDetailTab === 'performance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Completion Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Enrolled</span>
                        <span className="font-semibold">{enrolledStudents.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">In Progress</span>
                        <span className="font-semibold">
                          {enrolledStudents.filter(s => s.status === 'Active').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed</span>
                        <span className="font-semibold ">
                          {enrolledStudents.filter(s => s.status === 'Completed').length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Assessment Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Score</span>
                        <span className="font-semibold">
                          {enrolledStudents.length > 0 
                            ? Math.round(enrolledStudents.reduce((sum, s) => sum + s.score, 0) / enrolledStudents.length)
                            : 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pass Rate</span>
                        <span className="font-semibold ">
                          {enrolledStudents.length > 0
                            ? Math.round((enrolledStudents.filter(s => s.score >= 70).length / enrolledStudents.length) * 100)
                            : 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Top Performer</span>
                        <span className="font-semibold">
                          {enrolledStudents.length > 0
                            ? Math.max(...enrolledStudents.map(s => s.score))
                            : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 flex justify-end">
            <button
              onClick={() => setShowModal(false)}
              className="px-5 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsModal;
