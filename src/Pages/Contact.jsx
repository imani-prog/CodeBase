/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Navbar from "../Components/Navbar.jsx";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-950 text-white">
      
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
         
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Get in <span className="">Touch</span>
          </h1>
          <p className=" max-w-2xl mx-auto mb-8">
            We're here to help! Reach out for support, partnership, demo requests, or general inquiries.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-blue-50 rounded-full px-4 py-2 border border-blue-200">
              
              <span className="font-medium text-blue-800">24h Response</span>
            </div>
            <div className="flex items-center bg-blue-50 backdrop-blur rounded-full px-4 py-2 border border-blue-200">
              
              <span className="font-medium text-blue-800">Secure</span>
            </div>
            <div className="flex items-center bg-blue-50 backdrop-blur rounded-full px-4 py-2 border border-blue-200">
              
              <span className="font-medium text-blue-800">Kenya Based</span>
            </div>
          </div>
        </div>
      </section>

      <main className="flex flex-col lg:flex-row gap-4 w-full px-4 pb-12 max-w-7xl mx-auto">
        {/* Contact Form */}
        <section className="flex-[2]">
          <div className="bg-white backdrop-blur-md shadow-2xl p-8 h-fit rounded-3xl">
            <div className="flex items-center mb-6">
              
              <h2 className="text-3xl font-bold text-blue-800">Send us a Message</h2>
            </div>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center">
                 
                  <span className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</span>
                </div>
              </div>
            )}
            
            <div className="space-y-6 w-full">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-blue-800 font-semibold mb-3 flex items-center">
                    
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 backdrop-blur text-gray-800 placeholder-gray-500" 
                    placeholder="Your Name" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-blue-800 font-semibold mb-3 flex items-center">
                    
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur text-gray-800 placeholder-gray-500" 
                    placeholder="you@email.com" 
                    required 
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-blue-800 font-semibold mb-3 flex items-center">
                  
                  Subject
                </label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur text-gray-800 placeholder-gray-500" 
                  placeholder="How can we help you?" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-blue-800 font-semibold mb-3 flex items-center">
                  
                  Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={6} 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur resize-y text-gray-800 placeholder-gray-500" 
                  placeholder="Type your message here..." 
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Contact Info Sidebar */}
        <aside className="lg:w-80 space-y-4">
          {/* Quick Contact */}
          <div className="p-6">
            <div className="flex items-center mb-4">
              
              <h3 className="text-xl font-bold text-white">Quick Contact</h3>
            </div>
            
            <div className="space-y-3">
              <a 
                href="mailto:info@medilink.africa" 
                className="flex items-center p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 border border-white/20 group"
              >
                
                <div>
                  <div className="font-semibold text-white text-sm">Email</div>
                  <div className="text-xs text-blue-200">info@medilink.africa</div>
                </div>
              </a>
              
              <a 
                href="tel:+254700000000" 
                className="flex items-center p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 border border-white/20 group"
              >
                
                <div>
                  <div className="font-semibold text-white text-sm">Phone</div>
                  <div className="text-xs text-blue-200">+254 700 000 000</div>
                </div>
              </a>
              
              <a 
                href="https://wa.me/254700000000" 
                className="flex items-center p-3 hover:bg-white/20 rounded-2xl transition-all duration-300 border border-white/20 group"
              >
                
                <div>
                  <div className="font-semibold text-white text-sm">WhatsApp</div>
                  <div className="text-xs text-blue-200">Chat with us</div>
                </div>
              </a>
            </div>
          </div>

          {/* Office Location */}
          <div className="p-4">
            <div className="flex items-center mb-3">
              
              <h3 className="text-xl font-bold text-white">Office Location</h3>
            </div>
            <div className="p-3">
              <div className="font-semibold text-white mb-1 text-sm">MediLink Africa</div>
              <div className="text-blue-200 text-sm">Nairobi, Kenya</div>
              <div className="text-xs mt-1 text-blue-300">East Africa's Healthcare Hub</div>
            </div>
          </div>

          {/* Response Time */}
          {/* <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-xl p-6 text-white">
            <div className="flex items-center mb-4">
              
              <h3 className="text-2xl font-bold">Response Time</h3>
            </div>
            <p className="text-blue-100 mb-4">
              We aim to respond to all messages within 24 hours. For urgent matters, please call or WhatsApp us directly.
            </p>
            <div className="flex items-center bg-white/10 rounded-2xl p-3">
              <span className="text-2xl mr-3">🕐</span>
              <div>
                <div className="font-semibold">Business Hours</div>
                <div className="text-blue-200 text-sm">Mon-Fri: 8AM - 6PM EAT</div>
              </div>
            </div>
          </div> */}
        </aside>
        <section className="lg:w-80 space-y-4">
          <div className="p-4">
            <h1 className="text-xl font-bold text-white mb-4">Social Media Links</h1>
            <div className="flex items-center justify-center space-x-4">
              <a href="https://www.facebook.com/medilinkafrica" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors transform hover:scale-110 duration-200">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.twitter.com/medilinkafrica" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors transform hover:scale-110 duration-200">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/medilinkafrica" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors transform hover:scale-110 duration-200">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/medilinkafrica" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors transform hover:scale-110 duration-200">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@medilinkafrica" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors transform hover:scale-110 duration-200">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-xl p-6 text-white">
            <div className="flex items-center mb-4">
              
              <h3 className="text-2xl font-bold">Response Time</h3>
            </div>
            <p className="text-blue-100 mb-4">
              We aim to respond to all messages within 24 hours. For urgent matters, please call or WhatsApp us directly.
            </p>
            <div className="flex items-center bg-white/10 rounded-2xl p-3">
              <span className="text-2xl mr-3">🕐</span>
              <div>
                <div className="font-semibold">Business Hours</div>
                <div className="text-blue-200 text-sm">Mon-Fri: 8AM - 6PM EAT</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;