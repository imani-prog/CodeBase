import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DropdownMenu = ({ title, items, mobileOpen, setMobileOpen }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Toggle dropdown on click
  const handleClick = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.dropdown-group')) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  // Render dropdown menu
  return (
    <div className="relative dropdown-group">
      <button
        className="flex items-center gap-1 font-semibold px-3 py-2 rounded hover:text-blue-600 focus:outline-none"
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
        className={`absolute left-0 mt-2 w-56 bg-white text-blue-900 rounded shadow-lg z-50 transition-all duration-200 ${open ? "block" : "hidden"}`}
        role="menu"
      >
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={`block px-4 py-2 hover:bg-blue-100 rounded transition-colors flex items-center ${location.pathname === item.to ? "bg-blue-50 font-bold text-blue-700" : ""}`}
              role="menuitem"
              onClick={() => {
                setOpen(false);
                setMobileOpen && setMobileOpen(false);
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownMenu;
