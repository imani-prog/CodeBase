import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";

const Patients = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <Navbar />
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="mb-10 w-full bg-blue-100 rounded-3xl shadow-xl border border-blue-200 p-10 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center leading-tight">Patient Services</h1>
          <p className="text-lg text-blue-700 text-center max-w-3xl">MediLink empowers patients to access care, education, and support from anywhere. Our platform is designed to make healthcare simple, affordable, and compassionate for every citizen.</p>
        </section>
        <div className="grid grid-cols-1 gap-8 w-full">
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">🗓️ Healthcare Appointments</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Clinic Visits – Schedule outpatient visits at nearby health facilities.</li>
              <li>Home-Based Care – Request a Community Health Worker (CHW) or nurse to visit your home.</li>
              <li>Emergency Ambulance Dispatch – Get support during critical moments through connected ambulances.</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"We bring healthcare to your doorstep—literally."</p>
          </div>
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">📚 Health Education & Community Awareness</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Verified health tips (via SMS, dashboard, or app)</li>
              <li>E-learning courses for patients</li>
              <li>Maternal, child, chronic illness education</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Learn. Apply. Thrive."</p>
          </div>
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">🧑‍⚕️ Telemedicine Consultations</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Doctor consultations via Zoom or video chat</li>
              <li>Follow-up sessions from prior clinic visits</li>
              <li>Remote prescription delivery (where available)</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Care beyond clinics—connect with a doctor from wherever you are."</p>
          </div>
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">💳 Insurance & Financial Integration</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Integration with NHIF, SHA, and private covers</li>
              <li>M-Pesa STK Push and mobile wallet payments</li>
              <li>Debit/Credit card support (Stripe, Flutterwave)</li>
              <li>Patient balance visibility & history</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Your health is priceless. Paying for it shouldn’t be painful."</p>
          </div>
        </div>
        <section className="mt-10 w-full bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🌍 Serving Patients with Purpose</h2>
          <p className="text-lg text-blue-700">Every feature is built from real patient stories and needs. With MediLink, you don’t just access healthcare—you access hope, dignity, and a human connection.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Patients;
