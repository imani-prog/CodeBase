import React, { useState } from 'react';
import { X, User, Mail, Phone, BookOpen, Calendar, Star, DollarSign, Award, TrendingUp, Clock, Building } from 'lucide-react';

const ViewInstructorModal = ({ showModal, setShowModal, instructor }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!showModal || !instructor) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'courses', label: 'Teaching Courses', icon: BookOpen },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'schedule', label: 'Schedule', icon: Clock }
  ];

  // Mock course data for this instructor
  const instructorCourses = [
    { id: 1, title: 'Community Health Worker Certification', students: 250, rating: 4.8, status: 'Active' },
    { id: 2, title: 'Advanced Community Health', students: 180, rating: 4.9, status: 'Active' }
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
                <h2 className="text-2xl font-bold mb-1">{instructor.name}</h2>
                <p className="text-sm text-blue-100">{instructor.qualification}</p>
                <p className="text-sm text-blue-100">{instructor.specialization}</p>
              </div>
              {/* <div className="text-right">
                <p className="text-sm text-blue-100">Status</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                  {instructor.status}
                </span>
              </div> */}
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
                    <p className="text-gray-900">{instructor.email}</p>
                  </div>
                  <div className="border border-gray-200 p-4">
                    <div className="flex items-center mb-2">
                      <Phone className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Phone</span>
                    </div>
                    <p className="text-gray-900">{instructor.phone}</p>
                  </div>
                  <div className="border border-gray-200 p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Join Date</span>
                    </div>
                    <p className="text-gray-900">{new Date(instructor.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="bg-white border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Building className="w-5 h-5 text-blue-600 mr-2" />
                    Professional Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Specialization</p>
                      <p className="font-semibold text-gray-900">{instructor.specialization}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Qualification</p>
                      <p className="font-semibold text-gray-900">{instructor.qualification}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-semibold text-gray-900">{instructor.experience}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Monthly Salary</p>
                      <p className="font-semibold text-gray-900">Ksh {instructor.salary.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                      <span className="text-2xl font-bold">{instructor.coursesTeaching}</span>
                    </div>
                    <p className="text-sm">Teaching Courses</p>
                  </div>
                  <div className="p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <User className="w-6 h-6 text-blue-600" />
                      <span className="text-2xl font-bold">{instructor.totalStudents}</span>
                    </div>
                    <p className="text-sm">Total Students</p>
                  </div>
                  <div className="p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <Star className="w-6 h-6 text-blue-500" />
                      <span className="text-2xl font-bold">{instructor.avgRating}</span>
                    </div>
                    <p className="text-sm">Average Rating</p>
                  </div>
                  <div className="p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <Award className="w-6 h-6 text-blue-600" />
                      <span className="text-2xl font-bold">{instructor.completedCourses}</span>
                    </div>
                    <p className="text-sm">Completed Courses</p>
                  </div>
                </div>
              </div>
            )}

            {/* Teaching Courses Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Currently Teaching</h3>
                <div className="space-y-4">
                  {instructorCourses.map((course) => (
                    <div key={course.id} className="bg-white border border-gray-200 p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">{course.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1 text-blue-600" />
                              <span>{course.students} students</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-blue-500" />
                              <span>{course.rating}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              course.status === 'Active' 
                                ? 'text-green-800' 
                                : 'text-gray-800'
                            }`}>
                              {course.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Teaching Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active Courses</span>
                        <span className="font-semibold">{instructor.coursesTeaching}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed Courses</span>
                        <span className="font-semibold">{instructor.completedCourses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Students Taught</span>
                        <span className="font-semibold">{instructor.totalStudents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Rating</span>
                        <span className="font-semibold">{instructor.avgRating} <Star className="w-4 h-4 inline " /></span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Financial Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Salary</span>
                        <span className="font-semibold">Ksh {instructor.salary.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experience</span>
                        <span className="font-semibold">{instructor.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Join Date</span>
                        <span className="font-semibold">{new Date(instructor.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Total: 16 hours/week</span>
                  </div>
                </div>

                {/* Schedule Grid */}
                <div className="bg-white border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Monday</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Tuesday</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Wednesday</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Thursday</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Friday</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 font-medium">08:00 - 10:00</td>
                        <td className="px-4 py-3">
                          <div className="bg-gray-100 border-l-4 border-gray-600 p-2">
                            <p className="font-medium text-xs">CHW Certification</p>
                            <p className=" text-xs text-blue-700">Room 201</p>
                          </div>
                        </td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3">
                          <div className="bg-gray-100 border-l-4 border-gray-600 p-2">
                            <p className="font-medium text-xs">CHW Certification</p>
                            <p className="text-xs text-blue-700">Online</p>
                          </div>
                        </td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3"></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-gray-700">10:30 - 12:30</td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3">
                          <div className="bg-gray-100 border-l-4 border-gray-600 p-2">
                            <p className="font-medium text-xs">Advanced Community Health</p>
                            <p className="text-xs text-blue-700">Online</p>
                          </div>
                        </td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3">
                          <div className="bg-gray-100 border-l-4 border-gray-600 p-2">
                            <p className="font-medium text-xs">Advanced Community Health</p>
                            <p className="text-xs text-blue-700">Online</p>
                          </div>
                        </td>
                        <td className="px-4 py-3"></td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-gray-700">14:00 - 16:00</td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3">
                          <div className="bg-gray-100 border-l-4 border-gray-600 p-2">
                            <p className="font-medium text-xs">Office Hours</p>
                            <p className="text-xs">Student Consultation</p>
                          </div>
                        </td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3">
                          <div className="bg-gray-100 border-l-4 border-gray-600 p-2">
                            <p className="font-medium text-xs">CHW Certification</p>
                            <p className="text-xs text-blue-700">Lab Session - Room 105</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-gray-700">16:30 - 18:00</td>
                        <td className="px-4 py-3">
                          <div className="bg-gray-100 border-l-4 border-gray-600 p-2">
                            <p className="font-medium text-xs">Team Meeting</p>
                            <p className="text-xs text-blue-700">Online</p>
                          </div>
                        </td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3"></td>
                        <td className="px-4 py-3">
                          <div className="bg-gray-100 border-l-4 border-gray-600 p-2">
                            <p className="font-medium text-xs">Advanced Community Health</p>
                            <p className="text-xs">Review Session</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Teaching Load Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className=" p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Lecture Hours</p>
                        <p className="text-2xl font-medium">12h</p>
                      </div>
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <div className=" p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Office Hours</p>
                        <p className="text-2xl font-medium">2h</p>
                      </div>
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <div className=" p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Meetings</p>
                        <p className="text-2xl font-medium">2h</p>
                      </div>
                      <Clock className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
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

export default ViewInstructorModal;
