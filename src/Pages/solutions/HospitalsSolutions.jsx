
import prescriptionImg from "../../assets/MedicalRecords.jpeg";
import ehrImg from "../../assets/TechCompany22.jpeg";
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
  <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-x-hidden">

    <main className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-12">
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-serif text-blue-900 mb-2 sm:mb-3 leading-tight">Digitize and Streamline Your Facility</h1>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3 text-blue-500 font-serif leading-relaxed">Future-proof your operations with MediLink's smart hospital systems.</h2>
        <p className="text-sm sm:text-base md:text-lg mb-2 sm:mb-3 leading-relaxed">We provide custom-built digital tools for hospitals and clinics in Kenya—from electronic records to finance dashboards and CHW coordination tools.</p>
        <p className="text-sm sm:text-base font-medium mb-6 sm:mb-7 md:mb-8 leading-relaxed">Most clinics still use paper files, which are slow, insecure, and inefficient. MediLink's hospital-grade systems reduce paperwork, speed up operations, and boost patient outcomes.</p>
      </div>

      <div className="space-y-8 sm:space-y-10 md:space-y-14 mb-8 sm:mb-12 md:mb-16">
        {features.map((f, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center ${
              idx % 2 === 0 ? '' : 'md:flex-row-reverse'
            }`}
          >
            {/* Image Card */}
            <div className={`w-full flex justify-center ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
              <img
                src={f.img}
                alt={f.title}
                className="w-full max-w-[600px] h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] object-cover rounded-xl border-4 border-blue-200"
                style={{
                  boxShadow: idx % 2 === 0 
                    ? `-8px 8px 0px rgba(59, 130, 246, 0.3), -16px 16px 0px rgba(59, 130, 246, 0.2), -24px 24px 0px rgba(59, 130, 246, 0.1), -32px 32px 20px rgba(0, 0, 0, 0.1)`
                    : `8px 8px 0px rgba(59, 130, 246, 0.3), 16px 16px 0px rgba(59, 130, 246, 0.2), 24px 24px 0px rgba(59, 130, 246, 0.1), 32px 32px 20px rgba(0, 0, 0, 0.1)`
                }}
              />
            </div>

            {/* Text Card */}
            <div className={`w-full flex justify-center ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
              <div className="w-full bg-white rounded-xl p-4 sm:p-5 md:p-6 max-w-xl">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-3 sm:mb-4 font-serif leading-tight">{f.title}</h3>
                <ul className="text-sm sm:text-base md:text-lg space-y-2 sm:space-y-3 leading-relaxed">
                  {Array.isArray(f.description) ? (
                    f.description.map((desc, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                        <span>{desc}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                      <span>{f.description}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <HospitalStyle />

      <div className="w-full flex flex-col items-center justify-center mt-8 sm:mt-10 md:mt-12 mb-0">
          {/* Buttons and Quick Links Row */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href=""
                className="text-blue-700 border border-blue-300 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-sm sm:text-base hover:bg-blue-100 hover:text-blue-900 transition-all duration-200 shadow-sm text-center"
              >
                Share Hospital Feedback
              </a>
              <a
                href=""
                className="text-blue-700 border border-blue-300 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-sm sm:text-base hover:bg-blue-100 hover:text-blue-900 transition-all duration-200 shadow-sm text-center"
              >
                Become a Partner Facility
              </a>
            </div>
            <div className="hidden md:flex flex-col gap-2 ml-8">
              <a href="/" className="text-blue-700 text-sm font-semibold hover:underline">FAQs</a>
              <a href="/contact" className="text-blue-700 text-sm font-semibold hover:underline">Contact Support</a>
              <a href="/services/hospitals" className="text-blue-700 text-sm font-semibold hover:underline">Hospital Services</a>
            </div>
          </div>

          {/* Info Cards Row */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-5 md:gap-6">
            <div className="p-4 sm:p-5 md:p-6 flex-1 max-w-md">
              <h5 className="text-base sm:text-lg font-bold text-blue-800 mb-2 sm:mb-3 font-serif leading-tight">Why Hospitals Choose MediLink</h5>
              <ul className="text-gray-700 text-xs sm:text-sm md:text-base mb-2 space-y-2 sm:space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span>Streamline outpatient visits and digital patient flow</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span>Enable NHIF verification and claim submission instantly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span>Monitor CHW outreach linked to your catchment area</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span>Access shared patient records with consent</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span>Use dashboards to view performance, referrals, and KPIs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span>Integrate lab, pharmacy, and billing systems securely</span>
                </li>
              </ul>
              <p className="text-blue-600 italic text-xs sm:text-sm leading-relaxed">"Bringing smart hospital workflows to the frontline of care."</p>
            </div>
            <div className="p-4 sm:p-5 md:p-6 flex-1 max-w-md">
              <h5 className="text-base sm:text-lg font-bold text-blue-800 mb-2 sm:mb-3 font-serif leading-tight">Need Support?</h5>
              <ul className="text-gray-700 text-xs sm:text-sm md:text-base mb-2 space-y-2 sm:space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span>Visit our <a href="/faq" className="text-blue-700 hover:underline">FAQ</a> page</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span>Reach out for onboarding, training, or API support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span>Explore resources for hospital admins and clinicians</span>
                </li>
              </ul>
              <p className="text-blue-600 italic text-xs sm:text-sm leading-relaxed">"We support your facility every step of the way."</p>
            </div>
          </div>
        </div>



    </main>
   
  </div>
);

export default Hospitals;
