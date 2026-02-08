import { useState } from "react";
import { Menu, X, Ghost } from "lucide-react";
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200" style={{ fontFamily: 'var(--font-primary)' }}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <Ghost 
              size={24} 
              className="transition-transform group-hover:scale-110 text-black"
            />
            <span className="text-xl font-semibold text-black">
              Muhammad Azhar
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/"
              className="px-4 py-2 text-gray-700 hover:text-accent transition-colors rounded-[var(--radius)] hover:bg-gray-50"
            >
              Home
            </Link>
            <a
              href="#about"
              className="px-4 py-2 text-gray-700 hover:text-accent transition-colors rounded-[var(--radius)] hover:bg-gray-50"
              onClick={(e) => handleHashNavigation(e, "#about")}
            >
              About
            </a>
            <a
              href="#portfolio"
              className="px-4 py-2 text-gray-700 hover:text-accent transition-colors rounded-[var(--radius)] hover:bg-gray-50"
              onClick={(e) => handleHashNavigation(e, "#portfolio")}
            >
              Work
            </a>
            <a
              href="#writing"
              className="px-4 py-2 text-gray-700 hover:text-accent transition-colors rounded-[var(--radius)] hover:bg-gray-50"
              onClick={(e) => handleHashNavigation(e, "#writing")}
            >
              Writing
            </a>
            <a
              href="https://cal.com/muhammad-azhar-tbumar/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luma btn-luma--primary px-6 py-2.5 transition-all duration-300 ml-2"
            >
              Schedule a Call
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn-luma btn-luma--icon md:hidden p-2 text-black transition-colors"
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
          <div className="md:hidden pt-4 pb-2 border-t border-gray-200 mt-4">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="px-4 py-3 text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors rounded-[var(--radius)]"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="#about"
                className="px-4 py-3 text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors rounded-[var(--radius)]"
                onClick={(e) => handleHashNavigation(e, "#about")}
              >
                About
              </a>
              <a
                href="#portfolio"
                className="px-4 py-3 text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors rounded-[var(--radius)]"
                onClick={(e) => handleHashNavigation(e, "#portfolio")}
              >
                Work
              </a>
              <a
                href="#writing"
                className="px-4 py-3 text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors rounded-[var(--radius)]"
                onClick={(e) => handleHashNavigation(e, "#writing")}
              >
                Writing
              </a>
              <a
                href="https://cal.com/muhammad-azhar-tbumar/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luma btn-luma--primary px-6 py-3 transition-all duration-300 text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Schedule a Call
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
