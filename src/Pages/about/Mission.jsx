import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";

const Mission = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
      <Navbar />
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="w-full flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center leading-tight">Vision & Mission</h1>
        </section>
        <section className="mb-10 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col items-start">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Mission</h2>
            <p className="text-lg text-blue-700">To revolutionize healthcare access in Africa by connecting communities, clinics, and caregivers through a smart digital platform that simplifies access to quality, affordable, and timely medical services.</p>
          </div>
          <div className="bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8 flex flex-col items-start">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Vision</h2>
            <p className="text-lg text-blue-700">A healthy and empowered Africa where every citizen can access quality care, anytime, anywhere.</p>
          </div>
        </section>
        <section className="mb-10 w-full bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-blue-100 rounded-xl p-6 shadow text-lg text-blue-700 font-medium">Compassionate Care</div>
            <div className="bg-blue-100 rounded-xl p-6 shadow text-lg text-blue-700 font-medium">Integrity</div>
            <div className="bg-blue-100 rounded-xl p-6 shadow text-lg text-blue-700 font-medium">Accessibility</div>
            <div className="bg-blue-100 rounded-xl p-6 shadow text-lg text-blue-700 font-medium">Innovation</div>
            <div className="bg-blue-100 rounded-xl p-6 shadow text-lg text-blue-700 font-medium">Accountability</div>
            <div className="bg-blue-100 rounded-xl p-6 shadow text-lg text-blue-700 font-medium">Community Empowerment</div>
            <div className="bg-blue-100 rounded-xl p-6 shadow text-lg text-blue-700 font-medium">Inclusivity</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Mission;
