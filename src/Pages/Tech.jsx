import { Link } from "react-router-dom";
import HospitalStack from "../Components/HospitalStack.jsx";
import CTA from "../Components/CTA.jsx";
import React from "react";
import TechnicalFeatures from "../Components/TechnicalFeatures.jsx";

const Tech = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-blue-50">
     
      
      {/* Hero Section */}
      <div className="w-full px-4 py-8 max-w-7xl mx-auto">
        <div className="text-center mb-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-3 leading-tight text-center">
               Our Technology
          </h1>
          <p className="text-base md:text-lg w-full text-left leading-normal mb-0">
            MediLink is built on a modern, secure, and scalable technology stack designed to deliver reliable healthcare services to communities and clinics. Our platform leverages the latest in cloud, web, and mobile technologies to ensure accessibility, speed, and data protection for all users.
          </p>
        </div>
      </div>

      <main className="w-full px-4 pb-12 max-w-7xl mx-auto">
        {/* Hospital Solutions */}
        <section className="p-6 md:p-8 mb-4 mt-0">
          <div className="max-w-6xl mx-auto">
            <HospitalStack />
            <CTA />

          </div>
        </section>

        {/* Technical Features Grid */}
        <div className="">
          <TechnicalFeatures />
        </div>
      </main>
    </div>
  );
};

export default Tech;