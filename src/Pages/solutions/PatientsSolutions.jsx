import PeterImg from "../../assets/Brian Wekesa.jpeg";
import { default as AminaImg, default as EstherImg } from "../../assets/Esther Nyambura.jpeg";
import GraceImg from "../../assets/Grace Achieng.jpeg";
import SamuelImg from "../../assets/Joseph Otieno.jpeg";
import MedilinkAmbulance from "../../assets/MedilinkAmbulance.png";
import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";
import PatientsReview from "../../Components/PatientsReview.jsx";
import SolutionTestimonial from "./SolutionTestimonial.jsx";
import FeatureCarousel from "../../Components/PatientSolutionFeature.jsx";
import React from "react";
import PatientSolutionFeature from "../../Components/PatientSolutionFeature.jsx";


const Patients = () => (
  <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2">Healthcare That Comes to You</h1>
        <h2 className="text-xl md:text-2xl mb-3">Access care at your fingertips—no matter where you live.</h2>
        <p className="text-lg mb-3">MediLink connects you to nearby clinics, CHWs, and telemedicine services from your phone. No more long queues or travel expenses.</p>
        <p className="font-medium mb-8">In rural and urban Kenya, many patients struggle to get timely, affordable healthcare. MediLink fixes that by simplifying booking, payments, and access to support.</p>
      </div>

      <PatientSolutionFeature />

      {/* Multiple Testimonials with Images */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Patient Success Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SolutionTestimonial 
            quote="I used to travel miles for care. Now I get help right at home, thanks to MediLink."
            name="Amina"
            role="Patient"
            location="Kisii County"
            avatar={AminaImg}
          />
          <SolutionTestimonial 
            quote="Booking an ambulance was so easy. The live tracking gave me peace of mind during an emergency."
            name="Peter"
            role="Patient"
            location="Nairobi"
            avatar={PeterImg}
          />
          <SolutionTestimonial 
            quote="I paid with NHIF and got my prescription instantly. No paperwork, no stress!"
            name="Grace"
            role="Patient"
            location="Mombasa"
            avatar={GraceImg}
          />
          <SolutionTestimonial 
            quote="The health tips and reminders keep me on track with my medication."
            name="Samuel"
            role="Patient"
            location="Eldoret"
            avatar={SamuelImg}
          />
          <SolutionTestimonial 
            quote="Telemedicine helped me get a quick consult when my child was sick."
            name="Esther"
            role="Patient"
            location="Machakos"
            avatar={EstherImg}
          />
          <SolutionTestimonial 
            quote="I love how easy it is to book home visits. The CHWs are so caring and professional."
            name="Lydia"
            role="Patient"
            location="Nakuru"
            avatar={EstherImg}
          />
        </div>
      </section>

      <PatientsReview />

      <div className="flex justify-center mt-10">
        <a href="/register" className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 font-bold text-lg">Register as a Patient</a>
      </div>
    </main>
    <Footer />
  </div>
);

export default Patients;
