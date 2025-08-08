import { useState } from 'react';


const Support = () => {
  const [selectedTicketType, setSelectedTicketType] = useState('');
  const [ticketForm, setTicketForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: ''
  });


  const supportCategories = [
    { id: 'payment', name: 'Payment Issues',  },
    { id: 'chw', name: 'CHW Support',  },
    { id: 'clinic', name: 'Clinic Issues', },
    { id: 'login', name: 'Login Problems',},
    { id: 'technical', name: 'Technical Support',},
    { id: 'other', name: 'Other',}
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    // Handle ticket submission logic here
    console.log('Ticket submitted:', ticketForm);
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      
      
      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          <h1 className="text-5xl md:text-6xl font-extrabold font-serif text-blue-900 mb-4 leading-tight">
            Support <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Desk</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            We're here to help you resolve issues quickly and get back to better health.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-white/60 backdrop-blur rounded-full px-4 py-2 border border-blue-200">
              
              <span className="font-medium">Fast Response</span>
            </div>
            <div className="flex items-center bg-white/60 backdrop-blur rounded-full px-4 py-2 border border-blue-200">
              
              <span className="font-medium">Expert Team</span>
            </div>
            <div className="flex items-center bg-white/60 backdrop-blur rounded-full px-4 py-2 border border-blue-200">
              
              <span className="font-medium">Multi-channel</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* How We Help Section */}
            <section className=" backdrop-blur-md p-8">
              <div className="flex items-center mb-6">
               
                <h2 className="text-3xl font-bold font-serif text-blue-800">How can we help?</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  { icon: '', text: 'Raise a support ticket for payment, CHW, clinic, or login issues' },
                  { icon: '', text: 'Track your ticket status from your dashboard' },
                  { icon: '', text: 'Access FAQs and troubleshooting guides' },
                  { icon: '', text: 'Contact our helpdesk team for urgent matters' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start p-4  rounded-2xl border border-blue-200">
                    <span className="text-2xl mr-4 mt-1">{item.icon}</span>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                <p className="text-lg">Our support desk is here to help you resolve issues quickly and get back to better health.</p>
              </div>
            </section>

            {/* Support Categories */}
            <section className="backdrop-blur-md p-8">
              <div className="flex items-center mb-6">
                
                <h2 className="text-3xl font-bold font-serif text-blue-800">Support Categories</h2>
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
                    
                    <h3 className="font-bold text-lg">{category.name}</h3>
                  </button>
                ))}
              </div>

              {/* Quick Ticket Form */}
              {selectedTicketType && (
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                  <h3 className="text-xl font-bold text-blue-800 font-serif mb-4">Create Support Ticket</h3>
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
                      Submit Ticket 
                    </button>
                  </div>
                </div>
              )}
            </section>

            
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Contact Section */}
            <section className=" p-6">
              <div className="flex items-center mb-6">
                
                <h2 className="text-2xl font-bold text-blue-800 font-serif">Contact Us</h2>
              </div>
              
              <div className="space-y-4">
                <a 
                  href="mailto:support@medilink.africa"
                  className="flex items-center p-4 hover:bg-blue-100 rounded-2xl transition-all duration-300 border border-blue-200 group"
                >
                  
                  <div>
                    <div className="font-semibold text-blue-800">Email</div>
                    <div className="text-sm">support@medilink.africa</div>
                  </div>
                </a>
                
                <a 
                  href="tel:+254700123456"
                  className="flex items-center p-4 hover:bg-blue-100 rounded-2xl transition-all duration-300 border border-blue-200 group"
                >
                  
                  <div>
                    <div className="font-semibold text-blue-800">Phone</div>
                    <div className="text-sm">+254 700 123 456</div>
                  </div>
                </a>
                
                <div className="flex items-center p-4 bg-yellow-50 rounded-2xl border border-yellow-200">
                  
                  <div>
                    <div className="font-semibold text-blue-800">Live Chat</div>
                    <div className="text-yellow-600 text-sm">Coming Soon!</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Support Hours */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-700 shadow-xl p-6 text-white">
              <div className="flex items-center mb-4">
                
                <h3 className="text-2xl font-bold font-serif">Support Hours</h3>
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
            <section className="bg-white/80  p-6">
              <h3 className="text-xl font-bold text-blue-800 font-serif mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full p-4 cursor-pointer hover:bg-blue-100 rounded-2xl transition-colors border border-blue-200 text-left">
                  <div className="flex items-center">
                    
                    <div>
                      <div className="font-semibold text-blue-800">View My Tickets</div>
                      <div className="text-sm">Check status & updates</div>
                    </div>
                  </div>
                </button>
                <button className="w-full p-4 text-left">
                  <div className="flex items-center">
                    
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
    </div>
  );
};

export default Support;