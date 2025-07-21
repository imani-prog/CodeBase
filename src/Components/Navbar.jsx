/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DropdownMenu from "./DropdownMenu.jsx";

const menuGroups = [
  {
    title: "About",
    items: [
      { label: "About MediLink", to: "/about/aboutmedilink" },
      { label: "Our Story", to: "/about/story" },
      { label: "The Team", to: "/about/team" },
      { label: "Vision & Mission", to: "/about/mission" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Patient Services", to: "/services/patients" },
      { label: "CHW Services", to: "/services/chws" },
      { label: "Clinic & Hospital Tools", to: "/services/clinics" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "For Patients", to: "/solutions/patients" },
      { label: "For CHWs", to: "/solutions/chws" },
      { label: "For Hospitals", to: "/solutions/hospitals" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Blog / Health Updates", to: "/blog" },
      { label: "FAQs", to: "/faqs" },
      { label: "Tech Stack", to: "/tech" },
      { label: "Support Desk", to: "/support" },
    ],
  },
  {
    title: "Partners",
    items: [
      { label: "Our Partners", to: "/partners" },
      { label: "Become a Partner", to: "/partners/join" },
      { label: "NGO & Sponsors", to: "/partners/sponsors" },
    ],
  },
  {
    title: "Engage",
    items: [
      { label: "Contact Us", to: "/contact" },
      { label: "Donate", to: "/donate" },
      { label: "Careers", to: "/careers" },
    ],
  },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  return (
   <nav className="sticky top-0 z-50 bg-blue-50 shadow-sm">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
    {/* Logo */}
    <Link
      to="/"
      className="text-2xl font-bold text-blue-900 hover:text-blue-700 tracking-tight"
      aria-label="Go to homepage"
    >
      MediLink
    </Link>

    {/* Desktop Menu */}
    <div className="hidden md:flex items-center gap-6 text-[15px]">
      <Link
        to="/"
        className="font-semibold hover:text-blue-700 px-2 py-1 rounded transition duration-200"
      >
        Home
      </Link>
      {menuGroups.map((group) => (
        <DropdownMenu key={group.title} title={group.title} items={group.items} />
      ))}
    </div>

    {/* Auth Buttons */}
    <div className="hidden md:flex gap-2 items-center">
      <Link
        to=""
        className="px-3 py-1 text-blue-800 text-sm font-medium rounded transition duration-200 hover:border hover:border-blue-500 hover:text-blue-900"
      >
        Login
      </Link>
      <Link
        to=""
        className="px-3 py-1 text-blue-800 text-sm font-medium rounded transition duration-200 hover:border hover:border-blue-500 hover:text-blue-900"
      >
        Register
      </Link>
    </div>

    {/* Hamburger for mobile */}
    <button
      className="md:hidden flex items-center px-2 py-1"
      onClick={() => setMobileOpen(true)}
      aria-label="Open menu"
    >
      <svg
        className="w-7 h-7 text-blue-900"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  {/* Mobile Menu */}
  {mobileOpen && (
    <div className="fixed inset-0 bg-blue-50 z-50 flex flex-col">
      <div className="flex justify-between items-center px-6 py-4 border-b border-blue-200">
        <Link to="/" className="text-2xl font-bold text-blue-900" aria-label="Go to homepage">MediLink</Link>
        <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <svg
            className="w-7 h-7 text-blue-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
        {menuGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <DropdownMenu
              title={group.title}
              items={group.items}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />
          </div>
        ))}
        <div className="flex gap-4 mt-8">
          <Link
            to=""
            className="w-full text-center text-blue-800 text-sm font-medium py-2 rounded border border-transparent hover:border-blue-500 transition duration-200"
          >
            Login
          </Link>
          <Link
            to=""
            className="w-full text-center text-blue-800 text-sm font-medium py-2 rounded border border-transparent hover:border-blue-500 transition duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )}
</nav>

  );
};

export default Navbar;
