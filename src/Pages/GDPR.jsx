import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";

const GDPR = () => (
  <>
    
    <div className="min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">GDPR Compliance</h1>
      <p className="mb-8">MediLink complies with the General Data Protection Regulation (GDPR) to protect your rights and privacy.</p>
      <ul className="list-disc pl-6 mb-8">
        <li>We process personal data lawfully, fairly, and transparently.</li>
        <li>You have the right to access, correct, or erase your data.</li>
        <li>We only retain data as long as necessary for our services.</li>
        <li>For GDPR-related requests, please <a href="/contact" className="text-blue-600 underline">contact us</a>.</li>
      </ul>
      <p className="mb-8">Your privacy and rights are our priority.</p>
    </div>
    
  </>
);

export default GDPR;
