import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="mb-4">We are a company dedicated to providing innovative solutions for our customers.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="/home" className="hover:text-gray-300 transition-colors duration-300">Home</a></li>
              <li><a href="/aboutus" className="hover:text-gray-300 transition-colors duration-300">About Us</a></li>
              <li><a href="/consult" className="hover:text-gray-300 transition-colors duration-300">Services</a></li>
              <li><a href="/contactus" className="hover:text-gray-300 transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for updates and offers.</p>
            <form className="flex w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Subscribe
              </button>
            </form>

          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center"> {/* Adjusted pt-8 to pt-4 */}
          <p className="text-sm">&copy; 2024 Feng Shui Koi. All rights reserved.</p> {/* Added text-sm for smaller text size */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
