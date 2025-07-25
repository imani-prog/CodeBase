import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";

const Accessibility = () => (
  <>
    
    <div className="min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Accessibility Statement</h1>
      <p className="mb-8">MediLink is committed to ensuring digital accessibility for all users, including people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.</p>
      <ul className="list-disc pl-6 mb-8">
        <li>Our website follows WCAG 2.1 guidelines for accessibility.</li>
        <li>We provide alternative text for all images and graphics.</li>
        <li>Navigation is possible via keyboard and screen readers.</li>
        <li>If you encounter any accessibility barriers, please <a href="/contact" className="text-blue-600 underline">contact us</a> and we will address your concerns promptly.</li>
      </ul>
      <p className="mb-8">We welcome feedback to improve accessibility for all users.</p>
    </div>
    
  </>
);

export default Accessibility;
