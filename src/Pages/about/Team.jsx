import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";

const Team = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <Navbar />
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="w-full flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center leading-tight">The Team Behind MediLink</h1>
        </section>
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 text-left">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Founders & Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 rounded-xl p-6 shadow">
              <span className="font-bold text-blue-900">Timothy Imani – Founder & CEO</span>
              <p className="text-blue-700">Visionary technologist with a heart for social impact. Timothy leads the vision of building a healthtech platform that’s deeply rooted in African needs, culture, and sustainability.</p>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 shadow">
              <span className="font-bold text-blue-900">Dr. Susan Mwangi – Chief Medical Officer</span>
              <p className="text-blue-700">A public health expert with over 15 years in community health systems, Dr. Susan ensures all MediLink features and workflows align with medical ethics, efficiency, and Kenya’s healthcare standards.</p>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 shadow">
              <span className="font-bold text-blue-900">Joseph Otieno – Head of Technology</span>
              <p className="text-blue-700">Full-stack engineer and systems architect. Joseph is responsible for scaling MediLink’s backend and making the platform fast, secure, and future-ready.</p>
            </div>
          </div>
        </section>
        {/* Community & Health Operations */}
        <section className="mb-10 w-full bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 text-left">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Community & Health Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 rounded-xl p-6 shadow">
              <span className="font-bold text-blue-900">Grace Achieng – Community Health Worker Lead</span>
              <p className="text-blue-700">A certified CHW who bridges the gap between technology and rural reality. She represents the voice of the field, helping shape tools CHWs actually use and love.</p>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 shadow">
              <span className="font-bold text-blue-900">Peter Njoroge – Training & Outreach Coordinator</span>
              <p className="text-blue-700">Leads onboarding of clinics, hospitals, and CHWs. Peter also oversees MediLink’s e-learning initiatives and works closely with counties and KMTCs.</p>
            </div>
          </div>
        </section>
        {/* Product & Design */}
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 text-left">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Product & Design</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 rounded-xl p-6 shadow">
              <span className="font-bold text-blue-900">Linda Wambui – Product Designer & UX Lead</span>
              <p className="text-blue-700">Crafts interfaces that are mobile-first, accessible, and culturally relevant—often incorporating Swahili language and simple workflows tailored for CHWs and rural users.</p>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 shadow">
              <span className="font-bold text-blue-900">Kevin Murage – Frontend Developer</span>
              <p className="text-blue-700">Builds fast, responsive portals using React and Tailwind to ensure seamless experience across devices, even on slow connections.</p>
            </div>
          </div>
        </section>
        {/* Finance, Partnerships & Compliance */}
        <section className="mb-10 w-full bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 text-left">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Finance, Partnerships & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 rounded-xl p-6 shadow">
              <span className="font-bold text-blue-900">Esther Nyambura – Head of Finance & Partnerships</span>
              <p className="text-blue-700">Drives financial sustainability, NGO engagement, and grant applications. Esther also tracks donations, impact metrics, and transparency reports.</p>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 shadow">
              <span className="font-bold text-blue-900">Brian Wekesa – Compliance & Data Protection Officer</span>
              <p className="text-blue-700">Ensures MediLink remains GDPR and Kenya Data Protection Act compliant. Brian works with legal advisors and health regulators.</p>
            </div>
          </div>
        </section>
        {/* Advisory Board */}
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 text-left">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Advisory Board</h2>
          <p className="text-blue-700 mb-4">MediLink is advised by a group of experts from:</p>
          <ul className="list-disc list-inside text-blue-700 ml-6 mb-4">
            <li>Ministry of Health (Kenya)</li>
            <li>NHIF/SHA Representatives</li>
            <li>Red Cross Kenya</li>
            <li>AMREF / KMTC</li>
            <li>African Digital Health Network</li>
          </ul>
          <p className="text-blue-700">Their mentorship ensures the platform is aligned with real-world impact, policy, and scale.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
