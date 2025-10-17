import { useEffect, useState } from 'react';
import AvenueImg from '../assets/Avenue.png';
import BlissImg from '../assets/BlissHealthCare.png';
import KenyattaImg from '../assets/Kenyatta hospital.jpeg';
import MamaLucyImg from '../assets/Lucy.jpg';
import MOHImg from '../assets/MinistryOfHealth.png';
import StMarysImg from '../assets/StMarys.png';
import SolutionTestimonial from '../Pages/solutions/SolutionTestimonial';


const hospitalStyle = [
  {
    quote: "Since integrating MediLink, we’ve achieved faster patient turnaround and eliminated duplicate records across departments. Our staff now access patient data in seconds and documentation errors have reduced significantly.",
    name: "Kenyatta National Hospital",
    role: "ICT Department",
    location: "Nairobi",
    avatar: KenyattaImg,
  },
  {
    quote: "The automated referral and appointment system has improved our outpatient flow. SMS reminders reduced no-shows, and real-time dashboards have empowered our nurses and admins to collaborate better.",
    name: "Mama Lucy Hospital",
    role: "Clinical Operations",
    location: "Nairobi",
    avatar: MamaLucyImg,
  },
  {
    quote: "We use MediLink to streamline NHIF claims and track payments. The system automatically generates reports for audit and billing. This has drastically improved our reimbursement process.",
    name: "Bliss Medical Centre",
    role: "Finance Manager",
    location: "Kisumu & Eldoret Branches",
    avatar: BlissImg,
  },
  {
    quote: "Emergency response has improved through ambulance tracking and digital dispatch. Our ambulance teams and hospital units now coordinate better using real-time location updates and case handoffs.",
    name: "Avenue Healthcare",
    role: "Emergency Response Unit",
    location: "Mombasa",
    avatar: AvenueImg,
  },
  {
    quote: "We have used MediLink to collect data from public clinics and CHWs. The analytics dashboard has given the Ministry accurate, real-time health insights across counties, aiding national policy decisions.",
    name: "Ministry of Health Kenya",
    role: "Digital Health Division",
    location: "Afya House",
    avatar: MOHImg,
  },
  {
    quote: "With MediLink’s dashboards, we track staff performance, inventory, salaries, and billing from one interface. It’s become our daily command center for all departments.",
    name: "St. Mary’s Mission Hospital",
    role: "Hospital Administrator",
    location: "Nakuru",
    avatar: StMarysImg,
  },
];
const HospitalStyle = () => {
  const [index, setIndex] = useState(0);

  const getVisibleCount = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return 1;
    return 2;
  };
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visible = hospitalStyle.slice(index, index + visibleCount);
  const prev = () => setIndex(i => (i - visibleCount + hospitalStyle.length) % hospitalStyle.length);
  const next = () => setIndex(i => (i + visibleCount) % hospitalStyle.length);

  return (
    <div className="flex flex-col items-center mt-6 sm:mt-8 md:mt-16 w-full px-2 sm:px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-6 sm:mb-7 md:mb-8 text-center w-full font-serif leading-tight">
        What Hospitals Say About MediLink
      </h2>
      <div className="relative flex flex-row gap-4 sm:gap-6 md:gap-8 w-full justify-center items-center px-8 sm:px-10 md:px-0">
        <button
          aria-label="Previous testimonials"
          onClick={prev}
          className="absolute -left-2 sm:-left-3 md:left-0 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-300 bg-white text-blue-700 text-2xl sm:text-3xl flex items-center justify-center shadow hover:bg-blue-50 flex-shrink-0"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          &#60;
        </button>
        {visible.map((t, idx) => (
          <div key={idx} className="w-full max-w-lg mx-2 sm:mx-3 md:mx-4">
            <SolutionTestimonial
              {...t}
              quoteClassName="italic mb-2 text-sm md:text-lg lg:text-xl"
              avatarClassName="w-40 h-40 md:w-56 md:h-56 object-cover"
            />
          </div>
        ))}
        <button
          aria-label="Next testimonials"
          onClick={next}
          className="absolute -right-2 sm:-right-3 md:right-0 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-blue-300 bg-white text-blue-700 text-2xl sm:text-3xl flex items-center justify-center shadow hover:bg-blue-50 flex-shrink-0"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          &#62;
        </button>
      </div>
    </div>
  );
};
export default HospitalStyle;