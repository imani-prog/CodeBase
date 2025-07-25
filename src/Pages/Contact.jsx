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
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
      
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-6 shadow-xl">
            <span className="text-4xl text-white">📞</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-blue-800 mb-4 leading-tight">
            Get in <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto mb-8">
            We're here to help! Reach out for support, partnership, demo requests, or general inquiries.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-white/60 backdrop-blur rounded-full px-4 py-2 border border-blue-200">
              <span className="text-blue-600 mr-2">⚡</span>
              <span className="text-blue-800 font-medium">24h Response</span>
            </div>
            <div className="flex items-center bg-white/60 backdrop-blur rounded-full px-4 py-2 border border-blue-200">
              <span className="text-blue-600 mr-2">🔒</span>
              <span className="text-blue-800 font-medium">Secure</span>
            </div>
            <div className="flex items-center bg-white/60 backdrop-blur rounded-full px-4 py-2 border border-blue-200">
              <span className="text-blue-600 mr-2">🌍</span>
              <span className="text-blue-800 font-medium">Kenya Based</span>
            </div>
          </div>
        </div>
      </section>

      <main className="flex flex-col lg:flex-row gap-8 w-full px-4 pb-12 max-w-7xl mx-auto">
        {/* Contact Form */}
        <section className="flex-1">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-blue-200 p-8 h-fit">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl text-white">💬</span>
              </div>
              <h2 className="text-3xl font-bold text-blue-800">Send us a Message</h2>
            </div>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  <span className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</span>
                </div>
              </div>
            )}
            
            <div className="space-y-6 w-full">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-blue-800 font-semibold mb-3 flex items-center">
                    <span className="mr-2">👤</span>
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur" 
                    placeholder="Your Name" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-blue-800 font-semibold mb-3 flex items-center">
                    <span className="mr-2">📧</span>
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur" 
                    placeholder="you@email.com" 
                    required 
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-blue-800 font-semibold mb-3 flex items-center">
                  <span className="mr-2">📋</span>
                  Subject
                </label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur" 
                  placeholder="How can we help you?" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-blue-800 font-semibold mb-3 flex items-center">
                  <span className="mr-2">✍️</span>
                  Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={6} 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur resize-none" 
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
                    <span className="mr-2">🚀</span>
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Contact Info Sidebar */}
        <aside className="lg:w-96 space-y-6">
          {/* Quick Contact */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200 p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl text-white">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-800">Quick Contact</h3>
            </div>
            
            <div className="space-y-4">
              <a 
                href="mailto:info@medilink.africa" 
                className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all duration-300 border border-blue-200 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">📧</span>
                </div>
                <div>
                  <div className="font-semibold text-blue-800">Email</div>
                  <div className="text-blue-600 text-sm">info@medilink.africa</div>
                </div>
              </a>
              
              <a 
                href="tel:+254700000000" 
                className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all duration-300 border border-blue-200 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">📱</span>
                </div>
                <div>
                  <div className="font-semibold text-blue-800">Phone</div>
                  <div className="text-blue-600 text-sm">+254 700 000 000</div>
                </div>
              </a>
              
              <a 
                href="https://wa.me/254700000000" 
                className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all duration-300 border border-blue-200 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl text-white">💬</span>
                </div>
                <div>
                  <div className="font-semibold text-blue-800">WhatsApp</div>
                  <div className="text-blue-600 text-sm">Chat with us</div>
                </div>
              </a>
            </div>
          </div>

          {/* Office Location */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl text-white">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-blue-800">Office Location</h3>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <div className="font-semibold text-blue-800 mb-1">MediLink Africa</div>
              <div className="text-blue-700">Nairobi, Kenya</div>
              <div className="text-blue-600 text-sm mt-2">East Africa's Healthcare Hub</div>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-xl p-6 text-white">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">⚡</span>
              </div>
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

          {/* FAQ Quick Links */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200 p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl text-white">❓</span>
              </div>
              <h3 className="text-xl font-bold text-blue-800">Quick Help</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200">
                <div className="font-medium text-blue-800 text-sm">📊 Request Demo</div>
              </button>
              <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200">
                <div className="font-medium text-blue-800 text-sm">🤝 Partnership Inquiry</div>
              </button>
              <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200">
                <div className="font-medium text-blue-800 text-sm">🔧 Technical Support</div>
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Contact;