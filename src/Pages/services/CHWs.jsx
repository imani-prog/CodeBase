import CommunityTogetherness from "../../assets/CommunityTogetherness.jpg";
import CommunityWorkerOutreach from "../../assets/CommunityWorkerOutreach.jpeg";
import WorkersTogetherness from "../../assets/WorkersTogetherness3.jpeg";

const List = ({ items, textSize = "text-base", checkColor = "text-blue-400", white = false }) => (
  <ul className={`list-none space-y-2 sm:space-y-3 mb-2 ${textSize} ${white ? "text-white" : "text-blue-900"}`}>
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start px-2">
        <span className={`${checkColor} mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0`}>✓</span>
        <span className="leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

const ImageCard = ({ src, alt, reverse, shadow }) => (
  <div className={`flex justify-center items-center h-full ${reverse ? "order-1 md:order-2" : ""}`}>
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-[200px] sm:h-[240px] md:h-[300px] lg:h-[350px] object-cover rounded-lg sm:rounded-xl border border-blue-200 shadow-md sm:shadow-lg"
      style={{ boxShadow: shadow }}
    />
  </div>
);

const ContentCard = ({ title, children, reverse }) => (
  <div className={`flex flex-col justify-center h-full ${reverse ? "order-2 md:order-1 md:pl-4" : "md:pr-4"}`}>
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-2 sm:mb-3 md:mb-4 font-serif px-2">{title}</h2>
    {children}
  </div>
);

const CHWs = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50 overflow-x-hidden">
      <main className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 max-w-[1200px] mx-auto">

        {/* Header */}
        <section className="mb-6 sm:mb-7 md:mb-8 w-full flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-serif text-blue-900 mb-4 sm:mb-5 md:mb-6 text-center leading-tight px-2">
            Community Health Worker Services
          </h1>
          <p className="text-sm sm:text-base md:text-lg w-full text-center px-2 leading-relaxed">
            Community Health Workers (CHWs) play a vital role in MediLink's outreach, connecting patients to care and support in their communities. Our platform equips CHWs with digital tools, training, and resources to deliver compassionate healthcare in homes and villages.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:gap-8 w-full">

          {/* Mobile Outreach & Home Visits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full mb-2 p-4 sm:p-6 md:p-8 items-center">
            <ContentCard title="Mobile Outreach & Home Visits">
              <List
                textSize="text-xs sm:text-sm md:text-base"
                items={[
                  "Track and manage home visits",
                  "Digitally-enabled CHWs for better care and faster response",
                  "Emergency support and referrals",
                  "Health screenings and basic diagnostics at home",
                  "Medication delivery and follow-up care",
                  "Community health education and awareness",
                  "Support for elderly and vulnerable patients"
                ]}
              />
              <p className="mt-2 sm:mt-3 text-blue-900 text-xs sm:text-sm md:text-base px-2 leading-relaxed">
                Our mobile outreach program brings essential healthcare directly to patients' homes, especially in remote and underserved areas. CHWs use digital tools to coordinate visits, monitor patient progress, and respond quickly to emergencies. This approach reduces barriers to care, improves health outcomes, and strengthens community trust in healthcare services.
              </p>
              <p className="italic text-blue-600 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base px-2 leading-relaxed">"Empowering CHWs means empowering communities."</p>
            </ContentCard>
            <ImageCard
              src={CommunityWorkerOutreach}
              alt="Mobile Outreach"
              shadow="-8px 8px 0px rgba(59,130,246,0.3), -16px 16px 0px rgba(59,130,246,0.2), -24px 24px 0px rgba(59,130,246,0.1), -32px 32px 20px rgba(0,0,0,0.1)"
            />
          </div>
          {/* E-learning & Certification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full mb-2 p-4 sm:p-6 md:p-8 items-center">
            <div className="flex justify-center items-center h-full">
              <iframe
                width="100%"
                src="https://www.youtube.com/embed/cM4aep7VXb8"
                title="E-learning for CHWs"
                loading="lazy"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full min-h-[200px] sm:min-h-[240px] md:min-h-[300px] lg:min-h-[350px] rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-blue-200"
                style={{ aspectRatio: '16/9' }}
              ></iframe>
            </div>
            <ContentCard title="E-learning & Certification" reverse>
              <List
                textSize="text-xs sm:text-sm md:text-base lg:text-lg"
                items={[
                  "E-learning courses for CHWs",
                  "Certification tracking for CHW growth",
                  "Maternal, child, chronic illness education",
                  "Interactive webinars and workshops",
                  "Peer-to-peer learning and support groups",
                  "Practical skills for preventive care and nutrition",
                  "Access to expert advice and mentorship"
                ]}
              />
              <p className="mt-2 sm:mt-3 text-blue-900 text-xs sm:text-sm md:text-base lg:text-lg px-2 leading-relaxed">
                Our E-learning & Certification program empowers CHWs to continuously grow their skills and knowledge. Through interactive courses, workshops, and expert mentorship, CHWs gain practical tools for patient care, health education, and community engagement. The platform supports lifelong learning, professional development, and collaboration among health workers.
              </p>
              <p className="italic text-blue-600 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base lg:text-lg px-2 leading-relaxed">"Learn. Apply. Thrive."</p>
            </ContentCard>
          </div>

          {/* Financial Empowerment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full mb-2 p-4 sm:p-6 md:p-8 items-center">
            <ContentCard title="Financial Empowerment">
              <List
                textSize="text-xs sm:text-sm md:text-base lg:text-lg"
                items={[
                  "Stable income through digital bookings",
                  "Mobile wallet payments (M-Pesa, etc.)",
                  "Transparent earnings and impact tracking",
                  "Financial literacy and savings support",
                  "Access to microloans and incentives",
                  "Recognition for community impact"
                ]}
              />
              <p className="mt-2 sm:mt-3 text-blue-900 text-xs sm:text-sm md:text-base lg:text-lg px-2 leading-relaxed">
                MediLink's Financial Empowerment program ensures CHWs receive fair compensation, timely payments, and opportunities for growth. With digital tools for tracking earnings, financial literacy resources, and access to incentives, CHWs can focus on serving their communities while building a stable future.
              </p>
              <p className="italic text-blue-600 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base lg:text-lg px-2 leading-relaxed">
                "CHWs deserve dignity, respect, and fair compensation."
              </p>
            </ContentCard>
            <ImageCard
              src={CommunityTogetherness}
              alt="Community Togetherness"
              shadow="-8px 8px 0px rgba(59,130,246,0.3), -16px 16px 0px rgba(59,130,246,0.2), -24px 24px 0px rgba(59,130,246,0.1), -32px 32px 20px rgba(0,0,0,0.1)"
              reverse
            />
          </div>
        </div>

        {/* Closing Section with Background */}
        <div className="relative w-full overflow-hidden flex items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
          <img
            src={WorkersTogetherness}
            alt="CHW Purpose Background"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div
            className="absolute inset-0 w-full h-full z-10"
            style={{
              background: "linear-gradient(135deg, rgba(0,40,120,0.7) 0%, rgba(0,180,200,0.5) 60%, rgba(255,255,255,0.2) 100%)"
            }}
          ></div>
          <div className="relative z-20 w-full h-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 py-8 sm:py-9 md:py-10">
            <div className="rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 max-w-2xl w-full bg-transparent">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-3 sm:mb-4 text-center drop-shadow-lg font-serif px-2">
                Serving CHWs with Purpose
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white text-center mb-3 sm:mb-4 drop-shadow-lg px-2 leading-relaxed">
                MediLink listens to CHWs and builds tools they actually use and love. Every feature is designed to make their work easier, safer, and more impactful.
              </p>
              <List
                white
                textSize="text-xs sm:text-sm md:text-base lg:text-lg"
                checkColor="text-blue-200"
                items={[
                  "Co-designed features with CHW feedback",
                  "Focus on safety, dignity, and impact",
                  "Continuous improvement based on real needs",
                  "Tools for easier reporting and communication"
                ]}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CHWs;
