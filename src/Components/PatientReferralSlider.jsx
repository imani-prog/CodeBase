import { useEffect, useState } from "react";

const referralSlides = [
  {
    title: "Patient & Referral Management",
    points: [
      "Book outpatient/inpatient services digitally",
      "Track referrals and follow-up continuity",
      "Automated queue and appointment systems",
    ],
    quote: "Reduce wait times, improve patient experience.",
  },
  {
    title: "Seamless Patient Journey",
    points: [
      "Digital check-in and discharge process",
      "Real-time notifications for appointments",
      "Integrated follow-up reminders",
    ],
    quote: "Every step, digitally connected.",
  },
  {
    title: "Referral Tracking & Analytics",
    points: [
      "Monitor referral status and outcomes",
      "Automated feedback collection",
      "Visualize referral patterns and bottlenecks",
    ],
    quote: "Data-driven decisions for better care.",
  },
  {
    title: "Queue & Appointment Automation",
    points: [
      "Smart queue management",
      "Estimated wait times for patients",
      "Priority handling for emergencies",
    ],
    quote: "Efficiency at every touchpoint.",
  },
];


function PatientReferralSlider() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % referralSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-blue-950/60 p-4 sm:p-6 md:p-10 lg:p-16 rounded-lg sm:rounded-xl md:rounded-2xl min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] relative overflow-hidden">
      <div
        className="w-full max-w-2xl mx-auto transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
          display: "flex",
        }}
      >
        {referralSlides.map((slide, idx) => (
          <div
            key={idx}
            className="w-full flex-shrink-0 flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8"
            style={{ minWidth: "100%" }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white mb-3 sm:mb-4 text-center drop-shadow-lg font-serif px-2 leading-tight">{slide.title}</h2>
            <ul className="list-none space-y-2 sm:space-y-3 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base lg:text-xl text-white text-center">
              {slide.points.map((point, i) => (
                <li key={i} className="flex items-start justify-center px-2">
                  <span className="text-blue-200 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
            <p className="italic text-blue-200 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base lg:text-lg text-center px-2 leading-relaxed">"{slide.quote}"</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-1.5 sm:gap-2">
        {referralSlides.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-colors duration-300 ${current === idx ? "bg-blue-300" : "bg-blue-700"}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default PatientReferralSlider;
