import React, { useEffect, useRef, useState } from 'react';

const newsArticles = [
  {
    image: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740825/two-koi-fish-in-pond_ae9hor.jpg",
    title: "Richird Norton photorealistic rendering as real photos 1",
    description: "Discover the beauty of untouched landscapes",
    link: "https://example.com/article1", 
  },
  {
    image: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1727929081/koi_fish_fish_water_174744_1920x1080_qm843r.jpg",
    title: "Richird Norton photorealistic rendering as real photos 2",
    description: "Experience the vibrant life of urban jungles",
    link: "https://example.com/article2", 
  },
  {
    image: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740825/two-koi-fish-in-pond_ae9hor.jpg",
    title: "Richird Norton photorealistic rendering as real photos 3",
    description: "Dive into rich traditions and heritage",
    link: "https://example.com/article3",
  },
  {
    image: "https://res.cloudinary.com/ddqgjy50x/image/upload/v1727929262/pexels-quang-nguyen-vinh-222549-2131828_mefvov.jpg",
    title: "Richird Norton photorealistic rendering as real photos 4",
    description: "Explore the underwater wonders",
    link: "https://example.com/article4",
  },
];

const NewsComponent = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

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

  return (
    <div ref={ref} className={`flex flex-col justify-center items-start w-full bg-white p-8 ${visible ? 'visible' : ''}`}>
      <h2 className="text-2xl font-bold mb-4 text-black">NEWS</h2>
      <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />

      {/* Main image and text */}
      <div className="flex flex-col md:flex-row mb-2 w-full max-w-12xl p-2">
        <div className="flex-shrink-0 w-full md:w-1/3 pr-0 md:pr-4">
          <a href={newsArticles[0].link} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative w-full aspect-[16/9]">
              <img
                src={newsArticles[0].image}
                alt={newsArticles[0].title}
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </a>
        </div>
        <div className="flex flex-col justify-between pl-0 md:pl-4 w-full md:w-2/3">
          <a href={newsArticles[0].link} target="_blank" rel="noopener noreferrer" className="block">
            <h3 className="text-2xl font-semibold text-black">{newsArticles[0].title}</h3>
          </a>
          <a href={newsArticles[0].link} target="_blank" rel="noopener noreferrer" className="block">
            <p className="text-sm text-black mt-1">{newsArticles[0].description}</p>
          </a>
        </div>
      </div>

      <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />

      {/* Grid of smaller images */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 w-full max-w-full">
        {newsArticles.slice(1).map((article, index) => (
          <div className="flex flex-col items-center p-4 rounded-lg" key={index}>
            <a href={article.link} className="flex flex-col items-center w-full" target="_blank" rel="noopener noreferrer">
              <div className="relative w-full aspect-[16/9]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg mb-2 shadow-md"
                />
              </div>
              <h4 className="text-xs text-center text-black">{article.title}</h4>
              <p className="text-xs text-center text-black">{article.description}</p>
            </a>
          </div>
        ))}
      </div>

      <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />
    </div>
  );
};

export default NewsComponent;