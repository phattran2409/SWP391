import React, { useState } from "react";
import { MdArrowBack, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdWater, MdLandscape, MdGrass } from "react-icons/md";

const KoiFishDetails = () => {
  const colors = [
    { name: "Blue", hex: "#0000FF" },
    { name: "Black", hex: "#000000" },
    { name: "Red", hex: "#FF0000" }
  ];

  const fitWithElements = [
    { name: "Water", color: "#0000FF", icon: MdWater },
    { name: "Rocks", color: "#8B4513", icon: MdLandscape },
    { name: "Plants", color: "#008000", icon: MdGrass }
  ];

  const relatedKoi = [
    {
      name: "Kohaku Koi",
      image: "https://images.unsplash.com/photo-1520990269335-9271441e202f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "White body with red markings"
    },
    {
      name: "Showa Koi",
      image: "https://images.unsplash.com/photo-1598794262522-8bd7d2c7e3f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "Black body with red and white markings"
    },
    {
      name: "Butterfly Koi",
      image: "https://images.unsplash.com/photo-1531959870249-9f9b729efcf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      description: "Long, flowing fins and tail"
    },
    {
      name: "Tancho Koi",
      image: "https://images.unsplash.com/photo-1513550363509-7001d5c8e8b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description: "White body with red spot on head"
    }
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const pageCount = Math.ceil(relatedKoi.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageItems = relatedKoi.slice(offset, offset + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <button className="text-blue-600 flex items-center hover:text-blue-700 transition-colors">
          <MdArrowBack className="mr-2" />
          Back
        </button>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src="https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="Koi fish"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Koi Fish Details</h1>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-3 text-gray-700">Description</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Koi fish are colorful varieties of the Amur carp that are kept for decorative purposes in outdoor koi ponds or water gardens. Koi varieties are distinguished by coloration, patterning, and scalation.
              </p>
              <h3 className="text-2xl font-semibold mb-3 text-gray-700">Colors</h3>
              <div className="flex flex-wrap gap-4 mb-6">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                    <div
                      className="w-6 h-6 rounded-full mr-2"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <span className="text-gray-700">{color.name}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-700">Fit with element</h3>
              <div className="grid grid-cols-3 gap-4">
                {fitWithElements.map((element, index) => (
                  <div key={index} className="flex items-center">
                    <element.icon size={24} style={{ color: element.color }} className="mr-2" />
                    <span style={{ color: element.color }}>{element.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Koi with same element</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentPageItems.map((koi, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
              <img src={koi.image} alt={koi.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-700">{koi.name}</h3>
              <p className="text-gray-600">{koi.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="mx-2 p-2 bg-blue-600 text-white rounded-full disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            <MdKeyboardArrowLeft size={24} />
          </button>
          <span className="mx-4 text-lg font-semibold">
            Page {currentPage + 1} of {pageCount}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 1))}
            disabled={currentPage === pageCount - 1}
            className="mx-2 p-2 bg-blue-600 text-white rounded-full disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            <MdKeyboardArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KoiFishDetails;