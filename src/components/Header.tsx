import { Link } from "@tanstack/react-router";
import MenuDrawer from "./MenuDrawer";
import { logout, getAuthToken } from "~/utils/auth";
import { isStudentProfile } from "~/utils/profile";

const Header = () => {
  const isLoggedIn = !!getAuthToken();
  const isStudent = isStudentProfile();

  return (
    <header className="p-6 flex items-center bg-[#0f1117] border-b border-zinc-800" aria-label="Header">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold font-heading text-white">Edu Assist AI</h1>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 ml-auto">
        <Link to="/" className="text-base text-white hover:text-amber-400 transition-colors">
          Home
        </Link>
        <Link to="/dashboard" className="text-base text-white hover:text-amber-400 transition-colors">
          Dashboard
        </Link>
        {!isStudent && (
          <Link to="/guardian" className="text-base text-white hover:text-amber-400 transition-colors">
            Guardian
          </Link>
        )}
        <Link to="/chat" className="text-base text-white hover:text-amber-400 transition-colors">
          Chat
        </Link>
        {isLoggedIn && (
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-sm rounded-full py-2 px-5 hover:shadow-lg hover:shadow-amber-500/30 transition-all"
          >
            <span className="text-black text-sm font-bold">LOGOUT</span>
            <img
              src="/images/icon-logout.svg"
              alt="logout"
              className="w-4 h-4"
            />
          </button>
        )}
      </nav>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden ml-auto">
        <MenuDrawer
          trigger={
            <button aria-label="Menu">
              <img src="/images/icon-menu.svg" alt="Menu" className="w-8 h-8 brightness-0 invert" />
            </button>
          }
        />
      </div>
    </header>
  );
};

export default Header;
