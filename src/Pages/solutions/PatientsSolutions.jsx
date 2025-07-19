import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";
import SolutionFeatureCard from "./SolutionFeatureCard.jsx";
import SolutionTestimonial from "./SolutionTestimonial.jsx";

const features = [
  { icon: "🏥", title: "Clinic & Home Appointments", description: "Book clinic or home-based visits easily." },
  { icon: "🚑", title: "Ambulance Dispatch", description: "Track live ambulance dispatch for emergencies." },
  { icon: "💳", title: "Insurance Billing", description: "NHIF/SHA-linked billing and payments." },
  { icon: "📄", title: "Reports & Prescriptions", description: "Download reports and prescriptions as PDF." },
  { icon: "📚", title: "Health Education", description: "Get health tips, reminders, and education." },
  { icon: "💻", title: "Telemedicine Access", description: "Direct access to telemedicine via Zoom." },
];

const Patients = () => (
  <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2">Healthcare That Comes to You</h1>
        <h2 className="text-xl md:text-2xl text-blue-700 mb-6">Access care at your fingertips—no matter where you live.</h2>
        <p className="text-lg text-blue-700 mb-6">MediLink connects you to nearby clinics, CHWs, and telemedicine services from your phone. No more long queues or travel expenses.</p>
        <p className="text-blue-800 font-medium mb-8">In rural and urban Kenya, many patients struggle to get timely, affordable healthcare. MediLink fixes that by simplifying booking, payments, and access to support.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {features.map((f, i) => <SolutionFeatureCard key={i} {...f} />)}
      </div>
      <SolutionTestimonial 
        quote="I used to travel miles for care. Now I get help right at home, thanks to MediLink."
        name="Amina"
        role="Patient"
        location="Kisii County"
        avatar={null}
      />
      <div className="flex justify-center mt-10">
        <a href="/register" className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 font-bold text-lg">Register as a Patient</a>
      </div>
      {/* Optional visual block */}
      <div className="mt-10 flex justify-center">
        <div className="w-64 h-40 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-400 text-6xl shadow-lg">📱</div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Patients;
