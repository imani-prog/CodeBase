import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";

const Testimonials = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[900px] mx-auto">
        <section className="mb-10 w-full bg-blue-100 rounded-3xl shadow-xl border border-blue-200 p-10 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-6 text-center leading-tight">💬 What Our Users Say</h1>
          <p className="text-lg text-blue-700 text-center max-w-2xl mb-4">Real stories from real people. MediLink is already transforming lives across Kenya—connecting patients, clinics, and Community Health Workers through compassion and technology.</p>
        </section>
        <div className="grid grid-cols-1 gap-8 w-full mb-10">
          {/* Mary A. */}
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
            <h2 className="text-xl font-bold text-blue-800 mb-2">👩🏽 Mary A., Patient – Machakos County</h2>
            <blockquote className="italic text-blue-700 mb-2">"MediLink helped me get care at home when I needed it most. The CHWs are compassionate, professional, and truly care. I didn’t have to walk for hours or wait at the clinic—it came to me."</blockquote>
          </div>
          {/* James K. */}
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
            <h2 className="text-xl font-bold text-blue-800 mb-2">👨🏿‍⚕️ James K., Clinical Officer – Kisumu</h2>
            <blockquote className="italic text-blue-700 mb-2">"Thanks to MediLink, our clinic now reaches more patients than ever before. The system is efficient, easy to use, and has improved our service delivery. Bookings are smoother, and referrals are faster."</blockquote>
          </div>
          {/* Nancy M. */}
          <div className="bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
            <h2 className="text-xl font-bold text-blue-800 mb-2">👩🏾‍💻 Nancy M., Patient Support User</h2>
            <blockquote className="italic text-blue-700 mb-2">"The support desk resolved my M-Pesa payment issue quickly and with such kindness. I felt heard, and the team followed up until everything was working. Highly recommended!"</blockquote>
          </div>
          {/* Swahili Community Message */}
          <div className="bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 text-center">
            <h2 className="text-xl font-bold text-blue-800 mb-2">🌍 Swahili Community Message</h2>
            <blockquote className="italic text-blue-700 mb-2">"Karibu MediLink! Huduma za Afya kwa Wote."<br/><span className="text-blue-600">(Welcome to MediLink! Healthcare services for everyone.)</span></blockquote>
          </div>
        </div>
        {/* Impact Statement */}
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 text-left">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">💙 The Impact Is Real</h2>
          <ul className="list-disc list-inside text-blue-700 ml-6 mb-4">
            <li>Reducing wait times</li>
            <li>Empowering CHWs</li>
            <li>Improving health outcomes</li>
            <li>And most importantly—restoring trust in the healthcare journey</li>
          </ul>
        </section>
        {/* Call to Share Story */}
        <section className="mb-10 w-full bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">🗣️ Want to Share Your Story?</h2>
          <p className="text-lg text-blue-700">We’d love to hear from you. Use the form below or contact our support team to share how MediLink made a difference in your life or community.</p>
        </section>
      </main>
      
    </div>
  );
};

export default Testimonials;
