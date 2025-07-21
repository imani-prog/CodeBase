
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
    <section className="w-full max-w-6xl mx-auto my-20 px-4">
      <h3 className="text-3xl font-bold text-blue-800 mb-12 text-center">
        How MediLink Solves Real Patient Problems
      </h3>

      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left: Feature Display */}
        <div className="w-full md:w-1/2 p-6 space-y-8">
          <h4 className="text-2xl font-bold text-blue-900">Your Health, Our Priority – Anywhere, Anytime</h4>

          {/* Animated Feature */}
          <div className="relative min-h-[160px] overflow-visible flex items-center">
            <button
              onClick={prev}
              className="absolute left-0 md:static w-10 h-10 rounded-full border border-blue-500 text-blue-700 hover:bg-blue-100 transition mr-4"
              style={{zIndex:2}}
            >
              &lt;
            </button>
            <div key={index} className="animate-fadeSlide flex-1 px-2">
              <p className="text-xl font-semibold text-blue-800 mb-2">{features[index].title}</p>
              <p className="font-bold text-base mb-2">{features[index].text}</p>
              <p className="text-gray-600 text-base">{features[index].desc}</p>
            </div>
            <button
              onClick={next}
              className="absolute right-0 md:static w-10 h-10 rounded-full border border-blue-500 text-blue-700 hover:bg-blue-100 transition ml-4"
              style={{zIndex:2}}
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
            className="rounded-xl shadow-lg w-full max-w-lg object-contain"
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
