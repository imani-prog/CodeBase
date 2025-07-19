import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";

const Support = () => (
  <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
    <Navbar />
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-5xl font-extrabold text-blue-900 mb-8 text-center">Support Desk</h1>
      <section className="mb-10 bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">How can we help?</h2>
        <ul className="list-disc list-inside text-blue-700 ml-6 mb-4">
          <li>Raise a support ticket for payment, CHW, clinic, or login issues</li>
          <li>Track your ticket status from your dashboard</li>
          <li>Access FAQs and troubleshooting guides</li>
          <li>Contact our helpdesk team for urgent matters</li>
        </ul>
        <p className="text-blue-700">Our support desk is here to help you resolve issues quickly and get back to better health.</p>
      </section>
      <section className="mb-10 bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Contact Us</h2>
        <p className="text-blue-700 mb-2">Email: support@medilink.africa</p>
        <p className="text-blue-700 mb-2">Phone: +254 700 123 456</p>
        <p className="text-blue-700">Live chat coming soon!</p>
      </section>
    </main>
    <Footer />
  </div>
);

export default Support;
