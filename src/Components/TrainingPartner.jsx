import MinistryOfHealthImg from "../assets/MinistryOfHealth.png";
import WorldHealthOrgImg from "../assets/WorldHealthOrganisation22.webp";
import KMTCImg from "../assets/KMTC2.webp";
import ClinicalPartnersImg from "../assets/ClinicalPartners2.webp";
import OnlineTrainingImg from "../assets/OnlineTraining11.webp";
import HealthWorkShopImg from "../assets/HealthWorkShop.webp";
import ClinicalPlacementsImg from "../assets/ClinicalPlacements11.webp";

const partners = [
  { img: MinistryOfHealthImg, alt: "Ministry of Health Kenya", title: "Ministry of Health Kenya", desc: "Official recognition and curriculum approval" },
  { img: WorldHealthOrgImg, alt: "World Health Organization", title: "World Health Organization", desc: "WHO standards compliance and guidelines" },
  { img: KMTCImg, alt: "Kenya Medical Training Colleges", title: "Kenya Medical Training Colleges", desc: "Continuing education credits and pathways" },
  { img: ClinicalPartnersImg, alt: "Clinical Partners Network", title: "Clinical Partners Network", desc: "15+ hospitals and health centers" }
];

const trainings = [
  {
    img: OnlineTrainingImg,
    alt: "Online Learning",
    badge: "Certified Training",
    title: "Online Learning",
    desc: "Interactive online modules, virtual simulations, and digital assessments accessible 24/7. Learn at your own pace with our advanced learning management system.",
    tags: ["Virtual Sessions", "24/7 Access"],
    reverse: false,
    shadow: `8px 8px 0px rgba(59, 130, 246, 0.3), 16px 16px 0px rgba(59, 130, 246, 0.2), 24px 24px 0px rgba(59, 130, 246, 0.1), 32px 32px 20px rgba(0, 0, 0, 0.1)`
  },
  {
    img: HealthWorkShopImg,
    alt: "In-Person Workshops",
    badge: "Expert Instructors",
    title: "In-Person Workshops",
    desc: "Hands-on practical sessions, group discussions, and peer-to-peer learning experiences. Interactive workshops led by healthcare professionals.",
    tags: ["Group Sessions", "Hands-on Practice"],
    reverse: true,
    shadow: `-8px 8px 0px rgba(59, 130, 246, 0.3), -16px 16px 0px rgba(59, 130, 246, 0.2), -24px 24px 0px rgba(59, 130, 246, 0.1), -32px 32px 20px rgba(0, 0, 0, 0.1)`
  },
  {
    img: ClinicalPlacementsImg,
    alt: "Clinical Placements",
    badge: "Career Support",
    title: "Clinical Placements",
    desc: "Real-world experience in healthcare facilities with mentorship and supervised practice. Build professional networks and gain practical skills.",
    tags: ["Real Experience", "Mentorship"],
    reverse: false,
    shadow: `8px 8px 0px rgba(59, 130, 246, 0.3), 16px 16px 0px rgba(59, 130, 246, 0.2), 24px 24px 0px rgba(59, 130, 246, 0.1), 32px 32px 20px rgba(0, 0, 0, 0.1)`
  }
];

const TrainingPartner = () => (
  <section className="py-16 bg-blue-50">
    <div className="max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 font-serif">
          Trusted Partnerships & Accreditations
        </h2>
        <p className="text-xl text-black max-w-3xl mx-auto">
          Our training programs are developed in collaboration with leading
          healthcare institutions and recognized by major accrediting bodies
        </p>
      </div>

      {/* Partner Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
        {partners.map(({ img, alt, title, desc }) => (
          <div key={title} className="p-6 lg:p-8 text-center">
            <div className="mb-4 lg:mb-6 flex justify-center">
              <img src={img} alt={alt} className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 object-contain" />
            </div>
            <h3 className="font-semibold mb-2 text-lg lg:text-xl text-blue-600 font-serif">{title}</h3>
            <p className="text-sm lg:text-base">{desc}</p>
          </div>
        ))}
      </div>

      {/* Training Delivery Methods */}
      <div className="p-8">
        <h3 className="text-3xl font-bold text-center mb-8 font-serif text-black">
          Training Delivery Methods
        </h3>
        <div className="space-y-8">
          {trainings.map(({ img, alt, badge, title, desc, tags, reverse, shadow }) => (
            <div key={title} className={`p-6 flex flex-col md:flex-row${reverse ? "-reverse" : ""} items-center gap-30`}>
              <div className="md:w-1/2">
                <img src={img} alt={alt} className="w-full h-48 md:h-56 object-cover rounded-lg" style={{ boxShadow: shadow }} />
              </div>
              <div className="md:w-1/2">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">{badge}</div>
                <h4 className="text-2xl font-bold text-blue-500 font-serif mb-4">{title}</h4>
                <p className="text-gray-700 leading-relaxed mb-4">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TrainingPartner;
