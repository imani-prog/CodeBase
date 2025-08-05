import { Link } from "react-router-dom";
import HospitalStack from "../Components/HospitalStack.jsx";
import CTA from "../Components/CTA.jsx";
import React from "react";
import TechnicalFeatures from "../Components/TechnicalFeatures.jsx";

const Tech = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-blue-50">
     
      
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl mx-auto">
        <div className="text-center mb-0 flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-900 mb-3 sm:mb-4 lg:mb-6 leading-tight text-center">
               Our Technology
          </h1>
          <p className="text-sm sm:text-base md:text-lg w-full text-center sm:text-left leading-relaxed mb-0 max-w-4xl mx-auto">
            MediLink is built on a modern, secure, and scalable technology stack designed to deliver reliable healthcare services to communities and clinics. Our platform leverages the latest in cloud, web, and mobile technologies to ensure accessibility, speed, and data protection for all users.
          </p>
        </div>
      </div>

      <main className="w-full px-2 sm:px-4 lg:px-6 pb-6 sm:pb-8 lg:pb-12 max-w-7xl mx-auto">
        {/* Hospital Solutions */}
        <section className="p-2 sm:p-4 md:p-6 lg:p-8 mb-2 sm:mb-4 mt-0">
          <div className="max-w-6xl mx-auto">
            <HospitalStack />
            <CTA />

          </div>
        </section>

        {/* Technical Features Grid */}
        <div className="px-2 sm:px-0">
          <TechnicalFeatures />
        </div>
      </main>
    </div>
  );
};

export default Tech;