/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DropdownMenu = ({ title, items, mobileOpen, setMobileOpen }) => {
  const [open, setOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const location = useLocation();

  // Toggle dropdown on click (for mobile)
  const handleClick = (e) => {
    e.stopPropagation();
    // Only toggle on click for mobile (when mobileOpen is defined)
    if (mobileOpen !== undefined) {
      setOpen((prev) => !prev);
    }
  };

  // Handle mouse enter for desktop hover
  const handleMouseEnter = () => {
    // Only show on hover for desktop (when mobileOpen is undefined)
    if (mobileOpen === undefined) {
      // Clear any pending timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setOpen(true);
    }
  };

  // Handle mouse leave for desktop hover
  const handleMouseLeave = () => {
    // Only hide on mouse leave for desktop (when mobileOpen is undefined)
    if (mobileOpen === undefined) {
      // Set a timeout to close the dropdown after a delay
      const id = setTimeout(() => {
        setOpen(false);
      }, 300);
      setTimeoutId(id);
    }
  };

  // Keep dropdown open when hovering over it
  const handleDropdownMouseEnter = () => {
    if (mobileOpen === undefined) {
      // Clear any pending timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setOpen(true);
    }
  };

  // Close dropdown when clicking outside (mobile only)
  useEffect(() => {
    if (!open || mobileOpen === undefined) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.dropdown-group')) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open, mobileOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  // Render dropdown menu
  return (
    <div 
      className="relative dropdown-group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-2 font-semibold px-3 py-2 rounded focus:outline-none transition-colors duration-200 ${
          mobileOpen !== undefined 
            ? "text-blue-900 hover:text-blue-600" // Mobile styling
            : "text-white hover:text-yellow-300"   // Desktop styling
        }`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
        type="button"
      >
        {title}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {/* Dropdown List */}
      <ul
        className={`absolute left-0 mt-1 w-56 bg-white text-blue-900 rounded shadow-lg z-50 transition-all duration-200 ${open ? "block" : "hidden"}`}
        role="menu"
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={` px-4 py-2 hover:bg-blue-100 rounded transition-colors flex items-center gap-3 ${location.pathname === item.to ? "bg-blue-50 font-bold text-blue-700" : ""}`}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                setMobileOpen && setMobileOpen(false);
              }}
            >
              {item.icon && <span className="text-blue-700 flex-shrink-0">{item.icon}</span>}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
