import React, { useState } from 'react';
import { X, Save, BookOpen, AlertCircle, ChevronRight, ChevronLeft, Plus, Trash2 } from 'lucide-react';

const CreateCourseModal = ({ showModal, setShowModal, onSaveCourse }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    description: '',
    duration: '',
    level: 'Beginner',
    category: '',
    price: '',
    maxStudents: '',
    
    // Course Details
    instructor: '',
    difficulty: 'Beginner',
    modules: [''],
    certification: '',
    
    // Additional Settings
    status: 'draft',
    image: ''
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Community Health',
    'Technology',
    'Administration',
    'Telemedicine',
    'Data Analytics',
    'Maternal Health',
    'Quality Management',
    'Mental Health'
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

  const handleModuleChange = (index, value) => {
    const updatedModules = [...formData.modules];
    updatedModules[index] = value;
    setFormData(prev => ({ ...prev, modules: updatedModules }));
  };

  const addModule = () => {
    setFormData(prev => ({ ...prev, modules: [...prev.modules, ''] }));
  };

  const removeModule = (index) => {
    if (formData.modules.length > 1) {
      const updatedModules = formData.modules.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, modules: updatedModules }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // Step 1 - Basic Information
    if (currentStep === 1) {
      if (!formData.title.trim()) newErrors.title = 'Course title is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
      if (!formData.category.trim()) newErrors.category = 'Category is required';
      if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
      if (!formData.maxStudents || formData.maxStudents <= 0) newErrors.maxStudents = 'Max students is required';
    }
    
    // Step 2 - Course Details
    if (currentStep === 2) {
      if (!formData.instructor.trim()) newErrors.instructor = 'Instructor name is required';
      if (!formData.certification.trim()) newErrors.certification = 'Certification name is required';
      const filledModules = formData.modules.filter(m => m.trim());
      if (filledModules.length === 0) newErrors.modules = 'At least one module is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const newCourse = {
      id: Date.now(),
      ...formData,
      modules: formData.modules.filter(m => m.trim()),
      participants: 0,
      enrolledStudents: 0,
      rating: 0,
      revenue: 0,
      completionRate: 0,
      passRate: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    onSaveCourse?.(newCourse);
    setShowModal(false);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      duration: '',
      level: 'Beginner',
      category: '',
      price: '',
      maxStudents: '',
      instructor: '',
      difficulty: 'Beginner',
      modules: [''],
      certification: '',
      status: 'draft',
      image: ''
    });
    setCurrentStep(1);
    setErrors({});
  };

  if (!showModal) return null;

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)} />
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white shadow-2xl transform transition-all max-w-4xl w-full overflow-hidden max-h-[90vh] flex flex-col">
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
                <h2 className="text-2xl font-bold mb-1">Create New Course</h2>
                <p className="text-sm">Add a new training course to the system</p>
              </div>
            </div>
          </div>

          {/* Progress Stepper */}
          <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep >= step 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${
                      currentStep >= step ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {step === 1 && 'Basic Info'}
                      {step === 2 && 'Course Details'}
                      {step === 3 && 'Review'}
                    </span>
                  </div>
                  {step < 3 && (
                    <div className={`h-1 flex-1 mx-2 rounded transition-all ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Form Body - Scrollable */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="px-8 py-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                          errors.title ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Community Health Worker Certification"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                          errors.description ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Describe the course content and objectives..."
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.description}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="duration"
                          value={formData.duration}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                            errors.duration ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="e.g., 6 weeks, 3 months"
                        />
                        {errors.duration && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.duration}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent appearance-none ${
                            errors.category ? 'border-red-300' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.category}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Difficulty Level <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="difficulty"
                          value={formData.difficulty}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent appearance-none"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Price (KSh) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          min="0"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                            errors.price ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="15000"
                        />
                        {errors.price && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.price}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum Students <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="maxStudents"
                          value={formData.maxStudents}
                          onChange={handleChange}
                          min="1"
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                            errors.maxStudents ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="100"
                        />
                        {errors.maxStudents && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.maxStudents}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Course Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Course Details</h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Instructor Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="instructor"
                          value={formData.instructor}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                            errors.instructor ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Dr. John Doe"
                        />
                        {errors.instructor && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.instructor}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Certification Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="certification"
                          value={formData.certification}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent ${
                            errors.certification ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="MediLink Certified CHW"
                        />
                        {errors.certification && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.certification}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Course Modules <span className="text-red-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={addModule}
                          className="flex items-center px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Module
                        </button>
                      </div>
                      <div className="space-y-3">
                        {formData.modules.map((module, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-500 w-8">{index + 1}.</span>
                            <input
                              type="text"
                              value={module}
                              onChange={(e) => handleModuleChange(index, e.target.value)}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                              placeholder="Module name"
                            />
                            {formData.modules.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeModule(index)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      {errors.modules && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.modules}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Image URL
                      </label>
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                        placeholder="/src/assets/course-image.jpg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Review Course Details</h3>
                  
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Course Title</p>
                        <p className="font-semibold text-gray-900">{formData.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-semibold text-gray-900">{formData.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-semibold text-gray-900">{formData.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Difficulty</p>
                        <p className="font-semibold text-gray-900">{formData.difficulty}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Price</p>
                        <p className="font-semibold text-gray-900">KSh {Number(formData.price).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Max Students</p>
                        <p className="font-semibold text-gray-900">{formData.maxStudents}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Instructor</p>
                        <p className="font-semibold text-gray-900">{formData.instructor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Certification</p>
                        <p className="font-semibold text-gray-900">{formData.certification}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Description</p>
                      <p className="text-gray-900">{formData.description}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Modules ({formData.modules.filter(m => m.trim()).length})</p>
                      <ul className="list-disc list-inside space-y-1">
                        {formData.modules.filter(m => m.trim()).map((module, index) => (
                          <li key={index} className="text-gray-900">{module}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Initial Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent appearance-none"
                      >
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 flex justify-between items-center shadow-lg">
              <div className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </div>
              <div className="flex space-x-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex items-center px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>
                )}
                
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Create Course
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseModal;
