import AdminDashboard1 from "../../assets/AdminDashboard1.jpg";
import MedicalRecords11 from "../../assets/MedicalRecords11.png";
import PatientReferals from "../../assets/PatientReferals.jpg";
import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";
import PatientReferralSlider from "../../Components/PatientReferralSlider.jsx";
import LiveChatButton from "../../Components/LiveChatButton.jsx";


const Clinics = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <LiveChatButton />
      <Navbar />
      <main className="flex flex-col w-full px-4 py-10 max-w-[1200px] mx-auto">
        {/* Hero Section */}
        <section className="mb-10 w-full p-5 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4 text-center leading-tight">
            MediLink for Clinics & Hospitals
          </h1>
          <p className="text-lg text-center max-w-3xl">
            Empowering healthcare facilities with smart, scalable, and user-friendly digital solutions — from patient management to ambulance coordination.
          </p>
        </section>

        

          {/* Admin Dashboards */}

          <div className="mb-10 w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-2 items-stretch">
            <div className="flex flex-col justify-center h-full md:h-[400px] px-2 md:px-8">
              <h3 className="text-3xl font-extrabold text-blue-800 mb-4">Centralized Admin Dashboards</h3>
              <p className="text-l mb-4">Our admin dashboards provide a unified view of your clinic or hospital operations, making it easy to oversee all activities in real time. With intuitive charts and actionable insights, administrators can quickly identify trends, bottlenecks, and opportunities for improvement.</p>
              <ul className="list-disc list-inside ml-6 mb-4 text-xl">
                <li>Monitor appointments, payments & CHW activity</li>
                <li>View analytics, patient flow, and service logs</li>
                <li>Track ambulance dispatch and support tickets</li>
              </ul>
              <p className="text-grey mb-2 text-lg">Easily filter data by department, time period, or staff member to drill down into specific metrics. Export reports for compliance, share updates with your team, and stay ahead with predictive analytics.</p>
              <p className="italic text-blue-600 mt-4 text-lg">"Real-time visibility for better decisions."</p>
            </div>
            <div className="flex justify-center items-center h-full md:h-[400px] px-2 md:px-8">
              <img src={AdminDashboard1} alt="Admin Dashboard" className="max-w-full max-h-[400px] object-contain rounded-2xl shadow-lg border-2 border-blue-300 bg-white" />
            </div>
          </div>

          {/* Electronic Health Records */}
          <div className="mb-10 w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
            <div className="flex justify-center ml-0 items-center h-full md:h-[500px] px-0 md:px-0">
              <img src={MedicalRecords11} alt="Electronic Medical Records" className="max-w-[480px] w-full max-h-[500px] object-contain rounded-2xl shadow-lg border-2 border-blue-300 bg-white" />
            </div>
            <div className="flex flex-col justify-center h-full md:h-[500px] px-4 md:px-8">
              <h3 className="text-3xl font-extrabold text-blue-800 mb-4">Electronic Medical Records (EMR)</h3>
              <p className="text-xl mb-4">Our EMR system streamlines clinical workflows, enabling healthcare professionals to access and update patient records instantly. With robust security and compliance features, you can trust that sensitive data is protected at every step.</p>
              <ul className="list-disc list-inside ml-6 mb-4 text-xl">
                <li>Secure access to patient history & reports</li>
                <li>PDF exports of prescriptions and lab results</li>
                <li>Role-based access for data privacy</li>
              </ul>
              <p className=" mb-2 text-lg">Easily search for patient information, track medical history, and share records with authorized staff. Our EMR supports interoperability, making it simple to integrate with labs, pharmacies, and insurance providers.</p>
              <p className="italic text-blue-600 mt-2 text-lg">"All records. One system. Anywhere, anytime."</p>
            </div>
          </div>


          {/* Patient & Referral Management Section */}
          <section className="mb-2 w-full flex flex-col items-center">
            <h2 className="text-3xl font-extrabold text-blue-900 mb-6 text-center">Patient & Referral Management</h2>
          </section>
          <div
            className="mb-10 w-full p-0 flex flex-col items-center justify-center relative rounded-2xl overflow-hidden shadow-lg border border-blue-200"
            style={{
              backgroundImage: `url(${PatientReferals})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '700px',
            }}
          >
            <PatientReferralSlider />
          </div>


          {/* Financial Systems */}
          <div className="mb-10 w-full p-10 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">💳 Financial & Insurance Integration</h2>
            <ul className="list-disc list-inside text-blue-700 ml-4 mb-2">
              <li>NHIF, SHA, and private insurance claims</li>
              <li>M-Pesa STK Push, card & mobile wallet support</li>
              <li>Automated receipts, claims, and reports</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Simplify billing while ensuring accountability."</p>
          </div>

          {/* Ambulance + CHW Dispatch */}
          <div className="mb-10 w-full p-10 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">🚑 Ambulance & CHW Dispatch Tools</h2>
            <ul className="list-disc list-inside text-blue-700 ml-4 mb-2">
              <li>Geo-locate & dispatch CHWs to home visits</li>
              <li>Coordinate emergency ambulances digitally</li>
              <li>Log outreach, collect patient feedback</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Rapid response and field coordination built in."</p>
          </div>

         

          {/* Staff Training + E-Learning */}
          <div className="mb-10 w-full p-10 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">📚 Staff Training & Health Education</h2>
            <ul className="list-disc list-inside text-blue-700 ml-4 mb-2">
              <li>E-learning portal for CHWs & clinicians</li>
              <li>Onboarding modules & system walkthroughs</li>
              <li>Patient education handouts & tips</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Build skills. Improve care delivery."</p>
          </div>
        

        {/* Call to Action */}
        <section className="mt-12 w-full bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🚀 Ready to Digitize Your Facility?</h2>
          <p className="text-lg text-blue-700 mb-4 max-w-3xl mx-auto">
            MediLink is your partner in digital transformation. Whether you're a private clinic, rural health center, or major hospital — our platform scales with you.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-800 text-white font-semibold rounded-full shadow-md hover:bg-blue-900 transition"
          >
            Contact Us Today
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Clinics;
