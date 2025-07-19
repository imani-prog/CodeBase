import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";

const AboutMediLink = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <Navbar />
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="w-full flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center leading-tight">About MediLink</h1>
        </section>
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8 text-left">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Who We Are</h2>
          <p className="text-lg text-blue-700 mb-4">MediLink is a digital health platform dedicated to transforming healthcare access across Africa. We connect patients, clinics, hospitals, and community health workers (CHWs) through innovative technology, making quality care accessible, affordable, and timely for everyone.</p>
          <p className="text-lg text-blue-700 mb-4">Our platform empowers CHWs, streamlines clinic operations, and provides real-time support and education to patients. We work closely with governments, NGOs, and partners to drive public health impact and create sustainable solutions for communities in need.</p>
          <p className="text-lg text-blue-700 mb-4">At MediLink, we believe in the power of technology to bridge gaps, save lives, and build healthier futures for all.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutMediLink;
