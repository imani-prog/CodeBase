
import MedilinkHomePageSlider from "../../assets/MedilinkHomePageSlider.jpeg";
import Workers from "../../assets/Workers.jpg";


const AboutMediLink = ({ compact = false }) => {
  return (
    <div
      className={`w-full flex flex-col font-sans relative bg-gray-50 overflow-x-hidden${
        compact ? "" : " min-h-screen"
      }`}
    >

      <main className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 max-w-[1200px] mx-auto">
        <section className="w-full flex flex-col items-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-3 sm:mb-4 text-center font-serif leading-tight px-2">About MediLink</h1>
          {/* Healthcare Illustration Image */}
      
        </section>
        <section className="mb-6 sm:mb-8 md:mb-10 w-full bg-gray-50 p-3 sm:p-4 text-left">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-blue-800 font-serif mb-3 sm:mb-4 px-2">Who We Are</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6 md:gap-8">
            <div className="flex-1">
              <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 px-2 leading-relaxed">
                {compact
                  ? "MediLink is a digital health company expanding access to care across Africa by connecting citizens, clinics, hospitals, and CHWs."
                  : "MediLink is a digital health and technology company transforming healthcare access in Africa. Our mission is to bridge the gaps between citizens, clinics, hospitals, and Community Health Workers (CHWs) through smart, user-centric technology."}
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4 px-2 leading-relaxed">
                {compact
                  ? "We offer one platform for appointments, outreach, telemedicine, and payments or insurance."
                  : "We provide a centralized healthcare service platform that makes it easier to book appointments, coordinate outreach, deliver home-based care, enable remote consultations (telemedicine), and manage payments or insurance claims — all from one digital ecosystem."}
              </p>
            </div>
            <div className="flex-1 flex items-stretch justify-center min-h-[250px] sm:min-h-[280px] md:min-h-[300px]">
              <img
                src={MedilinkHomePageSlider}
                alt="Healthcare Technology Illustration"
                className="w-full h-full rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-blue-200 object-cover"
                style={{ 
                  minHeight: '100%', 
                  minWidth: '100%',
                  boxShadow: '-8px 8px 0px rgba(59, 130, 246, 0.3), -16px 16px 0px rgba(59, 130, 246, 0.2), -24px 24px 0px rgba(59, 130, 246, 0.1), -32px 32px 20px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          </div>
        </section>



        {!compact && (
          <section className="mb-2 sm:mb-8 md:mb-10 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Column 1: How MediLink Works with Health Facilities */}
              <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <h2 className="text-lg sm:text-xl md:text-2xl text-blue-700 font-bold mb-3 sm:mb-4 font-serif px-2">How MediLink Works with Health Facilities</h2>
                <ul className="list-none space-y-2 sm:space-y-2.5 md:space-y-3 mb-3 sm:mb-4 px-2">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">Receiving digital tools to manage patient flow and care delivery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">Using MediLink to dispatch CHWs and ambulances</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">Accessing real-time data for insurance claims, payments, and reports</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">Improving coordination between staff, CHWs, and patients</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">Enhancing public outreach and expanding their footprint into underserved areas</span>
                  </li>
                </ul>
                <p className="mb-2 text-xs sm:text-sm md:text-base">We offer training and support to health workers, ensuring smooth onboarding and sustainable use of the systems.</p>
              </div>
              {/* Column 2: How the Platform Operates */}
              <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <h2 className="text-lg sm:text-xl md:text-2xl text-blue-700 font-bold font-serif mb-3 sm:mb-4 px-2">How the Platform Operates</h2>
                <ul className="list-none space-y-2 sm:space-y-2.5 md:space-y-3 mb-3 sm:mb-4 px-2">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">A robust backend (Spring Boot + PostgreSQL/MySQL)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">Microservice architecture for performance and scalability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">Integration with local APIs (e.g., NHIF, M-Pesa)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">A secure portal for each user type (patients, CHWs, clinics, admins)</span>
                  </li>
                </ul>
                <p className="mb-0 text-xs sm:text-sm md:text-base px-2">Patients can request services online or via USSD, while CHWs access mobile tools to manage visits and provide feedback. Clinics can upload prescriptions, assign staff, and generate insurance reports. Admins monitor everything from a central dashboard.</p>
              </div>
            </div>
          </section>
        )}
        {!compact && (
          <section className="mb-4 sm:mb-5 md:mb-6 w-full bg-blue-50 p-2 sm:p-3">
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">
              <div className="flex-1 flex items-stretch justify-center min-h-[250px] sm:min-h-[280px] md:min-h-[300px]">
                <img 
                  src={Workers} 
                  alt="Workers" 
                  className="w-full h-full rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg object-cover" 
                  style={{ 
                    minHeight: '100%', 
                    minWidth: '100%',
                    boxShadow: '8px 8px 0px rgba(59, 130, 246, 0.3), 16px 16px 0px rgba(59, 130, 246, 0.2), 24px 24px 0px rgba(59, 130, 246, 0.1), 32px 32px 20px rgba(0, 0, 0, 0.1)'
                  }} 
                />
              </div>
              <div className="flex-1 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-blue-300 p-4 sm:p-5 md:p-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 mb-3 sm:mb-4 font-serif px-2">Our Broader Vision</h2>
                <p className="mb-3 sm:mb-4 text-xs sm:text-sm md:text-base px-2">At its heart, MediLink is more than software. We are a movement for health equity, built on the belief that no one should be left behind. We work closely with:</p>
                <ul className="list-none space-y-2 sm:space-y-2.5 md:space-y-3 mb-3 sm:mb-4 px-2">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">Governments to support national health goals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">NGOs & humanitarian partners to reach vulnerable populations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">Universities & training colleges to empower CHWs and students with digital tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm md:text-base">Donors & sponsors to support innovation and outreach expansion</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}
       
        {!compact && (
          <section className="mb-0 w-full bg-blue-50 p-2 sm:p-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 mb-3 sm:mb-4 font-serif px-2">Together for Better Health</h2>
            <p className="mb-3 sm:mb-4 text-xs sm:text-sm md:text-base px-2 leading-relaxed">We believe in co-creating solutions with health providers, not just selling them. By listening to the needs on the ground, adapting to local contexts, and embracing innovation, we are redefining what it means to deliver care in Africa.</p>
            <blockquote className="border-l-2 sm:border-l-4 pl-3 sm:pl-4 italic text-blue-800 text-sm sm:text-base md:text-lg px-2">"Healing Begins with Connection."</blockquote>
          </section>
        )}
      </main>

      
    </div>
  );
};

export default AboutMediLink;
