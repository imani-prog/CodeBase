import React, { useState } from "react";
import BrianImg from "../../assets/Brian Wekesa.jpeg";
import EstherImg from "../../assets/Esther Nyambura.jpeg";
import GraceImg from "../../assets/Grace Achieng.jpeg";
import JosephImg from "../../assets/Joseph Otieno.jpeg";
import LindaImg from "../../assets/LindaWambui.jpeg";
import PeterImg from "../../assets/PeterNjoroge.jpeg";
import SolutionTestimonial from "./SolutionTestimonial.jsx";

const testimonials = [
  {
    quote: "With MediLink, I don’t carry bulky files anymore. It’s all on my phone—and it works, even offline. I can access patient records instantly, update notes on the go, and never worry about losing important information. The platform is reliable and saves me so much time during my daily rounds.",
    name: "Brian",
    role: "CHW",
    location: "Vihiga County",
    avatar: BrianImg,
  },
  {
    quote: "MediLink helps me track my visits and patient needs easily. I feel more organized and supported. The reminders for upcoming appointments and the ability to communicate with my supervisor directly through the app have made my work much smoother. I can focus more on patient care and less on paperwork.",
    name: "Esther",
    role: "CHW",
    location: "Nairobi County",
    avatar: EstherImg,
  },
  {
    quote: "The GPS tracking feature keeps me safe and lets my supervisor know where I am at all times. It’s reassuring to know that help is just a tap away if I need it. The route history also helps me report my mileage accurately and ensures transparency in my outreach activities.",
    name: "Peter",
    role: "CHW",
    location: "Kisumu County",
    avatar: PeterImg,
  },
  {
    quote: "I love the e-learning modules. I can learn at my own pace and get certified easily. The interactive lessons and quizzes keep me engaged, and I can always revisit topics when I need a refresher. Tracking my progress and certificates in one place is a huge advantage for my professional growth.",
    name: "Grace",
    role: "CHW",
    location: "Mombasa County",
    avatar: GraceImg,
  },
  {
    quote: "Scanning NHIF cards is so fast now. No more paperwork, and my patients appreciate it. I can instantly access their medical history and update their profiles securely. This has reduced errors and made my field visits much more efficient, giving me more time to focus on patient care.",
    name: "Joseph",
    role: "CHW",
    location: "Eldoret",
    avatar: JosephImg,
  },
  {
    quote: "Performance reports help me see my progress and motivate me to do better every month. The dashboard shows all my completed tasks and earnings, and I get notified about new updates. It’s motivating to see my impact and strive for even better results with each report.",
    name: "Linda",
    role: "CHW",
    location: "Machakos County",
    avatar: LindaImg,
  },
];

const CHWCarousel = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const getVisibleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1;
    }
    return 2;
  };
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  React.useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visible = testimonials.slice(testimonialIndex, testimonialIndex + visibleCount);
  const prev = () => setTestimonialIndex(i => (i - visibleCount + testimonials.length) % testimonials.length);
  const next = () => setTestimonialIndex(i => (i + visibleCount) % testimonials.length);

  return (
    <div className="flex flex-col items-center mt-10 w-full">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center w-full font-serif">What CHWs Say About MediLink</h2>
      <div className="relative flex flex-row gap-8 w-full justify-center items-center">
        <button
          aria-label="Previous testimonials"
          onClick={prev}
          className="absolute left-0 z-10 w-12 h-12 rounded-full border-2 border-blue-300 bg-white text-blue-700 text-3xl flex items-center justify-center shadow hover:bg-blue-50"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          &#60;
        </button>
        {visible.map((t, idx) => (
          <div key={idx} className="w-full max-w-lg mx-4">
                <SolutionTestimonial 
                  {...t} 
                  quoteClassName="italic mb-2 text-sm md:text-lg lg:text-xl" 
                />
          </div>
        ))}
        <button
          aria-label="Next testimonials"
          onClick={next}
          className="absolute right-0 z-10 w-12 h-12 rounded-full border-2 border-blue-300 bg-white text-blue-700 text-3xl flex items-center justify-center shadow hover:bg-blue-50"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          &#62;
        </button>
      </div>
    </div>
  );
};

export default CHWCarousel;
