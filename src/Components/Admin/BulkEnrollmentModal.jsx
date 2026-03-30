import React, { useState } from 'react';
import { X, Save, UserPlus, AlertCircle, Upload, Download, CheckCircle, XCircle } from 'lucide-react';

const BulkEnrollmentModal = ({ showModal, setShowModal, courses, onBulkEnroll }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [enrollmentMethod, setEnrollmentMethod] = useState('manual'); // 'manual' or 'file'
  const [studentEmails, setStudentEmails] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'selectedCourse') {
      setSelectedCourse(value);
    } else if (name === 'studentEmails') {
      setStudentEmails(value);
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setUploadedFile(file);
        setErrors(prev => ({ ...prev, file: '' }));
      } else {
        setErrors(prev => ({ ...prev, file: 'Please upload a CSV file' }));
      }
    }
  };

  const downloadTemplate = () => {
    const csvContent = "email,firstName,lastName,phone\nexample@email.com,John,Doe,+254712345678\n";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_enrollment_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const validate = () => {
    const newErrors = {};
    
    if (!selectedCourse) {
      newErrors.selectedCourse = 'Please select a course';
    }

    if (enrollmentMethod === 'manual') {
      if (!studentEmails.trim()) {
        newErrors.studentEmails = 'Please enter at least one email address';
      } else {
        // Validate email format
        const emails = studentEmails.split(/[,\n]/).map(e => e.trim()).filter(e => e);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const invalidEmails = emails.filter(email => !emailRegex.test(email));
        if (invalidEmails.length > 0) {
          newErrors.studentEmails = `Invalid email(s): ${invalidEmails.join(', ')}`;
        }
      }
    } else if (enrollmentMethod === 'file') {
      if (!uploadedFile) {
        newErrors.file = 'Please upload a CSV file';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setProcessing(true);

    // Simulate processing
    setTimeout(() => {
      let studentList = [];
      
      if (enrollmentMethod === 'manual') {
        studentList = studentEmails.split(/[,\n]/).map(e => e.trim()).filter(e => e);
      } else {
        // Simulate file processing
        studentList = ['student1@example.com', 'student2@example.com', 'student3@example.com'];
      }

      const successCount = studentList.length;
      const failedCount = 0;

      const enrollmentData = {
        courseId: selectedCourse,
        students: studentList,
        enrolledAt: new Date().toISOString()
      };

      onBulkEnroll?.(enrollmentData);
      
      setResults({
        success: successCount,
        failed: failedCount,
        total: successCount + failedCount
      });

      setProcessing(false);
    }, 2000);
  };

  const handleClose = () => {
    setShowModal(false);
    // Reset form
    setSelectedCourse('');
    setEnrollmentMethod('manual');
    setStudentEmails('');
    setUploadedFile(null);
    setErrors({});
    setResults(null);
    setProcessing(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleClose} />
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl transform transition-all max-w-3xl w-full overflow-hidden max-h-[90vh] flex flex-col">
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
                <UserPlus className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">Bulk Enrollment</h2>
                <p className="text-sm">Enroll multiple students into a course</p>
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
                      name="selectedCourse"
                      value={selectedCourse}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent appearance-none ${
                        errors.selectedCourse ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Choose a course...</option>
                      {courses?.filter(c => c.status === 'active').map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title} - {course.enrolledStudents}/{course.maxStudents} enrolled
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

                  {/* Enrollment Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Enrollment Method
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setEnrollmentMethod('manual')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          enrollmentMethod === 'manual'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <UserPlus className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                        <p className="font-medium text-sm">Manual Entry</p>
                        <p className="text-xs text-gray-500 mt-1">Enter emails manually</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setEnrollmentMethod('file')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          enrollmentMethod === 'file'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Upload className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                        <p className="font-medium text-sm">File Upload</p>
                        <p className="text-xs text-gray-500 mt-1">Upload CSV file</p>
                      </button>
                    </div>
                  </div>

                  {/* Manual Entry */}
                  {enrollmentMethod === 'manual' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Student Email Addresses <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="studentEmails"
                        value={studentEmails}
                        onChange={handleChange}
                        rows="8"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                          errors.studentEmails ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Enter email addresses (one per line or comma-separated)&#10;Example:&#10;student1@email.com&#10;student2@email.com&#10;student3@email.com"
                      />
                      {errors.studentEmails && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.studentEmails}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-gray-500">
                        You can enter emails separated by commas or line breaks
                      </p>
                    </div>
                  )}

                  {/* File Upload */}
                  {enrollmentMethod === 'file' && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Upload CSV File <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={downloadTemplate}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download Template
                        </button>
                      </div>
                      <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                        errors.file ? 'border-red-300' : 'border-gray-300'
                      }`}>
                        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <input
                          type="file"
                          accept=".csv"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </label>
                        {uploadedFile && (
                          <p className="mt-3 text-sm text-gray-600">
                            Selected: <span className="font-medium">{uploadedFile.name}</span>
                          </p>
                        )}
                        {!uploadedFile && (
                          <p className="mt-3 text-sm text-gray-500">
                            Upload a CSV file with student information
                          </p>
                        )}
                      </div>
                      {errors.file && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.file}
                        </p>
                      )}
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-gray-700">
                          <strong>CSV Format:</strong> The file should contain columns: email, firstName, lastName, phone
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Results Display */
                <div className="py-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Enrollment Complete!</h3>
                    <p className="text-gray-600">Students have been successfully enrolled</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 border border-gray-200 text-center">
                      <p className="text-3xl font-bold text-blue-600">{results.total}</p>
                      <p className="text-sm text-gray-600 mt-1">Total Processed</p>
                    </div>
                    <div className="p-4 border border-gray-200 text-center">
                      <p className="text-3xl font-bold text-green-600">{results.success}</p>
                      <p className="text-sm text-gray-600 mt-1">Successful</p>
                    </div>
                    <div className="p-4 border border-gray-200 text-center">
                      <p className="text-3xl font-bold text-red-600">{results.failed}</p>
                      <p className="text-sm text-gray-600 mt-1">Failed</p>
                    </div>
                  </div>
                </div>
              )}

              {processing && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">Processing enrollments...</p>
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
                    disabled={processing}
                    className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {processing ? 'Processing...' : 'Enroll Students'}
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

export default BulkEnrollmentModal;
