import React, { useEffect, useState } from 'react';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1727929262/pexels-quang-nguyen-vinh-222549-2131828_mefvov.jpg",
            title: "Feng Shui Koi Consultant",
            description: "Best Koi"
        },
        {
            image: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1729765188/pexels-quang-nguyen-vinh-222549-6130074_neujum.jpg",
            title: "Feng Shui Koi Consultant",
            description: "Experience serenity"
        },
        {
            image: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1729765277/pexels-saturnus99-28536474-topaz-sharpen_kwvl8r.jpg",
            title: "Feng Shui Koi Consultant",
            description: "Dive into rich culture"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
// <<<<<<< HEAD
//         <div id="carouselDarkVariant" className="relative h-screen mt-[-60px]">

// =======
        <div id="carouselDarkVariant" className="relative h-screen mt-[-84px]">
            

            {/* Carousel indicators */}
            <div className="absolute inset-x-0 bottom-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-black bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[1000ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none ${currentSlide === index ? 'opacity-100' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            {/* Carousel items */}
            <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`relative float-left -mr-[100%] w-full !transform-none transition-opacity duration-[1000ms] ease-in-out motion-reduce:transition-none ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={slide.image}
                            className="block w-full h-screen object-cover"
                            alt={slide.title}
                        />
                        <div className="absolute inset-x-[5%] bottom-5 py-5 text-center text-white">
                            <h5 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl min-w-[150px]">{slide.title}</h5>
                            <p className="text-sm sm:text-xl md:text-2xl lg:text-3xl min-w-[150px]">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Prev item */}
            <button
                className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                type="button"
                onClick={prevSlide}
            >
                <span className="inline-block h-8 w-8 dark:grayscale">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </span>
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Previous</span>
            </button>
            {/* Next item */}
            <button
                className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                type="button"
                onClick={nextSlide}
            >
                <span className="inline-block h-8 w-8 dark:grayscale">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </span>
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Next</span>
            </button>
        </div>
    );
};

export default HeroSection;
