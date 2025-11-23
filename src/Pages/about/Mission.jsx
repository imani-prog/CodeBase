
const Mission = () => {
  return (
    <div className="mb-0 w-full bg-blue-950 text-left relative text-white overflow-x-hidden">
      
      <main className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 max-w-[1200px] mx-auto">
        <section className="w-full flex flex-col items-center mb-4 sm:mb-5 md:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-yellow-300 font-extrabold mb-4 sm:mb-5 md:mb-6 text-center leading-tight px-2">Vision & Mission</h1>
        </section>
        <section className="mb-6 sm:mb-8 md:mb-10 w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 text-black">
          <div className="p-4 sm:p-5 md:p-6 flex flex-col items-start bg-blue-50 shadow-md sm:shadow-lg rounded-2xl sm:rounded-3xl border border-blue-200">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold text-blue-600 mb-2 sm:mb-3">Mission</h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">To revolutionize healthcare access in Africa by connecting communities, clinics, and caregivers through a smart digital platform that simplifies access to quality, affordable, and timely medical services.</p>
          </div>
          <div className="p-4 sm:p-5 md:p-6 flex flex-col items-start bg-blue-50 shadow-md sm:shadow-lg rounded-2xl sm:rounded-3xl border border-blue-200">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold text-blue-600 mb-2 sm:mb-3">Vision</h2>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">A healthy and empowered Africa where every citizen can access quality care, anytime, anywhere.</p>
          </div>
        </section>


        {/* Video Section with Text */}
        <section className="mb-6 sm:mb-8 md:mb-10 w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-yellow-300 mb-4 sm:mb-6 md:mb-8 text-center px-2">Transforming African Healthcare</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 md:gap-8 items-center">
            {/* Left side - Text Content */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 font-serif text-yellow-100 px-2">Our Digital Revolution</h3>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 px-2">
                  MediLink is pioneering a new era of healthcare accessibility across Africa. Through our innovative digital platform, we're breaking down barriers that have traditionally limited access to quality medical care in underserved communities.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed px-2">
                  Our technology connects patients, healthcare providers, and community health workers in a seamless ecosystem that prioritizes timely, affordable, and quality care for every African citizen.
                </p>
              </div>
                            
              <div className="text-black rounded-xl p-4 sm:p-5 md:p-6">
                <h4 className="text-lg sm:text-xl font-serif font-extrabold mb-3 text-white px-2">Impact at a Glance</h4>
                <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:gap-x-4 sm:gap-y-4 justify-items-center">
                  <div className="text-center bg-yellow-300 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg shadow-gray-500/50 px-3 py-3 sm:px-4 sm:py-4 max-w-[130px] sm:max-w-[150px] w-full">
                    <div className="text-xl sm:text-2xl font-bold">50K+</div>
                    <div className="text-xs sm:text-sm">Patients Served</div>
                  </div>
                  <div className="text-center bg-yellow-300 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg shadow-gray-500/50 px-3 py-3 sm:px-4 sm:py-4 max-w-[130px] sm:max-w-[150px] w-full">
                    <div className="text-xl sm:text-2xl font-bold">200+</div>
                    <div className="text-xs sm:text-sm">Health Facilities</div>
                  </div>
                  <div className="text-center bg-yellow-300 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg shadow-gray-500/50 px-3 py-3 sm:px-4 sm:py-4 max-w-[130px] sm:max-w-[150px] w-full">
                    <div className="text-xl sm:text-2xl font-bold">1000+</div>
                    <div className="text-xs sm:text-sm">CHW Network</div>
                  </div>
                  <div className="text-center bg-yellow-300 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg shadow-gray-500/50 px-3 py-3 sm:px-4 sm:py-4 max-w-[130px] sm:max-w-[150px] w-full">
                    <div className="text-xl sm:text-2xl font-bold">15+</div>
                    <div className="text-xs sm:text-sm">Counties Reached</div>
                  </div>
                </div>
              </div>



              <div>
                <h4 className="text-lg sm:text-xl font-serif font-extrabold mb-3 text-blue-200 px-2">Key Features</h4>
                <ul className="space-y-2 text-sm sm:text-base md:text-lg">
                  <li className="flex items-start px-2">
                    <span className="text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5">✓</span>
                    <span className="leading-relaxed">Real-time patient referral system</span>
                  </li>
                  <li className="flex items-start px-2">
                    <span className="text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5">✓</span>
                    <span className="leading-relaxed">Telemedicine consultations</span>
                  </li>
                  <li className="flex items-start px-2">
                    <span className="text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5">✓</span>
                    <span className="leading-relaxed">Community health worker coordination</span>
                  </li>
                  <li className="flex items-start px-2">
                    <span className="text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5">✓</span>
                    <span className="leading-relaxed">Mobile-first healthcare access</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right side - Video */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-lg">
                <iframe
                  width="100%"
                  src="https://www.youtube.com/embed/cM4aep7VXb8"
                  title="MediLink Mission Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-blue-200 w-full min-h-[200px] sm:min-h-[250px] md:min-h-[315px]"
                  style={{ aspectRatio: '16/9' }}
                ></iframe>
                <div className="mt-3 sm:mt-4 text-center px-2">
                  <p className="text-blue-200 text-xs sm:text-sm leading-relaxed">
                    Watch how technology is transforming healthcare delivery across Africa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="mb-0 w-full text-left">
          <h2 className="text-2xl sm:text-3xl font-serif text-yellow-300 font-extrabold mb-3 sm:mb-4 text-center px-2">Core Values</h2>
          <p className="text-sm sm:text-base md:text-lg text-center mb-6 sm:mb-7 md:mb-8 max-w-2xl mx-auto px-2 leading-relaxed">Our values drive every decision, every innovation, and every interaction. They shape the MediLink experience for communities, clinics, and caregivers across Africa.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto justify-center">
            <div className="bg-blue-100 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl mb-2 sm:mb-3"></span>
              <span className="font-bold font-serif text-blue-800 text-base sm:text-lg md:text-xl mb-2">Compassionate Care</span>
              <span className="text-center text-black text-xs sm:text-sm md:text-base leading-relaxed">We put empathy and kindness at the heart of healthcare delivery.</span>
            </div>
            <div className="bg-blue-100 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl mb-2 sm:mb-3"></span>
              <span className="font-bold font-serif text-blue-800 text-base sm:text-lg md:text-xl mb-2">Integrity</span>
              <span className="text-center text-black text-xs sm:text-sm md:text-base leading-relaxed">We uphold honesty, transparency, and ethical standards in all we do.</span>
            </div>
            <div className="bg-blue-100 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl mb-2 sm:mb-3"></span>
              <span className="font-bold text-blue-800 text-base sm:text-lg md:text-xl font-serif mb-2">Accessibility</span>
              <span className="text-center text-black text-xs sm:text-sm md:text-base leading-relaxed">We break barriers to ensure everyone can access quality care.</span>
            </div>
            <div className="bg-blue-100 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl mb-2 sm:mb-3"></span>
              <span className="font-bold text-blue-800 text-base sm:text-lg md:text-xl font-serif mb-2">Innovation</span>
              <span className="text-center text-black text-xs sm:text-sm md:text-base leading-relaxed">We embrace creativity and technology to solve real-world health challenges.</span>
            </div>
            <div className="bg-blue-100 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl mb-2 sm:mb-3"></span>
              <span className="font-bold text-blue-800 text-base sm:text-lg md:text-xl font-serif mb-2">Accountability</span>
              <span className="text-center text-black text-xs sm:text-sm md:text-base leading-relaxed">We take responsibility for our actions and measure our impact.</span>
            </div>
            <div className="bg-blue-100 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl mb-2 sm:mb-3"></span>
              <span className="font-bold text-blue-800 text-base sm:text-lg md:text-xl font-serif mb-2">Community Empowerment</span>
              <span className="text-center text-black text-xs sm:text-sm md:text-base leading-relaxed">We enable communities to take charge of their health and future.</span>
            </div>
            <div className="bg-blue-100 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 flex flex-col items-center">
              <span className="text-3xl sm:text-4xl mb-2 sm:mb-3"></span>
              <span className="font-bold text-blue-800 text-base sm:text-lg md:text-xl font-serif mb-2">Inclusivity</span>
              <span className="text-center text-black text-xs sm:text-sm md:text-base leading-relaxed">We celebrate diversity and ensure no one is left behind.</span>
            </div>
            <div className="bg-blue-100 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 flex flex-col items-center transition">
              <span className="text-3xl sm:text-4xl mb-2 sm:mb-3"></span>
              <span className="font-bold text-blue-800 text-base sm:text-lg md:text-xl font-serif mb-2">Evidence-Based Practice</span>
              <span className="text-center text-black text-xs sm:text-sm md:text-base leading-relaxed">We use data and research to guide our decisions and improve outcomes.</span>
            </div>
            <div className="bg-blue-100 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-4 sm:p-6 md:p-8 flex flex-col items-center transition">
              <span className="text-3xl sm:text-4xl mb-2 sm:mb-3"></span>
              <span className="font-bold text-blue-800 text-base sm:text-lg md:text-xl font-serif mb-2">Sustainability</span>
              <span className="text-center text-black text-xs sm:text-sm md:text-base leading-relaxed">We commit to environmentally sustainable practices that protect our planet.</span>
            </div>
          </div>
          <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 px-2">
            <button className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-blue-700 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-bold shadow-md sm:shadow-lg hover:bg-blue-800 hover:scale-105 transition-all">Learn More About Our Values</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Mission;
