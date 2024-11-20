import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmationAlert = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Open Logout Alert
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl"
            >
              <div className="flex items-center justify-center mb-4 text-red-500">
                <FiLogOut className="w-12 h-12" />
              </div>
              <h2 className="mb-4 text-xl font-semibold text-center text-gray-800">
                Are you sure you want to logout?
              </h2>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-white transition-colors duration-200 bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  aria-label="Confirm logout"
                >
                  Logout
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full px-4 py-2 text-gray-700 transition-colors duration-200 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                  aria-label="Cancel logout"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConfirmationAlert;