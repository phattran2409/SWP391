import React, { useContext, useEffect, useState } from "react";
import { Modal, Button , Image} from "antd";
import api from "../../config/axios";


const AdPopUp = ({ADS}) => {
    const [ModalVisible , setshowModalVisible] = useState(true);
     const [randomAds , setRandomAds] = useState(null);
    // const [ADS , setADS ] = useState([]);
function handleClose () { 
    setshowModalVisible(false);
}
// const fetchData = async ()=>{ 
//    const resAds =await api.get(
//      `http://localhost:8081/v1/post/getPostByElementID/${value.elementID}?categoryID=3`
//    );
//    setADS(resAds.data.data);
  
// }

useEffect(() => {
  // fetchData()

    const randomIndex = Math.floor(Math.random() * ADS.length);
    console.log(randomIndex);
    
    setRandomAds(ADS[randomIndex]);
 
}, [ADS]);
console.log(ADS);
console.log(randomAds);

    return (
      <>
        <Modal
          title={randomAds?.title}
          visible={ModalVisible}
          onCancel={handleClose}
        >
          <Image src={randomAds?.imageThumbnail}></Image>
        
        </Modal>
      </>
    );
}

export default AdPopUp