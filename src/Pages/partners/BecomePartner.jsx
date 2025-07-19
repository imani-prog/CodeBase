import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";

const BecomePartner = () => (
  <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
    <Navbar />
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-8 text-center">Become a Partner</h1>
      <section className="mb-10 bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Join the MediLink Network</h2>
        <p className="text-blue-700 mb-4">Are you a hospital, clinic, insurance provider, NGO, or healthtech company? Partner with MediLink to expand your reach, digitize your services, and improve health outcomes for communities across Kenya.</p>
        <ul className="list-disc list-inside text-blue-700 ml-6 mb-4">
          <li>Streamline patient referrals and bookings</li>
          <li>Access real-time health data and analytics</li>
          <li>Integrate insurance claims and payments</li>
          <li>Coordinate emergency response and outreach</li>
        </ul>
        <p className="text-blue-700">Fill out our partnership form or contact us at <span className="font-bold">partners@medilink.africa</span> to get started.</p>
      </section>
      <a href="mailto:partners@medilink.africa" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg block text-center">Contact Us</a>
    </main>
    <Footer />
  </div>
);

export default BecomePartner;
