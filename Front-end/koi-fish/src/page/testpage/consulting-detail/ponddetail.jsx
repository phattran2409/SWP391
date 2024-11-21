import React, { useState, useEffect } from "react";
import api from "../../../config/axios";
import { GiMetalBar } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { IoBuild } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import FishpondAdvisor from "../../../components/fishpond-advisor/fishpondadvisor";
import {
  MdArrowBack,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdWater,
  MdLandscape,
  MdGrass,
  MdLocalFireDepartment,
} from "react-icons/md";
import Navbar from "../../../components/navbar/Navbar";
import "./animate.css";
import { toast } from "react-toastify";

const pondDetails = () => {
  const fitWithElements = [
    { name: "Metal", color: "#696969", icon: GiMetalBar, description: "Metal elements benefit from raising fish, as they symbolize stability and prosperity. The numbers 4 and 9 represent completion, longevity, and success, aligning with Metal's focus on precision." },
    { name: "Wood", color: "#008000", icon: MdGrass, description: "Fish for Wood enhance growth and harmony, supporting Wood's creative and nurturing qualities. The numbers 3 and 8 symbolize renewal, prosperity, and abundance, reflecting Wood’s expanding nature."  },
    { name: "Water", color: "#0000FF", icon: MdWater, description: "Raising fish helps Water elements adapt and grow, promoting smooth journeys and personal development. The numbers 1 and 6 represent leadership, luck, and smooth progression, enhancing Water's fluid energy.Metal elements benefit from raising fish, as they symbolize stability and prosperity. The numbers 4 and 9 represent completion, longevity, and success, aligning with Metal's focus on precision."  },
    { name: "Fire", color: "#FF4500", icon: MdLocalFireDepartment, description: "Fish for Fire bring balance and strength, supporting Fire's dynamic and energetic nature. The numbers 2 and 7 symbolize partnerships, personal strength, and determination, encouraging cooperation and growth."},
    { name: "Earth", color: "#8B4513", icon: MdLandscape, description:"Earth thrives with fish that symbolize stability and nourishment, aligning with Earth’s grounded, nurturing qualities. The numbers 5 and 10 represent support, stability, and completeness, bringing balance to Earth’s energy."  },
  ];

  const [pondetail, setPondDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedPondLoading, setRelatedPondLoading] = useState(true);
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
      const response = await api.get(`v1/pond/getById/${id}`);
      setPondDetail(response.data); // Save the fetched object
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async () => {
    try {
      const response = await api.post(
        `v1/user/addToWishList?itemId=${id}&wishlistType=ponds`
      );

      if (response.status === 400) {
        toast.info("Item already exists in your favorite list");
      } else if (response.status === 200) {
        toast.success("Item added to your favorite list successfully");
      } else {
        toast.warning("Unexpected response from server");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 400) {
        toast.info("Item already exists in your favorite list");
      } else {
        toast.error("Failed to add item to your favorite list");
      }
    }
  };

  useEffect(() => {
    ponById(); // Fetch pond detail when component mounts
    setLoading(true);
  }, [id]);

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
    } finally {
      setRelatedPondLoading(false);
    }
  };

  useEffect(() => {
    relatedPond(pagination.current, pagination.pageSize);
    setRelatedPondLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize]);

  // Handle pagination change
  const handleTableChange = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-100">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/consulting"
            className="text-red-600 flex items-center hover:text-red-500 transition-colors"
          >
            <MdArrowBack className="mr-2" />
            Back To Consulting
          </Link>
        </div>

        {loading ? (
          // Display spinner while loading
          <div className="flex justify-center items-center h-64">
            <div className="spinner"></div>
          </div>
        ) : (
          
          <div className="animate-fadeIn bg-white p-8 rounded-lg shadow-lg">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <img
                src={pondetail.image}
                alt="Koi fish"
                className="w-full object-cover rounded-lg shadow-lg"
                style={{ height: "515px" }}
              />

              <div>
                <div className="flex">
                  <h1 className="text-4xl font-bold mb-6 text-gray-800">
                    {pondetail.shape} Pond
                  </h1>
                  {pondetail.elementID && (
                    <span className="ml-2 mr-5 flex items-center">
                      {fitWithElements[pondetail.elementID - 1]?.icon && (
                        <>
                          {React.createElement(
                            fitWithElements[pondetail.elementID - 1].icon,
                            {
                              size: 40,
                              style: {
                                color:
                                  fitWithElements[pondetail.elementID - 1]
                                    .color,
                              },
                              className: "ml-5 mb-5",
                            }
                          )}
                          <span
                            className="mb-5"
                            style={{
                              color:
                                fitWithElements[pondetail.elementID - 1].color,
                              marginLeft: "8px",
                              fontSize: "1.5rem",
                            }}
                          >
                            {fitWithElements[pondetail.elementID - 1].name}
                          </span>
                        </>
                      )}
                    </span>
                  )}
                  <button
                    onClick={addToWishlist}
                    className="ml-auto bg-red-600 text-white rounded-full p-2 hover:bg-red-500 transition-colors"
                  >
                    <FaHeartCirclePlus size={30} />
                  </button>
                </div>
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
                </div>

                <FishpondAdvisor
                  pondId={pondetail.elementID}
                  elementName={fitWithElements[pondetail.elementID - 1].name}
                />
                
              </div>
                
            </div>
            <div className=" p-6 rounded-lg shadow-lg mt-8">
      <h3 className="flex text-2xl font-semibold text-gray-700"><FaStar className="mr-2"  color="#F7E35F" />Did You Know?</h3>
      <p className="text-gray-600 mt-4">
        {fitWithElements[pondetail.elementID - 1].description}
      </p>
    </div>
          </div>
        )}
        {relatedPondLoading ? (
          // Display spinner while loading
          <div className="flex justify-center items-center h-64">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Related Ponds
            </h2>
            <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-3 gap-8">
              {datas.map((pond, index) => (
                <Link
                  key={pond._id || index}
                  to={`/ponddetail/${pond._id}`}
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
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={() => handleTableChange(pagination.current - 1)}
                disabled={pagination.current === 1}
                className="mx-2 p-2 bg-red-600 text-white rounded-full disabled:opacity-50 hover:bg-red-500 transition-colors"
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
                className="mx-2 p-2 bg-red-600 text-white rounded-full disabled:opacity-50 hover:bg-red-500 transition-colors"
              >
                <MdKeyboardArrowRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default pondDetails;
