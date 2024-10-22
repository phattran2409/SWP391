import React, { useEffect, useRef, useState } from 'react';
import api from "../../../config/axios";
import Loading from '../../../components/loading/Loading';
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
    return (
      <div className="flex flex-col items-center justify-center h-[800px] bg-gray-100 rounded-xl shadow-md">
        <Loading />
      </div>
    );
  }

  // Helper function to truncate text
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div ref={ref} className={`flex flex-col justify-center items-start w-full bg-gray-200 rounded-xl p-4 md:p-8 ${visible ? 'visible' : ''}`}>
      <h2 className="text-2xl font-bold text-black">NEWS</h2>
      <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />
      {/* Main post */}
      {posts.length > 0 && posts[0].postStatus && (
        <div className="flex flex-col md:flex-row mb-4 w-full max-w-12xl p-2">
          <div className="flex-shrink-0 w-full md:w-1/2 pr-0 md:pr-4">
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
          <div className="flex flex-col justify-center md:w-1/2 md:pl-4">
            <a href="#" className="block">
              <h3 className="text-3xl max-[1300px]:text-xl font-bold text-black">{posts[0].title}</h3>
              <p className="text-sm text-gray-600 mt-4 max-[1300px]:mt-1">Updated at: {new Date(posts[0].updatedAt).toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-4 max-[1300px]:mt-1">Author: {posts[0].author.userName}</p>
              <p className="text-justify text-xl max-[1300px]:text-base max-[1024px]:text-sm text-black mt-4 max-[1300px]:mt-1">{posts[0].context.replace(/<[^>]+>/g, '')}</p>
            </a>
          </div>
        </div>
      )}

      <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />

      {/* Grid of smaller posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 min-[1100px]:grid-cols-3 gap-4 w-full max-w-full">
        {posts.slice(1).map((post, index) => (
          post.postStatus && (
            <div className="flex flex-col items-center p-4 rounded-lg" key={index}>
              <a href="#" className="flex flex-col items-center w-full">
                <div className="relative w-full aspect-[16/9]">
                  <img
                    src={post.imageThumbnail}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg mb-4"
                  />
                </div>

                {/* Fix height for title */}
                <h4 className="text-lg font-bold text-center text-black my-2 h-16 flex items-center justify-center">
                  {post.title}
                </h4>

                {/* Ensure consistent height for metadata */}
                <div className="text-center text-gray-600">
                  <p className="text-sm ">Updated at: {new Date(post.updatedAt).toLocaleString()}</p>
                  <p className="text-sm mt-1">Author: {post.author.userName}</p>
                </div>

                {/* Fix height for content */}
                <p className="text-sm text-left text-justify text-black mt-2 h-24 overflow-hidden">
                  {truncateText(post.context.replace(/<[^>]+>/g, ''), 200)}
                </p>
              </a>
            </div>
          )
        ))}
      </div>

      <hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />
    </div>
  );
};

export default NewsComponent;