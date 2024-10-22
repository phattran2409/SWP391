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
import { toast } from "react-toastify";

export default function Calculator({ setvalue  , setLoading }) {

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
    <div className="container mt-10 outline h-full">
      <div className="container-child h-full">
        <div className="calculator p-5 flex-row bg-cover bg-center  ">
          <div className="cal-children  bg-white bg-opacity-50 shadow-lg backdrop-blur-sm">
            <div className="flex-1 text-center py-5">
              <h1 className=" font-bold text-4xl text-gray-800">
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
                <div className="flex gap-4">
                  <Item
                    label="Name"
                    name="name"
                    rules={[
                      { required: true, message: "Please enter your name!" },
                    ]}
                    className="label-item" 
                    

                  >
                    <Input placeholder="Enter your name" />
                  </Item>

                  <Item
                    label="Birthdate"
                    name="birthdate"
                    rules={[
                      {
                        required: true,
                        message: "Please select your birthdate!",
                      },
                    ]}
            
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Item>
                </div>

                <Item
                  label="Gender"
                  name="gender"
                  rules={[
                    { required: true, message: "Please select your gender!" },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="0">Male</Radio>
                    <Radio value="1">Female</Radio>
                  </Radio.Group>
                </Item>

                <Item>
                  <Button
                    type="primary"
                    
                    htmlType="submit"
                    style={{ width: "100%", backgroundColor: "#d9534f" }
                    }
                    disabled = { loading1}
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
