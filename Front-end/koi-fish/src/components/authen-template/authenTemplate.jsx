// eslint-disable-next-line no-unused-vars
import React from "react";
import "./index.css";

// eslint-disable-next-line react/prop-types
function AuthenTemplate ({ children }){
  return (
    <div className="container-image">
      {/* Phần hình ảnh */}
      <div className="image-section hidden md:block">
        <img
          src="https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740183/live-koi-fish-4000-x-6000-w598f7g3aiuemo2i_wsbfn5.jpg"
          alt="Placeholder Image"
          className="image-koi"
        />
        <div className="overlay">
          <h1>Thanks for visit</h1>
          <p>
            Welcome to our Feng Shui Koi Pond Consultation site. We create
            harmonious koi ponds that enhance beauty, prosperity, and positive
            energy in your home or business.
          </p>
        </div>
      </div>

      {/* Phần form */}
      <div className="form-section">{children}</div>
    </div>
  );
}

export default AuthenTemplate;
