import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link here
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, Autoplay } from "swiper/modules";
import api from "../../../config/axios";
import Loading from '../../../components/loading/Loading';
import '../../../components/animation/fadein.css';

const KoiPond = () => {
  const [ponds, setPonds] = useState([]);
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  // Fetch Koi Ponds from multiple API endpoints
  const fetchKoiPonds = async () => {
    try {
      const pondRequests = [];
      // Loop through 1 to 5 and create a list of promises for the requests
      for (let i = 1; i <= 5; i++) {
        pondRequests.push(api.get(`v1/pond/getByElement/${i}`));
      }

      // Resolve all promises and aggregate the results
      const responses = await Promise.all(pondRequests);
      const allPonds = responses.flatMap(response => response.data.data); // Combine data from all requests

      setPonds(allPonds);
    } catch (error) {
      console.error("Error fetching koi ponds:", error.response?.status, error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchKoiPonds(); // Fetch data when the component mounts
  }, []);

  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  if (!ponds.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[800px] bg-gray-100 rounded-xl shadow-md fade-in">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-stretch flex-col h-[800px] max-[1024px]:h-[700px] max-[768px]:h-[700px] w-full bg-gray-100 rounded-xl">
      <div className="flex justify-between items-center w-full px-6 lg:px-10 mt-20 max-[1024px]:mt-10 mb-10">
        <h2 className="text-2xl font-bold text-black">
          Koi Pond
          <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />
        </h2>
        <Link to="/showpond" className="ml-4 px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-white hover:text-black transition duration-300">
          Show More
        </Link>
      </div>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 5,
            centeredSlides: true,
            slidesOffsetBefore: 15,
            slidesOffsetAfter: 15,
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 5,
            centeredSlides: false,
          },
          1900: {
            slidesPerView: 4,
            spaceBetween: 5,
            centeredSlides: false,
          },
          2200: {
            slidesPerView: 5,
            spaceBetween: 5,
            centeredSlides: false,
          },
          2500: {
            slidesPerView: 6,
            spaceBetween: 5,
            centeredSlides: false,
            height: true,
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="max-w-full lg:max-w-[80%] mx-auto"
      >
        {ponds.map((pond, index) => (
          <SwiperSlide key={pond._id || index}>
            <Link to={`/ponddetail/${pond._id}`} className="flex flex-col group relative shadow bg-white rounded-xl overflow-hidden cursor-pointer max-w-[95%] h-[450px] lg:h-[500px] max-[768px]:h-[500px]">
              {/* Top section: Image */}
              <div
                className="h-[70%] bg-white bg-center bg-no-repeat rounded-t-xl"
                style={{
                  backgroundImage: `url(${pond.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: '100%',
                  maxHeight: '300px',
                  maxWidth: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Bottom section: Text */}
              <div className="h-[30%] bg-white p-4 flex flex-col justify-between">
                <h1 className="text-xl lg:text-2xl text-black my-2 font-semibold">{pond.shape}</h1>
                <div className="flex-grow grid grid-rows-1">
                  <p className="lg:text-[18px] text-black text-justify max-[1024px]:text-sm h-20 overflow-hidden">
                    {pond.description.length > 80 ? pond.description.substring(0, 80) + '...' : pond.description}
                  </p>
                </div>
                {/* Display additional pond attributes */}
                <div className="flex items-center mt-2">
                  <span className="font-semibold text-black">Direction:</span>
                  <span className="ml-2 text-black">{pond.direction}</span>
                </div>
              </div>

            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default KoiPond;
