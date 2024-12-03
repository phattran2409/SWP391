import React, { Component, useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import orderSuccessImage from '../../assets/order-success.png'
import { Button } from 'antd';
import { json, Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from '../../config/axios';
import { toast } from 'react-toastify';

 // Constructor
   const useQuery = () => {
     return new URLSearchParams(useLocation().search);
   };
    
function ThankYou() {
  const navigate = useNavigate();
  function handleContinue() {
    navigate("/");
  }

  const query = useQuery();
  console.log(query.get("message"));

  //   const apiRequestToken = async () => {
  //     try {
  //     const results = await api.post("v1/auth/refresh" , {
  //       withCredentials : true
  //     })

  //     // remove token exist
  //     localStorage.removeItem("token");
  //     localStorage.setItem("token" ,results.data.accessToken);
  //     }catch(error) {
  //       console.log(error);
  //     }

  //   }
  //  useEffect(() => {
  //     if (query.get("message") === "Successful.") {
  //       return apiRequestToken();
  //     }
  //    toast.error("Your Payment Not Success");
  //  },[])

  useEffect(() => {
    const handleTokenRefresh = async () => {
      if (query.get("message") === "Successful.") {
        try {
          const results = await api.post("v1/auth/refresh", {
            withCredentials: true,
          });

          // Remove the existing token and store the new one
          localStorage.removeItem("token");
          localStorage.setItem("token", results.data.accessToken);
        } catch (error) {
          console.error("Error refreshing token:", error);
          toast.error("Failed to refresh token.");
        }
      } else {
        toast.error("Your payment was not successful.");
      }
    };

    handleTokenRefresh();
  }, [query]); // Add dependencies as needed

  return (
    <>
      <Navbar />
      <div className="flex  justify-center h-[100vh]">
        <div className="flex flex-col justify-center items-center">
          <img src={orderSuccessImage} alt="" />
          <h1 className="text-center pt-10 py-5 font-bold text-4xl  ">
            Payment success!
          </h1>
          <p className="text-center font-bold py-5">Your goods is on the way</p>
          <div className="flex justify-center">
            <Button
              onClick={handleContinue}
              type="primary"
              className="px-10 py-5"
            >
              Back to Home Page
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ThankYou;