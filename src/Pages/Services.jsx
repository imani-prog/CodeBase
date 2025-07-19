import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";

const Services = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <Navbar />
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="mb-10 w-full bg-blue-100 rounded-3xl shadow-xl border border-blue-200 p-10 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center leading-tight">🩺 Our Services</h1>
          <p className="text-lg text-blue-700 text-center max-w-3xl">MediLink offers a powerful suite of digital healthcare services designed to transform how communities access and receive care. From rural villages to urban clinics, our platform connects citizens, caregivers, and facilities—seamlessly, affordably, and compassionately.</p>
        </section>
        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Healthcare Appointments */}
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">🗓️ 1. Healthcare Appointments</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li><span className="font-semibold">Clinic Visits</span> – Schedule outpatient visits at nearby health facilities.</li>
              <li><span className="font-semibold">Home-Based Care</span> – Request a Community Health Worker (CHW) or nurse to visit your home.</li>
              <li><span className="font-semibold">Emergency Ambulance Dispatch</span> – Get support during critical moments through connected ambulances.</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"We bring healthcare to your doorstep—literally."</p>
          </div>
          {/* Mobile Outreach & CHW Services */}
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">🏍️ 2. Mobile Outreach & CHW Services</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Track and manage home visits</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Digitally-enabled CHWs mean better care, faster response, and stronger community ties."</p>
          </div>
          {/* Health Education & Community Awareness */}
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">📚 3. Health Education & Community Awareness</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Verified health tips (via SMS, dashboard, or app)</li>
              <li>E-learning courses for patients & CHWs</li>
              <li>Maternal, child, chronic illness education</li>
              <li>Certification tracking for CHW growth</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Learn. Apply. Thrive."</p>
          </div>
          {/* Telemedicine Consultations */}
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">🧑‍⚕️ 4. Telemedicine Consultations</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Doctor consultations via Zoom or video chat</li>
              <li>Follow-up sessions from prior clinic visits</li>
              <li>Remote prescription delivery (where available)</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Care beyond clinics—connect with a doctor from wherever you are."</p>
          </div>
          {/* Insurance & Financial Integration */}
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">💳 5. Insurance & Financial Integration</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Integration with NHIF, SHA, and private covers</li>
              <li>M-Pesa STK Push and mobile wallet payments</li>
              <li>Debit/Credit card support (Stripe, Flutterwave)</li>
              <li>Patient balance visibility & history</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Your health is priceless. Paying for it shouldn’t be painful."</p>
          </div>
          {/* Support Desk & Help Center */}
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">🛠️ 6. Support Desk & Help Center</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Raise categorized support tickets (payment, CHW, clinic, login)</li>
              <li>Track resolution status from your dashboard</li>
              <li>Staff & CHW-facing internal helpdesk</li>
              <li>SLA monitoring for faster resolutions</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Healthcare support that doesn’t leave you hanging."</p>
          </div>
          {/* Partnerships & Outreach Programs */}
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">🤝 7. Partnerships & Outreach Programs</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Clinics & hospitals looking to digitize services</li>
              <li>NGOs, donors, and government bodies championing health access</li>
              <li>Training institutions such as KMTCs & universities</li>
              <li>Ambulance services (e.g. Kenya Red Cross)</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Better together—impact grows through collaboration."</p>
          </div>
          {/* Donations & Transparency Reporting */}
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">💙 8. Donations & Transparency Reporting</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Support CHW salaries, outreach kits, and software tools</li>
              <li>Fund urgent patient cases (ambulances, surgeries)</li>
              <li>View transparency reports with donation tracking</li>
              <li>Donate via M-Pesa, card, or bank transfer</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Every coin changes a life. Every donor builds a healthier Africa."</p>
          </div>
        </div>
        {/* Serving with Purpose */}
        <section className="mt-10 w-full bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🌍 Serving with Purpose</h2>
          <p className="text-lg text-blue-700">Our services are not just features—they’re lifelines. Each module is built from real challenges voiced by patients, caregivers, and clinics. With MediLink, you don’t just access healthcare—you access hope, dignity, and a human connection.</p>
        </section>
      </main>
       <Footer />
    </div>
  );
};

export default Services;
