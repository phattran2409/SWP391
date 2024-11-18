import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import api from "../../config/axios";
import "../../page/testpage/consulting-detail/animate.css";
import { set } from "lodash";
const CardDetail = ({ elementID }) => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1, // Current page
    pageSize: 2, // Default limit
    total: 0, // Initially 0
  });

  // Fetch related ponds
  const fetchRelatedPonds = async (page = pagination.current, limit = pagination.pageSize) => {
    try {
      const response = await api.get(
        `v1/pond/getByElement/${elementID}?page=${page}&limit=${limit}`
      );

      setDatas(response.data.data); // Save related ponds data
      setPagination((prev) => ({
        ...prev,
        current: response.data.currentPage,
        total: response.data.totalDocuments,
        pageSize: limit,
      }));
    } catch (err) {
      console.error("Error fetching related ponds:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch related ponds whenever elementID or pagination changes
  useEffect(() => {
    setLoading(true);
    if (elementID) {
      fetchRelatedPonds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementID, pagination.current, pagination.pageSize]);

  const handleTableChange = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
  };

  if (loading) {
    return 
    
    ;
  }

  return (
    <div className="mt-5">
      <h3 className="text-2xl font-semibold mb-3 text-gray-700">Suitable Ponds</h3>
      <div className="animate-fadeIn grid grid-cols-1 md:grid-cols-2 gap-8">
        {datas.map((pond, index) => (
          <Link
            key={pond._id || index}
            to={`/ponddetail/${pond._id}`}
            className="bg-white  mt-2 transition-transform hover:scale-105"
          >
            <img
              src={pond.image}
              alt={`Image of ${pond.shape}`}
              className="w-full rounded shadow-2xl h-48 object-cover"
            />
            <div className="p-3"> 
            <h3 className="text-xl text-center font-semibold  text-gray-700">
              {pond.shape}
            </h3>
         
            </div>
            
          </Link>
        ))}
      </div>
      <div className="flex justify-center ">
        <button
          onClick={() => handleTableChange(pagination.current - 1)}
          disabled={pagination.current === 1}
          className="mx-2  text-white rounded-full disabled:opacity-50  transition-colors"
        >
          <MdKeyboardArrowLeft color="red" size={30} />
        </button>
      
        <button
          onClick={() => handleTableChange(pagination.current + 1)}
          disabled={pagination.current === Math.ceil(pagination.total / pagination.pageSize)}
          className="mx-2 p-2 text-white rounded-full disabled:opacity-50  transition-colors"
        >
          <MdKeyboardArrowRight color="red" size={30} />
        </button>
      </div>
    </div>
  );
};

export default CardDetail;