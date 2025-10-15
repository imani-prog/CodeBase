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
      <section className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-blue-900 mb-6 sm:mb-8 md:mb-10 text-center px-2">
          Upcoming Events & Webinars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl h-[320px] sm:h-[340px] md:h-[360px] transform transition-transform duration-500 hover:scale-105"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 transition-all duration-500"></div>
              {/* Text Content */}
              <div className="absolute bottom-0 p-3 sm:p-4 md:p-6 z-20 text-white space-y-1 sm:space-y-1.5 md:space-y-2 transform translate-x-0 group-hover:translate-y-[-8px] transition-all duration-300 ease-out">
                <p className="text-xs sm:text-sm font-medium text-blue-200">{event.date}</p>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold leading-tight">{event.title}</h3>
                <p className="text-xs sm:text-sm text-blue-100 opacity-90 line-clamp-2">{event.desc}</p>
                {event.cta && (
                  <a
                    href={event.link}
                    className="inline-block text-xs sm:text-sm font-semibold mt-1 sm:mt-2 text-blue-300 underline hover:text-white transition"
                  >
                    {event.cta}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>



      <section className="mb-10 sm:mb-12 md:mb-16 lg:mb-20 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 font-serif mb-6 sm:mb-8 md:mb-10 text-center px-2">
          Gamified Health Challenges
        </h2>

        <div className="flex flex-col md:flex-row items-stretch gap-6 sm:gap-8 md:gap-10">
          {/* Left Content */}
          <div className="w-full md:w-1/2 p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl bg-white flex flex-col justify-center">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {challenges.map((challenge, index) => (
                <div
                  key={index}
                  style={{
                    animation: `slideUp 0.6s ease-out forwards`,
                    animationDelay: `${index * 0.2}s`,
                    opacity: 0,
                  }}
                  className="flex items-center justify-between gap-3 border-b border-blue-200 pb-3 sm:pb-4 last:border-none"
                >
                  <span className="font-medium text-xs sm:text-sm md:text-base flex-1">{challenge}</span>
                  <button className="bg-blue-700 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-900 transition-all duration-300 hover:scale-105 shadow-sm flex-shrink-0">
                    Join
                  </button>
                </div>
              ))}
            </div>

            <div
              className="pt-4 sm:pt-5 md:pt-6 text-xs sm:text-sm text-blue-700 text-center mt-4 sm:mt-5 md:mt-6 px-2"
              style={{
                animation: "fadeIn 1s ease-in 1.2s forwards",
                opacity: 0,
              }}
            >
              Complete challenges, earn badges, and climb the leaderboard!{" "}
              <a
                href="#"
                className="underline text-blue-900 hover:text-blue-700 transition-all duration-300 inline-block"
              >
                View Leaderboard
              </a>
            </div>
          </div>

          {/* Right Image with Sliding Text */}
          <div className="w-full md:w-1/2 relative rounded-lg sm:rounded-xl shadow-md sm:shadow-lg flex items-center justify-center min-h-[280px] sm:min-h-[320px] md:min-h-[360px]">
            <img
              key={currentImage}
              src={images[currentImage]}
              alt="Gamified Health Challenges"
              className="w-full h-full object-cover max-h-[300px] sm:max-h-[360px] md:max-h-[420px] rounded-lg sm:rounded-xl"
              style={{
                animation: "fadeZoom 1.5s ease-in-out",
                boxShadow: '-8px 8px 0px rgba(59, 130, 246, 0.3), -16px 16px 0px rgba(59, 130, 246, 0.2), -24px 24px 0px rgba(59, 130, 246, 0.1), -32px 32px 20px rgba(0, 0, 0, 0.1)'
              }}
            />
            <div
              className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-3 sm:left-4 md:left-5 bg-white/90 text-blue-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm shadow-md sm:shadow-lg backdrop-blur-sm"
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
