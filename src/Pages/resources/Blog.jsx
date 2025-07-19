import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/Navbar.jsx";

const Blog = () => (
  <div className="min-h-screen w-full flex flex-col font-sans bg-blue-50">
    <Navbar />
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-5xl font-extrabold text-blue-900 mb-8 text-center">Blog & Health Updates</h1>
      <section className="mb-10 bg-blue-100 rounded-2xl shadow-lg border border-blue-200 p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Latest Health News</h2>
        <ul className="list-disc list-inside text-blue-700 ml-6 mb-4">
          <li>How to prevent malaria in rural Kenya</li>
          <li>Maternal health tips for new mothers</li>
          <li>COVID-19 vaccination updates</li>
          <li>Nutrition and wellness for families</li>
        </ul>
        <p className="text-blue-700">Stay tuned for more updates, tips, and stories from the MediLink team and our partners.</p>
      </section>
      <section className="mb-10 bg-blue-50 rounded-2xl shadow-lg border border-blue-200 p-8">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Featured Stories</h2>
        <ul className="list-disc list-inside text-blue-700 ml-6 mb-4">
          <li>CHW success stories from Vihiga County</li>
          <li>How digital health is changing rural clinics</li>
          <li>Patient journeys: From booking to recovery</li>
        </ul>
      </section>
    </main>
    <Footer />
  </div>
);

export default Blog;
