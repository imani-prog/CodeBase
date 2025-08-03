/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DocUsingMedilink from "../assets/DocUsingMedilink.jpg";
import MedilinkHomePageSlider from "../assets/MedilinkHomePageSlider.jpeg";
import digitalhealthtechnology from "../assets/digital-health-technology-3.webp";
import workersTogetherness from  "../assets/WorkersTogetherness3.jpeg"
import TelemedicinePatients from "../assets/Telehealth.jpg";

const EventGamified = () => {
  const events = [
    {
      date: "July 28, 2025",
      title: "Webinar: Digital Health Transformation in Africa",
      desc: "Explore how technology is revolutionizing care delivery in underserved regions.",
      cta: "Register",
      link: "#",
      img: digitalhealthtechnology,
    },
    {
      date: "August 5, 2025",
      title: "Community Health Outreach - Nairobi Central Clinic",
      desc: "Join us for a live outreach event connecting CHWs with residents.",
      cta: null,
      link: null,
      img: workersTogetherness,
    },
    {
      date: "August 12, 2025",
      title: 'Live Q&A: "Ask a CHW Anything"',
      desc: "A live session with CHWs answering patient questions and sharing field insights.",
      cta: "Join Live",
      link: "#",
      img: TelemedicinePatients,
    },
  ];

  // Gamified Health Challenges section 
  const challenges = [
    "July Challenge: Walk 10,000 steps a day",
    "Hydration Hero: Drink 8 glasses of water daily",
    "Mental Wellness: Practice mindfulness for 5 minutes",
  ];
  const images = [
  workersTogetherness ,
  DocUsingMedilink,
  digitalhealthtechnology,
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* ...existing code... */}
      <section className="mb-24 w-full max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-blue-900 mb-10 text-center">
          Upcoming Events & Webinars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-2xl h-[360px] transform transition-transform duration-500 hover:scale-105"
            >
              {/* Background Image */}
              <img
                src={event.img}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-all duration-700"
                style={{
                  boxShadow: '8px 8px 0px rgba(59, 130, 246, 0.3), 16px 16px 0px rgba(59, 130, 246, 0.2), 24px 24px 0px rgba(59, 130, 246, 0.1), 32px 32px 20px rgba(0, 0, 0, 0.1)'
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent z-10 transition-all duration-500"></div>
              {/* Text Content */}
              <div className="absolute bottom-0 p-6 z-20 text-white space-y-2 transform translate-x-full group-hover:translate-x-0 transition-all duration-700 ease-out">
                <p className="text-sm font-medium text-blue-200">{event.date}</p>
                <h3 className="text-xl font-semibold leading-tight">{event.title}</h3>
                <p className="text-sm text-blue-100 opacity-90">{event.desc}</p>
                {event.cta && (
                  <a
                    href={event.link}
                    className="inline-block text-sm font-semibold mt-2 text-blue-300 underline hover:text-white transition"
                  >
                    {event.cta}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>



      <section className="mb-20 w-full max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-10 text-center">
          Gamified Health Challenges
        </h2>

        <div className="flex flex-col md:flex-row items-stretch gap-10">
          {/* Left Content */}
          <div className="w-full md:w-1/2 p-6 rounded-xl shadow-xl bg-white flex flex-col justify-center">
            <div className="space-y-6">
              {challenges.map((challenge, index) => (
                <div
                  key={index}
                  style={{
                    animation: `slideUp 0.6s ease-out forwards`,
                    animationDelay: `${index * 0.2}s`,
                    opacity: 0,
                  }}
                  className="flex items-center justify-between border-b border-blue-200 pb-4 last:border-none"
                >
                  <span className=" font-medium">{challenge}</span>
                  <button className="bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-blue-900 transition-all duration-300 hover:scale-105 shadow-sm">
                    Join
                  </button>
                </div>
              ))}
            </div>

            <div
              className="pt-6 text-sm text-blue-700 text-center mt-6"
              style={{
                animation: "fadeIn 1s ease-in 1.2s forwards",
                opacity: 0,
              }}
            >
              Complete challenges, earn badges, and climb the leaderboard!{" "}
              <a
                href="#"
                className="underline text-blue-900 hover:text-blue-700 transition-all duration-300"
              >
                View Leaderboard
              </a>
            </div>
          </div>

          {/* Right Image with Sliding Text */}
          <div className="w-full md:w-1/2 relative rounded-xl shadow-lg flex items-center justify-center">
            <img
              key={currentImage}
              src={images[currentImage]}
              alt="Gamified Health Challenges"
              className="w-full h-full object-cover max-h-[420px] rounded-xl"
              style={{
                animation: "fadeZoom 1.5s ease-in-out",
                boxShadow: '-8px 8px 0px rgba(59, 130, 246, 0.3), -16px 16px 0px rgba(59, 130, 246, 0.2), -24px 24px 0px rgba(59, 130, 246, 0.1), -32px 32px 20px rgba(0, 0, 0, 0.1)'
              }}
            />
            <div
              className="absolute bottom-5 left-5 bg-white/90 text-blue-800 px-4 py-2 rounded-lg text-sm shadow-lg backdrop-blur-sm"
              style={{
                animation: "slideLeft 0.8s ease-out 0.3s forwards",
                opacity: 0,
              }}
            >
              Stay Active, Stay Healthy!
            </div>
          </div>
        </div>

        {/* Inline Keyframes */}
        <style>
          {`
            @keyframes fadeIn {
              to { opacity: 1; }
            }

            @keyframes slideUp {
              0% { transform: translateY(30px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }

            @keyframes slideLeft {
              0% { transform: translateX(100px); opacity: 0; }
              100% { transform: translateX(0); opacity: 1; }
            }

            @keyframes fadeZoom {
              0% { transform: scale(1.05); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}
        </style>
      </section>
    </div>
  );
};

export default EventGamified;
