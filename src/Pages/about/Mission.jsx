import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";
import LiveChatButton from "../../Components/LiveChatButton.jsx";

const Mission = () => {
  return (
    <div className="mb-0 w-full bg-blue-950 text-left relative text-white overflow-hidden">
      
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="w-full flex flex-col items-center">
          <h1 className="text-5xl font-serif text-yellow-300 font-extrabold mb-6 text-center leading-tight">Vision & Mission</h1>
        </section>
        <section className="mb-10 w-full grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
          <div className="p-4 flex flex-col items-start bg-blue-50 shadow-lg rounded-3xl border border-blue-200">
            <h2 className="text-4xl font-serif font-extrabold text-blue-600 mb-2">Mission</h2>
            <p className="text-lg">To revolutionize healthcare access in Africa by connecting communities, clinics, and caregivers through a smart digital platform that simplifies access to quality, affordable, and timely medical services.</p>
          </div>
          <div className="p-4 flex flex-col items-start bg-blue-50 shadow-lg rounded-3xl border border-blue-200">
            <h2 className="text-4xl font-serif font-extrabold text-blue-600 mb-2">Vision</h2>
            <p className="text-lg">A healthy and empowered Africa where every citizen can access quality care, anytime, anywhere.</p>
          </div>
        </section>


        {/* Video Section with Text */}
        <section className="mb-10 w-full">
          <h2 className="text-5xl font-extrabold font-serif text-yellow-300 mb-8 text-center">Transforming African Healthcare</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Text Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4 font-serif text-yellow-100">Our Digital Revolution</h3>
                <p className="text-lg leading-relaxed mb-4">
                  MediLink is pioneering a new era of healthcare accessibility across Africa. Through our innovative digital platform, we're breaking down barriers that have traditionally limited access to quality medical care in underserved communities.
                </p>
                <p className="text-lg leading-relaxed">
                  Our technology connects patients, healthcare providers, and community health workers in a seamless ecosystem that prioritizes timely, affordable, and quality care for every African citizen.
                </p>
              </div>
                            
              <div className="text-black rounded-xl p-6">
                <h4 className="text-xl font-serif font-extrabold mb-3 text-white">Impact at a Glance</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-4 justify-items-center">
                  <div className="text-center bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-4 py-4 max-w-[150px]">
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-sm">Patients Served</div>
                  </div>
                  <div className="text-center bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-4 py-4 max-w-[150px]">
                    <div className="text-2xl font-bold">200+</div>
                    <div className="text-sm">Health Facilities</div>
                  </div>
                  <div className="text-center bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-4 py-4 max-w-[150px]">
                    <div className="text-2xl font-bold">1000+</div>
                    <div className="text-sm">CHW Network</div>
                  </div>
                  <div className="text-center bg-yellow-300 rounded-xl shadow-lg shadow-gray-500/50 px-4 py-4 max-w-[150px]">
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-sm">Counties Reached</div>
                  </div>
                </div>
              </div>



              <div>
                <h4 className="text-xl font-serif font-extrabold mb-3 text-blue-200">Key Features</h4>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    Real-time patient referral system
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    Telemedicine consultations
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    Community health worker coordination
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    Mobile-first healthcare access
                  </li>
                </ul>
              </div>
            </div>

            {/* Right side - Video */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-lg">
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/cM4aep7VXb8"
                  title="MediLink Mission Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-2xl shadow-lg border border-blue-200 w-full"
                ></iframe>
                <div className="mt-4 text-center">
                  <p className="text-blue-200 text-sm">
                    Watch how technology is transforming healthcare delivery across Africa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="mb-0 w-full text-left">
          <h2 className="text-3xl font-serif text-yellow-300 font-extrabold mb-4 text-center">Core Values</h2>
          <p className="text-lg text-center mb-8 max-w-2xl mx-auto">Our values drive every decision, every innovation, and every interaction. They shape the MediLink experience for communities, clinics, and caregivers across Africa.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto justify-center">
            <div className="bg-blue-100 rounded-2xl shadow-lg p-4 flex flex-col items-center ">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold font-serif text-blue-800 text-xl mb-2">Compassionate Care</span>
              <span className="text-center text-black">We put empathy and kindness at the heart of healthcare delivery.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center ">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold font-serif text-blue-800 text-xl mb-2">Integrity</span>
              <span className="text-center text-black">We uphold honesty, transparency, and ethical standards in all we do.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center ">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl font-serif mb-2">Accessibility</span>
              <span className="text-center text-black">We break barriers to ensure everyone can access quality care.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center ">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl font-serif mb-2">Innovation</span>
              <span className="text-center text-black">We embrace creativity and technology to solve real-world health challenges.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center ">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl font-serif mb-2">Accountability</span>
              <span className="text-center text-black">We take responsibility for our actions and measure our impact.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center ">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl font-serif mb-2">Community Empowerment</span>
              <span className="text-center text-black">We enable communities to take charge of their health and future.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center ">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl font-serif mb-2">Inclusivity</span>
              <span className="text-center text-black">We celebrate diversity and ensure no one is left behind.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl font-serif mb-2">Evidence-Based Practice</span>
              <span className="text-center text-black">We use data and research to guide our decisions and improve outcomes.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl font-serif mb-2">Sustainability</span>
              <span className="text-center text-black">We commit to environmentally sustainable practices that protect our planet.</span>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button className="px-6 py-3 bg-blue-700 text-white rounded-xl font-bold shadow-lg hover:bg-blue-800 transition">Learn More About Our Values</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Mission;
