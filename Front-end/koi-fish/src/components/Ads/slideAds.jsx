import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Image, Carousel } from "antd";
import api from "../../config/axios";

  const sliderPopUp  = ({ADS}) => { 
    
    return (
      <>
        <Carousel autoplay >
          {ADS.map((ad, index) => (
            <div className="mx-auto" key={index}>
              {/* <h3>{ad.title}</h3> */}
              <Image style={{ width: "600px", height: "500px", margin: "0 auto" }} src={ad.imageThumbnail} alt={ad.title} />
            </div>
          ))}
        </Carousel>
      </>
    );
  }

  export default  sliderPopUp 