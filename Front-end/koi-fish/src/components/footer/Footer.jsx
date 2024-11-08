import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHome, FaPhone } from 'react-icons/fa';

const   Footer = () => {
  return (
    <footer className="bg-black text-white pt-8">
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
              <li><a href="/home" className="hover:text-gray-300 transition-colors duration-300 flex items-center">
                <FaHome className="mr-2" />Home
              </a></li>
              {/* <li><a href="/aboutus" className="hover:text-gray-300 transition-colors duration-300">About Us</a></li> */}
              {/* <li><a href="/consult" className="hover:text-gray-300 transition-colors duration-300">Services</a></li> */}
              <li><a href="/contactus" className="hover:text-gray-300 transition-colors duration-300 flex items-center">
                <FaPhone className="mr-2" /> Contact Us
              </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for updates and offers.</p>


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
