import HealthTechTraining from "../../assets/HealthTechTraining.jpg";
import patientsHomecareImg from "../../assets/PatientService.jpg";
import PaymentsInsurance from "../../assets/PaymentsInsurance.png";
import TelemedicinePatientsImg from "../../assets/Telehealth.jpg";
import Footer from "../../Components/Footer.jsx";
import LiveChatButton from "../../Components/LiveChatButton.jsx";
import Navbar from "../../Components/Navbar.jsx";

const Patients = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <LiveChatButton />
      
      <main className="flex flex-col items-center w-full px-4 py-6 md:py-10 max-w-[1200px] mx-auto">
        <section className="mb-8 w-full items-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-4 md:mb-6 text-center leading-tight">Patient Services</h1>
          <p className="text-base md:text-lg w-full text-left md:text-center">MediLink empowers patients to access care, education, and support from anywhere. Our platform is designed to make healthcare simple, affordable, and compassionate for every citizen.</p>
        </section>


        <div className="grid grid-cols-1 gap-8 w-full">
          <div className="mb-5 w-full flex flex-col md:flex-row gap-16 md:gap-18">
            <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
              <img 
                src={patientsHomecareImg} 
                alt="Patients homecare" 
                className="w-full h-[220px] md:h-[350px] object-cover rounded-xl border border-blue-200" 
                style={{
                  boxShadow: `8px 8px 0px rgba(59, 130, 246, 0.3), 16px 16px 0px rgba(59, 130, 246, 0.2), 24px 24px 0px rgba(59, 130, 246, 0.1), 32px 32px 20px rgba(0, 0, 0, 0.1)`
                }}
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">Healthcare Appointments</h2>
              <ul className="list-none space-y-3 mb-2">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Clinic Visits – Book outpatient appointments at local facilities.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Home-Based Care – Request a CHW or nurse for home visits.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Ambulance Dispatch – Get emergency support fast.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Treatment Orders – Order care services online or in-app.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Medication Delivery – Get prescriptions delivered to your home.</span>
                </li>
              </ul>
              <div className="mt-2 p-3 bg-blue-100 rounded-xl border border-blue-200 text-xs md:text-sm">
                <strong className="text-blue-800">Steps for Ordering Treatment Services:</strong>
                <ul className="list-none space-y-2 mt-2">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-1 text-xs">✓</span>
                    <span>Log in to your MediLink account for a personalized experience and faster processing.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-1 text-xs">✓</span>
                    <span>Provide accurate details about your symptoms or treatment needs to help healthcare providers prepare.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-1 text-xs">✓</span>
                    <span>Check your appointment status and notifications regularly for updates or changes.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-1 text-xs">✓</span>
                    <span>Use the chat feature to ask questions or get support from our care team.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2 mt-1 text-xs">✓</span>
                    <span>For urgent needs, select the emergency option for priority response.</span>
                  </li>
                </ul>
              </div>
              <p className="italic mt-2 text-blue-600 text-xs md:text-base">"We bring healthcare to your doorstep—literally."</p>
            </div>
          </div>



          <div className="mb-5 w-full flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1">
              <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">Health Education & Community Awareness</h2>
              <ul className="list-none space-y-3 mb-2 text-xs md:text-base">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Verified health tips (via SMS, dashboard, or app)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>E-learning courses for patients</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Maternal, child, chronic illness education</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Interactive workshops and webinars</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Personalized guidance for chronic condition management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Support groups and peer learning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Practical skills for preventive care and nutrition</span>
                </li>
              </ul>
              <p className="italic mt-2 text-blue-600 text-xs md:text-base">"Learn. Apply. Thrive."</p>
              <p className="mt-4 text-blue-900 text-xs md:text-base">MediLink offers more than basic health info—patients access interactive courses, workshops, expert advice, and practical skills for lifelong wellness. Live webinars, support groups, and personalized guidance help everyone make informed choices and thrive in their health journey.</p>
              <p className="mt-2 text-blue-900 text-xs md:text-base">Whether you need preventive care, nutrition tips, or mental wellness support, MediLink is a safe space for lifelong learning. We connect healthcare professionals and the community to build awareness and resilience for a healthier future.</p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2 mb-4 md:mb-0">
              <img 
                src={HealthTechTraining} 
                alt="Health Tech Training" 
                className="w-full h-[220px] md:h-[350px] object-cover rounded-xl border border-blue-200" 
                style={{
                  boxShadow: `-8px 8px 0px rgba(59, 130, 246, 0.3), -16px 16px 0px rgba(59, 130, 246, 0.2), -24px 24px 0px rgba(59, 130, 246, 0.1), -32px 32px 20px rgba(0, 0, 0, 0.1)`
                }}
              />
            </div>
          </div>



          <div className="mb-5 w-full flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
              <img 
                src={TelemedicinePatientsImg} 
                alt="Telemedicine Consultation" 
                className="w-full h-[220px] md:h-[350px] object-cover rounded-xl border border-blue-200" 
                style={{
                  boxShadow: `8px 8px 0px rgba(59, 130, 246, 0.3), 16px 16px 0px rgba(59, 130, 246, 0.2), 24px 24px 0px rgba(59, 130, 246, 0.1), 32px 32px 20px rgba(0, 0, 0, 0.1)`
                }}
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-2 md:mb-4">Telemedicine Consultations</h2>
              <ul className="list-none space-y-3 mb-2 text-xs md:text-base">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Doctor consultations via Zoom or video chat</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Follow-up sessions from prior clinic visits</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Remote prescription delivery (where available)</span>
                </li>
              </ul>
              <p className="italic text-blue-600 mt-2 text-xs md:text-base">"Care beyond clinics—connect with a doctor from wherever you are."</p>
              <p className="mt-4 text-blue-900 text-xs md:text-base">Telemedicine brings expert care to patients anywhere, enabling video consultations, timely advice, and home prescription delivery. It saves travel time, avoids crowded clinics, and supports ongoing care for chronic conditions.</p>
              <p className="mt-2 text-blue-900 text-xs md:text-base">MediLink’s telemedicine makes healthcare accessible from anywhere. Patients can consult licensed doctors, get advice, and receive prescriptions at home—reducing travel and supporting ongoing care. The platform offers secure appointments, record sharing, specialist access, and remote monitoring, empowering patients and improving health outcomes, especially in underserved areas.</p>
            </div>
          </div>



          <div className="mb-5 w-full flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1">
              <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">Insurance & Financial Integration</h2>
              <ul className="list-none space-y-3 mb-2 text-xs md:text-base">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Integration with NHIF, SHA, and private covers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>M-Pesa STK Push and mobile wallet payments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Debit/Credit card support (Stripe, Flutterwave)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Patient balance visibility & history</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Instant payment confirmations and receipts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Automated reminders for upcoming bills and renewals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Secure data encryption for all financial transactions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3 mt-1">✓</span>
                  <span>Support for multiple currencies and payment methods</span>
                </li>
              </ul>
              <p className="italic text-blue-600 mt-2 text-xs md:text-base">"Affordable care for all—MediLink makes payments simple, secure, and offers subsidized services for those in need."</p>
              <p className="mt-4 text-blue-900 text-xs md:text-base">MediLink lets patients manage healthcare expenses and insurance in one place, with real-time updates on payments, claims, and balances. Integrated payment and insurance options help you focus on your health while MediLink handles the details.</p>
              <p className="mt-2 text-blue-900 text-xs md:text-base">You also get digital receipts, transaction history, and automatic reminders for bills and renewals. Advanced security protects your financial data, making payments and insurance easy and worry-free.</p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2 mb-4 md:mb-0">
              <img 
                src={PaymentsInsurance} 
                alt="Insurance and Financial Integration" 
                className="w-full h-[220px] md:h-[350px] object-cover rounded-xl border border-blue-200" 
                style={{
                  boxShadow: `-8px 8px 0px rgba(59, 130, 246, 0.3), -16px 16px 0px rgba(59, 130, 246, 0.2), -24px 24px 0px rgba(59, 130, 246, 0.1), -32px 32px 20px rgba(0, 0, 0, 0.1)`
                }}
              />
            </div>
          </div>
        </div>

        <section className="mt-8 w-full text-center flex flex-col items-center justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-2 md:mb-4">Serving Patients with Purpose</h2>
          <p className="text-base md:text-lg max-w-xl md:max-w-2xl">Every feature is built from real patient stories and needs. With MediLink, you don’t just access healthcare—you access hope, dignity, and a human connection.</p>
        </section>
      </main>
     
    </div>
  );
};

export default Patients;
