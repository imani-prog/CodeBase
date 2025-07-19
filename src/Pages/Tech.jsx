import { Link } from "react-router-dom";
import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";

const Tech = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="w-full px-4 py-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-6 leading-tight">
            💻 Our Technology
          </h1>
          <p className="text-xl md:text-2xl text-blue-700 max-w-4xl mx-auto leading-relaxed">
            MediLink is built on a modern, secure, and scalable technology stack designed to deliver reliable healthcare services to communities and clinics. Our platform leverages the latest in cloud, web, and mobile technologies to ensure accessibility, speed, and data protection for all users.
          </p>
        </div>
      </div>

      <main className="w-full px-4 pb-12 max-w-7xl mx-auto">
        {/* Hospital Solutions - Full Width Feature Section */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl shadow-xl border border-blue-200 p-8 md:p-12 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
                🏥 Hospital & Clinic Solutions by MediLink
              </h2>
              <p className="text-xl md:text-2xl text-blue-700 mb-6">
                Smart systems for modern healthcare delivery
              </p>
              <p className="text-lg text-blue-800 max-w-4xl mx-auto leading-relaxed">
                MediLink doesn't just connect patients—we empower healthcare providers with smart, secure, and scalable systems tailored for hospitals and clinics across Africa.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg border border-blue-100">
                <h4 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                  🖥️ Electronic Health Records (EHR)
                </h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Digitize patient records, history, prescriptions, lab results. Access across departments with role-based permissions. NHIF-ready reporting.
                </p>
              </div>
              
              <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg border border-blue-100">
                <h4 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                  📆 Appointment & Referral System
                </h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Automate patient bookings, manage referrals between facilities, SMS/Email reminders for patients.
                </p>
              </div>
              
              <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg border border-blue-100">
                <h4 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                  💊 Inventory & Pharmacy Management
                </h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Track medicine stock levels, auto-generate low-stock alerts, reduce expiry loss with batch tracking.
                </p>
              </div>
              
              <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg border border-blue-100">
                <h4 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                  🧾 Billing & Finance Dashboard
                </h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Patient billing + NHIF claim exports, insurance integration (NHIF, SHA, private), track income, expenses, and profits.
                </p>
              </div>
              
              <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg border border-blue-100">
                <h4 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                  🚑 Ambulance Dispatch Console
                </h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  CHW or emergency team dispatch tracking, live location + routing support, Red Cross and County Ambulance coordination module.
                </p>
              </div>
              
              <div className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg border border-blue-100">
                <h4 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                  👨‍⚕️ Staff & Payroll Management
                </h4>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Schedule shifts, track attendance, handle salaries and CHW incentives, performance reports and KPIs.
                </p>
              </div>
            </div>

            {/* Security & Compliance Section */}
            <div className="bg-white/50 backdrop-blur rounded-2xl p-8 mb-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">
                🔒 Built for Africa, Backed by Security
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-3">🇰🇪</div>
                  <p className="text-blue-700 font-medium">Kenya MoH & NHIF compliant</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-3">🔐</div>
                  <p className="text-blue-700 font-medium">End-to-end encryption and data safety</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl mb-3">☁️</div>
                  <p className="text-blue-700 font-medium">Cloud-hosted or on-premise deployment</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">
                📞 Ready to Transform Your Hospital?
              </h3>
              <p className="text-lg text-blue-700 mb-6 max-w-3xl mx-auto">
                Whether you're a rural clinic or a major hospital, MediLink offers a customizable platform to digitize your operations and serve more patients efficiently.
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
                <div className="flex items-center text-blue-700">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Onboarding support</span>
                </div>
                <div className="flex items-center text-blue-700">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Staff training</span>
                </div>
                <div className="flex items-center text-blue-700">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>24/7 technical assistance</span>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold">
                  Contact Us to Get Started
                </Link>
                <a href="/demo" className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold">
                  Request a Demo
                </a>
                <a href="/success-stories" className="bg-blue-200 hover:bg-blue-300 text-blue-900 px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold">
                  See Hospital Success Stories
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Performance & Scalability */}
          <section className="bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-xl border border-blue-200 p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">⚡</span>
              Key Features, Scalability & Performance
            </h2>
            <div className="space-y-3">
              {[
                "Java Spring Boot backend for reliability and speed",
                "PostgreSQL / MySQL databases for robust data management",
                "Redis caching for high-speed data access",
                "Cloud-based infrastructure for high availability and scalability",
                "Progressive Web App (PWA) for seamless experience on any device",
                "Secure authentication and role-based access for patients, CHWs, and clinics",
                "End-to-end encryption for all health records and communications",
                "Real-time notifications and updates",
                "Integration with payment gateways (M-Pesa, Stripe, Flutterwave)",
                "APIs for partner and third-party integrations",
                "Offline support for rural and low-connectivity areas",
                "Hosted on scalable platforms (AWS, Railway, Azure) for global reach",
                "Modular microservices architecture enables rapid feature development and scaling",
                "CHW and Patient portals feature unique UIs tailored to their workflows"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-blue-700 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Security & Compliance */}
          <section className="bg-gradient-to-br from-blue-100 to-white rounded-3xl shadow-xl border border-blue-200 p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">🛡️</span>
              Security & Compliance
            </h2>
            <div className="space-y-6">
              {[
                "GDPR & Kenya Data Protection Act 2019 compliant",
                "Regular security audits and vulnerability assessments",
                "Data stored in secure, encrypted cloud environments",
                "Strict access controls and monitoring"
              ].map((item, index) => (
                <div key={index} className="bg-white/70 backdrop-blur rounded-xl p-4 border border-blue-100">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-blue-700 leading-relaxed font-medium">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Integrations */}
          <section className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-xl border border-blue-200 p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">🧩</span>
              Integrations & Extensibility
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: "🏥", text: "Insurance systems (NHIF, SHA)" },
                { icon: "🔄", text: "Health information exchanges" },
                { icon: "🤝", text: "Partner clinics, hospitals, and NGOs" },
                { icon: "📱", text: "Mobile and USSD support for rural outreach" }
              ].map((item, index) => (
                <div key={index} className="bg-white/70 backdrop-blur rounded-xl p-4 border border-blue-100 text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-blue-700 font-medium text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Built for Impact */}
          <section className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl shadow-xl border border-blue-200 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center">
              <span className="text-4xl mr-3">🚀</span>
              Built for Impact
            </h2>
            <div className="bg-white/70 backdrop-blur rounded-xl p-6 border border-blue-100">
              <p className="text-lg text-blue-700 leading-relaxed mb-4">
                Our tech team is committed to continuous improvement, innovation, and reliability. We welcome feedback and collaboration from partners, developers, and users to make MediLink even better.
              </p>
              <div className="text-center">
                <Link to="/contact" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors duration-200">
                  Interested in partnering or learning more? Contact Us
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tech;