import React from 'react';
import './loading.css';

const Loading = () => {
  const loadingText = "Loading...";
  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-4 border-blue-500 border-t-transparent"></div>
      <div className="mt-4 text-xl text-gray-600">
        {loadingText.split("").map((char, index) => (
          <span key={index} className={`bounce-animation bounce-delay-${index + 1}`}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loading;
