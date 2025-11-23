

const Story = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50 overflow-x-hidden">
      
      
      <main className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 max-w-[1200px] mx-auto">
        <section className="w-full flex flex-col items-center mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-3 sm:mb-4 text-center leading-tight font-serif px-2">Our Story</h1>
        </section>


        <section className="mb-4 sm:mb-5 md:mb-6 w-full bg-blue-50 p-3 sm:p-4 text-left">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-3 sm:mb-4 font-serif px-2">Problem-Driven</h2>
          <p className="text-sm sm:text-base md:text-lg mb-2 sm:mb-3 px-2 leading-relaxed">MediLink was born from a deep understanding of the challenges many African communities face when trying to access timely and quality healthcare. In rural and underserved areas, distance, cost, lack of infrastructure, and limited staffing continue to be barriers to life-saving care.</p>
          <p className="text-sm sm:text-base md:text-lg mb-2 sm:mb-3 px-2 leading-relaxed">Founded by a group of passionate technologists, medical professionals, and community leaders, MediLink is more than a platform—it is a movement. A movement to ensure that no one is left behind due to where they live, how much they earn, or the resources available around them.</p>
          <p className="text-sm sm:text-base md:text-lg mb-2 sm:mb-3 px-2 leading-relaxed">We saw the power of community health workers (CHWs)—often the first and only link to care in remote areas—and we asked: <span className="font-semibold text-blue-800">What if we could supercharge their impact with digital tools?</span><br/>What if every citizen, from urban centers to remote villages, could connect to care, support, education, and emergency help through their phone?</p>
          <p className="text-sm sm:text-base md:text-lg mb-2 sm:mb-3 px-2 leading-relaxed">With this vision, MediLink was created—a centralized digital health platform that brings together:</p>
          <ul className="list-none space-y-2 sm:space-y-2.5 md:space-y-3 mb-3 sm:mb-4 px-2">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
              <span className="text-xs sm:text-sm md:text-base">Patients seeking care, education, or emergency support</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
              <span className="text-xs sm:text-sm md:text-base">Clinics and hospitals aiming to serve better and smarter</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
              <span className="text-xs sm:text-sm md:text-base">CHWs on the frontlines delivering care in homes and villages</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
              <span className="text-xs sm:text-sm md:text-base">Governments and NGOs driving public health policy and outreach</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
              <span className="text-xs sm:text-sm md:text-base">Donors and partners committed to sustainable health solutions</span>
            </li>
          </ul>
          <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 px-2 leading-relaxed">Through real-time bookings, home visits, insurance claims, and secure health data access, MediLink brings healthcare within reach. Whether it's an elderly patient requesting a home visit, a mother seeking health tips via SMS, or a clinic managing dozens of patient referrals, MediLink provides the digital backbone.</p>
        </section>


        {/* Why We Exist */}
        <section className="mb-4 sm:mb-5 md:mb-6 w-full p-2 sm:p-3 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-stretch">
            {/* Video Column */}
            <div className="w-full flex justify-center items-stretch min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
              <div className="w-full max-w-xl rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg flex h-full">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/cM4aep7VXb8"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ height: '100%' }}
                ></iframe>
              </div>
            </div>
            {/* Text Column */}
            <div className="flex flex-col justify-between h-full px-2">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-2 sm:mb-3 font-serif">Why We Exist</h2>
              <ul className="list-none space-y-2 sm:space-y-2.5 md:space-y-3 mb-2 sm:mb-3">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                  <span className="text-xs sm:text-sm md:text-base">To reduce maternal and child mortality through faster access to trained health workers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                  <span className="text-xs sm:text-sm md:text-base">To empower CHWs with tools, training, and income</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                  <span className="text-xs sm:text-sm md:text-base">To streamline health systems and reduce hospital congestion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                  <span className="text-xs sm:text-sm md:text-base">To help governments and NGOs make data-driven decisions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                  <span className="text-xs sm:text-sm md:text-base">To create a transparent and sustainable digital health ecosystem</span>
                </li>
              </ul>
              <div className="mt-2 sm:mt-3 md:mt-4">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-700 mb-2 sm:mb-3 font-serif">Our Impact</h3>
                <p className="mb-2 sm:mb-3 text-xs sm:text-sm md:text-base">Since our inception, MediLink has:</p>
                <ul className="list-none space-y-2 sm:space-y-2.5 md:space-y-3 mb-2">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">Connected thousands of patients to care in remote areas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">Enabled hundreds of CHWs to earn a stable income and access training</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">Helped clinics and hospitals manage patient flow and referrals more efficiently</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">Supported government and NGO health campaigns with real-time data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full p-2 sm:p-3 text-left">
          <div className="px-2">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-700 mb-2 sm:mb-3 font-serif">A Vision for the Future</h3>
                <p className="text-xs sm:text-sm md:text-base leading-relaxed">We are committed to expanding our reach, deepening our impact, and continuously innovating to solve Africa's most pressing health challenges. MediLink is not just a solution—it's a promise to every community, every family, and every health worker that better care is possible.</p>
          </div>

        </section>


      </main>
    </div>
  );
};

export default Story;
