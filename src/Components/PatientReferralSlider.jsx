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
    <div className="w-full h-full flex items-center justify-center bg-blue-950/60 p-16 rounded-2xl min-h-[700px] relative">
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
            className="w-full flex-shrink-0 flex flex-col items-center justify-center px-8"
            style={{ minWidth: "100%" }}
          >
            <h2 className="text-3xl font-extrabold text-white mb-4 text-center drop-shadow-lg">{slide.title}</h2>
            <ul className="list-none space-y-3 mb-4 text-xl text-white text-center">
              {slide.points.map((point, i) => (
                <li key={i} className="flex items-start justify-center">
                  <span className="text-blue-200 mr-3 mt-1">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="italic text-blue-200 mt-2 text-lg text-center">"{slide.quote}"</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {referralSlides.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block w-3 h-3 rounded-full ${current === idx ? "bg-blue-300" : "bg-blue-700"}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default PatientReferralSlider;
