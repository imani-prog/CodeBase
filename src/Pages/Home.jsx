import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DocUsingMedilink from "../assets/DocUsingMedilink.jpg";
import HomepageImg from "../assets/Homepage.png";
import MediLinkLogo from "../assets/mediLink.png";
import MedilinkHomePageSlider from "../assets/MedilinkHomePageSlider.jpeg";
import Footer from "../Components/Footer.jsx";
import LiveChatButton from "../Components/LiveChatButton.jsx";
import Navbar from "../Components/Navbar.jsx";

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
    <div className="min-h-screen w-full flex flex-col items-center justify-start font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <LiveChatButton />

      {/* Navbar */}
      <Navbar />

      <main className="flex flex-col items-center w-full px-4 py-8 max-w-[1600px] mx-auto">
        
        {/* Hero Section: Image Slider with Overlayed Text */}
        <section className="mb-16 w-full relative aspect-[16/9] rounded-3xl shadow-2xl border border-blue-200 overflow-hidden flex items-center justify-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          {/* Image Slider */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={sliderImages[currentSlide]}
              alt="MediLink Slide"
              className="w-full h-full object-cover transition-all duration-700"
              style={{ transition: "opacity 0.7s" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
          </div>

          {/* Overlayed Text and Logo */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-8">
            <div className="relative mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-lg opacity-30"></div>
              <img
                src={MediLinkLogo}
                alt="MediLink Logo"
                className="relative w-36 h-36 rounded-full shadow-2xl border-4 border-white bg-gradient-to-br from-blue-50 to-white"
              />
            </div>
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-extrabold text-blue-50 mb-6 leading-tight drop-shadow-lg">
                Karibu{" "}
                <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                  MediLink!
                </span>
              </h1>
              <p className="text-2xl md:text-3xl font-medium text-blue-100 mb-8 leading-relaxed drop-shadow">
                Healing Begins with Connection.
              </p>
              {/* Mini Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="bg-white/70 backdrop-blur rounded-xl px-4 py-2 shadow-lg border border-blue-200">
                  <div className="text-lg font-bold text-blue-800">10K+</div>
                  <div className="text-sm text-blue-600">Patients</div>
                </div>
                <div className="bg-white/70 backdrop-blur rounded-xl px-4 py-2 shadow-lg border border-blue-200">
                  <div className="text-lg font-bold text-blue-800">200+</div>
                  <div className="text-sm text-blue-600">CHWs</div>
                </div>
                <div className="bg-white/70 backdrop-blur rounded-xl px-4 py-2 shadow-lg border border-blue-200">
                  <div className="text-lg font-bold text-blue-800">50+</div>
                  <div className="text-sm text-blue-600">Facilities</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Mission & Vision - Enhanced Cards */}
      <section className="mb-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="group bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl border border-blue-200 p-10 flex flex-col items-start hover:transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">Our Mission</h2>
          <p className="text-lg md:text-xl leading-relaxed">
            To revolutionize healthcare access in Africa by connecting communities, clinics, and caregivers through a smart digital platform that simplifies access to quality, affordable, and timely medical services.
          </p>
        </div>
        
        <div className="group bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl border border-blue-200 p-10 flex flex-col items-start hover:transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200 to-transparent rounded-full blur-2xl opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">Our Vision</h2>
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
                <h4 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">How MediLink Works</h4>
                <p className="text-md md:text-lg text-blue-700 max-w-md mb-4">
                  MediLink makes healthcare easy and accessible. Here’s how it works:
                </p>
                <ol className="list-disc pl-5 text-base md:text-lg space-y-2">
                  <li>Create your account or log in to access personalized healthcare services and support.</li>
                  <li>Browse available clinics, services, and health workers in your area or online.</li>
                  <li>Reach out to community health workers, doctors, or support staff for guidance and care.</li>
                  <li>Receive timely medical attention, advice, and ongoing support for your health needs.</li>
                </ol>
              </div>
            </div>
            {/* Right: Video */}
            <div className="flex-1 flex justify-center items-center min-w-0">
              <div className="w-full max-w-xl aspect-video rounded-2xl overflow-hidden shadow-lg border border-blue-100">
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
            <h4 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Ready to Get Started?
            </h4>
            <p className="text-xl">
              Join thousands who are already experiencing better healthcare
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-4xl">
            <Link
              to="/register"
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
              to="/partner"
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
        <section className="mb-0 w-full flex flex-col md:flex-row gap-8 items-stretch">
          {/* Left: Slogan & Inspirational Verse */}
          <div className="flex-1 p-5 text-center relative overflow-hidden flex flex-col justify-center bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl border border-blue-200">
            <div className="absolute inset-0 opacity-10 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                  "Health Within Reach."
                </h3>
              </div>
              <div className="backdrop-blur p-8 max-w-3xl mx-auto">
                <blockquote className="italic text-xl md:text-2xl leading-relaxed">
                  <span className="text-blue-800 font-semibold">Jeremiah 33:6 (NIV)</span>
                  <br />
                  <br />
                  "Nevertheless, I will bring health and healing to it; I will heal my people and will let them enjoy abundant peace and security."
                </blockquote>
              </div>
            </div>
          </div>

          {/* Right: Swahili tagline */}
          <div className="flex-1 text-center flex flex-col justify-center bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl border border-blue-200 p-5">
            <div className="relative z-10">
              <div className="backdrop-blur p-4 max-w-2xl mx-auto">
                <p className="text-blue-900 font-bold text-2xl md:text-3xl mb-4 leading-relaxed">
                  Services Close to the People
                </p>
                <p className="font-bold text-xl md:text-2xl leading-relaxed mb-4">
                  Healthcare for Everyone
                </p>
                <p className="text-lg md:text-xl leading-relaxed mb-2">
                  We take pride in providing quality healthcare services that reach every individual without discrimination. Our digital platform brings together communities, health workers, and health facilities to ensure everyone receives treatment easily and quickly.
                </p>
                <p className="text-lg md:text-xl leading-relaxed">
                  Join us on the journey to improve the lives and health of all Kenyans. Health is a fundamental right, and we are here to make sure it is accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;