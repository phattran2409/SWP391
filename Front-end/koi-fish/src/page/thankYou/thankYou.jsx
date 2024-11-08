import React, { Component } from 'react';
import Navbar from '../../components/navbar/Navbar';
import orderSuccessImage from '../../assets/order-success.png'
import { Button } from 'antd';
import { json, Link, useNavigate } from "react-router-dom";

function ThankYou() {
    const navigate = useNavigate();
    function handleContinue() {
        navigate("/login");
    }
    return (
      <>
        <Navbar />
        <div className="flex  justify-center h-[100vh]">
          <div className='flex flex-col justify-center items-center'>
            <img src={orderSuccessImage} alt="" />
            <h1 className='text-center pt-10 py-5 font-bold text-4xl  '>Payment success!</h1>
            <p className='text-center font-bold py-5'>Your goods is on the way</p>
            <div className='flex justify-center'>
              <Button onClick={handleContinue} type='primary' className='px-10 py-5'>Please login to get membership</Button>
            </div>
          </div>
        </div>
      </>
    );
}

export default ThankYou;