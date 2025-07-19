import Footer from "../Components/Footer.jsx";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import HomepageImg from "../assets/Homepage.png";
import MediLinkLogo from "../assets/mediLink.png";

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Navbar */}
      <Navbar />
      
      <main className="flex flex-col items-center w-full px-4 py-8 max-w-[1600px] mx-auto">
        {/* Hero Section: Enhanced Welcome */}
        <section className="mb-16 w-full flex flex-col lg:flex-row items-center justify-between py-16 gap-12 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 rounded-3xl shadow-2xl border border-blue-200 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
          </div>
          
          {/* Left: Logo and Welcome Text */}
          <div className="flex flex-col items-center lg:items-start justify-center flex-1 min-w-[320px] max-w-2xl px-8 z-10">
            <div className="relative mb-8">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-lg opacity-30"></div>
              <img
                src={MediLinkLogo}
                alt="MediLink Logo"
                className="relative w-36 h-36 rounded-full shadow-2xl border-4 border-white bg-gradient-to-br from-blue-50 to-white"
              />
            </div>
            
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-extrabold text-blue-900 mb-6 leading-tight">
                Karibu{" "}
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                  MediLink!
                </span>
              </h1>
              <p className="text-2xl md:text-3xl font-medium text-blue-700 mb-8 leading-relaxed">
                Healing Begins with Connection.
              </p>
              
              {/* Mini Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
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
          
          {/* Right: Welcome Image */}
          <div className="flex-1 flex justify-center lg:justify-end w-full px-8 z-10">
            <div className="relative w-full max-w-2xl">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl blur-lg opacity-20"></div>
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur">
                <img
                  src={HomepageImg}
                  alt="MediLink Homepage"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
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

        {/* Slogan & Inspirational Verse - Enhanced */}
        <section className="mb-16 w-full bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 rounded-3xl shadow-xl border border-blue-200 p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-5 left-5 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
            <div className="absolute bottom-5 right-5 w-32 h-32 bg-blue-500 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
                "Health Within Reach."
              </h3>
            </div>
            
            <div className="bg-white/70 backdrop-blur rounded-2xl p-8 max-w-3xl mx-auto shadow-lg border border-blue-100">
              <blockquote className="italic text-blue-700 text-xl md:text-2xl leading-relaxed">
                <span className="text-blue-800 font-semibold">Jeremiah 33:6 (NIV)</span>
                <br />
                <br />
                "Nevertheless, I will bring health and healing to it; I will heal my people and will let them enjoy abundant peace and security."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Motivational Quotes - Modern Grid */}
        <section className="mb-16 w-full bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl border border-blue-200 p-12">
          <div className="text-center mb-10">
            <h4 className="text-3xl md:text-4xl font-bold text-blue-900">Motivational Quotes</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              "Health is not just the absence of illness, but the presence of community.",
              "When technology meets compassion, healthcare becomes a right, not a privilege.",
              "We rise by lifting others – especially in times of need.",
              "Innovation in service of humanity is the true measure of progress."
            ].map((quote, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-blue-100 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:transform hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-200 to-transparent rounded-full blur-xl opacity-50"></div>
                <div className="relative z-10">
                  <div className="text-4xl text-blue-400 mb-4">"</div>
                  <p className="text-lg md:text-xl text-blue-700 font-medium leading-relaxed italic">
                    {quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Buttons - Enhanced */}
        <section className="mb-16 w-full flex flex-col items-center">
          <div className="text-center mb-8">
            <h4 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Ready to Get Started?
            </h4>
            <p className="text-xl text-blue-700">
              Join thousands who are already experiencing better healthcare
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-4xl">
            <Link
              to="/register"
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-5 px-12 rounded-2xl shadow-xl text-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-2">📝</span>
                Register
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              to="/donate"
              className="group bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-5 px-12 rounded-2xl shadow-xl text-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-2">❤️</span>
                Donate
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              to="/partner"
              className="group bg-gradient-to-r from-blue-900 to-blue-950 hover:from-blue-950 hover:to-blue-900 text-white font-bold py-5 px-12 rounded-2xl shadow-xl text-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden w-full sm:w-auto text-center"
            >
              <span className="relative z-10 flex items-center justify-center">
                <span className="mr-2">🤝</span>
                Partner
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Link>
          </div>
        </section>

        {/* Swahili tagline - Enhanced */}
        <section className="mb-0 w-full  text-center">
          <div className="relative z-10">
            <div className=" backdrop-blur  p-4 max-w-2xl mx-auto ">
              <p className="text-blue-900 font-bold text-2xl md:text-3xl mb-4 leading-relaxed">
                Huduma Zilizo Karibu Na Mwananchi
              </p>
              <p className="text-blue-800 font-bold text-xl md:text-2xl leading-relaxed">
                Huduma za Afya kwa Wote
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;