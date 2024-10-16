import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, Autoplay } from "swiper/modules";
import { RxArrowTopRight, RxCrop, RxDesktop, RxPencil2, RxReader, RxRocket, RxAccessibility } from "react-icons/rx";
import api from "../../../config/axios";

const ServiceData = [
  {
    icon: RxCrop,
    title: "Development",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740825/two-koi-fish-in-pond_ae9hor.jpg",
  },
  {
    icon: RxPencil2,
    title: "Branding",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740825/two-koi-fish-in-pond_ae9hor.jpg",
  },
  {
    icon: RxDesktop,
    title: "Design",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740825/two-koi-fish-in-pond_ae9hor.jpg",
  },
  {
    icon: RxReader,
    title: "SEO",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740825/two-koi-fish-in-pond_ae9hor.jpg",
  },
  {
    icon: RxAccessibility,
    title: "Management",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740825/two-koi-fish-in-pond_ae9hor.jpg",
  },
  {
    icon: RxRocket,
    title: "Production",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740825/two-koi-fish-in-pond_ae9hor.jpg",
  },
];

const ActiveSlider = () => {
  return (
    <div className="flex items-center justify-center flex-col h-[800px] w-full bg-white ">
      <h2 className="text-2xl font-bold mb-20 text-black text-left self-start pl-6 lg:pl-10">
        SUGGESTION FOR YOU
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
        {ServiceData.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="flex flex-col gap-6 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[350px] w-[350px] lg:h-[450px] lg:w-[400px] overflow-hidden cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.backgroundImage})` }}
              />
              <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
              <div className="relative flex flex-col gap-3">
                <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" />
                <h1 className="text-xl lg:text-2xl">{item.title}</h1>
                <p className="lg:text-[18px]">{item.content}</p>
              </div>
              <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ActiveSlider;
