import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";
import SolutionFeatureCard from "./SolutionFeatureCard.jsx";
import SolutionTestimonial from "./SolutionTestimonial.jsx";

const features = [
  { icon: "🗂️", title: "Electronic Health Records", description: "EHR with patient search and secure access." },
  { icon: "📅", title: "Appointments & Referrals", description: "Schedule appointments and referrals with SMS reminders." },
  { icon: "💳", title: "NHIF Integration", description: "Insurance claims export and NHIF/SHA integration." },
  { icon: "📤", title: "Prescription Uploads", description: "Upload prescriptions and automate reporting." },
  { icon: "🚑", title: "Ambulance Dispatch Tracking", description: "Track ambulance dispatch and coordination." },
  { icon: "📊", title: "Clinic Dashboard", description: "Finance, salaries, and stock management dashboard." },
];

const Hospitals = () => (
  <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2">Digitize and Streamline Your Facility</h1>
        <h2 className="text-xl md:text-2xl text-blue-700 mb-6">Future-proof your operations with MediLink’s smart hospital systems.</h2>
        <p className="text-lg text-blue-700 mb-6">We provide custom-built digital tools for hospitals and clinics in Kenya—from electronic records to finance dashboards and CHW coordination tools.</p>
        <p className="text-blue-800 font-medium mb-8">Most clinics still use paper files, which are slow, insecure, and inefficient. MediLink’s hospital-grade systems reduce paperwork, speed up operations, and boost patient outcomes.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {features.map((f, i) => <SolutionFeatureCard key={i} {...f} />)}
      </div>
      <SolutionTestimonial 
        quote="Our bookings are faster, our claims are smoother, and our staff love the new system."
        name="Dr. Mutua"
        role="Clinic Owner"
        location="Nairobi"
        avatar={null}
      />
      <div className="flex justify-center mt-10">
        <a href="/demo" className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 font-bold text-lg">Request a Demo</a>
      </div>
      {/* Optional visual block */}
      <div className="mt-10 flex justify-center">
        <div className="w-64 h-40 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-400 text-6xl shadow-lg">🏥</div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Hospitals;
