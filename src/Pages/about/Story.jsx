import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";

const Story = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <Navbar />
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="w-full flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center leading-tight">Our Story</h1>
        </section>
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 text-left">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">A Problem-Driven Approach</h2>
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
          <div className="mt-6">
            <h3 className="text-xl font-bold text-blue-700 mb-2">Our Impact</h3>
            <p className="text-blue-700 mb-2">Since our inception, MediLink has:</p>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-4">
              <li>Connected thousands of patients to care in remote areas</li>
              <li>Enabled hundreds of CHWs to earn a stable income and access training</li>
              <li>Helped clinics and hospitals manage patient flow and referrals more efficiently</li>
              <li>Supported government and NGO health campaigns with real-time data</li>
            </ul>
            <h3 className="text-xl font-bold text-blue-700 mb-2">A Vision for the Future</h3>
            <p className="text-blue-700">We are committed to expanding our reach, deepening our impact, and continuously innovating to solve Africa's most pressing health challenges. MediLink is not just a solution—it's a promise to every community, every family, and every health worker that better care is possible.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Story;
