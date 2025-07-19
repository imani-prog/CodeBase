import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";

const AboutMediLink = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <Navbar />
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="w-full flex flex-col items-center mb-8">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4 text-center leading-tight">🏥 About MediLink</h1>
        </section>
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 text-left">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">💡 Who We Are</h2>
          <p className="text-lg text-blue-700 mb-4">MediLink is a digital health and technology company transforming healthcare access in Africa. Our mission is to bridge the gaps between citizens, clinics, hospitals, and Community Health Workers (CHWs) through smart, user-centric technology.</p>
          <p className="text-lg text-blue-700 mb-4">We provide a centralized healthcare service platform that makes it easier to book appointments, coordinate outreach, deliver home-based care, enable remote consultations (telemedicine), and manage payments or insurance claims — all from one digital ecosystem.</p>
        </section>
        <section className="mb-10 w-full bg-white rounded-2xl shadow border border-blue-100 p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🔧 What We Do</h2>
          <p className="text-blue-700 mb-4">MediLink operates as both a healthcare service platform and a technology solutions provider. Our offerings include:</p>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">💻 Healthcare SaaS Systems</h3>
          <ul className="list-disc ml-6 text-blue-700 mb-4">
            <li>Hospital Management Systems (HMS)</li>
            <li>Patient Portals & Outreach Dashboards</li>
            <li>Telemedicine Modules</li>
            <li>Health Data Analytics & Reporting</li>
            <li>CHW Workflow & Supervision Apps</li>
            <li>Financial Integration (NHIF, M-Pesa, SHA)</li>
          </ul>
          <p className="text-blue-700 mb-4">These systems are modular, secure, mobile-friendly, and scalable — tailored to the African healthcare context.</p>
        </section>
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🤝 How MediLink Works with Health Facilities</h2>
          <ul className="list-disc ml-6 text-blue-700 mb-4">
            <li>Receiving digital tools to manage patient flow and care delivery</li>
            <li>Using MediLink to dispatch CHWs and ambulances</li>
            <li>Accessing real-time data for insurance claims, payments, and reports</li>
            <li>Improving coordination between staff, CHWs, and patients</li>
            <li>Enhancing public outreach and expanding their footprint into underserved areas</li>
          </ul>
          <p className="text-blue-700 mb-4">We offer training and support to health workers, ensuring smooth onboarding and sustainable use of the systems.</p>
        </section>
        <section className="mb-10 w-full bg-white rounded-2xl shadow border border-blue-100 p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🧠 How the Platform Operates</h2>
          <ul className="list-disc ml-6 text-blue-700 mb-4">
            <li>A robust backend (Spring Boot + PostgreSQL/MySQL)</li>
            <li>Microservice architecture for performance and scalability</li>
            <li>Integration with local APIs (e.g., NHIF, M-Pesa)</li>
            <li>A secure portal for each user type (patients, CHWs, clinics, admins)</li>
          </ul>
          <p className="text-blue-700 mb-4">Patients can request services online or via USSD, while CHWs access mobile tools to manage visits and provide feedback. Clinics can upload prescriptions, assign staff, and generate insurance reports. Admins monitor everything from a central dashboard.</p>
        </section>
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🌍 Our Broader Vision</h2>
          <p className="text-blue-700 mb-4">At its heart, MediLink is more than software. We are a movement for health equity, built on the belief that no one should be left behind. We work closely with:</p>
          <ul className="list-disc ml-6 text-blue-700 mb-4">
            <li>Governments to support national health goals</li>
            <li>NGOs & humanitarian partners to reach vulnerable populations</li>
            <li>Universities & training colleges to empower CHWs and students with digital tools</li>
            <li>Donors & sponsors to support innovation and outreach expansion</li>
          </ul>
        </section>
        <section className="mb-10 w-full bg-white rounded-2xl shadow border border-blue-100 p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🔑 Core Values</h2>
          <ul className="list-disc ml-6 text-blue-700 mb-4">
            <li>Compassionate Care – Putting human dignity first</li>
            <li>Integrity – Transparent in data and decision-making</li>
            <li>Accessibility – Serving even the most remote communities</li>
            <li>Innovation – Leveraging technology for impact</li>
            <li>Accountability – Responsible stewardship of funds and resources</li>
            <li>Community Empowerment – Working with, not just for, the people</li>
            <li>Inclusivity – No barriers to entry, no patient left behind</li>
          </ul>
        </section>
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🌟 Mission Statement</h2>
          <p className="text-blue-700 mb-4">“To revolutionize healthcare access in Africa by connecting communities, clinics, and caregivers through a smart digital platform that simplifies access to quality, affordable, and timely medical services.”</p>
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🌍 Vision Statement</h2>
          <p className="text-blue-700 mb-4">“A healthy and empowered Africa where every citizen can access quality care, anytime, anywhere.”</p>
        </section>
        <section className="mb-10 w-full bg-white rounded-2xl shadow border border-blue-100 p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🛠 MediLink as a Tech Company</h2>
          <p className="text-blue-700 mb-4">MediLink also operates as a HealthTech firm offering custom software solutions for:</p>
          <ul className="list-disc ml-6 text-blue-700 mb-4">
            <li>Hospitals & private clinics</li>
            <li>Community programs</li>
            <li>County health offices</li>
            <li>NGOs and donors running health campaigns</li>
            <li>Medical education institutions</li>
          </ul>
          <p className="text-blue-700 mb-4">Our tools can be white-labeled, hosted, or deployed on-premise depending on the need. We provide:</p>
          <ul className="list-disc ml-6 text-blue-700 mb-4">
            <li>Custom development</li>
            <li>Maintenance & support</li>
            <li>Integrations with existing tools</li>
            <li>Data migration & staff training</li>
          </ul>
        </section>
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🩺 Together for Better Health</h2>
          <p className="text-blue-700 mb-4">We believe in co-creating solutions with health providers, not just selling them. By listening to the needs on the ground, adapting to local contexts, and embracing innovation, we are redefining what it means to deliver care in Africa.</p>
          <blockquote className="border-l-4 border-blue-400 pl-4 italic text-blue-800">💬 “Healing Begins with Connection.”</blockquote>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutMediLink;
