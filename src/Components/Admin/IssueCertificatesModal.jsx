import React, { useState } from 'react';
import { X, Award, AlertCircle, Search, CheckCircle, Download, Send, Filter } from 'lucide-react';

const IssueCertificatesModal = ({ showModal, setShowModal, courses, students, onIssueCertificates }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'completed', 'eligible'
  const [errors, setErrors] = useState({});
  const [issuing, setIssuing] = useState(false);
  const [results, setResults] = useState(null);

  // Mock student completion data
  const studentCompletionData = students?.map(student => ({
    ...student,
    completionRate: Math.floor(Math.random() * 100),
    passedAssessments: Math.random() > 0.3,
    enrolledCourses: [1, 2, 3].map(id => ({
      courseId: id,
      completed: Math.random() > 0.3
    }))
  })) || [];

  const getEligibleStudents = () => {
    if (!selectedCourse) return [];
    
    return studentCompletionData.filter(student => {
      const courseEnrollment = student.enrolledCourses?.find(
        c => c.courseId === parseInt(selectedCourse)
      );
      
      if (filterStatus === 'completed') {
        return courseEnrollment?.completed;
      } else if (filterStatus === 'eligible') {
        return student.completionRate >= 80 && student.passedAssessments;
      }
      return courseEnrollment !== undefined;
    }).filter(student => 
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const eligibleStudents = getEligibleStudents();

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === eligibleStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(eligibleStudents.map(s => s.id));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!selectedCourse) {
      newErrors.selectedCourse = 'Please select a course';
    }

    if (selectedStudents.length === 0) {
      newErrors.selectedStudents = 'Please select at least one student';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIssuing(true);

    // Simulate certificate generation
    setTimeout(() => {
      const certificateData = {
        courseId: selectedCourse,
        students: selectedStudents,
        issuedAt: new Date().toISOString(),
        certificateIds: selectedStudents.map(id => `CERT-${Date.now()}-${id}`)
      };

      onIssueCertificates?.(certificateData);
      
      setResults({
        issued: selectedStudents.length,
        courseTitle: courses?.find(c => c.id === parseInt(selectedCourse))?.title
      });

      setIssuing(false);
    }, 2000);
  };

  const handleClose = () => {
    setShowModal(false);
    // Reset form
    setSelectedCourse('');
    setSearchTerm('');
    setSelectedStudents([]);
    setFilterStatus('all');
    setErrors({});
    setResults(null);
    setIssuing(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleClose} />
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl transform transition-all max-w-4xl w-full overflow-hidden max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="relative px-8 py-5 bg-blue-950 text-white">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg ring-4 ring-white/30">
                <Award className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">Issue Certificates</h2>
                <p className="text-sm">Award certificates to students who completed courses</p>
              </div>
            </div>
          </div>

          {/* Form Body - Scrollable */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="px-8 py-6 space-y-6">
              {!results ? (
                <>
                  {/* Course Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Course <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => {
                        setSelectedCourse(e.target.value);
                        setSelectedStudents([]);
                        setErrors(prev => ({ ...prev, selectedCourse: '' }));
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent appearance-none ${
                        errors.selectedCourse ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Choose a course...</option>
                      {courses?.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                    {errors.selectedCourse && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.selectedCourse}
                      </p>
                    )}
                  </div>

                  {selectedCourse && (
                    <>
                      {/* Filters and Search */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 relative">
                          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                          />
                        </div>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        >
                          <option value="all">All Students</option>
                          <option value="completed">Completed Only</option>
                          <option value="eligible">Eligible (80%+)</option>
                        </select>
                      </div>

                      {/* Student List */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Select Students <span className="text-red-500">*</span>
                          </label>
                          {eligibleStudents.length > 0 && (
                            <button
                              type="button"
                              onClick={handleSelectAll}
                              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                              {selectedStudents.length === eligibleStudents.length ? 'Deselect All' : 'Select All'}
                            </button>
                          )}
                        </div>

                        {eligibleStudents.length === 0 ? (
                          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                            <Award className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                            <p className="text-gray-600">No eligible students found for this course</p>
                          </div>
                        ) : (
                          <div className="border border-gray-300 rounded-lg max-h-96 overflow-y-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                  <th className="px-4 py-3 text-left">
                                    <input
                                      type="checkbox"
                                      checked={selectedStudents.length === eligibleStudents.length && eligibleStudents.length > 0}
                                      onChange={handleSelectAll}
                                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                  </th>
                                  <th className="px-4 py-3 text-left font-medium text-gray-700">Student</th>
                                  <th className="px-4 py-3 text-center font-medium text-gray-700">Completion</th>
                                  <th className="px-4 py-3 text-center font-medium text-gray-700">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {eligibleStudents.map((student) => {
                                  const isEligible = student.completionRate >= 80 && student.passedAssessments;
                                  return (
                                    <tr
                                      key={student.id}
                                      className={`hover:bg-gray-50 cursor-pointer ${
                                        selectedStudents.includes(student.id) ? 'bg-blue-50' : ''
                                      }`}
                                      onClick={() => handleStudentSelect(student.id)}
                                    >
                                      <td className="px-4 py-3">
                                        <input
                                          type="checkbox"
                                          checked={selectedStudents.includes(student.id)}
                                          onChange={() => handleStudentSelect(student.id)}
                                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                      </td>
                                      <td className="px-4 py-3">
                                        <div>
                                          <p className="font-medium text-gray-900">{student.name}</p>
                                          <p className="text-xs text-gray-500">{student.email}</p>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        <div className="flex items-center justify-center">
                                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                            <div 
                                              className={`h-2 rounded-full ${
                                                student.completionRate >= 80 ? 'bg-green-600' : 'bg-blue-600'
                                              }`}
                                              style={{ width: `${student.completionRate}%` }}
                                            ></div>
                                          </div>
                                          <span className="text-xs font-medium">{student.completionRate}%</span>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        {isEligible ? (
                                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Eligible
                                          </span>
                                        ) : (
                                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            In Progress
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {errors.selectedStudents && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.selectedStudents}
                          </p>
                        )}

                        {selectedStudents.length > 0 && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-900">
                              <strong>{selectedStudents.length}</strong> student{selectedStudents.length !== 1 ? 's' : ''} selected for certificate issuance
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </>
              ) : (
                /* Results Display */
                <div className="py-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                      <Award className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Certificates Issued!</h3>
                    <p className="text-gray-600">
                      Successfully issued {results.issued} certificate{results.issued !== 1 ? 's' : ''} for
                    </p>
                    <p className="text-lg font-semibold text-blue-600 mt-1">{results.courseTitle}</p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Certificates Generated</span>
                      <span className="text-lg font-bold text-blue-600">{results.issued}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Issued Date</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download All
                    </button>
                    <button
                      type="button"
                      className="flex-1 flex items-center justify-center px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Email to Students
                    </button>
                  </div>
                </div>
              )}

              {issuing && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">Generating certificates...</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 flex justify-end items-center shadow-lg">
              {!results ? (
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={issuing || selectedStudents.length === 0}
                    className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    {issuing ? 'Issuing...' : `Issue ${selectedStudents.length} Certificate${selectedStudents.length !== 1 ? 's' : ''}`}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                >
                  Close
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IssueCertificatesModal;
