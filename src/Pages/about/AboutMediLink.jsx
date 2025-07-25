import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";
import MedilinkHomePageSlider from "../../assets/MedilinkHomePageSlider.jpeg";
import Workers from "../../assets/Workers.jpg";
import LiveChatButton from "../../Components/LiveChatButton.jsx";

const AboutMediLink = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <LiveChatButton />
      
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="w-full flex flex-col items-center mb-8">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4 text-center leading-tight">About MediLink</h1>
          {/* Healthcare Illustration Image */}
        
        </section>
        <section className="mb-10 w-full bg-blue-50 p-4 text-left">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Who We Are</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-1">
              <p className="text-lg mb-4">MediLink is a digital health and technology company transforming healthcare access in Africa. Our mission is to bridge the gaps between citizens, clinics, hospitals, and Community Health Workers (CHWs) through smart, user-centric technology.</p>
              <p className="text-lg mb-4">We provide a centralized healthcare service platform that makes it easier to book appointments, coordinate outreach, deliver home-based care, enable remote consultations (telemedicine), and manage payments or insurance claims — all from one digital ecosystem.</p>
            </div>
            <div className="flex-1 flex items-stretch justify-center">
              <img
                src={MedilinkHomePageSlider}
                alt="Healthcare Technology Illustration"
                className="w-full h-full rounded-2xl shadow-lg border border-blue-200 object-cover"
                style={{ minHeight: '100%', minWidth: '100%' }}
              />
            </div>
          </div>
        </section>


        <section className="mb-5 w-full p-0">
          <div className="w-full p-2">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-4">What We Do</h2>
            <p className="text-lg mb-6 leading-relaxed">MediLink operates as both a <span className="font-semibold text-blue-600">healthcare service platform</span> and a <span className="font-semibold text-blue-600">technology solutions provider</span>. Our offerings include:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">Healthcare SaaS Systems</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><span className="">•</span> Hospital Management Systems (HMS)</li>
                  <li className="flex items-center gap-2"><span className="">•</span> Patient Portals & Outreach Dashboards</li>
                  <li className="flex items-center gap-2"><span className="">•</span> Telemedicine Modules</li>
                  <li className="flex items-center gap-2"><span className="">•</span> Health Data Analytics & Reporting</li>
                  <li className="flex items-center gap-2"><span className="">•</span> CHW Workflow & Supervision Apps</li>
                  <li className="flex items-center gap-2"><span className="">•</span> Financial Integration (NHIF, M-Pesa, SHA)</li>
                </ul>
              </div>
              {/* Card 2 */}
              <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 flex flex-col justify-center gap-3">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">System Features</h3>
                <p className="mb-2">These systems are:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Modular</li>
                  <li>Secure</li>
                  <li>Mobile-friendly</li>
                  <li>Scalable</li>
                  <li>Tailored to the African healthcare context</li>
                </ul>
              </div>
            </div>
          </div>
        </section>



        <section className="mb-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1: How MediLink Works with Health Facilities */}
            <div className="rounded-2xl p-8">
              <h2 className="text-2xl text-blue-700 font-bold mb-4">How MediLink Works with Health Facilities</h2>
              <ul className="list-disc mb-4 flex flex-col gap-2">
                <li>Receiving digital tools to manage patient flow and care delivery</li>
                <li>Using MediLink to dispatch CHWs and ambulances</li>
                <li>Accessing real-time data for insurance claims, payments, and reports</li>
                <li>Improving coordination between staff, CHWs, and patients</li>
                <li>Enhancing public outreach and expanding their footprint into underserved areas</li>
              </ul>
              <p className="mb-2">We offer training and support to health workers, ensuring smooth onboarding and sustainable use of the systems.</p>
            </div>
            {/* Column 2: How the Platform Operates */}
            <div className="rounded-2xl p-8">
              <h2 className="text-2xl text-blue-700 font-bold mb-4">How the Platform Operates</h2>
              <ul className="list-disc   ml-6 mb-4">
                <li>A robust backend (Spring Boot + PostgreSQL/MySQL)</li>
                <li>Microservice architecture for performance and scalability</li>
                <li>Integration with local APIs (e.g., NHIF, M-Pesa)</li>
                <li>A secure portal for each user type (patients, CHWs, clinics, admins)</li>
              </ul>
              <p className="mb-0">Patients can request services online or via USSD, while CHWs access mobile tools to manage visits and provide feedback. Clinics can upload prescriptions, assign staff, and generate insurance reports. Admins monitor everything from a central dashboard.</p>
            </div>
          </div>
        </section>

        
        <section className="mb-5 w-full bg-blue-50  p-2">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <div className="flex-1 flex items-stretch justify-center">
              <img src={Workers} alt="Workers" className="w-full h-full rounded-2xl shadow object-cover" style={{ minHeight: '100%', minWidth: '100%' }} />
            </div>
            <div className="flex-1 rounded-2xl shadow border border-blue-300  p-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Our Broader Vision</h2>
              <p className="mb-4">At its heart, MediLink is more than software. We are a movement for health equity, built on the belief that no one should be left behind. We work closely with:</p>
              <ul className="list-disc ml-6 mb-4">
                <li>Governments to support national health goals</li>
                <li>NGOs & humanitarian partners to reach vulnerable populations</li>
                <li>Universities & training colleges to empower CHWs and students with digital tools</li>
                <li>Donors & sponsors to support innovation and outreach expansion</li>
              </ul>
            </div>
          </div>
        </section>
       
        <section className="mb-0 w-full bg-blue-50 p-0">
          <h2 className="text-2xl font-bold text-blue-700 mb-0">Together for Better Health</h2>
          <p className="mb-4">We believe in co-creating solutions with health providers, not just selling them. By listening to the needs on the ground, adapting to local contexts, and embracing innovation, we are redefining what it means to deliver care in Africa.</p>
          <blockquote className="border-l-4 pl-4 italic text-blue-800">“Healing Begins with Connection.”</blockquote>
        </section>
      </main>

      
    </div>
  );
};

export default AboutMediLink;
