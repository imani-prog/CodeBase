/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useState } from "react";


// Donation impact data
const IMPACT_STATS = [
  {
    number: "50,000+",
    label: "Lives Impacted",
    description: "Through digital healthcare access",
    icon: ""
  },
  {
    number: "300+",
    label: "Health Workers",
    description: "Trained and equipped",
    icon: ""
  },
  {
    number: "85+",
    label: "Communities",
    description: "Connected to healthcare",
    icon: ""
  },
  {
    number: "24/7",
    label: "Support",
    description: "Emergency response available",
    icon: ""
  }
];

const DONATION_METHODS = [
  {
    title: "M-Pesa",
    subtitle: "Mobile Money",
    details: "Paybill: 123456",
    account: "MediLink",
    icon: "",
    color: "from-blue-200 to-blue-300",
    popular: true
  },
  {
    title: "Bank Transfer",
    subtitle: "Traditional Banking",
    details: "Equity Bank",
    account: "Acc: 987654321",
    icon: "",
    color: "from-blue-200 to-blue-300",
    popular: false
  },
  {
    title: "Card Payment",
    subtitle: "Credit/Debit Cards",
    details: "Stripe & Flutterwave",
    account: "Secure payments",
    icon: "",
    color: "from-blue-200 to-blue-300",
    popular: false
  },
  {
    title: "Crypto",
    subtitle: "Digital Currency",
    details: "Bitcoin & Ethereum",
    account: "Modern payments",
    icon: "",
    color: "from-blue-200 to-blue-300",
    popular: false
  }
];

const IMPACT_TIERS = [
  {
    amount: "KES 500",
    title: "Healthcare Access",
    description: "Provides one month of healthcare access for a rural family",
    impact: "1 Family • 30 Days Coverage",
    icon: ""
  },
  {
    amount: "KES 2,000", 
    title: "CHW Support",
    description: "Trains and supports a Community Health Worker for one month",
    impact: "1 CHW • 500+ Patients Reached",
    icon: ""
  },
  {
    amount: "KES 10,000",
    title: "Clinic Digitization",
    description: "Helps digitize a small clinic's patient records system",
    impact: "1 Clinic • 1000+ Records Digitized",
    icon: ""
  },
  {
    amount: "KES 25,000",
    title: "Emergency Fund",
    description: "Creates emergency medical fund for critical cases",
    impact: "24/7 Emergency Response",
    icon: ""
  }
];

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isHovered, setIsHovered] = useState(null);

  const quickAmounts = [500, 1000, 2500, 5000, 10000];

  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50 overflow-x-hidden">
      
      
      {/* Hero Section - Modern Design */}
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
        {/* Background Elements */}
       
        
        <div className="relative max-w-6xl mx-auto text-center">
          
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            <span className="text-blue-800 font-serif">
              Transform Healthcare
            </span>

            <br />
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10 px-2">
            Your donation powers digital health innovation, connecting underserved communities 
            to life-saving healthcare across Africa. Every contribution creates lasting impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 md:mb-16">
            <button className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-xl transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center justify-center">
                
                Donate Now
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300">
              Learn Our Impact
            </button>
          </div>
        </div>
      </section>

      {/* Live Impact Counter */}
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <div className="absolute inset-0"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl text-blue-700 font-bold font-serif mb-3 sm:mb-4 px-2">Real-Time Impact</h2>
            <p className="text-sm sm:text-base md:text-lg px-2">See the difference we're making together</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {IMPACT_STATS.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  
                  <div className="text-2xl sm:text-3xl text-blue-700 font-bold mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-sm sm:text-base md:text-lg text-blue-900 font-semibold mb-1">{stat.label}</div>
                  <div className="text-xs sm:text-sm">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Donation Methods */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-blue-950 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-300 font-serif mb-3 sm:mb-4 px-2">Choose Your Method</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl text-white mx-auto px-2">
              Multiple secure payment options designed for convenience and accessibility
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
            {DONATION_METHODS.map((method, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                
                
                <div className={` p-1 rounded-xl sm:rounded-2xl shadow-xl group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300`}>
                  <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 h-full group-hover:bg-blue-50 transition-all duration-300">
                    <div className="text-center">
                      
                      <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 font-serif group-hover:text-blue-900 transition-colors duration-300">{method.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{method.subtitle}</p>
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3 mb-2 group-hover:bg-blue-100 transition-all duration-300">
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">{method.details}</p>
                        <p className="text-xs sm:text-sm text-gray-600 break-all">{method.account}</p>
                      </div>
                      <button className={`w-full bg-blue-500 text-white py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 hover:bg-blue-600 group-hover:shadow-md`}>
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Amount Selection */}
          <div className="p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-center text-yellow-300 font-serif mb-6 sm:mb-8 px-2">Quick Donation</h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {quickAmounts.map((amount, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAmount(amount)}
                  className={`p-3 sm:p-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 ${
                    selectedAmount === amount
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  KES {amount.toLocaleString()}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-white mb-4 sm:mb-6">
              <input
                type="number"
                placeholder="Custom amount (KES)"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="flex-1 p-3 sm:p-4 border-2 border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                Donate
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-white font-bold text-xs sm:text-sm px-2">🔒 All transactions are secure and encrypted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Visualization */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            
            {/* Donation Impact Tiers */}
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 font-serif mb-3 sm:mb-4 px-2">Your Impact</h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 px-2">
                  See exactly how your donation transforms lives
                </p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {IMPACT_TIERS.map((tier, index) => (
                  <div key={index} className="p-4 sm:p-5 md:p-6 shadow-lg rounded-lg sm:rounded-xl">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2 gap-2">
                          <h3 className="text-base sm:text-lg md:text-xl font-bold font-serif text-gray-800">{tier.title}</h3>
                          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap">
                            {tier.amount}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-2">{tier.description}</p>
                        <div className="bg-blue-50 rounded-lg p-2">
                          <p className="text-xs sm:text-sm font-semibold text-blue-700">{tier.impact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Transparency Dashboard */}
            <div className="p-4 sm:p-6 md:p-8 shadow-xl border border-gray-100 rounded-lg sm:rounded-xl">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 font-serif mb-3 sm:mb-4 px-2">Transparency Report</h2>
                <p className="text-xs sm:text-sm md:text-base px-2">How we use every donation dollar</p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-semibold text-gray-700 text-xs sm:text-sm md:text-base">Healthcare Technology</span>
                    <span className="font-bold text-blue-600 text-sm sm:text-base whitespace-nowrap">60%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 sm:h-3 rounded-full transition-all duration-1000" style={{width: '60%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-semibold text-gray-700 text-xs sm:text-sm md:text-base">Community Health Workers</span>
                    <span className="font-bold text-blue-600 text-sm sm:text-base whitespace-nowrap">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 sm:h-3 rounded-full transition-all duration-1000 delay-200" style={{width: '25%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-semibold text-gray-700 text-xs sm:text-sm md:text-base">Operations & Support</span>
                    <span className="font-bold text-blue-600 text-sm sm:text-base whitespace-nowrap">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 sm:h-3 rounded-full transition-all duration-1000 delay-400" style={{width: '15%'}}></div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="text-center">
                    <h3 className="font-bold text-blue-800 font-serif mb-2 text-sm sm:text-base">Did you know?</h3>
                    <p className="text-xs sm:text-sm px-2">
                      95% of donations directly impact healthcare delivery. Only 5% goes to administrative costs.
                    </p>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white font-bold py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base transition-all duration-300 transform hover:scale-105">
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-blue-800 mb-3 sm:mb-4 px-2">Success Stories</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 md:mb-12 px-2">Real impact from real donations</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              
              <h3 className="text-lg sm:text-xl font-bold font-serif text-blue-800 mb-2 sm:mb-3">Sarah's Story</h3>
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                "Thanks to MediLink, I can now provide telemedicine consultations to over 500 patients monthly in rural Turkana."
              </p>
              <div className="text-xs sm:text-sm text-blue-600 font-semibold">Community Health Worker</div>
            </div>
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">

              <h3 className="text-lg sm:text-xl font-bold text-blue-800 font-serif mb-2 sm:mb-3">Kibera Clinic</h3>
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                "Digital patient records have reduced wait times by 70% and improved care coordination significantly."
              </p>
              <div className="text-xs sm:text-sm text-blue-600 font-semibold">Healthcare Facility</div>
            </div>
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300">

              <h3 className="text-lg sm:text-xl font-bold text-blue-800 font-serif mb-2 sm:mb-3">The Kamau Family</h3>
              <p className="mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                "Emergency response through MediLink saved our daughter's life when she had complications during childbirth."
              </p>
              <div className="text-xs sm:text-sm text-blue-600 font-semibold">Beneficiary Family</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif text-yellow-300 mb-4 sm:mb-6 px-2">Ready to Transform Lives?</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-2">
            Join thousands of donors who are revolutionizing healthcare access across Africa. 
            Your contribution today becomes someone's lifeline tomorrow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-xl transition-all duration-300 transform hover:scale-105">
              Start Donating
            </button>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300"
            >
              💬 Ask Questions
            </Link>
          </div>
          
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center font-bold text-white text-xs sm:text-sm md:text-base">
            <div className="flex items-center justify-center gap-2">
              
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              
              <span>Full Transparency</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              
              <span>Proven Impact</span>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Donate;