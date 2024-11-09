
import Banner from '../../../assets/image/Banner1.jpg'
export default function BlogBanner() {
    return (
        <div className='relative h-screen mt-[-84px]'>
            <div className="">
                    <img src={Banner} alt="Banner" className="block w-full h-screen object-cover " />
                </div>
        </div>
    );
}



//         <div id="carouselDarkVariant" className="relative h-screen mt-[-84px]">
            
//             {/* Carousel items */}
//             <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
//                 {slides.map((slide, index) => (
//                     <div
//                         key={index}
//                         className={`relative float-left -mr-[100%] w-full !transform-none transition-opacity duration-[1000ms] ease-in-out motion-reduce:transition-none ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
//                     >
//                         <img
//                             src={slide.image}
//                             className="block w-full h-screen object-cover"
//                             alt={slide.title}    
//                         />
//                         <div className="absolute inset-x-[5%] bottom-5 py-5 text-center text-white">
//                             <h5 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl min-w-[150px]">{slide.title}</h5>
//                             <p className="text-sm sm:text-xl md:text-2xl lg:text-3xl min-w-[150px]">{slide.description}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>


