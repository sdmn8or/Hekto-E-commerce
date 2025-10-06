import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Mail, Phone, ShoppingCart, Heart, User, ChevronDown, Search, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 shadow-lg font-sans">
      {/* 1. Top Utility Bar (Purple) */}
      <div className="bg-[#7E33E0] text-white hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex justify-between items-center text-sm">
            {/* Contact Info (Left) */}
            <div className="flex space-x-6">
              <span className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>mhhasanali@gmail.com</span>
              </span>
              <span className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>(123) 456-7890</span>
              </span>
            </div>

            {/* User Info & Settings (Right) */}
            <div className="flex space-x-6 items-center">
              <span className="flex items-center space-x-1 cursor-pointer hover:text-gray-200 transition">
                <span>English</span>
                <ChevronDown className="w-3 h-3" />
              </span>
              <span className="flex items-center space-x-1 cursor-pointer hover:text-gray-200 transition">
                <span>USD</span>
                <ChevronDown className="w-3 h-3" />
              </span>
              <Link to="/login" className="flex items-center space-x-1 cursor-pointer hover:text-gray-200 transition">
                <span>Login</span>
                <User className="w-4 h-4" />
              </Link>
              <Link to="/wishlist" className="flex items-center space-x-1 cursor-pointer hover:text-gray-200 transition">
                <span>Wishlist</span>
                <Heart className="w-4 h-4" />
              </Link>
              {/* Cart Icon */}
              <Link to="/cart" className="cursor-pointer hover:text-gray-200 transition">
                <ShoppingCart className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (White) */}
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center h-20">
          
          {/* Logo (Left) */}
          <Link to="/" className="text-4xl font-extrabold text-[#0D0E43] mr-8">
            Hekto
          </Link>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden lg:flex flex-grow justify-center space-x-8 xl:space-x-12">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `font-medium text-lg transition duration-150 relative group ${
                    isActive ? 'text-[#FB2E86]' : 'text-[#0D0E43] hover:text-[#FB2E86]'
                  }`
                }
              >
                {link.name}
                {/* Active link indicator (matches Home in screenshot) */}
                {link.name === 'Home' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FB2E86] opacity-100"></span>}
              </NavLink>
            ))}
          </nav>

          {/* Search Bar (Right) */}
          <div className="flex items-center ml-auto">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-[#0D0E43] hover:text-[#FB2E86] transition mr-3"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex rounded-md overflow-hidden border border-gray-300">
              <input
                type="text"
                placeholder="Search..."
                className="py-2 px-3 sm:px-4 text-sm w-40 sm:w-64 focus:outline-none focus:ring-1 focus:ring-gray-300 transition duration-150"
              />
              <button className="bg-[#FB2E86] p-2 text-white hover:bg-[#E02978] transition duration-200">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mobile Menu Dropdown */}
      <div className={`lg:hidden bg-white shadow-lg absolute w-full transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col p-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={`mobile-${link.name}`}
              to={link.path}
              onClick={toggleMobileMenu} // Close menu on click
              className={({ isActive }) => 
                `p-3 text-lg font-medium rounded-lg text-left ${
                  isActive ? 'bg-gray-100 text-[#FB2E86]' : 'text-[#0D0E43] hover:bg-gray-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {/* Add Mobile-specific Utility Links */}
          <Link to="/login" onClick={toggleMobileMenu} className="p-3 text-lg font-medium text-[#0D0E43] hover:bg-gray-50 rounded-lg flex items-center space-x-2">
            <User className="w-5 h-5" /> <span>Login</span>
          </Link>
          <Link to="/cart" onClick={toggleMobileMenu} className="p-3 text-lg font-medium text-[#0D0E43] hover:bg-gray-50 rounded-lg flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" /> <span>Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
