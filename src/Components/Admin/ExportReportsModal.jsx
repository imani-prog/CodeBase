import React, { useState } from 'react';
import { X, Download, AlertCircle, FileText, Calendar, Filter, CheckCircle } from 'lucide-react';
import { getApiBaseUrl, getAccessToken } from '../../API/clients/httpClient.js';

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
  const [generatedReport, setGeneratedReport] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setGenerating(true);

    try {
      const reportData = {
        ...formData,
        generatedAt: new Date().toISOString(),
        reportId: `RPT-${Date.now()}`
      };

      const response = await onExportReport?.(reportData);

      setGeneratedReport({
        ...reportData,
        ...response,
      });
      setErrors({});
      setGenerated(true);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error?.message || 'Failed to generate report. Please try again.',
      }));
    } finally {
      setGenerating(false);
    }
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
    setGeneratedReport(null);
  };

  if (!showModal) return null;

  const getReportFileName = () => {
    if (generatedReport?.fileName) return generatedReport.fileName;
    const type = reportTypes.find(t => t.value === formData.reportType);
    const date = new Date().toISOString().split('T')[0];
    return `${type?.label || 'report'}_${date}.${formData.format}`;
  };

  const getMimeType = (format) => {
    const value = String(format || '').toLowerCase();
    if (value === 'pdf') return 'application/pdf';
    if (value === 'csv') return 'text/csv;charset=utf-8';
    if (value === 'excel' || value === 'xlsx') {
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    }
    return 'text/plain;charset=utf-8';
  };

  const triggerBlobDownload = (blob, fileName) => {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  };

  const maybeDecodeBase64ToBlob = (base64Value) => {
    if (!base64Value || typeof base64Value !== 'string') return null;

    const raw = base64Value.includes(',') ? base64Value.split(',').pop() : base64Value;
    if (!raw) return null;

    try {
      const binary = window.atob(raw.replace(/\s+/g, ''));
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
      }
      return new Blob([bytes], { type: getMimeType(generatedReport?.format || formData.format) });
    } catch {
      return null;
    }
  };

  const maybeFetchBlobByReportId = async () => {
    if (!generatedReport?.reportId) return null;

    const reportId = generatedReport.reportId;
    const token = getAccessToken();
    const apiBase = getApiBaseUrl();
    const idSegment = encodeURIComponent(String(reportId));

    const candidates = [
      `${apiBase}/api/reports/${idSegment}/download`,
      `${apiBase}/api/reports/${idSegment}/file`,
      `${apiBase}/api/reports/download/${idSegment}`,
      `${apiBase}/api/training-modules/reports/${idSegment}/download`,
      `${apiBase}/api/training-modules/reports/download/${idSegment}`,
    ];

    for (const url of candidates) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!response.ok) continue;

        const blob = await response.blob();
        if (blob && blob.size > 0) {
          return blob;
        }
      } catch {
        // Ignore and continue trying other candidates.
      }
    }

    return null;
  };

  const handleDownload = async () => {
    const downloadUrl = generatedReport?.downloadUrl || generatedReport?.url;
    if (downloadUrl) {
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (Array.isArray(generatedReport?.fileBytes) && generatedReport.fileBytes.length > 0) {
      const bytes = new Uint8Array(generatedReport.fileBytes);
      const blob = new Blob([bytes], { type: getMimeType(generatedReport?.format || formData.format) });
      triggerBlobDownload(blob, getReportFileName());
      return;
    }

    const base64Blob = maybeDecodeBase64ToBlob(generatedReport?.fileBase64 || generatedReport?.base64);
    if (base64Blob) {
      triggerBlobDownload(base64Blob, getReportFileName());
      return;
    }

    const fetchedBlob = await maybeFetchBlobByReportId();
    if (fetchedBlob) {
      triggerBlobDownload(fetchedBlob, getReportFileName());
      return;
    }

    const fileContent = generatedReport?.fileContent || generatedReport?.content;
    if (typeof fileContent === 'string' && fileContent.trim() !== '') {
      const blob = new Blob([fileContent], { type: getMimeType(generatedReport?.format || formData.format) });
      triggerBlobDownload(blob, getReportFileName());
      return;
    }

    const fallbackContent = JSON.stringify(
      {
        message: 'Backend did not provide a report file; this export metadata was downloaded as fallback.',
        report: generatedReport || null,
      },
      null,
      2
    );
    const fallbackBlob = new Blob([fallbackContent], { type: 'application/json;charset=utf-8' });
    triggerBlobDownload(fallbackBlob, getReportFileName().replace(/\.[^.]+$/, '.json'));

    setErrors((prev) => ({
      ...prev,
      submit: 'Downloaded fallback metadata because the backend did not return a file payload.',
    }));
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
                      <span className="text-sm font-medium text-gray-900">
                        {String(generatedReport?.format || formData.format).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Generated</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(generatedReport?.generatedAt || new Date().toISOString()).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </button>
                  </div>
                </div>
              )}

              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.submit}
                  </p>
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
