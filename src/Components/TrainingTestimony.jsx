// TrainingTestimony.jsx
import React from "react";
import { Star } from "lucide-react";

import HealthTechTraining from "../assets/HealthTechTraining.jpg";
import CommunityHealthWorker from "../assets/CommunityHealthWorker.jpeg";
import CommunityWorkerOutreach from "../assets/CommunityWorkerOutreach.jpeg";
import TelemedicinePatients from "../assets/TelemedicinePatients.jpeg";
import SmartHealthcare from "../assets/SmartHealthcare77.jpg";
import Workers from "../assets/Workers.jpg";


const testimonials = [
  {
    name: "Grace Achieng",
    role: "Community Health Worker, Nairobi County",
    image: CommunityWorkerOutreach,
    text: "The CHW certification program transformed my approach to community health. The practical skills I learned have made me more effective in serving my community. The digital health training especially helped me use technology to better track and manage patient records.",
    rating: 5,
    course: "Community Health Worker Certification",
  },
  {
    name: "Dr. Peter Njoroge",
    role: "Healthcare Administrator, Kenyatta Hospital",
    image: Workers,
    text: "The healthcare administration course provided me with essential management skills. The curriculum is well-structured and highly relevant to our local context. I was able to implement new quality improvement processes immediately after completing the course.",
    rating: 4.5,
    course: "Healthcare System Administration",
  },
  {
    name: "Susan Mwangi",
    role: "Telemedicine Specialist, Private Practice",
    image: TelemedicinePatients,
    text: "The telemedicine training opened up new opportunities for my practice. I can now provide remote consultations effectively and help patients who cannot physically visit the clinic. The technical training was thorough and practical.",
    rating: 4,
    course: "Telemedicine & Remote Care",
  },
  {
    name: "Joseph Otieno",
    role: "Data Analyst, Ministry of Health",
    image: HealthTechTraining,
    text: "The healthcare data analytics course gave me the skills to turn raw health data into meaningful insights. Now I help inform policy decisions with data-driven recommendations. The instructors were knowledgeable and supportive throughout.",
    rating: 5,
    course: "Healthcare Data Analytics",
  },
  {
    name: "Mary Wanjiku",
    role: "Maternal Health Specialist, Machakos County",
    image: CommunityHealthWorker,
    text: "This specialized training in maternal and child health has been invaluable. I now feel more confident handling complex cases and educating mothers in my community. The practical sessions were particularly helpful.",
    rating: 4.5,
    course: "Maternal & Child Health Specialist",
  },
  {
    name: "Kevin Murage",
    role: "Quality Improvement Officer, Coast General Hospital",
    image: SmartHealthcare,
    text: "The quality improvement training equipped me with tools and methodologies to enhance patient care in our facility. We have seen significant improvements in patient satisfaction and safety metrics since implementing what I learned.",
    rating: 5,
    course: "Healthcare Quality Improvement",
  },
];


const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(
      <Star key="half" className="w-4 h-4 text-yellow-400 fill-yellow-200 opacity-70" />
    );
  }

  while (stars.length < 5) {
    stars.push(<Star key={`empty-${stars.length}`} className="w-4 h-4 text-gray-300" />);
  }

  return stars;
};

const TrainingTestimony = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 font-serif">
            What Our Students Say
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Real feedback from healthcare professionals who've completed our programs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Profile */}
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  <div className="text-blue-600 text-xs font-medium mt-1">
                    {testimonial.course}
                  </div>
                </div>
                <div className="flex">{renderStars(testimonial.rating)}</div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 italic text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingTestimony;
