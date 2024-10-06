import React, { useState } from "react";
import { FiHome, FiTrendingUp, FiSettings, FiLogIn } from "react-icons/fi";
import { GiMuscleUp, GiWeightLiftingUp } from "react-icons/gi";
import { IoFastFoodOutline } from "react-icons/io5";
import { FiActivity } from "react-icons/fi";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const links = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "Workouts", icon: <GiMuscleUp /> },
    { name: "Nutrition", icon: <IoFastFoodOutline /> },
    { name: "Progress", icon: <FiTrendingUp /> },
    { name: "Settings", icon: <FiSettings /> },
  ];

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    if (linkName === "Workouts") {
      setIsSubMenuOpen(!isSubMenuOpen);
    } else {
      setIsSubMenuOpen(false);
    }
  };

  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col transition-all duration-300 ease-in-out">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold">John Doe</h2>
            <p className="text-xs text-gray-400">Fitness Enthusiast</p>
          </div>
        </div>
      </div>

      <nav className="flex-grow py-4">
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => handleLinkClick(link.name)}
                className={`flex items-center w-full p-3 transition-colors duration-200 ${
                  activeLink === link.name
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
                aria-label={link.name}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </button>
              {link.name === "Workouts" && isSubMenuOpen && (
                <ul className="ml-6 mt-2 space-y-2 transition-all duration-300 ease-in-out">
                  <li>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200">
                      <GiWeightLiftingUp className="inline mr-2" />
                      Strength Training
                    </button>
                  </li>
                  <li>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200">
                      <FiActivity className="inline mr-2" />
                      Cardio
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4">
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center"
          aria-label="Logout"
        >
          <FiLogIn className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;