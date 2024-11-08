import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, Autoplay } from "swiper/modules";
import api from "../../../config/axios";
import Loading from '../../../components/loading/Loading';

const KoiFish = () => {
  const [fishs, setFish] = useState([]);
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  // Fetch Koi Fish from API
  const fetchKoiFish = async () => {
    try {
      const response = await api.get('/v1/fish');
      setFish(response.data.data);
    } catch (error) {
      console.error("Error fetching koi fish:", error.response?.status, error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchKoiFish(); // Fetch data when the component mounts
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

  if (!fishs.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[800px] bg-gray-100 rounded-xl shadow-md">
        <Loading />
      </div>
    );
  }

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  const colorToHex = (color) => {
    const colorMap = {
      Blue: '#0000FF',
      Red: '#FF0000',
      White: '#FFFFFF',
      Green: '#006400',
      Yellow: '#FFD700',
      Black: '#000000',
    };
    return colorMap[color] || '#000';
  };

  return (
    <div className="flex items-center justify-stretch flex-col h-[800px] max-[1024px]:h-[700px] max-[768px]:h-[650px] w-full bg-gray-100 rounded-xl">
      <div className="flex justify-between items-center w-full px-6 lg:px-10 mt-20 max-[1024px]:mt-10 mb-10">
        <h2 className="text-2xl font-bold text-black">
          Koi Fish
          <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700"/>
        </h2>
        <Link to="/showfish" className="ml-4 px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-white hover:text-black transition duration-300">
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
        className="max-w-[90%] lg:max-w-[80%] mx-auto"
      >
        {fishs.map((item, index) => (
          <SwiperSlide key={item.id || index}>
            <Link to={`/koidetail/${item._id}`} className="flex flex-col group relative shadow bg-white text-white rounded-xl overflow-hidden cursor-pointer max-w-[95%] h-[450px] lg:h-[500px]">
              {/* Top section: Image */}
              <div
                className="h-[60%] bg-white bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  width: '100%',
                  height: '100%',
                  maxHeight: '300px',
                  maxWidth: '100%',
                  objectFit: 'contain',
                }}
              />
              {/* Bottom section: Text */}
              <div className="flex h-[40%] bg-white mt-2 p-4 flex-col justify-between object-cover">
                <h1 className="text-xl lg:text-2xl text-black font-semibold">{item.koiName}</h1>
                <div className="flex-grow grid grid-rows-1">
                  <p className="lg:text-[18px] text-black text-justify max-[1024px]:text-sm h-20 overflow-hidden">
                    {truncateText(item.description, 80)}
                  </p>
                </div>
                {/* Color display */}
                <div className="flex items-center mt-2">
                  <span className="font-semibold text-black">Color:</span>
                  {item.colors.map((color, idx) => (
                    <span
                      key={idx}
                      className="ml-2 w-4 h-4 rounded-full border border-black"
                      style={{ backgroundColor: colorToHex(color) }}
                    />
                  ))}
                </div>
              </div>

            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default KoiFish;
