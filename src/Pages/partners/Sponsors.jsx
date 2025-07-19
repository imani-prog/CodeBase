import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";

const Sponsors = () => (
  <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
    <Navbar />
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-8 text-center">NGO & Sponsors</h1>
      <section className="mb-10 bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Partnering for Impact</h2>
        <p className="text-blue-700 mb-4">MediLink collaborates with NGOs, donors, and sponsors to drive health innovation, outreach, and equity. Our partners help fund CHW salaries, outreach kits, technology upgrades, and urgent patient cases.</p>
        <ul className="list-disc list-inside text-blue-700 ml-6 mb-4">
          <li>Support digital health programs and campaigns</li>
          <li>Fund equipment, training, and outreach</li>
          <li>Track impact and transparency reports</li>
          <li>Join our network of trusted sponsors and donors</li>
        </ul>
        <p className="text-blue-700">Interested in sponsoring or collaborating? Email <span className="font-bold">sponsors@medilink.africa</span> or <span className="font-bold">ngo@medilink.africa</span>.</p>
      </section>
      <a href="mailto:sponsors@medilink.africa" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg block text-center mb-4">Sponsor Us</a>
      <a href="mailto:ngo@medilink.africa" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg block text-center">NGO Collaboration</a>
    </main>
    <Footer />
  </div>
);

export default Sponsors;
