// TrainingCourses.jsx
import React, { useState } from "react";
import { Clock, BarChart3, Users, Star, Award, X } from "lucide-react";
import CoursesModal from "./CoursesModal.jsx";
// Individual asset imports
import HealthTechTraining from "../assets/HealthTechTraining.jpg";
import CommunityHealthWorker from "../assets/CommunityHealthWorkerTraining.webp";
import CommunityWorkerOutreach from "../assets/CommunityWorkerOutreach.jpeg";
import ComponentsTechnology from "../assets/ComponentsTechnology.jpeg";
import TelemedicinePatients from "../assets/TelemedicinePatients.jpeg";
import SmartHealthcare from "../assets/SmartHealthcare77.jpg";
import Workers from "../assets/Workers.jpg";

const trainingPrograms = [
  {
    id: 1,
    title: "Community Health Worker Certification",
    duration: "6 weeks",
    level: "Beginner to Intermediate",
    image: CommunityHealthWorker,
    description:
      "Comprehensive training for Community Health Workers covering patient care, health education, and community outreach.",
    modules: [
      "Basic Health Assessment",
      "Community Health Education",
      "Patient Referral Systems",
      "Health Data Collection",
      "Emergency Response",
      "Communication Skills",
    ],
    certification: "MediLink Certified CHW",
    participants: 250,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Digital Health Technology Training",
    duration: "4 weeks",
    level: "Intermediate",
    image: ComponentsTechnology,
    description:
      "Learn to use modern healthcare technology, electronic health records, and telemedicine platforms.",
    modules: [
      "Electronic Health Records",
      "Telemedicine Platforms",
      "Mobile Health Apps",
      "Data Security & Privacy",
      "Technology Troubleshooting",
      "Digital Communication",
    ],
    certification: "Digital Health Specialist",
    participants: 180,
    rating: 4.9,
  },
  {
    id: 3,
    title: "Healthcare System Administration",
    duration: "8 weeks",
    level: "Advanced",
    image: SmartHealthcare,
    description:
      "Advanced training for healthcare administrators and system managers.",
    modules: [
      "Healthcare Management",
      "Quality Assurance",
      "Budget Management",
      "Staff Coordination",
      "Compliance & Regulations",
      "Strategic Planning",
    ],
    certification: "Healthcare Administrator",
    participants: 95,
    rating: 4.7,
  },
  {
    id: 4,
    title: "Telemedicine & Remote Care",
    duration: "5 weeks",
    level: "Intermediate",
    image: TelemedicinePatients,
    description:
      "Master remote patient care, teleconsultation, and virtual health services with comprehensive hands-on training.",
    modules: [
      "Teleconsultation Techniques",
      "Remote Monitoring",
      "Virtual Triage",
      "Patient Communication",
      "Technology Setup",
      "Emergency Protocols",
    ],
    certification: "Telemedicine Specialist",
    participants: 140,
    rating: 4.6,
  },
  {
    id: 5,
    title: "Healthcare Data Analytics",
    duration: "7 weeks",
    level: "Advanced",
    image: HealthTechTraining,
    description:
      "Learn to analyze healthcare data, create meaningful reports, and drive data-driven decisions in healthcare settings.",
    modules: [
      "Healthcare Data Fundamentals",
      "Statistical Analysis in Healthcare",
      "Data Visualization Tools",
      "Predictive Analytics",
      "Healthcare Metrics & KPIs",
      "Regulatory Compliance",
    ],
    certification: "Healthcare Data Analyst",
    participants: 85,
    rating: 4.7,
  },
  {
    id: 6,
    title: "Maternal & Child Health Specialist",
    duration: "8 weeks",
    level: "Intermediate to Advanced",
    image: CommunityWorkerOutreach,
    description:
      "Specialized training focused on maternal and child health, including prenatal care, child development, and family planning.",
    modules: [
      "Prenatal & Postnatal Care",
      "Child Development Milestones",
      "Nutrition for Mothers & Children",
      "Immunization Programs",
      "Family Planning Counseling",
      "Emergency Obstetric Care",
    ],
    certification: "Maternal & Child Health Specialist",
    participants: 120,
    rating: 4.9,
  },
  {
    id: 7,
    title: "Healthcare Quality Improvement",
    duration: "6 weeks",
    level: "Intermediate",
    image: SmartHealthcare,
    description:
      "Learn quality improvement methodologies, patient safety protocols, and healthcare accreditation standards.",
    modules: [
      "Quality Management Systems",
      "Patient Safety Protocols",
      "Healthcare Accreditation",
      "Performance Measurement",
      "Process Improvement",
      "Risk Management",
    ],
    certification: "Healthcare Quality Specialist",
    participants: 95,
    rating: 4.6,
  },
  {
    id: 8,
    title: "Mental Health First Aid",
    duration: "3 weeks",
    level: "Beginner",
    image: Workers,
    description:
      "Essential mental health awareness and first aid skills for healthcare workers and community volunteers.",
    modules: [
      "Mental Health Awareness",
      "Crisis Intervention",
      "De-escalation Techniques",
      "Referral Pathways",
      "Self-Care for Caregivers",
      "Community Mental Health",
    ],
    certification: "Mental Health First Aid Certificate",
    participants: 180,
    rating: 4.8,
  },
];

const TrainingCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const displayedPrograms = showMore ? trainingPrograms : trainingPrograms.slice(0, 4);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header - Always visible */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 font-serif">
            Our Comprehensive Training Programs
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Industry-leading courses designed by healthcare experts to advance your
            career and improve patient outcomes. Each program combines theoretical
            knowledge with practical skills and real-world application.
          </p>
        </div>

        {/* Conditionally render course grid or course details */}
        {selectedCourse ? (
          <CoursesModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
        ) : (
          <>
            {/* Programs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedPrograms.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
                >
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {program.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-600">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {program.duration}</span>
                      <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> {program.level}</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {program.rating}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{program.description}</p>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setSelectedCourse(program)}
                        className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        View Details
                      </button>
                      <button className="w-full py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Enroll
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button */}
            {trainingPrograms.length > 4 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  {showMore ? 'View Less' : `View More (${trainingPrograms.length - 4} more courses)`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TrainingCourses;
