import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "@/app/components/Logo";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashNavigation = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      // If not on homepage, navigate to homepage with hash
      navigate(`/${hash}`);
    } else {
      // If on homepage, just scroll to section
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8EBEF]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <Logo 
              size={40} 
              variant="color" 
              className="transition-transform group-hover:scale-110"
            />
            <span className="text-xl font-semibold text-[#1E3D59]">
              Muhammad Azhar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/"
              className="px-4 py-2 text-[#1E3D59] hover:text-[#FA9819] transition-colors rounded-lg hover:bg-[#DEEEFE]"
            >
              Home
            </Link>
            <a
              href="#about"
              className="px-4 py-2 text-[#1E3D59] hover:text-[#FA9819] transition-colors rounded-lg hover:bg-[#DEEEFE]"
              onClick={(e) => handleHashNavigation(e, "#about")}
            >
              About
            </a>
            <a
              href="#portfolio"
              className="px-4 py-2 text-[#1E3D59] hover:text-[#FA9819] transition-colors rounded-lg hover:bg-[#DEEEFE]"
              onClick={(e) => handleHashNavigation(e, "#portfolio")}
            >
              Work
            </a>
            <Link
              to="/gallery"
              className="px-4 py-2 text-[#1E3D59] hover:text-[#FA9819] transition-colors rounded-lg hover:bg-[#DEEEFE]"
            >
              Gallery
            </Link>
            <a
              href="#writing"
              className="px-4 py-2 text-[#1E3D59] hover:text-[#FA9819] transition-colors rounded-lg hover:bg-[#DEEEFE]"
              onClick={(e) => handleHashNavigation(e, "#writing")}
            >
              Writing
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 bg-[#FA9819] text-white rounded-lg hover:bg-[#e8890f] transition-all duration-300 shadow-sm hover:shadow-md ml-2"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#1E3D59] hover:text-[#FA9819] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-[#E8EBEF] mt-4">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="px-4 py-3 text-[#1E3D59] hover:text-[#FA9819] hover:bg-[#DEEEFE] transition-colors rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="#about"
                className="px-4 py-3 text-[#1E3D59] hover:text-[#FA9819] hover:bg-[#DEEEFE] transition-colors rounded-lg"
                onClick={(e) => handleHashNavigation(e, "#about")}
              >
                About
              </a>
              <a
                href="#portfolio"
                className="px-4 py-3 text-[#1E3D59] hover:text-[#FA9819] hover:bg-[#DEEEFE] transition-colors rounded-lg"
                onClick={(e) => handleHashNavigation(e, "#portfolio")}
              >
                Work
              </a>
              <Link
                to="/gallery"
                className="px-4 py-3 text-[#1E3D59] hover:text-[#FA9819] hover:bg-[#DEEEFE] transition-colors rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <a
                href="#writing"
                className="px-4 py-3 text-[#1E3D59] hover:text-[#FA9819] hover:bg-[#DEEEFE] transition-colors rounded-lg"
                onClick={(e) => handleHashNavigation(e, "#writing")}
              >
                Writing
              </a>
              <a
                href="#contact"
                className="px-6 py-3 bg-[#FA9819] text-white rounded-lg hover:bg-[#e8890f] transition-all duration-300 text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}