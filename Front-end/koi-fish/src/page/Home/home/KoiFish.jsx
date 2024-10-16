  import React, { useEffect, useRef, useState } from 'react';
  import { Swiper, SwiperSlide } from "swiper/react";
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/free-mode";
  import { Pagination, Autoplay } from "swiper/modules";
  import { RxArrowTopRight } from "react-icons/rx";
  import api from "../../../config/axios";

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
      return <div>Loading...</div>;
    }

    // Helper function to truncate text
    const truncateText = (text, length) => {
      return text.length > length ? text.substring(0, length) + '...' : text;
    };

    return (
      <div className="flex items-center justify-center flex-col h-[800px] w-full bg-white">
        <h2 className="text-2xl font-bold mb-20 text-black text-left self-start pl-6 lg:pl-10">
          Koi Fish
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
              spaceBetween: 15,
              centeredSlides: true,
              slidesOffsetBefore: 15,
              slidesOffsetAfter: 15,
            },
            800: {
              slidesPerView: 2,
              spaceBetween: 15,
              centeredSlides: true,
            },
            1700: {
              slidesPerView: 3,
              spaceBetween: 15,
              centeredSlides: false,
            },
            2200: {
              slidesPerView: 4,
              spaceBetween: 15,
              centeredSlides: false,
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
          {fishs.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col gap-6 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[350px] w-[350px] lg:h-[450px] lg:w-[400px] overflow-hidden cursor-pointer">
                <div
                  className="absolute inset-0 bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'contain'  // Ensure the image fits inside the container
                  }}
                />

                <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
                <div className="relative flex flex-col gap-3">
                  <h1 className="text-xl lg:text-2xl text-black">{item.name}</h1>
                  <p className="lg:text-[18px] text-black">{truncateText(item.description, 100)}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  export default KoiFish;
