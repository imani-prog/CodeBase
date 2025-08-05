
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
      
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="mb-5 w-full p-2 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center leading-tight">Community Health Worker Services</h1>
          <p className="text-lg w-full text-center">Community Health Workers (CHWs) play a vital role in MediLink’s outreach, connecting patients to care and support in their communities. Our platform equips CHWs with digital tools, training, and resources to deliver compassionate healthcare in homes and villages.</p>
        </section>


        <div className="grid grid-cols-1 gap-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-2 p-8 items-center">
            <div className="flex flex-col justify-center h-full pr-4">
              <h2 className="text-2xl font-bold text-blue-800 mb-1 mt-0">Mobile Outreach & Home Visits</h2>
              <ul className="list-none space-y-3 mb-2">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Track and manage home visits</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Digitally-enabled CHWs for better care and faster response</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Emergency support and referrals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Health screenings and basic diagnostics at home</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Medication delivery and follow-up care</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Community health education and awareness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Support for elderly and vulnerable patients</span>
                </li>
              </ul>
              <p className="mt-2 text-blue-900">Our mobile outreach program brings essential healthcare directly to patients' homes, especially in remote and underserved areas. CHWs use digital tools to coordinate visits, monitor patient progress, and respond quickly to emergencies. This approach reduces barriers to care, improves health outcomes, and strengthens community trust in healthcare services.</p>
              <p className="italic text-blue-600 mt-2">"Empowering CHWs means empowering communities."</p>
            </div>
            <div className="flex justify-center items-center h-full">
              <img 
                src={CommunityWorkerOutreach} 
                alt="Mobile Outreach" 
                className="w-full h-[350px] object-cover rounded-xl shadow-md border border-blue-200" 
                style={{
                  boxShadow: '-8px 8px 0px rgba(59, 130, 246, 0.3), -16px 16px 0px rgba(59, 130, 246, 0.2), -24px 24px 0px rgba(59, 130, 246, 0.1), -32px 32px 20px rgba(0, 0, 0, 0.1)'
                }}
              />
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
              <ul className="list-none space-y-3 mb-2 text-lg">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>E-learning courses for CHWs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Certification tracking for CHW growth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Maternal, child, chronic illness education</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Interactive webinars and workshops</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Peer-to-peer learning and support groups</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Practical skills for preventive care and nutrition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Access to expert advice and mentorship</span>
                </li>
              </ul>
              <p className="mt-2 text-blue-900 text-lg">Our E-learning & Certification program empowers CHWs to continuously grow their skills and knowledge. Through interactive courses, workshops, and expert mentorship, CHWs gain practical tools for patient care, health education, and community engagement. The platform supports lifelong learning, professional development, and collaboration among health workers.</p>
              <p className="italic text-blue-600 mt-2 text-lg">"Learn. Apply. Thrive."</p>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-2 p-8 items-center">
            <div className="flex flex-col justify-center h-full pr-4">
              <h2 className="text-2xl font-bold text-blue-800 mb-2">Financial Empowerment</h2>
              <ul className="list-none space-y-3 mb-2 text-lg">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Stable income through digital bookings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Mobile wallet payments (M-Pesa, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Transparent earnings and impact tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Financial literacy and savings support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Access to microloans and incentives</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Recognition for community impact</span>
                </li>
              </ul>
              <p className="mt-2 text-blue-900 text-lg">MediLink’s Financial Empowerment program ensures CHWs receive fair compensation, timely payments, and opportunities for growth. With digital tools for tracking earnings, financial literacy resources, and access to incentives, CHWs can focus on serving their communities while building a stable future.</p>
              <p className="italic text-blue-600 mt-2 text-lg">"CHWs deserve dignity, respect, and fair compensation."</p>
            </div>
            <div className="flex justify-center items-center h-full">
              <img 
                src={CommunityTogetherness} 
                alt="Community Togetherness" 
                className="w-full h-[350px] object-cover rounded-xl shadow-md border border-blue-200" 
                style={{
                  boxShadow: '-8px 8px 0px rgba(59, 130, 246, 0.3), -16px 16px 0px rgba(59, 130, 246, 0.2), -24px 24px 0px rgba(59, 130, 246, 0.1), -32px 32px 20px rgba(0, 0, 0, 0.1)'
                }}
              />
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
              <ul className="list-none space-y-3 mt-4 text-lg text-white drop-shadow-lg">
                <li className="flex items-start">
                  <span className="text-blue-200 mr-3 mt-1">✓</span>
                  <span>Co-designed features with CHW feedback</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-200 mr-3 mt-1">✓</span>
                  <span>Focus on safety, dignity, and impact</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-200 mr-3 mt-1">✓</span>
                  <span>Continuous improvement based on real needs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-200 mr-3 mt-1">✓</span>
                  <span>Tools for easier reporting and communication</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
     
    </div>
  );
};

export default CHWs;
