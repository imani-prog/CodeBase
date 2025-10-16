
import PatientSolutionFeature from "../../Components/PatientSolutionFeature.jsx";
import PatientsReview from "../../Components/PatientsReview.jsx";
import TestimonialsCarousel from "../../Components/TestimonialsCarousel.jsx";


function Patients() {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-x-hidden">
     
      <main className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-12">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-900 mb-2 sm:mb-3 font-serif leading-tight">Healthcare That Comes to You</h1>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3 leading-relaxed">Access care at your fingertips—no matter where you live.</h2>
          <p className="text-sm sm:text-base md:text-lg mb-2 sm:mb-3 leading-relaxed">MediLink connects you to nearby clinics, CHWs, and telemedicine services from your phone. No more long queues or travel expenses.</p>
          <p className="text-sm sm:text-base font-medium mb-6 sm:mb-7 md:mb-8 leading-relaxed">In rural and urban Kenya, many patients struggle to get timely, affordable healthcare. MediLink fixes that by simplifying booking, payments, and access to support.</p>
        </div>

        <PatientSolutionFeature />

        {/* Multiple Testimonials with Images - Carousel UI */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-4 sm:mb-5 md:mb-6 text-center font-serif">Patient Success Stories</h3>
          <TestimonialsCarousel />
        </section>

        <PatientsReview />
      </main>
      
    </div>
  );
}

export default Patients;
