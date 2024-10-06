import React, { useState } from "react";
import { FaFish, FaRuler, FaPalette, FaCalendarAlt, FaChevronLeft, FaChevronRight, FaWater, FaLeaf } from "react-icons/fa";

const KoiAdvisor = () => {
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [showConsultation, setShowConsultation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 2;

  const koiSuggestions = [
    {
      name: "Kohaku",
      size: "Large",
      colors: "Red and White",
      habitat: "Pond",
      diet: "Omnivorous",
      image: "https://images.unsplash.com/photo-1530730504-9f2e594fcf91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Showa",
      size: "Medium",
      colors: "Black, Red, and White",
      habitat: "Large Tank",
      diet: "Pellets and Vegetables",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Sanke",
      size: "Small",
      colors: "White, Red, and Black",
      habitat: "Garden Pond",
      diet: "Insects and Plants",
      image: "https://images.unsplash.com/photo-1518713661966-2bc24632a4a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Taisho Sanke",
      size: "Medium to Large",
      colors: "White, Red, and Black",
      habitat: "Koi Pond",
      diet: "Balanced Koi Food",
      image: "https://images.unsplash.com/photo-1520990269335-9271441e202f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleConsultView = () => {
    if (yearOfBirth && !isNaN(yearOfBirth) && yearOfBirth.length === 4) {
      setShowConsultation(true);
    } else {
      alert("Please enter a valid year of birth");
    }
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = koiSuggestions.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-blue-100 to-green-100 rounded-3xl shadow-2xl border-4 border-blue-500">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-800 animate-pulse">
        Koi Fish Advisor
      </h1>
      <div className="mb-8 flex justify-center items-center space-x-4">
        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          <input
            type="text"
            value={yearOfBirth}
            onChange={(e) => setYearOfBirth(e.target.value)}
            placeholder="Year of Birth"
            className="pl-10 pr-4 py-3 border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition text-lg"
          />
        </div>
        <button
          onClick={handleConsultView}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 text-lg font-semibold"
        >
          View Consult
        </button>
      </div>
      {showConsultation && (
        <>
          <p className="text-2xl text-center mb-4 text-blue-800 font-bold">
            Your element: {new Date().getFullYear() - parseInt(yearOfBirth)}
          </p>
          <p className="text-xl text-center mb-8 text-blue-700">
            Here are our koi suggestions for you:
          </p>
          <div className="grid md:grid-cols-2 gap-10">
            {currentCards.map((koi, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 border-2 border-blue-300 hover:border-blue-500">
                <img
                  src={koi.image}
                  alt={koi.name}
                  className="w-full h-72 object-cover rounded-xl mb-6"
                />
                <h2 className="text-3xl font-bold mb-4 text-blue-800">{koi.name}</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaFish className="text-blue-500 text-2xl" />
                    <p className="text-blue-700 text-lg">Type: {koi.name}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaRuler className="text-blue-500 text-2xl" />
                    <p className="text-blue-700 text-lg">Size: {koi.size}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaPalette className="text-blue-500 text-2xl" />
                    <p className="text-blue-700 text-lg">Colors: {koi.colors}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaWater className="text-blue-500 text-2xl" />
                    <p className="text-blue-700 text-lg">Habitat: {koi.habitat}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaLeaf className="text-blue-500 text-2xl" />
                    <p className="text-blue-700 text-lg">Diet: {koi.diet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10 space-x-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              <FaChevronLeft className="text-2xl" />
            </button>
            <span className="text-2xl font-semibold text-blue-800 flex items-center">{currentPage}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastCard >= koiSuggestions.length}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              <FaChevronRight className="text-2xl" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default KoiAdvisor;
