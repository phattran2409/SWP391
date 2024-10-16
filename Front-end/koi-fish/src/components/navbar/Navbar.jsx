import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close menu when pressing the "Esc" key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Close menu when a link is clicked
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 py-3 bg-black">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <span className="text-white text-lg font-semibold">Feng Shui Koi</span>

                {/* Mobile Menu Button */}
                <div className="lg:hidden">
                    <button 
                        aria-label="Toggle menu"
                        className="text-white focus:outline-none"
                        onClick={toggleMenu}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Main Nav for Large Screens */}
                <div className="hidden lg:flex items-center space-x-6">
                    <ul className="flex space-x-8">
                        <li><a href="/home" className="text-white hover:text-neutral-500 transition duration-300">Home</a></li>
                        <li><a href="/about" className="text-white hover:text-neutral-500 transition duration-300">About</a></li>
                        <li><a href="/consult" className="text-white hover:text-neutral-500 transition duration-300">Consult</a></li>
                        <li><a href="/contactus" className="text-white hover:text-neutral-500 transition duration-300">Contact Us</a></li>
                        <li><a href="/news" className="text-white hover:text-neutral-500 transition duration-300">News</a></li>
                    </ul>

                    <div className="h-6 border-l border-neutral-500 mx-4"></div>

                    <button className="text-white hover:text-neutral-500 focus:outline-none">
                        <Search className="w-5 h-5" />
                    </button>

                    <a
                        href="/login"
                        className="ml-4 px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-black transition duration-300">
                        Login
                    </a>
                    <a
                        href="/register"
                        className="ml-4 px-4 py-2 text-white border border-white rounded hover:bg-white hover:text-black transition duration-300">
                        Signup
                    </a>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`fixed top-0 right-0 w-64 h-full bg-black z-50 p-6 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button 
                    aria-label="Close menu"
                    onClick={toggleMenu}
                    className="text-white mb-4"
                >
                    <X className="w-6 h-6" />
                </button>

                <ul className="space-y-4">
                    <li><a href="/home" className="text-white hover:text-neutral-500 transition duration-300" onClick={handleLinkClick}>Home</a></li>
                    <li><a href="/about" className="text-white hover:text-neutral-500 transition duration-300" onClick={handleLinkClick}>About</a></li>
                    <li><a href="/consult" className="text-white hover:text-neutral-500 transition duration-300" onClick={handleLinkClick}>Consult</a></li>
                    <li><a href="/contactus" className="text-white hover:text-neutral-500 transition duration-300" onClick={handleLinkClick}>Contact Us</a></li>
                    <li><a href="/news" className="text-white hover:text-neutral-500 transition duration-300" onClick={handleLinkClick}>News</a></li>
                </ul>

                {/* Login and Signup in Mobile Menu */}
                <div className="mt-6">
                    <a
                        href="/login"
                        className="block px-4 py-2 text-white rounded hover:bg-white hover:text-black transition duration-300 mb-4 text-center">
                        Login
                    </a>
                    <a
                        href="/register"
                        className="block px-4 py-2 text-white hover:bg-white hover:text-black transition duration-300 text-center">
                        Signup
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
