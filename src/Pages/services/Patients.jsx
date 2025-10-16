import HealthTechTraining from "../../assets/HealthTechTraining.jpg";
import patientsHomecareImg from "../../assets/PatientService.jpg";
import PaymentsInsurance from "../../assets/PaymentsInsurance.png";
import TelemedicinePatientsImg from "../../assets/Telehealth.jpg";

const ImageCard = ({ src, alt, reverse, shadow }) => (
  <div className={`w-full md:w-1/2 flex justify-center items-center mb-3 sm:mb-4 md:mb-0 ${reverse ? "order-1 md:order-2" : ""}`}>
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-[200px] sm:h-[240px] md:h-[300px] lg:h-[350px] object-cover rounded-lg sm:rounded-xl border border-blue-200 shadow-md sm:shadow-lg"
      style={{ boxShadow: shadow }}
    />
  </div>
);

const ContentCard = ({ title, children, reverse }) => (
  <div className={`w-full md:w-1/2 flex flex-col justify-center ${reverse ? "order-2 md:order-1" : ""}`}>
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-2 sm:mb-3 md:mb-4 font-serif px-2">{title}</h2>
    {children}
  </div>
);

const List = ({ items, small }) => (
  <ul className={`list-none space-y-2 sm:space-y-3 mb-2 ${small ? "text-xs sm:text-sm" : "text-xs sm:text-sm md:text-base"}`}>
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start px-2">
        <span className="text-blue-400 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0">✓</span>
        <span className="leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

const Patients = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50 overflow-x-hidden">
      <main className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 max-w-[1200px] mx-auto">

        {/* Header Section */}
        <section className="mb-6 sm:mb-7 md:mb-8 w-full items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-900 mb-3 sm:mb-4 md:mb-6 text-center leading-tight font-serif px-2">
            Patient Services
          </h1>
          <p className="text-sm sm:text-base md:text-lg w-full text-left md:text-center px-2 leading-relaxed">
            MediLink empowers patients to access care, education, and support from anywhere. Our platform is designed to make healthcare simple, affordable, and compassionate for every citizen.
          </p>
        </section>

        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:gap-8 w-full">

          {/* Healthcare Appointments */}
          <div className="mb-4 sm:mb-5 w-full flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
            <ImageCard
              src={patientsHomecareImg}
              alt="Patients homecare"
              shadow="8px 8px 0px rgba(59,130,246,0.3), 16px 16px 0px rgba(59,130,246,0.2), 24px 24px 0px rgba(59,130,246,0.1), 32px 32px 20px rgba(0,0,0,0.1)"
            />
            <ContentCard title="Healthcare Appointments">
              <List
                items={[
                  "Clinic Visits – Book outpatient appointments at local facilities.",
                  "Home-Based Care – Request a CHW or nurse for home visits.",
                  "Ambulance Dispatch – Get emergency support fast.",
                  "Treatment Orders – Order care services online or in-app.",
                  "Medication Delivery – Get prescriptions delivered to your home."
                ]}
              />
              <div className="mt-2 sm:mt-3 p-3 sm:p-4 bg-blue-100 rounded-lg sm:rounded-xl border border-blue-200 text-xs sm:text-sm">
                <strong className="text-blue-800 px-2 block mb-2">Steps for Ordering Treatment Services:</strong>
                <List
                  small
                  items={[
                    "Log in to your MediLink account for a personalized experience and faster processing.",
                    "Provide accurate details about your symptoms or treatment needs to help healthcare providers prepare.",
                    "Check your appointment status and notifications regularly for updates or changes.",
                    "Use the chat feature to ask questions or get support from our care team.",
                    "For urgent needs, select the emergency option for priority response."
                  ]}
                />
              </div>
              <p className="italic mt-2 sm:mt-3 text-blue-600 text-xs sm:text-sm md:text-base px-2 leading-relaxed">
                "We bring healthcare to your doorstep—literally."
              </p>
            </ContentCard>
          </div>

          {/* Health Education */}
          <div className="mb-4 sm:mb-5 w-full flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
            <ContentCard title="Health Education & Community Awareness" reverse>
              <List
                items={[
                  "Verified health tips (via SMS, dashboard, or app)",
                  "E-learning courses for patients",
                  "Maternal, child, chronic illness education",
                  "Interactive workshops and webinars",
                  "Personalized guidance for chronic condition management",
                  "Support groups and peer learning",
                  "Practical skills for preventive care and nutrition"
                ]}
              />
              <p className="italic mt-2 sm:mt-3 text-blue-600 text-xs sm:text-sm md:text-base px-2 leading-relaxed">"Learn. Apply. Thrive."</p>
              <p className="mt-3 sm:mt-4 text-blue-900 text-xs sm:text-sm md:text-base px-2 leading-relaxed">
                MediLink offers more than basic health info—patients access interactive courses, workshops, expert advice, and practical skills for lifelong wellness. Live webinars, support groups, and personalized guidance help everyone make informed choices and thrive in their health journey.
              </p>
              <p className="mt-2 sm:mt-3 text-blue-900 text-xs sm:text-sm md:text-base px-2 leading-relaxed">
                Whether you need preventive care, nutrition tips, or mental wellness support, MediLink is a safe space for lifelong learning. We connect healthcare professionals and the community to build awareness and resilience for a healthier future.
              </p>
            </ContentCard>
            <ImageCard
              src={HealthTechTraining}
              alt="Health Tech Training"
              reverse
              shadow="-8px 8px 0px rgba(59,130,246,0.3), -16px 16px 0px rgba(59,130,246,0.2), -24px 24px 0px rgba(59,130,246,0.1), -32px 32px 20px rgba(0,0,0,0.1)"
            />
          </div>

          {/* Telemedicine */}
          <div className="mb-4 sm:mb-5 w-full flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
            <ImageCard
              src={TelemedicinePatientsImg}
              alt="Telemedicine Consultation"
              shadow="8px 8px 0px rgba(59,130,246,0.3), 16px 16px 0px rgba(59,130,246,0.2), 24px 24px 0px rgba(59,130,246,0.1), 32px 32px 20px rgba(0,0,0,0.1)"
            />
            <ContentCard title="Telemedicine Consultations">
              <List
                items={[
                  "Doctor consultations via Zoom or video chat",
                  "Follow-up sessions from prior clinic visits",
                  "Remote prescription delivery (where available)"
                ]}
              />
              <p className="italic text-blue-600 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base px-2 leading-relaxed">
                "Care beyond clinics—connect with a doctor from wherever you are."
              </p>
              <p className="mt-3 sm:mt-4 text-blue-900 text-xs sm:text-sm md:text-base px-2 leading-relaxed">
                Telemedicine brings expert care to patients anywhere, enabling video consultations, timely advice, and home prescription delivery. It saves travel time, avoids crowded clinics, and supports ongoing care for chronic conditions.
              </p>
              <p className="mt-2 sm:mt-3 text-blue-900 text-xs sm:text-sm md:text-base px-2 leading-relaxed">
                MediLink's telemedicine makes healthcare accessible from anywhere. Patients can consult licensed doctors, get advice, and receive prescriptions at home—reducing travel and supporting ongoing care. The platform offers secure appointments, record sharing, specialist access, and remote monitoring, empowering patients and improving health outcomes, especially in underserved areas.
              </p>
            </ContentCard>
          </div>

          {/* Insurance */}
          <div className="mb-4 sm:mb-5 w-full flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
            <ContentCard title="Insurance & Financial Integration" reverse>
              <List
                items={[
                  "Integration with NHIF, SHA, and private covers",
                  "M-Pesa STK Push and mobile wallet payments",
                  "Debit/Credit card support (Stripe, Flutterwave)",
                  "Patient balance visibility & history",
                  "Instant payment confirmations and receipts",
                  "Automated reminders for upcoming bills and renewals",
                  "Secure data encryption for all financial transactions",
                  "Support for multiple currencies and payment methods"
                ]}
              />
              <p className="italic text-blue-600 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base px-2 leading-relaxed">
                "Affordable care for all—MediLink makes payments simple, secure, and offers subsidized services for those in need."
              </p>
              <p className="mt-3 sm:mt-4 text-blue-900 text-xs sm:text-sm md:text-base px-2 leading-relaxed">
                MediLink lets patients manage healthcare expenses and insurance in one place, with real-time updates on payments, claims, and balances. Integrated payment and insurance options help you focus on your health while MediLink handles the details.
              </p>
              <p className="mt-2 sm:mt-3 text-blue-900 text-xs sm:text-sm md:text-base px-2 leading-relaxed">
                You also get digital receipts, transaction history, and automatic reminders for bills and renewals. Advanced security protects your financial data, making payments and insurance easy and worry-free.
              </p>
            </ContentCard>
            <ImageCard
              src={PaymentsInsurance}
              alt="Insurance and Financial Integration"
              reverse
              shadow="-8px 8px 0px rgba(59,130,246,0.3), -16px 16px 0px rgba(59,130,246,0.2), -24px 24px 0px rgba(59,130,246,0.1), -32px 32px 20px rgba(0,0,0,0.1)"
            />
          </div>
        </div>

        {/* Closing Section */}
        <section className="mt-6 sm:mt-7 md:mt-8 w-full text-center flex flex-col items-center justify-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-800 mb-2 sm:mb-3 md:mb-4 font-serif px-2">
            Serving Patients with Purpose
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl px-2 leading-relaxed">
            Every feature is built from real patient stories and needs. With MediLink, you don't just access healthcare—you access hope, dignity, and a human connection.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Patients;
