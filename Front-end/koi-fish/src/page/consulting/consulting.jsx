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
  LoadingOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Flex, Layout, Menu, theme } from "antd";
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
  DatePicker,
  Badge,
  Tag,
  Avatar,
  Spin,
  Row,  
  Col, 
  Card
} from "antd";
import { Link, Outlet, useLocation, useOutlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Calculator from "../../components/Fengshui-Calcultor/Calculator";
import "./consulting.css"
import { CgEnter } from "react-icons/cg";
const { Header, Content, Footer, Sider } = Layout;
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoFish } from "react-icons/io5";
import { SiSpond } from "react-icons/si";
import api from "../../config/axios";
import { toast } from "react-toastify";

export default function Consulting() {
  const [value, setvalue] = useState({});
  const [loading, setLoading] = useState(false);
  const [koi , setKoi] = useState([])
  const [pond , setPond] = useState([])
  const colorArray = ["yellow", "green", "blue", "red", "#450803"];
  const textColor = ["#3333" , "#ffff" , "#ffff",  "#ffff" , "#ffff" ]

var settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

    const handleSetValue = (data) => {
      console.log("data callback" + data);
      console.log();

      setvalue(JSON.parse(data));
    };
    const handleSetLoading = (data) => {
      setLoading(data);
    };
    console.log("value element ID" + value.elementID);
    
  //  API get koi by element ID 
  const handleAPIKoi = async () => { 
     console.log("value element ID : "+value.elementID);
     
    try {
      const res = await api.get(`v1/fish/getKoiElement/${value.elementID}`);
      const resPond = await api.get(`v1/pond/getByElement/${value.elementID}`);
      console.log(res.data);
      setKoi(res.data.data);
      setPond(resPond.data.data)
    } catch (err) {
      toast.error(err.errorCode);
    }
  }
//  handleAPIKoi();
  useEffect(() => {
    if (value) {
       handleAPIKoi();
    }
  } , [value.elementID])

  koi.map((koi) => {
    console.log(koi.koiName);
    console.log(koi.image);
    
  });

  console.log(typeof koi);
  


  
  return (
    <>
      <Navbar />
      <Layout style={{ minHeight: "100vh", minwidth: "100vh" }}>
        <Layout
          style={{
            padding: 0,
          }}
        >
          <Content
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Calculator
              setvalue={handleSetValue}
              setLoading={handleSetLoading}
            />
            <div className="container  mt-5">
              <div className="tag-result  mt-12">
                {value &&
                  (loading ? (
                    <Spin
                      className="flex text-4xl h-96 justify-center"
                      indicator={<LoadingOutlined spin />}
                      size="large"
                    />
                  ) : (
                    <h1 className="lg:text-4xl md:text-3xl sm:text-xl font-bold text-center">
                      {" "}
                      Your Element is{" "}
                      <Tag
                        className="text-4xl"
                        color={colorArray[value.elementID - 1]}
                      >
                        {value.element}{" "}
                      </Tag>
                    </h1>
                  ))}
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
      <div className="container-parent w-full h-screen ">
        <div className="container-list flex justify-center w-full h-full">
          {/* Koi FISH */}
          <div className="container ">
            <div className="title ">
              <h1 className=" flex text-left text-4xl text-slate-700 ml-5 my-20 font-bold">
                {" "}
                Your Suggesting Koi{" "}
                <span className="text-center flex items-center  ml-5 text-slate-700 text-4xl">
                  <IoFish />
                </span>
              </h1>
            </div>
            <div className="container">
              <Slider {...settings}>
                {/* Ensure JSX is returned in the map */}
                {koi.map((kois) => (
                  <div key={kois.id} className="card">
                    <div className="imgBx">
                      <Image src={kois.image} alt={kois.koiName} />
                    </div>
                    <div className="content">
                      <span className="price">
                        <a href={`/koidetail/${kois._id}`}>Read more</a>
                      </span>
                      <ul className="">
                        <li>
                          <b className="mt-20 text-3xl ">{kois.koiName}</b>
                        </li>
                        <li>{kois.color}</li>
                        <br />
                        <p className="description">
                          {kois.description.substring(0, 100)}...
                        </p>
                      </ul>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        {/*  POND  */}
        <div className="container-list flex justify-center w-full h-full">
          <div className="container ">
            <div className="title ">
              <h1 className=" flex text-left text-4xl text-slate-700 ml-5 my-20 font-bold">
                {" "}
                Your Suggesting Koi Pond{" "}
                <span className="text-center flex items-center  ml-5 text-slate-700 text-4xl">
                  <IoFish />
                </span>
              </h1>
            </div>
            <div className="container">
              <Slider {...settings}>
                {/* Ensure JSX is returned in the map */}
                {pond.map((pond) => (
                  <div key={pond.id} className="card">
                    <div className="imgBx">
                      <Image src={pond.image} alt={pond.image} />
                    </div>
                    <div className="content">
                      <span className="price">
                        <a href={`/ponddetail/${pond._id}`}>Read more</a>
                      </span>
                      <ul className="">
                        <li>
                          <b className="mt-20 text-3xl ">{pond.shape}</b>
                        </li>
                        <li>{pond.direction}</li>
                        <br />
                        <p className="description">
                          {pond.description.substring(0, 100)}...
                        </p>
                      </ul>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
