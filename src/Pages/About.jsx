import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";

const About = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <Navbar />
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="w-full flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center leading-tight">About <span className="text-blue-500">MediLink</span></h1>
        </section>
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 text-left">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Our Story</h2>
          <p className="text-lg text-blue-700 mb-4">MediLink was born from a deep understanding of the challenges many African communities face when trying to access timely and quality healthcare. In rural and underserved areas, distance, cost, lack of infrastructure, and limited staffing continue to be barriers to life-saving care.</p>
          <p className="text-lg text-blue-700 mb-4">Founded by a group of passionate technologists, medical professionals, and community leaders, MediLink is more than a platform—it is a movement. A movement to ensure that no one is left behind due to where they live, how much they earn, or the resources available around them.</p>
          <p className="text-lg text-blue-700 mb-4">We saw the power of community health workers (CHWs)—often the first and only link to care in remote areas—and we asked: <span className="font-semibold text-blue-800">What if we could supercharge their impact with digital tools?</span><br/>What if every citizen, from urban centers to remote villages, could connect to care, support, education, and emergency help through their phone?</p>
          <p className="text-lg text-blue-700 mb-4">With this vision, MediLink was created—a centralized digital health platform that brings together:</p>
          <ul className="list-disc list-inside text-blue-700 ml-6 mb-4">
            <li>Patients seeking care, education, or emergency support</li>
            <li>Clinics and hospitals aiming to serve better and smarter</li>
            <li>CHWs on the frontlines delivering care in homes and villages</li>
            <li>Governments and NGOs driving public health policy and outreach</li>
            <li>Donors and partners committed to sustainable health solutions</li>
          </ul>
          <p className="text-lg text-blue-700 mb-4">Through real-time bookings, home visits, insurance claims, and secure health data access, MediLink brings healthcare within reach. Whether it's an elderly patient requesting a home visit, a mother seeking health tips via SMS, or a clinic managing dozens of patient referrals, MediLink provides the digital backbone.</p>
        </section>
        {/* Why We Exist */}
        <section className="mb-10 w-full bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 text-left">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">🌍 Why We Exist</h2>
          <ul className="list-disc list-inside text-blue-700 ml-6 mb-4">
            <li>To reduce maternal and child mortality through faster access to trained health workers</li>
            <li>To empower CHWs with tools, training, and income</li>
            <li>To streamline health systems and reduce hospital congestion</li>
            <li>To help governments and NGOs make data-driven decisions</li>
            <li>To create a transparent and sustainable digital health ecosystem</li>
          </ul>
        </section>
        {/* Built for the Community, by the Community */}
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 text-left">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">🫂 Built for the Community, by the Community</h2>
          <p className="text-lg text-blue-700">Every line of code, every partnership, every feature is designed with real feedback from patients, CHWs, and clinics. We continuously listen, adapt, and evolve to ensure MediLink truly serves its people.</p>
        </section>
        <section className="mb-10 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col items-start">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Mission</h2>
            <p className="text-lg text-blue-700">To revolutionize healthcare access in Africa by connecting communities, clinics, and caregivers through a smart digital platform that simplifies access to quality, affordable, and timely medical services.</p>
          </div>
          <div className="bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col items-start">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Vision</h2>
            <p className="text-lg text-blue-700">A healthy and empowered Africa where every citizen can access quality care, anytime, anywhere.</p>
          </div>
        </section>
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-blue-100 rounded-xl p-6 shadow text-lg text-blue-700 font-medium">Compassionate Care</div>
            <div className="bg-blue-100 rounded-xl p-6 shadow text-lg text-blue-700 font-medium">Integrity</div>
            <div className="bg-blue-100 rounded-xl p-6 shadow text-lg text-blue-700 font-medium">Accessibility</div>
            <div className="bg-blue-100 rounded-xl p-6 shadow text-lg text-blue-700 font-medium">Innovation</div>
            <div className="bg-blue-100 rounded-xl p-6 shadow text-lg text-blue-700 font-medium">Accountability</div>
            <div className="bg-blue-100 rounded-xl p-6 shadow text-lg text-blue-700 font-medium">Community Empowerment</div>
            <div className="bg-blue-100 rounded-xl p-6 shadow text-lg text-blue-700 font-medium">Inclusivity</div>
          </div>
        </section>
        {/* The Team Behind MediLink */}
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">The Team Behind MediLink</h2>
          <p className="text-lg text-blue-700 mb-6">At MediLink, we believe that real change happens when people from different walks of life come together with a shared purpose—to transform healthcare for everyone. Our team is a passionate blend of technologists, healthcare workers, researchers, community leaders, and young innovators who are deeply committed to empowering Africa through digital health.</p>
          {/* Founders & Leadership */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">👨🏽‍💼 Founders & Leadership</h3>
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
          </div>
          {/* Community & Health Operations */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">🧑🏾‍⚕️ Community & Health Operations</h3>
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
          </div>
          {/* Product & Design */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">👩🏽‍💻 Product & Design</h3>
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
          </div>
          {/* Finance, Partnerships & Compliance */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">📊 Finance, Partnerships & Compliance</h3>
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
          </div>
          {/* Advisory Board */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">🧠 Advisory Board</h3>
            <p className="text-blue-700 mb-4">MediLink is advised by a group of experts from:</p>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-4">
              <li>Ministry of Health (Kenya)</li>
              <li>NHIF/SHA Representatives</li>
              <li>Red Cross Kenya</li>
              <li>AMREF / KMTC</li>
              <li>African Digital Health Network</li>
            </ul>
            <p className="text-blue-700">Their mentorship ensures the platform is aligned with real-world impact, policy, and scale.</p>
          </div>
          {/* Impact Statement */}
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">💙 Together, We’re Building:</h3>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-4">
              <li>A connected healthcare ecosystem</li>
              <li>Jobs and dignity for CHWs</li>
              <li>Health equity for all citizens</li>
              <li>A platform Africa can proudly call its own</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
