import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-200 py-10 px-4 mt-auto shadow-2xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Slogan */}
        <div className="flex flex-col gap-3">
          <span className="text-2xl font-bold text-blue-300 mb-2">MediLink</span>
          <p className="text-sm text-gray-400">Health Within Reach.</p>
          <p className="text-xs text-gray-500">Connecting Africa to better healthcare.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-3 text-gray-100">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-300">About</Link></li>
            <li><Link to="/services" className="hover:text-blue-300">Services</Link></li>
            <li><Link to="/partners" className="hover:text-blue-300">Partners</Link></li>
            <li><Link to="/faqs" className="hover:text-blue-300">FAQs</Link></li>
            <li><Link to="/tech" className="hover:text-blue-300">Tech</Link></li>
            <li><Link to="/donate" className="hover:text-blue-300">Donate</Link></li>
            <li><Link to="/contact" className="hover:text-blue-300">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-lg mb-3 text-gray-100">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li><span className="text-gray-400">Email:</span> <a href="mailto:info@medilink.africa" className="hover:text-blue-300">info@medilink.africa</a></li>
            <li><span className="text-gray-400">Phone:</span> <a href="tel:+254700000000" className="hover:text-blue-300">+254 700 000 000</a></li>
            <li><span className="text-gray-400">WhatsApp:</span> <a href="https://wa.me/254700000000" className="hover:text-blue-300">Chat with us</a></li>
            <li><span className="text-gray-400">Location:</span> Nairobi, Kenya</li>
          </ul>
        </div>

        {/* Social & Legal */}
        <div>
          <h4 className="font-semibold text-lg mb-3 text-gray-100">Connect & Legal</h4>
          <div className="flex gap-4 mb-3">
            <a href="#" className="hover:text-blue-400" aria-label="Twitter"><i className="fab fa-twitter"></i> Twitter</a>
            <a href="#" className="hover:text-blue-400" aria-label="Facebook"><i className="fab fa-facebook"></i> Facebook</a>
            <a href="#" className="hover:text-blue-400" aria-label="LinkedIn"><i className="fab fa-linkedin"></i> LinkedIn</a>
          </div>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><Link to="/privacy" className="hover:text-blue-300">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-blue-300">Terms & Conditions</Link></li>
            <li><Link to="/data-protection" className="hover:text-blue-300">Data Protection</Link></li>
            <li><Link to="/gdpr" className="hover:text-blue-300">GDPR Compliance</Link></li>
            <li><Link to="/accessibility" className="hover:text-blue-300">Accessibility Statement</Link></li>
            <li><Link to="/careers" className="hover:text-blue-300">Careers</Link></li>
            <li><Link to="/newsletter" className="hover:text-blue-300">Newsletter Signup</Link></li>
            <li><Link to="/site-status" className="hover:text-blue-300">Site Status</Link></li>
          </ul>
        </div>

      </div>
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        <div className="mb-2">
          <span className="font-semibold text-blue-300">MediLink</span> is committed to protecting your privacy and data. Read our <Link to="/privacy" className="underline hover:text-blue-300">Privacy Policy</Link> and <Link to="/data-protection" className="underline hover:text-blue-300">Data Protection Statement</Link> for details.
        </div>
        <div className="mb-2">
          <Link to="/accessibility" className="underline hover:text-blue-300">Accessibility</Link> | <Link to="/careers" className="underline hover:text-blue-300">Careers</Link> | <Link to="/newsletter" className="underline hover:text-blue-300">Newsletter</Link> | <Link to="/site-status" className="underline hover:text-blue-300">Site Status</Link>
        </div>
        <div className="mb-2">
          <span className="text-xs text-gray-400">Site built with React, Tailwind CSS, and Vite. Hosted securely in Africa.</span>
        </div>
        &copy; {new Date().getFullYear()} <span className="text-blue-300 font-bold">MediLink</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
