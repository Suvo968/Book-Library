import  { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: 'home' },
    { label: 'About', path: 'about' },
    { label: 'Shop', path: 'shop' },
    { label: 'Blog', path: 'blog' },
    { label: 'Sell Books', path: '/admin/dashboard' },
    { label: 'Cart', path: '/cart' }, // Add Cart item
  ];

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close the menu after clicking a section
    }
  };

  return (
    <nav className="fixed w-full top-0 left-0 bg-blue-900 shadow-md z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-white text-xl font-bold">Book System</div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          <ul className={`md:flex space-x-12 justify-center flex-grow hidden md:block`}>
            {navItems.map(({ label, path }) => (
              <li key={path}>
                {label !== 'Sell Books' && label !== 'Cart' ? (
                  <button
                    onClick={() => handleScrollToSection(path)}
                    className="block text-base text-white uppercase cursor-pointer text-center hover:text-blue-300 transition-colors"
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    to={path}
                    className="block text-base text-white uppercase cursor-pointer text-center hover:text-blue-300 transition-colors"
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {isMenuOpen && (
          <ul className="md:hidden flex flex-col space-y-4 mt-4">
            {navItems.map(({ label, path }) => (
              <li key={path}>
                {label !== 'Sell Books' && label !== 'Cart' ? (
                  <button
                    onClick={() => handleScrollToSection(path)}
                    className="block text-base text-white uppercase cursor-pointer text-center hover:text-blue-300 transition-colors"
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    to={path}
                    className="block text-base text-white uppercase cursor-pointer text-center hover:text-blue-300 transition-colors"
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;