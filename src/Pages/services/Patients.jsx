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
      <Navbar />
      <main className="flex flex-col items-center w-full px-4 py-6 md:py-10 max-w-[1200px] mx-auto">
        <section className="mb-8 w-full items-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-4 md:mb-6 text-center leading-tight">Patient Services</h1>
          <p className="text-base md:text-lg w-full text-left md:text-center">MediLink empowers patients to access care, education, and support from anywhere. Our platform is designed to make healthcare simple, affordable, and compassionate for every citizen.</p>
        </section>


        <div className="grid grid-cols-1 gap-8 w-full">
          <div className="mb-5 w-full flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
              <img src={patientsHomecareImg} alt="Patients homecare" className="w-full h-[220px] md:h-[350px] object-cover rounded-xl shadow-md border border-blue-200" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">Healthcare Appointments</h2>
              <ul className="list-disc list-inside ml-4 mb-2">
                <li className="mb-2">Clinic Visits – Book outpatient appointments at local facilities.</li>
                <li className="mb-2">Home-Based Care – Request a CHW or nurse for home visits.</li>
                <li className="mb-2">Ambulance Dispatch – Get emergency support fast.</li>
                <li className="mb-2">Treatment Orders – Order care services online or in-app.</li>
                <li>Medication Delivery – Get prescriptions delivered to your home.</li>
              </ul>
              <div className="mt-2 p-3 bg-blue-100 rounded-xl border border-blue-200 text-xs md:text-sm">
                <strong className="text-blue-800">Steps for Ordering Treatment Services:</strong>
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li>Log in to your MediLink account for a personalized experience and faster processing.</li>
                  <li>Provide accurate details about your symptoms or treatment needs to help healthcare providers prepare.</li>
                  <li>Check your appointment status and notifications regularly for updates or changes.</li>
                  <li>Use the chat feature to ask questions or get support from our care team.</li>
                  <li>For urgent needs, select the emergency option for priority response.</li>
                </ul>
              </div>
              <p className="italic mt-2 text-blue-600 text-xs md:text-base">"We bring healthcare to your doorstep—literally."</p>
            </div>
          </div>



          <div className="mb-5 w-full flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1">
              <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">Health Education & Community Awareness</h2>
              <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-xs md:text-base">
                <li>Verified health tips (via SMS, dashboard, or app)</li>
                <li>E-learning courses for patients</li>
                <li>Maternal, child, chronic illness education</li>
                <li>Interactive workshops and webinars</li>
                <li>Personalized guidance for chronic condition management</li>
                <li>Support groups and peer learning</li>
                <li>Practical skills for preventive care and nutrition</li>
              </ul>
              <p className="italic mt-2 text-blue-600 text-xs md:text-base">"Learn. Apply. Thrive."</p>
              <p className="mt-4 text-blue-900 text-xs md:text-base">MediLink offers more than basic health info—patients access interactive courses, workshops, expert advice, and practical skills for lifelong wellness. Live webinars, support groups, and personalized guidance help everyone make informed choices and thrive in their health journey.</p>
              <p className="mt-2 text-blue-900 text-xs md:text-base">Whether you need preventive care, nutrition tips, or mental wellness support, MediLink is a safe space for lifelong learning. We connect healthcare professionals and the community to build awareness and resilience for a healthier future.</p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2 mb-4 md:mb-0">
              <img src={HealthTechTraining} alt="Health Tech Training" className="w-full h-[220px] md:h-[350px] object-cover rounded-xl shadow-md border border-blue-200" />
            </div>
          </div>



          <div className="mb-5 w-full flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0">
              <img src={TelemedicinePatientsImg} alt="Telemedicine Consultation" className="w-full h-[220px] md:h-[350px] object-cover rounded-xl shadow-md border border-blue-200" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-2 md:mb-4">Telemedicine Consultations</h2>
              <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-xs md:text-base">
                <li>Doctor consultations via Zoom or video chat</li>
                <li>Follow-up sessions from prior clinic visits</li>
                <li>Remote prescription delivery (where available)</li>
              </ul>
              <p className="italic text-blue-600 mt-2 text-xs md:text-base">"Care beyond clinics—connect with a doctor from wherever you are."</p>
              <p className="mt-4 text-blue-900 text-xs md:text-base">Telemedicine brings expert care to patients anywhere, enabling video consultations, timely advice, and home prescription delivery. It saves travel time, avoids crowded clinics, and supports ongoing care for chronic conditions.</p>
              <p className="mt-2 text-blue-900 text-xs md:text-base">MediLink’s telemedicine makes healthcare accessible from anywhere. Patients can consult licensed doctors, get advice, and receive prescriptions at home—reducing travel and supporting ongoing care. The platform offers secure appointments, record sharing, specialist access, and remote monitoring, empowering patients and improving health outcomes, especially in underserved areas.</p>
            </div>
          </div>



          <div className="mb-5 w-full flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1">
              <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">Insurance & Financial Integration</h2>
              <ul className="list-disc list-inside ml-4 md:ml-6 mb-2 text-xs md:text-base">
                <li>Integration with NHIF, SHA, and private covers</li>
                <li>M-Pesa STK Push and mobile wallet payments</li>
                <li>Debit/Credit card support (Stripe, Flutterwave)</li>
                <li>Patient balance visibility & history</li>
                <li>Instant payment confirmations and receipts</li>
                <li>Automated reminders for upcoming bills and renewals</li>
                <li>Secure data encryption for all financial transactions</li>
                <li>Support for multiple currencies and payment methods</li>
              </ul>
              <p className="italic text-blue-600 mt-2 text-xs md:text-base">"Affordable care for all—MediLink makes payments simple, secure, and offers subsidized services for those in need."</p>
              <p className="mt-4 text-blue-900 text-xs md:text-base">MediLink lets patients manage healthcare expenses and insurance in one place, with real-time updates on payments, claims, and balances. Integrated payment and insurance options help you focus on your health while MediLink handles the details.</p>
              <p className="mt-2 text-blue-900 text-xs md:text-base">You also get digital receipts, transaction history, and automatic reminders for bills and renewals. Advanced security protects your financial data, making payments and insurance easy and worry-free.</p>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2 mb-4 md:mb-0">
              <img src={PaymentsInsurance} alt="Insurance and Financial Integration" className="w-full h-[220px] md:h-[350px] object-cover rounded-xl shadow-md border border-blue-200" />
            </div>
          </div>
        </div>

        <section className="mt-8 w-full text-center flex flex-col items-center justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-2 md:mb-4">Serving Patients with Purpose</h2>
          <p className="text-base md:text-lg max-w-xl md:max-w-2xl">Every feature is built from real patient stories and needs. With MediLink, you don’t just access healthcare—you access hope, dignity, and a human connection.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Patients;
