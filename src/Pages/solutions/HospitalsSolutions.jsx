import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";


import prescriptionImg from "../../assets/MedicalRecords.jpeg";
import ehrImg from "../../assets/SmartHealthcare.avif";
import ambulanceImg from "../../assets/MedilinkAmbulance.png";
import dashboardImg from "../../assets/AdminDashboard1.jpg";
import appointmentsImg from "../../assets/PatientReferals.jpg";
import nhifImg from "../../assets/PaymentsInsurance.png";
import HospitalStyle from "../../Components/HospitalStyle.jsx";


const features = [
  {
    img: ehrImg,
    title: "Electronic Health Records",
    description: [
      "Secure, centralized storage of patient records with role-based access control.",
      "Easily search patients by name, ID, or phone number across departments.",
      "Track diagnoses, prescriptions, allergies, vitals, and lab results in real-time.",
      "Enable doctors, nurses, and CHWs to collaborate efficiently on patient care.",
      "Fully digital, reducing paper usage and human errors during documentation."
    ]
  },
  {
    img: appointmentsImg,
    title: "Appointments & Referrals",
    description: [
      "Easily schedule patient appointments and manage referrals to specialists.",
      "Patients receive automated SMS reminders and confirmations.",
      "Track attendance and missed appointments for accurate reporting.",
      "Link appointments with EHR to streamline documentation and follow-ups.",
      "Simplify workflows for front-desk and scheduling staff."
    ]
  },
  {
    img: nhifImg,
    title: "NHIF Integration",
    description: [
      "Seamlessly submit NHIF and SHA claims through API integration.",
      "Track claim status, feedback, and rejections in real-time.",
      "Generate reports to comply with MOH and insurance audits.",
      "Enable patients to view NHIF eligibility and contribution history.",
      "Support co-payments and private insurance combinations."
    ]
  },
  {
    img: prescriptionImg,
    title: "Prescription Uploads",
    description: [
      "Doctors can upload digital prescriptions directly into the patient's record.",
      "Pharmacy team receives prescriptions instantly for fulfillment.",
      "Supports dosage instructions, frequency, and drug interaction alerts.",
      "Tracks inventory stock levels to avoid out-of-stock scenarios.",
      "Printable and shareable via secure patient portal or SMS."
    ]
  },
  {
    img: ambulanceImg,
    title: "Ambulance Dispatch Tracking",
    description: [
      "Coordinate emergency and scheduled dispatches via digital dashboard.",
      "Live GPS tracking of ambulance location and ETA.",
      "SMS alerts sent to patients and CHWs when on the way.",
      "Auto-generate trip reports and transport records.",
      "Integrates with EHR to document visit outcomes."
    ]
  },
  {
    img: dashboardImg,
    title: "Clinic Dashboard",
    description: [
      "Manage billing, staff performance, and medical supplies from one dashboard.",
      "Visual KPIs for income, appointments, and patient trends.",
      "Track salary and CHW incentives automatically.",
      "Get alerts for low stock, unpaid bills, or critical trends.",
      "Designed for admins, owners, and managers with secure logins."
    ]
  }
];

const Hospitals = () => (
  <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2">Digitize and Streamline Your Facility</h1>
        <h2 className="text-xl md:text-2xl mb-3">Future-proof your operations with MediLink’s smart hospital systems.</h2>
        <p className="text-lg mb-3">We provide custom-built digital tools for hospitals and clinics in Kenya—from electronic records to finance dashboards and CHW coordination tools.</p>
        <p className="font-medium mb-4">Most clinics still use paper files, which are slow, insecure, and inefficient. MediLink’s hospital-grade systems reduce paperwork, speed up operations, and boost patient outcomes.</p>
      </div>

      <div className="space-y-14 mb-16">
        {features.map((f, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
              idx % 2 === 0 ? '' : 'md:flex-row-reverse'
            }`}
          >
            {/* Image Card */}
            <div className={`w-full flex justify-center ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
              <img
                src={f.img}
                alt={f.title}
                className={`w-full max-w-[600px] h-[360px] md:h-[400px] object-cover rounded-xl border-4 border-blue-200
                  ${idx % 2 === 0
                    ? 'shadow-[-20px_0_40px_-10px_rgba(30,64,175,0.25),-40px_0_60px_-20px_rgba(30,64,175,0.18),-60px_0_80px_-30px_rgba(30,64,175,0.12)]'
                    : 'shadow-[20px_0_40px_-10px_rgba(30,64,175,0.25),40px_0_60px_-20px_rgba(30,64,175,0.18),60px_0_80px_-30px_rgba(30,64,175,0.12)]'
                  }`}
              />
            </div>

            {/* Text Card */}
            <div className={`w-full flex justify-center ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
              <div className="w-full bg-white rounded-xl p-6 max-w-xl">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">{f.title}</h3>
                <ul className="list-disc list-inside text-lg space-y-2">
                  {Array.isArray(f.description) ? (
                    f.description.map((desc, i) => <li key={i}>{desc}</li>)
                  ) : (
                    <li>{f.description}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <HospitalStyle />

      <div className="w-full flex flex-col items-center justify-center mt-12 mb-0">
          {/* Buttons and Quick Links Row */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <div className="flex gap-4">
              <a
                href=""
                className="text-blue-700 border border-blue-300 px-6 py-2 rounded-xl font-bold text-base hover:bg-blue-100 hover:text-blue-900 transition-all duration-200 shadow-sm"
              >
                Share Hospital Feedback
              </a>
              <a
                href=""
                className="text-blue-700 border border-blue-300 px-6 py-2 rounded-xl font-bold text-base hover:bg-blue-100 hover:text-blue-900 transition-all duration-200 shadow-sm"
              >
                Become a Partner Facility
              </a>
            </div>
            <div className="hidden md:flex flex-col gap-2 ml-8">
              <a href="/" className="text-blue-700 font-semibold hover:underline">FAQs</a>
              <a href="/contact" className="text-blue-700 font-semibold hover:underline">Contact Support</a>
              <a href="/services/hospitals" className="text-blue-700 font-semibold hover:underline">Hospital Services</a>
            </div>
          </div>

          {/* Info Cards Row */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="p-6 flex-1 max-w-md">
              <h5 className="text-lg font-bold text-blue-800 mb-2">Why Hospitals Choose MediLink</h5>
              <ul className="list-disc list-inside text-gray-700 text-base mb-2">
                <li>Streamline outpatient visits and digital patient flow</li>
                <li>Enable NHIF verification and claim submission instantly</li>
                <li>Monitor CHW outreach linked to your catchment area</li>
                <li>Access shared patient records with consent</li>
                <li>Use dashboards to view performance, referrals, and KPIs</li>
                <li>Integrate lab, pharmacy, and billing systems securely</li>
              </ul>
              <p className="text-blue-600 italic">"Bringing smart hospital workflows to the frontline of care."</p>
            </div>
            <div className="p-6 flex-1 max-w-md">
              <h5 className="text-lg font-bold text-blue-800 mb-2">Need Support?</h5>
              <ul className="list-disc list-inside text-gray-700 text-base mb-2">
                <li>Visit our <a href="/faq" className="text-blue-700 hover:underline">FAQ</a> page</li>
                <li>Reach out for onboarding, training, or API support</li>
                <li>Explore resources for hospital admins and clinicians</li>
              </ul>
              <p className="text-blue-600 italic">"We support your facility every step of the way."</p>
            </div>
          </div>
        </div>



    </main>
    <Footer />
  </div>
);

export default Hospitals;
