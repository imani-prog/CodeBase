import React from "react";
import { Clock, BarChart3, Users, Star, Award, ArrowLeft } from "lucide-react";

const CoursesModal = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-extrabold transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Courses
      </button>

        {/* Course Hero Section */}
        <div className="overflow-hidden mb-8">
          <div className="md:flex">
            {/* Course Image */}
            <div className="md:w-1/2">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Course Info */}
            <div className="md:w-1/2 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                
                {/* Course Meta */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Duration:</span> {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Level:</span> {course.level}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Enrolled:</span> {course.participants} students
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">Rating:</span> {course.rating}/5
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">{course.description}</p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Enroll Now
                </button>
                <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Details Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Course Modules */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-6 font-serif flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              Course Modules
            </h3>
            <ul className="space-y-3">
              {course.modules.map((module, index) => (
                <li key={index} className="flex items-start gap-3 p-3  transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-black">{module}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Certification & Additional Info */}
          <div className="space-y-6">
            {/* Certification */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2 font-serif">
                <Award className="w-6 h-6 text-yellow-500" />
                Certification
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <div className="flex items-center gap-4">
                  <Award className="w-12 h-12 text-yellow-500" />
                  <div>
                    <div className="font-bold text-lg text-gray-900">{course.certification}</div>
                    <div className="text-sm text-gray-600 mt-1">Digital badge included</div>
                    <div className="text-sm text-blue-600 mt-2">Accredited by leading healthcare institutions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Benefits */}
            <div className="bg-white rounded-lg shadow-md p-2">
              <h3 className="text-2xl font-bold text-black font-serif mb-3">What You'll Gain</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-700">Industry-recognized certification</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-700">Practical hands-on experience</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-700">Career advancement opportunities</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-700">24/7 learning support</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-gray-700">Networking with healthcare professionals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  );
};

export default CoursesModal;