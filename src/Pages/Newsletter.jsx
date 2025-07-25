import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";
const Newsletter = () => (
  <>
    
    <div className="min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h1>
      <p className="mb-8">Stay updated with the latest news, health tips, and MediLink updates. Enter your email below to subscribe:</p>
      <form className="max-w-md mx-auto mb-8 bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <label htmlFor="newsletter-email" className="font-semibold">Email Address</label>
        <input
          type="email"
          id="newsletter-email"
          name="email"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="you@example.com"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Subscribe
        </button>
      </form>
      <p className="text-gray-600 text-sm">We respect your privacy. Unsubscribe at any time.</p>
    </div>
    
  </>
);

export default Newsletter;
