import React, { useState, useEffect } from "react";
import api from "../../../config/axios";
import { GiMetalBar } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import {
  MdArrowBack,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdWater,
  MdLandscape,
  MdGrass,
  MdLocalFireDepartment,
} from "react-icons/md";

const pondDetails = () => {
  const colors = [
    { name: "Blue", hex: "#0000FF" },
    { name: "Black", hex: "#000000" },
    { name: "Red", hex: "#FF0000" },
  ];
  const fitWithElements = [
    { name: "Metal", color: "#696969", icon: GiMetalBar },
    { name: "Wood", color: "#008000", icon: MdGrass },
    { name: "Water", color: "#0000FF", icon: MdWater },
    { name: "Fire", color: "#FF4500", icon: MdLocalFireDepartment },
    { name: "Earth", color: "#8B4513", icon: MdLandscape },
  ];

  const [pondetail, setPondDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1, // Current page
    pageSize: 3, // Default limit
    total: 0, // Initially 0
  });
  const { id } = useParams();
  const [datas, setDatas] = useState([]);

  const ponById = async () => {
    try {
      const response = await api.get(
        `v1/pond/getById/${id}`
      );
      setPondDetail(response.data); // Save the fetched object
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ponById(); // Fetch pond detail when component mounts
  }, []);

  useEffect(() => {
    if (pondetail.elementID) {
      // Only call relatedPond when pondetail.elementID is available
      relatedPond(pagination.current, pagination.pageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pondetail.elementID, pagination.current, pagination.pageSize]);

  const relatedPond = async (
    page = pagination.current,
    limit = pagination.pageSize
  ) => {
    try {
      const response = await api.get(
        `v1/pond/getByElement/${pondetail.elementID}?page=${page}&limit=${limit}`
      );

      // Update state with fetched data
      setDatas(response.data.data);

      // Update pagination info
      setPagination((prev) => ({
        ...prev,
        current: response.data.currentPage,
        total: response.data.totalDocuments,
        pageSize: limit,
      }));
    } catch (err) {
      // Handle error
      console.error(err);
    }
  };

  useEffect(() => {
    relatedPond(pagination.current, pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize]);

  // Handle pagination change
  const handleTableChange = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <a href="/consulting" className="text-blue-600 flex items-center hover:text-blue-700 transition-colors">
          <MdArrowBack className="mr-2" />
          Back
        </a>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={pondetail.image}
            alt="Koi fish"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold mb-6 text-gray-800">
              {pondetail.shape} Pond
            </h1>
            <div className="mb-6">
              <div className="flex ">
                <h3 className="text-2xl font-semibold text-gray-700">
                  Description
                </h3>
                <IoBookSharp size={24} className="ml-2 text-gray-700" />
              </div>
              <br />
              <p className="text-gray-600 mb-4 leading-relaxed">
                {pondetail.description}
              </p>
              <div className="flex ">
                <h3 className="text-2xl font-semibold text-gray-700">
                  Suitable Build Path
                </h3>
                <IoBuild size={24} className="ml-2 text-gray-700" />
              </div>
              <br />

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <strong>
                    <p className="text-gray-700">Direction</p>
                  </strong>
                  <p className="text-gray-700">{pondetail.direction}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <strong>
                    <p className="text-gray-700">Plants</p>
                  </strong>
                  <p className="text-gray-700">{pondetail.trees}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <strong>
                    <p className="text-gray-700">Water Flow</p>
                  </strong>
                  <p className="text-gray-700">{pondetail.waterFlow}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <strong>
                    <p className="text-gray-700">Light</p>
                  </strong>
                  <p className="text-gray-700">{pondetail.light}</p>
                </div>
              </div>
              <br />
              <h3 className="text-2xl font-semibold mb-3 text-gray-700">
                Colors
              </h3>
              <div className="flex flex-wrap gap-4 mb-6">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                  >
                    <div
                      className="w-6 h-6 rounded-full mr-2"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <span className="text-gray-700">{color.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex ">
                <h3 className="text-2xl font-semibold text-gray-700">
                  Fit With Element
                </h3>
                {pondetail.elementID && (
                  <span className="ml-2 flex items-center">
                    {fitWithElements[pondetail.elementID - 1]?.icon && (
                      <>
                        {React.createElement(
                          fitWithElements[pondetail.elementID - 1].icon,
                          {
                            size: 30,
                            style: {
                              color:
                                fitWithElements[pondetail.elementID - 1].color,
                            },
                            className: "ml-2",
                          }
                        )}
                        <span
                          style={{
                            color:
                              fitWithElements[pondetail.elementID - 1].color,
                            marginLeft: "8px", fontSize: "1.2rem"
                          }}
                        >
                          {fitWithElements[pondetail.elementID - 1].name}
                        </span>
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Related Ponds</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {datas.map((pond, index) => (
            <a
              key={pond._id || index}
              href={`/ponddetail/${pond._id}`}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <img
                src={pond.image}
                alt={`Image of ${pond.shape}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                {pond.shape}
              </h3>
              <p className="text-gray-600">
                {pond.description.length > 70
                  ? `${pond.description.slice(0, 70)}...`
                  : pond.description}
              </p>
            </a>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handleTableChange(pagination.current - 1)}
            disabled={pagination.current === 1}
            className="mx-2 p-2 bg-blue-600 text-white rounded-full disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            <MdKeyboardArrowLeft size={24} />
          </button>
          <span className="mx-4 text-lg font-semibold">
            Page {pagination.current} of{" "}
            {Math.ceil(pagination.total / pagination.pageSize)}
          </span>
          <button
            onClick={() => handleTableChange(pagination.current + 1)}
            disabled={
              pagination.current ===
              Math.ceil(pagination.total / pagination.pageSize)
            }
            className="mx-2 p-2 bg-blue-600 text-white rounded-full disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            <MdKeyboardArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default pondDetails;
