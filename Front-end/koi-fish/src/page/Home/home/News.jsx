import React, { useEffect, useRef, useState } from 'react';
import api from "../../../config/axios";

const NewsComponent = () => {
  const [posts, setPosts] = useState([]); // State for API data
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await api.get('/v1/post/getAllPost?page=1&limit=4');
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.status, error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch data when the component mounts
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

  if (!posts.length) {
    return <div>Loading...</div>;
  }

  // Helper function to truncate text
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div ref={ref} className={`flex flex-col justify-center items-start w-full mt-[50px] bg-white p-8 ${visible ? 'visible' : ''}`}>
      <h2 className="text-2xl font-bold mb-4 text-black">NEWS</h2>
      <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />

      {/* Main image and text */}
      <div className="flex flex-col md:flex-row mb-2 w-full max-w-12xl p-2">
        <div className="flex-shrink-0 w-full md:w-1/3 pr-0 md:pr-4">
          <a href="#" className="block">
            <div className="relative w-full aspect-[16/9]">
              <img
                src={posts[0].imageThumbnail}
                alt={posts[0].title}
                className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </a>
        </div>
        <div className="grid lg:grid-rows-2 sm:grid-rows-1 grid-flow-col gap-4 pl-0 md:pl-4 w-full md:w-2/3">
          <a href="#" className="block">
            <h3 className="text-3xl font-bold text-black">{posts[0].title}</h3>
          </a>
          <p className="text-justify text-xl text-black mt-1">{posts[0].context.replace(/<[^>]+>/g, '')}</p> 
        </div>
      </div>

      <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />

      {/* Grid of smaller images */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 w-full max-w-full">
        {posts.slice(1).map((post, index) => (
          <div className="flex flex-col items-center p-4 rounded-lg" key={index}>
            <a href="#" className="flex flex-col items-center w-full">
              <div className="relative w-full aspect-[16/9]">
                <img
                  src={post.imageThumbnail}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg mb-2 shadow-md"
                />
              </div>
              <h4 className="text-2xs font-bold text-center text-black my-3">{post.title}</h4> {/* Bold post title */}
              <p className="text-xs text-left text-justify text-black">{truncateText(post.context.replace(/<[^>]+>/g, ''), 100)}</p>
            </a>
          </div>
        ))}
      </div>

      <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />
    </div>
  );
};

export default NewsComponent;
