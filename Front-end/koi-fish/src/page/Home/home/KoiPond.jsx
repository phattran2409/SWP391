import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, Autoplay } from "swiper/modules";
import api from "../../../config/axios";

const KoiPond = () => {
  const [ponds, setPonds] = useState([]);

  // Fetch Koi Ponds from API
  const fetchKoiPonds = async () => {
    try {
      const response = await api.get('v1/pond/getAllPond'); // Assuming this is the correct API endpoint
      setPonds(response.data.data);
    } catch (error) {
      console.error("Error fetching koi ponds:", error.response?.status, error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchKoiPonds(); // Fetch data when the component mounts
  }, []);

  if (!ponds.length) {
    return <div>Loading...</div>;
  }

  // Helper function to truncate text
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className="flex items-center justify-center flex-col h-[800px] w-full bg-white">
      <h2 className="text-2xl font-bold mb-20 text-black text-left self-start pl-6 lg:pl-10">
        Koi Ponds
        <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />
      </h2>
      <style>
        {`
          .swiper-pagination-bullet {
            background: lightgray; /* Inactive bullet color */
          }
          .swiper-pagination-bullet-active {
            background: gray; /* Active bullet color */
          }
        `}
      </style>
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
          1700: {
            slidesPerView: 5,
            spaceBetween: 5,
            centeredSlides: false,
          },
          2300: {
            slidesPerView: 6,
            spaceBetween: 5,
            centeredSlides: false,
            height: true,
          },
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="max-w-[90%] lg:max-w-[80%] mx-auto"
      >
        {ponds.map((item, index) => (
          <SwiperSlide key={item.id || index}>
            <div className="flex flex-col group relative shadow-xl text-white rounded-xl overflow-hidden cursor-pointer h-[450px] lg:h-[500px]">
              {/* Top section: Image */}
              <div className="h-[70%] bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: '100%',
                  maxHeight: '100%', 
                  maxWidth: '100%',  
                  objectFit: 'contain'
                }}
              />

              {/* Bottom section: Text */}
              <div className="h-[30%] bg-white p-4 flex flex-col justify-center">
                <h1 className="text-xl lg:text-2xl text-black">{item.pondName}</h1>
                <p className="lg:text-[18px] text-black">
                  {truncateText(item.description, 80)}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default KoiPond;
