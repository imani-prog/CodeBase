import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";
import SolutionFeatureCard from "./SolutionFeatureCard.jsx";
import SolutionTestimonial from "./SolutionTestimonial.jsx";

const features = [
  { icon: "📋", title: "Assigned Patient Requests", description: "View and manage patient requests easily." },
  { icon: "📍", title: "Live GPS Tracking", description: "Push your live location during visits." },
  { icon: "🚗", title: "Mileage & Visit Logging", description: "Log mileage, visits, and service status." },
  { icon: "🎓", title: "E-learning & Certification", description: "Access e-learning modules and track certification." },
  { icon: "🔎", title: "QR Scanner Access", description: "Scan patient QR codes for fast record access." },
  { icon: "📈", title: "Performance & Salary Reports", description: "Auto-generated performance and salary reports." },
];

const CHWs = () => (
  <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2">Empowering CHWs with Digital Tools</h1>
        <h2 className="text-xl md:text-2xl text-blue-700 mb-6">Supporting your outreach with smart tracking, training, and support.</h2>
        <p className="text-lg text-blue-700 mb-6">MediLink makes your work easier. Whether it’s accessing training, tracking visits, or scanning a patient’s NHIF card—we’re your digital health assistant in the field.</p>
        <p className="text-blue-800 font-medium mb-8">CHWs are the backbone of Kenya’s community health system. MediLink equips you with tools to serve better, track work, and earn incentives.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {features.map((f, i) => <SolutionFeatureCard key={i} {...f} />)}
      </div>
      <SolutionTestimonial 
        quote="With MediLink, I don’t carry bulky files anymore. It’s all on my phone—and it works, even offline."
        name="Brian"
        role="CHW"
        location="Vihiga County"
        avatar={null}
      />
      <div className="flex justify-center mt-10">
        <a href="/join-chw" className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 font-bold text-lg">Join as a CHW</a>
      </div>
      {/* Optional visual block */}
      <div className="mt-10 flex justify-center">
        <div className="w-64 h-40 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-400 text-6xl shadow-lg">🧑🏾‍⚕️</div>
      </div>
    </main>
    <Footer />
  </div>
);

export default CHWs;
