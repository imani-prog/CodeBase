import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";
import LiveChatButton from "../../Components/LiveChatButton.jsx";

const Mission = () => {
  return (
    <div className="mb-10 w-full bg-blue-50 text-left">
      <LiveChatButton />
      
      <main className="flex flex-col items-center w-full px-0 py-10 max-w-[1200px] mx-auto">
        <section className="w-full flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6 text-center leading-tight">Vision & Mission</h1>
        </section>
        <section className="mb-10 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 flex flex-col items-start">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Mission</h2>
            <p className="text-lg">To revolutionize healthcare access in Africa by connecting communities, clinics, and caregivers through a smart digital platform that simplifies access to quality, affordable, and timely medical services.</p>
          </div>
          <div className="p-4 flex flex-col items-start">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Vision</h2>
            <p className="text-lg">A healthy and empowered Africa where every citizen can access quality care, anytime, anywhere.</p>
          </div>
        </section>


        {/* Video Section */}
        <section className="mb-10 w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">Watch Our Mission in Action</h2>
          <div className="w-full flex justify-center">
            <iframe
              width="900"
              height="420"
              src="https://www.youtube.com/embed/cM4aep7VXb8"
              title="MediLink Mission Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-2xl shadow-lg border border-blue-200"
            ></iframe>
          </div>
        </section>


        <section className="mb-0 w-full bg-blue-50 text-left">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-4 text-center">Core Values</h2>
          <p className="text-lg text-center mb-8 max-w-2xl mx-auto">Our values drive every decision, every innovation, and every interaction. They shape the MediLink experience for communities, clinics, and caregivers across Africa.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto justify-center">
            <div className="bg-blue-100 rounded-2xl shadow-lg p-4 flex flex-col items-center transition hover:scale-105 hover:bg-blue-200">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl mb-2">Compassionate Care</span>
              <span className="text-center">We put empathy and kindness at the heart of healthcare delivery.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:scale-105 hover:bg-blue-200">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl mb-2">Integrity</span>
              <span className="text-center">We uphold honesty, transparency, and ethical standards in all we do.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:scale-105 hover:bg-blue-200">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl mb-2">Accessibility</span>
              <span className="text-center">We break barriers to ensure everyone can access quality care.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:scale-105 hover:bg-blue-200">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl mb-2">Innovation</span>
              <span className="text-center">We embrace creativity and technology to solve real-world health challenges.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:scale-105 hover:bg-blue-200">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl mb-2">Accountability</span>
              <span className="text-center">We take responsibility for our actions and measure our impact.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:scale-105 hover:bg-blue-200">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl mb-2">Community Empowerment</span>
              <span className="text-center">We enable communities to take charge of their health and future.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:scale-105 hover:bg-blue-200">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl mb-2">Inclusivity</span>
              <span className="text-center">We celebrate diversity and ensure no one is left behind.</span>
            </div>
            <div className="bg-blue-100 rounded-2xl shadow-lg p-8 flex flex-col items-center transition hover:scale-105 hover:bg-blue-200">
              <span className="text-4xl mb-3"></span>
              <span className="font-bold text-blue-800 text-xl mb-2">Evidence-Based Practice</span>
              <span className="text-center">We use data and research to guide our decisions and improve outcomes.</span>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button className="px-6 py-3 bg-blue-700 text-white rounded-xl font-bold shadow-lg hover:bg-blue-800 transition">Learn More About Our Values</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Mission;
