// WhyChoose.jsx
import React from "react";
import { Award, Users, Monitor, Briefcase, Smartphone, RefreshCw, Hospital, TrendingUp, Network, Lightbulb, HeartHandshake, Star } from "lucide-react";

// Import training images
import HealthTraining1 from '../assets/HealthTraining1.webp';
import HealthTraining2 from '../assets/HealthTraining2.webp';
import HealthTraining3 from '../assets/HealthTraining3.webp';
import HealthTraining4 from '../assets/HealthTraining4.webp';

const features = [
   {
    icon: <Award className="w-8 h-8 text-blue-600" />,
    title: "Accredited, Up-to-Date Training",
    description:
      "Internationally recognized certifications aligned with WHO & Ministry of Health standards, with continuously updated curriculum reflecting the latest research, trends, and innovations.",
    image: HealthTraining1,
    badge: "Certified Training"
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: "Expert-Led Hybrid Learning",
    description:
      "Learn from experienced healthcare professionals with flexible options including live virtual sessions, hands-on workshops, clinical placements, and mobile-first access.",
    image: HealthTraining2,
    badge: "Expert Instructors"
  },
  {
    icon: <Briefcase className="w-8 h-8 text-blue-600" />,
    title: "Career Growth & Professional Support",
    description:
      "Comprehensive post-training support including job placement assistance, performance tracking, interview prep, mentorship, and recognition through scholarships and leadership opportunities.",
    image: HealthTraining3,
    badge: "Career Support"
  },
  {
    icon: <Hospital className="w-8 h-8 text-blue-600" />,
    title: "Collaborative Healthcare Impact",
    description:
      "Hands-on experience through hospital partnerships, peer learning networks, community health projects, and innovation-focused initiatives driving lasting healthcare impact.",
    image: HealthTraining4,
    badge: "Healthcare Impact"
  },
];

const WhyChoose = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Image Section */}
              <div className="flex-1 relative">
                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full">
                      {feature.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 bg-white p-4 rounded-xl shadow-md">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-yellow-300 mb-2 font-serif">
                      {feature.title}
                    </h3>
                  </div>
                </div>
                
                    <p className="text-lg text-white mb-4">
                      {feature.description}
                    </p>

                <div className="flex flex-wrap gap-3">
                  {index === 0 && (
                    <>
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">WHO Standards</span>
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Ministry of Health</span>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Virtual Sessions</span>
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Clinical Placements</span>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Job Placement</span>
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Mentorship</span>
                    </>
                  )}
                  {index === 3 && (
                    <>
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Hospital Partners</span>
                      <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Community Projects</span>
                    </>
                  )}
                </div>

                <div className="pt-4">
                  <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
