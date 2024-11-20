import PropTypes, { element, elementType } from "prop-types";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./context/Cart"
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Button, Modal , Card, Badge, Tag } from "antd";
import { stubString } from "lodash";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../config/axios";
import { toast } from "react-toastify";


export default function Cart({ showModal, toggle }) {
  const { cartItems, handleMutual, removeFromCart, clearCart, result} =
    useContext(CartContext);
  const [user ,  setUser] = useState();
    console.log("show modal at cart "+ showModal);
    console.log("result :  "+ result);

  const navigate = useNavigate();
     const colorToHex = (color) => {
       const colorMap = {
         Blue: "#0000FF",
         Red: "#FF0000",
         White: "#FFFFFF",
         Green: "#008000",
       };
       return colorMap[color] || "#000";
     };
     const elmentName = (elementID) => { 
         const elementMap = {
          1 : "Metal",
          2 : "Wood",
          3 : "Water", 
          4 : "Fire" ,
          5 :  "Earth"
         }
         return elementMap[elementID] || "";
     }
     const elementColor = (elementID) => { 
      const elementColor = {
        1: "#999793", 
        2: "#056b2c",
        3: "#0295eb",
        4: "#e60f00",
        5: "#cc8800",
      };
      return elementColor[elementID] || "";
     }
     const handleSaveMutualSuitableAPI  = async () => {
       try {
         var fish;
         var pond;
         cartItems.map((item) => {
           if (item.koiName) {
             fish = item;
           } else {
             pond = item;
           }
         });
         console.log("user ID : "+user._id);
      const result = await api.post("/v1/user/compareHistory/add", {
        accountID: user._id,
        fishkoi : fish,
        pond : pond,
      });
       console.log(result.data);
         console.log(fish);
         console.log(pond);
        toast.success(result.data.message)
       } catch (error) {
         console.log(error.response.data);
        toast.info(error.response.data);
       }
     };
     //  KQ tra ve neu suitable
     const  resultCode = result;
    // tự động lưu những cá và hồ cặp phù hợp 

     const handleSaveMutualSutiable  = () => {
     if (cartItems.length === 2) {
      console.log("Save Mututal Suitable");
        if ( resultCode == 1 ) {
          if (user ==null) {
            toast.info("Please login to save suitable" , {position : "center"});
            return;
          }
          handleSaveMutualSuitableAPI();
        }
    } 
    }
    
    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem("user")))
    } , [])
    

    console.log(resultCode);
    
    console.log(cartItems);
  
     
 return (
   <Modal
     title="Mutuals"
     open={showModal}
     onCancel={toggle}
     centered
     width="100%"
     styles={{
       height: "500px",
       overflowY: "scroll",
       overflowX: "hidden",
     }}
     // This ensures the modal takes up full width on smaller screens
     className="max-w-2xl w-full "
     footer={
       cartItems.length < 2
         ? [
             <Button danger size="middle" type="primary" onClick={clearCart}>
               Clear
             </Button>,
             <Button
               variant="filled"
               size="middle"
               color="default"
               onClick={toggle}
               className="outline"
             >
               {" "}
               Cancle{" "}
             </Button>,
             ,
             <Button
               variant="outlined"
               size="middle"
               color="primary"
               onClick={() => handleMutual(navigate)}
               disabled
             >
               Evaluate
             </Button>,
           ]
         : [
             <Button danger size="middle" type="primary" onClick={clearCart}>
               Clear
             </Button>,
             <Button
               variant="filled"
               size="middle"
               color="default"
               onClick={toggle}
               className="outline"
             >
               {" "}
               Cancle{" "}
             </Button>,
             ,
             <Button
               variant="outlined"
               size="middle"
               color="primary"
               onClick={handleMutual}
             >
               Evaluate
             </Button>,
           ]
     } // Responsive width control for larger screens
   >
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
       {cartItems.map((items) => (
         <Card
           hoverable
           key={items.id}
           className="relative border border-gray-300 shadow-md hover:shadow-lg rounded-md"
           cover={
             <img
               alt={items.koiName || items.shape}
               src={items.image}
               className="w-full h-48 object-cover" // Makes sure the image is responsive
             />
           }
         >
           <div className="content w-full  flex flex-col p-4">
             <h1 className="text-lg font-bold text-center">
               {items.koiName || items.shape}
             </h1>
             <p className="h-[200px] flex justify-center items-center text-sm text-gray-600 overflow-hidden mx-2">
               {items.description.substring(0, 100)}...
             </p>
             <div className="flex items-center mt-2">
               <span className="font-semibold max-[768px]:text-base">
                 Element :
               </span>
               <span className="ml-2 max-[768px]:text-base">
                 <Tag color={elementColor(items.elementID)}>
                   {" "}
                   {elmentName(items.elementID)}
                 </Tag>
               </span>
             </div>
             {items.shape && (
               <>
                 {" "}
                 <div className="flex items-center mt-2">
                   <span className="font-semibold max-[768px]:text-base">
                     Direction:
                   </span>
                   {items.direction.map((dir, idx) => (
                     <span key={idx} className="ml-2 max-[768px]:text-base">
                       {dir}
                     </span>
                   ))}
                 </div>
                 <div className="flex items-center mt-2">
                   <span className="font-semibold max-[768px]:text-base">
                     Trees:
                   </span>
                   <span className="ml-2 max-[768px]:text-base">
                     {items.trees}
                   </span>
                 </div>
                 {/* water flow  */}
                 <div className="flex items-center mt-2">
                   <span className="font-semibold max-[768px]:text-base">
                     Water Flow:
                   </span>
                   <span className="ml-2 max-[768px]:text-base">
                     {items.waterFlow}
                   </span>
                 </div>
                 {/* Light */}
                 <div className="flex items-center mt-2">
                   <span className="font-semibold max-[768px]:text-base">
                     Light:
                   </span>
                   <span className="ml-2 max-[768px]:text-base">
                     {items.light}
                   </span>
                 </div>
               </>
             )}
             {items.koiName && (
               <>
                 <div className="flex items-center mt-2">
                   <span className="font-semibold max-[768px]:text-base">
                     Color:
                   </span>
                   {items.colors.map((color, idx) => (
                     <span
                       key={idx}
                       className="ml-2 w-4 h-4 max-[768px]rounded-full border border-black"
                       style={{ backgroundColor: colorToHex(color) }}
                     />
                   ))}
                 </div>
               </>
             )}
           </div>
           <div className="absolute top-0 right-0 px-2">
             <button
               onClick={() => {
                 removeFromCart(items);
               }}
               className="text-4xl"
             >
               <IoMdCloseCircleOutline className="text-slate-900" />
             </button>
           </div>
         </Card>
       ))}
     </div>
     {cartItems.length > 0 ? (
       <div className="flex w-full justify-center items-center text-2xl font-bold">
         {cartItems.length >= 2 &&
           result != null &&
           (resultCode === 1 ? (
             <>
               <div>
                 <iframe src="https://lottie.host/embed/f0cf59e2-3927-4526-aaed-8d60dd79f1d8/p8QuDeZL3Z.json"></iframe>
                 <div className="w-full flex justify-center mt-4">
                   <button
                     onClick={handleSaveMutualSutiable}
                     className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-md"
                   >
                     Save
                   </button>
                 </div>
               </div>
             </>
           ) : (
             <iframe src="https://lottie.host/embed/aac9744d-2c28-4445-a409-b04b92c6e69b/w7fWbIHaur.json"></iframe>
           ))}
       </div>
     ) : (
       <div cssName="flex  w-full h-full  justify-center">
         <iframe src="https://lottie.host/embed/a6dcf59e-821c-4fe6-afa7-3a1539fc5c56/Icxw1mdxS0.json"></iframe>
       </div>
     )}
   </Modal>
 );
 
}

Cart.propTypes = {
  showModal: PropTypes.bool,
  toggle: PropTypes.func,
};
