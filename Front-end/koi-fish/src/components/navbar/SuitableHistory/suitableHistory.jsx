import { useState, useEffect } from "react";
import api from "../../../config/axios";   
import { Modal  , Tag} from "antd";   
import { ArrowRightOutlined , CloseOutlined } from "@ant-design/icons"; 
import { toast } from "react-toastify";

export default function SuitableHistory( { user  ,showModal , setShowModal  }) {
    const [suitableHistory, setSuitableHistory] = useState([]);  
    const [selectedHistory, setSelectedHistory] = useState([]);   
    const colorToHex = (color) => {
        const colorMap = {
          Blue: "#0000FF",
          Red: "#FF0000",
          White: "#c7c1c1",
          Green: "#008000",
        };
        return colorMap[color] || '#000';
    };
    const elementColor = (id) => {
        const element = {
            1 : "Gray",
            2 : "Green",
            3 : "Blue",
            4 : "Red",
            5 : "Black",
        }
        return element[id]
    }
   const elementName = (id) => {
    const element = {
        1 : "Metal",
        2 : "Wood",
        3 : "Water",    
        4 : "Fire",
        5 : "Earth",
    }
    return element[id]
   }
   const fetchSuitabaleHistory = async () =>{
    try {
     const result = await  api.post(`/v1/user/compareHistory/${user?._id}`) 
      setSuitableHistory(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
      
    }
   }
    useEffect(() => {
      fetchSuitabaleHistory();
    }, [user]); 

    const handleSelectHistory = (id) => {
        setSelectedHistory((pre)=> pre.includes(id) ? pre.filter((item)=> item !== id) : [...pre,id])    
    }
    const handleRemoveHistory = async  (id) => {
        try {
            const res = await api.post(`/v1/user/compareHistory/del/${id}`);
            if(res.status === 200){
                toast.success("History removed successfully") ;
                setSuitableHistory(suitableHistory.filter((item)=> item._id !== id))
            }
        
        } catch (error) {
            console.log(error);
        }
    } 

    console.log(suitableHistory);   
    return (
      <Modal
        footer={null}
        title={`${suitableHistory.length} Suitable Koi Fish and Pond`    }
        open={showModal}
        onCancel={() => setShowModal(false)}
        style={{
          backgroundColor: "#f5f5f5",
          borderRadius: "10px",
          width: "900px",
          height: "600px",
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollBehavior: "smooth",
          scrollSnapType: "y mandatory",
        }}
      >
        {suitableHistory.map((item) => (
         
          <div key={item?._id} onClick={() => handleSelectHistory(item?._id)    } className={`grid grid-cols-2 gap-4 w-full ${selectedHistory.includes(item?._id) ? "relative border-2 border-green-500 shadow-lg rounded-md" : ""}`}>
             {console.log(item.item.fishkoi)}

             <div className="border rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-2">Koi</h3>

              <div className="space-y-2">
                <div className="flex flex-col items-center">
                <div className="w-30 h-30 ">
                  <img
                    src={item.item.fishkoi.image }
                    style={{width:"100px",height:"100%"}}
                    alt="Koi"
                    className=" object-cover  rounded-md"
                  />
                  </div>
                  <div className="ml-4">
                    <div className="flex gap-2">
                      <p className="font-medium">Koi Name</p>
                      <span className="text-sm text-gray-600 ">
                        {item?.item.fishkoi.koiName}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2 ELement">
                      <p className={`text-sm text-gray-600 font-semibold`}>
                        Element:{" "}
                      </p>
                      <span className="text-sm text-gray-600 ">
                        <Tag color={elementColor(item?.item.fishkoi.elementID)}>
                          {elementName(item?.item.fishkoi.elementID)}
                        </Tag>
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span className="text-sm font-semibold text-gray-600 ">
                        Color:{" "}
                      </span>
                      {item?.item.fishkoi.colors.map((color) => (
                        <Tag color={colorToHex(color)}>{color}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>

            <div className="border rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-2">Pond</h3>
              <div className="space-y-2">
                <div className="flex flex-col items-center">
                 <div className="w-full h-40 flex flex-col items-center ">
                  <img
                    src={item?.item.pond.image}
                    style={{width:"100px",height:"100%"}}
                    alt="Pond"
                    className="w-full h-full rounded-md"
                  />
                  </div>
                
                  <div className="ml-4">
                    <div className="flex gap-2">
                      <p className="font-medium">Pond Shape :</p>
                      <span className="text-sm text-gray-600 ">
                        {item?.item.pond.shape}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2 ELement">
                      <p className={`text-sm text-gray-600 font-semibold`}>
                        Element:{" "}
                      </p>
                      <span className="text-sm text-gray-600 ">
                        <Tag color={elementColor(item?.item.fishkoi.elementID)}>
                          {elementName(item?.item.fishkoi.elementID)}
                        </Tag>
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <span className="text-sm font-semibold text-gray-600 ">
                        Direction:{" "}
                      </span>
                      {item?.item.pond.direction}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={()=> handleRemoveHistory(item?._id)} className={`absolute top-3 right-3 ${selectedHistory.includes(item._id) ? "block" : "hidden"}`}    >
                 <CloseOutlined className="text-[20px] font-bold  text-red-900"/>
            </button>
          </div>
        ))}
      </Modal>
    );
}
        
