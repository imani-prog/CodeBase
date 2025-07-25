import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

const FAQs = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[900px] mx-auto">
        <section className="mb-10 w-full bg-blue-100 rounded-3xl shadow-xl border border-blue-200 p-10 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-4 text-center leading-tight">❓ Frequently Asked Questions</h1>
          <p className="text-lg text-blue-700 text-center max-w-2xl mb-4">Have questions about how MediLink works? You're in the right place. We've compiled answers to the most common questions from patients, CHWs, clinics, and partners.</p>
        </section>
        {/* About MediLink */}
        <section className="mb-8 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🩺 About MediLink</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700">Q: What is MediLink?</h3>
            <p className="text-blue-900">A: MediLink is a digital health platform that connects patients, clinics/hospitals, and Community Health Workers (CHWs) to make healthcare easier, faster, and more accessible. Whether you need to book an appointment, request home-based care, or consult a doctor online—MediLink is your healthcare companion.</p>
          </div>
        </section>
        {/* Registration & Access */}
        <section className="mb-8 w-full bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">📝 Registration & Access</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700">Q: How do I register for MediLink?</h3>
            <p className="text-blue-900">A: You can register online using the Register button on the top-right of the site. Choose your role:</p>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Patient</li>
              <li>Community Health Worker (CHW)</li>
              <li>Clinic or Hospital Staff</li>
            </ul>
            <p className="text-blue-900">Rural users can also register using USSD codes (coming soon) or with assistance from CHWs.</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700">Q: Is there a registration fee?</h3>
            <p className="text-blue-900">A: No. Registration is completely free for all users.</p>
          </div>
        </section>
        {/* Platform Services */}
        <section className="mb-8 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">⚙️ Platform Services</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700">Q: What services does MediLink offer?</h3>
            <p className="text-blue-900">A: MediLink offers a wide range of services, including:</p>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>Booking clinic visits and home-based care</li>
              <li>Insurance integration (NHIF, SHA)</li>
              <li>CHW tools for visit tracking, incentives, and patient care</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700">Q: Can I use MediLink without visiting a clinic?</h3>
            <p className="text-blue-900">A: Absolutely. You can request home visits, access telemedicine, or receive health tips without physically going to a facility.</p>
          </div>
        </section>
        {/* Payments & Insurance */}
        <section className="mb-8 w-full bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">💳 Payments & Insurance</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700">Q: How do I pay for services on MediLink?</h3>
            <p className="text-blue-900">A: You can securely pay using:</p>
            <ul className="list-disc list-inside text-blue-700 ml-6 mb-2">
              <li>M-Pesa STK Push</li>
              <li>Debit/Credit Card (via Stripe or Flutterwave)</li>
              <li>NHIF / SHA Insurance</li>
              <li>Donations or subsidies for supported cases</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700">Q: Can I split payments or pay partially?</h3>
            <p className="text-blue-900">A: Yes. MediLink supports partial payments through insurance or donor support, depending on your service and eligibility.</p>
          </div>
        </section>
        {/* Privacy & Data Protection */}
        <section className="mb-8 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🔐 Privacy & Data Protection</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700">Q: Is my personal health information safe?</h3>
            <p className="text-blue-900">A: Yes. MediLink is fully GDPR and Kenya Data Protection Act 2019 compliant. All health records are encrypted and only accessible by authorized personnel.</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700">Q: Will my data be shared with third parties?</h3>
            <p className="text-blue-900">A: No. Your data will never be sold or misused. It is only used for healthcare delivery and improvement within MediLink’s ecosystem.</p>
          </div>
        </section>
        {/* Support & Help */}
        <section className="mb-8 w-full bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🛠️ Support & Help</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700">Q: What if I face issues with registration or payment?</h3>
            <p className="text-blue-900">A: Our dedicated Support Desk is available through your dashboard. Simply raise a support ticket, and our team will respond promptly.</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700">Q: How long does support take?</h3>
            <p className="text-blue-900">A: Most issues are resolved within 24 hours. Urgent matters like ambulance dispatch are prioritized immediately.</p>
          </div>
        </section>
        {/* Partnerships & Opportunities */}
        <section className="mb-8 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🤝 Partnerships & Opportunities</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700">Q: Can my clinic or hospital join MediLink?</h3>
            <p className="text-blue-900">A: Yes. We welcome healthcare providers looking to digitize and expand their services. Visit the Partners page to learn more.</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-700">Q: Do you work with NGOs or donors?</h3>
            <p className="text-blue-900">A: Absolutely. MediLink partners with organizations to fund outreach, support CHWs, and improve community health access. Visit the Donate or Become a Partner section for more.</p>
          </div>
        </section>
        {/* Still Have Questions */}
        <section className="mb-10 w-full bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">👂 Still Have Questions?</h2>
          <p className="text-lg text-blue-700">We’re here to help!<br/>👉 <a href="/contact" className="text-blue-600 underline">Contact Us</a> or <a href="/support" className="text-blue-600 underline">Raise a Support Ticket</a> anytime.</p>
        </section>
      </main>
       
    </div>
  );
};

export default FAQs;
