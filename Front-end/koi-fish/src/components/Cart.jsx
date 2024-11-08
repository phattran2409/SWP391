import PropTypes, { element, elementType } from "prop-types";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./context/Cart"
import { IoMdCloseCircleOutline } from "react-icons/io";
import { Button, Modal , Card, Badge, Tag } from "antd";
import { stubString } from "lodash";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";



export default function Cart({ showModal, toggle }) {
  const { cartItems, handleMutual, removeFromCart, clearCart, result} =
    useContext(CartContext);
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
     
     const  resultCode = result;
  
    console.log(resultCode);
    
      {/* <div className="absolute  w-full h-full flex  justify-center">
        <div className="w-1/2 h-1/2 justify-center flex-col flex items-center fixed   bg-white dark:bg-black gap-8  p-10  text-black dark:text-white font-normal uppercase text-sm">
          <h1 className="text-2xl font-bold">Cart</h1>
          <div className="absolute right-16 top-10">
            <button
              className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={toggle}
            >
              Close
            </button>
          </div>
          <div className="flex h-full flex-row gap-4">
            {cartItems.map((item) => (
              <div
                className="relative flex w-full  h- justify-between items-center"
                key={item.id}
              >
                <div className="card h-2/4 items-center flex flex-col gap-4">
                  <div className="image w-40 h-40">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-fit rounded-md h-24"
                    />
                  </div>
                  <div className="content w-[200px] h-[150px] flex flex-col px-2">
                    <h1 className="text-lg font-bold ">
                      {item.koiName || item.shape}
                    </h1>
                    <p className="text-gray-600 overflow-hidden w-full h-full mx-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="absolute top-20 right-1 px-2">
                  <button
                    onClick={() => {
                      removeFromCart(item);
                    }}
                    className="text-4xl"
                  >
                    <IoMdCloseCircleOutline />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {cartItems.length > 0 ? (
            <div className="flex flex-col justify-between items-center">
              <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => {
                  clearCart();
                }}
              >
                Clear evaluate suitability.
              </button>
            </div>
          ) : (
            <h1 className="text-lg font-bold">Your cart is empty</h1>
          )}
        </div>
      </div> */}
     
 return (
   <Modal
     title="Mutuals"
     open={showModal}
     onCancel={toggle}
     centered
     width="100%"
     styles={{
       height: "500px",
       overflow: "scroll",
       overflowX: "hidden",
     }}
     // This ensures the modal takes up full width on smaller screens
     className="max-w-2xl w-full "
     footer={
       (cartItems.length  < 2 )
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
               onClick={() =>handleMutual(navigate)}
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
                   {elmentName(items.elementID)}{" "}
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
               <iframe src="https://lottie.host/embed/f0cf59e2-3927-4526-aaed-8d60dd79f1d8/p8QuDeZL3Z.json"></iframe>
             </>
           ) : (
             <iframe src="https://lottie.host/embed/aac9744d-2c28-4445-a409-b04b92c6e69b/w7fWbIHaur.json"></iframe>
           ))}
       </div>
     ) : (
       <div className="flex  w-full h-full  justify-center">
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
