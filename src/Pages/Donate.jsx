/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useState } from "react";


// Donation impact data
const IMPACT_STATS = [
  {
    number: "50,000+",
    label: "Lives Impacted",
    description: "Through digital healthcare access",
    icon: "❤️"
  },
  {
    number: "300+",
    label: "Health Workers",
    description: "Trained and equipped",
    icon: "👨‍⚕️"
  },
  {
    number: "85+",
    label: "Communities",
    description: "Connected to healthcare",
    icon: "🏘️"
  },
  {
    number: "24/7",
    label: "Support",
    description: "Emergency response available",
    icon: "🚨"
  }
];

const DONATION_METHODS = [
  {
    title: "M-Pesa",
    subtitle: "Mobile Money",
    details: "Paybill: 123456",
    account: "MediLink",
    icon: "📱",
    color: "from-green-500 to-green-600",
    popular: true
  },
  {
    title: "Bank Transfer",
    subtitle: "Traditional Banking",
    details: "Equity Bank",
    account: "Acc: 987654321",
    icon: "🏦",
    color: "from-blue-500 to-blue-600",
    popular: false
  },
  {
    title: "Card Payment",
    subtitle: "Credit/Debit Cards",
    details: "Stripe & Flutterwave",
    account: "Secure payments",
    icon: "💳",
    color: "from-purple-500 to-purple-600",
    popular: false
  },
  {
    title: "Crypto",
    subtitle: "Digital Currency",
    details: "Bitcoin & Ethereum",
    account: "Modern payments",
    icon: "₿",
    color: "from-orange-500 to-orange-600",
    popular: false
  }
];

const IMPACT_TIERS = [
  {
    amount: "KES 500",
    title: "Healthcare Access",
    description: "Provides one month of healthcare access for a rural family",
    impact: "1 Family • 30 Days Coverage",
    icon: "🏥"
  },
  {
    amount: "KES 2,000", 
    title: "CHW Support",
    description: "Trains and supports a Community Health Worker for one month",
    impact: "1 CHW • 500+ Patients Reached",
    icon: "👩‍⚕️"
  },
  {
    amount: "KES 10,000",
    title: "Clinic Digitization",
    description: "Helps digitize a small clinic's patient records system",
    impact: "1 Clinic • 1000+ Records Digitized",
    icon: "💻"
  },
  {
    amount: "KES 25,000",
    title: "Emergency Fund",
    description: "Creates emergency medical fund for critical cases",
    impact: "24/7 Emergency Response",
    icon: "🚑"
  }
];

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isHovered, setIsHovered] = useState(null);

  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      
      
      {/* Hero Section - Modern Design */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-indigo-300/20 rounded-full blur-xl"></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-2 mb-8 border border-blue-200">
            <span className="text-2xl mr-2">💫</span>
            <span className="text-blue-700 font-semibold">Make a Difference Today</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
              Transform
            </span>
            <br />
            <span className="text-gray-800">Healthcare</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-10">
            Your donation powers digital health innovation, connecting underserved communities 
            to life-saving healthcare across Africa. Every contribution creates lasting impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center justify-center">
                <span className="mr-2">🚀</span>
                Donate Now
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300">
              Learn Our Impact
            </button>
          </div>
        </div>
      </section>

      {/* Live Impact Counter */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Real-Time Impact</h2>
            <p className="text-blue-100 text-lg">See the difference we're making together</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_STATS.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-blue-100 mb-1">{stat.label}</div>
                  <div className="text-sm text-blue-200">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Donation Methods */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Method</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple secure payment options designed for convenience and accessibility
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {DONATION_METHODS.map((method, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {method.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-full text-sm font-bold z-10">
                    Most Popular
                  </div>
                )}
                
                <div className={`bg-gradient-to-br ${method.color} p-1 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105`}>
                  <div className="bg-white rounded-xl p-6 h-full">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{method.icon}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{method.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{method.subtitle}</p>
                      <div className="bg-gray-50 rounded-lg p-3 mb-2">
                        <p className="font-semibold text-gray-800">{method.details}</p>
                        <p className="text-sm text-gray-600">{method.account}</p>
                      </div>
                      <button className={`w-full bg-gradient-to-r ${method.color} text-white py-2 rounded-lg font-semibold transition-all duration-300 hover:opacity-90`}>
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Amount Selection */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Quick Donation</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {quickAmounts.map((amount, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAmount(amount)}
                  className={`p-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                    selectedAmount === amount
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  KES {amount.toLocaleString()}
                </button>
              ))}
            </div>
            
            <div className="flex gap-4 mb-6">
              <input
                type="number"
                placeholder="Custom amount (KES)"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                Donate
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 text-sm">🔒 All transactions are secure and encrypted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Visualization */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Donation Impact Tiers */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Impact</h2>
                <p className="text-xl text-gray-600 mb-8">
                  See exactly how your donation transforms lives
                </p>
              </div>
              
              <div className="space-y-4">
                {IMPACT_TIERS.map((tier, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{tier.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{tier.title}</h3>
                          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {tier.amount}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{tier.description}</p>
                        <div className="bg-blue-50 rounded-lg p-2">
                          <p className="text-sm font-semibold text-blue-700">{tier.impact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Transparency Dashboard */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Transparency Report</h2>
                <p className="text-gray-600">How we use every donation dollar</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Healthcare Technology</span>
                    <span className="font-bold text-blue-600">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000" style={{width: '60%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Community Health Workers</span>
                    <span className="font-bold text-green-600">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 delay-200" style={{width: '25%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Operations & Support</span>
                    <span className="font-bold text-purple-600">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-1000 delay-400" style={{width: '15%'}}></div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="text-center">
                    <h3 className="font-bold text-gray-800 mb-2">💡 Did you know?</h3>
                    <p className="text-gray-600 text-sm">
                      95% of donations directly impact healthcare delivery. Only 5% goes to administrative costs.
                    </p>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 mb-12">Real impact from real donations</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">👩‍⚕️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Sarah's Story</h3>
              <p className="text-gray-600 mb-4">
                "Thanks to MediLink, I can now provide telemedicine consultations to over 500 patients monthly in rural Turkana."
              </p>
              <div className="text-sm text-blue-600 font-semibold">Community Health Worker</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Kibera Clinic</h3>
              <p className="text-gray-600 mb-4">
                "Digital patient records have reduced wait times by 70% and improved care coordination significantly."
              </p>
              <div className="text-sm text-blue-600 font-semibold">Healthcare Facility</div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">The Kamau Family</h3>
              <p className="text-gray-600 mb-4">
                "Emergency response through MediLink saved our daughter's life when she had complications during childbirth."
              </p>
              <div className="text-sm text-blue-600 font-semibold">Beneficiary Family</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Lives?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of donors who are revolutionizing healthcare access across Africa. 
            Your contribution today becomes someone's lifeline tomorrow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105">
              🚀 Start Donating
            </button>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300"
            >
              💬 Ask Questions
            </Link>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center text-blue-100">
            <div className="flex items-center">
              <span className="mr-2">🔒</span>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">📊</span>
              <span>Full Transparency</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🏆</span>
              <span>Proven Impact</span>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Donate;