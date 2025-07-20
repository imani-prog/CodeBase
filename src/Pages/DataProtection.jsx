import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";

const DataProtection = () => (
  <>
    <Navbar />
    <div className="min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Data Protection Statement</h1>
      <p className="mb-8">MediLink is committed to protecting your data in compliance with applicable laws and regulations.</p>
      <ul className="list-disc pl-6 mb-8">
        <li>We use secure technologies to safeguard your information.</li>
        <li>Access to your data is restricted to authorized personnel only.</li>
        <li>We regularly review our data protection practices.</li>
        <li>For any concerns, please <a href="/contact" className="text-blue-600 underline">contact us</a>.</li>
      </ul>
      <p className="mb-8">Your trust is important to us, and we strive to keep your data safe.</p>
    </div>
    <Footer />
  </>
);

export default DataProtection;
