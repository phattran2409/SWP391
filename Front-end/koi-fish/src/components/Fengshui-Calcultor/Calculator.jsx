import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  Input,
  Popconfirm,
  Upload,
  Image,
  Pagination,
  DatePicker,
  Badge,
  Tag,
  Avatar,
  Radio,
  Spin
} from "antd";
import BackgroundForCalculate from "../../assets/Image_Koi_Consulting.jpg"
const { Item } = Form;
import "./Calculator.css"
import api from "../../config/axios";
import { toast, ToastContainer } from "react-toastify";
                                                                                                                                                                                          
export default function Calculator({ setvalue  , setLoading ,setElementDetail }) {

//   const [elementID, setElementID] = useState(null);
    // const [value , setValue1] = useState(null);
    const [loading1 , setLoading1] = useState(false);

    
    const onFinish = async (values) => {
    // Calculate Feng Shui based on user input
    setLoading(true)
     
    setLoading1(true);
    const { name, birthdate, gender } = values;
    
    console.log(gender);
    console.log(birthdate.$y);
    console.log(name);
    
    // ---> check valid date
    let date = new Date()
    let currentYears = date.getFullYear();
    if  (birthdate.$y > currentYears || birthdate.$y < 1920) {
      setLoading(false);
      setLoading1(false);
      toast.error("invalid years");
      return;
    }
    try {
      const res = await api.get(
        `v1/user/calculateElement?gender=${gender}&y=${birthdate.$y}`
      );
      
     if (  localStorage.getItem("elementUser") ) {
      console.log(" Ton tai elementUser");
      localStorage.removeItem("elementUser");
     }


      localStorage.setItem("elementUser" , JSON.stringify(res.data));
        
       setvalue(JSON.stringify(res.data) , name)
       setElementDetail(res.data)
      if (res.status == 200) {
        toast.success("Calcuate success your elements is " + res.data.element)
      }
    } catch (err) {
        toast.error(err.errorCode);
    }finally { 
        setTimeout(() => {
                setLoading(false);
                setLoading1(false);
        }, 3000);
    
    }

  


  };

  return (
    <div className="container mt-10 outline  h-fit">
      <div className="container-child h-full">
        <div className="calculator p-5 flex-row bg-cover bg-center  ">
          <div className="cal-children  bg-white bg-opacity-50 shadow-lg backdrop-blur-sm">
            <div className="flex-1 text-center py-5">
              <h1 className=" font-bold text-xl sm:text-4xl text-gray-800">
                Feng Shui Calculate Element
              </h1>
            </div>
            <div className="flex justify-center   ">
              <Form
                name="fengshui_calculator"
                layout="vertical"
                onFinish={onFinish}
                className=""
              >
                <div className="flex gap-4 px-4">
                  <Item
                    label={
                      <label className="text-sm sm:text-xl font-bold">
                        Name
                      </label>
                    }
                    name="name"
                    rules={[
                      { required: true, message: "Please enter your name!" },
                    ]}
                    className="label-item"
                  >
                    <Input className="h-10" placeholder="Enter your name" />
                  </Item>

                  <Item
                    label={
                      <label className="text-sm sm:text-xl font-bold">
                        BirthDate
                      </label>
                    }
                    name="birthdate"
                    rules={[
                      {
                        required: true,
                        message: "Please select your birthdate!",
                      },
                    ]}
                  >
                    <DatePicker
                      className="h-10"
                      style={{ width: "100%" }}
                      format={{
                        format: "DD-MM-YYYY",
                        type: "mask",
                      }}
                    />
                  </Item>
                </div>

                <Item
                  label={<label className="text-sm sm:text-xl">Gender</label>}
                  name="gender"
                  rules={[
                    { required: true, message: "Please select your gender!" },
                  ]}
                  className="px-4 font-bold"
                >
                  <Radio.Group className="w-full flex justify-around ">
                    <Radio value="0" className="flex  w-1/2 ">
                      Male
                      <iframe
                        className="w-10 h-10 "
                        src="https://lottie.host/embed/3238fb6c-3550-4145-b6a3-89a953b6caf9/uBES5CVouM.json"
                      ></iframe>
                    </Radio>
                    <Radio value="1" className="">
                      Female
                      <iframe
                        className="w-10 h-10 "
                        src="https://lottie.host/embed/4e4ee552-8c88-4db8-be6b-5fb6f83e8fcd/wNg4po9wYR.json"
                      ></iframe>
                    </Radio>
                  </Radio.Group>
                </Item>

                <Item className="px-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%", backgroundColor: "#d9534f" }}
                    disabled={loading1}
                    className=" p-5 font-bold text-sm sm:text-xl "
                  >
                    {loading1 ? <Spin /> : "Calculate Element"}
                  </Button>
                </Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
