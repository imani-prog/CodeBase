import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DocUsingMedilink from "../assets/DocUsingMedilink.jpg";
import HomepageImg from "../assets/Homepage.png";
import MediLinkLogo from "../assets/mediLink.png";
import MedilinkHomePageSlider from "../assets/TechnologyHome.jpg";
import EventGamified from "../Components/EventGamified.jsx";

import LiveChatButton from "../Components/LiveChatButton.jsx";


const Home = () => {
  // Image slider setup
  const sliderImages = [
    HomepageImg,
    MedilinkHomePageSlider,
    DocUsingMedilink,
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [sliderImages.length]);


  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      
      


      <main className="flex flex-col items-center w-full px-4 py-8 max-w-[1600px] mx-auto">
        <section className="relative w-full aspect-[4/3] md:aspect-[16/9] min-h-[500px] md:min-h-[600px] mb-16 rounded-3xl overflow-hidden shadow-2xl border border-blue-200 bg-blue-950 text-white">
          {/* Background Blobs */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          </div>

          {/* Image Slider */}
          <div className="absolute inset-0 z-0 transition-opacity duration-700">
            <img
              src={sliderImages[currentSlide]}
              alt={`MediLink Slide ${currentSlide + 1}`}
              className="w-full h-full object-cover"
              
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
          </div>

          {/* Overlayed Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-6 text-center py-6 md:py-8">
            {/* Logo Glow */}
            <div className="relative mb-3 md:mb-6">
              <div className="absolute -inset-4  rounded-full blur-xl opacity-40"></div>
              <img
                src={MediLinkLogo}
                alt="MediLink Logo"
                className="relative w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full shadow-xl border-4 border-white bg-gradient-to-br from-blue-50 to-white"
                
              />
            </div>

            {/* Hero Title */}
            <h1 className="text-xl md:text-4xl lg:text-6xl font-extrabold leading-tight mb-2 md:mb-4 drop-shadow-xl">
              Karibu{" "}
              <span className="bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                MediLink
              </span>
            </h1>

            <p className="text-sm md:text-xl lg:text-2xl font-bold text-blue-100 mb-3 md:mb-6 max-w-2xl leading-relaxed drop-shadow">
              Healing Begins with Connection.
            </p>

            {/* CTA Button (Optional) */}
            <a
              href=""
              className="inline-block text-xs md:text-sm lg:text-base px-3 md:px-6 py-2 md:py-3 rounded-full border border-white text-white hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold shadow-sm mb-3 md:mb-6"
            >
              Get Started
            </a>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-6 w-full">
              {[
                { value: "10K+", label: "Patients" },
                { value: "200+", label: "CHWs" },
                { value: "50+", label: "Facilities" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-yellow-300 border border-blue-200 rounded-lg md:rounded-xl px-2 md:px-5 py-1 md:py-3 shadow-lg flex-1 max-w-[100px] md:max-w-[120px] text-center"
                >
                  <div className="text-xs md:text-lg font-bold text-black">{value}</div>
                  <div className="text-xs md:text-sm text-black">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>


      {/* Mission & Vision - Enhanced Cards */}
      <section className="mb-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="mb-5 w-full text-left">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-blue-800 mb-6">Our Mission</h2>
          <p className="text-lg md:text-xl leading-relaxed">
            To revolutionize healthcare access in Africa by connecting communities, clinics, and caregivers through a smart digital platform that simplifies access to quality, affordable, and timely medical services.
          </p>
        </div>
        
        <div className="mb-5 w-full text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200 to-transparent rounded-full blur-2xl opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-blue-800 mb-6">Our Vision</h2>
            <p className="text-lg md:text-xl  leading-relaxed">
              A healthy and empowered Africa where every citizen can access quality care, anytime, anywhere.
            </p>
          </div>
        </div>
      </section>

       
        {/* How MediLink Works - Step by Step Guide */}
        <section className="mb-8 w-full p-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left: Steps Guide */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="mb-4 text-left md:text-left">
                <h4 className="text-3xl md:text-4xl font-bold text-blue-900 font-serif mb-2">How MediLink Works</h4>
                <p className="text-md md:text-lg text-blue-700 max-w-md mb-4">
                  MediLink makes healthcare easy and accessible. Here’s how it works:
                </p>
                  <ol className="list-none space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3 mt-1">✓</span>
                    <span>Create your account or log in to access personalized healthcare services and support.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3 mt-1">✓</span>
                    <span>Browse available clinics, services, and health workers in your area or online.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3 mt-1">✓</span>
                    <span>Reach out to community health workers, doctors, or support staff for guidance and care.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3 mt-1">✓</span>
                    <span>Receive timely medical attention, advice, and ongoing support for your health needs.</span>
                  </li>
                </ol>
              </div>
            </div>
            {/* Right: Video */}
            <div className="flex-1 flex justify-center items-center min-w-0">
              <div className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-xl border border-blue-100 min-h-[200px] md:min-h-[300px] lg:min-h-[400px]">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/cM4aep7VXb8"
                  title="MediLink Introduction Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Buttons - Enhanced */}
        <section className="mb-8 w-full flex flex-col items-center">
          <div className="text-center mb-4">
            <h4 className="text-3xl md:text-4xl font-bold font-serif text-blue-900 mb-4">
              Ready to Get Started?
            </h4>
            <p className="text-xl">
              Join thousands who are already experiencing better healthcare
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-4xl">
            <Link
              to=""
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-2xl shadow-xl text-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-2"></span>
                Register
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              to="/donate"
              className="group bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-2xl shadow-xl text-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-2"></span>
                Donate
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              to="/partners"
              className="group bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-950 hover:to-blue-900 text-white font-bold py-3 px-8 rounded-2xl shadow-xl text-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-2"></span>
                Partner
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
          </div>
        </section>

        {/* Two Column Section: Slogan & Swahili Tagline */}
        <section className="mb-5 w-full flex flex-col md:flex-row gap-8 items-stretch">
          {/* Left: Slogan & Inspirational Verse */}
          <div className="flex-1 min-w-[280px] max-w-[400px] mx-auto text-center relative overflow-hidden flex flex-col justify-center bg-gradient-to-br  p-4 md:p-6 h-[320px] md:h-[340px]">
            <div className="absolute inset-0 opacity-10 pointer-events-none"></div>
            <div className="relative z-10 flex flex-col justify-center h-full">
              <div className="mb-4">
                <h3 className="text-2xl md:text-3xl font-bold font-serif text-blue-900 mb-2">
                  "Health Within Reach."
                </h3>
              </div>
              <div className="backdrop-blur p-1 max-w-xs mx-auto pb-0">
                <blockquote className="italic text-base md:text-lg leading-relaxed">
                  <span className="text-blue-800 font-semibold">Jeremiah 33:6 (NIV)</span>
                  <br />
                  <br />
                  "Nevertheless, I will bring health and healing to it; I will heal my people and will let them enjoy abundant peace and security."
                </blockquote>
              </div>
            </div>
          </div>

          {/* Divider with icon and message */}
          <div className="hidden md:flex flex-col items-center justify-center mx-2 animate-fade-in" style={{animation: 'fadeIn 1s ease-in'}}>
            <div className="w-[2px] h-32 bg-blue-200 mb-3 animate-pulse"></div>
            <div className="flex flex-col items-center">
              <span className="bg-blue-100 text-blue-700 rounded-full p-3 shadow mb-2 animate-bounce" style={{animation: 'bounce 2s infinite'}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </span>
              <span className="text-blue-700 text-sm font-semibold text-center max-w-[120px] animate-fade-in" style={{animation: 'fadeIn 1.5s ease-in'}}>
                Connecting Faith & Care
              </span>
            </div>
          </div>
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
            `}
          </style>

          {/* Right: Swahili tagline */}
          <div className="flex-1 min-w-[260px] max-w-[370px] mx-auto text-center flex flex-col justify-center bg-gradient-to-brp-3 md:p-4 h-[270px] md:h-[290px]">
            <div className="relative z-10 flex flex-col justify-center h-full">
              <div className="backdrop-blur p-1 max-w-xs mx-auto flex flex-col justify-center h-full">
                <p className="text-blue-900 font-serif font-bold text-lg md:text-xl mb-1 leading-relaxed">
                  Services Close to the People
                </p>
                <p className="font-bold text-base md:text-lg leading-relaxed mb-1">
                  Healthcare for Everyone
                </p>
                <p className="text-sm md:text-base leading-relaxed mb-1">
                  We provide quality healthcare for all, connecting communities, health workers, and facilities so everyone gets care quickly and easily.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Health is a right. We help make it accessible to every Kenyan.
                </p>
              </div>
            </div>
          </div>
        </section>


      <EventGamified />

      </main>

      
    </div>
  );
};

export default Home;