import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";
import LiveChatButton from "../../Components/LiveChatButton.jsx";

const Story = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <LiveChatButton />
      
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="w-full flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-3 text-center leading-tight">Our Story</h1>
        </section>


        <section className="mb-5 w-full bg-blue-50 p-4 text-left">
          <h2 className="text-3xl font-bold text-blue-800 mb-3">Problem-Driven</h2>
          <p className="text-lg mb-2">MediLink was born from a deep understanding of the challenges many African communities face when trying to access timely and quality healthcare. In rural and underserved areas, distance, cost, lack of infrastructure, and limited staffing continue to be barriers to life-saving care.</p>
          <p className="text-lg mb-2">Founded by a group of passionate technologists, medical professionals, and community leaders, MediLink is more than a platform—it is a movement. A movement to ensure that no one is left behind due to where they live, how much they earn, or the resources available around them.</p>
          <p className="text-lg mb-2">We saw the power of community health workers (CHWs)—often the first and only link to care in remote areas—and we asked: <span className="font-semibold text-blue-800">What if we could supercharge their impact with digital tools?</span><br/>What if every citizen, from urban centers to remote villages, could connect to care, support, education, and emergency help through their phone?</p>
          <p className="text-lg mb-2">With this vision, MediLink was created—a centralized digital health platform that brings together:</p>
          <ul className="list-disc list-inside ml-6 mb-4">
            <li>Patients seeking care, education, or emergency support</li>
            <li>Clinics and hospitals aiming to serve better and smarter</li>
            <li>CHWs on the frontlines delivering care in homes and villages</li>
            <li>Governments and NGOs driving public health policy and outreach</li>
            <li>Donors and partners committed to sustainable health solutions</li>
          </ul>
          <p className="text-lg mb-4">Through real-time bookings, home visits, insurance claims, and secure health data access, MediLink brings healthcare within reach. Whether it's an elderly patient requesting a home visit, a mother seeking health tips via SMS, or a clinic managing dozens of patient referrals, MediLink provides the digital backbone.</p>
        </section>


        {/* Why We Exist */}
        <section className="mb-2 w-full p-3 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Video Column */}
            <div className="w-full flex justify-center items-stretch">
              <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow flex h-full">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/cM4aep7VXb8"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ height: '100%' }}
                ></iframe>
              </div>
            </div>
            {/* Text Column */}
            <div className="flex flex-col justify-between h-full">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Why We Exist</h2>
              <ul className="list-disc list-inside ml-6 mb-2">
                <li>To reduce maternal and child mortality through faster access to trained health workers</li>
                <li>To empower CHWs with tools, training, and income</li>
                <li>To streamline health systems and reduce hospital congestion</li>
                <li>To help governments and NGOs make data-driven decisions</li>
                <li>To create a transparent and sustainable digital health ecosystem</li>
              </ul>
              <div className="mt-2">
                <h3 className="text-xl font-bold text-blue-700 mb-2">Our Impact</h3>
                <p className="mb-2">Since our inception, MediLink has:</p>
                <ul className="list-disc list-inside ml-6 mb-2">
                  <li>Connected thousands of patients to care in remote areas</li>
                  <li>Enabled hundreds of CHWs to earn a stable income and access training</li>
                  <li>Helped clinics and hospitals manage patient flow and referrals more efficiently</li>
                  <li>Supported government and NGO health campaigns with real-time data</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full p-2 text-left">
          <div>
            <h3 className="text-xl font-bold text-blue-700 mb-2">A Vision for the Future</h3>
                <p className="">We are committed to expanding our reach, deepening our impact, and continuously innovating to solve Africa's most pressing health challenges. MediLink is not just a solution—it's a promise to every community, every family, and every health worker that better care is possible.</p>
          </div>

        </section>


      </main>
    </div>
  );
};

export default Story;
