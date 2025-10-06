import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

// Link data structure
const categories = [
  { name: 'Laptops & Computers', path: '/category/laptops' },
  { name: 'Cameras & Photography', path: '/category/cameras' },
  { name: 'Smart Phones & Tablets', path: '/category/smartphones' },
  { name: 'Video Games & Consoles', path: '/category/gaming' },
  { name: 'Waterproof Headphones', path: '/category/headphones' },
];

const customerCare = [
  { name: 'My Account', path: '/account' },
  { name: 'Discount', path: '/discount' },
  { name: 'Returns', path: '/returns' },
  { name: 'Orders History', path: '/orders' },
  { name: 'Order Tracking', path: '/tracking' },
];

const pages = [
  { name: 'Blog', path: '/blog' },
  { name: 'Browse the Shop', path: '/shop' },
  { name: 'Category', path: '/category' },
  { name: 'Pre-Built Pages', path: '/pages' },
  { name: 'Visual Composer Elements', path: '/elements' },
  { name: 'WooCommerce Pages', path: '/woocommerce' },
];

export default function Footer() {
  return (
    <footer className="bg-[#F8F8FD] pt-16 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">

          {/* Column 1: Logo, Newsletter & Contact Info */}
          <div className="space-y-6 lg:pr-8">
            <Link to="/" className="text-4xl font-extrabold text-[#0D0E43]">
              Hekto
            </Link>
            
            {/* Newsletter Subscription */}
            <p className="text-[#8A8FB9]">
              {/* This is a visual match for the input design in the screenshot */}
            </p>
            <div className="flex w-full max-w-xs rounded-md overflow-hidden shadow-md">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="flex-grow py-3 px-4 text-sm text-gray-700 border-none focus:outline-none focus:ring-1 focus:ring-gray-300 transition duration-150"
              />
              <button className="bg-[#FB2E86] text-white font-semibold py-3 px-5 text-sm hover:bg-[#E02978] transition duration-200">
                Sign Up
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-1 text-[#8A8FB9]">
              <p className="font-semibold text-[#0D0E43] pt-4">Contact Info</p>
              <p>17 Princess Road, London, Greater London NW1 8JR, UK</p>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h3 className="text-xl font-bold text-[#0D0E43] mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-[#8A8FB9] hover:text-[#FB2E86] transition duration-150 text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h3 className="text-xl font-bold text-[#0D0E43] mb-6">Customer Care</h3>
            <ul className="space-y-3">
              {customerCare.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-[#8A8FB9] hover:text-[#FB2E86] transition duration-150 text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Pages */}
          <div>
            <h3 className="text-xl font-bold text-[#0D0E43] mb-6">Pages</h3>
            <ul className="space-y-3">
              {pages.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-[#8A8FB9] hover:text-[#FB2E86] transition duration-150 text-base"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* 2. Copyright and Social Bar (Bottom Purple) */}
      <div className="bg-[#E7E4F8] py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-[#9DA0AE] text-sm mb-3 sm:mb-0">
            ©Webecy - All Rights Reserved
          </p>
          <div className="flex space-x-3">
            <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-[#151875] hover:bg-[#FB2E86] transition duration-200">
              <Facebook className="w-4 h-4 text-white" />
            </a>
            <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-[#151875] hover:bg-[#FB2E86] transition duration-200">
              <Instagram className="w-4 h-4 text-white" />
            </a>
            <a href="#" aria-label="Twitter" className="p-2 rounded-full bg-[#151875] hover:bg-[#FB2E86] transition duration-200">
              <Twitter className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
