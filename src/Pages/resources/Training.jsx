/* eslint-disable no-unused-vars */
import { useState } from 'react';
import TrainingPath from '../../Components/TrainingPath.jsx';
import WhyChooseTraining from '../../Components/WhyChooseTraining.jsx';
import { Users, TrendingUp, Star, Award } from 'lucide-react';

// Import training-related assets
import HealthTechTraining from '../../assets/HealthTechTraining.jpg';
import ManualForCHWTraining from '../../assets/ManualForCHWTraining.png';
import CommunityHealthWorker from '../../assets/CommunityHealthWorker.jpeg';
import CommunityWorkerOutreach from '../../assets/CommunityWorkerOutreach.jpeg';
import ComponentsTechnology from '../../assets/ComponentsTechnology.jpeg';
import TelemedicinePatients from '../../assets/TelemedicinePatients.jpeg';
import SmartHealthcare from '../../assets/SmartHealthcare77.jpg';
import Workers from '../../assets/Workers.jpg';
import TrainingMethodology from '../../Components/TrainingMethodology.jsx';

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
      description: 'Master remote patient care, teleconsultation, and virtual health services with comprehensive hands-on training.',
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
    },
    {
      id: 5,
      title: 'Healthcare Data Analytics',
      duration: '7 weeks',
      level: 'Advanced',
      price: 'KES 22,000',
      image: HealthTechTraining,
      description: 'Learn to analyze healthcare data, create meaningful reports, and drive data-driven decisions in healthcare settings.',
      modules: [
        'Healthcare Data Fundamentals',
        'Statistical Analysis in Healthcare',
        'Data Visualization Tools',
        'Predictive Analytics',
        'Healthcare Metrics & KPIs',
        'Regulatory Compliance'
      ],
      certification: 'Healthcare Data Analyst',
      participants: 85,
      rating: 4.7
    },
    {
      id: 6,
      title: 'Maternal & Child Health Specialist',
      duration: '8 weeks',
      level: 'Intermediate to Advanced',
      price: 'KES 20,000',
      image: CommunityWorkerOutreach,
      description: 'Specialized training focused on maternal and child health, including prenatal care, child development, and family planning.',
      modules: [
        'Prenatal & Postnatal Care',
        'Child Development Milestones',
        'Nutrition for Mothers & Children',
        'Immunization Programs',
        'Family Planning Counseling',
        'Emergency Obstetric Care'
      ],
      certification: 'Maternal & Child Health Specialist',
      participants: 120,
      rating: 4.9
    },
    {
      id: 7,
      title: 'Healthcare Quality Improvement',
      duration: '6 weeks',
      level: 'Intermediate',
      price: 'KES 16,000',
      image: SmartHealthcare,
      description: 'Learn quality improvement methodologies, patient safety protocols, and healthcare accreditation standards.',
      modules: [
        'Quality Management Systems',
        'Patient Safety Protocols',
        'Healthcare Accreditation',
        'Performance Measurement',
        'Process Improvement',
        'Risk Management'
      ],
      certification: 'Healthcare Quality Specialist',
      participants: 95,
      rating: 4.6
    },
    {
      id: 8,
      title: 'Mental Health First Aid',
      duration: '3 weeks',
      level: 'Beginner',
      price: 'KES 8,000',
      image: Workers,
      description: 'Essential mental health awareness and first aid skills for healthcare workers and community volunteers.',
      modules: [
        'Mental Health Awareness',
        'Crisis Intervention',
        'De-escalation Techniques',
        'Referral Pathways',
        'Self-Care for Caregivers',
        'Community Mental Health'
      ],
      certification: 'Mental Health First Aid Certificate',
      participants: 180,
      rating: 4.8
    }
  ];

  const testimonials = [
    {
      name: 'Grace Achieng',
      role: 'Community Health Worker, Nairobi County',
      image: CommunityWorkerOutreach,
      text: 'The CHW certification program transformed my approach to community health. The practical skills I learned have made me more effective in serving my community. The digital health training especially helped me use technology to better track and manage patient records.',
      rating: 5,
      course: 'Community Health Worker Certification'
    },
    {
      name: 'Dr. Peter Njoroge',
      role: 'Healthcare Administrator, Kenyatta Hospital',
      image: Workers,
      text: 'The healthcare administration course provided me with essential management skills. The curriculum is well-structured and highly relevant to our local context. I was able to implement new quality improvement processes immediately after completing the course.',
      rating: 5,
      course: 'Healthcare System Administration'
    },
    {
      name: 'Susan Mwangi',
      role: 'Telemedicine Specialist, Private Practice',
      image: TelemedicinePatients,
      text: 'The telemedicine training opened up new opportunities for my practice. I can now provide remote consultations effectively and help patients who cannot physically visit the clinic. The technical training was thorough and practical.',
      rating: 5,
      course: 'Telemedicine & Remote Care'
    },
    {
      name: 'Joseph Otieno',
      role: 'Data Analyst, Ministry of Health',
      image: HealthTechTraining,
      text: 'The healthcare data analytics course gave me the skills to turn raw health data into meaningful insights. Now I help inform policy decisions with data-driven recommendations. The instructors were knowledgeable and supportive throughout.',
      rating: 5,
      course: 'Healthcare Data Analytics'
    },
    {
      name: 'Mary Wanjiku',
      role: 'Maternal Health Specialist, Machakos County',
      image: CommunityHealthWorker,
      text: 'This specialized training in maternal and child health has been invaluable. I now feel more confident handling complex cases and educating mothers in my community. The practical sessions were particularly helpful.',
      rating: 5,
      course: 'Maternal & Child Health Specialist'
    },
    {
      name: 'Kevin Murage',
      role: 'Quality Improvement Officer, Coast General Hospital',
      image: SmartHealthcare,
      text: 'The quality improvement training equipped me with tools and methodologies to enhance patient care in our facility. We have seen significant improvements in patient satisfaction and safety metrics since implementing what I learned.',
      rating: 5,
      course: 'Healthcare Quality Improvement'
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
      <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
        <div className="rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
                  <span> {course.duration}</span>
                  <span> {course.level}</span>
                  <span> {course.participants} enrolled</span>
                  <span> {course.rating}/5</span>
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
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      {/* Hero Section */}
      <section className="">
        <div className="absolute inset-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-serif sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-900 mb-3 sm:mb-4 lg:mb-6 leading-tight text-center">
              Professional Healthcare Training
            </h1>
            <p className="text-sm sm:text-base md:text-lg w-full text-center sm:text-left leading-relaxed mb-10 max-w-4xl mx-auto text-blue-600 font-bold">
              Empowering healthcare professionals with cutting-edge skills and internationally recognized certifications
            </p>
            <p className="text-lg mb-8 max-w-4xl mx-auto">
              Advance your healthcare career with MediLink Training programs offering expert-designed courses that combine theory, practical skills, and hands-on experience. Trusted by 500+ professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                Browse Courses
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            {stats.map((stat, index) => {
              const icons = [Users, TrendingUp, Star, Award];
              const IconComponent = icons[index];
              return (
                <div key={index} className="bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-4 sm:px-6 py-8 flex items-center">
                  <IconComponent className="w-4 h-4 mr-2 text-black" />
                  <span className="text-base sm:text-lg text-black font-serif font-bold">
                    {stat.number} {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Pathways Section */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4 font-serif">
              Structured Learning Pathways
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Follow our carefully designed career progression paths tailored to different healthcare roles and experience levels
            </p>
          </div>
          <TrainingPath />
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4 font-serif">
              Why Choose MediLink Training?
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              We provide comprehensive, practical training that prepares you for real-world healthcare challenges with cutting-edge methodologies and expert instruction
            </p>
          </div>
          <WhyChooseTraining />

        </div>
      </section>

      {/* Training Programs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Comprehensive Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-leading courses designed by healthcare experts to advance your career and improve patient outcomes. 
              Each program combines theoretical knowledge with practical skills and real-world application.
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

      <TrainingMethodology />

      {/* Training Delivery Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Deliver Excellence in Training
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our innovative training delivery combines cutting-edge technology with human-centered learning approaches
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-600">🚀 Smart Learning Technology</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <h4 className="font-semibold mb-2">AI-Powered Learning Analytics</h4>
                  <p className="text-gray-600 text-sm">
                    Our platform uses artificial intelligence to track learning patterns, identify struggling areas, 
                    and automatically adjust content difficulty and pacing for optimal learning outcomes.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                  <h4 className="font-semibold mb-2">Virtual Reality Medical Simulations</h4>
                  <p className="text-gray-600 text-sm">
                    Immersive VR experiences allow trainees to practice complex procedures in a risk-free environment, 
                    from surgical techniques to emergency response scenarios.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
                  <h4 className="font-semibold mb-2">Mobile-First Learning Platform</h4>
                  <p className="text-gray-600 text-sm">
                    Access training materials on smartphones, tablets, or computers with offline sync capabilities 
                    for uninterrupted learning in areas with limited connectivity.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-green-600">👥 Human-Centered Approach</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
                  <h4 className="font-semibold mb-2">Expert Instructor Network</h4>
                  <p className="text-gray-600 text-sm">
                    Learn from a diverse team of 50+ healthcare professionals including doctors, nurses, 
                    public health experts, and technology specialists with real-world experience.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
                  <h4 className="font-semibold mb-2">Peer Learning Communities</h4>
                  <p className="text-gray-600 text-sm">
                    Join cohort-based learning groups where trainees collaborate, share experiences, 
                    and learn from each other's diverse healthcare backgrounds and challenges.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
                  <h4 className="font-semibold mb-2">Personalized Mentorship</h4>
                  <p className="text-gray-600 text-sm">
                    Each trainee is paired with an experienced healthcare professional who provides 
                    guidance, career advice, and ongoing support throughout their learning journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transformative Benefits Beyond Traditional Training
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach delivers life-changing benefits that extend far beyond skill acquisition
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3">Income Growth Guarantee</h3>
              <p className="text-gray-700 mb-4">
                Our graduates see an average 40% salary increase within 6 months of completion. 
                We offer income growth coaching and salary negotiation support.
              </p>
              <div className="bg-blue-600 text-white p-3 rounded text-sm">
                <strong>Real Impact:</strong> CHW graduates earn KES 25,000-45,000 monthly vs. KES 15,000 before training
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <div className="text-3xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3">Professional Recognition</h3>
              <p className="text-gray-700 mb-4">
                Gain respect and recognition in your community. Our certified professionals are preferred 
                by employers and trusted by patients and families.
              </p>
              <div className="bg-green-600 text-white p-3 rounded text-sm">
                <strong>Community Impact:</strong> 95% of our CHWs become lead health advocates in their communities
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Career Advancement Pathway</h3>
              <p className="text-gray-700 mb-4">
                Clear progression from basic certification to leadership roles. Many graduates become 
                supervisors, trainers, and healthcare facility managers.
              </p>
              <div className="bg-purple-600 text-white p-3 rounded text-sm">
                <strong>Success Rate:</strong> 60% of graduates are promoted to leadership roles within 2 years
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-3">Confidence & Competence</h3>
              <p className="text-gray-700 mb-4">
                Build unshakeable confidence through hands-on practice and expert validation. 
                Handle complex healthcare situations with professional competence.
              </p>
              <div className="bg-orange-600 text-white p-3 rounded text-sm">
                <strong>Confidence Boost:</strong> 98% report feeling "completely confident" in their abilities post-training
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3">Global Opportunities</h3>
              <p className="text-gray-700 mb-4">
                Our internationally recognized certifications open doors to opportunities 
                across East Africa and global healthcare organizations.
              </p>
              <div className="bg-red-600 text-white p-3 rounded text-sm">
                <strong>Global Reach:</strong> 15% of graduates work internationally with NGOs and UN agencies
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg">
              <div className="text-3xl mb-4">💪</div>
              <h3 className="text-xl font-semibold mb-3">Personal Transformation</h3>
              <p className="text-gray-700 mb-4">
                Beyond professional skills, develop leadership qualities, communication excellence, 
                and the ability to make life-saving decisions under pressure.
              </p>
              <div className="bg-indigo-600 text-white p-3 rounded text-sm">
                <strong>Life Impact:</strong> 90% report improved family health and community standing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Inspiring Success Stories
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Real transformations from our training programs - these are the stories that drive our mission
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white shadow-lg p-8 rounded-lg border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-green-600 font-bold text-xl">SK</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Sarah Kimani</h3>
                  <p className="text-gray-600">From Unemployed to Healthcare Leader</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  <strong className="text-red-600">Before:</strong> Unemployed mother of three, struggling to make ends meet in rural Machakos
                </p>
                <p className="text-sm text-gray-700">
                  <strong className="text-blue-600">Training:</strong> Completed CHW Certification + Digital Health Technology programs
                </p>
                <p className="text-sm text-gray-700">
                  <strong className="text-green-600">After:</strong> Now supervises 12 CHWs, earning KES 55,000 monthly, owns a community health clinic
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="italic text-sm text-gray-800">
                    "MediLink didn't just give me skills - they gave me a future. Today, I'm not just supporting my family, 
                    I'm saving lives in my community every day. The respect and recognition I've gained is priceless."
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full">📈 Income: +350%</span>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full">👥 Impact: 500+ patients served</span>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-lg p-8 rounded-lg border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-purple-600 font-bold text-xl">DO</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">David Ochieng</h3>
                  <p className="text-gray-600">Technology Revolutionary in Healthcare</p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  <strong className="text-red-600">Before:</strong> Basic computer skills, working as a clinic receptionist
                </p>
                <p className="text-sm text-gray-700">
                  <strong className="text-blue-600">Training:</strong> Digital Health Technology + Healthcare Data Analytics programs
                </p>
                <p className="text-sm text-gray-700">
                  <strong className="text-green-600">After:</strong> Chief Technology Officer at a network of 8 clinics, consultant for Ministry of Health
                </p>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <p className="italic text-sm text-gray-800">
                    "I went from struggling with basic computer tasks to implementing AI-powered diagnostic systems. 
                    MediLink's training opened doors I never knew existed. I'm now helping shape Kenya's digital health future."
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full">🚀 Role: CTO Level</span>
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full">🏥 Impact: 8 clinics digitized</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white shadow-lg p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Community Impact Highlights</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-3xl font-bold mb-2 text-green-600">2,500+</div>
                <div className="text-sm text-gray-700">Lives Directly Saved</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-3xl font-bold mb-2 text-blue-600">15,000+</div>
                <div className="text-sm text-gray-700">Patients Better Served</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-3xl font-bold mb-2 text-purple-600">45</div>
                <div className="text-sm text-gray-700">Communities Transformed</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="text-3xl font-bold mb-2 text-orange-600">85%</div>
                <div className="text-sm text-gray-700">Reduction in Medical Errors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships & Accreditations Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted Partnerships & Accreditations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our training programs are developed in collaboration with leading healthcare institutions and recognized by major accrediting bodies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl mb-3">🏥</div>
              <h3 className="font-semibold mb-2">Ministry of Health Kenya</h3>
              <p className="text-sm text-gray-600">Official recognition and curriculum approval</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-semibold mb-2">World Health Organization</h3>
              <p className="text-sm text-gray-600">WHO standards compliance and guidelines</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="font-semibold mb-2">Kenya Medical Training Colleges</h3>
              <p className="text-sm text-gray-600">Continuing education credits and pathways</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-semibold mb-2">Clinical Partners Network</h3>
              <p className="text-sm text-gray-600">15+ hospitals and health centers</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-center mb-6">Training Delivery Methods</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h4 className="font-semibold mb-2">Online Learning</h4>
                <p className="text-sm text-gray-600">Interactive online modules, virtual simulations, and digital assessments accessible 24/7</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h4 className="font-semibold mb-2">In-Person Workshops</h4>
                <p className="text-sm text-gray-600">Hands-on practical sessions, group discussions, and peer-to-peer learning experiences</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏥</span>
                </div>
                <h4 className="font-semibold mb-2">Clinical Placements</h4>
                <p className="text-sm text-gray-600">Real-world experience in healthcare facilities with mentorship and supervised practice</p>
              </div>
            </div>
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    <div className="text-blue-600 text-xs font-medium mt-1">{testimonial.course}</div>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Healthcare Career?
          </h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Join over 500+ healthcare professionals who have enhanced their skills, advanced their careers, 
            and improved patient outcomes through MediLink Training programs
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-blue-700 bg-opacity-50 p-4 rounded-lg">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm opacity-90">Job Placement Rate</div>
            </div>
            <div className="bg-blue-700 bg-opacity-50 p-4 rounded-lg">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-90">Learning Support</div>
            </div>
            <div className="bg-blue-700 bg-opacity-50 p-4 rounded-lg">
              <div className="text-2xl font-bold">15+</div>
              <div className="text-sm opacity-90">Clinical Partners</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              🚀 Start Your Journey Today
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              📞 Schedule Free Consultation
            </button>
          </div>
          
          <p className="text-sm opacity-80">
            💼 Career support included • 🎓 Internationally certified • 📱 Mobile learning platform • 🏥 Clinical placements available
          </p>
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
