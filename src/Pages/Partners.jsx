import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";
import KenyattaLogo from "../assets/Kenyatta hospital.jpeg";
import MamaLucyLogo from "../assets/Lucy.jpg";
import MinistryLogo from "../assets/MinistryOfHealth.png";
import RedcrossLogo from "../assets/kenya-red-cross-seeklogo.png";
import NHIFLogo from "../assets/nhif-seeklogo.png";
import SHAlogo from "../assets/sha-social-health-authority-seeklogo.png";

const Partners = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1000px] mx-auto">
        <section className="mb-10 w-full bg-blue-100 rounded-3xl shadow-xl border border-blue-200 p-10 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4 text-center leading-tight">Our Partners</h1>
          <p className="text-lg text-blue-700 text-center max-w-3xl mb-8">
            MediLink connects a diverse network of partners—including hospitals, insurance providers, government agencies, and humanitarian organizations—through a unified digital health platform. Our partners use MediLink to streamline patient referrals, manage insurance claims, coordinate emergency response, and deliver care more efficiently. By integrating their services with our system, partners gain real-time access to health data, booking tools, and outreach modules, enabling them to reach more people, improve outcomes, and drive innovation in healthcare across Kenya.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8 w-full justify-center">
            {/* NHIF */}
            <div className="bg-white rounded-2xl shadow border border-blue-300 flex flex-col items-center p-4">
              <img src={NHIFLogo} alt="NHIF" className="h-16 w-16 object-contain mb-2" />
              <span className="text-blue-700 font-bold mb-2">NHIF</span>
              <p className="text-blue-600 text-sm text-center">The National Hospital Insurance Fund (NHIF) is Kenya’s leading public health insurance provider, enabling millions of citizens to access affordable healthcare services in both public and private facilities nationwide.</p>
            </div>
            {/* SHA */}
            <div className="bg-white rounded-2xl shadow border border-blue-300 flex flex-col items-center p-4">
              <img src={SHAlogo} alt="SHA" className="h-16 w-16 object-contain mb-2" />
              <span className="text-blue-700 font-bold mb-2">Social Health Authority (SHA)</span>
              <p className="text-blue-600 text-sm text-center">SHA is Kenya’s new insurance provider, focused on universal health coverage and financial protection for all citizens. SHA partners with MediLink to streamline claims, payments, and access to essential health services.</p>
            </div>
            {/* Redcross */}
            <div className="bg-white rounded-2xl shadow border border-blue-300 flex flex-col items-center p-4">
              <img src={RedcrossLogo} alt="Redcross" className="h-16 w-16 object-contain mb-2" />
              <span className="text-blue-700 font-bold mb-2">Redcross</span>
              <p className="text-blue-600 text-sm text-center">Kenya Red Cross is a humanitarian organization providing emergency medical services, disaster response, and ambulance support. As a MediLink partner, Red Cross ensures rapid response and lifesaving care in critical situations.</p>
            </div>
            {/* Ministry of Health */}
            <div className="bg-white rounded-2xl shadow border border-blue-300 flex flex-col items-center p-4">
              <img src={MinistryLogo} alt="Ministry of Health" className="h-16 w-16 object-contain mb-2" />
              <span className="text-blue-700 font-bold text-lg mb-2">Ministry of Health</span>
              <p className="text-blue-600 text-sm text-center">The Ministry of Health sets national health policy, standards, and regulations. Through collaboration with MediLink, the Ministry advances digital health, public health outreach, and quality care for all Kenyans.</p>
            </div>
            {/* Mama Lucy Hospital */}
            <div className="bg-white rounded-2xl shadow border border-blue-300 flex flex-col items-center p-4">
              <img src={MamaLucyLogo} alt="Mama Lucy Hospital" className="h-16 w-16 object-contain mb-2" />
              <span className="text-blue-700 font-bold text-lg mb-2">Mama Lucy Hospital</span>
              <p className="text-blue-600 text-sm text-center">Mama Lucy Kibaki Hospital is a leading public hospital in Nairobi, providing outpatient, inpatient, and emergency services. As a MediLink partner, Mama Lucy Hospital expands access to quality care for urban and peri-urban communities.</p>
            </div>
            {/* Kenyatta Hospital */}
            <div className="bg-white rounded-2xl shadow border border-blue-300 flex flex-col items-center p-4">
              <img src={KenyattaLogo} alt="Kenyatta Hospital" className="h-16 w-16 object-contain mb-2" />
              <span className="text-blue-700 font-bold text-lg mb-2">Kenyatta Hospital</span>
              <p className="text-blue-600 text-sm text-center">Kenyatta National Hospital is Kenya’s largest referral and teaching hospital, offering specialized medical care, research, and training. Partnering with MediLink, Kenyatta Hospital supports advanced healthcare delivery and innovation.</p>
            </div>
          </div>
          <p className="text-blue-900 mb-6 text-center">We work with trusted partners to deliver quality healthcare and emergency services across Kenya.</p>
          <a href="/partner" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg">Become a Partner</a>
        </section>
      </main>
      
    </div>
  );
};

export default Partners;
