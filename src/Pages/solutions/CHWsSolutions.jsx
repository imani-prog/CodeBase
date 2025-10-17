

import gpsImg from "../../assets/GPSlocationForCHW.webp";
import elearningImg from "../../assets/ManualForCHWTraining.png";
import reportImg from "../../assets/MedicalRecords11.png";
import qrImg from "../../assets/mediLink.png";
import assignedImg from "../../assets/PatientService.jpg";
import mileageImg from "../../assets/WorkersTogetherness2.jpeg";
import CHWCarousel from "./CHWCarousel.jsx";

const features = [
  {
    title: "Assigned Patient Requests",
    img: assignedImg,
    description: [
      "Access a list of assigned patients and upcoming visits.",
      "Prioritize and respond to urgent health service requests.",
      "Receive real-time updates for new assignments or changes.",
      "Automatically mark visits as complete with progress notes.",
      "Review patient histories and previous visit notes for better care planning.",
      "Communicate directly with supervisors for support or clarification.",
      "Track the status of each request and receive notifications for urgent cases.",
    ],
  },
  {
    title: "Live GPS Tracking",
    img: gpsImg,
    description: [
      "Share your live location during home visits or outreach.",
      "Enable supervisors to monitor field activity in real time.",
      "Improve safety for lone workers in remote areas.",
      "Automatically logs route history for mileage reporting.",
      "Receive alerts if you enter high-risk or restricted zones.",
      "Easily retrace your steps for follow-up visits or lost items.",
      "Supervisors can assign tasks based on your current location.",
    ],
  },
  {
    title: "Mileage & Visit Logging",
    img: mileageImg,
    description: [
      "Track distance traveled during each outreach visit.",
      "Log exact check-in and check-out times per patient.",
      "Capture reason for visit and type of service offered.",
      "Generate daily, weekly, and monthly visit summaries.",
      "Automatically calculate mileage for reimbursement claims.",
      "Attach notes and photos to each visit for detailed records.",
      "Filter logs by location, patient, or service type.",
    ],
  },
  {
    title: "E-learning & Certification",
    img: elearningImg,
    description: [
      "Access structured digital training content anytime.",
      "Complete courses with quizzes and interactive modules.",
      "Earn certificates after completing required trainings.",
      "Track your training history and renewal timelines.",
      "Receive notifications for upcoming renewals or new modules.",
      "Connect with peers in discussion forums and study groups.",
      "Download resources and guides for offline learning.",
    ],
  },
  {
    title: "QR Scanner Access",
    img: qrImg,
    description: [
      "Quickly scan NHIF cards or patient QR codes in the field.",
      "Retrieve existing patient data instantly without forms.",
      "Reduce errors in record-keeping and manual entry.",
      "Securely update visit info directly into the patient profile.",
      "Access medication history and allergies with a single scan.",
      "Instantly verify insurance status and eligibility.",
      "Link scanned data to visit logs for seamless reporting.",
    ],
  },
  {
    title: "Performance & Salary Reports",
    img: reportImg,
    description: [
      "Access personalized dashboards showing completed tasks.",
      "View reports tied to your monthly performance metrics.",
      "Track earnings based on service delivery data.",
      "Get notified when a new report or payment update is available.",
      "Download detailed breakdowns of your work and incentives.",
      "Compare your performance with team averages and goals.",
      "Receive feedback and tips for improving your service delivery.",
    ],
  },
];

const CHWs = () => (
  <div className="min-h-screen w-full flex flex-col font-sans overflow-x-hidden">
   
    <main className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-12">
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-900 font-serif mb-2 sm:mb-3 leading-tight">
          Empowering CHWs with Digital Tools
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3 leading-relaxed">
          Supporting your outreach with smart tracking, training, and support.
        </h2>
        <p className="text-sm sm:text-base md:text-lg mb-2 sm:mb-3 leading-relaxed">
          MediLink makes your work easier. Whether it's accessing training, tracking visits, or scanning a patient's NHIF card—we're your digital health assistant in the field.
        </p>
        <p className="text-sm sm:text-base font-medium mb-6 sm:mb-7 md:mb-8 leading-relaxed">
          CHWs are the backbone of Kenya's community health system. MediLink equips you with tools to serve better, track work, and earn incentives.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-10 md:space-y-14 mb-8 sm:mb-12 md:mb-16">
        {features.map((feature, idx) => (
          <div
            key={feature.title}
            className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 sm:gap-8"
          >
            {/* Text Column */}
            <div
              className={`flex flex-col justify-center ${
                idx % 2 === 0 ? "" : "md:order-2"
              }`}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-3 sm:mb-4 font-serif leading-tight">
                {feature.title}
              </h3>
              <ul className="text-sm sm:text-base md:text-lg leading-relaxed space-y-2 sm:space-y-3">
                {feature.description.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 sm:mt-4 text-blue-700 text-xs sm:text-sm md:text-base font-medium leading-relaxed">
                MediLink makes your work easier, helping you stay organized, connected, and confident every step of the way.
              </p>
            </div>

            {/* Image Column */}
            <div
              className={`flex justify-center items-center ${
                idx % 2 === 0 ? "md:order-2" : ""
              }`}
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="w-full max-w-[600px] h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] object-cover rounded-xl border-4 border-blue-200"
                style={{
                  boxShadow: idx % 2 === 0 
                    ? `-8px 8px 0px rgba(59, 130, 246, 0.3), -16px 16px 0px rgba(59, 130, 246, 0.2), -24px 24px 0px rgba(59, 130, 246, 0.1), -32px 32px 20px rgba(0, 0, 0, 0.1)`
                    : `8px 8px 0px rgba(59, 130, 246, 0.3), 16px 16px 0px rgba(59, 130, 246, 0.2), 24px 24px 0px rgba(59, 130, 246, 0.1), 32px 32px 20px rgba(0, 0, 0, 0.1)`
                }}
              />
            </div>
          </div>
        ))}
      </div>


      <CHWCarousel />



      <div className="w-full flex flex-col items-center justify-center mt-8 sm:mt-10 md:mt-12 mb-0">
        {/* Buttons and Quick Links Row */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#share-experience"
              className="text-blue-700 border border-blue-300 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-sm sm:text-base hover:bg-blue-100 hover:text-blue-900 transition-all duration-200 shadow-sm text-center"
            >
              Share Your Experience
            </a>
            <a
              href="/join-chw"
              className="text-blue-700 border border-blue-300 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-xl font-bold text-sm sm:text-base hover:bg-blue-100 hover:text-blue-900 transition-all duration-200 shadow-sm text-center"
            >
              Register as a CHW
            </a>
          </div>
          <div className="hidden md:flex flex-col gap-2 ml-8">
            <a href="/faq" className="text-blue-700 text-sm font-semibold hover:underline">FAQs</a>
            <a href="/contact" className="text-blue-700 text-sm font-semibold hover:underline">Contact Support</a>
            <a href="/services/chws" className="text-blue-700 text-sm font-semibold hover:underline">CHW Services</a>
          </div>
        </div>
        {/* Info Cards Row */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-5 md:gap-6">
          <div className="p-4 sm:p-5 md:p-6 flex-1 max-w-md">
            <h5 className="text-base sm:text-lg font-bold text-blue-800 mb-2 sm:mb-3 font-serif leading-tight">Why Join MediLink?</h5>
            <ul className="text-gray-700 text-xs sm:text-sm md:text-base mb-2 space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                <span>Manage assigned patient visits and requests efficiently</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                <span>Track outreach activities and mileage with GPS logging</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                <span>Access digital training modules and earn certifications</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                <span>Scan NHIF cards and update patient records instantly</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                <span>Receive performance reports and earn incentives</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                <span>Communicate directly with supervisors for support</span>
              </li>
            </ul>
            <p className="text-blue-600 italic text-xs sm:text-sm leading-relaxed">"Empowering CHWs to deliver better care in the community."</p>
          </div>
          <div className="p-4 sm:p-5 md:p-6 flex-1 max-w-md">
            <h5 className="text-base sm:text-lg font-bold text-blue-800 mb-2 sm:mb-3 font-serif leading-tight">Need Help?</h5>
            <ul className="text-gray-700 text-xs sm:text-sm md:text-base mb-2 space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                <span>Visit our <a href="/faq" className="text-blue-700 hover:underline">FAQ</a> page</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                <span>Contact our support team for assistance</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                <span>Explore patient resources and guides</span>
              </li>
            </ul>
            <p className="text-blue-600 italic text-xs sm:text-sm leading-relaxed">"We're here for you every step of the way."</p>
          </div>
        </div>
      </div>
    </main>
    
  </div>
);

export default CHWs;
