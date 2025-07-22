import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";
import PatientSolutionFeature from "../../Components/PatientSolutionFeature.jsx";
import PatientsReview from "../../Components/PatientsReview.jsx";
import TestimonialsCarousel from "../../Components/TestimonialsCarousel.jsx";


function Patients() {
  return (
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

        {/* Multiple Testimonials with Images - Carousel UI */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">Patient Success Stories</h3>
          <TestimonialsCarousel />
        </section>

        <PatientsReview />
      </main>
      <Footer />
    </div>
  );
}

export default Patients;
