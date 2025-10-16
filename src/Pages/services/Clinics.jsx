import AdminDashboard1 from "../../assets/AdminDashboard1.jpg";
import MedicalRecords11 from "../../assets/MedicalRecords11.png";
import PatientReferals from "../../assets/PatientReferralSoftware.png";

import PatientReferralSlider from "../../Components/PatientReferralSlider.jsx";

import FinancialService from "../../Components/FinancialService.jsx";
import ClinicCallToAction from "../../Components/ClinicCallToAction.jsx";
import React from "react";



const Clinics = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50 overflow-x-hidden">
      
      
      <main className="flex flex-col w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 max-w-[1200px] mx-auto">
        {/* Hero Section */}
        <section className="mb-6 sm:mb-8 md:mb-10 w-full flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-900 mb-3 sm:mb-4 text-center leading-tight font-serif px-2">
            MediLink for Clinics & Hospitals
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-center max-w-3xl px-2 leading-relaxed">
            Empowering healthcare facilities with smart, scalable, and user-friendly digital solutions — from patient management to ambulance coordination.
          </p>
        </section>

        

          {/* Admin Dashboards */}

          <div className="mb-6 sm:mb-8 md:mb-10 w-full p-3 sm:p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-stretch">
            <div className="flex flex-col justify-center h-full px-2 md:px-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-800 mb-3 sm:mb-4 font-serif px-2">Centralized Admin Dashboards</h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 px-2 leading-relaxed">Our admin dashboards provide a unified view of your clinic or hospital operations, making it easy to oversee all activities in real time. With intuitive charts and actionable insights, administrators can quickly identify trends, bottlenecks, and opportunities for improvement.</p>
              <ul className="list-none space-y-2 sm:space-y-3 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base lg:text-xl">
                <li className="flex items-start px-2">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">Monitor appointments, payments & CHW activity</span>
                </li>
                <li className="flex items-start px-2">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">View analytics, patient flow, and service logs</span>
                </li>
                <li className="flex items-start px-2">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">Track ambulance dispatch and support tickets</span>
                </li>
              </ul>
              <p className="text-grey mb-2 text-xs sm:text-sm md:text-base lg:text-lg px-2 leading-relaxed">Easily filter data by department, time period, or staff member to drill down into specific metrics. Export reports for compliance, share updates with your team, and stay ahead with predictive analytics.</p>
              <p className="italic text-blue-600 mt-3 sm:mt-4 text-xs sm:text-sm md:text-base lg:text-lg px-2 leading-relaxed">"Real-time visibility for better decisions."</p>
            </div>
            <div className="flex justify-center items-center h-full px-2">
              <img 
                src={AdminDashboard1} 
                alt="Admin Dashboard" 
                className="w-full max-w-full h-auto max-h-[250px] sm:max-h-[300px] md:max-h-[350px] lg:max-h-[400px] object-contain rounded-lg sm:rounded-xl md:rounded-2xl border border-blue-300 bg-white shadow-md sm:shadow-lg" 
                style={{
                  boxShadow: `-8px 8px 0px rgba(59, 130, 246, 0.3), -16px 16px 0px rgba(59, 130, 246, 0.2), -24px 24px 0px rgba(59, 130, 246, 0.1), -32px 32px 20px rgba(0, 0, 0, 0.1)`
                }}
              />
            </div>
          </div>

          {/* Electronic Health Records */}
          <div className="mb-6 sm:mb-8 md:mb-10 w-full p-3 sm:p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
            <div className="flex justify-center items-center h-full px-2 order-2 md:order-1">
              <img 
                src={MedicalRecords11} 
                alt="Electronic Medical Records" 
                className="w-full max-w-[400px] sm:max-w-[440px] md:max-w-[480px] h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px] object-contain rounded-lg sm:rounded-xl md:rounded-2xl border border-blue-300 bg-white shadow-md sm:shadow-lg" 
                style={{
                  boxShadow: `8px 8px 0px rgba(59, 130, 246, 0.3), 16px 16px 0px rgba(59, 130, 246, 0.2), 24px 24px 0px rgba(59, 130, 246, 0.1), 32px 32px 20px rgba(0, 0, 0, 0.1)`
                }}
              />
            </div>
            <div className="flex flex-col justify-center h-full px-2 md:px-6 order-1 md:order-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-800 mb-3 sm:mb-4 font-serif px-2">Electronic Medical Records (EMR)</h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-xl mb-3 sm:mb-4 px-2 leading-relaxed">Our EMR system streamlines clinical workflows, enabling healthcare professionals to access and update patient records instantly. With robust security and compliance features, you can trust that sensitive data is protected at every step.</p>
              <ul className="list-none space-y-2 sm:space-y-3 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base lg:text-xl">
                <li className="flex items-start px-2">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">Secure access to patient history & reports</span>
                </li>
                <li className="flex items-start px-2">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">PDF exports of prescriptions and lab results</span>
                </li>
                <li className="flex items-start px-2">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">Role-based access for data privacy</span>
                </li>
              </ul>
              <p className="mb-2 text-xs sm:text-sm md:text-base lg:text-lg px-2 leading-relaxed">Easily search for patient information, track medical history, and share records with authorized staff. Our EMR supports interoperability, making it simple to integrate with labs, pharmacies, and insurance providers.</p>
              <p className="italic text-blue-600 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base lg:text-lg px-2 leading-relaxed">"All records. One system. Anywhere, anytime."</p>
            </div>
          </div>


          {/* Patient & Referral Management Section */}
          <section className="mb-4 sm:mb-5 md:mb-6 w-full flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-900 mb-4 sm:mb-5 md:mb-6 text-center font-serif px-2">Patient & Referral Management</h2>
          </section>
          <div
            className="mb-6 sm:mb-8 md:mb-10 w-full p-0 flex flex-col items-center justify-center relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md sm:shadow-lg border border-blue-200 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px]"
            style={{
              backgroundImage: `url(${PatientReferals})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <PatientReferralSlider />
          </div>
          <FinancialService />
          <ClinicCallToAction />

      </main>
      
    </div>
  );
};

export default Clinics;
