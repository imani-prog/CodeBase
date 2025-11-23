import React, { useState } from 'react';
import smartHealthcareImg from '../assets/smartHealthcare.png';

const FinancialService = () => {
  const sections = [
    {
      icon: '',
      title: 'Financial & Insurance Integration',
      items: [
        'NHIF, SHA, and private insurance claims',
        'M-Pesa STK Push, card & mobile wallet support',
        'Automated receipts, claims, and reports',
        'Real-time billing dashboard for administrators',
        'Integrated NHIF e-claim API processing',
        'Fraud detection and claims validation features',
        'Support for recurring billing & co-pay structures',
        'Multi-currency and insurance plan coverage handling',
      ],
      note: '"Simplify billing while ensuring accountability."',
    },
    {
      icon: '',
      title: 'Ambulance & CHW Dispatch Tools',
      items: [
        'Geo-locate & dispatch CHWs to home visits',
        'Coordinate emergency ambulances digitally',
        'Log outreach, collect patient feedback',
        'Live GPS tracking and incident reporting',
        'SMS alerts to patients before dispatch',
        'Pre-filled trip reports for faster documentation',
        'Link dispatch data to patient health records',
      ],
      note: '"Rapid response and field coordination built in."',
    },
    {
      icon: '',
      title: 'Staff Training & Health Education',
      items: [
        'E-learning portal for CHWs & clinicians',
        'Onboarding modules & system walkthroughs',
        'Patient education handouts & tips',
        'Certification tracking and course completion badges',
        'Interactive training with quizzes and simulations',
        'Offline learning mode for rural areas',
        'Role-based learning paths and progress insights',
      ],
      note: '"Build skills. Improve care delivery."',
    },
    {
      icon: '',
      title: 'Patient Financial Management',
      items: [
        'Track patient payments and balances',
        'Automated payment reminders via SMS/email',
        'Flexible payment plans and installment options',
        'Financial counseling for low-income patients',
        'Integration with national health insurance schemes',
        'Customizable billing cycles and invoicing',
        'Patient financial literacy resources',
      ],
      note: '"Empower patients to manage their health costs."',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? sections.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === sections.length - 1 ? 0 : prev + 1));
  };

  const section = sections[currentIndex];

  return (
    <div className="w-full flex justify-center items-center py-6 sm:py-8 md:py-10 relative overflow-x-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 w-full max-w-6xl items-stretch px-4 sm:px-6 md:px-8">
        {/* Text Card with Integrated Navigation */}
        <div className="relative w-full h-full">
          {/* Left Navigation Button - Outside the text content */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:left-1 md:left-2 top-1/2 transform -translate-y-1/2 bg-white text-blue-800 font-bold py-2 px-2.5 sm:px-3 md:px-4 rounded-full shadow-md hover:bg-blue-100 z-20 transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            &lt;
          </button>

          {/* Text Card with Extra Padding for Buttons */}
          <div className="px-10 sm:px-12 md:px-14 py-4 sm:py-6 md:py-8 h-full transition-all duration-500 ease-in-out flex flex-col justify-between relative">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-3 sm:mb-4 font-serif px-2 leading-tight">
                {section.icon} {section.title}
              </h2>
              <ul className="list-none space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
                {section.items.map((item, idx) => (
                  <li key={idx} className="flex items-start px-2">
                    <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 text-xs sm:text-sm flex-shrink-0">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="italic text-blue-600 mt-4 sm:mt-5 md:mt-6 text-xs sm:text-sm px-2 leading-relaxed">
              {section.note}
            </p>
          </div>

          {/* Right Navigation Button - Outside the text content */}
          <button
            onClick={nextSlide}
            className="absolute right-0 sm:right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-white text-blue-800 font-bold py-2 px-2.5 sm:px-3 md:px-4 rounded-full shadow-md hover:bg-blue-100 z-20 transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            &gt;
          </button>
        </div>

        {/* Right Side: Static Image */}
        <div className="w-full px-0">
          <img
            src={smartHealthcareImg}
            alt="Smart Healthcare"
            className="rounded-lg sm:rounded-xl md:rounded-2xl w-full h-auto object-contain max-h-[300px] sm:max-h-[400px] md:max-h-[480px] lg:max-h-[520px] shadow-md sm:shadow-lg"
            style={{ 
              minHeight: '250px',
              boxShadow: `
                -4px 4px 0px rgba(59, 130, 246, 0.3),
                -8px 8px 0px rgba(59, 130, 246, 0.2),
                -12px 12px 10px rgba(0, 0, 0, 0.1)
              `
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialService;
