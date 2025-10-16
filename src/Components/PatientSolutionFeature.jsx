
import { useState } from 'react';
import MedilinkAmbulance from '../assets/MedilinkAmbulance.png';

const features = [
  {
    title: 'No More Long Queues:',
    text: 'Book appointments online and get reminders for your visit.',
    desc: 'Avoid the hassle of waiting in line at clinics. With MediLink, you can schedule your appointments from home, receive timely reminders, and manage your bookings with ease. This saves you time and reduces stress, making healthcare more accessible.'
  },
  {
    title: 'Affordable Home Care:',
    text: 'Request a CHW or nurse to visit you at home, even in remote areas.',
    desc: 'Our network of Community Health Workers and nurses can reach you wherever you are. Get professional care at home, reducing travel costs and ensuring comfort for patients who need ongoing support or have mobility challenges.'
  },
  {
    title: 'Emergency Ambulance:',
    text: 'Track ambulance dispatch and get real-time updates in emergencies.',
    desc: 'In urgent situations, MediLink’s ambulance tracking keeps you informed. Receive live updates on arrival times, routes, and status, so you can prepare and stay calm during emergencies.'
  },
  {
    title: 'Insurance Integration:',
    text: 'Use NHIF/SHA for direct billing and avoid paperwork.',
    desc: 'Seamlessly connect your insurance for instant billing. No more lengthy forms or manual claims—just quick, secure payments and instant access to covered services.'
  },
  {
    title: 'Telemedicine Access:',
    text: 'Connect with doctors via video call for quick consultations.',
    desc: 'Speak to qualified doctors from anywhere using secure video calls. Get medical advice, prescriptions, and follow-ups without leaving your home.'
  },
  {
    title: 'Instant Reports:',
    text: 'Download your medical reports and prescriptions as PDFs.',
    desc: 'Access your health records instantly. Download, print, or share your reports and prescriptions securely, making it easy to keep track of your medical history.'
  },
  {
    title: 'Health Reminders:',
    text: 'Get SMS reminders for medication, check-ups, and vaccinations.',
    desc: 'Never miss a dose or appointment. MediLink sends you reminders for medications, check-ups, and vaccinations, helping you stay on top of your health routine.'
  },
  {
    title: 'Community Support:',
    text: 'Join health challenges and get tips from our community.',
    desc: 'Participate in health challenges, share experiences, and learn from others. Our community offers support, motivation, and practical tips for healthier living.'
  },
  {
    title: 'Secure Data:',
    text: 'Your health records are encrypted and accessible only to you.',
    desc: 'Your privacy is our priority. All your health data is encrypted and stored securely, ensuring only you and authorized professionals can access it.'
  },
  {
    title: 'Anonymous Peer Support Rooms:',
    text: 'Join private, anonymous chat rooms to share experiences and get advice.',
    desc: 'Connect with others facing similar health challenges in a safe, anonymous space. Share stories, ask questions, and receive support without revealing your identity.'
  },
  {
    title: 'Health Expense Analyzer:',
    text: 'Upload your medical bills and get cost-saving insights instantly.',
    desc: 'Take control of your healthcare spending. Upload bills to analyze costs, find savings, and get recommendations for more affordable care.'
  },
  {
    title: 'Caregiver Matchmaking:',
    text: 'Connect with verified caregivers or volunteers in your area.',
    desc: 'Find trusted caregivers or volunteers for companionship, home help, or recovery support. Choose based on your needs and preferences for peace of mind.'
  },
];

function PatientSolutionFeature() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % features.length);
  const prev = () => setIndex((prev) => (prev - 1 + features.length) % features.length);

  return (
    <section className="w-full max-w-6xl mx-auto my-10 sm:my-14 md:my-20 px-2 sm:px-4 md:px-6">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-6 sm:mb-8 md:mb-12 text-center font-serif leading-tight">
        How MediLink Solves Real Patient Problems
      </h3>

      <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-10">
        {/* Left: Feature Display */}
        <div className="w-full md:w-1/2 p-2 sm:p-3 md:p-6 space-y-4 sm:space-y-6 md:space-y-8">
          <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 font-serif leading-tight">Your Health, Our Priority – Anywhere, Anytime</h4>

          {/* Animated Feature */}
          <div className="relative min-h-[180px] sm:min-h-[170px] md:min-h-[160px] overflow-visible flex items-center">
            <button
              onClick={prev}
              className="absolute -left-3 sm:-left-2 md:static w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-blue-500 text-blue-700 hover:bg-blue-100 transition md:mr-4 z-10 bg-white shadow-sm flex-shrink-0"
              aria-label="Previous feature"
            >
              &lt;
            </button>
            <div key={index} className="animate-fadeSlide flex-1 px-6 sm:px-7 md:px-2">
              <p className="text-base sm:text-lg md:text-xl font-semibold text-blue-800 mb-2 font-serif leading-tight">{features[index].title}</p>
              <p className="font-bold text-sm sm:text-base mb-2 leading-relaxed">{features[index].text}</p>
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">{features[index].desc}</p>
            </div>
            <button
              onClick={next}
              className="absolute -right-3 sm:-right-2 md:static w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-blue-500 text-blue-700 hover:bg-blue-100 transition md:ml-4 z-10 bg-white shadow-sm flex-shrink-0"
              aria-label="Next feature"
            >
              &gt;
            </button>
          </div>
        
        </div>

        {/* Right: Ambulance Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={MedilinkAmbulance}
            alt="MediLink Ambulance"
            className="rounded-lg sm:rounded-xl w-full max-w-lg h-auto object-contain max-h-[250px] sm:max-h-[350px] md:max-h-[450px] lg:max-h-[550px] shadow-md sm:shadow-lg"
            style={{
              boxShadow: `
                -4px 4px 0px rgba(59, 130, 246, 0.3),
                -8px 8px 0px rgba(59, 130, 246, 0.2),
                -12px 12px 10px rgba(0, 0, 0, 0.1)
              `
            }}
          />
        </div>
      </div>

      {/* Internal Animations */}
      <style jsx>{`
        @keyframes fadeSlide {
          0% {
            opacity: 0;
            transform: translateX(40px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeSlide {
          animation: fadeSlide 0.6s ease-in-out;
        }
      `}</style>
    </section>
  );
}

export default PatientSolutionFeature;
