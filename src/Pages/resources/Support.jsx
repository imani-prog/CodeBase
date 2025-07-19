import { useState } from 'react';
import Footer from '../../Components/Footer.jsx';
import Navbar from '../../Components/Navbar.jsx';

const Support = () => {
  const [selectedTicketType, setSelectedTicketType] = useState('');
  const [ticketForm, setTicketForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  const supportCategories = [
    { id: 'payment', name: 'Payment Issues', icon: '💳', color: 'from-green-500 to-green-600' },
    { id: 'chw', name: 'CHW Support', icon: '👥', color: 'from-purple-500 to-purple-600' },
    { id: 'clinic', name: 'Clinic Issues', icon: '🏥', color: 'from-red-500 to-red-600' },
    { id: 'login', name: 'Login Problems', icon: '🔐', color: 'from-orange-500 to-orange-600' },
    { id: 'technical', name: 'Technical Support', icon: '⚙️', color: 'from-blue-500 to-blue-600' },
    { id: 'other', name: 'Other', icon: '❓', color: 'from-gray-500 to-gray-600' }
  ];

  const faqs = [
    { q: "How do I reset my password?", a: "Go to login page and click 'Forgot Password' to receive reset instructions." },
    { q: "How can I update my payment method?", a: "Visit your account settings and navigate to the billing section to update payment details." },
    { q: "How do I contact a CHW?", a: "Use the CHW directory in your dashboard or contact support for assistance." },
    { q: "What if my clinic is not listed?", a: "Contact support to add your clinic to our network." }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    // Handle ticket submission logic here
    console.log('Ticket submitted:', ticketForm);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-6 shadow-xl">
            <span className="text-4xl text-white">🎧</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 mb-4 leading-tight">
            Support <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Desk</span>
          </h1>
          <p className="text-xl text-blue-700 max-w-2xl mx-auto mb-8">
            We're here to help you resolve issues quickly and get back to better health.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-white/60 backdrop-blur rounded-full px-4 py-2 border border-blue-200">
              <span className="text-blue-600 mr-2">⚡</span>
              <span className="text-blue-800 font-medium">Fast Response</span>
            </div>
            <div className="flex items-center bg-white/60 backdrop-blur rounded-full px-4 py-2 border border-blue-200">
              <span className="text-blue-600 mr-2">👨‍💻</span>
              <span className="text-blue-800 font-medium">Expert Team</span>
            </div>
            <div className="flex items-center bg-white/60 backdrop-blur rounded-full px-4 py-2 border border-blue-200">
              <span className="text-blue-600 mr-2">📱</span>
              <span className="text-blue-800 font-medium">Multi-channel</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* How We Help Section */}
            <section className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <h2 className="text-3xl font-bold text-blue-800">How can we help?</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  { icon: '🎫', text: 'Raise a support ticket for payment, CHW, clinic, or login issues' },
                  { icon: '📊', text: 'Track your ticket status from your dashboard' },
                  { icon: '📚', text: 'Access FAQs and troubleshooting guides' },
                  { icon: '📞', text: 'Contact our helpdesk team for urgent matters' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-4 bg-blue-50 rounded-2xl border border-blue-200">
                    <span className="text-2xl mr-4 mt-1">{item.icon}</span>
                    <span className="text-blue-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <p className="text-lg">Our support desk is here to help you resolve issues quickly and get back to better health.</p>
              </div>
            </section>

            {/* Support Categories */}
            <section className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl text-white">📋</span>
                </div>
                <h2 className="text-3xl font-bold text-blue-800">Support Categories</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {supportCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedTicketType(category.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      selectedTicketType === category.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-blue-200 bg-white hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <span className="text-3xl text-white">{category.icon}</span>
                    </div>
                    <h3 className="font-bold text-blue-800 text-lg">{category.name}</h3>
                  </button>
                ))}
              </div>

              {/* Quick Ticket Form */}
              {selectedTicketType && (
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Create Support Ticket</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Ticket title"
                      value={ticketForm.title}
                      onChange={(e) => setTicketForm({...ticketForm, title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    />
                    <textarea
                      placeholder="Describe your issue..."
                      rows={4}
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white resize-none"
                    ></textarea>
                    <select
                      value={ticketForm.priority}
                      onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </select>
                    <button
                      onClick={handleTicketSubmit}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                    >
                      Submit Ticket 🚀
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* FAQ Section */}
            <section className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200 p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl text-white">❓</span>
                </div>
                <h2 className="text-3xl font-bold text-blue-800">Frequently Asked Questions</h2>
              </div>
              
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/70"
                />
              </div>
              
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <details key={index} className="bg-blue-50 rounded-2xl border border-blue-200 overflow-hidden">
                    <summary className="p-6 cursor-pointer hover:bg-blue-100 transition-colors font-semibold text-blue-800 flex items-center">
                      <span className="mr-3 text-xl">💡</span>
                      {faq.q}
                    </summary>
                    <div className="px-6 pb-6 pt-2 text-blue-700 bg-white/50">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Contact Section */}
            <section className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200 p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl text-white">📞</span>
                </div>
                <h2 className="text-2xl font-bold text-blue-800">Contact Us</h2>
              </div>
              
              <div className="space-y-4">
                <a 
                  href="mailto:support@medilink.africa"
                  className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all duration-300 border border-blue-200 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl text-white">📧</span>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-800">Email</div>
                    <div className="text-blue-600 text-sm">support@medilink.africa</div>
                  </div>
                </a>
                
                <a 
                  href="tel:+254700123456"
                  className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all duration-300 border border-blue-200 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl text-white">📱</span>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-800">Phone</div>
                    <div className="text-blue-600 text-sm">+254 700 123 456</div>
                  </div>
                </a>
                
                <div className="flex items-center p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl text-white">💬</span>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-800">Live Chat</div>
                    <div className="text-yellow-600 text-sm">Coming Soon!</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Support Hours */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-xl p-6 text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🕐</span>
                </div>
                <h3 className="text-2xl font-bold">Support Hours</h3>
              </div>
              <div className="space-y-3 text-blue-100">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">8AM - 6PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">9AM - 2PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">Emergency Only</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white/10 rounded-2xl">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-sm">Currently Online</span>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-blue-200 p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors border border-blue-200 text-left">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🎫</span>
                    <div>
                      <div className="font-semibold text-blue-800">View My Tickets</div>
                      <div className="text-blue-600 text-sm">Check status & updates</div>
                    </div>
                  </div>
                </button>
                <button className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors border border-blue-200 text-left">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📋</span>
                    <div>
                      <div className="font-semibold text-blue-800">System Status</div>
                      <div className="text-green-600 text-sm">All systems operational</div>
                    </div>
                  </div>
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;