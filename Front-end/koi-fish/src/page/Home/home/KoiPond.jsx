import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, Autoplay } from "swiper/modules";
import api from "../../../config/axios"; // Adjust the path as needed
import Loading from '../../../components/loading/Loading';

const KoiPond = () => {
  const [ponds, setPonds] = useState([]);
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  // Fetch Koi Ponds from API
  const fetchKoiPonds = async () => {
    try {
      const response = await api.get('v1/pond/getAllPond');
      setPonds(response.data.data);
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
      <div className="flex flex-col items-center justify-center h-[800px] bg-gray-100 rounded-xl shadow-md">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-stretch flex-col h-[800px] w-full bg-gray-100 rounded-xl">
      <h2 className="text-2xl font-bold mb-10 mt-20 text-black text-left self-start pl-6 lg:pl-10">
        Koi Ponds
        <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />
      </h2>

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
        className="max-w-[90%] lg:max-w-[80%] mx-auto"
      >
        {ponds.map((pond, index) => (
          <SwiperSlide key={pond._id || index}>
            <div className="flex flex-col group relative shadow bg-white rounded-xl overflow-hidden cursor-pointer h-[450px] lg:h-[500px]">
              {/* Top section: Image */}
              <div
                className="h-[70%] bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${pond.image})`, // Assuming the pond object has an image property
                  backgroundSize: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />

              {/* Bottom section: Text */}
              <div className="h-[30%] bg-white p-4 flex flex-col justify-center">
                <h1 className="text-xl lg:text-2xl text-black font-semibold">{pond.shape}</h1>
                <p className="lg:text-[18px] text-black text-justify">
                  {pond.description.length > 80 ? pond.description.substring(0, 80) + '...' : pond.description}
                </p>
                {/* Display additional pond attributes if needed */}
                <div className="flex items-center mt-2">
                  <span className="font-semibold text-black">Trees:</span>
                  <span className="ml-2 text-black">{pond.trees}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default KoiPond;
