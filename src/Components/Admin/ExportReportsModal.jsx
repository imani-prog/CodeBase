import React, { useState } from 'react';
import { X, Download, AlertCircle, FileText, Calendar, Filter, CheckCircle } from 'lucide-react';

const ExportReportsModal = ({ showModal, setShowModal, courses, onExportReport, module = 'training' }) => {
  const [formData, setFormData] = useState({
    reportType: '',
    format: 'pdf',
    dateRange: 'this-month',
    customStartDate: '',
    customEndDate: '',
    selectedCourses: [],
    includeCharts: true,
    includeStudentDetails: false,
    includeFinancials: true
  });

  const [errors, setErrors] = useState({});
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  // Report types based on module
  const trainingReportTypes = [
    { value: 'overview', label: 'Training Overview Report', description: 'Complete summary of all training activities' },
    { value: 'revenue', label: 'Revenue Analysis Report', description: 'Financial performance and revenue breakdown' },
    { value: 'enrollment', label: 'Enrollment Trends Report', description: 'Student enrollment statistics and trends' },
    { value: 'completion', label: 'Course Completion Report', description: 'Completion rates and certification data' },
    { value: 'instructor', label: 'Instructor Performance Report', description: 'Teaching effectiveness and ratings' },
    { value: 'custom', label: 'Custom Report', description: 'Build a custom report with selected metrics' }
  ];

  const telemedicineReportTypes = [
    { value: 'overview', label: 'Telemedicine Overview Report', description: 'Complete summary of all telemedicine sessions and activities' },
    { value: 'revenue', label: 'Revenue Analysis Report', description: 'Financial performance and revenue breakdown by specialty' },
    { value: 'sessions', label: 'Session Analytics Report', description: 'Detailed session statistics, duration, and completion rates' },
    { value: 'doctors', label: 'Doctor Performance Report', description: 'Doctor availability, session counts, and patient ratings' },
    { value: 'patients', label: 'Patient Engagement Report', description: 'Patient usage patterns and satisfaction metrics' },
    { value: 'platform', label: 'Platform Usage Report', description: 'Video, audio, and messaging platform distribution' },
    { value: 'custom', label: 'Custom Report', description: 'Build a custom report with selected metrics' }
  ];

  const reportTypes = module === 'telemedicine' ? telemedicineReportTypes : trainingReportTypes;

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-quarter', label: 'This Quarter' },
    { value: 'this-year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCourseToggle = (courseId) => {
    setFormData(prev => ({
      ...prev,
      selectedCourses: prev.selectedCourses.includes(courseId)
        ? prev.selectedCourses.filter(id => id !== courseId)
        : [...prev.selectedCourses, courseId]
    }));
  };

  const handleSelectAllCourses = () => {
    if (formData.selectedCourses.length === courses?.length) {
      setFormData(prev => ({ ...prev, selectedCourses: [] }));
    } else {
      setFormData(prev => ({ ...prev, selectedCourses: courses?.map(c => c.id) || [] }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.reportType) {
      newErrors.reportType = 'Please select a report type';
    }

    if (formData.dateRange === 'custom') {
      if (!formData.customStartDate) {
        newErrors.customStartDate = 'Start date is required';
      }
      if (!formData.customEndDate) {
        newErrors.customEndDate = 'End date is required';
      }
      if (formData.customStartDate && formData.customEndDate && 
          new Date(formData.customStartDate) > new Date(formData.customEndDate)) {
        newErrors.customEndDate = 'End date must be after start date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setGenerating(true);

    // Simulate report generation
    setTimeout(() => {
      const reportData = {
        ...formData,
        generatedAt: new Date().toISOString(),
        reportId: `RPT-${Date.now()}`
      };

      onExportReport?.(reportData);
      setGenerating(false);
      setGenerated(true);
    }, 2500);
  };

  const handleClose = () => {
    setShowModal(false);
    // Reset form
    setFormData({
      reportType: '',
      format: 'pdf',
      dateRange: 'this-month',
      customStartDate: '',
      customEndDate: '',
      selectedCourses: [],
      includeCharts: true,
      includeStudentDetails: false,
      includeFinancials: true
    });
    setErrors({});
    setGenerating(false);
    setGenerated(false);
  };

  if (!showModal) return null;

  const getReportFileName = () => {
    const type = reportTypes.find(t => t.value === formData.reportType);
    const date = new Date().toISOString().split('T')[0];
    return `${type?.label || 'report'}_${date}.${formData.format}`;
  };

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
                <Download className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">Export Reports</h2>
                <p className="text-sm">
                  {module === 'telemedicine' 
                    ? 'Generate and download telemedicine reports' 
                    : 'Generate and download training reports'}
                </p>
              </div>
            </div>
          </div>

          {/* Form Body - Scrollable */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="px-8 py-6 space-y-6">
              {!generated ? (
                <>
                  {/* Report Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Report Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {reportTypes.map((type) => (
                        <label
                          key={type.value}
                          className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.reportType === type.value
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name="reportType"
                            value={type.value}
                            checked={formData.reportType === type.value}
                            onChange={handleChange}
                            className="mt-1 w-4 h-4  "
                          />
                          <div className="ml-3 flex-1">
                            <p className="font-medium text-gray-900">{type.label}</p>
                            <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.reportType && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.reportType}
                      </p>
                    )}
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Range
                    </label>
                    <select
                      name="dateRange"
                      value={formData.dateRange}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent appearance-none"
                    >
                      {dateRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Custom Date Range */}
                  {formData.dateRange === 'custom' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="customStartDate"
                          value={formData.customStartDate}
                          onChange={handleChange}
                          max={new Date().toISOString().split('T')[0]}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                            errors.customStartDate ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.customStartDate && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.customStartDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          name="customEndDate"
                          value={formData.customEndDate}
                          onChange={handleChange}
                          max={new Date().toISOString().split('T')[0]}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                            errors.customEndDate ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {errors.customEndDate && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.customEndDate}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Format Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Export Format
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <label className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.format === 'pdf' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <input
                          type="radio"
                          name="format"
                          value="pdf"
                          checked={formData.format === 'pdf'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <FileText className="w-5 h-5 mr-2 text-red-600" />
                        <span className="font-medium">PDF</span>
                      </label>
                      <label className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.format === 'excel' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <input
                          type="radio"
                          name="format"
                          value="excel"
                          checked={formData.format === 'excel'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <FileText className="w-5 h-5 mr-2 text-green-600" />
                        <span className="font-medium">Excel</span>
                      </label>
                      <label className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.format === 'csv' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <input
                          type="radio"
                          name="format"
                          value="csv"
                          checked={formData.format === 'csv'}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
                        <span className="font-medium">CSV</span>
                      </label>
                    </div>
                  </div>

                  {/* Course Filter */}
                  {formData.reportType === 'custom' && courses && courses.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Filter by Courses (Optional)
                        </label>
                        <button
                          type="button"
                          onClick={handleSelectAllCourses}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {formData.selectedCourses.length === courses.length ? 'Deselect All' : 'Select All'}
                        </button>
                      </div>
                      <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto p-3 space-y-2">
                        {courses.map((course) => (
                          <label
                            key={course.id}
                            className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={formData.selectedCourses.includes(course.id)}
                              onChange={() => handleCourseToggle(course.id)}
                              className="w-4 h-4 text-blue-600 rounded "
                            />
                            <span className="ml-3 text-sm text-gray-900">{course.title}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Report Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Report Options
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="includeCharts"
                          checked={formData.includeCharts}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-900">Include charts and graphs</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="includeStudentDetails"
                          checked={formData.includeStudentDetails}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-900">Include detailed student information</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="includeFinancials"
                          checked={formData.includeFinancials}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-900">Include financial data</span>
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                /* Success Display */
                <div className="py-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4  flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Report Generated!</h3>
                    <p className="text-gray-600">Your report is ready for download</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">File Name</span>
                      <span className="text-sm font-medium text-gray-900">{getReportFileName()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Format</span>
                      <span className="text-sm font-medium text-gray-900">{formData.format.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Generated</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        
                        console.log('Downloading report...');
                      }}
                      className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </button>
                  </div>
                </div>
              )}

              {generating && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">Generating report...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 flex justify-end items-center shadow-lg">
              {!generated ? (
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
                    disabled={generating}
                    className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {generating ? 'Generating...' : 'Generate Report'}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
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

export default ExportReportsModal;
