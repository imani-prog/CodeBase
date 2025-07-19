import { Link } from "react-router-dom";
import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";

const Donate = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 min-h-screen flex flex-col font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <div className="w-full px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mb-6 shadow-lg">
              <span className="text-3xl text-white">❤️</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6 leading-tight">
              Support MediLink
            </h1>
            <p className="text-xl md:text-2xl text-blue-900 leading-relaxed max-w-3xl mx-auto">
              Your donation helps us provide affordable, accessible healthcare to communities in need across Kenya and Africa.
            </p>
          </div>
        </div>
      </div>

      <main className="flex flex-col items-center w-full px-4 pb-12 max-w-6xl mx-auto">
        {/* Impact Stats */}
        <section className="w-full mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-blue-200">
              <div className="text-3xl mb-3">🏥</div>
              <div className="text-2xl font-bold text-blue-800 mb-1">50+</div>
              <div className="text-blue-700">Healthcare Facilities Supported</div>
            </div>
            <div className="bg-white/70 backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-blue-200">
              <div className="text-3xl mb-3">👩‍⚕️</div>
              <div className="text-2xl font-bold text-blue-800 mb-1">200+</div>
              <div className="text-blue-700">Community Health Workers</div>
            </div>
            <div className="bg-white/70 backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-blue-200">
              <div className="text-3xl mb-3">🤝</div>
              <div className="text-2xl font-bold text-blue-800 mb-1">10K+</div>
              <div className="text-blue-700">Patients Connected</div>
            </div>
          </div>
        </section>

        {/* Donation Methods */}
        <section className="w-full mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl shadow-xl border border-blue-200 p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-semibold text-blue-700 mb-4 flex items-center justify-center">
                <span className="text-4xl mr-3">💳</span>
                How to Donate
              </h2>
              <p className="text-lg text-blue-800 max-w-2xl mx-auto">
                Choose your preferred donation method. Every contribution makes a difference in someone's life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* M-Pesa */}
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-blue-100 text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl text-white">📱</span>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">M-Pesa</h3>
                <div className="space-y-2">
                  <p className="text-blue-700 font-medium">Paybill Number</p>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <span className="text-2xl font-bold text-blue-900">123456</span>
                  </div>
                  <p className="text-sm text-blue-600">Quick and secure mobile payments</p>
                </div>
              </div>

              {/* Bank Transfer */}
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-blue-100 text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl text-white">🏦</span>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">Bank Transfer</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="font-semibold text-blue-900">MediLink Foundation</p>
                    <p className="text-blue-700">Equity Bank</p>
                    <p className="font-bold text-blue-900">Acc No. 987654321</p>
                  </div>
                  <p className="text-sm text-blue-600">Traditional bank transfers</p>
                </div>
              </div>

              {/* Card Payment */}
              <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-blue-100 text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl text-white">💳</span>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">Card Payment</h3>
                <div className="space-y-2">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="font-semibold text-blue-900">Stripe</p>
                    <p className="font-semibold text-blue-900">Flutterwave</p>
                  </div>
                  <p className="text-sm text-blue-600">Credit/Debit card payments</p>
                </div>
              </div>
            </div>

            {/* Quick Donation Amounts */}
            <div className="mt-10 text-center">
              <h3 className="text-xl font-semibold text-blue-800 mb-6">Quick Donation Amounts</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['KES 500', 'KES 1,000', 'KES 2,500', 'KES 5,000', 'Custom Amount'].map((amount, index) => (
                  <button
                    key={index}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Transparency & Impact */}
        <section className="w-full">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Transparency */}
              <div className="bg-gradient-to-br from-blue-100 to-white rounded-3xl shadow-xl border border-blue-200 p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl text-white">📊</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-4">
                    Transparency & Impact
                  </h2>
                </div>
                
                <div className="bg-white/70 backdrop-blur rounded-2xl p-6 mb-6 border border-blue-100">
                  <p className="text-blue-900 leading-relaxed mb-4">
                    We publish regular transparency reports so you can see how your donation is used to make a difference.
                  </p>
                  
                  {/* Impact Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Healthcare Technology</span>
                      <span className="font-bold text-blue-800">60%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Community Health Workers</span>
                      <span className="font-bold text-blue-800">25%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '25%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Operations & Support</span>
                      <span className="font-bold text-blue-800">15%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{width: '15%'}}></div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <a 
                    href="#" 
                    className="inline-flex items-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="mr-2">📋</span>
                    View Transparency Reports
                  </a>
                </div>
              </div>

              {/* Your Impact */}
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl border border-blue-200 p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl text-white">🌍</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-4">
                    Your Impact
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-blue-100">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">💰</span>
                      <div>
                        <h4 className="font-semibold text-blue-800">KES 500</h4>
                        <p className="text-sm text-blue-700">Provides one month of healthcare access for a rural family</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-blue-100">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">👩‍⚕️</span>
                      <div>
                        <h4 className="font-semibold text-blue-800">KES 2,000</h4>
                        <p className="text-sm text-blue-700">Trains and supports a Community Health Worker for one month</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-blue-100">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">🏥</span>
                      <div>
                        <h4 className="font-semibold text-blue-800">KES 10,000</h4>
                        <p className="text-sm text-blue-700">Helps digitize a small clinic's patient records system</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl border border-blue-200">
                  <p className="text-center text-blue-800 font-medium">
                    "Every donation, no matter the size, creates ripples of positive change in healthcare accessibility across Africa."
                  </p>
                </div>
                </div>
                  <div className="mt-6 flex justify-center">
                    <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                      Contact Us for Support or Inquiries
                    </Link>
                  </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;