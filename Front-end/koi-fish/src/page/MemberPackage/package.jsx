import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import "./package.css";
import { useInsertionEffect } from "react";
import Footer from "../../components/footer/Footer";
import api from "../../config/axios.js";
import { toast } from "react-toastify";
import { Package } from "lucide-react";
import {
  json,
  Link,
  Outlet,
  redirect,
  useNavigate,
  useOutlet,
} from "react-router-dom";
import { Modal, Button } from "antd";
function MemberPackage() {
  const [user, setUser] = useState({});
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [packageType, setPackageType] = useState({
    packageType: "",
    amount: "",
    expiresDays: "",
  });
  const Navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const outLet = useOutlet();



  const [packageData ,setPackageData ] = useState([]); 

  const fetchData  = async () => {
    try {
      const res = await api.get("/v1/package/");
      setPackageData(res.data.data);
      console.log(res.data);
      
    } catch (error) {
      console.log(error.message);
    }
  }
  console.log(packageData);
  

 
  // mỗi lần load page sẽ lấy về user trong local Stroage
  useEffect(() => {
    const savedMember = localStorage.getItem("user");

    if (savedMember) {
      setUser(JSON.parse(savedMember)); // Set member from localStorage if available
    } else {
      toast.info("You need to log in to register for a membership package.");
    }
    fetchData();
  }, []);

  console.log(packageType.packageType);

  async function handleCreateMemberPackage() {
    setLoading(!loading);
    try {
      const res = await api.post("/v1/user/subcribe", {
        packageType: packageType.packageType,
        id: user._id,
      });
      console.log(res);
  
      if (res.status == 200) {
        // đường dẫn để fetch api
        const paymentUrl =
          selectedPayment === "momo"
            ? "/v1/pay/paymentMomo"
            : "/v1/pay/paymentZalo";
        // redirect URL

        const RedirectField =
          selectedPayment === "momo" ? "payUrl" : "order_url";

        // call api payment
        const resPayment = await api.post(paymentUrl, {
          _id: user._id,
          amount_1: packageType.amount,
          packageType: packageType.packageType,
        });

        // console.log(resPayment.data.RedirectURL);
        // redirect(resPayment.data.RedirectURL);
        // window.location.href = resPayment.data.RedirectURL;

        const redirectUrl = resPayment.data[RedirectField];
        if (redirectUrl) {
          console.log(`Redirecting to: ${redirectUrl}`);
          window.location.href = redirectUrl;
        } else {
          throw new Error("Redirect URL not found in payment response");
        }
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 403) {
        toast.error(err.response.data.error || "Forbidden access");
        console.log(err);
         
        if (err.response.data.errorCode === 1) {
          await api.post("/v1/user/subcribe/del", { id: user._id });
        }
        
      } else {
        toast.error(
          err.response?.data || "An error occurred. Please login again."
        );
      }
    }
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCheckout = (values) => {
    console.log("Checkout form submitted:", values);
    // Process checkout here (e.g., call API)
    setIsModalVisible(false); // Close the modal after checkout
  };

   

  // if (packageType.packageType.length > 0) {
  //   handleCreateMemberPackage();
  // }

  return (
    <>
      <div className="min-h-[50vh]">
        {outLet ? (
          outLet
        ) : (
          <>
            <Navbar />
            <div className="flex flex-col   min-h-[70vh]">
              <div className="container mx-auto px-10 py-16 ">
                <h2 className="text-4xl font-bold text-center mb-8">
                  Register MemberShip
                  <br />
                </h2>
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Basic */}
                  {packageData.map((item, index) => (
                    <div
                      key={item._id || index}
                      className={`flex-1 rounded-lg shadow-lg p-8 outline ${
                        index % 2 == 1
                          ? "bg-gray-800 text-gray-200"
                          : "bg-white"
                      }`}
                    >
                      <h3 className="text-2xl font-bold mb-4 text-center">
                        {item.packageType}
                      </h3>
                      <div className="text-5xl font-bold mb-4 text-center">
                        {item.amount.toLocaleString("de-DE")} VND
                      </div>
                      <p className="text-gray-600 mb-6 text-center font-bold">
                        1 user, {item.expiresDay} days
                      </p>
                      <div className="flex justify-center ">
                        <button
                          className="btn-subcribe  bg-red-500  hover:bg-white hover:text-red-500   text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            setPackageType({
                              packageType: item.packageType,
                              amount: item.amount,
                              expiresDays: item.expiresDay,
                            });
                            showModal();
                          }}
                        >
                          Start Subcribe Basic
                        </button>
                      </div>
                      <div className="flex justify-center">
                        <ul className="mt-8 list-disc">
                          <li>Post blogging</li>
                          <li>Post ADS </li>
                        </ul>
                      </div>
                    </div>
                  ))}
                  {/* Advance */}
                  {/* <div className="flex-1 bg-gray-800 rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 text-white text-center">
                    Advance
                  </h3>
                  <div className="text-5xl font-bold mb-4 text-white text-center">
                    35.000 VND
                  </div>
                  <p className="text-gray-300 mb-6 text-center font-bold">
                    1 user, 60 days
                  </p>
                  <div className="flex justify-center">
                    <button
                      className="bg-red-500 hover:bg-slate-100 hover:text-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => {
                        setPackageType({
                          packageType: "Advanced",
                          amount: "35000",
                          expiresDays: "60",
                        });
                        showModal();
                      }}
                    >
                      Start Subcribe Advanced
                    </button>
                  </div>
                  <div className="flex justify-center ">
                    <ul className="mt-8 list-disc text-white">
                      <li>Post blogging</li>
                      <li>Post ADS </li>
                    </ul>
                  </div>
                </div> */}
                  {/* Plus */}
                  {/* <div className="flex-1 bg-white rounded-lg shadow-lg p-8 outline">
                  <h3 className="text-2xl font-bold mb-4 text-center">Plus</h3>
                  <div className="text-5xl font-bold mb-4 text-center">
                    50.000 VND
                  </div>
                  <p className="text-gray-600 mb-6 text-center font-bold">
                    1 user, 90 days
                  </p>
                  <div className="flex justify-center ">
                    <button
                      className="bg-red-500 hover:bg-white hover:text-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => {
                        setPackageType({
                          packageType: "Plus",
                          amount: "50000",
                          expiresDays: "90",
                        });
                        showModal();
                      }}
                    >
                      Start Subcribe Plus
                    </button>
                  </div>
                  <div className="flex justify-center ">
                    <ul className="mt-8 list-disc">
                      <li>Post blogging</li>
                      <li>Post ADS </li>
                    </ul>
                  </div>
                </div> */}
                </div>
              </div>
              {/* Modal proces to payment */}
              <Modal
                title="Checkout"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                  <Button
                    default
                    key="cancel"
                    onClick={handleCancel}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                      backgroundColor: isHovered ? "#4a5568" : "transparent",
                      color: isHovered ? "white" : "#4a5568",
                      fontWeight: isHovered ? "bold" : "normal",
                      border: isHovered
                        ? "1px solid white"
                        : "1px solid #4a5568",
                    }}
                  >
                    Cancel
                  </Button>,
                  <Button
                    disabled={!selectedPayment}
                    key="submit"
                    color="danger"
                    variant="solid"
                    type="primary"
                    loading={loading}
                    onClick={handleCreateMemberPackage}
                  >
                    {loading ? "Processing..." : "Process to Payment"}
                  </Button>,
                ]}
              >
                <div className="flex-1 bg-white rounded-lg shadow-lg p-8 outline">
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    {packageType.packageType}
                  </h3>
                  <div className="text-5xl font-bold mb-4 text-center">
                    {/* {packageType.packageType.includes("Basic")
                      ? "20.000 VND"
                      : packageType.packageType.includes("Advanced")
                      ? "35.000 VND"
                      : "50.000 VND"} */}
                    {packageType.amount.toLocaleString("de-DE")} VND
                    {/* {packageType.amount} VND */}
                  </div>
                  <p className="text-gray-600 mb-6 text-center font-bold">
                    1 user, {packageType.expiresDays} days
                  </p>
                  <div className="flex flex-col items-center gap-4">
                    <label
                      className={`w-48 border border-gray-300 rounded  text-gray-800 font-bold py-3 pr-10 pl-3 flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out ${
                        selectedPayment === "momo"
                          ? "bg-red-500 text-white border-white"
                          : ""
                      }`}
                      onClick={() => setSelectedPayment("momo")}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="momo"
                        className="hidden"
                        onChange={() => setSelectedPayment("momo")}
                      />
                      <img
                        src="https://res.cloudinary.com/ddqgjy50x/image/upload/v1730102252/MoMo_Logo_nwbyu7.png"
                        alt="Momo"
                        className="h-10"
                      />
                      Momo
                    </label>
                    <label
                      className={`w-48 border border-gray-300 rounded text-gray-800 font-bold py-3 pr-10 pl-3 flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out ${
                        selectedPayment === "zalopay"
                          ? "bg-red-500 text-white border-white"
                          : ""
                      }`}
                      onClick={() => setSelectedPayment("zalopay")}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="zalopay"
                        className="hidden"
                        onChange={() => setSelectedPayment("zalopay")}
                      />
                      <img
                        src="https://res.cloudinary.com/ddqgjy50x/image/upload/v1730202814/Logo-ZaloPay-Square_f0zjno.webp"
                        alt="ZaloPay"
                        className="h-10"
                      />
                      Zalopay
                    </label>
                  </div>
                  <div className="flex justify-center">
                    <ul className="mt-8 list-disc">
                      <li>Post blogging</li>
                      <li>Post ADS </li>
                    </ul>
                  </div>
                </div>
              </Modal>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default MemberPackage;
