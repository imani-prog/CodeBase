
import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";
import CommunityTogetherness from "../../assets/CommunityTogetherness.jpg";
import CommunityWorkerOutreach from "../../assets/CommunityWorkerOutreach.jpeg";
import WorkersTogetherness from "../../assets/WorkersTogetherness3.jpeg";
import LiveChatButton from "../../Components/LiveChatButton.jsx";

const CHWs = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <LiveChatButton />
      <Navbar />
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="mb-5 w-full p-2 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center leading-tight">Community Health Worker Services</h1>
          <p className="text-lg w-full text-center">Community Health Workers (CHWs) play a vital role in MediLink’s outreach, connecting patients to care and support in their communities. Our platform equips CHWs with digital tools, training, and resources to deliver compassionate healthcare in homes and villages.</p>
        </section>


        <div className="grid grid-cols-1 gap-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-2 p-8 items-center">
            <div className="flex flex-col justify-center h-full pr-4">
              <h2 className="text-2xl font-bold text-blue-800 mb-1 mt-0">Mobile Outreach & Home Visits</h2>
              <ul className="list-disc list-inside ml-6 mb-2">
                <li>Track and manage home visits</li>
                <li>Digitally-enabled CHWs for better care and faster response</li>
                <li>Emergency support and referrals</li>
                <li>Health screenings and basic diagnostics at home</li>
                <li>Medication delivery and follow-up care</li>
                <li>Community health education and awareness</li>
                <li>Support for elderly and vulnerable patients</li>
              </ul>
              <p className="mt-2 text-blue-900">Our mobile outreach program brings essential healthcare directly to patients' homes, especially in remote and underserved areas. CHWs use digital tools to coordinate visits, monitor patient progress, and respond quickly to emergencies. This approach reduces barriers to care, improves health outcomes, and strengthens community trust in healthcare services.</p>
              <p className="italic text-blue-600 mt-2">"Empowering CHWs means empowering communities."</p>
            </div>
            <div className="flex justify-center items-center h-full">
              <img src={CommunityWorkerOutreach} alt="Mobile Outreach" className="w-full h-[350px] object-cover rounded-xl shadow-md border border-blue-200" />
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-2 p-8 items-center">
            <div className="flex justify-center items-center h-full">
              <iframe
                width="100%"
                height="350"
                src="https://www.youtube.com/embed/cM4aep7VXb8"
                title="E-learning for CHWs"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[350px] rounded-xl shadow-md border border-blue-200"
              ></iframe>
            </div>
            <div className="flex flex-col justify-center h-full pl-4">
              <h2 className="text-2xl font-bold text-blue-800 mb-1 mt-0">E-learning & Certification</h2>
              <ul className="list-disc list-inside ml-6 mb-2 text-lg">
                <li>E-learning courses for CHWs</li>
                <li>Certification tracking for CHW growth</li>
                <li>Maternal, child, chronic illness education</li>
                <li>Interactive webinars and workshops</li>
                <li>Peer-to-peer learning and support groups</li>
                <li>Practical skills for preventive care and nutrition</li>
                <li>Access to expert advice and mentorship</li>
              </ul>
              <p className="mt-2 text-blue-900 text-lg">Our E-learning & Certification program empowers CHWs to continuously grow their skills and knowledge. Through interactive courses, workshops, and expert mentorship, CHWs gain practical tools for patient care, health education, and community engagement. The platform supports lifelong learning, professional development, and collaboration among health workers.</p>
              <p className="italic text-blue-600 mt-2 text-lg">"Learn. Apply. Thrive."</p>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-2 p-8 items-center">
            <div className="flex flex-col justify-center h-full pr-4">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Financial Empowerment</h2>
              <ul className="list-disc list-inside ml-6 mb-2 text-lg">
                <li>Stable income through digital bookings</li>
                <li>Mobile wallet payments (M-Pesa, etc.)</li>
                <li>Transparent earnings and impact tracking</li>
                <li>Financial literacy and savings support</li>
                <li>Access to microloans and incentives</li>
                <li>Recognition for community impact</li>
              </ul>
              <p className="mt-2 text-blue-900 text-lg">MediLink’s Financial Empowerment program ensures CHWs receive fair compensation, timely payments, and opportunities for growth. With digital tools for tracking earnings, financial literacy resources, and access to incentives, CHWs can focus on serving their communities while building a stable future.</p>
              <p className="italic text-blue-600 mt-2 text-lg">"CHWs deserve dignity, respect, and fair compensation."</p>
            </div>
            <div className="flex justify-center items-center h-full">
              <img src={CommunityTogetherness} alt="Community Togetherness" className="w-full h-[350px] object-cover rounded-xl shadow-md border border-blue-200" />
            </div>
          </div>
        </div>


        <div
          className="relative w-full overflow-hidden flex items-center justify-center"
          style={{ minHeight: '600px' }}
        >
          <img
            src={WorkersTogetherness}
            alt="CHW Purpose Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ minHeight: '350px' }}
          />
          <div
            className="absolute inset-0 w-full h-full z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(0,40,120,0.7) 0%, rgba(0,180,200,0.5) 60%, rgba(255,255,255,0.2) 100%)'
            }}
          ></div>
          <div className="relative z-20 w-full h-full flex flex-col justify-center items-center px-8 py-10">
            <div className="rounded-xl p-8 max-w-2xl w-full bg-transparent">
              <h2 className="text-3xl font-extrabold text-white mb-4 text-center drop-shadow-lg">Serving CHWs with Purpose</h2>
              <p className="text-xl text-white text-center mb-4 drop-shadow-lg">MediLink listens to CHWs and builds tools they actually use and love. Every feature is designed to make their work easier, safer, and more impactful.</p>
              <ul className="list-disc list-inside ml-6 mt-4 text-lg text-white drop-shadow-lg">
                <li>Co-designed features with CHW feedback</li>
                <li>Focus on safety, dignity, and impact</li>
                <li>Continuous improvement based on real needs</li>
                <li>Tools for easier reporting and communication</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CHWs;
