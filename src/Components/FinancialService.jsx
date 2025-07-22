import React, { useState } from 'react';
import smartHealthcareImg from '../assets/smartHealthcare.avif';

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
    <div className="w-full flex justify-center items-center py-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl items-stretch">
        {/* Text Card + Buttons in Relative Wrapper */}
        <div className="relative w-full h-full">
          {/* Prev Button - aligned outside text card */}
          <button
            onClick={prevSlide}
            className="absolute left-[-2rem] top-1/2 transform -translate-y-1/2 bg-white text-blue-800 font-bold py-2 px-4 rounded-full shadow hover:bg-blue-100 z-20"
          >
            &lt;
          </button>

          {/* Text Card */}
          <div className="p-8 h-full transition-all duration-500 ease-in-out flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                {section.icon} {section.title}
              </h2>
              <ul className="list-disc list-inside ml-4 space-y-1 text-[16px]">
                {section.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="italic text-blue-600 mt-6 text-sm">
              {section.note}
            </p>
          </div>

          {/* Next Button - aligned outside text card */}
          <button
            onClick={nextSlide}
            className="absolute right-[-2rem] top-1/2 transform -translate-y-1/2 bg-white text-blue-800 font-bold py-2 px-4 rounded-full shadow hover:bg-blue-100 z-20"
          >
            &gt;
          </button>
        </div>

        {/* Right Side: Static Image */}
        <div className="w-full">
          <img
            src={smartHealthcareImg}
            alt="Smart Healthcare"
            className="rounded-2xl shadow-lg w-full h-auto object-cover max-h-[520px]"
            style={{ minHeight: '320px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialService;
