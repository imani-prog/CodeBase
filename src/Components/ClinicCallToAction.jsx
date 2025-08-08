import React from 'react';

const ClinicCallToAction = () => {
  return (
    <section className="mt-5 w-full relative overflow-hidden mb-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50"></div>
      
      {/* Main Content Container */}
      <div className="relative p-8 text-center">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 leading-tight font-serif">
          Ready to Digitize Your Facility?
        </h2>
        
        {/* Subheading */}
        <p className="text-lg md:text-xl mb-6 max-w-4xl mx-auto leading-relaxed">
          MediLink is your partner in digital transformation. Whether you're a private clinic, rural health center, or major hospital — our platform scales with you.
        </p>
        
        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
          <div className="flex items-center bg-yellow-300 px-4 py-2 rounded-full shadow-sm border border-blue-200">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-black font-bold">30-Day Free Trial</span>
          </div>
          <div className="flex items-center bg-yellow-300 px-4 py-2 rounded-full shadow-sm border border-blue-200">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-black font-bold">24/7 Support</span>
          </div>
          <div className="flex items-center bg-yellow-300 px-4 py-2 rounded-full shadow-sm border border-blue-200">
            <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-black font-bold">No Setup Fees</span>
          </div>
        </div>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          <a
            href="/contact"
            className="group inline-flex items-center px-8 py-4 bg-blue-800 text-white font-semibold rounded-full shadow-lg hover:bg-blue-900 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
          >
            <span>Get Started Today</span>
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          
          <a
            href=""
            className="group inline-flex items-center px-8 py-4 bg-white text-blue-800 font-semibold rounded-full shadow-lg border-2 border-blue-200 hover:border-blue-300 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
          >
            <svg className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Watch Demo</span>
          </a>
        </div>
        
        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-3 font-medium">Trusted by 500+ healthcare facilities</p>
          <div className="flex justify-center items-center space-x-6 opacity-70">
            <div className="text-xs text-gray-500 font-semibold tracking-wider">HIPAA COMPLIANT</div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="text-xs text-gray-500 font-semibold tracking-wider">ISO 27001</div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="text-xs text-gray-500 font-semibold tracking-wider">SOC 2 TYPE II</div>
          </div>
        </div>
        
        
      
      {/* Decorative Elements */}
    </div>
    <div className="absolute top-4 left-4 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
    <div className="absolute bottom-4 right-4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
  </section>
);
}
export default ClinicCallToAction;