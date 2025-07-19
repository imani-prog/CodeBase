import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";

const CHWs = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <Navbar />
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="mb-10 w-full bg-blue-100 rounded-3xl shadow-xl border border-blue-200 p-10 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center leading-tight">CHW Services</h1>
          <p className="text-lg text-blue-700 text-center max-w-3xl">Community Health Workers (CHWs) are the backbone of MediLink’s outreach. Our platform equips CHWs with digital tools, training, and support to deliver care in homes and villages.</p>
        </section>
        <div className="grid grid-cols-1 gap-8 w-full">
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">🏍️ Mobile Outreach & Home Visits</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Track and manage home visits</li>
              <li>Digitally-enabled CHWs for better care and faster response</li>
              <li>Emergency support and referrals</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Empowering CHWs means empowering communities."</p>
          </div>
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">📚 E-learning & Certification</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>E-learning courses for CHWs</li>
              <li>Certification tracking for CHW growth</li>
              <li>Maternal, child, chronic illness education</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"Learn. Apply. Thrive."</p>
          </div>
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col mb-2">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">💳 Financial Empowerment</h2>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Stable income through digital bookings</li>
              <li>Mobile wallet payments (M-Pesa, etc.)</li>
              <li>Transparent earnings and impact tracking</li>
            </ul>
            <p className="italic text-blue-600 mt-2">"CHWs deserve dignity, respect, and fair compensation."</p>
          </div>
        </div>
        <section className="mt-10 w-full bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🌍 Serving CHWs with Purpose</h2>
          <p className="text-lg text-blue-700">MediLink listens to CHWs and builds tools they actually use and love. Every feature is designed to make their work easier, safer, and more impactful.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CHWs;
