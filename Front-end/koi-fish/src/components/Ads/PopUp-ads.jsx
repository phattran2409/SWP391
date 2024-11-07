import React, { useContext, useEffect, useState } from "react";

import { Modal, Button, Image, Spin } from "antd";
import { Link } from "react-router-dom";
import "../../page/testpage/consulting-detail/animate.css"







const AdPopUp = ({ ADS }) => {
  const [loading, setLoading] = useState(true);
  const [ModalVisible, setshowModalVisible] = useState(true);
  const [randomAds, setRandomAds] = useState(null);
  // const [ADS , setADS ] = useState([]);
  function handleClose() {
    setshowModalVisible(false);
  }
  // const fetchData = async ()=>{
  //    const resAds =await api.get(
  //      `http://localhost:8081/v1/post/getPostByElementID/${value.elementID}?categoryID=3`
  //    );
  //    setADS(resAds.data.data);

  // }
  function handleLinkToDetail() {
    <Link to={`/details/${randomAds._id}`} />
  }
  useEffect(() => {
    if (ADS && ADS.length > 0) { // Kiểm tra nếu ADS có dữ liệu
      const randomIndex = Math.floor(Math.random() * ADS.length);
      setRandomAds(ADS[randomIndex]);
      setLoading(false); // Set loading to false khi dữ liệu đã sẵn sàng
    } else {
      setLoading(true); // Nếu không có dữ liệu, vẫn set loading là true
    }
  }, [ADS]);

  return (
    <>
      <Modal
        title={randomAds?.title}
        visible={ModalVisible}
        onCancel={handleClose}

        footer={[
          <Button key="back" onClick={handleClose} default>
            Cancel
          </Button>,

          <Link key="link" to={`/details/${randomAds?._id}`} className="ml-3">
            <Button variant='solid' color='danger'>Visit</Button>
          </Link>
        ]}
      >
        {loading ? (
          // <Spin tip="Loading ad..." />
          <div className="spinner"></div>
        ) : (
          <Link to={`/details/${randomAds._id}`}>
            <img src={randomAds?.imageThumbnail}></img>
          </Link>
        )}
      </Modal>
    </>
  );
};

export default AdPopUp;
