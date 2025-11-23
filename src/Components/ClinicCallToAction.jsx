import React from 'react';

const ClinicCallToAction = () => {
  return (
    <section className="mt-3 sm:mt-4 md:mt-5 w-full relative overflow-hidden mb-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50"></div>
      
      {/* Main Content Container */}
      <div className="relative p-4 sm:p-6 md:p-8 text-center">
        {/* Main Heading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-800 mb-3 sm:mb-4 leading-tight font-serif px-2">
          Ready to Digitize Your Facility?
        </h2>
        
        {/* Subheading */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 max-w-4xl mx-auto leading-relaxed px-2">
          MediLink is your partner in digital transformation. Whether you're a private clinic, rural health center, or major hospital — our platform scales with you.
        </p>
        
        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-7 md:mb-8 text-xs sm:text-sm px-2">
          <div className="flex items-center bg-yellow-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-blue-200">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1.5 sm:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-black font-bold whitespace-nowrap">30-Day Free Trial</span>
          </div>
          <div className="flex items-center bg-yellow-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-blue-200">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1.5 sm:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-black font-bold whitespace-nowrap">24/7 Support</span>
          </div>
          <div className="flex items-center bg-yellow-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm border border-blue-200">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1.5 sm:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-black font-bold whitespace-nowrap">No Setup Fees</span>
          </div>
        </div>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-4 sm:mb-5 md:mb-6 px-2">
          <a
            href="/contact"
            className="group inline-flex items-center px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-blue-800 text-white font-semibold text-sm sm:text-base rounded-full shadow-lg hover:bg-blue-900 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out w-full sm:w-auto justify-center"
          >
            <span>Get Started Today</span>
            <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          
          <a
            href=""
            className="group inline-flex items-center px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 md:py-4 bg-white text-blue-800 font-semibold text-sm sm:text-base rounded-full shadow-lg border-2 border-blue-200 hover:border-blue-300 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out w-full sm:w-auto justify-center"
          >
            <svg className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Watch Demo</span>
          </a>
        </div>
        
        {/* Trust Indicators */}
        <div className="text-center px-2">
          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-medium">Trusted by 500+ healthcare facilities</p>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:space-x-6 opacity-70">
            <div className="text-[10px] sm:text-xs text-gray-500 font-semibold tracking-wider">HIPAA COMPLIANT</div>
            <div className="w-1 h-1 bg-gray-400 rounded-full hidden sm:block"></div>
            <div className="text-[10px] sm:text-xs text-gray-500 font-semibold tracking-wider">ISO 27001</div>
            <div className="w-1 h-1 bg-gray-400 rounded-full hidden sm:block"></div>
            <div className="text-[10px] sm:text-xs text-gray-500 font-semibold tracking-wider">SOC 2 TYPE II</div>
          </div>
        </div>
        
        
      
      {/* Decorative Elements */}
    </div>
    <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
    <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
  </section>
);
}
export default ClinicCallToAction;