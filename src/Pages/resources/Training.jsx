/* eslint-disable no-unused-vars */
import { useState } from 'react';

// Import training-related assets
import HealthTechTraining from '../../assets/HealthTechTraining.jpg';
import ManualForCHWTraining from '../../assets/ManualForCHWTraining.png';
import CommunityHealthWorker from '../../assets/CommunityHealthWorker.jpeg';
import CommunityWorkerOutreach from '../../assets/CommunityWorkerOutreach.jpeg';
import ComponentsTechnology from '../../assets/ComponentsTechnology.jpeg';
import TelemedicinePatients from '../../assets/TelemedicinePatients.jpeg';
import SmartHealthcare from '../../assets/SmartHealthcare77.jpg';
import Workers from '../../assets/Workers.jpg';

const Training = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const trainingPrograms = [
    {
      id: 1,
      title: 'Community Health Worker Certification',
      duration: '6 weeks',
      level: 'Beginner to Intermediate',
      price: 'KES 15,000',
      image: CommunityHealthWorker,
      description: 'Comprehensive training for Community Health Workers covering patient care, health education, and community outreach.',
      modules: [
        'Basic Health Assessment',
        'Community Health Education',
        'Patient Referral Systems',
        'Health Data Collection',
        'Emergency Response',
        'Communication Skills'
      ],
      certification: 'MediLink Certified CHW',
      participants: 250,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Digital Health Technology Training',
      duration: '4 weeks',
      level: 'Intermediate',
      price: 'KES 12,000',
      image: ComponentsTechnology,
      description: 'Learn to use modern healthcare technology, electronic health records, and telemedicine platforms.',
      modules: [
        'Electronic Health Records',
        'Telemedicine Platforms',
        'Mobile Health Apps',
        'Data Security & Privacy',
        'Technology Troubleshooting',
        'Digital Communication'
      ],
      certification: 'Digital Health Specialist',
      participants: 180,
      rating: 4.9
    },
    {
      id: 3,
      title: 'Healthcare System Administration',
      duration: '8 weeks',
      level: 'Advanced',
      price: 'KES 25,000',
      image: SmartHealthcare,
      description: 'Advanced training for healthcare administrators and system managers.',
      modules: [
        'Healthcare Management',
        'Quality Assurance',
        'Budget Management',
        'Staff Coordination',
        'Compliance & Regulations',
        'Strategic Planning'
      ],
      certification: 'Healthcare Administrator',
      participants: 95,
      rating: 4.7
    },
    {
      id: 4,
      title: 'Telemedicine & Remote Care',
      duration: '5 weeks',
      level: 'Intermediate',
      price: 'KES 18,000',
      image: TelemedicinePatients,
      description: 'Master remote patient care, teleconsultation, and virtual health services.',
      modules: [
        'Teleconsultation Techniques',
        'Remote Monitoring',
        'Virtual Triage',
        'Patient Communication',
        'Technology Setup',
        'Emergency Protocols'
      ],
      certification: 'Telemedicine Specialist',
      participants: 140,
      rating: 4.6
    }
  ];

  const features = [
    {
      icon: '🎓',
      title: 'Certified Training',
      description: 'Internationally recognized certifications with digital badges'
    },
    {
      icon: '👥',
      title: 'Expert Instructors',
      description: 'Learn from experienced healthcare professionals and technology experts'
    },
    {
      icon: '💻',
      title: 'Online & Offline',
      description: 'Flexible learning options with both virtual and in-person sessions'
    },
    {
      icon: '🏆',
      title: 'Career Support',
      description: 'Post-training job placement assistance and career guidance'
    },
    {
      icon: '📱',
      title: 'Mobile Learning',
      description: 'Access course materials and resources on any device'
    },
    {
      icon: '🔄',
      title: 'Continuous Updates',
      description: 'Regular curriculum updates based on industry trends'
    }
  ];

  const testimonials = [
    {
      name: 'Grace Achieng',
      role: 'Community Health Worker',
      image: CommunityWorkerOutreach,
      text: 'The CHW certification program transformed my approach to community health. The practical skills I learned have made me more effective in serving my community.',
      rating: 5
    },
    {
      name: 'Dr. Peter Njoroge',
      role: 'Healthcare Administrator',
      image: Workers,
      text: 'The healthcare administration course provided me with essential management skills. The curriculum is well-structured and highly relevant to our local context.',
      rating: 5
    }
  ];

  const stats = [
    { number: '500+', label: 'Trained Professionals' },
    { number: '15+', label: 'Training Programs' },
    { number: '98%', label: 'Completion Rate' },
    { number: '95%', label: 'Job Placement Rate' }
  ];

  const CourseModal = ({ course, onClose }) => {
    if (!course) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{course.title}</h2>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span>⏱️ {course.duration}</span>
                  <span>📊 {course.level}</span>
                  <span>👥 {course.participants} enrolled</span>
                  <span>⭐ {course.rating}/5</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{course.price}</div>
                <div className="text-sm text-gray-500">Per participant</div>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{course.description}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Course Modules</h3>
                <ul className="space-y-2">
                  {course.modules.map((module, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {module}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Certification</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🏆</span>
                    <div>
                      <div className="font-medium">{course.certification}</div>
                      <div className="text-sm text-gray-600">Digital badge included</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Enroll Now
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Healthcare Training
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Empowering healthcare professionals with cutting-edge skills and internationally recognized certifications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Browse Courses
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MediLink Training?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive, practical training that prepares you for real-world healthcare challenges
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive courses designed to advance your career in healthcare
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {trainingPrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{program.title}</h3>
                    <span className="text-lg font-bold text-blue-600">{program.price}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                    <span>⏱️ {program.duration}</span>
                    <span>📊 {program.level}</span>
                    <span>⭐ {program.rating}/5</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => setSelectedCourse(program)}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from healthcare professionals who've completed our programs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Advance Your Healthcare Career?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who have enhanced their skills with MediLink Training
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Course Detail Modal */}
      <CourseModal 
        course={selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
      />
    </div>
  );
};

export default Training;
