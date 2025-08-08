
import BrianWekesa from "../../assets/Brian Wekesa.jpeg";
import EstherNyambura from "../../assets/Esther Nyambura.jpeg";
import GraceAchieng from "../../assets/Grace Achieng.jpeg";
import JosephOtieno from "../../assets/Joseph Otieno.jpeg";
import KevinMurage from "../../assets/Kevin Murage.jpeg";
import LindaWambui from "../../assets/LindaWambui.jpeg";
import MuthomiNjuki from "../../assets/Muthomi Njuki.jpeg";
import PeterNjoroge from "../../assets/PeterNjoroge.jpeg";
import StaffMembersTeam from "../../assets/StaffMembersTeam.jpeg";
import SusanMwangi from "../../assets/Susan Mwangi.jpeg";
import TimothyImani from "../../assets/Timothy Imani.jpeg";

import TeamSection from "../../Components/TeamSection";
import AdvisoryBoard from "../../Components/AdvisoryBoard";

const Team = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      
      

      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        {/* Intro Section */}
        <section className="w-full flex flex-col items-center mb-10">
          <div className="text-center w-full">
            <h1 className="text-5xl font-serif font-extrabold text-blue-900 mb-2 leading-tight">
              The Team Behind MediLink
            </h1>
            <img
              src={StaffMembersTeam}
              alt="MediLink Team Group"
              className="w-full h-auto rounded-2xl shadow-lg object-cover mb-4"
              style={{ maxHeight: '540px' }}
            />
            <p className="text-lg font-medium">
              Meet the passionate team, that is united in one mission to transform healthcare through innovation and collaboration.
            </p>
            <p className="text-lg font-medium">
              Together, we are committed to making a difference in the lives of those we serve.
            </p>
          </div>
        </section>

        {/* Reusable Sections */}
        <TeamSection
          title="Founders & Leadership"
          members={[
            {
              name: "Timothy Imani",
              title: "Founder & CEO",
              image: TimothyImani,
              desc: "Visionary technologist with a heart for social impact. Leads platform vision rooted in African needs."
            },
            {
              name: "Dr. Susan Mwangi",
              title: "Chief Medical Officer",
              image: SusanMwangi,
              desc: "Public health expert with 15+ years experience. Ensures medical ethics and Kenya healthcare standards."
            },
            {
              name: "Joseph Otieno",
              title: "Head of Technology",
              image: JosephOtieno,
              desc: "Full-stack engineer and systems architect. Scales backend for fast, secure, future-ready platform."
            },
            {
              name: "Muthomi Njuki",
              title: "Backend Developer & Data Analyst",
              image: MuthomiNjuki,
              desc: "Backend development and data science specialist. Creates robust, scalable, data-driven solutions."
            },
          ]}
        />

        <TeamSection
          title="Community & Health Operations"
          members={[
            {
              name: "Grace Achieng",
              title: "Community Health Worker Lead",
              image: GraceAchieng,
              desc: "Certified CHW bridging technology and rural reality. Shapes tools CHWs actually use and love."
            },
            {
              name: "Peter Njoroge",
              title: "Training & Outreach Coordinator",
              image: PeterNjoroge,
              desc: "Leads clinic and CHW onboarding. Oversees e-learning initiatives and works with counties and KMTCs."
            },
            {
              name: "Linda Wambui",
              title: "Product Designer & UX Lead",
              image: LindaWambui,
              desc: "Crafts mobile-first, accessible interfaces with Swahili language support for CHWs and rural users."
            },
            {
              name: "Kevin Murage",
              title: "Frontend Developer",
              image: KevinMurage,
              desc: "Builds fast, responsive portals using React and Tailwind for seamless experience on slow connections."
            },
          ]}
        />

        <TeamSection
          title="Product & Design"
          members={[
            {
              name: "Linda Wambui",
              title: "Product Designer & UX Lead",
              image: LindaWambui,
              desc: "Crafts mobile-first, accessible interfaces with Swahili language support for CHWs and rural users."
            },
            {
              name: "Kevin Murage",
              title: "Frontend Developer",
              image: KevinMurage,
              desc: "Builds fast, responsive portals using React and Tailwind for seamless experience on slow connections."
            },
            {
              name: "Timothy Imani",
              title: "Founder & CEO",
              image: TimothyImani,
              desc: "Visionary technologist with a heart for social impact. Leads platform vision rooted in African needs."
            },
            {
              name: "Dr. Susan Mwangi",
              title: "Chief Medical Officer",
              image: SusanMwangi,
              desc: "Public health expert with 15+ years experience. Ensures medical ethics and Kenya healthcare standards."
            },
          ]}
        />

        <TeamSection
          title="Finance, Partnerships & Compliance"
          members={[
            {
              name: "Esther Nyambura",
              title: "Head of Finance & Partnerships",
              image: EstherNyambura,
              desc: "Drives financial sustainability, NGO engagement, and grants. Tracks donations and impact metrics."
            },
            {
              name: "Brian Wekesa",
              title: "Compliance & Data Protection Officer",
              image: BrianWekesa,
              desc: "Ensures GDPR and Kenya Data Protection Act compliance. Works with legal advisors and health regulators."
            },
            {
              name: "Dr. Aisha Abdi",
              title: "Head of Compliance & Ethics",
              image: EstherNyambura,
              desc: "Leads compliance initiatives and ensures ethical standards across all operations."
            },
            {
              name: "Timothy Imani",
              title: "Founder & CEO",
              image: TimothyImani,
              desc: "Visionary technologist with a heart for social impact. Leads platform vision rooted in African needs."
            }
          ]}
        />

        <AdvisoryBoard />
      </main>

      
    </div>
  );
};

export default Team;
