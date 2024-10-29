import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Image, Carousel } from "antd";
import { Link } from "react-router-dom"; // Import Link component from react-router-dom
import api from "../../config/axios";
import { add } from "lodash";

const sliderPopUp = ({ ADS }) => {

  return (
    <>
      <Carousel autoplay >
        {ADS.map((ad, index) => (
          <div className="mx-auto" key={index}>
            <Link
              to={`/details/${ad._id}`}
              className="w-full flex justify-center mb-4 py-4 border-y-2 border-y-orange-200 text-base font-semibold"
            >
              🌟 {ad.title} 🌟
            </Link>
            <Image style={{ width: "600px", height: "500px", margin: "0 auto" }} src={ad.imageThumbnail} alt={ad.title} />
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default sliderPopUp 