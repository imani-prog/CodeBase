import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";

const Terms = () => (
  <>
    <Navbar />
    <div className="min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-8">By accessing and using MediLink, you agree to the following terms and conditions:</p>
      <ul className="list-disc pl-6 mb-8">
        <li>Use MediLink services responsibly and lawfully.</li>
        <li>Do not misuse or attempt to disrupt our platform.</li>
        <li>All content is for informational purposes and not medical advice.</li>
        <li>MediLink reserves the right to update these terms at any time.</li>
      </ul>
      <p className="mb-8">If you have questions about these terms, please <a href="/contact" className="text-blue-600 underline">contact us</a>.</p>
    </div>
    <Footer />
  </>
);

export default Terms;
