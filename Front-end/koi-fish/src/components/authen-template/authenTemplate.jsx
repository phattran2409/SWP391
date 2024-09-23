// eslint-disable-next-line no-unused-vars
import React from "react";
import "./index.scss";

// eslint-disable-next-line react/prop-types
function AuthenTemplate({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Phần hình ảnh */}
      <div className="w-1/2 flex items-center justify-center relative">
        <img
          src="https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740183/live-koi-fish-4000-x-6000-w598f7g3aiuemo2i_wsbfn5.jpg"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
          <h1 className="text-4xl font-bold mb-4 text-white text-center">
            Thanks for visit
          </h1>
          <p className="text-xl text-white text-center">
            Welcome to our Feng Shui Koi Pond Consultation site. We create
            harmonious koi ponds that enhance beauty, prosperity, and positive
            energy in your home or business.
          </p>
        </div>
      </div>

      {/* Phần form */}
      <div className="w-1/2 p-8 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default AuthenTemplate;
