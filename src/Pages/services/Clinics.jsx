import AdminDashboard1 from "../../assets/AdminDashboard1.jpg";
import MedicalRecords11 from "../../assets/MedicalRecords11.png";
import PatientReferals from "../../assets/PatientReferralSoftware.png";

import PatientReferralSlider from "../../Components/PatientReferralSlider.jsx";

import FinancialService from "../../Components/FinancialService.jsx";
import ClinicCallToAction from "../../Components/ClinicCallToAction.jsx";
import React from "react";



const Clinics = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      
      
      <main className="flex flex-col w-full px-4 py-10 max-w-[1200px] mx-auto">
        {/* Hero Section */}
        <section className="mb-10 w-full p-5 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4 text-center leading-tight font-serif">
            MediLink for Clinics & Hospitals
          </h1>
          <p className="text-lg text-center max-w-3xl">
            Empowering healthcare facilities with smart, scalable, and user-friendly digital solutions — from patient management to ambulance coordination.
          </p>
        </section>

        

          {/* Admin Dashboards */}

          <div className="mb-10 w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-2 items-stretch">
            <div className="flex flex-col justify-center h-full md:h-[400px] px-2 md:px-8">
              <h3 className="text-3xl font-extrabold text-blue-800 mb-4 font-serif">Centralized Admin Dashboards</h3>
              <p className="text-l mb-4">Our admin dashboards provide a unified view of your clinic or hospital operations, making it easy to oversee all activities in real time. With intuitive charts and actionable insights, administrators can quickly identify trends, bottlenecks, and opportunities for improvement.</p>
              <ul className="list-none space-y-3 mb-4 text-xl">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Monitor appointments, payments & CHW activity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>View analytics, patient flow, and service logs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Track ambulance dispatch and support tickets</span>
                </li>
              </ul>
              <p className="text-grey mb-2 text-lg">Easily filter data by department, time period, or staff member to drill down into specific metrics. Export reports for compliance, share updates with your team, and stay ahead with predictive analytics.</p>
              <p className="italic text-blue-600 mt-4 text-lg">"Real-time visibility for better decisions."</p>
            </div>
            <div className="flex justify-center items-center h-full md:h-[400px] px-2 md:px-8">
              <img 
                src={AdminDashboard1} 
                alt="Admin Dashboard" 
                className="max-w-full max-h-[400px] object-contain rounded-2xl border-2 border-blue-300 bg-white" 
                style={{
                  boxShadow: `-8px 8px 0px rgba(59, 130, 246, 0.3), -16px 16px 0px rgba(59, 130, 246, 0.2), -24px 24px 0px rgba(59, 130, 246, 0.1), -32px 32px 20px rgba(0, 0, 0, 0.1)`
                }}
              />
            </div>
          </div>

          {/* Electronic Health Records */}
          <div className="mb-10 w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
            <div className="flex justify-center ml-0 items-center h-full md:h-[500px] px-0 md:px-0">
              <img 
                src={MedicalRecords11} 
                alt="Electronic Medical Records" 
                className="max-w-[480px] w-full max-h-[500px] object-contain rounded-2xl border-2 border-blue-300 bg-white" 
                style={{
                  boxShadow: `8px 8px 0px rgba(59, 130, 246, 0.3), 16px 16px 0px rgba(59, 130, 246, 0.2), 24px 24px 0px rgba(59, 130, 246, 0.1), 32px 32px 20px rgba(0, 0, 0, 0.1)`
                }}
              />
            </div>
            <div className="flex flex-col justify-center h-full md:h-[500px] px-4 md:px-8">
              <h3 className="text-3xl font-extrabold text-blue-800 mb-4 font-serif">Electronic Medical Records (EMR)</h3>
              <p className="text-xl mb-4">Our EMR system streamlines clinical workflows, enabling healthcare professionals to access and update patient records instantly. With robust security and compliance features, you can trust that sensitive data is protected at every step.</p>
              <ul className="list-none space-y-3 mb-4 text-xl">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Secure access to patient history & reports</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>PDF exports of prescriptions and lab results</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Role-based access for data privacy</span>
                </li>
              </ul>
              <p className=" mb-2 text-lg">Easily search for patient information, track medical history, and share records with authorized staff. Our EMR supports interoperability, making it simple to integrate with labs, pharmacies, and insurance providers.</p>
              <p className="italic text-blue-600 mt-2 text-lg">"All records. One system. Anywhere, anytime."</p>
            </div>
          </div>


          {/* Patient & Referral Management Section */}
          <section className="mb-2 w-full flex flex-col items-center">
            <h2 className="text-3xl font-extrabold text-blue-900 mb-6 text-center font-serif">Patient & Referral Management</h2>
          </section>
          <div
            className="mb-10 w-full p-0 flex flex-col items-center justify-center relative rounded-2xl overflow-hidden shadow-lg border border-blue-200"
            style={{
              backgroundImage: `url(${PatientReferals})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '700px',
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
