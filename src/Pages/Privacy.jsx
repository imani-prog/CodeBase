import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";

const Privacy = () => (
  <>
    <Navbar />
    <div className="min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-8">Your privacy is important to us. This policy explains how MediLink collects, uses, and protects your personal information.</p>
      <ul className="list-disc pl-6 mb-8">
        <li>We only collect data necessary to provide our services.</li>
        <li>Your data is stored securely and never shared with third parties without consent.</li>
        <li>You can request to view, update, or delete your personal data at any time.</li>
        <li>For questions or requests, please <a href="/contact" className="text-blue-600 underline">contact us</a>.</li>
      </ul>
      <p className="mb-8">By using MediLink, you agree to this privacy policy.</p>
    </div>
    <Footer />
  </>
);

export default Privacy;


