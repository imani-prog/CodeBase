import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";
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

const Team = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <Navbar />
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="w-full flex flex-col items-center mb-10">
          
          <div className="text-center w-full">
            <h1 className="text-5xl font-extrabold text-blue-900 mb-2 leading-tight">The Team Behind MediLink</h1>
            <img src={StaffMembersTeam} alt="MediLink Team Group"
              className="w-full h-auto rounded-2xl shadow-lg object-cover mb-4"
              style={{ maxHeight: '540px', width: '100%', marginLeft: 0, marginRight: 0 }}
            />
            <p className="text-lg font-medium">Meet the passionate team, that is united in one mission to transform healthcare through innovation and collaboration.</p>
            <p className="text-lg font-medium">Together, we are committed to making a difference in the lives of those we serve.</p>
          </div>
        </section>
        <section className="mb-10 w-full bg-blue-50 text-left">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Founders & Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <img src={TimothyImani} alt="Timothy Imani" className="w-16 h-16 mb-3 rounded-full object-cover border" />
              <span className="font-bold text-blue-900">Timothy Imani – Founder & CEO</span>
              <p className="text-center">Visionary technologist with a heart for social impact. Timothy leads the vision of building a healthtech platform that’s deeply rooted in African needs, culture, and sustainability.</p>
              <button className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition">View Profile</button>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <img src={SusanMwangi} alt="Dr. Susan Mwangi" className="w-16 h-16 mb-3 rounded-full object-cover border" />
              <span className="font-bold text-blue-900">Dr. Susan Mwangi – Chief Medical Officer</span>
              <p className="text-center">A public health expert with over 15 years in community health systems, Dr. Susan ensures all MediLink features and workflows align with medical ethics, efficiency, and Kenya’s healthcare standards.</p>
              <button className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition">View Profile</button>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <img src={JosephOtieno} alt="Joseph Otieno" className="w-16 h-16 mb-3 rounded-full object-cover border" />
              <span className="font-bold text-blue-900">Joseph Otieno – Head of Technology</span>
              <p className="text-center">Full-stack engineer and systems architect. Joseph is responsible for scaling MediLink’s backend and making the platform fast, secure, and future-ready.</p>
              <button className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition">View Profile</button>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <img src={MuthomiNjuki} alt="Muthomi Njuki" className="w-16 h-16 mb-3 rounded-full object-cover border" />
              <span className="font-bold text-blue-900">Muthomi Njuki – Backend Developer & Data Analyst/Scientist</span>
              <p className="text-center">Muthomi specializes in backend development, data analysis, and data science. He ensures MediLink’s systems are robust, scalable, and data-driven for impactful healthcare solutions.</p>
              <button className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition">View Profile</button>
            </div>
          </div>
        </section>


        {/* Community & Health Operations */}
        <section className="mb-10 w-full bg-blue-50 text-left">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Community & Health Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <img src={GraceAchieng} alt="Grace Achieng" className="w-16 h-16 mb-3 rounded-full object-cover border" />
              <span className="font-bold text-blue-900">Grace Achieng – Community Health Worker Lead</span>
              <p className="text-center">A certified CHW who bridges the gap between technology and rural reality. She represents the voice of the field, helping shape tools CHWs actually use and love.</p>
              <button className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition">View Profile</button>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <img src={PeterNjoroge} alt="Peter Njoroge" className="w-16 h-16 mb-3 rounded-full object-cover border" />
              <span className="font-bold text-blue-900">Peter Njoroge – Training & Outreach Coordinator</span>
              <p className="text-center">Leads onboarding of clinics, hospitals, and CHWs. Peter also oversees MediLink’s e-learning initiatives and works closely with counties and KMTCs.</p>
              <button className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition">View Profile</button>
            </div>
          </div>
        </section>


        {/* Product & Design */}
        <section className="mb-10 w-full bg-blue-50 text-left">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Product & Design</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <img src={LindaWambui} alt="Linda Wambui" className="w-16 h-16 mb-3 rounded-full object-cover border" />
              <span className="font-bold text-blue-900">Linda Wambui – Product Designer & UX Lead</span>
              <p className="text-center">Crafts interfaces that are mobile-first, accessible, and culturally relevant—often incorporating Swahili language and simple workflows tailored for CHWs and rural users.</p>
              <button className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition">View Profile</button>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <img src={KevinMurage} alt="Kevin Murage" className="w-16 h-16 mb-3 rounded-full object-cover border" />
              <span className="font-bold text-blue-900">Kevin Murage – Frontend Developer</span>
              <p className="text-center">Builds fast, responsive portals using React and Tailwind to ensure seamless experience across devices, even on slow connections.</p>
              <button className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition">View Profile</button>
            </div>
          </div>
        </section>


        {/* Finance, Partnerships & Compliance */}
        <section className="mb-10 w-full bg-blue-50 text-left">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Finance, Partnerships & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <img src={EstherNyambura} alt="Esther Nyambura" className="w-16 h-16 mb-3 rounded-full object-cover border" />
              <span className="font-bold text-blue-900">Esther Nyambura – Head of Finance & Partnerships</span>
              <p className="text-center">Drives financial sustainability, NGO engagement, and grant applications. Esther also tracks donations, impact metrics, and transparency reports.</p>
              <button className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition">View Profile</button>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <img src={BrianWekesa} alt="Brian Wekesa" className="w-16 h-16 mb-3 rounded-full object-cover border" />
              <span className="font-bold text-blue-900">Brian Wekesa – Compliance & Data Protection Officer</span>
              <p className="text-center">Ensures MediLink remains GDPR and Kenya Data Protection Act compliant. Brian works with legal advisors and health regulators.</p>
              <button className="mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition">View Profile</button>
            </div>
          </div>
        </section>


        {/* Advisory Board */}
        <section className="mb-0 w-full bg-blue-50 text-left">
          <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">Advisory Board</h2>
          <p className="mb-4 text-center text-lg">MediLink is advised by a diverse group of experts and organizations, ensuring our platform is innovative, secure, and impactful.</p>
          <div className="w-full flex justify-center">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl text-center">
              <li className="bg-white rounded-lg shadow p-3 font-semibold text-blue-900">Ministry of Health (Kenya)</li>
              <li className="bg-white rounded-lg shadow p-3 font-semibold text-blue-900">NHIF/SHA Representatives</li>
              <li className="bg-white rounded-lg shadow p-3 font-semibold text-blue-900">Red Cross Kenya</li>
              <li className="bg-white rounded-lg shadow p-3 font-semibold text-blue-900">AMREF / KMTC</li>
              <li className="bg-white rounded-lg shadow p-3 font-semibold text-blue-900">African Digital Health Network</li>
              <li className="bg-white rounded-lg shadow p-3 font-semibold text-blue-900">Oracle</li>
              <li className="bg-white rounded-lg shadow p-3 font-semibold text-blue-900">Microsoft</li>
              <li className="bg-white rounded-lg shadow p-3 font-semibold text-blue-900">Google Health</li>
              <li className="bg-white rounded-lg shadow p-3 font-semibold text-blue-900">IBM Watson Health</li>
              <li className="bg-white rounded-lg shadow p-3 font-semibold text-blue-900">Other leading tech companies</li>
              <li className="bg-white rounded-lg shadow p-3 font-semibold text-blue-900">Kenya Medical Research Institute (KEMRI)</li>
              <li className="bg-white rounded-lg shadow p-3 font-semibold text-blue-900">World Health Organization (WHO)</li>
            </ul>
          </div>
          <p className="mt-6 text-center text-base">Their mentorship and partnership ensure MediLink is aligned with global standards, real-world impact, and future-ready technology.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
