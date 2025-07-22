import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";

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
  <div className="min-h-screen w-full flex flex-col font-sans">
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2">
          Empowering CHWs with Digital Tools
        </h1>
        <h2 className="text-xl md:text-2xl mb-3">
          Supporting your outreach with smart tracking, training, and support.
        </h2>
        <p className="text-lg mb-3">
          MediLink makes your work easier. Whether it’s accessing training, tracking visits, or scanning a patient’s NHIF card—we’re your digital health assistant in the field.
        </p>
        <p className="font-medium mb-4">
          CHWs are the backbone of Kenya’s community health system. MediLink equips you with tools to serve better, track work, and earn incentives.
        </p>
      </div>

      <div className="space-y-14 mb-16">
        {features.map((feature, idx) => (
          <div
            key={feature.title}
            className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-2 md:px-6"
          >
            {/* Text Column */}
            <div
              className={`flex flex-col justify-center ${
                idx % 2 === 0 ? "" : "md:order-2"
              }`}
            >
              <h3 className="text-3xl font-bold text-blue-800 mb-4">
                {feature.title}
              </h3>
              <ul className="list-disc list-inside text-lg space-y-2 leading-relaxed">
                {feature.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-blue-700 text-base font-medium">
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
                className={`w-full max-w-[600px] h-[360px] md:h-[400px] object-cover rounded-xl border-4 border-blue-200
                  ${idx % 2 === 0
                    ? 'shadow-[-20px_0_40px_-10px_rgba(30,64,175,0.25),-40px_0_60px_-20px_rgba(30,64,175,0.18),-60px_0_80px_-30px_rgba(30,64,175,0.12)]'
                    : 'shadow-[20px_0_40px_-10px_rgba(30,64,175,0.25),40px_0_60px_-20px_rgba(30,64,175,0.18),60px_0_80px_-30px_rgba(30,64,175,0.12)]'}
                `}
              />
            </div>
          </div>
        ))}
      </div>


      <CHWCarousel />



      <div className="w-full flex flex-col items-center justify-center mt-12 mb-0">
        {/* Buttons and Quick Links Row */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
          <div className="flex gap-4">
            <a
              href="#share-experience"
              className="text-blue-700 border border-blue-300 px-6 py-2 rounded-xl font-bold text-base hover:bg-blue-100 hover:text-blue-900 transition-all duration-200 shadow-sm"
            >
              Share Your Experience
            </a>
            <a
              href="/join-chw"
              className="text-blue-700 border border-blue-300 px-6 py-2 rounded-xl font-bold text-base hover:bg-blue-100 hover:text-blue-900 transition-all duration-200 shadow-sm"
            >
              Register as a CHW
            </a>
          </div>
          <div className="hidden md:flex flex-col gap-2 ml-8">
            <a href="/faq" className="text-blue-700 font-semibold hover:underline">FAQs</a>
            <a href="/contact" className="text-blue-700 font-semibold hover:underline">Contact Support</a>
            <a href="/services/chws" className="text-blue-700 font-semibold hover:underline">CHW Services</a>
          </div>
        </div>
        {/* Info Cards Row */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="p-6 flex-1 max-w-md">
            <h5 className="text-lg font-bold text-blue-800 mb-2">Why Join MediLink?</h5>
            <ul className="list-disc list-inside text-gray-700 text-base mb-2">
              <li>Manage assigned patient visits and requests efficiently</li>
              <li>Track outreach activities and mileage with GPS logging</li>
              <li>Access digital training modules and earn certifications</li>
              <li>Scan NHIF cards and update patient records instantly</li>
              <li>Receive performance reports and earn incentives</li>
              <li>Communicate directly with supervisors for support</li>
            </ul>
            <p className="text-blue-600 italic">"Empowering CHWs to deliver better care in the community."</p>
          </div>
          <div className="p-6 flex-1 max-w-md">
            <h5 className="text-lg font-bold text-blue-800 mb-2">Need Help?</h5>
            <ul className="list-disc list-inside text-gray-700 text-base mb-2">
              <li>Visit our <a href="/faq" className="text-blue-700 hover:underline">FAQ</a> page</li>
              <li>Contact our support team for assistance</li>
              <li>Explore patient resources and guides</li>
            </ul>
            <p className="text-blue-600 italic">"We're here for you every step of the way."</p>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default CHWs;
