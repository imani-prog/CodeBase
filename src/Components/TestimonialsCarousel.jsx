/* eslint-disable no-unused-vars */
import { useState } from "react";
import SolutionTestimonial from "../Pages/solutions/SolutionTestimonial.jsx";
import PeterImg from "../assets/Brian Wekesa.jpeg";
import { default as AminaImg, default as EstherImg } from "../assets/Esther Nyambura.jpeg";
import GraceImg from "../assets/Grace Achieng.jpeg";
import SamuelImg from "../assets/Joseph Otieno.jpeg";
// ...existing code...

const testimonials = [
  {
    quote: "I used to travel miles for care, spending hours on the road and waiting in long queues at clinics. Now, with MediLink, I get professional help right at home. The app makes it so easy to connect with healthcare workers, and I feel safer knowing support is just a tap away. My family and I have never felt more cared for.",
    name: "Amina",
    role: "Patient",
    location: "Kisii County",
    avatar: AminaImg,
  },
  {
    quote: "Booking an ambulance was so easy with MediLink. The live tracking feature gave me peace of mind during an emergency, and the staff arrived quickly and were very professional. I could follow their route in real time, and my family was kept informed throughout. It truly made a stressful situation much more manageable.",
    name: "Peter",
    role: "Patient",
    location: "Nairobi",
    avatar: PeterImg,
  },
  {
    quote: "I paid with NHIF and got my prescription instantly through MediLink. There was no paperwork, no stress, and the process was so smooth. I even received reminders for my medication and follow-up appointments. This service has made managing my health so much easier and more convenient than ever before.",
    name: "Grace",
    role: "Patient",
    location: "Mombasa",
    avatar: GraceImg,
  },
  {
    quote: "The health tips and reminders I receive from MediLink keep me on track with my medication and appointments. I used to forget doses, but now I get timely notifications and advice tailored to my condition. It feels like having a personal health assistant, and my overall well-being has improved greatly.",
    name: "Samuel",
    role: "Patient",
    location: "Eldoret",
    avatar: SamuelImg,
  },
  {
    quote: "Telemedicine helped me get a quick consult when my child was sick late at night. We connected with a doctor in minutes, received a diagnosis, and got a prescription without leaving home. The support and care we received were outstanding, and it saved us a stressful trip to the hospital.",
    name: "Esther",
    role: "Patient",
    location: "Machakos",
    avatar: EstherImg,
  },
  {
    quote: "I love how easy it is to book home visits through MediLink. The community health workers are caring, professional, and always arrive on time. They answer all my questions and provide excellent follow-up care. This service has made a real difference in my life and my family's health.",
    name: "Lydia",
    role: "Patient",
    location: "Nakuru",
    avatar: EstherImg,
  },
  {
    quote: "MediLink made it possible for me to access specialist care from my rural home. I was able to consult with a cardiologist online, share my medical records securely, and get a treatment plan without traveling to the city. The convenience and quality of care exceeded my expectations.",
    name: "James",
    role: "Patient",
    location: "Bungoma",
    avatar: PeterImg,
  },
  {
    quote: "After my surgery, MediLink helped me schedule follow-up visits and track my recovery. The reminders and easy booking system meant I never missed an appointment. The nurses who visited were kind and knowledgeable, making my healing process smooth and stress-free.",
    name: "Mary",
    role: "Patient",
    location: "Nyeri",
    avatar: GraceImg,
  },
  {
    quote: "I was able to get mental health support through MediLink’s telemedicine service. The counselor listened to my concerns and provided practical advice. It was comforting to know I could reach out for help anytime, and my privacy was respected throughout.",
    name: "David",
    role: "Patient",
    location: "Kisumu",
    avatar: SamuelImg,
  },
  {
    quote: "My child needed urgent care, and MediLink connected us to a pediatrician within minutes. The doctor was thorough and reassuring, and we received a prescription right away. The whole process was efficient and gave us peace of mind during a worrying time.",
    name: "Rose",
    role: "Patient",
    location: "Kericho",
    avatar: EstherImg,
  },
  {
    quote: "Managing my diabetes has become much easier with MediLink. I get regular tips, reminders for check-ups, and can share my blood sugar readings with my doctor. The support has helped me stay healthy and avoid complications.",
    name: "Patrick",
    role: "Patient",
    location: "Nairobi",
    avatar: AminaImg,
  },
  {
    quote: "As a new mother, I found MediLink invaluable for postnatal care. I could easily book home visits, get advice on breastfeeding, and monitor my baby's health. The nurses were supportive and knowledgeable, making my transition into motherhood much smoother.",
    name: "Faith",
    role: "Patient",
    location: "Thika",
    avatar: GraceImg,
  },
  {
    quote: "I appreciate the follow-up care I received after my treatment. The nurses were always available to answer my questions and provide support. MediLink truly cares about its patients.",
    name: "Samuel",
    role: "Patient",
    location: "Kisii",
    avatar: SamuelImg,
  },
  {
    quote: "MediLink has made healthcare so much more accessible for me. I can consult with doctors from the comfort of my home, and the service is always reliable.",
    name: "Amina",
    role: "Patient",
    location: "Nairobi",
    avatar: AminaImg,
  },
  {
    quote: "As a new mother, I found MediLink invaluable for postnatal care. I could easily book home visits, get advice on breastfeeding, and monitor my baby's health. The nurses were supportive and knowledgeable, making my transition into motherhood much smoother.",
    name: "Faith",
    role: "Patient",
    location: "Thika",
    avatar: GraceImg,
  },
];

function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const maxIndex = testimonials.length - 2;
  const canPrev = index > 0;
  const canNext = index < maxIndex;

  return (
    <div className="w-full">
      <div className="text-center mb-2">
        <p className="text-base text-gray-700 max-w-2xl mx-auto mb-8">Discover how MediLink is transforming healthcare for real patients across Kenya. From telemedicine consults to home visits and easy access to specialists, these stories show the impact of digital health on everyday lives.</p>
      </div>
      <div className="flex items-center justify-center w-full">
        {/* Previous Button */}
        <button
          className={`mr-6 text-gray-400 text-4xl font-bold transition-colors duration-150 focus:outline-none ${canPrev ? "hover:text-blue-600" : "opacity-50 cursor-not-allowed"}`}
          style={{ background: "none", border: "none", width: "48px", height: "48px" }}
          onClick={() => setIndex(index - 2)}
          disabled={!canPrev}
          aria-label="Previous"
        >
          &#60;
        </button>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl overflow-hidden">
          {testimonials.slice(index, index + 2).map((t, i) => (
            <SolutionTestimonial
              key={t.name + t.location}
              quote={t.quote}
              name={t.name}
              role={t.role}
              location={t.location}
              avatar={t.avatar}
              className="p-4 md:p-10 min-h-[320px] w-full md:min-w-[400px] text-base md:text-lg"
            />
          ))}
        </div>
        {/* Next Button */}
        <button
          className={`ml-6 text-gray-400 text-4xl font-bold transition-colors duration-150 focus:outline-none ${canNext ? "hover:text-blue-600" : "opacity-50 cursor-not-allowed"}`}
          style={{ background: "none", border: "none", width: "48px", height: "48px" }}
          onClick={() => setIndex(index + 2)}
          disabled={!canNext}
          aria-label="Next"
        >
          &#62;
        </button>
      </div>
    </div>
  );
}

export default TestimonialsCarousel;
