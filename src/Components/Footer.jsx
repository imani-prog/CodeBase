import {
  Accessibility,
  ArrowUp,
  CheckCircle,
  Facebook,
  Globe,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Shield,
  Twitter,
  Users,
  Youtube
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import mediLinkLogo from "../assets/mediLink.png";


const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showBackToTop] = useState(true);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-gray-100 mt-auto overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r  rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <img
                  src={mediLinkLogo}
                  alt="MediLink Logo"
                  className="w-16 h-16 object-contain rounded-full border-2"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  MediLink
                </h3>
                <p className="text-sm text-gray-300">Healthcare for Africa</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Connecting patients, clinics, and health workers across Africa. Quality healthcare made accessible—anytime, anywhere.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">50K+</p>
                    <p className="text-xs text-gray-400">Patients</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">200+</p>
                    <p className="text-xs text-gray-400">Clinics</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-1">
                <Accessibility className="w-3 h-3" />
                <span>Accessible</span>
              </div>
            </div>
          </div>

          {/* Quick Links - Enhanced */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {(() => {
                const links = [
                  { to: "/", label: "Home" },
                  { to: "/about/aboutmedilink", label: "About MediLink" },
                  { to: "/about/story", label: "Our Story" },
                  { to: "/about/team", label: "Team" },
                  { to: "/about/mission", label: "Mission" },
                  { to: "/services", label: "Services" },
                  { to: "/services/patients", label: "Patients" },
                  { to: "/services/chws", label: "CHWs" },
                  { to: "/services/clinics", label: "Clinics" },
                  { to: "/partners", label: "Partners" },
                  { to: "/partners/join", label: "Become a Partner" },
                  { to: "/partners/sponsors", label: "Sponsors" },
                  { to: "/faqs", label: "FAQs" },
                  { to: "/tech", label: "Technology" },
                  { to: "/donate", label: "Donate" },
                  { to: "/contact", label: "Contact" },
                  { to: "/blog", label: "Blog" },
                  { to: "/support", label: "Support" },
                  { to: "/testimonials", label: "Testimonials" }
                ];
                return links.map((link, index) => (
                  <Link 
                    key={index}
                    to={link.to} 
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-gray-500 rounded-full group-hover:bg-blue-400 group-hover:w-2 transition-all duration-300"></div>
                    {link.label}
                  </Link>
                ));
              })()}
            </div>
          </div>

          {/* Contact Info - Enhanced */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-blue-500 rounded-full"></div>
              Get in Touch
            </h4>
            <div className="space-y-4">
              <a 
                href="mailto:info@medilink.africa" 
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm">info@medilink.africa</p>
                  <p className="text-xs text-gray-400">24/7 Support</p>
                </div>
              </a>

              <a 
                href="tel:+254700000000" 
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-green-500/20 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm">+254 700 000 000</p>
                  <p className="text-xs text-gray-400">Emergency Hotline</p>
                </div>
              </a>

              <a 
                href="https://wa.me/254700000000" 
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:bg-green-500/20 transition-colors duration-300">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm">WhatsApp Chat</p>
                  <p className="text-xs text-gray-400">Instant Support</p>
                </div>
              </a>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 bg-white/10 rounded-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm">Nairobi, Kenya</p>
                  <p className="text-xs text-gray-400">East Africa Hub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter & Social - New */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></div>
              Stay Connected
            </h4>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <p className="text-sm text-gray-300 mb-4">Get health tips and updates</p>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  />
                  <button
                    onClick={handleNewsletterSubmit}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-300"
                    disabled={!email}
                  >
                    {isSubscribed ? <CheckCircle className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
                {isSubscribed && (
                  <p className="text-green-400 text-xs animate-pulse">Thanks for subscribing!</p>
                )}
              </div>
            </div>

            {/* Social Media */}
            <div className="mb-6">
              <p className="text-sm text-gray-300 mb-4">Follow us</p>
              <div className="flex gap-3">
                {[
                  { icon: Twitter, href: "#", color: "hover:bg-blue-500", label: "Twitter" },
                  { icon: Facebook, href: "#", color: "hover:bg-blue-600", label: "Facebook" },
                  { icon: Linkedin, href: "#", color: "hover:bg-blue-700", label: "LinkedIn" },
                  { icon: Instagram, href: "#", color: "hover:bg-pink-500", label: "Instagram" },
                  { icon: Youtube, href: "#", color: "hover:bg-red-500", label: "YouTube" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`p-2 bg-white/10 rounded-lg ${social.color} transition-all duration-300 hover:scale-110 border border-white/10`}
                    aria-label={`Follow us on ${social.label}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* App Download */}
            <div className="space-y-2">
              <p className="text-sm text-gray-300 mb-3">Download our app</p>
              <div className="flex flex-col gap-2">
                <a href="#" className="flex items-center gap-2 px-3 py-2 bg-black rounded-lg hover:bg-gray-800 transition-colors text-xs">
                  <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                    <span className="text-black text-[6px]">📱</span>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400">Download on the</div>
                    <div className="text-white font-semibold">App Store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-2 px-3 py-2 bg-black rounded-lg hover:bg-gray-800 transition-colors text-xs">
                  <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 rounded-sm"></div>
                  <div>
                    <div className="text-[10px] text-gray-400">Get it on</div>
                    <div className="text-white font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {/* Map each legal link to its correct route */}
            <Link to="/privacy" className="text-xs text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-gray-400 hover:text-white transition-colors duration-300">Terms & Conditions</Link>
            <Link to="/dataprotection" className="text-xs text-gray-400 hover:text-white transition-colors duration-300">Data Protection</Link>
            <Link to="/gdpr" className="text-xs text-gray-400 hover:text-white transition-colors duration-300">GDPR Compliance</Link>
            <Link to="/accessibility" className="text-xs text-gray-400 hover:text-white transition-colors duration-300">Accessibility Statement</Link>
            <Link to="/careers" className="text-xs text-gray-400 hover:text-white transition-colors duration-300">Careers</Link>
          </div>

          {/* Copyright */}
          <div className="text-center space-y-3">
            <div className="text-xs text-gray-400">
              <span className="font-semibold text-blue-400">MediLink</span> is committed to protecting your privacy and data. 
              Read our <Link to="/privacy" className="underline hover:text-blue-300 transition-colors">Privacy Policy</Link>.
            </div>
            
            <div className="text-xs text-gray-400 flex items-center justify-center gap-2">
              Site built with <Heart className="w-3 h-3 text-red-400 animate-pulse" fill="currentColor" /> by{" "}
              <a 
                href="https://imani-prog.github.io/TimothyImaniProfile/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline font-semibold hover:text-blue-300 transition-colors"
              >
                Timothy Imani
              </a>
            </div>
            
            <div className="text-sm">
              &copy; {currentYear} <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">MediLink</span>. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-24 p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50 group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
        </button>
      )}
    </footer>
  );
};

export default Footer;