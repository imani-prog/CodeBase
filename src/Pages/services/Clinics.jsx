import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";

const Clinics = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <Navbar />
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="mb-10 w-full bg-blue-100 rounded-3xl shadow-xl border border-blue-200 p-10 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center leading-tight">Clinic & Hospital Tools</h1>
          <p className="text-lg text-blue-700 text-center max-w-3xl">MediLink provides clinics and hospitals with digital tools to streamline operations, manage patient flow, and deliver smarter, more efficient care.</p>
        </section>
        <div className="grid grid-cols-1 gap-8 w-full">
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">🗓️ Appointment & Referral Management</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Schedule and manage outpatient visits</li>
              <li>Referral tracking for patient continuity</li>
              <li>Emergency ambulance dispatch integration</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Smarter clinics, better outcomes."</p>
          </div>
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">📚 Health Education & Staff Training</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Verified health tips for staff and patients</li>
              <li>E-learning modules for staff development</li>
              <li>Maternal, child, chronic illness education</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Empowered staff, empowered patients."</p>
          </div>
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">💳 Financial & Insurance Integration</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>NHIF, SHA, and private insurance support</li>
              <li>Mobile wallet and card payments</li>
              <li>Transparent billing and reporting</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Financial clarity for clinics and patients alike."</p>
          </div>
        </div>
        <section className="mt-10 w-full bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🌍 Serving Clinics & Hospitals with Purpose</h2>
          <p className="text-lg text-blue-700">MediLink partners with clinics and hospitals to digitize healthcare, improve efficiency, and deliver better patient outcomes. Every tool is built from real feedback and needs.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Clinics;
